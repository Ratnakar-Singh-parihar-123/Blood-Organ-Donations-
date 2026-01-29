import React, { useState, useEffect } from 'react';
import { 
  Heart, 
  ArrowRight, 
  Sparkles,
  Users,
  Shield,
  CheckCircle2,
  Zap,
  TrendingUp,
  Clock,
  Award,
  ChevronRight
} from 'lucide-react';

const CTASection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [pulse, setPulse] = useState(true);
  const [counter, setCounter] = useState(0);

  // Counter animation for real-time updates
  useEffect(() => {
    setIsVisible(true);
    
    // Pulsing animation
    const pulseInterval = setInterval(() => {
      setPulse(prev => !prev);
    }, 2000);

    // Counter animation
    const counterInterval = setInterval(() => {
      setCounter(prev => {
        if (prev >= 36) return 36;
        return prev + 1;
      });
    }, 100);

    // Stop counter after animation
    setTimeout(() => {
      clearInterval(counterInterval);
    }, 3600);

    return () => {
      clearInterval(pulseInterval);
      clearInterval(counterInterval);
    };
  }, []);

  const features = [
    {
      icon: Shield,
      text: '100% Safe & Verified',
      color: 'text-emerald-400'
    },
    {
      icon: Clock,
      text: 'Only 45 Minutes',
      color: 'text-blue-400'
    },
    {
      icon: Award,
      text: 'Save 3+ Lives',
      color: 'text-rose-400'
    }
  ];

  const stats = [
    { value: '36,000', label: 'Units Needed Daily', color: 'text-rose-300' },
    { value: '22', label: 'Lives Saved Daily', color: 'text-emerald-300' },
    { value: '106,000+', label: 'Waiting for Organs', color: 'text-amber-300' }
  ];

  return (
    <section className="relative py-20 lg:py-32 overflow-hidden">
      {/* Main Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-rose-600 via-rose-500 to-red-500">
        {/* Animated Elements */}
        <div className="absolute inset-0">
          {/* Floating Hearts */}
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute text-white/5"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${10 + Math.random() * 10}s`
              }}
            >
              <Heart className="h-16 w-16" fill="currentColor" />
            </div>
          ))}
          
          {/* Gradient Orbs */}
          <div className="absolute -top-40 -left-40 w-96 h-96 bg-gradient-to-r from-rose-400/20 to-pink-400/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-gradient-to-r from-red-400/20 to-rose-400/20 rounded-full blur-3xl"></div>
          
          {/* Pulsing Rings */}
          <div className={`absolute inset-0 border-[40px] border-white/5 rounded-3xl transition-all duration-2000 ${
            pulse ? 'scale-105 opacity-30' : 'scale-100 opacity-20'
          }`}></div>
        </div>

        {/* Noise Texture */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
          backgroundSize: '200px'
        }}></div>
      </div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left: Main Content */}
          <div className={`space-y-8 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            
            {/* Premium Badge */}
            <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full border border-white/30">
              <Sparkles className="h-4 w-4 text-white" />
              <span className="text-sm font-medium text-white">Join 50,000+ Life Savers</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
              <span className="block">Your Blood</span>
              <span className="block bg-gradient-to-r from-white to-rose-100 bg-clip-text text-transparent">
                Could Save Someone's
              </span>
              <span className="block relative">
                Tomorrow
                <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-white via-rose-200 to-white rounded-full"></div>
              </span>
            </h1>

            {/* Supportive Message */}
            <p className="text-xl text-white/90 max-w-xl leading-relaxed">
              Every 2 seconds, someone in India needs blood. Your single donation can save up to 
              <span className="font-bold text-white"> 3 lives</span>. Join our community of heroes today.
            </p>

            {/* Features */}
            <div className="space-y-4">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className={`flex items-center space-x-3 opacity-0 animate-fade-in-up`}
                  style={{ animationDelay: `${index * 200}ms`, animationFillMode: 'forwards' }}
                >
                  <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm">
                    <feature.icon className={`h-5 w-5 ${feature.color}`} />
                  </div>
                  <span className="text-white font-medium">{feature.text}</span>
                </div>
              ))}
            </div>

            {/* Stats Counter */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="grid grid-cols-3 gap-4">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className={`text-2xl lg:text-3xl font-bold ${stat.color}`}>
                      {stat.label === 'Units Needed Daily' ? counter : stat.value}
                      {stat.label === 'Units Needed Daily' && <span className="text-white">+</span>}
                    </div>
                    <div className="text-sm text-white/80">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: CTA Card */}
          <div className={`transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
          }`}>
            <div className="bg-white rounded-3xl p-8 lg:p-10 shadow-2xl relative overflow-hidden">
              {/* Decorative Corner */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-rose-500 to-red-500 rounded-bl-full"></div>
              
              {/* Main CTA Content */}
              <div className="relative z-10">
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-rose-500 to-rose-400 rounded-full mb-6 mx-auto relative">
                    <Heart className="h-10 w-10 text-white" fill="white" />
                    
                    {/* Pulsing Ring */}
                    <div className="absolute inset-0 border-4 border-rose-400 rounded-full animate-ping opacity-30"></div>
                  </div>
                  
                  <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-3">
                    Register in
                    <span className="bg-gradient-to-r from-rose-600 to-rose-500 bg-clip-text text-transparent ml-2">
                      2 Minutes
                    </span>
                  </h3>
                  <p className="text-gray-600">
                    Simple registration • Free health check • Instant donor card
                  </p>
                </div>

                {/* CTA Button */}
                <button className="group w-full py-4 bg-gradient-to-r from-rose-500 to-rose-400 text-white font-bold text-lg rounded-xl shadow-2xl shadow-rose-300 hover:shadow-3xl hover:shadow-rose-400 transition-all duration-300 hover:scale-105 active:scale-95 relative overflow-hidden mb-6">
                  {/* Shine Effect */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700">
                    <div className="w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                  </div>
                  
                  <div className="relative flex items-center justify-center space-x-3">
                    <Heart className="h-6 w-6" fill="white" />
                    <span className="text-lg">Register as a Donor</span>
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-2 transition-transform" />
                  </div>
                </button>

                {/* Alternative Options */}
                <div className="space-y-3 mb-8">
                  <button className="w-full py-3 bg-gray-50 text-gray-800 font-medium rounded-lg border-2 border-gray-200 hover:border-rose-300 hover:bg-rose-50 transition-colors flex items-center justify-center space-x-2 group">
                    <Users className="h-5 w-5 text-gray-500 group-hover:text-rose-500" />
                    <span>Find Local Donation Camp</span>
                    <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-rose-500 group-hover:translate-x-1 transition-transform" />
                  </button>
                  
                  <button className="w-full py-3 bg-gray-50 text-gray-800 font-medium rounded-lg border-2 border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors flex items-center justify-center space-x-2 group">
                    <TrendingUp className="h-5 w-5 text-gray-500 group-hover:text-blue-500" />
                    <span>Check Donation Eligibility</span>
                  </button>
                </div>

                {/* Trust Indicators */}
                <div className="border-t border-gray-100 pt-6">
                  <div className="flex items-center justify-center space-x-6">
                    <div className="flex items-center space-x-2">
                      <Shield className="h-5 w-5 text-emerald-500" />
                      <span className="text-sm text-gray-600">100% Secure</span>
                    </div>
                    <div className="h-4 w-px bg-gray-200"></div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle2 className="h-5 w-5 text-blue-500" />
                      <span className="text-sm text-gray-600">Free Health Check</span>
                    </div>
                  </div>
                </div>

                {/* Countdown Timer */}
                <div className="mt-6 bg-rose-50 rounded-xl p-4 text-center">
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <Clock className="h-4 w-4 text-rose-500" />
                    <span className="text-sm font-medium text-rose-700">Live Counter</span>
                  </div>
                  <div className="text-2xl font-bold text-gray-900">
                    {Math.floor(counter / 60)}:{String(counter % 60).padStart(2, '0')}
                  </div>
                  <div className="text-xs text-gray-500">Minutes since last life saved</div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-gradient-to-r from-rose-400/10 to-red-400/10 rounded-full blur-xl"></div>
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-r from-rose-300/10 to-pink-300/10 rounded-full blur-xl"></div>
            </div>

            {/* Emergency Alert */}
            <div className="mt-6 bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl p-4 text-white shadow-lg">
              <div className="flex items-center space-x-3">
                <Zap className="h-5 w-5 animate-pulse" />
                <div className="flex-1">
                  <div className="font-bold">URGENT NEED</div>
                  <div className="text-sm opacity-90">O- blood group critically low nationwide</div>
                </div>
                <button className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium hover:bg-white/30 transition-colors">
                  Respond
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Banner */}
        <div className={`mt-16 bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 max-w-4xl mx-auto transition-all duration-1000 delay-500 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start space-x-2 mb-2">
                <Users className="h-5 w-5 text-white" />
                <span className="text-sm font-medium text-white">Community Impact</span>
              </div>
              <h3 className="text-xl font-bold text-white">Already have 50,000+ active donors</h3>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="flex -space-x-3">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="w-10 h-10 bg-gradient-to-r from-rose-400 to-rose-300 rounded-full border-2 border-white"></div>
                ))}
              </div>
              <div className="text-white">
                <div className="font-bold">4.9/5</div>
                <div className="text-sm opacity-80">Donor Satisfaction</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="flex flex-col items-center">
          <div className="text-xs text-white/60 font-medium">Scroll for more</div>
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center mt-1">
            <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-scroll"></div>
          </div>
        </div>
      </div>

      {/* Custom Animations */}
      <style jsx global>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes scroll {
          0% { transform: translateY(0); opacity: 1; }
          100% { transform: translateY(10px); opacity: 0; }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }
        
        .animate-scroll {
          animation: scroll 2s ease-in-out infinite;
        }
        
        @keyframes pulse-slow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 2s ease-in-out infinite;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </section>
  );
};

export default CTASection;