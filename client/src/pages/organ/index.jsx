import React, { useEffect } from "react";
import OrganHeroSections from "./components/OrganHeroSection";
import OrgansList from "./components/OrgansList";
import EligibilitySection from "./components/EligibilitySection";
import HowOrganDonationWorks from "./components/HowOrganDonationWorks";
import SafetyAndProcess from "./components/SafetyAndProcess";
import ImpactStories from "./components/ImpactStories";
import MythsVsFacts from "./components/MythsVsFacts";
import OrganDonationCTA from "./components/OrganDonationCTA";
import OrganRequestForm from "./components/OrganRequestForm";

function OrganPages() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <OrganHeroSections />
      <OrgansList />
      <OrganRequestForm />
      <EligibilitySection />
      <HowOrganDonationWorks />
      <SafetyAndProcess />
      <ImpactStories />
      <MythsVsFacts />
      <OrganDonationCTA />
    </>
  );
}

export default OrganPages;
