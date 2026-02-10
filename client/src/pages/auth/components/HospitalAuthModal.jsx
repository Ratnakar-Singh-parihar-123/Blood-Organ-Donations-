import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerHospital, loginHospital } from "../../../api/hospitalApi";
import { saveToken } from "../../../api/auth";
import { 
  X, 
  Eye, 
  EyeOff, 
  Building2, 
  Mail, 
  Phone, 
  MapPin, 
  Lock, 
  ClipboardList,
  Stethoscope,
  AlertCircle,
  CheckCircle2,
  KeyRound,
  Shield,
  HeartPulse,
  Users,
  Loader2,
  Sparkles,
  CheckCircle,
  ShieldCheck,
  BadgeCheck
} from "lucide-react";

export default function HospitalAuthModal({ isOpen, onClose }) {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [form, setForm] = useState({
    hospitalName: "",
    registrationNumber: "",
    email: "",
    phone: "",
    city: "",
    password: "",
    confirmPassword: ""
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [authStep, setAuthStep] = useState("form"); // form, success, complete

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!isLogin) {
      if (!form.hospitalName.trim()) {
        newErrors.hospitalName = "Hospital name is required";
      }
      if (!form.registrationNumber.trim()) {
        newErrors.registrationNumber = "Registration number is required";
      }
      if (!form.phone.trim()) {
        newErrors.phone = "Phone number is required";
      } else if (!/^\d{10}$/.test(form.phone)) {
        newErrors.phone = "Please enter a valid 10-digit phone number";
      }
      if (!form.city.trim()) {
        newErrors.city = "City is required";
      }
      if (form.password !== form.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      }
    }

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!form.password.trim()) {
      newErrors.password = "Password is required";
    } else if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      let res;

      if (isLogin) {
        res = await loginHospital({
          email: form.email,
          registrationNumber: form.registrationNumber,
          password: form.password,
        });
      } else {
        res = await registerHospital(form);
      }

      // Save token and hospital data
      const token = res.data.token;
      const hospitalData = res.data.hospital || {
        hospitalName: form.hospitalName,
        email: form.email,
        phone: form.phone,
        city: form.city,
        registrationNumber: form.registrationNumber,
        type: 'hospital'
      };

      // Save to localStorage with multiple keys for redundancy
      saveToken(token);
      localStorage.setItem('hospitalToken', token);
      localStorage.setItem('hospitalData', JSON.stringify(hospitalData));
      localStorage.setItem('hospitalToken', token); // Duplicate for security
      localStorage.setItem('hospitalInfo', JSON.stringify(hospitalData));
      
      // Also save as current user for navbar detection
      localStorage.setItem('currentUserType', 'hospital');
      localStorage.setItem('currentUserData', JSON.stringify(hospitalData));
      
      // Generate hospital ID
      const hospitalId = hospitalData.hospitalId || hospitalData._id || 
                        hospitalData.registrationNumber || 
                        `hospital-${Date.now().toString(36)}`;
      localStorage.setItem('currentHospitalId', hospitalId);

      // Set success message
      setSuccessMessage(res.data.message || 
        (isLogin ? "Login successful! Redirecting..." : "Registration successful!")
      );
      setSuccess(true);
      setAuthStep("success");

      // Trigger auth success event for navbar
      window.dispatchEvent(new CustomEvent('authSuccess', {
        detail: {
          userType: 'hospital',
          userData: hospitalData,
          token: token
        }
      }));

      // Auto close after success
      setTimeout(() => {
        setAuthStep("complete");
        
        // Close modal and navigate
        onClose();
        
        // Trigger auth change for navbar update
        window.dispatchEvent(new Event('authChange'));
        
        // Navigate based on login/register
        if (isLogin) {
          navigate("/hospital/dashboard", { 
            state: { 
              hospitalData: hospitalData,
              justLoggedIn: true 
            } 
          });
        } else {
          navigate("/hospital/onboarding", {
            state: { 
              hospitalData: hospitalData,
              justRegistered: true 
            }
          });
        }
        
        // Reset form
        resetForm();
      }, 1500);

    } catch (err) {
      const errorMessage = err.response?.data?.message || 
                          err.response?.data?.error || 
                          "Something went wrong. Please try again.";
      setErrors({ submit: errorMessage });
      console.error("Hospital auth error:", err);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setForm({
      hospitalName: "",
      registrationNumber: "",
      email: "",
      phone: "",
      city: "",
      password: "",
      confirmPassword: ""
    });
    setErrors({});
    setSuccess(false);
    setAuthStep("form");
  };

  const handleToggleMode = () => {
    setIsLogin(!isLogin);
    resetForm();
  };

  const handleQuickLogin = (type) => {
    // Demo credentials for testing
    const demoCredentials = {
      admin: {
        email: "admin@cityhospital.com",
        password: "admin123",
        registrationNumber: "HOSP001"
      },
      user: {
        email: "user@metroclinic.com",
        password: "user123",
        registrationNumber: "HOSP002"
      }
    };

    setForm({
      ...form,
      email: demoCredentials[type].email,
      password: demoCredentials[type].password,
      registrationNumber: demoCredentials[type].registrationNumber
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] overflow-y-auto">
      {/* Backdrop with animation */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-md transition-opacity duration-500 animate-in fade-in"
        onClick={onClose}
      ></div>

      {/* Modal Container */}
      <div className="flex min-h-full items-center justify-center p-3 sm:p-6">
        <div className="relative w-full max-w-2xl transform overflow-hidden rounded-3xl bg-white shadow-2xl transition-all duration-500 animate-in slide-in-from-bottom-10 sm:slide-in-from-bottom-0">
          
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute right-4 top-4 sm:right-6 sm:top-6 z-10 rounded-full p-3 bg-white/90 backdrop-blur-sm hover:bg-gray-100 transition-all hover:scale-110 shadow-lg"
          >
            <X className="h-5 w-5 sm:h-6 sm:w-6 text-gray-600" />
          </button>

          {/* Header Section */}
          <div className="relative overflow-hidden bg-gradient-to-br from-purple-600 via-violet-600 to-indigo-700 py-8 px-6 sm:py-12 sm:px-10">
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
            
            <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-center gap-5 sm:gap-8">
              <div className="bg-white/20 p-3.5 sm:p-4 rounded-2xl backdrop-blur-sm self-center shadow-lg">
                <Building2 className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
              </div>
              <div className="text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start gap-2 mb-2">
                  <h2 className="text-2xl sm:text-3xl font-bold text-white">
                    {isLogin ? "Hospital Login" : "Hospital Registration"}
                  </h2>
                  <BadgeCheck className="h-6 w-6 text-emerald-300" />
                </div>
                <p className="text-white/90 text-sm sm:text-base max-w-md">
                  {isLogin 
                    ? "Access your hospital dashboard to manage patients, donations, and staff" 
                    : "Join India's largest healthcare network and save lives together"
                  }
                </p>
              </div>
            </div>
          </div>

          {/* Form Content */}
          <div className="px-6 py-6 sm:px-10 sm:py-8">
            {authStep === "success" ? (
              <div className="text-center py-8 sm:py-12">
                <div className="relative inline-block mb-6">
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full blur-2xl opacity-70 animate-pulse"></div>
                  <div className="relative bg-gradient-to-r from-emerald-500 to-green-600 p-6 rounded-full shadow-2xl">
                    <CheckCircle2 className="h-16 w-16 text-white" />
                  </div>
                </div>
                <h3 className="mb-4 text-2xl font-bold text-gray-900">
                  {isLogin ? "Welcome Back!" : "Registration Complete!"}
                </h3>
                <p className="text-gray-600 mb-8 text-lg max-w-md mx-auto">{successMessage}</p>
                <div className="flex justify-center mb-6">
                  <div className="h-2 w-48 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full animate-pulse"></div>
                </div>
                <div className="flex items-center justify-center gap-2 text-gray-500">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span className="text-sm">Redirecting to dashboard...</span>
                </div>
              </div>
            ) : authStep === "complete" ? (
              <div className="text-center py-12">
                <div className="mx-auto mb-8 w-20 h-20 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center animate-bounce shadow-2xl">
                  <Sparkles className="h-10 w-10 text-white" />
                </div>
                <h3 className="mb-4 text-2xl font-bold text-gray-900">
                  Ready to Save Lives!
                </h3>
                <p className="text-gray-600 mb-8">You're being redirected to your hospital dashboard...</p>
              </div>
            ) : (
              <>
                {/* Quick Login Demo Buttons */}
                {isLogin && (
                  <div className="mb-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="h-px flex-1 bg-gray-200"></div>
                      <span className="text-sm text-gray-500 font-medium">Quick Demo</span>
                      <div className="h-px flex-1 bg-gray-200"></div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        onClick={() => handleQuickLogin('admin')}
                        className="px-4 py-3 bg-gradient-to-r from-purple-50 to-violet-50 text-purple-700 rounded-xl font-medium hover:from-purple-100 hover:to-violet-100 transition-all border border-purple-200 flex items-center justify-center gap-2"
                      >
                        <ShieldCheck className="h-4 w-4" />
                        Admin Demo
                      </button>
                      <button
                        onClick={() => handleQuickLogin('user')}
                        className="px-4 py-3 bg-gradient-to-r from-blue-50 to-cyan-50 text-blue-700 rounded-xl font-medium hover:from-blue-100 hover:to-cyan-100 transition-all border border-blue-200 flex items-center justify-center gap-2"
                      >
                        <Users className="h-4 w-4" />
                        Staff Demo
                      </button>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
                  {errors.submit && (
                    <div className="rounded-2xl bg-red-50 p-4 sm:p-5 border-2 border-red-200 animate-shake">
                      <div className="flex items-start gap-3">
                        <AlertCircle className="h-5 w-5 sm:h-6 sm:w-6 text-red-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-sm font-bold text-red-800">Authentication Failed</p>
                          <p className="text-sm text-red-700 mt-1">{errors.submit}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {!isLogin && (
                    <>
                      <div>
                        <div className="flex items-center gap-2 mb-4">
                          <div className="h-8 w-1.5 bg-gradient-to-b from-purple-500 to-violet-600 rounded-full"></div>
                          <h3 className="font-bold text-gray-900 text-lg">Hospital Information</h3>
                        </div>
                        <div className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <div className="relative group">
                                <Building2 className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-purple-500" />
                                <input
                                  name="hospitalName"
                                  placeholder="Hospital Name"
                                  value={form.hospitalName}
                                  onChange={handleChange}
                                  className={`w-full pl-12 pr-4 py-3.5 text-base border-2 ${errors.hospitalName ? 'border-red-300' : 'border-gray-200'} rounded-xl focus:ring-2 focus:ring-purple-300 focus:border-transparent transition-all bg-gray-50/50`}
                                />
                              </div>
                              {errors.hospitalName && (
                                <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                                  <AlertCircle className="h-3 w-3" />
                                  {errors.hospitalName}
                                </p>
                              )}
                            </div>

                            <div>
                              <div className="relative group">
                                <ClipboardList className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-purple-500" />
                                <input
                                  name="registrationNumber"
                                  placeholder="Registration Number"
                                  value={form.registrationNumber}
                                  onChange={handleChange}
                                  className={`w-full pl-12 pr-4 py-3.5 text-base border-2 ${errors.registrationNumber ? 'border-red-300' : 'border-gray-200'} rounded-xl focus:ring-2 focus:ring-purple-300 focus:border-transparent transition-all bg-gray-50/50`}
                                />
                              </div>
                              {errors.registrationNumber && (
                                <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                                  <AlertCircle className="h-3 w-3" />
                                  {errors.registrationNumber}
                                </p>
                              )}
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <div className="relative group">
                                <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-purple-500" />
                                <input
                                  name="phone"
                                  placeholder="Phone Number"
                                  value={form.phone}
                                  onChange={handleChange}
                                  className={`w-full pl-12 pr-4 py-3.5 text-base border-2 ${errors.phone ? 'border-red-300' : 'border-gray-200'} rounded-xl focus:ring-2 focus:ring-purple-300 focus:border-transparent transition-all bg-gray-50/50`}
                                />
                              </div>
                              {errors.phone && (
                                <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                                  <AlertCircle className="h-3 w-3" />
                                  {errors.phone}
                                </p>
                              )}
                            </div>

                            <div>
                              <div className="relative group">
                                <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-purple-500" />
                                <input
                                  name="city"
                                  placeholder="City"
                                  value={form.city}
                                  onChange={handleChange}
                                  className={`w-full pl-12 pr-4 py-3.5 text-base border-2 ${errors.city ? 'border-red-300' : 'border-gray-200'} rounded-xl focus:ring-2 focus:ring-purple-300 focus:border-transparent transition-all bg-gray-50/50`}
                                />
                              </div>
                              {errors.city && (
                                <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                                  <AlertCircle className="h-3 w-3" />
                                  {errors.city}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                          <div className="w-full border-t border-gray-200"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                          <span className="px-4 bg-white text-gray-500">Account Credentials</span>
                        </div>
                      </div>
                    </>
                  )}

                  {/* Email Field */}
                  <div>
                    <div className="relative group">
                      <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-purple-500" />
                      <input
                        name="email"
                        type="email"
                        placeholder="Email Address"
                        value={form.email}
                        onChange={handleChange}
                        className={`w-full pl-12 pr-4 py-3.5 text-base border-2 ${errors.email ? 'border-red-300' : 'border-gray-200'} rounded-xl focus:ring-2 focus:ring-purple-300 focus:border-transparent transition-all bg-gray-50/50`}
                      />
                    </div>
                    {errors.email && (
                      <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {isLogin && (
                    <div>
                      <div className="relative group">
                        <ClipboardList className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-purple-500" />
                        <input
                          name="registrationNumber"
                          placeholder="Registration Number"
                          value={form.registrationNumber}
                          onChange={handleChange}
                          className="w-full pl-12 pr-4 py-3.5 text-base border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-300 focus:border-transparent transition-all bg-gray-50/50"
                        />
                      </div>
                      <p className="mt-2 text-sm text-gray-500">Optional for quick login</p>
                    </div>
                  )}

                  {/* Password Field */}
                  <div>
                    <div className="relative group">
                      <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-purple-500" />
                      <input
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        value={form.password}
                        onChange={handleChange}
                        className={`w-full pl-12 pr-12 py-3.5 text-base border-2 ${errors.password ? 'border-red-300' : 'border-gray-200'} rounded-xl focus:ring-2 focus:ring-purple-300 focus:border-transparent transition-all bg-gray-50/50`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-purple-500 transition-colors"
                      >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                    {errors.password && (
                      <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        {errors.password}
                      </p>
                    )}
                  </div>

                  {/* Forgot Password Link (Login only) */}
                  {isLogin && (
                    <div className="flex justify-end -mt-2">
                      <Link 
                        to="/forgot-password"
                        className="text-sm text-purple-600 hover:text-purple-700 font-medium flex items-center gap-2 hover:gap-3 transition-all"
                        onClick={onClose}
                      >
                        <KeyRound className="h-4 w-4" />
                        Forgot Password?
                      </Link>
                    </div>
                  )}

                  {/* Confirm Password (Register only) */}
                  {!isLogin && (
                    <div>
                      <div className="relative group">
                        <Shield className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-purple-500" />
                        <input
                          name="confirmPassword"
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="Confirm Password"
                          value={form.confirmPassword}
                          onChange={handleChange}
                          className={`w-full pl-12 pr-12 py-3.5 text-base border-2 ${errors.confirmPassword ? 'border-red-300' : 'border-gray-200'} rounded-xl focus:ring-2 focus:ring-purple-300 focus:border-transparent transition-all bg-gray-50/50`}
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-purple-500 transition-colors"
                        >
                          {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                      </div>
                      {errors.confirmPassword && (
                        <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                          <AlertCircle className="h-3 w-3" />
                          {errors.confirmPassword}
                        </p>
                      )}
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-4 rounded-xl font-bold text-base transition-all duration-500 relative overflow-hidden group ${
                      loading 
                        ? 'bg-gray-300 cursor-not-allowed' 
                        : 'bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 hover:shadow-2xl hover:shadow-purple-500/30 active:scale-[0.98]'
                    } text-white`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    {loading ? (
                      <div className="flex items-center justify-center gap-3">
                        <div className="h-5 w-5 animate-spin rounded-full border-3 border-white border-t-transparent"></div>
                        <span>{isLogin ? "Logging in..." : "Registering..."}</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-3">
                        <Building2 className="h-5 w-5" />
                        <span>{isLogin ? "Login to Hospital Dashboard" : "Create Hospital Account"}</span>
                        <Sparkles className="h-4 w-4" />
                      </div>
                    )}
                  </button>

                  {/* Terms and Conditions (Register only) */}
                  {!isLogin && (
                    <div className="text-center pt-2">
                      <p className="text-sm text-gray-500">
                        By registering, you agree to our{" "}
                        <a href="#" className="text-purple-600 hover:text-purple-700 font-medium underline">
                          Terms of Service
                        </a>{" "}
                        and{" "}
                        <a href="#" className="text-purple-600 hover:text-purple-700 font-medium underline">
                          Privacy Policy
                        </a>
                      </p>
                    </div>
                  )}
                </form>
              </>
            )}

            {/* Toggle between Login/Register */}
            <div className="mt-6 sm:mt-8 text-center">
              <p className="text-sm text-gray-600">
                {isLogin ? "Don't have a hospital account?" : "Already have an account?"}
                <button
                  onClick={handleToggleMode}
                  className="ml-2 font-bold text-purple-600 hover:text-purple-700 transition-colors hover:underline"
                >
                  {isLogin ? "Register Here" : "Login Here"}
                </button>
              </p>
            </div>

            {/* Hospital Benefits (Register only) */}
            {!isLogin && authStep === "form" && (
              <div className="mt-6 rounded-2xl bg-gradient-to-r from-purple-50 to-violet-50 p-5 sm:p-6 border-2 border-purple-200">
                <h4 className="font-bold text-gray-800 mb-3 text-lg flex items-center gap-3">
                  <HeartPulse className="h-5 w-5 text-purple-600" />
                  Benefits of Registering:
                </h4>
                <ul className="space-y-3 text-sm sm:text-base text-gray-600">
                  <li className="flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full bg-purple-500 flex-shrink-0"></div>
                    <span>Access to nationwide donor database</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full bg-purple-500 flex-shrink-0"></div>
                    <span>Digital patient records management</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full bg-purple-500 flex-shrink-0"></div>
                    <span>Real-time blood/organ donation requests</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full bg-purple-500 flex-shrink-0"></div>
                    <span>24/7 emergency support & coordination</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full bg-purple-500 flex-shrink-0"></div>
                    <span>Government compliance & reporting tools</span>
                  </li>
                </ul>
              </div>
            )}

            {/* Trust Badge */}
            <div className="mt-6 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-50 to-green-50 rounded-full border border-emerald-200">
                <ShieldCheck className="h-4 w-4 text-emerald-600" />
                <span className="text-sm font-medium text-emerald-700">
                  Trusted by 500+ hospitals across India
                </span>
                <CheckCircle className="h-4 w-4 text-emerald-600" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Add this CSS for animations
const styles = `
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideIn {
  from { transform: translateY(20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
  20%, 40%, 60%, 80% { transform: translateX(5px); }
}

.animate-fadeIn {
  animation: fadeIn 0.3s ease-out;
}

.animate-slideIn {
  animation: slideIn 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.animate-shake {
  animation: shake 0.5s ease-in-out;
}
`;

// Add styles to document
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement("style");
  styleSheet.type = "text/css";
  styleSheet.innerText = styles;
  document.head.appendChild(styleSheet);
}