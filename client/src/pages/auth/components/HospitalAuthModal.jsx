import React, { useState } from 'react';
import { 
  X, 
  Hospital, 
  Users, 
  Shield, 
  FileText, 
  Bell, 
  MapPin,
  Phone,
  Mail,
  Building,
  BadgeCheck,
  CheckCircle,
  Eye,
  EyeOff,
  ArrowRight,
  Loader2
} from 'lucide-react';
// import { hospitalApi } from "../../../api"

const HospitalAuthModal = ({ isOpen, onClose }) => {
  const [showLogin, setShowLogin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const [formData, setFormData] = useState({
    name: '',
    registrationNumber: '',
    email: '',
    phone: '',
    city: '',
    password: '',
    confirmPassword: ''
  });
  
  const [loginData, setLoginData] = useState({
    emailOrId: '',
    password: ''
  });

  const handleInputChange = (e, isLogin = false) => {
    const { name, value } = e.target;
    if (isLogin) {
      setLoginData(prev => ({
        ...prev,
        [name]: value
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
    // Clear errors when user starts typing
    setError('');
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long');
      setLoading(false);
      return;
    }

    try {
      const result = await hospitalApi.register({
        name: formData.name,
        registrationNumber: formData.registrationNumber,
        email: formData.email,
        phone: formData.phone,
        city: formData.city,
        password: formData.password,
        confirmPassword: formData.confirmPassword
      });

      if (result.success) {
        setSuccess('Registration successful! Please check your email for verification.');
        
        // Reset form
        setFormData({
          name: '',
          registrationNumber: '',
          email: '',
          phone: '',
          city: '',
          password: '',
          confirmPassword: ''
        });

        // Auto close after 3 seconds
        setTimeout(() => {
          onClose();
        }, 3000);
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const result = await hospitalApi.login(loginData);

      if (result.success) {
        setSuccess('Login successful! Redirecting to dashboard...');
        
        // Redirect after 2 seconds
        setTimeout(() => {
          window.location.href = '/hospital-dashboard';
        }, 2000);
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    const email = prompt('Please enter your registered email address:');
    if (!email) return;

    setLoading(true);
    try {
      const result = await hospitalApi.forgotPassword(email);
      
      if (result.success) {
        alert(result.message);
      } else {
        alert(result.message);
      }
    } catch (err) {
      alert('Failed to send reset email. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/40 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-white rounded-xl sm:rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden max-h-[95vh] sm:max-h-[90vh] overflow-y-auto animate-slideUp">
        
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-indigo-600 p-3 sm:p-4 md:p-6 z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="p-1.5 sm:p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                <Hospital className="h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8 text-white" />
              </div>
              <div>
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white">
                  {showLogin ? 'Hospital Login' : 'Hospital Registration'}
                </h2>
                <p className="text-blue-100 text-xs sm:text-sm">Join our trusted healthcare network</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1 sm:p-1.5 md:p-2 hover:bg-white/20 rounded-full transition-colors"
              aria-label="Close modal"
            >
              <X className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-white" />
            </button>
          </div>
        </div>

        <div className="p-3 sm:p-4 md:p-6 lg:p-8">
          {/* Error and Success Messages */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}
          
          {success && (
            <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-700 rounded-lg text-sm">
              {success}
            </div>
          )}

          <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 md:gap-8">
            
            {/* Left Column - Form */}
            <div className="flex-1">
              {/* Toggle Switch */}
              <div className="flex items-center justify-center gap-2 sm:gap-4 mb-4 sm:mb-6">
                <button
                  onClick={() => {
                    setShowLogin(false);
                    setError('');
                    setSuccess('');
                  }}
                  className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg font-medium text-sm sm:text-base transition-all ${!showLogin ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}
                >
                  Register
                </button>
                <div className="w-px h-4 sm:h-6 bg-gray-200"></div>
                <button
                  onClick={() => {
                    setShowLogin(true);
                    setError('');
                    setSuccess('');
                  }}
                  className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg font-medium text-sm sm:text-base transition-all ${showLogin ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}
                >
                  Login
                </button>
              </div>

              {!showLogin ? (
                // Registration Form
                <form onSubmit={handleRegister} className="space-y-3 sm:space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                        Hospital Name *
                      </label>
                      <div className="relative">
                        <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition text-sm sm:text-base"
                          placeholder="Enter hospital name"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                        Registration No. *
                      </label>
                      <div className="relative">
                        <BadgeCheck className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                        <input
                          type="text"
                          name="registrationNumber"
                          value={formData.registrationNumber}
                          onChange={handleInputChange}
                          required
                          className="w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition text-sm sm:text-base"
                          placeholder="Medical council ID"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                      Official Email *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition text-sm sm:text-base"
                        placeholder="hospital@email.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                        Phone Number *
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          required
                          className="w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition text-sm sm:text-base"
                          placeholder="+91 XXXX XXX XXX"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                        City *
                      </label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                        <input
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          required
                          className="w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition text-sm sm:text-base"
                          placeholder="Enter city"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                      Create Password *
                    </label>
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2"
                        aria-label={showPassword ? "Hide password" : "Show password"}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                        ) : (
                          <Eye className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                        )}
                      </button>
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                        className="w-full pl-3 sm:pl-4 pr-9 sm:pr-10 py-2 sm:py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition text-sm sm:text-base"
                        placeholder="Enter password"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                      Confirm Password *
                    </label>
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2"
                        aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                        ) : (
                          <Eye className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                        )}
                      </button>
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        required
                        className="w-full pl-3 sm:pl-4 pr-9 sm:pr-10 py-2 sm:py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition text-sm sm:text-base"
                        placeholder="Confirm password"
                      />
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <input
                      type="checkbox"
                      id="terms"
                      required
                      className="mt-0.5 sm:mt-1 h-4 w-4 sm:h-5 sm:w-5"
                    />
                    <label htmlFor="terms" className="text-xs sm:text-sm text-gray-600">
                      I agree to the Terms & Conditions and Privacy Policy
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-2.5 sm:py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed text-sm sm:text-base"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="h-4 w-4 sm:h-5 sm:w-5 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5" />
                        Complete Registration
                      </>
                    )}
                  </button>
                </form>
              ) : (
                // Login Form
                <form onSubmit={handleLogin} className="space-y-3 sm:space-y-4">
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                      Hospital ID / Email
                    </label>
                    <div className="relative">
                      <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                      <input
                        type="text"
                        name="emailOrId"
                        value={loginData.emailOrId}
                        onChange={(e) => handleInputChange(e, true)}
                        required
                        className="w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition text-sm sm:text-base"
                        placeholder="Enter Hospital ID or email"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                      Password
                    </label>
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2"
                        aria-label={showPassword ? "Hide password" : "Show password"}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                        ) : (
                          <Eye className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                        )}
                      </button>
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={loginData.password}
                        onChange={(e) => handleInputChange(e, true)}
                        required
                        className="w-full pl-3 sm:pl-4 pr-9 sm:pr-10 py-2 sm:py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition text-sm sm:text-base"
                        placeholder="Enter password"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="remember"
                        className="rounded h-4 w-4 sm:h-5 sm:w-5"
                      />
                      <label htmlFor="remember" className="text-xs sm:text-sm text-gray-600">
                        Remember me
                      </label>
                    </div>
                    <button
                      type="button"
                      onClick={handleForgotPassword}
                      className="text-xs sm:text-sm text-blue-600 hover:text-blue-700 font-medium"
                    >
                      Forgot Password?
                    </button>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-2.5 sm:py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed text-sm sm:text-base"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="h-4 w-4 sm:h-5 sm:w-5 animate-spin" />
                        Logging in...
                      </>
                    ) : (
                      <>
                        <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
                        Login to Hospital Portal
                      </>
                    )}
                  </button>

                  <div className="text-center pt-3 sm:pt-4">
                    <p className="text-gray-600 text-xs sm:text-sm">
                      Don't have an account?{' '}
                      <button
                        type="button"
                        onClick={() => setShowLogin(false)}
                        className="text-blue-600 hover:text-blue-700 font-medium"
                      >
                        Register here
                      </button>
                    </p>
                  </div>
                </form>
              )}
            </div>

            {/* Right Column - Benefits */}
            <div className="hidden lg:block lg:w-96">
              <div className="bg-gradient-to-b from-blue-50 to-indigo-50 rounded-xl p-5 md:p-6 border border-blue-100 h-full">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Shield className="h-5 w-5 text-blue-600" />
                  Hospital Benefits
                </h3>
                
                <div className="space-y-3">
                  {[
                    {
                      icon: Users,
                      title: 'Donor Network',
                      desc: 'Access 50,000+ verified donors'
                    },
                    {
                      icon: Bell,
                      title: 'Emergency Alerts',
                      desc: 'Real-time critical case notifications'
                    },
                    {
                      icon: FileText,
                      title: 'Digital Records',
                      desc: 'Secure patient and donor management'
                    },
                    {
                      icon: MapPin,
                      title: 'Verified Status',
                      desc: 'Get certified partner badge'
                    },
                  ].map((benefit, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3 bg-white/70 rounded-lg">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <benefit.icon className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 text-sm">{benefit.title}</h4>
                        <p className="text-xs text-gray-600">{benefit.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Quick Stats */}
                <div className="mt-6 pt-6 border-t border-blue-100">
                  <h4 className="font-semibold text-gray-900 mb-3 text-sm">Quick Stats</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white p-3 rounded-lg text-center">
                      <div className="text-lg font-bold text-blue-600">500+</div>
                      <div className="text-xs text-gray-600">Hospitals</div>
                    </div>
                    <div className="bg-white p-3 rounded-lg text-center">
                      <div className="text-lg font-bold text-blue-600">24/7</div>
                      <div className="text-xs text-gray-600">Support</div>
                    </div>
                    <div className="bg-white p-3 rounded-lg text-center">
                      <div className="text-lg font-bold text-blue-600">100+</div>
                      <div className="text-xs text-gray-600">Cities</div>
                    </div>
                    <div className="bg-white p-3 rounded-lg text-center">
                      <div className="text-lg font-bold text-blue-600">98%</div>
                      <div className="text-xs text-gray-600">Success</div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-white rounded-lg border border-blue-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Phone className="h-4 w-4 text-blue-600" />
                    <span className="text-sm font-semibold text-gray-700">Need Help?</span>
                  </div>
                  <p className="text-xs text-gray-600 mb-3">
                    Contact our hospital support team
                  </p>
                  <button className="w-full text-sm text-blue-600 font-medium py-2 rounded-lg hover:bg-blue-50 transition-colors border border-blue-200">
                    Contact Support
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 p-3 sm:p-4 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-3 text-center sm:text-left">
            <p className="text-xs sm:text-sm text-gray-600">
              By registering, you agree to our Terms & Privacy Policy
            </p>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <Hospital className="h-3 w-3 sm:h-4 sm:w-4 text-blue-600" />
              </div>
              <span className="text-xs sm:text-sm font-medium text-gray-700">JeevanDaan Hospital Network</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HospitalAuthModal;