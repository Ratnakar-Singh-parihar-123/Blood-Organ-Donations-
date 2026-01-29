import React, { useState } from 'react';
import { 
  Shield,
  CheckCircle2,
  Lock,
  FileText,
  Hospital,
  Users,
  Stethoscope,
  Award,
  Clock,
  EyeOff,
  Heart,
  Sparkles,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  Zap,
  Scale,
  ClipboardCheck,
  Building,
  Phone,
  MessageCircle,
  ArrowRight
} from 'lucide-react';

const SafetyAndProcess = () => {
  const [expandedItems, setExpandedItems] = useState([]);

  const safetyFeatures = [
    {
      id: 'medical',
      title: 'Medical Safety Standards',
      icon: Shield,
      color: 'from-emerald-500 to-green-400',
      iconColor: 'text-emerald-500',
      bgColor: 'bg-emerald-50',
      description: 'All donations follow strict medical protocols supervised by certified professionals.',
      details: [
        'Sterile surgical environment maintained',
        'Single-use, disposable medical equipment',
        'Trained transplant surgeons and nurses',
        'Post-procedure medical documentation',
        'Infection prevention protocols followed'
      ],
      assurance: 'ISO 9001:2015 Certified Medical Procedures'
    },
    {
      id: 'legal',
      title: 'Legal & Ethical Approvals',
      icon: Scale,
      color: 'from-blue-500 to-cyan-400',
      iconColor: 'text-blue-500',
      bgColor: 'bg-blue-50',
      description: 'Every donation complies with national laws and ethical guidelines.',
      details: [
        'Uniform Anatomical Gift Act compliance',
        'Donor registry verification',
        'Family consent documentation',
        'Medical examiner clearance',
        'Organ Procurement Organization oversight'
      ],
      assurance: '100% Legal Compliance Guaranteed'
    },
    {
      id: 'confidentiality',
      title: 'Complete Confidentiality',
      icon: Lock,
      color: 'from-purple-500 to-violet-400',
      iconColor: 'text-purple-500',
      bgColor: 'bg-purple-50',
      description: 'Your privacy is protected throughout the entire process.',
      details: [
        'HIPAA-compliant data protection',
        'Anonymous donor-recipient matching',
        'Encrypted medical records',
        'Restricted access to donor information',
        'Optional family communication only with consent'
      ],
      assurance: 'HIPAA Compliant • GDPR Ready'
    },
    {
      id: 'coordination',
      title: 'Hospital Coordination',
      icon: Building,
      color: 'from-amber-500 to-orange-400',
      iconColor: 'text-amber-500',
      bgColor: 'bg-amber-50',
      description: 'Seamless coordination between multiple medical facilities.',
      details: [
        '24/7 transplant coordinator team',
        'Real-time organ tracking system',
        'Multi-hospital communication network',
        'Transport logistics coordination',
        'Recipient hospital preparation'
      ],
      assurance: '150+ Partner Hospitals Nationwide'
    }
  ];

  const processTimeline = [
    {
      step: 1,
      title: 'Initial Assessment',
      description: 'Medical team evaluates organ suitability',
      time: '1-2 hours',
      icon: Stethoscope,
      color: 'bg-blue-100 text-blue-700'
    },
    {
      step: 2,
      title: 'Legal Verification',
      description: 'Confirm donor registration and consent',
      time: '30-60 minutes',
      icon: FileText,
      color: 'bg-emerald-100 text-emerald-700'
    },
    {
      step: 3,
      title: 'Medical Testing',
      description: 'Blood tests, tissue typing, viability checks',
      time: '2-4 hours',
      icon: ClipboardCheck,
      color: 'bg-amber-100 text-amber-700'
    },
    {
      step: 4,
      title: 'Recipient Matching',
      description: 'National system matches with compatible recipients',
      time: '1-3 hours',
      icon: Users,
      color: 'bg-purple-100 text-purple-700'
    },
    {
      step: 5,
      title: 'Surgical Procedure',
      description: 'Respectful surgical organ recovery',
      time: '2-6 hours',
      icon: Heart,
      color: 'bg-rose-100 text-rose-700'
    },
    {
      step: 6,
      title: 'Transplant & Follow-up',
      description: 'Organ transplantation and recipient care',
      time: 'Ongoing',
      icon: Award,
      color: 'bg-indigo-100 text-indigo-700'
    }
  ];

  const commonConcerns = [
    {
      concern: 'Will donation delay or change my funeral plans?',
      answer: 'No. Donation is completed within hours, allowing funeral arrangements to proceed as planned. The body is treated with respect, and open-casket funerals are still possible.',
      icon: Clock
    },
    {
      concern: 'Are there costs to my family?',
      answer: 'No. All donation-related medical costs are covered by the recipient\'s insurance. Your family pays nothing for the donation process.',
      icon: Shield
    },
    {
      concern: 'Will my family know who receives my organs?',
      answer: 'Only if you choose. The process is confidential, but donor families can choose to receive anonymous updates about transplant outcomes.',
      icon: EyeOff
    },
    {
      concern: 'What if my family disagrees with my decision?',
      answer: 'Your registered decision is legally binding. However, we encourage discussing your wishes with family to ensure they understand and support your choice.',
      icon: Users
    }
  ];

  const trustMetrics = [
    { value: '99.8%', label: 'Safety Record', icon: Shield, color: 'text-emerald-600' },
    { value: '24/7', label: 'Medical Oversight', icon: Clock, color: 'text-blue-600' },
    { value: '100%', label: 'Legal Compliance', icon: Scale, color: 'text-amber-600' },
    { value: '150+', label: 'Partner Hospitals', icon: Building, color: 'text-purple-600' }
  ];

  const toggleExpand = (id) => {
    setExpandedItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-b from-white to-blue-50/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 bg-blue-50 px-4 py-2 rounded-full mb-4">
            <Shield className="h-4 w-4 text-blue-500" fill="#3b82f6" />
            <span className="text-sm font-medium text-blue-700">Safety First Process</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Your Safety is Our
            <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent mx-2">
              Priority
            </span>
          </h2>
          
          <p className="text-lg text-gray-600">
            Every aspect of organ donation follows strict medical, legal, and ethical standards to ensure complete safety and respect.
          </p>
        </div>

        {/* Trust Metrics */}
        <div className="mb-12 bg-gradient-to-r from-white to-blue-50 rounded-2xl p-6 border border-blue-100 shadow-sm">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {trustMetrics.map((metric, index) => (
              <div key={index} className="text-center">
                <div className={`text-2xl font-bold ${metric.color}`}>{metric.value}</div>
                <div className="text-sm text-gray-600 flex items-center justify-center space-x-1">
                  <metric.icon className="h-4 w-4" />
                  <span>{metric.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Safety Features Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {safetyFeatures.map((feature) => (
            <div
              key={feature.id}
              className="bg-white rounded-2xl border border-gray-100 p-6 shadow-lg hover:shadow-xl transition-shadow"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`p-3 rounded-xl ${feature.bgColor}`}>
                    <feature.icon className={`h-6 w-6 ${feature.iconColor}`} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{feature.title}</h3>
                </div>
                <button
                  onClick={() => toggleExpand(feature.id)}
                  className="p-2 text-gray-400 hover:text-blue-500"
                >
                  {expandedItems.includes(feature.id) ? (
                    <ChevronUp className="h-5 w-5" />
                  ) : (
                    <ChevronDown className="h-5 w-5" />
                  )}
                </button>
              </div>

              {/* Description */}
              <p className="text-gray-600 mb-4">{feature.description}</p>

              {/* Expanded Details */}
              {expandedItems.includes(feature.id) && (
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="space-y-3">
                    {feature.details.map((detail, idx) => (
                      <div key={idx} className="flex items-start space-x-3">
                        <CheckCircle2 className="h-5 w-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{detail}</span>
                      </div>
                    ))}
                  </div>
                  
                  {/* Assurance Badge */}
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="flex items-center space-x-2">
                      <Award className="h-5 w-5 text-amber-500" />
                      <span className="text-sm font-medium text-gray-700">{feature.assurance}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Progress Indicator */}
              <div className="mt-4">
                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className={`h-full bg-gradient-to-r ${feature.color} rounded-full transition-all duration-1000 ${
                      expandedItems.includes(feature.id) ? 'w-full' : 'w-3/4'
                    }`}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Process Timeline */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Step-by-Step Process</h3>
            <p className="text-gray-600">Transparent timeline showing the respectful, organized donation process</p>
          </div>

          {/* Desktop Timeline */}
          <div className="hidden lg:block">
            <div className="relative">
              {/* Connecting Line */}
              <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 via-emerald-400 via-amber-400 to-rose-400 opacity-30 z-0"></div>
              
              {/* Steps */}
              <div className="relative z-10 grid grid-cols-6 gap-4">
                {processTimeline.map((step) => (
                  <div key={step.step} className="text-center">
                    {/* Step Circle */}
                    <div className="relative mb-4">
                      <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto ${step.color.split(' ')[0]} border-4 border-white shadow-lg`}>
                        <step.icon className="h-7 w-7" />
                      </div>
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full border-2 border-gray-200 flex items-center justify-center">
                        <span className="text-sm font-bold text-gray-700">{step.step}</span>
                      </div>
                    </div>

                    {/* Step Info */}
                    <h4 className="font-bold text-gray-900 mb-1">{step.title}</h4>
                    <p className="text-sm text-gray-600 mb-2">{step.description}</p>
                    <div className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-full inline-block">
                      {step.time}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile Timeline */}
          <div className="lg:hidden">
            <div className="relative">
              {/* Connecting Line */}
              <div className="absolute left-6 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-400 via-emerald-400 via-amber-400 to-rose-400 opacity-30 z-0"></div>
              
              {/* Steps */}
              <div className="space-y-8">
                {processTimeline.map((step) => (
                  <div key={step.step} className="flex items-start">
                    {/* Step Circle */}
                    <div className="relative z-10">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${step.color.split(' ')[0]} border-4 border-white shadow-lg`}>
                        <step.icon className="h-6 w-6" />
                      </div>
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-white rounded-full border-2 border-gray-200 flex items-center justify-center">
                        <span className="text-xs font-bold text-gray-700">{step.step}</span>
                      </div>
                    </div>

                    {/* Step Info */}
                    <div className="ml-6 flex-1 bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
                      <h4 className="font-bold text-gray-900 mb-1">{step.title}</h4>
                      <p className="text-sm text-gray-600 mb-2">{step.description}</p>
                      <div className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-full inline-block">
                        {step.time}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Common Concerns */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Addressing Common Concerns</h3>
            <p className="text-gray-600">We understand you may have questions. Here are reassuring answers.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {commonConcerns.map((concern, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <concern.icon className="h-5 w-5 text-blue-500" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-900 mb-2">{concern.concern}</h4>
                    <p className="text-gray-600">{concern.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Medical Professional Assurance */}
        <div className="mb-16 bg-gradient-to-r from-emerald-50 to-green-50 rounded-2xl p-8 border border-emerald-100">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            <div className="lg:w-1/3 text-center lg:text-left">
              <div className="inline-flex items-center space-x-2 bg-white/80 px-4 py-2 rounded-full mb-4">
                <Stethoscope className="h-4 w-4 text-emerald-500" />
                <span className="text-sm font-medium text-emerald-700">Medical Assurance</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Medically Supervised Every Step
              </h3>
              <p className="text-gray-600">
                From initial assessment to transplant surgery, every stage is supervised by certified medical professionals following strict protocols.
              </p>
            </div>

            <div className="lg:w-2/3">
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl p-6 border border-gray-100">
                  <div className="flex items-center space-x-3 mb-4">
                    <Hospital className="h-8 w-8 text-blue-500" />
                    <div>
                      <div className="font-bold text-gray-900">Hospital Standards</div>
                      <div className="text-sm text-gray-600">Level 1 Trauma Center Protocols</div>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm">
                    All donations occur in hospitals meeting the highest medical standards with emergency backup.
                  </p>
                </div>

                <div className="bg-white rounded-xl p-6 border border-gray-100">
                  <div className="flex items-center space-x-3 mb-4">
                    <Users className="h-8 w-8 text-purple-500" />
                    <div>
                      <div className="font-bold text-gray-900">24/7 Support Team</div>
                      <div className="text-sm text-gray-600">Transplant Coordinators</div>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm">
                    Dedicated team available round-the-clock to guide families through the process with compassion.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Have More Questions?</h3>
            <p className="text-gray-600">Our medical advisors are here to help with specific concerns.</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl border border-gray-100 p-8">
              <div className="flex items-center space-x-3 mb-6">
                <MessageCircle className="h-8 w-8 text-blue-500" />
                <div>
                  <h4 className="font-bold text-gray-900">Talk to a Medical Advisor</h4>
                  <p className="text-gray-600">Get answers to your specific questions</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                  <Phone className="h-5 w-5 text-blue-500" />
                  <div>
                    <div className="font-medium text-gray-900">Medical Helpline</div>
                    <div className="text-blue-600 font-bold">1-800-DONATE-NOW</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-3 bg-emerald-50 rounded-lg">
                  <Clock className="h-5 w-5 text-emerald-500" />
                  <div>
                    <div className="font-medium text-gray-900">Available Hours</div>
                    <div className="text-gray-600">24/7 Emergency Support</div>
                  </div>
                </div>
              </div>
              
              <button className="w-full mt-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-400 text-white font-semibold rounded-lg hover:shadow-lg transition-all">
                Schedule a Call Back
              </button>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 p-8">
              <div className="flex items-center space-x-3 mb-6">
                <FileText className="h-8 w-8 text-purple-500" />
                <div>
                  <h4 className="font-bold text-gray-900">Download Information</h4>
                  <p className="text-gray-600">Detailed guides and documentation</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <button className="w-full p-4 text-left border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors">
                  <div className="font-medium text-gray-900">Complete Safety Guide</div>
                  <div className="text-sm text-gray-600">PDF • 12 pages</div>
                </button>
                
                <button className="w-full p-4 text-left border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-colors">
                  <div className="font-medium text-gray-900">Legal & Ethical Framework</div>
                  <div className="text-sm text-gray-600">PDF • 8 pages</div>
                </button>
                
                <button className="w-full p-4 text-left border border-gray-200 rounded-lg hover:border-emerald-300 hover:bg-emerald-50 transition-colors">
                  <div className="font-medium text-gray-900">Family Discussion Guide</div>
                  <div className="text-sm text-gray-600">PDF • 6 pages</div>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl p-8 text-white text-center">
          <div className="max-w-2xl mx-auto">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-6">
              <Shield className="h-8 w-8" />
            </div>
            
            <h3 className="text-2xl lg:text-3xl font-bold mb-4">
              Ready to Make a Safe, Informed Decision?
            </h3>
            <p className="text-white/90 mb-6">
              Your safety and peace of mind are our highest priorities. Register with confidence.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button className="px-8 py-4 bg-white text-blue-600 font-bold rounded-lg shadow-2xl hover:shadow-3xl transition-all hover:scale-105 flex items-center justify-center space-x-2">
                <CheckCircle2 className="h-6 w-6" />
                <span>Register with Confidence</span>
                <ArrowRight className="h-5 w-5" />
              </button>
              
              <button className="px-8 py-4 bg-white/20 backdrop-blur-sm text-white font-medium rounded-lg hover:bg-white/30 transition-colors">
                Watch Safety Video
              </button>
            </div>
            
            <div className="mt-6 flex items-center justify-center space-x-4 text-sm text-white/80">
              <div className="flex items-center space-x-1">
                <Lock className="h-4 w-4" />
                <span>100% Secure Registration</span>
              </div>
              <span>•</span>
              <div className="flex items-center space-x-1">
                <AlertCircle className="h-4 w-4" />
                <span>No Cost • No Obligation</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx global>{`
        @keyframes gentle-glow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }
        .animate-gentle-glow {
          animation: gentle-glow 2s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default SafetyAndProcess;