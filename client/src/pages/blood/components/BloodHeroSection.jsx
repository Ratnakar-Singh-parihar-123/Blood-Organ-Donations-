import React from "react";
import { 
  Heart, 
  Droplets, 
  Calendar, 
  Shield, 
  Clock, 
  User, 
  Award,
  ChevronRight,
  CheckCircle,
  MapPin,
  Phone,
  Star,
  TrendingUp,
  AlertCircle,
  ArrowRight,
  RefreshCw,
  Zap,
  Target
} from "lucide-react";

const BloodHeroSection = () => {
  return (
    <div className="bg-gradient-to-b from-red-50 via-white to-white">
      {/* ================= HERO SECTION ================= */}
      <section className="relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-br from-red-200/30 to-pink-200/20 rounded-full -translate-y-1/3 translate-x-1/3 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gradient-to-tr from-red-100/30 to-rose-100/20 rounded-full translate-y-1/3 -translate-x-1/3 blur-3xl"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 lg:py-28">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Left Content */}
            <div className="relative z-10 order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-600 to-rose-600 rounded-full text-white text-sm font-medium mb-6 shadow-lg shadow-red-500/20">
                <Heart className="h-4 w-4" fill="white" />
                <span>Join 50,000+ Lifesavers Today</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight tracking-tight">
                Give Blood,
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-rose-600">
                  Save Lives
                </span>
                Every Drop Counts
              </h1>

              <p className="mt-4 sm:mt-6 text-lg text-gray-600 max-w-xl leading-relaxed">
                Your single blood donation can save up to 3 lives. Join our 
                community of heroes and be the reason someone gets to see tomorrow.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-8">
                <div className="bg-white p-4 rounded-xl shadow-sm border border-red-100">
                  <div className="flex items-center gap-2">
                    <User className="h-5 w-5 text-red-600" />
                    <span className="text-2xl font-bold text-gray-900">50K+</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">Active Donors</p>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm border border-rose-100">
                  <div className="flex items-center gap-2">
                    <Droplets className="h-5 w-5 text-rose-600" />
                    <span className="text-2xl font-bold text-gray-900">150K+</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">Lives Saved</p>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm border border-red-100 col-span-2 sm:col-span-1">
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-red-600" />
                    <span className="text-2xl font-bold text-gray-900">15 min</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">Avg. Donation</p>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mt-10">
                <button className="group relative bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg shadow-red-500/25 hover:shadow-xl hover:shadow-red-500/30 transition-all duration-300 transform hover:-translate-y-0.5">
                  <span className="flex items-center justify-center gap-2">
                    Donate Blood Now
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                </button>

                <button className="group flex items-center justify-center gap-3 px-8 py-4 bg-white text-gray-700 rounded-xl font-medium border-2 border-gray-200 hover:border-red-300 hover:bg-red-50 transition-all duration-300">
                  <Calendar className="h-5 w-5 text-red-600 group-hover:text-red-700" />
                  <span>Schedule Donation</span>
                </button>
              </div>

              {/* Trust Badges */}
              <div className="mt-12">
                <p className="text-sm text-gray-500 mb-4">Certified by leading health organizations</p>
                <div className="flex flex-wrap gap-4 items-center">
                  <div className="h-8 text-gray-400">🏥</div>
                  <div className="h-8 text-gray-400">🔬</div>
                  <div className="h-8 text-gray-400">⚕️</div>
                  <div className="h-8 text-gray-400">🏛️</div>
                  <div className="text-sm text-gray-500 font-medium">+ 12 more</div>
                </div>
              </div>
            </div>

            {/* Right Image */}
            <div className="relative order-1 lg:order-2 lg:h-full">
              {/* Main Card */}
              <div className="relative bg-gradient-to-br from-white to-red-50 rounded-3xl shadow-2xl shadow-red-500/10 p-6 lg:p-8 overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-red-100/50 to-rose-100/30 rounded-full -translate-y-32 translate-x-32"></div>
                
                {/* Main Image */}
                <div className="relative z-10">
                  <img
                    src="https://vims.ac.in/vims-hospital/wp-content/uploads/2025/08/Who-Can-Donate-Blood-1024x1024.png"
                    alt="Blood Donation Hero"
                    className="w-full h-auto rounded-2xl shadow-lg object-cover"
                  />
                </div>

                {/* Floating Emergency Card */}
                {/* <div className="absolute bottom-6 left-6 right-6 bg-gradient-to-r from-red-700 to-rose-700 text-white rounded-2xl p-4 shadow-xl shadow-red-600/25 transform hover:-translate-y-1 transition-transform duration-300">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
                        <AlertCircle className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="font-bold text-lg">Urgent Need</p>
                        <p className="text-sm text-white/90">Type O- Required</p>
                      </div>
                    </div>
                    <button className="bg-white text-red-700 hover:bg-gray-100 px-4 py-2 rounded-lg font-semibold text-sm transition-colors">
                      Donate Now
                    </button>
                  </div>
                </div> */}

                {/* Floating Stats Card */}
                <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                      <Droplets className="h-6 w-6 text-red-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900">450ml</p>
                      <p className="text-sm text-gray-600">Per Donation</p>
                    </div>
                  </div>
                </div>

                {/* Floating Donor Card */}
                {/* <div className="absolute top-1/4 -left-4 bg-white rounded-xl p-4 shadow-lg transform hover:-translate-x-1 transition-transform duration-300">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <img
                        src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
                        alt="Donor"
                        className="w-12 h-12 rounded-full object-cover border-2 border-white shadow"
                      />
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white"></div>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Alex M.</p>
                      <p className="text-sm text-gray-600">12 Donations</p>
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= WHY DONATE SECTION ================= */}
      <section className="py-16 md:py-24 lg:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Image Section */}
            <div className="relative order-2 lg:order-1">
              <div className="relative bg-gradient-to-br from-white to-red-50 rounded-3xl shadow-xl shadow-red-500/10 p-4 overflow-hidden">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvI2XEX02CsZIHdkbrqfQLANikxWgHquQgcg&s"
                  alt="Why Donate Blood"
                  className="w-full h-auto rounded-2xl shadow-lg"
                />
                
                {/* Floating Card */}
                <div className="absolute -bottom-4 -right-4 bg-white rounded-2xl shadow-xl p-6 max-w-xs">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-rose-500 rounded-xl flex items-center justify-center">
                      <Shield className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">100% Safe</p>
                      <p className="text-sm text-gray-600">Sterilized process</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Content Section */}
            <div className="order-1 lg:order-2">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-100 text-red-700 rounded-full text-sm font-medium mb-6">
                <Target className="h-4 w-4" />
                <span>The Power of Giving</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
                Why Donate
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-rose-600">
                  Blood?
                </span>
              </h2>

              <p className="mt-4 text-lg text-gray-600">
                Blood is the most precious gift anyone can give to another person — 
                the gift of life. A decision to donate your blood can save multiple lives.
              </p>

              {/* Key Points */}
              <div className="space-y-6 mt-8">
                {[
                  {
                    icon: Heart,
                    title: "Save Lives",
                    desc: "One donation can save up to 3 lives"
                  },
                  {
                    icon: Zap,
                    title: "Health Benefits",
                    desc: "Reduces risk of heart disease & burns calories"
                  },
                  {
                    icon: User,
                    title: "Community Impact",
                    desc: "Be part of a lifesaving network"
                  },
                  {
                    icon: Award,
                    title: "Free Health Check",
                    desc: "Get your blood pressure & hemoglobin tested"
                  }
                ].map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div key={idx} className="flex items-start gap-4 p-4 bg-white rounded-xl border border-gray-100 hover:border-red-200 transition-colors">
                      <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon className="h-6 w-6 text-red-600" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900">{item.title}</h3>
                        <p className="text-gray-600 mt-1">{item.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <button className="mt-10 group flex items-center gap-2 text-red-600 font-semibold text-lg hover:text-red-700 transition-colors">
                Learn More About Benefits
                <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ================= HOW IT WORKS SECTION ================= */}
      <section className="py-16 md:py-24 lg:py-32 bg-gradient-to-b from-white to-red-50 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-600 to-rose-600 rounded-full text-white text-sm font-medium mb-6">
              <RefreshCw className="h-4 w-4" />
              <span>Simple & Safe Process</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Donating blood is simple, safe, and takes less time than you think. 
              Follow these 4 easy steps to become a lifesaver.
            </p>
          </div>

          {/* Steps */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mt-12 lg:mt-20">
            {[
              {
                number: "01",
                title: "Register & Check Eligibility",
                desc: "Quick sign-up and health questionnaire",
                icon: User
              },
              {
                number: "02",
                title: "Health Screening",
                desc: "Free health check and blood test",
                icon: Shield
              },
              {
                number: "03",
                title: "Donate Blood",
                desc: "Safe, sterile process (10-15 mins)",
                icon: Droplets
              },
              {
                number: "04",
                title: "Refresh & Reward",
                desc: "Snacks and recovery (plus donor perks!)",
                icon: Award
              }
            ].map((step, idx) => {
              const Icon = step.icon;
              return (
                <div key={idx} className="group relative">
                  {/* Connecting Line (Desktop) */}
                  {idx < 3 && (
                    <div className="hidden lg:block absolute top-12 left-3/4 w-full h-0.5 bg-gradient-to-r from-red-200 to-rose-200 group-hover:from-red-400 group-hover:to-rose-400 transition-colors z-0"></div>
                  )}

                  <div className="relative bg-white rounded-2xl shadow-lg border border-gray-100 p-6 lg:p-8 transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-2 group-hover:border-red-200 z-10">
                    {/* Step Number */}
                    <div className="absolute -top-4 -left-4 w-16 h-16 bg-gradient-to-r from-red-600 to-rose-600 rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                      {step.number}
                    </div>

                    {/* Icon */}
                    <div className="mb-6 pt-4">
                      <div className="w-14 h-14 bg-red-50 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Icon className="h-7 w-7 text-red-600" />
                      </div>
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                    <p className="text-gray-600">{step.desc}</p>

                    {/* Arrow */}
                    <div className="mt-6 opacity-0 group-hover:opacity-100 transition-opacity">
                      <ArrowRight className="h-5 w-5 text-red-600" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* CTA */}
          <div className="text-center mt-16">
            <button className="group bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg shadow-red-500/25 hover:shadow-xl hover:shadow-red-500/30 transition-all duration-300 inline-flex items-center gap-2">
              Start Your Donation Journey
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <p className="text-sm text-gray-500 mt-4">It only takes 30 minutes to save a life</p>
          </div>
        </div>
      </section>

      {/* ================= TESTIMONIALS SECTION ================= */}
      <section className="py-16 md:py-24 lg:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full text-white text-sm font-medium mb-6">
              <Star className="h-4 w-4" fill="white" />
              <span>Hero Stories</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Stories That
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-rose-600">
                Inspire
              </span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Hear from donors and recipients whose lives have been touched by 
              the gift of blood donation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 lg:mt-20">
            {[
              {
                quote: "I've donated 15 times. Knowing my blood helped save lives gives me immense satisfaction. The process is so smooth and the staff are incredibly supportive.",
                name: "Mark Peterson",
                role: "Regular Donor",
                donations: "15 Donations",
                image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
              },
              {
                quote: "Blood donors saved my life after my accident. I'll forever be grateful to those anonymous heroes. Now I donate regularly to pay it forward.",
                name: "Andrew Thompson",
                role: "Recipient & Donor",
                donations: "8 Donations",
                image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
              }
            ].map((testimonial, idx) => (
              <div key={idx} className="group relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-red-500 to-rose-500 rounded-3xl blur opacity-20 group-hover:opacity-30 transition-opacity"></div>
                <div className="relative bg-white rounded-3xl p-8 shadow-lg">
                  <div className="flex items-start gap-4">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-full object-cover border-4 border-white shadow"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-1 mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 text-amber-500" fill="currentColor" />
                        ))}
                      </div>
                      <p className="text-gray-700 text-lg italic mb-6">"{testimonial.quote}"</p>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-bold text-gray-900">{testimonial.name}</p>
                          <p className="text-sm text-gray-600">{testimonial.role}</p>
                        </div>
                        <div className="px-3 py-1 bg-red-50 text-red-700 rounded-full text-sm font-medium">
                          {testimonial.donations}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CTA SECTION ================= */}
      <section className="py-16 md:py-24 lg:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="relative overflow-hidden rounded-3xl">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-gradient-to-r from-red-700 via-red-600 to-rose-600"></div>
            <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-br from-white/10 to-transparent rounded-full -translate-y-1/3 translate-x-1/3 blur-3xl"></div>
            
            <div className="relative p-8 md:p-12 lg:p-16 text-white">
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium mb-6">
                    <Heart className="h-4 w-4" fill="white" />
                    <span>Join the Lifesaver Movement</span>
                  </div>

                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
                    Ready to Make a
                    <span className="block">Real Difference?</span>
                  </h2>
                  <p className="text-lg text-red-100 mb-8 max-w-lg">
                    Your decision to donate blood today can give someone a tomorrow. 
                    Join thousands of heroes in our lifesaving community.
                  </p>

                  {/* Quick Stats */}
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                      <p className="text-2xl font-bold">450ml</p>
                      <p className="text-sm text-red-200">Per Donation</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                      <p className="text-2xl font-bold">3 Lives</p>
                      <p className="text-sm text-red-200">Can Be Saved</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                  <h3 className="text-2xl font-bold mb-6">Start Saving Lives Today</h3>
                  <div className="space-y-4">
                    <button className="w-full bg-white text-red-700 hover:bg-gray-100 px-6 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2">
                      <Droplets className="h-5 w-5" />
                      Register as Donor
                    </button>
                    <button className="w-full bg-transparent border-2 border-white text-white hover:bg-white/10 px-6 py-4 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center justify-center gap-2">
                      <Calendar className="h-5 w-5" />
                      Schedule Appointment
                    </button>
                    <button className="w-full bg-transparent text-white hover:text-red-100 px-6 py-3 rounded-xl font-medium transition-colors flex items-center justify-center gap-2">
                      <Phone className="h-4 w-4" />
                      Emergency: Call 108
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FAQ SECTION ================= */}
      <section className="py-16 md:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Common Questions
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-rose-600">
                Answered
              </span>
            </h2>
            <p className="text-lg text-gray-600">
              Everything you need to know about blood donation
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                question: "Who can donate blood?",
                answer: "Generally, anyone between 18-65 years, weighing over 50kg, in good health. Specific criteria apply."
              },
              {
                question: "How often can I donate blood?",
                answer: "Every 56 days (approximately 8 weeks) for whole blood donation."
              },
              {
                question: "Is blood donation safe?",
                answer: "Yes, sterile equipment is used only once. The process is supervised by trained professionals."
              },
              {
                question: "How long does it take?",
                answer: "Registration, screening, donation, and recovery take about 30-45 minutes total."
              },
              {
                question: "Will I feel weak after donating?",
                answer: "Most people feel perfectly fine. We provide refreshments and recommend resting for 15 minutes."
              }
            ].map((faq, idx) => (
              <div key={idx} className="group bg-white rounded-2xl border border-gray-200 hover:border-red-300 transition-all duration-300 hover:shadow-lg overflow-hidden">
                <button className="w-full text-left p-6 flex items-center justify-between hover:bg-red-50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="font-bold text-red-700">{idx + 1}</span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">{faq.question}</h3>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-red-600 group-hover:rotate-90 transition-transform" />
                </button>
                <div className="px-6 pb-6 pl-20">
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Additional Help */}
          <div className="text-center mt-12">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-medium">
              <Phone className="h-4 w-4" />
              <span>Need Help? Call our Donor Support: 1800-123-456</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BloodHeroSection;