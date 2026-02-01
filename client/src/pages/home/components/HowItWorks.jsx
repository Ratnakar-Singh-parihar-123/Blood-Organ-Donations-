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
    <section className="py-16 lg:py-24 bg-gradient-to-b from-white to-gray-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 bg-rose-50 px-4 py-2 rounded-full mb-4">
            <Sparkles className="h-4 w-4 text-rose-500" />
            <span className="text-sm font-medium text-rose-700">Simple & Safe Process</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            How 
            <span className="bg-gradient-to-r from-rose-600 to-rose-500 bg-clip-text text-transparent mx-2">
              JeevanDaan
            </span>
            Works
          </h2>
          
          <p className="text-lg text-gray-600 mb-8">
            From registration to saving lives - our seamless process ensures safety, comfort, and maximum impact.
          </p>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto">
            <div className="text-center p-4">
              <div className="text-2xl font-bold text-rose-600">4</div>
              <div className="text-sm text-gray-600">Simple Steps</div>
            </div>
            <div className="text-center p-4">
              <div className="text-2xl font-bold text-emerald-600">45min</div>
              <div className="text-sm text-gray-600">Avg. Time</div>
            </div>
            <div className="text-center p-4">
              <div className="text-2xl font-bold text-blue-600">100%</div>
              <div className="text-sm text-gray-600">Safe</div>
            </div>
            <div className="text-center p-4">
              <div className="text-2xl font-bold text-purple-600">3+</div>
              <div className="text-sm text-gray-600">Lives Saved</div>
            </div>
          </div>
        </div>

        {/* Main Steps - Vertical on mobile, Horizontal on desktop */}
        <div className="relative">
          {/* Connecting Line - Desktop */}
          <div className="hidden lg:block absolute top-24 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-400 via-emerald-400 via-rose-400 to-purple-400 opacity-30 z-0"></div>
          
          {/* Connecting Dots - Mobile */}
          <div className="lg:hidden absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-400 via-emerald-400 via-rose-400 to-purple-400 opacity-30 z-0"></div>

          {/* Steps Container */}
          <div className="grid lg:grid-cols-4 gap-8 lg:gap-6 relative z-10">
            {steps.map((step, index) => (
              <div
                key={step.id}
                className="relative"
                onMouseEnter={() => setActiveStep(step.id)}
                onMouseLeave={() => setActiveStep(null)}
              >
                {/* Step Number with Connector */}
                <div className="flex items-center lg:flex-col lg:items-center">
                  {/* Mobile: Horizontal Layout */}
                  <div className="lg:hidden flex items-center w-full">
                    {/* Step Number Circle */}
                    <div className={`relative w-16 h-16 rounded-full flex items-center justify-center border-4 border-white shadow-xl ${
                      activeStep === step.id 
                        ? 'bg-gradient-to-r scale-110 ' + step.color
                        : 'bg-white'
                    } transition-all duration-300`}>
                      <div className={`text-2xl font-bold ${
                        activeStep === step.id ? 'text-white' : 'text-gray-700'
                      }`}>
                        {step.id}
                      </div>
                      
                      {/* Active State Glow */}
                      {activeStep === step.id && (
                        <div className="absolute inset-0 rounded-full bg-gradient-to-r opacity-30 animate-ping"></div>
                      )}
                    </div>

                    {/* Step Content */}
                    <div className="flex-1 ml-6">
                      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <div className="flex items-center space-x-2 mb-2">
                              <step.icon className={`h-6 w-6 ${step.iconColor}`} />
                              <h3 className="text-xl font-bold text-gray-900">{step.title}</h3>
                            </div>
                            <p className="text-gray-600 mb-4">{step.description}</p>
                          </div>
                          <ChevronRight className={`h-5 w-5 text-gray-400 transition-transform ${
                            activeStep === step.id ? 'translate-x-1 text-rose-500' : ''
                          }`} />
                        </div>

                        {/* Details List */}
                        <div className="space-y-2 mb-4">
                          {step.details.map((detail, idx) => (
                            <div key={idx} className="flex items-center space-x-2">
                              <CheckCircle className="h-4 w-4 text-emerald-500" />
                              <span className="text-sm text-gray-600">{detail}</span>
                            </div>
                          ))}
                        </div>

                        {/* Stats */}
                        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                          <div className="flex items-center space-x-1">
                            <Clock className="h-4 w-4 text-gray-400" />
                            <span className="text-sm text-gray-600">{step.duration}</span>
                          </div>
                          <div className="text-sm font-medium text-gray-700 bg-gray-100 px-3 py-1 rounded-full">
                            {step.stats}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Desktop: Vertical Layout */}
                  <div className="hidden lg:flex flex-col items-center">
                    {/* Step Number Circle */}
                    <div className={`relative w-20 h-20 rounded-full flex items-center justify-center border-6 border-white shadow-2xl mb-8 ${
                      activeStep === step.id 
                        ? 'bg-gradient-to-r scale-110 ' + step.color
                        : 'bg-white'
                    } transition-all duration-300`}>
                      <div className={`text-3xl font-bold ${
                        activeStep === step.id ? 'text-white' : 'text-gray-700'
                      }`}>
                        {step.id}
                      </div>
                      
                      {/* Icon Overlay */}
                      <div className={`absolute -bottom-2 -right-2 w-10 h-10 rounded-full ${step.bgColor} border-4 border-white flex items-center justify-center shadow-lg`}>
                        <step.icon className={`h-5 w-5 ${step.iconColor}`} />
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
                    <div className={`w-full bg-white rounded-2xl border border-gray-100 p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 ${
                      activeStep === step.id ? 'ring-2 ring-opacity-50 ring-offset-2 ' + step.color.replace('from-', 'ring-').split(' ')[0] : ''
                    }`}>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                      <p className="text-gray-600 mb-4 text-sm">{step.description}</p>
                      
                      {/* Details List */}
                      <div className="space-y-2 mb-4">
                        {step.details.slice(0, 2).map((detail, idx) => (
                          <div key={idx} className="flex items-start space-x-2">
                            <CheckCircle className="h-4 w-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-gray-600">{detail}</span>
                          </div>
                        ))}
                      </div>

                      {/* Stats */}
                      <div className="pt-4 border-t border-gray-100">
                        <div className="flex items-center justify-between">
                          <div className="text-sm text-gray-500">{step.duration}</div>
                          <div className="text-xs font-medium text-gray-700 bg-gray-100 px-2 py-1 rounded">
                            {step.stats}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Arrow Connector - Desktop */}
                    {index < steps.length - 1 && (
                      <div className="absolute top-10 -right-6 transform translate-x-1/2">
                        <ArrowRight className="h-8 w-8 text-gray-300" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Features Grid */}
        <div className="mt-20">
          <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">
            Why Choose JeevanDaan?
          </h3>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:border-rose-200 group"
              >
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-rose-50 rounded-xl group-hover:bg-gradient-to-r group-hover:from-rose-50 group-hover:to-pink-50 transition-colors">
                    <feature.icon className="h-6 w-6 text-rose-500" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{feature.title}</h4>
                    <p className="text-sm text-gray-600 mt-1">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 bg-gradient-to-r from-rose-50 to-pink-50 rounded-3xl p-8 lg:p-12 text-center">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
              Ready to Make a Difference?
            </h3>
            <p className="text-gray-600 mb-8">
              Join thousands of heroes who save lives every day. The process is simple, safe, and incredibly rewarding.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="group px-8 py-4 bg-gradient-to-r from-rose-500 to-rose-400 text-white font-semibold rounded-full shadow-lg shadow-rose-200 hover:shadow-xl hover:shadow-rose-300 transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2">
                <UserPlus className="h-5 w-5" />
                <span>Register Now - It's Free</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button className="px-8 py-4 bg-white text-gray-800 font-semibold rounded-full border-2 border-rose-200 hover:border-rose-300 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2">
                <Search className="h-5 w-5 text-rose-500" />
                <span>Find Donation Centers</span>
              </button>
            </div>
            
            <div className="mt-8 flex items-center justify-center space-x-2 text-sm text-gray-500">
              <Shield className="h-4 w-4" />
              <span>100% secure registration • No hidden fees • Medical confidentiality assured</span>
            </div>
          </div>
        </div>

        {/* Process Timeline Summary */}
        <div className="mt-16 hidden lg:block">
          <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-lg">
            <div className="grid grid-cols-5 gap-4">
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
      `}</style>
    </section>
  );
};

export default HowItWorks;