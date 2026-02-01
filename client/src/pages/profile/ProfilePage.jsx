import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  // Common Icons
  User, Mail, Phone, Calendar, MapPin, Edit2, Save, X, 
  CheckCircle, AlertCircle, Loader2, Home, LogOut,
  Shield, Download, Bell, Settings, Heart,
  
  // Blood Donor Icons
  Droplets, Activity, Award, History, Star, Gift, Clock,
  
  // Organ Donor Icons
  Activity as ActivityIcon, FileText,
  
  // Patient Icons
  Ambulance, Hospital, Users as UsersIcon, AlertTriangle,
  
  // User Icons
  Users, Globe, TrendingUp, BookOpen
} from 'lucide-react';

const ProfilePage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  
  // State for user data
  const [userType, setUserType] = useState(null);
  const [userData, setUserData] = useState(null);
  const [formData, setFormData] = useState({});

  // Load user data on component mount
  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = () => {
    setLoading(true);
    
    // Check all possible user types
    const userTypes = [
      { key: 'bloodDonor', label: 'Blood Donor', color: 'from-red-500 to-rose-500', icon: Droplets },
      { key: 'organDonor', label: 'Organ Donor', color: 'from-emerald-500 to-green-500', icon: ActivityIcon },
      { key: 'patient', label: 'Patient/Family', color: 'from-amber-500 to-orange-500', icon: Ambulance },
      { key: 'user', label: 'General User', color: 'from-blue-500 to-cyan-500', icon: Users }
    ];

    for (const type of userTypes) {
      const token = localStorage.getItem(`${type.key}Token`);
      const dataKey = localStorage.getItem('currentUserType') === type.key ? 
        'currentUserData' : 
        `${type.key}Data`;
      
      const data = localStorage.getItem(dataKey);
      
      if (token && data) {
        try {
          const parsedData = JSON.parse(data);
          setUserType({
            id: type.key,
            label: type.label,
            color: type.color,
            icon: type.icon
          });
          setUserData(parsedData);
          setFormData(parsedData);
          
          // Set default values for missing fields
          const defaults = getUserTypeDefaults(type.key);
          const mergedData = { ...defaults, ...parsedData };
          
          setUserData(mergedData);
          setFormData(mergedData);
          
          // Store current user type for future reference
          localStorage.setItem('currentUserType', type.key);
          localStorage.setItem('currentUserData', JSON.stringify(mergedData));
          
          setLoading(false);
          return;
        } catch (error) {
          console.error('Error parsing user data:', error);
        }
      }
    }
    
    // Also check for currentUserData as fallback
    const currentUserData = localStorage.getItem('currentUserData');
    const currentUserType = localStorage.getItem('currentUserType');
    
    if (currentUserData && currentUserType) {
      try {
        const parsedData = JSON.parse(currentUserData);
        const type = userTypes.find(t => t.key === currentUserType);
        
        if (type) {
          setUserType({
            id: type.key,
            label: type.label,
            color: type.color,
            icon: type.icon
          });
          setUserData(parsedData);
          setFormData(parsedData);
          setLoading(false);
          return;
        }
      } catch (error) {
        console.error('Error parsing current user data:', error);
      }
    }
    
    // No user found, redirect to login
    navigate('/select-role');
    setLoading(false);
  };

  const getUserTypeDefaults = (type) => {
    const defaults = {
      bloodDonor: {
        name: '',
        email: '',
        phone: '',
        bloodGroup: '',
        age: '',
        weight: '',
        lastDonationDate: '',
        address: '',
        city: '',
        donationCount: 0,
        points: 0,
        level: 'Beginner',
        status: 'active',
        userType: 'bloodDonor'
      },
      organDonor: {
        name: '',
        email: '',
        phone: '',
        age: '',
        organsToDonate: [],
        medicalHistory: '',
        familyConsent: false,
        legalDocument: false,
        registrationDate: new Date().toISOString(),
        status: 'pending',
        userType: 'organDonor'
      },
      patient: {
        name: '',
        email: '',
        phone: '',
        patientType: 'self',
        bloodGroup: '',
        medicalCondition: '',
        urgencyLevel: 'normal',
        hospitalName: '',
        doctorName: '',
        emergencyContact: '',
        address: '',
        status: 'active',
        userType: 'patient'
      },
      user: {
        name: '',
        email: '',
        phone: '',
        userType: 'supporter',
        interests: [],
        notifications: true,
        location: '',
        occupation: '',
        organization: '',
        joinDate: new Date().toISOString(),
        status: 'active',
        userType: 'general'
      }
    };
    
    return defaults[type] || {};
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      if (name === 'organsToDonate' || name === 'interests') {
        // Handle array checkboxes
        const currentArray = formData[name] || [];
        const updatedArray = currentArray.includes(value)
          ? currentArray.filter(item => item !== value)
          : [...currentArray, value];
        setFormData(prev => ({ ...prev, [name]: updatedArray }));
      } else {
        // Handle boolean checkboxes
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
      // Validate required fields
      const errors = validateForm();
      if (errors.length > 0) {
        setMessage({ type: 'error', text: errors[0] });
        setSaving(false);
        return;
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Update local storage with all necessary keys
      const updatedData = { 
        ...formData, 
        updatedAt: new Date().toISOString(),
        lastUpdated: new Date().toLocaleString(),
        userType: userType.id // Ensure userType is set
      };
      
      // Store data in multiple places for reliability
      localStorage.setItem(`${userType.id}Data`, JSON.stringify(updatedData));
      localStorage.setItem('currentUserData', JSON.stringify(updatedData));
      localStorage.setItem('currentUserType', userType.id);
      
      // Also store in the main key for compatibility
      localStorage.setItem(userType.id, JSON.stringify(updatedData));
      
      setUserData(updatedData);
      setIsEditing(false);
      setMessage({ 
        type: 'success', 
        text: 'Profile updated successfully!' 
      });

      // Clear message after 3 seconds
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
    if (!formData.phone?.trim()) errors.push('Phone number is required');
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      errors.push('Please enter a valid email address');
    }
    
    // Phone validation (basic)
    const phoneRegex = /^[0-9]{10}$/;
    if (formData.phone && !phoneRegex.test(formData.phone.replace(/\D/g, ''))) {
      errors.push('Please enter a valid 10-digit phone number');
    }
    
    // Type-specific validations
    if (userType.id === 'bloodDonor') {
      if (!formData.bloodGroup) errors.push('Blood group is required');
      if (formData.age && (formData.age < 18 || formData.age > 65)) {
        errors.push('Age must be between 18 and 65');
      }
      if (formData.weight && formData.weight < 45) {
        errors.push('Weight must be at least 45 kg');
      }
    }
    
    if (userType.id === 'organDonor') {
      if (formData.age && formData.age < 18) {
        errors.push('You must be at least 18 years old to register as an organ donor');
      }
      if (!formData.familyConsent) errors.push('Family consent is required');
      if (!formData.legalDocument) errors.push('Legal documentation agreement is required');
    }
    
    return errors;
  };

  const handleLogout = () => {
    // Clear all user data
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

  // Get stats based on user type
  const getUserStats = () => {
    if (!userData) return [];
    
    const baseStats = [
      { label: 'Account Status', value: userData.status === 'active' ? 'Active' : 'Pending', icon: CheckCircle, color: 'text-emerald-500', bg: 'bg-emerald-50' },
      { label: 'Member Since', value: new Date(userData.registrationDate || userData.joinDate || Date.now()).toLocaleDateString(), icon: Calendar, color: 'text-blue-500', bg: 'bg-blue-50' }
    ];

    switch (userType.id) {
      case 'bloodDonor':
        return [
          { label: 'Total Donations', value: userData.donationCount || 0, icon: Droplets, color: 'text-red-500', bg: 'bg-red-50' },
          { label: 'Lives Saved', value: (userData.donationCount || 0) * 3, icon: Heart, color: 'text-rose-500', bg: 'bg-rose-50' },
          { label: 'Points', value: userData.points || 0, icon: Award, color: 'text-amber-500', bg: 'bg-amber-50' },
          { label: 'Donor Level', value: userData.level || 'Beginner', icon: Star, color: 'text-purple-500', bg: 'bg-purple-50' }
        ];
      
      case 'organDonor':
        return [
          { label: 'Organs Pledged', value: (userData.organsToDonate || []).length, icon: ActivityIcon, color: 'text-emerald-500', bg: 'bg-emerald-50' },
          { label: 'Status', value: userData.status === 'approved' ? 'Approved' : 'Pending Review', icon: Shield, color: 'text-blue-500', bg: 'bg-blue-50' },
          ...baseStats
        ];
      
      case 'patient':
        return [
          { label: 'Urgency Level', value: (userData.urgencyLevel || 'Normal').charAt(0).toUpperCase() + (userData.urgencyLevel || 'Normal').slice(1), icon: AlertTriangle, color: userData.urgencyLevel === 'emergency' ? 'text-red-500' : userData.urgencyLevel === 'urgent' ? 'text-amber-500' : 'text-blue-500', bg: userData.urgencyLevel === 'emergency' ? 'bg-red-50' : userData.urgencyLevel === 'urgent' ? 'bg-amber-50' : 'bg-blue-50' },
          { label: 'Hospital', value: userData.hospitalName || 'Not specified', icon: Hospital, color: 'text-blue-500', bg: 'bg-blue-50' },
          ...baseStats
        ];
      
      case 'user':
        return [
          { label: 'User Type', value: userData.userType ? userData.userType.charAt(0).toUpperCase() + userData.userType.slice(1) : 'Supporter', icon: Users, color: 'text-blue-500', bg: 'bg-blue-50' },
          { label: 'Interests', value: (userData.interests || []).length, icon: BookOpen, color: 'text-purple-500', bg: 'bg-purple-50' },
          ...baseStats
        ];
      
      default:
        return baseStats;
    }
  };

  // Get quick actions based on user type
  const getQuickActions = () => {
    const baseActions = [
      { label: 'Notification Settings', icon: Bell, onClick: () => {}, color: 'text-gray-600' },
      { label: 'Privacy Settings', icon: Shield, onClick: () => {}, color: 'text-blue-600' },
      { label: 'Download Data', icon: Download, onClick: () => {}, color: 'text-emerald-600' }
    ];

    switch (userType.id) {
      case 'bloodDonor':
        return [
          { label: 'Schedule Donation', icon: Calendar, onClick: () => navigate('/schedule-donation'), color: 'text-red-600' },
          { label: 'View Donation History', icon: History, onClick: () => navigate('/donation-history'), color: 'text-rose-600' },
          { label: 'Redeem Rewards', icon: Gift, onClick: () => navigate('/rewards'), color: 'text-amber-600' },
          ...baseActions
        ];
      
      case 'organDonor':
        return [
          { label: 'Update Medical Info', icon: FileText, onClick: () => navigate('/medical-info'), color: 'text-emerald-600' },
          { label: 'Download Pledge Certificate', icon: Download, onClick: () => {}, color: 'text-green-600' },
          ...baseActions
        ];
      
      case 'patient':
        return [
          { label: 'Request Help', icon: AlertTriangle, onClick: () => navigate('/request-help'), color: 'text-red-600' },
          { label: 'Find Donors', icon: UsersIcon, onClick: () => navigate('/find-donors'), color: 'text-blue-600' },
          { label: 'Hospital Contacts', icon: Hospital, onClick: () => navigate('/hospitals'), color: 'text-amber-600' },
          ...baseActions
        ];
      
      case 'user':
        return [
          { label: 'Explore Events', icon: Calendar, onClick: () => navigate('/events'), color: 'text-blue-600' },
          { label: 'Volunteer Opportunities', icon: Users, onClick: () => navigate('/volunteer'), color: 'text-cyan-600' },
          { label: 'Community Forum', icon: Globe, onClick: () => navigate('/forum'), color: 'text-purple-600' },
          ...baseActions
        ];
      
      default:
        return baseActions;
    }
  };

  // Render specific form fields based on user type
  const renderUserTypeFields = () => {
    if (!userType) return null;

    switch (userType.id) {
      case 'bloodDonor':
        return (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Blood Group *</label>
                <select
                  name="bloodGroup"
                  value={formData.bloodGroup || ''}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-300 focus:border-transparent disabled:bg-gray-50 disabled:cursor-not-allowed"
                  disabled={!isEditing}
                >
                  <option value="">Select Blood Group</option>
                  {['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].map(group => (
                    <option key={group} value={group}>{group}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
                <input
                  type="number"
                  name="age"
                  value={formData.age || ''}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-300 focus:border-transparent disabled:bg-gray-50 disabled:cursor-not-allowed"
                  disabled={!isEditing}
                  min="18"
                  max="65"
                  placeholder="18-65"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Weight (kg)</label>
                <input
                  type="number"
                  name="weight"
                  value={formData.weight || ''}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-300 focus:border-transparent disabled:bg-gray-50 disabled:cursor-not-allowed"
                  disabled={!isEditing}
                  min="45"
                  placeholder="Min. 45kg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Last Donation Date</label>
                <input
                  type="date"
                  name="lastDonationDate"
                  value={formData.lastDonationDate || ''}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-300 focus:border-transparent disabled:bg-gray-50 disabled:cursor-not-allowed"
                  disabled={!isEditing}
                />
              </div>
            </div>
          </>
        );

      case 'organDonor':
        const organs = ['Kidney', 'Liver', 'Heart', 'Lungs', 'Pancreas', 'Eyes', 'Bone Marrow'];
        return (
          <>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Organs to Donate</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {organs.map(organ => (
                  <label key={organ} className={`flex items-center space-x-2 p-3 rounded-lg border ${isEditing ? 'cursor-pointer hover:bg-gray-50' : 'cursor-default'} ${(formData.organsToDonate || []).includes(organ) ? 'border-emerald-300 bg-emerald-50' : ''}`}>
                    <input
                      type="checkbox"
                      name="organsToDonate"
                      value={organ}
                      checked={(formData.organsToDonate || []).includes(organ)}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-emerald-500 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={!isEditing}
                    />
                    <span className={`text-sm ${(formData.organsToDonate || []).includes(organ) ? 'text-emerald-700 font-medium' : 'text-gray-700'}`}>{organ}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Age *</label>
                <input
                  type="number"
                  name="age"
                  value={formData.age || ''}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-300 focus:border-transparent disabled:bg-gray-50 disabled:cursor-not-allowed"
                  disabled={!isEditing}
                  min="18"
                  placeholder="Min. 18 years"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Medical History</label>
                <textarea
                  name="medicalHistory"
                  value={formData.medicalHistory || ''}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-300 focus:border-transparent resize-none disabled:bg-gray-50 disabled:cursor-not-allowed"
                  disabled={!isEditing}
                  rows="3"
                  placeholder="Any medical conditions or history..."
                />
              </div>
            </div>

            <div className="space-y-4 mt-6">
              <label className={`flex items-start space-x-3 ${isEditing ? 'cursor-pointer' : 'cursor-default'}`}>
                <input
                  type="checkbox"
                  name="familyConsent"
                  checked={formData.familyConsent || false}
                  onChange={handleInputChange}
                  className={`h-4 w-4 text-emerald-500 rounded mt-0.5 ${isEditing ? '' : 'cursor-not-allowed'}`}
                  disabled={!isEditing}
                />
                <span className={`text-sm ${formData.familyConsent ? 'text-emerald-700 font-medium' : 'text-gray-700'}`}>
                  I have discussed organ donation with my family and have their consent
                </span>
              </label>

              <label className={`flex items-start space-x-3 ${isEditing ? 'cursor-pointer' : 'cursor-default'}`}>
                <input
                  type="checkbox"
                  name="legalDocument"
                  checked={formData.legalDocument || false}
                  onChange={handleInputChange}
                  className={`h-4 w-4 text-emerald-500 rounded mt-0.5 ${isEditing ? '' : 'cursor-not-allowed'}`}
                  disabled={!isEditing}
                />
                <span className={`text-sm ${formData.legalDocument ? 'text-emerald-700 font-medium' : 'text-gray-700'}`}>
                  I agree to complete the required legal documentation for organ donation
                </span>
              </label>
            </div>
          </>
        );

      case 'patient':
        const urgencyLevels = [
          { value: 'normal', label: 'Normal', color: 'bg-blue-100 text-blue-800' },
          { value: 'urgent', label: 'Urgent', color: 'bg-amber-100 text-amber-800' },
          { value: 'emergency', label: 'Emergency', color: 'bg-red-100 text-red-800' }
        ];

        const patientTypes = [
          { value: 'self', label: 'Self' },
          { value: 'family', label: 'Family Member' },
          { value: 'friend', label: 'Friend' }
        ];

        return (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Patient Type</label>
                <div className="grid grid-cols-3 gap-2">
                  {patientTypes.map(type => (
                    <label key={type.value} className={`flex items-center justify-center p-3 rounded-lg border ${isEditing ? 'cursor-pointer hover:bg-gray-50' : 'cursor-default'} ${formData.patientType === type.value ? 'border-amber-300 bg-amber-50' : ''}`}>
                      <input
                        type="radio"
                        name="patientType"
                        value={type.value}
                        checked={formData.patientType === type.value}
                        onChange={handleInputChange}
                        className="sr-only"
                        disabled={!isEditing}
                      />
                      <span className={`font-medium ${formData.patientType === type.value ? 'text-amber-600' : 'text-gray-700'}`}>
                        {type.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Blood Group (if known)</label>
                <select
                  name="bloodGroup"
                  value={formData.bloodGroup || ''}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-300 focus:border-transparent disabled:bg-gray-50 disabled:cursor-not-allowed"
                  disabled={!isEditing}
                >
                  <option value="">Select Blood Group</option>
                  {['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].map(group => (
                    <option key={group} value={group}>{group}</option>
                  ))}
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Medical Condition</label>
                <input
                  type="text"
                  name="medicalCondition"
                  value={formData.medicalCondition || ''}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-300 focus:border-transparent disabled:bg-gray-50 disabled:cursor-not-allowed"
                  disabled={!isEditing}
                  placeholder="e.g., Blood Cancer, Surgery, Accident"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Urgency Level</label>
                <div className="grid grid-cols-3 gap-2">
                  {urgencyLevels.map(level => (
                    <label key={level.value} className={`flex items-center justify-center p-3 rounded-lg border ${isEditing ? 'cursor-pointer hover:bg-gray-50' : 'cursor-default'} ${formData.urgencyLevel === level.value ? 'border-amber-300 bg-amber-50' : ''}`}>
                      <input
                        type="radio"
                        name="urgencyLevel"
                        value={level.value}
                        checked={formData.urgencyLevel === level.value}
                        onChange={handleInputChange}
                        className="sr-only"
                        disabled={!isEditing}
                      />
                      <span className={`font-medium ${formData.urgencyLevel === level.value ? 'text-amber-600' : 'text-gray-700'}`}>
                        {level.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Hospital Name</label>
                <input
                  type="text"
                  name="hospitalName"
                  value={formData.hospitalName || ''}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-300 focus:border-transparent disabled:bg-gray-50 disabled:cursor-not-allowed"
                  disabled={!isEditing}
                  placeholder="e.g., City General Hospital"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Emergency Contact</label>
                <input
                  type="text"
                  name="emergencyContact"
                  value={formData.emergencyContact || ''}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-300 focus:border-transparent disabled:bg-gray-50 disabled:cursor-not-allowed"
                  disabled={!isEditing}
                  placeholder="Name and phone number"
                />
              </div>
            </div>
          </>
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
          <>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">User Type</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {userTypes.map(type => {
                  const IconComponent = type.icon;
                  return (
                    <label key={type.value} className={`flex flex-col items-center justify-center p-3 rounded-lg border ${isEditing ? 'cursor-pointer hover:bg-gray-50' : 'cursor-default'} ${formData.userType === type.value ? 'border-blue-300 bg-blue-50' : ''}`}>
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
                      <span className={`text-xs font-medium ${formData.userType === type.value ? 'text-blue-600' : 'text-gray-700'}`}>
                        {type.label}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location || ''}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-300 focus:border-transparent disabled:bg-gray-50 disabled:cursor-not-allowed"
                  disabled={!isEditing}
                  placeholder="City, State"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Occupation</label>
                <input
                  type="text"
                  name="occupation"
                  value={formData.occupation || ''}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-300 focus:border-transparent disabled:bg-gray-50 disabled:cursor-not-allowed"
                  disabled={!isEditing}
                  placeholder="e.g., Student, Teacher, Doctor"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Organization (if applicable)</label>
                <input
                  type="text"
                  name="organization"
                  value={formData.organization || ''}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-300 focus:border-transparent disabled:bg-gray-50 disabled:cursor-not-allowed"
                  disabled={!isEditing}
                  placeholder="e.g., ABC Hospital, XYZ NGO"
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Areas of Interest</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {interestsList.map(interest => (
                  <label key={interest} className={`flex items-center space-x-2 ${isEditing ? 'cursor-pointer hover:bg-gray-50 p-2 rounded' : 'p-2 cursor-default'} ${(formData.interests || []).includes(interest) ? 'border-blue-300 bg-blue-50' : ''}`}>
                    <input
                      type="checkbox"
                      name="interests"
                      value={interest}
                      checked={(formData.interests || []).includes(interest)}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-blue-500 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={!isEditing}
                    />
                    <span className={`text-sm ${(formData.interests || []).includes(interest) ? 'text-blue-700 font-medium' : 'text-gray-700'}`}>{interest}</span>
                  </label>
                ))}
              </div>
            </div>

            <label className={`flex items-center space-x-3 ${isEditing ? 'cursor-pointer' : 'cursor-default'}`}>
              <input
                type="checkbox"
                name="notifications"
                checked={formData.notifications || false}
                onChange={handleInputChange}
                className="h-4 w-4 text-blue-500 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!isEditing}
              />
              <span className={`text-sm ${formData.notifications ? 'text-blue-700 font-medium' : 'text-gray-700'}`}>
                Receive notifications about donation drives and community activities
              </span>
            </label>
          </>
        );

      default:
        return null;
    }
  };

  // Get gradient color based on user type
  const getGradientColor = () => {
    if (!userType) return 'from-gray-500 to-gray-600';
    return userType.color;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-rose-500" />
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
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center space-x-3">
              <div className={`bg-gradient-to-r ${getGradientColor()} p-2 rounded-lg`}>
                <IconComponent className="h-6 w-6 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold text-gray-900">JeevanDaan</span>
                <span className="text-xs text-gray-600 ml-2">Profile</span>
              </div>
            </Link>
            
            <div className="flex items-center space-x-4">
              <Link 
                to="/" 
                className="flex items-center space-x-2 text-gray-600 hover:text-rose-600 transition-colors"
              >
                <Home className="h-5 w-5" />
                <span className="hidden md:inline">Home</span>
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors font-medium"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header Section */}
        <div className={`bg-gradient-to-r ${getGradientColor()} rounded-2xl shadow-xl p-6 mb-8`}>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
                <User className="h-12 w-12 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">{userData.name || 'User'}</h1>
                <div className="flex items-center space-x-4 mt-2">
                  <div className="flex items-center space-x-2 bg-white/20 px-3 py-1 rounded-full">
                    <IconComponent className="h-4 w-4 text-white" />
                    <span className="text-white font-medium">{userType.label}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-300" />
                    <span className="text-white">Verified Account</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center space-x-2 px-4 py-2 bg-white text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-all hover:scale-105"
                >
                  <Edit2 className="h-4 w-4" />
                  <span>Edit Profile</span>
                </button>
              ) : (
                <div className="flex items-center space-x-2">
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="flex items-center space-x-2 px-4 py-2 bg-white text-emerald-600 rounded-lg font-medium hover:bg-emerald-50 transition-all disabled:opacity-50 hover:scale-105"
                  >
                    {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                    <span>{saving ? 'Saving...' : 'Save Changes'}</span>
                  </button>
                  <button
                    onClick={() => {
                      setIsEditing(false);
                      setFormData({ ...userData });
                      setMessage({ type: '', text: '' });
                    }}
                    className="flex items-center space-x-2 px-4 py-2 bg-white text-gray-600 rounded-lg font-medium hover:bg-gray-100 transition-all hover:scale-105"
                  >
                    <X className="h-4 w-4" />
                    <span>Cancel</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Message Alert */}
        {message.text && (
          <div className={`mb-6 p-4 rounded-xl flex items-center space-x-3 animate-fadeIn ${
            message.type === 'success' 
              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
              : 'bg-red-50 text-red-700 border border-red-200'
          }`}>
            {message.type === 'success' ? 
              <CheckCircle className="h-5 w-5 flex-shrink-0" /> : 
              <AlertCircle className="h-5 w-5 flex-shrink-0" />
            }
            <span>{message.text}</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Profile Info */}
          <div className="lg:col-span-2 space-y-8">
            {/* Profile Form */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Profile Information</h2>
                <Settings className="h-5 w-5 text-gray-400" />
              </div>
              
              <div className="space-y-6">
                {/* Common Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <div className="flex items-center space-x-2">
                        <User className="h-4 w-4 text-gray-400" />
                        <span>Full Name *</span>
                      </div>
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="name"
                        value={formData.name || ''}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-300 focus:border-transparent"
                        required
                      />
                    ) : (
                      <div className="px-4 py-3 bg-gray-50 rounded-xl">{userData.name || 'Not provided'}</div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <div className="flex items-center space-x-2">
                        <Mail className="h-4 w-4 text-gray-400" />
                        <span>Email Address *</span>
                      </div>
                    </label>
                    {isEditing ? (
                      <input
                        type="email"
                        name="email"
                        value={formData.email || ''}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-300 focus:border-transparent"
                        required
                      />
                    ) : (
                      <div className="px-4 py-3 bg-gray-50 rounded-xl">{userData.email || 'Not provided'}</div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <div className="flex items-center space-x-2">
                        <Phone className="h-4 w-4 text-gray-400" />
                        <span>Phone Number *</span>
                      </div>
                    </label>
                    {isEditing ? (
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone || ''}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-300 focus:border-transparent"
                        required
                      />
                    ) : (
                      <div className="px-4 py-3 bg-gray-50 rounded-xl">{userData.phone || 'Not provided'}</div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4 text-gray-400" />
                        <span>Address</span>
                      </div>
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="address"
                        value={formData.address || ''}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-300 focus:border-transparent"
                      />
                    ) : (
                      <div className="px-4 py-3 bg-gray-50 rounded-xl">{userData.address || 'Not provided'}</div>
                    )}
                  </div>
                </div>

                {/* User Type Specific Fields */}
                {renderUserTypeFields()}

                {/* Last Updated */}
                <div className="pt-6 border-t border-gray-100">
                  <p className="text-sm text-gray-500">
                    Last updated: {userData.lastUpdated || 'Never'}
                  </p>
                </div>
              </div>
            </div>

            {/* Recent Activity Section */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Activity</h2>
              
              <div className="space-y-4">
                {userData.lastUpdated ? (
                  <div className="flex items-center justify-between p-4 border border-gray-100 rounded-xl">
                    <div className="flex items-center space-x-4">
                      <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600">
                        <CheckCircle className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">Profile Updated</div>
                        <div className="text-sm text-gray-500">You updated your profile information</div>
                      </div>
                    </div>
                    <div className="text-sm text-gray-500">
                      {new Date(userData.lastUpdated).toLocaleDateString()}
                    </div>
                  </div>
                ) : null}

                <div className="flex items-center justify-between p-4 border border-gray-100 rounded-xl">
                  <div className="flex items-center space-x-4">
                    <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
                      <Calendar className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">Account Created</div>
                      <div className="text-sm text-gray-500">You joined JeevanDaan community</div>
                    </div>
                  </div>
                  <div className="text-sm text-gray-500">
                    {new Date(userData.registrationDate || userData.joinDate || Date.now()).toLocaleDateString()}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Stats & Actions */}
          <div className="space-y-8">
            {/* Stats Cards */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Your Stats</h2>
              <div className="grid grid-cols-2 gap-4">
                {stats.map((stat, index) => (
                  <div key={index} className={`p-4 rounded-xl ${stat.bg}`}>
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${stat.color.replace('text-', 'bg-').replace('-500', '-100')}`}>
                        <stat.icon className={`h-5 w-5 ${stat.color}`} />
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

            {/* Account Status */}
            <div className={`bg-gradient-to-r ${getGradientColor().replace('from-', 'from-').replace('to-', 'to-')}/10 rounded-2xl shadow-lg p-6 border ${getGradientColor().replace('from-', 'border-').replace('to-', '-200').split(' ')[0]}`}>
              <div className="flex items-center space-x-3 mb-4">
                <Shield className="h-5 w-5 text-gray-700" />
                <h3 className="font-bold text-gray-900">Account Status</h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Verification</span>
                  <span className="flex items-center space-x-1 text-emerald-600">
                    <CheckCircle className="h-4 w-4" />
                    <span>Verified</span>
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Account Type</span>
                  <span className="font-medium text-gray-900">{userType.label}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Member Since</span>
                  <span className="font-medium text-gray-900">
                    {new Date(userData.registrationDate || userData.joinDate || Date.now()).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h2>
              <div className="space-y-3">
                {quickActions.map((action, index) => (
                  <button
                    key={index}
                    onClick={action.onClick}
                    className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-all hover:scale-[1.02]"
                  >
                    <div className="flex items-center space-x-3">
                      <action.icon className={`h-5 w-5 ${action.color}`} />
                      <span>{action.label}</span>
                    </div>
                    <span className="text-gray-400">→</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Danger Zone */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-red-100">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Account Settings</h2>
              <div className="space-y-3">
                <button
                  onClick={() => {
                    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
                      handleLogout();
                    }
                  }}
                  className="w-full text-left p-3 text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                >
                  Delete Account
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full text-left p-3 text-gray-600 hover:bg-gray-50 rounded-xl transition-colors"
                >
                  Logout from all devices
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-12 py-6 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-600 text-sm">
            JeevanDaan Profile Management • {userType.label} Account • 
            <span className="ml-2 text-gray-500">
              Last updated: {userData.lastUpdated ? new Date(userData.lastUpdated).toLocaleString() : 'Never'}
            </span>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default ProfilePage;