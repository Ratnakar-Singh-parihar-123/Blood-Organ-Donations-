import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import {
  User, Calendar, Bell, Heart, Droplets, Activity,
  FileText, Settings, Shield, Award, TrendingUp,
  Users, MapPin, Phone, Mail, Clock, CheckCircle,
  AlertCircle, Star, Home, ArrowRight, Plus,
  MessageCircle, Download, Upload, Filter, Search,
  ChevronRight, ChevronLeft, Menu, X, Eye,
  BarChart3, PieChart, History, UserPlus, Stethoscope,
  Bed, ClipboardList, ActivitySquare, Target,
  Award as AwardIcon, Calendar as CalendarIcon,
  Heart as HeartIcon, Shield as ShieldIcon,
  TrendingUp as TrendingUpIcon, Users as UsersIcon,
  LogOut, Edit, Trash2, Share2, Printer, QrCode,
  Smartphone, Monitor, Tablet, Wifi, Battery,
  BatteryCharging, RefreshCw, Cloud, Database,
  ThumbsUp, Zap, Target as TargetIcon, Globe,
  Map, Navigation, ShieldCheck, Clock3, Award as AwardIcon2,
  BellRing, HelpCircle, ThumbsUp as ThumbsUpIcon,
  Users as UsersIcon2, Map as MapIcon, TrendingUp as TrendingUpIcon2,
  BarChart, Filter as FilterIcon, Star as StarIcon,
  EyeOff, Eye as EyeIcon, ShieldOff, Shield as ShieldIcon2,
  Globe as GlobeIcon, Share as ShareIcon, HeartPulse,
  Send, Check, XCircle, MoreVertical, Navigation as NavigationIcon,
  PhoneCall, Video, Mail as MailIcon, MapPin as MapPinIcon,
  ExternalLink, Users as UsersIcon3, Thermometer,
  Activity as ActivityIcon, AlertTriangle, Info,
  ChevronDown, ChevronUp, Bookmark, Flag,
  MessageSquare, DownloadCloud, UploadCloud,
  Maximize2, Minimize2, RotateCcw, Heart as HeartIcon2
} from 'lucide-react';

const DonorRequestPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [patientData, setPatientData] = useState(null);
  const [donorData, setDonorData] = useState(null);
  const [requestData, setRequestData] = useState(null);
  const [activeTab, setActiveTab] = useState('details');
  const [screenSize, setScreenSize] = useState('desktop');
  const [showActionMenu, setShowActionMenu] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [confirmationAction, setConfirmationAction] = useState(null);
  const [requestStatus, setRequestStatus] = useState('pending');
  const [donorResponse, setDonorResponse] = useState(null);
  const [showMap, setShowMap] = useState(false);
  const [selectedHospital, setSelectedHospital] = useState(null);

  // Detect screen size
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) setScreenSize('mobile');
      else if (width < 1024) setScreenSize('tablet');
      else setScreenSize('desktop');
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Extract parameters from URL
  const getUrlParams = () => {
    const params = new URLSearchParams(location.search);
    return {
      requestId: params.get('requestId') || 'req-001',
      patientId: params.get('patientId') || localStorage.getItem('currentPatientId'),
      donorId: params.get('donorId') || localStorage.getItem('currentDonorId'),
      type: params.get('type') || 'blood' // 'blood' or 'organ'
    };
  };

  // Fetch data
  const fetchData = useCallback(async () => {
    const { requestId, patientId, donorId, type } = getUrlParams();
    setIsLoading(true);

    try {
      // Fetch patient data
      const patientStored = localStorage.getItem('patientData') || localStorage.getItem('currentUserData');
      let patientData = null;
      
      if (patientStored) {
        try {
          patientData = JSON.parse(patientStored);
        } catch (e) {
          patientData = null;
        }
      }

      // If no stored data, create demo patient data
      if (!patientData) {
        patientData = {
          patientId: patientId || 'patient-001',
          name: 'Rahul Verma',
          email: 'rahul.verma@example.com',
          phone: '+91 98765 43210',
          bloodGroup: 'B+',
          age: 45,
          gender: 'Male',
          address: '789 Gandhi Road, Mumbai, Maharashtra',
          emergencyContact: '+91 98765 43211',
          primaryDoctor: 'Dr. Sharma',
          hospital: 'Apollo Hospital',
          registrationDate: '2024-01-15',
          status: 'Active',
          avatarColor: 'bg-gradient-to-br from-blue-500 to-cyan-400',
          medicalConditions: ['Hypertension'],
          allergies: ['None'],
          currentMedications: ['Amlodipine 5mg'],
          height: '170 cm',
          weight: '75 kg',
          bloodPressure: '130/85 mmHg'
        };
      }

      // Fetch donor data (current user)
      const donorStored = localStorage.getItem('donorData') || localStorage.getItem('currentUserData');
      let donorData = null;
      
      if (donorStored) {
        try {
          donorData = JSON.parse(donorStored);
        } catch (e) {
          donorData = null;
        }
      }

      // If no stored data, create demo donor data
      if (!donorData) {
        donorData = {
          donorId: donorId || 'donor-001',
          name: 'Aarav Sharma',
          email: 'aarav.sharma@example.com',
          phone: '+91 98765 43219',
          bloodGroup: 'B+',
          age: 32,
          gender: 'Male',
          donorType: 'both',
          address: '456 Park Avenue, Delhi, India',
          availability: 'Available',
          lastDonation: '2024-02-10',
          totalDonations: 8,
          totalLivesImpacted: 24,
          avgResponseTime: '45 mins',
          reliabilityScore: 98,
          avatarColor: 'bg-gradient-to-br from-red-500 to-orange-400',
          verified: true,
          donorLevel: 'Platinum'
        };
      }

      // Generate request data
      const requestData = {
        id: requestId,
        patientId: patientData.patientId,
        patientName: patientData.name,
        patientAge: patientData.age,
        patientBloodGroup: patientData.bloodGroup,
        donorId: donorData.donorId,
        donorName: donorData.name,
        donorBloodGroup: donorData.bloodGroup,
        type: type,
        urgency: 'Critical',
        status: 'pending',
        createdAt: '2024-02-20 10:30:00',
        expiresAt: '2024-02-21 10:30:00',
        matchScore: 95,
        
        // Blood request specific
        bloodGroupNeeded: patientData.bloodGroup,
        unitsRequired: 2,
        bloodType: 'Whole Blood',
        
        // Organ request specific
        organType: type === 'organ' ? 'Kidney' : null,
        organUrgency: type === 'organ' ? 'High' : null,
        
        // Common medical details
        medicalCondition: 'Emergency Surgery',
        hospital: 'Apollo Hospital, Mumbai',
        hospitalAddress: 'Apollo Hospital, Tardeo, Mumbai - 400034',
        hospitalPhone: '+91 22 6666 8888',
        hospitalDistance: '5.2 km',
        estimatedTravelTime: '15 mins',
        
        // Doctor details
        doctorName: 'Dr. Rajesh Sharma',
        doctorSpecialization: 'Cardiovascular Surgeon',
        doctorPhone: '+91 98765 43212',
        
        // Additional details
        priorityReason: 'Emergency surgery scheduled in 4 hours',
        previousDonations: 0,
        insuranceCoverage: 'Full coverage available',
        transportArranged: true,
        accommodationProvided: true,
        
        // Timeline
        timeline: [
          { time: '10:30 AM', action: 'Request created by patient', status: 'completed' },
          { time: '10:45 AM', action: 'System matched with you', status: 'completed' },
          { time: 'Now', action: 'Awaiting your response', status: 'current' },
          { time: 'Next', action: 'Confirmation & scheduling', status: 'pending' },
          { time: '2:30 PM', action: 'Hospital arrival', status: 'pending' }
        ]
      };

      setPatientData(patientData);
      setDonorData(donorData);
      setRequestData(requestData);
      
      // Save to localStorage for consistency
      localStorage.setItem('currentPatientData', JSON.stringify(patientData));
      localStorage.setItem('currentDonorData', JSON.stringify(donorData));

    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  }, [location.search]);

  // Handle response actions
  const handleResponse = (action) => {
    setConfirmationAction(action);
    setShowConfirmationModal(true);
  };

  // Confirm response action
  const confirmResponse = () => {
    if (confirmationAction === 'accept') {
      setRequestStatus('accepted');
      setDonorResponse({
        action: 'accepted',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        message: 'Request accepted successfully'
      });
      
      // Update request timeline
      const updatedRequest = { ...requestData };
      updatedRequest.timeline[2] = { 
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), 
        action: 'Request accepted by donor', 
        status: 'completed' 
      };
      updatedRequest.timeline[3] = { 
        time: 'Next', 
        action: 'Scheduling hospital visit', 
        status: 'current' 
      };
      updatedRequest.status = 'accepted';
      setRequestData(updatedRequest);
      
      // Show success message
      setTimeout(() => {
        alert('Thank you for accepting this request! The hospital will contact you shortly.');
      }, 500);
      
    } else if (confirmationAction === 'decline') {
      setRequestStatus('declined');
      setDonorResponse({
        action: 'declined',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        message: 'Request declined'
      });
      
      // Navigate back or show declined state
      setTimeout(() => {
        navigate('/donor/dashboard?tab=requests');
      }, 1500);
    }
    
    setShowConfirmationModal(false);
    setConfirmationAction(null);
  };

  // Handle contact actions
  const handleContact = (type) => {
    switch(type) {
      case 'call':
        window.open(`tel:${patientData?.phone}`);
        break;
      case 'message':
        window.open(`sms:${patientData?.phone}`);
        break;
      case 'email':
        window.open(`mailto:${patientData?.email}`);
        break;
      case 'hospital':
        window.open(`tel:${requestData?.hospitalPhone}`);
        break;
      case 'doctor':
        window.open(`tel:${requestData?.doctorPhone}`);
        break;
    }
  };

  // Handle navigation
  const handleNavigateToHospital = () => {
    const address = encodeURIComponent(requestData?.hospitalAddress || '');
    window.open(`https://www.google.com/maps/search/?api=1&query=${address}`, '_blank');
  };

  // Format time remaining
  const getTimeRemaining = () => {
    if (!requestData?.expiresAt) return 'N/A';
    
    const expires = new Date(requestData.expiresAt);
    const now = new Date();
    const diffMs = expires - now;
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    
    if (diffHours > 0) {
      return `${diffHours}h ${diffMinutes}m`;
    }
    return `${diffMinutes} minutes`;
  };

  // Get urgency color
  const getUrgencyColor = (urgency) => {
    switch(urgency?.toLowerCase()) {
      case 'critical': return 'bg-gradient-to-r from-red-600 to-red-500';
      case 'high': return 'bg-gradient-to-r from-orange-600 to-amber-500';
      case 'medium': return 'bg-gradient-to-r from-yellow-600 to-yellow-500';
      default: return 'bg-gradient-to-r from-blue-600 to-cyan-500';
    }
  };

  // Get urgency icon
  const getUrgencyIcon = (urgency) => {
    switch(urgency?.toLowerCase()) {
      case 'critical': return AlertCircle;
      case 'high': return AlertTriangle;
      case 'medium': return Clock;
      default: return Info;
    }
  };

  // Toggle map view
  const toggleMapView = () => {
    setShowMap(!showMap);
  };

  // Initialize on mount
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Tabs for request details
  const requestTabs = [
    { id: 'details', label: 'Details', icon: Info },
    { id: 'timeline', label: 'Timeline', icon: Clock },
    { id: 'medical', label: 'Medical', icon: FileText },
    { id: 'hospital', label: 'Hospital', icon: MapPin }
  ];

  // Quick actions
  const quickActions = [
    { id: 'call', label: 'Call Patient', icon: Phone, color: 'bg-green-500', action: () => handleContact('call') },
    { id: 'message', label: 'Message', icon: MessageSquare, color: 'bg-blue-500', action: () => handleContact('message') },
    { id: 'email', label: 'Email', icon: MailIcon, color: 'bg-red-500', action: () => handleContact('email') },
    { id: 'navigate', label: 'Navigate', icon: NavigationIcon, color: 'bg-purple-500', action: handleNavigateToHospital }
  ];

  // Device specific rendering helper
  const isMobile = screenSize === 'mobile';
  const isTablet = screenSize === 'tablet';
  const isDesktop = screenSize === 'desktop';

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-red-200 border-t-red-600 rounded-full animate-spin mx-auto mb-4"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Heart className="h-8 w-8 text-red-500 animate-pulse" />
            </div>
          </div>
          <p className="text-gray-600 mt-4 font-medium">Loading request details...</p>
          <p className="text-gray-500 text-sm mt-2">Preparing lifesaving information</p>
        </div>
      </div>
    );
  }

  if (!requestData || !patientData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
        <div className="text-center max-w-md p-8 bg-white rounded-2xl shadow-lg">
          <div className="w-20 h-20 bg-gradient-to-br from-red-100 to-red-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="h-10 w-10 text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Request Not Found</h2>
          <p className="text-gray-600 mb-6">We couldn't find the requested details.</p>
          <div className="space-y-3">
            <button
              onClick={() => navigate('/donor/dashboard')}
              className="w-full px-6 py-3 bg-gradient-to-r from-red-600 to-orange-500 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-red-500/30 transition-all"
            >
              Return to Dashboard
            </button>
            <button
              onClick={() => navigate('/')}
              className="w-full px-6 py-3 bg-white text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors border border-gray-200"
            >
              Go Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  const UrgencyIcon = getUrgencyIcon(requestData.urgency);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-lg shadow-sm border-b border-gray-200">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left side */}
            <div className="flex items-center flex-1">
              <button
                onClick={() => navigate('/donor/dashboard')}
                className="flex items-center gap-2 text-gray-700 hover:text-red-600 transition-colors"
              >
                <ChevronLeft className="h-5 w-5" />
                <span className="hidden sm:inline font-medium">Back</span>
              </button>
              
              <div className="ml-4">
                <h1 className="text-lg font-bold text-gray-900">Donation Request</h1>
                <p className="text-xs text-gray-600 hidden sm:block">ID: {requestData.id}</p>
              </div>
            </div>

            {/* Right side */}
            <div className="flex items-center gap-3">
              {/* Urgency Badge */}
              <div className={`${getUrgencyColor(requestData.urgency)} text-white px-3 py-1 rounded-full flex items-center gap-2`}>
                <UrgencyIcon className="h-3 w-3" />
                <span className="text-sm font-medium">{requestData.urgency}</span>
              </div>

              {/* Action Menu */}
              <div className="relative">
                <button
                  onClick={() => setShowActionMenu(!showActionMenu)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <MoreVertical className="h-5 w-5 text-gray-700" />
                </button>

                {showActionMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 py-1 z-50">
                    <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                      <Share2 className="h-4 w-4" />
                      Share Request
                    </button>
                    <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                      <Bookmark className="h-4 w-4" />
                      Save for Later
                    </button>
                    <button className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2">
                      <Flag className="h-4 w-4" />
                      Report Issue
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Mobile Tabs */}
          {isMobile && (
            <div className="pb-2 overflow-x-auto">
              <div className="flex space-x-1">
                {requestTabs.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex-shrink-0 px-3 py-2 rounded-lg flex items-center gap-2 text-sm font-medium ${
                        isActive
                          ? 'bg-gradient-to-r from-red-600 to-orange-500 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </header>

      <main className="p-4 sm:p-6 lg:p-8">
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Left Column - Request Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Urgency Banner */}
            <div className={`${getUrgencyColor(requestData.urgency)} text-white rounded-2xl p-6`}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <UrgencyIcon className="h-5 w-5" />
                    <h2 className="text-xl font-bold">
                      {requestData.urgency} Priority Request
                    </h2>
                  </div>
                  <p className="text-red-100">
                    {requestData.type === 'blood' 
                      ? `${requestData.unitsRequired} unit(s) of ${requestData.bloodGroupNeeded} blood needed urgently`
                      : `${requestData.organType} transplant needed urgently`
                    }
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold">{requestData.matchScore}%</div>
                  <div className="text-red-100 text-sm">Match Score</div>
                </div>
              </div>
              
              {/* Time Remaining */}
              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>Response needed within:</span>
                </div>
                <div className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full">
                  <span className="font-bold">{getTimeRemaining()}</span>
                </div>
              </div>
            </div>

            {/* Patient & Donor Match Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Patient & Donor Match</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Patient Info */}
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`w-12 h-12 ${patientData.avatarColor} rounded-xl flex items-center justify-center text-white font-bold text-lg`}>
                      {patientData.name?.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">{patientData.name}</h4>
                      <p className="text-sm text-gray-700">Patient • {patientData.age} years</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="px-3 py-1 bg-white text-blue-700 text-sm font-bold rounded-full">
                        {patientData.bloodGroup}
                      </div>
                      <span className="text-sm text-gray-700">Blood Group</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <Phone className="h-3 w-3" />
                      {patientData.phone}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <Mail className="h-3 w-3" />
                      {patientData.email}
                    </div>
                  </div>
                </div>

                {/* Donor Info */}
                <div className="bg-gradient-to-br from-red-50 to-orange-100 rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`w-12 h-12 ${donorData?.avatarColor || 'bg-gradient-to-br from-red-500 to-orange-400'} rounded-xl flex items-center justify-center text-white font-bold text-lg`}>
                      {donorData?.name?.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">{donorData?.name || 'You'}</h4>
                      <p className="text-sm text-gray-700">Donor • {donorData?.donorLevel || 'Platinum'}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="px-3 py-1 bg-white text-red-700 text-sm font-bold rounded-full">
                        {donorData?.bloodGroup}
                      </div>
                      <span className="text-sm text-gray-700">Blood Group</span>
                    </div>
                    <div className="text-sm text-gray-700">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-3 w-3 text-green-500" />
                        Perfect blood group match
                      </div>
                    </div>
                    <div className="text-sm text-gray-700">
                      <div className="flex items-center gap-2">
                        <ActivityIcon className="h-3 w-3 text-green-500" />
                        {donorData?.totalDonations || 0} previous donations
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Match Score Bar */}
              <div className="mt-6">
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">Match Compatibility</span>
                  <span className="text-sm font-bold text-green-600">{requestData.matchScore}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-gradient-to-r from-green-500 to-emerald-500 h-2.5 rounded-full" 
                    style={{ width: `${requestData.matchScore}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Blood Group: Perfect</span>
                  <span>Location: {requestData.hospitalDistance}</span>
                  <span>Availability: Confirmed</span>
                </div>
              </div>
            </div>

            {/* Tabs Content - Desktop */}
            {!isMobile && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
                {/* Tab Headers */}
                <div className="border-b border-gray-200">
                  <div className="flex">
                    {requestTabs.map((tab) => {
                      const Icon = tab.icon;
                      const isActive = activeTab === tab.id;
                      
                      return (
                        <button
                          key={tab.id}
                          onClick={() => setActiveTab(tab.id)}
                          className={`flex-1 px-6 py-4 flex items-center justify-center gap-2 text-sm font-medium border-b-2 ${
                            isActive
                              ? 'border-red-500 text-red-600'
                              : 'border-transparent text-gray-600 hover:text-gray-900'
                          }`}
                        >
                          <Icon className="h-4 w-4" />
                          <span>{tab.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Tab Content */}
                <div className="p-6">
                  {activeTab === 'details' && (
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">Request Details</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <p className="text-sm text-gray-600">Type</p>
                            <p className="font-medium text-gray-900 capitalize">{requestData.type} Donation</p>
                          </div>
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <p className="text-sm text-gray-600">Blood Group Needed</p>
                            <p className="font-medium text-gray-900">{requestData.bloodGroupNeeded}</p>
                          </div>
                          {requestData.type === 'blood' && (
                            <div className="bg-gray-50 p-4 rounded-lg">
                              <p className="text-sm text-gray-600">Units Required</p>
                              <p className="font-medium text-gray-900">{requestData.unitsRequired} unit(s)</p>
                            </div>
                          )}
                          {requestData.type === 'organ' && (
                            <div className="bg-gray-50 p-4 rounded-lg">
                              <p className="text-sm text-gray-600">Organ Type</p>
                              <p className="font-medium text-gray-900">{requestData.organType}</p>
                            </div>
                          )}
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <p className="text-sm text-gray-600">Priority Reason</p>
                            <p className="font-medium text-gray-900">{requestData.priorityReason}</p>
                          </div>
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <p className="text-sm text-gray-600">Medical Condition</p>
                            <p className="font-medium text-gray-900">{requestData.medicalCondition}</p>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">Support Provided</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                            <CheckCircle className="h-5 w-5 text-green-600" />
                            <div>
                              <p className="font-medium text-gray-900">Transport Arranged</p>
                              <p className="text-sm text-gray-600">Hospital will arrange pickup</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                            <CheckCircle className="h-5 w-5 text-green-600" />
                            <div>
                              <p className="font-medium text-gray-900">Accommodation Provided</p>
                              <p className="text-sm text-gray-600">If needed for recovery</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                            <ShieldCheck className="h-5 w-5 text-blue-600" />
                            <div>
                              <p className="font-medium text-gray-900">Insurance Coverage</p>
                              <p className="text-sm text-gray-600">{requestData.insuranceCoverage}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3 p-3 bg-amber-50 rounded-lg">
                            <Clock className="h-5 w-5 text-amber-600" />
                            <div>
                              <p className="font-medium text-gray-900">Estimated Time</p>
                              <p className="text-sm text-gray-600">2-3 hours including recovery</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'timeline' && (
                    <div className="space-y-4">
                      <h4 className="font-semibold text-gray-900 mb-4">Request Timeline</h4>
                      {requestData.timeline.map((item, index) => (
                        <div key={index} className="flex items-start gap-4">
                          <div className="flex flex-col items-center">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              item.status === 'completed' ? 'bg-green-100 text-green-600' :
                              item.status === 'current' ? 'bg-red-100 text-red-600' :
                              'bg-gray-100 text-gray-400'
                            }`}>
                              {item.status === 'completed' ? (
                                <Check className="h-4 w-4" />
                              ) : item.status === 'current' ? (
                                <Clock className="h-4 w-4" />
                              ) : (
                                <Clock className="h-4 w-4" />
                              )}
                            </div>
                            {index < requestData.timeline.length - 1 && (
                              <div className="w-0.5 h-8 bg-gray-200"></div>
                            )}
                          </div>
                          <div className="flex-1">
                            <div className={`p-3 rounded-lg ${
                              item.status === 'current' ? 'bg-red-50 border border-red-100' : 'bg-gray-50'
                            }`}>
                              <div className="flex justify-between items-center">
                                <p className="font-medium text-gray-900">{item.action}</p>
                                <span className="text-sm text-gray-600">{item.time}</span>
                              </div>
                              {item.status === 'current' && (
                                <p className="text-sm text-red-600 mt-1">
                                  Your response is needed now
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {activeTab === 'medical' && (
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">Patient Medical Information</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <p className="text-sm text-gray-600">Medical Conditions</p>
                            <div className="mt-2">
                              {patientData.medicalConditions?.map((condition, idx) => (
                                <span key={idx} className="inline-block px-3 py-1 bg-amber-100 text-amber-700 text-sm rounded-full mr-2 mb-2">
                                  {condition}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <p className="text-sm text-gray-600">Allergies</p>
                            <div className="mt-2">
                              {patientData.allergies?.map((allergy, idx) => (
                                <span key={idx} className="inline-block px-3 py-1 bg-red-100 text-red-700 text-sm rounded-full mr-2 mb-2">
                                  {allergy}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <p className="text-sm text-gray-600">Current Medications</p>
                            <div className="mt-2">
                              {patientData.currentMedications?.map((med, idx) => (
                                <span key={idx} className="inline-block px-3 py-1 bg-green-100 text-green-700 text-sm rounded-full mr-2 mb-2">
                                  {med}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <p className="text-sm text-gray-600">Vital Stats</p>
                            <div className="mt-2 space-y-1">
                              <p className="text-gray-900">Height: {patientData.height}</p>
                              <p className="text-gray-900">Weight: {patientData.weight}</p>
                              <p className="text-gray-900">Blood Pressure: {patientData.bloodPressure}</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">Doctor in Charge</h4>
                        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-4">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-full flex items-center justify-center text-white font-bold">
                              {requestData.doctorName?.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div>
                              <h5 className="font-bold text-gray-900">{requestData.doctorName}</h5>
                              <p className="text-sm text-gray-700">{requestData.doctorSpecialization}</p>
                              <div className="flex items-center gap-3 mt-2">
                                <button
                                  onClick={() => handleContact('doctor')}
                                  className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
                                >
                                  <Phone className="h-3 w-3" />
                                  Contact Doctor
                                </button>
                                <span className="text-gray-300">•</span>
                                <span className="text-sm text-gray-600">Available 24/7</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'hospital' && (
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">Hospital Details</h4>
                        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4">
                          <div className="flex items-start justify-between">
                            <div>
                              <h5 className="font-bold text-gray-900 text-lg">{requestData.hospital}</h5>
                              <p className="text-gray-700 mt-1">{requestData.hospitalAddress}</p>
                              
                              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div className="flex items-center gap-2">
                                  <MapPin className="h-4 w-4 text-gray-500" />
                                  <span className="text-sm text-gray-700">{requestData.hospitalDistance} away</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Clock className="h-4 w-4 text-gray-500" />
                                  <span className="text-sm text-gray-700">{requestData.estimatedTravelTime} travel time</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Phone className="h-4 w-4 text-gray-500" />
                                  <span className="text-sm text-gray-700">{requestData.hospitalPhone}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <UsersIcon3 className="h-4 w-4 text-gray-500" />
                                  <span className="text-sm text-gray-700">24/7 Emergency</span>
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex flex-col gap-2">
                              <button
                                onClick={() => handleContact('hospital')}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center gap-2"
                              >
                                <Phone className="h-4 w-4" />
                                Call Hospital
                              </button>
                              <button
                                onClick={handleNavigateToHospital}
                                className="px-4 py-2 bg-white text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors border border-blue-300 flex items-center gap-2"
                              >
                                <NavigationIcon className="h-4 w-4" />
                                Get Directions
                              </button>
                            </div>
                          </div>

                          {/* Map Preview */}
                          <div className="mt-6">
                            <div className="flex items-center justify-between mb-3">
                              <h6 className="font-medium text-gray-900">Hospital Location</h6>
                              <button
                                onClick={toggleMapView}
                                className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
                              >
                                {showMap ? (
                                  <>
                                    <Minimize2 className="h-3 w-3" />
                                    Hide Map
                                  </>
                                ) : (
                                  <>
                                    <Maximize2 className="h-3 w-3" />
                                    Show Map
                                  </>
                                )}
                              </button>
                            </div>
                            
                            {showMap ? (
                              <div className="bg-gradient-to-br from-gray-200 to-gray-300 rounded-xl h-64 flex items-center justify-center">
                                <div className="text-center">
                                  <Map className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                                  <p className="text-gray-600">Interactive map would appear here</p>
                                  <p className="text-sm text-gray-500">Showing directions to {requestData.hospital}</p>
                                </div>
                              </div>
                            ) : (
                              <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl h-32 flex items-center justify-center">
                                <div className="text-center">
                                  <MapPinIcon className="h-8 w-8 text-gray-400 mx-auto mb-1" />
                                  <p className="text-sm text-gray-600">Click "Show Map" for directions</p>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">Facilities Available</h4>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                          {['ICU', 'Operation Theater', 'Blood Bank', 'Recovery Room', 'Cafeteria', 'Parking', 'WiFi', 'Pharmacy'].map((facility) => (
                            <div key={facility} className="bg-gray-50 p-3 rounded-lg text-center">
                              <CheckCircle className="h-5 w-5 text-green-500 mx-auto mb-1" />
                              <p className="text-sm text-gray-900">{facility}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Tabs Content - Mobile */}
            {isMobile && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4">
                {activeTab === 'details' && (
                  <div className="space-y-4">
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-sm text-gray-600">Type</p>
                      <p className="font-medium text-gray-900 capitalize">{requestData.type} Donation</p>
                    </div>
                    {requestData.type === 'blood' && (
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-sm text-gray-600">Units Required</p>
                        <p className="font-medium text-gray-900">{requestData.unitsRequired} unit(s)</p>
                      </div>
                    )}
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-sm text-gray-600">Priority Reason</p>
                      <p className="font-medium text-gray-900">{requestData.priorityReason}</p>
                    </div>
                  </div>
                )}

                {activeTab === 'timeline' && (
                  <div className="space-y-3">
                    {requestData.timeline.slice(0, 3).map((item, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                          item.status === 'completed' ? 'bg-green-100 text-green-600' :
                          item.status === 'current' ? 'bg-red-100 text-red-600' :
                          'bg-gray-100 text-gray-400'
                        }`}>
                          {item.status === 'completed' ? (
                            <Check className="h-3 w-3" />
                          ) : item.status === 'current' ? (
                            <Clock className="h-3 w-3" />
                          ) : (
                            <Clock className="h-3 w-3" />
                          )}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-gray-900 text-sm">{item.action}</p>
                          <p className="text-xs text-gray-600">{item.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'medical' && (
                  <div className="space-y-3">
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-sm text-gray-600">Medical Condition</p>
                      <p className="font-medium text-gray-900">{requestData.medicalCondition}</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-sm text-gray-600">Doctor</p>
                      <p className="font-medium text-gray-900">{requestData.doctorName}</p>
                    </div>
                  </div>
                )}

                {activeTab === 'hospital' && (
                  <div className="space-y-3">
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-sm text-gray-600">Hospital</p>
                      <p className="font-medium text-gray-900">{requestData.hospital}</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-sm text-gray-600">Distance</p>
                      <p className="font-medium text-gray-900">{requestData.hospitalDistance}</p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Mobile Quick Actions */}
            {isMobile && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4">
                <h4 className="font-semibold text-gray-900 mb-3">Quick Actions</h4>
                <div className="grid grid-cols-4 gap-2">
                  {quickActions.map((action) => {
                    const Icon = action.icon;
                    return (
                      <button
                        key={action.id}
                        onClick={action.action}
                        className="flex flex-col items-center p-2 hover:bg-gray-50 rounded-lg transition-colors"
                      >
                        <div className={`${action.color} w-10 h-10 rounded-full flex items-center justify-center mb-1`}>
                          <Icon className="h-5 w-5 text-white" />
                        </div>
                        <span className="text-xs text-gray-700">{action.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Action Panel */}
          <div className="space-y-6">
            {/* Response Panel */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              {/* Panel Header */}
              <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white p-6">
                <h3 className="text-xl font-bold mb-2">Your Response</h3>
                <p className="text-gray-300 text-sm">
                  {requestStatus === 'pending' 
                    ? 'Can you help save a life today?'
                    : requestStatus === 'accepted'
                    ? 'Thank you for accepting this request!'
                    : 'Request declined'}
                </p>
              </div>

              {/* Response Status */}
              <div className="p-6">
                {donorResponse ? (
                  <div className={`p-4 rounded-lg ${
                    donorResponse.action === 'accepted' 
                      ? 'bg-gradient-to-br from-green-50 to-emerald-100 border border-green-200'
                      : 'bg-gradient-to-br from-red-50 to-red-100 border border-red-200'
                  }`}>
                    <div className="flex items-center gap-3 mb-2">
                      {donorResponse.action === 'accepted' ? (
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-600" />
                      )}
                      <span className="font-semibold text-gray-900">
                        {donorResponse.action === 'accepted' ? 'Request Accepted' : 'Request Declined'}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{donorResponse.message}</p>
                    <p className="text-xs text-gray-500 mt-2">at {donorResponse.time}</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="w-20 h-20 bg-gradient-to-br from-red-50 to-orange-50 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Heart className="h-10 w-10 text-red-500" />
                      </div>
                      <p className="text-gray-700">
                        Your donation can save {requestData.type === 'blood' ? 'up to 3 lives' : '1 life'}
                      </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-3">
                      <button
                        onClick={() => handleResponse('accept')}
                        className="w-full px-6 py-4 bg-gradient-to-r from-green-600 to-emerald-500 text-white rounded-xl font-bold hover:shadow-lg hover:shadow-green-500/30 transition-all flex items-center justify-center gap-3"
                      >
                        <Check className="h-5 w-5" />
                        Accept Request
                      </button>
                      
                      <button
                        onClick={() => handleResponse('decline')}
                        className="w-full px-6 py-4 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 rounded-xl font-bold hover:bg-gray-300 transition-all flex items-center justify-center gap-3"
                      >
                        <XCircle className="h-5 w-5" />
                        Decline Request
                      </button>
                    </div>

                    {/* Quick Info */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <Info className="h-4 w-4 text-blue-600" />
                        <span className="text-sm font-medium text-blue-900">What happens next?</span>
                      </div>
                      <ul className="text-xs text-blue-700 space-y-1">
                        <li>• Hospital will contact you within 30 minutes</li>
                        <li>• Transport will be arranged if needed</li>
                        <li>• Full medical screening at hospital</li>
                        <li>• Process takes 2-3 hours total</li>
                      </ul>
                    </div>
                  </div>
                )}
              </div>

              {/* Accepted Actions */}
              {requestStatus === 'accepted' && (
                <div className="border-t border-gray-200 p-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Next Steps</h4>
                  <div className="space-y-3">
                    <button
                      onClick={() => handleContact('hospital')}
                      className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                    >
                      <Phone className="h-4 w-4" />
                      Contact Hospital Now
                    </button>
                    <button
                      onClick={handleNavigateToHospital}
                      className="w-full px-4 py-3 bg-white text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors border border-blue-300 flex items-center justify-center gap-2"
                    >
                      <NavigationIcon className="h-4 w-4" />
                      Get Directions
                    </button>
                    <button className="w-full px-4 py-3 bg-gradient-to-br from-gray-50 to-gray-100 text-gray-700 rounded-lg font-medium hover:from-gray-100 hover:to-gray-200 transition-all flex items-center justify-center gap-2">
                      <DownloadCloud className="h-4 w-4" />
                      Download Appointment Details
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h4 className="font-semibold text-gray-900 mb-4">Quick Stats</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-600">Your Match Score</span>
                  <span className="font-bold text-green-600">{requestData.matchScore}%</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-600">Time to Respond</span>
                  <span className="font-bold text-red-600">{getTimeRemaining()}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-600">Hospital Distance</span>
                  <span className="font-bold text-blue-600">{requestData.hospitalDistance}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-600">Your Donor Level</span>
                  <span className="font-bold text-amber-600">{donorData?.donorLevel || 'Platinum'}</span>
                </div>
              </div>
            </div>

            {/* Support Information */}
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200 rounded-2xl p-6">
              <h4 className="font-semibold text-blue-900 mb-3">Need Help?</h4>
              <div className="space-y-3">
                <button className="w-full px-4 py-3 bg-white text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors border border-blue-300 flex items-center justify-center gap-2">
                  <HelpCircle className="h-4 w-4" />
                  FAQ & Guidelines
                </button>
                <button className="w-full px-4 py-3 bg-white text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors border border-blue-300 flex items-center justify-center gap-2">
                  <PhoneCall className="h-4 w-4" />
                  24/7 Support Hotline
                </button>
                <button className="w-full px-4 py-3 bg-white text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors border border-blue-300 flex items-center justify-center gap-2">
                  <Video className="h-4 w-4" />
                  Video Consultation
                </button>
              </div>
            </div>

            {/* Desktop Quick Actions */}
            {!isMobile && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <h4 className="font-semibold text-gray-900 mb-4">Quick Actions</h4>
                <div className="grid grid-cols-2 gap-3">
                  {quickActions.map((action) => {
                    const Icon = action.icon;
                    return (
                      <button
                        key={action.id}
                        onClick={action.action}
                        className="flex flex-col items-center p-3 hover:bg-gray-50 rounded-lg transition-colors"
                      >
                        <div className={`${action.color} w-12 h-12 rounded-full flex items-center justify-center mb-2`}>
                          <Icon className="h-6 w-6 text-white" />
                        </div>
                        <span className="text-sm text-gray-700">{action.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Confirmation Modal */}
      {showConfirmationModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                {confirmationAction === 'accept' ? (
                  <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center">
                    <Check className="h-6 w-6 text-green-600" />
                  </div>
                ) : (
                  <div className="w-12 h-12 bg-gradient-to-br from-red-100 to-red-200 rounded-full flex items-center justify-center">
                    <XCircle className="h-6 w-6 text-red-600" />
                  </div>
                )}
                <div>
                  <h3 className="text-lg font-bold text-gray-900">
                    {confirmationAction === 'accept' ? 'Accept Request?' : 'Decline Request?'}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {confirmationAction === 'accept' 
                      ? 'You are about to accept this donation request.'
                      : 'Are you sure you want to decline this request?'}
                  </p>
                </div>
              </div>

              {confirmationAction === 'accept' && (
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-lg p-4 mb-4">
                  <h4 className="font-medium text-green-900 mb-2">What happens next:</h4>
                  <ul className="text-sm text-green-700 space-y-1">
                    <li>• Hospital will contact you within 30 minutes</li>
                    <li>• Transport arrangements will be made</li>
                    <li>• Medical screening at the hospital</li>
                    <li>• Total time: 2-3 hours</li>
                  </ul>
                </div>
              )}

              <div className="flex gap-3">
                <button
                  onClick={() => setShowConfirmationModal(false)}
                  className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmResponse}
                  className={`flex-1 px-4 py-3 rounded-lg font-medium text-white transition-all ${
                    confirmationAction === 'accept'
                      ? 'bg-gradient-to-r from-green-600 to-emerald-500 hover:shadow-lg hover:shadow-green-500/30'
                      : 'bg-gradient-to-r from-red-600 to-red-500 hover:shadow-lg hover:shadow-red-500/30'
                  }`}
                >
                  {confirmationAction === 'accept' ? 'Yes, Accept' : 'Yes, Decline'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Bottom Action Bar */}
      {isMobile && requestStatus === 'pending' && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg z-40">
          <div className="flex gap-3">
            <button
              onClick={() => handleResponse('accept')}
              className="flex-1 px-4 py-3 bg-gradient-to-r from-green-600 to-emerald-500 text-white rounded-lg font-bold hover:shadow-lg hover:shadow-green-500/30 transition-all flex items-center justify-center gap-2"
            >
              <Check className="h-5 w-5" />
              Accept
            </button>
            <button
              onClick={() => handleResponse('decline')}
              className="flex-1 px-4 py-3 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 rounded-lg font-bold hover:bg-gray-300 transition-all flex items-center justify-center gap-2"
            >
              <XCircle className="h-5 w-5" />
              Decline
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DonorRequestPage;