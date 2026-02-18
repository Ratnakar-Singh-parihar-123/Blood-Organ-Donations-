import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const bloodDonorAPI = {
  // Get all donors
  getAllDonors: async () => {
    const response = await axios.get(`${BASE_URL}/blood-donors`);
    return response.data;
  },

  // Filter donors
  searchDonors: async (bloodGroup = "", city = "") => {
    const response = await axios.get(`${BASE_URL}/blood-donors/search`, {
      params: { bloodGroup, city },
    });
    return response.data;
  },

  // Get single donor
  getDonorById: async (id) => {
    const response = await axios.get(`${BASE_URL}/blood-donors/${id}`);
    return response.data;
  },

  getDonorCount: async () => {
    const response = await axios.get(`${BASE_URL}/blood-donors/count`);
    return response.data;
  },
};

export default bloodDonorAPI;
