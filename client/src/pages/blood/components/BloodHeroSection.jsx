import React, { useState, useEffect } from 'react';
import { 
  Heart, 
  Droplets, 
  ArrowRight, 
  MapPin,
  Shield,
  Clock,
  Users,
  Sparkles,
  ChevronRight,
  Zap,
  AlertCircle
} from 'lucide-react';

const BloodHeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [bloodDropPosition, setBloodDropPosition] = useState(0);
  const [pulse, setPulse] = useState(false);

  // Initialize animations
  useEffect(() => {
    setIsVisible(true);
    
    // Animate blood drop
    const dropInterval = setInterval(() => {
      setBloodDropPosition(prev => {
        if (prev >= 100) return 0;
        return prev + 10;
      });
    }, 300);

    // Pulse animation
    const pulseInterval = setInterval(() => {
      setPulse(prev => !prev);
    }, 1500);

    return () => {
      clearInterval(dropInterval);
      clearInterval(pulseInterval);
    };
  }, []);

  const stats = [
    { value: '36,000', label: 'Units Needed Daily', icon: AlertCircle, color: 'text-rose-500' },
    { value: 'Every 2 sec', label: 'Someone Needs Blood', icon: Clock, color: 'text-amber-500' },
    { value: '3', label: 'Lives Per Donation', icon: Users, color: 'text-emerald-500' },
    { value: '45 min', label: 'Donation Time', icon: Shield, color: 'text-blue-500' }
  ];

  const donationCenters = [
    { name: 'City Blood Bank', distance: '1.2 km', availability: 'Open Now' },
    { name: 'Community Hospital', distance: '2.5 km', availability: 'Open Now' },
    { name: 'Red Cross Center', distance: '3.8 km', availability: 'Open until 8 PM' }
  ];

  return (
    <section className="relative min-h-screen lg:min-h-[90vh] bg-gradient-to-b from-white to-rose-50/30 overflow-hidden">
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Blood Drops */}
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute text-rose-200/20"
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 20}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + Math.random() * 3}s`
            }}
          >
            <Droplets className="h-12 w-12" fill="currentColor" />
          </div>
        ))}
        
        {/* Animated Falling Blood Drop */}
        <div
          className="absolute left-1/2 transform -translate-x-1/2"
          style={{
            top: `${bloodDropPosition}%`,
            opacity: bloodDropPosition > 90 ? 0 : 1,
            transition: 'top 0.3s linear, opacity 0.3s'
          }}
        >
          <div className="relative">
            <Droplets className="h-8 w-8 text-rose-500" fill="#f43f5e" />
            <div className="absolute inset-0 bg-rose-500 rounded-full blur-sm animate-pulse"></div>
          </div>
        </div>
        
        {/* Gradient Orbs */}
        <div className="absolute top-1/4 -right-20 w-64 h-64 bg-gradient-to-r from-rose-200/20 to-pink-200/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 -left-20 w-64 h-64 bg-gradient-to-r from-rose-100/10 to-red-100/5 rounded-full blur-3xl"></div>
      </div>

      {/* Main Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 lg:pt-28 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Column - Text Content */}
          <div className={`space-y-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            
            {/* Trust Badge */}
            <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-rose-100 shadow-sm">
              <Sparkles className="h-4 w-4 text-rose-500" />
              <span className="text-sm font-medium text-gray-700">Trusted by 50K+ Donors</span>
              <div className="flex -space-x-2">
                {[1,2,3].map((i) => (
                  <div key={i} className="w-6 h-6 rounded-full bg-gradient-to-r from-rose-400 to-rose-300 border-2 border-white"></div>
                ))}
              </div>
            </div>

            {/* Main Headline */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
                <span className="block text-gray-900">Donate Blood,</span>
                <span className="block bg-gradient-to-r from-rose-600 via-rose-500 to-rose-400 bg-clip-text text-transparent">
                  Save Lives
                </span>
              </h1>
              
              {/* Subtext */}
              <p className="text-lg sm:text-xl text-gray-600 max-w-xl leading-relaxed">
                Every 2 seconds, someone needs blood. Your single donation can save up to 
                <span className="font-semibold text-rose-500"> 3 lives</span>. Join our community of everyday heroes today.
              </p>
            </div>

            {/* Emergency Alert */}
            <div className="bg-gradient-to-r from-rose-50 to-pink-50 rounded-2xl p-4 border border-rose-100">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-rose-100 rounded-lg">
                  <AlertCircle className="h-5 w-5 text-rose-600" />
                </div>
                <div>
                  <div className="font-bold text-gray-900">URGENT NEED</div>
                  <div className="text-rose-600 font-semibold">O- blood type critically low</div>
                  <div className="text-sm text-gray-600 mt-1">Immediate donations needed</div>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              {/* Primary CTA - Donate Now */}
              <button className="group relative px-8 py-4 bg-gradient-to-r from-rose-500 to-rose-400 text-white rounded-2xl font-semibold text-lg shadow-xl shadow-rose-200 hover:shadow-2xl hover:shadow-rose-300 transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center space-x-2">
                <div className="absolute inset-0 bg-gradient-to-r from-rose-600 to-rose-500 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <Droplets className="h-6 w-6 relative z-10" />
                <span className="relative z-10">Donate Now</span>
                <ArrowRight className="h-5 w-5 relative z-10 group-hover:translate-x-1 transition-transform" />
                
                {/* Pulse Effect */}
                <div className={`absolute inset-0 rounded-2xl border-2 border-rose-300 transition-all duration-1000 ${
                  pulse ? 'scale-110 opacity-20' : 'scale-100 opacity-0'
                }`}></div>
              </button>

              {/* Secondary CTA - Find Blood */}
              <button className="group px-8 py-4 bg-white text-gray-800 rounded-2xl font-semibold text-lg border-2 border-rose-100 hover:border-rose-300 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center space-x-2">
                <MapPin className="h-5 w-5 text-rose-500" />
                <span>Find Blood</span>
                <ChevronRight className="h-5 w-5 text-rose-500 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
              {stats.map((stat, idx) => (
                <div key={idx} className={`bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`} 
                     style={{ transitionDelay: `${idx * 100}ms` }}>
                  <div className="flex items-center space-x-2">
                    <div className={`p-2 rounded-lg ${stat.color.replace('text-', 'bg-')}/10`}>
                      <stat.icon className={`h-5 w-5 ${stat.color}`} />
                    </div>
                    <div>
                      <div className="text-xl font-bold text-gray-900">{stat.value}</div>
                      <div className="text-sm text-gray-600">{stat.label}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Visual Element */}
          <div className={`relative ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            
            {/* Main Illustration Container */}
            <div className="relative max-w-lg mx-auto">
              
              {/* Floating Emergency Card */}
              <div className="absolute -top-6 -left-6 z-20">
                <div className="bg-white p-6 rounded-2xl shadow-2xl border border-rose-100 animate-float-slow">
                  <div className="flex items-center space-x-3">
                    <div className="p-3 bg-rose-50 rounded-xl">
                      <Zap className="h-6 w-6 text-rose-500" />
                    </div>
                    <div>
                      <div className="font-bold text-gray-900">Emergency Ready</div>
                      <div className="text-sm text-gray-600">24/7 Blood Supply</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Impact Card */}
              <div className="absolute -bottom-6 -right-6 z-20">
                <div className="bg-white p-6 rounded-2xl shadow-2xl border border-emerald-100 animate-float-delayed">
                  <div className="flex items-center space-x-3">
                    <div className="p-3 bg-emerald-50 rounded-xl">
                      <Users className="h-6 w-6 text-emerald-500" />
                    </div>
                    <div>
                      <div className="font-bold text-gray-900">3 Lives</div>
                      <div className="text-sm text-gray-600">Per Donation</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Central Heart Illustration */}
              <div className="relative bg-gradient-to-br from-white to-rose-50/50 rounded-3xl p-8 shadow-2xl border border-rose-100/50 backdrop-blur-sm overflow-hidden">
                
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-0 left-0 w-full h-full">
                    <Heart className="w-full h-full text-rose-200" fill="currentColor" />
                  </div>
                </div>

                {/* Animated Heart with Blood Drop */}
                <div className="relative z-10 flex flex-col items-center justify-center py-12">
                  
                  {/* Pulsing Rings */}
                  <div className="absolute w-56 h-56 border-2 border-rose-200/30 rounded-full animate-pulse-slow"></div>
                  <div className="absolute w-64 h-64 border-2 border-rose-300/20 rounded-full animate-pulse-slower"></div>
                  
                  {/* Heart Container */}
                  <div className="relative">
                    
                    {/* Glow Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-rose-500 to-rose-400 rounded-full blur-xl opacity-30 animate-pulse"></div>
                    
                    {/* Heart with Blood Drop */}
                    <div className="relative bg-gradient-to-r from-rose-500 to-rose-400 w-48 h-48 rounded-3xl flex items-center justify-center shadow-2xl shadow-rose-300/50">
                      <Heart className="h-32 w-32 text-white" fill="white" />
                      
                      {/* Animated Blood Drop */}
                      <div className="absolute top-4 right-4 animate-bounce-slow">
                        <div className="relative">
                          <Droplets className="h-10 w-10 text-white" fill="white" />
                          <div className="absolute inset-0 bg-white rounded-full blur-sm"></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Connection Dots */}
                  <div className="flex items-center justify-center mt-12 space-x-6">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex flex-col items-center">
                        <div className={`w-10 h-10 rounded-full ${i === 2 ? 'bg-gradient-to-r from-rose-500 to-rose-400' : 'bg-gray-300'} flex items-center justify-center shadow-lg`}>
                          {i === 2 ? (
                            <Users className="h-5 w-5 text-white" />
                          ) : (
                            <Heart className="h-5 w-5 text-gray-500" />
                          )}
                        </div>
                        <div className="h-6 w-0.5 bg-gradient-to-b from-rose-300 to-transparent mt-2"></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Nearby Centers */}
            <div className="mt-8 bg-white rounded-2xl border border-gray-100 p-6 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-gray-900">Nearby Donation Centers</h3>
                <span className="text-sm text-rose-600 font-medium">3 available</span>
              </div>
              
              <div className="space-y-3">
                {donationCenters.map((center, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-medium text-gray-900">{center.name}</div>
                      <div className="text-sm text-gray-600">{center.distance} away</div>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                      center.availability.includes('Open') 
                        ? 'bg-emerald-100 text-emerald-700'
                        : 'bg-amber-100 text-amber-700'
                    }`}>
                      {center.availability}
                    </div>
                  </div>
                ))}
              </div>
              
              <button className="w-full mt-4 py-3 bg-rose-50 text-rose-600 font-medium rounded-lg hover:bg-rose-100 transition-colors flex items-center justify-center space-x-2">
                <MapPin className="h-5 w-5" />
                <span>View All Centers</span>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Quick Actions */}
        <div className="lg:hidden mt-12">
          <div className="grid grid-cols-2 gap-4">
            <button className="p-4 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-rose-50 rounded-lg">
                  <Clock className="h-5 w-5 text-rose-500" />
                </div>
                <div>
                  <div className="font-medium text-gray-900">Book Slot</div>
                  <div className="text-sm text-gray-600">Quick appointment</div>
                </div>
              </div>
            </button>
            
            <button className="p-4 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <Shield className="h-5 w-5 text-blue-500" />
                </div>
                <div>
                  <div className="font-medium text-gray-900">Eligibility</div>
                  <div className="text-sm text-gray-600">Check if you can donate</div>
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="flex flex-col items-center space-y-2">
            <div className="text-xs text-gray-500 font-medium">Scroll to learn more</div>
            <div className="w-6 h-10 border-2 border-rose-200 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-gradient-to-b from-rose-400 to-rose-300 rounded-full mt-2 animate-scroll"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Animations */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          33% { transform: translateY(-10px) translateX(5px); }
          66% { transform: translateY(5px) translateX(-5px); }
        }
        
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
        
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.05); }
        }
        
        @keyframes pulse-slower {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(1.1); }
        }
        
        @keyframes scroll {
          0% { transform: translateY(0); opacity: 1; }
          100% { transform: translateY(10px); opacity: 0; }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: float-delayed 10s ease-in-out infinite;
        }
        
        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        
        .animate-pulse-slower {
          animation: pulse-slower 6s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        
        .animate-scroll {
          animation: scroll 2s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default BloodHeroSection;