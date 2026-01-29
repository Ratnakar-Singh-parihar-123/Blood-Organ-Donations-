import React, { useState, useEffect } from 'react';
import { 
  Heart,
  ArrowRight,
  Sparkles,
  Users,
  Shield,
  CheckCircle2,
  Zap,
  Gift,
  ChevronRight,
  Clock,
  Award,
  Star,
  Bell,
  Target,
  TrendingUp
} from 'lucide-react';

const OrganDonationCTA = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [counter, setCounter] = useState(0);
  const [pulse, setPulse] = useState(true);

  // Initialize animations
  useEffect(() => {
    setIsVisible(true);
    
    // Counter animation for impact numbers
    const counterInterval = setInterval(() => {
      setCounter(prev => {
        if (prev >= 106) return 106;
        return prev + 1;
      });
    }, 30);

    // Pulsing animation for CTA button
    const pulseInterval = setInterval(() => {
      setPulse(prev => !prev);
    }, 2000);

    setTimeout(() => {
      clearInterval(counterInterval);
    }, 3500);

    return () => {
      clearInterval(counterInterval);
      clearInterval(pulseInterval);
    };
  }, []);

  const impactStats = [
    {
      value: '8',
      label: 'Lives Saved',
      icon: Users,
      color: 'text-white',
      delay: 0
    },
    {
      value: '75+',
      label: 'Lives Improved',
      icon: Gift,
      color: 'text-rose-100',
      delay: 200
    },
    {
      value: `${counter}K+`,
      label: 'Waiting Now',
      icon: Clock,
      color: 'text-white',
      delay: 400
    },
    {
      value: '22',
      label: 'Die Daily Waiting',
      icon: Target,
      color: 'text-rose-100',
      delay: 600
    }
  ];

  const features = [
    {
      icon: Shield,
      text: '100% Safe & Confidential',
      color: 'text-emerald-300'
    },
    {
      icon: Clock,
      text: '5-Minute Registration',
      color: 'text-blue-300'
    },
    {
      icon: Award,
      text: 'Leave a Lasting Legacy',
      color: 'text-amber-300'
    }
  ];

  const testimonials = [
    {
      text: "Registering as a donor was the most meaningful 5 minutes of my life.",
      name: "Michael R.",
      role: "Registered for 10 years"
    },
    {
      text: "My father saved 3 lives through organ donation. His legacy lives on.",
      name: "Sarah L.",
      role: "Donor family member"
    }
  ];

  return (
    <section className="relative py-20 lg:py-32 overflow-hidden">
      {/* Main Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-rose-600 via-rose-500 to-pink-500">
        
        {/* Animated Elements */}
        <div className="absolute inset-0">
          {/* Floating Hearts */}
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute text-white/10"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.3}s`,
                animationDuration: `${8 + Math.random() * 8}s`
              }}
            >
              <Heart className="h-12 w-12" fill="currentColor" />
            </div>
          ))}
          
          {/* Gradient Orbs */}
          <div className="absolute -top-40 -left-40 w-96 h-96 bg-gradient-to-r from-rose-400/30 to-pink-400/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-gradient-to-r from-pink-400/30 to-rose-400/20 rounded-full blur-3xl"></div>
          
          {/* Pulsing Glow */}
          <div className={`absolute inset-0 bg-gradient-to-r from-rose-500/20 to-pink-500/10 transition-all duration-2000 ${
            pulse ? 'opacity-60' : 'opacity-40'
          }`}></div>
        </div>

        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 25px 25px, rgba(255,255,255,0.2) 2px, transparent 2px)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>
      </div>

      {/* Content Container */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Column - Emotional Content */}
          <div className={`space-y-8 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            
            {/* Premium Badge */}
            <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full border border-white/30">
              <Sparkles className="h-4 w-4 text-white" />
              <span className="text-sm font-medium text-white">Join 2M+ Registered Heroes</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
              <span className="block">Your Decision Can</span>
              <span className="block bg-gradient-to-r from-white to-rose-100 bg-clip-text text-transparent">
                Save Multiple
              </span>
              <span className="block relative">
                Lives
                <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-white via-rose-200 to-white rounded-full"></div>
              </span>
            </h1>

            {/* Emotional Subtext */}
            <p className="text-xl text-white/90 max-w-xl leading-relaxed">
              Every day, 22 people die waiting for an organ transplant. Your single decision to register as a donor 
              could save up to <span className="font-bold text-white">8 lives</span> and improve <span className="font-bold text-white">75+ more</span>.
            </p>

            {/* Impact Stats */}
            <div className="grid grid-cols-2 gap-4">
              {impactStats.map((stat, index) => (
                <div
                  key={index}
                  className={`bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 transition-all duration-500 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                  style={{ transitionDelay: `${stat.delay}ms` }}
                >
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-white/10 rounded-lg">
                      <stat.icon className={`h-5 w-5 ${stat.color}`} />
                    </div>
                    <div>
                      <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
                      <div className="text-sm text-white/80">{stat.label}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Features List */}
            <div className="space-y-3">
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
                  <CheckCircle2 className="h-5 w-5 text-emerald-300" />
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - CTA Card */}
          <div className={`transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
          }`}>
            <div className="bg-white rounded-3xl p-8 lg:p-10 shadow-2xl relative overflow-hidden">
              
              {/* Decorative Corner */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-rose-500 to-pink-500 rounded-bl-full"></div>
              
              {/* Shine Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent"></div>

              {/* Main CTA Content */}
              <div className="relative z-10">
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-rose-500 to-rose-400 rounded-full mb-6 mx-auto relative">
                    <Heart className="h-10 w-10 text-white" fill="white" />
                    
                    {/* Pulsing Ring */}
                    <div className={`absolute inset-0 border-4 border-rose-400 rounded-full transition-all duration-1000 ${
                      pulse ? 'scale-125 opacity-30' : 'scale-100 opacity-20'
                    }`}></div>
                  </div>
                  
                  <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-3">
                    The Most Meaningful
                    <span className="bg-gradient-to-r from-rose-600 to-rose-500 bg-clip-text text-transparent ml-2">
                      5 Minutes
                    </span>
                  </h3>
                  <p className="text-gray-600">
                    Simple registration • Legal protection • Lifesaving impact
                  </p>
                </div>

                {/* Main CTA Button */}
                <button className="group w-full py-5 bg-gradient-to-r from-rose-500 to-rose-400 text-white font-bold text-lg rounded-xl shadow-2xl shadow-rose-300 hover:shadow-3xl hover:shadow-rose-400 transition-all duration-300 hover:scale-105 active:scale-95 relative overflow-hidden mb-6">
                  
                  {/* Shine Effect */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700">
                    <div className="w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
                  </div>
                  
                  <div className="relative flex items-center justify-center space-x-3">
                    <Heart className="h-7 w-7" fill="white" />
                    <span className="text-xl">Become an Organ Donor</span>
                    <ArrowRight className="h-6 w-6 group-hover:translate-x-2 transition-transform" />
                  </div>
                  
                  {/* Floating Badge */}
                  <div className="absolute -top-2 -right-2">
                    <div className="bg-white text-rose-600 text-xs font-bold px-3 py-1 rounded-full shadow-lg animate-bounce">
                      REGISTER NOW
                    </div>
                  </div>
                </button>

                {/* Alternative Options */}
                <div className="space-y-3 mb-8">
                  <button className="w-full py-4 bg-gray-50 text-gray-800 font-medium rounded-lg border-2 border-gray-200 hover:border-rose-300 hover:bg-rose-50 transition-colors flex items-center justify-center space-x-2 group">
                    <Clock className="h-5 w-5 text-gray-500 group-hover:text-rose-500" />
                    <span>Schedule Registration Reminder</span>
                    <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-rose-500 group-hover:translate-x-1 transition-transform" />
                  </button>
                  
                  <button className="w-full py-4 bg-gray-50 text-gray-800 font-medium rounded-lg border-2 border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors flex items-center justify-center space-x-2 group">
                    <Users className="h-5 w-5 text-gray-500 group-hover:text-blue-500" />
                    <span>Discuss with Family First</span>
                  </button>
                </div>

                {/* Trust Indicators */}
                <div className="border-t border-gray-100 pt-6">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <Shield className="h-6 w-6 text-emerald-500 mx-auto mb-1" />
                      <div className="text-xs text-gray-600">100% Secure</div>
                    </div>
                    <div className="text-center border-x border-gray-200">
                      <CheckCircle2 className="h-6 w-6 text-blue-500 mx-auto mb-1" />
                      <div className="text-xs text-gray-600">Legal Protection</div>
                    </div>
                    <div className="text-center">
                      <Star className="h-6 w-6 text-amber-500 mx-auto mb-1" />
                      <div className="text-xs text-gray-600">2M+ Registered</div>
                    </div>
                  </div>
                </div>

                {/* Countdown Timer */}
                <div className="mt-6 bg-rose-50 rounded-xl p-4 text-center">
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <Zap className="h-4 w-4 text-rose-500" />
                    <span className="text-sm font-medium text-rose-700">Live Counter</span>
                  </div>
                  <div className="text-2xl font-bold text-gray-900">
                    {Math.floor((106000 - counter * 1000) / 1000)}:{String(60 - (counter % 60)).padStart(2, '0')}
                  </div>
                  <div className="text-xs text-gray-500">Minutes until next person joins waiting list</div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-gradient-to-r from-rose-400/20 to-pink-400/10 rounded-full blur-xl"></div>
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-r from-rose-300/20 to-pink-300/10 rounded-full blur-xl"></div>
            </div>

            {/* Testimonial Ticker */}
            <div className="mt-6 bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
              <div className="flex items-center space-x-3">
                <TrendingUp className="h-5 w-5 text-white" />
                <div className="flex-1 overflow-hidden">
                  <div className="flex animate-scroll-left">
                    {testimonials.map((testimonial, index) => (
                      <div key={index} className="flex-shrink-0 w-full pr-8">
                        <div className="text-white text-sm italic">"{testimonial.text}"</div>
                        <div className="text-white/70 text-xs mt-1">— {testimonial.name}, {testimonial.role}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Emergency Alert Banner */}
        <div className={`mt-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl p-6 text-white shadow-xl transition-all duration-1000 delay-500 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                <Bell className="h-6 w-6" />
              </div>
              <div>
                <div className="font-bold text-lg">URGENT NATIONAL NEED</div>
                <div className="opacity-90">Kidney and liver shortages at critical levels nationwide</div>
              </div>
            </div>
            
            <button className="px-6 py-3 bg-white text-amber-600 font-bold rounded-full hover:bg-amber-50 transition-colors shadow-lg">
              Respond to Emergency Need
            </button>
          </div>
        </div>

        {/* Bottom Assurance */}
        <div className={`mt-8 flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8 text-white/80 transition-all duration-1000 delay-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="flex items-center space-x-2">
            <Shield className="h-5 w-5" />
            <span>Your registration is confidential and protected</span>
          </div>
          <div className="hidden md:block text-white/40">•</div>
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="h-5 w-5" />
            <span>Can be updated or revoked anytime</span>
          </div>
          <div className="hidden md:block text-white/40">•</div>
          <div className="flex items-center space-x-2">
            <Award className="h-5 w-5" />
            <span>Join a community of 2M+ heroes</span>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="flex flex-col items-center">
            <div className="text-xs text-white/60 font-medium">Share with a friend</div>
            <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center mt-1">
              <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-scroll"></div>
            </div>
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
        
        @keyframes scroll-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-100%);
          }
        }
        
        @keyframes scroll {
          0% {
            transform: translateY(0);
            opacity: 1;
          }
          100% {
            transform: translateY(10px);
            opacity: 0;
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
          }
        }
        
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }
        
        .animate-scroll-left {
          animation: scroll-left 20s linear infinite;
        }
        
        .animate-scroll {
          animation: scroll 2s ease-in-out infinite;
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
        
        .animate-bounce {
          animation: bounce 2s infinite;
        }
        
        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        
        .scroll-container {
          width: 100%;
          overflow: hidden;
        }
        
        .scroll-content {
          display: flex;
          width: 200%;
        }
      `}</style>
    </section>
  );
};

export default OrganDonationCTA;