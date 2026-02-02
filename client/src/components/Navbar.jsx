import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Home, Heart, Bell, User,
  Search, MapPin, Menu, X, Droplets,
  Calendar, Shield, ChevronDown,
  LogOut, Settings, HelpCircle,
  AlertCircle, Star, Award,
  TrendingUp, History,
  Gift, LifeBuoy,
  Bookmark, LogIn, UserPlus,
  Activity as ActivityIcon,
  Hospital, Ambulance,
  CheckCircle, ChevronRight,
  Sparkles, Zap, MoreVertical,
  Info, Target, BookOpen,
  Users, Globe, Phone, Mail,
  ChevronLeft,
  ExternalLink,
  MessageCircle
} from 'lucide-react';
import jeevandaans from "../../public/jeevandaan.png";
import NotificationsModal from "../notifications/NotificationsModal"

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchRef = useRef(null);
  const profileRef = useRef(null);
  const moreRef = useRef(null);
  const mobileMenuRef = useRef(null);

  const [activeTab, setActiveTab] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [currentLocation, setCurrentLocation] = useState('Mumbai');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const [userType, setUserType] = useState('');
  const [userTypeConfig, setUserTypeConfig] = useState(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [patientId, setPatientId] = useState('');

  // Track window width
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
      }
      if (window.innerWidth >= 768 && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isSearchOpen]);

  // Check login status
  useEffect(() => {
    checkUserAuth();
    const handleStorageChange = () => {
      checkUserAuth();
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [location]);

  // Get patient ID
  useEffect(() => {
    let finalPatientId = null;

    if (isLoggedIn && userData) {
      finalPatientId =
        userData.patientId ||
        userData.patient?._id ||
        userData._id ||
        null;
    }

    if (!finalPatientId) {
      finalPatientId =
        localStorage.getItem("patientId") ||
        localStorage.getItem("guestPatientId");
    }

    if (!finalPatientId) {
      const guestPatientId = 'guest-' + Date.now().toString(36) + Math.random().toString(36).substr(2);
      localStorage.setItem('guestPatientId', guestPatientId);
      finalPatientId = guestPatientId;
    }

    setPatientId(finalPatientId);
    localStorage.setItem("patientId", finalPatientId);
  }, [isLoggedIn, userData]);

  // User type configurations
  const userTypesConfig = [
    {
      key: 'bloodDonor',
      label: 'Blood Donor',
      icon: Droplets,
      gradient: 'bg-gradient-to-r from-red-600 to-red-500',
      textColor: 'text-red-600',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200'
    },
    {
      key: 'organDonor',
      label: 'Organ Donor',
      icon: ActivityIcon,
      gradient: 'bg-gradient-to-r from-green-600 to-emerald-500',
      textColor: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200'
    },
    {
      key: 'patient',
      label: 'Patient/Family',
      icon: Ambulance,
      gradient: 'bg-gradient-to-r from-blue-600 to-blue-500',
      textColor: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200'
    },
    {
      key: 'user',
      label: 'Community Member',
      icon: Users,
      gradient: 'bg-gradient-to-r from-indigo-600 to-blue-500',
      textColor: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
      borderColor: 'border-indigo-200'
    }
  ];

  // Check user authentication
  const checkUserAuth = () => {
    let foundUser = false;

    for (const type of userTypesConfig) {
      const token = localStorage.getItem(`${type.key}Token`);
      const data = localStorage.getItem(`${type.key}Data`) || localStorage.getItem(type.key);

      if (token && data) {
        try {
          const parsedData = JSON.parse(data);
          setIsLoggedIn(true);
          setUserData(parsedData);
          setUserType(type.key);
          setUserTypeConfig(type);
          foundUser = true;

          localStorage.setItem('currentUserType', type.key);
          localStorage.setItem('currentUserData', data);

          if (parsedData.patientId) {
            setPatientId(parsedData.patientId);
            localStorage.setItem('patientId', parsedData.patientId);
          }

          break;
        } catch (error) {
          console.error('Error parsing user data:', error);
        }
      }
    }

    if (!foundUser) {
      const currentUserData = localStorage.getItem('currentUserData');
      const currentUserType = localStorage.getItem('currentUserType');

      if (currentUserData && currentUserType) {
        try {
          const parsedData = JSON.parse(currentUserData);
          const type = userTypesConfig.find(t => t.key === currentUserType);

          if (type) {
            setIsLoggedIn(true);
            setUserData(parsedData);
            setUserType(currentUserType);
            setUserTypeConfig(type);
            foundUser = true;

            if (parsedData.patientId) {
              setPatientId(parsedData.patientId);
            }
          }
        } catch (error) {
          console.error('Error parsing current user data:', error);
        }
      }
    }

    if (!foundUser) {
      setIsLoggedIn(false);
      setUserData(null);
      setUserType('');
      setUserTypeConfig(null);
    }
  };

  // Update active tab based on route
  useEffect(() => {
    const path = location.pathname;
    if (path === '/') setActiveTab('home');
    else if (path.includes('/blood')) setActiveTab('blood');
    else if (path.includes('/organ')) setActiveTab('organ');
    else if (path.includes('/patient-matches') || path.includes('/urgent-requests')) setActiveTab('urgent');
    else if (path.includes('/profile')) setActiveTab('profile');
    else if (path.includes('/about')) setActiveTab('about');
    else if (path.includes('/auth')) setActiveTab('auth');
    else if (path.includes('/settings')) setActiveTab('settings');
  }, [location]);

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdowns on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isProfileOpen && profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
      if (isMoreOpen && moreRef.current && !moreRef.current.contains(event.target)) {
        setIsMoreOpen(false);
      }
      if (isLocationOpen && profileRef.current && !profileRef.current.contains(event.target)) {
        setIsLocationOpen(false);
      }
      if (isSearchOpen && searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchOpen(false);
      }
      if (isMobileMenuOpen && mobileMenuRef.current && !mobileMenuRef.current.contains(event.target) && !event.target.closest('.mobile-menu-trigger')) {
        setIsMobileMenuOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isProfileOpen, isMoreOpen, isLocationOpen, isSearchOpen, isMobileMenuOpen]);

  // Navigation items
  const mainNavItems = [
    {
      id: 'blood',
      label: 'Blood Donation',
      icon: Droplets,
      path: '/blood',
      description: 'Find blood donors',
      bgColor: 'bg-red-50',
      textColor: 'text-red-600'
    },
    {
      id: 'organ',
      label: 'Organ Donation',
      icon: ActivityIcon,
      path: '/organ',
      description: 'Organ donation info',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600'
    },
    {
      id: 'urgent',
      label: 'Find Matches',
      icon: AlertCircle,
      path: '/patient-matches',
      description: 'Patient donor matches',
      bgColor: 'bg-amber-50',
      textColor: 'text-amber-600',
      badge: 3
    },
    {
      id: 'hospitals',
      label: 'Hospitals',
      icon: Hospital,
      path: '/hospitals',
      description: 'Find hospitals',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600'
    }
  ];

  const secondaryNavItems = [
    {
      id: 'about',
      label: 'About Us',
      icon: Info,
      path: '/about',
      description: 'Our mission & vision',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600'
    },
    {
      id: 'resources',
      label: 'Resources',
      icon: BookOpen,
      path: '/resources',
      description: 'Educational materials',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600'
    },
    {
      id: 'community',
      label: 'Community',
      icon: Users,
      path: '/community',
      description: 'Connect with others',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600'
    },
    {
      id: 'events',
      label: 'Events',
      icon: Calendar,
      path: '/events',
      description: 'Upcoming events',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600'
    }
  ];

  const mobileNavItems = [
    {
      id: 'home',
      label: 'Home',
      icon: Home,
      path: '/',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      id: 'blood',
      label: 'Blood',
      icon: Droplets,
      path: '/blood',
      color: 'text-red-600',
      bgColor: 'bg-red-50'
    },
    {
      id: 'organ',
      label: 'Organ',
      icon: ActivityIcon,
      path: '/organ',
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      id: 'urgent',
      label: 'Matches',
      icon: AlertCircle,
      path: '/patient-matches',
      color: 'text-amber-600',
      bgColor: 'bg-amber-50'
    },
    {
      id: 'profile',
      label: 'Profile',
      icon: User,
      path: '/profile',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    }
  ];

  // Profile dropdown items
  const getProfileItems = () => {
    const baseItems = [
      {
        label: 'My Profile',
        icon: User,
        path: '/profile',
        bgColor: 'bg-blue-50',
        textColor: 'text-blue-600',
        description: 'View your profile'
      },
      {
        label: 'Settings',
        icon: Settings,
        path: '/settings',
        bgColor: 'bg-blue-50',
        textColor: 'text-blue-600',
        description: 'Account settings'
      },
      {
        label: 'Help Center',
        icon: LifeBuoy,
        path: '/help',
        bgColor: 'bg-green-50',
        textColor: 'text-green-600',
        description: 'Get help & support'
      }
    ];

    if (!userTypeConfig) return baseItems;

    const patientMatchesItem = {
      label: 'Patient Matches',
      icon: AlertCircle,
      path: `/patient-matches/${patientId}`,
      bgColor: 'bg-amber-50',
      textColor: 'text-amber-600',
      description: 'View patient matches'
    };

    switch (userTypeConfig.key) {
      case 'bloodDonor':
        return [
          ...baseItems,
          {
            label: 'My Donations',
            icon: History,
            path: '/donations',
            bgColor: 'bg-red-50',
            textColor: 'text-red-600',
            description: 'Donation history'
          },
          patientMatchesItem,
          {
            label: 'Achievements',
            icon: Award,
            path: '/achievements',
            bgColor: 'bg-green-50',
            textColor: 'text-green-600',
            description: 'Your achievements'
          }
        ];
      case 'organDonor':
        return [
          ...baseItems,
          {
            label: 'My Pledge',
            icon: Shield,
            path: '/pledge',
            bgColor: 'bg-green-50',
            textColor: 'text-green-600',
            description: 'Organ donation pledge'
          },
          patientMatchesItem,
          {
            label: 'Medical Records',
            icon: BookOpen,
            path: '/medical-records',
            bgColor: 'bg-blue-50',
            textColor: 'text-blue-600',
            description: 'Health information'
          }
        ];
      case 'patient':
        return [
          ...baseItems,
          patientMatchesItem,
          {
            label: 'My Requests',
            icon: AlertCircle,
            path: '/requests',
            bgColor: 'bg-red-50',
            textColor: 'text-red-600',
            description: 'Blood/organ requests'
          }
        ];
      default:
        return [...baseItems, patientMatchesItem];
    }
  };

  // Helper functions
  const handleTabClick = (path, tabId) => {
    setActiveTab(tabId);
    navigate(path);
    if (window.innerWidth < 1024) {
      setIsMobileMenuOpen(false);
    }
    setIsMoreOpen(false);
  };

  const handlePatientMatchesClick = () => {
    if (!patientId) {
      if (!isLoggedIn) {
        navigate('/auth?redirect=/patient-matches');
        return;
      }
      const storedPatientId = localStorage.getItem('patientId');
      if (storedPatientId) {
        navigate(`/patient-matches/${storedPatientId}`);
      } else {
        console.error('Patient ID not found');
        return;
      }
    } else {
      navigate(`/patient-matches/${patientId}`);
    }
    setActiveTab('urgent');
    if (window.innerWidth < 1024) {
      setIsMobileMenuOpen(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  const handleLogout = () => {
    const types = ['bloodDonor', 'organDonor', 'patient', 'user'];
    types.forEach(type => {
      localStorage.removeItem(`${type}Token`);
      localStorage.removeItem(type);
      localStorage.removeItem(`${type}Data`);
    });

    localStorage.removeItem('currentUserData');
    localStorage.removeItem('currentUserType');
    localStorage.removeItem('patientId');

    setIsLoggedIn(false);
    setUserData(null);
    setUserType('');
    setUserTypeConfig(null);
    setIsProfileOpen(false);

    const guestPatientId = 'guest-' + Date.now().toString(36) + Math.random().toString(36).substr(2);
    localStorage.setItem('guestPatientId', guestPatientId);
    setPatientId(guestPatientId);

    navigate('/');
  };

  const handleEmergency = () => {
    navigate('/emergency-request');
  };

  const handleLocationSelect = (city) => {
    setCurrentLocation(city);
    setIsLocationOpen(false);
  };

  const getUserInitials = () => {
    if (!userData?.name) return 'U';
    return userData.name.charAt(0).toUpperCase();
  };

  const getUserDisplayName = () => {
    return userData?.name || 'User';
  };

  const getUserTypeLabel = () => {
    return userTypeConfig?.label || 'User';
  };

  const getTabStyle = (itemId, isActive) => {
    if (isActive) {
      if (itemId === 'blood') return 'bg-gradient-to-r from-red-600 to-red-500 text-white shadow-lg shadow-red-500/30';
      if (itemId === 'organ') return 'bg-gradient-to-r from-green-600 to-green-500 text-white shadow-lg shadow-green-500/30';
      if (itemId === 'urgent') return 'bg-gradient-to-r from-amber-600 to-amber-500 text-white shadow-lg shadow-amber-500/30';
      return 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-500/30';
    }

    if (itemId === 'blood') return 'text-gray-700 hover:text-red-600 hover:bg-red-50';
    if (itemId === 'organ') return 'text-gray-700 hover:text-green-600 hover:bg-green-50';
    if (itemId === 'urgent') return 'text-gray-700 hover:text-amber-600 hover:bg-amber-50';
    return 'text-gray-700 hover:text-blue-600 hover:bg-blue-50';
  };

  return (
    <>
      {/* DESKTOP NAVBAR */}
      <nav className={`hidden lg:block fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/90 backdrop-blur-md shadow-lg py-3 border-b border-gray-200/50' 
          : 'bg-white py-4'
      }`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between">
            
            {/* Logo */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate('/')}
                className="flex items-center gap-3 group"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl blur opacity-30"></div>
                  <div className="relative bg-white w-10 h-10 rounded-xl flex items-center justify-center shadow-lg">
                    <img
                      src={jeevandaans}
                      alt="JeevanDaan Logo"
                      className="w-6 h-6 object-contain"
                    />
                  </div>
                </div>
                <div>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                    JeevanDaan
                  </h1>
                  <p className="text-xs text-gray-500 font-medium">Saving Lives Together</p>
                </div>
              </button>
            </div>

            {/* Navigation */}
            <div className="flex items-center gap-1">
              {mainNavItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => item.id === 'urgent' ? handlePatientMatchesClick() : handleTabClick(item.path, item.id)}
                  className={`px-4 py-2.5 rounded-xl font-medium transition-all duration-200 flex items-center gap-2 relative ${getTabStyle(item.id, activeTab === item.id)}`}
                >
                  <item.icon className="h-4 w-4" />
                  <span className="text-sm">{item.label}</span>
                  {item.badge && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center animate-pulse shadow">
                      {item.badge}
                    </span>
                  )}
                </button>
              ))}
              
              {/* More Dropdown */}
              <div className="relative" ref={moreRef}>
                <button
                  onClick={() => setIsMoreOpen(!isMoreOpen)}
                  className={`px-4 py-2.5 rounded-xl font-medium transition-all duration-200 flex items-center gap-2 ${
                    isMoreOpen 
                      ? 'bg-blue-50 text-blue-600' 
                      : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                  }`}
                >
                  <MoreVertical className="h-4 w-4" />
                  <span className="text-sm">More</span>
                  <ChevronDown className={`h-3 w-3 transition-transform ${isMoreOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {isMoreOpen && (
                  <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-2xl border border-gray-200/50 p-2 z-50 animate-fadeIn">
                    {secondaryNavItems.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => handleTabClick(item.path, item.id)}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <div className={`p-2 rounded-lg ${item.bgColor}`}>
                          <item.icon className={`h-4 w-4 ${item.textColor}`} />
                        </div>
                        <div className="text-left">
                          <div className="font-medium text-gray-900 text-sm">{item.label}</div>
                          <div className="text-xs text-gray-500">{item.description}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-3">
              {/* Location */}
              <div className="relative hidden xl:block" ref={profileRef}>
                <button
                  onClick={() => setIsLocationOpen(!isLocationOpen)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-200 hover:border-blue-300 transition-colors"
                >
                  <MapPin className="h-4 w-4 text-blue-500" />
                  <span className="text-sm font-medium text-gray-700">{currentLocation}</span>
                  <ChevronDown className={`h-3 w-3 text-gray-400 transition-transform ${isLocationOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {isLocationOpen && (
                  <div className="absolute top-full right-0 mt-2 w-56 bg-white rounded-xl shadow-2xl border border-gray-200/50 p-3 z-50 animate-fadeIn">
                    <h4 className="font-semibold text-gray-900 mb-2">Select Location</h4>
                    {['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Hyderabad', 'Kolkata', 'Pune', 'Ahmedabad'].map((city) => (
                      <button
                        key={city}
                        onClick={() => handleLocationSelect(city)}
                        className={`w-full px-3 py-2 rounded-lg text-left transition-colors ${
                          currentLocation === city 
                            ? 'bg-blue-50 text-blue-600' 
                            : 'hover:bg-gray-50 text-gray-700'
                        }`}
                      >
                        {city}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Search */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="hidden xl:flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                <Search className="h-4 w-4 text-gray-600" />
                <span className="text-sm text-gray-600">Search</span>
              </button>

              {/* Emergency */}
              <button
                onClick={handleEmergency}
                className="px-4 py-2.5 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-200 flex items-center gap-2"
              >
                <Ambulance className="h-4 w-4" />
                <span className="text-sm">Emergency</span>
              </button>

              {/* Notifications */}
              <div className="relative">
                <button
                  onClick={() => setShowNotifications(true)}
                  className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <Bell className="h-5 w-5 text-gray-600" />
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center animate-pulse">
                    3
                  </span>
                </button>
              </div>

              {/* Profile/Auth */}
              {isLoggedIn ? (
                <div className="relative" ref={profileRef}>
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center gap-2 p-1 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <div className={`w-9 h-9 rounded-full ${userTypeConfig?.gradient || 'bg-gradient-to-r from-blue-500 to-cyan-500'} flex items-center justify-center text-white font-semibold`}>
                      {getUserInitials()}
                    </div>
                  </button>
                  
                  {isProfileOpen && (
                    <div className="absolute top-full right-0 mt-2 w-72 bg-white rounded-xl shadow-2xl border border-gray-200/50 p-4 z-50 animate-fadeIn">
                      {/* Profile Header */}
                      <div className="flex items-center gap-3 pb-3 border-b border-gray-200">
                        <div className={`w-12 h-12 rounded-full ${userTypeConfig?.gradient || 'bg-gradient-to-r from-blue-500 to-cyan-500'} flex items-center justify-center text-white font-bold text-lg`}>
                          {getUserInitials()}
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900">{getUserDisplayName()}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <span className={`text-xs ${userTypeConfig?.bgColor || 'bg-blue-50'} ${userTypeConfig?.textColor || 'text-blue-600'} px-2 py-1 rounded-full border ${userTypeConfig?.borderColor || 'border-blue-200'}`}>
                              {getUserTypeLabel()}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Menu Items */}
                      <div className="py-2">
                        {getProfileItems().map((item, idx) => (
                          <button
                            key={idx}
                            onClick={() => {
                              navigate(item.path);
                              setIsProfileOpen(false);
                            }}
                            className="w-full flex items-center justify-between px-2 py-2.5 rounded-lg hover:bg-gray-50 transition-colors"
                          >
                            <div className="flex items-center gap-3">
                              <div className={`p-2 rounded-lg ${item.bgColor}`}>
                                <item.icon className={`h-4 w-4 ${item.textColor}`} />
                              </div>
                              <div className="text-left">
                                <div className="font-medium text-gray-900 text-sm">{item.label}</div>
                                <div className="text-xs text-gray-500">{item.description}</div>
                              </div>
                            </div>
                            <ChevronRight className="h-4 w-4 text-gray-400" />
                          </button>
                        ))}
                      </div>
                      
                      {/* Logout */}
                      <button
                        onClick={handleLogout}
                        className="w-full mt-2 px-4 py-2.5 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-red-50 hover:text-red-600 transition-colors flex items-center justify-center gap-2"
                      >
                        <LogOut className="h-4 w-4" />
                        <span>Logout</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => navigate('/auth')}
                    className="px-4 py-2.5 text-blue-600 hover:text-blue-700 font-medium rounded-lg hover:bg-blue-50 transition-colors"
                  >
                    <span className="text-sm">Login</span>
                  </button>
                  <button
                    onClick={() => navigate('/auth?tab=register')}
                    className="px-4 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
                  >
                    <span className="text-sm">Register</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* TABLET NAVBAR */}
      <nav className={`hidden md:block lg:hidden fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/90 backdrop-blur-md shadow-lg py-3' 
          : 'bg-white py-4'
      }`}>
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center justify-between">
            
            {/* Logo */}
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2"
            >
              <div className="bg-white w-10 h-10 rounded-xl flex items-center justify-center shadow">
                <img
                  src={jeevandaans}
                  alt="JeevanDaan Logo"
                  className="w-6 h-6 object-contain"
                />
              </div>
              <h1 className="font-bold text-lg bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                JeevanDaan
              </h1>
            </button>

            {/* Navigation */}
            <div className="flex items-center gap-1">
              {mainNavItems.slice(0, 3).map((item) => (
                <button
                  key={item.id}
                  onClick={() => item.id === 'urgent' ? handlePatientMatchesClick() : handleTabClick(item.path, item.id)}
                  className={`p-2 rounded-lg transition-colors ${
                    activeTab === item.id 
                      ? 'text-white bg-gradient-to-r from-blue-500 to-cyan-500' 
                      : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                </button>
              ))}
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleEmergency}
                className="p-2 bg-red-500 text-white rounded-lg"
              >
                <Ambulance className="h-4 w-4" />
              </button>
              
              <button
                onClick={() => setShowNotifications(true)}
                className="relative p-2 hover:bg-gray-100 rounded-lg"
              >
                <Bell className="h-4 w-4 text-gray-600" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center">
                  3
                </span>
              </button>
              
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <Menu className="h-4 w-4 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* MOBILE NAVBAR */}
      <div className={`md:hidden fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg py-3' 
          : 'bg-white py-4'
      }`}>
        <div className="px-4">
          <div className="flex items-center justify-between">
            
            {/* Logo and Location */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate('/')}
                className="flex items-center gap-2"
              >
                <div className="bg-white w-9 h-9 rounded-xl flex items-center justify-center shadow">
                  <img
                    src={jeevandaans}
                    alt="JeevanDaan Logo"
                    className="w-5 h-5 object-contain"
                  />
                </div>
                <h1 className="font-bold text-base bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                  JeevanDaan
                </h1>
              </button>
              
              <button
                onClick={() => setIsLocationOpen(!isLocationOpen)}
                className="flex items-center gap-1 text-sm text-gray-600"
              >
                <MapPin className="h-3 w-3 text-blue-500" />
                <span>{currentLocation}</span>
              </button>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <Search className="h-4 w-4 text-gray-600" />
              </button>
              
              <button
                onClick={() => setShowNotifications(true)}
                className="relative p-2 hover:bg-gray-100 rounded-lg"
              >
                <Bell className="h-4 w-4 text-gray-600" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center animate-pulse">
                  3
                </span>
              </button>
              
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="mobile-menu-trigger p-2 hover:bg-gray-100 rounded-lg"
              >
                <Menu className="h-4 w-4 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE BOTTOM NAV */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200/50 py-2 shadow-lg">
        <div className="flex justify-around items-center px-2">
          {mobileNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => item.id === 'urgent' ? handlePatientMatchesClick() : handleTabClick(item.path, item.id)}
                className={`flex flex-col items-center justify-center p-2 relative transition-all duration-200 ${
                  isActive ? 'transform -translate-y-1' : ''
                }`}
              >
                <div className={`p-2.5 rounded-xl transition-all duration-200 ${
                  isActive 
                    ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg' 
                    : 'bg-gray-100 text-gray-400'
                }`}>
                  <Icon className={`h-4 w-4 ${isActive ? 'text-white' : item.color}`} />
                </div>
                <span className={`text-xs mt-1 font-medium transition-colors ${
                  isActive ? 'text-blue-600' : 'text-gray-500'
                }`}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* MOBILE MENU MODAL */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 animate-fadeIn">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/30 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          
          {/* Menu Panel */}
          <div 
            ref={mobileMenuRef}
            className="absolute right-0 top-0 bottom-0 w-80 bg-white shadow-2xl animate-slideIn"
          >
            {/* Header */}
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="bg-white w-10 h-10 rounded-xl flex items-center justify-center shadow">
                    <img
                      src={jeevandaans}
                      alt="JeevanDaan Logo"
                      className="w-6 h-6 object-contain"
                    />
                  </div>
                  <div>
                    <h1 className="font-bold text-lg bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                      JeevanDaan
                    </h1>
                    <p className="text-xs text-gray-500">Saving Lives Together</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <X className="h-5 w-5 text-gray-600" />
                </button>
              </div>
              
              {/* User Info */}
              {isLoggedIn ? (
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-3 border border-blue-200">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-full ${userTypeConfig?.gradient || 'bg-gradient-to-r from-blue-500 to-cyan-500'} flex items-center justify-center text-white font-bold text-lg`}>
                      {getUserInitials()}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">{getUserDisplayName()}</h3>
                      <p className="text-xs text-gray-600">{getUserTypeLabel()}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => {
                      navigate('/auth');
                      setIsMobileMenuOpen(false);
                    }}
                    className="px-3 py-2.5 text-blue-600 font-medium rounded-lg border border-blue-200 hover:bg-blue-50 transition-colors"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => {
                      navigate('/auth?tab=register');
                      setIsMobileMenuOpen(false);
                    }}
                    className="px-3 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
                  >
                    Register
                  </button>
                </div>
              )}
            </div>
            
            {/* Menu Items */}
            <div className="overflow-y-auto h-[calc(100vh-180px)] p-4">
              {/* Main Navigation */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">Main Navigation</h3>
                <div className="space-y-1">
                  {mainNavItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        item.id === 'urgent' ? handlePatientMatchesClick() : handleTabClick(item.path, item.id);
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full flex items-center justify-between px-3 py-3 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${item.bgColor}`}>
                          <item.icon className={`h-4 w-4 ${item.textColor}`} />
                        </div>
                        <div className="text-left">
                          <div className="font-medium text-gray-900 text-sm">{item.label}</div>
                          <div className="text-xs text-gray-500">{item.description}</div>
                        </div>
                      </div>
                      <ChevronRight className="h-4 w-4 text-gray-400" />
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Secondary Navigation */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">More</h3>
                <div className="space-y-1">
                  {secondaryNavItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        handleTabClick(item.path, item.id);
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full flex items-center justify-between px-3 py-3 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${item.bgColor}`}>
                          <item.icon className={`h-4 w-4 ${item.textColor}`} />
                        </div>
                        <div className="text-left">
                          <div className="font-medium text-gray-900 text-sm">{item.label}</div>
                          <div className="text-xs text-gray-500">{item.description}</div>
                        </div>
                      </div>
                      <ChevronRight className="h-4 w-4 text-gray-400" />
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Emergency Section */}
              <div className="mb-6">
                <div className="bg-gradient-to-r from-red-50 to-red-100 rounded-xl p-4 border border-red-200">
                  <h3 className="font-semibold text-gray-900 mb-2">Emergency Assistance</h3>
                  <p className="text-sm text-gray-600 mb-3">Available 24/7</p>
                  <button
                    onClick={handleEmergency}
                    className="w-full px-4 py-2.5 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-lg font-semibold flex items-center justify-center gap-2"
                  >
                    <Ambulance className="h-4 w-4" />
                    <span>Emergency Request</span>
                  </button>
                </div>
              </div>
              
              {/* Contact Info */}
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-4 border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-3">Contact Support</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-3 px-3 py-2 bg-white rounded-lg">
                    <Phone className="h-4 w-4 text-blue-500" />
                    <div>
                      <div className="text-xs text-gray-600">Emergency Helpline</div>
                      <div className="font-medium text-blue-600">108</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 px-3 py-2 bg-white rounded-lg">
                    <Mail className="h-4 w-4 text-blue-500" />
                    <div>
                      <div className="text-xs text-gray-600">Support Email</div>
                      <div className="font-medium text-blue-600 text-sm">help@JeevanDaan.org</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Footer */}
            <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-white">
              {isLoggedIn && (
                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-2.5 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-red-50 hover:text-red-600 transition-colors flex items-center justify-center gap-2 mb-3"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              )}
              <p className="text-xs text-gray-500 text-center">© 2026 JeevanDaan. All rights reserved.</p>
            </div>
          </div>
        </div>
      )}

      {/* SEARCH MODAL */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 animate-fadeIn">
          <div 
            className="absolute inset-0 bg-black/20 backdrop-blur-sm"
            onClick={() => setIsSearchOpen(false)}
          />
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-full max-w-2xl px-4">
            <div className="bg-white rounded-xl shadow-2xl p-4 animate-fadeIn">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for blood donors, hospitals, information..."
                  className="w-full pl-12 pr-10 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent text-sm"
                  autoFocus
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch(e)}
                />
                <button
                  onClick={() => setIsSearchOpen(false)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              
              {/* Quick Links */}
              <div className="mt-4">
                <h4 className="font-semibold text-gray-800 mb-2 text-sm">Quick Links</h4>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { label: 'Blood Donation', icon: Droplets, color: 'red' },
                    { label: 'Organ Donation', icon: ActivityIcon, color: 'green' },
                    { label: 'Find Hospitals', icon: Hospital, color: 'blue' },
                    { label: 'Eligibility', icon: Shield, color: 'indigo' }
                  ].map((link, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        navigate(`/${link.label.toLowerCase().replace(' ', '-')}`);
                        setIsSearchOpen(false);
                      }}
                      className={`px-3 py-2 rounded-lg bg-${link.color}-50 border border-${link.color}-200 flex items-center gap-2 hover:opacity-90 transition-opacity`}
                    >
                      <link.icon className={`h-4 w-4 text-${link.color}-600`} />
                      <span className={`text-sm font-medium text-${link.color}-600`}>{link.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* NOTIFICATIONS MODAL */}
      {showNotifications && (
        <NotificationsModal
          isOpen={showNotifications}
          onClose={() => setShowNotifications(false)}
        />
      )}

      {/* Spacer for fixed navbar */}
      <div className="lg:pt-20 md:pt-20 pt-28"></div>

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideIn {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        
        .animate-slideIn {
          animation: slideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        
        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </>
  );
};

export default Navbar;