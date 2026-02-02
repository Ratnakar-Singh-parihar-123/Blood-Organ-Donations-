import React, { useState } from 'react';
import { 
  UserPlus, 
  Search, 
  Heart,
  Users,
  ArrowRight,
  CheckCircle,
  Shield,
  Clock,
  MapPin,
  Award,
  ChevronRight,
  Sparkles
} from 'lucide-react';

const HowItWorks = () => {
  const [activeStep, setActiveStep] = useState(null);

  const steps = [
    {
      id: 1,
      title: 'Register & Screen',
      description: 'Complete a simple registration and health screening process to join our trusted donor community.',
      icon: UserPlus,
      color: 'from-blue-500 to-cyan-400',
      iconColor: 'text-blue-500',
      bgColor: 'bg-blue-50',
      details: [
        'Basic information & contact details',
        'Health questionnaire (10 mins)',
        'Blood type verification',
        'Receive donor ID card'
      ],
      duration: '15 minutes',
      stats: '99.8% approval rate'
    },
    {
      id: 2,
      title: 'Match & Connect',
      description: 'Our intelligent system matches you with recipients in need based on location, blood type, and urgency.',
      icon: Search,
      color: 'from-emerald-500 to-green-400',
      iconColor: 'text-emerald-500',
      bgColor: 'bg-emerald-50',
      details: [
        'Real-time matching algorithm',
        'Location-based suggestions',
        'Emergency priority system',
        'Hospital coordination'
      ],
      duration: 'Instant matching',
      stats: 'Avg. 45 min response time'
    },
    {
      id: 3,
      title: 'Donate Safely',
      description: 'Visit our certified donation centers or mobile units for a safe, hygienic, and comfortable experience.',
      icon: Heart,
      color: 'from-rose-500 to-pink-400',
      iconColor: 'text-rose-500',
      bgColor: 'bg-rose-50',
      details: [
        'Certified medical professionals',
        'Sterile equipment & facilities',
        'Comfortable environment',
        'Post-donation care kit'
      ],
      duration: '30-45 minutes',
      stats: '100% safety record'
    },
    {
      id: 4,
      title: 'Save Lives',
      description: 'Receive updates about the lives you\'ve impacted and join our community of life-savers.',
      icon: Users,
      color: 'from-purple-500 to-violet-400',
      iconColor: 'text-purple-500',
      bgColor: 'bg-purple-50',
      details: [
        'Impact notification',
        'Recipient gratitude messages',
        'Community recognition',
        'Regular donation reminders'
      ],
      duration: 'Lifelong impact',
      stats: 'Saves 3+ lives per donation'
    }
  ];

  const features = [
    {
      icon: Shield,
      title: 'Verified & Secure',
      description: 'End-to-end encrypted platform protecting your privacy'
    },
    {
      icon: Clock,
      title: '24/7 Availability',
      description: 'Round-the-clock emergency support and coordination'
    },
    {
      icon: MapPin,
      title: 'Nationwide Network',
      description: 'Access to 150+ donation centers across the country'
    },
    {
      icon: Award,
      title: 'Certified Process',
      description: 'ISO 9001 certified medical procedures and protocols'
    }
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-24 bg-gradient-to-b from-white to-gray-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center space-x-2 bg-rose-50 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full mb-3 sm:mb-4">
            <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 text-rose-500" />
            <span className="text-xs sm:text-sm font-medium text-rose-700">Simple & Safe Process</span>
          </div>
          
          <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
            How 
            <span className="bg-gradient-to-r from-rose-600 to-rose-500 bg-clip-text text-transparent mx-2">
              JeevanDaan
            </span>
            Works
          </h2>
          
          <p className="text-sm sm:text-lg text-gray-600 mb-6 sm:mb-8 px-2">
            From registration to saving lives - our seamless process ensures safety, comfort, and maximum impact.
          </p>

          {/* Quick Stats */}
          <div className="grid grid-cols-4 gap-2 sm:gap-4 max-w-2xl mx-auto">
            <div className="text-center p-2 sm:p-4">
              <div className="text-lg sm:text-2xl font-bold text-rose-600">4</div>
              <div className="text-xs sm:text-sm text-gray-600">Simple Steps</div>
            </div>
            <div className="text-center p-2 sm:p-4">
              <div className="text-lg sm:text-2xl font-bold text-emerald-600">45min</div>
              <div className="text-xs sm:text-sm text-gray-600">Avg. Time</div>
            </div>
            <div className="text-center p-2 sm:p-4">
              <div className="text-lg sm:text-2xl font-bold text-blue-600">100%</div>
              <div className="text-xs sm:text-sm text-gray-600">Safe</div>
            </div>
            <div className="text-center p-2 sm:p-4">
              <div className="text-lg sm:text-2xl font-bold text-purple-600">3+</div>
              <div className="text-xs sm:text-sm text-gray-600">Lives Saved</div>
            </div>
          </div>
        </div>

        {/* Main Steps - Mobile: Vertical, Desktop: Horizontal */}
        <div className="relative">
          {/* Connecting Line - Desktop */}
          <div className="hidden lg:block absolute top-24 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-400 via-emerald-400 via-rose-400 to-purple-400 opacity-30 z-0"></div>
          
          {/* Connecting Dots - Mobile */}
          <div className="lg:hidden absolute left-6 sm:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-400 via-emerald-400 via-rose-400 to-purple-400 opacity-30 z-0"></div>

          {/* Steps Container */}
          <div className="space-y-8 lg:space-y-0 lg:grid lg:grid-cols-4 lg:gap-6 relative z-10">
            {steps.map((step, index) => (
              <div
                key={step.id}
                className="relative"
                onMouseEnter={() => setActiveStep(step.id)}
                onMouseLeave={() => setActiveStep(null)}
              >
                {/* Mobile Layout */}
                <div className="lg:hidden flex">
                  {/* Step Number Circle */}
                  <div className="flex-shrink-0 z-10">
                    <div className={`relative w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center border-4 border-white shadow-lg ${
                      activeStep === step.id 
                        ? 'bg-gradient-to-r scale-105 ' + step.color
                        : 'bg-white'
                    } transition-all duration-300`}>
                      <div className={`text-lg sm:text-2xl font-bold ${
                        activeStep === step.id ? 'text-white' : 'text-gray-700'
                      }`}>
                        {step.id}
                      </div>
                    </div>
                  </div>

                  {/* Step Content */}
                  <div className="flex-1 ml-4 sm:ml-6">
                    <div className="bg-white rounded-xl sm:rounded-2xl border border-gray-100 p-4 sm:p-6 shadow-md hover:shadow-lg transition-all duration-300">
                      <div className="flex items-start justify-between mb-3 sm:mb-4">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1 sm:mb-2">
                            <step.icon className={`h-4 w-4 sm:h-6 sm:w-6 ${step.iconColor}`} />
                            <h3 className="text-base sm:text-xl font-bold text-gray-900">{step.title}</h3>
                          </div>
                          <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4 line-clamp-2">{step.description}</p>
                        </div>
                        <ChevronRight className={`h-4 w-4 sm:h-5 sm:w-5 text-gray-400 transition-transform ${
                          activeStep === step.id ? 'translate-x-1 text-rose-500' : ''
                        }`} />
                      </div>

                      {/* Details List - Show only 2 on mobile */}
                      <div className="space-y-1.5 sm:space-y-2 mb-3 sm:mb-4">
                        {step.details.slice(0, 2).map((detail, idx) => (
                          <div key={idx} className="flex items-start space-x-2">
                            <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                            <span className="text-xs sm:text-sm text-gray-600 line-clamp-1">{detail}</span>
                          </div>
                        ))}
                      </div>

                      {/* Stats */}
                      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                        <div className="flex items-center space-x-1">
                          <Clock className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400" />
                          <span className="text-xs text-gray-600">{step.duration}</span>
                        </div>
                        <div className="text-xs font-medium text-gray-700 bg-gray-100 px-2 py-1 rounded-full">
                          {step.stats}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Desktop Layout */}
                <div className="hidden lg:flex flex-col items-center">
                  {/* Step Number Circle */}
                  <div className={`relative w-16 h-16 lg:w-20 lg:h-20 rounded-full flex items-center justify-center border-6 border-white shadow-xl lg:shadow-2xl mb-6 ${
                    activeStep === step.id 
                      ? 'bg-gradient-to-r scale-110 ' + step.color
                      : 'bg-white'
                  } transition-all duration-300`}>
                    <div className={`text-xl lg:text-3xl font-bold ${
                      activeStep === step.id ? 'text-white' : 'text-gray-700'
                    }`}>
                      {step.id}
                    </div>
                    
                    {/* Icon Overlay */}
                    <div className={`absolute -bottom-2 -right-2 w-8 h-8 lg:w-10 lg:h-10 rounded-full ${step.bgColor} border-4 border-white flex items-center justify-center shadow-lg`}>
                      <step.icon className={`h-3 w-3 lg:h-5 lg:w-5 ${step.iconColor}`} />
                    </div>

                    {/* Active State Glow */}
                    {activeStep === step.id && (
                      <>
                        <div className="absolute inset-0 rounded-full bg-gradient-to-r opacity-30 animate-ping"></div>
                        <div className="absolute inset-0 rounded-full bg-gradient-to-r opacity-20 animate-pulse"></div>
                      </>
                    )}
                  </div>

                  {/* Step Content */}
                  <div className={`w-full bg-white rounded-xl lg:rounded-2xl border border-gray-100 p-4 lg:p-6 shadow-lg hover:shadow-xl lg:hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 lg:hover:-translate-y-2 ${
                    activeStep === step.id ? 'ring-1 lg:ring-2 ring-opacity-50 ring-offset-1 lg:ring-offset-2 ' + step.color.replace('from-', 'ring-').split(' ')[0] : ''
                  }`}>
                    <h3 className="text-base lg:text-xl font-bold text-gray-900 mb-2 lg:mb-3">{step.title}</h3>
                    <p className="text-xs lg:text-sm text-gray-600 mb-3 lg:mb-4 line-clamp-2 lg:line-clamp-3">{step.description}</p>
                    
                    {/* Details List */}
                    <div className="space-y-1.5 lg:space-y-2 mb-3 lg:mb-4">
                      {step.details.slice(0, 2).map((detail, idx) => (
                        <div key={idx} className="flex items-start space-x-2">
                          <CheckCircle className="h-3 w-3 lg:h-4 lg:w-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                          <span className="text-xs text-gray-600">{detail}</span>
                        </div>
                      ))}
                    </div>

                    {/* Stats */}
                    <div className="pt-3 border-t border-gray-100">
                      <div className="flex items-center justify-between">
                        <div className="text-xs text-gray-500">{step.duration}</div>
                        <div className="text-xs font-medium text-gray-700 bg-gray-100 px-2 py-1 rounded">
                          {step.stats}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Arrow Connector - Desktop */}
                  {index < steps.length - 1 && (
                    <div className="absolute top-8 -right-3 transform translate-x-1/2">
                      <ArrowRight className="h-6 w-6 text-gray-300" />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Features Grid */}
        <div className="mt-12 sm:mt-20">
          <h3 className="text-xl sm:text-2xl font-bold text-center text-gray-900 mb-6 sm:mb-8">
            Why Choose JeevanDaan?
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-lg sm:rounded-xl border border-gray-100 p-4 sm:p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:border-rose-200 group"
              >
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <div className="p-2 sm:p-3 bg-rose-50 rounded-lg sm:rounded-xl group-hover:bg-gradient-to-r group-hover:from-rose-50 group-hover:to-pink-50 transition-colors flex-shrink-0">
                    <feature.icon className="h-4 w-4 sm:h-6 sm:w-6 text-rose-500" />
                  </div>
                  <div>
                    <h4 className="text-sm sm:text-base font-semibold text-gray-900">{feature.title}</h4>
                    <p className="text-xs sm:text-sm text-gray-600 mt-1 line-clamp-2">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-12 sm:mt-16 bg-gradient-to-r from-rose-50 to-pink-50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 text-center">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
              Ready to Make a Difference?
            </h3>
            <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8">
              Join thousands of heroes who save lives every day. The process is simple, safe, and incredibly rewarding.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <button className="group px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-rose-500 to-rose-400 text-white font-semibold rounded-full shadow-lg shadow-rose-200 hover:shadow-xl hover:shadow-rose-300 transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2 text-sm sm:text-base">
                <UserPlus className="h-4 w-4 sm:h-5 sm:w-5" />
                <span>Register Now</span>
                <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button className="px-6 py-3 sm:px-8 sm:py-4 bg-white text-gray-800 font-semibold rounded-full border-2 border-rose-200 hover:border-rose-300 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2 text-sm sm:text-base">
                <Search className="h-4 w-4 sm:h-5 sm:w-5 text-rose-500" />
                <span>Find Centers</span>
              </button>
            </div>
            
            <div className="mt-6 sm:mt-8 flex flex-wrap items-center justify-center gap-2 text-xs sm:text-sm text-gray-500">
              <Shield className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
              <span className="text-center">100% secure • No hidden fees • Medical confidentiality</span>
            </div>
          </div>
        </div>

        {/* Process Timeline Summary */}
        <div className="mt-12 sm:mt-16">
          <div className="bg-white rounded-xl sm:rounded-2xl border border-gray-100 p-4 sm:p-6 lg:p-8 shadow-lg">
            <div className="hidden lg:grid lg:grid-cols-5 lg:gap-4">
              <div className="text-center">
                <div className="text-sm font-medium text-gray-500">Step 1</div>
                <div className="text-lg font-semibold text-gray-900">Register</div>
                <div className="text-xs text-gray-500">5 mins online</div>
              </div>
              
              <div className="flex items-center justify-center">
                <div className="w-full h-1 bg-gradient-to-r from-blue-400 to-emerald-400"></div>
                <ArrowRight className="h-5 w-5 text-gray-400 mx-2" />
              </div>
              
              <div className="text-center">
                <div className="text-sm font-medium text-gray-500">Step 2</div>
                <div className="text-lg font-semibold text-gray-900">Match</div>
                <div className="text-xs text-gray-500">Instant</div>
              </div>
              
              <div className="flex items-center justify-center">
                <div className="w-full h-1 bg-gradient-to-r from-emerald-400 to-rose-400"></div>
                <ArrowRight className="h-5 w-5 text-gray-400 mx-2" />
              </div>
              
              <div className="text-center">
                <div className="text-sm font-medium text-gray-500">Step 3</div>
                <div className="text-lg font-semibold text-gray-900">Donate</div>
                <div className="text-xs text-gray-500">45 mins</div>
              </div>
              
              <div className="col-span-5 flex justify-center mt-4">
                <div className="w-32 h-1 bg-gradient-to-r from-rose-400 to-purple-400"></div>
              </div>
              
              <div className="col-span-5 text-center mt-4">
                <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white px-6 py-3 rounded-full">
                  <Users className="h-5 w-5" />
                  <span className="text-lg font-bold">Save Lives</span>
                  <Sparkles className="h-5 w-5" />
                </div>
                <div className="text-sm text-gray-500 mt-2">3+ lives saved per donation</div>
              </div>
            </div>

            {/* Mobile Timeline */}
            <div className="lg:hidden">
              <div className="flex flex-col items-center space-y-4">
                <div className="flex items-center justify-between w-full max-w-xs">
                  <div className="text-center">
                    <div className="text-xs font-medium text-gray-500">Step 1</div>
                    <div className="text-sm font-semibold text-gray-900">Register</div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-gray-400" />
                  <div className="text-center">
                    <div className="text-xs font-medium text-gray-500">Step 2</div>
                    <div className="text-sm font-semibold text-gray-900">Match</div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-gray-400" />
                  <div className="text-center">
                    <div className="text-xs font-medium text-gray-500">Step 3</div>
                    <div className="text-sm font-semibold text-gray-900">Donate</div>
                  </div>
                </div>
                
                <div className="w-48 h-1 bg-gradient-to-r from-blue-400 via-emerald-400 to-rose-400 rounded-full"></div>
                
                <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white px-4 py-2 rounded-full">
                  <Users className="h-4 w-4" />
                  <span className="text-sm font-bold">Save Lives</span>
                  <Sparkles className="h-4 w-4" />
                </div>
                <div className="text-xs text-gray-500">3+ lives saved per donation</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Animations */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        @keyframes gentle-pulse {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.4; }
        }
        .animate-gentle-pulse {
          animation: gentle-pulse 3s ease-in-out infinite;
        }
        
        /* Line clamp utilities for better text truncation */
        .line-clamp-1 {
          overflow: hidden;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
        }
        
        .line-clamp-2 {
          overflow: hidden;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
        }
        
        .line-clamp-3 {
          overflow: hidden;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 3;
        }
      `}</style>
    </section>
  );
};

export default HowItWorks;