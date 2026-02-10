import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  User, Mail, Phone, MapPin, Edit2, Save, X,
  CheckCircle, AlertCircle, Loader2, Home, LogOut,
  Shield, Download, Bell, Settings, Heart,
  Droplets, Activity, Award, History, Star, Gift, Clock,
  Activity as ActivityIcon, FileText,
  Ambulance, Hospital, Users as UsersIcon, AlertTriangle,
  Users, Globe, TrendingUp, BookOpen,
  Calendar, ChevronRight, Eye, EyeOff, Key,
  Upload, ShieldCheck, Award as AwardIcon, Trophy,
  TrendingUp as TrendingUpIcon, Target, Zap,
  BarChart3, Percent, Medal, CheckSquare,
  PhoneCall, MessageSquare, LifeBuoy, HelpCircle,
  Building2, Bed, ClipboardCheck, Stethoscope,
  BriefcaseMedical, Syringe, HeartPulse,
  Shield as ShieldIcon, Users as CommunityUsers,
  MessageCircle, Target as TargetIcon, Activity as ActivityIcon2,
  Shield as ShieldIcon2, Hospital as HospitalIcon,
  Bell as BellIcon, Lock, Book, Globe as GlobeIcon,
  Truck, Package, Heart as HeartIcon,
  ActivitySquare, TrendingDown, Cpu, Server,
  RadioTower, Satellite, Navigation, Compass,
  Layers, Grid, List, Filter, BarChart2,
  PieChart, LineChart, ArrowUpRight, ArrowDownRight,
  Award as AwardIcon2, Target as TargetIcon2, Zap as ZapIcon,
  RefreshCw, RotateCw, Repeat, Shuffle,
  Volume2, VolumeX, Mic, Video, Camera,
  Music, Headphones, Tv, Monitor, Smartphone,
  Tablet, Watch, Printer, HardDrive, Database,
  MemoryStick, Keyboard, Mouse, MonitorSpeaker,
  Speaker, Volume1, Battery, BatteryCharging,
  BatteryFull, Cloud, Wifi, Signal, Radio,
  ChevronLeft, ExternalLink, ChevronUp, ChevronDown,
  MoreVertical, Menu, Search, MapPin as MapPinIcon2,
  Info, Target as TargetIcon3, BookOpen as BookOpenIcon,
  Users as UsersIcon2, Phone as PhoneIcon, Mail as MailIcon,
  Clock as ClockIcon, Calendar as CalendarIcon,
  Settings as SettingsIcon, Star as StarIcon,
  Crown, Shield as ShieldIcon3, Target as TargetIcon4,
  Zap as ZapIcon2, Users as UsersIcon3, Package as PackageIcon,
  Truck as TruckIcon, ActivitySquare as ActivitySquareIcon,
  FileText as FileTextIcon, Download as DownloadIcon,
  Upload as UploadIcon, Link as LinkIcon, Share2,
  MessageSquare as MessageSquareIcon, Coffee,
  CheckSquare as CheckSquareIcon, XCircle, AlertTriangle as AlertTriangleIcon,
  ThumbsUp, MessageSquare as MessageSquareIcon2,
  Battery as BatteryIcon, BatteryCharging as BatteryChargingIcon,
  BatteryFull as BatteryFullIcon, Cloud as CloudIcon,
  Wifi as WifiIcon, WifiOff, Signal as SignalIcon,
  SignalZero, SignalLow, SignalMedium, SignalHigh,
  Radio as RadioIcon, Satellite as SatelliteIcon,
  Navigation as NavigationIcon, Compass as CompassIcon,
  Map, Globe as GlobeIcon2, Layers as LayersIcon,
  Grid as GridIcon, List as ListIcon, Filter as FilterIcon,
  SortAsc, SortDesc, MoreHorizontal
} from 'lucide-react';

