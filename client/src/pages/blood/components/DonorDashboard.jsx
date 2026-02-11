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
  Globe as GlobeIcon, Share as ShareIcon, HeartPulse
} from 'lucide-react';

const DonorDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [donorData, setDonorData] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [donationHistory, setDonationHistory] = useState([]);
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);
  const [screenSize, setScreenSize] = useState('desktop');
  const [showNotifications, setShowNotifications] = useState(false);
  const [donationType, setDonationType] = useState('all'); // 'all', 'blood', 'organ'
  const [availabilityStatus, setAvailabilityStatus] = useState('available');

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

  // Extract donor ID from URL
  const getDonorId = () => {
    const params = new URLSearchParams(location.search);
    return params.get('id') || localStorage.getItem('currentDonorId') || 'donor-unknown';
  };

  // Fetch donor data
  const fetchDonorData = useCallback(async () => {
    const donorId = getDonorId();
    setIsLoading(true);

    try {
      // First check localStorage for donor data
      const storedData = localStorage.getItem('currentUserData') || 
                        localStorage.getItem('donorData') ||
                        localStorage.getItem('donor');
      
      let data;
      
      if (storedData) {
        try {
          data = JSON.parse(storedData);
        } catch (e) {
          data = null;
        }
      }

      // If no stored data, check all user data
      if (!data) {
        const userTypes = ['bloodDonor', 'organDonor', 'patient', 'user', 'hospital'];
        for (const type of userTypes) {
          const userData = localStorage.getItem(`${type}Data`) || localStorage.getItem(type);
          if (userData) {
            try {
              const parsed = JSON.parse(userData);
              // Check if this is donor data
              if (parsed.donorId === donorId || parsed.id === donorId || 
                  localStorage.getItem('currentUserType') === 'donor') {
                data = parsed;
                break;
              }
            } catch (e) {
              continue;
            }
          }
        }
      }

      // If still no data, create demo data
      if (!data) {
        data = {
          donorId: donorId,
          name: 'Aarav Sharma',
          email: 'aarav.sharma@example.com',
          phone: '+91 98765 43210',
          bloodGroup: 'O+',
          age: 32,
          gender: 'Male',
          donorType: 'both', // 'blood', 'organ', 'both'
          address: '456 Park Avenue, Delhi, India',
          emergencyContact: '+91 98765 43211',
          primaryHospital: 'Fortis Hospital',
          registrationDate: '2023-06-15',
          status: 'Active',
          availability: 'Available',
          lastDonation: '2024-02-10',
          totalDonations: 8,
          totalLivesImpacted: 24,
          avgResponseTime: '45 mins',
          reliabilityScore: 98,
          avatarColor: 'bg-gradient-to-br from-red-500 to-orange-400',
          medicalConditions: [],
          allergies: [],
          currentMedications: [],
          height: '178 cm',
          weight: '72 kg',
          bloodPressure: '118/78 mmHg',
          organDonorRegistry: true,
          boneMarrowDonor: true,
          plasmaDonor: true,
          plateletDonor: true,
          eligibleOrgans: ['Kidney', 'Liver'],
          preferredHospitals: ['Fortis Hospital', 'Apollo Hospital', 'Max Healthcare'],
          travelRadius: '50 km',
          instantDonation: true,
          verified: true,
          donorLevel: 'Platinum',
          badges: ['Hero Donor', 'Quick Responder', 'Regular Contributor', 'Life Saver']
        };
      }

      // Ensure donorId is set
      if (!data.donorId) {
        data.donorId = donorId;
      }

      setDonorData(data);
      
      // Generate demo data for other sections
      generateDemoData(data);
      
      // Save to localStorage for consistency
      localStorage.setItem('donorData', JSON.stringify(data));
      localStorage.setItem('currentDonorId', donorId);

    } catch (error) {
      console.error('Error fetching donor data:', error);
    } finally {
      setIsLoading(false);
    }
  }, [location.search]);

  // Generate demo data
  const generateDemoData = (donorData) => {
    // Notifications
    setNotifications([
      {
        id: 1,
        type: 'urgent',
        title: 'Urgent Blood Request',
        message: 'Emergency need for O+ blood at Apollo Hospital',
        time: '15 minutes ago',
        read: false,
        icon: AlertCircle
      },
      {
        id: 2,
        type: 'match',
        title: 'Patient Match Found',
        message: 'Your organ donor profile matches a patient in need',
        time: '2 hours ago',
        read: true,
        icon: Heart
      },
      {
        id: 3,
        type: 'appointment',
        title: 'Donation Appointment',
        message: 'Your blood donation is scheduled for tomorrow',
        time: '1 day ago',
        read: true,
        icon: Calendar
      },
      {
        id: 4,
        type: 'achievement',
        title: 'New Milestone Reached!',
        message: 'You have saved 25+ lives through donations',
        time: '2 days ago',
        read: false,
        icon: Award
      }
    ]);

    // Recent Activity
    setRecentActivity([
      {
        id: 1,
        action: 'Blood Donation Completed',
        description: 'Donated 450ml at Fortis Hospital',
        time: '3 days ago',
        icon: Droplets,
        color: 'text-red-500',
        bgColor: 'bg-gradient-to-br from-red-50 to-red-100',
        impact: 'Saved 3 lives'
      },
      {
        id: 2,
        action: 'Organ Donor Registry Updated',
        description: 'Added kidney to eligible organs list',
        time: '1 week ago',
        icon: Heart,
        color: 'text-green-500',
        bgColor: 'bg-gradient-to-br from-green-50 to-green-100',
        impact: 'Potential to save 1 life'
      },
      {
        id: 3,
        action: 'Quick Response Award',
        description: 'Responded within 30 minutes to emergency',
        time: '2 weeks ago',
        icon: Zap,
        color: 'text-amber-500',
        bgColor: 'bg-gradient-to-br from-amber-50 to-amber-100',
        impact: 'Emergency situation handled'
      }
    ]);

    // Pending Requests
    setPendingRequests([
      {
        id: 1,
        patientName: 'Rahul Verma',
        patientAge: 45,
        bloodGroup: 'O+',
        organType: null,
        hospital: 'Apollo Hospital',
        distance: '12 km',
        urgency: 'Critical',
        timeRemaining: '2 hours',
        matchScore: 95,
        requestType: 'blood',
        unitsRequired: 2
      },
      {
        id: 2,
        patientName: 'Priya Singh',
        patientAge: 32,
        bloodGroup: 'O+',
        organType: 'Kidney',
        hospital: 'Fortis Hospital',
        distance: '8 km',
        urgency: 'High',
        timeRemaining: '3 days',
        matchScore: 88,
        requestType: 'organ',
        unitsRequired: null
      },
      {
        id: 3,
        patientName: 'Amit Patel',
        patientAge: 28,
        bloodGroup: 'O+',
        organType: null,
        hospital: 'Max Healthcare',
        distance: '5 km',
        urgency: 'Medium',
        timeRemaining: '1 week',
        matchScore: 92,
        requestType: 'blood',
        unitsRequired: 1
      }
    ]);

    // Donation History
    setDonationHistory([
      {
        id: 1,
        type: 'Blood Donation',
        date: '2024-02-10',
        hospital: 'Fortis Hospital',
        quantity: '450ml',
        recipient: 'Emergency patient',
        status: 'Completed',
        impact: 'Saved 3 lives',
        verified: true
      },
      {
        id: 2,
        type: 'Plasma Donation',
        date: '2024-01-25',
        hospital: 'Apollo Hospital',
        quantity: '600ml',
        recipient: 'COVID-19 patient',
        status: 'Completed',
        impact: 'Helped critical recovery',
        verified: true
      },
      {
        id: 3,
        type: 'Organ Pledge',
        date: '2024-01-10',
        hospital: 'Government Registry',
        quantity: 'Kidney',
        recipient: 'Multiple potential recipients',
        status: 'Registered',
        impact: 'Potential to save 1 life',
        verified: true
      }
    ]);

    // Upcoming Appointments
    setUpcomingAppointments([
      {
        id: 1,
        date: '2024-03-05',
        time: '10:00 AM',
        type: 'Blood Donation',
        hospital: 'Fortis Hospital',
        doctor: 'Dr. Sharma',
        duration: '45 mins',
        status: 'confirmed'
      },
      {
        id: 2,
        date: '2024-03-20',
        time: '02:30 PM',
        type: 'Health Checkup',
        hospital: 'Apollo Hospital',
        doctor: 'Dr. Gupta',
        duration: '30 mins',
        status: 'scheduled'
      },
      {
        id: 3,
        date: '2024-04-01',
        time: '11:00 AM',
        type: 'Organ Donor Counseling',
        hospital: 'Max Healthcare',
        doctor: 'Dr. Patel',
        duration: '60 mins',
        status: 'pending'
      }
    ]);
  };

  // Handle tab change
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setShowMobileMenu(false);
  };

  // Handle toggle availability
  const toggleAvailability = () => {
    const newStatus = availabilityStatus === 'available' ? 'unavailable' : 'available';
    setAvailabilityStatus(newStatus);
    
    // Update donor data
    setDonorData(prev => ({
      ...prev,
      availability: newStatus === 'available' ? 'Available' : 'Temporarily Unavailable'
    }));
  };

  // Handle accept request
  const handleAcceptRequest = (requestId) => {
    setPendingRequests(prev => 
      prev.filter(request => request.id !== requestId)
    );
    // Show success message
    alert('Request accepted successfully! You will be contacted shortly.');
  };

  // Handle view patient profile
  const handleViewPatientProfile = (patientName) => {
    navigate(`/patient/profile?name=${encodeURIComponent(patientName)}`);
  };

  // Handle download certificate
  const handleDownloadCertificate = (certificateId) => {
    // Implement download logic
    console.log('Downloading certificate:', certificateId);
  };

  // Handle share profile
  const handleShareProfile = () => {
    if (navigator.share && screenSize === 'mobile') {
      navigator.share({
        title: `${donorData.name}'s Donor Profile`,
        text: `Check out ${donorData.name}'s donor profile on HealthConnect`,
        url: window.location.href,
      });
    } else {
      // Fallback for desktop or browsers without Web Share API
      navigator.clipboard.writeText(window.location.href);
      alert('Profile link copied to clipboard!');
    }
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('donorData');
    localStorage.removeItem('currentDonorId');
    navigate('/auth?tab=login');
  };

  // Toggle notifications panel
  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  // Filter donations by type
  const filteredDonations = donationType === 'all' 
    ? donationHistory 
    : donationHistory.filter(donation => 
        donation.type.toLowerCase().includes(donationType)
      );

  // Initialize on mount
  useEffect(() => {
    fetchDonorData();
    
    // Listen for auth changes
    const handleAuthChange = () => {
      fetchDonorData();
    };
    
    window.addEventListener('authChange', handleAuthChange);
    
    return () => {
      window.removeEventListener('authChange', handleAuthChange);
    };
  }, [fetchDonorData]);

  // Dashboard tabs
  const dashboardTabs = [
    { id: 'overview', label: 'Overview', icon: Home },
    { id: 'requests', label: 'Requests', icon: Bell },
    { id: 'history', label: 'Donation History', icon: History },
    { id: 'appointments', label: 'Appointments', icon: Calendar },
    { id: 'badges', label: 'Badges', icon: Award },
    { id: 'profile', label: 'Profile', icon: User }
  ];

  // Quick stats
  const quickStats = [
    { 
      label: 'Total Donations', 
      value: donorData?.totalDonations || 0, 
      icon: Heart, 
      color: 'text-red-500', 
      bgColor: 'bg-gradient-to-br from-red-50 to-red-100',
      change: '+2 this month'
    },
    { 
      label: 'Lives Impacted', 
      value: donorData?.totalLivesImpacted || 0, 
      icon: Users, 
      color: 'text-green-500', 
      bgColor: 'bg-gradient-to-br from-green-50 to-green-100',
      change: '24+ saved'
    },
    { 
      label: 'Response Rate', 
      value: donorData?.avgResponseTime || '45 mins', 
      icon: Zap, 
      color: 'text-blue-500', 
      bgColor: 'bg-gradient-to-br from-blue-50 to-blue-100',
      change: 'Avg response time'
    },
    { 
      label: 'Reliability Score', 
      value: `${donorData?.reliabilityScore || 0}%`, 
      icon: Star, 
      color: 'text-amber-500', 
      bgColor: 'bg-gradient-to-br from-amber-50 to-amber-100',
      change: 'Excellent'
    }
  ];

  // Donor badges data
  const donorBadges = [
    { id: 1, name: 'Hero Donor', icon: ShieldCheck, color: 'text-red-500', bgColor: 'bg-gradient-to-br from-red-50 to-red-100', description: 'Saved 10+ lives', unlocked: true },
    { id: 2, name: 'Quick Responder', icon: Zap, color: 'text-blue-500', bgColor: 'bg-gradient-to-br from-blue-50 to-blue-100', description: 'Average response < 1 hour', unlocked: true },
    { id: 3, name: 'Regular Contributor', icon: Calendar, color: 'text-green-500', bgColor: 'bg-gradient-to-br from-green-50 to-green-100', description: 'Monthly donations for 6 months', unlocked: true },
    { id: 4, name: 'Life Saver', icon: Heart, color: 'text-pink-500', bgColor: 'bg-gradient-to-br from-pink-50 to-pink-100', description: 'Emergency donation hero', unlocked: true },
    { id: 5, name: 'Organ Donor Champion', icon: HeartPulse, color: 'text-purple-500', bgColor: 'bg-gradient-to-br from-purple-50 to-purple-100', description: 'Registered organ donor', unlocked: donorData?.organDonorRegistry },
    { id: 6, name: 'Plasma Pioneer', icon: Droplets, color: 'text-cyan-500', bgColor: 'bg-gradient-to-br from-cyan-50 to-cyan-100', description: 'Multiple plasma donations', unlocked: donorData?.plasmaDonor },
    { id: 7, name: 'Community Leader', icon: UsersIcon2, color: 'text-orange-500', bgColor: 'bg-gradient-to-br from-orange-50 to-orange-100', description: 'Referred 5+ donors', unlocked: false },
    { id: 8, name: 'Yearly Champion', icon: AwardIcon2, color: 'text-yellow-500', bgColor: 'bg-gradient-to-br from-yellow-50 to-yellow-100', description: 'Active for 1 year', unlocked: false },
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
          <p className="text-gray-600 mt-4 font-medium">Loading your donor dashboard...</p>
          <p className="text-gray-500 text-sm mt-2">Thank you for your lifesaving contributions</p>
        </div>
      </div>
    );
  }

  if (!donorData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
        <div className="text-center max-w-md p-8 bg-white rounded-2xl shadow-lg">
          <div className="w-20 h-20 bg-gradient-to-br from-red-100 to-red-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="h-10 w-10 text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Donor Not Found</h2>
          <p className="text-gray-600 mb-6">We couldn't find your donor profile. Please login again.</p>
          <div className="space-y-3">
            <button
              onClick={() => navigate('/auth?tab=login')}
              className="w-full px-6 py-3 bg-gradient-to-r from-red-600 to-orange-500 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-red-500/30 transition-all"
            >
              Go to Login
            </button>
            <button
              onClick={() => navigate('/')}
              className="w-full px-6 py-3 bg-white text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors border border-gray-200"
            >
              Return Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Top Header - Enhanced for Responsiveness */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-lg shadow-sm border-b border-gray-200">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left side - Logo and Navigation */}
            <div className="flex items-center flex-1">
              {isMobile && (
                <button
                  onClick={() => setShowMobileMenu(true)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors mr-2"
                >
                  <Menu className="h-5 w-5 text-gray-700" />
                </button>
              )}
              
              <button
                onClick={() => navigate('/')}
                className="flex items-center gap-2 text-gray-700 hover:text-red-600 transition-colors"
              >
                <div className="bg-gradient-to-br from-red-600 to-orange-500 p-2 rounded-lg">
                  <Heart className="h-5 w-5 text-white" />
                </div>
                <span className="hidden sm:inline font-bold text-lg">HealthConnect</span>
              </button>
              
              <div className="ml-4 sm:ml-6">
                <div className="hidden sm:block">
                  <h1 className="text-lg font-bold text-gray-900">Donor Dashboard</h1>
                  <p className="text-xs text-gray-600 hidden md:block">Save lives, make a difference</p>
                </div>
                {isTablet && (
                  <p className="text-xs text-gray-600">ID: {donorData.donorId.slice(0, 8)}...</p>
                )}
              </div>
            </div>

            {/* Right side - Actions */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Availability Toggle */}
              <button
                onClick={toggleAvailability}
                className={`hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full font-medium text-sm ${
                  availabilityStatus === 'available'
                    ? 'bg-gradient-to-r from-green-50 to-emerald-100 text-green-700 border border-green-200'
                    : 'bg-gradient-to-r from-gray-50 to-gray-100 text-gray-700 border border-gray-300'
                }`}
              >
                <div className={`w-2 h-2 rounded-full ${
                  availabilityStatus === 'available' ? 'bg-green-500 animate-pulse' : 'bg-gray-400'
                }`}></div>
                <span>{availabilityStatus === 'available' ? 'Available' : 'Unavailable'}</span>
              </button>

              {/* Notifications */}
              <div className="relative">
                <button
                  onClick={toggleNotifications}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative"
                >
                  <Bell className="h-5 w-5 text-gray-700" />
                  {notifications.filter(n => !n.read).length > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                      {notifications.filter(n => !n.read).length}
                    </span>
                  )}
                </button>

                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50">
                    <div className="px-4 py-2 border-b border-gray-200">
                      <h3 className="font-semibold text-gray-900">Notifications</h3>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {notifications.map(notification => {
                        const Icon = notification.icon;
                        return (
                          <div
                            key={notification.id}
                            className={`px-4 py-3 hover:bg-gray-50 cursor-pointer border-l-4 ${
                              notification.read ? 'border-transparent' : 'border-red-500'
                            }`}
                            onClick={() => {
                              handleNotificationClick(notification.id);
                              setShowNotifications(false);
                            }}
                          >
                            <div className="flex items-start gap-3">
                              <div className={`p-2 rounded-lg ${
                                notification.type === 'urgent' ? 'bg-red-50' :
                                notification.type === 'match' ? 'bg-green-50' :
                                notification.type === 'appointment' ? 'bg-blue-50' : 'bg-amber-50'
                              }`}>
                                <Icon className={`h-5 w-5 ${
                                  notification.type === 'urgent' ? 'text-red-600' :
                                  notification.type === 'match' ? 'text-green-600' :
                                  notification.type === 'appointment' ? 'text-blue-600' : 'text-amber-600'
                                }`} />
                              </div>
                              <div className="flex-1">
                                <h4 className="font-medium text-gray-900 text-sm">{notification.title}</h4>
                                <p className="text-gray-600 text-xs mt-1">{notification.message}</p>
                                <p className="text-gray-500 text-xs mt-2">{notification.time}</p>
                              </div>
                              {!notification.read && (
                                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Share Profile Button */}
              <button
                onClick={handleShareProfile}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                title="Share Profile"
              >
                <ShareIcon className="h-5 w-5 text-gray-700" />
              </button>
            </div>
          </div>

          {/* Mobile Tabs - Only shown on mobile */}
          {isMobile && (
            <div className="pb-2 overflow-x-auto">
              <div className="flex space-x-1">
                {dashboardTabs.slice(0, 4).map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  
                  return (
                    <button
                      key={tab.id}
                      onClick={() => handleTabChange(tab.id)}
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

      <div className="flex flex-col lg:flex-row">
        {/* Sidebar - Desktop & Tablet */}
        {!isMobile && (
          <aside className="lg:w-72 bg-white border-r border-gray-200">
            {/* Donor Profile Card */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="relative">
                  <div className={`w-16 h-16 ${donorData.avatarColor || 'bg-gradient-to-br from-red-500 to-orange-400'} rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg`}>
                    {donorData.name?.charAt(0) || 'D'}
                  </div>
                  {donorData.verified && (
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-to-br from-green-500 to-emerald-400 rounded-full flex items-center justify-center border-2 border-white">
                      <CheckCircle className="h-3 w-3 text-white" />
                    </div>
                  )}
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">{donorData.name}</h3>
                  <p className="text-sm text-gray-600">Donor ID: {donorData.donorId}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="px-2 py-1 bg-gradient-to-r from-red-100 to-red-200 text-red-700 text-xs font-bold rounded-full">
                      {donorData.bloodGroup || 'N/A'}
                    </div>
                    <span className="text-xs text-gray-500">{donorData.donorType === 'both' ? 'Blood & Organ' : donorData.donorType} Donor</span>
                  </div>
                </div>
              </div>
              
              {/* Availability Status */}
              <div className="mb-4">
                <div className={`flex items-center justify-between p-3 rounded-lg ${
                  availabilityStatus === 'available'
                    ? 'bg-gradient-to-r from-green-50 to-emerald-100 border border-green-200'
                    : 'bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-300'
                }`}>
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${
                      availabilityStatus === 'available' ? 'bg-green-500 animate-pulse' : 'bg-gray-400'
                    }`}></div>
                    <span className={`text-sm font-medium ${
                      availabilityStatus === 'available' ? 'text-green-700' : 'text-gray-700'
                    }`}>
                      {availabilityStatus === 'available' ? 'Available to Donate' : 'Temporarily Unavailable'}
                    </span>
                  </div>
                  <button
                    onClick={toggleAvailability}
                    className="text-xs font-medium text-blue-600 hover:text-blue-700"
                  >
                    {availabilityStatus === 'available' ? 'Set Unavailable' : 'Set Available'}
                  </button>
                </div>
              </div>
              
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2 text-gray-700 p-2 bg-gray-50 rounded-lg">
                  <MapPin className="h-4 w-4 text-blue-500" />
                  <span className="truncate">{donorData.travelRadius || '50 km'} radius</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700 p-2 bg-gray-50 rounded-lg">
                  <Clock className="h-4 w-4 text-amber-500" />
                  <span className="truncate">Last donation: {donorData.lastDonation || 'N/A'}</span>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <nav className="p-4">
              <ul className="space-y-2">
                {dashboardTabs.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  
                  return (
                    <li key={tab.id}>
                      <button
                        onClick={() => handleTabChange(tab.id)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                          isActive
                            ? 'bg-gradient-to-r from-red-50 to-orange-50 text-red-600 font-semibold border border-red-200'
                            : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                        }`}
                      >
                        <Icon className="h-5 w-5" />
                        <span>{tab.label}</span>
                        {isActive && (
                          <ChevronRight className="h-4 w-4 ml-auto text-red-500" />
                        )}
                      </button>
                    </li>
                  );
                })}
              </ul>
              
              {/* Quick Stats Card */}
              <div className="mt-6 p-4 bg-gradient-to-br from-blue-50 to-cyan-100 rounded-xl border border-blue-200">
                <h4 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
                  <TrendingUpIcon className="h-4 w-4" />
                  This Month's Impact
                </h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-blue-700">Donations</span>
                    <span className="font-bold text-blue-900">2</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-blue-700">Lives Saved</span>
                    <span className="font-bold text-blue-900">6</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-blue-700">Response Rate</span>
                    <span className="font-bold text-blue-900">100%</span>
                  </div>
                </div>
              </div>
            </nav>
          </aside>
        )}

        {/* Main Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {/* Welcome Banner - Responsive */}
          <div className="mb-6 lg:mb-8">
            <div className="bg-gradient-to-r from-red-600 to-orange-500 rounded-2xl p-6 text-white">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold mb-2">
                    Welcome back, {donorData.name}!
                  </h1>
                  <p className="text-red-100">
                    {isMobile 
                      ? "You've saved {donorData.totalLivesImpacted || 0} lives"
                      : `Thank you for your lifesaving contributions. You've saved ${donorData.totalLivesImpacted || 0} lives so far!`}
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <button className="px-4 py-2.5 bg-white text-red-600 rounded-lg font-bold hover:bg-red-50 transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl">
                    <QrCode className="h-4 w-4" />
                    <span>Donor ID Card</span>
                  </button>
                  <button className="px-4 py-2.5 bg-white/20 backdrop-blur-sm text-white rounded-lg font-bold hover:bg-white/30 transition-all flex items-center justify-center gap-2">
                    <AwardIcon className="h-4 w-4" />
                    <span>Achievements</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats Grid - Responsive Layout */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 lg:mb-8">
            {quickStats.map((stat, index) => {
              const Icon = stat.icon;
              
              return (
                <div key={index} className="bg-white rounded-xl p-4 sm:p-5 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-2">
                    <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                      <Icon className={`h-5 w-5 ${stat.color}`} />
                    </div>
                    <span className="text-xs font-medium text-green-600">{stat.change}</span>
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-gray-600">{stat.label}</p>
                    <p className="text-xl sm:text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Availability Toggle - Mobile Only */}
          {isMobile && (
            <div className="mb-6">
              <div className={`flex items-center justify-between p-4 rounded-xl ${
                availabilityStatus === 'available'
                  ? 'bg-gradient-to-r from-green-50 to-emerald-100 border border-green-200'
                  : 'bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-300'
              }`}>
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${
                    availabilityStatus === 'available' ? 'bg-green-500 animate-pulse' : 'bg-gray-400'
                  }`}></div>
                  <div>
                    <p className="font-medium text-gray-900">
                      {availabilityStatus === 'available' ? 'Available to Donate' : 'Temporarily Unavailable'}
                    </p>
                    <p className="text-xs text-gray-600">
                      {availabilityStatus === 'available' 
                        ? 'Patients can request your help' 
                        : 'You will not receive new requests'}
                    </p>
                  </div>
                </div>
                <button
                  onClick={toggleAvailability}
                  className="px-4 py-2 text-sm font-medium bg-white text-blue-600 rounded-lg border border-blue-200 hover:bg-blue-50"
                >
                  {availabilityStatus === 'available' ? 'Set Unavailable' : 'Set Available'}
                </button>
              </div>
            </div>
          )}

          {/* Main Dashboard Content */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            {/* Tab Content */}
            <div className="p-4 sm:p-6">
              {/* Overview Tab */}
              {activeTab === 'overview' && (
                <div className="space-y-6 sm:space-y-8">
                  {/* Emergency Requests */}
                  <div className="bg-gradient-to-br from-red-50 to-orange-50 border border-red-200 rounded-xl p-4 sm:p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-red-900">Emergency Requests Nearby</h3>
                        <p className="text-red-700 text-sm">Patients urgently need your help</p>
                      </div>
                      <span className="px-3 py-1 bg-red-100 text-red-700 text-sm font-bold rounded-full">
                        {pendingRequests.filter(r => r.urgency === 'Critical').length} Critical
                      </span>
                    </div>
                    
                    <div className="space-y-3">
                      {pendingRequests
                        .filter(request => request.urgency === 'Critical')
                        .slice(0, 2)
                        .map((request) => (
                          <div key={request.id} className="bg-white border border-red-200 rounded-lg p-4">
                            <div className="flex items-start justify-between">
                              <div>
                                <div className="flex items-center gap-2 mb-2">
                                  <h4 className="font-bold text-gray-900">{request.patientName}</h4>
                                  <span className="px-2 py-1 bg-red-100 text-red-700 text-xs font-bold rounded">
                                    {request.bloodGroup}
                                  </span>
                                  {request.organType && (
                                    <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-bold rounded">
                                      {request.organType}
                                    </span>
                                  )}
                                </div>
                                <div className="flex flex-wrap gap-3 text-sm text-gray-600">
                                  <span className="flex items-center gap-1">
                                    <MapPin className="h-3 w-3" />
                                    {request.hospital} ({request.distance})
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <Clock className="h-3 w-3" />
                                    {request.timeRemaining} remaining
                                  </span>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="text-lg font-bold text-red-600">{request.matchScore}%</div>
                                <div className="text-xs text-gray-600">Match</div>
                              </div>
                            </div>
                            <div className="flex gap-2 mt-4">
                              <button
                                onClick={() => handleAcceptRequest(request.id)}
                                className="flex-1 px-4 py-2 bg-gradient-to-r from-red-600 to-orange-500 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-red-500/30 transition-all text-sm"
                              >
                                Accept Request
                              </button>
                              <button
                                onClick={() => handleViewPatientProfile(request.patientName)}
                                className="px-4 py-2 bg-white text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors text-sm border border-gray-300"
                              >
                                Details
                              </button>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>

                  {/* Recent Activity & Upcoming Appointments Side by Side on Desktop */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Recent Activity */}
                    <div className="bg-gray-50 rounded-xl p-4 sm:p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
                        <button
                          onClick={() => handleTabChange('history')}
                          className="text-red-600 hover:text-red-700 font-medium text-sm flex items-center gap-1"
                        >
                          View All
                          <ChevronRight className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="space-y-3">
                        {recentActivity.map((activity) => {
                          const Icon = activity.icon;
                          
                          return (
                            <div key={activity.id} className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                              <div className={`p-2 rounded-lg ${activity.bgColor}`}>
                                <Icon className={`h-5 w-5 ${activity.color}`} />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="font-medium text-gray-900 truncate">{activity.action}</p>
                                <p className="text-sm text-gray-600 truncate">{activity.description}</p>
                                <p className="text-xs text-green-600 font-medium mt-1">{activity.impact}</p>
                              </div>
                              <span className="text-xs text-gray-500 whitespace-nowrap">{activity.time}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Upcoming Appointments */}
                    <div className="bg-gray-50 rounded-xl p-4 sm:p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">Upcoming Appointments</h3>
                        <button
                          onClick={() => handleTabChange('appointments')}
                          className="text-red-600 hover:text-red-700 font-medium text-sm flex items-center gap-1"
                        >
                          View All
                          <ChevronRight className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="space-y-3">
                        {upcomingAppointments.slice(0, 3).map((appointment) => (
                          <div key={appointment.id} className="bg-white rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <div className={`p-2 rounded-lg ${
                                  appointment.type === 'Blood Donation' ? 'bg-red-100' :
                                  appointment.type === 'Health Checkup' ? 'bg-blue-100' :
                                  'bg-green-100'
                                }`}>
                                  <Calendar className={`h-4 w-4 ${
                                    appointment.type === 'Blood Donation' ? 'text-red-600' :
                                    appointment.type === 'Health Checkup' ? 'text-blue-600' :
                                    'text-green-600'
                                  }`} />
                                </div>
                                <div>
                                  <h4 className="font-semibold text-gray-900 text-sm">{appointment.type}</h4>
                                  <p className="text-xs text-gray-600">{appointment.hospital}</p>
                                </div>
                              </div>
                              <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                                appointment.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                                appointment.status === 'scheduled' ? 'bg-blue-100 text-blue-700' :
                                'bg-amber-100 text-amber-700'
                              }`}>
                                {appointment.status}
                              </span>
                            </div>
                            <div className="flex items-center justify-between text-xs text-gray-600">
                              <span className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                {appointment.date} at {appointment.time}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {appointment.duration}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Requests Tab */}
              {activeTab === 'requests' && (
                <div>
                  <div className="mb-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900">Patient Requests</h2>
                        <p className="text-gray-600">Patients matching your donor profile need your help</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex bg-gray-100 p-1 rounded-lg">
                          <button
                            onClick={() => setDonationType('all')}
                            className={`px-3 py-1.5 text-sm font-medium rounded-md ${
                              donationType === 'all' 
                                ? 'bg-white text-gray-900 shadow-sm' 
                                : 'text-gray-700 hover:text-gray-900'
                            }`}
                          >
                            All
                          </button>
                          <button
                            onClick={() => setDonationType('blood')}
                            className={`px-3 py-1.5 text-sm font-medium rounded-md ${
                              donationType === 'blood' 
                                ? 'bg-white text-red-600 shadow-sm' 
                                : 'text-gray-700 hover:text-red-600'
                            }`}
                          >
                            Blood
                          </button>
                          <button
                            onClick={() => setDonationType('organ')}
                            className={`px-3 py-1.5 text-sm font-medium rounded-md ${
                              donationType === 'organ' 
                                ? 'bg-white text-green-600 shadow-sm' 
                                : 'text-gray-700 hover:text-green-600'
                            }`}
                          >
                            Organ
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {pendingRequests
                      .filter(request => 
                        donationType === 'all' || 
                        request.requestType === donationType
                      )
                      .map((request) => (
                        <div key={request.id} className="bg-white border border-gray-200 rounded-xl p-4 sm:p-6 hover:shadow-md transition-shadow">
                          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                            {/* Request Info */}
                            <div className="flex-1">
                              <div className="flex items-start gap-3 mb-3">
                                <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-xl flex items-center justify-center">
                                  <User className="h-6 w-6 text-blue-600" />
                                </div>
                                <div>
                                  <div className="flex items-center gap-2 mb-2">
                                    <h4 className="font-bold text-gray-900 text-lg">{request.patientName}</h4>
                                    <span className="text-gray-600">• {request.patientAge} years</span>
                                    <span className={`px-2 py-1 text-xs font-bold rounded-full ${
                                      request.urgency === 'Critical' ? 'bg-red-100 text-red-700' :
                                      request.urgency === 'High' ? 'bg-orange-100 text-orange-700' :
                                      'bg-blue-100 text-blue-700'
                                    }`}>
                                      {request.urgency} Priority
                                    </span>
                                  </div>
                                  
                                  <div className="flex flex-wrap gap-3 mt-2">
                                    <div className="flex items-center gap-2">
                                      <span className="px-3 py-1 bg-gradient-to-r from-red-100 to-red-200 text-red-700 text-sm font-bold rounded-full">
                                        {request.bloodGroup}
                                      </span>
                                      {request.requestType === 'blood' && (
                                        <span className="text-sm text-gray-700">{request.unitsRequired} unit(s) needed</span>
                                      )}
                                    </div>
                                    {request.organType && (
                                      <div className="flex items-center gap-2">
                                        <span className="px-3 py-1 bg-gradient-to-r from-green-100 to-green-200 text-green-700 text-sm font-bold rounded-full">
                                          {request.organType}
                                        </span>
                                        <span className="text-sm text-gray-700">Organ needed</span>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                              
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
                                <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-3 rounded-lg">
                                  <p className="text-xs text-gray-600">Hospital</p>
                                  <p className="text-sm font-bold text-gray-900 truncate">{request.hospital}</p>
                                </div>
                                <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-3 rounded-lg">
                                  <p className="text-xs text-gray-600">Distance</p>
                                  <p className="text-sm font-bold text-gray-900">{request.distance}</p>
                                </div>
                                <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-3 rounded-lg">
                                  <p className="text-xs text-gray-600">Time Remaining</p>
                                  <p className="text-sm font-bold text-gray-900">{request.timeRemaining}</p>
                                </div>
                                <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-3 rounded-lg">
                                  <p className="text-xs text-gray-600">Match Score</p>
                                  <p className="text-sm font-bold text-green-600">{request.matchScore}%</p>
                                </div>
                              </div>
                            </div>
                            
                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row lg:flex-col gap-2 min-w-[200px]">
                              <button
                                onClick={() => handleAcceptRequest(request.id)}
                                className="px-4 py-3 bg-gradient-to-r from-red-600 to-orange-500 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-red-500/30 transition-all"
                              >
                                Accept Request
                              </button>
                              <div className="flex gap-2">
                                <button
                                  onClick={() => handleViewPatientProfile(request.patientName)}
                                  className="flex-1 px-4 py-2.5 bg-white text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors border border-blue-200"
                                >
                                  View Profile
                                </button>
                                <button className="px-4 py-2.5 bg-white text-gray-600 rounded-lg font-medium hover:bg-gray-50 transition-colors border border-gray-300">
                                  Decline
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                  
                  {pendingRequests.length === 0 && (
                    <div className="text-center py-12">
                      <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle className="h-10 w-10 text-green-500" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">No Pending Requests</h3>
                      <p className="text-gray-600 mb-6">You're all caught up! New requests will appear here when patients need your help.</p>
                      <p className="text-sm text-gray-500">Make sure your availability is set to "Available" to receive new requests.</p>
                    </div>
                  )}
                </div>
              )}

              {/* Donation History Tab */}
              {activeTab === 'history' && (
                <div>
                  <div className="mb-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900">Donation History</h2>
                        <p className="text-gray-600">Track all your lifesaving contributions</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="px-4 py-2 bg-gradient-to-br from-blue-50 to-blue-100 text-blue-600 rounded-lg font-medium hover:from-blue-100 hover:to-blue-200 transition-all flex items-center gap-2">
                          <Download className="h-4 w-4" />
                          Export History
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Stats Summary */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                    <div className="bg-gradient-to-br from-red-50 to-red-100 border border-red-200 rounded-xl p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-red-700">Total Donations</p>
                          <p className="text-2xl font-bold text-red-900">{donorData.totalDonations || 0}</p>
                        </div>
                        <Heart className="h-8 w-8 text-red-400" />
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-xl p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-green-700">Lives Impacted</p>
                          <p className="text-2xl font-bold text-green-900">{donorData.totalLivesImpacted || 0}</p>
                        </div>
                        <Users className="h-8 w-8 text-green-400" />
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-amber-50 to-amber-100 border border-amber-200 rounded-xl p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-amber-700">Donor Level</p>
                          <p className="text-2xl font-bold text-amber-900">{donorData.donorLevel || 'Platinum'}</p>
                        </div>
                        <AwardIcon className="h-8 w-8 text-amber-400" />
                      </div>
                    </div>
                  </div>

                  {/* History List */}
                  <div className="space-y-3">
                    {filteredDonations.map((donation) => (
                      <div key={donation.id} className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3">
                              <div className={`p-3 rounded-lg ${
                                donation.type.includes('Blood') ? 'bg-gradient-to-br from-red-50 to-red-100' :
                                donation.type.includes('Plasma') ? 'bg-gradient-to-br from-blue-50 to-blue-100' :
                                'bg-gradient-to-br from-green-50 to-green-100'
                              }`}>
                                {donation.type.includes('Blood') ? (
                                  <Droplets className="h-6 w-6 text-red-600" />
                                ) : donation.type.includes('Plasma') ? (
                                  <Activity className="h-6 w-6 text-blue-600" />
                                ) : (
                                  <Heart className="h-6 w-6 text-green-600" />
                                )}
                              </div>
                              <div>
                                <h4 className="font-semibold text-gray-900">{donation.type}</h4>
                                <div className="flex flex-wrap gap-3 mt-2 text-sm text-gray-600">
                                  <span className="flex items-center gap-1">
                                    <Calendar className="h-3 w-3" />
                                    {donation.date}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <MapPin className="h-3 w-3" />
                                    {donation.hospital}
                                  </span>
                                  {donation.quantity && (
                                    <span className="flex items-center gap-1">
                                      <BarChart3 className="h-3 w-3" />
                                      {donation.quantity}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-3">
                            <div className="text-right">
                              <p className="text-sm font-medium text-green-700">{donation.impact}</p>
                              <p className="text-xs text-gray-600">Recipient: {donation.recipient}</p>
                            </div>
                            <div className="flex gap-1">
                              {donation.verified && (
                                <div className="p-2 text-green-600" title="Verified">
                                  <CheckCircle className="h-5 w-5" />
                                </div>
                              )}
                              <button
                                onClick={() => handleDownloadCertificate(donation.id)}
                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                title="Download Certificate"
                              >
                                <Download className="h-5 w-5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Appointments Tab */}
              {activeTab === 'appointments' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Appointments</h2>
                  
                  <div className="mb-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">Your Appointments</h3>
                        <p className="text-gray-600">Manage your donation and health checkup appointments</p>
                      </div>
                      <button className="px-4 py-2 bg-gradient-to-r from-red-600 to-orange-500 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-red-500/30 transition-all flex items-center gap-2">
                        <Plus className="h-4 w-4" />
                        Schedule New
                      </button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {upcomingAppointments.map((appointment) => (
                      <div key={appointment.id} className="bg-white border border-gray-200 rounded-xl p-4 sm:p-6 hover:shadow-md transition-shadow">
                        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                          <div className="flex-1">
                            <div className="flex items-center gap-4">
                              <div className={`p-4 rounded-lg ${
                                appointment.type === 'Blood Donation' ? 'bg-gradient-to-br from-red-100 to-red-200' :
                                appointment.type === 'Health Checkup' ? 'bg-gradient-to-br from-blue-100 to-blue-200' :
                                'bg-gradient-to-br from-green-100 to-green-200'
                              }`}>
                                {appointment.type === 'Blood Donation' ? (
                                  <Droplets className="h-6 w-6 text-red-600" />
                                ) : appointment.type === 'Health Checkup' ? (
                                  <Stethoscope className="h-6 w-6 text-blue-600" />
                                ) : (
                                  <Heart className="h-6 w-6 text-green-600" />
                                )}
                              </div>
                              <div>
                                <h4 className="font-bold text-gray-900 text-lg">{appointment.type}</h4>
                                <div className="flex flex-wrap gap-3 mt-2">
                                  <span className="flex items-center gap-2 text-sm text-gray-700 bg-gray-50 px-3 py-1 rounded-lg">
                                    <Calendar className="h-4 w-4" />
                                    {appointment.date} at {appointment.time}
                                  </span>
                                  <span className="flex items-center gap-2 text-sm text-gray-700 bg-gray-50 px-3 py-1 rounded-lg">
                                    <User className="h-4 w-4" />
                                    {appointment.doctor}
                                  </span>
                                  <span className="flex items-center gap-2 text-sm text-gray-700 bg-gray-50 px-3 py-1 rounded-lg">
                                    <MapPin className="h-4 w-4" />
                                    {appointment.hospital}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex flex-col gap-2 min-w-[180px]">
                            <span className={`px-3 py-1 text-sm font-medium rounded-full text-center ${
                              appointment.status === 'confirmed' ? 'bg-gradient-to-br from-green-100 to-green-200 text-green-700' :
                              appointment.status === 'scheduled' ? 'bg-gradient-to-br from-blue-100 to-blue-200 text-blue-700' :
                              'bg-gradient-to-br from-amber-100 to-amber-200 text-amber-700'
                            }`}>
                              {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                            </span>
                            <div className="flex gap-2">
                              <button className="flex-1 px-3 py-2 bg-gradient-to-r from-red-600 to-orange-500 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-red-500/30 transition-all text-sm">
                                View Details
                              </button>
                              <button className="px-3 py-2 bg-white text-red-600 rounded-lg font-semibold hover:bg-red-50 transition-colors text-sm border border-red-200">
                                Reschedule
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Badges Tab */}
              {activeTab === 'badges' && (
                <div>
                  <div className="mb-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900">Achievements & Badges</h2>
                        <p className="text-gray-600">Your lifesaving achievements and recognition</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="px-4 py-2 bg-gradient-to-br from-amber-50 to-amber-100 text-amber-700 rounded-lg font-bold">
                          {donorData.donorLevel || 'Platinum'} Donor
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Badges Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-8">
                    {donorBadges.map((badge) => {
                      const Icon = badge.icon;
                      return (
                        <div 
                          key={badge.id} 
                          className={`bg-white border rounded-xl p-4 text-center transition-all ${
                            badge.unlocked 
                              ? 'border-amber-200 shadow-sm hover:shadow-md' 
                              : 'border-gray-200 opacity-50'
                          }`}
                        >
                          <div className={`w-16 h-16 ${badge.bgColor} rounded-full flex items-center justify-center mx-auto mb-3`}>
                            <Icon className={`h-8 w-8 ${badge.color}`} />
                          </div>
                          <h4 className="font-semibold text-gray-900 mb-1">{badge.name}</h4>
                          <p className="text-xs text-gray-600 mb-2">{badge.description}</p>
                          {badge.unlocked ? (
                            <span className="inline-block px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                              Unlocked
                            </span>
                          ) : (
                            <span className="inline-block px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
                              Locked
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Milestones */}
                  <div className="bg-gradient-to-br from-red-50 to-orange-50 border border-red-200 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-red-900 mb-4">Milestone Progress</h3>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium text-red-700">Next Donation Level</span>
                          <span className="text-sm font-bold text-red-900">2/5 donations</span>
                        </div>
                        <div className="w-full bg-red-100 rounded-full h-2.5">
                          <div className="bg-gradient-to-r from-red-500 to-orange-500 h-2.5 rounded-full" style={{ width: '40%' }}></div>
                        </div>
                        <p className="text-xs text-red-600 mt-1">Complete 5 donations to reach Diamond Level</p>
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium text-red-700">Organ Donor Registry</span>
                          <span className="text-sm font-bold text-green-700">Registered</span>
                        </div>
                        <div className="w-full bg-green-100 rounded-full h-2.5">
                          <div className="bg-gradient-to-r from-green-500 to-emerald-500 h-2.5 rounded-full" style={{ width: '100%' }}></div>
                        </div>
                        <p className="text-xs text-green-600 mt-1">Thank you for being an organ donor!</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Profile Tab */}
              {activeTab === 'profile' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Profile Settings</h2>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Profile Information */}
                    <div className="lg:col-span-2">
                      <div className="bg-white border border-gray-200 rounded-xl p-6">
                        <div className="flex items-center justify-between mb-6">
                          <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
                          <button className="flex items-center gap-2 text-red-600 hover:text-red-700">
                            <Edit className="h-4 w-4" />
                            <span className="font-medium">Edit</span>
                          </button>
                        </div>
                        
                        <div className="space-y-6">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                              <input
                                type="text"
                                defaultValue={donorData.name}
                                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                              <input
                                type="email"
                                defaultValue={donorData.email}
                                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                              />
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                              <input
                                type="tel"
                                defaultValue={donorData.phone}
                                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Blood Group</label>
                              <select
                                defaultValue={donorData.bloodGroup}
                                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                              >
                                <option value="">Select Blood Group</option>
                                <option value="A+">A+</option>
                                <option value="A-">A-</option>
                                <option value="B+">B+</option>
                                <option value="B-">B-</option>
                                <option value="O+">O+</option>
                                <option value="O-">O-</option>
                                <option value="AB+">AB+</option>
                                <option value="AB-">AB-</option>
                              </select>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Donor Type</label>
                              <select
                                defaultValue={donorData.donorType}
                                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                              >
                                <option value="blood">Blood Donor</option>
                                <option value="organ">Organ Donor</option>
                                <option value="both">Both (Blood & Organ)</option>
                              </select>
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Travel Radius</label>
                              <select
                                defaultValue={donorData.travelRadius || '50 km'}
                                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                              >
                                <option value="10 km">Within 10 km</option>
                                <option value="25 km">Within 25 km</option>
                                <option value="50 km">Within 50 km</option>
                                <option value="100 km">Within 100 km</option>
                                <option value="any">Any Distance</option>
                              </select>
                            </div>
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                            <textarea
                              defaultValue={donorData.address}
                              rows="3"
                              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                            />
                          </div>
                          
                          <div className="pt-6 border-t border-gray-200">
                            <div className="flex gap-3">
                              <button className="px-6 py-2.5 bg-gradient-to-r from-red-600 to-orange-500 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-red-500/30 transition-all">
                                Save Changes
                              </button>
                              <button className="px-6 py-2.5 bg-white text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors border border-gray-300">
                                Cancel
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Account Info */}
                    <div className="space-y-6">
                      <div className="bg-white border border-gray-200 rounded-xl p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Information</h3>
                        
                        <div className="space-y-4">
                          <div className="flex items-center justify-between py-2 border-b border-gray-100">
                            <span className="text-sm text-gray-600">Donor ID</span>
                            <span className="font-medium text-gray-900">{donorData.donorId}</span>
                          </div>
                          
                          <div className="flex items-center justify-between py-2 border-b border-gray-100">
                            <span className="text-sm text-gray-600">Registration Date</span>
                            <span className="font-medium text-gray-900">{donorData.registrationDate || '2023-06-15'}</span>
                          </div>
                          
                          <div className="flex items-center justify-between py-2 border-b border-gray-100">
                            <span className="text-sm text-gray-600">Status</span>
                            <span className="px-3 py-1 bg-gradient-to-br from-green-100 to-green-200 text-green-700 text-sm font-medium rounded-full">
                              {donorData.status || 'Active'}
                            </span>
                          </div>
                          
                          <div className="flex items-center justify-between py-2">
                            <span className="text-sm text-gray-600">Verification</span>
                            <span className={`px-3 py-1 text-sm font-medium rounded-full ${
                              donorData.verified 
                                ? 'bg-gradient-to-br from-green-100 to-green-200 text-green-700' 
                                : 'bg-gradient-to-br from-amber-100 to-amber-200 text-amber-700'
                            }`}>
                              {donorData.verified ? 'Verified' : 'Pending'}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-white border border-gray-200 rounded-xl p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                        
                        <div className="space-y-3">
                          <button className="w-full px-4 py-3 bg-gradient-to-br from-red-50 to-orange-100 text-red-600 rounded-lg font-medium hover:from-red-100 hover:to-orange-200 transition-all flex items-center gap-3">
                            <Settings className="h-5 w-5" />
                            <span>Donation Preferences</span>
                          </button>
                          
                          <button className="w-full px-4 py-3 bg-gradient-to-br from-blue-50 to-blue-100 text-blue-600 rounded-lg font-medium hover:from-blue-100 hover:to-blue-200 transition-all flex items-center gap-3">
                            <Shield className="h-5 w-5" />
                            <span>Privacy Settings</span>
                          </button>
                          
                          <button className="w-full px-4 py-3 bg-gradient-to-br from-green-50 to-green-100 text-green-600 rounded-lg font-medium hover:from-green-100 hover:to-green-200 transition-all flex items-center gap-3">
                            <FileText className="h-5 w-5" />
                            <span>Download Certificates</span>
                          </button>
                          
                          <button
                            onClick={handleLogout}
                            className="w-full px-4 py-3 bg-gradient-to-br from-gray-100 to-gray-200 text-gray-700 rounded-lg font-medium hover:from-gray-200 hover:to-gray-300 transition-all flex items-center gap-3 mt-4"
                          >
                            <LogOut className="h-5 w-5" />
                            <span>Logout</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Footer - Mobile Only */}
          {isMobile && (
            <div className="mt-6 pt-4 border-t border-gray-200">
              <div className="text-center text-sm text-gray-600">
                <p>HealthConnect Donor Portal v2.0</p>
                <p className="text-xs text-gray-500 mt-1">Thank you for being a lifesaver!</p>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Mobile Menu Overlay */}
      {showMobileMenu && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowMobileMenu(false)}
          />
          <div className="absolute left-0 top-0 bottom-0 w-72 bg-white shadow-2xl animate-slideIn">
            {/* Donor Profile in Mobile Menu */}
            <div className="p-6 bg-gradient-to-br from-red-600 to-orange-500 text-white">
              <div className="flex items-center gap-3 mb-4">
                <div className="relative">
                  <div className={`w-14 h-14 ${donorData.avatarColor || 'bg-gradient-to-br from-red-400 to-orange-300'} rounded-xl flex items-center justify-center font-bold text-xl shadow-lg`}>
                    {donorData.name?.charAt(0) || 'D'}
                  </div>
                  {donorData.verified && (
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center border-2 border-white">
                      <CheckCircle className="h-2 w-2 text-white" />
                    </div>
                  )}
                </div>
                <div>
                  <h3 className="font-bold text-lg">{donorData.name}</h3>
                  <p className="text-red-100 text-sm">{donorData.donorType === 'both' ? 'Blood & Organ Donor' : donorData.donorType} Donor</p>
                </div>
              </div>
              <button
                onClick={() => {
                  handleTabChange('profile');
                  setShowMobileMenu(false);
                }}
                className="w-full px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg font-medium text-sm"
              >
                Edit Profile
              </button>
            </div>
            
            {/* Mobile Navigation */}
            <nav className="p-4">
              <ul className="space-y-1">
                {dashboardTabs.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  
                  return (
                    <li key={tab.id}>
                      <button
                        onClick={() => handleTabChange(tab.id)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                          isActive
                            ? 'bg-gradient-to-r from-red-50 to-orange-50 text-red-600 font-semibold border border-red-200'
                            : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                        }`}
                      >
                        <Icon className="h-5 w-5" />
                        <span>{tab.label}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>

              {/* Quick Stats */}
              <div className="mt-6 p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl">
                <h4 className="font-semibold text-gray-900 mb-3">Your Impact</h4>
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-white p-3 rounded-lg text-center">
                    <p className="text-xs text-gray-600">Donations</p>
                    <p className="text-lg font-bold text-gray-900">{donorData.totalDonations || 0}</p>
                  </div>
                  <div className="bg-white p-3 rounded-lg text-center">
                    <p className="text-xs text-gray-600">Lives Saved</p>
                    <p className="text-lg font-bold text-gray-900">{donorData.totalLivesImpacted || 0}</p>
                  </div>
                </div>
              </div>
            </nav>
          </div>
        </div>
      )}
    </div>
  );
};

export default DonorDashboard;