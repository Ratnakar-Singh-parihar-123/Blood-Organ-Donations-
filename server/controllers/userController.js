const User = require("../models/User");
const { generateToken } = require("../utils/jwt");
const sendEmail = require("../utils/sendEmail");
const { resendOTP } = require("./bloodDonorController");
const cloudinary = require("cloudinary").v2;

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
const register = async (req, res) => {
  try {
    const { name, email, password, phone, role } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists with this email",
      });
    }

    // Create user
    const user = await User.create({
      name,
      email,
      password,
      phone,
      role: role || "patient",
    });

    // Generate JWT
    const token = generateToken(user._id);

    // Remove password from response
    user.password = undefined;

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      token,
      user,
    });
  } catch (error) {
    console.error("Registration error:", error);

    // Handle validation errors
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((val) => val.message);
      return res.status(400).json({
        success: false,
        message: messages.join(", "),
      });
    }

    res.status(500).json({
      success: false,
      message: "Server error during registration",
    });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide email and password",
      });
    }

    // Find user and include password field
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Check password
    const isPasswordMatch = await user.comparePassword(password);
    if (!isPasswordMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Generate JWT
    const token = generateToken(user._id);

    // Remove password from response
    user.password = undefined;

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      success: false,
      message: "Server error during login",
    });
  }
};

// @desc    Logout user
// @route   POST /api/auth/logout
// @access  Private
const logout = (req, res) => {
  // Since JWT is stateless, we just inform the client to delete the token
  res.status(200).json({
    success: true,
    message: "Logged out successfully. Please delete the token on client side.",
  });
};

// @desc    Get current user
// @route   GET /api/auth/me
// @access  Private
const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error("Get user error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// SEND OTP
const forgotPassword = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: "User not found" });

  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  user.resetOTP = otp;
  user.resetOTPExpire = Date.now() + 10 * 60 * 1000; // 10 min
  await user.save();

  await sendEmail(
    email,
    "Password Reset OTP",
    `Your OTP is ${otp}. It will expire in 10 minutes.`,
  );

  res.json({ message: "OTP sent to email" });
};

const verifyOTP = async (req, res) => {
  const { email, otp } = req.body;

  const user = await User.findOne({
    email,
    resetOTP: otp,
    resetOTPExpire: { $gt: Date.now() },
  });

  if (!user) return res.status(400).json({ message: "Invalid or expired OTP" });

  res.json({ message: "OTP verified successfully" });
};

const resetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;

  const user = await User.findOne({
    email,
    resetOTP: otp,
    resetOTPExpire: { $gt: Date.now() },
  });

  if (!user) return res.status(400).json({ message: "Invalid or expired OTP" });

  user.password = newPassword;
  user.resetOTP = undefined;
  user.resetOTPExpire = undefined;

  await user.save();

  res.json({ message: "Password changed successfully" });
};

// resend otp
const user = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // OPTIONAL: cooldown (60 sec)
    if (
      user.resetOTPExpire &&
      user.resetOTPExpire > Date.now() - 9 * 60 * 1000
    ) {
      return res
        .status(429)
        .json({ message: "Please wait before requesting OTP again" });
    }

    // generate new OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    const hashedOTP = crypto.createHash("sha256").update(otp).digest("hex");

    // overwrite old OTP
    user.resetOTP = hashedOTP;
    user.resetOTPExpire = Date.now() + 10 * 60 * 1000;

    await user.save();

    await sendEmail(
      email,
      "Resend Password Reset OTP",
      `Your new OTP is ${otp}. It will expire in 10 minutes.`,
    );

    res.json({ message: "OTP resent successfully" });
  } catch (error) {
    console.error("Resend OTP error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// update profile
const updateProfile = async (req, res) => {
  try {
    const { name, phone } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id, // logged in user ka id
      { name, phone },
      { new: true, runValidators: true },
    ).select("-password");

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: updatedUser, // correct data return
    });
  } catch (error) {
    console.error("Update profile error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// updatedProfilePic
const updatedProfilePic = async (req, res) => {
  try {
    const userId = req.user.id;

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "profile_pictures",
    });

    const user = await User.findByIdAndUpdate(
      userId,
      { profilePic: result.secure_url },
      { new: true },
    ).select("-password");

    res.status(200).json({
      success: true,
      message: "Profile picture updated successfully",
      user,
    });
  } catch (error) {
    console.error("Profile pic update error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  register,
  login,
  logout,
  getMe,
  forgotPassword,
  verifyOTP,
  resetPassword,
  resendOTP,
  user,
  updateProfile,
  updatedProfilePic,
};
