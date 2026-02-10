import axios from "axios";

export const API = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/hospitals`,
  withCredentials: true,
});


// REGISTER
export const registerHospital = (data) =>
  API.post("/register", data);

// LOGIN
export const loginHospital = (data) =>
  API.post("/login", data);

