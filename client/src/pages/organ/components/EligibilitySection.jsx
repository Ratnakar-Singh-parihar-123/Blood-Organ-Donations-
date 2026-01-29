import React, { useState } from 'react';
import { 
  CheckCircle2,
  XCircle,
  AlertCircle,
  Shield,
  Stethoscope,
  Heart,
  User,
  Calendar,
  Scale,
  Activity,
  Thermometer,
  Pill,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Users,
  Award,
  BookOpen,
  MessageCircle
} from 'lucide-react';

const EligibilitySection = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [expandedMyths, setExpandedMyths] = useState([]);

  const eligibilityCriteria = [
    {
      category: 'Age Requirements',
      icon: Calendar,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50',
      points: [
        {
          text: 'Anyone from newborns to senior citizens can register',
          isPositive: true,
          detail: 'Age alone doesn\'t disqualify anyone. Medical suitability is determined at time of donation.'
        },
        {
          text: 'Minimum age for independent registration: 18 years',
          isPositive: true,
          detail: 'Those under 18 can register with parental consent in most states.'
        },
        {
          text: 'No upper age limit',
          isPositive: true,
          detail: 'People in their 70s, 80s, and even 90s have been successful donors.'
        }
      ]
    },
    {
      category: 'Health Considerations',
      icon: Stethoscope,
      color: 'text-emerald-500',
      bgColor: 'bg-emerald-50',
      points: [
        {
          text: 'Most medical conditions are acceptable',
          isPositive: true,
          detail: 'Conditions like diabetes, hypertension, or arthritis don\'t automatically disqualify you.'
        },
        {
          text: 'Active cancer disqualifies organ donation',
          isPositive: false,
          detail: 'However, many cancer survivors can donate years after successful treatment.'
        },
        {
          text: 'Organ-specific health is evaluated individually',
          isPositive: true,
          detail: 'Even if one organ isn\'t suitable, others may be perfectly healthy for donation.'
        }
      ]
    },
    {
      category: 'Weight & Lifestyle',
      icon: Scale,
      color: 'text-amber-500',
      bgColor: 'bg-amber-50',
      points: [
        {
          text: 'BMI under 40 is generally acceptable',
          isPositive: true,
          detail: 'Medical team evaluates individual health, not just weight.'
        },
        {
          text: 'Smoking doesn\'t automatically disqualify',
          isPositive: true,
          detail: 'Lungs from smokers can sometimes be used for research or education.'
        },
        {
          text: 'Alcohol use is evaluated case-by-case',
          isPositive: true,
          detail: 'History of alcohol abuse doesn\'t necessarily rule out organ donation.'
        }
      ]
    },
    {
      category: 'Medical History',
      icon: Activity,
      color: 'text-rose-500',
      bgColor: 'bg-rose-50',
      points: [
        {
          text: 'HIV+ individuals can donate to HIV+ recipients',
          isPositive: true,
          detail: 'The HOPE Act of 2013 allows HIV-positive to HIV-positive organ donation.'
        },
        {
          text: 'Most medications are acceptable',
          isPositive: true,
          detail: 'Even blood thinners or psychiatric medications don\'t automatically disqualify.'
        },
        {
          text: 'Recent tattoos/piercings require waiting period',
          isPositive: false,
          detail: 'Typically 3-12 month waiting period to ensure no infection risk.'
        }
      ]
    }
  ];

  const myths = [
    {
      id: 1,
      myth: 'I\'m too old to be a donor',
      truth: 'There\'s no age limit. The oldest organ donor was 95!',
      detail: 'Medical professionals evaluate organs individually based on function, not age.'
    },
    {
      id: 2,
      myth: 'Doctors won\'t try to save me if I\'m a donor',
      truth: 'This is completely false. Saving your life is always the first priority.',
      detail: 'The medical team treating you is completely separate from the transplant team.'
    },
    {
      id: 3,
      myth: 'My religion doesn\'t allow organ donation',
      truth: 'Most major religions support organ donation as an act of charity.',
      detail: 'Christianity, Islam, Judaism, Hinduism, Buddhism, and Sikhism all support donation.'
    },
    {
      id: 4,
      myth: 'My family will have to pay for donation',
      truth: 'There is no cost to the donor family for organ donation.',
      detail: 'All donation-related medical costs are covered by the transplant recipient\'s insurance.'
    },
    {
      id: 5,
      myth: 'I can\'t donate because of my medical history',
      truth: 'Most medical conditions don\'t prevent donation.',
      detail: 'Each organ is evaluated individually - even with some health issues, you can donate.'
    },
    {
      id: 6,
      myth: 'Donation disfigures the body',
      truth: 'Organ donation is a surgical procedure that doesn\'t disfigure.',
      detail: 'Donated organs are removed with care, and open-casket funerals are still possible.'
    }
  ];

  const quickChecklist = [
    { question: 'Are you 18 years or older?', icon: User },
    { question: 'Do you have active cancer?', icon: Thermometer },
    { question: 'Are you currently infected with HIV?', icon: Shield },
    { question: 'Do you have active tuberculosis?', icon: Pill }
  ];

  const faqs = [
    {
      question: 'Can I donate if I have diabetes?',
      answer: 'Yes! Having diabetes doesn\'t automatically disqualify you. Pancreas donation might not be possible, but other organs could be suitable.'
    },
    {
      question: 'What about high blood pressure?',
      answer: 'Controlled hypertension is usually acceptable. Kidneys would be carefully evaluated for damage.'
    },
    {
      question: 'Can cancer survivors donate?',
      answer: 'Yes, after being cancer-free for a certain period (typically 1-5 years depending on the cancer type).'
    },
    {
      question: 'Are there weight restrictions?',
      answer: 'Extreme obesity (BMI > 40) can affect organ viability, but each case is evaluated individually.'
    }
  ];

  const toggleMyth = (id) => {
    setExpandedMyths(prev => 
      prev.includes(id) 
        ? prev.filter(mythId => mythId !== id)
        : [...prev, id]
    );
  };

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-b from-white to-blue-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 bg-blue-50 px-4 py-2 rounded-full mb-4">
            <Sparkles className="h-4 w-4 text-blue-500" />
            <span className="text-sm font-medium text-blue-700">Who Can Donate</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Organ Donation
            <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent mx-2">
              Eligibility
            </span>
          </h2>
          
          <p className="text-lg text-gray-600">
            Most people can be organ donors. Learn about requirements, debunk myths, and discover how you can save lives.
          </p>
        </div>

        {/* Stats Banner */}
        <div className="mb-12 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-100">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">95%</div>
              <div className="text-sm text-gray-600">Of Adults Eligible</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-emerald-600">No</div>
              <div className="text-sm text-gray-600">Upper Age Limit</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-rose-600">106K+</div>
              <div className="text-sm text-gray-600">Can Benefit</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-amber-600">8</div>
              <div className="text-sm text-gray-600">Lives Per Donor</div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 justify-center">
            {['overview', 'myths', 'checklist', 'faqs'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 rounded-full font-medium transition-all ${
                  activeTab === tab
                    ? 'bg-gradient-to-r from-blue-500 to-cyan-400 text-white shadow-lg'
                    : 'bg-white text-gray-700 border border-gray-200 hover:border-blue-200'
                }`}
              >
                {tab === 'overview' && 'Eligibility Criteria'}
                {tab === 'myths' && 'Myths vs Facts'}
                {tab === 'checklist' && 'Quick Checklist'}
                {tab === 'faqs' && 'Common Questions'}
              </button>
            ))}
          </div>
        </div>

        {/* Content Sections */}
        <div className="space-y-12">
          
          {/* Overview Section */}
          {activeTab === 'overview' && (
            <div>
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <CheckCircle2 className="h-6 w-6 text-emerald-500 mr-2" />
                  General Eligibility Guidelines
                </h3>
                <p className="text-gray-600">
                  Eligibility is determined at the time of donation by medical professionals. 
                  Registering doesn't guarantee donation, but it expresses your willingness to help.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {eligibilityCriteria.map((category, index) => (
                  <div key={index} className="bg-white rounded-2xl border border-gray-100 p-6 shadow-lg">
                    <div className="flex items-center space-x-3 mb-6">
                      <div className={`p-3 rounded-xl ${category.bgColor}`}>
                        <category.icon className={`h-6 w-6 ${category.color}`} />
                      </div>
                      <h4 className="text-xl font-bold text-gray-900">{category.category}</h4>
                    </div>

                    <div className="space-y-4">
                      {category.points.map((point, idx) => (
                        <div key={idx} className="p-4 rounded-xl border border-gray-100 hover:border-blue-100 transition-colors">
                          <div className="flex items-start space-x-3">
                            <div className={`p-1 rounded-full ${point.isPositive ? 'bg-emerald-100' : 'bg-rose-100'}`}>
                              {point.isPositive ? (
                                <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                              ) : (
                                <XCircle className="h-5 w-5 text-rose-500" />
                              )}
                            </div>
                            <div className="flex-1">
                              <div className={`font-medium ${point.isPositive ? 'text-emerald-700' : 'text-rose-700'}`}>
                                {point.text}
                              </div>
                              <p className="text-sm text-gray-600 mt-1">{point.detail}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Key Takeaway */}
              <div className="mt-8 bg-gradient-to-r from-emerald-50 to-green-50 rounded-2xl p-6 border border-emerald-100">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-emerald-100 rounded-xl">
                    <AlertCircle className="h-6 w-6 text-emerald-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2">Important Note</h4>
                    <p className="text-gray-600">
                      Final determination of organ suitability is made at the time of donation by medical professionals. 
                      They consider the condition of each organ individually, meaning even if some organs aren't suitable, 
                      others might still save lives. Registering simply expresses your willingness to help.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Myths vs Facts Section */}
          {activeTab === 'myths' && (
            <div>
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <BookOpen className="h-6 w-6 text-amber-500 mr-2" />
                  Common Myths About Eligibility
                </h3>
                <p className="text-gray-600">
                  Let's clear up misconceptions that might be preventing people from registering as donors.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {myths.map((myth) => (
                  <div
                    key={myth.id}
                    className="bg-white rounded-2xl border border-gray-100 p-6 shadow-lg hover:shadow-xl transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <XCircle className="h-5 w-5 text-rose-500" />
                          <span className="text-lg font-semibold text-gray-900">Myth</span>
                        </div>
                        <p className="text-gray-700 font-medium">{myth.myth}</p>
                      </div>
                      <button
                        onClick={() => toggleMyth(myth.id)}
                        className="p-2 text-gray-400 hover:text-blue-500"
                      >
                        {expandedMyths.includes(myth.id) ? (
                          <ChevronUp className="h-5 w-5" />
                        ) : (
                          <ChevronDown className="h-5 w-5" />
                        )}
                      </button>
                    </div>

                    <div className="flex items-center space-x-2 mb-3">
                      <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                      <span className="text-lg font-semibold text-gray-900">Truth</span>
                    </div>
                    <p className="text-emerald-700 font-medium mb-3">{myth.truth}</p>

                    {expandedMyths.includes(myth.id) && (
                      <div className="mt-4 pt-4 border-t border-gray-100">
                        <p className="text-gray-600">{myth.detail}</p>
                      </div>
                    )}

                    {/* Progress Indicator */}
                    <div className="mt-4 h-1 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-emerald-500 to-green-400 rounded-full w-3/4"></div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Medical Professional Quote */}
              <div className="mt-8 bg-white rounded-2xl border border-gray-100 p-8 shadow-lg">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-blue-100 rounded-xl">
                    <Stethoscope className="h-8 w-8 text-blue-600" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <Shield className="h-5 w-5 text-blue-500" />
                      <span className="text-sm font-medium text-blue-700">Medical Insight</span>
                    </div>
                    <blockquote className="text-xl text-gray-700 italic mb-4">
                      "In my 20 years as a transplant surgeon, I've seen organs from donors in their 90s save lives. 
                      We evaluate each organ individually based on function, not age or medical history."
                    </blockquote>
                    <div className="text-right">
                      <div className="font-semibold text-gray-900">Dr. Sarah Johnson</div>
                      <div className="text-sm text-gray-600">Transplant Surgeon, 20+ years experience</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Quick Checklist Section */}
          {activeTab === 'checklist' && (
            <div>
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <CheckCircle2 className="h-6 w-6 text-blue-500 mr-2" />
                  Quick Eligibility Checklist
                </h3>
                <p className="text-gray-600">
                  Answer these simple questions to get a general idea of your eligibility.
                </p>
              </div>

              <div className="grid lg:grid-cols-2 gap-8">
                {/* Checklist */}
                <div className="space-y-4">
                  {quickChecklist.map((item, index) => (
                    <div key={index} className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
                      <div className="flex items-center space-x-4">
                        <div className="p-3 bg-blue-50 rounded-lg">
                          <item.icon className="h-6 w-6 text-blue-500" />
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-gray-900 mb-2">{item.question}</div>
                          <div className="flex space-x-2">
                            <button className="px-4 py-2 bg-emerald-100 text-emerald-700 rounded-lg font-medium hover:bg-emerald-200 transition-colors">
                              Yes
                            </button>
                            <button className="px-4 py-2 bg-rose-100 text-rose-700 rounded-lg font-medium hover:bg-rose-200 transition-colors">
                              No
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Results Panel */}
                <div className="bg-gradient-to-b from-blue-50 to-white rounded-2xl border border-blue-100 p-8">
                  <div className="text-center mb-6">
                    <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle2 className="h-10 w-10 text-white" />
                    </div>
                    <h4 className="text-2xl font-bold text-gray-900 mb-2">You're Likely Eligible!</h4>
                    <p className="text-gray-600">
                      Based on common criteria, most people can register as organ donors.
                    </p>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200">
                      <span className="text-gray-700">Preliminary Assessment</span>
                      <span className="font-bold text-emerald-600">90% Match</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200">
                      <span className="text-gray-700">Age Compatibility</span>
                      <span className="font-bold text-blue-600">✓ All Ages</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200">
                      <span className="text-gray-700">Medical Review</span>
                      <span className="font-bold text-amber-600">Case-by-case</span>
                    </div>
                  </div>

                  <div className="text-center">
                    <button className="w-full py-3 bg-gradient-to-r from-blue-500 to-cyan-400 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all hover:scale-105">
                      Take Detailed Assessment
                    </button>
                    <p className="text-sm text-gray-500 mt-2">
                      Final determination made by medical professionals at time of donation
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* FAQs Section */}
          {activeTab === 'faqs' && (
            <div>
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <MessageCircle className="h-6 w-6 text-purple-500 mr-2" />
                  Frequently Asked Questions
                </h3>
                <p className="text-gray-600">
                  Get answers to common questions about organ donation eligibility.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {faqs.map((faq, index) => (
                  <div key={index} className="bg-white rounded-2xl border border-gray-100 p-6 shadow-lg hover:shadow-xl transition-shadow">
                    <div className="flex items-start space-x-3">
                      <div className="p-2 bg-purple-100 rounded-lg">
                        <AlertCircle className="h-5 w-5 text-purple-500" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-gray-900 mb-3">{faq.question}</h4>
                        <p className="text-gray-600">{faq.answer}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Contact for Questions */}
              <div className="mt-8 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-8 border border-purple-100">
                <div className="flex flex-col lg:flex-row items-center justify-between">
                  <div className="mb-6 lg:mb-0 text-center lg:text-left">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Still Have Questions?</h3>
                    <p className="text-gray-600 max-w-lg">
                      Our medical advisors are available to answer specific questions about your eligibility.
                    </p>
                  </div>
                  <button className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-400 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105">
                    Speak with Medical Advisor
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl p-8 text-white">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Users className="h-6 w-6" />
                <span className="text-sm font-medium opacity-90">Join Our Community</span>
              </div>
              
              <h3 className="text-2xl lg:text-3xl font-bold mb-4">
                Ready to Register as an Organ Donor?
              </h3>
              <p className="opacity-90">
                Your decision could save up to 8 lives. Registration takes less than 5 minutes.
              </p>
            </div>

            <div className="space-y-3">
              <button className="w-full py-4 bg-white text-blue-600 font-bold rounded-lg shadow-2xl hover:shadow-3xl transition-all hover:scale-105 flex items-center justify-center space-x-2">
                <Heart className="h-6 w-6" />
                <span>Register Now (5 minutes)</span>
                <Award className="h-5 w-5" />
              </button>
              
              <button className="w-full py-3 bg-white/20 backdrop-blur-sm text-white font-medium rounded-lg hover:bg-white/30 transition-colors">
                Download Information Packet
              </button>
            </div>
          </div>
        </div>

        {/* Final Reassurance */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center space-x-2 bg-white px-6 py-3 rounded-full border border-gray-200 shadow-sm">
            <Shield className="h-5 w-5 text-emerald-500" />
            <span className="text-gray-700">
              Your registration is confidential and can be updated anytime
            </span>
          </div>
        </div>
      </div>

      {/* Custom Styles */}
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
        
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }
      `}</style>
    </section>
  );
};

export default EligibilitySection;