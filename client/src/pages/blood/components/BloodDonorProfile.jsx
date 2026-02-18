import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import bloodDonorAPI from "../../../api/bloodDonorAPI";

const BloodDonorProfile = () => {
  const { id } = useParams();
  const [donor, setDonor] = useState(null);

  useEffect(() => {
    const fetchDonor = async () => {
      try {
        const data = await bloodDonorAPI.getDonorById(id);
        setDonor(data.donor);
      } catch (error) {
        console.error(error);
      }
    };

    fetchDonor();
  }, [id]);

  if (!donor) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="min-h-screen flex justify-center p-6 bg-gray-50">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-lg text-center">
        <img
          src={donor.profilePic || "/default-avatar.png"}
          alt="donor"
          className="w-32 h-32 rounded-full mx-auto border-4 border-red-500 object-cover"
        />

        <h2 className="text-2xl font-bold mt-4">{donor.fullName}</h2>

        <div className="mt-6 space-y-3 text-left">
          <p>
            <strong>Blood Group:</strong> {donor.bloodGroup}
          </p>
          <p>
            <strong>City:</strong> {donor.city}
          </p>
          <p>
            <strong>Phone:</strong> {donor.phone}
          </p>
          <p>
            <strong>Address:</strong> {donor.address}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BloodDonorProfile;
