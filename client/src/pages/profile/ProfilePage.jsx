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
  PhoneCall, MessageSquare, LifeBuoy, HelpCircle
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

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = () => {
    setLoading(true);
    
    const userTypes = [
      { 
        key: 'bloodDonor', 
        label: 'Blood Donor', 
        color: 'from-rose-500 to-pink-500',
        lightColor: 'bg-rose-50 text-rose-700 border-rose-200',
        icon: Droplets,
        badgeColor: 'bg-rose-500'
      },
      { 
        key: 'organDonor', 
        label: 'Organ Donor', 
        color: 'from-emerald-500 to-green-500',
        lightColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
        icon: ActivityIcon,
        badgeColor: 'bg-emerald-500'
      },
      { 
        key: 'patient', 
        label: 'Patient/Family', 
        color: 'from-amber-500 to-orange-500',
        lightColor: 'bg-amber-50 text-amber-700 border-amber-200',
        icon: Ambulance,
        badgeColor: 'bg-amber-500'
      },
      { 
        key: 'user', 
        label: 'Community Member', 
        color: 'from-blue-500 to-cyan-500',
        lightColor: 'bg-blue-50 text-blue-700 border-blue-200',
        icon: Users,
        badgeColor: 'bg-blue-500'
      }
    ];

    for (const type of userTypes) {
      const token = localStorage.getItem(`${type.key}Token`);
      const dataKey = localStorage.getItem('currentUserType') === type.key ? 
        'currentUserData' : `${type.key}Data`;
      
      const data = localStorage.getItem(dataKey);
      
      if (token && data) {
        try {
          const parsedData = JSON.parse(data);
          setUserType(type);
          setUserData(parsedData);
          setFormData(parsedData);
          
          localStorage.setItem('currentUserType', type.key);
          localStorage.setItem('currentUserData', JSON.stringify(parsedData));
          
          setLoading(false);
          return;
        } catch (error) {
          console.error('Error parsing user data:', error);
        }
      }
    }

    const currentUserData = localStorage.getItem('currentUserData');
    const currentUserType = localStorage.getItem('currentUserType');
    
    if (currentUserData && currentUserType) {
      try {
        const parsedData = JSON.parse(currentUserData);
        const type = userTypes.find(t => t.key === currentUserType);
        
        if (type) {
          setUserType(type);
          setUserData(parsedData);
          setFormData(parsedData);
          setLoading(false);
          return;
        }
      } catch (error) {
        console.error('Error parsing current user data:', error);
      }
    }
    
    navigate('/select-role');
    setLoading(false);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      if (name === 'organsToDonate' || name === 'interests') {
        const currentArray = formData[name] || [];
        const updatedArray = currentArray.includes(value)
          ? currentArray.filter(item => item !== value)
          : [...currentArray, value];
        setFormData(prev => ({ ...prev, [name]: updatedArray }));
      } else {
        setFormData(prev => ({ ...prev, [name]: checked }));
      }
    } else if (type === 'radio') {
      setFormData(prev => ({ ...prev, [name]: value }));
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

      await new Promise(resolve => setTimeout(resolve, 1000));

      const updatedData = { 
        ...formData, 
        updatedAt: new Date().toISOString(),
        lastUpdated: new Date().toLocaleString(),
        userType: userType.key
      };
      
      localStorage.setItem(`${userType.key}Data`, JSON.stringify(updatedData));
      localStorage.setItem('currentUserData', JSON.stringify(updatedData));
      localStorage.setItem('currentUserType', userType.key);
      localStorage.setItem(userType.key, JSON.stringify(updatedData));
      
      setUserData(updatedData);
      setIsEditing(false);
      setMessage({ 
        type: 'success', 
        text: 'Profile updated successfully!' 
      });

      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    } catch (error) {
      setMessage({ 
        type: 'error', 
        text: error.message || 'Failed to update profile. Please try again.' 
      });
    } finally {
      setSaving(false);
    }
  };

  const validateForm = () => {
    const errors = [];
    
    if (!formData.name?.trim()) errors.push('Name is required');
    if (!formData.email?.trim()) errors.push('Email is required');
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      errors.push('Please enter a valid email address');
    }
    
    if (userType?.key === 'bloodDonor') {
      if (!formData.bloodGroup) errors.push('Blood group is required');
    }
    
    return errors;
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
    
    navigate('/auth');
  };

  const getUserStats = () => {
    if (!userData) return [];
    
    const baseStats = [
      { 
        label: 'Account Status', 
        value: userData.status === 'active' ? 'Active' : 'Pending', 
        icon: CheckCircle, 
        color: 'text-emerald-500', 
        bg: 'bg-emerald-50',
        border: 'border-emerald-200'
      },
      { 
        label: 'Member Since', 
        value: new Date(userData.registrationDate || userData.joinDate || Date.now()).toLocaleDateString(), 
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
            value: userData.donationCount || 0, 
            icon: Droplets, 
            color: 'text-rose-500', 
            bg: 'bg-rose-50',
            border: 'border-rose-200'
          },
          { 
            label: 'Lives Saved', 
            value: (userData.donationCount || 0) * 3, 
            icon: Heart, 
            color: 'text-pink-500', 
            bg: 'bg-pink-50',
            border: 'border-pink-200'
          },
          { 
            label: 'Donor Points', 
            value: userData.points || 0, 
            icon: Award, 
            color: 'text-amber-500', 
            bg: 'bg-amber-50',
            border: 'border-amber-200'
          },
          { 
            label: 'Donor Level', 
            value: userData.level || 'Beginner', 
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
            value: userData.status === 'approved' ? 'Approved' : 'Pending Review', 
            icon: ShieldCheck, 
            color: 'text-blue-500', 
            bg: 'bg-blue-50',
            border: 'border-blue-200'
          },
          ...baseStats
        ];
      
      case 'patient':
        return [
          { 
            label: 'Urgency Level', 
            value: (userData.urgencyLevel || 'Normal').charAt(0).toUpperCase() + (userData.urgencyLevel || 'Normal').slice(1), 
            icon: AlertTriangle, 
            color: userData.urgencyLevel === 'emergency' ? 'text-red-500' : userData.urgencyLevel === 'urgent' ? 'text-amber-500' : 'text-blue-500', 
            bg: userData.urgencyLevel === 'emergency' ? 'bg-red-50' : userData.urgencyLevel === 'urgent' ? 'bg-amber-50' : 'bg-blue-50',
            border: userData.urgencyLevel === 'emergency' ? 'border-red-200' : userData.urgencyLevel === 'urgent' ? 'border-amber-200' : 'border-blue-200'
          },
          { 
            label: 'Hospital', 
            value: userData.hospitalName || 'Not specified', 
            icon: Hospital, 
            color: 'text-blue-500', 
            bg: 'bg-blue-50',
            border: 'border-blue-200'
          },
          ...baseStats
        ];
      
      case 'user':
        return [
          { 
            label: 'User Type', 
            value: userData.userType ? userData.userType.charAt(0).toUpperCase() + userData.userType.slice(1) : 'Supporter', 
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
          ...baseStats
        ];
      
      default:
        return baseStats;
    }
  };

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
        label: 'Download Data', 
        icon: Download, 
        onClick: () => {}, 
        color: 'text-emerald-600',
        bg: 'bg-emerald-50'
      }
    ];

    switch (userType?.key) {
      case 'bloodDonor':
        return [
          { 
            label: 'Schedule Donation', 
            icon: Calendar, 
            onClick: () => navigate('/schedule-donation'), 
            color: 'text-rose-600',
            bg: 'bg-rose-50'
          },
          { 
            label: 'View History', 
            icon: History, 
            onClick: () => navigate('/donation-history'), 
            color: 'text-purple-600',
            bg: 'bg-purple-50'
          },
          { 
            label: 'My Rewards', 
            icon: Gift, 
            onClick: () => navigate('/rewards'), 
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
            onClick: () => navigate('/medical-info'), 
            color: 'text-emerald-600',
            bg: 'bg-emerald-50'
          },
          { 
            label: 'Pledge Certificate', 
            icon: Award, 
            onClick: () => {}, 
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
            onClick: () => navigate('/request-help'), 
            color: 'text-red-600',
            bg: 'bg-red-50'
          },
          { 
            label: 'Find Donors', 
            icon: UsersIcon, 
            onClick: () => navigate('/find-donors'), 
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
            onClick: () => navigate('/forum'), 
            color: 'text-purple-600',
            bg: 'bg-purple-50'
          },
          ...baseActions
        ];
      
      default:
        return baseActions;
    }
  };

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
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Blood Group *
                </label>
                <select
                  name="bloodGroup"
                  value={formData.bloodGroup || ''}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-500/20 focus:border-rose-400 transition-all duration-200 disabled:bg-gray-50 disabled:cursor-not-allowed"
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
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-500/20 focus:border-rose-400 transition-all duration-200 disabled:bg-gray-50 disabled:cursor-not-allowed"
                  disabled={!isEditing}
                  min="18"
                  max="65"
                  placeholder="18-65"
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
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-500/20 focus:border-rose-400 transition-all duration-200 disabled:bg-gray-50 disabled:cursor-not-allowed"
                  disabled={!isEditing}
                  min="45"
                  placeholder="Min. 45kg"
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
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-500/20 focus:border-rose-400 transition-all duration-200 disabled:bg-gray-50 disabled:cursor-not-allowed"
                  disabled={!isEditing}
                />
              </div>
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
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {organs.map(organ => (
                  <label key={organ} className={`flex items-center gap-3 p-3 rounded-lg border ${isEditing ? 'cursor-pointer hover:bg-emerald-50 hover:border-emerald-300' : 'cursor-default'} ${(formData.organsToDonate || []).includes(organ) ? 'bg-emerald-50 border-emerald-300 text-emerald-700' : 'bg-white border-gray-200'}`}>
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Age *
                </label>
                <input
                  type="number"
                  name="age"
                  value={formData.age || ''}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400 transition-all duration-200 disabled:bg-gray-50 disabled:cursor-not-allowed"
                  disabled={!isEditing}
                  min="18"
                  placeholder="Min. 18 years"
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">
                  Medical History
                </label>
                <textarea
                  name="medicalHistory"
                  value={formData.medicalHistory || ''}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400 transition-all duration-200 resize-none disabled:bg-gray-50 disabled:cursor-not-allowed"
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

              <label className={`flex items-start gap-3 ${isEditing ? 'cursor-pointer' : 'cursor-default'}`}>
                <input
                  type="checkbox"
                  name="legalDocument"
                  checked={formData.legalDocument || false}
                  onChange={handleInputChange}
                  className={`h-5 w-5 text-emerald-500 rounded mt-0.5 focus:ring-2 focus:ring-emerald-500/20 ${isEditing ? '' : 'cursor-not-allowed'}`}
                  disabled={!isEditing}
                />
                <span className={`text-sm ${formData.legalDocument ? 'text-emerald-800 font-medium' : 'text-gray-700'}`}>
                  I agree to complete the required legal documentation for organ donation
                </span>
              </label>
            </div>
          </div>
        );

      case 'patient':
        const urgencyLevels = [
          { value: 'normal', label: 'Normal', color: 'bg-blue-100 text-blue-800 border-blue-300' },
          { value: 'urgent', label: 'Urgent', color: 'bg-amber-100 text-amber-800 border-amber-300' },
          { value: 'emergency', label: 'Emergency', color: 'bg-red-100 text-red-800 border-red-300' }
        ];

        const patientTypes = [
          { value: 'self', label: 'Self' },
          { value: 'family', label: 'Family Member' },
          { value: 'friend', label: 'Friend' }
        ];

        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <Ambulance className="h-5 w-5 text-amber-500" />
              Patient Information
            </h3>
            
            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700">
                Patient Type
              </label>
              <div className="grid grid-cols-3 gap-2">
                {patientTypes.map(type => (
                  <label key={type.value} className={`flex items-center justify-center p-3 rounded-lg border ${isEditing ? 'cursor-pointer hover:bg-amber-50' : 'cursor-default'} ${formData.patientType === type.value ? 'bg-amber-50 border-amber-300 text-amber-700' : 'bg-white border-gray-200'}`}>
                    <input
                      type="radio"
                      name="patientType"
                      value={type.value}
                      checked={formData.patientType === type.value}
                      onChange={handleInputChange}
                      className="sr-only"
                      disabled={!isEditing}
                    />
                    <span className="font-medium">{type.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Blood Group
                </label>
                <select
                  name="bloodGroup"
                  value={formData.bloodGroup || ''}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500/20 focus:border-amber-400 transition-all duration-200 disabled:bg-gray-50 disabled:cursor-not-allowed"
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
                  Medical Condition
                </label>
                <input
                  type="text"
                  name="medicalCondition"
                  value={formData.medicalCondition || ''}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500/20 focus:border-amber-400 transition-all duration-200 disabled:bg-gray-50 disabled:cursor-not-allowed"
                  disabled={!isEditing}
                  placeholder="e.g., Blood Cancer, Surgery, Accident"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Urgency Level
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {urgencyLevels.map(level => (
                    <label key={level.value} className={`flex items-center justify-center p-3 rounded-lg border ${isEditing ? 'cursor-pointer hover:bg-amber-50' : 'cursor-default'} ${formData.urgencyLevel === level.value ? level.color : 'bg-white border-gray-200'}`}>
                      <input
                        type="radio"
                        name="urgencyLevel"
                        value={level.value}
                        checked={formData.urgencyLevel === level.value}
                        onChange={handleInputChange}
                        className="sr-only"
                        disabled={!isEditing}
                      />
                      <span className="font-medium">{level.label}</span>
                    </label>
                  ))}
                </div>
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
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500/20 focus:border-amber-400 transition-all duration-200 disabled:bg-gray-50 disabled:cursor-not-allowed"
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
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500/20 focus:border-amber-400 transition-all duration-200 disabled:bg-gray-50 disabled:cursor-not-allowed"
                  disabled={!isEditing}
                  placeholder="Name and phone number"
                />
              </div>
            </div>
          </div>
        );

      case 'user':
        const interestsList = [
          'Blood Donation', 'Organ Donation', 'Awareness Programs', 'Fundraising',
          'Volunteering', 'Event Management', 'Medical Support', 'Community Outreach'
        ];

        const userTypes = [
          { value: 'supporter', label: 'Supporter', icon: Heart },
          { value: 'volunteer', label: 'Volunteer', icon: Users },
          { value: 'organization', label: 'Organization', icon: Globe },
          { value: 'healthcare', label: 'Healthcare Worker', icon: TrendingUp }
        ];

        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-500" />
              Community Information
            </h3>
            
            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700">
                User Type
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {userTypes.map(type => {
                  const IconComponent = type.icon;
                  return (
                    <label key={type.value} className={`flex flex-col items-center justify-center p-3 rounded-lg border ${isEditing ? 'cursor-pointer hover:bg-blue-50' : 'cursor-default'} ${formData.userType === type.value ? 'bg-blue-50 border-blue-300 text-blue-700' : 'bg-white border-gray-200'}`}>
                      <input
                        type="radio"
                        name="userType"
                        value={type.value}
                        checked={formData.userType === type.value}
                        onChange={handleInputChange}
                        className="sr-only"
                        disabled={!isEditing}
                      />
                      <IconComponent className={`h-5 w-5 mb-2 ${formData.userType === type.value ? 'text-blue-500' : 'text-gray-400'}`} />
                      <span className="text-xs font-medium">{type.label}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location || ''}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all duration-200 disabled:bg-gray-50 disabled:cursor-not-allowed"
                  disabled={!isEditing}
                  placeholder="City, State"
                />
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
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all duration-200 disabled:bg-gray-50 disabled:cursor-not-allowed"
                  disabled={!isEditing}
                  placeholder="e.g., Student, Teacher, Doctor"
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">
                  Organization
                </label>
                <input
                  type="text"
                  name="organization"
                  value={formData.organization || ''}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all duration-200 disabled:bg-gray-50 disabled:cursor-not-allowed"
                  disabled={!isEditing}
                  placeholder="e.g., ABC Hospital, XYZ NGO"
                />
              </div>
            </div>

            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700">
                Areas of Interest
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {interestsList.map(interest => (
                  <label key={interest} className={`flex items-center gap-3 p-3 rounded-lg border ${isEditing ? 'cursor-pointer hover:bg-blue-50 hover:border-blue-300' : 'cursor-default'} ${(formData.interests || []).includes(interest) ? 'bg-blue-50 border-blue-300 text-blue-700' : 'bg-white border-gray-200'}`}>
                    <input
                      type="checkbox"
                      name="interests"
                      value={interest}
                      checked={(formData.interests || []).includes(interest)}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-blue-500 rounded focus:ring-2 focus:ring-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={!isEditing}
                    />
                    <span className="text-sm">{interest}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
              <label className={`flex items-center gap-3 ${isEditing ? 'cursor-pointer' : 'cursor-default'}`}>
                <input
                  type="checkbox"
                  name="notifications"
                  checked={formData.notifications || false}
                  onChange={handleInputChange}
                  className="h-5 w-5 text-blue-500 rounded focus:ring-2 focus:ring-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={!isEditing}
                />
                <span className={`text-sm ${formData.notifications ? 'text-blue-800 font-medium' : 'text-gray-700'}`}>
                  Receive notifications about donation drives and community activities
                </span>
              </label>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-8">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Profile Information</h2>
              
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                        className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-500/20 focus:border-rose-400 transition-all duration-200"
                        required
                      />
                    ) : (
                      <div className="px-4 py-3 bg-gray-50 rounded-xl text-gray-900">{userData.name || 'Not provided'}</div>
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
                        className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-500/20 focus:border-rose-400 transition-all duration-200"
                        required
                      />
                    ) : (
                      <div className="px-4 py-3 bg-gray-50 rounded-xl text-gray-900">{userData.email || 'Not provided'}</div>
                    )}
                  </div>

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
                        className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-500/20 focus:border-rose-400 transition-all duration-200"
                        required
                      />
                    ) : (
                      <div className="px-4 py-3 bg-gray-50 rounded-xl text-gray-900">{userData.phone || 'Not provided'}</div>
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
                        className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-500/20 focus:border-rose-400 transition-all duration-200"
                      />
                    ) : (
                      <div className="px-4 py-3 bg-gray-50 rounded-xl text-gray-900">{userData.address || 'Not provided'}</div>
                    )}
                  </div>
                </div>

                {renderUserTypeFields()}
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Activity</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors">
                  <div className="p-3 rounded-lg bg-emerald-100 text-emerald-600">
                    <CheckCircle className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900">Profile Updated</div>
                    <div className="text-sm text-gray-500">You updated your profile information</div>
                  </div>
                  <div className="text-sm text-gray-500">
                    {userData.lastUpdated ? new Date(userData.lastUpdated).toLocaleDateString() : 'Never'}
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors">
                  <div className="p-3 rounded-lg bg-blue-100 text-blue-600">
                    <Calendar className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900">Account Created</div>
                    <div className="text-sm text-gray-500">You joined JeevanDaan community</div>
                  </div>
                  <div className="text-sm text-gray-500">
                    {new Date(userData.registrationDate || userData.joinDate || Date.now()).toLocaleDateString()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'settings':
        return (
          <div className="space-y-8">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Notification Settings</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-gray-100 rounded-xl">
                  <div>
                    <div className="font-medium text-gray-900">Email Notifications</div>
                    <div className="text-sm text-gray-500">Receive updates via email</div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between p-4 border border-gray-100 rounded-xl">
                  <div>
                    <div className="font-medium text-gray-900">Push Notifications</div>
                    <div className="text-sm text-gray-500">Get instant alerts</div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        );

      case 'security':
        return (
          <div className="space-y-8">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Security Settings</h2>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Change Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400"
                      placeholder="Enter new password"
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
    return null;
  }

  const IconComponent = userType.icon;
  const stats = getUserStats();
  const quickActions = getQuickActions();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Top Navigation */}
      <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-3 group">
              <div className={`bg-gradient-to-r ${userType.color} p-2 rounded-xl shadow-sm group-hover:scale-105 transition-transform duration-200`}>
                <IconComponent className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  JeevanDaan
                </h1>
                <p className="text-xs text-gray-500 font-medium">Profile</p>
              </div>
            </Link>
            
            <div className="flex items-center gap-3">
              <Link 
                to="/" 
                className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all duration-200 font-medium"
              >
                <Home className="h-4 w-4" />
                <span className="hidden sm:inline">Home</span>
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 bg-gray-50 text-gray-700 hover:bg-gray-100 rounded-xl transition-all duration-200 font-medium hover:scale-105"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Profile Header */}
        <div className={`relative overflow-hidden rounded-2xl shadow-xl mb-8`}>
          <div className={`absolute inset-0 bg-gradient-to-r ${userType.color} opacity-90`}></div>
          <div className="relative p-6 md:p-8">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-20 h-20 md:w-24 md:h-24 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                    <User className="h-10 w-10 md:h-12 md:w-12 text-white" />
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-white rounded-full border-4 border-white flex items-center justify-center">
                    <IconComponent className={`h-5 w-5 ${userType.color.replace('from-', 'text-').split(' ')[0]}`} />
                  </div>
                </div>
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-white">{userData.name || 'User'}</h1>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm font-medium">
                      {userType.label}
                    </span>
                    <span className="flex items-center gap-1 text-white/80 text-sm">
                      <CheckCircle className="h-4 w-4" />
                      Verified
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex items-center gap-2 px-4 py-2.5 bg-white text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-all duration-200 hover:scale-105 shadow-lg"
                  >
                    <Edit2 className="h-4 w-4" />
                    <span>Edit Profile</span>
                  </button>
                ) : (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleSave}
                      disabled={saving}
                      className="flex items-center gap-2 px-4 py-2.5 bg-white text-emerald-600 rounded-xl font-medium hover:bg-emerald-50 transition-all duration-200 hover:scale-105 disabled:opacity-50 shadow-lg"
                    >
                      {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                      <span>{saving ? 'Saving...' : 'Save'}</span>
                    </button>
                    <button
                      onClick={() => {
                        setIsEditing(false);
                        setFormData({ ...userData });
                        setMessage({ type: '', text: '' });
                      }}
                      className="flex items-center gap-2 px-4 py-2.5 bg-white text-gray-600 rounded-xl font-medium hover:bg-gray-100 transition-all duration-200 hover:scale-105 shadow-lg"
                    >
                      <X className="h-4 w-4" />
                      <span>Cancel</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Message Alert */}
        {message.text && (
          <div className={`mb-6 p-4 rounded-xl flex items-center gap-3 animate-fadeIn shadow-sm ${
            message.type === 'success' 
              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
              : 'bg-red-50 text-red-700 border border-red-200'
          }`}>
            {message.type === 'success' ? 
              <CheckCircle className="h-5 w-5 flex-shrink-0" /> : 
              <AlertCircle className="h-5 w-5 flex-shrink-0" />
            }
            <span className="font-medium">{message.text}</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Stats Cards */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-gray-500" />
                Your Stats
              </h2>
              <div className="space-y-4">
                {stats.map((stat, index) => (
                  <div key={index} className={`p-4 rounded-xl border ${stat.border} ${stat.bg} hover:scale-[1.02] transition-transform duration-200`}>
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${stat.bg} ${stat.color}`}>
                        <stat.icon className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                        <div className="text-sm text-gray-600">{stat.label}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Zap className="h-5 w-5 text-amber-500" />
                Quick Actions
              </h2>
              <div className="space-y-3">
                {quickActions.map((action, index) => (
                  <button
                    key={index}
                    onClick={action.onClick}
                    className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-all duration-200 hover:scale-[1.02] group"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${action.bg}`}>
                        <action.icon className={`h-4 w-4 ${action.color}`} />
                      </div>
                      <span className="font-medium text-gray-700 group-hover:text-gray-900">{action.label}</span>
                    </div>
                    <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-gray-600" />
                  </button>
                ))}
              </div>
            </div>

            {/* Account Status */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Shield className="h-5 w-5 text-gray-500" />
                Account Status
              </h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Verification</span>
                  <span className="flex items-center gap-1 text-emerald-600 font-medium">
                    <CheckCircle className="h-4 w-4" />
                    Verified
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Account Type</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${userType.lightColor}`}>
                    {userType.label}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Member Since</span>
                  <span className="font-medium text-gray-900">
                    {new Date(userData.registrationDate || userData.joinDate || Date.now()).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Tabs */}
            <div className="flex items-center gap-2 mb-6 p-1 bg-gray-100 rounded-2xl">
              {['overview', 'settings', 'security'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                    activeTab === tab
                      ? `bg-white text-gray-900 shadow-sm ${userType.color.replace('from-', 'border-l-4 border-').split(' ')[0]}`
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            {renderTabContent()}

            {/* Danger Zone */}
            <div className="mt-8 bg-white rounded-2xl shadow-sm border border-red-100 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-red-500" />
                  Account Management
                </h2>
                <span className="text-xs text-red-600 bg-red-50 px-2 py-1 rounded-full">Danger Zone</span>
              </div>
              <div className="space-y-3">
                <button
                  onClick={handleLogout}
                  className="w-full text-left p-3 text-gray-600 hover:bg-gray-50 rounded-xl transition-colors flex items-center gap-3"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout from all devices</span>
                </button>
                <button
                  onClick={() => {
                    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
                      handleLogout();
                    }
                  }}
                  className="w-full text-left p-3 text-red-600 hover:bg-red-50 rounded-xl transition-colors flex items-center gap-3"
                >
                  <AlertCircle className="h-4 w-4" />
                  <span>Delete Account</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-12 py-8 border-t border-gray-100 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className={`bg-gradient-to-r ${userType.color} p-2 rounded-lg`}>
                <IconComponent className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-gray-900 font-medium">JeevanDaan Profile</p>
                <p className="text-sm text-gray-500">
                  Last updated: {userData.lastUpdated ? new Date(userData.lastUpdated).toLocaleString() : 'Never'}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-6">
              <button className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                <HelpCircle className="h-5 w-5" />
              </button>
              <button className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                <MessageSquare className="h-5 w-5" />
              </button>
              <button className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                <LifeBuoy className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ProfilePage;