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
  RefreshCw
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
  const [pulse, setPulse] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Pulse animation
  useEffect(() => {
    const interval = setInterval(() => {
      setPulse(prev => !prev);
    }, 2000);
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

  // Filter options
  const filterOptions = {
    donationType: [
      { value: 'all', label: 'All Types' },
      { value: 'blood', label: 'Blood', icon: Droplets, color: 'text-rose-500' },
      { value: 'plasma', label: 'Plasma', icon: Heart, color: 'text-blue-500' },
      { value: 'organ', label: 'Organ', icon: Heart, color: 'text-purple-500' }
    ],
    bloodGroup: [
      { value: 'all', label: 'All Groups' },
      { value: 'O-', label: 'O Negative' },
      { value: 'O+', label: 'O Positive' },
      { value: 'A-', label: 'A Negative' },
      { value: 'A+', label: 'A Positive' },
      { value: 'B-', label: 'B Negative' },
      { value: 'B+', label: 'B Positive' },
      { value: 'AB-', label: 'AB Negative' },
      { value: 'AB+', label: 'AB Positive' }
    ],
    urgency: [
      { value: 'all', label: 'All Urgency' },
      { value: 'critical', label: 'Critical', color: 'bg-red-500' },
      { value: 'urgent', label: 'Urgent', color: 'bg-amber-500' },
      { value: 'high', label: 'High', color: 'bg-orange-500' }
    ],
    location: [
      { value: 'all', label: 'Any Location' },
      { value: 'delhi', label: 'Delhi NCR' },
      { value: 'mumbai', label: 'Mumbai' },
      { value: 'bangalore', label: 'Bangalore' },
      { value: 'chennai', label: 'Chennai' },
      { value: 'kolkata', label: 'Kolkata' },
      { value: 'hyderabad', label: 'Hyderabad' }
    ]
  };

  // Mock data - In real app, fetch from API
  useEffect(() => {
    const fetchRequests = async () => {
      setLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockRequests = [
        {
          id: 1,
          type: 'blood',
          bloodGroup: 'O-',
          urgency: 'critical',
          patientCondition: 'Emergency Surgery',
          hospital: 'Apollo Hospital',
          location: 'Delhi',
          distance: '2.5 km',
          units: 4,
          timeRemaining: '3 hours',
          contactNumber: '+91 9876543210',
          lastUpdated: '15 min ago',
          hospitalVerified: true
        },
        {
          id: 2,
          type: 'organ',
          organType: 'Kidney',
          bloodGroup: 'B+',
          urgency: 'urgent',
          patientCondition: 'Kidney Failure',
          hospital: 'Fortis Hospital',
          location: 'Mumbai',
          distance: '5.2 km',
          age: 32,
          timeRemaining: '24 hours',
          contactNumber: '+91 9876543211',
          lastUpdated: '30 min ago',
          hospitalVerified: true
        },
        {
          id: 3,
          type: 'blood',
          bloodGroup: 'AB-',
          urgency: 'critical',
          patientCondition: 'Accident Victim',
          hospital: 'Max Super Speciality',
          location: 'Bangalore',
          distance: '1.8 km',
          units: 6,
          timeRemaining: '2 hours',
          contactNumber: '+91 9876543212',
          lastUpdated: '5 min ago',
          hospitalVerified: true
        },
        {
          id: 4,
          type: 'plasma',
          bloodGroup: 'A+',
          urgency: 'high',
          patientCondition: 'COVID-19 Recovery',
          hospital: 'AIIMS',
          location: 'Delhi',
          distance: '7.3 km',
          units: 2,
          timeRemaining: '48 hours',
          contactNumber: '+91 9876543213',
          lastUpdated: '1 hour ago',
          hospitalVerified: true
        },
        {
          id: 5,
          type: 'organ',
          organType: 'Liver',
          bloodGroup: 'O+',
          urgency: 'critical',
          patientCondition: 'Liver Cirrhosis',
          hospital: 'Manipal Hospital',
          location: 'Chennai',
          distance: '3.5 km',
          age: 45,
          timeRemaining: '12 hours',
          contactNumber: '+91 9876543214',
          lastUpdated: '20 min ago',
          hospitalVerified: true
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
        !request.patientCondition.toLowerCase().includes(searchQuery.toLowerCase())) {
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
  const handleRespond = (requestId) => {
    alert(`You're responding to request #${requestId}. Our team will contact you shortly.`);
    // In real app: navigate to response form or open modal
  };

  // Get urgency badge style
  const getUrgencyBadgeStyle = (urgency) => {
    switch (urgency) {
      case 'critical':
        return {
          bg: 'bg-gradient-to-r from-red-600 to-red-500',
          text: 'text-white',
          pulse: true
        };
      case 'urgent':
        return {
          bg: 'bg-gradient-to-r from-amber-600 to-amber-500',
          text: 'text-white',
          pulse: false
        };
      case 'high':
        return {
          bg: 'bg-gradient-to-r from-orange-600 to-orange-500',
          text: 'text-white',
          pulse: false
        };
      default:
        return {
          bg: 'bg-gray-200',
          text: 'text-gray-700',
          pulse: false
        };
    }
  };

  // Get type badge style
  const getTypeBadgeStyle = (type) => {
    switch (type) {
      case 'blood':
        return {
          bg: 'bg-rose-50',
          text: 'text-rose-600',
          border: 'border-rose-200',
          icon: Droplets
        };
      case 'plasma':
        return {
          bg: 'bg-blue-50',
          text: 'text-blue-600',
          border: 'border-blue-200',
          icon: Heart
        };
      case 'organ':
        return {
          bg: 'bg-purple-50',
          text: 'text-purple-600',
          border: 'border-purple-200',
          icon: Heart
        };
      default:
        return {
          bg: 'bg-gray-50',
          text: 'text-gray-600',
          border: 'border-gray-200',
          icon: AlertCircle
        };
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50/30 via-white to-gray-50">
      
      {/* Emergency Hero Section */}
      <section className="relative bg-gradient-to-r from-red-600 via-rose-600 to-red-600 text-white overflow-hidden">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px'
          }}></div>
        </div>

        {/* Pulsing Alert Icon */}
        <div className="absolute top-4 right-4 sm:top-6 sm:right-6">
          <div className={`relative ${pulse ? 'animate-ping' : ''}`}>
            <AlertCircle className="h-8 w-8 text-white" fill="currentColor" />
          </div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 sm:mb-6">
              <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                <Bell className="h-5 w-5" />
                <span className="text-sm font-medium">LIVE UPDATES</span>
              </div>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
              <span className="block">Urgent Blood & Organ</span>
              <span className="block bg-gradient-to-r from-white to-rose-200 bg-clip-text text-transparent">
                Requests
              </span>
            </h1>

            <div className="max-w-2xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-6 mb-6">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="h-6 w-6 text-rose-200 flex-shrink-0 mt-0.5" />
                  <div className="text-left">
                    <p className="text-lg sm:text-xl font-semibold mb-2">
                      Immediate Help Required
                    </p>
                    <p className="text-white/90 text-sm sm:text-base">
                      These are critical cases where patients need immediate donations. 
                      Your prompt action can save lives.
                    </p>
                  </div>
                </div>
              </div>

              {/* Live Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-white/10 p-3 sm:p-4 rounded-lg">
                  <div className="text-2xl sm:text-3xl font-bold">5</div>
                  <div className="text-sm text-white/80">Active Requests</div>
                </div>
                <div className="bg-white/10 p-3 sm:p-4 rounded-lg">
                  <div className="text-2xl sm:text-3xl font-bold">3</div>
                  <div className="text-sm text-white/80">Critical Cases</div>
                </div>
                <div className="bg-white/10 p-3 sm:p-4 rounded-lg">
                  <div className="text-2xl sm:text-3xl font-bold">2</div>
                  <div className="text-sm text-white/80">Organs Needed</div>
                </div>
                <div className="bg-white/10 p-3 sm:p-4 rounded-lg">
                  <div className="text-2xl sm:text-3xl font-bold">24</div>
                  <div className="text-sm text-white/80">Hours Max</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sticky Filter Bar */}
      <div className={`sticky top-0 z-40 bg-white shadow-lg transition-all duration-300 ${
        isSticky ? 'shadow-xl' : 'shadow-md'
      }`}>
        <div className="max-w-7xl mx-auto px-4 py-4">
          {/* Mobile Filter Toggle */}
          <div className="md:hidden mb-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="w-full flex items-center justify-between p-3 bg-gradient-to-r from-rose-50 to-pink-50 rounded-xl border border-rose-200"
            >
              <div className="flex items-center space-x-3">
                <Filter className="h-5 w-5 text-rose-500" />
                <span className="font-medium text-gray-900">Filter Requests</span>
                <span className="text-sm text-rose-600 bg-white px-2 py-1 rounded-full">
                  {Object.values(activeFilters).filter(v => v !== 'all').length} active
                </span>
              </div>
              {showFilters ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
            </button>
          </div>

          {/* Search Bar */}
          <div className="relative mb-4 md:mb-6">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by hospital, location, or condition..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-transparent"
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

          {/* Filters Container */}
          <div className={`${showFilters ? 'block' : 'hidden'} md:block`}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Donation Type Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Donation Type
                </label>
                <div className="flex flex-wrap gap-2">
                  {filterOptions.donationType.map((option) => {
                    const Icon = option.icon;
                    return (
                      <button
                        key={option.value}
                        onClick={() => handleFilterChange('donationType', option.value)}
                        className={`flex items-center space-x-2 px-3 py-2 rounded-lg border transition-all duration-200 ${
                          activeFilters.donationType === option.value
                            ? 'bg-rose-50 border-rose-300 text-rose-600'
                            : 'bg-white border-gray-200 text-gray-700 hover:border-gray-300'
                        }`}
                      >
                        {Icon && <Icon className={`h-4 w-4 ${option.color}`} />}
                        <span className="text-sm">{option.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Blood Group Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Blood Group
                </label>
                <div className="flex flex-wrap gap-2">
                  {filterOptions.bloodGroup.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => handleFilterChange('bloodGroup', option.value)}
                      className={`px-3 py-2 rounded-lg border text-sm transition-all duration-200 ${
                        activeFilters.bloodGroup === option.value
                          ? 'bg-red-50 border-red-300 text-red-600 font-semibold'
                          : 'bg-white border-gray-200 text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Urgency Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Urgency Level
                </label>
                <div className="flex flex-wrap gap-2">
                  {filterOptions.urgency.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => handleFilterChange('urgency', option.value)}
                      className={`px-3 py-2 rounded-lg border text-sm transition-all duration-200 ${
                        activeFilters.urgency === option.value
                          ? `${option.color} border-transparent text-white`
                          : 'bg-white border-gray-200 text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Location Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location
                </label>
                <div className="flex flex-wrap gap-2">
                  {filterOptions.location.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => handleFilterChange('location', option.value)}
                      className={`px-3 py-2 rounded-lg border text-sm transition-all duration-200 ${
                        activeFilters.location === option.value
                          ? 'bg-blue-50 border-blue-300 text-blue-600'
                          : 'bg-white border-gray-200 text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Filter Actions */}
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
              <div className="text-sm text-gray-600">
                Showing {filteredRequests.length} of {requests.length} requests
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={clearFilters}
                  className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-900"
                >
                  <RefreshCw className="h-4 w-4" />
                  <span className="text-sm">Clear All</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          // Loading State
          <div className="text-center py-12">
            <Loader2 className="h-12 w-12 text-rose-500 animate-spin mx-auto mb-4" />
            <p className="text-gray-600">Loading urgent requests...</p>
          </div>
        ) : filteredRequests.length === 0 ? (
          // No Results State
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <AlertCircle className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No matching requests found</h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your filters or check back later for new requests.
              </p>
              <button
                onClick={clearFilters}
                className="px-6 py-3 bg-gradient-to-r from-rose-500 to-rose-400 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
              >
                Clear All Filters
              </button>
            </div>
          </div>
        ) : (
          // Requests List
          <div className="space-y-6">
            {filteredRequests.map((request) => {
              const urgencyStyle = getUrgencyBadgeStyle(request.urgency);
              const typeStyle = getTypeBadgeStyle(request.type);
              const TypeIcon = typeStyle.icon;

              return (
                <div
                  key={request.id}
                  className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300"
                >
                  {/* Card Header */}
                  <div className="p-6 border-b border-gray-100">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-start space-x-4">
                        {/* Type & Blood Group Badge */}
                        <div className="flex flex-col items-center">
                          <div className={`p-4 rounded-xl ${typeStyle.bg} ${typeStyle.border}`}>
                            <TypeIcon className={`h-8 w-8 ${typeStyle.text}`} />
                          </div>
                          <div className="mt-2 text-center">
                            <div className="text-2xl font-bold text-gray-900">
                              {request.type === 'organ' ? request.organType : request.bloodGroup}
                            </div>
                            <div className="text-xs text-gray-500 capitalize">
                              {request.type === 'organ' ? 'Organ' : 'Blood Group'}
                            </div>
                          </div>
                        </div>

                        {/* Patient Info */}
                        <div>
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-xl font-bold text-gray-900">
                              {request.patientCondition}
                            </h3>
                            {request.hospitalVerified && (
                              <Shield className="h-5 w-5 text-emerald-500" />
                            )}
                          </div>
                          
                          <div className="flex flex-wrap gap-3 mb-3">
                            <div className="flex items-center text-gray-600">
                              <Hospital className="h-4 w-4 mr-2" />
                              <span className="text-sm">{request.hospital}</span>
                            </div>
                            <div className="flex items-center text-gray-600">
                              <MapPin className="h-4 w-4 mr-2" />
                              <span className="text-sm">{request.location} • {request.distance}</span>
                            </div>
                          </div>

                          {/* Urgency Badge */}
                          <div className={`inline-flex items-center px-3 py-1 rounded-full ${urgencyStyle.bg}`}>
                            <Clock className="h-3 w-3 mr-2 text-white" />
                            <span className={`text-xs font-semibold ${urgencyStyle.text}`}>
                              {request.timeRemaining} remaining
                            </span>
                            {urgencyStyle.pulse && (
                              <div className="ml-2 w-2 h-2 bg-white rounded-full animate-ping"></div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* CTA Button */}
                      <button
                        onClick={() => handleRespond(request.id)}
                        className="group relative px-6 py-3 bg-gradient-to-r from-red-600 to-rose-500 text-white rounded-xl font-semibold text-lg hover:shadow-xl hover:scale-105 transition-all duration-300 active:scale-95 flex items-center justify-center space-x-2 min-w-[140px]"
                      >
                        <Heart className="h-5 w-5" />
                        <span>Help Now</span>
                        <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>

                  {/* Card Details */}
                  <div className="p-6 bg-gray-50/50">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {/* Requirements */}
                      <div className="space-y-3">
                        <h4 className="text-sm font-semibold text-gray-700 uppercase tracking-wider">
                          Requirements
                        </h4>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Type:</span>
                            <span className="font-medium">{request.type === 'organ' ? 'Organ Transplant' : 'Blood Donation'}</span>
                          </div>
                          {request.type === 'blood' || request.type === 'plasma' ? (
                            <div className="flex justify-between">
                              <span className="text-gray-600">Units Needed:</span>
                              <span className="font-medium text-rose-600">{request.units} units</span>
                            </div>
                          ) : (
                            <div className="flex justify-between">
                              <span className="text-gray-600">Patient Age:</span>
                              <span className="font-medium">{request.age} years</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Contact & Timeline */}
                      <div className="space-y-3">
                        <h4 className="text-sm font-semibold text-gray-700 uppercase tracking-wider">
                          Contact & Timeline
                        </h4>
                        <div className="space-y-2">
                          <div className="flex items-center text-gray-600">
                            <Phone className="h-4 w-4 mr-2 flex-shrink-0" />
                            <span className="text-sm truncate">{request.contactNumber}</span>
                          </div>
                          <div className="flex items-center text-gray-600">
                            <Calendar className="h-4 w-4 mr-2 flex-shrink-0" />
                            <span className="text-sm">Updated {request.lastUpdated}</span>
                          </div>
                        </div>
                      </div>

                      {/* Status & Actions */}
                      <div className="space-y-3">
                        <h4 className="text-sm font-semibold text-gray-700 uppercase tracking-wider">
                          Status
                        </h4>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200">
                            <div>
                              <div className="font-medium text-gray-900">Emergency Response</div>
                              <div className="text-sm text-gray-500">24/7 helpline active</div>
                            </div>
                            <CheckCircle className="h-5 w-5 text-emerald-500" />
                          </div>
                          <button className="w-full text-center text-rose-600 hover:text-rose-700 text-sm font-medium">
                            View full details & instructions →
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

        {/* Safety & Privacy Note */}
        <div className="mt-12 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-200">
          <div className="flex items-start space-x-4">
            <Shield className="h-6 w-6 text-blue-500 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Safety & Privacy Notice</h4>
              <p className="text-gray-600 text-sm">
                Patient privacy is our top priority. We only display necessary information to connect 
                donors with patients. All medical procedures are conducted by certified hospitals. 
                Your identity is protected throughout the donation process.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-emerald-500" />
                  <span className="text-sm text-gray-700">100% Confidential</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-emerald-500" />
                  <span className="text-sm text-gray-700">Verified Hospitals</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-emerald-500" />
                  <span className="text-sm text-gray-700">Secure Communication</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Emergency CTA Section */}
      <section className="relative py-12 lg:py-16 bg-gradient-to-r from-red-600 via-rose-600 to-red-600 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='0.4' fill-rule='evenodd'/%3E%3C/svg%3E")`,
            backgroundSize: '100px'
          }}></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-8">
            <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full">
              <AlertCircle className="h-5 w-5" />
              <span className="text-sm font-medium text-white">IMMEDIATE ACTION REQUIRED</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
              Your Immediate Action <br className="hidden sm:block" />
              <span className="text-rose-200">Can Save a Life</span>
            </h2>

            <p className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
              Every minute counts in an emergency. By registering as a donor, 
              you become part of a life-saving network ready to respond when needed most.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center pt-4">
              <button className="group relative px-8 py-4 bg-white text-rose-600 rounded-2xl font-semibold text-lg shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center space-x-3">
                <Users className="h-6 w-6" />
                <span>Register as Donor</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-2 transition-transform" />
              </button>

              <button className="group px-8 py-4 bg-transparent text-white rounded-2xl font-semibold text-lg border-2 border-white/50 hover:border-white hover:bg-white/10 transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center space-x-3">
                <Phone className="h-6 w-6" />
                <span>Emergency Helpline</span>
              </button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8">
              {[
                { value: '106,000+', label: 'People Waiting' },
                { value: '22', label: 'Die Daily Waiting' },
                { value: 'Every 2 sec', label: 'Need Blood' },
                { value: '1 Donor', label: 'Saves 3 Lives' }
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl font-bold text-white">{item.value}</div>
                  <div className="text-sm text-white/80">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Custom Animations */}
      <style jsx global>{`
        @keyframes ping {
          75%, 100% {
            transform: scale(2);
            opacity: 0;
          }
        }
        
        .animate-ping {
          animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
        
        /* Better tap targets on mobile */
        @media (max-width: 640px) {
          button, 
          [role="button"],
          input[type="submit"] {
            min-height: 44px;
          }
        }
      `}</style>
    </div>
  );
};

export default UrgentRequestsPage;