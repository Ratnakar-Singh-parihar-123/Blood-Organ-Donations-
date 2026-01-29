import React, { useState, useEffect } from 'react';
import { 
  Heart, 
  ArrowRight, 
  Users, 
  Shield,
  Clock,
  Award,
  CheckCircle2,
  Sparkles,
  ChevronRight,
  Zap,
  Leaf,
  Gift
} from 'lucide-react';

const OrganDonationHero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [pulseIndex, setPulseIndex] = useState(0);

  // Initialize animations
  useEffect(() => {
    setIsVisible(true);
    
    // Create pulsing effect for impact numbers
    const interval = setInterval(() => {
      setPulseIndex(prev => (prev + 1) % 4);
    }, 1500);
    
    return () => clearInterval(interval);
  }, []);

  const impactStats = [
    { id: 1, value: '8', label: 'Lives Saved', color: 'text-rose-500', delay: 0 },
    { id: 2, value: '75+', label: 'Lives Improved', color: 'text-emerald-500', delay: 200 },
    { id: 3, value: '106,000+', label: 'Waiting in US', color: 'text-blue-500', delay: 400 },
    { id: 4, value: '22', label: 'Die Daily Waiting', color: 'text-amber-500', delay: 600 }
  ];

  const benefits = [
    { icon: Shield, text: '100% Confidential & Safe', color: 'text-emerald-500' },
    { icon: Clock, text: '5-Minute Registration', color: 'text-blue-500' },
    { icon: Award, text: 'Leave a Lasting Legacy', color: 'text-rose-500' }
  ];

  const steps = [
    { number: '01', title: 'Register', desc: '5-minute online form' },
    { number: '02', title: 'Inform Family', desc: 'Share your decision' },
    { number: '03', title: 'Save Lives', desc: 'Your ultimate gift' }
  ];

  return (
    <section className="relative min-h-screen lg:min-h-[90vh] bg-gradient-to-b from-white to-rose-50/20 overflow-hidden">
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Gradient Orbs */}
        <div className="absolute top-1/4 -left-20 w-64 h-64 bg-gradient-to-r from-rose-200/30 to-pink-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-gradient-to-r from-rose-100/20 to-red-100/10 rounded-full blur-3xl"></div>
        
        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(to right, #f43f5e 1px, transparent 1px),
                              linear-gradient(to bottom, #f43f5e 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 lg:pt-28 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Column - Text Content */}
          <div className={`space-y-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            
            {/* Trust Badge */}
            <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-rose-100 shadow-sm">
              <Sparkles className="h-4 w-4 text-rose-500" />
              <span className="text-sm font-medium text-gray-700">Trusted by 2M+ Registered Donors</span>
              <div className="flex -space-x-2">
                {[1,2,3].map((i) => (
                  <div key={i} className="w-6 h-6 rounded-full bg-gradient-to-r from-rose-400 to-rose-300 border-2 border-white"></div>
                ))}
              </div>
            </div>

            {/* Main Headline */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
                <span className="block text-gray-900">Give the</span>
                <span className="block bg-gradient-to-r from-rose-600 via-rose-500 to-rose-400 bg-clip-text text-transparent">
                  Gift of Life
                </span>
              </h1>
              
              {/* Subtext */}
              <p className="text-lg sm:text-xl text-gray-600 max-w-xl leading-relaxed">
                Your decision to register as an organ donor can save up to 
                <span className="font-semibold text-rose-500"> 8 lives</span> and improve 
                <span className="font-semibold text-emerald-500"> 75+ more</span>. It's the most meaningful legacy you can leave.
              </p>
            </div>

            {/* Impact Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {impactStats.map((stat) => (
                <div
                  key={stat.id}
                  className={`bg-white rounded-xl border border-gray-100 p-4 shadow-sm transition-all duration-300 ${
                    pulseIndex === stat.id - 1 ? 'ring-2 ring-rose-100 transform scale-105' : ''
                  }`}
                  style={{ transitionDelay: `${stat.delay}ms` }}
                >
                  <div className={`text-2xl sm:text-3xl font-bold ${stat.color}`}>{stat.value}</div>
                  <div className="text-sm text-gray-600 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              {/* Primary CTA */}
              <button className="group relative px-8 py-4 bg-gradient-to-r from-rose-500 to-rose-400 text-white rounded-2xl font-semibold text-lg shadow-xl shadow-rose-200 hover:shadow-2xl hover:shadow-rose-300 transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center space-x-2">
                <div className="absolute inset-0 bg-gradient-to-r from-rose-600 to-rose-500 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <Heart className="h-6 w-6 relative z-10" fill="white" />
                <span className="relative z-10">Register as Organ Donor</span>
                <ArrowRight className="h-5 w-5 relative z-10 group-hover:translate-x-1 transition-transform" />
                
                {/* Glow Effect */}
                <div className="absolute inset-0 rounded-2xl border-2 border-rose-300 animate-ping opacity-20"></div>
              </button>

              {/* Secondary CTA */}
              <button className="group px-6 py-4 bg-white text-gray-800 rounded-2xl font-medium text-lg border-2 border-rose-100 hover:border-rose-300 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center space-x-2">
                <Leaf className="h-5 w-5 text-emerald-500" />
                <span>Learn More</span>
                <ChevronRight className="h-5 w-5 text-rose-500 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Benefits */}
            <div className="space-y-3 pt-4">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-3 opacity-0 animate-fade-in-up"
                  style={{ animationDelay: `${index * 200}ms`, animationFillMode: 'forwards' }}
                >
                  <div className="p-2 bg-gray-50 rounded-lg">
                    <benefit.icon className={`h-5 w-5 ${benefit.color}`} />
                  </div>
                  <span className="text-gray-700">{benefit.text}</span>
                  <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Visual Element */}
          <div className={`relative ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            
            {/* Main Illustration Container */}
            <div className="relative max-w-lg mx-auto">
              
              {/* Floating Step Cards */}
              <div className="absolute -top-6 -left-6 z-20">
                <div className="bg-white p-6 rounded-2xl shadow-2xl border border-rose-100 animate-float-slow">
                  <div className="flex items-center space-x-3">
                    <div className="p-3 bg-rose-50 rounded-xl">
                      <Users className="h-6 w-6 text-rose-500" />
                    </div>
                    <div>
                      <div className="font-bold text-gray-900">One Donor</div>
                      <div className="text-sm text-gray-600">Can Save 8 Lives</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-6 -right-6 z-20">
                <div className="bg-white p-6 rounded-2xl shadow-2xl border border-emerald-100 animate-float-delayed">
                  <div className="flex items-center space-x-3">
                    <div className="p-3 bg-emerald-50 rounded-xl">
                      <Gift className="h-6 w-6 text-emerald-500" />
                    </div>
                    <div>
                      <div className="font-bold text-gray-900">Lasting Legacy</div>
                      <div className="text-sm text-gray-600">Forever Remembered</div>
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

                {/* Animated Organ Icons */}
                <div className="relative z-10 flex flex-col items-center justify-center py-12">
                  
                  {/* Pulsing Rings */}
                  <div className="absolute w-56 h-56 border-2 border-rose-200/30 rounded-full animate-pulse-slow"></div>
                  <div className="absolute w-64 h-64 border-2 border-rose-300/20 rounded-full animate-pulse-slower"></div>
                  
                  {/* Heart with Organ Icons */}
                  <div className="relative">
                    
                    {/* Central Heart */}
                    <div className="relative bg-gradient-to-r from-rose-500 to-rose-400 w-48 h-48 rounded-3xl flex items-center justify-center shadow-2xl shadow-rose-300/50">
                      <Heart className="h-32 w-32 text-white" fill="white" />
                      
                      {/* Glow Effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-rose-500 to-rose-400 rounded-3xl blur-xl opacity-30 animate-pulse"></div>
                    </div>

                    {/* Floating Organ Icons */}
                    <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                      <div className="bg-white p-3 rounded-full shadow-lg border border-rose-100 animate-bounce-slow">
                        <Heart className="h-6 w-6 text-rose-500" fill="#f43f5e" />
                      </div>
                    </div>
                    
                    <div className="absolute -right-6 top-1/2 transform -translate-y-1/2">
                      <div className="bg-white p-3 rounded-full shadow-lg border border-emerald-100 animate-bounce-slow" style={{ animationDelay: '0.5s' }}>
                        <Leaf className="h-6 w-6 text-emerald-500" />
                      </div>
                    </div>
                    
                    <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2">
                      <div className="bg-white p-3 rounded-full shadow-lg border border-blue-100 animate-bounce-slow" style={{ animationDelay: '1s' }}>
                        <Zap className="h-6 w-6 text-blue-500" />
                      </div>
                    </div>
                    
                    <div className="absolute -left-6 top-1/2 transform -translate-y-1/2">
                      <div className="bg-white p-3 rounded-full shadow-lg border border-purple-100 animate-bounce-slow" style={{ animationDelay: '1.5s' }}>
                        <Shield className="h-6 w-6 text-purple-500" />
                      </div>
                    </div>
                  </div>

                  {/* Connection Lines */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none">
                    <line x1="50%" y1="30%" x2="50%" y2="15%" stroke="#fda4af" strokeWidth="2" strokeDasharray="4,4" className="animate-dash" />
                    <line x1="70%" y1="50%" x2="85%" y2="50%" stroke="#86efac" strokeWidth="2" strokeDasharray="4,4" className="animate-dash" style={{ animationDelay: '0.5s' }} />
                    <line x1="50%" y1="70%" x2="50%" y2="85%" stroke="#93c5fd" strokeWidth="2" strokeDasharray="4,4" className="animate-dash" style={{ animationDelay: '1s' }} />
                    <line x1="30%" y1="50%" x2="15%" y2="50%" stroke="#d8b4fe" strokeWidth="2" strokeDasharray="4,4" className="animate-dash" style={{ animationDelay: '1.5s' }} />
                  </svg>
                </div>
              </div>
            </div>

            {/* Simple Process Steps */}
            <div className="mt-8 flex justify-center">
              <div className="flex items-center space-x-4 sm:space-x-8">
                {steps.map((step, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-rose-500 to-rose-400 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                      {step.number}
                    </div>
                    <div className="text-center mt-2">
                      <div className="font-semibold text-gray-900 text-sm">{step.title}</div>
                      <div className="text-xs text-gray-500">{step.desc}</div>
                    </div>
                    {index < steps.length - 1 && (
                      <div className="hidden sm:block absolute transform translate-x-16 w-16 h-0.5 bg-gradient-to-r from-rose-300 to-transparent"></div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-gray-100 shadow-sm">
            <div className="flex items-center space-x-3">
              <Shield className="h-8 w-8 text-emerald-500" />
              <div>
                <div className="text-2xl font-bold text-gray-900">100%</div>
                <div className="text-gray-600">Safe & Confidential</div>
              </div>
            </div>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-gray-100 shadow-sm">
            <div className="flex items-center space-x-3">
              <Clock className="h-8 w-8 text-blue-500" />
              <div>
                <div className="text-2xl font-bold text-gray-900">5 min</div>
                <div className="text-gray-600">Registration Time</div>
              </div>
            </div>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-gray-100 shadow-sm">
            <div className="flex items-center space-x-3">
              <Award className="h-8 w-8 text-amber-500" />
              <div>
                <div className="text-2xl font-bold text-gray-900">2M+</div>
                <div className="text-gray-600">Registered Donors</div>
              </div>
            </div>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-gray-100 shadow-sm">
            <div className="flex items-center space-x-3">
              <Users className="h-8 w-8 text-rose-500" />
              <div>
                <div className="text-2xl font-bold text-gray-900">8</div>
                <div className="text-gray-600">Lives Per Donor</div>
              </div>
            </div>
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
        
        @keyframes dash {
          to {
            stroke-dashoffset: -20;
          }
        }
        
        @keyframes scroll {
          0% { transform: translateY(0); opacity: 1; }
          100% { transform: translateY(10px); opacity: 0; }
        }
        
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
        
        .animate-dash {
          animation: dash 3s linear infinite;
        }
        
        .animate-scroll {
          animation: scroll 2s ease-in-out infinite;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }
      `}</style>
    </section>
  );
};

export default OrganDonationHero;