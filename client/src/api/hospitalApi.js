// hospitalApi.js - Frontend API functions using Axios
import axios from 'axios';

// Create axios instance with base URL
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // future me cookies / auth ke kaam aayega
});

// Add token to requests if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('hospitalToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Hospital Authentication API functions
export const hospitalApi = {
  // Register new hospital
  register: async (hospitalData) => {
    try {
      const response = await api.post('/hospital/register', hospitalData);
      return {
        success: true,
        data: response.data,
        message: response.data.message
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Registration failed. Please try again.',
        error: error.response?.data
      };
    }
  },

  // Login hospital
  login: async (loginData) => {
    try {
      const response = await api.post('/hospital/login', loginData);

      // Store token and hospital data
      if (response.data.token) {
        localStorage.setItem('hospitalToken', response.data.token);
        localStorage.setItem('hospitalData', JSON.stringify(response.data.hospital));
      }

      return {
        success: true,
        data: response.data,
        message: response.data.message
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Login failed. Please check your credentials.',
        error: error.response?.data
      };
    }
  },

  // Verify email
  verifyEmail: async (token) => {
    try {
      const response = await api.get(`/hospital/verify?token=${token}`);
      return {
        success: true,
        data: response.data,
        message: response.data.message
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Verification failed.',
        error: error.response?.data
      };
    }
  },

  // Forgot password
  forgotPassword: async (email) => {
    try {
      const response = await api.post('/hospital/forgot-password', { email });
      return {
        success: true,
        data: response.data,
        message: response.data.message
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to send reset email.',
        error: error.response?.data
      };
    }
  },

  // Reset password
  resetPassword: async (resetData) => {
    try {
      const response = await api.post('/hospital/reset-password', resetData);
      return {
        success: true,
        data: response.data,
        message: response.data.message
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Password reset failed.',
        error: error.response?.data
      };
    }
  },

  // Get hospital profile (protected)
  getProfile: async () => {
    try {
      const response = await api.get('/hospital/profile');
      return {
        success: true,
        data: response.data,
        hospital: response.data.hospital
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to fetch profile.',
        error: error.response?.data
      };
    }
  },

  // Update hospital profile
  updateProfile: async (profileData) => {
    try {
      const response = await api.put('/hospital/profile', profileData);
      return {
        success: true,
        data: response.data,
        message: response.data.message
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to update profile.',
        error: error.response?.data
      };
    }
  },

  // Check authentication status
  checkAuth: () => {
    const token = localStorage.getItem('hospitalToken');
    const hospitalData = localStorage.getItem('hospitalData');

    if (token && hospitalData) {
      return {
        isAuthenticated: true,
        hospital: JSON.parse(hospitalData)
      };
    }
    return {
      isAuthenticated: false,
      hospital: null
    };
  },

  // Logout
  logout: () => {
    localStorage.removeItem('hospitalToken');
    localStorage.removeItem('hospitalData');
    return {
      success: true,
      message: 'Logged out successfully'
    };
  },

  // Get hospital dashboard stats
  getDashboardStats: async () => {
    try {
      const response = await api.get('/hospital/dashboard/stats');
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to fetch dashboard data.',
        error: error.response?.data
      };
    }
  },

  // Get hospital notifications
  getNotifications: async () => {
    try {
      const response = await api.get('/hospital/notifications');
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to fetch notifications.',
        error: error.response?.data
      };
    }
  },

  // Mark notification as read
  markNotificationAsRead: async (notificationId) => {
    try {
      const response = await api.put(`/hospital/notifications/${notificationId}/read`);
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to update notification.',
        error: error.response?.data
      };
    }
  }
};

export default hospitalApi;