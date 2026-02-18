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
  updateHospitalProfile,
  updateHospitalProfilePic,
} = require("../controllers/hospitalController");

// Register hospital
router.post("/register", register);

// Login hospital
router.post("/login", login);

// logout
router.post("/logout", logout);

router.post("/forgot-password", forgotPassword);
router.post("/verify-otp", verifyOTP);
router.post("/reset-password", resetPassword);
router.post("/resend-otp", resendOTP);

// update hospital profile
router.put("/update-profile", updateHospitalProfile);

// update hospital profile picture
router.put("/update-profile-pic", updateHospitalProfilePic);

module.exports = router;
