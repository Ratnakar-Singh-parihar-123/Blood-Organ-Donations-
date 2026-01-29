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
  Activity,
  Phone,
  Calendar,
  Search,
  ArrowLeft,
  ArrowRight,
  Pause,
  Play
} from 'lucide-react';

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Background images with proper Unsplash URLs
  const backgroundImages = [
    'https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80',
    'https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80',
    'https://images.unsplash.com/photo-1516549655669-df666e5e4fd2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80',
    'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80'
  ];

  // Initialize visibility and start image rotation
  useEffect(() => {
    setIsVisible(true);
    
    let interval;
    if (isAutoPlaying) {
      interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % backgroundImages.length);
      }, 5000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isAutoPlaying]);

  const handlePrevious = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? backgroundImages.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentImageIndex((prev) => 
      (prev + 1) % backgroundImages.length
    );
  };

  const handleImageSelect = (index) => {
    setCurrentImageIndex(index);
  };

  return (
    <section className="relative min-h-screen overflow-hidden">
      
      {/* Background Image Slider */}
      <div className="absolute inset-0">
        {backgroundImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentImageIndex ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(255, 255, 255, 0.1)), url(${image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          >
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/20 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30"></div>
          </div>
        ))}
        
        {/* Animated blood drops overlay */}
        <div className="absolute inset-0">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="absolute top-0 w-2 h-3 bg-gradient-to-b from-rose-400/30 to-rose-300/20 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                animation: `fall ${2 + Math.random() * 3}s ease-in infinite ${Math.random() * 5}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* Image Navigation Controls */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30">
        <div className="flex items-center space-x-4 bg-black/40 backdrop-blur-sm rounded-full px-4 py-2">
          <button 
            onClick={handlePrevious}
            className="p-2 rounded-full hover:bg-white/20 transition-colors"
            aria-label="Previous image"
          >
            <ArrowLeft className="h-5 w-5 text-white" />
          </button>
          
          {/* Image indicators */}
          <div className="flex space-x-2">
            {backgroundImages.map((_, index) => (
              <button
                key={index}
                onClick={() => handleImageSelect(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentImageIndex 
                    ? 'bg-rose-500 w-6' 
                    : 'bg-white/60 hover:bg-white/80'
                }`}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
          
          <button 
            onClick={handleNext}
            className="p-2 rounded-full hover:bg-white/20 transition-colors"
            aria-label="Next image"
          >
            <ArrowRight className="h-5 w-5 text-white" />
          </button>
          
          <button 
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className="p-2 rounded-full hover:bg-white/20 transition-colors ml-2"
            aria-label={isAutoPlaying ? "Pause slideshow" : "Play slideshow"}
          >
            {isAutoPlaying ? 
              <Pause className="h-5 w-5 text-white" /> : 
              <Play className="h-5 w-5 text-white" />
            }
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 lg:pt-28 pb-16 lg:pb-24 z-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Column - Text Content */}
          <div className={`space-y-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            
            {/* Trust Badge */}
            <div className="inline-flex items-center space-x-2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full border border-rose-100 shadow-lg">
              <Shield className="h-4 w-4 text-rose-500" />
              <span className="text-sm font-medium text-gray-700">Trusted by 50K+ Donors</span>
              <div className="flex -space-x-2">
                {[1,2,3,4].map((i) => (
                  <div key={i} className="w-6 h-6 rounded-full bg-gradient-to-r from-rose-400 to-rose-300 border-2 border-white"></div>
                ))}
              </div>
            </div>

            {/* Main Headline */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
                <span className="block text-white">Save Lives,</span>
                <span className="block bg-gradient-to-r from-rose-400 via-rose-300 to-rose-200 bg-clip-text text-transparent">
                  One Donation at a Time
                </span>
              </h1>
              
              {/* Subtext */}
              <p className="text-lg sm:text-xl text-white/90 max-w-xl leading-relaxed">
                Join our community of heroes who give the gift of life. Every donation can save up to 
                <span className="font-semibold text-rose-300"> 3 lives</span>. Your simple act of kindness creates ripples of hope.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              {/* Primary CTA */}
              <button className="group relative px-8 py-4 bg-gradient-to-r from-rose-500 to-rose-400 text-white rounded-2xl font-semibold text-lg shadow-xl shadow-rose-900/30 hover:shadow-2xl hover:shadow-rose-800/40 transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center space-x-2">
                <div className="absolute inset-0 bg-gradient-to-r from-rose-600 to-rose-500 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <Heart className="h-5 w-5 relative z-10" fill="white" />
                <span className="relative z-10">Become a Donor</span>
                <ChevronRight className="h-5 w-5 relative z-10 group-hover:translate-x-1 transition-transform" />
              </button>

              {/* Secondary CTA */}
              <button className="group px-8 py-4 bg-white/20 backdrop-blur-sm text-white rounded-2xl font-semibold text-lg border-2 border-white/30 hover:border-rose-300 hover:bg-white/30 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center space-x-2">
                <Droplets className="h-5 w-5 text-rose-300" />
                <span>Find Blood</span>
                <ChevronRight className="h-5 w-5 text-rose-300 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8">
              {[
                { value: '10K+', label: 'Lives Saved', icon: Users, color: 'text-rose-300' },
                { value: '24/7', label: 'Emergency', icon: Clock, color: 'text-amber-300' },
                { value: '100+', label: 'Cities', icon: MapPin, color: 'text-emerald-300' },
                { value: '99.8%', label: 'Success Rate', icon: Award, color: 'text-blue-300' }
              ].map((stat, idx) => (
                <div 
                  key={idx} 
                  className={`bg-white/10 backdrop-blur-sm p-4 rounded-2xl border border-white/20 hover:border-rose-300/50 shadow-lg hover:shadow-xl transition-all ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                  style={{ transitionDelay: `${idx * 100}ms` }}
                >
                  <div className="flex items-center space-x-2">
                    <div className={`p-2 rounded-lg bg-white/10`}>
                      <stat.icon className={`h-5 w-5 ${stat.color}`} />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-white">{stat.value}</div>
                      <div className="text-sm text-white/80">{stat.label}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-3 gap-3 pt-6">
              <button className="flex flex-col items-center p-3 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/20 transition-all group">
                <Search className="h-5 w-5 text-white mb-1 group-hover:text-rose-300" />
                <span className="text-xs text-white/90">Find Center</span>
              </button>
              <button className="flex flex-col items-center p-3 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/20 transition-all group">
                <Phone className="h-5 w-5 text-white mb-1 group-hover:text-rose-300" />
                <span className="text-xs text-white/90">Emergency</span>
              </button>
              <button className="flex flex-col items-center p-3 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/20 transition-all group">
                <Calendar className="h-5 w-5 text-white mb-1 group-hover:text-rose-300" />
                <span className="text-xs text-white/90">Schedule</span>
              </button>
            </div>
          </div>

          {/* Right Column - Visual Element */}
          <div className={`relative ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            {/* Main Illustration */}
            <div className="relative mx-auto max-w-lg">
              {/* Floating Card 1 */}
              <div className="absolute -top-6 -left-6 bg-white/95 backdrop-blur-sm p-6 rounded-2xl shadow-2xl border border-rose-100 animate-float-slow z-20">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-rose-50 rounded-xl">
                    <Heart className="h-6 w-6 text-rose-500" fill="currentColor" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">Blood Donation</div>
                    <div className="text-sm text-gray-600">Every 2 seconds needed</div>
                  </div>
                </div>
              </div>

              {/* Floating Card 2 */}
              <div className="absolute -bottom-6 -right-6 bg-white/95 backdrop-blur-sm p-6 rounded-2xl shadow-2xl border border-rose-100 animate-float-delayed z-20">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-emerald-50 rounded-xl">
                    <Users className="h-6 w-6 text-emerald-500" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">Organ Donation</div>
                    <div className="text-sm text-gray-600">Save 8+ lives</div>
                  </div>
                </div>
              </div>

              {/* Central Hero Illustration */}
              <div className="relative bg-gradient-to-br from-white/95 to-rose-50/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/50 overflow-hidden">
                {/* Current background preview */}
                <div className="absolute inset-0 opacity-10 z-0">
                  <div 
                    className="absolute inset-0"
                    style={{
                      backgroundImage: `url(${backgroundImages[currentImageIndex]})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}
                  />
                </div>

                {/* Animated Heart with Pulse */}
                <div className="relative z-10 flex flex-col items-center justify-center py-12">
                  {/* Outer Pulse Rings */}
                  <div className="absolute w-64 h-64 border-2 border-rose-200/30 rounded-full animate-pulse-slow"></div>
                  <div className="absolute w-56 h-56 border-2 border-rose-300/40 rounded-full animate-pulse-slower"></div>
                  
                  {/* Heart Container */}
                  <div className="relative">
                    {/* Glow Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-rose-500 to-rose-400 rounded-full blur-xl opacity-30 animate-pulse"></div>
                    
                    {/* Heart Icon */}
                    <div className="relative bg-gradient-to-r from-rose-500 to-rose-400 w-48 h-48 rounded-3xl flex items-center justify-center shadow-2xl shadow-rose-300/50">
                      <Heart className="h-32 w-32 text-white" fill="white" />
                      
                      {/* Blood Drops */}
                      <div className="absolute -top-4 -right-4">
                        <div className="relative animate-bounce-slow">
                          <Droplets className="h-10 w-10 text-rose-500" fill="currentColor" />
                          <div className="absolute inset-0 bg-rose-500 rounded-full blur-sm"></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Connection Dots */}
                  <div className="flex items-center justify-center mt-12 space-x-8">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex flex-col items-center space-y-2">
                        <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${i === 2 ? 'from-rose-500 to-rose-400' : 'from-gray-300 to-gray-200'} flex items-center justify-center shadow-lg`}>
                          {i === 2 ? (
                            <Users className="h-6 w-6 text-white" />
                          ) : (
                            <Heart className="h-6 w-6 text-gray-500" />
                          )}
                        </div>
                        <div className="h-8 w-0.5 bg-gradient-to-b from-rose-300 to-transparent"></div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Current Image Indicator */}
                  <div className="mt-8 flex flex-col items-center">
                    <div className="text-sm text-gray-600 mb-2">
                      <span className="font-medium">Image {currentImageIndex + 1}</span> of {backgroundImages.length}
                    </div>
                    <div className="flex space-x-2">
                      {backgroundImages.map((_, index) => (
                        <div
                          key={index}
                          className={`w-2 h-2 rounded-full ${
                            index === currentImageIndex ? 'bg-rose-500' : 'bg-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Emergency Alert */}
        <div className={`mt-12 bg-gradient-to-r from-rose-500/20 to-rose-400/10 backdrop-blur-sm border border-rose-300/30 rounded-2xl p-6 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-white/20 rounded-xl">
                <Activity className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-white text-lg">Emergency Blood Request</h3>
                <p className="text-white/80">Urgent need for O- blood type at City Hospital</p>
              </div>
            </div>
            <button className="mt-4 md:mt-0 px-6 py-3 bg-white text-rose-600 rounded-xl font-semibold hover:bg-rose-50 transition-colors">
              Donate Now
            </button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-30">
        <div className="flex flex-col items-center space-y-2">
          <div className="text-xs text-white/80 font-medium">Scroll to explore</div>
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-gradient-to-b from-rose-300 to-rose-200 rounded-full mt-2 animate-scroll"></div>
          </div>
        </div>
      </div>

      {/* Custom Animations */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          33% { transform: translateY(-15px) translateX(5px); }
          66% { transform: translateY(5px) translateX(-5px); }
        }
        
        @keyframes fall {
          0% { transform: translateY(-100px); opacity: 0; }
          10% { opacity: 0.5; }
          90% { opacity: 0.5; }
          100% { transform: translateY(100vh); opacity: 0; }
        }
        
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.05); }
        }
        
        @keyframes pulse-slower {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(1.1); }
        }
        
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
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

        /* Responsive improvements */
        @media (max-width: 640px) {
          .animate-float, .animate-float-slow, .animate-float-delayed {
            animation-duration: 10s;
          }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;