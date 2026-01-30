import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
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
  ArrowRight
} from 'lucide-react';

const AuthenticationPage = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

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
    bloodGroup: ''
  });

  // Blood groups
  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];

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
      // Mock API call - replace with actual API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simulate successful login
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
      // Mock API call - replace with actual API
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

  // Clear messages when switching forms
  useEffect(() => {
    setMessage({ type: '', text: '' });
  }, [isLogin]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-blue-50 flex items-center justify-center p-25">
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden">
        <div className="grid md:grid-cols-2">
          
          {/* Left Side - Image & Quote */}
          <div className="hidden md:block relative bg-gradient-to-br from-rose-500 to-rose-600">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')] bg-cover bg-center opacity-20"></div>
            
            <div className="relative z-10 h-full p-12 flex flex-col justify-between text-white">
              <div>
                <div className="flex items-center space-x-3 mb-8">
                  <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-sm">
                    <Heart className="h-8 w-8" fill="white" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold">LifeStream</h1>
                    <p className="text-rose-100">Blood & Organ Donation</p>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <h2 className="text-3xl font-bold leading-tight">
                    Give Blood, <br />
                    Give Life
                  </h2>
                  
                  <p className="text-lg text-rose-100 leading-relaxed">
                    Your single donation can save up to 3 lives. Join our community 
                    of heroes making a difference every day.
                  </p>
                  
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm">
                      <div className="text-2xl font-bold">3</div>
                      <div className="text-sm text-rose-100">Lives Saved</div>
                    </div>
                    <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm">
                      <div className="text-2xl font-bold">50K+</div>
                      <div className="text-sm text-rose-100">Donors</div>
                    </div>
                    <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm">
                      <div className="text-2xl font-bold">24/7</div>
                      <div className="text-sm text-rose-100">Support</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="border-t border-white/20 pt-6">
                <blockquote className="italic text-rose-100">
                  "The best gift you can give is the gift of life through blood donation."
                </blockquote>
              </div>
            </div>
          </div>

          {/* Right Side - Forms */}
          <div className="p-8 md:p-12">
            {/* Form Toggle */}
            <div className="flex mb-8">
              <button
                onClick={() => setIsLogin(true)}
                className={`flex-1 py-3 font-semibold rounded-t-xl transition-all duration-300 ${
                  isLogin
                    ? 'bg-gradient-to-r from-rose-500 to-rose-400 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => setIsLogin(false)}
                className={`flex-1 py-3 font-semibold rounded-t-xl transition-all duration-300 ${
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
              <div className={`mb-6 p-4 rounded-xl flex items-center space-x-3 ${
                message.type === 'success' 
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  : 'bg-red-50 text-red-700 border border-red-200'
              }`}>
                {message.type === 'success' ? (
                  <CheckCircle className="h-5 w-5" />
                ) : (
                  <AlertCircle className="h-5 w-5" />
                )}
                <span>{message.text}</span>
              </div>
            )}

            {/* Forms */}
            <div className="space-y-6">
              {isLogin ? (
                <form onSubmit={handleLogin} className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                          type="email"
                          name="email"
                          value={loginData.email}
                          onChange={(e) => handleChange(e, 'login')}
                          className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl 
                                   focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-transparent"
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
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                          type={showPassword ? "text" : "password"}
                          name="password"
                          value={loginData.password}
                          onChange={(e) => handleChange(e, 'login')}
                          className="w-full pl-10 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl 
                                   focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-transparent"
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
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
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
                    className="w-full py-4 bg-gradient-to-r from-rose-500 to-rose-400 text-white 
                             rounded-xl font-semibold text-lg hover:shadow-lg transition-all duration-300 
                             hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed
                             flex items-center justify-center space-x-2"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        <span>Signing In...</span>
                      </>
                    ) : (
                      <>
                        <span>Sign In</span>
                        <ArrowRight className="h-5 w-5" />
                      </>
                    )}
                  </button>
                </form>
              ) : (
                <form onSubmit={handleRegister} className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                          type="text"
                          name="name"
                          value={registerData.name}
                          onChange={(e) => handleChange(e, 'register')}
                          className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl 
                                   focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-transparent"
                          placeholder="John Doe"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email Address
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                          <input
                            type="email"
                            name="email"
                            value={registerData.email}
                            onChange={(e) => handleChange(e, 'register')}
                            className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl 
                                     focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-transparent"
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
                          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                          <input
                            type="tel"
                            name="phone"
                            value={registerData.phone}
                            onChange={(e) => handleChange(e, 'register')}
                            className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl 
                                     focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-transparent"
                            placeholder="+91 9876543210"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Password
                        </label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                          <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={registerData.password}
                            onChange={(e) => handleChange(e, 'register')}
                            className="w-full pl-10 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl 
                                     focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-transparent"
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
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                          <input
                            type={showPassword ? "text" : "password"}
                            name="confirmPassword"
                            value={registerData.confirmPassword}
                            onChange={(e) => handleChange(e, 'register')}
                            className="w-full pl-10 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl 
                                     focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-transparent"
                            placeholder="••••••••"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Blood Group (Optional)
                      </label>
                      <select
                        name="bloodGroup"
                        value={registerData.bloodGroup}
                        onChange={(e) => handleChange(e, 'register')}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl 
                                 focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-transparent"
                      >
                        <option value="">Select Blood Group</option>
                        {bloodGroups.map(group => (
                          <option key={group} value={group}>{group}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      required
                      className="h-5 w-5 text-rose-500 rounded focus:ring-rose-300 mt-0.5"
                    />
                    <label className="text-sm text-gray-600">
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
                    className="w-full py-4 bg-gradient-to-r from-rose-500 to-rose-400 text-white 
                             rounded-xl font-semibold text-lg hover:shadow-lg transition-all duration-300 
                             hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed
                             flex items-center justify-center space-x-2"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        <span>Creating Account...</span>
                      </>
                    ) : (
                      <>
                        <Heart className="h-5 w-5" fill="white" />
                        <span>Create Account</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Form Footer */}
            <div className="mt-8 pt-8 border-t border-gray-100">
              <div className="text-center">
                <p className="text-gray-600 mb-4">
                  {isLogin ? "Don't have an account?" : "Already have an account?"}
                </p>
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-rose-500 hover:text-rose-600 font-semibold"
                >
                  {isLogin ? 'Create an account' : 'Sign in instead'}
                </button>
              </div>

              {/* Security Notice */}
              <div className="mt-8 p-4 bg-rose-50 rounded-xl border border-rose-100">
                <div className="flex items-center space-x-3">
                  <Shield className="h-5 w-5 text-rose-500" />
                  <div>
                    <p className="text-sm text-gray-700">
                      Your information is secure and encrypted
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      We never share your personal data with third parties
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthenticationPage;