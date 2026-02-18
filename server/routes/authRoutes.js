const express = require("express");
const router = express.Router();
const {
  register,
  login,
  logout,
  getMe,
  forgotPassword,
  verifyOTP,
  resetPassword,
  resendOTP,
  updateProfile,
  updatedProfilePic,
} = require("../controllers/userController");
const { protect } = require("../middleware/auth");

// Public routes
router.post("/register", register);
router.post("/login", login);

// Protected routes
router.post("/logout", protect, logout);
router.get("/me", protect, getMe);

router.post("/forgot-password", forgotPassword);
router.post("/verify-otp", verifyOTP);
router.post("/reset-password", resetPassword);
router.post("/resend-otp", resendOTP);

// updaed profile
router.put("/updated-profile", updateProfile);

// updated profile pic
router.put("/updated-profile-pic", updatedProfilePic);

module.exports = router;
