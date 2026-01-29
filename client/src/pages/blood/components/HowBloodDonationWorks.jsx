import React, { useState, useEffect } from 'react';
import { 
  UserPlus,
  Stethoscope,
  Droplets,
  Heart,
  ArrowRight,
  CheckCircle2,
  Clock,
  Shield,
  Users,
  Sparkles,
  ChevronRight,
  Zap,
  Award,
  FileText,
  MapPin,
  Gift,
  AlertCircle
} from 'lucide-react';

const HowBloodDonationWorks = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    
    // Auto-advance steps
    const interval = setInterval(() => {
      setActiveStep(prev => (prev + 1) % steps.length);
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  const steps = [
    {
      number: '01',
      title: 'Registration & Screening',
      description: 'Quick registration and confidential health questionnaire to ensure donor safety.',
      icon: UserPlus,
      color: 'from-blue-500 to-cyan-400',
      iconColor: 'text-blue-500',
      bgColor: 'bg-blue-50',
      details: [
        'Complete registration form (5 minutes)',
        'Confidential health screening questionnaire',
        'Photo ID verification',
        'Basic information collection',
        'Donor card issuance'
      ],
      duration: '10-15 minutes',
      stats: '99.8% pass rate',
      tips: [
        'Bring valid photo ID',
        'Know your medical history',
        'Stay hydrated before arriving'
      ]
    },
    {
      number: '02',
      title: 'Health Check',
      description: 'Quick physical check including temperature, blood pressure, and hemoglobin test.',
      icon: Stethoscope,
      color: 'from-emerald-500 to-green-400',
      iconColor: 'text-emerald-500',
      bgColor: 'bg-emerald-50',
      details: [
        'Temperature check',
        'Blood pressure measurement',
        'Hemoglobin level test (finger prick)',
        'Pulse rate check',
        'Medical professional consultation'
      ],
      duration: '10 minutes',
      stats: 'Medical supervision',
      tips: [
        'Eat a healthy meal 2-3 hours before',
        'Avoid fatty foods',
        'Get good rest the night before'
      ]
    },
    {
      number: '03',
      title: 'Blood Donation',
      description: 'Comfortable donation process supervised by trained medical staff.',
      icon: Droplets,
      color: 'from-rose-500 to-pink-400',
      iconColor: 'text-rose-500',
      bgColor: 'bg-rose-50',
      details: [
        'Comfortable reclining chair',
        'Sterile, single-use equipment',
        'Supervised by trained staff',
        'Approximately 1 pint donation',
        'Typically 8-10 minutes'
      ],
      duration: '8-10 minutes',
      stats: '450ml collected',
      tips: [
        'Relax and breathe normally',
        'Squeeze stress ball if provided',
        'Inform staff if you feel uncomfortable'
      ]
    },
    {
      number: '04',
      title: 'Recovery & Refreshments',
      description: 'Brief rest period with snacks and fluids to help your body recover.',
      icon: Heart,
      color: 'from-amber-500 to-orange-400',
      iconColor: 'text-amber-500',
      bgColor: 'bg-amber-50',
      details: [
        '15-20 minute rest period',
        'Hydrating fluids provided',
        'Healthy snacks available',
        'Post-donation instructions',
        'Follow-up care guidance'
      ],
      duration: '15-20 minutes',
      stats: 'Immediate recovery',
      tips: [
        'Drink extra fluids for 24 hours',
        'Avoid heavy lifting for 5 hours',
        'Keep bandage on for 4-6 hours'
      ]
    }
  ];

  const activeStepData = steps[activeStep];

  const totalTime = steps.reduce((acc, step) => {
    const time = parseInt(step.duration.split(' ')[0]);
    return acc + time;
  }, 0);

  const donationStats = [
    { value: '45 min', label: 'Total Time', icon: Clock, color: 'text-blue-500' },
    { value: '450ml', label: 'Per Donation', icon: Droplets, color: 'text-rose-500' },
    { value: '3', label: 'Lives Saved', icon: Users, color: 'text-emerald-500' },
    // { value: '56 days', label: 'Next Donation', icon: Calendar, color: 'text-amber-500' }
  ];

  const faqs = [
    {
      question: 'Is the equipment sterile and safe?',
      answer: 'Yes. All equipment is sterile, single-use, and disposed of immediately after your donation.'
    },
    {
      question: 'Will I feel weak after donating?',
      answer: 'Most donors feel perfectly fine. You\'ll rest for 15 minutes and we provide snacks and drinks to help you recover.'
    },
    {
      question: 'How often can I donate?',
      answer: 'Every 56 days for whole blood donation. Your body needs this time to replenish red blood cells.'
    },
    {
      question: 'Can I donate if I\'m on medication?',
      answer: 'Most medications don\'t prevent donation. We\'ll review your medications during the health screening.'
    }
  ];

  const Calendar = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  );

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-b from-white to-gray-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 bg-rose-50 px-4 py-2 rounded-full mb-4">
            <Sparkles className="h-4 w-4 text-rose-500" />
            <span className="text-sm font-medium text-rose-700">Simple & Safe Process</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            How Blood
            <span className="bg-gradient-to-r from-rose-600 to-rose-500 bg-clip-text text-transparent mx-2">
              Donation Works
            </span>
          </h2>
          
          <p className="text-lg text-gray-600">
            From arrival to saving lives - see how quick and comfortable the donation process is.
          </p>
        </div>

        {/* Time Summary */}
        <div className="mb-12 bg-gradient-to-r from-rose-50 to-pink-50 rounded-2xl p-6 border border-rose-100">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0">
              <div className="text-2xl font-bold text-gray-900">{totalTime} minutes total</div>
              <div className="text-gray-600">Start to finish donation experience</div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {donationStats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className={`text-xl font-bold ${stat.color}`}>{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Process Section */}
        <div className="relative">
          
          {/* Desktop Connection Line */}
          <div className="hidden lg:block absolute top-24 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 via-emerald-400 via-rose-400 to-amber-400 opacity-30 z-0"></div>
          
          {/* Mobile Connection Line */}
          <div className="lg:hidden absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-400 via-emerald-400 via-rose-400 to-amber-400 opacity-30 z-0"></div>

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

                        {/* Quick Details */}
                        <div className="space-y-2 mb-4">
                          {step.details.slice(0, 2).map((detail, idx) => (
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

              {/* Right: Tips & Safety */}
              <div>
                <div className="space-y-6">
                  {/* Tips Card */}
                  <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-5 border border-blue-100">
                    <div className="flex items-center space-x-2 mb-3">
                      <Zap className="h-5 w-5 text-amber-500" />
                      <span className="font-bold text-gray-900">Helpful Tips</span>
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

                  {/* Safety Card */}
                  <div className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl p-5 border border-emerald-100">
                    <div className="flex items-center space-x-2 mb-3">
                      <Shield className="h-5 w-5 text-emerald-500" />
                      <span className="font-bold text-gray-900">Safety Measures</span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                        <span className="text-sm text-gray-600">Sterile, single-use equipment</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                        <span className="text-sm text-gray-600">Trained medical staff</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                        <span className="text-sm text-gray-600">Confidential health screening</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
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

        {/* Preparation Checklist */}
        <div className="mt-16 bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-8 border border-amber-100">
          <div className="flex flex-col lg:flex-row items-start gap-8">
            <div className="lg:w-1/3">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-3 bg-amber-100 rounded-xl">
                  <AlertCircle className="h-6 w-6 text-amber-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Before You Donate</h3>
              </div>
              <p className="text-gray-600">
                Follow these simple steps to ensure a smooth donation experience.
              </p>
            </div>
            
            <div className="lg:w-2/3">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex items-start space-x-3 p-4 bg-white rounded-xl border border-amber-100">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500 mt-0.5" />
                  <div>
                    <div className="font-medium text-gray-900">Hydrate Well</div>
                    <div className="text-sm text-gray-600">Drink extra water day before</div>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-4 bg-white rounded-xl border border-amber-100">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500 mt-0.5" />
                  <div>
                    <div className="font-medium text-gray-900">Eat Healthy Meal</div>
                    <div className="text-sm text-gray-600">2-3 hours before donation</div>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-4 bg-white rounded-xl border border-amber-100">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500 mt-0.5" />
                  <div>
                    <div className="font-medium text-gray-900">Bring ID</div>
                    <div className="text-sm text-gray-600">Photo identification required</div>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-4 bg-white rounded-xl border border-amber-100">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500 mt-0.5" />
                  <div>
                    <div className="font-medium text-gray-900">Wear Comfortable Clothes</div>
                    <div className="text-sm text-gray-600">Short sleeves recommended</div>
                  </div>
                </div>
              </div>
            </div>
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
              Ready to Save Lives?
            </h3>
            <p className="text-gray-600 mb-6 max-w-lg">
              Now that you know how simple it is, take the next step and schedule your donation.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <button className="group px-8 py-4 bg-gradient-to-r from-rose-500 to-rose-400 text-white font-bold rounded-full shadow-2xl shadow-rose-300 hover:shadow-3xl hover:shadow-rose-400 transition-all duration-300 hover:scale-105 flex items-center space-x-3">
                <MapPin className="h-6 w-6" />
                <span>Find Nearest Center</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-2 transition-transform" />
              </button>
              
              <button className="px-8 py-4 bg-white text-gray-800 font-medium rounded-full border-2 border-rose-200 hover:border-rose-300 transition-colors flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-rose-500" />
                <span>Schedule Appointment</span>
              </button>
            </div>
            
            <div className="mt-6 text-sm text-gray-500">
              <span className="flex items-center space-x-1">
                <Award className="h-4 w-4" />
                <span>First-time donors receive special recognition</span>
              </span>
            </div>
          </div>
        </div>

        {/* Safety Assurance */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-gray-600">
          <div className="flex items-center space-x-2">
            <Shield className="h-5 w-5 text-emerald-500" />
            <span>100% Safe & Sterile Process</span>
          </div>
          <div className="hidden sm:block text-gray-300">•</div>
          <div className="flex items-center space-x-2">
            <Users className="h-5 w-5 text-blue-500" />
            <span>Trained Medical Staff</span>
          </div>
          <div className="hidden sm:block text-gray-300">•</div>
          <div className="flex items-center space-x-2">
            <Gift className="h-5 w-5 text-rose-500" />
            <span>3 Lives Saved Per Donation</span>
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

export default HowBloodDonationWorks;