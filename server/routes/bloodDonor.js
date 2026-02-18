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
  updateDonorProfile,
  updateDonorProfilePic,
  getAllBloodDonors,
  getFilteredBloodDonors,
  getSingleDonor,
  getBloodDonorCount,
} = require("../controllers/bloodDonorController");

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
router.put("/update-profile", updateDonorProfile);

// update profile picture
router.put("/update-profile-pic", updateDonorProfilePic);

// Get all donors
router.get("/", getAllBloodDonors);

// Filter donors (query based)
router.get("/search", getFilteredBloodDonors);

// ✅ Pehle specific route
router.get("/count", getBloodDonorCount);

// ✅ Phir dynamic route
router.get("/:id", getSingleDonor);

module.exports = router;
