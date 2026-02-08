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
  Hospital as HospitalIcon,
  Ambulance,
  CheckCircle, ChevronRight,
  Sparkles, Zap, MoreVertical,
  Info, Target, BookOpen,
  Users, Globe, Phone, Mail,
  ChevronLeft,
  ExternalLink,
  MessageCircle,
  Building2,
  Stethoscope,
  ClipboardCheck,
  Activity,
  ShieldCheck,
  Bed,
  UserCheck,
  BriefcaseMedical,
  Syringe,
  HeartPulse
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
  
  // सभी user types के लिए अलग-अलग IDs
  const [patientId, setPatientId] = useState('');
  const [donorId, setDonorId] = useState('');
  const [hospitalId, setHospitalId] = useState('');
  const [userId, setUserId] = useState('');

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
    },
    {
      key: 'hospital',
      label: 'Hospital',
      icon: Building2,
      gradient: 'bg-gradient-to-r from-purple-600 to-purple-500',
      textColor: 'text-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200'
    }
  ];

  // Check user authentication
  const checkUserAuth = () => {
    console.log('Checking authentication...');
    
    let foundUser = false;
    let currentUserType = '';
    let currentUserData = null;

    // पहले hospital check करें (यह special case है)
    const hospitalToken = localStorage.getItem('hospitalToken');
    const hospitalData = localStorage.getItem('hospitalData');
    
    if (hospitalToken && hospitalData) {
      try {
        currentUserData = JSON.parse(hospitalData);
        currentUserType = 'hospital';
        foundUser = true;
        console.log('Hospital user found');
      } catch (error) {
        console.error('Error parsing hospital data:', error);
      }
    }

    // फिर regular users check करें
    if (!foundUser) {
      for (const type of userTypesConfig) {
        if (type.key === 'hospital') continue; // Hospital को पहले ही check कर चुके हैं
        
        const token = localStorage.getItem(`${type.key}Token`);
        const data = localStorage.getItem(`${type.key}Data`) || localStorage.getItem(type.key);

        if (token && data) {
          try {
            currentUserData = JSON.parse(data);
            currentUserType = type.key;
            foundUser = true;
            console.log(`${type.key} user found`);
            break;
          } catch (error) {
            console.error(`Error parsing ${type.key} data:`, error);
          }
        }
      }
    }

    // अगर कुछ नहीं मिला तो current user check करें
    if (!foundUser) {
      const storedUserData = localStorage.getItem('currentUserData');
      const storedUserType = localStorage.getItem('currentUserType');

      if (storedUserData && storedUserType) {
        try {
          currentUserData = JSON.parse(storedUserData);
          currentUserType = storedUserType;
          foundUser = true;
          console.log(`Current user found: ${storedUserType}`);
        } catch (error) {
          console.error('Error parsing current user data:', error);
        }
      }
    }

    // User data set करें
    if (foundUser && currentUserData && currentUserType) {
      const typeConfig = userTypesConfig.find(t => t.key === currentUserType);
      
      console.log(`Setting user: ${currentUserType}`, currentUserData);
      
      setIsLoggedIn(true);
      setUserData(currentUserData);
      setUserType(currentUserType);
      setUserTypeConfig(typeConfig || userTypesConfig[0]);

      localStorage.setItem('currentUserType', currentUserType);
      localStorage.setItem('currentUserData', JSON.stringify(currentUserData));

      // User type के according ID set करें
      switch (currentUserType) {
        case 'bloodDonor':
        case 'organDonor':
          const donorIdValue = currentUserData.donorId || currentUserData._id || localStorage.getItem('currentDonorId');
          setDonorId(donorIdValue || '');
          localStorage.setItem('currentDonorId', donorIdValue || '');
          break;
        case 'patient':
          const patientIdValue = currentUserData.patientId || currentUserData._id || localStorage.getItem('currentPatientId');
          setPatientId(patientIdValue || '');
          localStorage.setItem('currentPatientId', patientIdValue || '');
          break;
        case 'hospital':
          const hospitalIdValue = currentUserData.hospitalId || currentUserData._id || localStorage.getItem('currentHospitalId');
          setHospitalId(hospitalIdValue || '');
          localStorage.setItem('currentHospitalId', hospitalIdValue || '');
          break;
        case 'user':
          const userIdValue = currentUserData.userId || currentUserData._id || localStorage.getItem('currentUserId');
          setUserId(userIdValue || '');
          localStorage.setItem('currentUserId', userIdValue || '');
          break;
      }
    } else {
      console.log('No user found, setting to logged out');
      setIsLoggedIn(false);
      setUserData(null);
      setUserType('');
      setUserTypeConfig(null);
    }
  };

  // IDs get/set करने का useEffect
  useEffect(() => {
    if (!isLoggedIn || !userType) {
      // Guest users के लिए temporary IDs
      const guestId = 'guest-' + Date.now().toString(36) + Math.random().toString(36).substr(2);
      
      if (!localStorage.getItem('guestPatientId')) {
        localStorage.setItem('guestPatientId', guestId);
      }
      if (!localStorage.getItem('guestDonorId')) {
        localStorage.setItem('guestDonorId', guestId);
      }
      if (!localStorage.getItem('guestHospitalId')) {
        localStorage.setItem('guestHospitalId', guestId);
      }
      if (!localStorage.getItem('guestUserId')) {
        localStorage.setItem('guestUserId', guestId);
      }
      
      // Guest IDs set करें
      setPatientId(localStorage.getItem('guestPatientId') || guestId);
      setDonorId(localStorage.getItem('guestDonorId') || guestId);
      setHospitalId(localStorage.getItem('guestHospitalId') || guestId);
      setUserId(localStorage.getItem('guestUserId') || guestId);
      return;
    }

    // Logged in users के लिए
    if (userData) {
      switch (userType) {
        case 'bloodDonor':
        case 'organDonor':
          const donorIdValue = userData.donorId || userData._id || localStorage.getItem('currentDonorId');
          setDonorId(donorIdValue || '');
          localStorage.setItem('currentDonorId', donorIdValue || '');
          break;
        case 'patient':
          const patientIdValue = userData.patientId || userData._id || localStorage.getItem('currentPatientId');
          setPatientId(patientIdValue || '');
          localStorage.setItem('currentPatientId', patientIdValue || '');
          break;
        case 'hospital':
          const hospitalIdValue = userData.hospitalId || userData._id || localStorage.getItem('currentHospitalId');
          setHospitalId(hospitalIdValue || '');
          localStorage.setItem('currentHospitalId', hospitalIdValue || '');
          break;
        case 'user':
          const userIdValue = userData.userId || userData._id || localStorage.getItem('currentUserId');
          setUserId(userIdValue || '');
          localStorage.setItem('currentUserId', userIdValue || '');
          break;
      }
    }
  }, [isLoggedIn, userData, userType]);

  // Effect to check auth
  useEffect(() => {
    checkUserAuth();
    
    const handleStorageChange = () => {
      console.log('Storage changed, checking auth...');
      checkUserAuth();
    };
    
    const handleAuthChange = () => {
      console.log('Auth change event received');
      checkUserAuth();
    };
    
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('authChange', handleAuthChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('authChange', handleAuthChange);
    };
  }, [location]);

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
    else if (path.includes('/hospital-dashboard')) setActiveTab('hospital');
    else if (path.includes('/donor-dashboard')) setActiveTab('donor');
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
      description: 'Find blood donors',
      bgColor: 'bg-red-50',
      textColor: 'text-red-600',
      getPath: () => {
        if (userType === 'bloodDonor') return `/donor/${donorId}/dashboard`;
        if (userType === 'hospital') return `/hospital/${hospitalId}/blood-bank`;
        return '/blood';
      }
    },
    {
      id: 'organ',
      label: 'Organ Donation',
      icon: ActivityIcon,
      description: 'Organ donation info',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600',
      getPath: () => {
        if (userType === 'organDonor') return `/donor/${donorId}/dashboard`;
        if (userType === 'hospital') return `/hospital/${hospitalId}/organ-bank`;
        return '/organ';
      }
    },
    {
      id: 'urgent',
      label: userType === 'patient' ? 'My Matches' : 
             userType === 'bloodDonor' || userType === 'organDonor' ? 'Donation Requests' :
             userType === 'hospital' ? 'Hospital Requests' : 'Find Matches',
      icon: AlertCircle,
      description: userType === 'patient' ? 'View your matches' : 
                  userType === 'bloodDonor' || userType === 'organDonor' ? 'View donation requests' :
                  userType === 'hospital' ? 'Manage hospital requests' : 'Patient donor matches',
      bgColor: 'bg-amber-50',
      textColor: 'text-amber-600',
      badge: 3,
      getPath: () => {
        if (userType === 'patient') return `/patient/${patientId}/matches`;
        if (userType === 'bloodDonor' || userType === 'organDonor') return `/donor/${donorId}/requests`;
        if (userType === 'hospital') return `/hospital/${hospitalId}/requests`;
        return '/patient-matches';
      }
    },
    {
      id: 'hospitals',
      label: userType === 'hospital' ? 'Dashboard' : 'Hospitals',
      icon: userType === 'hospital' ? Building2 : HospitalIcon,
      description: userType === 'hospital' ? 'Hospital dashboard' : 'Find hospitals',
      bgColor: userType === 'hospital' ? 'bg-purple-50' : 'bg-blue-50',
      textColor: userType === 'hospital' ? 'text-purple-600' : 'text-blue-600',
      getPath: () => userType === 'hospital' ? `/hospital/${hospitalId}/dashboard` : '/hospitals'
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
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      getPath: () => '/'
    },
    {
      id: 'blood',
      label: 'Blood',
      icon: Droplets,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      getPath: () => {
        if (userType === 'bloodDonor') return `/donor/${donorId}/dashboard`;
        return '/blood';
      }
    },
    {
      id: 'organ',
      label: 'Organ',
      icon: ActivityIcon,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      getPath: () => {
        if (userType === 'organDonor') return `/donor/${donorId}/dashboard`;
        return '/organ';
      }
    },
    {
      id: 'urgent',
      label: userType === 'patient' ? 'Matches' : 
             userType === 'bloodDonor' || userType === 'organDonor' ? 'Requests' :
             userType === 'hospital' ? 'Hospital' : 'Matches',
      icon: AlertCircle,
      color: 'text-amber-600',
      bgColor: 'bg-amber-50',
      getPath: () => {
        if (userType === 'patient') return `/patient/${patientId}/matches`;
        if (userType === 'bloodDonor' || userType === 'organDonor') return `/donor/${donorId}/requests`;
        if (userType === 'hospital') return `/hospital/${hospitalId}/requests`;
        return '/patient-matches';
      }
    },
    {
      id: 'profile',
      label: 'Profile',
      icon: User,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      getPath: () => {
        switch (userType) {
          case 'bloodDonor':
          case 'organDonor':
            return `/donor/${donorId}/profile`;
          case 'patient':
            return `/patient/${patientId}/profile`;
          case 'hospital':
            return `/hospital/${hospitalId}/profile`;
          case 'user':
            return `/user/${userId}/profile`;
          default:
            return '/auth';
        }
      }
    }
  ];

  // Profile dropdown items
  const getProfileItems = () => {
    // Common base items
    const baseItems = [
      {
        label: 'My Profile',
        icon: User,
        bgColor: 'bg-blue-50',
        textColor: 'text-blue-600',
        description: 'View your profile',
        getPath: () => {
          switch (userType) {
            case 'bloodDonor':
            case 'organDonor':
              return `/donor/${donorId}/profile`;
            case 'patient':
              return `/patient/${patientId}/profile`;
            case 'hospital':
              return `/hospital/${hospitalId}/profile`;
            case 'user':
              return `/user/${userId}/profile`;
            default:
              return '/profile';
          }
        }
      },
      {
        label: 'Settings',
        icon: Settings,
        bgColor: 'bg-blue-50',
        textColor: 'text-blue-600',
        description: 'Account settings',
        getPath: () => {
          switch (userType) {
            case 'bloodDonor':
            case 'organDonor':
              return `/donor/${donorId}/settings`;
            case 'patient':
              return `/patient/${patientId}/settings`;
            case 'hospital':
              return `/hospital/${hospitalId}/settings`;
            case 'user':
              return `/user/${userId}/settings`;
            default:
              return '/settings';
          }
        }
      },
      {
        label: 'Help Center',
        icon: LifeBuoy,
        bgColor: 'bg-green-50',
        textColor: 'text-green-600',
        description: 'Get help & support',
        getPath: () => '/help'
      }
    ];

    if (!userTypeConfig) return baseItems;

    // User type specific items
    switch (userType) {
      case 'bloodDonor':
        return [
          ...baseItems,
          {
            label: 'My Donations',
            icon: History,
            bgColor: 'bg-red-50',
            textColor: 'text-red-600',
            description: 'Blood donation history',
            getPath: () => `/donor/${donorId}/donations`
          },
          {
            label: 'Donation Schedule',
            icon: Calendar,
            bgColor: 'bg-red-50',
            textColor: 'text-red-600',
            description: 'Upcoming donations',
            getPath: () => `/donor/${donorId}/schedule`
          },
          {
            label: 'Blood Requests',
            icon: AlertCircle,
            bgColor: 'bg-amber-50',
            textColor: 'text-amber-600',
            description: 'View blood requests',
            getPath: () => `/donor/${donorId}/requests`
          },
          {
            label: 'Achievements',
            icon: Award,
            bgColor: 'bg-green-50',
            textColor: 'text-green-600',
            description: 'Your achievements',
            getPath: () => `/donor/${donorId}/achievements`
          }
        ];
      case 'organDonor':
        return [
          ...baseItems,
          {
            label: 'My Pledge',
            icon: Shield,
            bgColor: 'bg-green-50',
            textColor: 'text-green-600',
            description: 'Organ donation pledge',
            getPath: () => `/donor/${donorId}/pledge`
          },
          {
            label: 'Organ Requests',
            icon: AlertCircle,
            bgColor: 'bg-amber-50',
            textColor: 'text-amber-600',
            description: 'View organ requests',
            getPath: () => `/donor/${donorId}/organ-requests`
          },
          {
            label: 'Medical Records',
            icon: BookOpen,
            bgColor: 'bg-blue-50',
            textColor: 'text-blue-600',
            description: 'Health information',
            getPath: () => `/donor/${donorId}/medical-records`
          },
          {
            label: 'Legal Documents',
            icon: ClipboardCheck,
            bgColor: 'bg-purple-50',
            textColor: 'text-purple-600',
            description: 'Legal documents',
            getPath: () => `/donor/${donorId}/documents`
          }
        ];
      case 'patient':
        return [
          ...baseItems,
          {
            label: 'My Matches',
            icon: AlertCircle,
            bgColor: 'bg-amber-50',
            textColor: 'text-amber-600',
            description: 'View patient matches',
            getPath: () => `/patient/${patientId}/matches`
          },
          {
            label: 'My Requests',
            icon: Heart,
            bgColor: 'bg-red-50',
            textColor: 'text-red-600',
            description: 'Blood/organ requests',
            getPath: () => `/patient/${patientId}/requests`
          },
          {
            label: 'Medical History',
            icon: BookOpen,
            bgColor: 'bg-blue-50',
            textColor: 'text-blue-600',
            description: 'Medical records',
            getPath: () => `/patient/${patientId}/medical-history`
          },
          {
            label: 'Family Members',
            icon: Users,
            bgColor: 'bg-indigo-50',
            textColor: 'text-indigo-600',
            description: 'Manage family',
            getPath: () => `/patient/${patientId}/family`
          }
        ];
      case 'hospital':
        return [
          ...baseItems,
          {
            label: 'Hospital Dashboard',
            icon: Building2,
            bgColor: 'bg-purple-50',
            textColor: 'text-purple-600',
            description: 'Manage hospital',
            getPath: () => `/hospital/${hospitalId}/dashboard`
          },
          {
            label: 'Patient Records',
            icon: ClipboardCheck,
            bgColor: 'bg-blue-50',
            textColor: 'text-blue-600',
            description: 'View patient records',
            getPath: () => `/hospital/${hospitalId}/patients`
          },
          {
            label: 'Blood Bank',
            icon: Droplets,
            bgColor: 'bg-red-50',
            textColor: 'text-red-600',
            description: 'Blood inventory',
            getPath: () => `/hospital/${hospitalId}/blood-bank`
          },
          {
            label: 'Organ Bank',
            icon: ActivityIcon,
            bgColor: 'bg-green-50',
            textColor: 'text-green-600',
            description: 'Organ inventory',
            getPath: () => `/hospital/${hospitalId}/organ-bank`
          },
          {
            label: 'Donation Requests',
            icon: AlertCircle,
            bgColor: 'bg-amber-50',
            textColor: 'text-amber-600',
            description: 'Manage requests',
            getPath: () => `/hospital/${hospitalId}/requests`
          },
          {
            label: 'Staff Management',
            icon: Users,
            bgColor: 'bg-indigo-50',
            textColor: 'text-indigo-600',
            description: 'Manage staff',
            getPath: () => `/hospital/${hospitalId}/staff`
          }
        ];
      case 'user':
        return [
          ...baseItems,
          {
            label: 'My Activities',
            icon: History,
            bgColor: 'bg-indigo-50',
            textColor: 'text-indigo-600',
            description: 'View activities',
            getPath: () => `/user/${userId}/activities`
          },
          {
            label: 'Saved Items',
            icon: Bookmark,
            bgColor: 'bg-yellow-50',
            textColor: 'text-yellow-600',
            description: 'Saved items',
            getPath: () => `/user/${userId}/saved`
          },
          {
            label: 'Community Posts',
            icon: MessageCircle,
            bgColor: 'bg-blue-50',
            textColor: 'text-blue-600',
            description: 'Your posts',
            getPath: () => `/user/${userId}/posts`
          }
        ];
      default:
        return baseItems;
    }
  };

  // Helper functions
  const handleTabClick = (item) => {
    setActiveTab(item.id);
    const path = item.getPath ? item.getPath() : item.path;
    navigate(path);
    if (window.innerWidth < 1024) {
      setIsMobileMenuOpen(false);
    }
    setIsMoreOpen(false);
  };

  const handleNavigation = (itemId) => {
    const item = mainNavItems.find(i => i.id === itemId);
    if (!item) return;
    handleTabClick(item);
  };

  const handlePatientMatchesClick = () => {
    const item = mainNavItems.find(i => i.id === 'urgent');
    if (item) {
      handleTabClick(item);
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

  // Logout function
  const handleLogout = () => {
    console.log('Logging out all users...');
    
    // सभी user types के tokens और data remove करें
    userTypesConfig.forEach(type => {
      localStorage.removeItem(`${type.key}Token`);
      localStorage.removeItem(type.key);
      localStorage.removeItem(`${type.key}Data`);
    });

    // Hospital specific (special case)
    localStorage.removeItem('hospitalToken');
    localStorage.removeItem('hospitalData');

    // Current user data remove करें
    localStorage.removeItem('currentUserData');
    localStorage.removeItem('currentUserType');
    
    // Current IDs remove करें
    localStorage.removeItem('currentPatientId');
    localStorage.removeItem('currentDonorId');
    localStorage.removeItem('currentHospitalId');
    localStorage.removeItem('currentUserId');

    // State reset करें
    setIsLoggedIn(false);
    setUserData(null);
    setUserType('');
    setUserTypeConfig(null);
    setIsProfileOpen(false);

    // Guest IDs generate करें (existing नहीं हटाएं)
    const guestId = 'guest-' + Date.now().toString(36) + Math.random().toString(36).substr(2);
    
    if (!localStorage.getItem('guestPatientId')) {
      localStorage.setItem('guestPatientId', guestId);
    }
    if (!localStorage.getItem('guestDonorId')) {
      localStorage.setItem('guestDonorId', guestId);
    }
    if (!localStorage.getItem('guestHospitalId')) {
      localStorage.setItem('guestHospitalId', guestId);
    }
    if (!localStorage.getItem('guestUserId')) {
      localStorage.setItem('guestUserId', guestId);
    }

    // Guest IDs set करें
    setPatientId(localStorage.getItem('guestPatientId') || guestId);
    setDonorId(localStorage.getItem('guestDonorId') || guestId);
    setHospitalId(localStorage.getItem('guestHospitalId') || guestId);
    setUserId(localStorage.getItem('guestUserId') || guestId);

    // Auth change event trigger करें
    window.dispatchEvent(new Event('authChange'));

    navigate('/');
  };

  const handleEmergency = () => {
    navigate('/emergency-request');
  };

  const handleLocationSelect = (city) => {
    setCurrentLocation(city);
    setIsLocationOpen(false);
  };

  // User information functions
  const getUserInitials = () => {
    if (userType === 'hospital') {
      return userData?.hospitalName?.charAt(0).toUpperCase() || 'H';
    }
    if (userType === 'bloodDonor') {
      return userData?.name?.charAt(0).toUpperCase() || 'B';
    }
    if (userType === 'organDonor') {
      return userData?.name?.charAt(0).toUpperCase() || 'O';
    }
    if (userType === 'patient') {
      return userData?.name?.charAt(0).toUpperCase() || 'P';
    }
    return userData?.name?.charAt(0).toUpperCase() || 'U';
  };

  const getUserDisplayName = () => {
    if (userType === 'hospital') {
      return userData?.hospitalName || 'Hospital';
    }
    if (userType === 'bloodDonor') {
      return userData?.name || 'Blood Donor';
    }
    if (userType === 'organDonor') {
      return userData?.name || 'Organ Donor';
    }
    if (userType === 'patient') {
      return userData?.name || 'Patient';
    }
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
      if (itemId === 'hospitals' && userType === 'hospital') return 'bg-gradient-to-r from-purple-600 to-purple-500 text-white shadow-lg shadow-purple-500/30';
      return 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-500/30';
    }

    if (itemId === 'blood') return 'text-gray-700 hover:text-red-600 hover:bg-red-50';
    if (itemId === 'organ') return 'text-gray-700 hover:text-green-600 hover:bg-green-50';
    if (itemId === 'urgent') return 'text-gray-700 hover:text-amber-600 hover:bg-amber-50';
    if (itemId === 'hospitals' && userType === 'hospital') return 'text-gray-700 hover:text-purple-600 hover:bg-purple-50';
    return 'text-gray-700 hover:text-blue-600 hover:bg-blue-50';
  };

  // Get current ID based on user type
  const getCurrentId = () => {
    switch (userType) {
      case 'bloodDonor':
      case 'organDonor':
        return donorId;
      case 'patient':
        return patientId;
      case 'hospital':
        return hospitalId;
      case 'user':
        return userId;
      default:
        return '';
    }
  };

  // Get ID label
  const getIdLabel = () => {
    switch (userType) {
      case 'bloodDonor':
      case 'organDonor':
        return 'Donor ID';
      case 'patient':
        return 'Patient ID';
      case 'hospital':
        return 'Hospital ID';
      case 'user':
        return 'User ID';
      default:
        return 'ID';
    }
  };

  // Get ID value for display
  const getIdValue = () => {
    const id = getCurrentId();
    if (!id) return 'Not Available';
    if (id.startsWith('guest-')) {
      return 'Guest User';
    }
    // Shorten ID for display
    return id.length > 10 ? `${id.substring(0, 8)}...` : id;
  };

  // Hospital login modal trigger function
  const handleHospitalLogin = () => {
    window.dispatchEvent(new CustomEvent('openHospitalAuthModal'));
    setIsMobileMenuOpen(false);
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
                  onClick={() => handleNavigation(item.id)}
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
                        onClick={() => handleTabClick(item)}
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
                    {/* Hospital Login Option */}
                    {!isLoggedIn && (
                      <button
                        onClick={handleHospitalLogin}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-purple-50 transition-colors border-t border-gray-100 mt-2 pt-2"
                      >
                        <div className="p-2 rounded-lg bg-purple-50">
                          <Building2 className="h-4 w-4 text-purple-600" />
                        </div>
                        <div className="text-left">
                          <div className="font-medium text-gray-900 text-sm">Hospital Login</div>
                          <div className="text-xs text-gray-500">For hospitals & clinics</div>
                        </div>
                      </button>
                    )}
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
                          {userType === 'hospital' && userData?.registrationNumber && (
                            <p className="text-xs text-gray-500 mt-1">Reg: {userData.registrationNumber}</p>
                          )}
                          <p className="text-xs text-gray-500 mt-1">{getIdLabel()}: {getIdValue()}</p>
                        </div>
                      </div>
                      
                      {/* Menu Items */}
                      <div className="py-2">
                        {getProfileItems().map((item, idx) => (
                          <button
                            key={idx}
                            onClick={() => {
                              navigate(item.getPath ? item.getPath() : item.path);
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
                  onClick={() => handleNavigation(item.id)}
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
              
              {isLoggedIn ? (
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="p-1 hover:bg-gray-100 rounded-lg"
                >
                  <div className={`w-8 h-8 rounded-full ${userTypeConfig?.gradient || 'bg-gradient-to-r from-blue-500 to-cyan-500'} flex items-center justify-center text-white font-semibold text-sm`}>
                    {getUserInitials()}
                  </div>
                </button>
              ) : (
                <button
                  onClick={() => setIsMobileMenuOpen(true)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <Menu className="h-4 w-4 text-gray-600" />
                </button>
              )}
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
              
              {isLoggedIn ? (
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="p-1 hover:bg-gray-100 rounded-lg"
                >
                  <div className={`w-8 h-8 rounded-full ${userTypeConfig?.gradient || 'bg-gradient-to-r from-blue-500 to-cyan-500'} flex items-center justify-center text-white font-semibold text-sm`}>
                    {getUserInitials()}
                  </div>
                </button>
              ) : (
                <button
                  onClick={() => setIsMobileMenuOpen(true)}
                  className="mobile-menu-trigger p-2 hover:bg-gray-100 rounded-lg"
                >
                  <Menu className="h-4 w-4 text-gray-600" />
                </button>
              )}
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
                onClick={() => handleTabClick(item)}
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
                      {userType === 'hospital' && userData?.registrationNumber && (
                        <p className="text-xs text-gray-500">Reg: {userData.registrationNumber}</p>
                      )}
                      <p className="text-xs text-gray-500">{getIdLabel()}: {getIdValue()}</p>
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
                        handleTabClick(item);
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
              
              {/* Hospital Login Option for non-logged in users */}
              {!isLoggedIn && (
                <div className="mb-4">
                  <button
                    onClick={handleHospitalLogin}
                    className="w-full flex items-center justify-between px-3 py-3 rounded-lg hover:bg-purple-50 transition-colors border border-purple-200"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-purple-50">
                        <Building2 className="h-4 w-4 text-purple-600" />
                      </div>
                      <div className="text-left">
                        <div className="font-medium text-gray-900 text-sm">Hospital Login</div>
                        <div className="text-xs text-gray-500">For hospitals & clinics</div>
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-gray-400" />
                  </button>
                </div>
              )}
              
              {/* Secondary Navigation */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">More</h3>
                <div className="space-y-1">
                  {secondaryNavItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        handleTabClick(item);
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
                    { label: 'Find Hospitals', icon: HospitalIcon, color: 'blue' },
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