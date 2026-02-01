import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

export const getDashboardCounts = async () => {
  const res = await API.get("/api/dashboard/counts");
  return res.data;
};
