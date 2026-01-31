import axios from 'axios';

// const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";


const organDonorAuthAPI = {
  register: async (data) => {
    try {
      const response = await axios.post(`${BASE_URL}/organ-donors/register`, data);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Registration failed' };
    }
  },

  login: async (email, password) => {
    try {
      const response = await axios.post(`${BASE_URL}/organ-donors/login`, {
        email,
        password,
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Login failed' };
    }
  },

  verifyToken: async () => {
    const token = localStorage.getItem('organDonorToken');
    if (!token) throw new Error('No token found');

    try {
      const response = await axios.get(`${BASE_URL}/organ-donors/verify`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Token verification failed' };
    }
  }
};

export { organDonorAuthAPI, BASE_URL};