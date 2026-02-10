import React, { useState, useEffect } from 'react';
import { 
  AlertCircle, 
  Heart, 
  MapPin, 
  Clock, 
  Phone, 
  Users, 
  Filter, 
  ChevronDown,
  ChevronUp,
  CheckCircle,
  X,
  Calendar,
  Droplets,
  Shield,
  ArrowRight,
  Loader2,
  Bell,
  Hospital,
  AlertTriangle,
  Search,
  RefreshCw,
  Zap,
  Target,
  TrendingUp,
  Star,
  Eye,
  Share2,
  Download,
  Printer,
  MessageCircle,
  UserCheck,
  Sparkles,
  Award,
  Globe,
  Plus,
  Home,
  ChevronRight
} from 'lucide-react';

const UrgentRequestsPage = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilters, setActiveFilters] = useState({
    donationType: 'all',
    bloodGroup: 'all',
    urgency: 'all',
    location: 'all'
  });
  const [showFilters, setShowFilters] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [pulse, setPulse] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [stats, setStats] = useState({
    critical: 0,
    urgent: 0,
    high: 0,
    responded: 0
  });

  // Pulse animation for critical alerts
  useEffect(() => {
    const interval = setInterval(() => {
      setPulse(prev => !prev);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  // Sticky filter bar
  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Update stats when requests change
  useEffect(() => {
    const newStats = {
      critical: requests.filter(r => r.urgency === 'critical').length,
      urgent: requests.filter(r => r.urgency === 'urgent').length,
      high: requests.filter(r => r.urgency === 'high').length,
      responded: Math.floor(requests.length * 0.4) // Mock data
    };
    setStats(newStats);
  }, [requests]);

  // Filter options
  const filterOptions = {
    donationType: [
      { value: 'all', label: 'All Types', icon: Zap, color: 'from-purple-500 to-pink-500' },
      { value: 'blood', label: 'Blood', icon: Droplets, color: 'from-red-500 to-rose-500' },
      { value: 'plasma', label: 'Plasma', icon: Heart, color: 'from-blue-500 to-cyan-500' },
      { value: 'organ', label: 'Organ', icon: Heart, color: 'from-emerald-500 to-teal-500' }
    ],
    bloodGroup: [
      { value: 'all', label: 'All Groups' },
      { value: 'O-', label: 'O-', color: 'bg-red-100 text-red-700 border-red-200' },
      { value: 'O+', label: 'O+', color: 'bg-rose-100 text-rose-700 border-rose-200' },
      { value: 'A-', label: 'A-', color: 'bg-blue-100 text-blue-700 border-blue-200' },
      { value: 'A+', label: 'A+', color: 'bg-cyan-100 text-cyan-700 border-cyan-200' },
      { value: 'B-', label: 'B-', color: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
      { value: 'B+', label: 'B+', color: 'bg-amber-100 text-amber-700 border-amber-200' },
      { value: 'AB-', label: 'AB-', color: 'bg-purple-100 text-purple-700 border-purple-200' },
      { value: 'AB+', label: 'AB+', color: 'bg-violet-100 text-violet-700 border-violet-200' }
    ],
    urgency: [
      { value: 'all', label: 'All Urgency' },
      { value: 'critical', label: 'Critical', color: 'from-red-600 to-rose-500', icon: AlertCircle },
      { value: 'urgent', label: 'Urgent', color: 'from-amber-600 to-orange-500', icon: Clock },
      { value: 'high', label: 'High', color: 'from-orange-500 to-amber-400', icon: TrendingUp }
    ],
    location: [
      { value: 'all', label: 'Any Location', icon: Globe },
      { value: 'delhi', label: 'Delhi NCR', icon: MapPin },
      { value: 'mumbai', label: 'Mumbai', icon: MapPin },
      { value: 'bangalore', label: 'Bangalore', icon: MapPin },
      { value: 'chennai', label: 'Chennai', icon: MapPin },
      { value: 'kolkata', label: 'Kolkata', icon: MapPin },
      { value: 'hyderabad', label: 'Hyderabad', icon: MapPin }
    ]
  };

  // Enhanced mock data
  useEffect(() => {
    const fetchRequests = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      const mockRequests = [
        {
          id: 1,
          type: 'blood',
          bloodGroup: 'O-',
          urgency: 'critical',
          patientCondition: 'Emergency Heart Surgery',
          patientAge: 45,
          patientGender: 'Male',
          hospital: 'Apollo Hospital',
          location: 'Delhi',
          distance: '2.5 km',
          units: 4,
          timeRemaining: '3 hours 15 min',
          contactNumber: '+91 98765 43210',
          lastUpdated: '15 min ago',
          hospitalVerified: true,
          priorityScore: 98,
          donorMatched: 2,
          donorNeeded: 4,
          responseRate: '65%',
          verifiedBy: 'Medical Council of India'
        },
        {
          id: 2,
          type: 'organ',
          organType: 'Kidney',
          bloodGroup: 'B+',
          urgency: 'urgent',
          patientCondition: 'Chronic Kidney Disease',
          patientAge: 32,
          patientGender: 'Female',
          hospital: 'Fortis Hospital',
          location: 'Mumbai',
          distance: '5.2 km',
          age: 32,
          timeRemaining: '24 hours',
          contactNumber: '+91 98765 43211',
          lastUpdated: '30 min ago',
          hospitalVerified: true,
          priorityScore: 87,
          donorMatched: 1,
          donorNeeded: 1,
          responseRate: '45%',
          verifiedBy: 'National Organ & Tissue Transplant Organisation'
        },
        {
          id: 3,
          type: 'blood',
          bloodGroup: 'AB-',
          urgency: 'critical',
          patientCondition: 'Severe Accident Victim',
          patientAge: 28,
          patientGender: 'Male',
          hospital: 'Max Super Speciality Hospital',
          location: 'Bangalore',
          distance: '1.8 km',
          units: 6,
          timeRemaining: '2 hours 45 min',
          contactNumber: '+91 98765 43212',
          lastUpdated: '5 min ago',
          hospitalVerified: true,
          priorityScore: 95,
          donorMatched: 3,
          donorNeeded: 6,
          responseRate: '72%',
          verifiedBy: 'Medical Council of India'
        },
        {
          id: 4,
          type: 'plasma',
          bloodGroup: 'A+',
          urgency: 'high',
          patientCondition: 'COVID-19 ARDS Recovery',
          patientAge: 55,
          patientGender: 'Female',
          hospital: 'AIIMS Delhi',
          location: 'Delhi',
          distance: '7.3 km',
          units: 2,
          timeRemaining: '48 hours',
          contactNumber: '+91 98765 43213',
          lastUpdated: '1 hour ago',
          hospitalVerified: true,
          priorityScore: 76,
          donorMatched: 1,
          donorNeeded: 2,
          responseRate: '38%',
          verifiedBy: 'Indian Council of Medical Research'
        },
        {
          id: 5,
          type: 'organ',
          organType: 'Liver',
          bloodGroup: 'O+',
          urgency: 'critical',
          patientCondition: 'Acute Liver Failure',
          patientAge: 45,
          patientGender: 'Male',
          hospital: 'Manipal Hospitals',
          location: 'Chennai',
          distance: '3.5 km',
          age: 45,
          timeRemaining: '12 hours 30 min',
          contactNumber: '+91 98765 43214',
          lastUpdated: '20 min ago',
          hospitalVerified: true,
          priorityScore: 92,
          donorMatched: 0,
          donorNeeded: 1,
          responseRate: '28%',
          verifiedBy: 'National Organ & Tissue Transplant Organisation'
        },
        {
          id: 6,
          type: 'blood',
          bloodGroup: 'B-',
          urgency: 'urgent',
          patientCondition: 'Leukemia Treatment',
          patientAge: 12,
          patientGender: 'Female',
          hospital: 'Tata Memorial Hospital',
          location: 'Mumbai',
          distance: '4.2 km',
          units: 3,
          timeRemaining: '8 hours',
          contactNumber: '+91 98765 43215',
          lastUpdated: '45 min ago',
          hospitalVerified: true,
          priorityScore: 89,
          donorMatched: 2,
          donorNeeded: 3,
          responseRate: '55%',
          verifiedBy: 'Medical Council of India'
        }
      ];
      
      setRequests(mockRequests);
      setLoading(false);
    };

    fetchRequests();
  }, []);

  // Filter requests
  const filteredRequests = requests.filter(request => {
    if (activeFilters.donationType !== 'all' && request.type !== activeFilters.donationType) {
      return false;
    }
    if (activeFilters.bloodGroup !== 'all' && request.bloodGroup !== activeFilters.bloodGroup) {
      return false;
    }
    if (activeFilters.urgency !== 'all' && request.urgency !== activeFilters.urgency) {
      return false;
    }
    if (activeFilters.location !== 'all' && request.location.toLowerCase() !== activeFilters.location) {
      return false;
    }
    if (searchQuery && !request.hospital.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !request.location.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !request.patientCondition.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !request.bloodGroup.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    return true;
  });

  // Handle filter change
  const handleFilterChange = (filterType, value) => {
    setActiveFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  // Clear all filters
  const clearFilters = () => {
    setActiveFilters({
      donationType: 'all',
      bloodGroup: 'all',
      urgency: 'all',
      location: 'all'
    });
    setSearchQuery('');
  };

  // Handle respond to request
  const handleRespond = (request) => {
    setSelectedRequest(request);
    // In real app: navigate to response form or open modal
  };

  // Get urgency badge style
  const getUrgencyBadgeStyle = (urgency) => {
    switch (urgency) {
      case 'critical':
        return {
          bg: 'bg-gradient-to-r from-red-600 via-rose-500 to-red-600',
          text: 'text-white',
          pulse: true,
          icon: AlertCircle,
          label: 'Critical • Immediate'
        };
      case 'urgent':
        return {
          bg: 'bg-gradient-to-r from-amber-600 via-orange-500 to-amber-600',
          text: 'text-white',
          pulse: false,
          icon: Clock,
          label: 'Urgent • Today'
        };
      case 'high':
        return {
          bg: 'bg-gradient-to-r from-orange-500 via-amber-400 to-orange-500',
          text: 'text-white',
          pulse: false,
          icon: TrendingUp,
          label: 'High Priority'
        };
      default:
        return {
          bg: 'bg-gray-200',
          text: 'text-gray-700',
          pulse: false,
          icon: Clock,
          label: 'Standard'
        };
    }
  };

  // Get type badge style
  const getTypeBadgeStyle = (type) => {
    switch (type) {
      case 'blood':
        return {
          bg: 'bg-gradient-to-r from-red-50 to-rose-50',
          text: 'text-red-600',
          border: 'border-red-200',
          icon: Droplets,
          gradient: 'from-red-500 to-rose-500'
        };
      case 'plasma':
        return {
          bg: 'bg-gradient-to-r from-blue-50 to-cyan-50',
          text: 'text-blue-600',
          border: 'border-blue-200',
          icon: Heart,
          gradient: 'from-blue-500 to-cyan-500'
        };
      case 'organ':
        return {
          bg: 'bg-gradient-to-r from-emerald-50 to-teal-50',
          text: 'text-emerald-600',
          border: 'border-emerald-200',
          icon: Heart,
          gradient: 'from-emerald-500 to-teal-500'
        };
      default:
        return {
          bg: 'bg-gradient-to-r from-gray-50 to-slate-50',
          text: 'text-gray-600',
          border: 'border-gray-200',
          icon: AlertCircle,
          gradient: 'from-gray-500 to-slate-500'
        };
    }
  };

  // Calculate progress percentage
  const calculateProgress = (request) => {
    if (request.type === 'organ') {
      return Math.min((request.donorMatched / request.donorNeeded) * 100, 100);
    } else {
      return Math.min((request.donorMatched / request.units) * 100, 100);
    }
  };

  // Quick actions
  const quickActions = [
    { icon: Download, label: 'Export List', color: 'text-blue-600', bg: 'bg-blue-50' },
    { icon: Share2, label: 'Share', color: 'text-purple-600', bg: 'bg-purple-50' },
    { icon: Printer, label: 'Print', color: 'text-amber-600', bg: 'bg-amber-50' },
    { icon: MessageCircle, label: 'Get Updates', color: 'text-emerald-600', bg: 'bg-emerald-50' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-rose-50/20">
      {/* Emergency Alert Bar */}
      <div className={`sticky top-0 z-50 transition-all duration-300 ${pulse ? 'animate-pulse-slow' : ''}`}>
        <div className="bg-gradient-to-r from-red-600 via-rose-600 to-red-600 text-white">
          <div className="max-w-7xl mx-auto px-4 py-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="absolute inset-0 bg-white rounded-full animate-ping opacity-20"></div>
                  <AlertCircle className="h-5 w-5 relative" />
                </div>
                <div className="text-sm font-medium">
                  <span className="hidden sm:inline">🚨</span> Emergency Requests Active • {stats.critical} Critical Cases Need Immediate Attention
                </div>
              </div>
              <button className="text-sm font-semibold hover:text-rose-200 transition-colors">
                View All →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 via-slate-900 to-gray-950 text-white overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, rgba(220, 38, 38, 0.2) 0%, transparent 50%),
                            radial-gradient(circle at 80% 20%, rgba(236, 72, 153, 0.15) 0%, transparent 50%),
                            radial-gradient(circle at 40% 80%, rgba(6, 182, 212, 0.1) 0%, transparent 50%)`
          }}></div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-10 left-10 animate-float">
          <div className="w-20 h-20 bg-rose-500/10 rounded-full blur-xl"></div>
        </div>
        <div className="absolute bottom-10 right-10 animate-float-delayed">
          <div className="w-24 h-24 bg-red-500/10 rounded-full blur-xl"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
                <Sparkles className="h-4 w-4" />
                <span className="text-sm font-medium">REAL-TIME UPDATES</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                <span className="block">Emergency</span>
                <span className="block bg-gradient-to-r from-rose-200 via-red-200 to-rose-200 bg-clip-text text-transparent">
                  Life-Saving Requests
                </span>
              </h1>

              <p className="text-xl text-gray-300 mb-8 leading-relaxed max-w-2xl">
                Critical patients need your immediate help. Every second counts in these urgent blood and organ donation requests.
              </p>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {[
                  { value: `${stats.critical}`, label: 'Critical', color: 'bg-red-500/20', text: 'text-red-200' },
                  { value: `${stats.urgent}`, label: 'Urgent', color: 'bg-amber-500/20', text: 'text-amber-200' },
                  { value: `${stats.high}`, label: 'High Priority', color: 'bg-orange-500/20', text: 'text-orange-200' },
                  { value: `${stats.responded}`, label: 'Responded', color: 'bg-emerald-500/20', text: 'text-emerald-200' }
                ].map((stat, index) => (
                  <div key={index} className={`${stat.color} backdrop-blur-sm rounded-xl p-4`}>
                    <div className={`text-2xl font-bold ${stat.text}`}>{stat.value}</div>
                    <div className="text-sm text-gray-300">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="group relative px-8 py-4 bg-gradient-to-r from-red-600 to-rose-500 text-white rounded-2xl font-semibold text-lg shadow-2xl hover:shadow-red-500/30 transition-all duration-300 hover:scale-105 active:scale-95 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                  <div className="relative flex items-center justify-center space-x-3">
                    <Heart className="h-6 w-6" />
                    <span>Respond to Emergency</span>
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-2 transition-transform" />
                  </div>
                </button>

                <button className="group px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-2xl font-semibold text-lg border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center space-x-3">
                  <Eye className="h-6 w-6" />
                  <span>Learn More</span>
                </button>
              </div>
            </div>

            {/* Right Content - Dashboard */}
            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-6 lg:p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold">Live Response Dashboard</h3>
                <div className="flex items-center space-x-2 text-rose-300">
                  <div className="w-2 h-2 bg-rose-500 rounded-full animate-pulse"></div>
                  <span className="text-sm">LIVE</span>
                </div>
              </div>

              {/* Dashboard Stats */}
              <div className="space-y-6">
                {[
                  { label: 'Blood Requests', value: '42', trend: '+12%', color: 'bg-red-500/20' },
                  { label: 'Organ Matches', value: '18', trend: '+8%', color: 'bg-emerald-500/20' },
                  { label: 'Avg Response Time', value: '2.4h', trend: '-15%', color: 'bg-blue-500/20' },
                  { label: 'Success Rate', value: '92%', trend: '+5%', color: 'bg-amber-500/20' }
                ].map((stat, index) => (
                  <div key={index} className="flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
                    <div>
                      <div className="text-sm text-gray-300">{stat.label}</div>
                      <div className="text-2xl font-bold">{stat.value}</div>
                    </div>
                    <div className={`${stat.color} px-3 py-1 rounded-full text-sm font-medium`}>
                      {stat.trend}
                    </div>
                  </div>
                ))}
              </div>

              {/* Progress Bars */}
              <div className="mt-8 space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Emergency Response Coverage</span>
                    <span>78%</span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-rose-500 to-red-500 rounded-full" style={{ width: '78%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Donor Availability</span>
                    <span>65%</span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full" style={{ width: '65%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sticky Filter Bar */}
      <div className={`sticky top-0 z-40 bg-white/95 backdrop-blur-xl border-b border-gray-200 transition-all duration-300 ${
        isSticky ? 'shadow-2xl' : 'shadow-lg'
      }`}>
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            {/* Search Bar */}
            <div className="flex-1 max-w-2xl">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by hospital, location, blood group, or condition..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-transparent transition-all"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X className="h-5 w-5" />
                  </button>
                )}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2 px-4 py-3 bg-gradient-to-r from-rose-50 to-pink-50 rounded-xl border border-rose-200 hover:border-rose-300 transition-all"
              >
                <Filter className="h-5 w-5 text-rose-600" />
                <span className="font-medium text-gray-900">Filters</span>
                <div className="text-xs text-rose-600 bg-white px-2 py-1 rounded-full">
                  {Object.values(activeFilters).filter(v => v !== 'all').length}
                </div>
                {showFilters ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </button>

              <button
                onClick={clearFilters}
                className="flex items-center space-x-2 px-4 py-3 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-colors"
              >
                <RefreshCw className="h-5 w-5" />
                <span className="font-medium">Clear</span>
              </button>
            </div>
          </div>

          {/* Filters Container */}
          {showFilters && (
            <div className="mt-6 pt-6 border-t border-gray-100 animate-slideDown">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {Object.entries(filterOptions).map(([key, options]) => (
                  <div key={key}>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      {key === 'donationType' ? 'Type' : 
                       key === 'bloodGroup' ? 'Blood Group' : 
                       key === 'urgency' ? 'Urgency' : 'Location'}
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {options.map((option) => {
                        const Icon = option.icon;
                        return (
                          <button
                            key={option.value}
                            onClick={() => handleFilterChange(key, option.value)}
                            className={`flex items-center space-x-2 px-3 py-2 rounded-lg border transition-all duration-200 ${
                              activeFilters[key] === option.value
                                ? 'bg-gradient-to-r from-rose-50 to-pink-50 border-rose-300 text-rose-600 shadow-sm'
                                : 'bg-white border-gray-200 text-gray-700 hover:border-gray-300 hover:shadow-sm'
                            }`}
                          >
                            {Icon && <Icon className="h-4 w-4" />}
                            <span className="text-sm font-medium">{option.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        {/* Quick Actions Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Urgent Requests</h2>
            <p className="text-gray-600 mt-1">
              {filteredRequests.length} active requests • {stats.critical} need immediate attention
            </p>
          </div>
          
          <div className="flex items-center space-x-3">
            {quickActions.map((action, index) => (
              <button
                key={index}
                className={`flex items-center space-x-2 px-4 py-2 ${action.bg} rounded-xl hover:shadow-sm transition-all`}
              >
                <action.icon className={`h-4 w-4 ${action.color}`} />
                <span className={`text-sm font-medium ${action.color}`}>{action.label}</span>
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          // Loading State
          <div className="text-center py-20">
            <div className="relative inline-block">
              <Loader2 className="h-16 w-16 text-rose-500 animate-spin" />
              <div className="absolute inset-0 animate-ping opacity-30">
                <Loader2 className="h-16 w-16 text-rose-500" />
              </div>
            </div>
            <p className="text-gray-600 mt-4">Loading urgent life-saving requests...</p>
            <p className="text-sm text-gray-500 mt-2">Fetching real-time emergency data</p>
          </div>
        ) : filteredRequests.length === 0 ? (
          // No Results State
          <div className="text-center py-20">
            <div className="max-w-md mx-auto">
              <div className="relative mb-6">
                <AlertCircle className="h-20 w-20 text-gray-300 mx-auto" />
                <div className="absolute -top-2 -right-2 animate-bounce">
                  <Sparkles className="h-8 w-8 text-rose-400" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">No matching requests found</h3>
              <p className="text-gray-600 mb-8">
                Try adjusting your filters or check back soon. New requests are added every minute.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={clearFilters}
                  className="px-6 py-3 bg-gradient-to-r from-rose-500 to-rose-400 text-white rounded-xl font-semibold hover:shadow-lg transition-all hover:scale-105"
                >
                  Clear All Filters
                </button>
                <button className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all">
                  Set Up Alerts
                </button>
              </div>
            </div>
          </div>
        ) : (
          // Requests Grid
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredRequests.map((request) => {
              const urgencyStyle = getUrgencyBadgeStyle(request.urgency);
              const typeStyle = getTypeBadgeStyle(request.type);
              const TypeIcon = typeStyle.icon;
              const UrgencyIcon = urgencyStyle.icon;
              const progress = calculateProgress(request);

              return (
                <div
                  key={request.id}
                  className="group bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
                >
                  {/* Card Header */}
                  <div className="relative p-6 border-b border-gray-100">
                    {/* Top Badges */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full ${urgencyStyle.bg}`}>
                          <UrgencyIcon className="h-3 w-3" />
                          <span className={`text-xs font-bold ${urgencyStyle.text}`}>
                            {urgencyStyle.label}
                          </span>
                          {urgencyStyle.pulse && (
                            <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
                          )}
                        </div>
                        <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full ${typeStyle.bg} border ${typeStyle.border}`}>
                          <TypeIcon className={`h-3 w-3 ${typeStyle.text}`} />
                          <span className={`text-xs font-bold ${typeStyle.text}`}>
                            {request.type.toUpperCase()}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Star className="h-4 w-4 text-amber-400" />
                        <span className="text-sm font-bold text-gray-900">{request.priorityScore}</span>
                        <span className="text-xs text-gray-500">PRIORITY</span>
                      </div>
                    </div>

                    {/* Main Content */}
                    <div className="flex items-start gap-4">
                      {/* Type Icon */}
                      <div className="relative">
                        <div className={`absolute inset-0 ${typeStyle.bg} rounded-xl blur-md opacity-50`}></div>
                        <div className={`relative p-4 rounded-xl ${typeStyle.bg} border ${typeStyle.border}`}>
                          <TypeIcon className={`h-8 w-8 ${typeStyle.text}`} />
                        </div>
                      </div>

                      {/* Patient Info */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">
                              {request.patientCondition}
                            </h3>
                            <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                              <div className="flex items-center">
                                <Hospital className="h-4 w-4 mr-2" />
                                <span>{request.hospital}</span>
                                {request.hospitalVerified && (
                                  <Shield className="h-4 w-4 ml-2 text-emerald-500" />
                                )}
                              </div>
                              <div className="flex items-center">
                                <MapPin className="h-4 w-4 mr-2" />
                                <span>{request.location} • {request.distance}</span>
                              </div>
                            </div>
                          </div>
                          
                          {/* Blood Group Badge */}
                          <div className={`text-3xl font-bold px-3 py-2 rounded-lg ${
                            filterOptions.bloodGroup.find(bg => bg.value === request.bloodGroup)?.color
                          }`}>
                            {request.type === 'organ' ? request.organType : request.bloodGroup}
                          </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="mt-4">
                          <div className="flex justify-between text-sm mb-2">
                            <span className="font-medium text-gray-700">
                              Donors Found: {request.donorMatched}/{request.type === 'organ' ? request.donorNeeded : request.units}
                            </span>
                            <span className="font-bold text-rose-600">{progress}%</span>
                          </div>
                          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div 
                              className={`h-full bg-gradient-to-r ${typeStyle.gradient} rounded-full transition-all duration-500`}
                              style={{ width: `${progress}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="bg-gradient-to-r from-gray-50 to-gray-100/50 p-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {/* Details */}
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Patient:</span>
                          <span className="font-medium text-gray-900">
                            {request.patientAge}y • {request.patientGender}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Contact:</span>
                          <span className="font-medium text-gray-900">{request.contactNumber}</span>
                        </div>
                      </div>

                      {/* Timeline */}
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Time Remaining:</span>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-2 text-rose-500" />
                            <span className="font-bold text-rose-600">{request.timeRemaining}</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Updated:</span>
                          <span className="font-medium text-gray-900">{request.lastUpdated}</span>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="space-y-3">
                        <button
                          onClick={() => handleRespond(request)}
                          className="w-full group relative px-4 py-3 bg-gradient-to-r from-red-600 to-rose-500 text-white rounded-xl font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300 active:scale-95 flex items-center justify-center space-x-2 overflow-hidden"
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                          <Heart className="h-5 w-5 relative" />
                          <span className="relative">Respond Now</span>
                        </button>
                        
                        <div className="flex items-center justify-between">
                          <button className="text-sm text-rose-600 hover:text-rose-700 font-medium flex items-center">
                            <Eye className="h-4 w-4 mr-1" />
                            Details
                          </button>
                          <button className="text-sm text-gray-600 hover:text-gray-900 font-medium flex items-center">
                            <Share2 className="h-4 w-4 mr-1" />
                            Share
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Safety & Verification Section */}
        <div className="mt-12 bg-gradient-to-br from-blue-50 via-white to-emerald-50 rounded-3xl p-8 border border-blue-200 shadow-lg">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-100 to-cyan-100 px-4 py-2 rounded-full mb-4">
                <Award className="h-5 w-5 text-blue-600" />
                <span className="text-sm font-semibold text-blue-700">TRUST & SAFETY</span>
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Verified & Secure <br />
                <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  Medical Process
                </span>
              </h3>
              
              <p className="text-gray-600 mb-6">
                Every request undergoes rigorous verification by certified medical authorities. 
                Your safety and privacy are our top priorities throughout the donation process.
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Shield, label: '100% Verified Hospitals', color: 'text-emerald-600' },
                  { icon: UserCheck, label: 'Donor Privacy Protected', color: 'text-blue-600' },
                  { icon: CheckCircle, label: 'Medical Screening', color: 'text-amber-600' },
                  { icon: Globe, label: 'National Coverage', color: 'text-purple-600' }
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <item.icon className={`h-5 w-5 ${item.color}`} />
                    <span className="text-sm font-medium text-gray-700">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <h4 className="font-bold text-gray-900">Verification Process</h4>
                <div className="flex space-x-1">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  ))}
                </div>
              </div>
              
              <div className="space-y-4">
                {[
                  { step: '01', title: 'Hospital Verification', desc: 'Verified by MCI/NMC' },
                  { step: '02', title: 'Medical Review', desc: 'Reviewed by specialists' },
                  { step: '03', title: 'Donor Matching', desc: 'Cross-check compatibility' },
                  { step: '04', title: 'Secure Coordination', desc: 'Encrypted communication' }
                ].map((step, index) => (
                  <div key={index} className="flex items-center space-x-4 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                    <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <span className="font-bold text-blue-600">{step.step}</span>
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">{step.title}</div>
                      <div className="text-sm text-gray-600">{step.desc}</div>
                    </div>
                    <CheckCircle className="h-5 w-5 text-emerald-500 ml-auto" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Emergency CTA Section */}
      <section className="relative py-16 lg:py-24 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-red-600 via-rose-600 to-red-700">
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='200' height='200' viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3CradialGradient id='a' cx='50%25' cy='50%25' r='50%25'%3E%3Cstop offset='0%25' stop-color='%23ffffff' stop-opacity='0.5'/%3E%3Cstop offset='100%25' stop-color='%23ffffff' stop-opacity='0'/%3E%3C/radialGradient%3E%3C/defs%3E%3Ccircle cx='100' cy='100' r='80' fill='url(%23a)'/%3E%3C/svg%3E")`,
            backgroundSize: '200px',
            backgroundPosition: 'center'
          }}></div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
          <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full mb-8">
            <Target className="h-5 w-5" />
            <span className="text-sm font-medium text-white">YOUR ACTION MATTERS</span>
          </div>

          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Be a Hero Today
            <br />
            <span className="text-rose-200">Save a Life Tomorrow</span>
          </h2>

          <p className="text-xl text-white/90 max-w-3xl mx-auto mb-10 leading-relaxed">
            Every 2 seconds, someone needs blood in India. Your single donation can save up to 3 lives. 
            Register now to become part of our life-saving network.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto mb-12">
            {[
              { value: '106,000+', label: 'Patients Waiting', icon: Users },
              { value: 'Every 2 sec', label: 'Need Blood', icon: Clock },
              { value: '1 Donor', label: 'Saves 3 Lives', icon: Heart }
            ].map((stat, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <stat.icon className="h-8 w-8 text-white mx-auto mb-3" />
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-sm text-white/80">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button className="group relative px-10 py-5 bg-white text-rose-600 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 active:scale-95 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-rose-500/0 via-rose-500/10 to-rose-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
              <div className="relative flex items-center justify-center space-x-3">
                <Plus className="h-6 w-6" />
                <span>Register as Donor</span>
              </div>
            </button>

            <button className="group px-10 py-5 bg-transparent text-white rounded-2xl font-bold text-lg border-2 border-white hover:bg-white/10 transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center space-x-3">
              <Phone className="h-6 w-6" />
              <span>24/7 Helpline: 108</span>
            </button>

            <button className="group px-10 py-5 bg-white/10 backdrop-blur-sm text-white rounded-2xl font-bold text-lg border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center space-x-3">
              <Home className="h-6 w-6" />
              <span>Find Center</span>
            </button>
          </div>

          <div className="mt-10 text-white/70 text-sm">
            <p>Join 500,000+ registered donors across India</p>
            <div className="flex items-center justify-center space-x-2 mt-2">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
              <span>Live support available 24/7</span>
            </div>
          </div>
        </div>
      </section>

      {/* Modal for Request Details */}
      {selectedRequest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Respond to Request</h3>
                <button
                  onClick={() => setSelectedRequest(null)}
                  className="p-2 hover:bg-gray-100 rounded-xl"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              {/* Modal content would go here */}
            </div>
          </div>
        </div>
      )}

      {/* Custom Animations */}
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideDown {
          from { 
            opacity: 0;
            transform: translateY(-10px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        
        @keyframes pulse-slow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        
        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: float-delayed 7s ease-in-out infinite;
          animation-delay: 1s;
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 2s ease-in-out infinite;
        }
        
        /* Smooth scroll behavior */
        html {
          scroll-behavior: smooth;
        }
        
        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #ec4899, #ef4444);
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #db2777, #dc2626);
        }
        
        /* Better tap targets on mobile */
        @media (max-width: 640px) {
          button, 
          [role="button"],
          input[type="submit"],
          .clickable {
            min-height: 48px;
            min-width: 48px;
          }
        }
        
        /* Hover effects */
        .hover-lift {
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        
        .hover-lift:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
        }
        
        /* Gradient text animation */
        .gradient-text {
          background: linear-gradient(to right, #ec4899, #ef4444, #f59e0b);
          background-size: 200% auto;
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: gradient 3s ease infinite;
        }
        
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </div>
  );
};

export default UrgentRequestsPage;