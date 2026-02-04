import React, { useEffect } from "react";
import HospitalHerosections from "./components/HospitalHerosections";
import HospitalListingPage from "./components/HospitalListingPage";
import HospitalCard from "./components/HospitalCard";
import HospitalDetailsPage from "./components/HospitalDetailsPage";
import HospitalDashboard from "./components/HospitalDashboard";

function Hospital() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <HospitalHerosections />
      <HospitalListingPage />
      <HospitalCard />
      <HospitalDetailsPage />
      <HospitalDashboard />
    </>
  );
}

export default Hospital;
