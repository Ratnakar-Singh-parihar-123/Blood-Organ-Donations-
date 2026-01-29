import React, { useState, useEffect } from 'react';
import { 
  UserPlus,
  Stethoscope,
  Search,
  Heart,
  ArrowRight,
  CheckCircle2,
  Users,
  Shield,
  Clock,
  Award,
  Sparkles,
  ChevronRight,
  Zap,
  Gift,
  Calendar,
  FileText,
  MapPin,
  Bell
} from 'lucide-react';

const HowOrganDonationWorks = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    
    // Auto-advance steps on desktop
    const interval = setInterval(() => {
      setActiveStep(prev => (prev + 1) % steps.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const steps = [
    {
      number: '01',
      title: 'Registration',
      description: 'Register as an organ donor online, at the DMV, or through your state registry. Takes less than 5 minutes.',
      icon: UserPlus,
      color: 'from-blue-500 to-cyan-400',
      iconColor: 'text-blue-500',
      bgColor: 'bg-blue-50',
      details: [
        'Online registration through state registry',
        'DMV registration when getting/renewing license',
        'Share your decision with family members',
        'Carry donor card in wallet',
        'Can update preferences anytime'
      ],
      duration: '5 minutes',
      stats: '2M+ registered donors',
      tips: [
        'Tell your family about your decision',
        'Keep your information updated',
        'Consider living donation options'
      ]
    },
    {
      number: '02',
      title: 'Medical Evaluation',
      description: 'At the time of donation, medical professionals evaluate organ suitability based on medical history and current condition.',
      icon: Stethoscope,
      color: 'from-emerald-500 to-green-400',
      iconColor: 'text-emerald-500',
      bgColor: 'bg-emerald-50',
      details: [
        'Complete medical history review',
        'Blood tests for compatibility',
        'Organ-specific function tests',
        'Infectious disease screening',
        'Family medical history considered'
      ],
      duration: '2-6 hours',
      stats: '99.8% evaluation accuracy',
      tips: [
        'Medical team is separate from treatment team',
        'All tests are covered by recipient insurance',
        'Family can provide additional health information'
      ]
    },
    {
      number: '03',
      title: 'Matching & Allocation',
      description: 'The national computer system matches donor organs with recipients based on medical urgency, compatibility, and location.',
      icon: Search,
      color: 'from-amber-500 to-orange-400',
      iconColor: 'text-amber-500',
      bgColor: 'bg-amber-50',
      details: [
        'UNOS computer system matches donors to recipients',
        'Blood type and tissue compatibility checked',
        'Geographic proximity considered',
        'Medical urgency prioritized',
        'Time on waiting list factored'
      ],
      duration: '2-48 hours',
      stats: 'Matches made within hours',
      tips: [
        'National waiting list ensures fair distribution',
        'Multiple recipients can benefit from one donor',
        'Local matches are prioritized when possible'
      ]
    },
    {
      number: '04',
      title: 'Life Saved',
      description: 'Transplant surgery gives recipients a second chance at life. Your gift continues through follow-up care and recovery.',
      icon: Heart,
      color: 'from-rose-500 to-pink-400',
      iconColor: 'text-rose-500',
      bgColor: 'bg-rose-50',
      details: [
        'Surgical transplant procedure',
        'Recipient recovery and monitoring',
        'Long-term follow-up care',
        'Quality of life restored',
        'Family receives updates (optional)'
      ],
      duration: 'Lifelong impact',
      stats: '8 lives saved per donor',
      tips: [
        'Donor families can receive updates on recipients',
        'Recipients often express gratitude to donor families',
        'Your gift creates a ripple effect of healing'
      ]
    }
  ];

  const activeStepData = steps[activeStep];

  const stats = [
    { value: '106,000+', label: 'On Waiting List', icon: Users, color: 'text-rose-500' },
    { value: '39,000', label: 'Transplants in 2023', icon: Gift, color: 'text-emerald-500' },
    { value: '17/day', label: 'Die Waiting', icon: Clock, color: 'text-amber-500' },
    { value: '95%', label: 'Public Support', icon: Award, color: 'text-blue-500' }
  ];

  const faqs = [
    {
      question: 'Can my family override my decision to donate?',
      answer: 'No. Once you\'re registered, your decision is legally binding. However, it\'s crucial to discuss your wishes with family.'
    },
    {
      question: 'How are organs preserved?',
      answer: 'Organs are cooled and preserved in special solutions. Hearts and lungs last 4-6 hours, livers 12-24 hours, kidneys 24-48 hours.'
    },
    {
      question: 'Who pays for the donation?',
      answer: 'The recipient\'s insurance covers all donation-related medical costs. There is no cost to the donor family.'
    },
    {
      question: 'Can I be a living donor?',
      answer: 'Yes! Living donation is possible for kidneys, liver lobes, and bone marrow. These donations happen while you\'re alive.'
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-b from-white to-gray-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 bg-rose-50 px-4 py-2 rounded-full mb-4">
            <Sparkles className="h-4 w-4 text-rose-500" />
            <span className="text-sm font-medium text-rose-700">Step-by-Step Process</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            How Organ
            <span className="bg-gradient-to-r from-rose-600 to-rose-500 bg-clip-text text-transparent mx-2">
              Donation Works
            </span>
          </h2>
          
          <p className="text-lg text-gray-600">
            From registration to saving lives - understand the careful, respectful process of organ donation.
          </p>
        </div>

        {/* Stats Banner */}
        <div className="mb-12 bg-gradient-to-r from-rose-50 to-pink-50 rounded-2xl p-6 border border-rose-100">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Process Section */}
        <div className="relative">
          
          {/* Desktop Connection Line */}
          <div className="hidden lg:block absolute top-24 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 via-emerald-400 via-amber-400 to-rose-400 opacity-30 z-0"></div>
          
          {/* Mobile Connection Line */}
          <div className="lg:hidden absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-400 via-emerald-400 via-amber-400 to-rose-400 opacity-30 z-0"></div>

          {/* Steps Container */}
          <div className="grid lg:grid-cols-4 gap-8 lg:gap-6 relative z-10">
            {steps.map((step, index) => (
              <div
                key={index}
                className="relative"
                onMouseEnter={() => setActiveStep(index)}
                onClick={() => setActiveStep(index)}
              >
                {/* Mobile Layout */}
                <div className="lg:hidden">
                  <div className={`flex items-start mb-8 transition-all duration-300 ${
                    activeStep === index ? 'scale-105' : ''
                  }`}>
                    {/* Step Number */}
                    <div className={`relative w-14 h-14 rounded-full flex items-center justify-center border-4 border-white shadow-xl mr-6 ${
                      activeStep === index 
                        ? `bg-gradient-to-r ${step.color}`
                        : 'bg-white'
                    }`}>
                      <div className={`text-lg font-bold ${
                        activeStep === index ? 'text-white' : 'text-gray-700'
                      }`}>
                        {step.number}
                      </div>
                      
                      {/* Active Indicator */}
                      {activeStep === index && (
                        <div className="absolute -inset-2 bg-gradient-to-r rounded-full animate-ping opacity-30"></div>
                      )}
                    </div>

                    {/* Step Content */}
                    <div className="flex-1">
                      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-lg">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center space-x-3">
                            <div className={`p-3 rounded-xl ${step.bgColor}`}>
                              <step.icon className={`h-6 w-6 ${step.iconColor}`} />
                            </div>
                            <div>
                              <h3 className="text-xl font-bold text-gray-900">{step.title}</h3>
                              <p className="text-gray-600 text-sm">{step.description}</p>
                            </div>
                          </div>
                          <ChevronRight className={`h-5 w-5 text-gray-400 transition-transform ${
                            activeStep === index ? 'translate-x-1 text-rose-500' : ''
                          }`} />
                        </div>

                        {/* Details */}
                        <div className="space-y-2 mb-4">
                          {step.details.slice(0, 3).map((detail, idx) => (
                            <div key={idx} className="flex items-center space-x-2">
                              <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                              <span className="text-sm text-gray-600">{detail}</span>
                            </div>
                          ))}
                        </div>

                        {/* Stats */}
                        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                          <div className="flex items-center space-x-2">
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
                </div>

                {/* Desktop Layout */}
                <div className="hidden lg:block">
                  <div className="flex flex-col items-center">
                    {/* Step Number Circle */}
                    <div className={`relative w-20 h-20 rounded-full flex items-center justify-center border-6 border-white shadow-2xl mb-8 cursor-pointer ${
                      activeStep === index 
                        ? `bg-gradient-to-r scale-110 ${step.color}`
                        : 'bg-white'
                    } transition-all duration-300`}
                    onClick={() => setActiveStep(index)}>
                      <div className={`text-2xl font-bold ${
                        activeStep === index ? 'text-white' : 'text-gray-700'
                      }`}>
                        {step.number.slice(1)}
                      </div>
                      
                      {/* Icon Overlay */}
                      <div className={`absolute -bottom-2 -right-2 w-12 h-12 ${step.bgColor} border-4 border-white rounded-full flex items-center justify-center shadow-lg`}>
                        <step.icon className={`h-6 w-6 ${step.iconColor}`} />
                      </div>

                      {/* Active State Glow */}
                      {activeStep === index && (
                        <>
                          <div className="absolute inset-0 bg-gradient-to-r rounded-full animate-ping opacity-30"></div>
                          <div className="absolute inset-0 bg-gradient-to-r rounded-full animate-pulse opacity-20"></div>
                        </>
                      )}
                    </div>

                    {/* Step Content */}
                    <div className={`w-full bg-white rounded-2xl border p-6 shadow-lg transition-all duration-300 transform ${
                      activeStep === index 
                        ? `border-${step.color.split(' ')[0].replace('from-', '')}-300 shadow-xl -translate-y-2 ring-2 ring-${step.color.split(' ')[0].replace('from-', '')}-100`
                        : 'border-gray-100 hover:border-rose-200 hover:-translate-y-1'
                    }`}>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                      <p className="text-gray-600 text-sm mb-4">{step.description}</p>
                      
                      {/* Quick Details */}
                      <div className="space-y-2 mb-4">
                        {step.details.slice(0, 2).map((detail, idx) => (
                          <div key={idx} className="flex items-start space-x-2">
                            <CheckCircle2 className="h-4 w-4 text-emerald-500 mt-0.5 flex-shrink-0" />
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

                    {/* Arrow Connector */}
                    {index < steps.length - 1 && (
                      <div className="absolute top-10 right-0 transform translate-x-1/2">
                        <ArrowRight className="h-8 w-8 text-gray-300" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Dots - Mobile */}
          <div className="lg:hidden flex justify-center space-x-2 mt-8">
            {steps.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveStep(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  activeStep === index 
                    ? 'bg-gradient-to-r from-rose-500 to-rose-400 w-6' 
                    : 'bg-gray-300'
                }`}
                aria-label={`Go to step ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Active Step Details Panel */}
        <div className={`mt-12 bg-white rounded-2xl border border-gray-100 shadow-xl overflow-hidden transition-all duration-500 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          {/* Panel Header */}
          <div className={`bg-gradient-to-r ${activeStepData.color} p-6`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                  <activeStepData.icon className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">Step {activeStepData.number}: {activeStepData.title}</h3>
                  <p className="text-white/90">{activeStepData.description}</p>
                </div>
              </div>
              <div className="hidden sm:block">
                <div className="text-white/80 text-sm bg-white/10 px-3 py-1 rounded-full">
                  {activeStepData.duration}
                </div>
              </div>
            </div>
          </div>

          {/* Panel Content */}
          <div className="p-6 lg:p-8">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Left: Details */}
              <div>
                <h4 className="font-bold text-gray-900 mb-4 flex items-center">
                  <FileText className="h-5 w-5 text-blue-500 mr-2" />
                  Process Details
                </h4>
                <div className="space-y-3">
                  {activeStepData.details.map((detail, idx) => (
                    <div key={idx} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-2 h-2 bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full mt-2"></div>
                      <span className="text-gray-700 flex-1">{detail}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: Tips & Info */}
              <div>
                <h4 className="font-bold text-gray-900 mb-4 flex items-center">
                  <Shield className="h-5 w-5 text-emerald-500 mr-2" />
                  Important Information
                </h4>
                <div className="space-y-4">
                  {/* Tips */}
                  <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-4 border border-blue-100">
                    <div className="flex items-center space-x-2 mb-2">
                      <Zap className="h-5 w-5 text-amber-500" />
                      <span className="font-medium text-gray-900">Helpful Tips</span>
                    </div>
                    <ul className="space-y-2">
                      {activeStepData.tips.map((tip, idx) => (
                        <li key={idx} className="flex items-start space-x-2">
                          <Sparkles className="h-4 w-4 text-amber-400 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-gray-600">{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Stats Card */}
                  <div className="bg-gradient-to-r from-gray-50 to-white rounded-xl p-4 border border-gray-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-2xl font-bold text-gray-900">{activeStepData.stats.split(' ')[0]}</div>
                        <div className="text-sm text-gray-600">{activeStepData.stats.split(' ').slice(1).join(' ')}</div>
                      </div>
                      <Users className="h-10 w-10 text-gray-300" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQs Section */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">
            Common Questions About the Process
          </h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="group bg-white rounded-xl border border-gray-100 p-6 hover:border-rose-200 transition-colors cursor-pointer"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2 group-hover:text-rose-600 transition-colors">
                      {faq.question}
                    </h4>
                    <p className="text-gray-600 text-sm">{faq.answer}</p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-rose-500 group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="inline-flex flex-col items-center bg-gradient-to-r from-white to-rose-50 rounded-2xl p-8 border border-rose-100 max-w-2xl">
            <div className="w-20 h-20 bg-gradient-to-r from-rose-500 to-rose-400 rounded-full flex items-center justify-center mb-6 relative">
              <Heart className="h-10 w-10 text-white" fill="white" />
              <div className="absolute inset-0 border-4 border-rose-300 rounded-full animate-ping"></div>
            </div>
            
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              Ready to Take the First Step?
            </h3>
            <p className="text-gray-600 mb-6 max-w-lg">
              Registration takes less than 5 minutes and could save up to 8 lives.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <button className="group px-8 py-4 bg-gradient-to-r from-rose-500 to-rose-400 text-white font-bold rounded-full shadow-2xl shadow-rose-300 hover:shadow-3xl hover:shadow-rose-400 transition-all duration-300 hover:scale-105 flex items-center space-x-3">
                <UserPlus className="h-6 w-6" />
                <span>Register as Donor (5 minutes)</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-2 transition-transform" />
              </button>
              
              <button className="px-8 py-4 bg-white text-gray-800 font-medium rounded-full border-2 border-rose-200 hover:border-rose-300 transition-colors flex items-center space-x-2">
                <Bell className="h-5 w-5 text-rose-500" />
                <span>Get Reminder to Register</span>
              </button>
            </div>
            
            <div className="mt-6 flex items-center space-x-2 text-sm text-gray-500">
              <Calendar className="h-4 w-4" />
              <span>National Donor Day: February 14th</span>
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-6">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Shield className="h-5 w-5 text-emerald-500" />
            <span>100% Confidential Registration</span>
          </div>
          <div className="hidden sm:block text-gray-300">•</div>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <MapPin className="h-5 w-5 text-blue-500" />
            <span>National Organ Registry</span>
          </div>
          <div className="hidden sm:block text-gray-300">•</div>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Award className="h-5 w-5 text-amber-500" />
            <span>Medically Supervised Process</span>
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
        
        @keyframes slide-in-right {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .animate-slide-in-right {
          animation: slide-in-right 0.5s ease-out forwards;
        }
      `}</style>
    </section>
  );
};

export default HowOrganDonationWorks;