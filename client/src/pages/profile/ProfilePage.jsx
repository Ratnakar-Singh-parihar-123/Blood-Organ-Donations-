import React, { useState, useEffect } from 'react';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Shield,
  Bell,
  Heart,
  Droplets,
  Clock,
  CheckCircle,
  Edit,
  Save,
  X,
  ChevronRight,
  Users,
  Award,
  TrendingUp,
  AlertCircle,
  Star,
  Upload,
  Eye,
  EyeOff,
  Settings,
  LogOut,
  ClipboardCheck,
  Activity,
  Home,
  Menu,
  Search,
  Lock,
  ChevronLeft,
  FileText,
  Smartphone
} from 'lucide-react';

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isAvailable, setIsAvailable] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [userData, setUserData] = useState({
    name: 'Dr. Sarah Johnson',
    role: 'blood_donor',
    email: 'sarah.johnson@example.com',
    phone: '+91 9876543210',
    bloodGroup: 'O+',
    location: 'Mumbai, Maharashtra',
    age: 32,
    weight: '65 kg',
    lastDonation: '2024-01-15',
    totalDonations: 8,
    verified: {
      email: true,
      phone: true,
      identity: true,
      medical: true
    },
    preferences: {
      notifications: true,
      emergencyAlerts: true,
      locationSharing: true,
      autoScheduling: false
    }
  });
  const [editData, setEditData] = useState({ ...userData });
  const [activeTab, setActiveTab] = useState('profile');
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [activeSection, setActiveSection] = useState('');

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Scroll to active section
  useEffect(() => {
    if (activeSection) {
      const element = document.getElementById(activeSection);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [activeSection]);

  // Mock donation history
  const donationHistory = [
    {
      id: 1,
      type: 'blood',
      date: '2024-01-15',
      hospital: 'Apollo Hospital',
      units: 1,
      status: 'completed',
      recipient: 'Emergency Surgery',
      time: '10:30 AM'
    },
    {
      id: 2,
      type: 'blood',
      date: '2023-11-22',
      hospital: 'Fortis Hospital',
      units: 1,
      status: 'completed',
      recipient: 'Accident Victim',
      time: '2:45 PM'
    },
    {
      id: 3,
      type: 'plasma',
      date: '2023-09-10',
      hospital: 'AIIMS Delhi',
      units: 1,
      status: 'completed',
      recipient: 'COVID-19 Patient',
      time: '11:15 AM'
    }
  ];

  // Mock upcoming appointments
  const upcomingAppointments = [
    {
      id: 1,
      type: 'blood',
      date: '2024-02-20',
      hospital: 'Max Healthcare',
      status: 'scheduled',
      time: '9:00 AM'
    }
  ];

  // Role configuration
  const roles = {
    blood_donor: {
      label: 'Blood Donor',
      icon: Droplets,
      color: 'from-rose-500 to-pink-500',
      bgColor: 'bg-gradient-to-r from-rose-500 to-pink-500',
      textColor: 'text-rose-600'
    },
    organ_donor: {
      label: 'Organ Donor',
      icon: Heart,
      color: 'from-purple-500 to-indigo-500',
      bgColor: 'bg-gradient-to-r from-purple-500 to-indigo-500',
      textColor: 'text-purple-600'
    },
    receiver: {
      label: 'Receiver',
      icon: User,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-gradient-to-r from-blue-500 to-cyan-500',
      textColor: 'text-blue-600'
    },
    hospital: {
      label: 'Hospital Staff',
      icon: Shield,
      color: 'from-emerald-500 to-green-500',
      bgColor: 'bg-gradient-to-r from-emerald-500 to-green-500',
      textColor: 'text-emerald-600'
    }
  };

  const currentRole = roles[userData.role];

  // Tabs for mobile
  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'activity', label: 'Activity', icon: Activity },
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'documents', label: 'Documents', icon: FileText }
  ];

  // Mobile menu sections
  const mobileSections = [
    { id: 'profile-card', label: 'Profile Overview', icon: User },
    { id: 'verification', label: 'Verification', icon: Shield },
    { id: 'appointments', label: 'Appointments', icon: Calendar },
    { id: 'donations', label: 'Donations', icon: Droplets },
    { id: 'preferences', label: 'Preferences', icon: Settings }
  ];

  // Handle edit toggle
  const handleEditToggle = () => {
    if (isEditing) {
      // Save changes
      setUserData(editData);
      setIsEditing(false);
    } else {
      setEditData(userData);
      setIsEditing(true);
    }
  };

  // Handle input changes
  const handleInputChange = (field, value) => {
    setEditData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Handle preference toggle
  const handlePreferenceToggle = (preference) => {
    setUserData(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [preference]: !prev.preferences[preference]
      }
    }));
  };

  // Blood groups
  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];

  // Status text based on availability and role
  const getStatusText = () => {
    if (!isAvailable) return 'Currently Unavailable';
    if (userData.role === 'blood_donor') return 'Available for Donation';
    if (userData.role === 'organ_donor') return 'Registered Organ Donor';
    if (userData.role === 'receiver') return 'Active Patient';
    return 'Hospital Staff';
  };

  // Format date
  const formatDate = (dateString) => {
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-IN', options);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      
      {/* Mobile Header */}
      {isMobile && (
        <div className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
          <div className="px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <button className="p-2">
                  <ChevronLeft className="h-5 w-5 text-gray-700" />
                </button>
                <div>
                  <h1 className="text-lg font-bold text-gray-900">My Profile</h1>
                  <p className="text-xs text-gray-600">{currentRole.label}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button className="p-2">
                  <Search className="h-5 w-5 text-gray-600" />
                </button>
                <button 
                  onClick={() => setShowMobileMenu(!showMobileMenu)}
                  className="p-2"
                >
                  <Menu className="h-5 w-5 text-gray-600" />
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Tabs */}
          <div className="flex overflow-x-auto border-t border-gray-100">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 min-w-0 px-4 py-3 text-center transition-colors ${
                  activeTab === tab.id
                    ? 'text-rose-500 border-b-2 border-rose-500 bg-rose-50'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <div className="flex flex-col items-center space-y-1">
                  <tab.icon className="h-4 w-4" />
                  <span className="text-xs font-medium">{tab.label}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Desktop Header */}
      {!isMobile && (
        <div className="bg-gradient-to-r from-rose-50 via-pink-50 to-rose-50 border-b border-rose-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center space-x-3">
                <button className="p-2 hover:bg-white/50 rounded-lg transition-colors">
                  <Home className="h-6 w-6 text-gray-700" />
                </button>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
                  <p className="text-gray-600">Manage your account and donation preferences</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <button className="p-3 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                  <Settings className="h-5 w-5 text-gray-600" />
                </button>
                <button className="p-3 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                  <LogOut className="h-5 w-5 text-gray-600" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Navigation Menu */}
      {isMobile && showMobileMenu && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
          <div className="absolute right-0 top-0 bottom-0 w-64 bg-white shadow-xl">
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="font-bold text-gray-900">Quick Navigation</h2>
                <button 
                  onClick={() => setShowMobileMenu(false)}
                  className="p-2"
                >
                  <X className="h-5 w-5 text-gray-600" />
                </button>
              </div>
            </div>
            <div className="p-2">
              {mobileSections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => {
                    setActiveSection(section.id);
                    setShowMobileMenu(false);
                  }}
                  className="w-full flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <section.icon className="h-5 w-5 text-gray-500" />
                  <span className="text-gray-700">{section.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <main className="max-w-7xl mx-auto px-4 py-4 sm:py-8">
        {isMobile ? (
          /* Mobile Layout */
          <div className="space-y-6">
            {/* Profile Card (Mobile) */}
            <div id="profile-card" className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
              <div className={`${currentRole.bgColor} p-6 text-white`}>
                <div className="flex flex-col items-center text-center">
                  {/* Profile Avatar */}
                  <div className="relative mb-4">
                    <div className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-sm border-4 border-white/50 flex items-center justify-center">
                      <User className="h-12 w-12 text-white" />
                    </div>
                    <button className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-lg">
                      <Edit className="h-4 w-4 text-rose-500" />
                    </button>
                  </div>

                  {/* User Info */}
                  <h2 className="text-xl font-bold mb-1">{userData.name}</h2>
                  <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full mb-3">
                    <currentRole.icon className="h-3 w-3" />
                    <span className="text-sm font-medium">{currentRole.label}</span>
                  </div>

                  {/* Availability Toggle */}
                  <div className="w-full bg-white/20 backdrop-blur-sm rounded-xl p-3">
                    <div className="flex items-center justify-between">
                      <div className="text-left">
                        <div className="text-sm font-semibold">{getStatusText()}</div>
                        <div className="text-xs text-white/90">
                          {isAvailable ? 'Ready to help' : 'Taking a break'}
                        </div>
                      </div>
                      <button
                        onClick={() => setIsAvailable(!isAvailable)}
                        className={`relative inline-flex h-6 w-12 items-center rounded-full transition-colors ${
                          isAvailable ? 'bg-emerald-500' : 'bg-gray-400'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            isAvailable ? 'translate-x-7' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="p-4 bg-gradient-to-br from-gray-50 to-white">
                <div className="grid grid-cols-3 gap-3">
                  <div className="text-center p-3 bg-white rounded-xl border border-gray-200">
                    <div className="text-lg font-bold text-gray-900">{userData.totalDonations}</div>
                    <div className="text-xs text-gray-600">Donations</div>
                  </div>
                  <div className="text-center p-3 bg-white rounded-xl border border-gray-200">
                    <div className="text-lg font-bold text-gray-900">{userData.totalDonations * 3}</div>
                    <div className="text-xs text-gray-600">Lives Saved</div>
                  </div>
                  <div className="text-center p-3 bg-white rounded-xl border border-gray-200">
                    <div className="text-lg font-bold text-gray-900">24</div>
                    <div className="text-xs text-gray-600">Months</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tab Content - Mobile */}
            {activeTab === 'profile' && (
              <div className="space-y-6">
                {/* Personal Info Card */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-gray-900">Personal Information</h3>
                    <button
                      onClick={handleEditToggle}
                      className="flex items-center space-x-1 px-3 py-1.5 bg-gradient-to-r from-rose-500 to-rose-400 text-white rounded-lg font-medium text-sm"
                    >
                      {isEditing ? (
                        <>
                          <Save className="h-3 w-3" />
                          <span>Save</span>
                        </>
                      ) : (
                        <>
                          <Edit className="h-3 w-3" />
                          <span>Edit</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div className="space-y-4">
                    {/* Name */}
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Full Name
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                          type="text"
                          value={isEditing ? editData.name : userData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          disabled={!isEditing}
                          className="w-full pl-10 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-rose-300 focus:border-transparent disabled:opacity-70 text-sm"
                        />
                      </div>
                    </div>

                    {/* Email & Phone */}
                    <div className="grid grid-cols-1 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          Email
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                          <input
                            type="email"
                            value={isEditing ? editData.email : userData.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            disabled={!isEditing}
                            className="w-full pl-10 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-rose-300 focus:border-transparent disabled:opacity-70 text-sm"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          Phone
                        </label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                          <input
                            type="tel"
                            value={isEditing ? editData.phone : userData.phone}
                            onChange={(e) => handleInputChange('phone', e.target.value)}
                            disabled={!isEditing}
                            className="w-full pl-10 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-rose-300 focus:border-transparent disabled:opacity-70 text-sm"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Blood Group & Location */}
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          Blood Group
                        </label>
                        <div className="relative">
                          <Droplets className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                          {isEditing ? (
                            <select
                              value={editData.bloodGroup}
                              onChange={(e) => handleInputChange('bloodGroup', e.target.value)}
                              className="w-full pl-10 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-rose-300 focus:border-transparent text-sm"
                            >
                              <option value="">Select</option>
                              {bloodGroups.map(group => (
                                <option key={group} value={group}>{group}</option>
                              ))}
                            </select>
                          ) : (
                            <div className="w-full pl-10 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg">
                              <span className="font-bold text-rose-600 text-sm">{userData.bloodGroup}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          Location
                        </label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                          <input
                            type="text"
                            value={isEditing ? editData.location : userData.location}
                            onChange={(e) => handleInputChange('location', e.target.value)}
                            disabled={!isEditing}
                            className="w-full pl-10 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-rose-300 focus:border-transparent disabled:opacity-70 text-sm"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Age & Weight */}
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          Age
                        </label>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                          <input
                            type="number"
                            value={isEditing ? editData.age : userData.age}
                            onChange={(e) => handleInputChange('age', e.target.value)}
                            disabled={!isEditing}
                            className="w-full pl-10 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-rose-300 focus:border-transparent disabled:opacity-70 text-sm"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          Weight
                        </label>
                        <input
                          type="text"
                          value={isEditing ? editData.weight : userData.weight}
                          onChange={(e) => handleInputChange('weight', e.target.value)}
                          disabled={!isEditing}
                          className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-rose-300 focus:border-transparent disabled:opacity-70 text-sm"
                        />
                      </div>
                    </div>

                    {/* Password Change (Editing Mode Only) */}
                    {isEditing && (
                      <div className="pt-4 border-t border-gray-200">
                        <h4 className="text-sm font-semibold text-gray-900 mb-3">Change Password</h4>
                        <div className="space-y-3">
                          <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">
                              New Password
                            </label>
                            <div className="relative">
                              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                              <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full pl-10 pr-10 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-rose-300 focus:border-transparent text-sm"
                                placeholder="New password"
                              />
                              <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                              >
                                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                              </button>
                            </div>
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">
                              Confirm Password
                            </label>
                            <input
                              type="password"
                              className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-rose-300 focus:border-transparent text-sm"
                              placeholder="Confirm password"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Verification Status */}
                <div id="verification" className="bg-white rounded-2xl shadow-lg border border-gray-200 p-4">
                  <div className="flex items-center space-x-2 mb-4">
                    <Shield className="h-5 w-5 text-emerald-500" />
                    <div>
                      <h3 className="font-bold text-gray-900">Verification Status</h3>
                      <p className="text-xs text-gray-600">Account security level</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {Object.entries(userData.verified).map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className={`p-2 rounded-lg ${value ? 'bg-emerald-100' : 'bg-gray-100'}`}>
                            <CheckCircle className={`h-3 w-3 ${value ? 'text-emerald-500' : 'text-gray-400'}`} />
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-900 capitalize">{key}</div>
                            <div className="text-xs text-gray-500">{value ? 'Verified' : 'Pending'}</div>
                          </div>
                        </div>
                        {value ? (
                          <CheckCircle className="h-4 w-4 text-emerald-500" />
                        ) : (
                          <button className="text-xs text-rose-500 font-medium">
                            Verify
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'activity' && (
              <div className="space-y-6">
                {/* Donation History */}
                <div id="donations" className="bg-white rounded-2xl shadow-lg border border-gray-200 p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-bold text-gray-900">Donation History</h3>
                      <p className="text-xs text-gray-600">Your life-saving contributions</p>
                    </div>
                    <button className="text-xs text-rose-500 font-medium">
                      View All
                    </button>
                  </div>

                  <div className="space-y-4">
                    {donationHistory.map((donation) => (
                      <div key={donation.id} className="p-3 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-200">
                        <div className="flex items-start space-x-3">
                          <div className={`p-2 rounded-lg ${donation.type === 'blood' ? 'bg-rose-100' : 'bg-blue-100'}`}>
                            {donation.type === 'blood' ? (
                              <Droplets className="h-4 w-4 text-rose-500" />
                            ) : (
                              <Heart className="h-4 w-4 text-blue-500" fill="#3b82f6" />
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between items-start mb-1">
                              <div>
                                <h4 className="font-semibold text-gray-900 text-sm">
                                  {donation.type === 'blood' ? 'Blood Donation' : 'Plasma Donation'}
                                </h4>
                                <p className="text-xs text-gray-600">{donation.hospital}</p>
                              </div>
                              <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full">
                                Completed
                              </span>
                            </div>
                            <div className="flex justify-between items-center">
                              <div className="text-xs text-gray-500">
                                {formatDate(donation.date)} • {donation.time}
                              </div>
                              <div className="text-xs font-medium text-gray-900">
                                {donation.units} unit{donation.units > 1 ? 's' : ''}
                              </div>
                            </div>
                            <div className="mt-2 text-xs text-gray-700">
                              Helped: <span className="font-medium">{donation.recipient}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Impact Summary */}
                  <div className="mt-6 p-4 bg-gradient-to-r from-rose-50 to-pink-50 rounded-xl border border-rose-200">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold text-gray-900 text-sm">Your Impact</h4>
                      <TrendingUp className="h-4 w-4 text-rose-500" />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="text-center p-2 bg-white rounded-lg border border-rose-200">
                        <div className="text-lg font-bold text-rose-600">{userData.totalDonations}</div>
                        <div className="text-xs text-gray-600">Donations</div>
                      </div>
                      <div className="text-center p-2 bg-white rounded-lg border border-rose-200">
                        <div className="text-lg font-bold text-rose-600">{userData.totalDonations * 3}</div>
                        <div className="text-xs text-gray-600">Lives Saved</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Upcoming Appointments */}
                {upcomingAppointments.length > 0 && (
                  <div id="appointments" className="bg-white rounded-2xl shadow-lg border border-gray-200 p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-bold text-gray-900">Upcoming Appointments</h3>
                      <Calendar className="h-5 w-5 text-gray-400" />
                    </div>
                    <div className="space-y-3">
                      {upcomingAppointments.map((appointment) => (
                        <div key={appointment.id} className="p-3 bg-gradient-to-r from-rose-50 to-pink-50 rounded-xl border border-rose-200">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center space-x-2">
                              <Clock className="h-4 w-4 text-rose-500" />
                              <span className="font-medium text-gray-900 text-sm">
                                {appointment.type === 'blood' ? 'Blood Donation' : 'Organ Screening'}
                              </span>
                            </div>
                            <span className="text-xs bg-white px-2 py-1 rounded-full border border-rose-200 text-rose-600">
                              Scheduled
                            </span>
                          </div>
                          <div className="text-xs text-gray-600 mb-1">{appointment.hospital}</div>
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-gray-500">{formatDate(appointment.date)} • {appointment.time}</span>
                            <button className="text-rose-500 font-medium">
                              Details →
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'settings' && (
              <div id="preferences" className="space-y-6">
                {/* Availability Settings */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-4">
                  <div className="flex items-center space-x-2 mb-4">
                    <Clock className="h-5 w-5 text-rose-500" />
                    <div>
                      <h3 className="font-bold text-gray-900">Availability</h3>
                      <p className="text-xs text-gray-600">Set your donation availability</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <div className="font-medium text-gray-900 text-sm">Available for Donation</div>
                        <div className="text-xs text-gray-600">Receive emergency requests</div>
                      </div>
                      <button
                        onClick={() => setIsAvailable(!isAvailable)}
                        className={`relative inline-flex h-5 w-10 items-center rounded-full transition-colors ${
                          isAvailable ? 'bg-emerald-500' : 'bg-gray-400'
                        }`}
                      >
                        <span
                          className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
                            isAvailable ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Notification Settings */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-4">
                  <div className="flex items-center space-x-2 mb-4">
                    <Bell className="h-5 w-5 text-rose-500" />
                    <div>
                      <h3 className="font-bold text-gray-900">Notifications</h3>
                      <p className="text-xs text-gray-600">How we communicate with you</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    {Object.entries(userData.preferences).map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <div className="font-medium text-gray-900 text-sm capitalize">{key.replace(/([A-Z])/g, ' $1')}</div>
                          <div className="text-xs text-gray-600">
                            {key === 'emergencyAlerts' && 'Critical blood/organ requests'}
                            {key === 'notifications' && 'General updates'}
                            {key === 'locationSharing' && 'Share location'}
                            {key === 'autoScheduling' && 'Auto appointments'}
                          </div>
                        </div>
                        <button
                          onClick={() => handlePreferenceToggle(key)}
                          className={`relative inline-flex h-5 w-10 items-center rounded-full transition-colors ${
                            value ? 'bg-rose-500' : 'bg-gray-400'
                          }`}
                        >
                          <span
                            className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
                              value ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Supportive CTA - Mobile */}
                <div className="bg-gradient-to-r from-rose-50 to-pink-50 rounded-2xl p-6 border border-rose-200">
                  <div className="text-center">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      {userData.role === 'organ_donor' 
                        ? 'Share Your Legacy' 
                        : 'Ready to Save Lives?'}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">
                      {userData.role === 'organ_donor'
                        ? 'Register as an organ donor and save up to 8 lives'
                        : 'Keep your profile updated to respond faster in emergencies'}
                    </p>
                    <button className="w-full py-3 bg-gradient-to-r from-rose-500 to-rose-400 text-white rounded-xl font-semibold text-sm hover:shadow-lg transition-all flex items-center justify-center space-x-2">
                      {userData.role === 'organ_donor' ? (
                        <>
                          <Heart className="h-4 w-4" fill="white" />
                          <span>Register Organ Donor</span>
                        </>
                      ) : (
                        <>
                          <Droplets className="h-4 w-4" />
                          <span>Schedule Donation</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Desktop Layout */
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Profile Card & Stats */}
            <div className="lg:col-span-1 space-y-8">
              
              {/* Profile Card */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
                {/* Profile Header */}
                <div className={`${currentRole.bgColor} p-8 text-white`}>
                  <div className="flex flex-col items-center text-center">
                    {/* Profile Avatar */}
                    <div className="relative mb-6">
                      <div className="w-32 h-32 rounded-full bg-white/20 backdrop-blur-sm border-4 border-white/50 flex items-center justify-center">
                        <User className="h-16 w-16 text-white" />
                      </div>
                      <button className="absolute bottom-2 right-2 bg-white p-2 rounded-full shadow-lg hover:shadow-xl transition-shadow">
                        <Edit className="h-4 w-4 text-rose-500" />
                      </button>
                    </div>

                    {/* User Info */}
                    <h2 className="text-2xl font-bold mb-2">{userData.name}</h2>
                    <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-4">
                      <currentRole.icon className="h-4 w-4" />
                      <span className="font-medium">{currentRole.label}</span>
                    </div>

                    {/* Availability Toggle */}
                    <div className="w-full bg-white/20 backdrop-blur-sm rounded-xl p-4">
                      <div className="flex items-center justify-between">
                        <div className="text-left">
                          <div className="font-semibold">{getStatusText()}</div>
                          <div className="text-sm text-white/90">
                            {isAvailable ? 'Ready to help in emergencies' : 'Taking a break'}
                          </div>
                        </div>
                        <button
                          onClick={() => setIsAvailable(!isAvailable)}
                          className={`relative inline-flex h-8 w-16 items-center rounded-full transition-colors ${
                            isAvailable ? 'bg-emerald-500' : 'bg-gray-400'
                          }`}
                        >
                          <span
                            className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                              isAvailable ? 'translate-x-9' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="p-6 bg-gradient-to-br from-gray-50 to-white">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900">{userData.totalDonations}</div>
                      <div className="text-sm text-gray-600">Donations</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900">3</div>
                      <div className="text-sm text-gray-600">Lives Saved</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900">24</div>
                      <div className="text-sm text-gray-600">Months Active</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Verification Status */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                <div className="flex items-center space-x-3 mb-6">
                  <Shield className="h-6 w-6 text-emerald-500" />
                  <div>
                    <h3 className="font-bold text-gray-900">Verification Status</h3>
                    <p className="text-sm text-gray-600">Your account security level</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {Object.entries(userData.verified).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-lg ${
                          value ? 'bg-emerald-100' : 'bg-gray-100'
                        }`}>
                          <CheckCircle className={`h-4 w-4 ${
                            value ? 'text-emerald-500' : 'text-gray-400'
                          }`} />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900 capitalize">{key}</div>
                          <div className="text-xs text-gray-500">
                            {value ? 'Verified' : 'Pending'}
                          </div>
                        </div>
                      </div>
                      {value ? (
                        <CheckCircle className="h-5 w-5 text-emerald-500" />
                      ) : (
                        <button className="text-sm text-rose-500 hover:text-rose-600 font-medium">
                          Verify
                        </button>
                      )}
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-200">
                  <div className="flex items-center space-x-3">
                    <Shield className="h-5 w-5 text-blue-500" />
                    <div className="text-sm text-gray-700">
                      Verified donors get priority in emergency matching
                    </div>
                  </div>
                </div>
              </div>

              {/* Upcoming Appointments */}
              {upcomingAppointments.length > 0 && (
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-bold text-gray-900">Upcoming Appointments</h3>
                    <Calendar className="h-5 w-5 text-gray-400" />
                  </div>
                  <div className="space-y-4">
                    {upcomingAppointments.map((appointment) => (
                      <div key={appointment.id} className="p-4 bg-gradient-to-r from-rose-50 to-pink-50 rounded-xl border border-rose-200">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <Clock className="h-4 w-4 text-rose-500" />
                            <span className="font-medium text-gray-900">{appointment.type === 'blood' ? 'Blood Donation' : 'Organ Screening'}</span>
                          </div>
                          <div className="text-sm bg-white px-3 py-1 rounded-full border border-rose-200 text-rose-600">
                            Scheduled
                          </div>
                        </div>
                        <div className="text-sm text-gray-600 mb-2">{appointment.hospital}</div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-500">{formatDate(appointment.date)} • {appointment.time}</span>
                          <button className="text-rose-500 hover:text-rose-600 font-medium">
                            View Details →
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column - Main Content */}
            <div className="lg:col-span-2 space-y-8">
              
              {/* Tabs Navigation */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
                <div className="flex overflow-x-auto">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex-1 px-6 py-4 font-semibold whitespace-nowrap transition-colors ${
                        activeTab === tab.id
                          ? 'text-rose-500 border-b-2 border-rose-500'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tab Content - Desktop */}
              <div className="space-y-8">
                {activeTab === 'profile' && (
                  <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-8">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">Personal Information</h3>
                        <p className="text-gray-600">Keep your profile updated for better matches</p>
                      </div>
                      <button
                        onClick={handleEditToggle}
                        className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-rose-500 to-rose-400 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
                      >
                        {isEditing ? (
                          <>
                            <Save className="h-4 w-4" />
                            <span>Save Changes</span>
                          </>
                        ) : (
                          <>
                            <Edit className="h-4 w-4" />
                            <span>Edit Profile</span>
                          </>
                        )}
                      </button>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Name */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Full Name
                        </label>
                        <div className="relative">
                          <User className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                          <input
                            type="text"
                            value={isEditing ? editData.name : userData.name}
                            onChange={(e) => handleInputChange('name', e.target.value)}
                            disabled={!isEditing}
                            className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-transparent disabled:opacity-70"
                          />
                        </div>
                      </div>

                      {/* Email */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email Address
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                          <input
                            type="email"
                            value={isEditing ? editData.email : userData.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            disabled={!isEditing}
                            className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-transparent disabled:opacity-70"
                          />
                        </div>
                      </div>

                      {/* Phone */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Phone Number
                        </label>
                        <div className="relative">
                          <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                          <input
                            type="tel"
                            value={isEditing ? editData.phone : userData.phone}
                            onChange={(e) => handleInputChange('phone', e.target.value)}
                            disabled={!isEditing}
                            className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-transparent disabled:opacity-70"
                          />
                        </div>
                      </div>

                      {/* Blood Group */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Blood Group
                        </label>
                        <div className="relative">
                          <Droplets className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                          {isEditing ? (
                            <select
                              value={editData.bloodGroup}
                              onChange={(e) => handleInputChange('bloodGroup', e.target.value)}
                              className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-transparent"
                            >
                              <option value="">Select Blood Group</option>
                              {bloodGroups.map(group => (
                                <option key={group} value={group}>{group}</option>
                              ))}
                            </select>
                          ) : (
                            <div className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl">
                              <span className="text-lg font-bold text-rose-600">{userData.bloodGroup}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Location */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Location
                        </label>
                        <div className="relative">
                          <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                          <input
                            type="text"
                            value={isEditing ? editData.location : userData.location}
                            onChange={(e) => handleInputChange('location', e.target.value)}
                            disabled={!isEditing}
                            className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-transparent disabled:opacity-70"
                          />
                        </div>
                      </div>

                      {/* Age */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Age
                        </label>
                        <div className="relative">
                          <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                          <input
                            type="number"
                            value={isEditing ? editData.age : userData.age}
                            onChange={(e) => handleInputChange('age', e.target.value)}
                            disabled={!isEditing}
                            className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-transparent disabled:opacity-70"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Password Change (Editing Mode Only) */}
                    {isEditing && (
                      <div className="mt-8 pt-8 border-t border-gray-200">
                        <h4 className="text-lg font-semibold text-gray-900 mb-6">Change Password</h4>
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              New Password
                            </label>
                            <div className="relative">
                              <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                              <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full pl-12 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-transparent"
                                placeholder="Enter new password"
                              />
                              <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                              >
                                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                              </button>
                            </div>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Confirm Password
                            </label>
                            <input
                              type="password"
                              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-transparent"
                              placeholder="Confirm new password"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'activity' && (
                  <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-8">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">Donation Activity</h3>
                        <p className="text-gray-600">Your donation history and impact</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors">
                          Last 6 Months
                        </button>
                        <button className="p-2 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors">
                          <Activity className="h-5 w-5 text-gray-600" />
                        </button>
                      </div>
                    </div>

                    {donationHistory.length > 0 ? (
                      <div className="space-y-6">
                        {donationHistory.map((donation) => (
                          <div key={donation.id} className="flex items-start p-6 bg-gradient-to-r from-gray-50 to-white rounded-2xl border border-gray-200 hover:shadow-md transition-shadow">
                            <div className="p-3 bg-gradient-to-r from-rose-100 to-pink-100 rounded-xl mr-4">
                              {donation.type === 'blood' ? (
                                <Droplets className="h-6 w-6 text-rose-500" />
                              ) : (
                                <Heart className="h-6 w-6 text-rose-500" fill="#f43f5e" />
                              )}
                            </div>
                            <div className="flex-1">
                              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-3">
                                <div>
                                  <h4 className="font-bold text-gray-900">
                                    {donation.type === 'blood' ? 'Blood Donation' : 'Plasma Donation'}
                                  </h4>
                                  <p className="text-sm text-gray-600">{donation.hospital}</p>
                                </div>
                                <div className="flex items-center space-x-4">
                                  <div className="text-right">
                                    <div className="font-semibold text-gray-900">{formatDate(donation.date)}</div>
                                    <div className="text-sm text-gray-600">{donation.units} unit{donation.units > 1 ? 's' : ''}</div>
                                  </div>
                                  <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                                    donation.status === 'completed'
                                      ? 'bg-emerald-100 text-emerald-700'
                                      : 'bg-amber-100 text-amber-700'
                                  }`}>
                                    {donation.status}
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center justify-between">
                                <div className="text-sm text-gray-600">
                                  Helped: <span className="font-medium text-gray-900">{donation.recipient}</span>
                                </div>
                                <button className="text-rose-500 hover:text-rose-600 font-medium text-sm">
                                  View Certificate →
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                        <h4 className="text-lg font-semibold text-gray-900 mb-2">No Donations Yet</h4>
                        <p className="text-gray-600 mb-6 max-w-md mx-auto">
                          You haven't made any donations yet. Your first donation can save up to 3 lives!
                        </p>
                        <button className="px-6 py-3 bg-gradient-to-r from-rose-500 to-rose-400 text-white rounded-xl font-semibold hover:shadow-lg transition-all">
                          Schedule Your First Donation
                        </button>
                      </div>
                    )}

                    {/* Impact Summary */}
                    <div className="mt-8 p-6 bg-gradient-to-r from-rose-50 to-pink-50 rounded-2xl border border-rose-200">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-bold text-gray-900">Your Impact Summary</h4>
                        <TrendingUp className="h-6 w-6 text-rose-500" />
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="text-center p-4 bg-white rounded-xl border border-rose-200">
                          <div className="text-2xl font-bold text-rose-600">{userData.totalDonations}</div>
                          <div className="text-sm text-gray-600">Total Donations</div>
                        </div>
                        <div className="text-center p-4 bg-white rounded-xl border border-rose-200">
                          <div className="text-2xl font-bold text-rose-600">{userData.totalDonations * 3}</div>
                          <div className="text-sm text-gray-600">Lives Impacted</div>
                        </div>
                        <div className="text-center p-4 bg-white rounded-xl border border-rose-200">
                          <div className="text-2xl font-bold text-rose-600">24</div>
                          <div className="text-sm text-gray-600">Months Active</div>
                        </div>
                        <div className="text-center p-4 bg-white rounded-xl border border-rose-200">
                          <div className="text-2xl font-bold text-rose-600">Top 10%</div>
                          <div className="text-sm text-gray-600">Among Donors</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'settings' && (
                  <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                    <div className="mb-8">
                      <h3 className="text-xl font-bold text-gray-900">Preferences & Settings</h3>
                      <p className="text-gray-600">Customize your donation experience</p>
                    </div>

                    <div className="space-y-8">
                      {/* Availability Settings */}
                      <div>
                        <div className="flex items-center space-x-3 mb-6">
                          <Clock className="h-6 w-6 text-rose-500" />
                          <div>
                            <h4 className="font-bold text-gray-900">Availability Settings</h4>
                            <p className="text-sm text-gray-600">When you're ready to donate</p>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                            <div>
                              <div className="font-medium text-gray-900">Available for Donation</div>
                              <div className="text-sm text-gray-600">Receive emergency requests</div>
                            </div>
                            <button
                              onClick={() => setIsAvailable(!isAvailable)}
                              className={`relative inline-flex h-6 w-12 items-center rounded-full transition-colors ${
                                isAvailable ? 'bg-emerald-500' : 'bg-gray-400'
                              }`}
                            >
                              <span
                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                  isAvailable ? 'translate-x-7' : 'translate-x-1'
                                }`}
                              />
                            </button>
                          </div>
                          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                            <div>
                              <div className="font-medium text-gray-900">Auto-Scheduling</div>
                              <div className="text-sm text-gray-600">Automatic appointment suggestions</div>
                            </div>
                            <button
                              onClick={() => handlePreferenceToggle('autoScheduling')}
                              className={`relative inline-flex h-6 w-12 items-center rounded-full transition-colors ${
                                userData.preferences.autoScheduling ? 'bg-rose-500' : 'bg-gray-400'
                              }`}
                            >
                              <span
                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                  userData.preferences.autoScheduling ? 'translate-x-7' : 'translate-x-1'
                                }`}
                              />
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Notification Settings */}
                      <div>
                        <div className="flex items-center space-x-3 mb-6">
                          <Bell className="h-6 w-6 text-rose-500" />
                          <div>
                            <h4 className="font-bold text-gray-900">Notification Preferences</h4>
                            <p className="text-sm text-gray-600">How we communicate with you</p>
                          </div>
                        </div>
                        <div className="space-y-4">
                          {Object.entries(userData.preferences).map(([key, value]) => (
                            <div key={key} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                              <div>
                                <div className="font-medium text-gray-900 capitalize">{key.replace(/([A-Z])/g, ' $1')}</div>
                                <div className="text-sm text-gray-600">
                                  {key === 'emergencyAlerts' && 'Critical blood/organ requests'}
                                  {key === 'notifications' && 'General updates and reminders'}
                                  {key === 'locationSharing' && 'Share location for better matching'}
                                </div>
                              </div>
                              <button
                                onClick={() => handlePreferenceToggle(key)}
                                className={`relative inline-flex h-6 w-12 items-center rounded-full transition-colors ${
                                  value ? 'bg-rose-500' : 'bg-gray-400'
                                }`}
                              >
                                <span
                                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                    value ? 'translate-x-7' : 'translate-x-1'
                                  }`}
                                />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Supportive CTA - Desktop */}
              <div className="bg-gradient-to-r from-rose-50 to-pink-50 rounded-2xl p-8 border border-rose-200">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">
                      {userData.role === 'organ_donor' 
                        ? 'Share Your Legacy' 
                        : userData.role === 'receiver'
                        ? 'Need Emergency Help?'
                        : 'Ready to Save Lives?'}
                    </h3>
                    <p className="text-gray-600 max-w-lg">
                      {userData.role === 'organ_donor'
                        ? 'Register as an organ donor and save up to 8 lives. Leave the ultimate legacy of life.'
                        : userData.role === 'receiver'
                        ? 'Update your medical information to get faster matches with potential donors.'
                        : 'Keep your profile updated and availability on to respond faster in emergencies.'}
                    </p>
                  </div>
                  <button className="px-8 py-4 bg-gradient-to-r from-rose-500 to-rose-400 text-white rounded-xl font-semibold text-lg hover:shadow-lg transition-all flex items-center space-x-3 whitespace-nowrap">
                    {userData.role === 'organ_donor' ? (
                      <>
                        <Heart className="h-6 w-6" fill="white" />
                        <span>Register Organ Donor</span>
                      </>
                    ) : userData.role === 'receiver' ? (
                      <>
                        <AlertCircle className="h-6 w-6" />
                        <span>Emergency Help</span>
                      </>
                    ) : (
                      <>
                        <Droplets className="h-6 w-6" />
                        <span>Schedule Donation</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Mobile Bottom Navigation */}
      {isMobile && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-40">
          <div className="flex justify-around items-center p-3">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-col items-center space-y-1 p-2 rounded-xl transition-colors ${
                  activeTab === tab.id ? 'bg-rose-50 text-rose-500' : 'text-gray-500'
                }`}
              >
                <tab.icon className="h-5 w-5" />
                <span className="text-xs font-medium">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Mobile Content Padding */}
      {isMobile && <div className="h-20"></div>}

      {/* Custom Styles for Mobile Optimization */}
      <style jsx global>{`
        /* Better mobile touch targets */
        @media (max-width: 768px) {
          button, 
          [role="button"],
          input,
          select,
          textarea {
            min-height: 44px;
            font-size: 16px !important; /* Prevent zoom on iOS */
          }
          
          /* Hide scrollbar for cleaner look */
          .hide-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
          
          .hide-scrollbar::-webkit-scrollbar {
            display: none;
          }
        }
        
        /* Smooth transitions */
        .smooth-transition {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
      `}</style>
    </div>
  );
};

export default ProfilePage;