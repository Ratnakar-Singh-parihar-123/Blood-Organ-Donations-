import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/hospitals", // backend URL
  withCredentials: true,
});

// REGISTER
export const registerHospital = (data) =>
  API.post("/register", data);

// LOGIN
export const loginHospital = (data) =>
  API.post("/login", data);
