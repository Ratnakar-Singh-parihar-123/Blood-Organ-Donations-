import React, { useState } from 'react';
import { 
  Heart, 
  Users, 
  Shield, 
  Clock,
  Award,
  Sparkles,
  TrendingUp,
  Target,
  Zap,
  CheckCircle2,
  Star,
  LifeBuoy,
  Gift,
  ArrowRight,
  HeartPulse
} from 'lucide-react';

const WhyDonate = () => {
  const [activeBenefit, setActiveBenefit] = useState(0);

  const benefits = [
    {
      id: 1,
      title: 'One Donation, Multiple Lives',
      description: 'A single blood donation can save up to 3 lives, while organ donation can save up to 8 lives.',
      icon: Users,
      color: 'from-rose-500 to-pink-400',
      iconColor: 'text-rose-500',
      bgColor: 'bg-rose-50',
      stats: '3+ lives saved per donation',
      impact: [
        'Helps accident victims',
        'Supports cancer patients',
        'Aids surgery patients',
        'Assists childbirth complications'
      ]
    },
    {
      id: 2,
      title: 'Safe & Simple Process',
      description: 'Our certified medical professionals ensure a completely safe, hygienic, and comfortable experience.',
      icon: Shield,
      color: 'from-emerald-500 to-green-400',
      iconColor: 'text-emerald-500',
      bgColor: 'bg-emerald-50',
      stats: '99.8% safety record',
      impact: [
        'Sterile equipment',
        'Trained staff',
        'Post-donation care',
        'Comfortable environment'
      ]
    },
    {
      id: 3,
      title: 'Be Someone\'s Hero',
      description: 'Your donation could be the difference between life and death for someone in need.',
      icon: Award,
      color: 'from-amber-500 to-orange-400',
      iconColor: 'text-amber-500',
      bgColor: 'bg-amber-50',
      stats: 'Create lasting impact',
      impact: [
        'Emergency response',
        'Community support',
        'Family gratitude',
        'Personal fulfillment'
      ]
    },
    {
      id: 4,
      title: 'Quick & Convenient',
      description: 'Most donations take less than an hour. We have multiple centers and mobile units for your convenience.',
      icon: Clock,
      color: 'from-blue-500 to-cyan-400',
      iconColor: 'text-blue-500',
      bgColor: 'bg-blue-50',
      stats: '45 minutes average',
      impact: [
        'Multiple locations',
        'Flexible scheduling',
        'Mobile donation units',
        'Quick registration'
      ]
    },
    {
      id: 5,
      title: 'Health Benefits for You',
      description: 'Regular donors enjoy health benefits including reduced risk of heart disease and free health screening.',
      icon: HeartPulse,
      color: 'from-purple-500 to-violet-400',
      iconColor: 'text-purple-500',
      bgColor: 'bg-purple-50',
      stats: 'Free health checkup',
      impact: [
        'Lower heart disease risk',
        'Blood pressure check',
        'Iron level monitoring',
        'Calorie burn (650 cal)'
      ]
    },
    {
      id: 6,
      title: 'Join a Community of Heroes',
      description: 'Connect with thousands of like-minded individuals making a real difference in people\'s lives.',
      icon: Star,
      color: 'from-indigo-500 to-blue-400',
      iconColor: 'text-indigo-500',
      bgColor: 'bg-indigo-50',
      stats: '50K+ donors community',
      impact: [
        'Recognition programs',
        'Community events',
        'Support network',
        'Shared experiences'
      ]
    }
  ];

  const testimonials = [
    {
      name: 'Rajesh Kumar',
      role: 'Regular Donor (45 times)',
      content: 'Donating blood gives me immense satisfaction knowing I\'m saving lives. The LifeStream team makes it so easy and comfortable.',
      avatar: 'RK'
    },
    {
      name: 'Priya Sharma',
      role: 'Organ Donor Registry',
      content: 'Registering as an organ donor was one of the most meaningful decisions of my life. Knowing I can help even after I\'m gone is powerful.',
      avatar: 'PS'
    },
    {
      name: 'Dr. Arvind Patel',
      role: 'Cardiologist',
      content: 'In my 20 years of practice, I\'ve seen countless lives saved by donors. Each donation creates a ripple effect of hope.',
      avatar: 'AP'
    }
  ];

  const faqs = [
    {
      question: 'Is donating blood safe?',
      answer: 'Absolutely. We use sterile, single-use equipment and all procedures are performed by certified medical professionals.'
    },
    {
      question: 'How long does it take?',
      answer: 'The actual donation takes 8-10 minutes. Including registration and recovery, plan for about 45 minutes.'
    },
    {
      question: 'How often can I donate?',
      answer: 'Every 56 days for whole blood, every 7 days for platelets, and every 28 days for plasma.'
    },
    {
      question: 'Will it affect my health?',
      answer: 'No. Your body replenishes the donated blood within 24-48 hours. Many donors report feeling energized.'
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-b from-white to-rose-50/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 bg-rose-50 px-4 py-2 rounded-full mb-4">
            <Sparkles className="h-4 w-4 text-rose-500" />
            <span className="text-sm font-medium text-rose-700">Transform Lives</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Why
            <span className="bg-gradient-to-r from-rose-600 to-rose-500 bg-clip-text text-transparent mx-2">
              Donate?
            </span>
          </h2>
          
          <p className="text-lg text-gray-600">
            Your decision to donate creates ripples of hope, healing, and second chances.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left: Benefits Grid */}
          <div>
            {/* Main Benefit Cards */}
            <div className="space-y-6">
              {benefits.map((benefit, index) => (
                <div
                  key={benefit.id}
                  onMouseEnter={() => setActiveBenefit(index)}
                  className={`group cursor-pointer bg-white rounded-2xl border p-6 transition-all duration-300 transform hover:-translate-y-1 ${
                    activeBenefit === index
                      ? 'border-rose-300 shadow-xl ring-2 ring-rose-100'
                      : 'border-gray-100 shadow-lg hover:shadow-xl hover:border-rose-200'
                  }`}
                >
                  <div className="flex items-start space-x-4">
                    {/* Icon Container */}
                    <div className={`p-4 rounded-xl ${benefit.bgColor} relative flex-shrink-0`}>
                      <benefit.icon className={`h-6 w-6 ${benefit.iconColor}`} />
                      
                      {/* Active Indicator */}
                      {activeBenefit === index && (
                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-rose-500 to-rose-400 rounded-full flex items-center justify-center">
                          <CheckCircle2 className="h-3 w-3 text-white" fill="white" />
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 mb-2">{benefit.title}</h3>
                          <p className="text-gray-600 mb-3">{benefit.description}</p>
                        </div>
                        
                        {/* Stats Badge */}
                        <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                          activeBenefit === index
                            ? 'bg-gradient-to-r from-rose-50 to-pink-50 text-rose-700'
                            : 'bg-gray-100 text-gray-700'
                        }`}>
                          {benefit.stats}
                        </div>
                      </div>

                      {/* Impact Points */}
                      <div className="grid grid-cols-2 gap-2 mt-4">
                        {benefit.impact.map((item, idx) => (
                          <div key={idx} className="flex items-center space-x-2">
                            <div className={`w-1.5 h-1.5 rounded-full ${
                              activeBenefit === index
                                ? 'bg-gradient-to-r from-rose-500 to-rose-400'
                                : 'bg-gray-300'
                            }`}></div>
                            <span className="text-sm text-gray-600">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Progress Line */}
                  <div className="mt-4">
                    <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className={`h-full bg-gradient-to-r ${benefit.color} rounded-full transition-all duration-1000 ${
                          activeBenefit === index ? 'w-full' : 'w-0'
                        }`}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Impact Stats Banner */}
            <div className="mt-8 bg-gradient-to-r from-rose-50 to-pink-50 rounded-2xl p-6 border border-rose-100">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-rose-600">36,000</div>
                  <div className="text-sm text-gray-600">Daily Units Needed</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-emerald-600">22</div>
                  <div className="text-sm text-gray-600">Lives Saved Daily</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-600">106K+</div>
                  <div className="text-sm text-gray-600">Waiting for Organs</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Visual & Emotional Content */}
          <div>
            {/* Hero Visual */}
            <div className="relative mb-8">
              <div className="bg-gradient-to-br from-rose-500/10 to-pink-500/10 rounded-3xl p-8">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-32 h-32 bg-gradient-to-r from-rose-500 to-rose-400 rounded-full mx-auto mb-6 relative">
                    <Heart className="h-16 w-16 text-white" fill="white" />
                    
                    {/* Floating Hearts */}
                    <div className="absolute -top-2 -left-2 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <Heart className="h-5 w-5 text-white" fill="white" />
                    </div>
                    <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <Users className="h-5 w-5 text-white" />
                    </div>
                  </div>

                  <div className="max-w-sm mx-auto">
                    <div className="text-4xl font-bold text-rose-600 mb-2">3:1</div>
                    <div className="text-lg font-semibold text-gray-900 mb-2">Impact Ratio</div>
                    <p className="text-gray-600">
                      For every 1 hour you give, 3 lives get a second chance. That's the power of donation.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Testimonials */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Stories That Inspire</h3>
              
              <div className="space-y-4">
                {testimonials.map((testimonial, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-gradient-to-r from-rose-500 to-rose-400 rounded-full flex items-center justify-center text-white font-bold">
                          {testimonial.avatar}
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex items-center space-x-2 mb-2">
                          <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                          <span className="text-xs bg-rose-100 text-rose-700 px-2 py-1 rounded-full">
                            {testimonial.role}
                          </span>
                        </div>
                        <p className="text-gray-600 italic">"{testimonial.content}"</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQs */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Common Questions</h3>
              
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div
                    key={index}
                    className="group cursor-pointer bg-white rounded-xl border border-gray-100 p-4 hover:border-rose-200 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 mb-2">{faq.question}</h4>
                        <p className="text-gray-600 text-sm">{faq.answer}</p>
                      </div>
                      <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-rose-500 group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Call to Action Card */}
            <div className="mt-8 bg-gradient-to-r from-rose-500 to-rose-400 rounded-2xl p-6 text-white">
              <div className="flex items-center space-x-4 mb-4">
                <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                  <Zap className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Ready to Make a Difference?</h3>
                  <p className="text-white/90">Your journey as a life-saver starts with one simple decision.</p>
                </div>
              </div>
              
              <div className="grid sm:grid-cols-2 gap-3">
                <button className="bg-white text-rose-600 font-semibold py-3 rounded-lg hover:bg-rose-50 transition-colors flex items-center justify-center space-x-2">
                  <Clock className="h-5 w-5" />
                  <span>Find Donation Slot</span>
                </button>
                
                <button className="bg-white/20 backdrop-blur-sm text-white font-semibold py-3 rounded-lg hover:bg-white/30 transition-colors border border-white/30 flex items-center justify-center space-x-2">
                  <Target className="h-5 w-5" />
                  <span>Set Donation Goal</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Banner */}
        <div className="mt-16 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-8 border border-emerald-100">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <div className="mb-6 lg:mb-0 text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start space-x-2 mb-3">
                <TrendingUp className="h-5 w-5 text-emerald-600" />
                <span className="text-sm font-medium text-emerald-700">Health Benefits</span>
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Good for You, Lifesaving for Others
              </h3>
              <p className="text-gray-600 max-w-2xl">
                Regular donors experience health benefits while making a profound impact. It's a win-win that creates a healthier community.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-white rounded-xl border border-emerald-100">
                <div className="text-2xl font-bold text-emerald-600">650</div>
                <div className="text-sm text-gray-600">Calories Burned</div>
              </div>
              <div className="text-center p-4 bg-white rounded-xl border border-emerald-100">
                <div className="text-2xl font-bold text-emerald-600">33%</div>
                <div className="text-sm text-gray-600">Lower Heart Risk</div>
              </div>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="mt-12 text-center">
          <button className="group px-8 py-4 bg-gradient-to-r from-rose-500 to-rose-400 text-white font-bold text-lg rounded-full shadow-2xl shadow-rose-300 hover:shadow-3xl hover:shadow-rose-400 transition-all duration-300 hover:scale-105 flex items-center space-x-3 mx-auto">
            <div className="relative">
              <Heart className="h-6 w-6" fill="white" />
              <div className="absolute -inset-1 bg-rose-400 rounded-full animate-ping opacity-30"></div>
            </div>
            <span>Start Your Donation Journey</span>
            <ArrowRight className="h-5 w-5 group-hover:translate-x-2 transition-transform" />
          </button>
          
          <p className="text-gray-500 mt-4 text-sm">
            Join 50,000+ heroes making a difference every day
          </p>
        </div>
      </div>

      {/* Custom Animations */}
      <style jsx global>{`
        @keyframes gentle-float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-5px); }
        }
        .animate-gentle-float {
          animation: gentle-float 3s ease-in-out infinite;
        }
        
        @keyframes heartbeat {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        .animate-heartbeat {
          animation: heartbeat 2s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default WhyDonate;