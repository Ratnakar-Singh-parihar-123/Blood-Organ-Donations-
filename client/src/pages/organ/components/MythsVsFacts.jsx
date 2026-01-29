import React, { useState } from 'react';
import { 
  XCircle,
  CheckCircle2,
  AlertTriangle,
  Shield,
  Stethoscope,
  Scale,
  Heart,
  Users,
  Clock,
  Award,
  Sparkles,
  ChevronDown,
  ChevronUp,
  FileText,
  MessageCircle,
  Zap,
  BookOpen,
  HelpCircle
} from 'lucide-react';

const MythsVsFacts = () => {
  const [expandedMyths, setExpandedMyths] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');

  const myths = [
    {
      id: 1,
      myth: 'Doctors won\'t try to save me if I\'m a registered donor',
      fact: 'Saving your life is always the first priority. The medical team treating you is completely separate from the transplant team.',
      explanation: 'Emergency doctors and transplant teams work independently. Your life-saving care is never compromised.',
      category: 'medical',
      severity: 'high',
      sources: ['American Medical Association', 'Journal of Medical Ethics']
    },
    {
      id: 2,
      myth: 'Organ donation disfigures the body',
      fact: 'Organ donation is a surgical procedure that doesn\'t disfigure. Open-casket funerals are still possible.',
      explanation: 'Donated organs are removed with surgical care and respect. The body is reconstructed so no signs of donation are visible.',
      category: 'process',
      severity: 'medium',
      sources: ['National Funeral Directors Association']
    },
    {
      id: 3,
      myth: 'My religion doesn\'t support organ donation',
      fact: 'Most major religions support organ donation as an act of charity and saving lives.',
      explanation: 'Christianity, Islam, Judaism, Hinduism, Buddhism, and Sikhism all support organ donation. Check with your religious leader for specific guidance.',
      category: 'religion',
      severity: 'high',
      sources: ['ReligiousTolerance.org', 'Interfaith Organ Donation Coalition']
    },
    {
      id: 4,
      myth: 'I\'m too old/young to be an organ donor',
      fact: 'There\'s no age limit. Newborns to seniors can donate. Medical suitability is determined at time of donation.',
      explanation: 'The oldest organ donor was 95! Age alone doesn\'t disqualify anyone. Organs are evaluated individually.',
      category: 'eligibility',
      severity: 'medium',
      sources: ['United Network for Organ Sharing (UNOS)']
    },
    {
      id: 5,
      myth: 'My family will have to pay for the donation',
      fact: 'There is NO cost to the donor family for organ donation. All costs are covered by the recipient\'s insurance.',
      explanation: 'The transplant recipient\'s insurance covers all donation-related medical costs. Donor families pay nothing.',
      category: 'financial',
      severity: 'high',
      sources: ['Organ Procurement and Transplantation Network']
    },
    {
      id: 6,
      myth: 'Only hearts, kidneys, and livers can be donated',
      fact: 'You can donate 8+ organs and 75+ types of tissues including corneas, skin, bones, tendons, and heart valves.',
      explanation: 'A single donor can save up to 8 lives through organ donation and improve 75+ more through tissue donation.',
      category: 'medical',
      severity: 'low',
      sources: ['U.S. Department of Health & Human Services']
    },
    {
      id: 7,
      myth: 'Rich or famous people get priority on the waiting list',
      fact: 'The national waiting list is completely impartial. Wealth, race, gender, or celebrity status give no advantage.',
      explanation: 'UNOS matches organs based on medical urgency, compatibility, time on list, and geographic distance - never on social status.',
      category: 'process',
      severity: 'high',
      sources: ['United Network for Organ Sharing (UNOS)']
    },
    {
      id: 8,
      myth: 'I can\'t donate because of my medical history',
      fact: 'Most medical conditions don\'t prevent donation. Each organ is evaluated individually at time of donation.',
      explanation: 'Even with conditions like diabetes or hypertension, you may still be able to donate certain organs or tissues.',
      category: 'eligibility',
      severity: 'medium',
      sources: ['American Transplant Foundation']
    },
    {
      id: 9,
      myth: 'Donation delays funeral arrangements',
      fact: 'Donation is completed within hours, allowing funeral arrangements to proceed as scheduled.',
      explanation: 'Organ donation typically takes 4-6 hours. The body is released to the family without delay.',
      category: 'process',
      severity: 'medium',
      sources: ['National Donor Family Council']
    },
    {
      id: 10,
      myth: 'My family can override my donor registration',
      fact: 'Your registered decision is legally binding. Family cannot override a properly registered donor.',
      explanation: 'While discussing your wishes with family is important, your donor registration is a legal document that must be honored.',
      category: 'legal',
      severity: 'high',
      sources: ['Uniform Anatomical Gift Act']
    }
  ];

  const categories = [
    { id: 'all', label: 'All Myths', count: myths.length, icon: BookOpen },
    { id: 'medical', label: 'Medical', count: myths.filter(m => m.category === 'medical').length, icon: Stethoscope },
    { id: 'process', label: 'Process', count: myths.filter(m => m.category === 'process').length, icon: Clock },
    { id: 'eligibility', label: 'Eligibility', count: myths.filter(m => m.category === 'eligibility').length, icon: Users },
    { id: 'religion', label: 'Religion', count: myths.filter(m => m.category === 'religion').length, icon: Shield },
    { id: 'financial', label: 'Financial', count: myths.filter(m => m.category === 'financial').length, icon: Scale },
    { id: 'legal', label: 'Legal', count: myths.filter(m => m.category === 'legal').length, icon: FileText }
  ];

  const filteredMyths = activeCategory === 'all' 
    ? myths 
    : myths.filter(myth => myth.category === activeCategory);

  const toggleMyth = (id) => {
    setExpandedMyths(prev => 
      prev.includes(id) 
        ? prev.filter(mythId => mythId !== id)
        : [...prev, id]
    );
  };

  const expandAll = () => {
    setExpandedMyths(filteredMyths.map(m => m.id));
  };

  const collapseAll = () => {
    setExpandedMyths([]);
  };

  const severityColors = {
    high: 'bg-rose-100 text-rose-700',
    medium: 'bg-amber-100 text-amber-700',
    low: 'bg-blue-100 text-blue-700'
  };

  const categoryColors = {
    medical: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    process: 'bg-blue-50 text-blue-700 border-blue-200',
    eligibility: 'bg-purple-50 text-purple-700 border-purple-200',
    religion: 'bg-amber-50 text-amber-700 border-amber-200',
    financial: 'bg-rose-50 text-rose-700 border-rose-200',
    legal: 'bg-indigo-50 text-indigo-700 border-indigo-200'
  };

  const stats = [
    { value: '90%', label: 'Believe Myths', icon: AlertTriangle, color: 'text-amber-500' },
    { value: '95%', label: 'Support Donation', icon: Heart, color: 'text-rose-500' },
    { value: '50K+', label: 'Myths Debunked', icon: CheckCircle2, color: 'text-emerald-500' },
    { value: '2M+', label: 'Educated', icon: Users, color: 'text-blue-500' }
  ];

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-b from-white to-gray-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 bg-emerald-50 px-4 py-2 rounded-full mb-4">
            <Sparkles className="h-4 w-4 text-emerald-500" />
            <span className="text-sm font-medium text-emerald-700">Separating Fact from Fiction</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Myths vs
            <span className="bg-gradient-to-r from-emerald-600 to-emerald-500 bg-clip-text text-transparent mx-2">
              Facts
            </span>
          </h2>
          
          <p className="text-lg text-gray-600">
            Get the truth about organ donation. We debunk common misconceptions with verified medical information.
          </p>
        </div>

        {/* Stats Banner */}
        <div className="mb-12 bg-gradient-to-r from-emerald-50 to-green-50 rounded-2xl p-6 border border-emerald-100">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
                <div className="text-sm text-gray-600 flex items-center justify-center space-x-1">
                  <stat.icon className="h-4 w-4" />
                  <span>{stat.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Categories Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    activeCategory === category.id
                      ? 'bg-gradient-to-r from-emerald-500 to-emerald-400 text-white shadow-lg'
                      : 'bg-white text-gray-700 border border-gray-200 hover:border-emerald-200'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{category.label}</span>
                  <span className={`px-2 py-0.5 rounded-full text-xs ${
                    activeCategory === category.id
                      ? 'bg-white/30 text-white'
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {category.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Control Buttons */}
        <div className="flex justify-end space-x-3 mb-6">
          <button
            onClick={expandAll}
            className="px-4 py-2 text-sm font-medium text-emerald-700 bg-emerald-50 rounded-lg hover:bg-emerald-100 transition-colors"
          >
            Expand All
          </button>
          <button
            onClick={collapseAll}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Collapse All
          </button>
        </div>

        {/* Myths Grid */}
        <div className="space-y-4 mb-12">
          {filteredMyths.map((myth) => (
            <div
              key={myth.id}
              className={`bg-white rounded-2xl border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 ${
                expandedMyths.includes(myth.id) ? 'ring-2 ring-emerald-100' : ''
              }`}
            >
              {/* Myth Header */}
              <div
                className="p-6 cursor-pointer"
                onClick={() => toggleMyth(myth.id)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="p-2 bg-rose-100 rounded-lg">
                        <XCircle className="h-5 w-5 text-rose-500" />
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-medium text-rose-700">MYTH</span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${severityColors[myth.severity]}`}>
                            {myth.severity === 'high' ? 'Critical Myth' : myth.severity === 'medium' ? 'Common Myth' : 'Minor Myth'}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${categoryColors[myth.category]}`}>
                            {myth.category.charAt(0).toUpperCase() + myth.category.slice(1)}
                          </span>
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mt-1">{myth.myth}</h3>
                      </div>
                    </div>
                  </div>
                  
                  <button className="p-2 text-gray-400 hover:text-emerald-500 ml-4">
                    {expandedMyths.includes(myth.id) ? (
                      <ChevronUp className="h-5 w-5" />
                    ) : (
                      <ChevronDown className="h-5 w-5" />
                    )}
                  </button>
                </div>

                {/* Fact Preview */}
                <div className="flex items-start space-x-3 mt-4 p-4 bg-emerald-50 rounded-lg">
                  <div className="p-2 bg-emerald-100 rounded-lg">
                    <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-emerald-700">FACT</div>
                    <p className="text-emerald-800 font-medium">{myth.fact}</p>
                  </div>
                </div>
              </div>

              {/* Expanded Content */}
              {expandedMyths.includes(myth.id) && (
                <div className="px-6 pb-6 border-t border-gray-100 pt-6">
                  {/* Detailed Explanation */}
                  <div className="mb-6">
                    <div className="flex items-center space-x-2 mb-3">
                      <HelpCircle className="h-5 w-5 text-blue-500" />
                      <h4 className="font-bold text-gray-900">Detailed Explanation</h4>
                    </div>
                    <p className="text-gray-700 bg-blue-50 p-4 rounded-lg">{myth.explanation}</p>
                  </div>

                  {/* Sources */}
                  <div>
                    <div className="flex items-center space-x-2 mb-3">
                      <Shield className="h-5 w-5 text-gray-500" />
                      <h4 className="font-bold text-gray-900">Verified Sources</h4>
                    </div>
                    <div className="space-y-2">
                      {myth.sources.map((source, idx) => (
                        <div key={idx} className="flex items-center space-x-2 text-sm text-gray-600">
                          <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                          <span>{source}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Share & Learn More */}
                  <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-200">
                    <div className="flex items-center space-x-1 text-sm text-gray-500">
                      <Zap className="h-4 w-4" />
                      <span>This myth prevents {myth.severity === 'high' ? 'thousands' : myth.severity === 'medium' ? 'hundreds' : 'dozens'} from registering</span>
                    </div>
                    <button className="px-4 py-2 text-sm font-medium text-emerald-700 bg-emerald-50 rounded-lg hover:bg-emerald-100 transition-colors">
                      Share This Fact
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Medical Expert Insight */}
        <div className="mb-16 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-8 border border-blue-100">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            <div className="lg:w-1/3 text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full mb-4">
                <Stethoscope className="h-10 w-10 text-white" />
              </div>
              <div className="text-sm font-medium text-blue-700 mb-2">Medical Expert Insight</div>
              <h3 className="text-xl font-bold text-gray-900">Why Myths Persist</h3>
            </div>
            
            <div className="lg:w-2/3">
              <blockquote className="text-lg text-gray-700 italic mb-4">
                "Myths about organ donation often stem from fear of the unknown and misinformation. 
                As medical professionals, we see daily how education transforms fear into hope. 
                Every myth debunked is a potential life saved."
              </blockquote>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-bold text-gray-900">Dr. Sarah Chen</div>
                  <div className="text-sm text-gray-600">Transplant Surgeon, 15+ years experience</div>
                </div>
                <Award className="h-8 w-8 text-amber-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Quick Reference Guide */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Quick Truth Reference</h3>
            <p className="text-gray-600">Essential facts at a glance</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-6 rounded-xl border border-emerald-100 shadow-sm">
              <div className="flex items-center space-x-3 mb-3">
                <div className="p-2 bg-emerald-100 rounded-lg">
                  <CheckCircle2 className="h-6 w-6 text-emerald-500" />
                </div>
                <div>
                  <div className="font-bold text-gray-900">Age Limit</div>
                  <div className="text-sm text-gray-600">There is none</div>
                </div>
              </div>
              <p className="text-gray-700 text-sm">Newborns to seniors can donate</p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-blue-100 shadow-sm">
              <div className="flex items-center space-x-3 mb-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Scale className="h-6 w-6 text-blue-500" />
                </div>
                <div>
                  <div className="font-bold text-gray-900">Cost</div>
                  <div className="text-sm text-gray-600">Zero to family</div>
                </div>
              </div>
              <p className="text-gray-700 text-sm">Recipient's insurance covers everything</p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-purple-100 shadow-sm">
              <div className="flex items-center space-x-3 mb-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Shield className="h-6 w-6 text-purple-500" />
                </div>
                <div>
                  <div className="font-bold text-gray-900">Confidential</div>
                  <div className="text-sm text-gray-600">Always private</div>
                </div>
              </div>
              <p className="text-gray-700 text-sm">Donor and recipient identities protected</p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-rose-100 shadow-sm">
              <div className="flex items-center space-x-3 mb-3">
                <div className="p-2 bg-rose-100 rounded-lg">
                  <Heart className="h-6 w-6 text-rose-500" />
                </div>
                <div>
                  <div className="font-bold text-gray-900">Life-Saving</div>
                  <div className="text-sm text-gray-600">1 donor → 8 lives</div>
                </div>
              </div>
              <p className="text-gray-700 text-sm">Maximum impact from single donor</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="inline-flex flex-col items-center bg-gradient-to-r from-white to-emerald-50 rounded-2xl p-8 border border-emerald-100 max-w-2xl">
            <div className="w-20 h-20 bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full flex items-center justify-center mb-6 relative">
              <BookOpen className="h-10 w-10 text-white" />
              <div className="absolute inset-0 border-4 border-emerald-300 rounded-full animate-ping opacity-30"></div>
            </div>
            
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              Knowledge is Power
            </h3>
            <p className="text-gray-600 mb-6 max-w-lg">
              Now that you know the facts, take the next step in your organ donation journey.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <button className="group px-8 py-4 bg-gradient-to-r from-emerald-500 to-emerald-400 text-white font-bold rounded-full shadow-2xl shadow-emerald-300 hover:shadow-3xl hover:shadow-emerald-400 transition-all duration-300 hover:scale-105 flex items-center space-x-3">
                <CheckCircle2 className="h-6 w-6" />
                <span>Register as Donor</span>
                <MessageCircle className="h-5 w-5 group-hover:scale-110 transition-transform" />
              </button>
              
              <button className="px-8 py-4 bg-white text-gray-800 font-medium rounded-full border-2 border-emerald-200 hover:border-emerald-300 transition-colors flex items-center space-x-2">
                <FileText className="h-5 w-5 text-emerald-500" />
                <span>Download Myth Buster Guide</span>
              </button>
            </div>
            
            <div className="mt-6 text-sm text-gray-500">
              <span className="flex items-center space-x-1">
                <Shield className="h-4 w-4" />
                <span>All information medically verified and regularly updated</span>
              </span>
            </div>
          </div>
        </div>

        {/* Educational Resources */}
        <div className="mt-12 pt-12 border-t border-gray-200">
          <div className="text-center mb-6">
            <h4 className="text-lg font-bold text-gray-900">Continue Learning</h4>
            <p className="text-gray-600">Explore more educational resources</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-4">
            <a href="#" className="p-4 bg-gray-50 rounded-lg hover:bg-emerald-50 transition-colors group">
              <div className="flex items-center space-x-3">
                <AlertTriangle className="h-5 w-5 text-amber-500 group-hover:text-amber-600" />
                <div>
                  <div className="font-medium text-gray-900">Top 10 Myths Video</div>
                  <div className="text-sm text-gray-600">5 minute explainer</div>
                </div>
              </div>
            </a>
            
            <a href="#" className="p-4 bg-gray-50 rounded-lg hover:bg-emerald-50 transition-colors group">
              <div className="flex items-center space-x-3">
                <Users className="h-5 w-5 text-blue-500 group-hover:text-blue-600" />
                <div>
                  <div className="font-medium text-gray-900">Family Discussion Guide</div>
                  <div className="text-sm text-gray-600">How to talk about donation</div>
                </div>
              </div>
            </a>
            
            <a href="#" className="p-4 bg-gray-50 rounded-lg hover:bg-emerald-50 transition-colors group">
              <div className="flex items-center space-x-3">
                <Scale className="h-5 w-5 text-purple-500 group-hover:text-purple-600" />
                <div>
                  <div className="font-medium text-gray-900">Legal FAQ</div>
                  <div className="text-sm text-gray-600">Your rights and protections</div>
                </div>
              </div>
            </a>
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

export default MythsVsFacts;