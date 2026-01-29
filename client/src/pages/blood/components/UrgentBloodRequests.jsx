import React, { useState, useEffect } from 'react';
import { 
  AlertCircle, 
  Clock, 
  MapPin, 
  Phone, 
  Heart, 
  ChevronRight,
  Users,
  Filter,
  RefreshCw,
  ArrowRight,
  Droplets,
  Shield,
  Calendar,
  Navigation
} from 'lucide-react';

const UrgentBloodRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBloodType, setSelectedBloodType] = useState('All');
  const [autoRefresh, setAutoRefresh] = useState(true);

  // Blood type options
  const bloodTypes = ['All', 'O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'];

  // Mock data - in real app, this would come from API
  const mockRequests = [
    {
      id: 1,
      bloodGroup: 'O-',
      units: 2,
      hospital: 'Apollo Hospital',
      patientName: 'Rahul Sharma',
      age: 32,
      condition: 'Accident - Internal Bleeding',
      location: 'Mumbai Central',
      distance: '2.5 km',
      urgency: 'Critical',
      timePosted: '5 min ago',
      contact: '+91 98765 43210',
      requestedBy: 'Hospital Admin',
      expiry: '3 hours',
      donorsNeeded: 2,
      donorsResponded: 1
    },
    {
      id: 2,
      bloodGroup: 'A+',
      units: 3,
      hospital: 'Fortis Hospital',
      patientName: 'Priya Patel',
      age: 28,
      condition: 'Childbirth Complications',
      location: 'Andheri West',
      distance: '5.1 km',
      urgency: 'High',
      timePosted: '15 min ago',
      contact: '+91 87654 32109',
      requestedBy: 'Family Member',
      expiry: '6 hours',
      donorsNeeded: 3,
      donorsResponded: 2
    },
    {
      id: 3,
      bloodGroup: 'B-',
      units: 1,
      hospital: 'Kokilaben Hospital',
      patientName: 'Vikram Singh',
      age: 45,
      condition: 'Surgery - Liver Transplant',
      location: 'Malad West',
      distance: '8.3 km',
      urgency: 'Critical',
      timePosted: '25 min ago',
      contact: '+91 76543 21098',
      requestedBy: 'Hospital',
      expiry: '2 hours',
      donorsNeeded: 1,
      donorsResponded: 0
    },
    {
      id: 4,
      bloodGroup: 'AB+',
      units: 4,
      hospital: 'Lilavati Hospital',
      patientName: 'Anjali Mehta',
      age: 56,
      condition: 'Cancer Treatment',
      location: 'Bandra West',
      distance: '3.7 km',
      urgency: 'Medium',
      timePosted: '45 min ago',
      contact: '+91 65432 10987',
      requestedBy: 'Doctor',
      expiry: '12 hours',
      donorsNeeded: 4,
      donorsResponded: 3
    },
    {
      id: 5,
      bloodGroup: 'O+',
      units: 2,
      hospital: 'Nanavati Hospital',
      patientName: 'Suresh Kumar',
      age: 62,
      condition: 'Heart Surgery',
      location: 'Vile Parle',
      distance: '6.2 km',
      urgency: 'High',
      timePosted: '1 hour ago',
      contact: '+91 54321 09876',
      requestedBy: 'Hospital',
      expiry: '8 hours',
      donorsNeeded: 2,
      donorsResponded: 1
    },
    {
      id: 6,
      bloodGroup: 'A-',
      units: 1,
      hospital: 'Bombay Hospital',
      patientName: 'Neha Gupta',
      age: 24,
      condition: 'Accident - Multiple Fractures',
      location: 'Marine Lines',
      distance: '4.8 km',
      urgency: 'Critical',
      timePosted: '1.5 hours ago',
      contact: '+91 43210 98765',
      requestedBy: 'Emergency Services',
      expiry: '1 hour',
      donorsNeeded: 1,
      donorsResponded: 0
    }
  ];

  // Initialize requests
  useEffect(() => {
    fetchRequests();
    
    // Auto-refresh every 30 seconds
    const refreshInterval = setInterval(() => {
      if (autoRefresh) {
        fetchRequests();
      }
    }, 30000);

    return () => clearInterval(refreshInterval);
  }, [autoRefresh]);

  const fetchRequests = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setRequests(mockRequests);
      setLoading(false);
    }, 800);
  };

  const handleDonateClick = (requestId) => {
    // In real app, this would navigate to donation page or open modal
    alert(`Redirecting to donate for request #${requestId}`);
  };

  const handleCallClick = (phoneNumber) => {
    // In real app, this would initiate phone call
    alert(`Calling ${phoneNumber}`);
  };

  const getUrgencyColor = (urgency) => {
    switch (urgency.toLowerCase()) {
      case 'critical':
        return 'bg-red-500 text-white';
      case 'high':
        return 'bg-orange-500 text-white';
      case 'medium':
        return 'bg-yellow-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const getUrgencyPulse = (urgency) => {
    return urgency.toLowerCase() === 'critical' ? 'animate-pulse' : '';
  };

  const filteredRequests = selectedBloodType === 'All' 
    ? requests 
    : requests.filter(req => req.bloodGroup === selectedBloodType);

  return (
    <section className="py-8 px-4 md:px-6 lg:px-8 bg-gradient-to-b from-rose-50/30 to-white">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <div className="relative">
                  <div className="absolute inset-0 bg-red-500 rounded-full blur opacity-70 animate-pulse"></div>
                  <div className="relative bg-gradient-to-r from-red-500 to-rose-500 p-3 rounded-full">
                    <AlertCircle className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                    Urgent Blood Requests
                  </h2>
                  <p className="text-gray-600">Live updates from hospitals and patients</p>
                </div>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setAutoRefresh(!autoRefresh)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
                  autoRefresh 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-gray-100 text-gray-700'
                }`}
              >
                <RefreshCw className={`h-4 w-4 ${autoRefresh ? 'animate-spin' : ''}`} />
                <span className="text-sm font-medium">
                  {autoRefresh ? 'Live' : 'Manual'}
                </span>
              </button>

              <button
                onClick={fetchRequests}
                disabled={loading}
                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-rose-500 to-rose-400 
                         text-white rounded-lg font-medium hover:shadow-lg transition-shadow disabled:opacity-50"
              >
                <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                <span>Refresh</span>
              </button>
            </div>
          </div>

          {/* Blood Type Filter */}
          <div className="mt-6">
            <div className="flex items-center space-x-2 mb-3">
              <Filter className="h-5 w-5 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">Filter by Blood Type:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {bloodTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedBloodType(type)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedBloodType === type
                      ? 'bg-gradient-to-r from-rose-500 to-rose-400 text-white shadow-lg'
                      : 'bg-white text-gray-700 hover:bg-rose-50 border border-gray-200'
                  }`}
                >
                  {type === 'All' ? 'All Types' : type}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-2xl p-5 border border-red-100 shadow-sm">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-red-100 rounded-lg">
                <AlertCircle className="h-6 w-6 text-red-500" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{filteredRequests.length}</div>
                <div className="text-sm text-gray-600">Active Requests</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-rose-100 shadow-sm">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-rose-100 rounded-lg">
                <Users className="h-6 w-6 text-rose-500" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {filteredRequests.reduce((acc, req) => acc + req.donorsNeeded, 0)}
                </div>
                <div className="text-sm text-gray-600">Donors Needed</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-amber-100 shadow-sm">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-amber-100 rounded-lg">
                <Clock className="h-6 w-6 text-amber-500" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">24/7</div>
                <div className="text-sm text-gray-600">Emergency Service</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-emerald-100 shadow-sm">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-emerald-100 rounded-lg">
                <Shield className="h-6 w-6 text-emerald-500" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {filteredRequests.reduce((acc, req) => acc + req.donorsResponded, 0)}
                </div>
                <div className="text-sm text-gray-600">Donors Responded</div>
              </div>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-500"></div>
          </div>
        ) : (
          <>
            {/* Requests Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
              {filteredRequests.map((request) => (
                <div
                  key={request.id}
                  className="bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl 
                           transition-all duration-300 overflow-hidden group"
                >
                  {/* Header with urgency */}
                  <div className="relative">
                    <div className="absolute top-4 right-4 z-10">
                      <div className={`px-3 py-1 rounded-full text-xs font-bold ${getUrgencyColor(request.urgency)} 
                                    ${getUrgencyPulse(request.urgency)}`}>
                        {request.urgency}
                      </div>
                    </div>
                    
                    {/* Pulsing indicator */}
                    <div className="absolute top-4 left-4">
                      <div className={`w-3 h-3 rounded-full bg-red-500 ${getUrgencyPulse(request.urgency)}`}></div>
                    </div>

                    {/* Blood group badge */}
                    <div className="p-5 bg-gradient-to-r from-rose-50 to-pink-50">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="relative">
                            <div className="absolute inset-0 bg-red-500 rounded-full blur opacity-30"></div>
                            <div className="relative bg-white w-16 h-16 rounded-full flex items-center justify-center 
                                         shadow-lg border-2 border-rose-200">
                              <span className="text-2xl font-bold text-rose-600">{request.bloodGroup}</span>
                            </div>
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-gray-900">{request.patientName}, {request.age}</h3>
                            <p className="text-gray-600">{request.condition}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Request Details */}
                  <div className="p-5">
                        <div className="space-y-4">
                          {/* Hospital info */}
                          <div className="flex items-start space-x-3">
                            <div className="p-2 bg-blue-50 rounded-lg">
                              <MapPin className="h-5 w-5 text-blue-500" />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-semibold text-gray-900">{request.hospital}</h4>
                              <div className="flex items-center space-x-2 mt-1">
                                <span className="text-sm text-gray-600">{request.location}</span>
                                <span className="text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full">
                                  {request.distance}
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Time and units */}
                          <div className="grid grid-cols-2 gap-4">
                            <div className="flex items-center space-x-3 p-3 bg-amber-50 rounded-lg">
                              <Clock className="h-5 w-5 text-amber-500" />
                              <div>
                                <div className="text-sm font-medium text-gray-900">{request.timePosted}</div>
                                <div className="text-xs text-gray-600">Expires in {request.expiry}</div>
                              </div>
                            </div>

                            <div className="flex items-center space-x-3 p-3 bg-rose-50 rounded-lg">
                              <Droplets className="h-5 w-5 text-rose-500" />
                              <div>
                                <div className="text-sm font-medium text-gray-900">{request.units} Units</div>
                                <div className="text-xs text-gray-600">{request.bloodGroup} Required</div>
                              </div>
                            </div>
                          </div>

                          {/* Donor status */}
                          <div className="bg-gray-50 rounded-lg p-4">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm font-medium text-gray-700">Donor Response</span>
                              <span className="text-xs text-gray-500">
                                {request.donorsResponded} of {request.donorsNeeded} responded
                              </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full"
                                style={{ width: `${(request.donorsResponded / request.donorsNeeded) * 100}%` }}
                              ></div>
                            </div>
                          </div>

                          {/* Contact info */}
                          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div className="flex items-center space-x-3">
                              <div className="p-2 bg-gray-100 rounded-lg">
                                <Phone className="h-4 w-4 text-gray-600" />
                              </div>
                              <div>
                                <div className="text-sm font-medium text-gray-900">Contact</div>
                                <div className="text-xs text-gray-600">{request.requestedBy}</div>
                              </div>
                            </div>
                            <button
                              onClick={() => handleCallClick(request.contact)}
                              className="px-3 py-1.5 bg-white text-rose-600 border border-rose-200 
                                       rounded-lg text-sm font-medium hover:bg-rose-50 transition-colors"
                            >
                              Call Now
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="px-5 pb-5 pt-2">
                        <div className="flex space-x-3">
                          <button
                            onClick={() => handleDonateClick(request.id)}
                            className="flex-1 bg-gradient-to-r from-rose-500 to-rose-400 text-white 
                                     py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-rose-200 
                                     transition-all duration-300 hover:scale-105 active:scale-95 
                                     flex items-center justify-center space-x-2 group"
                          >
                            <Heart className="h-5 w-5" fill="white" />
                            <span>Donate Now</span>
                            <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                          </button>

                          <button className="px-4 py-3 bg-white text-gray-700 border border-gray-200 
                                         rounded-xl font-medium hover:bg-gray-50 transition-colors
                                         flex items-center justify-center">
                            <Navigation className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* No Results */}
                {filteredRequests.length === 0 && (
                  <div className="text-center py-12">
                    <div className="mb-4">
                      <Heart className="h-16 w-16 text-gray-300 mx-auto" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">No Urgent Requests</h3>
                    <p className="text-gray-500 mb-6">There are currently no urgent blood requests.</p>
                    <button
                      onClick={fetchRequests}
                      className="px-6 py-3 bg-gradient-to-r from-rose-500 to-rose-400 text-white 
                               rounded-lg font-semibold hover:shadow-lg transition-shadow"
                    >
                      Check Again
                    </button>
                  </div>
                )}

                {/* Mobile Scroll Indicator */}
                <div className="lg:hidden flex justify-center mt-6">
                  <div className="flex items-center space-x-2 text-rose-500 animate-bounce">
                    <ArrowRight className="h-5 w-5 rotate-90" />
                    <span className="text-sm font-medium">Scroll for more requests</span>
                    <ArrowRight className="h-5 w-5 rotate-90" />
                  </div>
                </div>

                {/* Footer CTA */}
                <div className="mt-12 bg-gradient-to-r from-rose-500 to-rose-400 rounded-2xl p-8 text-center">
                  <div className="max-w-2xl mx-auto">
                    <h3 className="text-2xl font-bold text-white mb-4">
                      Can't find a matching request?
                    </h3>
                    <p className="text-rose-100 mb-6">
                      Register as a donor and be notified when your blood type is needed.
                      You could save up to 3 lives with a single donation.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <button className="px-8 py-3 bg-white text-rose-600 rounded-xl font-bold 
                                       hover:bg-rose-50 transition-colors shadow-lg">
                        Register as Donor
                      </button>
                      <button className="px-8 py-3 bg-transparent text-white border-2 border-white 
                                       rounded-xl font-bold hover:bg-white/10 transition-colors">
                        Learn More
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

        {/* Mobile horizontal scroll instructions */}
        <style jsx global>{`
          @media (max-width: 1024px) {
            .scroll-container {
              -webkit-overflow-scrolling: touch;
            }
          }
          
          .animate-pulse {
            animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
          }
          
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
          }
        `}</style>
    </section>
    );
  };

  export default UrgentBloodRequests;