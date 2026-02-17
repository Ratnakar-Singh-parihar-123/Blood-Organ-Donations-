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

module.exports = router;
