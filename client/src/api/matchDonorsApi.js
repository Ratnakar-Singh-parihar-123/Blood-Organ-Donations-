import axios from "axios";

// 🔥 axios instance yahin bana diya
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // .env se aayega
  withCredentials: true, // optional
});

export const fetchMatchedDonors = async (patientId) => {
  if (!patientId) {
    throw new Error("Patient ID missing");
  }

  const res = await api.get(`/match-donors/${patientId}`);
  return res.data;
};
