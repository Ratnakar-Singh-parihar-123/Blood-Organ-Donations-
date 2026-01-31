import React, { useState } from 'react';
import { X, ActivityIcon, Eye, EyeOff, User, Mail, Lock, Phone, Shield, FileText } from 'lucide-react';
import { organDonorAuthAPI } from '../../../api';
import { useNavigate } from 'react-router-dom';

const OrganDonorAuthModal = ({ isOpen, onClose }) => {
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
    age: '',
    organsToDonate: [],
    medicalHistory: '',
    familyConsent: false,
    legalDocument: false
  });

  const organs = ['Kidney', 'Liver', 'Heart', 'Lungs', 'Pancreas', 'Eyes', 'Bone Marrow'];

  if (!isOpen) return null;

  const handleChange = (e, formType) => {
    const { name, value, type, checked } = e.target;
    if (formType === 'login') {
      setLoginData(prev => ({ ...prev, [name]: value }));
    } else {
      if (type === 'checkbox') {
        setRegisterData(prev => ({ ...prev, [name]: checked }));
      } else if (name === 'organsToDonate') {
        const updatedOrgans = registerData.organsToDonate.includes(value)
          ? registerData.organsToDonate.filter(organ => organ !== value)
          : [...registerData.organsToDonate, value];
        setRegisterData(prev => ({ ...prev, organsToDonate: updatedOrgans }));
      } else {
        setRegisterData(prev => ({ ...prev, [name]: value }));
      }
    }
    setMessage({ type: '', text: '' });
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

    if (!registerData.familyConsent || !registerData.legalDocument) {
      setMessage({ type: 'error', text: 'Please agree to all terms and conditions' });
      setLoading(false);
      return;
    }

    try {
      const { confirmPassword, ...registerPayload } = registerData;
      const response = await organDonorAuthAPI.register(registerPayload);
      
      if (response.success) {
        setMessage({ type: 'success', text: 'Registration successful! Please login.' });
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
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-500 to-green-500 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-white/20 p-2 rounded-lg">
                <ActivityIcon className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Organ Donor</h2>
                <p className="text-emerald-100 text-sm">Give the gift of life</p>
              </div>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-lg transition-colors">
              <X className="h-6 w-6 text-white" />
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-2">
          {/* Left Side - Info */}
          <div className="hidden md:block bg-gradient-to-b from-emerald-50 to-green-50 p-8">
            <div className="space-y-6">
              <div className="bg-white rounded-xl p-4 border border-emerald-100">
                <h4 className="font-semibold text-gray-800 mb-3">Important Information</h4>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li className="flex items-start space-x-2">
                    <Shield className="h-4 w-4 text-emerald-500 mt-0.5" />
                    <span>Organ donation is a serious commitment requiring family consent</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <FileText className="h-4 w-4 text-emerald-500 mt-0.5" />
                    <span>Legal documentation and medical evaluation required</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="p-6 md:p-8">
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
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-300"
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
                      className="w-full pl-10 pr-12 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-300"
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
                  className="w-full py-3 bg-gradient-to-r from-emerald-500 to-green-400 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
                >
                  {loading ? 'Signing In...' : 'Sign In'}
                </button>
              </form>
            ) : (
              <form onSubmit={handleRegister} className="space-y-4">
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
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-300"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Age *</label>
                    <input
                      type="number"
                      name="age"
                      value={registerData.age}
                      onChange={(e) => handleChange(e, 'register')}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-300"
                      required
                    />
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
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-300"
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
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-300"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Organs to Donate</label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {organs.map(organ => (
                      <label key={organ} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          name="organsToDonate"
                          value={organ}
                          checked={registerData.organsToDonate.includes(organ)}
                          onChange={(e) => handleChange(e, 'register')}
                          className="h-4 w-4 text-emerald-500 rounded"
                        />
                        <span className="text-sm">{organ}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      name="familyConsent"
                      checked={registerData.familyConsent}
                      onChange={(e) => handleChange(e, 'register')}
                      className="h-4 w-4 text-emerald-500 rounded mt-0.5"
                      required
                    />
                    <span className="text-sm text-gray-600">
                      I have discussed organ donation with my family and have their consent
                    </span>
                  </label>

                  <label className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      name="legalDocument"
                      checked={registerData.legalDocument}
                      onChange={(e) => handleChange(e, 'register')}
                      className="h-4 w-4 text-emerald-500 rounded mt-0.5"
                      required
                    />
                    <span className="text-sm text-gray-600">
                      I understand the legal implications and agree to complete the required documentation
                    </span>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-gradient-to-r from-emerald-500 to-green-400 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
                >
                  {loading ? 'Registering...' : 'Register as Organ Donor'}
                </button>
              </form>
            )}

            <div className="mt-6 pt-6 border-t border-gray-100 text-center">
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-emerald-500 hover:text-emerald-600 font-medium"
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

export default OrganDonorAuthModal;