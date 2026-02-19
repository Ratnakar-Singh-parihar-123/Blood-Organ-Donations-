import React, { useEffect, useState } from "react";
import organDonorAPI from "../../../api/organDonorAPI";

const HomeOrganSection = () => {
  const [count, setCount] = useState(0);
  const [displayCount, setDisplayCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCount = async () => {
      try {
        const response = await organDonorAPI.getDonorCount();
        setCount(response.totalDonors || 0);
      } catch (error) {
        console.error("Error fetching donor count:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCount();
  }, []);

  // 🔥 Animated Counter Effect
  useEffect(() => {
    if (!loading) {
      let start = 0;
      const duration = 1500;
      const increment = count / (duration / 16);

      const timer = setInterval(() => {
        start += increment;
        if (start >= count) {
          setDisplayCount(count);
          clearInterval(timer);
        } else {
          setDisplayCount(Math.floor(start));
        }
      }, 16);

      return () => clearInterval(timer);
    }
  }, [count, loading]);

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-green-700 via-green-600 to-green-800 text-white py-24 px-6">
      {/* Background Glow */}
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>

      <div className="relative max-w-6xl mx-auto text-center">
        {/* Heading */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight">
          Join Our Life Saving Community ❤️
        </h2>

        <p className="mt-6 text-base sm:text-lg md:text-xl text-red-100 max-w-2xl mx-auto">
          Every organ donor is a hero. Your one decision can give someone a
          second chance at life.
        </p>

        {/* Stats Card */}
        <div className="mt-14 flex justify-center">
          <div className="backdrop-blur-xl bg-white/20 border border-white/30 text-white rounded-3xl shadow-2xl px-12 py-10 w-full max-w-md transition transform hover:scale-105 duration-300">
            <h3 className="text-sm uppercase tracking-widest text-red-100">
              Total Registered Organ Donors
            </h3>

            <p className="text-5xl sm:text-6xl md:text-7xl font-extrabold mt-6">
              {loading ? "..." : `${displayCount}+`}
            </p>

            <p className="mt-4 text-sm text-red-100">
              Active heroes saving lives across the country
            </p>
          </div>
        </div>

        {/* CTA Button */}
        <div className="mt-12">
          <a
            href="/organ-donors"
            className="inline-flex items-center gap-2 bg-white text-red-700 font-semibold px-8 py-3 rounded-full shadow-lg hover:bg-red-100 transition-all duration-300 hover:scale-105"
          >
            View All Donors →
          </a>
        </div>
      </div>
    </section>
  );
};

export default HomeOrganSection;
