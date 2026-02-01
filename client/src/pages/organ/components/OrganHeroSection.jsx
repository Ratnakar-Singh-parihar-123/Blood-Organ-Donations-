import React from "react";
import { 
  Heart, 
  Activity, 
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
  Target,
  Leaf,
  LifeBuoy,
  Stethoscope,
  Globe
} from "lucide-react";

const OrganHeroSection = () => {
  return (
    <div className="bg-gradient-to-b from-emerald-50 via-white to-white">
      {/* ================= HERO SECTION ================= */}
      <section className="relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-br from-emerald-200/30 to-green-200/20 rounded-full -translate-y-1/3 translate-x-1/3 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gradient-to-tr from-emerald-100/30 to-green-100/20 rounded-full translate-y-1/3 -translate-x-1/3 blur-3xl"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 lg:py-28">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Left Content */}
            <div className="relative z-10 order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-600 to-green-600 rounded-full text-white text-sm font-medium mb-6 shadow-lg shadow-emerald-500/20">
                <Heart className="h-4 w-4" fill="white" />
                <span>Join 25,000+ Registered Donors</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight tracking-tight">
                Give Life,
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-green-600">
                  Beyond Life
                </span>
                The Ultimate Gift
              </h1>

              <p className="mt-4 sm:mt-6 text-lg text-gray-600 max-w-xl leading-relaxed">
                Organ donation is the greatest gift of life. One donor can save up to 8 lives 
                and improve the quality of life for 75+ people through tissue donation.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-8">
                <div className="bg-white p-4 rounded-xl shadow-sm border border-emerald-100">
                  <div className="flex items-center gap-2">
                    <User className="h-5 w-5 text-emerald-600" />
                    <span className="text-2xl font-bold text-gray-900">25K+</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">Registered Donors</p>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm border border-green-100">
                  <div className="flex items-center gap-2">
                    <Activity className="h-5 w-5 text-green-600" />
                    <span className="text-2xl font-bold text-gray-900">8 Lives</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">Can Be Saved</p>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm border border-emerald-100 col-span-2 sm:col-span-1">
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-emerald-600" />
                    <span className="text-2xl font-bold text-gray-900">115K+</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">On Waiting List</p>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mt-10">
                <button className="group relative bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg shadow-emerald-500/25 hover:shadow-xl hover:shadow-emerald-500/30 transition-all duration-300 transform hover:-translate-y-0.5">
                  <span className="flex items-center justify-center gap-2">
                    Register as Donor
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                </button>

                <button className="group flex items-center justify-center gap-3 px-8 py-4 bg-white text-gray-700 rounded-xl font-medium border-2 border-gray-200 hover:border-emerald-300 hover:bg-emerald-50 transition-all duration-300">
                  <Calendar className="h-5 w-5 text-emerald-600 group-hover:text-emerald-700" />
                  <span>Learn More</span>
                </button>
              </div>

              {/* Trust Badges */}
              <div className="mt-12">
                <p className="text-sm text-gray-500 mb-4">Supported by leading medical institutions</p>
                <div className="flex flex-wrap gap-4 items-center">
                  <div className="h-8 text-gray-400">🏥</div>
                  <div className="h-8 text-gray-400">🏛️</div>
                  <div className="h-8 text-gray-400">⚕️</div>
                  <div className="h-8 text-gray-400">🌐</div>
                  <div className="text-sm text-gray-500 font-medium">+ 15 more</div>
                </div>
              </div>
            </div>

            {/* Right Image */}
            <div className="relative order-1 lg:order-2 lg:h-full">
              {/* Main Card */}
              <div className="relative bg-gradient-to-br from-white to-emerald-50 rounded-3xl shadow-2xl shadow-emerald-500/10 p-6 lg:p-8 overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-emerald-100/50 to-green-100/30 rounded-full -translate-y-32 translate-x-32"></div>
                
                {/* Main Image */}
                <div className="relative z-10">
                  <img
                    src="https://www.sakraworldhospital.com/assets/spl_splimgs/organ-donation-2020-1.webp"
                    alt="Organ Donation Hero"
                    className="w-full h-auto rounded-2xl shadow-lg object-cover"
                  />
                </div>

                {/* Floating Urgent Card */}
                {/* <div className="absolute bottom-6 left-6 right-6 bg-gradient-to-r from-emerald-700 to-green-700 text-white rounded-2xl p-4 shadow-xl shadow-emerald-600/25 transform hover:-translate-y-1 transition-transform duration-300">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
                        <AlertCircle className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="font-bold text-lg">Critical Need</p>
                        <p className="text-sm text-white/90">Kidney & Liver Patients Waiting</p>
                      </div>
                    </div>
                    <button className="bg-white text-emerald-700 hover:bg-gray-100 px-4 py-2 rounded-lg font-semibold text-sm transition-colors">
                      Learn More
                    </button>
                  </div>
                </div> */}

                {/* Floating Stats Card */}
                <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                      <Activity className="h-6 w-6 text-emerald-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900">75+</p>
                      <p className="text-sm text-gray-600">Can Be Helped</p>
                    </div>
                  </div>
                </div>

                {/* Floating Donor Card */}
                {/* <div className="absolute top-1/4 -left-4 bg-white rounded-xl p-4 shadow-lg transform hover:-translate-x-1 transition-transform duration-300">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <img
                        src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
                        alt="Donor"
                        className="w-12 h-12 rounded-full object-cover border-2 border-white shadow"
                      />
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white"></div>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Sarah L.</p>
                      <p className="text-sm text-gray-600">Registered Donor</p>
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
              <div className="relative bg-gradient-to-br from-white to-emerald-50 rounded-3xl shadow-xl shadow-emerald-500/10 p-4 overflow-hidden">
                <img
                  src="https://mahaarogyasamvadiec.in/wp-content/uploads/2024/05/WhatsApp-Image-2024-05-31-at-16.12.07.jpeg"
                  alt="Why Organ Donation"
                  className="w-full h-auto rounded-2xl shadow-lg"
                />
                
                {/* Floating Card */}
                <div className="absolute -bottom-4 -right-4 bg-white rounded-2xl shadow-xl p-6 max-w-xs">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-green-500 rounded-xl flex items-center justify-center">
                      <Shield className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">100% Legal</p>
                      <p className="text-sm text-gray-600">Medical & Ethical</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Content Section */}
            <div className="order-1 lg:order-2">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium mb-6">
                <Target className="h-4 w-4" />
                <span>The Gift of Life</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
                Why Organ
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-green-600">
                  Donation?
                </span>
              </h2>

              <p className="mt-4 text-lg text-gray-600">
                Organ donation is a selfless act that saves lives and gives hope. 
                It's the ultimate humanitarian gesture that creates a lasting legacy.
              </p>

              {/* Key Points */}
              <div className="space-y-6 mt-8">
                {[
                  {
                    icon: LifeBuoy,
                    title: "Save Multiple Lives",
                    desc: "One donor can save up to 8 lives through organ donation"
                  },
                  {
                    icon: Leaf,
                    title: "Leave a Legacy",
                    desc: "Create a lasting impact that lives on in others"
                  },
                  {
                    icon: User,
                    title: "Transform Families",
                    desc: "Give hope to patients and their loved ones"
                  },
                  {
                    icon: Globe,
                    title: "Medical Advancement",
                    desc: "Contribute to medical research and innovation"
                  }
                ].map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div key={idx} className="flex items-start gap-4 p-4 bg-white rounded-xl border border-gray-100 hover:border-emerald-200 transition-colors">
                      <div className="w-12 h-12 bg-emerald-50 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon className="h-6 w-6 text-emerald-600" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900">{item.title}</h3>
                        <p className="text-gray-600 mt-1">{item.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <button className="mt-10 group flex items-center gap-2 text-emerald-600 font-semibold text-lg hover:text-emerald-700 transition-colors">
                Learn More About Benefits
                <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ================= HOW IT WORKS SECTION ================= */}
      <section className="py-16 md:py-24 lg:py-32 bg-gradient-to-b from-white to-emerald-50 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-600 to-green-600 rounded-full text-white text-sm font-medium mb-6">
              <RefreshCw className="h-4 w-4" />
              <span>Simple Registration Process</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Registering as an organ donor is simple and can be done at any time. 
              Your decision today can save lives tomorrow.
            </p>
          </div>

          {/* Steps */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mt-12 lg:mt-20">
            {[
              {
                number: "01",
                title: "Register Your Decision",
                desc: "Sign up online or at government centers",
                icon: User
              },
              {
                number: "02",
                title: "Inform Family",
                desc: "Share your decision with loved ones",
                icon: User
              },
              {
                number: "03",
                title: "Medical Record",
                desc: "Your decision is recorded legally",
                icon: Shield
              },
              {
                number: "04",
                title: "Live Your Life",
                desc: "Continue normally, be a potential lifesaver",
                icon: Award
              }
            ].map((step, idx) => {
              const Icon = step.icon;
              return (
                <div key={idx} className="group relative">
                  {/* Connecting Line (Desktop) */}
                  {idx < 3 && (
                    <div className="hidden lg:block absolute top-12 left-3/4 w-full h-0.5 bg-gradient-to-r from-emerald-200 to-green-200 group-hover:from-emerald-400 group-hover:to-green-400 transition-colors z-0"></div>
                  )}

                  <div className="relative bg-white rounded-2xl shadow-lg border border-gray-100 p-6 lg:p-8 transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-2 group-hover:border-emerald-200 z-10">
                    {/* Step Number */}
                    <div className="absolute -top-4 -left-4 w-16 h-16 bg-gradient-to-r from-emerald-600 to-green-600 rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                      {step.number}
                    </div>

                    {/* Icon */}
                    <div className="mb-6 pt-4">
                      <div className="w-14 h-14 bg-emerald-50 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Icon className="h-7 w-7 text-emerald-600" />
                      </div>
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                    <p className="text-gray-600">{step.desc}</p>

                    {/* Arrow */}
                    <div className="mt-6 opacity-0 group-hover:opacity-100 transition-opacity">
                      <ArrowRight className="h-5 w-5 text-emerald-600" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* CTA */}
          <div className="text-center mt-16">
            <button className="group bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg shadow-emerald-500/25 hover:shadow-xl hover:shadow-emerald-500/30 transition-all duration-300 inline-flex items-center gap-2">
              Register as Organ Donor
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <p className="text-sm text-gray-500 mt-4">Your decision today can save lives tomorrow</p>
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
              Stories of
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-green-600">
                Hope & Gratitude
              </span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Hear from donor families and recipients whose lives have been forever changed 
              by the gift of organ donation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 lg:mt-20">
            {[
              {
                quote: "My daughter's organs saved 4 lives. Knowing that part of her lives on brings us immense comfort during our grief. She continues to help others even now.",
                name: "Michael Chen",
                role: "Donor Father",
                impact: "Saved 4 Lives",
                image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
              },
              {
                quote: "After 3 years on dialysis, a kidney transplant gave me my life back. I can play with my grandchildren again. Thank you to my anonymous donor's family.",
                name: "Maria Rodriguez",
                role: "Kidney Recipient",
                impact: "4 Years Transplant",
                image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
              }
            ].map((testimonial, idx) => (
              <div key={idx} className="group relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-green-500 rounded-3xl blur opacity-20 group-hover:opacity-30 transition-opacity"></div>
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
                        <div className="px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-sm font-medium">
                          {testimonial.impact}
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
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-700 via-emerald-600 to-green-600"></div>
            <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-br from-white/10 to-transparent rounded-full -translate-y-1/3 translate-x-1/3 blur-3xl"></div>
            
            <div className="relative p-8 md:p-12 lg:p-16 text-white">
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium mb-6">
                    <Activity className="h-4 w-4" fill="white" />
                    <span>Join the Life-Giving Movement</span>
                  </div>

                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
                    Ready to Give
                    <span className="block">The Ultimate Gift?</span>
                  </h2>
                  <p className="text-lg text-emerald-100 mb-8 max-w-lg">
                    Your decision to become an organ donor can save multiple lives 
                    and create a lasting legacy of hope and healing.
                  </p>

                  {/* Quick Stats */}
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                      <p className="text-2xl font-bold">8 Lives</p>
                      <p className="text-sm text-emerald-200">Can Be Saved</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                      <p className="text-2xl font-bold">75+ People</p>
                      <p className="text-sm text-emerald-200">Can Be Helped</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                  <h3 className="text-2xl font-bold mb-6">Take Action Today</h3>
                  <div className="space-y-4">
                    <button className="w-full bg-white text-emerald-700 hover:bg-gray-100 px-6 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2">
                      <Activity className="h-5 w-5" />
                      Register as Donor
                    </button>
                    <button className="w-full bg-transparent border-2 border-white text-white hover:bg-white/10 px-6 py-4 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center justify-center gap-2">
                      <Stethoscope className="h-5 w-5" />
                      Learn About Process
                    </button>
                    <button className="w-full bg-transparent text-white hover:text-emerald-100 px-6 py-3 rounded-xl font-medium transition-colors flex items-center justify-center gap-2">
                      <Phone className="h-4 w-4" />
                      Support: 1800-ORGAN-HELP
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
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-green-600">
                Answered
              </span>
            </h2>
            <p className="text-lg text-gray-600">
              Everything you need to know about organ donation
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                question: "Who can be an organ donor?",
                answer: "Anyone can register regardless of age or medical history. Medical professionals determine suitability at time of donation."
              },
              {
                question: "Does organ donation disfigure the body?",
                answer: "No. Organ donation is a surgical procedure performed with the same care as any surgery. Open-casket funerals are possible."
              },
              {
                question: "Will my family be charged?",
                answer: "No. All costs related to organ donation are covered by the transplant program, not the donor's family."
              },
              {
                question: "Does my religion support organ donation?",
                answer: "Most major religions support organ donation as an act of charity and saving lives."
              },
              {
                question: "Can I change my mind after registering?",
                answer: "Yes. You can update or withdraw your donor registration at any time."
              }
            ].map((faq, idx) => (
              <div key={idx} className="group bg-white rounded-2xl border border-gray-200 hover:border-emerald-300 transition-all duration-300 hover:shadow-lg overflow-hidden">
                <button className="w-full text-left p-6 flex items-center justify-between hover:bg-emerald-50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="font-bold text-emerald-700">{idx + 1}</span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">{faq.question}</h3>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-emerald-600 group-hover:rotate-90 transition-transform" />
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
              <span>Need Help? Call our Donor Support: 1800-ORGAN-HELP</span>
            </div>
          </div>
        </div>
      </section>

      {/* ================= DONOR REGISTRY INFO ================= */}
      <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-emerald-50">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-3xl shadow-xl border border-emerald-100 p-8 md:p-12">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-emerald-600" />
                </div>
                <h3 className="font-bold text-gray-900 text-lg mb-2">Legal Protection</h3>
                <p className="text-gray-600 text-sm">Your decision is legally binding and protected</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="h-8 w-8 text-emerald-600" />
                </div>
                <h3 className="font-bold text-gray-900 text-lg mb-2">Family Support</h3>
                <p className="text-gray-600 text-sm">We guide families through the entire process</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-emerald-600" />
                </div>
                <h3 className="font-bold text-gray-900 text-lg mb-2">Medical Oversight</h3>
                <p className="text-gray-600 text-sm">All procedures follow strict medical guidelines</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OrganHeroSection;