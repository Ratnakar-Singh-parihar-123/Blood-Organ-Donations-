import { useState } from "react";
import { Link } from "react-router-dom"; // Added import for Link
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
  Users
} from "lucide-react";

export default function HospitalAuthModal({ isOpen, onClose }) {
  const [isLogin, setIsLogin] = useState(true);
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    // Clear error when user starts typing
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

      saveToken(res.data.token);
      
      // Show success message
      setSuccessMessage(res.data.message || 
        (isLogin ? "Login successful!" : "Registration successful!")
      );
      setSuccess(true);

      // Auto close after success
      setTimeout(() => {
        onClose();
        window.location.reload(); // Or navigate to dashboard
      }, 2000);

    } catch (err) {
      const errorMessage = err.response?.data?.message || "Something went wrong";
      setErrors({ submit: errorMessage });
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
  };

  const handleToggleMode = () => {
    setIsLogin(!isLogin);
    resetForm();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop with animation */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 animate-in fade-in"
        onClick={onClose}
      ></div>

      {/* Modal Container */}
      <div className="flex min-h-full items-center justify-center p-3 sm:p-4">
        <div className="relative w-full max-w-md transform overflow-hidden rounded-2xl bg-white shadow-2xl transition-all duration-300 animate-in slide-in-from-bottom-10 sm:slide-in-from-bottom-0">
          
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute right-3 top-3 sm:right-4 sm:top-4 z-10 rounded-full p-2 bg-white/80 backdrop-blur-sm hover:bg-gray-100 transition-colors shadow-sm"
          >
            <X className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600" />
          </button>

          {/* Decorative Header */}
          <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-blue-700 to-cyan-600 py-6 px-6 sm:py-8 sm:px-8">
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-white/10 rounded-full"></div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-white/10 rounded-full"></div>
            
            <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-center gap-3 sm:gap-4">
              <div className="bg-white/20 p-2.5 sm:p-3 rounded-xl backdrop-blur-sm self-center">
                <Building2 className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
              </div>
              <div className="text-center sm:text-left">
                <h2 className="text-xl sm:text-2xl font-bold text-white">
                  {isLogin ? "Hospital Login" : "Hospital Registration"}
                </h2>
                <p className="text-white/90 text-xs sm:text-sm mt-1">
                  {isLogin 
                    ? "Welcome back! Please login to continue" 
                    : "Join our healthcare network"
                  }
                </p>
              </div>
            </div>
          </div>

          {/* Form Content */}
          <div className="px-5 py-4 sm:px-8 sm:py-6">
            {success ? (
              <div className="text-center py-6 sm:py-8">
                <div className="mx-auto mb-4 flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-green-100">
                  <CheckCircle2 className="h-8 w-8 sm:h-10 sm:w-10 text-green-600" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-gray-900">
                  Success!
                </h3>
                <p className="text-gray-600 mb-6 text-sm sm:text-base">{successMessage}</p>
                <div className="h-1 w-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"></div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                
                {errors.submit && (
                  <div className="rounded-xl bg-red-50 p-3 sm:p-4 border border-red-200">
                    <div className="flex items-start gap-2">
                      <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5 text-red-500 mt-0.5 flex-shrink-0" />
                      <p className="text-sm font-medium text-red-800">{errors.submit}</p>
                    </div>
                  </div>
                )}

                {!isLogin && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Hospital Information
                      </label>
                      <div className="space-y-3 sm:space-y-4">
                        <div>
                          <div className="relative">
                            <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                            <input
                              name="hospitalName"
                              placeholder="Hospital Name"
                              value={form.hospitalName}
                              onChange={handleChange}
                              className={`w-full pl-10 sm:pl-11 pr-4 py-2.5 sm:py-3 text-sm sm:text-base border ${errors.hospitalName ? 'border-red-300' : 'border-gray-300'} rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                            />
                          </div>
                          {errors.hospitalName && (
                            <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.hospitalName}</p>
                          )}
                        </div>

                        <div>
                          <div className="relative">
                            <ClipboardList className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                            <input
                              name="registrationNumber"
                              placeholder="Registration Number"
                              value={form.registrationNumber}
                              onChange={handleChange}
                              className={`w-full pl-10 sm:pl-11 pr-4 py-2.5 sm:py-3 text-sm sm:text-base border ${errors.registrationNumber ? 'border-red-300' : 'border-gray-300'} rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                            />
                          </div>
                          {errors.registrationNumber && (
                            <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.registrationNumber}</p>
                          )}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                          <div>
                            <div className="relative">
                              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                              <input
                                name="phone"
                                placeholder="Phone Number"
                                value={form.phone}
                                onChange={handleChange}
                                className={`w-full pl-10 sm:pl-11 pr-4 py-2.5 sm:py-3 text-sm sm:text-base border ${errors.phone ? 'border-red-300' : 'border-gray-300'} rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                              />
                            </div>
                            {errors.phone && (
                              <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.phone}</p>
                            )}
                          </div>

                          <div>
                            <div className="relative">
                              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                              <input
                                name="city"
                                placeholder="City"
                                value={form.city}
                                onChange={handleChange}
                                className={`w-full pl-10 sm:pl-11 pr-4 py-2.5 sm:py-3 text-sm sm:text-base border ${errors.city ? 'border-red-300' : 'border-gray-300'} rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                              />
                            </div>
                            {errors.city && (
                              <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.city}</p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
                  </>
                )}

                {/* Email Field */}
                <div>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                    <input
                      name="email"
                      type="email"
                      placeholder="Email Address"
                      value={form.email}
                      onChange={handleChange}
                      className={`w-full pl-10 sm:pl-11 pr-4 py-2.5 sm:py-3 text-sm sm:text-base border ${errors.email ? 'border-red-300' : 'border-gray-300'} rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                    />
                  </div>
                  {errors.email && (
                    <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.email}</p>
                  )}
                </div>

                {isLogin && (
                  <div>
                    <div className="relative">
                      <ClipboardList className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                      <input
                        name="registrationNumber"
                        placeholder="Registration Number (Optional)"
                        value={form.registrationNumber}
                        onChange={handleChange}
                        className="w-full pl-10 sm:pl-11 pr-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      />
                    </div>
                  </div>
                )}

                {/* Password Field */}
                <div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                    <input
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      value={form.password}
                      onChange={handleChange}
                      className={`w-full pl-10 sm:pl-11 pr-10 sm:pr-12 py-2.5 sm:py-3 text-sm sm:text-base border ${errors.password ? 'border-red-300' : 'border-gray-300'} rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4 sm:h-5 sm:w-5" /> : <Eye className="h-4 w-4 sm:h-5 sm:w-5" />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.password}</p>
                  )}
                </div>

                {/* Forgot Password Link (Login only) */}
                {isLogin && (
                  <div className="flex justify-end -mt-2">
                    <Link 
                      to="/forgot-password"
                      className="text-xs sm:text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
                      onClick={onClose}
                    >
                      <KeyRound className="h-3 w-3 sm:h-4 sm:w-4" />
                      Forgot Password?
                    </Link>
                  </div>
                )}

                {/* Confirm Password (Register only) */}
                {!isLogin && (
                  <div>
                    <div className="relative">
                      <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                      <input
                        name="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm Password"
                        value={form.confirmPassword}
                        onChange={handleChange}
                        className={`w-full pl-10 sm:pl-11 pr-10 sm:pr-12 py-2.5 sm:py-3 text-sm sm:text-base border ${errors.confirmPassword ? 'border-red-300' : 'border-gray-300'} rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showConfirmPassword ? <EyeOff className="h-4 w-4 sm:h-5 sm:w-5" /> : <Eye className="h-4 w-4 sm:h-5 sm:w-5" />}
                      </button>
                    </div>
                    {errors.confirmPassword && (
                      <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.confirmPassword}</p>
                    )}
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-3 sm:py-3.5 rounded-xl font-semibold text-sm sm:text-base transition-all duration-300 ${loading 
                    ? 'bg-gray-300 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 hover:shadow-lg hover:shadow-blue-500/30 active:scale-[0.98]'
                  } text-white`}
                >
                  {loading ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="h-4 w-4 sm:h-5 sm:w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                      {isLogin ? "Logging in..." : "Registering..."}
                    </div>
                  ) : (
                    isLogin ? "Login to Dashboard" : "Create Hospital Account"
                  )}
                </button>

                {/* Terms and Conditions (Register only) */}
                {!isLogin && (
                  <div className="text-center pt-2">
                    <p className="text-xs text-gray-500">
                      By registering, you agree to our{" "}
                      <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">
                        Terms of Service
                      </a>{" "}
                      and{" "}
                      <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">
                        Privacy Policy
                      </a>
                    </p>
                  </div>
                )}
              </form>
            )}

            {/* Toggle between Login/Register */}
            <div className="mt-5 sm:mt-6 text-center">
              <p className="text-sm text-gray-600">
                {isLogin ? "Don't have a hospital account?" : "Already have an account?"}
                <button
                  onClick={handleToggleMode}
                  className="ml-2 font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                >
                  {isLogin ? "Register Here" : "Login Here"}
                </button>
              </p>
            </div>

            {/* Hospital Benefits (Register only) */}
            {!isLogin && (
              <div className="mt-5 sm:mt-6 rounded-xl bg-gradient-to-r from-blue-50 to-cyan-50 p-3 sm:p-4 border border-blue-200">
                <h4 className="font-semibold text-gray-800 mb-2 text-sm sm:text-base flex items-center gap-2">
                  <HeartPulse className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
                  Benefits of Registering:
                </h4>
                <ul className="space-y-1.5 text-xs sm:text-sm text-gray-600">
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-blue-500 flex-shrink-0"></div>
                    <span>Access to donor database</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-blue-500 flex-shrink-0"></div>
                    <span>Manage patient records</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-blue-500 flex-shrink-0"></div>
                    <span>Request blood/organ donations</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-blue-500 flex-shrink-0"></div>
                    <span>24/7 emergency support</span>
                  </li>
                </ul>
              </div>
            )}

            {/* Testimonial */}
            <div className="mt-4 sm:mt-5 text-center">
              <p className="text-xs text-gray-500 italic">
                "Trusted by over 500+ hospitals nationwide"
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Parent component usage example:
/*
import { useState } from "react";
import HospitalAuthModal from "./HospitalAuthModal";

function AppHeader() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  return (
    <header className="p-4">
      <button 
        onClick={() => setIsAuthModalOpen(true)}
        className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:shadow-lg transition-all"
      >
        Hospital Portal
      </button>
      
      <HospitalAuthModal 
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </header>
  );
}
*/