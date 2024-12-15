const express = require("express");
const router = express.Router();

const { register, login, checkUser } = require("../controller/userController");
const authMiddleware = require("../middleware/authMiddleware");

//register routes
router.post("/register", register);

// login user
router.post("/login", login);

//check user
router.get("/check", authMiddleware, checkUser);

module.exports = router;
