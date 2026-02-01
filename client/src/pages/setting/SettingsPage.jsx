import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  User, Bell, Shield, Lock, 
  Mail, Phone, Globe, Moon, 
  Save, LogOut, Trash2, 
  CheckCircle, AlertCircle,
  Eye, EyeOff, Download
} from 'lucide-react';

const SettingsPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('account');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = () => {
    const userTypes = ['bloodDonor', 'organDonor', 'patient', 'user'];
    
    for (const type of userTypes) {
      const data = localStorage.getItem(`${type}Data`);
      if (data) {
        try {
          setUserData(JSON.parse(data));
          break;
        } catch (error) {
          console.error('Error parsing user data:', error);
        }
      }
    }
  };

  const [settings, setSettings] = useState({
    // Account
    email: userData?.email || '',
    phone: userData?.phone || '',
    
    // Notifications
    emailNotifications: true,
    smsNotifications: false,
    donationReminders: true,
    emergencyAlerts: true,
    
    // Privacy
    profileVisibility: 'public',
    showDonationHistory: true,
    allowMessaging: true,
    
    // Security
    twoFactorAuth: false
  });

  const handleLogout = () => {
    const types = ['bloodDonor', 'organDonor', 'patient', 'user'];
    types.forEach(type => {
      localStorage.removeItem(`${type}Token`);
      localStorage.removeItem(type);
      localStorage.removeItem(`${type}Data`);
    });
    
    navigate('/');
  };

  const handleSaveSettings = async () => {
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      localStorage.setItem('userSettings', JSON.stringify(settings));
      
      setMessage({ 
        type: 'success', 
        text: 'Settings saved successfully!' 
      });
      
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    } catch (error) {
      setMessage({ 
        type: 'error', 
        text: 'Failed to save settings' 
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = () => {
    if (window.confirm('Are you sure? This will permanently delete your account.')) {
      handleLogout();
    }
  };

  const tabs = [
    { id: 'account', label: 'Account', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'privacy', label: 'Privacy', icon: Shield },
    { id: 'security', label: 'Security', icon: Lock },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600 mt-1">Manage your account preferences</p>
        </div>

        {/* Message Alert */}
        {message.text && (
          <div className={`mb-4 p-3 rounded-lg flex items-center space-x-2 ${
            message.type === 'success' 
              ? 'bg-green-50 text-green-700 border border-green-200'
              : 'bg-red-50 text-red-700 border border-red-200'
          }`}>
            {message.type === 'success' ? 
              <CheckCircle className="h-4 w-4" /> : 
              <AlertCircle className="h-4 w-4" />
            }
            <span className="text-sm">{message.text}</span>
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-4">
                <div className="space-y-1">
                  {tabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full text-left px-3 py-2.5 rounded-md flex items-center space-x-3 ${
                          activeTab === tab.id
                            ? 'bg-blue-50 text-blue-600'
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                        <span className="text-sm font-medium">{tab.label}</span>
                      </button>
                    );
                  })}
                </div>

                <div className="mt-6 pt-6 border-t border-gray-100">
                  <button
                    onClick={handleLogout}
                    className="w-full px-3 py-2.5 text-red-600 hover:bg-red-50 rounded-md flex items-center space-x-3 text-sm font-medium"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            {/* Account Settings */}
            {activeTab === 'account' && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Account Information</h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      defaultValue={userData?.name || ''}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Your name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 text-gray-400 mr-2" />
                      <input
                        type="email"
                        defaultValue={userData?.email || ''}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 text-gray-400 mr-2" />
                      <input
                        type="tel"
                        defaultValue={userData?.phone || ''}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="+91 9876543210"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Notification Settings */}
            {activeTab === 'notifications' && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Notification Preferences</h2>
                
                <div className="space-y-3">
                  <label className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-medium text-gray-900">Email Notifications</div>
                      <div className="text-xs text-gray-500">Receive updates via email</div>
                    </div>
                    <input
                      type="checkbox"
                      checked={settings.emailNotifications}
                      onChange={(e) => setSettings(prev => ({ ...prev, emailNotifications: e.target.checked }))}
                      className="h-4 w-4 text-blue-600 rounded"
                    />
                  </label>

                  <label className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-medium text-gray-900">SMS Notifications</div>
                      <div className="text-xs text-gray-500">Get text message alerts</div>
                    </div>
                    <input
                      type="checkbox"
                      checked={settings.smsNotifications}
                      onChange={(e) => setSettings(prev => ({ ...prev, smsNotifications: e.target.checked }))}
                      className="h-4 w-4 text-blue-600 rounded"
                    />
                  </label>

                  <label className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-medium text-gray-900">Donation Reminders</div>
                      <div className="text-xs text-gray-500">Reminders for next donation</div>
                    </div>
                    <input
                      type="checkbox"
                      checked={settings.donationReminders}
                      onChange={(e) => setSettings(prev => ({ ...prev, donationReminders: e.target.checked }))}
                      className="h-4 w-4 text-blue-600 rounded"
                    />
                  </label>

                  <label className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-medium text-gray-900">Emergency Alerts</div>
                      <div className="text-xs text-gray-500">Urgent blood/organ requests</div>
                    </div>
                    <input
                      type="checkbox"
                      checked={settings.emergencyAlerts}
                      onChange={(e) => setSettings(prev => ({ ...prev, emergencyAlerts: e.target.checked }))}
                      className="h-4 w-4 text-blue-600 rounded"
                    />
                  </label>
                </div>
              </div>
            )}

            {/* Privacy Settings */}
            {activeTab === 'privacy' && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Privacy Settings</h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Profile Visibility
                    </label>
                    <select
                      value={settings.profileVisibility}
                      onChange={(e) => setSettings(prev => ({ ...prev, profileVisibility: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="public">Public</option>
                      <option value="friends">Friends Only</option>
                      <option value="private">Private</option>
                    </select>
                  </div>

                  <label className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-medium text-gray-900">Show Donation History</div>
                      <div className="text-xs text-gray-500">Display your donation count on profile</div>
                    </div>
                    <input
                      type="checkbox"
                      checked={settings.showDonationHistory}
                      onChange={(e) => setSettings(prev => ({ ...prev, showDonationHistory: e.target.checked }))}
                      className="h-4 w-4 text-blue-600 rounded"
                    />
                  </label>

                  <label className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-medium text-gray-900">Allow Messaging</div>
                      <div className="text-xs text-gray-500">Let others send you messages</div>
                    </div>
                    <input
                      type="checkbox"
                      checked={settings.allowMessaging}
                      onChange={(e) => setSettings(prev => ({ ...prev, allowMessaging: e.target.checked }))}
                      className="h-4 w-4 text-blue-600 rounded"
                    />
                  </label>
                </div>
              </div>
            )}

            {/* Security Settings */}
            {activeTab === 'security' && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Security</h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Change Password
                    </label>
                    <div className="space-y-2">
                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          placeholder="Current Password"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <button
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-2 top-1/2 transform -translate-y-1/2"
                        >
                          {showPassword ? 
                            <EyeOff className="h-4 w-4 text-gray-400" /> : 
                            <Eye className="h-4 w-4 text-gray-400" />
                          }
                        </button>
                      </div>
                      
                      <input
                        type="password"
                        placeholder="New Password"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <label className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-medium text-gray-900">Two-Factor Authentication</div>
                      <div className="text-xs text-gray-500">Add extra security to your account</div>
                    </div>
                    <input
                      type="checkbox"
                      checked={settings.twoFactorAuth}
                      onChange={(e) => setSettings(prev => ({ ...prev, twoFactorAuth: e.target.checked }))}
                      className="h-4 w-4 text-blue-600 rounded"
                    />
                  </label>
                </div>
              </div>
            )}

            {/* Save Button */}
            <div className="mt-6">
              <button
                onClick={handleSaveSettings}
                disabled={loading}
                className="w-full px-4 py-2.5 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                {loading ? 'Saving...' : 'Save Changes'}
              </button>
            </div>

            {/* Delete Account */}
            <div className="mt-6">
              <button
                onClick={handleDeleteAccount}
                className="w-full px-4 py-2.5 text-red-600 border border-red-300 rounded-md font-medium hover:bg-red-50 transition-colors"
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;