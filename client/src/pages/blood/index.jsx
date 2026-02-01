import React, { useEffect } from "react";
import BloodHeroSection from "./components/BloodHeroSection";
// import BloodTypes from "./components/BloodTypes";
// import BloodDonationEligibility from "./components/BloodDonationEligibility";
// import HowBloodDonationWorks from "./components/HowBloodDonationWorks";
// import UrgentBloodRequests from "./components/UrgentBloodRequests";
// import BenefitsOfDonation from "./components/BenefitsOfDonation";
// import BloodDonationFAQ from "./components/BloodDonationFAQ";
// import BloodRequestForm from "./components/BloodRequestForm";

function BloodPages() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <BloodHeroSection />
      {/* <BloodTypes />
      <BloodRequestForm />
      <BloodDonationEligibility />
      <HowBloodDonationWorks />
      <UrgentBloodRequests />
      <BenefitsOfDonation />
      <BloodDonationFAQ /> */}
    </>
  );
}

export default BloodPages;
