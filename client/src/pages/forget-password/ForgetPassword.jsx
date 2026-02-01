import React, { useState, useEffect, useRef } from "react";
import { 
  Mail, 
  Lock, 
  Key, 
  CheckCircle, 
  AlertCircle, 
  Loader2, 
  ArrowLeft, 
  Shield,
  Eye,
  EyeOff,
  Droplets,
  Activity,
  Ambulance,
  Users,
  HelpCircle,
  ArrowRight,
  Sparkles,
  Timer,
  Heart,
  Fingerprint,
  Smartphone,
  Cpu,
  Database,
  RefreshCw
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import forgotPasswordAPI from "../../api/forgotPasswordAPI";

const userTypes = [
  { key: 'bloodDonor', label: 'Blood Donor', icon: Droplets, color: 'from-rose-600 to-pink-600', gradient: 'bg-gradient-to-br from-rose-500/10 via-rose-100/30 to-pink-100/20', borderColor: 'border-rose-200', bgColor: 'bg-gradient-to-br from-rose-50 to-pink-50', textColor: 'text-rose-700', shadow: 'shadow-rose-100' },
  { key: 'organDonor', label: 'Organ Donor', icon: Activity, color: 'from-emerald-600 to-teal-600', gradient: 'bg-gradient-to-br from-emerald-500/10 via-emerald-100/30 to-teal-100/20', borderColor: 'border-emerald-200', bgColor: 'bg-gradient-to-br from-emerald-50 to-teal-50', textColor: 'text-emerald-700', shadow: 'shadow-emerald-100' },
  { key: 'patient', label: 'Patient/Family', icon: Ambulance, color: 'from-amber-600 to-orange-600', gradient: 'bg-gradient-to-br from-amber-500/10 via-amber-100/30 to-orange-100/20', borderColor: 'border-amber-200', bgColor: 'bg-gradient-to-br from-amber-50 to-orange-50', textColor: 'text-amber-700', shadow: 'shadow-amber-100' },
  { key: 'user', label: 'General User', icon: Users, color: 'from-blue-600 to-cyan-600', gradient: 'bg-gradient-to-br from-blue-500/10 via-blue-100/30 to-cyan-100/20', borderColor: 'border-blue-200', bgColor: 'bg-gradient-to-br from-blue-50 to-cyan-50', textColor: 'text-blue-700', shadow: 'shadow-blue-100' }
];

function ForgetPassword() {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const urlRole = searchParams.get('role') || 'bloodDonor';
  
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [selectedRole, setSelectedRole] = useState(urlRole);
  const [countdown, setCountdown] = useState(0);
  const [otpSent, setOtpSent] = useState(false);
  const [otpExpiryTime, setOtpExpiryTime] = useState(null);
  const [otpVerified, setOtpVerified] = useState(false);
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);
  
  const otpInputRefs = useRef([]);
  const formRef = useRef(null);

  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else if (countdown === 0 && otpSent) {
      setMessage({ 
        type: "error", 
        text: "OTP has expired. Please request a new one." 
      });
    }
    return () => clearTimeout(timer);
  }, [countdown, otpSent]);

  useEffect(() => {
    if (step === 2 && otpInputRefs.current[0]) {
      setTimeout(() => {
        otpInputRefs.current[0]?.focus();
      }, 100);
    }
  }, [step]);

  const selectedUserType = userTypes.find(type => type.key === selectedRole) || userTypes[0];

  const handleSendOTP = async (e) => {
    e.preventDefault();
    if (!email) {
      setMessage({ type: "error", text: "Please enter your email address" });
      return;
    }

    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      setStep(2);
      setOtpSent(true);
      setOtpVerified(false);
      setCountdown(60);
      
      const expiryTime = new Date();
      expiryTime.setSeconds(expiryTime.getSeconds() + 60);
      setOtpExpiryTime(expiryTime);
      setOtp(["", "", "", "", "", ""]);

      const result = await forgotPasswordAPI.sendOTP(email, selectedRole);
      
      if (result.success) {
        setMessage({ 
          type: "success", 
          text: `✅ 6-digit OTP sent to ${email}. Valid for 60 seconds.` 
        });
      } else {
        setMessage({ 
          type: "error", 
          text: result.message || "Failed to send OTP. Please try again." 
        });
      }
    } catch (error) {
      setMessage({ 
        type: "error", 
        text: error.message || "Failed to send OTP. Please check your email and try again." 
      });
    } finally {
      setLoading(false);
    }
  };

  const handleOtpChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;
    if (value.length > 1) {
      const digits = value.split('').slice(0, 6);
      const newOtp = [...otp];
      digits.forEach((digit, i) => {
        if (index + i < 6) {
          newOtp[index + i] = digit;
        }
      });
      setOtp(newOtp);
      
      const lastIndex = Math.min(index + digits.length, 5);
      otpInputRefs.current[lastIndex]?.focus();
      return;
    }
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    
    if (value !== "" && index < 5) {
      setTimeout(() => {
        otpInputRefs.current[index + 1]?.focus();
      }, 10);
    }
  };

  const handleOtpPaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').trim().slice(0, 6);
    if (/^\d{6}$/.test(pastedData)) {
      const newOtp = pastedData.split('');
      setOtp(newOtp);
      
      setTimeout(() => {
        otpInputRefs.current[5]?.focus();
      }, 10);
    }
  };

  const getOtpString = () => {
    return otp.join("");
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    const otpString = getOtpString();
    
    if (!otpString || otpString.length !== 6) {
      setMessage({ type: "error", text: "Please enter a valid 6-digit OTP" });
      return;
    }

    if (countdown === 0) {
      setMessage({ type: "error", text: "OTP has expired. Please request a new one." });
      return;
    }

    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      const result = await forgotPasswordAPI.verifyOTP(email, otpString, selectedRole);
      
      if (result.success) {
        setMessage({ 
          type: "success", 
          text: "✅ OTP verified successfully! Now set your new password." 
        });
        setOtpVerified(true);
        
        setTimeout(() => {
          setStep(3);
        }, 500);
      } else {
        setMessage({ 
          type: "error", 
          text: result.message || "Invalid OTP. Please try again." 
        });
      }
    } catch (error) {
      setMessage({ 
        type: "error", 
        text: error.message || "Failed to verify OTP. Please try again." 
      });
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    
    if (!newPassword || newPassword.length < 6) {
      setMessage({ type: "error", text: "Password must be at least 6 characters" });
      return;
    }
    
    if (newPassword !== confirmPassword) {
      setMessage({ type: "error", text: "Passwords do not match" });
      return;
    }

    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      const result = await forgotPasswordAPI.resetPassword(
        email, 
        getOtpString(), 
        newPassword, 
        selectedRole
      );
      
      if (result.success) {
        setMessage({ 
          type: "success", 
          text: "✅ Password reset successfully! Redirecting to login..." 
        });
        setShowSuccessAnimation(true);
        
        setTimeout(() => {
          navigate(`/auth?role=${selectedRole}&email=${encodeURIComponent(email)}&reset=success`);
        }, 2000);
      } else {
        setMessage({ 
          type: "error", 
          text: result.message || "Failed to reset password. Please try again." 
        });
      }
    } catch (error) {
      setMessage({ 
        type: "error", 
        text: error.message || "Failed to reset password. Please try again." 
      });
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    if (countdown > 0) {
      setMessage({ 
        type: "error", 
        text: `Please wait ${countdown} seconds before resending OTP` 
      });
      return;
    }

    setLoading(true);
    setMessage({ type: "", text: "" });
    setOtp(["", "", "", "", "", ""]);
    setOtpVerified(false);

    try {
      const result = await forgotPasswordAPI.resendOTP(email, selectedRole);
      
      if (result.success) {
        setMessage({ 
          type: "success", 
          text: "📧 New OTP sent to your email. Valid for 60 seconds." 
        });
        setCountdown(60);
        
        const expiryTime = new Date();
        expiryTime.setSeconds(expiryTime.getSeconds() + 60);
        setOtpExpiryTime(expiryTime);
        
        setTimeout(() => {
          otpInputRefs.current[0]?.focus();
        }, 100);
      } else {
        setMessage({ 
          type: "error", 
          text: result.message || "Failed to resend OTP" 
        });
      }
    } catch (error) {
      setMessage({ 
        type: "error", 
        text: error.message || "Failed to resend OTP. Please try again." 
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRoleSelect = (roleKey) => {
    setSelectedRole(roleKey);
    setEmail("");
    setOtp(["", "", "", "", "", ""]);
    setNewPassword("");
    setConfirmPassword("");
    setStep(1);
    setOtpSent(false);
    setOtpVerified(false);
    setCountdown(0);
    setMessage({ type: "", text: "" });
  };

  const passwordStrength = () => {
    if (!newPassword) return 0;
    let strength = 0;
    if (newPassword.length >= 8) strength += 25;
    if (/[A-Z]/.test(newPassword)) strength += 25;
    if (/\d/.test(newPassword)) strength += 25;
    if (/[^A-Za-z0-9]/.test(newPassword)) strength += 25;
    return strength;
  };

  const getStrengthColor = () => {
    const strength = passwordStrength();
    if (strength < 50) return 'from-red-400 to-rose-500';
    if (strength < 75) return 'from-amber-400 to-orange-500';
    return 'from-emerald-400 to-green-500';
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      if (otp[index] === "" && index > 0) {
        otpInputRefs.current[index - 1]?.focus();
        const newOtp = [...otp];
        newOtp[index - 1] = "";
        setOtp(newOtp);
      } else if (otp[index] !== "") {
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
      }
    }
    if (e.key === "ArrowLeft" && index > 0) {
      otpInputRefs.current[index - 1]?.focus();
    }
    if (e.key === "ArrowRight" && index < 5) {
      otpInputRefs.current[index + 1]?.focus();
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-rose-200/20 to-pink-200/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-emerald-200/20 to-teal-200/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-200/10 to-cyan-200/10 rounded-full blur-3xl"></div>
      </div>

      {/* Animated Success Overlay */}
      {showSuccessAnimation && (
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-green-500/5 to-teal-500/10 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
          <div className="bg-white/90 backdrop-blur-lg rounded-3xl p-8 shadow-2xl animate-scaleIn">
            <div className="flex flex-col items-center">
              <div className="relative mb-6">
                <div className="w-24 h-24 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full flex items-center justify-center animate-pulse">
                  <CheckCircle className="h-12 w-12 text-white" />
                </div>
                <div className="absolute inset-0 rounded-full border-4 border-emerald-300 animate-ping opacity-20"></div>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Password Reset Successful!</h3>
              <p className="text-gray-600 text-center mb-6">You'll be redirected to login shortly...</p>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="w-full max-w-2xl z-10">
        {/* Back Button */}
        <button
          onClick={() => navigate('/select-role')}
          className="mb-8 flex items-center space-x-3 text-gray-600 hover:text-gray-900 transition-all duration-300 bg-white/80 backdrop-blur-sm px-5 py-3 rounded-2xl shadow-lg hover:shadow-xl border border-gray-100 hover:border-gray-200 group"
        >
          <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
          <span className="font-semibold text-sm">Back to Home</span>
        </button>

        <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/50">
          {/* Header Section */}
          <div className={`relative overflow-hidden p-10 ${selectedUserType.gradient}`}>
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-white to-transparent rounded-full -translate-y-32 translate-x-32"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-white to-transparent rounded-full translate-y-32 -translate-x-32"></div>
            </div>
            
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-white/20 backdrop-blur-sm rounded-2xl border border-white/30">
                    <Key className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h1 className="text-4xl font-bold text-white tracking-tight">Reset Password</h1>
                    <p className="text-white/80 text-lg mt-1">
                      {step === 1 && "Secure access to your donation journey"}
                      {step === 2 && "Verify your identity with OTP"}
                      {step === 3 && "Create a strong new password"}
                    </p>
                  </div>
                </div>
                <div className="hidden md:block">
                  <Heart className="h-10 w-10 text-white/30" />
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-2">
                <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                  <div 
                    className={`h-full bg-gradient-to-r ${selectedUserType.color} transition-all duration-1000 ease-out`}
                    style={{ width: `${(step / 3) * 100}%` }}
                  />
                </div>
              </div>
              
              {/* Progress Indicators */}
              <div className="flex justify-between text-sm font-medium">
                <span className={`transition-all duration-500 ${step >= 1 ? 'text-white' : 'text-white/60'}`}>
                  Enter Email
                </span>
                <span className={`transition-all duration-500 ${step >= 2 ? 'text-white' : 'text-white/60'}`}>
                  Verify OTP
                </span>
                <span className={`transition-all duration-500 ${step >= 3 ? 'text-white' : 'text-white/60'}`}>
                  New Password
                </span>
              </div>
            </div>
          </div>

          {/* Role Selection */}
          <div className="p-8 border-b border-gray-100 bg-gradient-to-b from-white to-gray-50/50">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gray-100 rounded-xl">
                  <Fingerprint className="h-5 w-5 text-gray-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">Account Type</h3>
                  <p className="text-sm text-gray-500">Select your user category</p>
                </div>
              </div>
              <Database className="h-6 w-6 text-gray-300" />
            </div>
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {userTypes.map((type) => {
                const Icon = type.icon;
                const isSelected = selectedRole === type.key;
                return (
                  <button
                    key={type.key}
                    onClick={() => handleRoleSelect(type.key)}
                    className={`relative p-4 rounded-2xl border-2 transition-all duration-500 ${
                      isSelected
                        ? `${type.bgColor} ${type.textColor} border-current shadow-lg scale-105`
                        : 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-md'
                    } group overflow-hidden`}
                  >
                    {/* Background glow effect */}
                    {isSelected && (
                      <div className={`absolute inset-0 ${type.gradient} opacity-50`}></div>
                    )}
                    
                    <div className="relative z-10 flex flex-col items-center">
                      <div className={`p-3 rounded-xl mb-3 transition-all duration-300 ${
                        isSelected 
                          ? 'bg-white/90 shadow-inner' 
                          : 'bg-gray-50 group-hover:bg-gray-100'
                      }`}>
                        <Icon className={`h-6 w-6 ${isSelected ? type.textColor : 'text-gray-600'}`} />
                      </div>
                      <span className={`text-sm font-semibold transition-colors ${
                        isSelected ? type.textColor : 'text-gray-700'
                      }`}>
                        {type.label}
                      </span>
                    </div>
                    
                    {/* Selection indicator */}
                    {isSelected && (
                      <div className="absolute top-3 right-3">
                        <div className="w-2 h-2 bg-current rounded-full animate-pulse"></div>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Form Content */}
          <div className="p-8">
            {/* Message Alert */}
            {message.text && (
              <div className={`mb-8 p-5 rounded-2xl border-l-4 animate-slideIn ${
                message.type === "success" 
                  ? "bg-gradient-to-r from-emerald-50 to-green-50 border-emerald-400 text-emerald-800"
                  : "bg-gradient-to-r from-rose-50 to-red-50 border-rose-400 text-rose-800"
              } shadow-sm`}>
                <div className="flex items-start space-x-4">
                  <div className={`p-2 rounded-xl ${message.type === "success" ? 'bg-emerald-100' : 'bg-rose-100'}`}>
                    {message.type === "success" ? (
                      <CheckCircle className="h-6 w-6" />
                    ) : (
                      <AlertCircle className="h-6 w-6" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{message.text}</p>
                    <p className="text-sm opacity-80 mt-1">
                      {message.type === "success" 
                        ? "You can proceed to the next step." 
                        : "Please check and try again."}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Step 1: Email */}
            {step === 1 && (
              <form ref={formRef} onSubmit={handleSendOTP} className="space-y-8">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <label className="block text-lg font-bold text-gray-800">
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-xl ${selectedUserType.bgColor}`}>
                          <Mail className={`h-5 w-5 ${selectedUserType.textColor}`} />
                        </div>
                        <span>Email Verification</span>
                      </div>
                    </label>
                    <Smartphone className="h-5 w-5 text-gray-300" />
                  </div>
                  
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-5 py-5 bg-gradient-to-r from-gray-50 to-white border-2 border-gray-200 rounded-2xl 
                             focus:outline-none focus:border-gray-300 focus:ring-4 focus:ring-opacity-30 transition-all duration-300
                             text-gray-800 placeholder-gray-400 shadow-sm hover:shadow-md"
                    placeholder="Enter your registered email address"
                    required
                    disabled={loading}
                    autoComplete="email"
                  />
                  
                  <div className="mt-4 p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-100">
                    <div className="flex items-start space-x-3">
                      <div className="p-1.5 bg-gray-100 rounded-lg">
                        <CheckCircle className="h-4 w-4 text-gray-500" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700">What happens next?</p>
                        <p className="text-sm text-gray-500 mt-1">
                          We'll send a 6-digit verification code to this email. 
                          The code expires in 60 seconds for your security.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading || !email}
                  className={`group w-full py-5 bg-gradient-to-r ${selectedUserType.color} text-white 
                           rounded-2xl font-bold text-lg transition-all duration-500 
                           hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98] 
                           disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
                           shadow-xl relative overflow-hidden`}
                >
                  {/* Button glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  
                  <span className="relative flex items-center justify-center space-x-3">
                    {loading ? (
                      <>
                        <Loader2 className="h-6 w-6 animate-spin" />
                        <span>Sending Secure Code...</span>
                      </>
                    ) : (
                      <>
                        <Key className="h-6 w-6 group-hover:rotate-12 transition-transform" />
                        <span>Send Verification Code</span>
                        <ArrowRight className="h-5 w-5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                      </>
                    )}
                  </span>
                </button>
              </form>
            )}

            {/* Step 2: OTP Verification */}
            {step === 2 && (
              <form onSubmit={handleVerifyOTP} className="space-y-8">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <label className="block text-lg font-bold text-gray-800">
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-xl ${selectedUserType.bgColor}`}>
                          <Smartphone className={`h-5 w-5 ${selectedUserType.textColor}`} />
                        </div>
                        <span>OTP Verification</span>
                      </div>
                    </label>
                    
                    {countdown > 0 && (
                      <div className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border border-amber-200">
                        <Timer className="h-4 w-4 text-amber-600" />
                        <span className="text-sm font-bold text-amber-700">{formatTime(countdown)}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="mb-8 p-5 bg-gradient-to-r from-gray-50 to-white rounded-2xl border border-gray-100 shadow-sm">
                    <p className="text-sm font-medium text-gray-700 mb-2">Enter the 6-digit code sent to:</p>
                    <p className="text-lg font-bold text-gray-900 truncate">{email}</p>
                  </div>
                  
                  <div 
                    className="flex justify-center space-x-3 mb-8"
                    onPaste={handleOtpPaste}
                  >
                    {[0, 1, 2, 3, 4, 5].map((index) => (
                      <div key={index} className="relative">
                        <input
                          ref={(el) => otpInputRefs.current[index] = el}
                          id={`otp-${index}`}
                          type="text"
                          maxLength="1"
                          value={otp[index]}
                          onChange={(e) => handleOtpChange(index, e.target.value)}
                          onKeyDown={(e) => handleKeyDown(e, index)}
                          className="w-16 h-16 text-center text-3xl font-bold bg-gradient-to-b from-white to-gray-50 
                                   border-2 border-gray-300 rounded-xl focus:border-gray-400 focus:ring-4 
                                   focus:ring-gray-200 focus:outline-none transition-all duration-200
                                   shadow-sm hover:shadow-md"
                          inputMode="numeric"
                          pattern="\d*"
                          autoComplete="one-time-code"
                        />
                        {index < 5 && (
                          <div className="absolute top-1/2 right-0 transform translate-x-2 -translate-y-1/2 text-gray-300">
                            <div className="w-2 h-0.5 bg-gray-300"></div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between mt-6">
                    <button
                      type="button"
                      onClick={handleResendOTP}
                      disabled={loading || countdown > 0}
                      className={`flex items-center space-x-2 px-5 py-3 rounded-xl transition-all duration-300
                               ${countdown > 0 
                                 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                                 : 'bg-gradient-to-r from-gray-50 to-white text-gray-700 hover:text-gray-900 hover:shadow-md border border-gray-200 hover:border-gray-300'}`}
                    >
                      {loading ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <>
                          <RefreshCw className={`h-4 w-4 ${countdown > 0 ? 'text-gray-400' : 'text-gray-600'}`} />
                          <span className="font-medium">
                            {countdown > 0 ? `Resend in ${countdown}s` : 'Resend Code'}
                          </span>
                        </>
                      )}
                    </button>
                    
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Can't find the code?</p>
                      <p className="text-sm text-gray-400">Check your spam folder</p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => {
                      setStep(1);
                      setMessage({ type: "", text: "" });
                      setOtp(["", "", "", "", "", ""]);
                      setCountdown(0);
                      setOtpVerified(false);
                    }}
                    className="flex-1 py-4 border-2 border-gray-300 bg-gradient-to-r from-white to-gray-50 text-gray-700 
                             rounded-2xl font-semibold hover:bg-gray-50 hover:border-gray-400 hover:shadow-md 
                             transition-all duration-300 flex items-center justify-center space-x-3 group"
                    disabled={loading}
                  >
                    <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
                    <span>Back</span>
                  </button>

                  <button
                    type="submit"
                    disabled={loading || getOtpString().length !== 6 || countdown === 0}
                    className={`flex-1 py-4 bg-gradient-to-r ${selectedUserType.color} text-white 
                             rounded-2xl font-semibold transition-all duration-500 
                             hover:shadow-2xl hover:scale-105 active:scale-95 
                             disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
                             flex items-center justify-center space-x-3 relative overflow-hidden group`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                    
                    <span className="relative">
                      {loading ? (
                        <>
                          <Loader2 className="h-5 w-5 animate-spin inline mr-2" />
                          Verifying...
                        </>
                      ) : (
                        <>
                          Verify OTP
                          <ArrowRight className="h-5 w-5 inline ml-2 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </span>
                  </button>
                </div>
              </form>
            )}

            {/* Step 3: New Password */}
            {step === 3 && (
              <form onSubmit={handleResetPassword} className="space-y-8">
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <label className="block text-lg font-bold text-gray-800">
                        <div className="flex items-center space-x-3">
                          <div className={`p-2 rounded-xl ${selectedUserType.bgColor}`}>
                            <Lock className={`h-5 w-5 ${selectedUserType.textColor}`} />
                          </div>
                          <span>New Password</span>
                        </div>
                      </label>
                      <Cpu className="h-5 w-5 text-gray-300" />
                    </div>
                    
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full pl-5 pr-14 py-5 bg-gradient-to-r from-gray-50 to-white border-2 border-gray-200 rounded-2xl 
                                 focus:outline-none focus:border-gray-300 focus:ring-4 focus:ring-opacity-30
                                 transition-all duration-300 placeholder-gray-400 shadow-sm hover:shadow-md"
                        placeholder="Create a strong password (min. 6 characters)"
                        required
                        disabled={loading}
                        autoComplete="new-password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-5 top-1/2 transform -translate-y-1/2 p-2 text-gray-500 hover:text-gray-700 
                                 hover:bg-gray-100 rounded-xl transition-colors duration-200"
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                    
                    {/* Password Strength Meter */}
                    {newPassword && (
                      <div className="mt-6 p-5 bg-gradient-to-r from-gray-50 to-white rounded-2xl border border-gray-100 shadow-sm">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-sm font-medium text-gray-700">Password Strength</span>
                          <span className={`text-sm font-bold bg-gradient-to-r ${getStrengthColor()} bg-clip-text text-transparent`}>
                            {passwordStrength() < 50 ? 'Weak' : 
                             passwordStrength() < 75 ? 'Good' : 'Strong'}
                          </span>
                        </div>
                        <div className="h-2.5 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className={`h-full bg-gradient-to-r ${getStrengthColor()} transition-all duration-700 ease-out`}
                            style={{ width: `${passwordStrength()}%` }}
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-2 mt-4">
                          <div className="flex items-center space-x-2">
                            <div className={`w-2 h-2 rounded-full ${newPassword.length >= 8 ? 'bg-emerald-500' : 'bg-gray-300'}`}></div>
                            <span className="text-xs text-gray-600">8+ characters</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className={`w-2 h-2 rounded-full ${/[A-Z]/.test(newPassword) ? 'bg-emerald-500' : 'bg-gray-300'}`}></div>
                            <span className="text-xs text-gray-600">Uppercase letter</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className={`w-2 h-2 rounded-full ${/\d/.test(newPassword) ? 'bg-emerald-500' : 'bg-gray-300'}`}></div>
                            <span className="text-xs text-gray-600">Number</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className={`w-2 h-2 rounded-full {/[^A-Za-z0-9]/.test(newPassword) ? 'bg-emerald-500' : 'bg-gray-300'}`}></div>
                            <span className="text-xs text-gray-600">Special character</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-lg font-bold text-gray-800 mb-4">
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-xl ${selectedUserType.bgColor}`}>
                          <Lock className={`h-5 w-5 ${selectedUserType.textColor}`} />
                        </div>
                        <span>Confirm Password</span>
                      </div>
                    </label>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full px-5 py-5 bg-gradient-to-r from-gray-50 to-white border-2 border-gray-200 rounded-2xl 
                               focus:outline-none focus:border-gray-300 focus:ring-4 focus:ring-opacity-30
                               transition-all duration-300 placeholder-gray-400 shadow-sm hover:shadow-md"
                      placeholder="Re-enter your new password"
                      required
                      disabled={loading}
                      autoComplete="new-password"
                    />
                    {confirmPassword && newPassword !== confirmPassword && (
                      <div className="mt-4 p-4 bg-gradient-to-r from-rose-50 to-red-50 rounded-xl border border-rose-200">
                        <p className="text-rose-700 text-sm font-medium flex items-center">
                          <AlertCircle className="h-4 w-4 mr-2 flex-shrink-0" />
                          Passwords do not match. Please ensure both fields are identical.
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading || !newPassword || !confirmPassword || newPassword !== confirmPassword}
                  className={`group w-full py-5 bg-gradient-to-r ${selectedUserType.color} text-white 
                           rounded-2xl font-bold text-lg transition-all duration-500 
                           hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98] 
                           disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
                           shadow-xl relative overflow-hidden`}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  
                  <span className="relative flex items-center justify-center space-x-3">
                    {loading ? (
                      <>
                        <Loader2 className="h-6 w-6 animate-spin" />
                        <span>Securing Your Account...</span>
                      </>
                    ) : (
                      <>
                        <Lock className="h-6 w-6 group-hover:rotate-12 transition-transform" />
                        <span>Reset Password & Continue</span>
                        <ArrowRight className="h-5 w-5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                      </>
                    )}
                  </span>
                </button>

                <div className="text-center pt-6 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={() => {
                      setStep(2);
                      setMessage({ type: "", text: "" });
                    }}
                    className="text-sm font-medium text-gray-600 hover:text-gray-900 flex items-center justify-center space-x-2 mx-auto group"
                  >
                    <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                    <span>Back to OTP verification</span>
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Footer */}
          <div className="px-8 py-8 bg-gradient-to-b from-white to-gray-50/50 border-t border-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-gradient-to-br from-emerald-100 to-green-100 rounded-xl">
                  <Shield className="h-6 w-6 text-emerald-600" />
                </div>
                <div>
                  <p className="font-bold text-gray-800">Bank-Level Security</p>
                  <p className="text-sm text-gray-500">End-to-end encryption</p>
                </div>
              </div>
              
              <div className="text-center">
                <Link
                  to={`/auth?role=${selectedRole}`}
                  className="inline-flex items-center space-x-3 text-gray-700 hover:text-gray-900 font-semibold 
                           group transition-all duration-300 px-5 py-3 rounded-2xl bg-gradient-to-r from-gray-50 to-white 
                           hover:shadow-md border border-gray-200 hover:border-gray-300"
                >
                  <span>Remember Password? Sign In</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              <div className="flex items-center justify-end space-x-4">
                <Link
                  to="/help"
                  className="flex items-center space-x-2 text-gray-500 hover:text-gray-700 text-sm 
                           transition-colors duration-300 p-2 hover:bg-gray-100 rounded-lg"
                >
                  <HelpCircle className="h-4 w-4" />
                  <span>Need Help?</span>
                </Link>
              </div>
            </div>

            {/* Branding */}
            <div className="mt-8 pt-8 border-t border-gray-100 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gradient-to-br from-rose-500 to-pink-500 rounded-lg">
                  <Sparkles className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
                    JeevanDaan
                  </p>
                  <p className="text-xs text-gray-500">Saving lives through donation</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-400">© {new Date().getFullYear()} JeevanDaan. All rights reserved.</p>
                <p className="text-xs text-gray-400 mt-1">v2.1.0 • Secure Platform</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add CSS animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes scaleIn {
          from { transform: scale(0.9); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        
        @keyframes slideIn {
          from { transform: translateY(-10px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        
        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out;
        }
        
        .animate-slideIn {
          animation: slideIn 0.3s ease-out;
        }
        
        /* Smooth transitions for all elements */
        * {
          transition: background-color 0.3s ease, border-color 0.3s ease, transform 0.3s ease, opacity 0.3s ease;
        }
      `}</style>
    </div>
  );
}

export default ForgetPassword;