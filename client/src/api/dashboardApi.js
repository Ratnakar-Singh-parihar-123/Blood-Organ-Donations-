import axios from "axios";

export const getDashboardCounts = async () => {
  const res = await axios.get(
    `${import.meta.env.VITE_API_URL}/dashboard/counts`
  );
  return res.data;
};
