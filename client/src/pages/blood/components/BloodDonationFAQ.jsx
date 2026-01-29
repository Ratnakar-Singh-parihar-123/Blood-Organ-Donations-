import React, { useState } from 'react';
import { 
  HelpCircle, 
  ChevronDown, 
  ChevronUp,
  Shield,
  Clock,
  Activity,
  Heart,
  UserCheck,
  Droplets,
  AlertCircle,
  CheckCircle,
  Users,
  Zap,
  Thermometer,
  RefreshCw
} from 'lucide-react';

const BloodDonationFAQ = () => {
  const [openItems, setOpenItems] = useState([0, 1]); // Start with first two open
  const [activeCategory, setActiveCategory] = useState('all');

  // FAQ Categories
  const categories = [
    { id: 'all', label: 'All Questions', icon: HelpCircle },
    { id: 'eligibility', label: 'Eligibility', icon: UserCheck },
    { id: 'process', label: 'Donation Process', icon: Activity },
    { id: 'safety', label: 'Safety', icon: Shield },
    { id: 'recovery', label: 'Recovery', icon: RefreshCw },
    { id: 'impact', label: 'Impact', icon: Users }
  ];

  // FAQ Data
  const faqs = [
    {
      id: 1,
      question: "Does donating blood hurt?",
      answer: "You'll feel a brief pinch when the needle is inserted, similar to a regular blood test. Most donors describe the sensation as mild discomfort rather than pain. The actual donation process is painless, and our staff is trained to make you as comfortable as possible.",
      category: 'process',
      icon: Activity,
      color: 'bg-blue-50 text-blue-600',
      readTime: '1 min'
    },
    {
      id: 2,
      question: "How safe is blood donation?",
      answer: "Blood donation is extremely safe. We use sterile, single-use equipment for every donor. All staff are professionally trained, and we follow strict safety protocols. Your health is screened before donation to ensure you're fit to donate. The process is supervised by medical professionals throughout.",
      category: 'safety',
      icon: Shield,
      color: 'bg-emerald-50 text-emerald-600',
      readTime: '2 min'
    },
    {
      id: 3,
      question: "How long does the entire process take?",
      answer: "The actual blood donation takes about 10-15 minutes. Including registration, health screening, donation, and recovery with refreshments, plan for about 45 minutes to 1 hour. You can return to normal activities immediately after, though we recommend avoiding heavy exercise for the rest of the day.",
      category: 'process',
      icon: Clock,
      color: 'bg-amber-50 text-amber-600',
      readTime: '1 min'
    },
    {
      id: 4,
      question: "What should I do before donating?",
      answer: "• Eat a healthy meal within 2-3 hours before donating\n• Drink plenty of water throughout the day\n• Get a good night's sleep\n• Avoid fatty foods for 24 hours before\n• Bring a list of any medications you're taking\n• Have a valid ID with you",
      category: 'eligibility',
      icon: CheckCircle,
      color: 'bg-purple-50 text-purple-600',
      readTime: '2 min'
    },
    {
      id: 5,
      question: "How often can I donate blood?",
      answer: "Most healthy adults can donate whole blood every 56 days (approximately 8 weeks). Platelet donors can donate more frequently – every 7 days, up to 24 times a year. Plasma donors can donate every 28 days. We'll help you determine the best donation schedule based on your health and blood type.",
      category: 'eligibility',
      icon: Calendar,
      color: 'bg-rose-50 text-rose-600',
      readTime: '2 min'
    },
    {
      id: 6,
      question: "Will I feel weak after donating?",
      answer: "Most donors feel perfectly fine after donating. Some may feel slightly lightheaded, but this usually passes quickly. We provide refreshments and ask you to rest for 10-15 minutes after donation. Your body replaces the plasma within 24 hours and red cells within 4-6 weeks. Staying hydrated helps with quick recovery.",
      category: 'recovery',
      icon: Zap,
      color: 'bg-orange-50 text-orange-600',
      readTime: '2 min'
    },
    {
      id: 7,
      question: "What are the health benefits of donating blood?",
      answer: "Regular blood donation can:\n• Reduce risk of heart disease\n• Lower cancer risk\n• Help maintain healthy iron levels\n• Provide a free health checkup\n• Burn calories (about 650 per donation)\n• Give you psychological benefits from helping others",
      category: 'impact',
      icon: Heart,
      color: 'bg-red-50 text-red-600',
      readTime: '2 min'
    },
    {
      id: 8,
      question: "Can I donate if I have a tattoo or piercing?",
      answer: "Yes, you can donate if your tattoo or piercing was done at a licensed facility and has completely healed. The waiting period is usually 3-4 months. This ensures any potential infection risk has passed. Temporary restrictions help maintain the safety of the blood supply.",
      category: 'eligibility',
      icon: AlertCircle,
      color: 'bg-indigo-50 text-indigo-600',
      readTime: '1 min'
    },
    {
      id: 9,
      question: "How much blood is taken during donation?",
      answer: "A standard whole blood donation is approximately 450 milliliters (about one pint). This is less than 10% of the average adult's total blood volume. Your body begins replacing the fluid portion (plasma) immediately and completes replacement within 24-48 hours.",
      category: 'process',
      icon: Droplets,
      color: 'bg-cyan-50 text-cyan-600',
      readTime: '1 min'
    },
    {
      id: 10,
      question: "What happens to my blood after donation?",
      answer: "Your donated blood goes through several steps:\n1. Testing for blood type and infectious diseases\n2. Separation into components (red cells, plasma, platelets)\n3. Storage under controlled conditions\n4. Distribution to hospitals based on need\n5. Transfusion to patients within 42 days\nEvery unit is tracked from donation to transfusion.",
      category: 'impact',
      icon: RefreshCw,
      color: 'bg-green-50 text-green-600',
      readTime: '2 min'
    },
    {
      id: 11,
      question: "Can I donate if I'm on medication?",
      answer: "Most medications don't prevent you from donating. Common medications like birth control, blood pressure medication, and antidepressants are usually acceptable. We review all medications during the health screening. Some medications like blood thinners or certain antibiotics may require a waiting period.",
      category: 'eligibility',
      icon: Thermometer,
      color: 'bg-pink-50 text-pink-600',
      readTime: '2 min'
    },
    {
      id: 12,
      question: "Is there an age limit for blood donation?",
      answer: "You must be at least 17 years old to donate in most regions (16 with parental consent in some areas). There's no upper age limit as long as you're in good health. Many regular donors continue donating well into their 70s and beyond. Health, not age, is the determining factor.",
      category: 'eligibility',
      icon: Users,
      color: 'bg-teal-50 text-teal-600',
      readTime: '1 min'
    }
  ];

  const toggleItem = (id) => {
    if (openItems.includes(id)) {
      setOpenItems(openItems.filter(itemId => itemId !== id));
    } else {
      setOpenItems([...openItems, id]);
    }
  };

  const toggleAll = () => {
    if (openItems.length === faqs.length) {
      setOpenItems([]);
    } else {
      setOpenItems(faqs.map(faq => faq.id));
    }
  };

  const filteredFaqs = activeCategory === 'all' 
    ? faqs 
    : faqs.filter(faq => faq.category === activeCategory);

  return (
    <section className="py-16 px-4 md:px-6 lg:px-8 bg-gradient-to-b from-white to-rose-50/20">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-rose-500 rounded-full blur opacity-70"></div>
              <div className="relative bg-gradient-to-r from-rose-500 to-rose-400 p-4 rounded-full">
                <HelpCircle className="h-8 w-8 text-white" />
              </div>
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Get answers to common questions about blood donation. We're here to make your 
            donation experience comfortable, safe, and rewarding.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            <div className="text-center p-4 bg-white rounded-2xl border border-gray-100 shadow-sm">
              <div className="text-2xl font-bold text-rose-500 mb-1">{faqs.length}</div>
              <div className="text-sm text-gray-600">Questions Answered</div>
            </div>
            <div className="text-center p-4 bg-white rounded-2xl border border-gray-100 shadow-sm">
              <div className="text-2xl font-bold text-rose-500 mb-1">99%</div>
              <div className="text-sm text-gray-600">Donor Satisfaction</div>
            </div>
            <div className="text-center p-4 bg-white rounded-2xl border border-gray-100 shadow-sm">
              <div className="text-2xl font-bold text-rose-500 mb-1">24/7</div>
              <div className="text-sm text-gray-600">Support Available</div>
            </div>
            <div className="text-center p-4 bg-white rounded-2xl border border-gray-100 shadow-sm">
              <div className="text-2xl font-bold text-rose-500 mb-1">5 min</div>
              <div className="text-sm text-gray-600">Avg. Read Time</div>
            </div>
          </div>
        </div>

        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => {
              const Icon = category.icon;
              const isActive = activeCategory === category.id;
              const count = category.id === 'all' 
                ? faqs.length 
                : faqs.filter(faq => faq.category === category.id).length;
              
              return (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`flex items-center space-x-2 px-4 py-3 rounded-xl transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-rose-500 to-rose-400 text-white shadow-lg'
                      : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span className="font-medium">{category.label}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    isActive ? 'bg-white/20' : 'bg-gray-100'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Controls */}
        <div className="flex justify-between items-center mb-8">
          <div className="text-gray-600">
            Showing {filteredFaqs.length} of {faqs.length} questions
          </div>
          <button
            onClick={toggleAll}
            className="flex items-center space-x-2 px-4 py-2 text-rose-600 hover:text-rose-700 
                     hover:bg-rose-50 rounded-lg transition-colors"
          >
            <span className="font-medium">
              {openItems.length === faqs.length ? 'Collapse All' : 'Expand All'}
            </span>
            {openItems.length === faqs.length ? 
              <ChevronUp className="h-4 w-4" /> : 
              <ChevronDown className="h-4 w-4" />
            }
          </button>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4 mb-12">
          {filteredFaqs.map((faq) => {
            const Icon = faq.icon;
            const isOpen = openItems.includes(faq.id);
            
            return (
              <div
                key={faq.id}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md 
                         transition-all duration-300 overflow-hidden"
              >
                <button
                  onClick={() => toggleItem(faq.id)}
                  className="w-full text-left p-6 hover:bg-gray-50/50 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4 flex-1">
                      <div className={`p-3 rounded-xl ${faq.color} mt-1`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">
                            {faq.question}
                          </h3>
                          <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full">
                            {faq.readTime} read
                          </span>
                        </div>
                        
                        <div className="text-sm text-gray-500 flex items-center space-x-3">
                          <span className="flex items-center space-x-1">
                            <Shield className="h-3 w-3" />
                            <span>Verified Answer</span>
                          </span>
                          <span>•</span>
                          <span className="capitalize">{faq.category}</span>
                        </div>

                        {/* Answer Preview */}
                        {!isOpen && (
                          <p className="mt-3 text-gray-600 line-clamp-2">
                            {faq.answer.split('\n')[0]}
                          </p>
                        )}
                      </div>
                    </div>
                    
                    <div className="ml-4">
                      {isOpen ? (
                        <ChevronUp className="h-5 w-5 text-gray-400" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-gray-400" />
                      )}
                    </div>
                  </div>
                </button>

                {/* Expanded Content */}
                {isOpen && (
                  <div className="px-6 pb-6 pt-2 border-t border-gray-100">
                    <div className="pl-14">
                      <div className="prose prose-lg max-w-none">
                        {faq.answer.split('\n').map((line, index) => (
                          <p key={index} className="text-gray-700 mb-3 leading-relaxed">
                            {line.startsWith('•') ? (
                              <span className="flex items-start">
                                <span className="text-rose-500 mr-2">•</span>
                                {line.substring(1)}
                              </span>
                            ) : (
                              line
                            )}
                          </p>
                        ))}
                      </div>
                      
                      {/* Additional Tips for certain questions */}
                      {faq.id === 1 && (
                        <div className="mt-4 p-4 bg-blue-50 rounded-xl border border-blue-100">
                          <div className="flex items-start space-x-3">
                            <Activity className="h-5 w-5 text-blue-500 mt-0.5" />
                            <div>
                              <h4 className="font-medium text-blue-800 mb-1">Tip to Reduce Discomfort</h4>
                              <p className="text-blue-700 text-sm">
                                Relax your arm and practice deep breathing during needle insertion. 
                                Most discomfort is psychological and passes quickly.
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {faq.id === 6 && (
                        <div className="mt-4 p-4 bg-orange-50 rounded-xl border border-orange-100">
                          <div className="flex items-start space-x-3">
                            <Zap className="h-5 w-5 text-orange-500 mt-0.5" />
                            <div>
                              <h4 className="font-medium text-orange-800 mb-1">Quick Recovery Tips</h4>
                              <p className="text-orange-700 text-sm">
                                Drink extra fluids for 24-48 hours after donation. Avoid alcohol for 
                                24 hours and heavy lifting for 4-5 hours.
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still Have Questions */}
        <div className="bg-gradient-to-r from-rose-50 to-pink-50 rounded-3xl p-8 border border-rose-100">
          <div className="text-center max-w-2xl mx-auto">
            <div className="inline-flex p-3 bg-white rounded-2xl shadow-sm mb-6">
              <HelpCircle className="h-8 w-8 text-rose-500" />
            </div>
            
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              Still have questions?
            </h3>
            
            <p className="text-gray-600 mb-8">
              Our donor support team is available 24/7 to answer any questions 
              about eligibility, process, or concerns you might have.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-6 py-3 bg-gradient-to-r from-rose-500 to-rose-400 text-white 
                               rounded-xl font-semibold hover:shadow-lg transition-shadow 
                               flex items-center justify-center space-x-2">
                <Phone className="h-5 w-5" />
                <span>Call Support: 1800-XXX-XXXX</span>
              </button>
              
              <button className="px-6 py-3 bg-white text-gray-700 border border-gray-300 
                               rounded-xl font-semibold hover:bg-gray-50 transition-colors 
                               flex items-center justify-center space-x-2">
                <MessageCircle className="h-5 w-5" />
                <span>Live Chat</span>
              </button>
              
              <button className="px-6 py-3 bg-white text-gray-700 border border-gray-300 
                               rounded-xl font-semibold hover:bg-gray-50 transition-colors 
                               flex items-center justify-center space-x-2">
                <Mail className="h-5 w-5" />
                <span>Email Us</span>
              </button>
            </div>
            
            <p className="text-sm text-gray-500 mt-6">
              Average response time: 15 minutes
            </p>
          </div>
        </div>

        {/* Quick Eligibility Check */}
        <div className="mt-12 bg-white rounded-3xl p-8 border border-gray-200 shadow-sm">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Quick Eligibility Check
              </h3>
              <p className="text-gray-600 mb-6">
                Not sure if you can donate? Take our 2-minute eligibility quiz 
                to find out instantly.
              </p>
              
              <button className="px-6 py-3 bg-gradient-to-r from-rose-500 to-rose-400 text-white 
                               rounded-xl font-semibold hover:shadow-lg transition-shadow 
                               flex items-center space-x-2">
                <CheckCircle className="h-5 w-5" />
                <span>Start Eligibility Quiz</span>
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
            
            <div className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-2xl p-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-emerald-500" />
                  <span className="text-gray-700">At least 17 years old</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-emerald-500" />
                  <span className="text-gray-700">Weigh 50 kg or more</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-emerald-500" />
                  <span className="text-gray-700">In good general health</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-emerald-500" />
                  <span className="text-gray-700">No recent infections</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Icons for buttons */}
      <style jsx global>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
};

// Add missing icons
const Phone = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
);

const MessageCircle = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
  </svg>
);

const Mail = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const Calendar = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const ArrowRight = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
  </svg>
);

export default BloodDonationFAQ;