import axios from 'axios';

// Environment variable se API base URL le rahe hain
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 seconds timeout
});

// Request interceptor - token add karna
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - error handling
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle common errors
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // Unauthorized - clear token and redirect to login
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          window.location.href = '/login';
          break;
        case 403:
          console.error('Forbidden: You do not have permission');
          break;
        case 404:
          console.error('Resource not found');
          break;
        case 500:
          console.error('Server error');
          break;
        default:
          console.error('API Error:', error.response.data);
      }
    } else if (error.request) {
      // Network error
      console.error('Network error: Please check your internet connection');
    } else {
      // Other errors
      console.error('Error:', error.message);
    }
    
    return Promise.reject(error);
  }
);

// Auth API functions
export const authAPI = {
  // Login user
  login: async (email, password) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Login failed' };
    }
  },

  // Register user
  register: async (userData) => {
    try {
      const response = await api.post('/auth/register', userData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Registration failed' };
    }
  },

  // Verify token
  verifyToken: async () => {
    try {
      const response = await api.get('/auth/verify-token');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Token verification failed' };
    }
  },

  // Forgot password
  forgotPassword: async (email) => {
    try {
      const response = await api.post('/auth/forgot-password', { email });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Password reset request failed' };
    }
  },

  // Reset password
  resetPassword: async (token, newPassword) => {
    try {
      const response = await api.post('/auth/reset-password', { 
        token, 
        newPassword 
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Password reset failed' };
    }
  },

  // Logout (client-side)
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  },
};

// User API functions
export const userAPI = {
  // Get user profile
  getProfile: async () => {
    try {
      const response = await api.get('/users/profile');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch profile' };
    }
  },

  // Update user profile
  updateProfile: async (userData) => {
    try {
      const response = await api.put('/users/profile', userData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to update profile' };
    }
  },

  // Change password
  changePassword: async (oldPassword, newPassword) => {
    try {
      const response = await api.put('/users/change-password', {
        oldPassword,
        newPassword
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to change password' };
    }
  },

  // Get all users (admin only)
  getAllUsers: async (page = 1, limit = 10) => {
    try {
      const response = await api.get(`/users?page=${page}&limit=${limit}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch users' };
    }
  },
};

// Donation API functions
export const donationAPI = {
  // Create donation request
  createDonationRequest: async (donationData) => {
    try {
      const response = await api.post('/donations/request', donationData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to create donation request' };
    }
  },

  // Get all donation requests
  getDonationRequests: async (filters = {}) => {
    try {
      const response = await api.get('/donations/requests', { params: filters });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch donation requests' };
    }
  },

  // Get donation request by ID
  getDonationRequestById: async (id) => {
    try {
      const response = await api.get(`/donations/requests/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch donation request' };
    }
  },

  // Update donation request
  updateDonationRequest: async (id, updateData) => {
    try {
      const response = await api.put(`/donations/requests/${id}`, updateData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to update donation request' };
    }
  },

  // Delete donation request
  deleteDonationRequest: async (id) => {
    try {
      const response = await api.delete(`/donations/requests/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to delete donation request' };
    }
  },

  // Get my donations
  getMyDonations: async () => {
    try {
      const response = await api.get('/donations/my-donations');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch donations' };
    }
  },

  // Respond to donation request
  respondToDonation: async (donationId, responseData) => {
    try {
      const response = await api.post(`/donations/${donationId}/respond`, responseData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to respond to donation' };
    }
  },
};

// Hospital API functions
export const hospitalAPI = {
  // Register hospital
  registerHospital: async (hospitalData) => {
    try {
      const response = await api.post('/hospitals/register', hospitalData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to register hospital' };
    }
  },

  // Get all hospitals
  getAllHospitals: async (page = 1, limit = 10) => {
    try {
      const response = await api.get(`/hospitals?page=${page}&limit=${limit}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch hospitals' };
    }
  },

  // Get hospital by ID
  getHospitalById: async (id) => {
    try {
      const response = await api.get(`/hospitals/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch hospital' };
    }
  },

  // Update hospital
  updateHospital: async (id, hospitalData) => {
    try {
      const response = await api.put(`/hospitals/${id}`, hospitalData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to update hospital' };
    }
  },

  // Get hospital statistics
  getHospitalStats: async () => {
    try {
      const response = await api.get('/hospitals/stats');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch hospital statistics' };
    }
  },
};

// Statistics API functions
export const statsAPI = {
  // Get dashboard statistics
  getDashboardStats: async () => {
    try {
      const response = await api.get('/stats/dashboard');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch dashboard statistics' };
    }
  },

  // Get blood group statistics
  getBloodGroupStats: async () => {
    try {
      const response = await api.get('/stats/blood-groups');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch blood group statistics' };
    }
  },

  // Get donation statistics
  getDonationStats: async (period = 'monthly') => {
    try {
      const response = await api.get(`/stats/donations?period=${period}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch donation statistics' };
    }
  },

  // Get user statistics
  getUserStats: async () => {
    try {
      const response = await api.get('/stats/users');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch user statistics' };
    }
  },
};

// Notification API functions
export const notificationAPI = {
  // Get user notifications
  getUserNotifications: async () => {
    try {
      const response = await api.get('/notifications');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch notifications' };
    }
  },

  // Mark notification as read
  markAsRead: async (notificationId) => {
    try {
      const response = await api.put(`/notifications/${notificationId}/read`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to mark notification as read' };
    }
  },

  // Mark all notifications as read
  markAllAsRead: async () => {
    try {
      const response = await api.put('/notifications/mark-all-read');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to mark all notifications as read' };
    }
  },

  // Delete notification
  deleteNotification: async (notificationId) => {
    try {
      const response = await api.delete(`/notifications/${notificationId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to delete notification' };
    }
  },

  // Get unread notification count
  getUnreadCount: async () => {
    try {
      const response = await api.get('/notifications/unread-count');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch unread count' };
    }
  },
};

// ... existing code ...

// Profile API functions (add this to your existing api.js)
export const profileAPI = {
  // Get user profile (already exists in userAPI)
  getProfile: async () => {
    try {
      const response = await api.get('/users/profile');
      return response.data;
    } catch (error) {
      throw formatApiError(error);
    }
  },

  // Update user profile
  updateProfile: async (userData) => {
    try {
      const response = await api.put('/users/profile', userData);
      return response.data;
    } catch (error) {
      throw formatApiError(error);
    }
  },

  // Change password
  changePassword: async (oldPassword, newPassword) => {
    try {
      const response = await api.put('/users/change-password', {
        oldPassword,
        newPassword
      });
      return response.data;
    } catch (error) {
      throw formatApiError(error);
    }
  },

  // Upload profile picture
  uploadProfilePicture: async (file) => {
    try {
      const formData = new FormData();
      formData.append('profilePicture', file);
      
      const response = await api.post('/users/profile/picture', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw formatApiError(error);
    }
  },

  // Get user stats
  getUserStats: async () => {
    try {
      const response = await api.get('/users/stats');
      return response.data;
    } catch (error) {
      throw formatApiError(error);
    }
  },

  // Get donation history
  getDonationHistory: async (page = 1, limit = 10) => {
    try {
      const response = await api.get(`/users/donations/history?page=${page}&limit=${limit}`);
      return response.data;
    } catch (error) {
      throw formatApiError(error);
    }
  },

  // Delete account
  deleteAccount: async () => {
    try {
      const response = await api.delete('/users/account');
      return response.data;
    } catch (error) {
      throw formatApiError(error);
    }
  },

  // Export user data
  exportUserData: async () => {
    try {
      const response = await api.get('/users/export-data');
      return response.data;
    } catch (error) {
      throw formatApiError(error);
    }
  },
};

// ... rest of the code ...

// Utility functions
export const utils = {
  // Upload file
  uploadFile: async (file, type = 'image') => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('type', type);

      const response = await api.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'File upload failed' };
    }
  },

  // Get location data
  getLocationData: async (latitude, longitude) => {
    try {
      const response = await api.get(`/location?lat=${latitude}&lng=${longitude}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to get location data' };
    }
  },

  // Search functionality
  search: async (query, type = 'all') => {
    try {
      const response = await api.get(`/search?q=${query}&type=${type}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Search failed' };
    }
  },
};

// Export base api instance for custom requests
export default api;