import React, { useState } from 'react';
import { X, Users, Eye, EyeOff, User, Mail, Lock, Phone, Heart, Bell, Globe, TrendingUp } from 'lucide-react';
import { userAuthAPI } from '../../../api';
import { useNavigate } from 'react-router-dom';

const UserAuthModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    userType: 'supporter',
    interests: [],
    notifications: true,
    location: '',
    occupation: '',
    organization: ''
  });

  const userTypes = [
    { value: 'supporter', label: 'Supporter', icon: Heart },
    { value: 'volunteer', label: 'Volunteer', icon: Users },
    { value: 'organization', label: 'Organization', icon: Globe },
    { value: 'healthcare', label: 'Healthcare Worker', icon: TrendingUp }
  ];

  const interestsList = [
    'Blood Donation',
    'Organ Donation',
    'Awareness Programs',
    'Fundraising',
    'Volunteering',
    'Event Management',
    'Medical Support',
    'Community Outreach'
  ];

  if (!isOpen) return null;

  const handleChange = (e, formType) => {
    const { name, value, type, checked } = e.target;
    if (formType === 'login') {
      setLoginData(prev => ({ ...prev, [name]: value }));
    } else {
      if (type === 'checkbox') {
        if (name === 'interests') {
          const updatedInterests = registerData.interests.includes(value)
            ? registerData.interests.filter(interest => interest !== value)
            : [...registerData.interests, value];
          setRegisterData(prev => ({ ...prev, interests: updatedInterests }));
        } else {
          setRegisterData(prev => ({ ...prev, [name]: checked }));
        }
      } else {
        setRegisterData(prev => ({ ...prev, [name]: value }));
      }
    }
    setMessage({ type: '', text: '' });
  };

  const validateRegisterForm = () => {
    const errors = {};
    if (!registerData.name.trim()) errors.name = 'Name is required';
    if (!registerData.email.trim()) errors.email = 'Email is required';
    if (!registerData.phone.trim()) errors.phone = 'Phone is required';
    if (!registerData.password) errors.password = 'Password is required';
    if (registerData.password.length < 6) errors.password = 'Password must be at least 6 characters';
    if (registerData.password !== registerData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
    return errors;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const response = await userAuthAPI.login(loginData.email, loginData.password);

      if (response.success) {
        localStorage.setItem('userToken', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));

        setMessage({ type: 'success', text: 'Login successful!' });
        setTimeout(() => {
          onClose();
          navigate('/');
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
      const { confirmPassword, ...registerPayload } = registerData;
      const response = await userAuthAPI.register(registerPayload);

      if (response.success) {
        setMessage({ type: 'success', text: 'Registration successful! Welcome to our community.' });
        setTimeout(() => {
          setIsLogin(true);
          setLoginData({ email: registerData.email, password: '' });
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
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-6 sticky top-0 z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-white/20 p-2 rounded-lg">
                <Users className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">General User</h2>
                <p className="text-blue-100 text-sm">Support the lifesaving mission</p>
              </div>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-lg transition-colors">
              <X className="h-6 w-6 text-white" />
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-2">
          {/* Left Side - Info */}
          <div className="hidden md:block bg-gradient-to-b from-blue-50 to-cyan-50 p-8">
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Join Our Community</h3>
                <ul className="space-y-3">
                  <li className="flex items-center space-x-3">
                    <Heart className="h-5 w-5 text-blue-500" />
                    <span className="text-gray-700">Stay updated on donation drives</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Bell className="h-5 w-5 text-blue-500" />
                    <span className="text-gray-700">Get notifications about urgent needs</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Globe className="h-5 w-5 text-blue-500" />
                    <span className="text-gray-700">Participate in awareness programs</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <TrendingUp className="h-5 w-5 text-blue-500" />
                    <span className="text-gray-700">Track community impact</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-xl p-4 border border-blue-100">
                <h4 className="font-semibold text-gray-800 mb-2">User Types</h4>
                <div className="space-y-3">
                  {userTypes.map(type => (
                    <div key={type.value} className="flex items-center space-x-3">
                      {React.createElement(type.icon, { className: "h-4 w-4 text-blue-500" })}
                      <span className="text-sm text-gray-600">{type.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="p-6 md:p-8">
            {/* Form Toggle */}
            <div className="flex mb-6">
              <button
                onClick={() => setIsLogin(true)}
                className={`flex-1 py-3 font-semibold rounded-t-xl ${isLogin ? 'bg-gradient-to-r from-blue-500 to-cyan-400 text-white' : 'bg-gray-100 text-gray-600'}`}
              >
                Sign In
              </button>
              <button
                onClick={() => setIsLogin(false)}
                className={`flex-1 py-3 font-semibold rounded-t-xl ${!isLogin ? 'bg-gradient-to-r from-blue-500 to-cyan-400 text-white' : 'bg-gray-100 text-gray-600'}`}
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
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-300"
                      placeholder="user@example.com"
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
                      className="w-full pl-10 pr-12 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-300"
                      placeholder="••••••••"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-between mb-2">
                  {/* <label className="block text-sm font-semibold text-gray-700">Password</label> */}
                  <button type="button" className="text-sm text-blue-500 hover:text-blue-600 font-medium">
                    <a href="/forgot-password">Forgot Password?</a>
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-gradient-to-r from-blue-500 to-cyan-400 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
                >
                  {loading ? 'Signing In...' : 'Sign In'}
                </button>
              </form>
            ) : (
              <form onSubmit={handleRegister} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">User Type *</label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {userTypes.map(type => (
                      <label
                        key={type.value}
                        className={`flex flex-col items-center justify-center p-3 rounded-lg border-2 cursor-pointer transition-all ${registerData.userType === type.value
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                          }`}
                      >
                        <input
                          type="radio"
                          name="userType"
                          value={type.value}
                          checked={registerData.userType === type.value}
                          onChange={(e) => handleChange(e, 'register')}
                          className="sr-only"
                        />
                        {React.createElement(type.icon, {
                          className: `h-5 w-5 mb-2 ${registerData.userType === type.value ? 'text-blue-500' : 'text-gray-400'}`
                        })}
                        <span className={`text-xs font-medium ${registerData.userType === type.value ? 'text-blue-600' : 'text-gray-700'
                          }`}>{type.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        name="name"
                        value={registerData.name}
                        onChange={(e) => handleChange(e, 'register')}
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-300"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="email"
                        name="email"
                        value={registerData.email}
                        onChange={(e) => handleChange(e, 'register')}
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-300"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone *</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="tel"
                        name="phone"
                        value={registerData.phone}
                        onChange={(e) => handleChange(e, 'register')}
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-300"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                    <input
                      type="text"
                      name="location"
                      value={registerData.location}
                      onChange={(e) => handleChange(e, 'register')}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-300"
                      placeholder="City, State"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Password *</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="password"
                        name="password"
                        value={registerData.password}
                        onChange={(e) => handleChange(e, 'register')}
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-300"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password *</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="password"
                        name="confirmPassword"
                        value={registerData.confirmPassword}
                        onChange={(e) => handleChange(e, 'register')}
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-300"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Areas of Interest</label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {interestsList.map(interest => (
                      <label key={interest} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          name="interests"
                          value={interest}
                          checked={registerData.interests.includes(interest)}
                          onChange={(e) => handleChange(e, 'register')}
                          className="h-4 w-4 text-blue-500 rounded"
                        />
                        <span className="text-sm text-gray-600">{interest}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    name="notifications"
                    checked={registerData.notifications}
                    onChange={(e) => handleChange(e, 'register')}
                    className="h-4 w-4 text-blue-500 rounded"
                  />
                  <span className="text-sm text-gray-600">
                    Receive notifications about donation drives and urgent needs
                  </span>
                </label>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-gradient-to-r from-blue-500 to-cyan-400 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
                >
                  {loading ? 'Registering...' : 'Join as Community User'}
                </button>
              </form>
            )}

            <div className="mt-6 pt-6 border-t border-gray-100 text-center">
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-blue-500 hover:text-blue-600 font-medium"
              >
                {isLogin ? 'Need an account? Register here' : 'Already have an account? Sign in'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserAuthModal;