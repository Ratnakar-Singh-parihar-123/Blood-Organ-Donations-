import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import BloodHeroSection from "./components/BloodHeroSection";
import BloodDonorList from "./components/BloodDonorList";
import BloodDonorProfile from "./components/BloodDonorProfile";
import HomeBloodSection from "./components/HomeBloodSection";

function BloodPages() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <BloodHeroSection />
      <HomeBloodSection />

      <Routes>
        {/* Donor List */}
        <Route path="/" element={<BloodDonorList />} />

        {/* Single Donor Profile */}
        <Route path="donor/:id" element={<BloodDonorProfile />} />
      </Routes>
    </>
  );
}

export default BloodPages;
