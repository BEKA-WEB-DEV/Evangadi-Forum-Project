const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

const { postAnswer, getAnswer } = require("../controller/answerController");

// Answer route
router.post("/answers", authMiddleware, postAnswer);
router.get("/answers/:questionid", getAnswer);

module.exports = router;
