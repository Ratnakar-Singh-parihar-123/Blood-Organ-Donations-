import React, { useState } from 'react';
import { X, Ambulance, Eye, EyeOff, User, Mail, Lock, Phone, Hospital, Calendar, Users, AlertCircle } from 'lucide-react';
import { patientAuthAPI } from '../../../api';
import { useNavigate } from 'react-router-dom';

const PatientAuthModal = ({ isOpen, onClose }) => {
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
    patientType: 'self',
    bloodGroup: '',
    medicalCondition: '',
    urgencyLevel: 'normal',
    hospitalName: '',
    doctorName: '',
    emergencyContact: '',
    address: ''
  });

  const patientTypes = [
    { value: 'self', label: 'Self' },
    { value: 'family', label: 'Family Member' },
    { value: 'friend', label: 'Friend' }
  ];

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];
  const urgencyLevels = [
    { value: 'normal', label: 'Normal', color: 'bg-blue-100 text-blue-800' },
    { value: 'urgent', label: 'Urgent', color: 'bg-amber-100 text-amber-800' },
    { value: 'emergency', label: 'Emergency', color: 'bg-red-100 text-red-800' }
  ];

  if (!isOpen) return null;

  const handleChange = (e, formType) => {
    const { name, value, type, checked } = e.target;
    if (formType === 'login') {
      setLoginData(prev => ({ ...prev, [name]: value }));
    } else {
      if (type === 'checkbox') {
        setRegisterData(prev => ({ ...prev, [name]: checked }));
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
    if (!registerData.patientType) errors.patientType = 'Please select patient type';
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
      const response = await patientAuthAPI.login(loginData.email, loginData.password);
      
      if (response.success) {
        localStorage.setItem('patientToken', response.token);
        localStorage.setItem('patient', JSON.stringify(response.patient));
        
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
      const response = await patientAuthAPI.register(registerPayload);
      
      if (response.success) {
        setMessage({ type: 'success', text: 'Registration successful! You can now post requests.' });
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
        <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-6 sticky top-0 z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-white/20 p-2 rounded-lg">
                <Ambulance className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Patient & Family</h2>
                <p className="text-amber-100 text-sm">Find donors, get help</p>
              </div>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-lg transition-colors">
              <X className="h-6 w-6 text-white" />
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-2">
          {/* Left Side - Info */}
          <div className="hidden md:block bg-gradient-to-b from-amber-50 to-orange-50 p-8">
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">How We Help Patients</h3>
                <ul className="space-y-3">
                  <li className="flex items-center space-x-3">
                    <AlertCircle className="h-5 w-5 text-amber-500" />
                    <span className="text-gray-700">Emergency donor matching within hours</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Hospital className="h-5 w-5 text-amber-500" />
                    <span className="text-gray-700">Connect with verified hospitals</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Users className="h-5 w-5 text-amber-500" />
                    <span className="text-gray-700">Support from 50K+ donors</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Calendar className="h-5 w-5 text-amber-500" />
                    <span className="text-gray-700">24/7 emergency support</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-xl p-4 border border-amber-100">
                <h4 className="font-semibold text-gray-800 mb-2">Urgency Levels</h4>
                <div className="space-y-2">
                  {urgencyLevels.map(level => (
                    <div key={level.value} className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">{level.label}</span>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${level.color}`}>
                        {level.value === 'emergency' ? 'Immediate' : 
                         level.value === 'urgent' ? 'Within 24h' : 'Regular'}
                      </span>
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
                className={`flex-1 py-3 font-semibold rounded-t-xl ${isLogin ? 'bg-gradient-to-r from-amber-500 to-orange-400 text-white' : 'bg-gray-100 text-gray-600'}`}
              >
                Sign In
              </button>
              <button
                onClick={() => setIsLogin(false)}
                className={`flex-1 py-3 font-semibold rounded-t-xl ${!isLogin ? 'bg-gradient-to-r from-amber-500 to-orange-400 text-white' : 'bg-gray-100 text-gray-600'}`}
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
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-300"
                      placeholder="patient@example.com"
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
                      className="w-full pl-10 pr-12 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-300"
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

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-gradient-to-r from-amber-500 to-orange-400 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
                >
                  {loading ? 'Signing In...' : 'Sign In'}
                </button>
              </form>
            ) : (
              <form onSubmit={handleRegister} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Patient Type *</label>
                  <div className="grid grid-cols-3 gap-2">
                    {patientTypes.map(type => (
                      <label
                        key={type.value}
                        className={`flex items-center justify-center p-3 rounded-lg border-2 cursor-pointer transition-all ${
                          registerData.patientType === type.value
                            ? 'border-amber-500 bg-amber-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <input
                          type="radio"
                          name="patientType"
                          value={type.value}
                          checked={registerData.patientType === type.value}
                          onChange={(e) => handleChange(e, 'register')}
                          className="sr-only"
                        />
                        <span className={`font-medium ${
                          registerData.patientType === type.value ? 'text-amber-600' : 'text-gray-700'
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
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-300"
                        placeholder={registerData.patientType === 'self' ? 'Patient Name' : 'Your Name'}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Blood Group (if known)</label>
                    <select
                      name="bloodGroup"
                      value={registerData.bloodGroup}
                      onChange={(e) => handleChange(e, 'register')}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-300"
                    >
                      <option value="">Select Blood Group</option>
                      {bloodGroups.map(group => (
                        <option key={group} value={group}>{group}</option>
                      ))}
                    </select>
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
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-300"
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
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-300"
                        required
                      />
                    </div>
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
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-300"
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
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-300"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Urgency Level</label>
                  <div className="grid grid-cols-3 gap-2">
                    {urgencyLevels.map(level => (
                      <label
                        key={level.value}
                        className={`flex items-center justify-center p-3 rounded-lg border-2 cursor-pointer transition-all ${
                          registerData.urgencyLevel === level.value
                            ? 'border-amber-500 bg-amber-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <input
                          type="radio"
                          name="urgencyLevel"
                          value={level.value}
                          checked={registerData.urgencyLevel === level.value}
                          onChange={(e) => handleChange(e, 'register')}
                          className="sr-only"
                        />
                        <span className={`font-medium ${
                          registerData.urgencyLevel === level.value ? 'text-amber-600' : 'text-gray-700'
                        }`}>{level.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-gradient-to-r from-amber-500 to-orange-400 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
                >
                  {loading ? 'Registering...' : 'Register as Patient/Family'}
                </button>
              </form>
            )}

            <div className="mt-6 pt-6 border-t border-gray-100 text-center">
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-amber-500 hover:text-amber-600 font-medium"
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

export default PatientAuthModal;