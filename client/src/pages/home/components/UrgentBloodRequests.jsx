import React, { useState, useEffect } from 'react';
import { 
  AlertTriangle, 
  MapPin, 
  Clock, 
  Droplets,
  Phone,
  Navigation,
  Heart,
  Shield,
  Zap,
  User,
  Building,
  ChevronRight,
  Bell,
  RefreshCw
} from 'lucide-react';

const UrgentBloodRequests = () => {
  const [requests, setRequests] = useState([]);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [activeFilter, setActiveFilter] = useState('all');
  const [refreshing, setRefreshing] = useState(false);

  // Sample urgent requests data (in real app, this would come from API)
  const sampleRequests = [
    {
      id: 1,
      bloodGroup: 'O-',
      hospital: 'City General Hospital',
      location: 'Mumbai Central, 2km',
      urgency: 'critical', // critical, high, medium
      patient: 'Emergency Surgery',
      unitsNeeded: 3,
      timeRemaining: '45 minutes ago',
      contact: '+91 98765 43210',
      verified: true,
      distance: 2.1,
      donorsNeeded: 2
    },
    {
      id: 2,
      bloodGroup: 'B+',
      hospital: 'Ruby Hall Clinic',
      location: 'Pune, 5km',
      urgency: 'high',
      patient: 'Accident Victim',
      unitsNeeded: 2,
      timeRemaining: '1 hour ago',
      contact: '+91 87654 32109',
      verified: true,
      distance: 4.8,
      donorsNeeded: 1
    },
    {
      id: 3,
      bloodGroup: 'AB-',
      hospital: 'Apollo Hospitals',
      location: 'Delhi, 8km',
      urgency: 'critical',
      patient: 'Cancer Treatment',
      unitsNeeded: 4,
      timeRemaining: '30 minutes ago',
      contact: '+91 76543 21098',
      verified: true,
      distance: 7.5,
      donorsNeeded: 3
    },
    {
      id: 4,
      bloodGroup: 'A+',
      hospital: 'Fortis Hospital',
      location: 'Bangalore, 3km',
      urgency: 'medium',
      patient: 'Childbirth Complication',
      unitsNeeded: 2,
      timeRemaining: '2 hours ago',
      contact: '+91 65432 10987',
      verified: true,
      distance: 2.9,
      donorsNeeded: 1
    },
    {
      id: 5,
      bloodGroup: 'O+',
      hospital: 'Kokilaben Hospital',
      location: 'Mumbai West, 4km',
      urgency: 'critical',
      patient: 'Road Accident',
      unitsNeeded: 5,
      timeRemaining: '15 minutes ago',
      contact: '+91 54321 09876',
      verified: true,
      distance: 3.7,
      donorsNeeded: 4
    },
    {
      id: 6,
      bloodGroup: 'B-',
      hospital: 'Medanta Hospital',
      location: 'Gurgaon, 6km',
      urgency: 'high',
      patient: 'Dialysis Patient',
      unitsNeeded: 2,
      timeRemaining: '1 hour ago',
      contact: '+91 43210 98765',
      verified: true,
      distance: 5.5,
      donorsNeeded: 1
    }
  ];

  // Filter options
  const filters = [
    { id: 'all', label: 'All Requests', count: 6 },
    { id: 'critical', label: 'Critical', count: 3 },
    { id: 'high', label: 'High Priority', count: 2 },
    { id: 'nearby', label: 'Near Me', count: 4 }
  ];

  // Blood group colors
  const bloodGroupColors = {
    'O-': 'bg-rose-100 text-rose-800 border-rose-200',
    'O+': 'bg-red-100 text-red-800 border-red-200',
    'A+': 'bg-blue-100 text-blue-800 border-blue-200',
    'A-': 'bg-indigo-100 text-indigo-800 border-indigo-200',
    'B+': 'bg-emerald-100 text-emerald-800 border-emerald-200',
    'B-': 'bg-green-100 text-green-800 border-green-200',
    'AB+': 'bg-purple-100 text-purple-800 border-purple-200',
    'AB-': 'bg-violet-100 text-violet-800 border-violet-200'
  };

  // Urgency styles
  const urgencyStyles = {
    critical: {
      bg: 'bg-gradient-to-r from-rose-500 to-red-500',
      text: 'text-white',
      badge: 'bg-red-100 text-red-800',
      pulse: 'bg-red-500'
    },
    high: {
      bg: 'bg-gradient-to-r from-amber-500 to-orange-500',
      text: 'text-white',
      badge: 'bg-amber-100 text-amber-800',
      pulse: 'bg-amber-500'
    },
    medium: {
      bg: 'bg-gradient-to-r from-blue-500 to-cyan-500',
      text: 'text-white',
      badge: 'bg-blue-100 text-blue-800',
      pulse: 'bg-blue-500'
    }
  };

  // Initialize requests
  useEffect(() => {
    setRequests(sampleRequests);
    
    // Simulate real-time updates
    const interval = setInterval(() => {
      setLastUpdated(new Date());
      
      // Randomly update request urgency time
      setRequests(prev => prev.map(req => ({
        ...req,
        timeRemaining: updateTime(req.timeRemaining)
      })));
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  // Helper function to update time display
  const updateTime = (timeString) => {
    const [time, unit] = timeString.split(' ');
    const num = parseInt(time);
    if (unit === 'minutes') {
      return `${num + 1} minutes ago`;
    } else if (unit === 'hour' && num === 1) {
      return '1 hour 1 minute ago';
    }
    return timeString;
  };

  // Handle refresh
  const handleRefresh = () => {
    setRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setLastUpdated(new Date());
      setRefreshing(false);
    }, 1000);
  };

  // Filter requests
  const filteredRequests = requests.filter(req => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'critical') return req.urgency === 'critical';
    if (activeFilter === 'high') return req.urgency === 'high';
    if (activeFilter === 'nearby') return req.distance <= 5;
    return true;
  });

  // Format time since last update
  const formatLastUpdated = () => {
    const diff = Math.floor((new Date() - lastUpdated) / 1000);
    if (diff < 60) return 'Just now';
    if (diff < 3600) return `${Math.floor(diff / 60)} minutes ago`;
    return `${Math.floor(diff / 3600)} hours ago`;
  };

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-b from-white to-rose-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-10">
          <div>
            <div className="inline-flex items-center space-x-2 bg-rose-50 px-4 py-2 rounded-full mb-4">
              <AlertTriangle className="h-4 w-4 text-rose-500" fill="#f43f5e" />
              <span className="text-sm font-medium text-rose-700">Live Updates</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
              Urgent
              <span className="bg-gradient-to-r from-rose-600 to-red-500 bg-clip-text text-transparent mx-2">
                Blood Requests
              </span>
            </h2>
            
            <p className="text-gray-600">
              Real-time emergency blood needs in your area. Every minute counts.
            </p>
          </div>

          {/* Update Info & Refresh */}
          <div className="mt-4 lg:mt-0 flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-2"></div>
                <span>Live</span>
              </div>
              <span>•</span>
              <span>Updated {formatLastUpdated()}</span>
            </div>
            
            <button
              onClick={handleRefresh}
              disabled={refreshing}
              className="p-2 bg-white border border-gray-200 rounded-full hover:bg-rose-50 hover:border-rose-200 transition-colors disabled:opacity-50"
              aria-label="Refresh requests"
            >
              <RefreshCw className={`h-4 w-4 text-gray-600 ${refreshing ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>

        {/* Urgency Alert Banner */}
        <div className="mb-8 bg-gradient-to-r from-rose-500 to-red-500 rounded-2xl p-4 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Bell className="h-5 w-5 animate-pulse" />
              <div>
                <div className="font-bold">EMERGENCY ALERT</div>
                <div className="text-sm opacity-90">
                  {filteredRequests.filter(r => r.urgency === 'critical').length} critical requests need immediate attention
                </div>
              </div>
            </div>
            <div className="hidden sm:block">
              <div className="flex items-center space-x-1">
                {['O-', 'B+', 'AB-'].map((bg) => (
                  <div key={bg} className="bg-white/20 px-3 py-1 rounded-full text-sm font-medium">
                    {bg}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-8 overflow-x-auto">
          <div className="flex space-x-2 pb-2 min-w-max">
            {filters.map(filter => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                  activeFilter === filter.id
                    ? 'bg-gradient-to-r from-rose-500 to-rose-400 text-white shadow-lg shadow-rose-200'
                    : 'bg-white text-gray-700 border border-gray-200 hover:border-rose-200'
                }`}
              >
                {filter.label}
                <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                  activeFilter === filter.id
                    ? 'bg-white/30 text-white'
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  {filter.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Request Cards Grid */}
        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-12">
          {filteredRequests.map((request) => (
            <div
              key={request.id}
              className={`group bg-white rounded-2xl border shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 ${
                request.urgency === 'critical'
                  ? 'border-rose-200 ring-1 ring-rose-100'
                  : 'border-gray-100'
              }`}
            >
              {/* Card Header with Urgency */}
              <div className={`${urgencyStyles[request.urgency].bg} rounded-t-2xl p-4 relative overflow-hidden`}>
                {/* Pulsing Urgency Indicator */}
                <div className="absolute top-4 right-4">
                  <div className={`w-3 h-3 rounded-full ${urgencyStyles[request.urgency].pulse} animate-ping`}></div>
                  <div className={`w-3 h-3 rounded-full ${urgencyStyles[request.urgency].pulse} absolute top-0`}></div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {/* Blood Group Badge */}
                    <div className={`px-4 py-2 rounded-xl border-2 font-bold text-lg ${bloodGroupColors[request.bloodGroup]}`}>
                      {request.bloodGroup}
                      <div className="text-xs font-normal">Blood Type</div>
                    </div>

                    <div>
                      <div className={`text-sm font-medium ${urgencyStyles[request.urgency].text}`}>
                        <span className="flex items-center">
                          <AlertTriangle className="h-4 w-4 mr-1" />
                          {request.urgency.toUpperCase()} PRIORITY
                        </span>
                      </div>
                      <div className="text-white/90 text-sm mt-1">
                        {request.unitsNeeded} units needed • {request.donorsNeeded} donors
                      </div>
                    </div>
                  </div>

                  {request.verified && (
                    <Shield className="h-5 w-5 text-white/80" />
                  )}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5">
                {/* Hospital & Location */}
                <div className="mb-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Building className="h-5 w-5 text-gray-400" />
                    <h3 className="font-bold text-gray-900">{request.hospital}</h3>
                  </div>
                  
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <MapPin className="h-4 w-4" />
                    <span>{request.location}</span>
                    <span className="text-gray-400">•</span>
                    <span>{request.distance} km away</span>
                  </div>
                </div>

                {/* Patient Info */}
                <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <User className="h-4 w-4 text-gray-500" />
                    <span className="text-sm font-medium text-gray-700">Patient: {request.patient}</span>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{request.timeRemaining}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Droplets className="h-4 w-4" />
                      <span>{request.unitsNeeded} units</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3">
                  {/* Help Now Button */}
                  <button className="flex-1 group/help bg-gradient-to-r from-rose-500 to-rose-400 text-white font-semibold py-3 rounded-lg shadow-lg shadow-rose-200 hover:shadow-xl hover:shadow-rose-300 transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2">
                    <Heart className="h-5 w-5 group-hover/help:animate-pulse" />
                    <span>Help Now</span>
                    <ChevronRight className="h-5 w-5 group-hover/help:translate-x-1 transition-transform" />
                  </button>

                  {/* Secondary Actions */}
                  <div className="flex space-x-2">
                    <button 
                      className="p-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-rose-50 hover:text-rose-600 transition-colors"
                      aria-label="Call hospital"
                      title="Call hospital"
                    >
                      <Phone className="h-5 w-5" />
                    </button>
                    <button 
                      className="p-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-rose-50 hover:text-rose-600 transition-colors"
                      aria-label="Get directions"
                      title="Get directions"
                    >
                      <Navigation className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                {/* Contact Info (Collapsible) */}
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Contact:</span>
                    <span className="font-medium text-gray-900">{request.contact}</span>
                  </div>
                </div>
              </div>

              {/* Emergency Glow Effect */}
              {request.urgency === 'critical' && (
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-rose-500/10 to-transparent pointer-events-none animate-pulse"></div>
              )}
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredRequests.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-rose-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="h-12 w-12 text-rose-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No Urgent Requests</h3>
            <p className="text-gray-600 max-w-md mx-auto mb-6">
              Great news! All immediate blood needs in your area have been met. You can still register as a donor for future emergencies.
            </p>
            <button className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-emerald-400 text-white font-semibold rounded-full shadow-lg">
              Register as Standby Donor
            </button>
          </div>
        )}

        {/* Mobile Scroll Indicator */}
        <div className="lg:hidden text-center mt-8">
          <div className="inline-flex items-center space-x-2 text-sm text-gray-500">
            <span>← Scroll for more requests →</span>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 bg-gradient-to-r from-white to-rose-50 rounded-2xl p-8 border border-rose-100">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <div className="mb-6 lg:mb-0">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Become an Emergency Responder</h3>
              <p className="text-gray-600">
                Get instant alerts for critical blood requests in your area. Save lives faster.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <button className="px-6 py-3 bg-gradient-to-r from-rose-500 to-rose-400 text-white font-semibold rounded-full shadow-lg shadow-rose-200 hover:shadow-xl hover:shadow-rose-300 transition-all hover:scale-105 flex items-center space-x-2">
                <Bell className="h-5 w-5" />
                <span>Enable Emergency Alerts</span>
              </button>
              
              <button className="px-6 py-3 bg-white text-gray-800 font-medium rounded-full border-2 border-rose-200 hover:border-rose-300 transition-colors flex items-center space-x-2">
                <Zap className="h-5 w-5 text-rose-500" />
                <span>Quick Donor Registration</span>
              </button>
            </div>
          </div>
        </div>

        {/* Real-time Stats */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-xl border border-gray-100 text-center">
            <div className="text-2xl font-bold text-rose-600">
              {requests.filter(r => r.urgency === 'critical').length}
            </div>
            <div className="text-sm text-gray-600">Critical Now</div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-gray-100 text-center">
            <div className="text-2xl font-bold text-amber-600">
              {requests.reduce((sum, r) => sum + r.unitsNeeded, 0)}
            </div>
            <div className="text-sm text-gray-600">Units Needed</div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-gray-100 text-center">
            <div className="text-2xl font-bold text-blue-600">
              {requests.filter(r => r.distance <= 5).length}
            </div>
            <div className="text-sm text-gray-600">Within 5km</div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-gray-100 text-center">
            <div className="text-2xl font-bold text-emerald-600">24/7</div>
            <div className="text-sm text-gray-600">Emergency Support</div>
          </div>
        </div>
      </div>

      {/* Custom Animations */}
      <style jsx global>{`
        @keyframes urgent-pulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.8; }
        }
        .animate-urgent-pulse {
          animation: urgent-pulse 1.5s ease-in-out infinite;
        }
        
        /* Mobile scrollable cards */
        @media (max-width: 768px) {
          .scrollable-container {
            overflow-x: auto;
            scroll-snap-type: x mandatory;
            -webkit-overflow-scrolling: touch;
          }
          .scrollable-container::-webkit-scrollbar {
            display: none;
          }
          .scrollable-card {
            scroll-snap-align: start;
            flex: 0 0 85%;
          }
        }
      `}</style>
    </section>
  );
};

export default UrgentBloodRequests;