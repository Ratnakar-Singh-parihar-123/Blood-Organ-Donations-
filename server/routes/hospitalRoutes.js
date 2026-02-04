const express = require("express");
const router = express.Router();
const {
  register,
  login,
  logout,
} = require("../controllers/hospitalController");

// Register hospital
router.post("/register", register);

// Login hospital
router.post("/login", login);

// logout 
router.post("/logout", logout);

module.exports = router;
