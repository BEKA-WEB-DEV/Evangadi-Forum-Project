const express = require("express");
const router = express.Router();

const { postAnswer, getAnswer } = require("../controller/answerController");
// answer route
router.post("/answers", postAnswer);
router.get("/answers/:questionId", getAnswer);

module.exports = router;
