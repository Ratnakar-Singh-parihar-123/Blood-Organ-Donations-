import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const forgotPasswordAPI = {
  // Send OTP for specific user type
  sendOTP: async (email, userType) => {
    try {
      let endpoint = '';
      
      switch(userType) {
        case 'bloodDonor':
          endpoint = '/blood-donors/forgot-password';
          break;
        case 'organDonor':
          endpoint = '/organ-donors/forgot-password';
          break;
        case 'patient':
          endpoint = '/patients/forgot-password';
          break;
        case 'user':
          endpoint = '/auth/forgot-password';
          break;
        default:
          throw new Error('Invalid user type');
      }
      
      const response = await axios.post(`${API_BASE_URL}${endpoint}`, {
        email
      });
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || `Failed to send OTP for ${userType}`;
    }
  },

  // Verify OTP for specific user type
  verifyOTP: async (email, otp, userType) => {
    try {
      let endpoint = '';
      
      switch(userType) {
        case 'bloodDonor':
          endpoint = '/blood-donors/verify-otp';
          break;
        case 'organDonor':
          endpoint = '/organ-donors/verify-otp';
          break;
        case 'patient':
          endpoint = '/patients/verify-otp';
          break;
        case 'user':
          endpoint = '/auth/verify-otp';
          break;
        default:
          throw new Error('Invalid user type');
      }
      
      const response = await axios.post(`${API_BASE_URL}${endpoint}`, {
        email,
        otp
      });
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || `Invalid OTP for ${userType}`;
    }
  },

  // Reset Password for specific user type
  resetPassword: async (email, otp, newPassword, userType) => {
    try {
      let endpoint = '';
      
      switch(userType) {
        case 'bloodDonor':
          endpoint = '/blood-donors/reset-password';
          break;
        case 'organDonor':
          endpoint = '/organ-donors/reset-password';
          break;
        case 'patient':
          endpoint = '/patients/reset-password';
          break;
        case 'user':
          endpoint = '/auth/reset-password';
          break;
        default:
          throw new Error('Invalid user type');
      }
      
      const response = await axios.post(`${API_BASE_URL}${endpoint}`, {
        email,
        otp,
        newPassword
      });
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || `Failed to reset password for ${userType}`;
    }
  },

  // Resend OTP for specific user type
  resendOTP: async (email, userType) => {
    try {
      let endpoint = '';
      
      switch(userType) {
        case 'bloodDonor':
          endpoint = '/blood-donors/resend-otp';
          break;
        case 'organDonor':
          endpoint = '/organ-donors/resend-otp';
          break;
        case 'patient':
          endpoint = '/patients/resend-otp';
          break;
        case 'user':
          endpoint = '/auth/resend-otp';
          break;
        default:
          throw new Error('Invalid user type');
      }
      
      const response = await axios.post(`${API_BASE_URL}${endpoint}`, {
        email
      });
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || `Failed to resend OTP for ${userType}`;
    }
  }
};

export default forgotPasswordAPI;