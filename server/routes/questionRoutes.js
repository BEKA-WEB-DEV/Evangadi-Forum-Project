const authMiddleware = require("../middleware/authMiddleware");
const {
  getAllQuestions,
  getSingleQuestion,
  postQuestion,
} = require("../controller/questionController"); // Import controller

const route = require("express").Router();

// Define the route for posting a question
route.post("/questions", authMiddleware, postQuestion);

// Define the route for fetching a single question
route.get("/questions/:questionid", getSingleQuestion);

// Define the route for fetching all questions
route.get("/questions", getAllQuestions);

module.exports = route;
