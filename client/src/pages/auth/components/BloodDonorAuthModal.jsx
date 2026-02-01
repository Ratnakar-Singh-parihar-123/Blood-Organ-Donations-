import React, { useState } from 'react';
import { X, Droplets, Eye, EyeOff, User, Mail, Lock, Phone, Calendar, Home } from 'lucide-react';
import { bloodDonorAuthAPI } from '../../../api';
import { useNavigate } from 'react-router-dom';

const BloodDonorAuthModal = ({ isOpen, onClose }) => {
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
    password: '',
    donationDate: '',
    address: ''
  });

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];

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

  const validateRegisterForm = () => {
    const errors = {};
    if (!registerData.fullName.trim()) errors.fullName = 'Full name is required';
    if (!registerData.age) errors.age = 'Age is required';
    if (registerData.age < 18 || registerData.age > 65) errors.age = 'Age must be 18-65 years';
    if (!registerData.bloodGroup) errors.bloodGroup = 'Blood group is required';
    if (!registerData.phone.trim()) errors.phone = 'Phone is required';
    if (!registerData.email.trim()) errors.email = 'Email is required';
    if (!registerData.password) errors.password = 'Password is required';
    if (registerData.password.length < 6) errors.password = 'Password must be at least 6 characters';
    if (!registerData.donationDate) errors.donationDate = 'Donation date is required';
    if (!registerData.address.trim()) errors.address = 'Address is required';
    return errors;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const response = await bloodDonorAuthAPI.login(loginData.email, loginData.password);

      if (response.success) {
        localStorage.setItem('bloodDonorToken', response.token);
        localStorage.setItem('bloodDonor', JSON.stringify(response.donor));

        setMessage({ type: 'success', text: 'Login successful!' });
        setTimeout(() => {
          onClose();
          navigate('/blood');
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
      setMessage({ type: 'error', text: 'Please fill all required fields correctly' });
      setLoading(false);
      return;
    }

    try {
      const response = await bloodDonorAuthAPI.register(registerData);

      if (response.success) {
        setMessage({ type: 'success', text: 'Registration successful! Please login.' });
        setTimeout(() => {
          setIsLogin(true);
          setLoginData({ email: registerData.email, password: '' });
          setRegisterData({
            fullName: '',
            age: '',
            bloodGroup: '',
            phone: '',
            email: '',
            password: '',
            donationDate: '',
            address: ''
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
        <div className="bg-gradient-to-r from-red-500 to-rose-500 p-6 sticky top-0 z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-white/20 p-2 rounded-lg">
                <Droplets className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Blood Donor</h2>
                <p className="text-red-100 text-sm">Save lives with your donation</p>
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
              className={`flex-1 py-3 font-semibold rounded-t-xl ${isLogin ? 'bg-gradient-to-r from-red-500 to-rose-400 text-white' : 'bg-gray-100 text-gray-600'}`}
            >
              Sign In
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-3 font-semibold rounded-t-xl ${!isLogin ? 'bg-gradient-to-r from-red-500 to-rose-400 text-white' : 'bg-gray-100 text-gray-600'}`}
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
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-300 focus:border-transparent"
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
                    className="w-full pl-10 pr-12 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-300 focus:border-transparent"
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
                    <a href="/forgot-password">Forgot Password?</a>
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-gradient-to-r from-red-500 to-rose-400 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
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
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-300 focus:border-transparent"
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
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-300 focus:border-transparent"
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
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-300 focus:border-transparent"
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
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-300 focus:border-transparent"
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
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-300 focus:border-transparent"
                    placeholder="Enter email address"
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
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-300 focus:border-transparent"
                    placeholder="Minimum 6 characters"
                    required
                  />
                </div>
              </div>

              {/* Donation Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Donation Date *</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="date"
                    name="donationDate"
                    value={registerData.donationDate}
                    onChange={(e) => handleChange(e, 'register')}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-300 focus:border-transparent"
                    min={new Date().toISOString().split('T')[0]}
                    required
                  />
                </div>
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
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-300 focus:border-transparent resize-none"
                    placeholder="Enter your complete address"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-gradient-to-r from-red-500 to-rose-400 text-white rounded-lg font-semibold hover:shadow-lg transition-all mt-2"
              >
                {loading ? 'Registering...' : 'Register as Blood Donor'}
              </button>
            </form>
          )}

          <div className="mt-6 pt-6 border-t border-gray-100 text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-red-500 hover:text-red-600 font-medium text-sm"
            >
              {isLogin ? 'Need an account? Register here' : 'Already have an account? Sign in'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BloodDonorAuthModal;