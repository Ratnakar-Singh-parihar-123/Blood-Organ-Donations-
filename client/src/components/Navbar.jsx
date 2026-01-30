import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Home, Heart, Bell, MessageCircle, User, 
  Search, MapPin, Menu, X, Droplets,
  Users, Calendar, Shield, ChevronDown,
  Globe, LogOut, Settings, HelpCircle,
  Filter, AlertCircle, Star, Award,
  Phone, ExternalLink, BookOpen,
  TrendingUp, Activity, History,
  Gift, LifeBuoy, ShieldCheck,
  Bookmark, LogIn, UserPlus,
  ActivityIcon, Compass, Clock,
  Hospital, Ambulance, Download,
  CheckCircle, ChevronRight,
  Sparkles, Zap
} from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchRef = useRef(null);
  const profileRef = useRef(null);
  
  const [activeTab, setActiveTab] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [currentLocation, setCurrentLocation] = useState('Mumbai, India');
  const [notifications, setNotifications] = useState(5);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showSearchSuggestions, setShowSearchSuggestions] = useState(false);
  const [mobileMenuHeight, setMobileMenuHeight] = useState(0);

  // Check login status from localStorage
  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    setIsLoggedIn(!!token && !!user);
  }, [location]);

  // Update active tab based on current route
  useEffect(() => {
    const path = location.pathname;
    if (path === '/') setActiveTab('home');
    else if (path.includes('/blood')) setActiveTab('blood');
    else if (path.includes('/organ')) setActiveTab('organ');
    else if (path.includes('/urgent-requests')) setActiveTab('urgent');
    else if (path.includes('/messages')) setActiveTab('messages');
    else if (path.includes('/profile')) setActiveTab('profile');
    else if (path.includes('/find-donor')) setActiveTab('find-donor');
    else if (path.includes('/campaigns')) setActiveTab('campaigns');
    else if (path.includes('/about')) setActiveTab('about');
    else if (path.includes('/auth')) setActiveTab('auth');
  }, [location]);

  // Mobile nav items with actual routing
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
      badge: 5
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

  // Desktop nav items with actual routing
  const desktopNavItems = [
    { 
      id: 'home', 
      label: 'Home', 
      icon: Home,
      path: '/',
      description: 'Return to homepage'
    },
    // { 
    //   id: 'find-donor', 
    //   label: 'Find Donor', 
    //   icon: Search,
    //   path: '/find-donor',
    //   description: 'Search for donors'
    // },
    { 
      id: 'urgent', 
      label: 'Urgent', 
      icon: AlertCircle,
      path: '/urgent-requests',
      description: 'Emergency requests',
      badge: 5
    },
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
      id: 'about', 
      label: 'About', 
      icon: Shield,
      path: '/about',
      description: 'About us'
    },
    { 
      id: 'auth', 
      label: 'Login', 
      icon: LogIn,
      path: '/auth',
      description: 'Login / Register'
    }
  ];

  // Profile dropdown items with routing
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
      label: 'Settings', 
      icon: Settings,
      path: '/settings',
      color: 'text-gray-600',
      description: 'Account settings'
    },
    { 
      label: 'Help Center', 
      icon: LifeBuoy,
      path: '/help',
      color: 'text-emerald-600',
      description: 'Get help'
    }
  ];

  // Quick links for search overlay
  const quickLinks = [
    { label: 'Blood Donation Process', path: '/process', icon: Droplets, color: 'bg-red-50 text-red-600' },
    { label: 'Organ Donation Info', path: '/organ-info', icon: ActivityIcon, color: 'bg-emerald-50 text-emerald-600' },
    { label: 'Donor Eligibility', path: '/eligibility', icon: ShieldCheck, color: 'bg-blue-50 text-blue-600' },
    { label: 'Find Blood Bank', path: '/blood-banks', icon: Hospital, color: 'bg-rose-50 text-rose-600' },
    { label: 'Emergency Services', path: '/emergency', icon: Ambulance, color: 'bg-orange-50 text-orange-600' },
    { label: 'Blood Type Info', path: '/blood-types', icon: BookOpen, color: 'bg-purple-50 text-purple-600' }
  ];

  // Popular searches
  const popularSearches = [
    'O+ blood donors near me',
    'Emergency A- blood required',
    'Platelet donation process',
    'Organ donation registration',
    'Blood donation camps today',
    'Kidney donation information'
  ];

  // Locations
  const locations = [
    { city: 'Mumbai', state: 'Maharashtra', active: true },
    { city: 'Delhi', state: 'Delhi NCR', active: false },
    { city: 'Bangalore', state: 'Karnataka', active: false },
    { city: 'Chennai', state: 'Tamil Nadu', active: false },
    { city: 'Hyderabad', state: 'Telangana', active: false },
    { city: 'Kolkata', state: 'West Bengal', active: false },
    { city: 'Pune', state: 'Maharashtra', active: false },
    { city: 'Ahmedabad', state: 'Gujarat', active: false }
  ];

  // Handle tab click
  const handleTabClick = (path, tabId) => {
    setActiveTab(tabId);
    navigate(path);
    if (window.innerWidth < 1024) {
      setIsMobileMenuOpen(false);
    }
  };

  // Handle search
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
      setSearchQuery('');
      setShowSearchSuggestions(false);
    }
  };

  // Handle search focus
  const handleSearchFocus = () => {
    setShowSearchSuggestions(true);
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
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
      if (isSearchOpen && searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchOpen(false);
        setShowSearchSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isProfileOpen, isSearchOpen]);

  // Calculate mobile menu height
  useEffect(() => {
    if (isMobileMenuOpen) {
      setMobileMenuHeight(window.innerHeight * 0.85);
    }
  }, [isMobileMenuOpen]);

  // Get user initials for avatar
  const getUserInitials = () => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user.name ? user.name.charAt(0).toUpperCase() : 'U';
  };

  return (
    <>
      {/* DESKTOP NAVBAR */}
      <nav className={`hidden lg:block fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-xl shadow-2xl shadow-gray-200/50 py-3 border-b border-gray-100/50' 
          : 'bg-gradient-to-r from-white/95 via-white/90 to-white/95 backdrop-blur-lg py-4'
      }`}>
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex items-center justify-between">
            
            {/* Logo Section */}
            <button 
              onClick={() => navigate('/')}
              className="flex items-center space-x-3 group cursor-pointer"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-rose-500 via-rose-400 to-pink-500 rounded-full blur-lg opacity-70 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative bg-gradient-to-r from-rose-500 to-rose-400 w-14 h-14 rounded-full flex items-center justify-center shadow-xl shadow-rose-200/50 group-hover:shadow-rose-300/50 transition-shadow duration-500">
                  <Heart className="h-7 w-7 text-white" fill="white" />
                  <Droplets className="h-4 w-4 text-white absolute -bottom-1 -right-1" />
                  <Sparkles className="h-3 w-3 text-yellow-300 absolute -top-1 -left-1 animate-pulse" />
                </div>
              </div>
              <div className="text-left">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-rose-600 via-rose-500 to-pink-500 bg-clip-text text-transparent">
                  LifeStream
                </h1>
                <p className="text-xs text-gray-500 font-medium flex items-center">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full mr-2 animate-pulse"></span>
                  Save Lives, Donate Today
                </p>
              </div>
            </button>

            {/* Navigation Links */}
            <div className="flex items-center space-x-2">
              {desktopNavItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleTabClick(item.path, item.id)}
                  className={`px-6 py-2.5 font-medium rounded-xl transition-all duration-300 relative group ${
                    activeTab === item.id
                      ? 'text-white bg-gradient-to-r from-rose-500 to-rose-400 shadow-lg shadow-rose-200/50'
                      : 'text-gray-700 hover:text-rose-600 hover:bg-rose-50/80'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <item.icon className={`h-4 w-4 ${activeTab === item.id ? 'text-white' : 'text-gray-500'}`} />
                    <span>{item.label}</span>
                    {item.badge && (
                      <span className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white text-xs rounded-full flex items-center justify-center animate-pulse shadow-lg">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  {!activeTab.includes(item.id) && (
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 group-hover:w-4/5 h-0.5 bg-gradient-to-r from-rose-400 to-pink-400 rounded-full transition-all duration-300"></div>
                  )}
                </button>
              ))}
            </div>

            {/* CTA & Actions */}
            <div className="flex items-center space-x-3">
              {/* Location Selector */}
              <div className="relative" ref={profileRef}>
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
                  <span className="text-gray-700 text-sm font-medium">{currentLocation}</span>
                  <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform duration-300 ${isLocationOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {/* Location Dropdown */}
                {isLocationOpen && (
                  <div className="absolute top-full mt-2 right-0 w-72 bg-white rounded-2xl shadow-2xl 
                                border border-gray-100 p-4 z-50 animate-fadeIn">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold text-gray-800">Select Location</h4>
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4 text-rose-500" />
                        <span className="text-xs text-gray-500">Active</span>
                      </div>
                    </div>
                    <div className="space-y-2 max-h-64 overflow-y-auto">
                      {locations.map((loc, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleLocationSelect(loc.city)}
                          className={`w-full text-left px-4 py-3 rounded-xl flex items-center justify-between transition-all duration-200 ${
                            currentLocation.includes(loc.city)
                              ? 'bg-gradient-to-r from-rose-50 to-pink-50 text-rose-600 border border-rose-200'
                              : 'hover:bg-gray-50 text-gray-700'
                          }`}
                        >
                          <div className="flex-1">
                            <div className="font-medium">{loc.city}</div>
                            <div className="text-xs text-gray-500">{loc.state}</div>
                          </div>
                          {currentLocation.includes(loc.city) ? (
                            <CheckCircle className="h-5 w-5 text-rose-500" />
                          ) : loc.active && (
                            <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                          )}
                        </button>
                      ))}
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <button className="w-full text-center text-sm text-rose-600 hover:text-rose-700 font-medium">
                        + Add New Location
                      </button>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Emergency Button */}
              <button 
                onClick={handleEmergency}
                className="relative px-5 py-2.5 bg-gradient-to-r from-red-500 via-rose-500 to-pink-500 
                         text-white rounded-xl font-semibold shadow-lg shadow-red-200/50 hover:shadow-xl 
                         hover:shadow-red-300/50 hover:scale-105 transition-all duration-300 
                         flex items-center space-x-2 group overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-red-600 via-rose-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <Ambulance className="h-5 w-5 relative z-10" />
                <span className="relative z-10">Emergency</span>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full animate-ping"></div>
                <Zap className="absolute -top-2 -left-2 h-4 w-4 text-yellow-300 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </button>

              {/* Notifications */}
              <div className="relative">
                <button 
                  onClick={() => navigate('/notifications')}
                  className="relative p-2.5 rounded-xl bg-gray-100 hover:bg-rose-50 text-gray-600 
                           hover:text-rose-500 transition-all duration-300 hover:scale-105 group"
                >
                  <Bell className="h-5 w-5" />
                  {notifications > 0 && (
                    <span className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-red-500 to-rose-500 text-white text-xs 
                                    rounded-full flex items-center justify-center animate-pulse shadow-lg">
                      {notifications}
                    </span>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-r from-rose-500 to-pink-500 rounded-xl opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                </button>
              </div>

              {/* User Profile */}
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
                    <ChevronDown className={`h-4 w-4 text-gray-500 transition-transform duration-300 ${isProfileOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Profile Dropdown */}
                  {isProfileOpen && (
                    <div className="absolute top-full mt-2 right-0 w-80 bg-white rounded-2xl shadow-2xl 
                                  border border-gray-100 p-4 z-50 animate-fadeIn">
                      {/* Profile Header */}
                      <div className="flex items-center space-x-3 pb-4 border-b border-gray-100">
                        <div className="relative">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-rose-400 to-rose-300 
                                        flex items-center justify-center text-white font-bold text-lg shadow-lg">
                            {getUserInitials()}
                          </div>
                          <Star className="absolute -top-1 -right-1 h-5 w-5 text-amber-500" fill="currentColor" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-gray-800">Aarav Sharma</h3>
                          <div className="flex items-center space-x-2 mt-1">
                            <span className="text-xs bg-gradient-to-r from-amber-50 to-amber-100 text-amber-700 px-2 py-1 rounded-full border border-amber-200">
                              <Star className="h-3 w-3 inline mr-1" fill="currentColor" />
                              Gold Donor
                            </span>
                            <span className="text-xs text-gray-500">5 Donations</span>
                          </div>
                        </div>
                        <button 
                          onClick={() => {
                            navigate('/profile');
                            setIsProfileOpen(false);
                          }}
                          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                          <ExternalLink className="h-4 w-4 text-gray-500" />
                        </button>
                      </div>

                      {/* Profile Items */}
                      <div className="py-3 space-y-1">
                        {profileItems.map((item, idx) => (
                          <button
                            key={idx}
                            onClick={() => {
                              navigate(item.path);
                              setIsProfileOpen(false);
                            }}
                            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-gray-50 
                                     transition-all duration-200 group`}
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
                            <div className="text-lg font-bold text-rose-600">5</div>
                            <div className="text-xs text-gray-600">Donations</div>
                          </div>
                          <div className="text-center p-3 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border border-blue-100">
                            <div className="text-lg font-bold text-blue-600">3</div>
                            <div className="text-xs text-gray-600">Lives Saved</div>
                          </div>
                          <div className="text-center p-3 bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl border border-emerald-100">
                            <div className="text-lg font-bold text-emerald-600">12</div>
                            <div className="text-xs text-gray-600">Points</div>
                          </div>
                        </div>
                      </div>

                      {/* Logout Button */}
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
                // Auth Buttons for logged out users
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => navigate('/auth')}
                    className="px-5 py-2.5 text-rose-600 hover:text-rose-700 font-medium rounded-xl 
                             hover:bg-rose-50 transition-all duration-300 flex items-center space-x-2 border border-rose-200 hover:border-rose-300"
                  >
                    <LogIn className="h-5 w-5" />
                    <span>Login</span>
                  </button>
                  <button
                    onClick={() => navigate('/auth')}
                    className="px-5 py-2.5 bg-gradient-to-r from-rose-500 via-rose-400 to-pink-500 text-white 
                             rounded-xl font-semibold shadow-lg shadow-rose-200/50 hover:shadow-xl 
                             hover:shadow-rose-300/50 hover:scale-105 transition-all duration-300 
                             hover:from-rose-600 hover:via-rose-500 hover:to-pink-600 flex items-center space-x-2 group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-rose-600 to-pink-600 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <UserPlus className="h-5 w-5 relative z-10" />
                    <span className="relative z-10">Register</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Top Bar */}
      <div className={`lg:hidden fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        isScrolled 
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
                onFocus={handleSearchFocus}
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
                <div className={`p-3 rounded-xl transition-all duration-500 relative ${
                  isActive 
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
                  
                  {/* Pulse Effect */}
                  {item.pulse && !isActive && (
                    <div className="absolute inset-0 border-2 border-rose-300/30 rounded-xl animate-pulse"></div>
                  )}
                </div>
                
                {/* Label */}
                <span className={`text-[10px] mt-2 font-medium transition-all duration-300 ${
                  isActive ? 'text-rose-500 font-bold' : 'text-gray-500'
                }`}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Mobile Search Overlay */}
      {isSearchOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-white animate-slideUp">
          <div className="p-4 pt-20 h-full flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Search</h2>
              <button onClick={() => setIsSearchOpen(false)} className="p-2 rounded-lg hover:bg-gray-100">
                <X className="h-6 w-6 text-gray-500" />
              </button>
            </div>
            
            {/* Search Input */}
            <div className="relative mb-6">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="What are you looking for?"
                className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl 
                         focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-transparent text-lg"
                autoFocus
              />
            </div>

            {/* Search Content */}
            <div className="flex-1 overflow-y-auto space-y-6">
              {/* Quick Actions */}
              <div className="grid grid-cols-2 gap-3">
                {quickLinks.slice(0, 4).map((link, idx) => (
                  <button
                    key={idx}
                    onClick={() => navigate(link.path)}
                    className={`p-4 rounded-xl flex items-center space-x-3 ${link.color} border border-transparent hover:border-current/20 transition-all duration-200`}
                  >
                    <link.icon className="h-5 w-5" />
                    <span className="text-sm font-medium">{link.label}</span>
                  </button>
                ))}
              </div>

              {/* Popular Searches */}
              <div>
                <h3 className="font-semibold text-gray-700 mb-3 flex items-center space-x-2">
                  <TrendingUp className="h-4 w-4" />
                  <span>Popular Searches</span>
                </h3>
                <div className="space-y-2">
                  {popularSearches.map((item, idx) => (
                    <button 
                      key={idx}
                      onClick={() => {
                        setSearchQuery(item);
                        handleSearch(new Event('submit'));
                      }}
                      className="w-full text-left p-3 rounded-lg hover:bg-gray-50 flex items-center space-x-3 transition-colors"
                    >
                      <Search className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-600">{item}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Blood Types */}
              <div>
                <h3 className="font-semibold text-gray-700 mb-3">Blood Types</h3>
                <div className="flex flex-wrap gap-2">
                  {['O+', 'A-', 'B+', 'AB-', 'Platelets', 'Plasma', 'Emergency', 'Organ'].map((type) => (
                    <button
                      key={type}
                      onClick={() => {
                        setSearchQuery(type);
                        handleSearch(new Event('submit'));
                      }}
                      className="px-4 py-2 bg-rose-50 text-rose-600 rounded-full font-medium hover:bg-rose-100 transition-colors"
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Close Button */}
            <div className="mt-6 pt-6 border-t border-gray-100">
              <button
                onClick={() => setIsSearchOpen(false)}
                className="w-full py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors"
              >
                Close Search
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-sm animate-fadeIn"
             onClick={() => setIsMobileMenuOpen(false)}>
          <div 
            className="absolute top-0 right-0 bg-white shadow-2xl animate-slideIn h-full max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
            style={{ width: '85%', maxWidth: '400px' }}
          >
            <div className="p-6 h-full flex flex-col">
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-3">
                  <div className="bg-gradient-to-r from-rose-500 to-rose-400 w-12 h-12 rounded-full flex items-center justify-center shadow-lg">
                    <Heart className="h-6 w-6 text-white" fill="white" />
                  </div>
                  <div>
                    <h1 className="font-bold text-xl text-gray-800">LifeStream</h1>
                    <p className="text-sm text-gray-500">Save Lives, Donate Today</p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsMobileMenuOpen(false)} 
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <X className="h-6 w-6 text-gray-500" />
                </button>
              </div>

              {/* User Info */}
              {isLoggedIn ? (
                <button 
                  onClick={() => {
                    navigate('/profile');
                    setIsMobileMenuOpen(false);
                  }}
                  className="mb-6 p-4 bg-gradient-to-r from-rose-50 to-pink-50 rounded-2xl text-left border border-rose-100 hover:opacity-90 transition-opacity"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-gray-800">Aarav Sharma</h3>
                      <div className="flex items-center space-x-2 mt-1">
                        <Star className="h-4 w-4 text-amber-500" fill="currentColor" />
                        <span className="text-sm text-gray-600">Gold Donor • 5 Donations</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-rose-600">12</div>
                      <div className="text-xs text-gray-500">Points</div>
                    </div>
                  </div>
                </button>
              ) : (
                <div className="mb-6 p-4 bg-gradient-to-r from-rose-50 to-pink-50 rounded-2xl border border-rose-100">
                  <h3 className="font-bold text-gray-800 mb-2">Join LifeStream</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Register to save lives and join our community of heroes.
                  </p>
                  <div className="flex space-x-3">
                    <button
                      onClick={() => navigate('/auth')}
                      className="flex-1 py-2.5 bg-white text-rose-600 border border-rose-300 rounded-lg font-medium hover:bg-rose-50 transition-colors"
                    >
                      Login
                    </button>
                    <button
                      onClick={() => navigate('/auth')}
                      className="flex-1 py-2.5 bg-gradient-to-r from-rose-500 to-rose-400 text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
                    >
                      Register
                    </button>
                  </div>
                </div>
              )}

              {/* Menu Items */}
              <div className="flex-1 space-y-1 overflow-y-auto">
                <h4 className="text-sm font-semibold text-gray-500 mb-2 px-2">Navigation</h4>
                {desktopNavItems.map((item) => (
                  <button 
                    key={item.id}
                    onClick={() => handleTabClick(item.path, item.id)}
                    className="w-full text-left p-4 rounded-xl hover:bg-gray-50 transition-all duration-200 flex items-center justify-between group"
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`p-2 rounded-lg ${activeTab === item.id ? 'bg-rose-100 text-rose-600' : 'bg-gray-100 text-gray-600'}`}>
                        <item.icon className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-800">{item.label}</div>
                        <div className="text-xs text-gray-500">{item.description}</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {item.badge && (
                        <span className="w-6 h-6 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                          {item.badge}
                        </span>
                      )}
                      <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
                    </div>
                  </button>
                ))}
                
                <div className="border-t border-gray-100 my-6"></div>
                
                <h4 className="text-sm font-semibold text-gray-500 mb-2 px-2">My Account</h4>
                {isLoggedIn ? (
                  profileItems.slice(0, 5).map((item) => (
                    <button 
                      key={item.label}
                      onClick={() => {
                        navigate(item.path);
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full text-left p-4 rounded-xl hover:bg-gray-50 transition-colors flex items-center space-x-4"
                    >
                      <div className={`p-2 rounded-lg ${item.color.replace('text-', 'bg-').replace('-600', '-50').replace('-700', '-50')}`}>
                        <item.icon className={`h-5 w-5 ${item.color}`} />
                      </div>
                      <span className="text-gray-700">{item.label}</span>
                    </button>
                  ))
                ) : (
                  <div className="space-y-2">
                    <button 
                      onClick={() => navigate('/auth')}
                      className="w-full p-4 rounded-xl bg-rose-50 text-rose-600 flex items-center space-x-4 hover:bg-rose-100 transition-colors"
                    >
                      <LogIn className="h-5 w-5" />
                      <span>Login / Register</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Bottom Actions */}
              <div className="pt-6 border-t border-gray-100 space-y-3">
                <button 
                  onClick={handleEmergency}
                  className="w-full py-3.5 bg-gradient-to-r from-red-500 to-rose-500 text-white 
                           rounded-xl font-bold text-lg shadow-lg active:scale-95 transition-transform 
                           flex items-center justify-center space-x-2"
                >
                  <Ambulance className="h-5 w-5" />
                  <span>Emergency Request</span>
                </button>
                
                {isLoggedIn && (
                  <button 
                    onClick={handleLogout}
                    className="w-full py-3 bg-white text-red-600 border-2 border-red-200 
                             rounded-xl font-semibold hover:bg-red-50 transition-colors"
                  >
                    Logout
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add spacing for mobile bottom navbar */}
      <div className="lg:hidden h-28"></div>
      <div className="lg:block h-20"></div>

      {/* Custom Animations */}
      <style jsx global>{`
        @keyframes pulse-slow {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.05); opacity: 0.8; }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideIn {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        @keyframes slideUp {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
        @keyframes ping {
          0% { transform: scale(1); opacity: 1; }
          100% { transform: scale(2); opacity: 0; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-5px); }
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 2s ease-in-out infinite;
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        .animate-slideIn {
          animation: slideIn 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .animate-slideUp {
          animation: slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .animate-ping {
          animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        /* Custom Scrollbar */
        .overflow-y-auto::-webkit-scrollbar {
          width: 6px;
        }
        .overflow-y-auto::-webkit-scrollbar-track {
          background: #f8fafc;
          border-radius: 10px;
        }
        .overflow-y-auto::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #f472b6, #fb7185);
          border-radius: 10px;
        }
        .overflow-y-auto::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #f472b6, #f43f5e);
        }
      `}</style>
    </>
  );
};

export default Navbar;