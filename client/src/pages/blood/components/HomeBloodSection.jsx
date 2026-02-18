import { useEffect, useState } from "react";
import bloodDonorAPI from "../../../api/bloodDonorAPI";

const HomeBloodSection = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const fetchCount = async () => {
      try {
        const data = await bloodDonorAPI.getDonorCount();
        setCount(data.totalDonors);
      } catch (error) {
        console.error("Error fetching donor count:", error);
      }
    };

    fetchCount();
  }, []);

  return (
    <section className="relative bg-gradient-to-r from-red-600 to-red-800 text-white py-20 px-6">
      <div className="max-w-6xl mx-auto text-center">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold">
          Join Our Life Saving Community ❤️
        </h2>

        <p className="mt-4 text-lg md:text-xl text-red-100">
          Together we can make a difference. Every drop counts.
        </p>

        {/* Count Card */}
        <div className="mt-12 flex justify-center">
          <div className="bg-white text-red-600 rounded-2xl shadow-2xl px-10 py-8 w-full max-w-sm transform hover:scale-105 transition duration-300">
            <h3 className="text-lg font-semibold uppercase tracking-wide">
              Total Registered Donors
            </h3>

            <p className="text-5xl md:text-6xl font-extrabold mt-4">{count}+</p>

            <p className="text-gray-500 mt-2 text-sm">
              Active heroes saving lives
            </p>
          </div>
        </div>

        {/* Button */}
        <div className="mt-10">
          <a
            href="/blood-donors"
            className="inline-block bg-white text-red-600 font-semibold px-8 py-3 rounded-full shadow-lg hover:bg-red-100 transition duration-300"
          >
            View All Donors
          </a>
        </div>
      </div>
    </section>
  );
};

export default HomeBloodSection;
