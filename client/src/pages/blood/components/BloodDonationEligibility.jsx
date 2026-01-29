import React, { useState } from 'react';
import { 
  CheckCircle2,
  XCircle,
  Calendar,
  Scale,
  Heart,
  Clock,
  Shield,
  Users,
  AlertCircle,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Stethoscope,
  Thermometer,
  Pill,
  Zap,
  FileText,
  MessageCircle,
  ArrowRight
} from 'lucide-react';

const BloodDonationEligibility = () => {
  const [expandedSections, setExpandedSections] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');

  const eligibilityCriteria = [
    {
      category: 'Age Requirements',
      icon: Calendar,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50',
      points: [
        {
          title: 'Minimum Age: 16 years',
          description: '16-17 year olds need parental/guardian consent. Proper ID required.',
          isEligible: true,
          detail: 'In most states, 16-year-olds can donate with parental consent. 18+ can donate independently.'
        },
        {
          title: 'Maximum Age: No upper limit',
          description: 'Healthy donors of any age can donate if they meet other criteria.',
          isEligible: true,
          detail: 'Many regular donors continue donating into their 70s and beyond.'
        },
        {
          title: 'Age 76+: Medical clearance',
          description: 'Donors 76+ need annual medical clearance letter from doctor.',
          isEligible: true,
          detail: 'Simple health assessment required to ensure safety.'
        }
      ],
      summary: 'Most people 16-75 can donate without special requirements.'
    },
    {
      category: 'Weight & Physical',
      icon: Scale,
      color: 'text-emerald-500',
      bgColor: 'bg-emerald-50',
      points: [
        {
          title: 'Minimum Weight: 110 lbs (50 kg)',
          description: 'To ensure donor safety and adequate blood volume.',
          isEligible: true,
          detail: 'Weight requirement ensures donation is safe for the donor.'
        },
        {
          title: 'Height & Weight Proportion',
          description: 'Must be in proportion to ensure safety.',
          isEligible: true,
          detail: 'Medical staff will assess if donation is safe based on your build.'
        },
        {
          title: 'Recent tattoos/piercings',
          description: 'Must wait 3 months if done in unregulated facility.',
          isEligible: false,
          detail: 'Waiting period reduces infection risk. Professional licensed parlors may have shorter wait.'
        }
      ],
      summary: 'Healthy individuals meeting weight requirements are generally eligible.'
    },
    {
      category: 'Health Conditions',
      icon: Heart,
      color: 'text-rose-500',
      bgColor: 'bg-rose-50',
      points: [
        {
          title: 'Controlled High Blood Pressure',
          description: 'Acceptable if below 180/100 at time of donation.',
          isEligible: true,
          detail: 'Medication for hypertension is usually acceptable.'
        },
        {
          title: 'Diabetes',
          description: 'Acceptable if well-controlled and no complications.',
          isEligible: true,
          detail: 'Both Type 1 and Type 2 diabetics can donate if well-managed.'
        },
        {
          title: 'Active infections or fever',
          description: 'Must wait until fully recovered.',
          isEligible: false,
          detail: 'Cold, flu, or any infection requires full recovery before donating.'
        },
        {
          title: 'Cancer',
          description: 'Depends on type and treatment status.',
          isEligible: false,
          detail: 'Many cancer survivors can donate after being cancer-free for specified period.'
        }
      ],
      summary: 'Most common health conditions don\'t prevent donation.'
    },
    {
      category: 'Medications & Treatments',
      icon: Pill,
      color: 'text-purple-500',
      bgColor: 'bg-purple-50',
      points: [
        {
          title: 'Most medications acceptable',
          description: 'Blood pressure, cholesterol, thyroid, birth control, etc.',
          isEligible: true,
          detail: 'Over 90% of common medications don\'t affect eligibility.'
        },
        {
          title: 'Antibiotics',
          description: 'Must complete course and be symptom-free for 24 hours.',
          isEligible: false,
          detail: 'Waiting period ensures infection is fully treated.'
        },
        {
          title: 'Blood thinners (Warfarin, etc.)',
          description: 'Usually not eligible due to bleeding risk.',
          isEligible: false,
          detail: 'Alternative medications may have different rules.'
        }
      ],
      summary: 'Medication use rarely prevents donation.'
    },
    {
      category: 'Donation Frequency',
      icon: Clock,
      color: 'text-amber-500',
      bgColor: 'bg-amber-50',
      points: [
        {
          title: 'Whole Blood: Every 56 days',
          description: 'Maximum 6 times per year.',
          isEligible: true,
          detail: 'Your body needs time to replenish red blood cells.'
        },
        {
          title: 'Platelets: Every 7 days',
          description: 'Maximum 24 times per year.',
          isEligible: true,
          detail: 'Platelets regenerate faster than red blood cells.'
        },
        {
          title: 'Plasma: Every 28 days',
          description: 'Maximum 13 times per year.',
          isEligible: true,
          detail: 'Plasma donation has different recovery timeline.'
        }
      ],
      summary: 'Regular donors can donate multiple times per year.'
    },
    {
      category: 'Travel & Lifestyle',
      icon: Users,
      color: 'text-indigo-500',
      bgColor: 'bg-indigo-50',
      points: [
        {
          title: 'Recent international travel',
          description: 'Some destinations may require waiting period.',
          isEligible: true,
          detail: 'Malaria-risk areas typically require 3-month wait.'
        },
        {
          title: 'Dental procedures',
          description: 'Routine cleaning: no wait. Extractions: 72 hours.',
          isEligible: true,
          detail: 'Minor procedures have short wait times.'
        },
        {
          title: 'Pregnancy & breastfeeding',
          description: 'Wait 6 weeks after delivery. Breastfeeding allowed.',
          isEligible: false,
          detail: 'Postpartum period requires recovery time.'
        }
      ],
      summary: 'Most travel and lifestyle factors have simple guidelines.'
    }
  ];

  const commonMyths = [
    {
      myth: 'I can\'t donate because I take medication',
      fact: 'Most medications don\'t prevent donation. Only a few specific drugs are restrictions.',
      icon: Pill
    },
    {
      myth: 'I\'m too old to donate',
      fact: 'There\'s no upper age limit. Many donors continue into their 70s and 80s.',
      icon: Calendar
    },
    {
      myth: 'I need to know my blood type',
      fact: 'We test your blood type when you donate. You don\'t need to know it beforehand.',
      icon: Heart
    },
    {
      myth: 'Donating blood is painful',
      fact: 'Most donors feel only a brief pinch. The process is quick and comfortable.',
      icon: Shield
    }
  ];

  const quickChecklist = [
    { question: 'Are you at least 16 years old?', key: 'age' },
    { question: 'Do you weigh at least 110 lbs (50 kg)?', key: 'weight' },
    { question: 'Are you feeling healthy today?', key: 'health' },
    { question: 'Has it been 8+ weeks since last donation?', key: 'frequency' }
  ];

  const faqs = [
    {
      question: 'Can I donate if I have a tattoo?',
      answer: 'Yes, if it was done at a licensed facility with sterile equipment. There\'s typically a 3-month wait if done elsewhere.'
    },
    {
      question: 'What about piercings?',
      answer: 'Same as tattoos. Professional piercings are usually fine, others may require 3-month wait.'
    },
    {
      question: 'Can I donate if I\'ve had COVID-19?',
      answer: 'Yes, after full recovery and 14 days symptom-free. Vaccination doesn\'t affect eligibility.'
    },
    {
      question: 'Is there an age limit?',
      answer: 'No upper age limit. Healthy donors of any age can donate with proper medical clearance if over 75.'
    }
  ];

  const toggleSection = (index) => {
    setExpandedSections(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const filters = [
    { id: 'all', label: 'All Criteria', count: eligibilityCriteria.length },
    { id: 'age', label: 'Age & Weight', count: 2 },
    { id: 'health', label: 'Health', count: 2 },
    { id: 'frequency', label: 'Frequency', count: 1 },
    { id: 'lifestyle', label: 'Lifestyle', count: 1 }
  ];

  const filteredCriteria = eligibilityCriteria.filter(criteria => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'age') return ['Age Requirements', 'Weight & Physical'].includes(criteria.category);
    if (activeFilter === 'health') return ['Health Conditions', 'Medications & Treatments'].includes(criteria.category);
    if (activeFilter === 'frequency') return criteria.category === 'Donation Frequency';
    if (activeFilter === 'lifestyle') return criteria.category === 'Travel & Lifestyle';
    return true;
  });

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-b from-white to-rose-50/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 bg-rose-50 px-4 py-2 rounded-full mb-4">
            <Sparkles className="h-4 w-4 text-rose-500" />
            <span className="text-sm font-medium text-rose-700">Who Can Donate</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Blood Donation
            <span className="bg-gradient-to-r from-rose-600 to-rose-500 bg-clip-text text-transparent mx-2">
              Eligibility
            </span>
          </h2>
          
          <p className="text-lg text-gray-600">
            Most healthy adults can donate blood. Check the simple requirements below.
          </p>
        </div>

        {/* Stats Banner */}
        <div className="mb-12 bg-gradient-to-r from-rose-50 to-pink-50 rounded-2xl p-6 border border-rose-100">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-rose-600">90%</div>
              <div className="text-sm text-gray-600">Of Adults Eligible</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-emerald-600">16+</div>
              <div className="text-sm text-gray-600">Minimum Age</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">110 lbs</div>
              <div className="text-sm text-gray-600">Minimum Weight</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-amber-600">56 days</div>
              <div className="text-sm text-gray-600">Between Donations</div>
            </div>
          </div>
        </div>

        {/* Quick Self-Check */}
        <div className="mb-12 bg-white rounded-2xl border border-gray-100 p-6 shadow-lg">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-3 bg-rose-50 rounded-xl">
              <Zap className="h-6 w-6 text-rose-500" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">Quick Self-Check</h3>
              <p className="text-gray-600">Answer these 4 questions to check basic eligibility</p>
            </div>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickChecklist.map((item, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center justify-between mb-3">
                  <div className="text-sm font-medium text-gray-900">{item.question}</div>
                  <div className="flex space-x-1">
                    <button className="w-8 h-8 bg-emerald-100 text-emerald-700 rounded-lg flex items-center justify-center hover:bg-emerald-200 transition-colors">
                      ✓
                    </button>
                    <button className="w-8 h-8 bg-rose-100 text-rose-700 rounded-lg flex items-center justify-center hover:bg-rose-200 transition-colors">
                      ✗
                    </button>
                  </div>
                </div>
                <div className="text-xs text-gray-500">
                  {item.key === 'age' && '16-17 need parental consent'}
                  {item.key === 'weight' && 'Approximately 50 kg'}
                  {item.key === 'health' && 'No fever or illness'}
                  {item.key === 'frequency' && 'For whole blood donation'}
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-center sm:text-left">
                <div className="text-sm text-gray-600">Based on your answers:</div>
                <div className="text-lg font-bold text-emerald-600">You're Likely Eligible!</div>
              </div>
              <button className="px-6 py-3 bg-gradient-to-r from-rose-500 to-rose-400 text-white font-semibold rounded-lg hover:shadow-lg transition-all">
                Take Detailed Assessment
              </button>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 justify-center">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeFilter === filter.id
                    ? 'bg-gradient-to-r from-rose-500 to-rose-400 text-white shadow-lg'
                    : 'bg-white text-gray-700 border border-gray-200 hover:border-rose-200'
                }`}
              >
                {filter.label}
                <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                  activeFilter === filter.id
                    ? 'bg-white/30 text-white'
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  {filter.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Eligibility Criteria Grid */}
        <div className="space-y-4 mb-16">
          {filteredCriteria.map((criteria, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl border border-gray-100 shadow-lg hover:shadow-xl transition-shadow"
            >
              {/* Section Header */}
              <div
                className="p-6 cursor-pointer"
                onClick={() => toggleSection(index)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`p-3 rounded-xl ${criteria.bgColor}`}>
                      <criteria.icon className={`h-6 w-6 ${criteria.color}`} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{criteria.category}</h3>
                      <p className="text-gray-600 text-sm">{criteria.summary}</p>
                    </div>
                  </div>
                  
                  <button className="p-2 text-gray-400 hover:text-rose-500">
                    {expandedSections.includes(index) ? (
                      <ChevronUp className="h-5 w-5" />
                    ) : (
                      <ChevronDown className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Expanded Content */}
              {expandedSections.includes(index) && (
                <div className="px-6 pb-6 border-t border-gray-100 pt-6">
                  <div className="space-y-4">
                    {criteria.points.map((point, idx) => (
                      <div key={idx} className="p-4 rounded-xl border border-gray-100 hover:border-rose-100 transition-colors">
                        <div className="flex items-start space-x-3">
                          <div className={`p-1.5 rounded-full ${point.isEligible ? 'bg-emerald-100' : 'bg-rose-100'}`}>
                            {point.isEligible ? (
                              <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                            ) : (
                              <XCircle className="h-5 w-5 text-rose-500" />
                            )}
                          </div>
                          <div className="flex-1">
                            <div className={`font-medium ${point.isEligible ? 'text-emerald-700' : 'text-rose-700'}`}>
                              {point.title}
                            </div>
                            <p className="text-gray-600 mt-1">{point.description}</p>
                            <p className="text-sm text-gray-500 mt-2">{point.detail}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Common Myths */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Common Myths Debunked</h3>
            <p className="text-gray-600">Get the facts about common misconceptions</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {commonMyths.map((myth, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-rose-50 rounded-lg">
                    <myth.icon className="h-5 w-5 text-rose-500" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <XCircle className="h-5 w-5 text-rose-500" />
                      <span className="font-medium text-gray-900">Myth</span>
                    </div>
                    <p className="text-gray-700 mb-3">{myth.myth}</p>
                    
                    <div className="flex items-center space-x-2 mb-2">
                      <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                      <span className="font-medium text-gray-900">Fact</span>
                    </div>
                    <p className="text-emerald-700">{myth.fact}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Medical Professional Assurance */}
        <div className="mb-16 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-8 border border-blue-100">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            <div className="lg:w-1/3 text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full mb-4">
                <Stethoscope className="h-10 w-10 text-white" />
              </div>
              <div className="text-sm font-medium text-blue-700 mb-2">Medical Assurance</div>
              <h3 className="text-xl font-bold text-gray-900">Safety First</h3>
            </div>
            
            <div className="lg:w-2/3">
              <blockquote className="text-lg text-gray-700 italic mb-4">
                "Every donor undergoes a confidential health screening before donation. 
                Our priority is both donor safety and recipient safety. If you have specific 
                health questions, our medical staff is here to help."
              </blockquote>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-bold text-gray-900">Dr. Maria Rodriguez</div>
                  <div className="text-sm text-gray-600">Medical Director, 15+ years experience</div>
                </div>
                <Shield className="h-8 w-8 text-emerald-400" />
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Frequently Asked Questions</h3>
            <p className="text-gray-600">Quick answers to common eligibility questions</p>
          </div>

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
                  {/* <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-rose-500 group-hover:translate-x-1 transition-all" /> */}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Final CTA */}
        <div className="bg-gradient-to-r from-rose-500 to-rose-400 rounded-2xl p-8 text-white text-center">
          <div className="max-w-2xl mx-auto">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-6">
              <Heart className="h-8 w-8" />
            </div>
            
            <h3 className="text-2xl lg:text-3xl font-bold mb-4">
              Ready to Check Your Eligibility?
            </h3>
            <p className="text-white/90 mb-6">
              Take our 2-minute detailed assessment and schedule your donation appointment.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button className="px-8 py-4 bg-white text-rose-600 font-bold rounded-lg shadow-2xl hover:shadow-3xl transition-all hover:scale-105 flex items-center justify-center space-x-2">
                <FileText className="h-6 w-6" />
                <span>Take Detailed Assessment</span>
                <ArrowRight className="h-5 w-5" />
              </button>
              
              <button className="px-8 py-4 bg-white/20 backdrop-blur-sm text-white font-medium rounded-lg hover:bg-white/30 transition-colors flex items-center justify-center space-x-2">
                <MessageCircle className="h-5 w-5" />
                <span>Chat with Medical Advisor</span>
              </button>
            </div>
            
            <div className="mt-6 flex items-center justify-center space-x-4 text-sm text-white/80">
              <div className="flex items-center space-x-1">
                <Shield className="h-4 w-4" />
                <span>100% Confidential Screening</span>
              </div>
              <span>•</span>
              <div className="flex items-center space-x-1">
                <AlertCircle className="h-4 w-4" />
                <span>No Obligation • No Cost</span>
              </div>
            </div>
          </div>
        </div>

        {/* Final Reassurance */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center space-x-2 bg-white px-6 py-3 rounded-full border border-gray-200 shadow-sm">
            <CheckCircle2 className="h-5 w-5 text-emerald-500" />
            <span className="text-gray-700">
              Final eligibility determined by medical professionals at donation site
            </span>
          </div>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx global>{`
        @keyframes slide-down {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-slide-down {
          animation: slide-down 0.3s ease-out forwards;
        }
      `}</style>
    </section>
  );
};

export default BloodDonationEligibility;