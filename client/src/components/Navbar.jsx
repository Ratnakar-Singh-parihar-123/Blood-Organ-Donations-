import React, { useState, useEffect } from 'react';
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
  Hospital, Ambulance, Download
} from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [activeTab, setActiveTab] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [currentLocation, setCurrentLocation] = useState('Mumbai, India');
  const [notifications, setNotifications] = useState(3);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check login status from localStorage
  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    setIsLoggedIn(!!token && !!user);
  }, []);

  // Update active tab based on current route
  useEffect(() => {
    const path = location.pathname;
    if (path === '/') setActiveTab('home');
    else if (path.includes('/donate') || path.includes('/blood')) setActiveTab('donate');
    else if (path.includes('/organ')) setActiveTab('organ');
    else if (path.includes('/requests')) setActiveTab('requests');
    else if (path.includes('/messages')) setActiveTab('messages');
    else if (path.includes('/profile')) setActiveTab('profile');
    else if (path.includes('/find-donor')) setActiveTab('find-donor');
    else if (path.includes('/urgent-requests')) setActiveTab('blood-requests');
    else if (path.includes('/campaigns')) setActiveTab('campaigns');
    else if (path.includes('/about')) setActiveTab('about');
  }, [location]);

  // Mobile nav items with actual routing
  const mobileNavItems = [
    { 
      id: 'home', 
      label: 'Home', 
      icon: Home, 
      path: '/',
      badge: null
    },
    { 
      id: 'donate', 
      label: 'Blood', 
      icon: Heart, 
      path: '/blood',
      badge: null
    },
    { 
      id: 'organ', 
      label: 'Organ', 
      icon: ActivityIcon, 
      path: '/organ',
      badge: null
    },
    { 
      id: 'requests', 
      label: 'Urgent', 
      icon: AlertCircle, 
      path: '/urgent-requests',
      badge: 5
    },
    { 
      id: 'profile', 
      label: 'Profile', 
      icon: User, 
      path: '/profile',
      badge: null
    }
  ];

  // Desktop nav items with actual routing
  const desktopNavItems = [
    // { 
    //   id: 'home', 
    //   label: 'Home', 
    //   icon: Home,
    //   path: '/' 
    // },
    { 
      id: 'find-donor', 
      label: 'Find Donor', 
      icon: Search,
      path: '/find-donor' 
    },
    { 
      id: 'blood-requests', 
      label: 'Urgent', 
      icon: AlertCircle,
      path: '/urgent-requests',
      badge: 5
    },
    { 
      id: 'blood-donation', 
      label: 'Blood', 
      icon: Droplets,
      path: '/blood' 
    },
    { 
      id: 'organ-donation', 
      label: 'Organ', 
      icon: ActivityIcon,
      path: '/organ' 
    },
    // { 
    //   id: 'campaigns', 
    //   label: 'Campaigns', 
    //   icon: Users,
    //   path: '/campaigns' 
    // },
    { 
      id: 'about', 
      label: 'About', 
      icon: Shield,
      path: '/about' 
    },
     { 
      id: 'Register', 
      label: 'Register', 
      icon: Shield,
      path: '/auth' 
    }
  ];

  // Profile dropdown items with routing
  const profileItems = [
    { 
      label: 'My Profile', 
      icon: User,
      path: '/profile',
      color: 'text-gray-700' 
    },
    { 
      label: 'My Donations', 
      icon: History,
      path: '/donations',
      color: 'text-gray-700' 
    },
    { 
      label: 'Achievements', 
      icon: Award,
      path: '/achievements',
      color: 'text-gray-700' 
    },
    { 
      label: 'Saved Donors', 
      icon: Bookmark,
      path: '/saved',
      color: 'text-gray-700' 
    },
    { 
      label: 'Rewards', 
      icon: Gift,
      path: '/rewards',
      color: 'text-gray-700' 
    },
    { 
      label: 'Settings', 
      icon: Settings,
      path: '/settings',
      color: 'text-gray-700' 
    },
    { 
      label: 'Help Center', 
      icon: LifeBuoy,
      path: '/help',
      color: 'text-gray-700' 
    },
    { 
      label: 'Language', 
      icon: Globe,
      path: '/language',
      color: 'text-gray-700' 
    },
    { 
      label: 'Logout', 
      icon: LogOut,
      path: '/logout',
      color: 'text-red-500' 
    }
  ];

  // Auth options for non-logged in users
  const authItems = [
    {
      label: 'Login',
      icon: LogIn,
      path: '/login',
      color: 'text-rose-600',
      bgColor: 'bg-rose-50 hover:bg-rose-100'
    },
    {
      label: 'Register',
      icon: UserPlus,
      path: '/register',
      color: 'text-white',
      bgColor: 'bg-gradient-to-r from-rose-500 to-rose-400 hover:from-rose-600 hover:to-rose-500'
    }
  ];

  // Quick links for search overlay
  const quickLinks = [
    { label: 'Blood Donation Process', path: '/process', icon: Droplets },
    { label: 'Organ Donation Info', path: '/organ-info', icon: ActivityIcon },
    { label: 'Donor Eligibility', path: '/eligibility', icon: ShieldCheck },
    { label: 'Find Blood Bank', path: '/blood-banks', icon: Hospital },
    { label: 'Emergency Services', path: '/emergency', icon: Ambulance },
    { label: 'Blood Type Info', path: '/blood-types', icon: BookOpen },
    { label: 'Donor Stories', path: '/stories', icon: Users },
    { label: 'Download Certificate', path: '/certificate', icon: Download }
  ];

  // Popular searches
  // const popularSearches = [
  //   'O+ blood donors near me',
  //   'Blood donation camps today',
  //   'Organ donation process',
  //   'Emergency A- blood required',
  //   'Platelet donation',
  //   'Blood bank contact numbers',
  //   'Kidney donation information',
  //   'Liver transplant donors'
  // ];

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
    }
  };

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
      if (isProfileOpen && !event.target.closest('.profile-dropdown')) {
        setIsProfileOpen(false);
      }
      if (isSearchOpen && !event.target.closest('.search-container')) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isProfileOpen, isSearchOpen]);

  // Handle location change
  const handleLocationChange = (city) => {
    setCurrentLocation(`${city}, India`);
    // In real app, this would update location-based content
  };

  // Handle emergency request
  const handleEmergency = () => {
    navigate('/emergency-request');
  };

  // Handle login
  const handleLogin = () => {
    navigate('/login');
  };

  // Handle register
  const handleRegister = () => {
    navigate('/register');
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setIsProfileOpen(false);
    navigate('/');
    alert('Logged out successfully!');
  };

  return (
    <>
      {/* DESKTOP NAVBAR */}
      <nav className={`hidden lg:block fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/97 backdrop-blur-xl shadow-lg shadow-gray-200/50 py-3' 
          : 'bg-white/95 backdrop-blur-lg py-4'
      }`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between">
            
            {/* Logo Section */}
            <button 
              onClick={() => navigate('/')}
              className="flex items-center space-x-3 group cursor-pointer hover:opacity-90 transition-opacity"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-rose-500 to-rose-400 rounded-full blur opacity-70 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative bg-gradient-to-r from-rose-500 to-rose-400 w-12 h-12 rounded-full flex items-center justify-center shadow-lg">
                  <Heart className="h-6 w-6 text-white" fill="white" />
                  <Droplets className="h-3 w-3 text-white absolute -bottom-1 -right-1" />
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-rose-600 to-rose-500 bg-clip-text text-transparent">
                  LifeStream
                </h1>
                <p className="text-xs text-gray-500 font-medium">Save Lives, Donate Today</p>
              </div>
            </button>

            {/* Navigation Links */}
            <div className="flex items-center space-x-1">
              {desktopNavItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleTabClick(item.path, item.id)}
                  className={`px-5 py-2.5 font-medium rounded-full transition-all duration-200 relative group flex items-center space-x-2 ${
                    activeTab === item.id
                      ? 'text-rose-500 bg-rose-50'
                      : 'text-gray-700 hover:text-rose-500 hover:bg-rose-50'
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center animate-pulse">
                      {item.badge}
                    </span>
                  )}
                  <span className={`absolute bottom-1 left-4 right-4 h-0.5 bg-gradient-to-r from-rose-500 to-rose-400 
                                  transform ${activeTab === item.id ? 'scale-x-100' : 'scale-x-0'} group-hover:scale-x-100 transition-transform duration-300`}></span>
                </button>
              ))}
            </div>


            {/* CTA & Actions */}
            <div className="flex items-center space-x-3">
              {/* Location Selector */}
              <div className="relative group">
                <button className="flex items-center space-x-2 px-4 py-2.5 rounded-full border border-gray-200 
                              hover:border-rose-300 transition-colors cursor-pointer bg-white">
                  <MapPin className="h-4 w-4 text-rose-500" />
                  <span className="text-gray-700 text-sm font-medium">{currentLocation}</span>
                  <ChevronDown className="h-4 w-4 text-gray-400 group-hover:text-rose-500" />
                </button>
                <div className="absolute top-full mt-2 left-0 w-64 bg-white rounded-2xl shadow-2xl 
                              border border-gray-100 p-4 opacity-0 invisible group-hover:opacity-100 
                              group-hover:visible transition-all duration-300 z-50">
                  <h4 className="font-semibold text-gray-700 mb-3">Select Location</h4>
                  <div className="space-y-1">
                    {['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Hyderabad', 'Kolkata', 'Pune'].map((city) => (
                      <button
                        key={city}
                        onClick={() => handleLocationChange(city)}
                        className={`w-full text-left px-3 py-2 rounded-lg flex items-center justify-between ${
                          currentLocation.includes(city) 
                            ? 'bg-rose-50 text-rose-600' 
                            : 'hover:bg-gray-50 text-gray-600'
                        }`}
                      >
                        <span>{city}</span>
                        {currentLocation.includes(city) && (
                          <ShieldCheck className="h-4 w-4 text-rose-500" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Emergency Button */}
              <button 
                onClick={handleEmergency}
                className="relative px-5 py-2.5 bg-gradient-to-r from-red-500 to-rose-500 text-white 
                         rounded-full font-semibold shadow-lg shadow-red-200 hover:shadow-xl 
                         hover:shadow-red-300 hover:scale-105 transition-all duration-300 
                         flex items-center space-x-2"
              >
                <Ambulance className="h-5 w-5" />
                <span>Emergency</span>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full animate-ping"></div>
              </button>

              {/* Notifications */}
              <div className="relative">
                <button 
                  onClick={() => navigate('/notifications')}
                  className="relative p-2.5 rounded-full bg-gray-100 hover:bg-rose-50 text-gray-600 
                           hover:text-rose-500 transition-colors"
                >
                  <Bell className="h-5 w-5" />
                  {notifications > 0 && (
                    <span className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 text-white text-xs 
                                    rounded-full flex items-center justify-center animate-pulse">
                      {notifications}
                    </span>
                  )}
                </button>
              </div>

              {/* Auth Buttons / Profile Dropdown */}
              {isLoggedIn ? (
                <div className="relative profile-dropdown">
                  <button 
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center space-x-2 p-1.5 rounded-full hover:bg-gray-100 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-rose-400 to-rose-300 
                                  flex items-center justify-center text-white font-semibold shadow">
                      AS
                    </div>
                    <ChevronDown className={`h-4 w-4 text-gray-500 transition-transform ${
                      isProfileOpen ? 'rotate-180' : ''
                    }`} />
                  </button>

                  {/* Profile Dropdown Menu */}
                  {isProfileOpen && (
                    <div className="absolute top-full right-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl 
                                  border border-gray-100 p-4 z-50 animate-fadeIn">
                      {/* Profile Header */}
                      <div className="flex items-center space-x-3 pb-4 border-b border-gray-100">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-rose-400 to-rose-300 
                                      flex items-center justify-center text-white font-bold text-lg shadow">
                          AS
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-gray-800">Aarav Sharma</h3>
                          <div className="flex items-center space-x-2 mt-1">
                            <span className="text-xs bg-rose-100 text-rose-700 px-2 py-0.5 rounded-full">
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
                          className="p-2 hover:bg-gray-100 rounded-lg"
                        >
                          <ExternalLink className="h-4 w-4 text-gray-500" />
                        </button>
                      </div>

                      {/* Profile Items */}
                      <div className="py-3 max-h-60 overflow-y-auto">
                        {profileItems.map((item, idx) => (
                          <button
                            key={idx}
                            onClick={() => {
                              if (item.path === '/logout') {
                                handleLogout();
                              } else {
                                navigate(item.path);
                                setIsProfileOpen(false);
                              }
                            }}
                            className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg hover:bg-gray-50 
                                     transition-colors ${item.color}`}
                          >
                            <item.icon className="h-4 w-4" />
                            <span>{item.label}</span>
                          </button>
                        ))}
                      </div>

                      {/* Quick Stats */}
                      <div className="pt-3 border-t border-gray-100">
                        <div className="grid grid-cols-3 gap-2">
                          <button 
                            onClick={() => navigate('/donations')}
                            className="text-center p-2 bg-rose-50 rounded-lg hover:bg-rose-100 transition-colors"
                          >
                            <div className="text-lg font-bold text-rose-600">5</div>
                            <div className="text-xs text-gray-600">Donations</div>
                          </button>
                          <button 
                            onClick={() => navigate('/achievements')}
                            className="text-center p-2 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                          >
                            <div className="text-lg font-bold text-blue-600">3</div>
                            <div className="text-xs text-gray-600">Lives Saved</div>
                          </button>
                          <button 
                            onClick={() => navigate('/rewards')}
                            className="text-center p-2 bg-emerald-50 rounded-lg hover:bg-emerald-100 transition-colors"
                          >
                            <div className="text-lg font-bold text-emerald-600">12</div>
                            <div className="text-xs text-gray-600">Points</div>
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                // Show login/register buttons if not logged in
                <div className="flex items-center space-x-3">
                  <button
                    onClick={handleLogin}
                    className="px-5 py-2.5 text-rose-600 hover:text-rose-700 font-medium rounded-full 
                             hover:bg-rose-50 transition-all duration-300 flex items-center space-x-2"
                  >
                    <LogIn className="h-5 w-5" />
                    <span>Login</span>
                  </button>
                  <button
                    onClick={handleRegister}
                    className="px-5 py-2.5 bg-gradient-to-r from-rose-500 to-rose-400 text-white 
                             rounded-full font-semibold shadow-lg shadow-rose-200 hover:shadow-xl 
                             hover:shadow-rose-300 hover:scale-105 transition-all duration-300 
                             hover:from-rose-600 hover:to-rose-500 flex items-center space-x-2"
                  >
                    <UserPlus className="h-5 w-5" />
                    <span>Register</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* MOBILE BOTTOM NAVBAR */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/98 backdrop-blur-xl 
                     border-t border-gray-100 shadow-2xl py-3 px-4">
        <div className="flex justify-around items-center relative">
          {/* Floating Emergency Button */}
          <button 
            onClick={handleEmergency}
            className="absolute -top-8 left-1/2 transform -translate-x-1/2 
                     bg-gradient-to-r from-red-500 to-rose-500 text-white 
                     p-4 rounded-full shadow-2xl shadow-red-300/50 hover:shadow-red-400/50 
                     hover:scale-110 active:scale-95 transition-all duration-300 
                     border-4 border-white z-50 animate-pulse-slow"
          >
            <Ambulance className="h-6 w-6" />
          </button>

          {mobileNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => handleTabClick(item.path, item.id)}
                className={`flex flex-col items-center justify-center relative transition-all duration-300 
                          ${isActive ? 'transform -translate-y-2' : ''}`}
                aria-label={item.label}
              >
                {/* Active Indicator */}
                {isActive && (
                  <>
                    <div className="absolute -top-6 w-12 h-12 bg-gradient-to-r from-rose-500/10 to-rose-400/10 
                                  rounded-full blur-md"></div>
                    <div className="absolute -top-3 w-8 h-1 bg-gradient-to-r from-rose-500 to-rose-400 
                                  rounded-full"></div>
                  </>
                )}
                
                {/* Icon Container */}
                <div className={`p-2.5 rounded-xl transition-all duration-300 relative ${
                  isActive 
                    ? 'bg-gradient-to-r from-rose-500 to-rose-400 text-white shadow-lg shadow-rose-200' 
                    : 'bg-gray-50 text-gray-400'
                }`}>
                  <Icon className={`h-5 w-5 ${isActive ? 'text-white' : 'text-gray-400'}`} 
                        fill={isActive ? 'white' : 'none'} 
                        strokeWidth={isActive ? 2.5 : 1.5} />
                  
                  {/* Badges for specific tabs */}
                  {item.badge && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs 
                                    rounded-full flex items-center justify-center animate-pulse">
                      {item.badge}
                    </span>
                  )}
                </div>
                
                {/* Label */}
                <span className={`text-[10px] mt-1.5 font-medium transition-colors ${
                  isActive ? 'text-rose-500 font-semibold' : 'text-gray-500'
                }`}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* MOBILE TOP BAR */}
      <div className={`lg:hidden fixed top-0 left-0 right-0 z-30 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/98 backdrop-blur-xl shadow-sm py-3' 
          : 'bg-white/95 backdrop-blur-lg py-4'
      } border-b border-gray-100 px-4`}>
        <div className="flex items-center justify-between">
          {/* Logo */}
          <button 
            onClick={() => navigate('/')}
            className="flex items-center space-x-2"
          >
            <div className="bg-gradient-to-r from-rose-500 to-rose-400 w-10 h-10 rounded-full 
                          flex items-center justify-center shadow">
              <Heart className="h-5 w-5 text-white" fill="white" />
            </div>
            <div>
              <h1 className="font-bold text-lg bg-gradient-to-r from-rose-600 to-rose-500 
                           bg-clip-text text-transparent">
                LifeStream
              </h1>
            </div>
          </button>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2">
            <button 
              onClick={() => navigate('/notifications')}
              className="relative p-2 rounded-full bg-gray-100 hover:bg-rose-50 transition-colors"
            >
              <Bell className="h-5 w-5 text-gray-600" />
              {notifications > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white text-[10px] 
                                rounded-full flex items-center justify-center">
                  {notifications}
                </span>
              )}
            </button>
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-2 rounded-full bg-gray-100 hover:bg-rose-50 transition-colors"
            >
              <Menu className="h-5 w-5 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mt-3">
          <div className="relative search-container">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search donors or blood types..."
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl 
                       focus:outline-none focus:ring-1 focus:ring-rose-300 focus:border-transparent
                       text-sm"
              onClick={() => setIsSearchOpen(true)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch(e)}
            />
          </div>
        </div>

        {/* Location and Auth */}
        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <MapPin className="h-4 w-4 text-rose-500" />
            <span className="text-sm text-gray-600">{currentLocation}</span>
          </div>
          
          {!isLoggedIn && (
            <div className="flex items-center space-x-2">
              <button
                onClick={handleLogin}
                className="px-3 py-1.5 text-rose-600 hover:text-rose-700 font-medium rounded-full 
                         hover:bg-rose-50 transition-all duration-300 text-sm"
              >
                Login
              </button>
              <button
                onClick={handleRegister}
                className="px-3 py-1.5 bg-gradient-to-r from-rose-500 to-rose-400 text-white 
                         rounded-full font-medium shadow shadow-rose-200 hover:shadow-rose-300 
                         hover:scale-105 transition-all duration-300 text-sm"
              >
                Register
              </button>
            </div>
          )}
        </div>
      </div>

      {/* MOBILE SEARCH OVERLAY */}
      {isSearchOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-white pt-16 animate-slideUp">
          <div className="p-4 h-full flex flex-col">
            {/* Search Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <Search className="h-5 w-5 text-gray-500" />
                <h2 className="text-xl font-bold text-gray-800">Search</h2>
              </div>
              <button onClick={() => setIsSearchOpen(false)}>
                <X className="h-6 w-6 text-gray-500" />
              </button>
            </div>
            
            {/* Search Input */}
            <div className="relative mb-6">
              <form onSubmit={handleSearch}>
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Type to search..."
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl 
                           focus:outline-none focus:ring-2 focus:ring-rose-300 text-lg"
                  autoFocus
                />
              </form>
            </div>

            {/* Search Content */}
            <div className="flex-1 overflow-y-auto space-y-6">
              {/* Quick Search */}
              <div>
                <h3 className="font-semibold text-gray-700 mb-3 flex items-center space-x-2">
                  <Compass className="h-4 w-4" />
                  <span>Quick Search</span>
                </h3>
                <div className="flex flex-wrap gap-2">
                  {['O+', 'A-', 'B+', 'AB-', 'Platelets', 'Plasma', 'Organ', 'Emergency'].map((type) => (
                    <button
                      key={type}
                      onClick={() => {
                        setSearchQuery(type);
                        handleSearch(new Event('submit'));
                      }}
                      className="px-4 py-2 bg-rose-50 text-rose-600 rounded-full font-medium hover:bg-rose-100"
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Popular Searches */}
              {/* <div>
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
                      className="w-full text-left p-3 rounded-lg hover:bg-gray-50 flex items-center space-x-3"
                    >
                      <Search className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-600">{item}</span>
                    </button>
                  ))}
                </div>
              </div> */}

              {/* Quick Links */}
              <div>
                <h3 className="font-semibold text-gray-700 mb-3 flex items-center space-x-2">
                  <BookOpen className="h-4 w-4" />
                  <span>Quick Links</span>
                </h3>
                <div className="space-y-2">
                  {quickLinks.map((link, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        navigate(link.path);
                        setIsSearchOpen(false);
                      }}
                      className="w-full text-left p-3 rounded-lg hover:bg-rose-50 flex items-center justify-between"
                    >
                      <div className="flex items-center space-x-3">
                        <link.icon className="h-4 w-4 text-gray-500" />
                        <span className="text-gray-600">{link.label}</span>
                      </div>
                      <ExternalLink className="h-4 w-4 text-gray-400" />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Close Button */}
            <div className="mt-6 pt-6 border-t border-gray-100">
              <button
                onClick={() => setIsSearchOpen(false)}
                className="w-full py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200"
              >
                Close Search
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MOBILE MENU OVERLAY */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" 
             onClick={() => setIsMobileMenuOpen(false)}>
          <div className="absolute top-0 right-0 h-full w-4/5 max-w-sm bg-white shadow-2xl animate-slideIn"
               onClick={(e) => e.stopPropagation()}>
            <div className="p-6 h-full flex flex-col">
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-3">
                  <div className="bg-gradient-to-r from-rose-500 to-rose-400 w-12 h-12 rounded-full 
                                flex items-center justify-center shadow">
                    <Heart className="h-6 w-6 text-white" fill="white" />
                  </div>
                  <div>
                    <h1 className="font-bold text-xl text-gray-800">LifeStream</h1>
                    <p className="text-sm text-gray-500">Save Lives, Donate Today</p>
                  </div>
                </div>
                <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 rounded-full hover:bg-gray-100">
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
                  className="mb-6 p-4 bg-gradient-to-r from-rose-50 to-pink-50 rounded-2xl text-left hover:opacity-90 transition-opacity"
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
                <div className="mb-6 p-4 bg-gradient-to-r from-rose-50 to-pink-50 rounded-2xl">
                  <h3 className="font-bold text-gray-800 mb-3">Join LifeStream</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Register to save lives and join our community of heroes.
                  </p>
                  <div className="flex space-x-3">
                    <button
                      onClick={handleLogin}
                      className="flex-1 py-2 bg-white text-rose-600 border border-rose-300 rounded-lg font-medium"
                    >
                      Login
                    </button>
                    <button
                      onClick={handleRegister}
                      className="flex-1 py-2 bg-gradient-to-r from-rose-500 to-rose-400 text-white rounded-lg font-medium"
                    >
                      Register
                    </button>
                  </div>
                </div>
              )}

              {/* Menu Items */}
              <div className="flex-1 overflow-y-auto">
                <div className="space-y-1">
                  <h4 className="text-sm font-semibold text-gray-500 mb-2 px-4">Main Menu</h4>
                  {desktopNavItems.map((item) => (
                    <button 
                      key={item.id}
                      onClick={() => handleTabClick(item.path, item.id)}
                      className="w-full text-left p-4 rounded-xl hover:bg-gray-50 
                               text-gray-700 font-medium flex items-center space-x-4"
                    >
                      <item.icon className="h-5 w-5 text-rose-500" />
                      <span>{item.label}</span>
                      {item.badge && (
                        <span className="ml-auto w-6 h-6 bg-red-500 text-white text-xs rounded-full flex items-center justify-center animate-pulse">
                          {item.badge}
                        </span>
                      )}
                    </button>
                  ))}
                  
                  <div className="border-t border-gray-100 my-4"></div>
                  
                  <h4 className="text-sm font-semibold text-gray-500 mb-2 px-4">My Account</h4>
                  {isLoggedIn ? (
                    profileItems.slice(0, 6).map((item) => (
                      <button 
                        key={item.label}
                        onClick={() => {
                          if (item.path === '/logout') {
                            handleLogout();
                          } else {
                            navigate(item.path);
                            setIsMobileMenuOpen(false);
                          }
                        }}
                        className="w-full text-left p-4 rounded-xl hover:bg-gray-50 
                                 text-gray-600 flex items-center space-x-4"
                      >
                        <item.icon className="h-5 w-5 text-gray-500" />
                        <span>{item.label}</span>
                      </button>
                    ))
                  ) : (
                    authItems.map((item) => (
                      <button 
                        key={item.label}
                        onClick={() => {
                          navigate(item.path);
                          setIsMobileMenuOpen(false);
                        }}
                        className={`w-full text-left p-4 rounded-xl flex items-center space-x-4 ${item.bgColor}`}
                      >
                        <item.icon className="h-5 w-5" />
                        <span className={item.color}>{item.label}</span>
                      </button>
                    ))
                  )}
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="pt-4 border-t border-gray-100 space-y-3">
                <button 
                  onClick={handleEmergency}
                  className="w-full py-3.5 bg-gradient-to-r from-red-500 to-rose-500 
                           text-white rounded-xl font-bold text-lg shadow-lg active:scale-95 
                           transition-transform flex items-center justify-center space-x-2"
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
      <div className="lg:hidden h-24"></div>

      {/* Custom animations */}
      <style>{`
        @keyframes pulse-slow {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.05); opacity: 0.9; }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideIn {
          from { transform: translateX(100%); }
          to { transform: translateY(0); }
        }
        @keyframes slideUp {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
        @keyframes ping {
          0% { transform: scale(1); opacity: 1; }
          100% { transform: scale(2); opacity: 0; }
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 2s ease-in-out infinite;
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        .animate-slideIn {
          animation: slideIn 0.3s ease-out;
        }
        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
        .animate-ping {
          animation: ping 1s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
        
        /* Scrollbar Styling */
        .overflow-y-auto::-webkit-scrollbar {
          width: 4px;
        }
        .overflow-y-auto::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .overflow-y-auto::-webkit-scrollbar-thumb {
          background: #fca5a5;
          border-radius: 10px;
        }
        .overflow-y-auto::-webkit-scrollbar-thumb:hover {
          background: #f87171;
        }
      `}</style>
    </>
  );
};

export default Navbar;