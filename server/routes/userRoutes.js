const express = require("express");
const router = express.Router();

// Authentication middleware
const authMiddleware = require("../middleware/authMiddleware");

// User controllers
const {
  register,
  login,
  checkUser,
  logOut,
  sendOtp,
  verifyOtp,
} = require("../controller/userController");

// Register route
router.post("/register", register);

// Login route
router.post("/login", login);

// Check user route
router.get("/check", authMiddleware, checkUser);

// Logout route
router.delete("/logout", logOut);

// Send OTP route
router.post("/forgotPassword", sendOtp);
router.post("/verifyOtp", verifyOtp);

// Export the router
module.exports = router;
