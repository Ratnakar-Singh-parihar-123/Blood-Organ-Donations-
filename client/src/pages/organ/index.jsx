import React from 'react'
import OrganHeroSections from './components/OrganHeroSection'
import OrgansList from './components/OrgansList'
import EligibilitySection from './components/EligibilitySection'
import HowOrganDonationWorks from './components/HowOrganDonationWorks'
import SafetyAndProcess from './components/SafetyAndProcess'
import ImpactStories from './components/ImpactStories'
import MythsVsFacts from './components/MythsVsFacts'
import OrganDonationCTA from './components/OrganDonationCTA'

function OrganPages() {
  return (
    <>
    <OrganHeroSections />
    <OrgansList />
    <EligibilitySection />
    <HowOrganDonationWorks />
    <SafetyAndProcess />
    <ImpactStories />
    <MythsVsFacts />
    <OrganDonationCTA />
    </>
  )
}

export default OrganPages
