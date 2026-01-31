import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";


const bloodDonorAuthAPI = {
  register: async (data) => {
    try {
      const response = await axios.post(`${BASE_URL}/blood-donors/register`, data, {
        headers: { 'Content-Type': 'application/json' }
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Registration failed' };
    }
  },

  login: async (email, password) => {
    try {
      const response = await axios.post(`${BASE_URL}/blood-donors/login`, {
        email,
        password,
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Login failed' };
    }
  },

  verifyToken: async () => {
    const token = localStorage.getItem('bloodDonorToken');
    if (!token) throw new Error('No token found');

    try {
      const response = await axios.get(`${BASE_URL}/blood-donors/verify`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Token verification failed' };
    }
  },

  forgotPassword: async (email) => {
    try {
      const response = await axios.post(`${BASE_URL}/blood-donors/forgot-password`, { email });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Password reset failed' };
    }
  }
};

export {bloodDonorAuthAPI , BASE_URL };