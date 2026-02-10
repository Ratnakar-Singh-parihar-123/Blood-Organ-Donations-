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
  HeartPulse,
  Lock,
  Eye,
  EyeOff,
  Mail as MailIcon,
  Phone as PhoneIcon,
  MapPin as MapPinIcon,
  ClipboardList,
  BadgeCheck,
  Star as StarIcon,
  Crown,
  Shield as ShieldIcon,
  Target as TargetIcon,
  Zap as ZapIcon,
  Users as UsersIcon,
  Package,
  Truck,
  ActivitySquare,
  FileText,
  Download,
  Upload,
  Link,
  Share2,
  BarChart3,
  PieChart,
  TrendingDown,
  Clock,
  CheckSquare,
  XCircle,
  AlertTriangle,
  ThumbsUp,
  MessageSquare,
  Coffee,
  Battery,
  BatteryCharging,
  BatteryFull,
  Cloud,
  Wifi,
  WifiOff,
  Signal,
  SignalZero,
  SignalLow,
  SignalMedium,
  SignalHigh,
  Radio,
  Satellite,
  Navigation,
  Compass,
  Map,
  Globe as GlobeIcon,
  Layers,
  Grid,
  List,
  Filter,
  SortAsc,
  SortDesc,
  RefreshCw,
  RotateCw,
  Repeat,
  Shuffle,
  SkipBack,
  SkipForward,
  FastForward,
  Rewind,
  Play,
  Pause,
  StopCircle,
  Volume2,
  VolumeX,
  Mic,
  MicOff,
  Video,
  VideoOff,
  Camera,
  CameraOff,
  Image,
  ImageOff,
  Music,
  Headphones,
  RadioTower,
  Tv,
  Monitor,
  Smartphone,
  Tablet,
  Watch,
  Printer,
  HardDrive,
  Server,
  Database,
  Cpu,
  MemoryStick,
  Keyboard,
  Mouse,
  MonitorSpeaker,
  Speaker,
  Volume1
} from 'lucide-react';
import jeevandaans from "../../public/jeevandaan.png";
import NotificationsModal from "../notifications/NotificationsModal";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchRef = useRef(null);
  const profileRef = useRef(null);
  const moreRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const locationRef = useRef(null);

  const [activeTab, setActiveTab] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notificationCount, setNotificationCount] = useState(5);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [currentLocation, setCurrentLocation] = useState('Mumbai, India');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const [userType, setUserType] = useState('');
  const [userTypeConfig, setUserTypeConfig] = useState(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isLoading, setIsLoading] = useState(false);
  const [showEmergencyModal, setShowEmergencyModal] = useState(false);
  
  // User IDs
  const [patientId, setPatientId] = useState('');
  const [donorId, setDonorId] = useState('');
  const [hospitalId, setHospitalId] = useState('');
  const [userId, setUserId] = useState('');

  // Device detection
  const isMobile = windowWidth < 768;
  const isTablet = windowWidth >= 768 && windowWidth < 1024;
  const isDesktop = windowWidth >= 1024;
  const isLargeDesktop = windowWidth >= 1280;

  // User type configurations
  const userTypesConfig = [
    {
      key: 'bloodDonor',
      label: 'Blood Donor',
      icon: Droplets,
      gradient: 'bg-gradient-to-r from-red-600 to-pink-600',
      lightGradient: 'bg-gradient-to-r from-red-100 to-pink-100',
      textColor: 'text-red-600',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
      shadowColor: 'shadow-red-500/20',
      badgeColor: 'bg-red-500'
    },
    {
      key: 'organDonor',
      label: 'Organ Donor',
      icon: ActivityIcon,
      gradient: 'bg-gradient-to-r from-green-600 to-emerald-600',
      lightGradient: 'bg-gradient-to-r from-green-100 to-emerald-100',
      textColor: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      shadowColor: 'shadow-green-500/20',
      badgeColor: 'bg-green-500'
    },
    {
      key: 'patient',
      label: 'Patient/Family',
      icon: User,
      gradient: 'bg-gradient-to-r from-blue-600 to-cyan-600',
      lightGradient: 'bg-gradient-to-r from-blue-100 to-cyan-100',
      textColor: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      shadowColor: 'shadow-blue-500/20',
      badgeColor: 'bg-blue-500'
    },
    {
      key: 'user',
      label: 'Community Member',
      icon: Users,
      gradient: 'bg-gradient-to-r from-indigo-600 to-purple-600',
      lightGradient: 'bg-gradient-to-r from-indigo-100 to-purple-100',
      textColor: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
      borderColor: 'border-indigo-200',
      shadowColor: 'shadow-purple-500/20',
      badgeColor: 'bg-purple-500'
    },
    {
      key: 'hospital',
      label: 'Hospital/Clinic',
      icon: Building2,
      gradient: 'bg-gradient-to-r from-purple-600 to-violet-600',
      lightGradient: 'bg-gradient-to-r from-purple-100 to-violet-100',
      textColor: 'text-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      shadowColor: 'shadow-purple-500/20',
      badgeColor: 'bg-purple-500'
    }
  ];

  // Enhanced authentication check
  const checkUserAuth = () => {
    console.log('🔄 Navbar - Checking authentication...');
    
    let foundUser = false;
    let currentUserType = '';
    let currentUserData = null;

    // First check current user storage
    const currentUserTypeStored = localStorage.getItem('currentUserType');
    const currentUserDataStored = localStorage.getItem('currentUserData');
    
    if (currentUserTypeStored && currentUserDataStored) {
      try {
        currentUserData = JSON.parse(currentUserDataStored);
        currentUserType = currentUserTypeStored;
        foundUser = true;
      } catch (error) {
        console.error('❌ Navbar - Error parsing current user data:', error);
      }
    }

    // If not found, check all user types individually
    if (!foundUser) {
      for (const typeConfig of userTypesConfig) {
        const typeKey = typeConfig.key;
        
        // Check for token
        const token = localStorage.getItem(`${typeKey}Token`) || 
                     localStorage.getItem(`${typeKey}_token`) ||
                     localStorage.getItem(`${typeKey.toLowerCase()}Token`);
        
        // Check for data
        const data = localStorage.getItem(`${typeKey}Data`) || 
                    localStorage.getItem(typeKey) ||
                    localStorage.getItem(`${typeKey.toLowerCase()}Data`);
        
        if (token && data) {
          try {
            currentUserData = JSON.parse(data);
            currentUserType = typeKey;
            foundUser = true;
            
            // Save to current storage for consistency
            localStorage.setItem('currentUserType', typeKey);
            localStorage.setItem('currentUserData', data);
            break;
          } catch (error) {
            console.error(`❌ Navbar - Error parsing ${typeKey} data:`, error);
            
            // If JSON parse fails but we have data string, create basic user
            if (data && typeof data === 'string') {
              currentUserData = { 
                name: data,
                email: 'user@example.com',
                phone: '0000000000'
              };
              currentUserType = typeKey;
              foundUser = true;
              
              // Save properly formatted data
              localStorage.setItem('currentUserType', typeKey);
              localStorage.setItem('currentUserData', JSON.stringify(currentUserData));
              break;
            }
          }
        }
      }
    }

    // Set state based on found user
    if (foundUser && currentUserData && currentUserType) {
      const typeConfig = userTypesConfig.find(t => t.key === currentUserType);
      
      setIsLoggedIn(true);
      setUserData(currentUserData);
      setUserType(currentUserType);
      setUserTypeConfig(typeConfig || userTypesConfig[0]);

      // Set IDs based on user type
      switch (currentUserType) {
        case 'bloodDonor':
        case 'organDonor':
          const donorIdValue = currentUserData.donorId || 
                             currentUserData.id || 
                             localStorage.getItem('currentDonorId') || 
                             `donor-${Date.now().toString(36)}`;
          setDonorId(donorIdValue);
          localStorage.setItem('currentDonorId', donorIdValue);
          break;
        case 'patient':
          const patientIdValue = currentUserData.patientId || 
                               currentUserData.id || 
                               localStorage.getItem('currentPatientId') || 
                               `patient-${Date.now().toString(36)}`;
          setPatientId(patientIdValue);
          localStorage.setItem('currentPatientId', patientIdValue);
          break;
        case 'hospital':
          const hospitalIdValue = currentUserData.hospitalId || 
                                currentUserData.id || 
                                currentUserData.registrationNumber ||
                                localStorage.getItem('currentHospitalId') || 
                                `hospital-${Date.now().toString(36)}`;
          setHospitalId(hospitalIdValue);
          localStorage.setItem('currentHospitalId', hospitalIdValue);
          break;
        case 'user':
          const userIdValue = currentUserData.userId || 
                            currentUserData.id || 
                            localStorage.getItem('currentUserId') || 
                            `user-${Date.now().toString(36)}`;
          setUserId(userIdValue);
          localStorage.setItem('currentUserId', userIdValue);
          break;
      }
    } else {
      setIsLoggedIn(false);
      setUserData(null);
      setUserType('');
      setUserTypeConfig(null);
      
      // Generate guest IDs (preserve if exist)
      const guestId = 'guest-' + Date.now().toString(36) + Math.random().toString(36).substr(2);
      
      ['guestPatientId', 'guestDonorId', 'guestHospitalId', 'guestUserId'].forEach(key => {
        if (!localStorage.getItem(key)) {
          localStorage.setItem(key, guestId);
        }
      });
      
      // Set guest IDs
      setPatientId(localStorage.getItem('guestPatientId') || guestId);
      setDonorId(localStorage.getItem('guestDonorId') || guestId);
      setHospitalId(localStorage.getItem('guestHospitalId') || guestId);
      setUserId(localStorage.getItem('guestUserId') || guestId);
    }
    
    setIsLoading(false);
  };

  // Load user data on mount
  useEffect(() => {
    setIsLoading(true);
    
    const timer = setTimeout(() => {
      checkUserAuth();
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  // Listen for storage changes and auth events
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (
        e.key?.includes('Token') || 
        e.key?.includes('token') ||
        e.key?.includes('Data') || 
        e.key?.includes('data') ||
        e.key?.includes('user') ||
        e.key?.includes('User') ||
        e.key === 'currentUserType' || 
        e.key === 'currentUserData' ||
        !e.key
      ) {
        setTimeout(() => checkUserAuth(), 100);
      }
    };
    
    const handleAuthChange = () => {
      checkUserAuth();
    };
    
    const handleAuthSuccess = (e) => {
      if (e.detail && e.detail.userType && e.detail.userData) {
        const { userType, userData, token } = e.detail;
        
        // Find type config
        const typeConfig = userTypesConfig.find(t => t.key === userType);
        
        // Update state immediately
        setIsLoggedIn(true);
        setUserType(userType);
        setUserData(userData);
        setUserTypeConfig(typeConfig || userTypesConfig[0]);
        
        // Save to localStorage properly
        localStorage.setItem('currentUserType', userType);
        localStorage.setItem('currentUserData', JSON.stringify(userData));
        
        // Save token based on user type
        if (token) {
          localStorage.setItem(`${userType}Token`, token);
          localStorage.setItem(`${userType}_token`, token);
        } else {
          localStorage.setItem(`${userType}Token`, `${userType}_token_${Date.now()}`);
        }
        
        // Save user data in type-specific storage
        localStorage.setItem(`${userType}Data`, JSON.stringify(userData));
        localStorage.setItem(userType, JSON.stringify(userData));
        
        // Set ID based on user type
        switch (userType) {
          case 'bloodDonor':
          case 'organDonor':
            const donorIdValue = userData.donorId || userData.id || `donor-${Date.now().toString(36)}`;
            setDonorId(donorIdValue);
            localStorage.setItem('currentDonorId', donorIdValue);
            break;
          case 'patient':
            const patientIdValue = userData.patientId || userData.id || `patient-${Date.now().toString(36)}`;
            setPatientId(patientIdValue);
            localStorage.setItem('currentPatientId', patientIdValue);
            break;
          case 'hospital':
            const hospitalIdValue = userData.hospitalId || userData.id || userData.registrationNumber || `hospital-${Date.now().toString(36)}`;
            setHospitalId(hospitalIdValue);
            localStorage.setItem('currentHospitalId', hospitalIdValue);
            break;
          case 'user':
            const userIdValue = userData.userId || userData.id || `user-${Date.now().toString(36)}`;
            setUserId(userIdValue);
            localStorage.setItem('currentUserId', userIdValue);
            break;
        }
        
        // Close any open modals
        setIsProfileOpen(false);
        setIsMobileMenuOpen(false);
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('authChange', handleAuthChange);
    window.addEventListener('authSuccess', handleAuthSuccess);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('authChange', handleAuthChange);
      window.removeEventListener('authSuccess', handleAuthSuccess);
    };
  }, []);

  // Update active tab based on route
  useEffect(() => {
    const path = location.pathname;
    
    if (path === '/') setActiveTab('home');
    else if (path.includes('/blood')) setActiveTab('blood');
    else if (path.includes('/organ')) setActiveTab('organ');
    else if (path.includes('/patient') || path.includes('/matches') || path.includes('/requests')) setActiveTab('urgent');
    else if (path.includes('/hospital')) setActiveTab('hospitals');
    else if (path.includes('/profile')) setActiveTab('profile');
    else if (path.includes('/auth') || path.includes('/login') || path.includes('/register')) setActiveTab('auth');
    else if (path.includes('/dashboard')) setActiveTab('dashboard');
  }, [location]);

  // Track window width
  useEffect(() => {
    const handleResize = () => {
      const newWidth = window.innerWidth;
      setWindowWidth(newWidth);
      
      // Auto close menus on resize
      if (newWidth >= 1024) {
        setIsMobileMenuOpen(false);
      }
      if (newWidth >= 768 && isSearchOpen) {
        setIsSearchOpen(false);
      }
      if (newWidth < 1024) {
        setIsMoreOpen(false);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isSearchOpen]);

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdowns on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      const clickTarget = event.target;
      
      if (isProfileOpen && profileRef.current && !profileRef.current.contains(clickTarget)) {
        setIsProfileOpen(false);
      }
      
      if (isMoreOpen && moreRef.current && !moreRef.current.contains(clickTarget)) {
        setIsMoreOpen(false);
      }
      
      if (isLocationOpen && locationRef.current && !locationRef.current.contains(clickTarget)) {
        setIsLocationOpen(false);
      }
      
      if (isSearchOpen && searchRef.current && !searchRef.current.contains(clickTarget)) {
        setIsSearchOpen(false);
      }
      
      if (isMobileMenuOpen && mobileMenuRef.current && 
          !mobileMenuRef.current.contains(clickTarget) && 
          !clickTarget.closest('.mobile-menu-trigger')) {
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

  // Responsive navigation items
  const getMainNavItems = () => {
    const items = [
      {
        id: 'blood',
        label: isMobile ? 'Blood' : 'Blood Donation',
        icon: Droplets,
        description: 'Find blood donors & donate blood',
        badge: userType === 'bloodDonor' ? 'Donor' : null,
        getPath: () => {
          if (userType === 'bloodDonor') return `/donor/dashboard?type=blood&id=${donorId}`;
          if (userType === 'hospital') return `/hospital/blood-bank?id=${hospitalId}`;
          return '/blood-donation';
        },
        requiresAuth: false
      },
      {
        id: 'organ',
        label: isMobile ? 'Organ' : 'Organ Donation',
        icon: ActivityIcon,
        description: 'Organ donation & transplantation',
        badge: userType === 'organDonor' ? 'Donor' : null,
        getPath: () => {
          if (userType === 'organDonor') return `/donor/dashboard?type=organ&id=${donorId}`;
          if (userType === 'hospital') return `/hospital/organ-bank?id=${hospitalId}`;
          return '/organ-donation';
        },
        requiresAuth: false
      },
      {
        id: 'urgent',
        label: isMobile ? 
               (userType === 'patient' ? 'Matches' : 
                userType === 'hospital' ? 'Hospital' : 'Urgent') :
               (userType === 'patient' ? 'My Matches' : 
                userType === 'bloodDonor' || userType === 'organDonor' ? 'Donation Requests' :
                userType === 'hospital' ? 'Hospital Requests' : 'Urgent Requests'),
        icon: AlertCircle,
        description: userType === 'patient' ? 'View your donor matches' : 
                    userType === 'bloodDonor' || userType === 'organDonor' ? 'View donation requests' :
                    userType === 'hospital' ? 'Manage hospital requests' : 'Find urgent blood/organ needs',
        badge: notificationCount > 0 ? `${notificationCount}` : null,
        getPath: () => {
          if (userType === 'patient') return `/patient/matches?id=${patientId}`;
          if (userType === 'bloodDonor' || userType === 'organDonor') return `/donor/requests?id=${donorId}`;
          if (userType === 'hospital') return `/hospital/requests?id=${hospitalId}`;
          return '/urgent-requests';
        },
        requiresAuth: false
      },
      {
        id: 'hospitals',
        label: userType === 'hospital' ? (isMobile ? 'Dashboard' : 'Dashboard') : 
               isMobile ? 'Hospitals' : 'Hospitals',
        icon: userType === 'hospital' ? Building2 : HospitalIcon,
        description: userType === 'hospital' ? 'Hospital management dashboard' : 'Find hospitals & clinics',
        badge: userType === 'hospital' ? 'Admin' : null,
        getPath: () => userType === 'hospital' ? `/hospital/dashboard?id=${hospitalId}` : '/hospitals',
        requiresAuth: userType === 'hospital'
      }
    ];

    // For tablet, show only 3 items
    if (isTablet) {
      return items.slice(0, 3);
    }

    return items;
  };

  const secondaryNavItems = [
    {
      id: 'about',
      label: 'About Us',
      icon: Info,
      path: '/about',
      description: 'Our mission, vision & team',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'resources',
      label: 'Resources',
      icon: BookOpen,
      path: '/resources',
      description: 'Educational materials & guides',
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      id: 'community',
      label: 'Community',
      icon: Users,
      path: '/community',
      description: 'Connect with donors & recipients',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      id: 'events',
      label: 'Events',
      icon: Calendar,
      path: '/events',
      description: 'Upcoming donation events',
      gradient: 'from-orange-500 to-red-500'
    },
    {
      id: 'faq',
      label: 'FAQ',
      icon: HelpCircle,
      path: '/faq',
      description: 'Frequently asked questions',
      gradient: 'from-indigo-500 to-blue-500'
    },
    {
      id: 'contact',
      label: 'Contact',
      icon: Phone,
      path: '/contact',
      description: 'Get in touch with us',
      gradient: 'from-teal-500 to-green-500'
    }
  ];

  const mobileNavItems = [
    {
      id: 'home',
      label: 'Home',
      icon: Home,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      gradient: 'from-blue-500 to-cyan-500',
      getPath: () => '/',
      requiresAuth: false
    },
    {
      id: 'blood',
      label: 'Blood',
      icon: Droplets,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      gradient: 'from-red-500 to-pink-500',
      getPath: () => {
        if (userType === 'bloodDonor') return `/donor/dashboard?type=blood&id=${donorId}`;
        return '/blood-donation';
      },
      requiresAuth: false
    },
    {
      id: 'organ',
      label: 'Organ',
      icon: ActivityIcon,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      gradient: 'from-green-500 to-emerald-500',
      getPath: () => {
        if (userType === 'organDonor') return `/donor/dashboard?type=organ&id=${donorId}`;
        return '/organ-donation';
      },
      requiresAuth: false
    },
    {
      id: 'urgent',
      label: userType === 'patient' ? 'Matches' : 
             userType === 'hospital' ? 'Hospital' : 'Urgent',
      icon: AlertCircle,
      color: 'text-amber-600',
      bgColor: 'bg-amber-50',
      gradient: 'from-amber-500 to-orange-500',
      getPath: () => {
        if (userType === 'patient') return `/patient/matches?id=${patientId}`;
        if (userType === 'bloodDonor' || userType === 'organDonor') return `/donor/requests?id=${donorId}`;
        if (userType === 'hospital') return `/hospital/requests?id=${hospitalId}`;
        return '/urgent-requests';
      },
      requiresAuth: false
    },
    {
      id: 'profile',
      label: 'Profile',
      icon: User,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      gradient: 'from-purple-500 to-violet-500',
      getPath: () => {
        return '/profile';
      },
      requiresAuth: false
    }
  ];

  // Enhanced navigation handler
  const handleTabClick = (item) => {
    setActiveTab(item.id);
    
    // Check if auth is required
    if (item.requiresAuth && !isLoggedIn) {
      navigate('/auth?tab=login');
    } else {
      const path = item.getPath ? item.getPath() : item.path;
      if (path) {
        navigate(path);
      }
    }
    
    // Close menus on mobile
    if (window.innerWidth < 1024) {
      setIsMobileMenuOpen(false);
    }
    setIsMoreOpen(false);
    setIsProfileOpen(false);
  };

  const handleNavigation = (itemId) => {
    const item = getMainNavItems().find(i => i.id === itemId);
    if (!item) return;
    handleTabClick(item);
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
    setIsLoading(true);
    
    // Clear all auth related storage
    const keysToRemove = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (
        key.includes('Token') || 
        key.includes('token') ||
        key.includes('Data') || 
        key.includes('data') ||
        key.includes('Auth') ||
        key.includes('auth') ||
        key === 'currentUserType' ||
        key === 'currentUserData' ||
        (key.startsWith('current') && key.includes('Id')) ||
        key === 'bloodDonor' || key === 'organDonor' || key === 'patient' || 
        key === 'user' || key === 'hospital'
      ) {
        keysToRemove.push(key);
      }
    }
    
    keysToRemove.forEach(key => {
      localStorage.removeItem(key);
    });
    
    // Keep guest IDs for anonymous browsing
    const guestId = 'guest-' + Date.now().toString(36) + Math.random().toString(36).substr(2);
    ['guestPatientId', 'guestDonorId', 'guestHospitalId', 'guestUserId'].forEach(key => {
      if (!localStorage.getItem(key)) {
        localStorage.setItem(key, guestId);
      }
    });
    
    // Reset state
    setIsLoggedIn(false);
    setUserData(null);
    setUserType('');
    setUserTypeConfig(null);
    setIsProfileOpen(false);
    setIsMobileMenuOpen(false);
    
    // Set guest IDs
    setPatientId(localStorage.getItem('guestPatientId') || guestId);
    setDonorId(localStorage.getItem('guestDonorId') || guestId);
    setHospitalId(localStorage.getItem('guestHospitalId') || guestId);
    setUserId(localStorage.getItem('guestUserId') || guestId);
    
    // Trigger events for other components
    window.dispatchEvent(new Event('authChange'));
    window.dispatchEvent(new CustomEvent('logout'));
    
    // Navigate home
    navigate('/');
    
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };

  const handleEmergency = () => {
    setShowEmergencyModal(true);
  };

  const handleLocationSelect = (city) => {
    setCurrentLocation(city);
    setIsLocationOpen(false);
  };

  const getUserInitials = () => {
    if (!userData) return 'U';
    
    if (userType === 'hospital') {
      return userData.hospitalName?.charAt(0).toUpperCase() || 'H';
    }
    if (userData.name) {
      return userData.name.charAt(0).toUpperCase();
    }
    if (userData.firstName) {
      return userData.firstName.charAt(0).toUpperCase();
    }
    if (userData.email) {
      return userData.email.charAt(0).toUpperCase();
    }
    return userType?.charAt(0).toUpperCase() || 'U';
  };

  const getUserDisplayName = () => {
    if (!userData) return 'User';
    
    if (userType === 'hospital') {
      return userData.hospitalName || 'Hospital';
    }
    if (userData.name) {
      return userData.name;
    }
    if (userData.firstName) {
      return `${userData.firstName} ${userData.lastName || ''}`.trim();
    }
    if (userData.email) {
      return userData.email.split('@')[0];
    }
    return userTypeConfig?.label || 'User';
  };

  const getUserEmail = () => {
    return userData?.email || userData?.contactEmail || 'No email provided';
  };

  const getUserTypeLabel = () => {
    return userTypeConfig?.label || 'Guest User';
  };

  const getTabStyle = (itemId, isActive) => {
    if (isActive) {
      if (itemId === 'blood') return 'bg-gradient-to-r from-red-600 to-pink-600 text-white shadow-lg shadow-red-500/30';
      if (itemId === 'organ') return 'bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg shadow-green-500/30';
      if (itemId === 'urgent') return 'bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-lg shadow-amber-500/30';
      if (itemId === 'hospitals' && userType === 'hospital') return 'bg-gradient-to-r from-purple-600 to-violet-600 text-white shadow-lg shadow-purple-500/30';
      return 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg shadow-blue-500/30';
    }

    if (itemId === 'blood') return 'text-gray-700 hover:text-red-600 hover:bg-red-50 border border-transparent hover:border-red-200';
    if (itemId === 'organ') return 'text-gray-700 hover:text-green-600 hover:bg-green-50 border border-transparent hover:border-green-200';
    if (itemId === 'urgent') return 'text-gray-700 hover:text-amber-600 hover:bg-amber-50 border border-transparent hover:border-amber-200';
    if (itemId === 'hospitals' && userType === 'hospital') return 'text-gray-700 hover:text-purple-600 hover:bg-purple-50 border border-transparent hover:border-purple-200';
    return 'text-gray-700 hover:text-blue-600 hover:bg-blue-50 border border-transparent hover:border-blue-200';
  };

  const handleHospitalLogin = () => {
    window.dispatchEvent(new CustomEvent('openHospitalAuthModal'));
    setIsMobileMenuOpen(false);
    setIsProfileOpen(false);
  };

  // Location options
  const locations = [
    { city: 'Mumbai', state: 'Maharashtra', flag: '🇮🇳' },
    { city: 'Delhi', state: 'Delhi', flag: '🇮🇳' },
    { city: 'Bangalore', state: 'Karnataka', flag: '🇮🇳' },
    { city: 'Chennai', state: 'Tamil Nadu', flag: '🇮🇳' },
    { city: 'Hyderabad', state: 'Telangana', flag: '🇮🇳' },
    { city: 'Kolkata', state: 'West Bengal', flag: '🇮🇳' },
    { city: 'Pune', state: 'Maharashtra', flag: '🇮🇳' },
    { city: 'Ahmedabad', state: 'Gujarat', flag: '🇮🇳' }
  ];

  return (
    <>
      {/* DESKTOP NAVBAR (1024px and above) */}
      {isDesktop && (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-xl shadow-2xl shadow-black/5 py-2 border-b border-gray-200/30' 
            : 'bg-white py-3 border-b border-gray-100'
        }`}>
          <div className={`mx-auto px-6 ${isLargeDesktop ? 'max-w-7xl' : 'max-w-6xl'}`}>
            <div className="flex items-center justify-between">
              
              {/* Logo */}
              <div className="flex items-center gap-4">
                <button
                  onClick={() => navigate('/')}
                  className="flex items-center gap-3 group"
                >
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity"></div>
                    <div className="relative bg-white w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/10 border border-gray-100 group-hover:scale-105 transition-transform duration-300">
                      <img
                        src={jeevandaans}
                        alt="JeevanDaan Logo"
                        className="w-7 h-7 object-contain"
                      />
                    </div>
                  </div>
                  <div className="text-left">
                    <h1 className={`font-bold ${isLargeDesktop ? 'text-2xl' : 'text-xl'} tracking-tight`}>
                      <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                        JeevanDaan
                      </span>
                    </h1>
                    <p className="text-xs text-gray-500 font-medium tracking-wide hidden lg:block">
                      Life Saving Platform
                    </p>
                  </div>
                </button>
              </div>

              {/* Main Navigation */}
              <div className="flex items-center gap-1">
                {getMainNavItems().map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNavigation(item.id)}
                      className={`px-4 py-2.5 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2.5 relative group ${getTabStyle(item.id, isActive)} ${
                        isLargeDesktop ? 'text-sm' : 'text-xs'
                      }`}
                      title={item.description}
                    >
                      <Icon className={`${isLargeDesktop ? 'h-5 w-5' : 'h-4 w-4'}`} />
                      <span>{item.label}</span>
                      {item.badge && (
                        <span className={`absolute -top-2 -right-2 px-2 py-0.5 text-xs font-bold rounded-full ${isActive ? 'bg-white text-black' : 'bg-red-500 text-white'} shadow-md`}>
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
                
                {/* More Dropdown */}
                {isLargeDesktop && (
                  <div className="relative" ref={moreRef}>
                    <button
                      onClick={() => setIsMoreOpen(!isMoreOpen)}
                      className={`px-4 py-2.5 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2.5 ${
                        isMoreOpen 
                          ? 'bg-gradient-to-r from-gray-800 to-gray-900 text-white shadow-lg' 
                          : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50 border border-transparent hover:border-gray-200'
                      }`}
                    >
                      <MoreVertical className="h-5 w-5" />
                      <span className="text-sm">More</span>
                      <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${isMoreOpen ? 'rotate-180' : ''}`} />
                    </button>
                    
                    {isMoreOpen && (
                      <div className="absolute top-full left-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl shadow-black/10 border border-gray-200/50 p-3 z-50 animate-fadeIn">
                        <div className="grid grid-cols-2 gap-2">
                          {secondaryNavItems.map((item) => (
                            <button
                              key={item.id}
                              onClick={() => handleTabClick(item)}
                              className="group flex flex-col items-center p-4 rounded-xl hover:bg-gray-50 transition-all duration-300 border border-transparent hover:border-gray-200"
                            >
                              <div className={`p-3 rounded-xl bg-gradient-to-r ${item.gradient} mb-3 group-hover:scale-110 transition-transform`}>
                                <item.icon className="h-6 w-6 text-white" />
                              </div>
                              <div className="text-center">
                                <div className="font-semibold text-gray-900 text-sm mb-1">{item.label}</div>
                                <div className="text-xs text-gray-500">{item.description}</div>
                              </div>
                            </button>
                          ))}
                        </div>
                        
                        {!isLoggedIn && (
                          <div className="mt-3 pt-3 border-t border-gray-100">
                            <button
                              onClick={handleHospitalLogin}
                              className="w-full flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-purple-50 to-violet-50 hover:from-purple-100 hover:to-violet-100 transition-all border border-purple-200 group"
                            >
                              <div className="flex items-center gap-3">
                                <div className="p-2.5 rounded-lg bg-gradient-to-r from-purple-500 to-violet-500">
                                  <Building2 className="h-5 w-5 text-white" />
                                </div>
                                <div className="text-left">
                                  <div className="font-semibold text-gray-900">Hospital Login</div>
                                  <div className="text-xs text-gray-600">For hospitals & clinics</div>
                                </div>
                              </div>
                              <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-purple-600 group-hover:translate-x-1 transition-all" />
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Right Actions */}
              <div className="flex items-center gap-3">
                {/* Location - Hide on smaller desktop */}
                {isLargeDesktop && (
                  <div className="relative" ref={locationRef}>
                    <button
                      onClick={() => setIsLocationOpen(!isLocationOpen)}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-xl border border-gray-200 bg-white hover:border-blue-300 hover:shadow-md transition-all duration-300 group"
                    >
                      <MapPin className="h-4 w-4 text-blue-500" />
                      <div className="text-left">
                        <div className="text-xs font-semibold text-gray-900">{currentLocation.split(',')[0]}</div>
                        <div className="text-xs text-gray-500 hidden xl:block">📍 Location</div>
                      </div>
                      <ChevronDown className={`h-3 w-3 text-gray-400 transition-transform duration-300 ${isLocationOpen ? 'rotate-180' : ''}`} />
                    </button>
                    
                    {isLocationOpen && (
                      <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl shadow-black/10 border border-gray-200/50 p-3 z-50 animate-fadeIn">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-bold text-gray-900 text-sm">Select Location</h4>
                          <span className="text-xs text-gray-500">🇮🇳 India</span>
                        </div>
                        <div className="space-y-1 max-h-56 overflow-y-auto">
                          {locations.map((loc) => (
                            <button
                              key={loc.city}
                              onClick={() => handleLocationSelect(`${loc.city}, ${loc.state}`)}
                              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-all duration-300 text-sm ${
                                currentLocation.startsWith(loc.city) 
                                  ? 'bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200' 
                                  : 'hover:bg-gray-50 border border-transparent hover:border-gray-200'
                              }`}
                            >
                              <div className="flex items-center gap-2">
                                <div className="text-lg">{loc.flag}</div>
                                <div className="text-left">
                                  <div className="font-medium text-gray-900">{loc.city}</div>
                                  <div className="text-xs text-gray-500">{loc.state}</div>
                                </div>
                              </div>
                              {currentLocation.startsWith(loc.city) && (
                                <CheckCircle className="h-4 w-4 text-blue-500" />
                              )}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Search */}
                <button
                  onClick={() => setIsSearchOpen(true)}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl bg-gray-50 hover:bg-gray-100 transition-all duration-300 border border-gray-200 hover:border-gray-300 group"
                >
                  <Search className="h-4 w-4 text-gray-600 group-hover:text-blue-600 transition-colors" />
                  <span className="text-xs font-medium text-gray-700 hidden xl:block">Search</span>
                </button>

                {/* Emergency Button */}
                <button
                  onClick={handleEmergency}
                  className="px-3 py-2 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-xl font-bold hover:shadow-lg hover:shadow-red-500/30 transition-all duration-300 flex items-center gap-1 text-xs"
                >
                  <Ambulance className="h-4 w-4" />
                  <span>Emergency</span>
                </button>

                {/* Notifications */}
                <div className="relative">
                  <button
                    onClick={() => setShowNotifications(true)}
                    className="relative p-2 hover:bg-gray-100 rounded-xl transition-all duration-300 group"
                  >
                    <Bell className="h-5 w-5 text-gray-600 group-hover:text-blue-600 transition-colors" />
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-red-600 to-pink-600 text-white text-xs font-bold rounded-full flex items-center justify-center animate-pulse shadow-lg">
                      {notificationCount}
                    </span>
                  </button>
                </div>

                {/* Profile/Auth */}
                {isLoggedIn && userData ? (
                  <div className="relative" ref={profileRef}>
                    <button
                      onClick={() => setIsProfileOpen(!isProfileOpen)}
                      className="flex items-center gap-2 p-1 hover:bg-gray-100 rounded-xl transition-all duration-300 group"
                    >
                      <div className={`w-9 h-9 rounded-full ${userTypeConfig?.gradient || 'bg-gradient-to-r from-blue-500 to-cyan-500'} flex items-center justify-center text-white font-bold text-sm shadow-lg group-hover:scale-105 transition-transform`}>
                        {getUserInitials()}
                      </div>
                      <div className="text-left hidden xl:block">
                        <div className="font-bold text-gray-900 text-sm">{getUserDisplayName()}</div>
                        <div className="text-xs text-gray-600">{getUserTypeLabel()}</div>
                      </div>
                      <ChevronDown className={`h-3 w-3 text-gray-400 transition-transform duration-300 ${isProfileOpen ? 'rotate-180' : ''}`} />
                    </button>
                    
                    {isProfileOpen && (
                      <div className="absolute top-full right-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl shadow-black/10 border border-gray-200/50 p-4 z-50 animate-fadeIn">
                        {/* Profile Header */}
                        <div className="flex items-center gap-3 pb-3 border-b border-gray-200">
                          <div className={`w-12 h-12 rounded-xl ${userTypeConfig?.gradient || 'bg-gradient-to-r from-blue-500 to-cyan-500'} flex items-center justify-center text-white font-bold text-lg shadow-lg`}>
                            {getUserInitials()}
                          </div>
                          <div className="flex-1">
                            <h3 className="font-bold text-gray-900 text-sm">{getUserDisplayName()}</h3>
                            <div className="flex items-center gap-1 mt-1">
                              <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${userTypeConfig?.bgColor || 'bg-blue-50'} ${userTypeConfig?.textColor || 'text-blue-600'} border ${userTypeConfig?.borderColor || 'border-blue-200'}`}>
                                {getUserTypeLabel()}
                              </span>
                              <span className="text-xs text-gray-500">{getUserEmail()}</span>
                            </div>
                            {userType === 'hospital' && userData?.registrationNumber && (
                              <p className="text-xs text-gray-500 mt-1">
                                <span className="font-medium">Reg:</span> {userData.registrationNumber}
                              </p>
                            )}
                          </div>
                        </div>
                        
                        {/* Quick Actions */}
                        <div className="grid grid-cols-3 gap-2 py-3">
                          <button
                            onClick={() => {
                              navigate('/profile');
                              setIsProfileOpen(false);
                            }}
                            className="flex flex-col items-center p-2 rounded-lg hover:bg-gray-50 transition-colors"
                          >
                            <User className="h-4 w-4 text-blue-500" />
                            <span className="text-xs mt-1">Profile</span>
                          </button>
                          <button
                            onClick={() => {
                              navigate('/settings');
                              setIsProfileOpen(false);
                            }}
                            className="flex flex-col items-center p-2 rounded-lg hover:bg-gray-50 transition-colors"
                          >
                            <Settings className="h-4 w-4 text-gray-500" />
                            <span className="text-xs mt-1">Settings</span>
                          </button>
                          <button
                            onClick={handleLogout}
                            className="flex flex-col items-center p-2 rounded-lg hover:bg-red-50 transition-colors"
                          >
                            <LogOut className="h-4 w-4 text-red-500" />
                            <span className="text-xs mt-1">Logout</span>
                          </button>
                        </div>
                        
                        {/* User Type Specific Links */}
                        {userType && (
                          <div className="border-t border-gray-100 pt-3">
                            <button
                              onClick={() => {
                                if (userType === 'bloodDonor' || userType === 'organDonor') {
                                  navigate(`/donor/dashboard?id=${donorId}`);
                                } else if (userType === 'patient') {
                                  navigate(`/patient/dashboard?id=${patientId}`);
                                } else if (userType === 'hospital') {
                                  navigate(`/hospital/dashboard?id=${hospitalId}`);
                                } else if (userType === 'user') {
                                  navigate(`/user/dashboard?id=${userId}`);
                                }
                                setIsProfileOpen(false);
                              }}
                              className="w-full flex items-center gap-2 p-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                            >
                              {userTypeConfig?.icon && <userTypeConfig.icon className="h-4 w-4" />}
                              <span>{userTypeConfig?.label} Dashboard</span>
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => navigate('/auth?tab=login')}
                      className="px-3 py-1.5 text-blue-600 hover:text-blue-700 font-semibold rounded-xl hover:bg-blue-50 transition-all duration-300 border border-blue-200 hover:border-blue-300 text-xs"
                    >
                      Login
                    </button>
                    <button
                      onClick={() => navigate('/auth?tab=register')}
                      className="px-3 py-1.5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-xl font-bold hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 text-xs"
                    >
                      Register
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </nav>
      )}

      {/* TABLET NAVBAR (768px - 1023px) */}
      {isTablet && (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-lg shadow-lg py-2 border-b border-gray-200' 
            : 'bg-white py-3 border-b border-gray-100'
        }`}>
          <div className="max-w-4xl mx-auto px-4">
            <div className="flex items-center justify-between">
              
              {/* Logo */}
              <button
                onClick={() => navigate('/')}
                className="flex items-center gap-2 group"
              >
                <div className="bg-white w-8 h-8 rounded-lg flex items-center justify-center shadow border border-gray-100 group-hover:scale-105 transition-transform duration-300">
                  <img
                    src={jeevandaans}
                    alt="JeevanDaan Logo"
                    className="w-5 h-5 object-contain"
                  />
                </div>
                <div>
                  <h1 className="font-bold text-base bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                    JeevanDaan
                  </h1>
                  <p className="text-[10px] text-gray-500 hidden md:block">Life Saving Platform</p>
                </div>
              </button>

              {/* Navigation */}
              <div className="flex items-center gap-1">
                {getMainNavItems().map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNavigation(item.id)}
                      className={`p-2.5 rounded-lg transition-all duration-300 relative ${isActive ? 'text-white shadow-md' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'}`}
                      style={isActive ? {
                        background: `linear-gradient(135deg, ${item.id === 'blood' ? '#dc2626, #db2777' : item.id === 'organ' ? '#16a34a, #059669' : '#f59e0b, #ea580c'})`
                      } : {}}
                      title={item.description}
                    >
                      <Icon className="h-4 w-4" />
                      {item.badge && (
                        <span className={`absolute -top-1 -right-1 w-4 h-4 text-[10px] font-bold rounded-full flex items-center justify-center ${isActive ? 'bg-white text-black' : 'bg-red-500 text-white'} shadow`}>
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Right Actions */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handleEmergency}
                  className="px-2 py-1 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-lg font-bold text-xs flex items-center gap-1 hover:shadow-md transition-all"
                >
                  <Ambulance className="h-3 w-3" />
                  <span>Emergency</span>
                </button>
                
                <button
                  onClick={() => setShowNotifications(true)}
                  className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <Bell className="h-4 w-4 text-gray-600" />
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse">
                    {notificationCount}
                  </span>
                </button>
                
                {isLoggedIn && userData ? (
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="p-1 hover:bg-gray-100 rounded-lg transition-all"
                  >
                    <div className={`w-8 h-8 rounded-full ${userTypeConfig?.gradient || 'bg-gradient-to-r from-blue-500 to-cyan-500'} flex items-center justify-center text-white font-bold text-xs shadow`}>
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
      )}

      {/* MOBILE NAVBAR (Below 768px) */}
      {isMobile && (
        <>
          {/* Top Navbar */}
          <div className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
            isScrolled 
              ? 'bg-white/95 backdrop-blur-lg shadow-lg py-2 border-b border-gray-200' 
              : 'bg-white py-3 border-b border-gray-100'
          }`}>
            <div className="px-4">
              <div className="flex items-center justify-between">
                
                {/* Logo and Location */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => navigate('/')}
                    className="flex items-center gap-1.5"
                  >
                    <div className="bg-white w-7 h-7 rounded-lg flex items-center justify-center shadow border border-gray-100">
                      <img
                        src={jeevandaans}
                        alt="JeevanDaan Logo"
                        className="w-4 h-4 object-contain"
                      />
                    </div>
                    <h1 className="font-bold text-sm bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                      JeevanDaan
                    </h1>
                  </button>
                  
                  <button
                    onClick={() => setIsLocationOpen(!isLocationOpen)}
                    className="flex items-center gap-1 text-xs text-gray-700 px-1.5 py-1 rounded-md hover:bg-gray-100 transition-colors"
                  >
                    <MapPin className="h-3 w-3 text-blue-500" />
                    <span className="font-medium">{currentLocation.split(',')[0]}</span>
                  </button>
                </div>

                {/* Right Actions */}
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setIsSearchOpen(true)}
                    className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <Search className="h-4 w-4 text-gray-600" />
                  </button>
                  
                  <button
                    onClick={() => setShowNotifications(true)}
                    className="relative p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <Bell className="h-4 w-4 text-gray-600" />
                    <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse">
                      {notificationCount}
                    </span>
                  </button>
                  
                  {isLoggedIn && userData ? (
                    <button
                      onClick={() => setIsProfileOpen(!isProfileOpen)}
                      className="p-0.5 hover:bg-gray-100 rounded-lg"
                    >
                      <div className={`w-7 h-7 rounded-full ${userTypeConfig?.gradient || 'bg-gradient-to-r from-blue-500 to-cyan-500'} flex items-center justify-center text-white font-bold text-xs shadow`}>
                        {getUserInitials()}
                      </div>
                    </button>
                  ) : (
                    <button
                      onClick={() => setIsMobileMenuOpen(true)}
                      className="mobile-menu-trigger p-1.5 hover:bg-gray-100 rounded-lg"
                    >
                      <Menu className="h-4 w-4 text-gray-600" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Bottom Nav */}
          <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 py-1.5 shadow-2xl">
            <div className="flex justify-around items-center">
              {mobileNavItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                
                return (
                  <button
                    key={item.id}
                    onClick={() => handleTabClick(item)}
                    className={`flex flex-col items-center justify-center p-1.5 relative transition-all duration-300 flex-1 ${
                      isActive ? 'transform -translate-y-1' : ''
                    }`}
                    title={item.label}
                  >
                    <div className={`p-2 rounded-lg transition-all duration-300 relative ${
                      isActive 
                        ? `bg-gradient-to-r ${item.gradient} text-white shadow-md` 
                        : 'bg-gray-100 text-gray-400'
                    }`}>
                      <Icon className={`h-4 w-4 ${isActive ? 'text-white' : item.color}`} />
                    </div>
                    <span className={`text-[10px] mt-1 font-semibold transition-colors ${
                      isActive ? 'text-gray-900' : 'text-gray-500'
                    }`}>
                      {item.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </nav>
        </>
      )}

      {/* MOBILE MENU MODAL */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[100]">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-fadeIn"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          
          {/* Menu Panel */}
          <div 
            ref={mobileMenuRef}
            className="absolute right-0 top-0 bottom-0 w-[85vw] max-w-xs bg-white shadow-xl animate-slideIn"
          >
            {/* Header */}
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="bg-white w-10 h-10 rounded-xl flex items-center justify-center shadow border border-gray-100">
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
                  </div>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="h-5 w-5 text-gray-600" />
                </button>
              </div>
              
              {/* User Info or Auth Buttons */}
              {isLoggedIn && userData ? (
                <div className={`p-3 rounded-xl ${userTypeConfig?.lightGradient || 'bg-gradient-to-r from-blue-50 to-cyan-50'} border ${userTypeConfig?.borderColor || 'border-blue-200'}`}>
                  <div className="flex items-center gap-2">
                    <div className={`w-10 h-10 rounded-xl ${userTypeConfig?.gradient || 'bg-gradient-to-r from-blue-500 to-cyan-500'} flex items-center justify-center text-white font-bold text-sm shadow`}>
                      {getUserInitials()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-gray-900 text-sm truncate">{getUserDisplayName()}</h3>
                      <p className="text-xs text-gray-600">{getUserTypeLabel()}</p>
                      <p className="text-xs text-gray-500 truncate">{getUserEmail()}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => {
                      navigate('/auth?tab=login');
                      setIsMobileMenuOpen(false);
                    }}
                    className="px-3 py-2 text-blue-600 font-semibold rounded-lg border border-blue-200 hover:bg-blue-50 transition-all text-sm"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => {
                      navigate('/auth?tab=register');
                      setIsMobileMenuOpen(false);
                    }}
                    className="px-3 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg font-bold hover:shadow-lg transition-all text-sm"
                  >
                    Register
                  </button>
                </div>
              )}
            </div>
            
            {/* Menu Items */}
            <div className="overflow-y-auto h-[calc(100vh-180px)] p-3">
              {/* Main Navigation */}
              <div className="mb-4">
                <h3 className="font-bold text-gray-900 mb-3 text-sm">Main Navigation</h3>
                <div className="space-y-1">
                  {getMainNavItems().map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        handleTabClick(item);
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-all border border-gray-100 text-sm"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${item.bgColor}`}>
                          <item.icon className={`h-4 w-4 ${item.textColor}`} />
                        </div>
                        <div className="text-left">
                          <div className="font-semibold text-gray-900">{item.label}</div>
                          <div className="text-xs text-gray-500">{item.description}</div>
                        </div>
                      </div>
                      <ChevronRight className="h-4 w-4 text-gray-400" />
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Emergency Section */}
              <div className="mb-4">
                <div className="bg-gradient-to-r from-red-50 to-red-100 rounded-xl p-3 border border-red-200">
                  <h3 className="font-bold text-gray-900 mb-1 text-sm">Emergency</h3>
                  <p className="text-xs text-gray-600 mb-2">Available 24/7</p>
                  <button
                    onClick={handleEmergency}
                    className="w-full px-3 py-2 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-lg font-bold flex items-center justify-center gap-1 shadow-md text-xs"
                  >
                    <Ambulance className="h-3 w-3" />
                    <span>Emergency</span>
                  </button>
                </div>
              </div>
              
              {/* Contact Info */}
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-3 border border-gray-200">
                <h3 className="font-bold text-gray-900 mb-2 text-sm">Support</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 p-2 bg-white rounded-lg">
                    <Phone className="h-3 w-3 text-blue-500" />
                    <div>
                      <div className="text-xs text-gray-600">Helpline</div>
                      <div className="font-bold text-blue-600 text-xs">108 / 102</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-white rounded-lg">
                    <Mail className="h-3 w-3 text-blue-500" />
                    <div>
                      <div className="text-xs text-gray-600">Email</div>
                      <div className="font-medium text-blue-600 text-xs">help@jeevandaan.org</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Footer */}
            <div className="absolute bottom-0 left-0 right-0 p-3 border-t border-gray-200 bg-white">
              {isLoggedIn && (
                <button
                  onClick={handleLogout}
                  className="w-full px-3 py-2 bg-gray-100 text-gray-800 rounded-lg font-semibold hover:bg-red-50 hover:text-red-600 transition-all flex items-center justify-center gap-1 mb-2 border border-gray-300 text-sm"
                >
                  <LogOut className="h-3 w-3" />
                  <span>Logout</span>
                </button>
              )}
              <p className="text-xs text-gray-500 text-center">© 2024 JeevanDaan</p>
            </div>
          </div>
        </div>
      )}

      {/* SEARCH MODAL (All Devices) */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-[100] animate-fadeIn">
          <div 
            className="absolute inset-0 bg-black/30 backdrop-blur-sm"
            onClick={() => setIsSearchOpen(false)}
          />
          <div className={`absolute top-4 left-1/2 transform -translate-x-1/2 w-full ${isMobile ? 'px-3 max-w-md' : 'px-4 max-w-2xl'}`}>
            <div ref={searchRef} className="bg-white rounded-xl shadow-xl p-4 animate-fadeIn">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for blood donors, hospitals, information..."
                  className="w-full pl-10 pr-10 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent text-sm"
                  autoFocus
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch(e)}
                />
                <button
                  onClick={() => setIsSearchOpen(false)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 p-0.5 text-gray-400 hover:text-gray-600"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              
              {/* Quick Links */}
              <div className="mt-3">
                <h4 className="font-semibold text-gray-800 mb-2 text-xs">Quick Search</h4>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { label: 'Blood Donation', icon: Droplets, color: 'red', path: '/blood-donation' },
                    { label: 'Organ Donation', icon: ActivityIcon, color: 'green', path: '/organ-donation' },
                    { label: 'Find Hospitals', icon: HospitalIcon, color: 'blue', path: '/hospitals' },
                    { label: 'Eligibility', icon: Shield, color: 'indigo', path: '/eligibility' }
                  ].map((link, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        navigate(link.path);
                        setIsSearchOpen(false);
                      }}
                      className={`px-2 py-2 rounded-lg bg-${link.color}-50 border border-${link.color}-200 flex items-center gap-2 hover:opacity-90 transition-all text-xs`}
                    >
                      <link.icon className={`h-3 w-3 text-${link.color}-600`} />
                      <span className={`font-medium text-${link.color}-600 truncate`}>{link.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* EMERGENCY MODAL */}
      {showEmergencyModal && (
        <div className="fixed inset-0 z-[110] animate-fadeIn">
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowEmergencyModal(false)}
          />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-md">
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
              <div className="bg-gradient-to-r from-red-600 to-red-500 p-4">
                <div className="flex items-center gap-3">
                  <Ambulance className="h-6 w-6 text-white" />
                  <h2 className="text-xl font-bold text-white">Emergency Assistance</h2>
                </div>
              </div>
              
              <div className="p-6">
                <p className="text-gray-600 mb-4">Please call these numbers immediately for emergency assistance:</p>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-red-50 rounded-xl border border-red-200">
                    <div className="flex items-center gap-3">
                      <Phone className="h-5 w-5 text-red-600" />
                      <div>
                        <div className="font-bold text-red-700">108</div>
                        <div className="text-sm text-gray-600">National Emergency</div>
                      </div>
                    </div>
                    <button className="px-3 py-1 bg-red-600 text-white rounded-lg text-sm font-semibold hover:bg-red-700 transition-colors">
                      Call Now
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-xl border border-blue-200">
                    <div className="flex items-center gap-3">
                      <HospitalIcon className="h-5 w-5 text-blue-600" />
                      <div>
                        <div className="font-bold text-blue-700">102</div>
                        <div className="text-sm text-gray-600">Ambulance Service</div>
                      </div>
                    </div>
                    <button className="px-3 py-1 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors">
                      Call Now
                    </button>
                  </div>
                  
                  <div className="p-3 bg-gray-50 rounded-xl border border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-2">Nearest Hospitals:</h4>
                    <div className="space-y-2">
                      {['Apollo Hospital', 'Fortis Hospital', 'Max Healthcare'].map((hospital, idx) => (
                        <div key={idx} className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <MapPin className="h-3 w-3 text-gray-500" />
                            <span className="text-sm">{hospital}</span>
                          </div>
                          <button className="text-xs text-blue-600 hover:text-blue-800 font-medium">
                            View on Map
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <button
                    onClick={() => setShowEmergencyModal(false)}
                    className="w-full py-2 bg-gray-100 text-gray-800 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
                  >
                    Close
                  </button>
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

      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-white/50 backdrop-blur-sm animate-fadeIn">
          <div className="relative">
            <div className="w-12 h-12 border-3 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-blue-100 border-t-blue-400 rounded-full animate-spin animation-delay-500"></div>
            </div>
          </div>
        </div>
      )}

      {/* Responsive Spacer for fixed navbar */}
      <div className={`
        ${isMobile ? 'pt-16 pb-16' : ''}
        ${isTablet ? 'pt-14' : ''}
        ${isDesktop ? 'pt-20' : ''}
      `}></div>

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slideIn {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        
        .animate-slideIn {
          animation: slideIn 0.3s ease-out;
        }
        
        .animate-spin {
          animation: spin 1s linear infinite;
        }
        
        .animation-delay-500 {
          animation-delay: 500ms;
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.05); }
        }
        
        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        /* Smooth transitions */
        * {
          transition-property: background-color, border-color, color, fill, stroke, opacity, box-shadow, transform;
          transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
          transition-duration: 150ms;
        }

        /* Hide scrollbar for dropdowns */
        .overflow-y-auto::-webkit-scrollbar {
          width: 4px;
        }
        
        .overflow-y-auto::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 4px;
        }
        
        .overflow-y-auto::-webkit-scrollbar-thumb {
          background: #888;
          border-radius: 4px;
        }
        
        .overflow-y-auto::-webkit-scrollbar-thumb:hover {
          background: #555;
        }

        /* Better touch targets on mobile */
        @media (max-width: 768px) {
          button {
            min-height: 44px;
            min-width: 44px;
          }
        }
      `}</style>
    </>
  );
};

export default Navbar;