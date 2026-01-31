const express = require("express");
const router = express.Router();

const { register, login, logout } = require("../controllers/bloodDonorController");

// Public routes
router.post("/register", register);
router.post("/login", login);

// Protected routes
router.post("/logout", logout);

module.exports = router;
