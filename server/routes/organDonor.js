const express = require("express");
const router = express.Router();

const { register,
    login,
    logout,
    forgotPassword,
    verifyOTP,
    resetPassword,
    resendOTP
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


module.exports = router;
