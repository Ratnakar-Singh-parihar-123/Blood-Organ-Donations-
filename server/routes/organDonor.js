const express = require("express");
const router = express.Router();

const {
  register,
  login,
  logout,
  forgotPassword,
  verifyOTP,
  resetPassword,
  resendOTP,
  updateOrganDonorProfile,
  updateOrganDonorProfilePic,
} = require("../controllers/organDonorController");

// Public routes
router.post("/register", register);
router.post("/login", login);

// Protected routes
router.post("/logout", logout);

router.post("/forgot-password", forgotPassword);
router.post("/verify-otp", verifyOTP);
router.post("/reset-password", resetPassword);
router.post("/resend-otp", resendOTP);

// update profile
router.put("/update-profile", updateOrganDonorProfile);

// update profile picture
router.put("/update-profile-pic", updateOrganDonorProfilePic);

module.exports = router;
