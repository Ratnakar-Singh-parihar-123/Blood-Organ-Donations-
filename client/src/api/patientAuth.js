import axios from "axios";

export const BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const API = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // 🔥 important for deploy
});

const patientAuthAPI = {
  register: async (data) => {
    try {
      const res = await API.post("/patients/register", data);
      return res.data;
    } catch (error) {
      throw error.response?.data || { message: "Registration failed" };
    }
  },

  login: async (email, password) => {
    try {
      const res = await API.post("/patients/login", { email, password });
      return res.data;
    } catch (error) {
      throw error.response?.data || { message: "Login failed" };
    }
  },

  verifyToken: async () => {
    const token = localStorage.getItem("patientToken");
    if (!token) throw new Error("No token found");

    try {
      const res = await API.get("/patients/verify", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    } catch (error) {
      throw error.response?.data || { message: "Token verification failed" };
    }
  },
};

export { patientAuthAPI };
