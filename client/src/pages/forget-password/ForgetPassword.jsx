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
  Timer,
  Heart,
  RefreshCw,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import forgotPasswordAPI from "../../api/forgotPasswordAPI";

const userTypes = [
  {
    key: "bloodDonor",
    label: "Blood Donor",
    icon: Droplets,
    color: "rose",
    bgLight: "bg-rose-50",
    textColor: "text-rose-600",
    borderColor: "border-rose-200",
  },
  {
    key: "organDonor",
    label: "Organ Donor",
    icon: Activity,
    color: "emerald",
    bgLight: "bg-emerald-50",
    textColor: "text-emerald-600",
    borderColor: "border-emerald-200",
  },
  {
    key: "patient",
    label: "Patient/Family",
    icon: Ambulance,
    color: "amber",
    bgLight: "bg-amber-50",
    textColor: "text-amber-600",
    borderColor: "border-amber-200",
  },
  {
    key: "user",
    label: "General User",
    icon: Users,
    color: "blue",
    bgLight: "bg-blue-50",
    textColor: "text-blue-600",
    borderColor: "border-blue-200",
  },
];

function ForgetPassword() {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const urlRole = searchParams.get("role") || "bloodDonor";

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

  const otpInputRefs = useRef([]);

  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  useEffect(() => {
    if (step === 2 && otpInputRefs.current[0]) {
      otpInputRefs.current[0]?.focus();
    }
  }, [step]);

  const selectedUserType =
    userTypes.find((type) => type.key === selectedRole) || userTypes[0];

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
      setCountdown(60);

      const result = await forgotPasswordAPI.sendOTP(email, selectedRole);

      if (result.success) {
        setMessage({ type: "success", text: `OTP sent to ${email}` });
      } else {
        setMessage({
          type: "error",
          text: result.message || "Failed to send OTP",
        });
      }
    } catch (error) {
      setMessage({
        type: "error",
        text: error.message || "Failed to send OTP",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleOtpChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value !== "" && index < 5) {
      otpInputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      if (otp[index] === "" && index > 0) {
        otpInputRefs.current[index - 1]?.focus();
      }
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    const otpString = otp.join("");

    if (otpString.length !== 6) {
      setMessage({ type: "error", text: "Please enter valid 6-digit OTP" });
      return;
    }

    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      const result = await forgotPasswordAPI.verifyOTP(
        email,
        otpString,
        selectedRole,
      );

      if (result.success) {
        setMessage({ type: "success", text: "OTP verified successfully!" });
        setTimeout(() => setStep(3), 500);
      } else {
        setMessage({ type: "error", text: result.message || "Invalid OTP" });
      }
    } catch (error) {
      setMessage({
        type: "error",
        text: error.message || "Failed to verify OTP",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (newPassword.length < 6) {
      setMessage({
        type: "error",
        text: "Password must be at least 6 characters",
      });
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
        otp.join(""),
        newPassword,
        selectedRole,
      );

      if (result.success) {
        setMessage({ type: "success", text: "Password reset successfully!" });
        setTimeout(() => navigate(`/auth?role=${selectedRole}`), 1500);
      } else {
        setMessage({
          type: "error",
          text: result.message || "Failed to reset password",
        });
      }
    } catch (error) {
      setMessage({
        type: "error",
        text: error.message || "Failed to reset password",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    if (countdown > 0) return;

    setLoading(true);
    try {
      const result = await forgotPasswordAPI.resendOTP(email, selectedRole);
      if (result.success) {
        setCountdown(60);
        setMessage({ type: "success", text: "New OTP sent" });
        setOtp(["", "", "", "", "", ""]);
      }
    } catch (error) {
      setMessage({ type: "error", text: "Failed to resend OTP" });
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back Button */}
        <button
          onClick={() => navigate("/")}
          className="mb-4 flex items-center text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          <span className="text-sm">Back to Home</span>
        </button>

        {/* Main Card */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Header */}
          <div
            className={`p-6 ${selectedUserType.bgLight} border-b ${selectedUserType.borderColor}`}
          >
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg bg-white shadow-sm`}>
                <Key className={`h-5 w-5 ${selectedUserType.textColor}`} />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-800">
                  Reset Password
                </h2>
                <p className="text-sm text-gray-600 mt-0.5">
                  {step === 1 && "Enter your email to continue"}
                  {step === 2 && "Enter the verification code"}
                  {step === 3 && "Create new password"}
                </p>
              </div>
            </div>

            {/* Progress Steps */}
            <div className="flex items-center gap-2 mt-4">
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex-1">
                  <div
                    className={`h-1 rounded-full transition-colors ${
                      s <= step
                        ? selectedUserType.textColor.replace("text", "bg")
                        : "bg-gray-200"
                    }`}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Role Selection */}
          <div className="p-4 border-b border-gray-100">
            <p className="text-xs font-medium text-gray-500 mb-2">
              Account Type
            </p>
            <div className="grid grid-cols-4 gap-2">
              {userTypes.map((type) => {
                const Icon = type.icon;
                const isSelected = selectedRole === type.key;
                return (
                  <button
                    key={type.key}
                    onClick={() => {
                      setSelectedRole(type.key);
                      setStep(1);
                      setMessage({ type: "", text: "" });
                    }}
                    className={`p-2 rounded-lg text-center transition-all ${
                      isSelected
                        ? `${type.bgLight} ${type.textColor} border-2 ${type.borderColor}`
                        : "bg-gray-50 text-gray-600 hover:bg-gray-100 border-2 border-transparent"
                    }`}
                  >
                    <Icon className="h-4 w-4 mx-auto mb-1" />
                    <span className="text-xs font-medium">
                      {type.label.split(" ")[0]}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Message Alert */}
          {message.text && (
            <div
              className={`mx-4 mt-4 p-3 rounded-lg flex items-start gap-2 ${
                message.type === "success"
                  ? "bg-green-50 text-green-700"
                  : "bg-red-50 text-red-700"
              }`}
            >
              {message.type === "success" ? (
                <CheckCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
              ) : (
                <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
              )}
              <p className="text-sm">{message.text}</p>
            </div>
          )}

          {/* Form Content */}
          <div className="p-4">
            {/* Step 1: Email */}
            {step === 1 && (
              <form onSubmit={handleSendOTP}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your email"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading || !email}
                  className={`w-full py-2.5 rounded-lg font-medium text-white transition-colors ${
                    selectedRole === "bloodDonor"
                      ? "bg-rose-600 hover:bg-rose-700"
                      : selectedRole === "organDonor"
                        ? "bg-emerald-600 hover:bg-emerald-700"
                        : selectedRole === "patient"
                          ? "bg-amber-600 hover:bg-amber-700"
                          : "bg-blue-600 hover:bg-blue-700"
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      Sending...
                    </span>
                  ) : (
                    "Send OTP"
                  )}
                </button>
              </form>
            )}

            {/* Step 2: OTP */}
            {step === 2 && (
              <form onSubmit={handleVerifyOTP}>
                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-3">
                    Code sent to:{" "}
                    <span className="font-medium text-gray-900">{email}</span>
                  </p>

                  <div className="flex gap-2 mb-3">
                    {[0, 1, 2, 3, 4, 5].map((index) => (
                      <input
                        key={index}
                        ref={(el) => (otpInputRefs.current[index] = el)}
                        type="text"
                        maxLength="1"
                        value={otp[index]}
                        onChange={(e) => handleOtpChange(index, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                        className="w-12 h-12 text-center text-lg font-semibold border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <button
                      type="button"
                      onClick={handleResendOTP}
                      disabled={loading || countdown > 0}
                      className="text-sm text-blue-600 hover:text-blue-700 disabled:text-gray-400 disabled:cursor-not-allowed"
                    >
                      {countdown > 0
                        ? `Resend in ${formatTime(countdown)}`
                        : "Resend OTP"}
                    </button>
                    {countdown > 0 && (
                      <span className="text-sm text-gray-500 flex items-center">
                        <Timer className="h-3 w-3 mr-1" />
                        {formatTime(countdown)}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setStep(1);
                      setMessage({ type: "", text: "" });
                    }}
                    className="flex-1 py-2.5 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={loading || otp.join("").length !== 6}
                    className={`flex-1 py-2.5 rounded-lg font-medium text-white transition-colors ${
                      selectedRole === "bloodDonor"
                        ? "bg-rose-600 hover:bg-rose-700"
                        : selectedRole === "organDonor"
                          ? "bg-emerald-600 hover:bg-emerald-700"
                          : selectedRole === "patient"
                            ? "bg-amber-600 hover:bg-amber-700"
                            : "bg-blue-600 hover:bg-blue-700"
                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    {loading ? (
                      <span className="flex items-center justify-center">
                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                        Verifying
                      </span>
                    ) : (
                      "Verify"
                    )}
                  </button>
                </div>
              </form>
            )}

            {/* Step 3: New Password */}
            {step === 3 && (
              <form onSubmit={handleResetPassword}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                      placeholder="Min. 6 characters"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Re-enter password"
                    required
                  />
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="flex-1 py-2.5 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={
                      loading ||
                      !newPassword ||
                      !confirmPassword ||
                      newPassword !== confirmPassword
                    }
                    className={`flex-1 py-2.5 rounded-lg font-medium text-white transition-colors ${
                      selectedRole === "bloodDonor"
                        ? "bg-rose-600 hover:bg-rose-700"
                        : selectedRole === "organDonor"
                          ? "bg-emerald-600 hover:bg-emerald-700"
                          : selectedRole === "patient"
                            ? "bg-amber-600 hover:bg-amber-700"
                            : "bg-blue-600 hover:bg-blue-700"
                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    {loading ? (
                      <span className="flex items-center justify-center">
                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                        Resetting...
                      </span>
                    ) : (
                      "Reset Password"
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Footer */}
          <div className="p-4 bg-gray-50 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <Link
                to={`/auth?role=${selectedRole}`}
                className="text-sm text-blue-600 hover:text-blue-700 flex items-center"
              >
                <ArrowLeft className="h-3 w-3 mr-1" />
                Back to Login
              </Link>
              <Link
                to="/help"
                className="text-sm text-gray-500 hover:text-gray-700 flex items-center"
              >
                <HelpCircle className="h-3 w-3 mr-1" />
                Help
              </Link>
            </div>
            <div className="mt-3 text-center">
              <p className="text-xs text-gray-400">
                © 2024 JeevanDaan. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgetPassword;
