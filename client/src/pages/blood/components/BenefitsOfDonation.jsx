import React, { useState, useEffect } from 'react';
import { 
  Heart, 
  Activity, 
  Users, 
  Shield, 
  Smile, 
  Award,
  RefreshCw,
  Calendar,
  TrendingUp,
  Zap,
  CheckCircle,
  Gift,
  Star,
  ArrowRight,
  Droplets
} from 'lucide-react';

const BenefitsOfDonation = () => {
  const [activeBenefit, setActiveBenefit] = useState(0);
  const [stats, setStats] = useState({
    livesSaved: 0,
    healthChecks: 0,
    donorsHelped: 0
  });

  // Benefits data
  const benefits = [
    {
      id: 1,
      icon: Heart,
      title: "Save Lives",
      description: "A single donation can save up to 3 lives. Your blood could help accident victims, surgery patients, and those with chronic illnesses.",
      color: "bg-red-50 text-red-600",
      iconBg: "bg-gradient-to-br from-red-100 to-red-50",
      points: [
        "Help accident & trauma patients",
        "Support cancer treatments",
        "Aid in surgeries",
        "Save premature babies"
      ],
      statValue: "3 lives",
      statLabel: "per donation"
    },
    {
      id: 2,
      icon: Activity,
      title: "Free Health Check",
      description: "Before every donation, you receive a comprehensive health screening including blood pressure, hemoglobin, and temperature check.",
      color: "bg-emerald-50 text-emerald-600",
      iconBg: "bg-gradient-to-br from-emerald-100 to-emerald-50",
      points: [
        "Blood pressure check",
        "Hemoglobin level test",
        "Iron level assessment",
        "Pulse & temperature check"
      ],
      statValue: "Free",
      statLabel: "health screening"
    },
    {
      id: 3,
      icon: Shield,
      title: "Reduces Health Risks",
      description: "Regular blood donation helps maintain healthy iron levels and reduces the risk of heart disease and liver damage.",
      color: "bg-blue-50 text-blue-600",
      iconBg: "bg-gradient-to-br from-blue-100 to-blue-50",
      points: [
        "Reduces heart disease risk",
        "Lowers cancer risk",
        "Improves liver health",
        "Balances iron levels"
      ],
      statValue: "33%",
      statLabel: "less heart risk"
    },
    {
      id: 4,
      icon: Smile,
      title: "Boosts Well-being",
      description: "Donating blood creates a sense of purpose and happiness. The 'helper's high' releases endorphins that improve mood.",
      color: "bg-amber-50 text-amber-600",
      iconBg: "bg-gradient-to-br from-amber-100 to-amber-50",
      points: [
        "Releases feel-good hormones",
        "Reduces stress",
        "Increases life satisfaction",
        "Promotes mental wellness"
      ],
      statValue: "88%",
      statLabel: "feel happier"
    },
    {
      id: 5,
      icon: Users,
      title: "Community Impact",
      description: "Join a community of heroes. Your donation contributes to the collective effort of saving lives in your city.",
      color: "bg-purple-50 text-purple-600",
      iconBg: "bg-gradient-to-br from-purple-100 to-purple-50",
      points: [
        "Join donor community",
        "Earn recognition",
        "Help local hospitals",
        "Make new connections"
      ],
      statValue: "50K+",
      statLabel: "donor community"
    },
    {
      id: 6,
      icon: Award,
      title: "Earn Rewards",
      description: "Many donation centers offer rewards, certificates, and recognition for regular donors. Some even provide priority access for family needs.",
      color: "bg-rose-50 text-rose-600",
      iconBg: "bg-gradient-to-br from-rose-100 to-rose-50",
      points: [
        "Donor certificates",
        "Priority access",
        "Gift vouchers",
        "Recognition awards"
      ],
      statValue: "100+",
      statLabel: "reward points"
    }
  ];

  // Animated counting effect
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        livesSaved: prev.livesSaved < 10000 ? prev.livesSaved + 100 : 10000,
        healthChecks: prev.healthChecks < 50000 ? prev.healthChecks + 1000 : 50000,
        donorsHelped: prev.donorsHelped < 1000000 ? prev.donorsHelped + 5000 : 1000000
      }));
    }, 50);

    return () => clearInterval(interval);
  }, []);

  // Auto-rotate active benefit
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveBenefit(prev => (prev + 1) % benefits.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-16 px-4 md:px-6 lg:px-8 bg-gradient-to-b from-white to-rose-50/30">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center mb-4">
            <div className="relative">
              <div className="absolute inset-0 bg-rose-500 rounded-full blur opacity-70"></div>
              <div className="relative bg-gradient-to-r from-rose-500 to-rose-400 p-3 rounded-full">
                <Heart className="h-8 w-8 text-white" fill="white" />
              </div>
            </div>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            More Than Just Blood Donation
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            When you donate blood, you're not just saving lives — you're investing in your own 
            health, joining a community of heroes, and experiencing the joy of giving.
          </p>
        </div>

        {/* Stats Banner */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="bg-gradient-to-r from-rose-50 to-pink-50 rounded-2xl p-6 border border-rose-100">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-white rounded-xl shadow-sm">
                <Users className="h-8 w-8 text-rose-500" />
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-900">
                  {stats.livesSaved.toLocaleString()}+
                </div>
                <div className="text-gray-600">Lives Saved</div>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-rose-50 to-pink-50 rounded-2xl p-6 border border-rose-100">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-white rounded-xl shadow-sm">
                <Activity className="h-8 w-8 text-rose-500" />
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-900">
                  {stats.healthChecks.toLocaleString()}+
                </div>
                <div className="text-gray-600">Health Checks Done</div>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-rose-50 to-pink-50 rounded-2xl p-6 border border-rose-100">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-white rounded-xl shadow-sm">
                <Award className="h-8 w-8 text-rose-500" />
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-900">
                  {stats.donorsHelped.toLocaleString()}+
                </div>
                <div className="text-gray-600">Donors Helped</div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          
          {/* Left Column - Benefits Grid */}
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                const isActive = activeBenefit === index;
                
                return (
                  <button
                    key={benefit.id}
                    onClick={() => setActiveBenefit(index)}
                    className={`text-left p-5 rounded-2xl border transition-all duration-300 ${
                      isActive
                        ? 'border-rose-200 bg-white shadow-xl shadow-rose-100/50 transform scale-105'
                        : 'border-gray-100 bg-white/80 hover:bg-white hover:shadow-lg hover:border-rose-100'
                    }`}
                  >
                    <div className="flex items-start space-x-4">
                      <div className={`p-3 rounded-xl ${benefit.iconBg} ${isActive ? 'shadow-md' : ''}`}>
                        <Icon className={`h-6 w-6 ${benefit.color.split(' ')[1]}`} />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-900 mb-2">
                          {benefit.title}
                        </h3>
                        <p className="text-gray-600 text-sm line-clamp-2">
                          {benefit.description}
                        </p>
                        
                        {/* Progress indicator */}
                        {isActive && (
                          <div className="mt-3 flex items-center space-x-2">
                            <div className="h-1 flex-1 bg-gray-200 rounded-full overflow-hidden">
                              <div className="h-full bg-gradient-to-r from-rose-500 to-rose-400 rounded-full animate-progress"></div>
                            </div>
                            <div className="flex items-center space-x-1">
                              <div className="w-2 h-2 bg-rose-500 rounded-full animate-pulse"></div>
                              <div className="text-xs font-medium text-rose-500">Active</div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {/* Quick stat */}
                    <div className="mt-4 flex items-center justify-between">
                      <div className={`text-xs px-3 py-1 rounded-full ${benefit.color} font-medium`}>
                        {benefit.statValue}
                      </div>
                      <div className="text-xs text-gray-500">{benefit.statLabel}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column - Detailed View */}
          <div className="sticky top-24">
            <div className="bg-gradient-to-br from-white to-rose-50/50 rounded-3xl p-8 shadow-xl border border-rose-100/50">
              {/* Active benefit header */}
              <div className="flex items-center space-x-4 mb-8">
                <div className={`p-4 rounded-2xl ${benefits[activeBenefit].iconBg} shadow-lg`}>
                  {React.createElement(benefits[activeBenefit].icon, {
                    className: `h-8 w-8 ${benefits[activeBenefit].color.split(' ')[1]}`
                  })}
                </div>
                <div>
                  <div className="text-sm text-gray-500 mb-1">Currently Viewing</div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    {benefits[activeBenefit].title}
                  </h3>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                {benefits[activeBenefit].description}
              </p>

              {/* Points list */}
              <div className="space-y-3 mb-8">
                {benefits[activeBenefit].points.map((point, idx) => (
                  <div key={idx} className="flex items-center space-x-3 group">
                    <div className="p-1.5 bg-rose-100 rounded-lg group-hover:bg-rose-200 transition-colors">
                      <CheckCircle className="h-4 w-4 text-rose-500" />
                    </div>
                    <span className="text-gray-700 group-hover:text-gray-900 transition-colors">
                      {point}
                    </span>
                  </div>
                ))}
              </div>

              {/* Visual indicator */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Impact Level</span>
                  <span className="text-sm font-bold text-rose-500">High</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-rose-500 to-rose-400 rounded-full"
                    style={{ width: '85%' }}
                  ></div>
                </div>
              </div>

              {/* Testimonial */}
              <div className="bg-gradient-to-r from-rose-50 to-pink-50 rounded-2xl p-5 mb-8">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-rose-400 to-rose-300 
                                flex items-center justify-center text-white font-bold">
                    RS
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">Rahul Sharma</div>
                    <div className="text-sm text-gray-600">Regular Donor, 12 donations</div>
                  </div>
                  <Star className="h-5 w-5 text-amber-500 ml-auto" fill="currentColor" />
                </div>
                <p className="text-gray-700 italic">
                  "Donating blood made me feel more connected to my community. 
                  The free health check also helped me catch early signs of anemia."
                </p>
              </div>

              {/* CTA */}
              <button className="w-full group bg-gradient-to-r from-rose-500 to-rose-400 text-white 
                               py-4 rounded-2xl font-bold text-lg shadow-lg shadow-rose-200 
                               hover:shadow-xl hover:shadow-rose-300 transition-all duration-300 
                               hover:scale-105 active:scale-95 flex items-center justify-center space-x-3">
                <Droplets className="h-6 w-6" />
                <span>Start Your Donation Journey</span>
                <ArrowRight className="h-6 w-6 group-hover:translate-x-2 transition-transform" />
              </button>
            </div>

            {/* Benefit navigation */}
            <div className="flex justify-center space-x-2 mt-6">
              {benefits.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveBenefit(idx)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    idx === activeBenefit 
                      ? 'bg-rose-500 w-6' 
                      : 'bg-rose-200 hover:bg-rose-300'
                  }`}
                  aria-label={`Go to benefit ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Additional Info Section */}
        <div className="mt-20 bg-gradient-to-r from-rose-500/5 to-rose-400/5 rounded-3xl p-8 border border-rose-100">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex p-3 bg-white rounded-2xl shadow-sm mb-4">
                <RefreshCw className="h-8 w-8 text-rose-500" />
              </div>
              <h4 className="text-lg font-bold text-gray-900 mb-2">Quick Recovery</h4>
              <p className="text-gray-600">
                Your body replaces the donated blood within 24-48 hours. Most donors feel normal within minutes.
              </p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex p-3 bg-white rounded-2xl shadow-sm mb-4">
                <Calendar className="h-8 w-8 text-rose-500" />
              </div>
              <h4 className="text-lg font-bold text-gray-900 mb-2">Regular Schedule</h4>
              <p className="text-gray-600">
                Healthy adults can donate every 56 days. Set up regular appointments for consistent impact.
              </p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex p-3 bg-white rounded-2xl shadow-sm mb-4">
                <Zap className="h-8 w-8 text-rose-500" />
              </div>
              <h4 className="text-lg font-bold text-gray-900 mb-2">Energy Boost</h4>
              <p className="text-gray-600">
                Many donors report feeling more energetic and positive after donation due to renewed blood cells.
              </p>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="mt-16 text-center">
          <h3 className="text-3xl font-bold text-gray-900 mb-6">
            Ready to Make a Difference?
          </h3>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-gradient-to-r from-rose-500 to-rose-400 text-white 
                             rounded-2xl font-bold text-lg shadow-lg shadow-rose-200 
                             hover:shadow-xl hover:shadow-rose-300 transition-all 
                             hover:scale-105 flex items-center justify-center space-x-3">
              <Heart className="h-6 w-6" fill="white" />
              <span>Find a Donation Center</span>
            </button>
            
            <button className="px-8 py-4 bg-white text-gray-800 border-2 border-rose-200 
                             rounded-2xl font-bold text-lg hover:bg-rose-50 transition-colors 
                             flex items-center justify-center space-x-3">
              <Gift className="h-6 w-6 text-rose-500" />
              <span>View Donor Rewards</span>
            </button>
          </div>
          
          <p className="text-gray-500 mt-6 text-sm">
            Join over 1 million regular donors who have discovered the joy and benefits of giving blood.
          </p>
        </div>
      </div>

      {/* Custom Animations */}
      <style jsx global>{`
        @keyframes progress {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(0); }
        }
        
        .animate-progress {
          animation: progress 3s ease-in-out infinite;
        }
        
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

export default BenefitsOfDonation;