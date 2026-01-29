import React from 'react'
import BloodHeroSection from './components/BloodHeroSection'
import BloodTypes from './components/BloodTypes'
import BloodDonationEligibility from './components/BloodDonationEligibility'
import HowBloodDonationWorks from './components/HowBloodDonationWorks'
import UrgentBloodRequests from './components/UrgentBloodRequests'
import BenefitsOfDonation from './components/BenefitsOfDonation'
import BloodDonationFAQ from  './components/BloodDonationFAQ'

function BloodPages() {
  return (
    <>
    <BloodHeroSection />
    <BloodTypes />
    <BloodDonationEligibility />
    <HowBloodDonationWorks />
    <UrgentBloodRequests />
    <BenefitsOfDonation />
    <BloodDonationFAQ />
    </>
  )
}

export default BloodPages
