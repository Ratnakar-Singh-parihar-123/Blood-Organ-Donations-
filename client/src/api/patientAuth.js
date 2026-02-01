import axios from 'axios';


const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";



const patientAuthAPI = {
  register: async (data) => {
    try {
      const response = await axios.post(`${BASE_URL}/patients/register`, data);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Registration failed' };
    }
  },

  login: async (email, password) => {
    try {
      const response = await axios.post(`${BASE_URL}/patients/login`, {
        email,
        password,
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Login failed' };
    }
  },

  verifyToken: async () => {
    const token = localStorage.getItem('patientToken');
    if (!token) throw new Error('No token found');

    try {
      const response = await axios.get(`${BASE_URL}/patients/verify`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Token verification failed' };
    }
  }
};

export {
  patientAuthAPI,
  BASE_URL
}
