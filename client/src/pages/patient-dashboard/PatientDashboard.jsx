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
  BatteryCharging, RefreshCw, Cloud, Database
} from 'lucide-react';

const PatientDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [patientData, setPatientData] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);
  const [donorMatches, setDonorMatches] = useState([]);
  const [medicalRecords, setMedicalRecords] = useState([]);
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);
  const [screenSize, setScreenSize] = useState('desktop');
  const [showNotifications, setShowNotifications] = useState(false);

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

  // Extract patient ID from URL
  const getPatientId = () => {
    const params = new URLSearchParams(location.search);
    return params.get('id') || localStorage.getItem('currentPatientId') || 'patient-unknown';
  };

  // Fetch patient data
  const fetchPatientData = useCallback(async () => {
    const patientId = getPatientId();
    setIsLoading(true);

    try {
      // First check localStorage for patient data
      const storedData = localStorage.getItem('currentUserData') || 
                        localStorage.getItem('patientData') ||
                        localStorage.getItem('patient');
      
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
        const userTypes = ['patient', 'bloodDonor', 'organDonor', 'user', 'hospital'];
        for (const type of userTypes) {
          const userData = localStorage.getItem(`${type}Data`) || localStorage.getItem(type);
          if (userData) {
            try {
              const parsed = JSON.parse(userData);
              // Check if this is patient data
              if (parsed.patientId === patientId || parsed.id === patientId || 
                  localStorage.getItem('currentUserType') === 'patient') {
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
          patientId: patientId,
          name: 'John Doe',
          email: 'john.doe@example.com',
          phone: '+91 98765 43210',
          bloodGroup: 'B+',
          age: 35,
          gender: 'Male',
          address: '123 Main Street, Mumbai, Maharashtra',
          emergencyContact: '+91 98765 43211',
          primaryDoctor: 'Dr. Sharma',
          hospital: 'Apollo Hospital',
          registrationDate: '2024-01-15',
          status: 'Active',
          avatarColor: 'bg-gradient-to-br from-blue-500 to-cyan-400',
          medicalConditions: ['Hypertension', 'Type 2 Diabetes'],
          allergies: ['Penicillin', 'Peanuts'],
          currentMedications: ['Metformin 500mg', 'Amlodipine 5mg'],
          lastCheckup: '2024-02-10',
          insuranceProvider: 'HealthCare Inc.',
          policyNumber: 'HC-7890123',
          height: '175 cm',
          weight: '70 kg',
          bloodPressure: '120/80 mmHg'
        };
      }

      // Ensure patientId is set
      if (!data.patientId) {
        data.patientId = patientId;
      }

      setPatientData(data);
      
      // Generate demo data for other sections
      generateDemoData(data);
      
      // Save to localStorage for consistency
      localStorage.setItem('patientData', JSON.stringify(data));
      localStorage.setItem('currentPatientId', patientId);

    } catch (error) {
      console.error('Error fetching patient data:', error);
    } finally {
      setIsLoading(false);
    }
  }, [location.search]);

  // Generate demo data
  const generateDemoData = (patientData) => {
    // Notifications
    setNotifications([
      {
        id: 1,
        type: 'urgent',
        title: 'Blood Donor Match Found',
        message: 'A blood donor with B+ blood group has been matched for your request.',
        time: '10 minutes ago',
        read: false,
        icon: Droplets
      },
      {
        id: 2,
        type: 'appointment',
        title: 'Appointment Reminder',
        message: 'Your appointment with Dr. Sharma is scheduled for tomorrow at 10:00 AM.',
        time: '2 hours ago',
        read: true,
        icon: Calendar
      },
      {
        id: 3,
        type: 'medical',
        title: 'Test Results Available',
        message: 'Your recent blood test results are now available in your medical records.',
        time: '1 day ago',
        read: true,
        icon: FileText
      }
    ]);

    // Recent Activity
    setRecentActivity([
      {
        id: 1,
        action: 'Blood Request Submitted',
        description: 'Requested 2 units of B+ blood',
        time: 'Today, 09:30 AM',
        icon: Droplets,
        color: 'text-red-500',
        bgColor: 'bg-gradient-to-br from-red-50 to-red-100'
      },
      {
        id: 2,
        action: 'Medical Record Updated',
        description: 'Updated allergy information',
        time: 'Yesterday, 03:45 PM',
        icon: FileText,
        color: 'text-blue-500',
        bgColor: 'bg-gradient-to-br from-blue-50 to-blue-100'
      },
      {
        id: 3,
        action: 'Appointment Scheduled',
        description: 'Scheduled follow-up with Dr. Sharma',
        time: '2 days ago',
        icon: Calendar,
        color: 'text-green-500',
        bgColor: 'bg-gradient-to-br from-green-50 to-green-100'
      }
    ]);

    // Donor Matches
    setDonorMatches([
      {
        id: 1,
        name: 'Rahul Sharma',
        bloodGroup: 'B+',
        type: 'blood',
        matchPercentage: 95,
        distance: '5 km',
        availability: 'Available Now',
        lastDonation: '45 days ago',
        contact: '+91 98765 43212',
        status: 'pending',
        organType: null,
        age: 28,
        verified: true
      },
      {
        id: 2,
        name: 'Priya Patel',
        bloodGroup: 'B+',
        type: 'blood',
        matchPercentage: 88,
        distance: '8 km',
        availability: 'Available in 2 days',
        lastDonation: '60 days ago',
        contact: '+91 98765 43213',
        status: 'contacted',
        organType: null,
        age: 32,
        verified: true
      },
      {
        id: 3,
        name: 'Amit Kumar',
        bloodGroup: 'B+',
        type: 'blood',
        matchPercentage: 92,
        distance: '3 km',
        availability: 'Available Tomorrow',
        lastDonation: '30 days ago',
        contact: '+91 98765 43214',
        status: 'new',
        organType: null,
        age: 45,
        verified: false
      }
    ]);

    // Medical Records
    setMedicalRecords([
      {
        id: 1,
        type: 'Blood Test',
        date: '2024-02-15',
        hospital: 'Apollo Hospital',
        doctor: 'Dr. Sharma',
        status: 'Completed',
        downloadUrl: '#',
        fileSize: '2.4 MB',
        fileType: 'PDF'
      },
      {
        id: 2,
        type: 'X-Ray Report',
        date: '2024-02-10',
        hospital: 'City Hospital',
        doctor: 'Dr. Gupta',
        status: 'Completed',
        downloadUrl: '#',
        fileSize: '5.7 MB',
        fileType: 'DICOM'
      },
      {
        id: 3,
        type: 'ECG Report',
        date: '2024-02-05',
        hospital: 'Apollo Hospital',
        doctor: 'Dr. Sharma',
        status: 'Pending',
        downloadUrl: '#',
        fileSize: '1.2 MB',
        fileType: 'PDF'
      }
    ]);

    // Upcoming Appointments
    setUpcomingAppointments([
      {
        id: 1,
        date: '2024-02-20',
        time: '10:00 AM',
        doctor: 'Dr. Sharma',
        department: 'Cardiology',
        hospital: 'Apollo Hospital',
        purpose: 'Follow-up Checkup',
        status: 'confirmed',
        duration: '30 mins',
        mode: 'In-person'
      },
      {
        id: 2,
        date: '2024-02-25',
        time: '02:30 PM',
        doctor: 'Dr. Gupta',
        department: 'Neurology',
        hospital: 'City Hospital',
        purpose: 'Consultation',
        status: 'scheduled',
        duration: '45 mins',
        mode: 'Video Call'
      },
      {
        id: 3,
        date: '2024-03-01',
        time: '11:00 AM',
        doctor: 'Dr. Patel',
        department: 'General Medicine',
        hospital: 'Apollo Hospital',
        purpose: 'Blood Test Review',
        status: 'pending',
        duration: '20 mins',
        mode: 'In-person'
      }
    ]);
  };

  // Handle tab change
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setShowMobileMenu(false);
  };

  // Handle emergency
  const handleEmergency = () => {
    window.dispatchEvent(new CustomEvent('showEmergencyModal'));
  };

  // Handle request assistance
  const handleRequestAssistance = () => {
    navigate(`/patient/request-assistance?id=${getPatientId()}`);
  };

  // Handle view donor profile
  const handleViewDonorProfile = (donorId) => {
    navigate(`/donor/profile?id=${donorId}&patientId=${getPatientId()}`);
  };

  // Handle download record
  const handleDownloadRecord = (recordId) => {
    // Implement download logic
    console.log('Downloading record:', recordId);
  };

  // Handle notification click
  const handleNotificationClick = (notificationId) => {
    setNotifications(notifications.map(notif => 
      notif.id === notificationId ? { ...notif, read: true } : notif
    ));
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('patientData');
    localStorage.removeItem('currentPatientId');
    navigate('/auth?tab=login');
  };

  // Toggle notifications panel
  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  // Initialize on mount
  useEffect(() => {
    fetchPatientData();
    
    // Listen for auth changes
    const handleAuthChange = () => {
      fetchPatientData();
    };
    
    window.addEventListener('authChange', handleAuthChange);
    
    return () => {
      window.removeEventListener('authChange', handleAuthChange);
    };
  }, [fetchPatientData]);

  // Dashboard tabs
  const dashboardTabs = [
    { id: 'overview', label: 'Overview', icon: Home },
    { id: 'matches', label: 'Donor Matches', icon: Heart },
    { id: 'medical', label: 'Medical Records', icon: FileText },
    { id: 'appointments', label: 'Appointments', icon: Calendar },
    { id: 'activity', label: 'Activity', icon: Activity },
    { id: 'profile', label: 'Profile', icon: User }
  ];

  // Quick stats
  const quickStats = [
    { label: 'Donor Matches', value: donorMatches.length, icon: Heart, color: 'text-red-500', bgColor: 'bg-gradient-to-br from-red-50 to-red-100' },
    { label: 'Pending Requests', value: 2, icon: AlertCircle, color: 'text-amber-500', bgColor: 'bg-gradient-to-br from-amber-50 to-amber-100' },
    { label: 'Upcoming Appointments', value: upcomingAppointments.length, icon: Calendar, color: 'text-blue-500', bgColor: 'bg-gradient-to-br from-blue-50 to-blue-100' },
    { label: 'Medical Records', value: medicalRecords.length, icon: FileText, color: 'text-green-500', bgColor: 'bg-gradient-to-br from-green-50 to-green-100' }
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
            <div className="w-20 h-20 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Heart className="h-8 w-8 text-blue-500 animate-pulse" />
            </div>
          </div>
          <p className="text-gray-600 mt-4 font-medium">Loading your dashboard...</p>
          <p className="text-gray-500 text-sm mt-2">Preparing your personalized healthcare experience</p>
        </div>
      </div>
    );
  }

  if (!patientData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
        <div className="text-center max-w-md p-8 bg-white rounded-2xl shadow-lg">
          <div className="w-20 h-20 bg-gradient-to-br from-red-100 to-red-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="h-10 w-10 text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Patient Not Found</h2>
          <p className="text-gray-600 mb-6">We couldn't find your patient profile. Please login again.</p>
          <div className="space-y-3">
            <button
              onClick={() => navigate('/auth?tab=login')}
              className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-blue-500/30 transition-all"
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
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-lg shadow-sm border-b border-gray-200">
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
                className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors"
              >
                <div className="bg-gradient-to-br from-blue-600 to-cyan-500 p-2 rounded-lg">
                  <Home className="h-5 w-5 text-white" />
                </div>
                <span className="hidden sm:inline font-bold text-lg">HealthConnect</span>
              </button>
              
              <div className="ml-4 sm:ml-6">
                <div className="hidden sm:block">
                  <h1 className="text-lg font-bold text-gray-900">Patient Dashboard</h1>
                  <p className="text-xs text-gray-600 hidden md:block">Manage your health journey</p>
                </div>
                {isTablet && (
                  <p className="text-xs text-gray-600">ID: {patientData.patientId.slice(0, 8)}...</p>
                )}
              </div>
            </div>

            {/* Right side - Actions */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Device Indicator */}
              <div className="hidden lg:flex items-center gap-1 px-3 py-1 bg-gray-100 rounded-full">
                {isDesktop ? (
                  <Monitor className="h-4 w-4 text-gray-600" />
                ) : isTablet ? (
                  <Tablet className="h-4 w-4 text-gray-600" />
                ) : (
                  <Smartphone className="h-4 w-4 text-gray-600" />
                )}
                <span className="text-xs font-medium text-gray-600">{screenSize}</span>
              </div>

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
                              notification.read ? 'border-transparent' : 'border-blue-500'
                            }`}
                            onClick={() => handleNotificationClick(notification.id)}
                          >
                            <div className="flex items-start gap-3">
                              <div className={`p-2 rounded-lg ${
                                notification.type === 'urgent' ? 'bg-red-50' :
                                notification.type === 'appointment' ? 'bg-blue-50' : 'bg-green-50'
                              }`}>
                                <Icon className={`h-5 w-5 ${
                                  notification.type === 'urgent' ? 'text-red-600' :
                                  notification.type === 'appointment' ? 'text-blue-600' : 'text-green-600'
                                }`} />
                              </div>
                              <div className="flex-1">
                                <h4 className="font-medium text-gray-900 text-sm">{notification.title}</h4>
                                <p className="text-gray-600 text-xs mt-1">{notification.message}</p>
                                <p className="text-gray-500 text-xs mt-2">{notification.time}</p>
                              </div>
                              {!notification.read && (
                                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Emergency Button */}
              <button
                onClick={handleEmergency}
                className="px-3 sm:px-4 py-2 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-red-500/30 transition-all flex items-center gap-2 text-sm"
              >
                <AlertCircle className="h-4 w-4" />
                <span className="hidden sm:inline">Emergency</span>
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
                          ? 'bg-blue-600 text-white'
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
          <aside className="lg:w-64 bg-white border-r border-gray-200">
            {/* Patient Profile Card */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-14 h-14 ${patientData.avatarColor || 'bg-gradient-to-br from-blue-500 to-cyan-400'} rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg`}>
                  {patientData.name?.charAt(0) || 'P'}
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">{patientData.name}</h3>
                  <p className="text-sm text-gray-600">Patient ID: {patientData.patientId}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="px-2 py-1 bg-gradient-to-r from-red-100 to-red-200 text-red-700 text-xs font-bold rounded-full">
                      {patientData.bloodGroup || 'N/A'}
                    </div>
                    <span className="text-xs text-gray-500">{patientData.age || 'N/A'} yrs</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2 text-gray-700 p-2 bg-gray-50 rounded-lg">
                  <Phone className="h-4 w-4 text-blue-500" />
                  <span className="truncate">{patientData.phone || 'Not specified'}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700 p-2 bg-gray-50 rounded-lg">
                  <Mail className="h-4 w-4 text-green-500" />
                  <span className="truncate">{patientData.email || 'Not specified'}</span>
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
                            ? 'bg-gradient-to-r from-blue-50 to-cyan-50 text-blue-600 font-semibold border border-blue-200'
                            : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                        }`}
                      >
                        <Icon className="h-5 w-5" />
                        <span>{tab.label}</span>
                        {isActive && (
                          <ChevronRight className="h-4 w-4 ml-auto text-blue-500" />
                        )}
                      </button>
                    </li>
                  );
                })}
              </ul>
              
              {/* Emergency Contact Card */}
              <div className="mt-6 p-4 bg-gradient-to-br from-red-50 to-red-100 rounded-xl border border-red-200">
                <h4 className="font-semibold text-red-800 mb-2 flex items-center gap-2">
                  <AlertCircle className="h-4 w-4" />
                  Emergency Contact
                </h4>
                <p className="text-sm text-red-700 font-medium">
                  {patientData.emergencyContact || 'Not specified'}
                </p>
                <p className="text-xs text-red-600 mt-1">Available 24/7</p>
              </div>
            </nav>
          </aside>
        )}

        {/* Main Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {/* Welcome Banner - Responsive */}
          <div className="mb-6 lg:mb-8">
            <div className="bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl p-6 text-white">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold mb-2">
                    Welcome back, {patientData.name}!
                  </h1>
                  <p className="text-blue-100">
                    {isMobile 
                      ? "Stay updated with your health status"
                      : "Your health journey matters. Stay updated with appointments, donor matches, and medical records."}
                  </p>
                </div>
                <button
                  onClick={handleRequestAssistance}
                  className="px-6 py-3 bg-white text-blue-600 rounded-lg font-bold hover:bg-blue-50 transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                >
                  <Plus className="h-5 w-5" />
                  <span>Request Assistance</span>
                </button>
              </div>
            </div>
          </div>

          {/* Quick Stats Grid - Responsive Layout */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 lg:mb-8">
            {quickStats.map((stat, index) => {
              const Icon = stat.icon;
              
              return (
                <div key={index} className="bg-white rounded-xl p-4 sm:p-5 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs sm:text-sm text-gray-600">{stat.label}</p>
                      <p className="text-xl sm:text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                    </div>
                    <div className={`p-2 sm:p-3 rounded-lg ${stat.bgColor}`}>
                      <Icon className={`h-5 w-5 sm:h-6 sm:w-6 ${stat.color}`} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Main Dashboard Content */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            {/* Tab Content */}
            <div className="p-4 sm:p-6">
              {/* Overview Tab */}
              {activeTab === 'overview' && (
                <div className="space-y-6 sm:space-y-8">
                  {/* Health Stats */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl">
                      <div className="flex items-center gap-3">
                        <Activity className="h-5 w-5 text-blue-600" />
                        <div>
                          <p className="text-sm text-blue-800">Blood Pressure</p>
                          <p className="text-xl font-bold text-blue-900">{patientData.bloodPressure || '120/80 mmHg'}</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl">
                      <div className="flex items-center gap-3">
                        <TrendingUp className="h-5 w-5 text-green-600" />
                        <div>
                          <p className="text-sm text-green-800">Weight</p>
                          <p className="text-xl font-bold text-green-900">{patientData.weight || '70 kg'}</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-xl">
                      <div className="flex items-center gap-3">
                        <User className="h-5 w-5 text-purple-600" />
                        <div>
                          <p className="text-sm text-purple-800">Last Checkup</p>
                          <p className="text-xl font-bold text-purple-900">{patientData.lastCheckup || '2024-02-10'}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Recent Activity & Top Matches Side by Side on Desktop */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Recent Activity */}
                    <div className="bg-gray-50 rounded-xl p-4 sm:p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
                        <button
                          onClick={() => handleTabChange('activity')}
                          className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center gap-1"
                        >
                          View All
                          <ChevronRight className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="space-y-3">
                        {recentActivity.slice(0, 3).map((activity) => {
                          const Icon = activity.icon;
                          
                          return (
                            <div key={activity.id} className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                              <div className={`p-2 rounded-lg ${activity.bgColor}`}>
                                <Icon className={`h-5 w-5 ${activity.color}`} />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="font-medium text-gray-900 truncate">{activity.action}</p>
                                <p className="text-sm text-gray-600 truncate">{activity.description}</p>
                              </div>
                              <span className="text-xs text-gray-500 whitespace-nowrap">{activity.time}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Top Donor Matches */}
                    <div className="bg-gray-50 rounded-xl p-4 sm:p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">Top Donor Matches</h3>
                        <button
                          onClick={() => handleTabChange('matches')}
                          className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center gap-1"
                        >
                          View All
                          <ChevronRight className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="space-y-3">
                        {donorMatches.slice(0, 3).map((donor) => (
                          <div key={donor.id} className="bg-white rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center">
                                  <User className="h-5 w-5 text-blue-600" />
                                </div>
                                <div>
                                  <h4 className="font-semibold text-gray-900 text-sm">{donor.name}</h4>
                                  <div className="flex items-center gap-2">
                                    <span className="px-2 py-1 bg-red-100 text-red-700 text-xs font-bold rounded">
                                      {donor.bloodGroup}
                                    </span>
                                    <span className="text-xs text-gray-600">{donor.type}</span>
                                  </div>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="text-lg font-bold text-green-600">{donor.matchPercentage}%</div>
                                <div className="text-xs text-gray-600">Match</div>
                              </div>
                            </div>
                            <div className="flex items-center justify-between text-xs text-gray-600">
                              <span className="flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                {donor.distance}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {donor.availability}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Donor Matches Tab */}
              {activeTab === 'matches' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Donor Matches</h2>
                  
                  <div className="mb-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {isMobile ? 'Matched Donors' : `Matched Donors for ${patientData.bloodGroup || 'your blood group'}`}
                        </h3>
                        <p className="text-gray-600">These donors have been matched based on your requirements</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors text-sm flex items-center gap-2">
                          <Filter className="h-4 w-4" />
                          <span className={isMobile ? 'sr-only' : ''}>Filter</span>
                        </button>
                        <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors text-sm flex items-center gap-2">
                          <Search className="h-4 w-4" />
                          <span className={isMobile ? 'sr-only' : ''}>Search</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {donorMatches.map((donor) => (
                      <div key={donor.id} className="bg-white border border-gray-200 rounded-xl p-4 sm:p-6 hover:shadow-md transition-shadow">
                        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                          {/* Donor Info */}
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-3">
                              <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-xl flex items-center justify-center">
                                <User className="h-6 w-6 text-blue-600" />
                                {donor.verified && (
                                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                                    <CheckCircle className="h-3 w-3 text-white" />
                                  </div>
                                )}
                              </div>
                              <div>
                                <h4 className="font-bold text-gray-900 text-lg">{donor.name}</h4>
                                <div className="flex flex-wrap gap-2 mt-1">
                                  <span className="px-3 py-1 bg-gradient-to-r from-red-100 to-red-200 text-red-700 text-sm font-bold rounded-full">
                                    {donor.bloodGroup}
                                  </span>
                                  <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                                    {donor.type} Donor
                                  </span>
                                  <span className={`px-3 py-1 text-sm font-medium rounded-full ${
                                    donor.status === 'pending' ? 'bg-amber-100 text-amber-700' :
                                    donor.status === 'contacted' ? 'bg-blue-100 text-blue-700' :
                                    'bg-green-100 text-green-700'
                                  }`}>
                                    {donor.status.charAt(0).toUpperCase() + donor.status.slice(1)}
                                  </span>
                                </div>
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
                              <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-3 rounded-lg">
                                <p className="text-xs text-gray-600">Match Score</p>
                                <p className="text-lg sm:text-xl font-bold text-green-600">{donor.matchPercentage}%</p>
                              </div>
                              <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-3 rounded-lg">
                                <p className="text-xs text-gray-600">Distance</p>
                                <p className="text-lg sm:text-xl font-bold text-gray-900">{donor.distance}</p>
                              </div>
                              <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-3 rounded-lg">
                                <p className="text-xs text-gray-600">Availability</p>
                                <p className="text-lg sm:text-xl font-bold text-gray-900">{isMobile ? donor.availability.split(' ')[0] : donor.availability}</p>
                              </div>
                              <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-3 rounded-lg">
                                <p className="text-xs text-gray-600">Age</p>
                                <p className="text-lg sm:text-xl font-bold text-gray-900">{donor.age} yrs</p>
                              </div>
                            </div>
                          </div>
                          
                          {/* Action Buttons */}
                          <div className="flex flex-col sm:flex-row lg:flex-col gap-2 min-w-[200px]">
                            <button
                              onClick={() => handleViewDonorProfile(donor.id)}
                              className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-blue-500/30 transition-all"
                            >
                              {isMobile ? 'View' : 'View Profile'}
                            </button>
                            <button className="px-4 py-2 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors border border-blue-200">
                              {isMobile ? 'Contact' : 'Contact Donor'}
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Medical Records Tab */}
              {activeTab === 'medical' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Medical Records</h2>
                  
                  <div className="mb-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">Your Medical History</h3>
                        <p className="text-gray-600">Access and manage all your medical documents</p>
                      </div>
                      <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-blue-500/30 transition-all flex items-center gap-2">
                        <Plus className="h-4 w-4" />
                        {isMobile ? 'Upload' : 'Upload New Record'}
                      </button>
                    </div>
                  </div>

                  {/* Medical Summary Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <Activity className="h-5 w-5 text-blue-600" />
                        <h4 className="font-semibold text-blue-900">Conditions</h4>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {patientData.medicalConditions?.map((condition, index) => (
                          <span key={index} className="px-3 py-1 bg-white text-blue-700 text-sm rounded-full border border-blue-200">
                            {condition}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="bg-gradient-to-br from-red-50 to-red-100 border border-red-200 rounded-xl p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <AlertCircle className="h-5 w-5 text-red-600" />
                        <h4 className="font-semibold text-red-900">Allergies</h4>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {patientData.allergies?.map((allergy, index) => (
                          <span key={index} className="px-3 py-1 bg-white text-red-700 text-sm rounded-full border border-red-200">
                            {allergy}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-xl p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <PieChart className="h-5 w-5 text-green-600" />
                        <h4 className="font-semibold text-green-900">Medications</h4>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {patientData.currentMedications?.map((med, index) => (
                          <span key={index} className="px-3 py-1 bg-white text-green-700 text-sm rounded-full border border-green-200">
                            {med}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Records List */}
                  <div className="space-y-3">
                    {medicalRecords.map((record) => (
                      <div key={record.id} className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3">
                              <div className="p-3 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-lg">
                                <FileText className="h-6 w-6 text-blue-600" />
                              </div>
                              <div>
                                <h4 className="font-semibold text-gray-900">{record.type}</h4>
                                <div className="flex flex-wrap gap-2 mt-2 text-sm text-gray-600">
                                  <span className="flex items-center gap-1">
                                    <Calendar className="h-3 w-3" />
                                    {record.date}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <MapPin className="h-3 w-3" />
                                    {isMobile ? record.hospital.split(' ')[0] : record.hospital}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <User className="h-3 w-3" />
                                    {record.doctor}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <span className={`px-3 py-1 text-sm font-medium rounded-full ${
                              record.status === 'Completed' ? 'bg-gradient-to-br from-green-100 to-green-200 text-green-700' : 'bg-gradient-to-br from-amber-100 to-amber-200 text-amber-700'
                            }`}>
                              {record.status}
                            </span>
                            <div className="flex gap-1">
                              <button
                                onClick={() => handleDownloadRecord(record.id)}
                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                title="Download"
                              >
                                <Download className="h-5 w-5" />
                              </button>
                              <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                                <Eye className="h-5 w-5" />
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
                        <p className="text-gray-600">Manage your upcoming and past appointments</p>
                      </div>
                      <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-blue-500/30 transition-all flex items-center gap-2">
                        <Plus className="h-4 w-4" />
                        {isMobile ? 'Schedule' : 'Schedule New'}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {upcomingAppointments.map((appointment) => (
                      <div key={appointment.id} className="bg-white border border-gray-200 rounded-xl p-4 sm:p-6 hover:shadow-md transition-shadow">
                        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-start gap-4">
                              <div className={`p-3 rounded-lg ${
                                appointment.status === 'confirmed' ? 'bg-gradient-to-br from-green-100 to-green-200' :
                                appointment.status === 'scheduled' ? 'bg-gradient-to-br from-blue-100 to-blue-200' : 
                                'bg-gradient-to-br from-amber-100 to-amber-200'
                              }`}>
                                <Calendar className={`h-6 w-6 ${
                                  appointment.status === 'confirmed' ? 'text-green-600' :
                                  appointment.status === 'scheduled' ? 'text-blue-600' : 'text-amber-600'
                                }`} />
                              </div>
                              <div>
                                <h4 className="font-bold text-gray-900 text-lg">{appointment.purpose}</h4>
                                <div className="flex flex-wrap gap-2 mt-2">
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
                              <button className="flex-1 px-3 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-blue-500/30 transition-all text-sm">
                                {appointment.mode === 'Video Call' ? 'Join' : 'Details'}
                              </button>
                              <button className="px-3 py-2 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors text-sm border border-blue-200">
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

              {/* Activity Tab */}
              {activeTab === 'activity' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Activity Log</h2>
                  
                  <div className="space-y-4">
                    {recentActivity.map((activity) => {
                      const Icon = activity.icon;
                      
                      return (
                        <div key={activity.id} className="bg-white border border-gray-200 rounded-xl p-4 sm:p-6 hover:shadow-md transition-shadow">
                          <div className="flex items-start gap-4">
                            <div className={`p-3 rounded-lg ${activity.bgColor}`}>
                              <Icon className={`h-6 w-6 ${activity.color}`} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-semibold text-gray-900 text-lg">{activity.action}</h4>
                              <p className="text-gray-600 mt-1 truncate">{activity.description}</p>
                              <p className="text-sm text-gray-500 mt-3">{activity.time}</p>
                            </div>
                            <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                              <Eye className="h-5 w-5" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
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
                          <button className="flex items-center gap-2 text-blue-600 hover:text-blue-700">
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
                                defaultValue={patientData.name}
                                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                              <input
                                type="email"
                                defaultValue={patientData.email}
                                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              />
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                              <input
                                type="tel"
                                defaultValue={patientData.phone}
                                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Blood Group</label>
                              <select
                                defaultValue={patientData.bloodGroup}
                                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                            <textarea
                              defaultValue={patientData.address}
                              rows="3"
                              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                          </div>
                          
                          <div className="pt-6 border-t border-gray-200">
                            <div className="flex gap-3">
                              <button className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-blue-500/30 transition-all">
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
                            <span className="text-sm text-gray-600">Patient ID</span>
                            <span className="font-medium text-gray-900">{patientData.patientId}</span>
                          </div>
                          
                          <div className="flex items-center justify-between py-2 border-b border-gray-100">
                            <span className="text-sm text-gray-600">Registration Date</span>
                            <span className="font-medium text-gray-900">{patientData.registrationDate || '2024-01-15'}</span>
                          </div>
                          
                          <div className="flex items-center justify-between py-2">
                            <span className="text-sm text-gray-600">Status</span>
                            <span className="px-3 py-1 bg-gradient-to-br from-green-100 to-green-200 text-green-700 text-sm font-medium rounded-full">
                              {patientData.status || 'Active'}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-white border border-gray-200 rounded-xl p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                        
                        <div className="space-y-3">
                          <button className="w-full px-4 py-3 bg-gradient-to-br from-blue-50 to-blue-100 text-blue-600 rounded-lg font-medium hover:from-blue-100 hover:to-blue-200 transition-all flex items-center gap-3">
                            <Settings className="h-5 w-5" />
                            <span>Account Settings</span>
                          </button>
                          
                          <button className="w-full px-4 py-3 bg-gradient-to-br from-red-50 to-red-100 text-red-600 rounded-lg font-medium hover:from-red-100 hover:to-red-200 transition-all flex items-center gap-3">
                            <Shield className="h-5 w-5" />
                            <span>Privacy & Security</span>
                          </button>
                          
                          <button className="w-full px-4 py-3 bg-gradient-to-br from-green-50 to-green-100 text-green-600 rounded-lg font-medium hover:from-green-100 hover:to-green-200 transition-all flex items-center gap-3">
                            <FileText className="h-5 w-5" />
                            <span>Download Medical History</span>
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
                <p>HealthConnect Patient Portal v2.0</p>
                <p className="text-xs text-gray-500 mt-1">Optimized for mobile experience</p>
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
            {/* Patient Profile in Mobile Menu */}
            <div className="p-6 bg-gradient-to-br from-blue-600 to-cyan-500 text-white">
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-14 h-14 ${patientData.avatarColor || 'bg-gradient-to-br from-blue-400 to-cyan-300'} rounded-xl flex items-center justify-center font-bold text-xl shadow-lg`}>
                  {patientData.name?.charAt(0) || 'P'}
                </div>
                <div>
                  <h3 className="font-bold text-lg">{patientData.name}</h3>
                  <p className="text-blue-100 text-sm">Patient ID: {patientData.patientId.slice(0, 8)}...</p>
                </div>
              </div>
              <button
                onClick={() => {
                  handleTabChange('profile');
                  setShowMobileMenu(false);
                }}
                className="w-full px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg font-medium text-sm"
              >
                View Full Profile
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
                            ? 'bg-gradient-to-r from-blue-50 to-cyan-50 text-blue-600 font-semibold border border-blue-200'
                            : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                        }`}
                      >
                        <Icon className="h-5 w-5" />
                        <span>{tab.label}</span>
                        {isActive && (
                          <ChevronRight className="h-4 w-4 ml-auto text-blue-500" />
                        )}
                      </button>
                    </li>
                  );
                })}
              </ul>

              {/* Quick Actions */}
              <div className="mt-6 p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl">
                <h4 className="font-semibold text-gray-900 mb-3">Quick Actions</h4>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={handleEmergency}
                    className="px-3 py-2 bg-red-50 text-red-600 rounded-lg text-sm font-medium"
                  >
                    Emergency
                  </button>
                  <button
                    onClick={handleRequestAssistance}
                    className="px-3 py-2 bg-blue-50 text-blue-600 rounded-lg text-sm font-medium"
                  >
                    Request Help
                  </button>
                </div>
              </div>
            </nav>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientDashboard;