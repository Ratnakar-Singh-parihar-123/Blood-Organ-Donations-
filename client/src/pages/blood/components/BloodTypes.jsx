import React, { useState } from 'react';
import { 
  Droplets,
  Heart,
  Users,
  CheckCircle2,
  XCircle,
  ArrowRight,
  AlertCircle,
  Info,
  Sparkles,
  Zap,
  ChevronRight,
  Clock,
  Shield,
  Star
} from 'lucide-react';

const BloodTypes = () => {
  const [selectedType, setSelectedType] = useState('O-');

  const bloodTypes = [
    {
      type: 'O-',
      name: 'Universal Donor',
      color: 'from-rose-500 to-red-400',
      bgColor: 'bg-rose-50',
      textColor: 'text-rose-700',
      description: 'Can donate to ALL blood types. Most needed for emergencies.',
      population: '7%',
      demand: 'Extremely High',
      compatibility: {
        canDonateTo: ['All Types'],
        canReceiveFrom: ['O-'],
        priority: 'Emergency First'
      },
      facts: [
        'Universal donor for red blood cells',
        'Most urgently needed type',
        'Often in short supply',
        'Preferred for newborns'
      ],
      urgency: 'critical'
    },
    {
      type: 'O+',
      name: 'Most Common',
      color: 'from-red-500 to-orange-400',
      bgColor: 'bg-red-50',
      textColor: 'text-red-700',
      description: 'Most common blood type. Can donate to O+ and A+, B+, AB+.',
      population: '38%',
      demand: 'Very High',
      compatibility: {
        canDonateTo: ['O+', 'A+', 'B+', 'AB+'],
        canReceiveFrom: ['O+', 'O-'],
        priority: 'High Demand'
      },
      facts: [
        'Most common blood type worldwide',
        'Can donate to 4 other types',
        'Frequently requested',
        'Stable supply but high usage'
      ],
      urgency: 'high'
    },
    {
      type: 'A-',
      name: 'Rare Type',
      color: 'from-blue-500 to-indigo-400',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-700',
      description: 'Can donate to A-, A+, AB-, AB+. Often needed for specific patients.',
      population: '6%',
      demand: 'High',
      compatibility: {
        canDonateTo: ['A-', 'A+', 'AB-', 'AB+'],
        canReceiveFrom: ['A-', 'O-'],
        priority: 'Special Needs'
      },
      facts: [
        'Compatible with 4 blood types',
        'Important for certain ethnic groups',
        'Often used for cancer patients',
        'Limited availability'
      ],
      urgency: 'medium'
    },
    {
      type: 'A+',
      name: 'Second Most Common',
      color: 'from-indigo-500 to-purple-400',
      bgColor: 'bg-indigo-50',
      textColor: 'text-indigo-700',
      description: 'Very common type. Can donate to A+ and AB+.',
      population: '34%',
      demand: 'Moderate',
      compatibility: {
        canDonateTo: ['A+', 'AB+'],
        canReceiveFrom: ['A+', 'A-', 'O+', 'O-'],
        priority: 'Steady Need'
      },
      facts: [
        'Second most common type',
        'Good match availability',
        'Common in Western Europe',
        'Regularly needed'
      ],
      urgency: 'low'
    },
    {
      type: 'B-',
      name: 'Rare Donor',
      color: 'from-emerald-500 to-green-400',
      bgColor: 'bg-emerald-50',
      textColor: 'text-emerald-700',
      description: 'Rare type. Can donate to B-, B+, AB-, AB+. Critical for certain patients.',
      population: '2%',
      demand: 'High',
      compatibility: {
        canDonateTo: ['B-', 'B+', 'AB-', 'AB+'],
        canReceiveFrom: ['B-', 'O-'],
        priority: 'Critical Need'
      },
      facts: [
        'One of the rarest types',
        'Most common in Asia',
        'Vital for specific patients',
        'Often in short supply'
      ],
      urgency: 'high'
    },
    {
      type: 'B+',
      name: 'Common Type',
      color: 'from-green-500 to-teal-400',
      bgColor: 'bg-green-50',
      textColor: 'text-green-700',
      description: 'Can donate to B+ and AB+. Important for maintaining supply.',
      population: '9%',
      demand: 'Moderate',
      compatibility: {
        canDonateTo: ['B+', 'AB+'],
        canReceiveFrom: ['B+', 'B-', 'O+', 'O-'],
        priority: 'Regular Need'
      },
      facts: [
        'Common in Asian populations',
        'Can donate to 2 other types',
        'Stable demand',
        'Good donor availability'
      ],
      urgency: 'low'
    },
    {
      type: 'AB-',
      name: 'Rarest Type',
      color: 'from-purple-500 to-pink-400',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-700',
      description: 'Universal plasma donor. Can donate to AB-, AB+. Extremely rare.',
      population: '1%',
      demand: 'Medium',
      compatibility: {
        canDonateTo: ['AB-', 'AB+'],
        canReceiveFrom: ['All Negative Types'],
        priority: 'Special Plasma'
      },
      facts: [
        'Rarest blood type worldwide',
        'Universal plasma donor',
        'Can receive from all negative types',
        'Plasma is highly valuable'
      ],
      urgency: 'medium'
    },
    {
      type: 'AB+',
      name: 'Universal Recipient',
      color: 'from-pink-500 to-rose-400',
      bgColor: 'bg-pink-50',
      textColor: 'text-pink-700',
      description: 'Can receive from ALL blood types. Plasma can be given to anyone.',
      population: '3%',
      demand: 'Low',
      compatibility: {
        canDonateTo: ['AB+'],
        canReceiveFrom: ['All Types'],
        priority: 'Plasma Donor'
      },
      facts: [
        'Universal recipient for red cells',
        'Universal plasma donor',
        'Can receive from any type',
        'Plasma donations are versatile'
      ],
      urgency: 'low'
    }
  ];

  const selectedBloodType = bloodTypes.find(type => type.type === selectedType);

  const stats = [
    { value: '8', label: 'Blood Types', icon: Droplets, color: 'text-rose-500' },
    { value: 'O-', label: 'Most Needed', icon: AlertCircle, color: 'text-red-500' },
    { value: '95%', label: 'Population Covered', icon: Users, color: 'text-emerald-500' },
    { value: '36K', label: 'Daily Units Needed', icon: Heart, color: 'text-blue-500' }
  ];

  const urgencyColors = {
    critical: 'bg-rose-100 text-rose-700',
    high: 'bg-amber-100 text-amber-700',
    medium: 'bg-blue-100 text-blue-700',
    low: 'bg-emerald-100 text-emerald-700'
  };

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-b from-white to-gray-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 bg-rose-50 px-4 py-2 rounded-full mb-4">
            <Sparkles className="h-4 w-4 text-rose-500" />
            <span className="text-sm font-medium text-rose-700">Know Your Type</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Blood Types &
            <span className="bg-gradient-to-r from-rose-600 to-rose-500 bg-clip-text text-transparent mx-2">
              Compatibility
            </span>
          </h2>
          
          <p className="text-lg text-gray-600">
            Discover your blood type's unique characteristics, who you can help, and current demand levels.
          </p>
        </div>

        {/* Stats Banner */}
        <div className="mb-12 bg-gradient-to-r from-rose-50 to-pink-50 rounded-2xl p-6 border border-rose-100">
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

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left: Blood Type Grid */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {bloodTypes.map((bloodType) => (
                <button
                  key={bloodType.type}
                  onClick={() => setSelectedType(bloodType.type)}
                  className={`group relative bg-white rounded-2xl border p-4 shadow-lg hover:shadow-xl transition-all duration-300 ${
                    selectedType === bloodType.type
                      ? `border-${bloodType.color.split(' ')[0].replace('from-', '')}-300 ring-2 ring-${bloodType.color.split(' ')[0].replace('from-', '')}-100`
                      : 'border-gray-100 hover:border-rose-200'
                  }`}
                >
                  {/* Blood Type Badge */}
                  <div className="text-center mb-3">
                    <div className={`inline-flex items-center justify-center w-16 h-16 ${bloodType.bgColor} rounded-full mb-2 mx-auto relative`}>
                      <div className={`text-2xl font-bold ${bloodType.textColor}`}>
                        {bloodType.type}
                      </div>
                      
                      {/* Active Indicator */}
                      {selectedType === bloodType.type && (
                        <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-rose-500 to-rose-400 rounded-full border-2 border-white flex items-center justify-center">
                          <CheckCircle2 className="h-3 w-3 text-white" />
                        </div>
                      )}
                    </div>
                    
                    <div className={`text-xs font-medium px-2 py-1 rounded-full ${urgencyColors[bloodType.urgency]}`}>
                      {bloodType.demand}
                    </div>
                  </div>

                  {/* Quick Info */}
                  <div className="text-center">
                    <div className="text-sm font-medium text-gray-900 mb-1">{bloodType.name}</div>
                    <div className="text-xs text-gray-600">{bloodType.population} of population</div>
                  </div>

                  {/* Hover Effect */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-rose-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                </button>
              ))}
            </div>

            {/* Quick Guide */}
            <div className="mt-8 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-100">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-blue-100 rounded-xl">
                  <Info className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">Quick Compatibility Guide</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="bg-white p-3 rounded-lg border border-gray-100">
                      <div className="text-sm text-gray-500">Universal Donor</div>
                      <div className="text-lg font-bold text-rose-600">O-</div>
                    </div>
                    <div className="bg-white p-3 rounded-lg border border-gray-100">
                      <div className="text-sm text-gray-500">Universal Recipient</div>
                      <div className="text-lg font-bold text-pink-600">AB+</div>
                    </div>
                    <div className="bg-white p-3 rounded-lg border border-gray-100">
                      <div className="text-sm text-gray-500">Most Common</div>
                      <div className="text-lg font-bold text-red-600">O+ (38%)</div>
                    </div>
                    <div className="bg-white p-3 rounded-lg border border-gray-100">
                      <div className="text-sm text-gray-500">Rarest</div>
                      <div className="text-lg font-bold text-purple-600">AB- (1%)</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Detailed Panel */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="bg-white rounded-2xl border border-gray-100 shadow-xl overflow-hidden">
                {/* Panel Header */}
                <div className={`bg-gradient-to-r ${selectedBloodType?.color} p-6`}>
                  <div className="flex items-center space-x-3">
                    <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                      <Droplets className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">{selectedBloodType?.type} Blood Type</h3>
                      <p className="text-white/90 text-sm">{selectedBloodType?.name}</p>
                    </div>
                  </div>
                </div>

                {/* Panel Content */}
                <div className="p-6">
                  {/* Description */}
                  <div className="mb-6">
                    <p className="text-gray-600 mb-4">{selectedBloodType?.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-500">Population Share</div>
                      <div className="text-xl font-bold text-gray-900">{selectedBloodType?.population}</div>
                    </div>
                  </div>

                  {/* Compatibility Grid */}
                  <div className="space-y-4 mb-6">
                    <div>
                      <h4 className="font-bold text-gray-900 mb-2 flex items-center">
                        <CheckCircle2 className="h-5 w-5 text-emerald-500 mr-2" />
                        Can Donate To
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedBloodType?.compatibility.canDonateTo.map((type, idx) => (
                          <div key={idx} className="px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-lg font-medium">
                            {type}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-bold text-gray-900 mb-2 flex items-center">
                        <ArrowRight className="h-5 w-5 text-blue-500 mr-2" />
                        Can Receive From
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedBloodType?.compatibility.canReceiveFrom.map((type, idx) => (
                          <div key={idx} className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg font-medium">
                            {type}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Quick Facts */}
                  <div className="mb-6">
                    <h4 className="font-bold text-gray-900 mb-3">Key Facts</h4>
                    <div className="space-y-2">
                      {selectedBloodType?.facts.map((fact, idx) => (
                        <div key={idx} className="flex items-start space-x-2">
                          <Zap className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-gray-700">{fact}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Urgency Badge */}
                  <div className={`p-4 rounded-xl mb-6 ${urgencyColors[selectedBloodType?.urgency || 'low']}`}>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-bold text-gray-900">Current Demand</div>
                        <div className="text-sm">{selectedBloodType?.demand}</div>
                      </div>
                      {selectedBloodType?.urgency === 'critical' && (
                        <AlertCircle className="h-8 w-8 text-rose-500" />
                      )}
                    </div>
                  </div>

                  {/* CTA Buttons */}
                  <div className="space-y-3">
                    <button className="w-full py-3 bg-gradient-to-r from-rose-500 to-rose-400 text-white font-semibold rounded-lg shadow-lg shadow-rose-200 hover:shadow-xl hover:shadow-rose-300 transition-all hover:scale-105 flex items-center justify-center space-x-2">
                      <Heart className="h-5 w-5" />
                      <span>Donate {selectedBloodType?.type} Blood</span>
                    </button>
                    
                    <button className="w-full py-3 bg-white text-gray-800 font-medium rounded-lg border-2 border-rose-200 hover:border-rose-300 transition-colors flex items-center justify-center space-x-2">
                      <Shield className="h-5 w-5 text-rose-500" />
                      <span>Find Compatible Donors</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Emergency Alert */}
              {selectedBloodType?.urgency === 'critical' && (
                <div className="mt-6 bg-gradient-to-r from-rose-500 to-red-500 rounded-2xl p-4 text-white">
                  <div className="flex items-center space-x-3">
                    <AlertCircle className="h-6 w-6 animate-pulse" />
                    <div className="flex-1">
                      <div className="font-bold">EMERGENCY NEED</div>
                      <div className="text-sm opacity-90">Critical shortage • Immediate donations needed</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Compatibility Chart */}
              <div className="mt-6 bg-white rounded-2xl border border-gray-100 p-6 shadow-lg">
                <h4 className="font-bold text-gray-900 mb-4">Quick Reference</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Universal Donor:</span>
                    <span className="font-bold text-rose-600">O-</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Universal Recipient:</span>
                    <span className="font-bold text-pink-600">AB+</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Most Needed:</span>
                    <span className="font-bold text-red-600">O- and O+</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Rarest Type:</span>
                    <span className="font-bold text-purple-600">AB- (1%)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">
            Common Questions About Blood Types
          </h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl border border-gray-100 p-6 hover:border-rose-200 transition-colors">
              <h4 className="font-semibold text-gray-900 mb-2">How do I find out my blood type?</h4>
              <p className="text-gray-600 text-sm">
                Donate blood - you'll receive your type in a donor card. Medical tests during pregnancy or surgery also reveal it.
              </p>
            </div>
            
            <div className="bg-white rounded-xl border border-gray-100 p-6 hover:border-rose-200 transition-colors">
              <h4 className="font-semibold text-gray-900 mb-2">Can blood types change?</h4>
              <p className="text-gray-600 text-sm">
                Typically no. Your blood type is genetically determined and remains the same throughout your life.
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
              Don't Know Your Type?
            </h3>
            <p className="text-gray-600 mb-6 max-w-lg">
              Donate blood to find out! You'll receive a donor card with your blood type and help save lives.
            </p>
            
            <button className="group px-8 py-4 bg-gradient-to-r from-rose-500 to-rose-400 text-white font-bold rounded-full shadow-2xl shadow-rose-300 hover:shadow-3xl hover:shadow-rose-400 transition-all duration-300 hover:scale-105 flex items-center space-x-3">
              <Star className="h-6 w-6" />
              <span>Donate to Discover Your Type</span>
              <ChevronRight className="h-5 w-5 group-hover:translate-x-2 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx global>{`
        @keyframes pulse-gentle {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }
        .animate-pulse-gentle {
          animation: pulse-gentle 2s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default BloodTypes;