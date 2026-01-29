import React, { useState, useEffect, useRef } from 'react';
import { 
  Users, 
  Heart, 
  Droplets, 
  Building2, 
  Clock,
  TrendingUp,
  Shield,
  Zap
} from 'lucide-react';

const StatsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const [counts, setCounts] = useState({
    livesSaved: 0,
    activeDonors: 0,
    bloodRequests: 0,
    hospitalsConnected: 0,
    responseTime: 0,
    successRate: 0
  });

  const targetCounts = {
    livesSaved: 12543,
    activeDonors: 8500,
    bloodRequests: 234,
    hospitalsConnected: 156,
    responseTime: 45,
    successRate: 99.8
  };

  // Intersection Observer for animation trigger
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Count-up animation
  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000; // 2 seconds
    const interval = 30;
    const steps = duration / interval;

    Object.keys(targetCounts).forEach(key => {
      const target = targetCounts[key];
      let step = 0;
      
      const timer = setInterval(() => {
        step++;
        const progress = step / steps;
        const current = Math.floor(progress * target);
        
        setCounts(prev => ({
          ...prev,
          [key]: current
        }));

        if (step >= steps) {
          setCounts(prev => ({
            ...prev,
            [key]: target
          }));
          clearInterval(timer);
        }
      }, interval);
    });
  }, [isVisible]);

  // Main stats cards
  const mainStats = [
    {
      id: 'livesSaved',
      title: 'Lives Saved',
      value: counts.livesSaved,
      suffix: '+',
      icon: Heart,
      color: 'from-rose-500 to-rose-400',
      bgColor: 'bg-rose-50',
      iconColor: 'text-rose-500',
      description: 'Directly impacted through donations',
      trend: '+12% this month'
    },
    {
      id: 'activeDonors',
      title: 'Active Donors',
      value: counts.activeDonors,
      suffix: '+',
      icon: Users,
      color: 'from-emerald-500 to-emerald-400',
      bgColor: 'bg-emerald-50',
      iconColor: 'text-emerald-500',
      description: 'Registered life-savers',
      trend: '+8% this month'
    },
    {
      id: 'bloodRequests',
      title: 'Urgent Requests',
      value: counts.bloodRequests,
      suffix: '',
      icon: Droplets,
      color: 'from-amber-500 to-amber-400',
      bgColor: 'bg-amber-50',
      iconColor: 'text-amber-500',
      description: 'Active needs right now',
      trend: 'Live updates'
    },
    {
      id: 'hospitalsConnected',
      title: 'Hospitals Connected',
      value: counts.hospitalsConnected,
      suffix: '+',
      icon: Building2,
      color: 'from-blue-500 to-blue-400',
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-500',
      description: 'Trusted healthcare partners',
      trend: '+5 this quarter'
    }
  ];

  // Secondary metrics
  const secondaryMetrics = [
    {
      id: 'responseTime',
      title: 'Avg Response Time',
      value: counts.responseTime,
      suffix: ' mins',
      icon: Clock,
      color: 'text-emerald-600',
      description: 'Emergency requests'
    },
    {
      id: 'successRate',
      title: 'Success Rate',
      value: counts.successRate,
      suffix: '%',
      icon: Shield,
      color: 'text-rose-600',
      description: 'Donation matches'
    }
  ];

  return (
    <section ref={sectionRef} className="py-16 lg:py-24 bg-gradient-to-b from-white to-rose-50/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 bg-rose-50 px-4 py-2 rounded-full mb-4">
            <Zap className="h-4 w-4 text-rose-500" />
            <span className="text-sm font-medium text-rose-700">Real-time Impact</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Every Number has a
            <span className="bg-gradient-to-r from-rose-600 to-rose-500 bg-clip-text text-transparent ml-2">
              Life Story
            </span>
          </h2>
          <p className="text-lg text-gray-600">
            Behind each statistic is a person whose life was changed by someone's decision to donate.
          </p>
        </div>

        {/* Main Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {mainStats.map((stat, index) => (
            <div
              key={stat.id}
              className={`group bg-white rounded-2xl border border-gray-100 p-6 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Icon Container */}
              <div className={`${stat.bgColor} w-14 h-14 rounded-xl flex items-center justify-center mb-5 relative overflow-hidden`}>
                <stat.icon className={`h-7 w-7 ${stat.iconColor} relative z-10`} />
                <div className={`absolute inset-0 bg-gradient-to-r ${stat.color} opacity-10 group-hover:opacity-20 transition-opacity`}></div>
              </div>

              {/* Count-up Animation */}
              <div className="flex items-baseline space-x-2 mb-2">
                <div className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
                  {stat.value.toLocaleString()}
                </div>
                <div className="text-xl font-semibold text-gray-500">{stat.suffix}</div>
              </div>

              {/* Title */}
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{stat.title}</h3>

              {/* Description */}
              <p className="text-sm text-gray-600 mb-4">{stat.description}</p>

              {/* Trend Indicator */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex items-center space-x-1">
                  <TrendingUp className="h-4 w-4 text-emerald-500" />
                  <span className="text-sm font-medium text-emerald-600">{stat.trend}</span>
                </div>
                
                {/* Animated Progress Bar */}
                <div className="w-24 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className={`h-full bg-gradient-to-r ${stat.color} rounded-full transition-all duration-1000 ${
                      isVisible ? 'w-full' : 'w-0'
                    }`}
                    style={{ transitionDelay: `${index * 200 + 500}ms` }}
                  ></div>
                </div>
              </div>

              {/* Glow Effect on Hover */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-rose-500 to-transparent opacity-0 group-hover:opacity-5 transition-opacity -z-10"></div>
            </div>
          ))}
        </div>

        {/* Secondary Metrics & Visualization */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left: Secondary Metrics */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Performance Metrics</h3>
              <div className="space-y-6">
                {secondaryMetrics.map((metric, index) => (
                  <div key={metric.id} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-gray-50 rounded-lg">
                        <metric.icon className={`h-5 w-5 ${metric.color}`} />
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">{metric.title}</div>
                        <div className="text-xs text-gray-500">{metric.description}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`text-2xl font-bold ${metric.color}`}>
                        {metric.value}
                        <span className="text-lg font-semibold text-gray-500">{metric.suffix}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Trust Badge */}
            <div className="bg-gradient-to-br from-rose-50 to-white rounded-2xl border border-rose-100 p-6 shadow-lg">
              <div className="flex items-center space-x-3">
                <Shield className="h-8 w-8 text-rose-500" />
                <div>
                  <div className="font-semibold text-gray-900">Verified & Trusted</div>
                  <div className="text-sm text-gray-600">ISO 9001 Certified Platform</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Impact Visualization */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-lg h-full">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Real-time Impact Map</h3>
              
              {/* Visualization Container */}
              <div className="relative h-64 lg:h-80 bg-gradient-to-br from-rose-50/50 to-white rounded-xl overflow-hidden border border-rose-100">
                {/* Map Grid */}
                <div className="absolute inset-0 grid grid-cols-8 grid-rows-4 gap-2 p-4">
                  {Array.from({ length: 32 }).map((_, i) => (
                    <div
                      key={i}
                      className={`relative rounded-lg transition-all duration-500 ${
                        i < Math.floor(counts.activeDonors / 300) 
                          ? 'bg-gradient-to-br from-rose-400/30 to-rose-300/20 border border-rose-200/30' 
                          : 'bg-gray-100/50 border border-gray-200/30'
                      }`}
                    >
                      {/* Pulsing Effect for Active Donors */}
                      {i < 8 && (
                        <div className="absolute inset-0">
                          <div className="absolute inset-0 bg-gradient-to-br from-rose-400/20 to-transparent rounded-lg animate-pulse"></div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Animated Elements */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  {/* Central Heart */}
                  <div className="relative">
                    <Heart className="h-16 w-16 text-rose-400/40" fill="currentColor" />
                    <Heart className="h-12 w-12 text-rose-500 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" 
                           fill="currentColor" />
                  </div>
                </div>

                {/* Connection Lines */}
                <svg className="absolute inset-0 w-full h-full">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <line
                      key={i}
                      x1="50%"
                      y1="50%"
                      x2={`${20 + i * 10}%`}
                      y2={`${20 + i * 8}%`}
                      stroke="url(#gradient)"
                      strokeWidth="1"
                      strokeDasharray="4,4"
                      className="animate-dash"
                      style={{ animationDelay: `${i * 0.2}s` }}
                    />
                  ))}
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#f87171" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#f43f5e" stopOpacity="0.1" />
                    </linearGradient>
                  </defs>
                </svg>

                {/* Legend */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-rose-400/30"></div>
                    <span className="text-xs text-gray-600">Active Donors</span>
                  </div>
                  <div className="text-xs text-gray-500">
                    Real-time updates every 30 seconds
                  </div>
                </div>
              </div>

              {/* Stats Summary */}
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="text-center p-4 bg-rose-50/50 rounded-xl">
                  <div className="text-2xl font-bold text-rose-600">
                    {Math.floor(counts.livesSaved / 1000)}K+
                  </div>
                  <div className="text-sm text-gray-600">Impact Stories</div>
                </div>
                <div className="text-center p-4 bg-emerald-50/50 rounded-xl">
                  <div className="text-2xl font-bold text-emerald-600">
                    24/7
                  </div>
                  <div className="text-sm text-gray-600">Emergency Support</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <p className="text-gray-600 mb-6">
            Join thousands of heroes making a difference every day
          </p>
          <button className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-rose-500 to-rose-400 text-white font-semibold rounded-full shadow-lg shadow-rose-200 hover:shadow-xl hover:shadow-rose-300 transition-all hover:scale-105">
            <Users className="h-5 w-5" />
            <span>Join Our Donor Community</span>
          </button>
        </div>
      </div>

      {/* Custom Animation Styles */}
      <style jsx global>{`
        @keyframes dash {
          to {
            stroke-dashoffset: -20;
          }
        }
        .animate-dash {
          animation: dash 3s linear infinite;
        }
        
        @keyframes count-up {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .counting {
          animation: count-up 0.5s ease-out forwards;
        }
      `}</style>
    </section>
  );
};

export default StatsSection;