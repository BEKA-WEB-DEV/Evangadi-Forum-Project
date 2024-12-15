const express = require("express");
const { getAnswer, postAnswer } = require("../controller/answerController");
const router = express.Router();

// Get Answers for a Question
router.get("/answer/:question_id", getAnswer);

// Post Answers for a Question
router.post("/answer", postAnswer);

module.exports = router;
