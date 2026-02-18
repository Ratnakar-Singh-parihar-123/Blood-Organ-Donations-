import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import bloodDonorAPI from "../../../api/bloodDonorAPI";

const BloodDonorList = () => {
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDonors = async () => {
      try {
        const data = await bloodDonorAPI.getAllDonors();
        setDonors(data.donors);
      } catch (error) {
        console.error("Error fetching donors:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDonors();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="p-6 grid md:grid-cols-3 gap-6">
      {donors.map((donor) => (
        <div
          key={donor._id}
          className="bg-white shadow-lg rounded-xl p-4 text-center"
        >
          <img
            src={donor.profilePic || "/default-avatar.png"}
            alt="donor"
            className="w-24 h-24 rounded-full mx-auto object-cover border-2 border-red-500"
          />

          <h3 className="mt-3 font-bold text-lg">{donor.fullName}</h3>

          <p className="text-red-600 font-semibold">{donor.bloodGroup}</p>

          <p className="text-gray-500">{donor.city}</p>

          <Link
            to={`/donor/${donor._id}`}
            className="mt-3 inline-block bg-red-500 text-white px-4 py-2 rounded-lg"
          >
            View Profile
          </Link>
        </div>
      ))}
    </div>
  );
};

export default BloodDonorList;
