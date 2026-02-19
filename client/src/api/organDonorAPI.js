import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const organDonorAPI = {
  // ✅ Get all organ donors
  getAllDonors: async () => {
    const response = await axios.get(`${BASE_URL}/organ-donors`);
    return response.data;
  },

  // ✅ Filter organ donors
  searchDonors: async (organType = "", city = "") => {
    const response = await axios.get(`${BASE_URL}/organ-donors/search`, {
      params: { organType, city },
    });
    return response.data;
  },

  // ✅ Get single donor
  getDonorById: async (id) => {
    const response = await axios.get(`${BASE_URL}/organ-donors/${id}`);
    return response.data;
  },

  // ✅ Get total donor count
  getDonorCount: async () => {
    const response = await axios.get(`${BASE_URL}/organ-donors/count`);
    return response.data;
  },
};

export default organDonorAPI;
