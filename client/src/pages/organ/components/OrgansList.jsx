import React, { useState, useEffect } from 'react';
import { 
  Heart,
  Eye,
  Layers,
  Wind,
  Droplets,
  Brain,
  Bone,
  Hand,
  HeartPulse,
  Stethoscope,
  Users,
  Clock,
  AlertCircle,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Gift,
  ChevronRight
} from 'lucide-react';

const OrgansList = () => {
  const [hoveredOrgan, setHoveredOrgan] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const organs = [
    {
      id: 'heart',
      name: 'Heart',
      icon: Heart,
      color: 'from-rose-500 to-red-400',
      iconColor: 'text-rose-500',
      bgColor: 'bg-rose-50',
      description: 'Can save patients with end-stage heart failure. Recipients gain a second chance at life.',
      waitingList: 3, // in thousands
      waitTime: '6-12 months',
      survivalRate: '85% at 1 year',
      compatibility: 'Blood type & size match',
      impact: '1 donor can save 1 life',
      fact: 'Hearts can be preserved for 4-6 hours'
    },
    {
      id: 'kidney',
      name: 'Kidney',
      icon: Droplets,
      color: 'from-emerald-500 to-green-400',
      iconColor: 'text-emerald-500',
      bgColor: 'bg-emerald-50',
      description: 'Most commonly transplanted organ. Can come from living or deceased donors.',
      waitingList: 95, // in thousands
      waitTime: '3-5 years',
      survivalRate: '92% at 5 years',
      compatibility: 'Blood type & tissue match',
      impact: '1 donor can save 2 lives (both kidneys)',
      fact: 'Living donors can lead normal lives with one kidney'
    },
    {
      id: 'HeartPulse',
      name: 'HeartPulse',
      icon: HeartPulse,
      color: 'from-amber-500 to-orange-400',
      iconColor: 'text-amber-500',
      bgColor: 'bg-amber-50',
      description: 'Regenerative organ. Can be split between adult and child recipients.',
      waitingList: 12, // in thousands
      waitTime: 'Under 1 year',
      survivalRate: '75% at 5 years',
      compatibility: 'Blood type & size match',
      impact: '1 donor can save 2 lives (split HeartPulse)',
      fact: 'HeartPulse can regenerate to full size within weeks'
    },
    {
      id: 'Winds',
      name: 'Winds',
      icon: Wind,
      color: 'from-blue-500 to-cyan-400',
      iconColor: 'text-blue-500',
      bgColor: 'bg-blue-50',
      description: 'Critical for patients with cystic fibrosis, COPD, and pulmonary fibrosis.',
      waitingList: 1.5, // in thousands
      waitTime: '6-12 months',
      survivalRate: '55% at 5 years',
      compatibility: 'Blood type & size match',
      impact: '1 donor can save 2 lives (both Winds)',
      fact: 'Most delicate organ with shortest preservation time'
    },
    {
      id: 'pancreas',
      name: 'Pancreas',
      icon: Layers,
      color: 'from-purple-500 to-violet-400',
      iconColor: 'text-purple-500',
      bgColor: 'bg-purple-50',
      description: 'Can cure Type 1 diabetes. Often transplanted with kidney.',
      waitingList: 0.8, // in thousands
      waitTime: '1-2 years',
      survivalRate: '80% at 3 years',
      compatibility: 'Blood type & tissue match',
      impact: '1 donor can save 1 life',
      fact: 'Can eliminate need for insulin injections'
    },
    {
      id: 'eyes',
      name: 'Eyes (Corneas)',
      icon: Eye,
      color: 'from-indigo-500 to-blue-400',
      iconColor: 'text-indigo-500',
      bgColor: 'bg-indigo-50',
      description: 'Restore sight to blind individuals. Not rejected by immune system.',
      waitingList: 1.2, // in thousands
      waitTime: '3-6 months',
      survivalRate: '90% at 1 year',
      compatibility: 'Universal donor (no matching needed)',
      impact: '1 donor can restore sight for 2 people',
      fact: 'Can be donated up to 12 hours after death'
    },
    {
      id: 'bone',
      name: 'Bone & Tissue',
      icon: Bone,
      color: 'from-amber-600 to-yellow-400',
      iconColor: 'text-amber-600',
      bgColor: 'bg-amber-50',
      description: 'Helps trauma victims, cancer patients, and spinal fusion surgeries.',
      waitingList: 0.5, // in thousands
      waitTime: 'Immediate availability',
      survivalRate: '95% success rate',
      compatibility: 'Minimal rejection risk',
      impact: '1 donor can help 50+ people',
      fact: 'Can be stored for up to 5 years'
    },
    {
      id: 'Hand',
      name: 'Hand',
      icon: Hand,
      color: 'from-pink-500 to-rose-400',
      iconColor: 'text-pink-500',
      bgColor: 'bg-pink-50',
      description: 'Critical for burn victims to prevent infection and promote healing.',
      waitingList: 0.3, // in thousands
      waitTime: 'Immediate availability',
      survivalRate: '90% graft success',
      compatibility: 'Universal donor',
      impact: '1 donor can cover 6 sq ft of Hand',
      fact: 'Hand donations save lives of burn victims'
    }
  ];

  const activeOrgan = organs.find(organ => organ.id === hoveredOrgan) || organs[0];

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-b from-white to-gray-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 bg-rose-50 px-4 py-2 rounded-full mb-4">
            <Sparkles className="h-4 w-4 text-rose-500" />
            <span className="text-sm font-medium text-rose-700">Life-Saving Gifts</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Organs You Can
            <span className="bg-gradient-to-r from-rose-600 to-rose-500 bg-clip-text text-transparent mx-2">
              Donate
            </span>
          </h2>
          
          <p className="text-lg text-gray-600">
            Each organ donation creates a ripple effect of healing and hope. Learn about what you can give.
          </p>
        </div>

        {/* Stats Banner */}
        <div className="mb-12 bg-gradient-to-r from-rose-50 to-pink-50 rounded-2xl p-6 border border-rose-100">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-rose-600">8</div>
              <div className="text-sm text-gray-600">Major Organs</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-emerald-600">50+</div>
              <div className="text-sm text-gray-600">Tissues Types</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">106K+</div>
              <div className="text-sm text-gray-600">Waiting in US</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">22/day</div>
              <div className="text-sm text-gray-600">Die While Waiting</div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left: Organs Grid */}
          <div className="lg:col-span-2">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {organs.map((organ, index) => (
                <div
                  key={organ.id}
                  onMouseEnter={() => setHoveredOrgan(organ.id)}
                  onMouseLeave={() => setHoveredOrgan(null)}
                  className={`group cursor-pointer bg-white rounded-2xl border p-5 shadow-lg transition-all duration-300 transform hover:-translate-y-1 ${
                    hoveredOrgan === organ.id
                      ? `border-rose-300 shadow-xl ring-2 ring-${organ.color.split(' ')[0].replace('from-', '')}/20`
                      : 'border-gray-100 hover:border-rose-200'
                  } ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                  style={{ transitionDelay: `${index * 50}ms` }}
                >
                  {/* Organ Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className={`p-3 rounded-xl ${organ.bgColor} relative`}>
                        <organ.icon className={`h-6 w-6 ${organ.iconColor}`} />
                        
                        {/* Active Indicator */}
                        {hoveredOrgan === organ.id && (
                          <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-rose-500 to-rose-400 rounded-full border-2 border-white">
                            <div className="w-full h-full rounded-full animate-ping opacity-30"></div>
                          </div>
                        )}
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900">{organ.name}</h3>
                        <div className="text-xs text-gray-500">{organ.impact}</div>
                      </div>
                    </div>
                    
                    {/* Waiting Badge */}
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                      organ.waitingList > 50 
                        ? 'bg-rose-100 text-rose-700'
                        : organ.waitingList > 10
                        ? 'bg-amber-100 text-amber-700'
                        : 'bg-emerald-100 text-emerald-700'
                    }`}>
                      {organ.waitingList}K waiting
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                    {organ.description}
                  </p>

                  {/* Quick Stats */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-500">Wait Time:</span>
                      <span className="font-medium text-gray-900">{organ.waitTime}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-500">Success Rate:</span>
                      <span className="font-medium text-emerald-600">{organ.survivalRate}</span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-3">
                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                      <span>Urgency Level</span>
                      <span>{organ.waitingList > 50 ? 'Critical' : organ.waitingList > 10 ? 'High' : 'Moderate'}</span>
                    </div>
                    <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className={`h-full bg-gradient-to-r ${organ.color} rounded-full transition-all duration-500 ${
                          hoveredOrgan === organ.id ? 'w-full' : 'w-3/4'
                        }`}
                      ></div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <button className="w-full py-2 bg-gray-50 text-gray-700 rounded-lg text-sm hover:bg-rose-50 hover:text-rose-600 transition-colors flex items-center justify-center space-x-1 group-hover:bg-rose-50 group-hover:text-rose-600">
                    <span>Learn More</span>
                    <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              ))}
            </div>

            {/* Did You Know Section */}
            <div className="mt-8 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-100">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-blue-100 rounded-xl">
                  <Stethoscope className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">Did You Know?</h3>
                  <p className="text-gray-600">
                    One organ donor can save up to 8 lives through organ donation and improve 75+ more through tissue donation. 
                    Age is not a barrier - people in their 70s and 80s have been successful donors.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Detailed Panel */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="bg-white rounded-2xl border border-gray-100 shadow-xl overflow-hidden">
                {/* Panel Header */}
                <div className={`bg-gradient-to-r ${activeOrgan.color} p-6`}>
                  <div className="flex items-center space-x-3">
                    <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                      <activeOrgan.icon className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">{activeOrgan.name} Donation</h3>
                      <p className="text-white/90 text-sm">Detailed Information</p>
                    </div>
                  </div>
                </div>

                {/* Panel Content */}
                <div className="p-6">
                  {/* Impact Badge */}
                  <div className="mb-6 p-4 bg-gradient-to-r from-rose-50 to-pink-50 rounded-xl border border-rose-100">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-2xl font-bold text-rose-600">{activeOrgan.impact.split(' ')[0]}</div>
                        <div className="text-sm text-gray-600">{activeOrgan.impact.split(' ').slice(1).join(' ')}</div>
                      </div>
                      <Users className="h-8 w-8 text-rose-400" />
                    </div>
                  </div>

                  {/* Details Grid */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Clock className="h-5 w-5 text-gray-400" />
                        <div>
                          <div className="text-sm text-gray-500">Average Wait Time</div>
                          <div className="font-medium text-gray-900">{activeOrgan.waitTime}</div>
                        </div>
                      </div>
                      {activeOrgan.waitingList > 50 && (
                        <AlertCircle className="h-5 w-5 text-rose-500" />
                      )}
                    </div>

                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                        <div>
                          <div className="text-sm text-gray-500">Success Rate</div>
                          <div className="font-medium text-gray-900">{activeOrgan.survivalRate}</div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Users className="h-5 w-5 text-blue-400" />
                        <div>
                          <div className="text-sm text-gray-500">Compatibility</div>
                          <div className="font-medium text-gray-900">{activeOrgan.compatibility}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Quick Fact */}
                  <div className="mt-8 p-4 bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl border border-emerald-100">
                    <div className="flex items-start space-x-3">
                      <Sparkles className="h-6 w-6 text-emerald-500 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">Quick Fact</h4>
                        <div className="text-sm text-gray-600">
                          {activeOrgan.fact}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* CTA Buttons */}
                  <div className="mt-8 space-y-3">
                    <button className="w-full py-3 bg-gradient-to-r from-rose-500 to-rose-400 text-white font-semibold rounded-lg shadow-lg shadow-rose-200 hover:shadow-xl hover:shadow-rose-300 transition-all hover:scale-105 flex items-center justify-center space-x-2">
                      <Gift className="h-5 w-5" />
                      <span>Register to Donate {activeOrgan.name}</span>
                    </button>
                    
                    <button className="w-full py-3 bg-white text-gray-800 font-medium rounded-lg border-2 border-rose-200 hover:border-rose-300 transition-colors flex items-center justify-center space-x-2">
                      <ArrowRight className="h-5 w-5 text-rose-500" />
                      <span>Share Information</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Statistics Card */}
              <div className="mt-6 bg-white rounded-2xl border border-gray-100 p-6 shadow-lg">
                <h4 className="font-semibold text-gray-900 mb-4">Transplant Statistics</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Daily Transplants</span>
                    <span className="font-medium text-gray-900">85+</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Living Donors/Year</span>
                    <span className="font-medium text-gray-900">6,000+</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Deceased Donors/Year</span>
                    <span className="font-medium text-gray-900">14,000+</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Total Waiting List</span>
                    <span className="font-medium text-rose-600">106,000+</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">
            Common Questions
          </h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl border border-gray-100 p-6 hover:border-rose-200 transition-colors">
              <h4 className="font-semibold text-gray-900 mb-2">Can I choose which organs to donate?</h4>
              <p className="text-gray-600 text-sm">
                Yes, you can specify which organs and tissues you wish to donate when you register. Your wishes will be respected.
              </p>
            </div>
            
            <div className="bg-white rounded-xl border border-gray-100 p-6 hover:border-rose-200 transition-colors">
              <h4 className="font-semibold text-gray-900 mb-2">Does organ donation disfigure the body?</h4>
              <p className="text-gray-600 text-sm">
                No. Donation is a surgical procedure performed by medical professionals. The body is treated with respect and can have an open-casket funeral.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="inline-flex flex-col items-center bg-gradient-to-r from-white to-rose-50 rounded-2xl p-8 border border-rose-100 max-w-2xl">
            <div className="w-20 h-20 bg-gradient-to-r from-rose-500 to-rose-400 rounded-full flex items-center justify-center mb-6">
              <Heart className="h-10 w-10 text-white" fill="white" />
            </div>
            
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              Ready to Give the Ultimate Gift?
            </h3>
            <p className="text-gray-600 mb-6 max-w-lg">
              Your decision to become an organ donor could mean the difference between life and death for someone in need.
            </p>
            
            <button className="group px-8 py-4 bg-gradient-to-r from-rose-500 to-rose-400 text-white font-bold rounded-full shadow-2xl shadow-rose-300 hover:shadow-3xl hover:shadow-rose-400 transition-all duration-300 hover:scale-105 flex items-center space-x-3">
              <Gift className="h-6 w-6" />
              <span>Register as Organ Donor</span>
              <ArrowRight className="h-5 w-5 group-hover:translate-x-2 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx global>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
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

export default OrgansList;