const ProfilePage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [activeTab, setActiveTab] = useState('overview');
  const [showPassword, setShowPassword] = useState(false);
  
  const [userType, setUserType] = useState(null);
  const [userData, setUserData] = useState(null);
  const [formData, setFormData] = useState({});
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Device detection
  const isMobile = windowWidth < 768;
  const isTablet = windowWidth >= 768 && windowWidth < 1024;
  const isDesktop = windowWidth >= 1024;

  // Track window width
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // User type configurations
  const userTypesConfig = {
    bloodDonor: {
      key: 'bloodDonor',
      label: 'Blood Donor',
      icon: Droplets,
      gradient: 'from-rose-500 to-pink-500',
      lightGradient: 'from-rose-100 to-pink-100',
      textColor: 'text-rose-600',
      bgColor: 'bg-rose-50',
      borderColor: 'border-rose-200',
      badgeColor: 'bg-rose-500',
      description: 'Blood donation champion'
    },
    organDonor: {
      key: 'organDonor',
      label: 'Organ Donor',
      icon: ActivityIcon,
      gradient: 'from-emerald-500 to-green-500',
      lightGradient: 'from-emerald-100 to-green-100',
      textColor: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-200',
      badgeColor: 'bg-emerald-500',
      description: 'Life-saving hero'
    },
    patient: {
      key: 'patient',
      label: 'Patient/Family',
      icon: Ambulance,
      gradient: 'from-amber-500 to-orange-500',
      lightGradient: 'from-amber-100 to-orange-100',
      textColor: 'text-amber-600',
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-200',
      badgeColor: 'bg-amber-500',
      description: 'Patient or family member'
    },
    user: {
      key: 'user',
      label: 'Community Member',
      icon: Users,
      gradient: 'from-blue-500 to-cyan-500',
      lightGradient: 'from-blue-100 to-cyan-100',
      textColor: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      badgeColor: 'bg-blue-500',
      description: 'Community supporter'
    },
    hospital: {
      key: 'hospital',
      label: 'Hospital',
      icon: Building2,
      gradient: 'from-purple-500 to-indigo-500',
      lightGradient: 'from-purple-100 to-indigo-100',
      textColor: 'text-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      badgeColor: 'bg-purple-500',
      description: 'Medical institution'
    }
  };

  // Load user data with better handling
  useEffect(() => {
    loadUserData();
    
    // Listen for auth changes from navbar
    const handleAuthChange = () => {
      console.log('🔄 Profile page received auth change event');
      loadUserData();
    };
    
    window.addEventListener('authChange', handleAuthChange);
    return () => window.removeEventListener('authChange', handleAuthChange);
  }, []);

  const loadUserData = () => {
    setLoading(true);
    console.log('🔄 Loading user data for profile page...');
    
    // First check current user storage
    const currentUserType = localStorage.getItem('currentUserType');
    const currentUserData = localStorage.getItem('currentUserData');
    
    if (currentUserType && currentUserData) {
      try {
        const parsedData = JSON.parse(currentUserData);
        const typeConfig = userTypesConfig[currentUserType];
        
        if (typeConfig) {
          console.log(`✅ Found current user: ${currentUserType}`, parsedData);
          setUserType(typeConfig);
          setUserData(parsedData);
          setFormData(parsedData);
          setLoading(false);
          return;
        }
      } catch (error) {
        console.error('Error parsing current user data:', error);
      }
    }
    
    // Check individual user types
    for (const [typeKey, config] of Object.entries(userTypesConfig)) {
      const token = localStorage.getItem(`${typeKey}Token`);
      const data = localStorage.getItem(`${typeKey}Data`);
      
      if (token && data) {
        try {
          const parsedData = JSON.parse(data);
          console.log(`✅ Found ${typeKey} user`);
          
          // Update current storage
          localStorage.setItem('currentUserType', typeKey);
          localStorage.setItem('currentUserData', data);
          
          setUserType(config);
          setUserData(parsedData);
          setFormData(parsedData);
          setLoading(false);
          return;
        } catch (error) {
          console.error(`Error parsing ${typeKey} data:`, error);
        }
      }
    }
    
    // No user found - redirect to role selection
    console.log('🚫 No user found');
    setLoading(false);
    navigate('/select-role');
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      const currentArray = formData[name] || [];
      const updatedArray = currentArray.includes(value)
        ? currentArray.filter(item => item !== value)
        : [...currentArray, value];
      setFormData(prev => ({ ...prev, [name]: updatedArray }));
    } else if (type === 'file') {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setFormData(prev => ({ 
            ...prev, 
            profilePicture: reader.result 
          }));
        };
        reader.readAsDataURL(file);
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    
    setMessage({ type: '', text: '' });
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage({ type: '', text: '' });

    try {
      const errors = validateForm();
      if (errors.length > 0) {
        setMessage({ type: 'error', text: errors[0] });
        setSaving(false);
        return;
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      const updatedData = { 
        ...formData, 
        updatedAt: new Date().toISOString(),
        lastUpdated: new Date().toLocaleString()
      };
      
      // Save to localStorage
      localStorage.setItem(`${userType.key}Data`, JSON.stringify(updatedData));
      localStorage.setItem('currentUserData', JSON.stringify(updatedData));
      
      // Update state
      setUserData(updatedData);
      setIsEditing(false);
      setMessage({ 
        type: 'success', 
        text: 'Profile updated successfully!' 
      });

      // Trigger auth change for navbar update
      window.dispatchEvent(new Event('authChange'));
      
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    } catch (error) {
      setMessage({ 
        type: 'error', 
        text: 'Failed to update profile. Please try again.' 
      });
    } finally {
      setSaving(false);
    }
  };

  const validateForm = () => {
    const errors = [];
    
    if (!formData.name?.trim() && userType.key !== 'hospital') {
      errors.push('Name is required');
    }
    
    if (!formData.hospitalName?.trim() && userType.key === 'hospital') {
      errors.push('Hospital name is required');
    }
    
    if (!formData.email?.trim()) errors.push('Email is required');
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      errors.push('Please enter a valid email address');
    }
    
    if (userType.key === 'bloodDonor' && !formData.bloodGroup) {
      errors.push('Blood group is required');
    }
    
    return errors;
  };

  const handleLogout = () => {
    // Clear all auth related storage
    const keysToRemove = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (
        key.includes('Token') || 
        key.includes('Data') || 
        key === 'currentUserType' ||
        key === 'currentUserData'
      ) {
        keysToRemove.push(key);
      }
    }
    
    keysToRemove.forEach(key => localStorage.removeItem(key));
    
    // Trigger auth change for navbar
    window.dispatchEvent(new Event('authChange'));
    window.dispatchEvent(new CustomEvent('logout'));
    
    navigate('/auth');
  };

  // Get user stats based on type
  const getUserStats = () => {
    if (!userData) return [];
    
    const baseStats = [
      { 
        label: 'Status', 
        value: userData.status === 'active' ? 'Active' : 'Pending', 
        icon: CheckCircle, 
        color: 'text-emerald-500', 
        bg: 'bg-emerald-50',
        border: 'border-emerald-200'
      },
      { 
        label: 'Member Since', 
        value: new Date(userData.registrationDate || Date.now()).toLocaleDateString('en-IN'), 
        icon: Calendar, 
        color: 'text-blue-500', 
        bg: 'bg-blue-50',
        border: 'border-blue-200'
      }
    ];

    switch (userType?.key) {
      case 'bloodDonor':
        return [
          { 
            label: 'Total Donations', 
            value: userData.totalDonations || 0, 
            icon: Droplets, 
            color: 'text-rose-500', 
            bg: 'bg-rose-50',
            border: 'border-rose-200'
          },
          { 
            label: 'Lives Saved', 
            value: (userData.totalDonations || 0) * 3, 
            icon: Heart, 
            color: 'text-pink-500', 
            bg: 'bg-pink-50',
            border: 'border-pink-200'
          },
          { 
            label: 'Donor Points', 
            value: userData.points || 150, 
            icon: Award, 
            color: 'text-amber-500', 
            bg: 'bg-amber-50',
            border: 'border-amber-200'
          },
          { 
            label: 'Donor Level', 
            value: userData.level || 'Bronze', 
            icon: Star, 
            color: 'text-purple-500', 
            bg: 'bg-purple-50',
            border: 'border-purple-200'
          }
        ];
      
      case 'organDonor':
        return [
          { 
            label: 'Organs Pledged', 
            value: (userData.organsToDonate || []).length, 
            icon: ActivityIcon, 
            color: 'text-emerald-500', 
            bg: 'bg-emerald-50',
            border: 'border-emerald-200'
          },
          { 
            label: 'Donor Status', 
            value: userData.status || 'Registered', 
            icon: ShieldCheck, 
            color: 'text-blue-500', 
            bg: 'bg-blue-50',
            border: 'border-blue-200'
          },
          { 
            label: 'Medical Clearance', 
            value: userData.medicalClearance ? 'Cleared' : 'Pending', 
            icon: CheckCircle, 
            color: userData.medicalClearance ? 'text-emerald-500' : 'text-amber-500', 
            bg: userData.medicalClearance ? 'bg-emerald-50' : 'bg-amber-50',
            border: userData.medicalClearance ? 'border-emerald-200' : 'border-amber-200'
          }
        ];
      
      case 'patient':
        return [
          { 
            label: 'Urgency Level', 
            value: userData.urgencyLevel || 'Normal', 
            icon: AlertTriangle, 
            color: userData.urgencyLevel === 'emergency' ? 'text-red-500' : 
                   userData.urgencyLevel === 'urgent' ? 'text-amber-500' : 'text-blue-500', 
            bg: userData.urgencyLevel === 'emergency' ? 'bg-red-50' : 
                userData.urgencyLevel === 'urgent' ? 'bg-amber-50' : 'bg-blue-50',
            border: userData.urgencyLevel === 'emergency' ? 'border-red-200' : 
                    userData.urgencyLevel === 'urgent' ? 'border-amber-200' : 'border-blue-200'
          },
          { 
            label: 'Blood Group', 
            value: userData.bloodGroup || 'Not specified', 
            icon: Droplets, 
            color: 'text-rose-500', 
            bg: 'bg-rose-50',
            border: 'border-rose-200'
          },
          { 
            label: 'Hospital', 
            value: userData.hospitalName || 'Not specified', 
            icon: Hospital, 
            color: 'text-blue-500', 
            bg: 'bg-blue-50',
            border: 'border-blue-200'
          },
          { 
            label: 'Condition', 
            value: userData.medicalCondition || 'Not specified', 
            icon: Stethoscope, 
            color: 'text-purple-500', 
            bg: 'bg-purple-50',
            border: 'border-purple-200'
          }
        ];
      
      case 'user':
        return [
          { 
            label: 'User Type', 
            value: userData.userType || 'Supporter', 
            icon: Users, 
            color: 'text-blue-500', 
            bg: 'bg-blue-50',
            border: 'border-blue-200'
          },
          { 
            label: 'Interests', 
            value: (userData.interests || []).length, 
            icon: BookOpen, 
            color: 'text-purple-500', 
            bg: 'bg-purple-50',
            border: 'border-purple-200'
          },
          { 
            label: 'Activities', 
            value: userData.activities || 0, 
            icon: ActivitySquareIcon, 
            color: 'text-cyan-500', 
            bg: 'bg-cyan-50',
            border: 'border-cyan-200'
          },
          { 
            label: 'Community Rank', 
            value: userData.rank || 'Member', 
            icon: Award, 
            color: 'text-amber-500', 
            bg: 'bg-amber-50',
            border: 'border-amber-200'
          }
        ];
      
      case 'hospital':
        return [
          { 
            label: 'Hospital Type', 
            value: userData.hospitalType || 'General', 
            icon: Building2, 
            color: 'text-purple-500', 
            bg: 'bg-purple-50',
            border: 'border-purple-200'
          },
          { 
            label: 'Total Beds', 
            value: userData.totalBeds || 0, 
            icon: Bed, 
            color: 'text-blue-500', 
            bg: 'bg-blue-50',
            border: 'border-blue-200'
          },
          { 
            label: 'Departments', 
            value: (userData.departments || []).length, 
            icon: Stethoscope, 
            color: 'text-emerald-500', 
            bg: 'bg-emerald-50',
            border: 'border-emerald-200'
          },
          { 
            label: 'Services', 
            value: (userData.services || []).length, 
            icon: ClipboardCheck, 
            color: 'text-cyan-500', 
            bg: 'bg-cyan-50',
            border: 'border-cyan-200'
          }
        ];
      
      default:
        return baseStats;
    }
  };

  // Get quick actions based on user type
  const getQuickActions = () => {
    const baseActions = [
      { 
        label: 'Notification Settings', 
        icon: Bell, 
        onClick: () => setActiveTab('settings'), 
        color: 'text-gray-600',
        bg: 'bg-gray-50'
      },
      { 
        label: 'Privacy & Security', 
        icon: Shield, 
        onClick: () => setActiveTab('security'), 
        color: 'text-blue-600',
        bg: 'bg-blue-50'
      },
      { 
        label: 'Help Center', 
        icon: HelpCircle, 
        onClick: () => navigate('/help'), 
        color: 'text-cyan-600',
        bg: 'bg-cyan-50'
      }
    ];

    switch (userType?.key) {
      case 'bloodDonor':
        return [
          { 
            label: 'Schedule Donation', 
            icon: Calendar, 
            onClick: () => navigate('/donor/schedule'), 
            color: 'text-rose-600',
            bg: 'bg-rose-50'
          },
          { 
            label: 'Donation History', 
            icon: History, 
            onClick: () => navigate('/donor/history'), 
            color: 'text-purple-600',
            bg: 'bg-purple-50'
          },
          { 
            label: 'My Rewards', 
            icon: Gift, 
            onClick: () => navigate('/donor/rewards'), 
            color: 'text-amber-600',
            bg: 'bg-amber-50'
          },
          ...baseActions
        ];
      
      case 'organDonor':
        return [
          { 
            label: 'Medical Info', 
            icon: FileText, 
            onClick: () => navigate('/donor/medical'), 
            color: 'text-emerald-600',
            bg: 'bg-emerald-50'
          },
          { 
            label: 'Pledge Certificate', 
            icon: Award, 
            onClick: () => navigate('/donor/certificate'), 
            color: 'text-green-600',
            bg: 'bg-green-50'
          },
          ...baseActions
        ];
      
      case 'patient':
        return [
          { 
            label: 'Request Help', 
            icon: AlertTriangle, 
            onClick: () => navigate('/patient/request-help'), 
            color: 'text-red-600',
            bg: 'bg-red-50'
          },
          { 
            label: 'Find Donors', 
            icon: UsersIcon, 
            onClick: () => navigate('/patient/find-donors'), 
            color: 'text-blue-600',
            bg: 'bg-blue-50'
          },
          { 
            label: 'Hospital Info', 
            icon: Hospital, 
            onClick: () => navigate('/hospitals'), 
            color: 'text-amber-600',
            bg: 'bg-amber-50'
          },
          ...baseActions
        ];
      
      case 'user':
        return [
          { 
            label: 'Explore Events', 
            icon: Calendar, 
            onClick: () => navigate('/events'), 
            color: 'text-blue-600',
            bg: 'bg-blue-50'
          },
          { 
            label: 'Volunteer', 
            icon: Users, 
            onClick: () => navigate('/volunteer'), 
            color: 'text-cyan-600',
            bg: 'bg-cyan-50'
          },
          { 
            label: 'Community', 
            icon: Globe, 
            onClick: () => navigate('/community'), 
            color: 'text-purple-600',
            bg: 'bg-purple-50'
          },
          ...baseActions
        ];
      
      case 'hospital':
        return [
          { 
            label: 'Hospital Dashboard', 
            icon: Building2, 
            onClick: () => navigate('/hospital/dashboard'), 
            color: 'text-purple-600',
            bg: 'bg-purple-50'
          },
          { 
            label: 'Blood Bank', 
            icon: Droplets, 
            onClick: () => navigate('/hospital/blood-bank'), 
            color: 'text-rose-600',
            bg: 'bg-rose-50'
          },
          { 
            label: 'Organ Bank', 
            icon: ActivityIcon, 
            onClick: () => navigate('/hospital/organ-bank'), 
            color: 'text-emerald-600',
            bg: 'bg-emerald-50'
          },
          ...baseActions
        ];
      
      default:
        return baseActions;
    }
  };

  // Render user type specific fields
  const renderUserTypeFields = () => {
    if (!userType) return null;

    switch (userType.key) {
      case 'bloodDonor':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <Droplets className="h-5 w-5 text-rose-500" />
              Blood Donor Information
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Blood Group *
                </label>
                <select
                  name="bloodGroup"
                  value={formData.bloodGroup || ''}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-rose-500/20 focus:border-rose-400 transition-all duration-200 disabled:bg-gray-50 disabled:cursor-not-allowed"
                  disabled={!isEditing}
                >
                  <option value="">Select Blood Group</option>
                  {['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].map(group => (
                    <option key={group} value={group}>{group}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Age
                </label>
                <input
                  type="number"
                  name="age"
                  value={formData.age || ''}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-rose-500/20 focus:border-rose-400 transition-all duration-200 disabled:bg-gray-50 disabled:cursor-not-allowed"
                  disabled={!isEditing}
                  min="18"
                  max="65"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Weight (kg)
                </label>
                <input
                  type="number"
                  name="weight"
                  value={formData.weight || ''}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-rose-500/20 focus:border-rose-400 transition-all duration-200 disabled:bg-gray-50 disabled:cursor-not-allowed"
                  disabled={!isEditing}
                  min="45"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Last Donation Date
                </label>
                <input
                  type="date"
                  name="lastDonationDate"
                  value={formData.lastDonationDate || ''}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-rose-500/20 focus:border-rose-400 transition-all duration-200 disabled:bg-gray-50 disabled:cursor-not-allowed"
                  disabled={!isEditing}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Health Conditions
              </label>
              <textarea
                name="healthConditions"
                value={formData.healthConditions || ''}
                onChange={handleInputChange}
                className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-rose-500/20 focus:border-rose-400 transition-all duration-200 resize-none disabled:bg-gray-50 disabled:cursor-not-allowed"
                disabled={!isEditing}
                rows="3"
                placeholder="Any health conditions or medications..."
              />
            </div>
          </div>
        );

      case 'organDonor':
        const organs = ['Kidney', 'Liver', 'Heart', 'Lungs', 'Pancreas', 'Eyes', 'Bone Marrow'];
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <ActivityIcon className="h-5 w-5 text-emerald-500" />
              Organ Donor Information
            </h3>
            
            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700">
                Organs to Donate
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {organs.map(organ => (
                  <label key={organ} className={`flex items-center gap-3 p-2.5 rounded-lg border ${isEditing ? 'cursor-pointer hover:bg-emerald-50' : 'cursor-default'} ${(formData.organsToDonate || []).includes(organ) ? 'bg-emerald-50 border-emerald-300 text-emerald-700' : 'bg-white border-gray-200'}`}>
                    <input
                      type="checkbox"
                      name="organsToDonate"
                      value={organ}
                      checked={(formData.organsToDonate || []).includes(organ)}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-emerald-500 rounded focus:ring-2 focus:ring-emerald-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={!isEditing}
                    />
                    <span className="text-sm font-medium">{organ}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Age *
                </label>
                <input
                  type="number"
                  name="age"
                  value={formData.age || ''}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400 transition-all duration-200 disabled:bg-gray-50 disabled:cursor-not-allowed"
                  disabled={!isEditing}
                  min="18"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Blood Group
                </label>
                <select
                  name="bloodGroup"
                  value={formData.bloodGroup || ''}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400 transition-all duration-200 disabled:bg-gray-50 disabled:cursor-not-allowed"
                  disabled={!isEditing}
                >
                  <option value="">Select Blood Group</option>
                  {['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].map(group => (
                    <option key={group} value={group}>{group}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">
                  Medical History
                </label>
                <textarea
                  name="medicalHistory"
                  value={formData.medicalHistory || ''}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400 transition-all duration-200 resize-none disabled:bg-gray-50 disabled:cursor-not-allowed"
                  disabled={!isEditing}
                  rows="3"
                  placeholder="Any medical conditions or history..."
                />
              </div>
            </div>

            <div className="space-y-4 p-4 bg-emerald-50 rounded-xl border border-emerald-200">
              <label className={`flex items-start gap-3 ${isEditing ? 'cursor-pointer' : 'cursor-default'}`}>
                <input
                  type="checkbox"
                  name="familyConsent"
                  checked={formData.familyConsent || false}
                  onChange={handleInputChange}
                  className={`h-5 w-5 text-emerald-500 rounded mt-0.5 focus:ring-2 focus:ring-emerald-500/20 ${isEditing ? '' : 'cursor-not-allowed'}`}
                  disabled={!isEditing}
                />
                <span className={`text-sm ${formData.familyConsent ? 'text-emerald-800 font-medium' : 'text-gray-700'}`}>
                  I have discussed organ donation with my family and have their consent
                </span>
              </label>
            </div>
          </div>
        );

      case 'patient':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <Ambulance className="h-5 w-5 text-amber-500" />
              Patient Information
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Blood Group
                </label>
                <select
                  name="bloodGroup"
                  value={formData.bloodGroup || ''}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500/20 focus:border-amber-400 transition-all duration-200 disabled:bg-gray-50 disabled:cursor-not-allowed"
                  disabled={!isEditing}
                >
                  <option value="">Select Blood Group</option>
                  {['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].map(group => (
                    <option key={group} value={group}>{group}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Urgency Level
                </label>
                <select
                  name="urgencyLevel"
                  value={formData.urgencyLevel || ''}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500/20 focus:border-amber-400 transition-all duration-200 disabled:bg-gray-50 disabled:cursor-not-allowed"
                  disabled={!isEditing}
                >
                  <option value="normal">Normal</option>
                  <option value="urgent">Urgent</option>
                  <option value="emergency">Emergency</option>
                </select>
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">
                  Medical Condition
                </label>
                <input
                  type="text"
                  name="medicalCondition"
                  value={formData.medicalCondition || ''}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500/20 focus:border-amber-400 transition-all duration-200 disabled:bg-gray-50 disabled:cursor-not-allowed"
                  disabled={!isEditing}
                  placeholder="e.g., Blood Cancer, Surgery, Accident"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Hospital Name
                </label>
                <input
                  type="text"
                  name="hospitalName"
                  value={formData.hospitalName || ''}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500/20 focus:border-amber-400 transition-all duration-200 disabled:bg-gray-50 disabled:cursor-not-allowed"
                  disabled={!isEditing}
                  placeholder="e.g., City General Hospital"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Emergency Contact
                </label>
                <input
                  type="text"
                  name="emergencyContact"
                  value={formData.emergencyContact || ''}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500/20 focus:border-amber-400 transition-all duration-200 disabled:bg-gray-50 disabled:cursor-not-allowed"
                  disabled={!isEditing}
                  placeholder="Name and phone number"
                />
              </div>
            </div>
          </div>
        );

      case 'user':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-500" />
              Community Information
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  User Type
                </label>
                <select
                  name="userType"
                  value={formData.userType || ''}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all duration-200 disabled:bg-gray-50 disabled:cursor-not-allowed"
                  disabled={!isEditing}
                >
                  <option value="supporter">Supporter</option>
                  <option value="volunteer">Volunteer</option>
                  <option value="organization">Organization</option>
                  <option value="healthcare">Healthcare Worker</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Occupation
                </label>
                <input
                  type="text"
                  name="occupation"
                  value={formData.occupation || ''}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all duration-200 disabled:bg-gray-50 disabled:cursor-not-allowed"
                  disabled={!isEditing}
                  placeholder="e.g., Student, Teacher, Doctor"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Organization
                </label>
                <input
                  type="text"
                  name="organization"
                  value={formData.organization || ''}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all duration-200 disabled:bg-gray-50 disabled:cursor-not-allowed"
                  disabled={!isEditing}
                  placeholder="e.g., ABC Hospital, XYZ NGO"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location || ''}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all duration-200 disabled:bg-gray-50 disabled:cursor-not-allowed"
                  disabled={!isEditing}
                  placeholder="City, State"
                />
              </div>
            </div>
          </div>
        );

      case 'hospital':
        const departmentsList = [
          'Cardiology', 'Neurology', 'Orthopedics', 'Pediatrics', 'Oncology',
          'Gynecology', 'Emergency', 'ICU', 'General Medicine'
        ];

        const servicesList = [
          'Emergency', 'OPD', 'IPD', 'Blood Bank', 'Organ Transplant',
          'Surgery', 'Diagnostics', 'Pharmacy', 'Ambulance'
        ];

        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <Building2 className="h-5 w-5 text-purple-500" />
              Hospital Information
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Hospital Name *
                </label>
                <input
                  type="text"
                  name="hospitalName"
                  value={formData.hospitalName || ''}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500/20 focus:border-purple-400 transition-all duration-200 disabled:bg-gray-50 disabled:cursor-not-allowed"
                  disabled={!isEditing}
                  placeholder="e.g., City General Hospital"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Registration Number
                </label>
                <input
                  type="text"
                  name="registrationNumber"
                  value={formData.registrationNumber || ''}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500/20 focus:border-purple-400 transition-all duration-200 disabled:bg-gray-50 disabled:cursor-not-allowed"
                  disabled={!isEditing}
                  placeholder="e.g., REG-123456"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Hospital Type
                </label>
                <select
                  name="hospitalType"
                  value={formData.hospitalType || ''}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500/20 focus:border-purple-400 transition-all duration-200 disabled:bg-gray-50 disabled:cursor-not-allowed"
                  disabled={!isEditing}
                >
                  <option value="">Select Hospital Type</option>
                  <option value="government">Government Hospital</option>
                  <option value="private">Private Hospital</option>
                  <option value="trust">Trust Hospital</option>
                  <option value="specialty">Specialty Hospital</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Total Beds
                </label>
                <input
                  type="number"
                  name="totalBeds"
                  value={formData.totalBeds || ''}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500/20 focus:border-purple-400 transition-all duration-200 disabled:bg-gray-50 disabled:cursor-not-allowed"
                  disabled={!isEditing}
                  placeholder="e.g., 500"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Contact Person
                </label>
                <input
                  type="text"
                  name="contactPerson"
                  value={formData.contactPerson || ''}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500/20 focus:border-purple-400 transition-all duration-200 disabled:bg-gray-50 disabled:cursor-not-allowed"
                  disabled={!isEditing}
                  placeholder="e.g., Dr. John Doe"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Website
                </label>
                <input
                  type="url"
                  name="website"
                  value={formData.website || ''}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500/20 focus:border-purple-400 transition-all duration-200 disabled:bg-gray-50 disabled:cursor-not-allowed"
                  disabled={!isEditing}
                  placeholder="https://example.com"
                />
              </div>
            </div>

            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700">
                Departments
              </label>
              <div className="flex flex-wrap gap-2">
                {departmentsList.map(dept => {
                  const isSelected = (formData.departments || []).includes(dept);
                  return (
                    <button
                      key={dept}
                      type="button"
                      onClick={() => {
                        if (!isEditing) return;
                        const current = formData.departments || [];
                        const updated = isSelected 
                          ? current.filter(d => d !== dept)
                          : [...current, dept];
                        setFormData(prev => ({ ...prev, departments: updated }));
                      }}
                      className={`px-3 py-1.5 rounded-lg border text-sm ${isEditing ? 'cursor-pointer hover:scale-105 transition-transform' : 'cursor-default'} ${
                        isSelected 
                          ? 'bg-purple-50 text-purple-700 border-purple-300' 
                          : 'bg-white text-gray-700 border-gray-300'
                      }`}
                    >
                      {dept}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700">
                Available Services
              </label>
              <div className="flex flex-wrap gap-2">
                {servicesList.map(service => {
                  const isSelected = (formData.services || []).includes(service);
                  return (
                    <button
                      key={service}
                      type="button"
                      onClick={() => {
                        if (!isEditing) return;
                        const current = formData.services || [];
                        const updated = isSelected 
                          ? current.filter(s => s !== service)
                          : [...current, service];
                        setFormData(prev => ({ ...prev, services: updated }));
                      }}
                      className={`px-3 py-1.5 rounded-lg border text-sm ${isEditing ? 'cursor-pointer hover:scale-105 transition-transform' : 'cursor-default'} ${
                        isSelected 
                          ? 'bg-indigo-50 text-indigo-700 border-indigo-300' 
                          : 'bg-white text-gray-700 border-gray-300'
                      }`}
                    >
                      {service}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  // Render tab content
  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Profile Information</h2>
              
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {userType.key === 'hospital' ? (
                    <>
                      <div className="space-y-2">
                        <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                          <Building2 className="h-4 w-4" />
                          Hospital Name *
                        </label>
                        {isEditing ? (
                          <input
                            type="text"
                            name="hospitalName"
                            value={formData.hospitalName || ''}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500/20 focus:border-purple-400 transition-all duration-200"
                            required
                          />
                        ) : (
                          <div className="px-3 py-2.5 bg-gray-50 rounded-lg text-gray-900">{userData.hospitalName || 'Not provided'}</div>
                        )}
                      </div>

                      <div className="space-y-2">
                        <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                          <Shield className="h-4 w-4" />
                          Registration Number
                        </label>
                        {isEditing ? (
                          <input
                            type="text"
                            name="registrationNumber"
                            value={formData.registrationNumber || ''}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500/20 focus:border-purple-400 transition-all duration-200"
                          />
                        ) : (
                          <div className="px-3 py-2.5 bg-gray-50 rounded-lg text-gray-900">{userData.registrationNumber || 'Not provided'}</div>
                        )}
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="space-y-2">
                        <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                          <User className="h-4 w-4" />
                          Full Name *
                        </label>
                        {isEditing ? (
                          <input
                            type="text"
                            name="name"
                            value={formData.name || ''}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-rose-500/20 focus:border-rose-400 transition-all duration-200"
                            required
                          />
                        ) : (
                          <div className="px-3 py-2.5 bg-gray-50 rounded-lg text-gray-900">{userData.name || 'Not provided'}</div>
                        )}
                      </div>

                      <div className="space-y-2">
                        <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                          <Mail className="h-4 w-4" />
                          Email Address *
                        </label>
                        {isEditing ? (
                          <input
                            type="email"
                            name="email"
                            value={formData.email || ''}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-rose-500/20 focus:border-rose-400 transition-all duration-200"
                            required
                          />
                        ) : (
                          <div className="px-3 py-2.5 bg-gray-50 rounded-lg text-gray-900">{userData.email || 'Not provided'}</div>
                        )}
                      </div>
                    </>
                  )}

                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                      <Phone className="h-4 w-4" />
                      Phone Number *
                    </label>
                    {isEditing ? (
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone || ''}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-rose-500/20 focus:border-rose-400 transition-all duration-200"
                        required
                      />
                    ) : (
                      <div className="px-3 py-2.5 bg-gray-50 rounded-lg text-gray-900">{userData.phone || 'Not provided'}</div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                      <MapPin className="h-4 w-4" />
                      Address
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="address"
                        value={formData.address || ''}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-rose-500/20 focus:border-rose-400 transition-all duration-200"
                      />
                    ) : (
                      <div className="px-3 py-2.5 bg-gray-50 rounded-lg text-gray-900">{userData.address || 'Not provided'}</div>
                    )}
                  </div>
                </div>

                {renderUserTypeFields()}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Activity</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="p-3 rounded-lg bg-emerald-100 text-emerald-600">
                    <CheckCircle className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900">Profile Updated</div>
                    <div className="text-sm text-gray-500">You updated your profile information</div>
                  </div>
                  <div className="text-sm text-gray-500">
                    {userData.lastUpdated ? new Date(userData.lastUpdated).toLocaleDateString('en-IN') : 'Never'}
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="p-3 rounded-lg bg-blue-100 text-blue-600">
                    <Calendar className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900">Account Created</div>
                    <div className="text-sm text-gray-500">You joined JeevanDaan community</div>
                  </div>
                  <div className="text-sm text-gray-500">
                    {new Date(userData.registrationDate || Date.now()).toLocaleDateString('en-IN')}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'settings':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Notification Settings</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-gray-100 rounded-lg">
                  <div>
                    <div className="font-medium text-gray-900">Email Notifications</div>
                    <div className="text-sm text-gray-500">Receive updates via email</div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="sr-only peer" 
                      checked={formData.emailNotifications !== false}
                      onChange={(e) => setFormData(prev => ({ ...prev, emailNotifications: e.target.checked }))}
                      disabled={!isEditing}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between p-4 border border-gray-100 rounded-lg">
                  <div>
                    <div className="font-medium text-gray-900">Push Notifications</div>
                    <div className="text-sm text-gray-500">Get instant alerts</div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="sr-only peer" 
                      checked={formData.pushNotifications !== false}
                      onChange={(e) => setFormData(prev => ({ ...prev, pushNotifications: e.target.checked }))}
                      disabled={!isEditing}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        );

      case 'security':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Security Settings</h2>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Change Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400"
                      placeholder="Enter new password"
                      disabled={!isEditing}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-rose-200 rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="h-8 w-8 text-rose-500 animate-spin" />
          </div>
        </div>
        <p className="mt-4 text-gray-600 font-medium">Loading your profile...</p>
      </div>
    );
  }

  if (!userType || !userData) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center p-8">
          <AlertCircle className="h-16 w-16 text-rose-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">No User Found</h1>
          <p className="text-gray-600 mb-6">Please login to access your profile</p>
          <button
            onClick={() => navigate('/auth')}
            className="px-6 py-3 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  const stats = getUserStats();
  const quickActions = getQuickActions();

  // Get display name
  const getDisplayName = () => {
    if (userType.key === 'hospital') {
      return userData.hospitalName || 'Hospital';
    }
    return userData.name || 'User';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Responsive Top Navigation */}
      <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <Link to="/" className="flex items-center gap-2 group">
                <div className={`bg-gradient-to-r ${userType.gradient} p-2 rounded-lg shadow-sm group-hover:scale-105 transition-transform duration-200`}>
                  <userType.icon className="h-5 w-5 text-white" />
                </div>
                <div className="hidden sm:block">
                  <h1 className="text-lg font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                    JeevanDaan
                  </h1>
                  <p className="text-xs text-gray-500">Profile</p>
                </div>
              </Link>
              
              <div className="hidden md:block ml-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${userType.bgColor} ${userType.textColor} border ${userType.borderColor}`}>
                  {userType.label}
                </span>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Link 
                to="/" 
                className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all duration-200 font-medium text-sm"
              >
                <Home className="h-4 w-4" />
                <span className="hidden sm:inline">Home</span>
              </Link>
              
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="flex items-center gap-2 px-3 py-2 bg-gray-50 text-gray-700 hover:bg-gray-100 rounded-lg transition-all duration-200 font-medium text-sm"
              >
                {isEditing ? (
                  <>
                    <X className="h-4 w-4" />
                    <span className="hidden sm:inline">Cancel Edit</span>
                  </>
                ) : (
                  <>
                    <Edit2 className="h-4 w-4" />
                    <span className="hidden sm:inline">Edit Profile</span>
                  </>
                )}
              </button>
              
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-lg transition-all duration-200 font-medium hover:scale-105 text-sm"
              >
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Profile Header - Responsive */}
        <div className="mb-6">
          <div className={`relative overflow-hidden rounded-xl shadow-lg mb-4`}>
            <div className={`absolute inset-0 bg-gradient-to-r ${userType.gradient} opacity-90`}></div>
            <div className="relative p-4 md:p-6">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                      {userType.key === 'hospital' ? (
                        <Building2 className="h-8 w-8 text-white" />
                      ) : (
                        <User className="h-8 w-8 text-white" />
                      )}
                    </div>
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-white rounded-full border-2 border-white flex items-center justify-center">
                      <userType.icon className={`h-4 w-4 ${userType.gradient.replace('from-', 'text-').split(' ')[0]}`} />
                    </div>
                  </div>
                  <div>
                    <h1 className="text-xl md:text-2xl font-bold text-white">{getDisplayName()}</h1>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="px-2 py-1 bg-white/20 backdrop-blur-sm text-white rounded-full text-xs font-medium">
                        {userType.label}
                      </span>
                      <span className="flex items-center gap-1 text-white/80 text-xs">
                        <CheckCircle className="h-3 w-3" />
                        Verified
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 mt-4 md:mt-0">
                  {isEditing ? (
                    <button
                      onClick={handleSave}
                      disabled={saving}
                      className="flex items-center gap-2 px-3 py-2 bg-white text-emerald-600 rounded-lg font-medium hover:bg-emerald-50 transition-all duration-200 disabled:opacity-50 shadow-lg text-sm"
                    >
                      {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                      <span>{saving ? 'Saving...' : 'Save'}</span>
                    </button>
                  ) : null}
                </div>
              </div>
            </div>
          </div>

          {/* Message Alert */}
          {message.text && (
            <div className={`p-3 rounded-lg flex items-center gap-3 animate-fadeIn shadow-sm ${
              message.type === 'success' 
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                : 'bg-red-50 text-red-700 border border-red-200'
            }`}>
              {message.type === 'success' ? 
                <CheckCircle className="h-5 w-5 flex-shrink-0" /> : 
                <AlertCircle className="h-5 w-5 flex-shrink-0" />
              }
              <span className="font-medium text-sm">{message.text}</span>
            </div>
          )}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Sidebar - Hidden on mobile */}
          <div className="lg:col-span-1 space-y-4 hidden lg:block">
            {/* Stats Cards */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
              <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-gray-500" />
                Your Stats
              </h2>
              <div className="space-y-3">
                {stats.map((stat, index) => (
                  <div key={index} className={`p-3 rounded-lg border ${stat.border} ${stat.bg} hover:scale-[1.02] transition-transform duration-200`}>
                    <div className="flex items-center gap-2">
                      <div className={`p-1.5 rounded ${stat.bg} ${stat.color}`}>
                        <stat.icon className="h-4 w-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-lg font-bold text-gray-900 truncate">{stat.value}</div>
                        <div className="text-xs text-gray-600 truncate">{stat.label}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
              <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Zap className="h-5 w-5 text-amber-500" />
                Quick Actions
              </h2>
              <div className="space-y-2">
                {quickActions.slice(0, isMobile ? 3 : 4).map((action, index) => (
                  <button
                    key={index}
                    onClick={action.onClick}
                    className="w-full flex items-center justify-between p-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-all duration-200 group text-sm"
                  >
                    <div className="flex items-center gap-2">
                      <div className={`p-1.5 rounded ${action.bg}`}>
                        <action.icon className={`h-3.5 w-3.5 ${action.color}`} />
                      </div>
                      <span className="font-medium text-gray-700 group-hover:text-gray-900 truncate">{action.label}</span>
                    </div>
                    <ChevronRight className="h-3.5 w-3.5 text-gray-400 group-hover:text-gray-600" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3">
            {/* Responsive Tabs */}
            <div className="flex items-center gap-1 mb-4 p-1 bg-gray-100 rounded-lg overflow-x-auto">
              {['overview', 'settings', 'security'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                    activeTab === tab
                      ? `bg-white text-gray-900 shadow-sm ${userType.gradient.replace('from-', 'border-l-2 border-').split(' ')[0]}`
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            {renderTabContent()}

            {/* Mobile Quick Actions */}
            <div className="lg:hidden mt-6 bg-white rounded-xl shadow-sm border border-gray-100 p-4">
              <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Zap className="h-5 w-5 text-amber-500" />
                Quick Actions
              </h2>
              <div className="grid grid-cols-2 gap-2">
                {quickActions.slice(0, 4).map((action, index) => (
                  <button
                    key={index}
                    onClick={action.onClick}
                    className="flex flex-col items-center justify-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-all duration-200 group"
                  >
                    <div className={`p-2 rounded-lg ${action.bg} mb-2`}>
                      <action.icon className={`h-4 w-4 ${action.color}`} />
                    </div>
                    <span className="text-xs font-medium text-gray-700 group-hover:text-gray-900 text-center truncate w-full">{action.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Danger Zone */}
            <div className="mt-6 bg-white rounded-xl shadow-sm border border-red-100 p-4">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-red-500" />
                  Account Management
                </h2>
                <span className="text-xs text-red-600 bg-red-50 px-2 py-1 rounded-full">Danger Zone</span>
              </div>
              <div className="space-y-2">
                <button
                  onClick={handleLogout}
                  className="w-full text-left p-2.5 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors flex items-center gap-2 text-sm"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout from all devices</span>
                </button>
                <button
                  onClick={() => {
                    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
                      handleLogout();
                      navigate('/');
                    }
                  }}
                  className="w-full text-left p-2.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors flex items-center gap-2 text-sm"
                >
                  <AlertCircle className="h-4 w-4" />
                  <span>Delete Account</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Stats Cards - Bottom Sheet */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg p-4">
        <div className="grid grid-cols-2 gap-3">
          {stats.slice(0, 4).map((stat, index) => (
            <div key={index} className={`p-2 rounded-lg border ${stat.border} ${stat.bg}`}>
              <div className="flex items-center gap-2">
                <div className={`p-1 rounded ${stat.bg} ${stat.color}`}>
                  <stat.icon className="h-3 w-3" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-bold text-gray-900 truncate">{stat.value}</div>
                  <div className="text-xs text-gray-600 truncate">{stat.label}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add padding for mobile bottom stats */}
      <div className="lg:hidden pb-20"></div>

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default ProfilePage;