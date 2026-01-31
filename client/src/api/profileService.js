import axios from 'axios';

// const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";


class ProfileService {
  // Get current user type
  getCurrentUserType() {
    const userTypes = ['bloodDonor', 'organDonor', 'patient', 'user'];
    for (const type of userTypes) {
      if (localStorage.getItem(`${type}Token`)) {
        return type;
      }
    }
    return null;
  }

  // Get user data
  async getUserData() {
    const userType = this.getCurrentUserType();
    if (!userType) throw new Error('No user logged in');

    const token = localStorage.getItem(`${userType}Token`);
    try {
      const response = await axios.get(`${API_BASE_URL}/${userType}/profile`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch profile' };
    }
  }

  // Update user data
  async updateUserData(data) {
    const userType = this.getCurrentUserType();
    if (!userType) throw new Error('No user logged in');

    const token = localStorage.getItem(`${userType}Token`);
    try {
      const response = await axios.put(`${API_BASE_URL}/${userType}/profile`, data, {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      // Update local storage
      if (response.data.user) {
        localStorage.setItem(userType, JSON.stringify(response.data.user));
      }
      
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to update profile' };
    }
  }

  // Upload profile picture
  async uploadProfilePicture(file) {
    const userType = this.getCurrentUserType();
    if (!userType) throw new Error('No user logged in');

    const token = localStorage.getItem(`${userType}Token`);
    const formData = new FormData();
    formData.append('profilePicture', file);

    try {
      const response = await axios.post(`${API_BASE_URL}/${userType}/profile/picture`, formData, {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      
      // Update local storage
      if (response.data.user) {
        localStorage.setItem(userType, JSON.stringify(response.data.user));
      }
      
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to upload picture' };
    }
  }

  // Change password
  async changePassword(currentPassword, newPassword) {
    const userType = this.getCurrentUserType();
    if (!userType) throw new Error('No user logged in');

    const token = localStorage.getItem(`${userType}Token`);
    try {
      const response = await axios.post(`${API_BASE_URL}/${userType}/change-password`, {
        currentPassword,
        newPassword
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to change password' };
    }
  }

  // Delete account
  async deleteAccount() {
    const userType = this.getCurrentUserType();
    if (!userType) throw new Error('No user logged in');

    const token = localStorage.getItem(`${userType}Token`);
    try {
      const response = await axios.delete(`${API_BASE_URL}/${userType}/account`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      // Clear local storage
      localStorage.removeItem(`${userType}Token`);
      localStorage.removeItem(userType);
      
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to delete account' };
    }
  }

  // Get dashboard stats
  async getDashboardStats() {
    const userType = this.getCurrentUserType();
    if (!userType) throw new Error('No user logged in');

    const token = localStorage.getItem(`${userType}Token`);
    try {
      const response = await axios.get(`${API_BASE_URL}/${userType}/dashboard-stats`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch stats' };
    }
  }
}

export default new ProfileService();