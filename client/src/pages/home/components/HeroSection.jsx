import React, { useState, useEffect } from 'react';
import { 
  Heart, 
  Droplets, 
  ChevronRight, 
  Shield,
  Users,
  Clock,
  MapPin,
  Award,
  Search,
  Phone,
  Calendar,
  ArrowRight,
  Star,
  CheckCircle,
  TrendingUp,
  Zap
} from 'lucide-react';

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Initialize visibility
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Handle search
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log('Searching for:', searchQuery);
      // Implement search functionality
    }
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-rose-50 via-white to-blue-50 overflow-hidden">
      
      {/* Background Pattern */}
      <div className="absolute inset-0">
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(#ff6b6b22_1px,transparent_1px)] [background-size:40px_40px]"></div>
        
        {/* Floating elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-rose-100/30 to-pink-100/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-blue-100/20 to-cyan-100/10 rounded-full blur-3xl"></div>
        
        {/* Decorative hearts */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float"
            style={{
              top: `${20 + i * 10}%`,
              left: `${i % 2 === 0 ? 5 : 90}%`,
              animationDelay: `${i * 0.5}s`
            }}
          >
            <Heart className={`h-6 w-6 ${
              i % 3 === 0 ? 'text-rose-300/40' : 
              i % 3 === 1 ? 'text-blue-300/30' : 
              'text-amber-300/30'
            }`} fill="currentColor" />
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 lg:pt-24 pb-12 lg:pb-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Column - Text Content */}
          <div className={`space-y-8 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            
            {/* Trust Badge */}
            <div className="inline-flex items-center gap-3 bg-white px-4 py-2.5 rounded-full shadow-lg border border-gray-100">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-rose-500 to-rose-400 flex items-center justify-center">
                  <Shield className="h-4 w-4 text-white" />
                </div>
                <div className="ml-3">
                  <div className="text-sm font-semibold text-gray-800">Trusted by 50,000+</div>
                  <div className="text-xs text-gray-500">Active donors</div>
                </div>
              </div>
            </div>

            {/* Main Headline */}
            <div className="space-y-6">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight">
                <span className="block text-gray-900">Give Blood,</span>
                <span className="block bg-gradient-to-r from-rose-600 via-rose-500 to-pink-500 bg-clip-text text-transparent">
                  Save Lives
                </span>
              </h1>
              
              {/* Subtext */}
              <p className="text-lg sm:text-xl text-gray-600 max-w-xl leading-relaxed">
                Every drop counts. Join thousands of heroes who donate blood and organs to save lives. 
                Your simple act can give someone a second chance at life.
              </p>
            </div>

            {/* Search Bar */}
            {/* <div className="max-w-xl">
              <form onSubmit={handleSearch} className="relative">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search for blood type, city, or hospital..."
                    className="w-full pl-12 pr-40 py-4 bg-white rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent shadow-lg"
                  />
                  <button
                    type="submit"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 px-6 py-2.5 bg-gradient-to-r from-rose-600 to-rose-500 text-white rounded-lg font-semibold hover:shadow-lg transition-shadow"
                  >
                    Search
                  </button>
                </div>
              </form>
              <p className="text-sm text-gray-500 mt-3 px-2">
                Search for: O+, AB-, Mumbai, Emergency, etc.
              </p>
            </div> */}

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button className="group relative px-8 py-4 bg-gradient-to-r from-rose-600 to-rose-500 text-white rounded-xl font-semibold shadow-xl shadow-rose-200 hover:shadow-2xl hover:shadow-rose-300 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-3">
                <Heart className="h-5 w-5" fill="white" />
                <span>Become a Donor</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button className="px-8 py-4 bg-white text-rose-600 rounded-xl font-semibold border-2 border-rose-200 hover:border-rose-300 hover:bg-rose-50 shadow-lg transition-all duration-300 hover:scale-105 flex items-center justify-center gap-3">
                <Droplets className="h-5 w-5" />
                <span>Find Blood Now</span>
              </button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8">
              {[
                { value: '10K+', label: 'Lives Saved', icon: Users, color: 'bg-rose-500' },
                { value: '24/7', label: 'Support', icon: Clock, color: 'bg-blue-500' },
                { value: '100+', label: 'Cities', icon: MapPin, color: 'bg-emerald-500' },
                { value: '4.9', label: 'Rating', icon: Star, color: 'bg-amber-500' }
              ].map((stat, idx) => (
                <div 
                  key={idx}
                  className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 ${stat.color} rounded-lg flex items-center justify-center`}>
                      <stat.icon className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <div className="text-xl font-bold text-gray-900">{stat.value}</div>
                      <div className="text-sm text-gray-600">{stat.label}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-3 gap-3 pt-6">
              <button className="flex flex-col items-center p-4 bg-white rounded-xl border border-gray-100 hover:border-rose-200 hover:shadow-md transition-all group">
                <div className="w-12 h-12 rounded-lg bg-rose-50 flex items-center justify-center mb-3 group-hover:bg-rose-100">
                  <Phone className="h-6 w-6 text-rose-500" />
                </div>
                <span className="text-sm font-medium text-gray-700">Emergency</span>
                <span className="text-xs text-gray-500 mt-1">Call Now</span>
              </button>
              
              <button className="flex flex-col items-center p-4 bg-white rounded-xl border border-gray-100 hover:border-rose-200 hover:shadow-md transition-all group">
                <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center mb-3 group-hover:bg-blue-100">
                  <Calendar className="h-6 w-6 text-blue-500" />
                </div>
                <span className="text-sm font-medium text-gray-700">Schedule</span>
                <span className="text-xs text-gray-500 mt-1">Appointment</span>
              </button>
              
              <button className="flex flex-col items-center p-4 bg-white rounded-xl border border-gray-100 hover:border-rose-200 hover:shadow-md transition-all group">
                <div className="w-12 h-12 rounded-lg bg-emerald-50 flex items-center justify-center mb-3 group-hover:bg-emerald-100">
                  <TrendingUp className="h-6 w-6 text-emerald-500" />
                </div>
                <span className="text-sm font-medium text-gray-700">Track</span>
                <span className="text-xs text-gray-500 mt-1">Donations</span>
              </button>
            </div>
          </div>

          {/* Right Column - Visual Element */}
          <div className={`relative ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <div className="relative">
              {/* Main Card */}
              <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
                {/* Image Section */}
                <div className="relative h-64 sm:h-80 lg:h-96">
                  <img
                    src="https://www.herzing.edu/sites/default/files/styles/fp_960_480/public/2023-05/iStock-1290139310.jpg.webp?h=f8d7f9a0&itok=7FRYz19N"
                    alt="Blood donation"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  
                  {/* Image Overlay Badge */}
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full flex items-center gap-2 shadow-lg">
                    <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-semibold text-gray-800">Live Updates</span>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6 lg:p-8">
                  <div className="space-y-6">
                    {/* Title */}
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-bold text-gray-900">Urgent Needs</h3>
                      <span className="px-3 py-1 bg-rose-100 text-rose-700 rounded-full text-sm font-semibold">
                        Emergency
                      </span>
                    </div>

                    {/* Blood Types */}
                    <div className="space-y-4">
                      <h4 className="font-semibold text-gray-700">Blood Types Required:</h4>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {['O+', 'O-', 'AB+', 'AB-'].map((type, idx) => (
                          <div 
                            key={idx}
                            className={`p-3 rounded-xl text-center border-2 ${
                              idx === 1 
                                ? 'border-red-300 bg-red-50 text-red-700' 
                                : 'border-gray-100 bg-gray-50 text-gray-700'
                            }`}
                          >
                            <div className="text-lg font-bold">{type}</div>
                            <div className="text-xs text-gray-500 mt-1">Critical</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Hospital Info */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <MapPin className="h-5 w-5 text-gray-400" />
                        <span className="text-gray-700">City Hospital, Mumbai</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Clock className="h-5 w-5 text-gray-400" />
                        <span className="text-gray-700">Within 2 hours</span>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Donors Found:</span>
                        <span className="font-semibold text-rose-600">8/12</span>
                      </div>
                      <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-rose-500 to-rose-400 rounded-full" style={{ width: '67%' }}></div>
                      </div>
                    </div>

                    {/* Action Button */}
                    <button className="w-full py-3 bg-gradient-to-r from-rose-600 to-rose-500 text-white rounded-xl font-semibold hover:shadow-lg transition-shadow flex items-center justify-center gap-2">
                      <Zap className="h-5 w-5" />
                      <span>I Can Help</span>
                    </button>

                    {/* Features List */}
                    <div className="grid grid-cols-2 gap-3 pt-4">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-emerald-500" />
                        <span className="text-sm text-gray-600">Safe Process</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-emerald-500" />
                        <span className="text-sm text-gray-600">Free Checkup</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-emerald-500" />
                        <span className="text-sm text-gray-600">Certificate</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-emerald-500" />
                        <span className="text-sm text-gray-600">Rewards</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 bg-gradient-to-r from-blue-500 to-cyan-400 text-white p-4 rounded-2xl shadow-2xl animate-float-slow">
                <div className="text-center">
                  <div className="text-lg font-bold">450+</div>
                  <div className="text-xs opacity-90">Today's<br/>Donors</div>
                </div>
              </div>

              <div className="absolute -bottom-4 -left-4 bg-gradient-to-r from-emerald-500 to-green-400 text-white p-4 rounded-2xl shadow-2xl animate-float-delayed">
                <div className="text-center">
                  <div className="text-lg font-bold">3 Lives</div>
                  <div className="text-xs opacity-90">Per Donation</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Emergency Banner */}
        <div className={`mt-12 lg:mt-16 bg-gradient-to-r from-rose-50 to-pink-50 rounded-2xl border border-rose-100 shadow-lg transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="p-6 lg:p-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white rounded-xl shadow-sm">
                  <div className="relative">
                    <Heart className="h-6 w-6 text-rose-500" fill="currentColor" />
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Emergency Blood Drive</h3>
                  <p className="text-gray-600">Urgent need across major hospitals. Every donation matters.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <button className="px-6 py-3 bg-rose-600 text-white rounded-xl font-semibold hover:bg-rose-700 transition-colors">
                  Donate Now
                </button>
                <button className="px-6 py-3 bg-white text-rose-600 rounded-xl font-semibold border border-rose-200 hover:bg-rose-50 transition-colors">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="flex flex-col items-center space-y-2">
          <span className="text-sm text-gray-500 font-medium">Scroll to explore</span>
          <div className="w-6 h-10 border-2 border-gray-300 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-gradient-to-b from-rose-400 to-rose-300 rounded-full mt-2 animate-scroll"></div>
          </div>
        </div>
      </div>

      {/* Custom Animations */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-10px) rotate(5deg); }
          66% { transform: translateY(5px) rotate(-5deg); }
        }
        
        @keyframes scroll {
          0% { transform: translateY(0); opacity: 1; }
          100% { transform: translateY(10px); opacity: 0; }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-float-slow {
          animation: float-slow 4s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: float-delayed 6s ease-in-out infinite;
        }
        
        .animate-scroll {
          animation: scroll 2s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default HeroSection;