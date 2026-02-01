import axios from "axios";

// Base URL from env variable
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const matchApi = {
  // Get patient matches
  getPatientMatches: async (patientId) => {
    if (!patientId) {
      console.error("Patient ID is required to fetch matches");
      throw new Error("Patient ID is required");
    }

    try {
      const response = await axios.get(`${BASE_URL}/match-donors/${patientId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching matches:", error.response?.data || error.message);
      throw error;
    }
  },

  // Contact donor
  contactDonor: async (donorId, donorType, patientId) => {
    if (!donorId || !donorType || !patientId) {
      throw new Error("Donor ID, type, and patient ID are required");
    }

    try {
      const response = await axios.post(`${BASE_URL}/contact-donor`, {
        donorId,
        donorType,
        patientId,
      });
      return response.data;
    } catch (error) {
      console.error("Error contacting donor:", error.response?.data || error.message);
      throw error;
    }
  },

  // Send emergency alert
  sendEmergencyAlert: async (patientId, message) => {
    if (!patientId || !message) {
      throw new Error("Patient ID and message are required");
    }

    try {
      const response = await axios.post(`${BASE_URL}/emergency-alert`, {
        patientId,
        message,
      });
      return response.data;
    } catch (error) {
      console.error("Error sending alert:", error.response?.data || error.message);
      throw error;
    }
  },
};
