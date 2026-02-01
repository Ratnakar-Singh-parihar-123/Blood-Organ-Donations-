import axios from "axios";

export const getDashboardCounts = async () => {
  const res = await axios.get("http://localhost:5000/api/dashboard/counts");
  return res.data;
};
