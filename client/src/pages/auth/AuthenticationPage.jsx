import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
  Sparkles,
  Droplets,
  Users,
  ChevronLeft,
  ChevronRight,
  Home
} from 'lucide-react';

const AuthenticationPage = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [activeSlide, setActiveSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

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
    userType: 'donor'
  });

  // Check mobile screen
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Slides for mobile carousel
  const slides = [
    {
      title: "Save Lives",
      description: "Your donation can save up to 3 lives",
      icon: Heart,
      color: "from-rose-500 to-pink-500",
      bgColor: "bg-gradient-to-br from-rose-500/90 to-rose-600/90"
    },
    {
      title: "Join Community",
      description: "50,000+ donors already making a difference",
      icon: Users,
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-gradient-to-br from-blue-500/90 to-blue-600/90"
    },
    {
      title: "Emergency Ready",
      description: "24/7 support for critical needs",
      icon: Droplets,
      color: "from-emerald-500 to-green-500",
      bgColor: "bg-gradient-to-br from-emerald-500/90 to-emerald-600/90"
    }
  ];

  // Auto slide on mobile
  useEffect(() => {
    if (isMobile) {
      const interval = setInterval(() => {
        setActiveSlide((prev) => (prev + 1) % slides.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [isMobile, slides.length]);

  // Blood groups
  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];
  const userTypes = [
    { value: 'donor', label: 'Blood/Organ Donor', icon: Heart },
    { value: 'receiver', label: 'Patient/Receiver', icon: User },
    { value: 'hospital', label: 'Hospital Staff', icon: Shield }
  ];

  // Handle form changes
  const handleChange = (e, formType) => {
    const { name, value } = e.target;
    
    if (formType === 'login') {
      setLoginData(prev => ({ ...prev, [name]: value }));
    } else {
      setRegisterData(prev => ({ ...prev, [name]: value }));
    }
    
    setMessage({ type: '', text: '' });
  };

  // Handle login
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      localStorage.setItem('token', 'mock-token-12345');
      localStorage.setItem('user', JSON.stringify({
        name: 'John Doe',
        email: loginData.email,
        role: 'donor'
      }));
      
      setMessage({ type: 'success', text: 'Login successful! Redirecting...' });
      
      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);
      
    } catch (error) {
      setMessage({ 
        type: 'error', 
        text: 'Invalid credentials. Please try again.' 
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

    // Password validation
    if (registerData.password !== registerData.confirmPassword) {
      setMessage({ type: 'error', text: 'Passwords do not match' });
      setLoading(false);
      return;
    }

    if (registerData.password.length < 6) {
      setMessage({ type: 'error', text: 'Password must be at least 6 characters' });
      setLoading(false);
      return;
    }

    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setMessage({ type: 'success', text: 'Registration successful! Please login.' });
      
      // Switch to login form
      setTimeout(() => {
        setIsLogin(true);
        setLoginData({
          email: registerData.email,
          password: ''
        });
      }, 2000);
      
    } catch (error) {
      setMessage({ 
        type: 'error', 
        text: 'Registration failed. Please try again.' 
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
  }, [isLogin]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-blue-50 flex items-center justify-center p-4 md:p-8">
      
      {/* Home Button for Mobile */}
      <Link 
        to="/" 
        className="fixed top-4 left-4 z-50 md:hidden bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg border border-rose-100 hover:bg-white transition-all duration-300"
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
                backgroundImage: 'url("https://s3.amazonaws.com/assets.inarkansas.com/119895/next-2020-132867-health-care-professionals-stsk-illustration-725.jpg")'
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
                    <p className="text-rose-100/90">Blood & Organ Donation</p>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <h2 className="text-3xl lg:text-4xl font-bold leading-tight">
                    Give Blood, <br />
                    Give Life
                  </h2>
                  
                  <p className="text-lg text-rose-100/90 leading-relaxed">
                    Your single donation can save up to 3 lives. Join our community 
                    of heroes making a difference every day.
                  </p>
                  
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm hover:bg-white/20 transition-all duration-300">
                      <div className="text-2xl font-bold">3</div>
                      <div className="text-sm text-rose-100/90">Lives Saved</div>
                    </div>
                    <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm hover:bg-white/20 transition-all duration-300">
                      <div className="text-2xl font-bold">50K+</div>
                      <div className="text-sm text-rose-100/90">Donors</div>
                    </div>
                    <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm hover:bg-white/20 transition-all duration-300">
                      <div className="text-2xl font-bold">24/7</div>
                      <div className="text-sm text-rose-100/90">Support</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="border-t border-white/20 pt-6">
                <blockquote className="italic text-rose-100/90">
                  "The best gift you can give is the gift of life through blood donation."
                </blockquote>
              </div>
            </div>
          </div>

          {/* Mobile Hero Section */}
          <div className="md:hidden">
            <div className={`relative h-64 ${slides[activeSlide].bgColor} transition-all duration-500`}>
              {/* Background Image */}
              <div 
                className="absolute inset-0 bg-cover bg-center opacity-20"
                style={{
                  backgroundImage: 'url("https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80")'
                }}
              ></div>
              
              <div className="relative z-10 h-full p-6 flex flex-col justify-center items-center text-center text-white">
                <div className="mb-4">
                  {/* <slides[activeSlide].icon className="h-12 w-12 mx-auto mb-3" /> */}
                  <h2 className="text-2xl font-bold mb-2">{slides[activeSlide].title}</h2>
                  <p className="text-white/90">{slides[activeSlide].description}</p>
                </div>
                
                {/* Slide Indicators */}
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
                
                {/* Navigation Buttons */}
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
                  <p className="text-sm text-gray-600">Blood & Organ Donation</p>
                </div>
              </div>
            </div>

            {/* Form Toggle */}
            <div className="flex mb-6">
              <button
                onClick={() => setIsLogin(true)}
                className={`flex-1 py-3 font-semibold rounded-t-xl transition-all duration-300 text-sm sm:text-base ${
                  isLogin
                    ? 'bg-gradient-to-r from-rose-500 to-rose-400 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => setIsLogin(false)}
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

            {/* Forms */}
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
                          className="w-full pl-10 pr-4 py-3 sm:py-3.5 bg-gray-50 border border-gray-200 rounded-xl 
                                   focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-transparent text-sm sm:text-base"
                          placeholder="you@example.com"
                          required
                        />
                      </div>
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
                          className="w-full pl-10 pr-12 py-3 sm:py-3.5 bg-gray-50 border border-gray-200 rounded-xl 
                                   focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-transparent text-sm sm:text-base"
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
                          className="w-full pl-10 pr-4 py-3 sm:py-3.5 bg-gray-50 border border-gray-200 rounded-xl 
                                   focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-transparent text-sm sm:text-base"
                          placeholder="John Doe"
                          required
                        />
                      </div>
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
                          className="w-full pl-10 pr-4 py-3 sm:py-3.5 bg-gray-50 border border-gray-200 rounded-xl 
                                   focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-transparent text-sm sm:text-base"
                          placeholder="you@example.com"
                          required
                        />
                      </div>
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
                          className="w-full pl-10 pr-4 py-3 sm:py-3.5 bg-gray-50 border border-gray-200 rounded-xl 
                                   focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-transparent text-sm sm:text-base"
                          placeholder="+91 9876543210"
                          required
                        />
                      </div>
                    </div>

                    {/* User Type Selection */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        I want to join as
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {userTypes.map((type) => (
                          <label
                            key={type.value}
                            className={`flex flex-col items-center justify-center p-3 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                              registerData.userType === type.value
                                ? 'border-rose-500 bg-rose-50'
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
                            <type.icon className={`h-5 w-5 mb-2 ${
                              registerData.userType === type.value ? 'text-rose-500' : 'text-gray-400'
                            }`} />
                            <span className="text-xs text-center text-gray-700">{type.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>

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
                            className="w-full pl-10 pr-12 py-3 sm:py-3.5 bg-gray-50 border border-gray-200 rounded-xl 
                                     focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-transparent text-sm sm:text-base"
                            placeholder="••••••••"
                            required
                          />
                        </div>
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
                            className="w-full pl-10 pr-12 py-3 sm:py-3.5 bg-gray-50 border border-gray-200 rounded-xl 
                                     focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-transparent text-sm sm:text-base"
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
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Blood Group (Optional)
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
                        <Heart className="h-4 w-4 sm:h-5 sm:w-5" fill="white" />
                        <span className="text-sm sm:text-base">Create Account</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Form Footer */}
            <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-gray-100">
              <div className="text-center">
                <p className="text-gray-600 mb-3 sm:mb-4 text-sm sm:text-base">
                  {isLogin ? "Don't have an account?" : "Already have an account?"}
                </p>
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-rose-500 hover:text-rose-600 font-semibold text-sm sm:text-base"
                >
                  {isLogin ? 'Create an account' : 'Sign in instead'}
                </button>
              </div>

              {/* Security Notice */}
              <div className="mt-6 sm:mt-8 p-3 sm:p-4 bg-rose-50 rounded-xl border border-rose-100">
                <div className="flex items-start sm:items-center space-x-3">
                  <Shield className="h-5 w-5 text-rose-500 mt-0.5 sm:mt-0 flex-shrink-0" />
                  <div>
                    <p className="text-xs sm:text-sm text-gray-700">
                      Your information is secure and encrypted
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      We never share your personal data with third parties
                    </p>
                  </div>
                </div>
              </div>

              {/* Quick Stats - Mobile Only */}
              <div className="md:hidden grid grid-cols-3 gap-3 mt-6">
                <div className="bg-gradient-to-r from-rose-50 to-pink-50 p-3 rounded-xl border border-rose-100 text-center">
                  <div className="text-lg font-bold text-rose-600">3</div>
                  <div className="text-xs text-gray-600">Lives Saved</div>
                </div>
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-3 rounded-xl border border-blue-100 text-center">
                  <div className="text-lg font-bold text-blue-600">50K+</div>
                  <div className="text-xs text-gray-600">Donors</div>
                </div>
                <div className="bg-gradient-to-r from-emerald-50 to-green-50 p-3 rounded-xl border border-emerald-100 text-center">
                  <div className="text-lg font-bold text-emerald-600">24/7</div>
                  <div className="text-xs text-gray-600">Support</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS for better mobile experience */}
      <style jsx global>{`
        /* Hide scrollbar for better mobile experience */
        @media (max-width: 768px) {
          body {
            overflow-x: hidden;
          }
          input, select, textarea {
            font-size: 16px !important; /* Prevent zoom on iOS */
          }
        }
        
        /* Better tap targets on mobile */
        @media (max-width: 640px) {
          button, 
          input[type="checkbox"],
          input[type="radio"],
          label {
            min-height: 44px;
          }
          
          input, select, textarea {
            min-height: 48px;
          }
        }
      `}</style>
    </div>
  );
};

export default AuthenticationPage;