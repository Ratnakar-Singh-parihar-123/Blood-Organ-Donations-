import React, { useState } from 'react';
import { X, Eye, EyeOff, User, Mail, Lock, Phone, Heart, Home, AlertCircle, UserCog } from 'lucide-react';
import { organDonorAuthAPI } from '../../../api';
import { useNavigate , Link } from 'react-router-dom';

const OrganDonorAuthModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const [loginData, setLoginData] = useState({ email: '', password: '' });

  const [registerData, setRegisterData] = useState({
    fullName: '',
    age: '',
    bloodGroup: '',
    phone: '',
    email: '',
    organsToDonate: [],
    emergencyContact: {
      name: '',
      phone: '',
      relation: ''
    },
    medicalHistory: '',
    address: '',
    password: ''
  });

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];
  const organs = ['Kidney', 'Liver', 'Heart', 'Lungs', 'Pancreas', 'Eyes', 'Bone Marrow'];

  if (!isOpen) return null;

  const handleChange = (e, formType) => {
    const { name, value } = e.target;
    if (formType === 'login') {
      setLoginData(prev => ({ ...prev, [name]: value }));
    } else {
      setRegisterData(prev => ({ ...prev, [name]: value }));
    }
    setMessage({ type: '', text: '' });
  };

  const handleEmergencyContactChange = (field, value) => {
    setRegisterData(prev => ({
      ...prev,
      emergencyContact: {
        ...prev.emergencyContact,
        [field]: value
      }
    }));
  };

  const handleOrganChange = (organ) => {
    setRegisterData(prev => {
      const updatedOrgans = prev.organsToDonate.includes(organ)
        ? prev.organsToDonate.filter(o => o !== organ)
        : [...prev.organsToDonate, organ];
      return { ...prev, organsToDonate: updatedOrgans };
    });
  };

  const validateRegisterForm = () => {
    const errors = {};
    if (!registerData.fullName.trim()) errors.fullName = 'Full name is required';
    if (!registerData.age) errors.age = 'Age is required';
    if (registerData.age < 18 || registerData.age > 65) errors.age = 'Age must be 18-65 years';
    if (!registerData.bloodGroup) errors.bloodGroup = 'Blood group is required';
    if (!registerData.phone.trim()) errors.phone = 'Phone is required';
    if (registerData.phone.length < 10) errors.phone = 'Valid phone number required';
    if (!registerData.email.trim()) errors.email = 'Email is required';
    if (!/^\S+@\S+\.\S+$/.test(registerData.email)) errors.email = 'Invalid email format';

    // Emergency Contact validation
    if (!registerData.emergencyContact.name?.trim()) errors.emergencyContactName = 'Emergency contact name is required';
    if (!registerData.emergencyContact.phone?.trim()) errors.emergencyContactPhone = 'Emergency contact phone is required';
    if (!registerData.emergencyContact.relation?.trim()) errors.emergencyContactRelation = 'Relation is required';

    if (!registerData.medicalHistory.trim()) errors.medicalHistory = 'Medical history is required';
    if (!registerData.address.trim()) errors.address = 'Address is required';
    if (!registerData.password) errors.password = 'Password is required';
    if (registerData.password.length < 6) errors.password = 'Password must be at least 6 characters';
    if (registerData.organsToDonate.length === 0) errors.organs = 'Select at least one organ to donate';

    return errors;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const response = await organDonorAuthAPI.login(loginData.email, loginData.password);

      if (response.success) {
        localStorage.setItem('organDonorToken', response.token);
        localStorage.setItem('organDonor', JSON.stringify(response.donor));

        setMessage({ type: 'success', text: 'Login successful!' });
        setTimeout(() => {
          onClose();
          navigate('/organ');
        }, 1500);
      }
    } catch (error) {
      setMessage({ type: 'error', text: error.message || 'Login failed' });
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    const errors = validateRegisterForm();
    if (Object.keys(errors).length > 0) {
      const firstError = Object.values(errors)[0];
      setMessage({ type: 'error', text: firstError });
      setLoading(false);
      return;
    }

    try {
      // Prepare data for API - keep emergencyContact as object
      const registrationData = {
        fullName: registerData.fullName,
        age: registerData.age,
        bloodGroup: registerData.bloodGroup,
        phone: registerData.phone,
        email: registerData.email,
        organsToDonate: registerData.organsToDonate,
        emergencyContact: registerData.emergencyContact,
        medicalHistory: registerData.medicalHistory,
        address: registerData.address,
        password: registerData.password
      };

      const response = await organDonorAuthAPI.register(registrationData);

      if (response.success) {
        setMessage({ type: 'success', text: 'Registration successful! Please login.' });
        setTimeout(() => {
          setIsLogin(true);
          setLoginData({ email: registerData.email, password: '' });
          // Reset form
          setRegisterData({
            fullName: '',
            age: '',
            bloodGroup: '',
            phone: '',
            email: '',
            organsToDonate: [],
            emergencyContact: {
              name: '',
              phone: '',
              relation: ''
            },
            medicalHistory: '',
            address: '',
            password: ''
          });
        }, 2000);
      }
    } catch (error) {
      setMessage({ type: 'error', text: error.message || 'Registration failed' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-500 to-green-500 p-6 sticky top-0 z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-white/20 p-2 rounded-lg">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Organ Donor</h2>
                <p className="text-emerald-100 text-sm">Give the gift of life</p>
              </div>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-lg transition-colors">
              <X className="h-6 w-6 text-white" />
            </button>
          </div>
        </div>

        {/* Form */}
        <div className="p-6">
          {/* Form Toggle */}
          <div className="flex mb-6">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-3 font-semibold rounded-t-xl ${isLogin ? 'bg-gradient-to-r from-emerald-500 to-green-400 text-white' : 'bg-gray-100 text-gray-600'}`}
            >
              Sign In
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-3 font-semibold rounded-t-xl ${!isLogin ? 'bg-gradient-to-r from-emerald-500 to-green-400 text-white' : 'bg-gray-100 text-gray-600'}`}
            >
              Sign Up
            </button>
          </div>

          {message.text && (
            <div className={`mb-4 p-3 rounded-lg ${message.type === 'success' ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'}`}>
              {message.text}
            </div>
          )}

          {isLogin ? (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    value={loginData.email}
                    onChange={(e) => handleChange(e, 'login')}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-300 focus:border-transparent"
                    placeholder="donor@example.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={loginData.password}
                    onChange={(e) => handleChange(e, 'login')}
                    className="w-full pl-10 pr-12 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-300 focus:border-transparent"
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                <div className="flex items-center justify-between mb-5">
                  {/* <label className="block text-sm font-semibold text-gray-700">Password</label> */}
                  <button type="button" className="text-sm text-blue-500 hover:text-blue-600 font-medium">
                    <Link to="/forgot-password">Forgot Password?</Link>
                    
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-gradient-to-r from-emerald-500 to-green-400 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
              >
                {loading ? 'Signing In...' : 'Sign In'}
              </button>
            </form>
          ) : (
            <form onSubmit={handleRegister} className="space-y-4">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    name="fullName"
                    value={registerData.fullName}
                    onChange={(e) => handleChange(e, 'register')}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-300 focus:border-transparent"
                    placeholder="Enter your full name"
                    required
                  />
                </div>
              </div>

              {/* Age */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Age *</label>
                <input
                  type="number"
                  name="age"
                  value={registerData.age}
                  onChange={(e) => handleChange(e, 'register')}
                  min="18"
                  max="65"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-300 focus:border-transparent"
                  placeholder="18-65 years"
                  required
                />
              </div>

              {/* Blood Group */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Blood Group *</label>
                <select
                  name="bloodGroup"
                  value={registerData.bloodGroup}
                  onChange={(e) => handleChange(e, 'register')}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-300 focus:border-transparent"
                  required
                >
                  <option value="">Select Blood Group</option>
                  {bloodGroups.map(group => (
                    <option key={group} value={group}>{group}</option>
                  ))}
                </select>
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="tel"
                    name="phone"
                    value={registerData.phone}
                    onChange={(e) => handleChange(e, 'register')}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-300 focus:border-transparent"
                    placeholder="Enter 10-digit phone number"
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    value={registerData.email}
                    onChange={(e) => handleChange(e, 'register')}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-300 focus:border-transparent"
                    placeholder="Enter email address"
                    required
                  />
                </div>
              </div>

              {/* Organs to Donate */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Organs to Donate *</label>
                <div className="grid grid-cols-2 gap-2">
                  {organs.map(organ => (
                    <button
                      key={organ}
                      type="button"
                      onClick={() => handleOrganChange(organ)}
                      className={`py-2 px-3 rounded-lg border text-sm transition-colors ${registerData.organsToDonate.includes(organ)
                          ? 'bg-emerald-100 text-emerald-700 border-emerald-300'
                          : 'bg-gray-50 text-gray-700 border-gray-200 hover:border-emerald-300'
                        }`}
                    >
                      {organ}
                    </button>
                  ))}
                </div>
              </div>

              {/* Emergency Contact */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Emergency Contact *</label>

                {/* Name */}
                <div className="relative mb-3">
                  <UserCog className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Contact Name"
                    value={registerData.emergencyContact.name}
                    onChange={(e) => handleEmergencyContactChange('name', e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-300 focus:border-transparent"
                    required
                  />
                </div>

                {/* Phone */}
                <div className="relative mb-3">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="tel"
                    placeholder="Contact Phone"
                    value={registerData.emergencyContact.phone}
                    onChange={(e) => handleEmergencyContactChange('phone', e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-300 focus:border-transparent"
                    required
                  />
                </div>

                {/* Relation */}
                <div className="relative">
                  <AlertCircle className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Relation (Father, Mother, Friend)"
                    value={registerData.emergencyContact.relation}
                    onChange={(e) => handleEmergencyContactChange('relation', e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-300 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              {/* Medical History */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Medical History *</label>
                <textarea
                  name="medicalHistory"
                  value={registerData.medicalHistory}
                  onChange={(e) => handleChange(e, 'register')}
                  rows="3"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-300 focus:border-transparent resize-none"
                  placeholder="Any medical conditions, allergies, surgeries, etc."
                  required
                />
              </div>

              {/* Address */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Address *</label>
                <div className="relative">
                  <Home className="absolute left-3 top-4 h-5 w-5 text-gray-400" />
                  <textarea
                    name="address"
                    value={registerData.address}
                    onChange={(e) => handleChange(e, 'register')}
                    rows="3"
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-300 focus:border-transparent resize-none"
                    placeholder="Enter your complete address"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Password *</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="password"
                    name="password"
                    value={registerData.password}
                    onChange={(e) => handleChange(e, 'register')}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-300 focus:border-transparent"
                    placeholder="Minimum 6 characters"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-gradient-to-r from-emerald-500 to-green-400 text-white rounded-lg font-semibold hover:shadow-lg transition-all mt-2"
              >
                {loading ? 'Registering...' : 'Register as Organ Donor'}
              </button>
            </form>
          )}

          <div className="mt-6 pt-6 border-t border-gray-100 text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-emerald-500 hover:text-emerald-600 font-medium text-sm"
            >
              {isLogin ? 'Need an account? Register here' : 'Already have an account? Sign in'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrganDonorAuthModal;