import React, { useState } from 'react';
import {
  Bell,
  Shield,
  Lock,
  User,
  Globe,
  MapPin,
  Heart,
  HelpCircle,
  Mail,
  LogOut,
  AlertTriangle,
  Trash2,
  Smartphone,
  CheckCircle,
  Eye,
  EyeOff,
  ChevronRight,
  X,
  ShieldAlert,
  Languages,
  Calendar,
  Users,
  Settings as SettingsIcon,
  Key
} from 'lucide-react';

const SettingsPage = () => {
  const [notifications, setNotifications] = useState({
    emergencyAlerts: true,
    donorRequests: true,
    emailUpdates: false,
    smsNotifications: true,
    donationReminders: true,
    bloodRequests: true,
    organRequests: false,
    hospitalAlerts: true
  });

  const [privacy, setPrivacy] = useState({
    showLocation: true,
    showDonationHistory: false,
    shareWithHospitals: true,
    anonymousMode: false
  });

  const [accountPrefs, setAccountPrefs] = useState({
    language: 'english',
    donationType: 'both',
    availability: 'available',
    defaultLocation: 'auto'
  });

  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showTwoFactorModal, setShowTwoFactorModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDeactivateModal, setShowDeactivateModal] = useState(false);
  const [showActiveSessions, setShowActiveSessions] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordData, setPasswordData] = useState({
    current: '',
    new: '',
    confirm: ''
  });

  // Mock active sessions
  const activeSessions = [
    {
      id: 1,
      device: 'iPhone 13',
      browser: 'Safari',
      location: 'Mumbai, India',
      lastActive: '2 hours ago',
      current: true
    },
    {
      id: 2,
      device: 'MacBook Pro',
      browser: 'Chrome',
      location: 'Mumbai, India',
      lastActive: '1 day ago',
      current: false
    },
    {
      id: 3,
      device: 'Android Phone',
      browser: 'Firefox',
      location: 'Delhi, India',
      lastActive: '1 week ago',
      current: false
    }
  ];

  const languages = [
    { code: 'english', name: 'English' },
    { code: 'hindi', name: 'हिन्दी' },
    { code: 'spanish', name: 'Español' },
    { code: 'french', name: 'Français' }
  ];

  const donationTypes = [
    { id: 'blood', label: 'Blood Only', icon: Heart },
    { id: 'organ', label: 'Organ Only', icon: Users },
    { id: 'both', label: 'Both', icon: Calendar }
  ];

  const availabilityOptions = [
    { id: 'available', label: 'Available for emergencies' },
    { id: 'limited', label: 'Limited availability' },
    { id: 'busy', label: 'Currently busy' },
    { id: 'vacation', label: 'On vacation/break' }
  ];

  // Toggle notification
  const toggleNotification = (key) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  // Toggle privacy setting
  const togglePrivacy = (key) => {
    setPrivacy(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  // Update account preference
  const updateAccountPref = (key, value) => {
    setAccountPrefs(prev => ({
      ...prev,
      [key]: value
    }));
  };

  // Handle password change
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Submit password change
  const submitPasswordChange = () => {
    // Validate passwords
    if (passwordData.new !== passwordData.confirm) {
      alert('New passwords do not match');
      return;
    }
    if (passwordData.new.length < 6) {
      alert('Password must be at least 6 characters');
      return;
    }
    
    // Here you would typically make an API call
    alert('Password changed successfully');
    setPasswordData({ current: '', new: '', confirm: '' });
    setShowChangePassword(false);
  };

  // Handle account deactivation
  const handleDeactivateAccount = () => {
    // API call would go here
    alert('Account has been deactivated');
    setShowDeactivateModal(false);
  };

  // Handle account deletion
  const handleDeleteAccount = () => {
    // API call would go here
    alert('Account has been deleted');
    setShowDeleteModal(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-white to-rose-50 border-b border-rose-100">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-rose-500 to-rose-400 rounded-xl">
              <SettingsIcon className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
              <p className="text-gray-600">Manage your preferences and security</p>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="space-y-8">
          
          {/* Notifications Settings */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center space-x-3">
                <Bell className="h-6 w-6 text-rose-500" />
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Notifications</h2>
                  <p className="text-gray-600">Manage how we notify you</p>
                </div>
              </div>
            </div>

            <div className="divide-y divide-gray-100">
              {/* Emergency & Donation Alerts */}
              <div className="p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Emergency & Donation Alerts</h3>
                <div className="space-y-4">
                  {[
                    { key: 'emergencyAlerts', label: 'Emergency blood/organ requests', desc: 'Critical life-saving requests in your area' },
                    { key: 'bloodRequests', label: 'Blood donation requests', desc: 'Regular blood donation opportunities' },
                    { key: 'organRequests', label: 'Organ donation updates', desc: 'Organ donation related information' },
                    { key: 'hospitalAlerts', label: 'Hospital partnership alerts', desc: 'Updates from partnered hospitals' }
                  ].map((item) => (
                    <div key={item.key} className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">{item.label}</div>
                        <div className="text-sm text-gray-600">{item.desc}</div>
                      </div>
                      <button
                        onClick={() => toggleNotification(item.key)}
                        className={`relative inline-flex h-7 w-14 items-center rounded-full transition-colors ${
                          notifications[item.key] ? 'bg-rose-500' : 'bg-gray-300'
                        }`}
                      >
                        <span
                          className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                            notifications[item.key] ? 'translate-x-8' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Communication Preferences */}
              <div className="p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Communication Channels</h3>
                <div className="space-y-4">
                  {[
                    { key: 'smsNotifications', label: 'SMS Notifications', desc: 'Receive text message alerts' },
                    { key: 'emailUpdates', label: 'Email Updates', desc: 'Weekly newsletters and updates' },
                    { key: 'donationReminders', label: 'Donation Reminders', desc: 'When you are eligible to donate again' }
                  ].map((item) => (
                    <div key={item.key} className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">{item.label}</div>
                        <div className="text-sm text-gray-600">{item.desc}</div>
                      </div>
                      <button
                        onClick={() => toggleNotification(item.key)}
                        className={`relative inline-flex h-7 w-14 items-center rounded-full transition-colors ${
                          notifications[item.key] ? 'bg-rose-500' : 'bg-gray-300'
                        }`}
                      >
                        <span
                          className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                            notifications[item.key] ? 'translate-x-8' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Privacy & Security */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center space-x-3">
                <Shield className="h-6 w-6 text-blue-500" />
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Privacy & Security</h2>
                  <p className="text-gray-600">Protect your account and data</p>
                </div>
              </div>
            </div>

            <div className="divide-y divide-gray-100">
              {/* Account Security */}
              <div className="p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Account Security</h3>
                <div className="space-y-4">
                  {/* Change Password */}
                  <button
                    onClick={() => setShowChangePassword(true)}
                    className="w-full flex items-center justify-between p-4 hover:bg-gray-50 rounded-xl transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <Key className="h-5 w-5 text-gray-500" />
                      <div className="text-left">
                        <div className="font-medium text-gray-900">Change Password</div>
                        <div className="text-sm text-gray-600">Update your login password</div>
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  </button>

                  {/* Two-Factor Authentication */}
                  <button
                    onClick={() => setShowTwoFactorModal(true)}
                    className="w-full flex items-center justify-between p-4 hover:bg-gray-50 rounded-xl transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <Lock className="h-5 w-5 text-gray-500" />
                      <div className="text-left">
                        <div className="font-medium text-gray-900">Two-Factor Authentication</div>
                        <div className="text-sm text-gray-600">Add an extra layer of security</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-amber-600 font-medium">Inactive</span>
                      <ChevronRight className="h-5 w-5 text-gray-400" />
                    </div>
                  </button>

                  {/* Active Sessions */}
                  <button
                    onClick={() => setShowActiveSessions(true)}
                    className="w-full flex items-center justify-between p-4 hover:bg-gray-50 rounded-xl transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <Smartphone className="h-5 w-5 text-gray-500" />
                      <div className="text-left">
                        <div className="font-medium text-gray-900">Active Sessions</div>
                        <div className="text-sm text-gray-600">Manage logged-in devices</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600">3 devices</span>
                      <ChevronRight className="h-5 w-5 text-gray-400" />
                    </div>
                  </button>

                  {/* Logout Everywhere */}
                  <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 rounded-xl transition-colors">
                    <div className="flex items-center space-x-3">
                      <LogOut className="h-5 w-5 text-gray-500" />
                      <div className="text-left">
                        <div className="font-medium text-gray-900">Logout from all devices</div>
                        <div className="text-sm text-gray-600">Sign out from all active sessions</div>
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  </button>
                </div>
              </div>

              {/* Privacy Settings */}
              <div className="p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Privacy Settings</h3>
                <div className="space-y-4">
                  {[
                    { key: 'showLocation', label: 'Show my location', desc: 'Allow hospitals to see your approximate location' },
                    { key: 'showDonationHistory', label: 'Share donation history', desc: 'Show your donation count publicly' },
                    { key: 'shareWithHospitals', label: 'Share with hospitals', desc: 'Allow hospitals to contact you directly' },
                    { key: 'anonymousMode', label: 'Anonymous mode', desc: 'Hide your identity from recipients' }
                  ].map((item) => (
                    <div key={item.key} className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">{item.label}</div>
                        <div className="text-sm text-gray-600">{item.desc}</div>
                      </div>
                      <button
                        onClick={() => togglePrivacy(item.key)}
                        className={`relative inline-flex h-7 w-14 items-center rounded-full transition-colors ${
                          privacy[item.key] ? 'bg-blue-500' : 'bg-gray-300'
                        }`}
                      >
                        <span
                          className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                            privacy[item.key] ? 'translate-x-8' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Account Preferences */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center space-x-3">
                <User className="h-6 w-6 text-emerald-500" />
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Account Preferences</h2>
                  <p className="text-gray-600">Customize your donation experience</p>
                </div>
              </div>
            </div>

            <div className="divide-y divide-gray-100">
              {/* Language */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <Languages className="h-5 w-5 text-gray-500" />
                    <div>
                      <div className="font-medium text-gray-900">Language</div>
                      <div className="text-sm text-gray-600">Select your preferred language</div>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => updateAccountPref('language', lang.code)}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        accountPrefs.language === lang.code
                          ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                          : 'border-gray-200 hover:border-gray-300 text-gray-700'
                      }`}
                    >
                      <div className="text-center font-medium">{lang.name}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Donation Type Preference */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <Heart className="h-5 w-5 text-gray-500" />
                    <div>
                      <div className="font-medium text-gray-900">Donation Type</div>
                      <div className="text-sm text-gray-600">What type of donations you prefer</div>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {donationTypes.map((type) => {
                    const Icon = type.icon;
                    return (
                      <button
                        key={type.id}
                        onClick={() => updateAccountPref('donationType', type.id)}
                        className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center justify-center space-y-2 ${
                          accountPrefs.donationType === type.id
                            ? 'border-rose-500 bg-rose-50 text-rose-700'
                            : 'border-gray-200 hover:border-gray-300 text-gray-700'
                        }`}
                      >
                        <Icon className="h-6 w-6" />
                        <div className="font-medium">{type.label}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Availability Settings */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <Calendar className="h-5 w-5 text-gray-500" />
                    <div>
                      <div className="font-medium text-gray-900">Default Availability</div>
                      <div className="text-sm text-gray-600">Your usual availability status</div>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  {availabilityOptions.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => updateAccountPref('availability', option.id)}
                      className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                        accountPrefs.availability === option.id
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-200 hover:border-gray-300 text-gray-700'
                      }`}
                    >
                      <div className="font-medium">{option.label}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Support & Help */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center space-x-3">
                <HelpCircle className="h-6 w-6 text-purple-500" />
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Support & Help</h2>
                  <p className="text-gray-600">Get assistance and learn more</p>
                </div>
              </div>
            </div>

            <div className="divide-y divide-gray-100">
              {[
                { icon: HelpCircle, label: 'FAQs & Help Center', desc: 'Find answers to common questions' },
                { icon: Mail, label: 'Contact Support', desc: 'Get in touch with our support team' },
                { icon: ShieldAlert, label: 'Report an Issue', desc: 'Report problems or concerns' },
                { icon: Globe, label: 'Terms & Privacy Policy', desc: 'Read our terms and policies' }
              ].map((item, index) => (
                <button
                  key={index}
                  className="w-full flex items-center justify-between p-6 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <item.icon className="h-5 w-5 text-gray-500" />
                    <div className="text-left">
                      <div className="font-medium text-gray-900">{item.label}</div>
                      <div className="text-sm text-gray-600">{item.desc}</div>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </button>
              ))}
            </div>
          </div>

          {/* Danger Zone */}
          <div className="bg-white rounded-2xl shadow-lg border border-red-200 overflow-hidden">
            <div className="p-6 border-b border-red-100 bg-red-50">
              <div className="flex items-center space-x-3">
                <AlertTriangle className="h-6 w-6 text-red-500" />
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Danger Zone</h2>
                  <p className="text-gray-600">Irreversible actions - proceed with caution</p>
                </div>
              </div>
            </div>

            <div className="divide-y divide-red-100">
              {/* Deactivate Account */}
              <button
                onClick={() => setShowDeactivateModal(true)}
                className="w-full flex items-center justify-between p-6 hover:bg-red-50 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <AlertTriangle className="h-5 w-5 text-amber-500" />
                  <div className="text-left">
                    <div className="font-medium text-gray-900">Deactivate Account</div>
                    <div className="text-sm text-gray-600">Temporarily disable your account</div>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </button>

              {/* Delete Account */}
              <button
                onClick={() => setShowDeleteModal(true)}
                className="w-full flex items-center justify-between p-6 hover:bg-red-50 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <Trash2 className="h-5 w-5 text-red-500" />
                  <div className="text-left">
                    <div className="font-medium text-gray-900">Delete Account</div>
                    <div className="text-sm text-gray-600">Permanently remove your account and data</div>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Change Password Modal */}
      {showChangePassword && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Key className="h-6 w-6 text-rose-500" />
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">Change Password</h3>
                    <p className="text-sm text-gray-600">Update your account password</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowChangePassword(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <X className="h-5 w-5 text-gray-500" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="current"
                    value={passwordData.current}
                    onChange={handlePasswordChange}
                    className="w-full pl-10 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-transparent"
                    placeholder="Enter current password"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  New Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="new"
                    value={passwordData.new}
                    onChange={handlePasswordChange}
                    className="w-full pl-10 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-transparent"
                    placeholder="Enter new password"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm New Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="confirm"
                    value={passwordData.confirm}
                    onChange={handlePasswordChange}
                    className="w-full pl-10 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-transparent"
                    placeholder="Confirm new password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <div className="pt-4">
                <div className="flex space-x-3">
                  <button
                    onClick={submitPasswordChange}
                    className="flex-1 py-3 bg-gradient-to-r from-rose-500 to-rose-400 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
                  >
                    Update Password
                  </button>
                  <button
                    onClick={() => setShowChangePassword(false)}
                    className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Two-Factor Authentication Modal */}
      {showTwoFactorModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Lock className="h-6 w-6 text-blue-500" />
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">Two-Factor Authentication</h3>
                    <p className="text-sm text-gray-600">Add extra security to your account</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowTwoFactorModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <X className="h-5 w-5 text-gray-500" />
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-xl border border-blue-200">
                  <div className="flex items-start space-x-3">
                    <Shield className="h-6 w-6 text-blue-500 mt-0.5" />
                    <div>
                      <div className="font-semibold text-gray-900 mb-2">Enhanced Security</div>
                      <p className="text-sm text-gray-600">
                        Two-factor authentication adds an extra layer of security to your account. 
                        You'll need to enter a code from your phone when logging in from new devices.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div>
                      <div className="font-medium text-gray-900">SMS Authentication</div>
                      <div className="text-sm text-gray-600">Receive codes via text message</div>
                    </div>
                    <button className="relative inline-flex h-6 w-12 items-center rounded-full bg-gray-300">
                      <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-1" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div>
                      <div className="font-medium text-gray-900">Authenticator App</div>
                      <div className="text-sm text-gray-600">Use apps like Google Authenticator</div>
                    </div>
                    <button className="relative inline-flex h-6 w-12 items-center rounded-full bg-gray-300">
                      <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-1" />
                    </button>
                  </div>
                </div>

                <div className="pt-4 flex space-x-3">
                  <button className="flex-1 py-3 bg-gradient-to-r from-blue-500 to-blue-400 text-white rounded-xl font-semibold hover:shadow-lg transition-all">
                    Enable 2FA
                  </button>
                  <button
                    onClick={() => setShowTwoFactorModal(false)}
                    className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Active Sessions Modal */}
      {showActiveSessions && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Smartphone className="h-6 w-6 text-gray-500" />
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">Active Sessions</h3>
                    <p className="text-sm text-gray-600">Devices logged into your account</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowActiveSessions(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <X className="h-5 w-5 text-gray-500" />
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="space-y-4">
                {activeSessions.map((session) => (
                  <div
                    key={session.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200"
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`p-3 rounded-lg ${
                        session.current ? 'bg-rose-100' : 'bg-gray-100'
                      }`}>
                        <Smartphone className={`h-5 w-5 ${
                          session.current ? 'text-rose-500' : 'text-gray-500'
                        }`} />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{session.device}</div>
                        <div className="text-sm text-gray-600">
                          {session.browser} • {session.location}
                        </div>
                        <div className="text-xs text-gray-500">{session.lastActive}</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {session.current && (
                        <span className="text-xs bg-rose-100 text-rose-700 px-2 py-1 rounded-full">
                          Current
                        </span>
                      )}
                      {!session.current && (
                        <button className="text-sm text-red-500 hover:text-red-600 font-medium">
                          Logout
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex space-x-3">
                  <button className="flex-1 py-3 bg-red-50 text-red-600 rounded-xl font-semibold border border-red-200 hover:bg-red-100 transition-colors">
                    Logout All Devices
                  </button>
                  <button
                    onClick={() => setShowActiveSessions(false)}
                    className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
                  >
                    Done
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Deactivate Account Modal */}
      {showDeactivateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl">
            <div className="p-6 border-b border-amber-100 bg-amber-50">
              <div className="flex items-center space-x-3">
                <AlertTriangle className="h-6 w-6 text-amber-500" />
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Deactivate Account</h3>
                  <p className="text-sm text-gray-600">Temporarily disable your account</p>
                </div>
              </div>
            </div>

            <div className="p-6">
              <div className="space-y-4">
                <div className="bg-amber-50 p-4 rounded-xl border border-amber-200">
                  <p className="text-sm text-gray-700">
                    Your account will be temporarily deactivated. You can reactivate it anytime by logging in.
                  </p>
                </div>

                <div className="space-y-2">
                  <label className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      className="mt-1 text-amber-500"
                      required
                    />
                    <span className="text-sm text-gray-700">
                      I understand that my profile will be hidden from donors and hospitals
                    </span>
                  </label>
                  <label className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      className="mt-1 text-amber-500"
                      required
                    />
                    <span className="text-sm text-gray-700">
                      I understand that I can reactivate my account anytime
                    </span>
                  </label>
                </div>

                <div className="pt-4 flex space-x-3">
                  <button
                    onClick={handleDeactivateAccount}
                    className="flex-1 py-3 bg-amber-500 text-white rounded-xl font-semibold hover:bg-amber-600 transition-colors"
                  >
                    Deactivate Account
                  </button>
                  <button
                    onClick={() => setShowDeactivateModal(false)}
                    className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Account Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl">
            <div className="p-6 border-b border-red-100 bg-red-50">
              <div className="flex items-center space-x-3">
                <Trash2 className="h-6 w-6 text-red-500" />
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Delete Account</h3>
                  <p className="text-sm text-gray-600">Permanently remove your account</p>
                </div>
              </div>
            </div>

            <div className="p-6">
              <div className="space-y-4">
                <div className="bg-red-50 p-4 rounded-xl border border-red-200">
                  <p className="text-sm text-red-700 font-semibold mb-2">Warning: This action is irreversible</p>
                  <p className="text-sm text-gray-700">
                    All your data including donation history, preferences, and personal information will be permanently deleted. This action cannot be undone.
                  </p>
                </div>

                <div className="space-y-2">
                  <label className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      className="mt-1 text-red-500"
                      required
                    />
                    <span className="text-sm text-gray-700">
                      I understand that all my data will be permanently deleted
                    </span>
                  </label>
                  <label className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      className="mt-1 text-red-500"
                      required
                    />
                    <span className="text-sm text-gray-700">
                      I understand this action cannot be undone
                    </span>
                  </label>
                  <label className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      className="mt-1 text-red-500"
                      required
                    />
                    <span className="text-sm text-gray-700">
                      I confirm I want to delete my account
                    </span>
                  </label>
                </div>

                <div className="pt-4 flex space-x-3">
                  <button
                    onClick={handleDeleteAccount}
                    className="flex-1 py-3 bg-red-500 text-white rounded-xl font-semibold hover:bg-red-600 transition-colors"
                  >
                    Delete Account
                  </button>
                  <button
                    onClick={() => setShowDeleteModal(false)}
                    className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Custom Styles for Mobile */}
      <style jsx global>{`
        /* Better touch targets on mobile */
        @media (max-width: 640px) {
          button, 
          [role="button"],
          input[type="submit"] {
            min-height: 44px;
          }
          
          .toggle-switch {
            min-width: 56px;
            min-height: 32px;
          }
        }
        
        /* Smooth scrolling for modals */
        .modal-content {
          scrollbar-width: thin;
          scrollbar-color: #e5e7eb transparent;
        }
        
        .modal-content::-webkit-scrollbar {
          width: 6px;
        }
        
        .modal-content::-webkit-scrollbar-track {
          background: transparent;
        }
        
        .modal-content::-webkit-scrollbar-thumb {
          background-color: #e5e7eb;
          border-radius: 3px;
        }
      `}</style>
    </div>
  );
};

export default SettingsPage;