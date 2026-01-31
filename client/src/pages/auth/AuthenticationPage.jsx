import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authAPI } from '../../api/api';
import { formatApiError } from '../../api/apiConfig';
import { 
  Heart, 
  Eye, 
  EyeOff, 
  User, 
  Mail, 
  Lock, 
  Phone, 
  Shield,
  CheckCircle,
  AlertCircle,
  Loader2,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Home,
  Droplets,
  ActivityIcon,
  Ambulance,
  Hospital,
  Stethoscope,
  Users,
  Calendar,
  MapPin,
  Briefcase,
  Clock,
  Award,
  Sparkles,
  Zap
} from 'lucide-react';

const AuthenticationPage = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [userType, setUserType] = useState(''); // 'blood-donor', 'organ-donor', 'patient', 'hospital'
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [activeSlide, setActiveSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [showUserTypeSelection, setShowUserTypeSelection] = useState(true);

  // Form states
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    bloodGroup: '',
    userRole: '', // Will be set based on userType selection
    additionalData: {}
  });

  // Check mobile screen
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Check if user is already logged in
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      verifyToken();
    }
  }, []);

  const verifyToken = async () => {
    try {
      const response = await authAPI.verifyToken();
      if (response.success) {
        navigate('/');
      }
    } catch (error) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  };

  // User types with detailed info
  const userTypes = [
    {
      id: 'blood-donor',
      title: 'Blood Donor',
      description: 'Donate blood regularly and save lives',
      icon: Droplets,
      color: 'from-red-500 to-rose-500',
      bgColor: 'bg-gradient-to-br from-red-500/10 to-rose-500/10',
      borderColor: 'border-red-200',
      stats: '1 donation = 3 lives saved',
      features: ['Regular donation reminders', 'Health tracking', 'Rewards & recognition']
    },
    {
      id: 'organ-donor',
      title: 'Organ Donor',
      description: 'Pledge organs for transplantation',
      icon: ActivityIcon,
      color: 'from-emerald-500 to-green-500',
      bgColor: 'bg-gradient-to-br from-emerald-500/10 to-green-500/10',
      borderColor: 'border-emerald-200', 
      stats: 'Can save 8+ lives',
      features: ['Organ donor registry', 'Family consent management', 'Medical documentation']
    },
    {
      id: 'patient',
      title: 'Patient/Receiver',
      description: 'Find donors and request help',
      icon: Ambulance,
      color: 'from-amber-500 to-orange-500',
      bgColor: 'bg-gradient-to-br from-amber-500/10 to-orange-500/10',
      borderColor: 'border-amber-200',
      stats: 'Get urgent help 24/7',
      features: ['Emergency requests', 'Donor matching', 'Hospital coordination']
    },
    {
      id: 'hospital',
      title: 'Hospital Staff',
      description: 'Manage donations and patients',
      icon: Stethoscope,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-gradient-to-br from-blue-500/10 to-cyan-500/10',
      borderColor: 'border-blue-200',
      stats: 'Connect with 50K+ donors',
      features: ['Donor management', 'Inventory tracking', 'Emergency coordination']
    }
  ];

  // Blood groups
  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];

  // Slides for mobile carousel
  const slides = [
    {
      title: "Every Donor is a Hero",
      description: "Join our community of life-savers",
      icon: Heart,
      color: "from-rose-500 to-pink-500",
      bgColor: "bg-gradient-to-br from-rose-500/90 to-rose-600/90"
    },
    {
      title: "Real-time Matching",
      description: "Instant donor-patient connections",
      icon: Users,
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-gradient-to-br from-blue-500/90 to-blue-600/90"
    },
    {
      title: "24/7 Emergency Support",
      description: "Always here when you need us",
      color: "from-emerald-500 to-green-500",
      bgColor: "bg-gradient-to-br from-emerald-500/90 to-emerald-600/90",
      icon: Clock
    }
  ];

  // Auto slide on mobile
  useEffect(() => {
    if (isMobile && !showUserTypeSelection) {
      const interval = setInterval(() => {
        setActiveSlide((prev) => (prev + 1) % slides.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [isMobile, showUserTypeSelection, slides.length]);

  // Handle user type selection
  const handleUserTypeSelect = (typeId) => {
    setUserType(typeId);
    setShowUserTypeSelection(false);
    
    // Set user role based on selection
    const selectedType = userTypes.find(t => t.id === typeId);
    setRegisterData(prev => ({
      ...prev,
      userRole: selectedType?.title.toLowerCase().replace(' ', '-') || ''
    }));
    
    // Clear any previous validation errors
    setValidationErrors({});
    setMessage({ type: '', text: '' });
  };

  // Handle form changes
  const handleChange = (e, formType) => {
    const { name, value } = e.target;
    
    if (formType === 'login') {
      setLoginData(prev => ({ ...prev, [name]: value }));
    } else {
      setRegisterData(prev => ({ ...prev, [name]: value }));
    }
    
    setValidationErrors(prev => ({ ...prev, [name]: '' }));
    setMessage({ type: '', text: '' });
  };

  // Validate form data
  const validateForm = (data, isLoginForm = false) => {
    const errors = {};
    
    if (!isLoginForm) {
      if (!data.name.trim()) errors.name = 'Name is required';
      if (!data.email.trim()) {
        errors.email = 'Email is required';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
        errors.email = 'Invalid email format';
      }
      
      if (!data.phone.trim()) {
        errors.phone = 'Phone number is required';
      } else if (!/^[+]?[0-9\s\-\(\)]{10,}$/.test(data.phone)) {
        errors.phone = 'Invalid phone number';
      }
      
      if (!data.password) {
        errors.password = 'Password is required';
      } else if (data.password.length < 6) {
        errors.password = 'Password must be at least 6 characters';
      }
      
      if (data.password !== data.confirmPassword) {
        errors.confirmPassword = 'Passwords do not match';
      }
      
      if (!userType) {
        errors.userType = 'Please select a user type';
      }
    } else {
      if (!data.email.trim()) {
        errors.email = 'Email is required';
      }
      if (!data.password) {
        errors.password = 'Password is required';
      }
    }
    
    return errors;
  };

  // Handle login
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });
    setValidationErrors({});

    const errors = validateForm(loginData, true);
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      setLoading(false);
      return;
    }

    try {
      const response = await authAPI.login(loginData.email, loginData.password);

      if (response.success) {
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
        
        setMessage({ 
          type: 'success', 
          text: 'Login successful! Redirecting...' 
        });
        
        setTimeout(() => navigate('/'), 1500);
      }
      
    } catch (error) {
      const formattedError = formatApiError(error);
      
      if (error.errors) {
        setValidationErrors(error.errors);
      }
      
      setMessage({ 
        type: 'error', 
        text: formattedError.message 
      });
    } finally {
      setLoading(false);
    }
  };

  // Handle register
  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });
    setValidationErrors({});

    const errors = validateForm(registerData);
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      setLoading(false);
      return;
    }

    try {
      const { confirmPassword, ...registerPayload } = registerData;
      
      // Add user type specific data
      const selectedType = userTypes.find(t => t.id === userType);
      const completePayload = {
        ...registerPayload,
        userType: selectedType?.id,
        userTypeTitle: selectedType?.title,
        registrationDate: new Date().toISOString(),
        profileComplete: false
      };

      const response = await authAPI.register(completePayload);

      if (response.success) {
        setMessage({ 
          type: 'success', 
          text: response.message || `Successfully registered as ${selectedType?.title}!` 
        });
        
        setTimeout(() => {
          setIsLogin(true);
          setLoginData({
            email: registerData.email,
            password: ''
          });
          
          // Reset form
          setRegisterData({
            name: '',
            email: '',
            phone: '',
            password: '',
            confirmPassword: '',
            bloodGroup: '',
            userRole: '',
            additionalData: {}
          });
          
          setUserType('');
          setShowUserTypeSelection(true);
        }, 2000);
      }
      
    } catch (error) {
      const formattedError = formatApiError(error);
      
      if (error.errors) {
        setValidationErrors(error.errors);
      }
      
      setMessage({ 
        type: 'error', 
        text: formattedError.message 
      });
    } finally {
      setLoading(false);
    }
  };

  // Handle manual slide navigation
  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // Clear messages when switching forms
  useEffect(() => {
    setMessage({ type: '', text: '' });
    setValidationErrors({});
  }, [isLogin]);

  // Go back to user type selection
  const handleBackToUserType = () => {
    setShowUserTypeSelection(true);
    setUserType('');
    setValidationErrors({});
    setMessage({ type: '', text: '' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-blue-50 flex items-center justify-center p-4 md:p-8">
      {/* Home Button */}
      <Link 
        to="/" 
        className="fixed top-4 left-4 z-50 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg border border-rose-100 hover:bg-white transition-all duration-300 hover:scale-105"
      >
        <Home className="h-5 w-5 text-rose-500" />
      </Link>

      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden">
        <div className="grid md:grid-cols-2">
          {/* Left Side - Image & Quote (Hidden on Mobile) */}
          <div className="hidden md:block relative bg-gradient-to-br from-rose-500 to-rose-600">
            <div 
              className="absolute inset-0 bg-cover bg-center opacity-20"
              style={{
                backgroundImage: 'url("https://images.unsplash.com/photo-1516549655669-df4f6a6f8d64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80")'
              }}
            ></div>
            
            <div className="relative z-10 h-full p-8 lg:p-12 flex flex-col justify-between text-white">
              <div>
                <div className="flex items-center space-x-3 mb-8">
                  <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-sm">
                    <Heart className="h-8 w-8" fill="white" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold">LifeStream</h1>
                    <p className="text-rose-100/90">Uniting Donors & Patients</p>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <h2 className="text-3xl lg:text-4xl font-bold leading-tight">
                    Join the <br />
                    Lifesaving Community
                  </h2>
                  
                  <p className="text-lg text-rose-100/90 leading-relaxed">
                    Whether you're a donor wanting to save lives or someone in need of help, 
                    we connect people in the most critical moments.
                  </p>
                  
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm hover:bg-white/20 transition-all duration-300">
                      <div className="text-2xl font-bold">50K+</div>
                      <div className="text-sm text-rose-100/90">Active Donors</div>
                    </div>
                    <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm hover:bg-white/20 transition-all duration-300">
                      <div className="text-2xl font-bold">24/7</div>
                      <div className="text-sm text-rose-100/90">Emergency Support</div>
                    </div>
                    <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm hover:bg-white/20 transition-all duration-300">
                      <div className="text-2xl font-bold">1000+</div>
                      <div className="text-sm text-rose-100/90">Lives Saved</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="border-t border-white/20 pt-6">
                <div className="flex items-center space-x-4">
                  <Award className="h-8 w-8 text-yellow-300" />
                  <blockquote className="italic text-rose-100/90">
                    "The greatest gift you can give someone is your time, your attention, your love, and your life."
                  </blockquote>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Hero Section */}
          <div className="md:hidden">
            <div className={`relative h-64 ${slides[activeSlide].bgColor} transition-all duration-500`}>
              <div 
                className="absolute inset-0 bg-cover bg-center opacity-20"
                style={{
                  backgroundImage: 'url("https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80")'
                }}
              ></div>
              
              <div className="relative z-10 h-full p-6 flex flex-col justify-center items-center text-center text-white">
                <div className="mb-4">
                  <h2 className="text-2xl font-bold mb-2">{slides[activeSlide].title}</h2>
                  <p className="text-white/90">{slides[activeSlide].description}</p>
                </div>
                
                <div className="flex space-x-2 mt-4">
                  {slides.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveSlide(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        activeSlide === index ? 'bg-white w-6' : 'bg-white/50'
                      }`}
                    />
                  ))}
                </div>
                
                <div className="absolute top-1/2 left-4 right-4 flex justify-between transform -translate-y-1/2">
                  <button
                    onClick={prevSlide}
                    className="bg-white/20 backdrop-blur-sm p-2 rounded-full hover:bg-white/30 transition-all"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={nextSlide}
                    className="bg-white/20 backdrop-blur-sm p-2 rounded-full hover:bg-white/30 transition-all"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Forms */}
          <div className="p-4 sm:p-6 md:p-8 lg:p-12">
            {/* Mobile Logo */}
            <div className="md:hidden flex items-center justify-center mb-6">
              <div className="flex items-center space-x-3">
                <div className="bg-gradient-to-r from-rose-500 to-rose-400 p-3 rounded-2xl">
                  <Heart className="h-8 w-8 text-white" fill="white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">LifeStream</h1>
                  <p className="text-sm text-gray-600">Uniting Donors & Patients</p>
                </div>
              </div>
            </div>

            {/* Form Toggle */}
            <div className="flex mb-6">
              <button
                onClick={() => {
                  setIsLogin(true);
                  setShowUserTypeSelection(false);
                }}
                className={`flex-1 py-3 font-semibold rounded-t-xl transition-all duration-300 text-sm sm:text-base ${
                  isLogin && !showUserTypeSelection
                    ? 'bg-gradient-to-r from-rose-500 to-rose-400 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => {
                  setIsLogin(false);
                  setShowUserTypeSelection(true);
                  setUserType('');
                }}
                className={`flex-1 py-3 font-semibold rounded-t-xl transition-all duration-300 text-sm sm:text-base ${
                  !isLogin
                    ? 'bg-gradient-to-r from-rose-500 to-rose-400 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Sign Up
              </button>
            </div>

            {/* Message Alert */}
            {message.text && (
              <div className={`mb-4 sm:mb-6 p-3 sm:p-4 rounded-xl flex items-center space-x-3 ${
                message.type === 'success' 
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  : 'bg-red-50 text-red-700 border border-red-200'
              }`}>
                {message.type === 'success' ? (
                  <CheckCircle className="h-5 w-5 flex-shrink-0" />
                ) : (
                  <AlertCircle className="h-5 w-5 flex-shrink-0" />
                )}
                <span className="text-sm sm:text-base">{message.text}</span>
              </div>
            )}

            {/* User Type Selection (Registration only) */}
            {!isLogin && showUserTypeSelection && (
              <div className="space-y-6 animate-fadeIn">
                <div className="text-center mb-6">
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
                    Choose Your Role
                  </h2>
                  <p className="text-gray-600 text-sm sm:text-base">
                    Select how you want to join our lifesaving community
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {userTypes.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => handleUserTypeSelect(type.id)}
                      className={`p-4 rounded-2xl border-2 transition-all duration-300 hover:scale-105 hover:shadow-lg ${type.bgColor} ${type.borderColor} hover:border-opacity-100`}
                    >
                      <div className="flex items-start space-x-4">
                        <div className={`p-3 rounded-xl bg-gradient-to-r ${type.color}`}>
                          <type.icon className="h-6 w-6 text-white" />
                        </div>
                        <div className="flex-1 text-left">
                          <h3 className="font-bold text-gray-800 mb-1">{type.title}</h3>
                          <p className="text-sm text-gray-600 mb-2">{type.description}</p>
                          <div className="flex items-center space-x-2 text-xs text-gray-500">
                            <Zap className="h-3 w-3" />
                            <span>{type.stats}</span>
                          </div>
                          <div className="mt-3">
                            <div className="text-xs font-medium text-gray-700 mb-1">Features:</div>
                            <ul className="space-y-1">
                              {type.features.slice(0, 2).map((feature, idx) => (
                                <li key={idx} className="text-xs text-gray-600 flex items-center">
                                  <CheckCircle className="h-3 w-3 text-emerald-500 mr-2 flex-shrink-0" />
                                  {feature}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>

                {validationErrors.userType && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-center">
                    <p className="text-red-600 text-sm">{validationErrors.userType}</p>
                  </div>
                )}

                <div className="text-center">
                  <button
                    onClick={() => setIsLogin(true)}
                    className="text-rose-500 hover:text-rose-600 font-medium text-sm sm:text-base"
                  >
                    Already have an account? Sign in
                  </button>
                </div>
              </div>
            )}

            {/* Back Button for Registration Form */}
            {!isLogin && !showUserTypeSelection && (
              <button
                onClick={handleBackToUserType}
                className="mb-4 sm:mb-6 flex items-center space-x-2 text-rose-500 hover:text-rose-600 transition-colors"
              >
                <ChevronLeft className="h-4 w-4" />
                <span className="text-sm sm:text-base">Choose different role</span>
              </button>
            )}

            {/* Forms */}
            {(!showUserTypeSelection || isLogin) && (
              <div className="space-y-4 sm:space-y-6">
                {isLogin ? (
                  <form onSubmit={handleLogin} className="space-y-4 sm:space-y-6">
                    <div className="space-y-3 sm:space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email Address
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                          <input
                            type="email"
                            name="email"
                            value={loginData.email}
                            onChange={(e) => handleChange(e, 'login')}
                            className={`w-full pl-10 pr-4 py-3 sm:py-3.5 border rounded-xl 
                                     focus:outline-none focus:ring-2 focus:border-transparent text-sm sm:text-base
                                     ${validationErrors.email 
                                       ? 'border-red-300 bg-red-50 focus:ring-red-300' 
                                       : 'border-gray-200 bg-gray-50 focus:ring-rose-300'
                                     }`}
                            placeholder="you@example.com"
                            required
                          />
                        </div>
                        {validationErrors.email && (
                          <p className="mt-1 text-xs text-red-600">{validationErrors.email}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Password
                        </label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                          <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={loginData.password}
                            onChange={(e) => handleChange(e, 'login')}
                            className={`w-full pl-10 pr-12 py-3 sm:py-3.5 border rounded-xl 
                                     focus:outline-none focus:ring-2 focus:border-transparent text-sm sm:text-base
                                     ${validationErrors.password 
                                       ? 'border-red-300 bg-red-50 focus:ring-red-300' 
                                       : 'border-gray-200 bg-gray-50 focus:ring-rose-300'
                                     }`}
                            placeholder="••••••••"
                            required
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          >
                            {showPassword ? <EyeOff className="h-4 w-4 sm:h-5 sm:w-5" /> : <Eye className="h-4 w-4 sm:h-5 sm:w-5" />}
                          </button>
                        </div>
                        {validationErrors.password && (
                          <p className="mt-1 text-xs text-red-600">{validationErrors.password}</p>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-3 sm:space-y-0">
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          className="h-4 w-4 text-rose-500 rounded focus:ring-rose-300"
                        />
                        <span className="text-sm text-gray-600">Remember me</span>
                      </label>
                      <Link to="/forgot-password" className="text-sm text-rose-500 hover:text-rose-600">
                        Forgot password?
                      </Link>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-3 sm:py-4 bg-gradient-to-r from-rose-500 to-rose-400 text-white 
                               rounded-xl font-semibold text-base sm:text-lg hover:shadow-lg transition-all duration-300 
                               hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed
                               flex items-center justify-center space-x-2"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="h-4 w-4 sm:h-5 sm:w-5 animate-spin" />
                          <span className="text-sm sm:text-base">Signing In...</span>
                        </>
                      ) : (
                        <>
                          <span className="text-sm sm:text-base">Sign In</span>
                          <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
                        </>
                      )}
                    </button>
                  </form>
                ) : (
                  <form onSubmit={handleRegister} className="space-y-4 sm:space-y-6">
                    {/* User Type Display */}
                    {userType && (
                      <div className={`p-4 rounded-2xl ${userTypes.find(t => t.id === userType)?.bgColor} ${userTypes.find(t => t.id === userType)?.borderColor}`}>
                        <div className="flex items-center space-x-3">
                          <div className={`p-2 rounded-lg bg-gradient-to-r ${userTypes.find(t => t.id === userType)?.color}`}>
                            {React.createElement(userTypes.find(t => t.id === userType)?.icon || Heart, { 
                              className: "h-5 w-5 text-white" 
                            })}
                          </div>
                          <div>
                            <div className="font-bold text-gray-800">
                              Registering as {userTypes.find(t => t.id === userType)?.title}
                            </div>
                            <div className="text-sm text-gray-600">
                              {userTypes.find(t => t.id === userType)?.description}
                            </div>
                          </div>
                          <Sparkles className="h-5 w-5 text-amber-500 ml-auto" />
                        </div>
                      </div>
                    )}

                    <div className="space-y-3 sm:space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Full Name
                        </label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                          <input
                            type="text"
                            name="name"
                            value={registerData.name}
                            onChange={(e) => handleChange(e, 'register')}
                            className={`w-full pl-10 pr-4 py-3 sm:py-3.5 border rounded-xl 
                                     focus:outline-none focus:ring-2 focus:border-transparent text-sm sm:text-base
                                     ${validationErrors.name 
                                       ? 'border-red-300 bg-red-50 focus:ring-red-300' 
                                       : 'border-gray-200 bg-gray-50 focus:ring-rose-300'
                                     }`}
                            placeholder="John Doe"
                            required
                          />
                        </div>
                        {validationErrors.name && (
                          <p className="mt-1 text-xs text-red-600">{validationErrors.name}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email Address
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                          <input
                            type="email"
                            name="email"
                            value={registerData.email}
                            onChange={(e) => handleChange(e, 'register')}
                            className={`w-full pl-10 pr-4 py-3 sm:py-3.5 border rounded-xl 
                                     focus:outline-none focus:ring-2 focus:border-transparent text-sm sm:text-base
                                     ${validationErrors.email 
                                       ? 'border-red-300 bg-red-50 focus:ring-red-300' 
                                       : 'border-gray-200 bg-gray-50 focus:ring-rose-300'
                                     }`}
                            placeholder="you@example.com"
                            required
                          />
                        </div>
                        {validationErrors.email && (
                          <p className="mt-1 text-xs text-red-600">{validationErrors.email}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Phone Number
                        </label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                          <input
                            type="tel"
                            name="phone"
                            value={registerData.phone}
                            onChange={(e) => handleChange(e, 'register')}
                            className={`w-full pl-10 pr-4 py-3 sm:py-3.5 border rounded-xl 
                                     focus:outline-none focus:ring-2 focus:border-transparent text-sm sm:text-base
                                     ${validationErrors.phone 
                                       ? 'border-red-300 bg-red-50 focus:ring-red-300' 
                                       : 'border-gray-200 bg-gray-50 focus:ring-rose-300'
                                     }`}
                            placeholder="+91 9876543210"
                            required
                          />
                        </div>
                        {validationErrors.phone && (
                          <p className="mt-1 text-xs text-red-600">{validationErrors.phone}</p>
                        )}
                      </div>

                      {/* Additional fields based on user type */}
                      {(userType === 'blood-donor' || userType === 'patient') && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Blood Group {userType === 'patient' ? '(If known)' : ''}
                          </label>
                          <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                            {bloodGroups.map((group) => (
                              <label
                                key={group}
                                className={`flex items-center justify-center p-2 sm:p-3 rounded-lg border-2 cursor-pointer transition-all duration-300 ${
                                  registerData.bloodGroup === group
                                    ? 'border-rose-500 bg-rose-50'
                                    : 'border-gray-200 hover:border-gray-300'
                                }`}
                              >
                                <input
                                  type="radio"
                                  name="bloodGroup"
                                  value={group}
                                  checked={registerData.bloodGroup === group}
                                  onChange={(e) => handleChange(e, 'register')}
                                  className="sr-only"
                                />
                                <span className={`font-medium ${
                                  registerData.bloodGroup === group ? 'text-rose-600' : 'text-gray-700'
                                }`}>{group}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                      )}

                      {userType === 'hospital' && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Hospital Name
                          </label>
                          <div className="relative">
                            <Hospital className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                            <input
                              type="text"
                              name="hospitalName"
                              onChange={(e) => setRegisterData(prev => ({
                                ...prev,
                                additionalData: {
                                  ...prev.additionalData,
                                  hospitalName: e.target.value
                                }
                              }))}
                              className="w-full pl-10 pr-4 py-3 sm:py-3.5 border border-gray-200 bg-gray-50 rounded-xl 
                                       focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-transparent text-sm sm:text-base"
                              placeholder="City General Hospital"
                            />
                          </div>
                        </div>
                      )}

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Password
                          </label>
                          <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                            <input
                              type={showPassword ? "text" : "password"}
                              name="password"
                              value={registerData.password}
                              onChange={(e) => handleChange(e, 'register')}
                              className={`w-full pl-10 pr-12 py-3 sm:py-3.5 border rounded-xl 
                                       focus:outline-none focus:ring-2 focus:border-transparent text-sm sm:text-base
                                       ${validationErrors.password 
                                         ? 'border-red-300 bg-red-50 focus:ring-red-300' 
                                         : 'border-gray-200 bg-gray-50 focus:ring-rose-300'
                                       }`}
                              placeholder="••••••••"
                              required
                            />
                          </div>
                          {validationErrors.password && (
                            <p className="mt-1 text-xs text-red-600">{validationErrors.password}</p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Confirm Password
                          </label>
                          <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                            <input
                              type={showPassword ? "text" : "password"}
                              name="confirmPassword"
                              value={registerData.confirmPassword}
                              onChange={(e) => handleChange(e, 'register')}
                              className={`w-full pl-10 pr-12 py-3 sm:py-3.5 border rounded-xl 
                                       focus:outline-none focus:ring-2 focus:border-transparent text-sm sm:text-base
                                       ${validationErrors.confirmPassword 
                                         ? 'border-red-300 bg-red-50 focus:ring-red-300' 
                                         : 'border-gray-200 bg-gray-50 focus:ring-rose-300'
                                       }`}
                              placeholder="••••••••"
                              required
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                              {showPassword ? <EyeOff className="h-4 w-4 sm:h-5 sm:w-5" /> : <Eye className="h-4 w-4 sm:h-5 sm:w-5" />}
                            </button>
                          </div>
                          {validationErrors.confirmPassword && (
                            <p className="mt-1 text-xs text-red-600">{validationErrors.confirmPassword}</p>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <input
                        type="checkbox"
                        required
                        className="h-4 w-4 text-rose-500 rounded focus:ring-rose-300 mt-0.5 flex-shrink-0"
                      />
                      <label className="text-xs sm:text-sm text-gray-600">
                        I agree to the{' '}
                        <Link to="/terms" className="text-rose-500 hover:text-rose-600">
                          Terms of Service
                        </Link>{' '}
                        and{' '}
                        <Link to="/privacy" className="text-rose-500 hover:text-rose-600">
                          Privacy Policy
                        </Link>
                      </label>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-3 sm:py-4 bg-gradient-to-r from-rose-500 to-rose-400 text-white 
                               rounded-xl font-semibold text-base sm:text-lg hover:shadow-lg transition-all duration-300 
                               hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed
                               flex items-center justify-center space-x-2"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="h-4 w-4 sm:h-5 sm:w-5 animate-spin" />
                          <span className="text-sm sm:text-base">Creating Account...</span>
                        </>
                      ) : (
                        <>
                          {userTypes.find(t => t.id === userType)?.icon && 
                            React.createElement(userTypes.find(t => t.id === userType)?.icon || Heart, { 
                              className: "h-4 w-4 sm:h-5 sm:w-5" 
                            })
                          }
                          <span className="text-sm sm:text-base">
                            Join as {userTypes.find(t => t.id === userType)?.title}
                          </span>
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            )}

            {/* Form Footer */}
            {(isLogin || (!showUserTypeSelection && !isLogin)) && (
              <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-gray-100">
                <div className="text-center">
                  <p className="text-gray-600 mb-3 sm:mb-4 text-sm sm:text-base">
                    {isLogin ? "Don't have an account?" : "Already have an account?"}
                  </p>
                  <button
                    onClick={() => {
                      setIsLogin(!isLogin);
                      if (!isLogin) {
                        setShowUserTypeSelection(true);
                        setUserType('');
                      }
                    }}
                    className="text-rose-500 hover:text-rose-600 font-semibold text-sm sm:text-base"
                  >
                    {isLogin ? 'Create an account' : 'Sign in instead'}
                  </button>
                </div>

                {/* Security Notice */}
                <div className="mt-6 sm:mt-8 p-3 sm:p-4 bg-gradient-to-r from-rose-50 to-pink-50 rounded-xl border border-rose-100">
                  <div className="flex items-start sm:items-center space-x-3">
                    <Shield className="h-5 w-5 text-rose-500 mt-0.5 sm:mt-0 flex-shrink-0" />
                    <div>
                      <p className="text-xs sm:text-sm text-gray-700 font-medium">
                        Your information is secure and encrypted
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        We use bank-level security to protect your data
                      </p>
                    </div>
                  </div>
                </div>

                {/* Quick Stats - Mobile Only */}
                <div className="md:hidden grid grid-cols-3 gap-3 mt-6">
                  <div className="bg-gradient-to-r from-rose-50 to-pink-50 p-3 rounded-xl border border-rose-100 text-center">
                    <div className="text-lg font-bold text-rose-600">50K+</div>
                    <div className="text-xs text-gray-600">Donors</div>
                  </div>
                  <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-3 rounded-xl border border-blue-100 text-center">
                    <div className="text-lg font-bold text-blue-600">24/7</div>
                    <div className="text-xs text-gray-600">Support</div>
                  </div>
                  <div className="bg-gradient-to-r from-emerald-50 to-green-50 p-3 rounded-xl border border-emerald-100 text-center">
                    <div className="text-lg font-bold text-emerald-600">1000+</div>
                    <div className="text-xs text-gray-600">Lives Saved</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthenticationPage;