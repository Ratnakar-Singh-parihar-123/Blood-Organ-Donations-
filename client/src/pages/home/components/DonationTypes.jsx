import React, { useState } from 'react';
import { 
  Droplets, 
  Heart, 
  Shield, 
  Clock,
  Users,
  AlertCircle,
  CheckCircle2,
  Stethoscope,
  Leaf,
  Sparkles,
  Zap,
  ArrowRight,
  MapPin
} from 'lucide-react';

const DonationTypes = () => {
  const [activeDonation, setActiveDonation] = useState('blood');

  const donationTypes = [
    {
      id: 'blood',
      title: 'Whole Blood Donation',
      shortTitle: 'Blood',
      description: 'The most common type of donation where approximately one pint of blood is collected. Can save up to 3 lives.',
      icon: Droplets,
      color: 'from-rose-500 to-red-400',
      iconColor: 'text-rose-500',
      bgColor: 'bg-rose-50',
      details: {
        time: '30-45 minutes',
        frequency: 'Every 56 days',
        impact: 'Saves 3 lives',
        eligibility: 'Age 16+ (with consent), 110+ lbs'
      },
      needs: {
        urgent: true,
        demand: 'High',
        compatibility: 'Universal donors needed'
      },
      stats: {
        dailyNeed: '36,000 units',
        shortage: 'Every 2 seconds'
      }
    },
    {
      id: 'plasma',
      title: 'Plasma Donation',
      shortTitle: 'Plasma',
      description: 'Plasma is the liquid portion of your blood containing proteins and antibodies essential for many treatments.',
      icon: Shield,
      color: 'from-blue-500 to-cyan-400',
      iconColor: 'text-blue-500',
      bgColor: 'bg-blue-50',
      details: {
        time: '60-90 minutes',
        frequency: 'Every 28 days',
        impact: 'Treats burn victims & immune disorders',
        eligibility: 'Age 18+, specific weight requirements'
      },
      needs: {
        urgent: true,
        demand: 'Critical',
        compatibility: 'All blood types welcome'
      },
      stats: {
        dailyNeed: '10,000 units',
        shortage: 'Severe shortage'
      }
    },
    {
      id: 'platelets',
      title: 'Platelet Donation',
      shortTitle: 'Platelets',
      description: 'Platelets help stop bleeding by forming clots. Essential for cancer patients and surgery recipients.',
      icon: Heart,
      color: 'from-emerald-500 to-green-400',
      iconColor: 'text-emerald-500',
      bgColor: 'bg-emerald-50',
      details: {
        time: '90-120 minutes',
        frequency: 'Every 7 days (max 24 times/year)',
        impact: 'Helps cancer patients survive chemo',
        eligibility: 'Age 17+, specific platelet count'
      },
      needs: {
        urgent: true,
        demand: 'Very High',
        compatibility: 'Best with O-, A-, B-'
      },
      stats: {
        dailyNeed: '2,000 units',
        shortage: 'Only 5-day shelf life'
      }
    },
    {
      id: 'organs',
      title: 'Organ Donation',
      shortTitle: 'Organs',
      description: 'Register as an organ donor to save up to 8 lives and improve 75+ more through tissue donation.',
      icon: Leaf,
      color: 'from-purple-500 to-violet-400',
      iconColor: 'text-purple-500',
      bgColor: 'bg-purple-50',
      details: {
        time: 'Registration: 5 minutes',
        frequency: 'Lifetime commitment',
        impact: 'Saves up to 8 lives',
        eligibility: 'All ages can register'
      },
      needs: {
        urgent: true,
        demand: 'Extreme',
        compatibility: 'Medical evaluation required'
      },
      stats: {
        dailyNeed: '22 people saved daily',
        shortage: '106,000+ on waiting list'
      }
    }
  ];

  const activeDonationData = donationTypes.find(d => d.id === activeDonation);

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-b from-white to-rose-50/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 bg-rose-50 px-4 py-2 rounded-full mb-4">
            <Sparkles className="h-4 w-4 text-rose-500" />
            <span className="text-sm font-medium text-rose-700">Multiple Ways to Save Lives</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Choose Your
            <span className="bg-gradient-to-r from-rose-600 to-rose-500 bg-clip-text text-transparent mx-2">
              Donation Type
            </span>
          </h2>
          
          <p className="text-lg text-gray-600 mb-8">
            Every donation type serves unique medical needs. Learn which one matches your ability to help.
          </p>
        </div>

        {/* Quick Stats Banner */}
        <div className="mb-12 bg-gradient-to-r from-rose-50 to-pink-50 rounded-2xl p-6 border border-rose-100">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-rose-600">4</div>
              <div className="text-sm text-gray-600">Donation Types</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-emerald-600">22</div>
              <div className="text-sm text-gray-600">Lives Saved Daily</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">36K</div>
              <div className="text-sm text-gray-600">Units Needed Daily</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">8</div>
              <div className="text-sm text-gray-600">Max Lives per Donor</div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left: Donation Type Cards */}
          <div className="lg:col-span-2">
            <div className="grid sm:grid-cols-2 gap-6">
              {donationTypes.map((type) => (
                <div
                  key={type.id}
                  onClick={() => setActiveDonation(type.id)}
                  className={`group cursor-pointer bg-white rounded-2xl border-2 p-6 shadow-lg transition-all duration-300 transform hover:-translate-y-1 ${
                    activeDonation === type.id
                      ? `border-rose-300 shadow-xl ring-2 ring-${type.color.split(' ')[0].replace('from-', '')}/20`
                      : 'border-gray-100 hover:border-rose-200'
                  }`}
                >
                  {/* Card Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className={`p-3 rounded-xl ${type.bgColor} relative`}>
                        <type.icon className={`h-6 w-6 ${type.iconColor}`} />
                        
                        {/* Active Indicator */}
                        {activeDonation === type.id && (
                          <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r rounded-full border-2 border-white">
                            <div className="w-full h-full bg-gradient-to-r rounded-full animate-ping"></div>
                          </div>
                        )}
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 text-lg">{type.shortTitle}</h3>
                        <div className={`text-xs font-medium px-2 py-1 rounded-full mt-1 inline-block ${
                          type.needs.urgent 
                            ? 'bg-rose-100 text-rose-700' 
                            : 'bg-gray-100 text-gray-700'
                        }`}>
                          <span className="flex items-center">
                            {type.needs.urgent && <AlertCircle className="h-3 w-3 mr-1" />}
                            {type.needs.demand} Demand
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Urgent Badge */}
                    {type.needs.urgent && (
                      <div className="bg-gradient-to-r from-rose-500 to-rose-400 text-white text-xs font-bold px-3 py-1 rounded-full">
                        URGENT
                      </div>
                    )}
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {type.description}
                  </p>

                  {/* Quick Stats */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Time Required:</span>
                      <span className="font-medium text-gray-900">{type.details.time}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Impact:</span>
                      <span className="font-medium text-rose-600">{type.details.impact}</span>
                    </div>
                  </div>

                  {/* Progress Bar for Demand */}
                  <div className="mb-3">
                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                      <span>Current Need</span>
                      <span>{type.needs.demand}</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className={`h-full bg-gradient-to-r ${type.color} rounded-full transition-all duration-500 ${
                          activeDonation === type.id ? 'w-full' : 'w-3/4'
                        }`}
                      ></div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <button className="w-full py-2.5 bg-gray-50 text-gray-700 rounded-lg font-medium text-sm hover:bg-rose-50 hover:text-rose-600 transition-colors flex items-center justify-center space-x-2 group-hover:bg-rose-50 group-hover:text-rose-600">
                    <span>Learn More</span>
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Detailed Panel */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="bg-white rounded-2xl border border-gray-100 shadow-xl overflow-hidden">
                {/* Panel Header */}
                <div className={`bg-gradient-to-r ${activeDonationData?.color} p-6`}>
                  <div className="flex items-center space-x-3">
                    <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                      <activeDonationDataicon className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">{activeDonationData?.title}</h3>
                      <p className="text-white/90 text-sm">Active Details</p>
                    </div>
                  </div>
                </div>

                {/* Panel Content */}
                <div className="p-6">
                  {/* Impact Badge */}
                  <div className="mb-6 p-4 bg-gradient-to-r from-rose-50 to-pink-50 rounded-xl border border-rose-100">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-2xl font-bold text-rose-600">{activeDonationData?.details.impact.split(' ')[0]}</div>
                        <div className="text-sm text-gray-600">{activeDonationData?.details.impact.split(' ').slice(1).join(' ')}</div>
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
                          <div className="text-sm text-gray-500">Time Required</div>
                          <div className="font-medium text-gray-900">{activeDonationData?.details.time}</div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Zap className="h-5 w-5 text-amber-400" />
                        <div>
                          <div className="text-sm text-gray-500">Frequency</div>
                          <div className="font-medium text-gray-900">{activeDonationData?.details.frequency}</div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Stethoscope className="h-5 w-5 text-emerald-400" />
                        <div>
                          <div className="text-sm text-gray-500">Eligibility</div>
                          <div className="font-medium text-gray-900">{activeDonationData?.details.eligibility}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Urgent Need Section */}
                  <div className="mt-8 p-4 bg-gradient-to-r from-rose-50 to-red-50 rounded-xl border border-rose-200">
                    <div className="flex items-start space-x-3">
                      <AlertCircle className="h-6 w-6 text-rose-500 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">Urgent Need</h4>
                        <div className="text-sm text-gray-600 mb-2">
                          {activeDonationData?.stats.dailyNeed} needed daily • {activeDonationData?.stats.shortage}
                        </div>
                        <div className="text-xs text-rose-700 bg-rose-100 px-3 py-1 rounded-full inline-block">
                          {activeDonationData?.needs.compatibility}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* CTA Buttons */}
                  <div className="mt-8 space-y-3">
                    <button className="w-full py-3 bg-gradient-to-r from-rose-500 to-rose-400 text-white font-semibold rounded-lg shadow-lg shadow-rose-200 hover:shadow-xl hover:shadow-rose-300 transition-all hover:scale-105 flex items-center justify-center space-x-2">
                      <CheckCircle2 className="h-5 w-5" />
                      <span>Check Eligibility</span>
                    </button>
                    
                    <button className="w-full py-3 bg-white text-gray-800 font-medium rounded-lg border-2 border-rose-200 hover:border-rose-300 transition-colors flex items-center justify-center space-x-2">
                      <MapPin className="h-5 w-5 text-rose-500" />
                      <span>Find Nearby Centers</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Quick Comparison */}
              <div className="mt-6 bg-white rounded-2xl border border-gray-100 p-6 shadow-lg">
                <h4 className="font-semibold text-gray-900 mb-4">Quick Comparison</h4>
                <div className="space-y-3">
                  {donationTypes.map((type) => (
                    <div
                      key={type.id}
                      onClick={() => setActiveDonation(type.id)}
                      className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors ${
                        activeDonation === type.id
                          ? 'bg-rose-50 border border-rose-200'
                          : 'bg-gray-50 hover:bg-gray-100'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <type.icon className={`h-5 w-5 ${type.iconColor}`} />
                        <span className="font-medium text-gray-900">{type.shortTitle}</span>
                      </div>
                      <div className={`text-xs font-medium px-2 py-1 rounded-full ${
                        type.needs.urgent
                          ? 'bg-rose-100 text-rose-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}>
                        {type.details.time.split(' ')[0]}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-8 border border-blue-100 max-w-3xl mx-auto">
            <div className="text-left sm:text-left sm:flex-1">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Not Sure Where to Start?</h3>
              <p className="text-gray-600 mb-4">
                Take our 2-minute quiz to find the best donation type for you based on your health, schedule, and impact goals.
              </p>
            </div>
            <button className="group px-8 py-3 bg-gradient-to-r from-blue-500 to-cyan-400 text-white font-semibold rounded-full shadow-lg shadow-blue-200 hover:shadow-xl hover:shadow-blue-300 transition-all hover:scale-105 flex items-center space-x-2">
              <Zap className="h-5 w-5" />
              <span>Take Donation Quiz</span>
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
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

export default DonationTypes;