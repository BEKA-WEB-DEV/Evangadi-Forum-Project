const authMiddleware = require("../middleware/authMiddleware");
const {
  getAllQuestions,
  getSingleQuestion,
  postQuestion,
} = require("../controller/questionController"); // Import controller

const route = require("express").Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" }); // Specify upload directory

// Define the route for posting a question
// route.post("/questions", authMiddleware, postQuestion);

route.post(
  "/questions",
  upload.fields([{ name: "image" }, { name: "audio" }]),
  authMiddleware,
  postQuestion
);

// Define the route for fetching a single question
route.get("/questions/:questionid", getSingleQuestion);

// Define the route for fetching all questions
route.get("/questions", getAllQuestions);

module.exports = route;
