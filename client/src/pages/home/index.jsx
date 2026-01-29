import React from 'react'
import HeroSection from './components/HeroSection'
import StatsSection from './components/StatsSection'
import HowItWorks from './components/HowItWorks'
import DonationTypes from './components/DonationTypes'
import UrgentBloodRequests from './components/UrgentBloodRequests'
import WhyDonate from './components/WhyDonate'
import Testimonials from './components/Testimonials'
import CTASection from './components/CTASection'

function HomePage() {
  return (
    <>
    <HeroSection />
    <StatsSection />
    <HowItWorks />
    <DonationTypes />
    <UrgentBloodRequests />
    <WhyDonate />
    <Testimonials />
    <CTASection />
    </>
  )
}

export default HomePage
