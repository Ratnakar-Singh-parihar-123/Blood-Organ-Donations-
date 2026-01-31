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
  ActivityIcon,
  Hospital, Ambulance,
  CheckCircle, ChevronRight,
  Sparkles, Zap, MoreVertical,
  Info, Target, BookOpen
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
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

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

  // Check login status from localStorage for all user types
  useEffect(() => {
    checkUserAuth();
  }, [location]);

  const checkUserAuth = () => {
    const userTypes = [
      { key: 'bloodDonor', label: 'Blood Donor', color: 'from-red-500 to-rose-500' },
      { key: 'organDonor', label: 'Organ Donor', color: 'from-emerald-500 to-green-500' },
      { key: 'patient', label: 'Patient', color: 'from-amber-500 to-orange-500' },
      { key: 'user', label: 'User', color: 'from-blue-500 to-cyan-500' }
    ];

    for (const type of userTypes) {
      const token = localStorage.getItem(`${type.key}Token`);
      const data = localStorage.getItem(type.key);

      if (token && data) {
        try {
          const parsedData = JSON.parse(data);
          setIsLoggedIn(true);
          setUserData(parsedData);
          setUserType(type.key);
          return;
        } catch (error) {
          console.error('Error parsing user data:', error);
        }
      }
    }

    // No user found
    setIsLoggedIn(false);
    setUserData(null);
    setUserType('');
  };

  // Update active tab based on current route
  useEffect(() => {
    const path = location.pathname;
    if (path === '/') setActiveTab('home');
    else if (path.includes('/blood')) setActiveTab('blood');
    else if (path.includes('/organ')) setActiveTab('organ');
    else if (path.includes('/urgent-requests')) setActiveTab('urgent');
    else if (path.includes('/profile')) setActiveTab('profile');
    else if (path.includes('/about')) setActiveTab('about');
    else if (path.includes('/auth')) setActiveTab('auth');
    else if (path.includes('/settings')) setActiveTab('settings');
  }, [location]);

  // Main navigation items - shown always on desktop
  const mainNavItems = [
    // { 
    //   id: 'home', 
    //   label: 'Home', 
    //   icon: Home,
    //   path: '/',
    //   description: 'Return to homepage'
    // },
    {
      id: 'blood',
      label: 'Blood',
      icon: Droplets,
      path: '/blood',
      description: 'Blood donation'
    },
    {
      id: 'organ',
      label: 'Organ',
      icon: ActivityIcon,
      path: '/organ',
      description: 'Organ donation'
    },
    {
      id: 'urgent',
      label: 'Urgent',
      icon: AlertCircle,
      path: '/urgent-requests',
      description: 'Emergency requests',
      badge: 3
    }
  ];

  // Secondary navigation items - shown in "More" dropdown on desktop
  const secondaryNavItems = [
    {
      id: 'about',
      label: 'About',
      icon: Info,
      path: '/about',
      description: 'About us'
    },
    {
      id: 'resources',
      label: 'Resources',
      icon: BookOpen,
      path: '/resources',
      description: 'Educational resources'
    },
    {
      id: 'hospitals',
      label: 'Hospitals',
      icon: Hospital,
      path: '/hospitals',
      description: 'Find hospitals'
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: Settings,
      path: '/settings',
      description: 'Account settings'
    }
  ];

  // Mobile nav items
  const mobileNavItems = [
    {
      id: 'home',
      label: 'Home',
      icon: Home,
      path: '/',
      color: 'text-rose-500',
      pulse: false
    },
    {
      id: 'blood',
      label: 'Blood',
      icon: Droplets,
      path: '/blood',
      color: 'text-red-500',
      pulse: true
    },
    {
      id: 'organ',
      label: 'Organ',
      icon: ActivityIcon,
      path: '/organ',
      color: 'text-emerald-500',
      pulse: false
    },
    {
      id: 'urgent',
      label: 'Urgent',
      icon: AlertCircle,
      path: '/urgent-requests',
      color: 'text-amber-500',
      pulse: true,
      badge: 3
    },
    {
      id: 'profile',
      label: 'Profile',
      icon: User,
      path: '/profile',
      color: 'text-blue-500',
      pulse: false
    }
  ];

  // Profile dropdown items
  const profileItems = [
    {
      label: 'My Profile',
      icon: User,
      path: '/profile',
      color: 'text-gray-700',
      description: 'View your profile'
    },
    {
      label: 'My Donations',
      icon: History,
      path: '/donations',
      color: 'text-rose-600',
      description: 'Donation history'
    },
    {
      label: 'Achievements',
      icon: Award,
      path: '/achievements',
      color: 'text-amber-600',
      description: 'Your achievements'
    },
    {
      label: 'Saved Donors',
      icon: Bookmark,
      path: '/saved',
      color: 'text-blue-600',
      description: 'Saved donors list'
    },
    {
      label: 'Rewards',
      icon: Gift,
      path: '/rewards',
      color: 'text-purple-600',
      description: 'Your rewards'
    },
    {
      label: 'Help Center',
      icon: LifeBuoy,
      path: '/help',
      color: 'text-emerald-600',
      description: 'Get help'
    }
  ];

  // Quick links for search
  const quickLinks = [
    { label: 'Blood Donation Process', path: '/process', icon: Droplets, color: 'bg-red-50 text-red-600' },
    { label: 'Organ Donation Info', path: '/organ-info', icon: ActivityIcon, color: 'bg-emerald-50 text-emerald-600' },
    { label: 'Donor Eligibility', path: '/eligibility', icon: Shield, color: 'bg-blue-50 text-blue-600' },
    { label: 'Find Blood Bank', path: '/blood-banks', icon: Hospital, color: 'bg-rose-50 text-rose-600' }
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
    // Clear all user data
    const types = ['bloodDonor', 'organDonor', 'patient', 'user'];
    types.forEach(type => {
      localStorage.removeItem(`${type}Token`);
      localStorage.removeItem(type);
      localStorage.removeItem(`${type}Data`);
    });

    setIsLoggedIn(false);
    setUserData(null);
    setUserType('');
    setIsProfileOpen(false);
    navigate('/');
  };

  // Handle emergency request
  const handleEmergency = () => {
    navigate('/emergency-request');
  };

  // Handle location select
  const handleLocationSelect = (city) => {
    setCurrentLocation(city);
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
    switch (userType) {
      case 'bloodDonor': return 'Blood Donor';
      case 'organDonor': return 'Organ Donor';
      case 'patient': return 'Patient/Family';
      case 'user': return 'Community Member';
      default: return 'User';
    }
  };

  // Get user stats
  const getUserStats = () => {
    if (!userData) return { donations: 0, points: 0, level: 'Beginner' };

    return {
      donations: userData.donationCount || userData.donations || 0,
      points: userData.points || 0,
      level: userData.level || 'Beginner'
    };
  };

  // CSS for animations
  const styles = `
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
    
    .animate-ping {
      animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;
    }
    
    @keyframes ping {
      75%, 100% {
        transform: scale(2);
        opacity: 0;
      }
    }
  `;

  return (
    <>
      <style>{styles}</style>

      {/* DESKTOP NAVBAR - Optimized for Laptop Screens */}
      <nav className={`hidden lg:block fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
        ? 'bg-white/95 backdrop-blur-xl shadow-2xl shadow-gray-200/50 py-3 border-b border-gray-100/50'
        : 'bg-gradient-to-r from-white/95 via-white/90 to-white/95 backdrop-blur-lg py-3'
        }`}>
        <div className="max-w-7xl mx-auto px-4 xl:px-8">
          <div className="flex items-center justify-between">

            {/* Logo Section */}
            <button
              onClick={() => navigate('/')}
              className="flex items-center space-x-3 group cursor-pointer flex-shrink-0"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-rose-500 via-rose-400 to-pink-500 rounded-full blur-lg opacity-70 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative bg-gradient-to-r from-rose-500 to-rose-400 w-12 h-12 rounded-full flex items-center justify-center shadow-xl shadow-rose-200/50 group-hover:shadow-rose-300/50 transition-shadow duration-500">
                  <Heart className="h-6 w-6 text-white" fill="white" />
                  <Droplets className="h-3 w-3 text-white absolute -bottom-1 -right-1" />
                  <Sparkles className="h-3 w-3 text-yellow-300 absolute -top-1 -left-1 animate-pulse" />
                </div>
              </div>
              <div className="text-left">
                <h1 className="text-xl font-bold bg-gradient-to-r from-rose-600 via-rose-500 to-pink-500 bg-clip-text text-transparent">
                  LifeStream
                </h1>
                <p className="text-xs text-gray-500 font-medium flex items-center">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full mr-2 animate-pulse"></span>
                  Save Lives, Donate Today
                </p>
              </div>
            </button>

            {/* Primary Navigation - Always visible */}
            <div className="flex items-center space-x-1 px-4">
              {mainNavItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleTabClick(item.path, item.id)}
                  className={`px-4 py-2.5 font-medium rounded-xl transition-all duration-300 relative group ${activeTab === item.id
                    ? 'text-white bg-gradient-to-r from-rose-500 to-rose-400 shadow-lg shadow-rose-200/50'
                    : 'text-gray-700 hover:text-rose-600 hover:bg-rose-50/80'
                    }`}
                >
                  <div className="flex items-center space-x-2">
                    <item.icon className={`h-4 w-4 ${activeTab === item.id ? 'text-white' : 'text-gray-500'}`} />
                    <span className="whitespace-nowrap">{item.label}</span>
                    {item.badge && (
                      <span className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center animate-pulse shadow-lg">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  {!activeTab.includes(item.id) && (
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 group-hover:w-4/5 h-0.5 bg-gradient-to-r from-rose-400 to-pink-400 rounded-full transition-all duration-300"></div>
                  )}
                </button>
              ))}

              {/* More Dropdown for secondary items */}
              <div className="relative" ref={moreRef}>
                <button
                  onClick={() => setIsMoreOpen(!isMoreOpen)}
                  className={`px-4 py-2.5 font-medium rounded-xl transition-all duration-300 relative group flex items-center space-x-2 ${isMoreOpen
                    ? 'text-rose-600 bg-rose-50/80'
                    : 'text-gray-700 hover:text-rose-600 hover:bg-rose-50/80'
                    }`}
                >
                  <MoreVertical className="h-4 w-4" />
                  <span>More</span>
                  <ChevronDown className={`h-3 w-3 transition-transform duration-300 ${isMoreOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* More Dropdown Menu */}
                {isMoreOpen && (
                  <div className="absolute top-full mt-2 left-0 w-64 bg-white rounded-2xl shadow-2xl 
                                border border-gray-100 p-4 z-50 animate-fadeIn">
                    <h4 className="font-semibold text-gray-800 mb-3 px-2">More Options</h4>
                    <div className="space-y-1">
                      {secondaryNavItems.map((item) => (
                        <button
                          key={item.id}
                          onClick={() => handleTabClick(item.path, item.id)}
                          className="w-full text-left px-3 py-2.5 rounded-lg flex items-center space-x-3 hover:bg-gray-50 transition-all duration-200 group"
                        >
                          <div className={`p-2 rounded-lg ${activeTab === item.id ? 'bg-rose-100 text-rose-600' : 'bg-gray-100 text-gray-600'}`}>
                            <item.icon className="h-4 w-4" />
                          </div>
                          <div className="text-left">
                            <div className="font-medium text-gray-800">{item.label}</div>
                            <div className="text-xs text-gray-500">{item.description}</div>
                          </div>
                        </button>
                      ))}
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <button
                        onClick={() => navigate('/contact')}
                        className="w-full text-center text-sm text-rose-600 hover:text-rose-700 font-medium"
                      >
                        Contact Support
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-3">
              {/* Location Selector */}
              <div className="relative hidden xl:block" ref={profileRef}>
                <button
                  onClick={() => setIsLocationOpen(!isLocationOpen)}
                  className="flex items-center space-x-2 px-4 py-2.5 rounded-xl border border-gray-200/80 
                            hover:border-rose-300 transition-all duration-300 cursor-pointer bg-white/80 
                            hover:bg-white shadow-sm hover:shadow-md"
                >
                  <div className="relative">
                    <MapPin className="h-4 w-4 text-rose-500" />
                    <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                  </div>
                  <span className="text-gray-700 text-sm font-medium">{currentLocation.split(',')[0]}</span>
                  <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform duration-300 ${isLocationOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Location Dropdown */}
                {isLocationOpen && (
                  <div className="absolute top-full mt-2 right-0 w-64 bg-white rounded-2xl shadow-2xl 
                                border border-gray-100 p-4 z-50 animate-fadeIn">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold text-gray-800">Select Location</h4>
                      <MapPin className="h-4 w-4 text-rose-500" />
                    </div>
                    <div className="space-y-2 max-h-56 overflow-y-auto">
                      {['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Hyderabad', 'Kolkata', 'Pune', 'Ahmedabad'].map((city, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleLocationSelect(city)}
                          className={`w-full text-left px-4 py-3 rounded-xl flex items-center justify-between transition-all duration-200 ${currentLocation.includes(city)
                            ? 'bg-gradient-to-r from-rose-50 to-pink-50 text-rose-600 border border-rose-200'
                            : 'hover:bg-gray-50 text-gray-700'
                            }`}
                        >
                          <div>
                            <div className="font-medium">{city}</div>
                          </div>
                          {currentLocation.includes(city) && (
                            <CheckCircle className="h-5 w-5 text-rose-500" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Search Button for Desktop */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2.5 rounded-xl bg-gray-100 hover:bg-rose-50 text-gray-600 
                         hover:text-rose-500 transition-all duration-300 hover:scale-105 group hidden xl:flex items-center space-x-2"
              >
                <Search className="h-5 w-5" />
                <span className="text-sm font-medium">Search</span>
              </button>

              {/* Emergency Button */}
              <button
                onClick={handleEmergency}
                className="relative px-4 py-2.5 bg-gradient-to-r from-red-500 via-rose-500 to-pink-500 
                         text-white rounded-xl font-semibold shadow-lg shadow-red-200/50 hover:shadow-xl 
                         hover:shadow-red-300/50 hover:scale-105 transition-all duration-300 
                         flex items-center space-x-2 group overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-red-600 via-rose-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <Ambulance className="h-5 w-5 relative z-10" />
                <span className="relative z-10 hidden lg:inline">Emergency</span>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full animate-ping"></div>
              </button>

              {/* Notifications */}
              <button
                onClick={() => {
                  navigate("/notifications");
                  setUnreadCount(0); // reset unread count on open
                }}
                className="relative p-2.5 rounded-xl bg-gray-100 hover:bg-rose-50 text-gray-600 
                 hover:text-rose-500 transition-all duration-300 hover:scale-105 group"
              >
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-red-500 to-rose-500 text-white text-xs 
                        rounded-full flex items-center justify-center animate-pulse shadow-lg">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* User Profile or Auth */}
              {isLoggedIn ? (
                <div className="relative" ref={profileRef}>
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center space-x-2 p-1.5 rounded-xl hover:bg-gray-100 transition-all duration-300 group"
                  >
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-rose-400 to-pink-400 rounded-full blur opacity-70 group-hover:opacity-100 transition-opacity"></div>
                      <div className="relative w-10 h-10 rounded-full bg-gradient-to-r from-rose-400 to-rose-300 
                                    flex items-center justify-center text-white font-semibold shadow-lg">
                        {getUserInitials()}
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white"></div>
                    </div>
                  </button>

                  {/* Profile Dropdown */}
                  {isProfileOpen && (
                    <div className="absolute top-full mt-2 right-0 w-80 bg-white rounded-2xl shadow-2xl 
                                  border border-gray-100 p-4 z-50 animate-fadeIn">
                      <div className="flex items-center space-x-3 pb-4 border-b border-gray-100">
                        <div className="relative">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-rose-400 to-rose-300 
                                        flex items-center justify-center text-white font-bold text-lg shadow-lg">
                            {getUserInitials()}
                          </div>
                          <Star className="absolute -top-1 -right-1 h-5 w-5 text-amber-500" fill="currentColor" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-gray-800">{getUserDisplayName()}</h3>
                          <div className="flex items-center space-x-2 mt-1">
                            <span className="text-xs bg-gradient-to-r from-amber-50 to-amber-100 text-amber-700 px-2 py-1 rounded-full border border-amber-200">
                              <Star className="h-3 w-3 inline mr-1" fill="currentColor" />
                              {getUserStats().level}
                            </span>
                            <span className="text-xs text-gray-500">{getUserTypeLabel()}</span>
                          </div>
                        </div>
                      </div>

                      <div className="py-3 space-y-1">
                        {profileItems.map((item, idx) => (
                          <button
                            key={idx}
                            onClick={() => {
                              navigate(item.path);
                              setIsProfileOpen(false);
                            }}
                            className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-gray-50 
                                     transition-all duration-200 group"
                          >
                            <div className="flex items-center space-x-3">
                              <div className={`p-2 rounded-lg ${item.color.replace('text-', 'bg-').replace('-600', '-50').replace('-700', '-50')}`}>
                                <item.icon className={`h-4 w-4 ${item.color}`} />
                              </div>
                              <div className="text-left">
                                <div className="font-medium text-gray-800">{item.label}</div>
                                <div className="text-xs text-gray-500">{item.description}</div>
                              </div>
                            </div>
                            <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 transition-transform" />
                          </button>
                        ))}
                      </div>

                      {/* Quick Stats */}
                      <div className="pt-4 border-t border-gray-100">
                        <div className="grid grid-cols-3 gap-2">
                          <div className="text-center p-3 bg-gradient-to-br from-rose-50 to-pink-50 rounded-xl border border-rose-100">
                            <div className="text-lg font-bold text-rose-600">{getUserStats().donations}</div>
                            <div className="text-xs text-gray-600">Donations</div>
                          </div>
                          <div className="text-center p-3 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border border-blue-100">
                            <div className="text-lg font-bold text-blue-600">{getUserStats().donations * 3}</div>
                            <div className="text-xs text-gray-600">Lives Saved</div>
                          </div>
                          <div className="text-center p-3 bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl border border-emerald-100">
                            <div className="text-lg font-bold text-emerald-600">{getUserStats().points}</div>
                            <div className="text-xs text-gray-600">Points</div>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4">
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-gray-50 to-gray-100 
                                   text-gray-700 rounded-xl font-medium hover:bg-gradient-to-r hover:from-red-50 hover:to-rose-50 
                                   hover:text-red-600 border border-gray-200 hover:border-red-200 transition-all duration-300"
                        >
                          <LogOut className="h-4 w-4" />
                          <span>Logout</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => navigate('/auth')}
                    className="px-4 py-2.5 text-rose-600 hover:text-rose-700 font-medium rounded-xl 
                             hover:bg-rose-50 transition-all duration-300 flex items-center space-x-2"
                  >
                    <LogIn className="h-5 w-5" />
                    <span className="hidden lg:inline">Login</span>
                  </button>
                  {/* <button
                    onClick={() => navigate('/auth')}
                    className="px-4 py-2.5 bg-gradient-to-r from-rose-500 via-rose-400 to-pink-500 text-white 
                             rounded-xl font-semibold shadow-lg shadow-rose-200/50 hover:shadow-xl 
                             hover:shadow-rose-300/50 hover:scale-105 transition-all duration-300 
                             hover:from-rose-600 hover:via-rose-500 hover:to-pink-600 flex items-center space-x-2 group"
                  >
                    <UserPlus className="h-5 w-5" />
                    <span className="hidden lg:inline">Register</span>
                  </button> */}
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Top Bar */}
      <div className={`lg:hidden fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${isScrolled
        ? 'bg-white/95 backdrop-blur-xl shadow-lg py-3 border-b border-gray-100/50'
        : 'bg-gradient-to-b from-white/95 via-white/90 to-transparent py-4'
        }`}>
        <div className="px-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <button
              onClick={() => navigate('/')}
              className="flex items-center space-x-2"
            >
              <div className="bg-gradient-to-r from-rose-500 to-rose-400 w-12 h-12 rounded-full flex items-center justify-center shadow-lg">
                <Heart className="h-6 w-6 text-white" fill="white" />
              </div>
              <div>
                <h1 className="font-bold text-lg bg-gradient-to-r from-rose-600 to-rose-500 bg-clip-text text-transparent">
                  LifeStream
                </h1>
              </div>
            </button>

            {/* Right Actions */}
            <div className="flex items-center space-x-2">
              <button
                onClick={handleEmergency}
                className="relative p-2 rounded-xl bg-gradient-to-r from-red-50 to-rose-50 text-red-600 border border-red-200"
              >
                <Ambulance className="h-5 w-5" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              </button>
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="p-2 rounded-xl bg-gray-100 hover:bg-rose-50 transition-colors"
              >
                <Menu className="h-5 w-5 text-gray-600" />
              </button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="mt-3">
            <div className="relative" ref={searchRef}>
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search donors, blood types..."
                className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl 
                         focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-transparent
                         shadow-sm text-sm"
                onKeyDown={(e) => e.key === 'Enter' && handleSearch(e)}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>

          {/* Location and Notifications */}
          <div className="mt-3 flex items-center justify-between">
            <button
              onClick={() => setIsLocationOpen(!isLocationOpen)}
              className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <MapPin className="h-4 w-4 text-rose-500" />
              <span className="text-sm text-gray-700">{currentLocation.split(',')[0]}</span>
              <ChevronDown className="h-3 w-3 text-gray-400" />
            </button>

            <button
              onClick={() => navigate('/notifications')}
              className="relative p-2 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <Bell className="h-5 w-5 text-gray-600" />
              {notifications > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {notifications}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-xl 
                     border-t border-gray-100 shadow-2xl py-3 px-4">
        <div className="flex justify-around items-center">
          {mobileNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => handleTabClick(item.path, item.id)}
                className={`flex flex-col items-center justify-center relative transition-all duration-300 
                          ${isActive ? 'transform -translate-y-3' : ''}`}
              >
                {/* Active Indicator */}
                {isActive && (
                  <>
                    <div className="absolute -top-4 w-14 h-14 bg-gradient-to-r from-rose-500/10 to-pink-500/10 rounded-full blur-lg"></div>
                    <div className="absolute -top-2 w-10 h-1 bg-gradient-to-r from-rose-500 to-pink-500 rounded-full"></div>
                  </>
                )}

                {/* Icon Container */}
                <div className={`p-3 rounded-xl transition-all duration-500 relative ${isActive
                  ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-lg shadow-rose-300/50'
                  : 'bg-gray-100 text-gray-400'
                  }`}>
                  <Icon className={`h-5 w-5 ${isActive ? 'text-white' : item.color}`}
                    fill={isActive ? 'white' : 'none'}
                    strokeWidth={isActive ? 2.5 : 1.5} />

                  {/* Badges */}
                  {item.badge && (
                    <span className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white text-xs 
                                    rounded-full flex items-center justify-center animate-pulse border-2 border-white">
                      {item.badge}
                    </span>
                  )}

                  {/* Pulse effect for important tabs */}
                  {item.pulse && !isActive && (
                    <div className="absolute inset-0 rounded-xl border-2 border-amber-400/30 animate-ping"></div>
                  )}
                </div>

                {/* Label */}
                <span className={`mt-2 text-xs font-medium transition-colors duration-300 ${isActive ? 'text-rose-600' : 'text-gray-500'
                  }`}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Mobile Full-screen Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-white/95 backdrop-blur-xl animate-fadeIn overflow-y-auto">
          <div className="p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-3">
                <div className="bg-gradient-to-r from-rose-500 to-rose-400 w-12 h-12 rounded-full flex items-center justify-center shadow-lg">
                  <Heart className="h-6 w-6 text-white" fill="white" />
                </div>
                <div>
                  <h1 className="font-bold text-2xl bg-gradient-to-r from-rose-600 to-rose-500 bg-clip-text text-transparent">
                    LifeStream
                  </h1>
                  <p className="text-sm text-gray-600">Save Lives, Donate Today</p>
                </div>
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-3 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                <X className="h-5 w-5 text-gray-600" />
              </button>
            </div>

            {/* User Section */}
            {isLoggedIn ? (
              <div className="bg-gradient-to-r from-rose-50 to-pink-50 rounded-2xl p-5 mb-8 border border-rose-100">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-rose-400 to-rose-300 
                                flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                    {getUserInitials()}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-xl text-gray-800">{getUserDisplayName()}</h3>
                    <div className="flex items-center space-x-2 mt-2">
                      <span className="text-sm bg-white text-rose-600 px-3 py-1 rounded-full border border-rose-200">
                        {getUserTypeLabel()}
                      </span>
                      <span className="text-sm bg-white text-amber-600 px-3 py-1 rounded-full border border-amber-200">
                        <Star className="h-3 w-3 inline mr-1" fill="currentColor" />
                        {getUserStats().level}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-3 gap-3 mt-6">
                  <div className="text-center p-3 bg-white rounded-xl border border-rose-100">
                    <div className="text-lg font-bold text-rose-600">{getUserStats().donations}</div>
                    <div className="text-xs text-gray-600">Donations</div>
                  </div>
                  <div className="text-center p-3 bg-white rounded-xl border border-blue-100">
                    <div className="text-lg font-bold text-blue-600">{getUserStats().donations * 3}</div>
                    <div className="text-xs text-gray-600">Lives Saved</div>
                  </div>
                  <div className="text-center p-3 bg-white rounded-xl border border-emerald-100">
                    <div className="text-lg font-bold text-emerald-600">{getUserStats().points}</div>
                    <div className="text-xs text-gray-600">Points</div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3 mb-8">
                <button
                  onClick={() => {
                    navigate('/auth');
                    setIsMobileMenuOpen(false);
                  }}
                  className="px-4 py-4 text-rose-600 hover:text-rose-700 font-medium rounded-xl 
                           hover:bg-rose-50 transition-all duration-300 flex items-center justify-center space-x-2 border border-rose-200"
                >
                  <LogIn className="h-5 w-5" />
                  <span>Login</span>
                </button>
                <button
                  onClick={() => {
                    navigate('/auth');
                    setIsMobileMenuOpen(false);
                  }}
                  className="px-4 py-4 bg-gradient-to-r from-rose-500 via-rose-400 to-pink-500 text-white 
                           rounded-xl font-semibold shadow-lg shadow-rose-200/50 hover:shadow-xl 
                           hover:shadow-rose-300/50 transition-all duration-300 hover:from-rose-600 
                           hover:via-rose-500 hover:to-pink-600 flex items-center justify-center space-x-2"
                >
                  <UserPlus className="h-5 w-5" />
                  <span>Register</span>
                </button>
              </div>
            )}

            {/* Navigation Links */}
            <div className="space-y-1 mb-8">
              <h3 className="font-bold text-gray-800 mb-4 px-2">Navigation</h3>
              {[...mainNavItems, ...secondaryNavItems].map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleTabClick(item.path, item.id)}
                  className={`w-full text-left px-4 py-4 rounded-xl flex items-center justify-between 
                           transition-all duration-200 ${activeTab === item.id ? 'bg-rose-50 text-rose-600' : 'hover:bg-gray-50'}`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`p-2.5 rounded-lg ${activeTab === item.id ? 'bg-rose-100' : 'bg-gray-100'}`}>
                      <item.icon className={`h-5 w-5 ${activeTab === item.id ? 'text-rose-600' : 'text-gray-600'}`} />
                    </div>
                    <div className="text-left">
                      <div className="font-medium">{item.label}</div>
                      <div className="text-xs text-gray-500">{item.description}</div>
                    </div>
                  </div>
                  {item.badge && (
                    <span className="w-6 h-6 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                      {item.badge}
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Profile Links (if logged in) */}
            {isLoggedIn && (
              <div className="space-y-1 mb-8">
                <h3 className="font-bold text-gray-800 mb-4 px-2">Profile</h3>
                {profileItems.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      navigate(item.path);
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-3 rounded-xl flex items-center space-x-3 hover:bg-gray-50 transition-all duration-200"
                  >
                    <div className={`p-2.5 rounded-lg ${item.color.replace('text-', 'bg-').replace('-600', '-50').replace('-700', '-50')}`}>
                      <item.icon className={`h-5 w-5 ${item.color}`} />
                    </div>
                    <div className="text-left">
                      <div className="font-medium text-gray-800">{item.label}</div>
                      <div className="text-xs text-gray-500">{item.description}</div>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {/* Emergency Section */}
            <div className="bg-gradient-to-r from-red-50 to-rose-50 rounded-2xl p-5 mb-8 border border-red-100">
              <h3 className="font-bold text-gray-800 mb-3">Emergency Assistance</h3>
              <p className="text-sm text-gray-600 mb-4">Need immediate help? Our team is available 24/7</p>
              <button
                onClick={handleEmergency}
                className="w-full px-4 py-4 bg-gradient-to-r from-red-500 via-rose-500 to-pink-500 
                         text-white rounded-xl font-bold shadow-lg shadow-red-200/50 
                         flex items-center justify-center space-x-2"
              >
                <Ambulance className="h-5 w-5" />
                <span>Emergency Request</span>
              </button>
            </div>

            {/* Footer */}
            <div className="text-center">
              {isLoggedIn && (
                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-4 bg-gray-100 text-gray-700 rounded-xl font-medium 
                           hover:bg-red-50 hover:text-red-600 transition-all duration-300 mb-4"
                >
                  Logout
                </button>
              )}
              <p className="text-sm text-gray-500">© 2024 LifeStream. All rights reserved.</p>
            </div>
          </div>
        </div>
      )}

      {/* Search Modal */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm animate-fadeIn">
          <div className="absolute inset-0" onClick={() => setIsSearchOpen(false)}></div>
          <div className="absolute top-20 left-1/2 transform -translate-x-1/2 w-full max-w-2xl px-4">
            <div className="bg-white rounded-2xl shadow-2xl p-4 animate-fadeIn">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for blood donors, hospitals, information..."
                  className="w-full pl-12 pr-10 py-4 bg-gray-50 border border-gray-200 rounded-xl 
                           focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-transparent
                           text-base placeholder-gray-400"
                  autoFocus
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch(e)}
                />
                <button
                  onClick={() => setIsSearchOpen(false)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 p-2 text-gray-400 hover:text-gray-600"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Quick Links */}
              <div className="mt-6">
                <h4 className="font-semibold text-gray-800 mb-3">Quick Links</h4>
                <div className="grid grid-cols-2 gap-3">
                  {quickLinks.map((link, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        navigate(link.path);
                        setIsSearchOpen(false);
                      }}
                      className={`px-4 py-3 rounded-xl ${link.color} flex items-center space-x-2 hover:opacity-90 transition-opacity`}
                    >
                      <link.icon className="h-4 w-4" />
                      <span className="text-sm font-medium">{link.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add padding to account for fixed navbar */}
      <div className="lg:pt-24 pt-48"></div>
    </>
  );
};

export default Navbar;