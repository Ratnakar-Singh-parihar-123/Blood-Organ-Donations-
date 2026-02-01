const express = require("express");
const router = express.Router();

// Controllers
const {
  register,
  login,
  logout,
  forgotPassword,
  verifyOTP,
  resetPassword,
  resendOTP
} = require("../controllers/PatientController");


// Middleware
// const { authMiddleware } = require("../middlewares/authMiddleware");

/* ================= Public Routes ================= */

// Patient registration
router.post("/register", register);

// Patient login
router.post("/login", login);

// Forgot password flow
router.post("/forgot-password", forgotPassword);
router.post("/verify-otp", verifyOTP);
router.post("/reset-password", resetPassword);
router.post("/resend-otp", resendOTP);

/* ================= Protected Routes ================= */

// Logout (requires authentication)
router.post("/logout", logout);

// Match donors for a patient (requires authentication)
// router.get("/match-donors/:patientId", matchDonors);

module.exports = router;
