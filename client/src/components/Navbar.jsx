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
  Users, Globe, Phone, Mail
} from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchRef = useRef(null);
  const profileRef = useRef(null);
  const moreRef = useRef(null);

  const [activeTab, setActiveTab] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [currentLocation, setCurrentLocation] = useState('Mumbai, India');
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const [userType, setUserType] = useState('');
  const [userTypeConfig, setUserTypeConfig] = useState(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

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

  // Track window width for responsive behavior
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Check login status
  useEffect(() => {
    checkUserAuth();
    
    const handleStorageChange = () => {
      checkUserAuth();
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [location]);

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

  // Update active tab based on current route
  useEffect(() => {
    const path = location.pathname;
    if (path === '/') setActiveTab('home');
    else if (path.includes('/blood')) setActiveTab('blood');
    else if (path.includes('/organ')) setActiveTab('organ');
    else if (path.includes('/urgent-requests')) setActiveTab('urgent');
    else if (path.includes('/patient-matches')) setActiveTab('urgent');
    else if (path.includes('/profile')) setActiveTab('profile');
    else if (path.includes('/about')) setActiveTab('about');
    else if (path.includes('/auth')) setActiveTab('auth');
    else if (path.includes('/settings')) setActiveTab('settings');
  }, [location]);

  // Main navigation items
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
      label: 'Urgent Needs',
      icon: AlertCircle,
      path: '/patient-matches',
      description: 'Emergency requests',
      bgColor: 'bg-red-50',
      textColor: 'text-red-600',
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

  // Secondary navigation items
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

  // Mobile nav items
  const mobileNavItems = [
    {
      id: 'home',
      label: 'Home',
      icon: Home,
      path: '/',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      pulse: false
    },
    {
      id: 'blood',
      label: 'Blood',
      icon: Droplets,
      path: '/blood',
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      pulse: true
    },
    {
      id: 'organ',
      label: 'Organ',
      icon: ActivityIcon,
      path: '/organ',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      pulse: false
    },
    {
      id: 'urgent',
      label: 'Urgent',
      icon: AlertCircle,
      path: '/patient-matches',
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      pulse: true,
      badge: 3
    },
    {
      id: 'profile',
      label: 'Profile',
      icon: User,
      path: '/profile',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      pulse: false
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
        label: 'Help Center',
        icon: LifeBuoy,
        path: '/help',
        bgColor: 'bg-green-50',
        textColor: 'text-green-600',
        description: 'Get help & support'
      },
      {
        label: 'Settings',
        icon: Settings,
        path: '/settings',
        bgColor: 'bg-blue-50',
        textColor: 'text-blue-600',
        description: 'Account settings'
      }
    ];

    if (!userTypeConfig) return baseItems;

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
          {
            label: 'Achievements',
            icon: Award,
            path: '/achievements',
            bgColor: 'bg-green-50',
            textColor: 'text-green-600',
            description: 'Your achievements'
          },
          {
            label: 'Rewards',
            icon: Gift,
            path: '/rewards',
            bgColor: 'bg-blue-50',
            textColor: 'text-blue-600',
            description: 'Your rewards'
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
          {
            label: 'My Requests',
            icon: AlertCircle,
            path: '/requests',
            bgColor: 'bg-red-50',
            textColor: 'text-red-600',
            description: 'Blood/organ requests'
          },
          {
            label: 'Hospital Contacts',
            icon: Hospital,
            path: '/hospitals',
            bgColor: 'bg-blue-50',
            textColor: 'text-blue-600',
            description: 'Hospital information'
          }
        ];
      
      case 'user':
        return [
          ...baseItems,
          {
            label: 'Volunteer Activities',
            icon: Users,
            path: '/volunteer',
            bgColor: 'bg-blue-50',
            textColor: 'text-blue-600',
            description: 'Volunteer work'
          },
          {
            label: 'Community Events',
            icon: Calendar,
            path: '/events',
            bgColor: 'bg-green-50',
            textColor: 'text-green-600',
            description: 'Upcoming events'
          }
        ];
      
      default:
        return baseItems;
    }
  };

  // Quick links for search
  const quickLinks = [
    { 
      label: 'Blood Donation Process', 
      path: '/process', 
      icon: Droplets, 
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
      textColor: 'text-red-600'
    },
    { 
      label: 'Organ Donation Info', 
      path: '/organ-info', 
      icon: ActivityIcon, 
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      textColor: 'text-green-600'
    },
    { 
      label: 'Donor Eligibility', 
      path: '/eligibility', 
      icon: Shield, 
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      textColor: 'text-blue-600'
    },
    { 
      label: 'Find Blood Bank', 
      path: '/blood-banks', 
      icon: Hospital, 
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
      textColor: 'text-red-600'
    }
  ];

  // Contact info
  const contactInfo = [
    { icon: Phone, label: 'Emergency Helpline', value: '108', bgColor: 'bg-red-50', textColor: 'text-red-600' },
    { icon: Mail, label: 'Support Email', value: 'help@lifestream.org', bgColor: 'bg-blue-50', textColor: 'text-blue-600' },
    { icon: Users, label: 'Volunteer Support', value: '1800-123-456', bgColor: 'bg-green-50', textColor: 'text-green-600' }
  ];

  // Handle tab click
  const handleTabClick = (path, tabId) => {
    setActiveTab(tabId);
    navigate(path);
    if (window.innerWidth < 1024) {
      setIsMobileMenuOpen(false);
    }
    setIsMoreOpen(false);
  };

  // Handle search
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  // Handle logout
  const handleLogout = () => {
    const types = ['bloodDonor', 'organDonor', 'patient', 'user'];
    types.forEach(type => {
      localStorage.removeItem(`${type}Token`);
      localStorage.removeItem(type);
      localStorage.removeItem(`${type}Data`);
    });
    
    localStorage.removeItem('currentUserData');
    localStorage.removeItem('currentUserType');
    
    setIsLoggedIn(false);
    setUserData(null);
    setUserType('');
    setUserTypeConfig(null);
    setIsProfileOpen(false);
    
    window.location.href = '/';
  };

  // Handle emergency request
  const handleEmergency = () => {
    navigate('/emergency-request');
  };

  // Handle location select
  const handleLocationSelect = (city) => {
    setCurrentLocation(`${city}, India`);
    setIsLocationOpen(false);
  };

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
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
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isProfileOpen, isMoreOpen, isLocationOpen, isSearchOpen]);

  // Get user initials
  const getUserInitials = () => {
    if (!userData?.name) return 'U';
    return userData.name.charAt(0).toUpperCase();
  };

  // Get user display name
  const getUserDisplayName = () => {
    return userData?.name || 'User';
  };

  // Get user type label
  const getUserTypeLabel = () => {
    return userTypeConfig?.label || 'User';
  };

  // Get user stats
  const getUserStats = () => {
    if (!userData) return { donations: 0, points: 0, level: 'Beginner' };

    const stats = {
      donations: userData.donationCount || userData.donations || 0,
      points: userData.points || 0,
      level: userData.level || 'Beginner'
    };

    stats.livesSaved = stats.donations * 3;
    return stats;
  };

  // Handle login click
  const handleLoginClick = () => {
    navigate('/auth');
  };

  // Handle register click
  const handleRegisterClick = () => {
    navigate('/auth?tab=register');
  };

  // Get tab styles dynamically
  const getTabStyle = (itemId, isActive) => {
    if (isActive) {
      if (itemId === 'blood') return 'text-white bg-gradient-to-r from-red-600 to-red-500';
      if (itemId === 'organ') return 'text-white bg-gradient-to-r from-green-600 to-green-500';
      return 'text-white bg-gradient-to-r from-blue-600 to-blue-500';
    }
    
    if (itemId === 'blood') return 'text-gray-700 hover:text-red-600 hover:bg-red-50';
    if (itemId === 'organ') return 'text-gray-700 hover:text-green-600 hover:bg-green-50';
    return 'text-gray-700 hover:text-blue-600 hover:bg-blue-50';
  };

  // Get mobile tab text color
  const getMobileTextColor = (itemId, isActive) => {
    if (!isActive) return 'text-gray-500';
    if (itemId === 'blood') return 'text-red-600';
    if (itemId === 'organ') return 'text-green-600';
    return 'text-blue-600';
  };

  // Get mobile background color
  const getMobileBgColor = (itemId) => {
    if (itemId === 'blood') return 'bg-red-500';
    if (itemId === 'organ') return 'bg-green-500';
    return 'bg-blue-500';
  };

  const profileItems = getProfileItems();
  const userStats = getUserStats();

  return (
    <>
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
        
        @keyframes slideIn {
          from {
            transform: translateX(-100%);
          }
          to {
            transform: translateX(0);
          }
        }
        
        .animate-slideIn {
          animation: slideIn 0.3s ease-out forwards;
        }
        
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      {/* DESKTOP NAVBAR */}
      <nav className={`hidden lg:block fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
        ? 'bg-white shadow-lg py-2 border-b border-gray-200'
        : 'bg-white py-3'
        }`}>
        <div className="max-w-7xl mx-auto px-4 xl:px-6">
          <div className="flex items-center justify-between">

            {/* Logo Section */}
            <button
              onClick={() => navigate('/')}
              className="flex items-center space-x-3 group cursor-pointer flex-shrink-0"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full blur-md opacity-70 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative bg-gradient-to-r from-blue-600 to-blue-500 w-10 h-10 rounded-full flex items-center justify-center shadow-lg shadow-blue-200/50">
                  <Heart className="h-5 w-5 text-white" fill="white" />
                </div>
              </div>
              <div className="text-left">
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">
                  LifeStream
                </h1>
                <p className="text-xs text-gray-600 font-medium">Saving Lives Together</p>
              </div>
            </button>

            {/* Primary Navigation */}
            <div className="flex items-center space-x-1 px-2">
              {mainNavItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleTabClick(item.path, item.id)}
                  className={`px-3 py-2.5 font-medium rounded-lg transition-all duration-200 relative group ${getTabStyle(item.id, activeTab === item.id)}`}
                >
                  <div className="flex items-center space-x-2">
                    <item.icon className={`h-4 w-4 ${activeTab === item.id ? 'text-white' : 'text-gray-500'}`} />
                    <span className="whitespace-nowrap text-sm font-medium">{item.label}</span>
                    {item.badge && (
                      <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center animate-pulse shadow">
                        {item.badge}
                      </span>
                    )}
                  </div>
                </button>
              ))}

              {/* More Dropdown */}
              <div className="relative" ref={moreRef}>
                <button
                  onClick={() => setIsMoreOpen(!isMoreOpen)}
                  className={`px-3 py-2.5 font-medium rounded-lg transition-all duration-200 flex items-center space-x-1 ${isMoreOpen
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                    }`}
                >
                  <MoreVertical className="h-4 w-4" />
                  <span className="text-sm font-medium">More</span>
                  <ChevronDown className={`h-3 w-3 transition-transform duration-200 ${isMoreOpen ? 'rotate-180' : ''}`} />
                </button>

                {isMoreOpen && (
                  <div className="absolute top-full mt-2 left-0 w-64 bg-white rounded-xl shadow-xl border border-gray-200 p-3 z-50 animate-fadeIn">
                    <h4 className="font-semibold text-gray-800 mb-2 px-2 text-sm">More Options</h4>
                    <div className="space-y-1">
                      {secondaryNavItems.map((item) => (
                        <button
                          key={item.id}
                          onClick={() => handleTabClick(item.path, item.id)}
                          className="w-full text-left px-3 py-2 rounded-lg flex items-center space-x-3 hover:bg-gray-50 transition-all duration-150 group"
                        >
                          <div className={`p-1.5 rounded-lg ${activeTab === item.id ? item.bgColor : 'bg-gray-100'}`}>
                            <item.icon className={`h-4 w-4 ${activeTab === item.id ? item.textColor : 'text-gray-600'}`} />
                          </div>
                          <div className="text-left">
                            <div className="font-medium text-gray-800 text-sm">{item.label}</div>
                            <div className="text-xs text-gray-500">{item.description}</div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-2">
              {/* Location Selector */}
              <div className="relative hidden xl:block" ref={profileRef}>
                <button
                  onClick={() => setIsLocationOpen(!isLocationOpen)}
                  className="flex items-center space-x-2 px-3 py-2 rounded-lg border border-gray-200 
                            hover:border-blue-300 transition-all duration-200 cursor-pointer bg-white"
                >
                  <MapPin className="h-4 w-4 text-blue-500" />
                  <span className="text-gray-700 text-sm font-medium">{currentLocation.split(',')[0]}</span>
                  <ChevronDown className={`h-3 w-3 text-gray-400 transition-transform duration-200 ${isLocationOpen ? 'rotate-180' : ''}`} />
                </button>

                {isLocationOpen && (
                  <div className="absolute top-full mt-2 right-0 w-56 bg-white rounded-xl shadow-xl border border-gray-200 p-3 z-50 animate-fadeIn">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-gray-800 text-sm">Select Location</h4>
                      <MapPin className="h-4 w-4 text-blue-500" />
                    </div>
                    <div className="space-y-1 max-h-48 overflow-y-auto scrollbar-hide">
                      {['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Hyderabad', 'Kolkata', 'Pune', 'Ahmedabad'].map((city, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleLocationSelect(city)}
                          className={`w-full text-left px-3 py-2 rounded-lg flex items-center justify-between transition-all duration-150 ${currentLocation.includes(city)
                            ? 'bg-blue-50 text-blue-600 border border-blue-200'
                            : 'hover:bg-gray-50 text-gray-700'
                            }`}
                        >
                          <div>
                            <div className="font-medium text-sm">{city}</div>
                          </div>
                          {currentLocation.includes(city) && (
                            <CheckCircle className="h-4 w-4 text-blue-500" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Search Button */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 rounded-lg bg-gray-100 hover:bg-blue-50 text-gray-600 
                         hover:text-blue-500 transition-all duration-200 hidden lg:flex items-center space-x-2"
              >
                <Search className="h-4 w-4" />
                <span className="text-sm font-medium">Search</span>
              </button>

              {/* Emergency Button */}
              <button
                onClick={handleEmergency}
                className="px-3 py-2 bg-gradient-to-r from-red-600 to-red-500 text-white 
                         rounded-lg font-semibold shadow hover:shadow-md hover:scale-105 
                         transition-all duration-200 flex items-center space-x-2 group overflow-hidden"
              >
                <Ambulance className="h-4 w-4" />
                <span className="text-sm">Emergency</span>
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-white rounded-full animate-ping"></div>
              </button>

              {/* Notifications */}
              <button
                onClick={() => {
                  navigate("/notifications");
                  setUnreadCount(0);
                }}
                className="relative p-2 rounded-lg bg-gray-100 hover:bg-blue-50 text-gray-600 
                 hover:text-blue-500 transition-all duration-200"
              >
                <Bell className="h-4 w-4" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-red-500 to-red-400 text-white text-xs 
                        rounded-full flex items-center justify-center shadow">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* User Profile or Auth */}
              {isLoggedIn ? (
                <div className="relative" ref={profileRef}>
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center space-x-2 p-1 rounded-lg hover:bg-gray-100 transition-all duration-200 group"
                  >
                    <div className="relative">
                      <div className={`relative w-9 h-9 rounded-full ${userTypeConfig?.gradient || 'bg-gradient-to-r from-blue-600 to-blue-500'} 
                                    flex items-center justify-center text-white font-semibold shadow`}>
                        {getUserInitials()}
                      </div>
                    </div>
                  </button>

                  {isProfileOpen && (
                    <div className="absolute top-full mt-2 right-0 w-72 bg-white rounded-xl shadow-xl border border-gray-200 p-3 z-50 animate-fadeIn">
                      <div className="flex items-center space-x-3 pb-3 border-b border-gray-200">
                        <div className="relative">
                          <div className={`w-10 h-10 rounded-full ${userTypeConfig?.gradient || 'bg-gradient-to-r from-blue-600 to-blue-500'} 
                                        flex items-center justify-center text-white font-bold shadow`}>
                            {getUserInitials()}
                          </div>
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-gray-800 text-sm">{getUserDisplayName()}</h3>
                          <div className="flex items-center space-x-2 mt-1">
                            <span className={`text-xs ${userTypeConfig?.bgColor || 'bg-blue-50'} ${userTypeConfig?.textColor || 'text-blue-700'} px-2 py-1 rounded-full border ${userTypeConfig?.borderColor || 'border-blue-200'}`}>
                              {getUserTypeLabel()}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="py-2 space-y-1 max-h-64 overflow-y-auto scrollbar-hide">
                        {profileItems.map((item, idx) => (
                          <button
                            key={idx}
                            onClick={() => {
                              navigate(item.path);
                              setIsProfileOpen(false);
                            }}
                            className="w-full flex items-center justify-between px-2 py-2 rounded-lg hover:bg-gray-50 
                                     transition-all duration-150 group"
                          >
                            <div className="flex items-center space-x-3">
                              <div className={`p-1.5 rounded-lg ${item.bgColor}`}>
                                <item.icon className={`h-4 w-4 ${item.textColor}`} />
                              </div>
                              <div className="text-left">
                                <div className="font-medium text-gray-800 text-sm">{item.label}</div>
                                <div className="text-xs text-gray-500">{item.description}</div>
                              </div>
                            </div>
                            <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-0.5 transition-transform" />
                          </button>
                        ))}
                      </div>

                      {/* Quick Stats */}
                      <div className="pt-3 border-t border-gray-200">
                        <div className="grid grid-cols-3 gap-2">
                          <div className="text-center p-2 bg-red-50 rounded-lg border border-red-100">
                            <div className="text-sm font-bold text-red-600">{userStats.donations}</div>
                            <div className="text-xs text-gray-600">Donations</div>
                          </div>
                          <div className="text-center p-2 bg-blue-50 rounded-lg border border-blue-100">
                            <div className="text-sm font-bold text-blue-600">{userStats.livesSaved}</div>
                            <div className="text-xs text-gray-600">Lives Saved</div>
                          </div>
                          <div className="text-center p-2 bg-green-50 rounded-lg border border-green-100">
                            <div className="text-sm font-bold text-green-600">{userStats.points}</div>
                            <div className="text-xs text-gray-600">Points</div>
                          </div>
                        </div>
                      </div>

                      <div className="mt-3">
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center justify-center space-x-2 px-3 py-2 bg-gray-100 
                                   text-gray-700 rounded-lg font-medium hover:bg-red-50 hover:text-red-600 
                                   border border-gray-200 transition-all duration-200"
                        >
                          <LogOut className="h-4 w-4" />
                          <span className="text-sm">Logout</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  {/* <button
                    onClick={handleLoginClick}
                    className="px-3 py-2 text-blue-600 hover:text-blue-700 font-medium rounded-lg 
                             hover:bg-blue-50 transition-all duration-200 flex items-center space-x-2 border border-blue-200"
                  >
                    <LogIn className="h-4 w-4" />
                    <span className="text-sm font-medium">Login</span>
                  </button> */}
                  <button
                    onClick={handleRegisterClick}
                    className="px-3 py-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white 
                             rounded-lg font-semibold hover:shadow-md hover:scale-105 transition-all duration-200 
                             flex items-center space-x-2"
                  >
                    <UserPlus className="h-4 w-4" />
                    <span className="text-sm">Register</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* TABLET NAVBAR (768px - 1024px) */}
      <nav className={`hidden md:block lg:hidden fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${isScrolled
        ? 'bg-white shadow py-2'
        : 'bg-white py-3'
        }`}>
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center justify-between">
            
            {/* Logo */}
            <button
              onClick={() => navigate('/')}
              className="flex items-center space-x-2"
            >
              <div className="bg-gradient-to-r from-blue-600 to-blue-500 w-9 h-9 rounded-full flex items-center justify-center shadow">
                <Heart className="h-4 w-4 text-white" fill="white" />
              </div>
              <div>
                <h1 className="font-bold text-lg bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">
                  LifeStream
                </h1>
              </div>
            </button>

            {/* Compact Navigation */}
            <div className="flex items-center space-x-1">
              {mainNavItems.slice(0, 3).map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleTabClick(item.path, item.id)}
                  className={`px-2 py-1.5 rounded-lg text-sm font-medium ${activeTab === item.id
                    ? `text-white ${getMobileBgColor(item.id)}`
                    : 'text-gray-700 hover:bg-gray-100'
                    }`}
                >
                  <item.icon className="h-4 w-4 inline mr-1" />
                  <span className="hidden sm:inline">{item.label.split(' ')[0]}</span>
                </button>
              ))}
            </div>

            {/* Right Actions */}
            <div className="flex items-center space-x-2">
              <button
                onClick={handleEmergency}
                className="px-2 py-1.5 bg-red-500 text-white rounded-lg text-sm font-medium flex items-center"
              >
                <Ambulance className="h-4 w-4 mr-1" />
                <span className="hidden sm:inline">Emergency</span>
              </button>
              
              {isLoggedIn ? (
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="relative"
                >
                  <div className={`w-8 h-8 rounded-full ${userTypeConfig?.gradient || 'bg-gradient-to-r from-blue-600 to-blue-500'} 
                                flex items-center justify-center text-white font-semibold text-sm`}>
                    {getUserInitials()}
                  </div>
                </button>
              ) : (
                <button
                  onClick={handleLoginClick}
                  className="px-2 py-1.5 text-blue-600 font-medium text-sm"
                >
                  Login
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* MOBILE TOP BAR */}
      <div className={`md:hidden fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${isScrolled
        ? 'bg-white shadow py-2 border-b border-gray-200'
        : 'bg-white py-3'
        }`}>
        <div className="px-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <button
              onClick={() => navigate('/')}
              className="flex items-center space-x-2"
            >
              <div className="bg-gradient-to-r from-blue-600 to-blue-500 w-10 h-10 rounded-full flex items-center justify-center shadow">
                <Heart className="h-5 w-5 text-white" fill="white" />
              </div>
              <div>
                <h1 className="font-bold text-lg bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">
                  LifeStream
                </h1>
              </div>
            </button>

            {/* Right Actions */}
            <div className="flex items-center space-x-2">
              <button
                onClick={handleEmergency}
                className="relative p-2 rounded-lg bg-red-50 text-red-600 border border-red-200"
              >
                <Ambulance className="h-5 w-5" />
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              </button>
              
              <button
                onClick={() => navigate('/notifications')}
                className="relative p-2 rounded-lg bg-gray-100"
              >
                <Bell className="h-5 w-5 text-gray-600" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>
              
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="p-2 rounded-lg bg-gray-100"
              >
                <Menu className="h-5 w-5 text-gray-600" />
              </button>
            </div>
          </div>

          {/* Search and Location Bar */}
          <div className="mt-3">
            <div className="flex items-center space-x-2">
              <div className="flex-1 relative" ref={searchRef}>
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search donors, hospitals..."
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg 
                           focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent
                           text-sm"
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch(e)}
                />
              </div>
              
              <button
                onClick={() => setIsLocationOpen(!isLocationOpen)}
                className="p-2.5 rounded-lg bg-gray-50 border border-gray-200"
              >
                <MapPin className="h-4 w-4 text-blue-500" />
              </button>
            </div>
          </div>
        </div>
      </div>


      {/* MOBILE BOTTOM NAVIGATION */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 shadow-lg py-2 px-4">
        <div className="flex justify-around items-center">
          {mobileNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => handleTabClick(item.path, item.id)}
                className={`flex flex-col items-center justify-center relative transition-all duration-200 
                          ${isActive ? 'transform -translate-y-1' : ''}`}
              >
                {/* Icon Container */}
                <div className={`p-2.5 rounded-lg transition-all duration-200 relative ${isActive
                  ? `text-white ${getMobileBgColor(item.id)} shadow`
                  : 'bg-gray-100 text-gray-400'
                  }`}>
                  <Icon className={`h-5 w-5 ${isActive ? 'text-white' : item.color}`}
                    fill={isActive ? 'white' : 'none'}
                    strokeWidth={isActive ? 2.5 : 1.5} />

                  {/* Badges */}
                  {item.badge && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] 
                                    rounded-full flex items-center justify-center animate-pulse border border-white">
                      {item.badge}
                    </span>
                  )}
                </div>

                {/* Label */}
                <span className={`mt-1 text-xs font-medium transition-colors duration-200 ${getMobileTextColor(item.id, isActive)}`}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* MOBILE FULL-SCREEN MENU */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-white animate-slideIn overflow-y-auto">
          <div className="p-4">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="bg-gradient-to-r from-blue-600 to-blue-500 w-12 h-12 rounded-full flex items-center justify-center shadow">
                  <Heart className="h-6 w-6 text-white" fill="white" />
                </div>
                <div>
                  <h1 className="font-bold text-xl bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">
                    LifeStream
                  </h1>
                  <p className="text-sm text-gray-600">Saving Lives Together</p>
                </div>
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 rounded-lg bg-gray-100"
              >
                <X className="h-5 w-5 text-gray-600" />
              </button>
            </div>

            {/* User Section */}
            {isLoggedIn ? (
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-4 mb-6 border border-blue-200">
                <div className="flex items-center space-x-3">
                  <div className={`w-14 h-14 rounded-full ${userTypeConfig?.gradient || 'bg-gradient-to-r from-blue-600 to-blue-500'} 
                                flex items-center justify-center text-white font-bold text-xl shadow`}>
                    {getUserInitials()}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-gray-800">{getUserDisplayName()}</h3>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-sm bg-white text-blue-600 px-3 py-1 rounded-full border border-blue-200">
                        {getUserTypeLabel()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-3 gap-3 mt-4">
                  <div className="text-center p-3 bg-white rounded-lg border border-red-100">
                    <div className="text-lg font-bold text-red-600">{userStats.donations}</div>
                    <div className="text-xs text-gray-600">Donations</div>
                  </div>
                  <div className="text-center p-3 bg-white rounded-lg border border-blue-100">
                    <div className="text-lg font-bold text-blue-600">{userStats.livesSaved}</div>
                    <div className="text-xs text-gray-600">Lives Saved</div>
                  </div>
                  <div className="text-center p-3 bg-white rounded-lg border border-green-100">
                    <div className="text-lg font-bold text-green-600">{userStats.points}</div>
                    <div className="text-xs text-gray-600">Points</div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3 mb-6">
                <button
                  onClick={() => {
                    handleLoginClick();
                    setIsMobileMenuOpen(false);
                  }}
                  className="px-4 py-3 text-blue-600 font-medium rounded-lg border border-blue-200 hover:bg-blue-50 transition-colors"
                >
                  Login
                </button>
                <button
                  onClick={() => {
                    handleRegisterClick();
                    setIsMobileMenuOpen(false);
                  }}
                  className="px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white 
                           font-semibold rounded-lg hover:shadow transition-all"
                >
                  Register
                </button>
              </div>
            )}

            {/* Navigation Links */}
            <div className="space-y-1 mb-6">
              <h3 className="font-bold text-gray-800 mb-3">Navigation</h3>
              {[...mainNavItems, ...secondaryNavItems].map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleTabClick(item.path, item.id)}
                  className={`w-full text-left px-4 py-3 rounded-lg flex items-center justify-between 
                           transition-colors ${activeTab === item.id ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'}`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${activeTab === item.id ? item.bgColor : 'bg-gray-100'}`}>
                      <item.icon className={`h-5 w-5 ${activeTab === item.id ? item.textColor : 'text-gray-600'}`} />
                    </div>
                    <div className="text-left">
                      <div className="font-medium">{item.label}</div>
                      <div className="text-xs text-gray-500">{item.description}</div>
                    </div>
                  </div>
                  <ChevronRight className="h-4 w-4 text-gray-400" />
                </button>
              ))}
            </div>

            {/* Contact Info */}
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-4 mb-6 border border-gray-200">
              <h3 className="font-bold text-gray-800 mb-3">Contact & Support</h3>
              <div className="space-y-2">
                {contactInfo.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div key={idx} className={`flex items-center space-x-3 px-3 py-2 rounded-lg ${item.bgColor}`}>
                      <Icon className={`h-4 w-4 ${item.textColor}`} />
                      <div className="flex-1">
                        <div className="text-xs text-gray-600">{item.label}</div>
                        <div className={`font-medium ${item.textColor}`}>{item.value}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Emergency Section */}
            <div className="bg-gradient-to-r from-red-50 to-red-100 rounded-xl p-4 mb-6 border border-red-200">
              <h3 className="font-bold text-gray-800 mb-2">Emergency Assistance</h3>
              <p className="text-sm text-gray-600 mb-4">Need immediate help? Available 24/7</p>
              <button
                onClick={handleEmergency}
                className="w-full px-4 py-3 bg-gradient-to-r from-red-600 to-red-500 
                         text-white rounded-lg font-bold flex items-center justify-center space-x-2"
              >
                <Ambulance className="h-5 w-5" />
                <span>Emergency Request</span>
              </button>
            </div>

            {/* Footer */}
            <div className="text-center pt-4 border-t border-gray-200">
              {isLoggedIn && (
                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium 
                           hover:bg-red-50 hover:text-red-600 transition-colors mb-4"
                >
                  Logout
                </button>
              )}
              <p className="text-sm text-gray-500">© 2024 LifeStream. All rights reserved.</p>
            </div>
          </div>
        </div>
      )}

      {/* SEARCH MODAL */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm animate-fadeIn">
          <div className="absolute inset-0" onClick={() => setIsSearchOpen(false)}></div>
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-full max-w-2xl px-4">
            <div className="bg-white rounded-xl shadow-2xl p-4 animate-fadeIn">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for blood donors, hospitals, information..."
                  className="w-full pl-12 pr-10 py-3 bg-gray-50 border border-gray-200 rounded-lg 
                           focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent
                           text-sm"
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
                  {quickLinks.map((link, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        navigate(link.path);
                        setIsSearchOpen(false);
                      }}
                      className={`px-3 py-2 rounded-lg ${link.bgColor} border ${link.borderColor} flex items-center space-x-2 hover:opacity-90 transition-opacity`}
                    >
                      <link.icon className={`h-4 w-4 ${link.textColor}`} />
                      <span className={`text-sm font-medium ${link.textColor}`}>{link.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add padding to account for fixed navbar */}
      <div className="lg:pt-16 md:pt-16 pt-36"></div>
    </>
  );
};

export default Navbar;