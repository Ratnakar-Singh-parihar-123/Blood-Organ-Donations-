import React from "react";
import { PlayCircle, Shield, Star, Calendar, Users, Clock, Phone, Heart, Droplets, Activity } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-b from-blue-50 via-white to-white overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-br from-blue-100/30 to-emerald-100/20 rounded-full -translate-y-1/3 translate-x-1/3 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-blue-50/30 to-emerald-100/20 rounded-full translate-y-1/3 -translate-x-1/3 blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          
          {/* RIGHT ILLUSTRATION - FIRST ON MOBILE */}
          <div className="relative order-first lg:order-last lg:h-full">
            {/* Main Card */}
            <div className="relative bg-gradient-to-br from-white to-blue-50 rounded-3xl shadow-2xl shadow-blue-500/10 p-4 sm:p-6 lg:p-8 overflow-hidden">
              {/* Background Pattern */}
              <div className="absolute top-0 right-0 w-48 sm:w-64 h-48 sm:h-64 bg-gradient-to-br from-blue-100/50 to-emerald-100/30 rounded-full -translate-y-20 sm:-translate-y-32 translate-x-20 sm:translate-x-32"></div>

              {/* Healthcare Image */}
              <div className="relative z-10">
                <img
                  src="https://png.pngtree.com/png-clipart/20250223/original/pngtree-group-of-doctors-representing-teamwork-in-healthcare-services-png-image_20497070.png"
                  alt="Healthcare Professional"
                  className="w-full h-auto rounded-2xl shadow-lg object-cover"
                />
              </div>

              {/* Floating Emergency Card */}
              <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 bg-gradient-to-r from-red-600 to-rose-600 text-white rounded-2xl p-3 sm:p-4 shadow-xl shadow-red-500/25 transform hover:-translate-y-1 transition-transform duration-300">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
                      <Phone className="h-4 w-4 sm:h-6 sm:w-6" />
                    </div>
                    <div>
                      <p className="font-bold text-sm sm:text-lg">Emergency Hotline</p>
                      <p className="text-xs sm:text-sm text-white/90">Call 108 - 24/7 Available</p>
                    </div>
                  </div>
                  <button className="bg-white text-red-600 hover:bg-gray-100 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg font-semibold text-xs sm:text-sm transition-colors whitespace-nowrap">
                    Call Now
                  </button>
                </div>
              </div>

              {/* Floating Stats Card */}
              <div className="absolute top-4 sm:top-6 right-4 sm:right-6 bg-white/90 backdrop-blur-sm rounded-xl p-3 sm:p-4 shadow-lg">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-8 h-8 sm:w-12 sm:h-12 bg-emerald-100 rounded-lg sm:rounded-xl flex items-center justify-center">
                    <Clock className="h-4 w-4 sm:h-6 sm:w-6 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-lg sm:text-2xl font-bold text-gray-900">15 min</p>
                    <p className="text-xs sm:text-sm text-gray-600">Avg. Response</p>
                  </div>
                </div>
              </div>

              {/* Floating Donor Card */}
              <div className="absolute top-1/4 -left-2 sm:-left-4 bg-white rounded-xl p-3 shadow-lg transform hover:-translate-x-1 transition-transform duration-300">
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <div className="w-8 h-8 sm:w-12 sm:h-12 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center">
                      <Heart className="h-4 w-4 sm:h-5 sm:w-5 text-white" fill="white" />
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-green-500 rounded-full border-2 border-white"></div>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-xs sm:text-sm">Active Donor</p>
                    <p className="text-xs text-gray-600">3 Lives Saved</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Floating Elements */}
            <div className="absolute -bottom-3 -right-3 sm:-bottom-4 sm:-right-4 w-20 h-20 sm:w-32 sm:h-32 bg-gradient-to-tr from-blue-100 to-emerald-100 rounded-2xl -rotate-12 opacity-70"></div>
            <div className="absolute -bottom-4 -left-2 sm:-bottom-6 sm:-left-4 w-16 h-16 sm:w-24 sm:h-24 bg-gradient-to-tr from-emerald-100 to-blue-100 rounded-xl rotate-12 opacity-60"></div>
          </div>

          {/* LEFT CONTENT - SECOND ON MOBILE */}
          <div className="relative z-10 order-last lg:order-first">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-emerald-600 rounded-full text-white text-sm font-medium mb-6 shadow-lg shadow-blue-500/20">
              <Shield className="h-4 w-4" />
              <span>Trusted by Donors & Hospitals Across India</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight tracking-tight">
              Saving Lives Through
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-600">
                Blood & Organ Donation
              </span>
            </h1>

            {/* Description */}
            <p className="mt-4 sm:mt-6 text-base sm:text-lg text-gray-600 max-w-xl leading-relaxed">
              Connect blood and organ donors with patients in need, raise emergency requests, 
              find nearby hospitals, and help save lives through one secure and reliable platform.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4 mt-6 sm:mt-8">
              <div className="bg-white p-3 sm:p-4 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center gap-1 sm:gap-2">
                  <Users className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
                  <span className="text-lg sm:text-2xl font-bold text-gray-900">50K+</span>
                </div>
                <p className="text-xs sm:text-sm text-gray-500 mt-1">Active Donors</p>
              </div>
              <div className="bg-white p-3 sm:p-4 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center gap-1 sm:gap-2">
                  <Heart className="h-4 w-4 sm:h-5 sm:w-5 text-emerald-600" fill="currentColor" />
                  <span className="text-lg sm:text-2xl font-bold text-gray-900">1K+</span>
                </div>
                <p className="text-xs sm:text-sm text-gray-500 mt-1">Lives Saved</p>
              </div>
              <div className="bg-white p-3 sm:p-4 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center gap-1 sm:gap-2">
                  <Star className="h-4 w-4 sm:h-5 sm:w-5 text-amber-500" fill="currentColor" />
                  <span className="text-lg sm:text-2xl font-bold text-gray-900">4.9</span>
                </div>
                <p className="text-xs sm:text-sm text-gray-500 mt-1">Avg Rating</p>
              </div>
            </div>

            {/* Quick Features */}
            <div className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-xl border border-blue-100">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                  <Droplets className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">Blood Donation</p>
                  <p className="text-xs text-gray-600">Find donors instantly</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-emerald-50 rounded-xl border border-emerald-100">
                <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center">
                  <Activity className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">Organ Donation</p>
                  <p className="text-xs text-gray-600">Register as donor</p>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-8 sm:mt-10">
              <button className="group relative bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-xl font-semibold text-base sm:text-lg shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 transform hover:-translate-y-0.5">
                <span className="flex items-center justify-center gap-2">
                  Start Saving Lives
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </button>

              <button className="group flex items-center justify-center gap-2 sm:gap-3 px-6 py-3 sm:px-8 sm:py-4 bg-white text-gray-700 rounded-xl font-medium border-2 border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-300">
                <PlayCircle className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 group-hover:text-blue-700" />
                <span className="text-sm sm:text-base">Watch Demo (3 min)</span>
              </button>
            </div>

            {/* Trust Badges */}
            <div className="mt-8 sm:mt-12">
              <p className="text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4">Trusted by leading hospitals & NGOs</p>
              <div className="flex flex-wrap gap-3 sm:gap-6 items-center">
                <div className="h-6 sm:h-8 text-gray-400">🏥</div>
                <div className="h-6 sm:h-8 text-gray-400">🔬</div>
                <div className="h-6 sm:h-8 text-gray-400">⚕️</div>
                <div className="h-6 sm:h-8 text-gray-400">🏛️</div>
                <div className="text-xs sm:text-sm text-gray-500 font-medium">+ 15 more</div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0 hidden lg:block">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full">
          <path fill="#ffffff" fillOpacity="1" d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"></path>
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;