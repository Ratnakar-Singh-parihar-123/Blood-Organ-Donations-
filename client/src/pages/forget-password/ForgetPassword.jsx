import React, { useState } from "react";
import axios from "axios";
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
  EyeOff
} from "lucide-react";
import { Link } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_API_URL;

function ForgetPassword() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  // Send OTP
  const sendOTP = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      const res = await axios.post(
        `${API_BASE_URL}/auth/forgot-password`,
        { email }
      );
      setMessage({ 
        type: "success", 
        text: res.data.message || "OTP sent to your email" 
      });
      setStep(2);
    } catch (err) {
      setMessage({ 
        type: "error", 
        text: err.response?.data?.message || "Failed to send OTP. Please try again." 
      });
    } finally {
      setLoading(false);
    }
  };

  // Verify OTP
  const verifyOTP = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      const res = await axios.post(
        `${API_BASE_URL}/auth/verify-otp`,
        { email, otp }
      );
      setMessage({ 
        type: "success", 
        text: res.data.message || "OTP verified successfully" 
      });
      setStep(3);
    } catch (err) {
      setMessage({ 
        type: "error", 
        text: err.response?.data?.message || "Invalid OTP. Please try again." 
      });
    } finally {
      setLoading(false);
    }
  };

  // Reset Password
  const resetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      const res = await axios.post(
        `${API_BASE_URL}/auth/reset-password`,
        { email, otp, newPassword }
      );
      setMessage({ 
        type: "success", 
        text: res.data.message || "Password reset successfully!" 
      });
      
      // Reset form and go back to login after delay
      setTimeout(() => {
        setStep(1);
        setEmail("");
        setOtp("");
        setNewPassword("");
      }, 3000);
      
    } catch (err) {
      setMessage({ 
        type: "error", 
        text: err.response?.data?.message || "Password reset failed. Please try again." 
      });
    } finally {
      setLoading(false);
    }
  };

  // Resend OTP
  const resendOTP = async () => {
    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      const res = await axios.post(
        `${API_BASE_URL}/auth/forgot-password`,
        { email }
      );
      setMessage({ 
        type: "success", 
        text: "New OTP sent to your email" 
      });
    } catch (err) {
      setMessage({ 
        type: "error", 
        text: err.response?.data?.message || "Failed to resend OTP" 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden">
        
        {/* Header Section */}
        <div className="bg-gradient-to-r from-rose-500 to-rose-400 p-6 text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-white/20 p-3 rounded-full backdrop-blur-sm">
              <Key className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-white">Reset Password</h1>
          <p className="text-rose-100 mt-1">
            {step === 1 && "Enter your email to receive OTP"}
            {step === 2 && "Enter the OTP sent to your email"}
            {step === 3 && "Create your new password"}
          </p>
        </div>

        {/* Progress Steps */}
        <div className="px-6 py-4 border-b">
          <div className="flex items-center justify-between">
            {[1, 2, 3].map((stepNumber) => (
              <div key={stepNumber} className="flex items-center">
                <div className={`h-8 w-8 rounded-full flex items-center justify-center border-2 ${
                  step === stepNumber 
                    ? "bg-rose-500 border-rose-500 text-white" 
                    : step > stepNumber 
                    ? "bg-emerald-500 border-emerald-500 text-white" 
                    : "border-gray-300 text-gray-400"
                }`}>
                  {step > stepNumber ? (
                    <CheckCircle className="h-5 w-5" />
                  ) : (
                    stepNumber
                  )}
                </div>
                {stepNumber < 3 && (
                  <div className={`h-1 w-12 ${
                    step > stepNumber ? "bg-emerald-500" : "bg-gray-200"
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-2">
            <span>Enter Email</span>
            <span>Verify OTP</span>
            <span>New Password</span>
          </div>
        </div>

        {/* Message Alert */}
        {message.text && (
          <div className={`mx-6 mt-6 p-4 rounded-xl flex items-start space-x-3 ${
            message.type === "success" 
              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
              : "bg-red-50 text-red-700 border border-red-200"
          }`}>
            {message.type === "success" ? (
              <CheckCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
            ) : (
              <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
            )}
            <span className="text-sm">{message.text}</span>
          </div>
        )}

        {/* Form Content */}
        <div className="p-6">
          {/* Step 1: Email */}
          {step === 1 && (
            <form onSubmit={sendOTP} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl 
                             focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-transparent"
                    placeholder="you@example.com"
                    required
                  />
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  We'll send a verification code to this email
                </p>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-gradient-to-r from-rose-500 to-rose-400 text-white 
                         rounded-xl font-semibold hover:shadow-lg transition-all duration-300 
                         hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed
                         flex items-center justify-center space-x-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span>Sending OTP...</span>
                  </>
                ) : (
                  <>
                    <span>Send OTP</span>
                  </>
                )}
              </button>
            </form>
          )}

          {/* Step 2: OTP */}
          {step === 2 && (
            <form onSubmit={verifyOTP} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Verification Code
                </label>
                <div className="relative">
                  <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                    maxLength="6"
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl 
                             focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-transparent
                             text-center text-xl tracking-widest font-mono"
                    placeholder="000000"
                    required
                  />
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Enter the 6-digit code sent to {email}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={resendOTP}
                  disabled={loading}
                  className="flex-1 py-3 border border-rose-300 text-rose-600 rounded-xl 
                           font-medium hover:bg-rose-50 transition-colors disabled:opacity-50
                           flex items-center justify-center space-x-2"
                >
                  {loading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <>
                      <Mail className="h-4 w-4" />
                      <span>Resend OTP</span>
                    </>
                  )}
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 py-3 bg-gradient-to-r from-rose-500 to-rose-400 text-white 
                           rounded-xl font-semibold hover:shadow-lg transition-all duration-300 
                           hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed
                           flex items-center justify-center space-x-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      <span>Verifying...</span>
                    </>
                  ) : (
                    <>
                      <span>Verify & Continue</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

          {/* Step 3: New Password */}
          {step === 3 && (
            <form onSubmit={resetPassword} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  New Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
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
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
                <div className="mt-2 space-y-1">
                  <div className="flex items-center text-xs text-gray-500">
                    <div className={`h-1 w-full mr-2 rounded-full ${
                      newPassword.length >= 8 ? "bg-emerald-500" : "bg-gray-200"
                    }`} />
                    <span>At least 8 characters</span>
                  </div>
                  <div className="flex items-center text-xs text-gray-500">
                    <div className={`h-1 w-full mr-2 rounded-full ${
                      /[A-Z]/.test(newPassword) ? "bg-emerald-500" : "bg-gray-200"
                    }`} />
                    <span>One uppercase letter</span>
                  </div>
                  <div className="flex items-center text-xs text-gray-500">
                    <div className={`h-1 w-full mr-2 rounded-full ${
                      /\d/.test(newPassword) ? "bg-emerald-500" : "bg-gray-200"
                    }`} />
                    <span>One number</span>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading || newPassword.length < 6}
                className="w-full py-3 bg-gradient-to-r from-rose-500 to-rose-400 text-white 
                         rounded-xl font-semibold hover:shadow-lg transition-all duration-300 
                         hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed
                         flex items-center justify-center space-x-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span>Resetting Password...</span>
                  </>
                ) : (
                  <>
                    <Lock className="h-5 w-5" />
                    <span>Reset Password</span>
                  </>
                )}
              </button>
            </form>
          )}

          {/* Back Button */}
          {step > 1 && (
            <button
              type="button"
              onClick={() => {
                setStep(step - 1);
                setMessage({ type: "", text: "" });
              }}
              className="w-full mt-6 py-3 border border-gray-300 text-gray-700 rounded-xl 
                       font-medium hover:bg-gray-50 transition-colors flex items-center justify-center"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Go Back
            </button>
          )}

          {/* Footer Links */}
          <div className="mt-8 pt-6 border-t border-gray-100 space-y-4">
            <div className="flex items-center justify-center space-x-3 text-sm text-gray-600">
              <Shield className="h-4 w-4 text-rose-500" />
              <span>Your information is secure and encrypted</span>
            </div>
            
            <div className="text-center">
              <Link
                to="/login"
                className="text-rose-500 hover:text-rose-600 font-medium text-sm"
              >
                Remember your password? Sign in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgetPassword;