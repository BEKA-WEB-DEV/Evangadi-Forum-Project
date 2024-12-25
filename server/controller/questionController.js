const express = require("express");
const { StatusCodes } = require("http-status-codes");
const crypto = require("crypto");
const KeywordExtractor = require("keyword-extractor");
// Initialize App
const app = express();
const dbConnection = require("../db/dbConfig");
// const multer = require("multer");
// const upload = multer({ dest: "uploads/" }); // Specify upload directory

async function postQuestion(req, res) {
  const { title, description, tag } = req.body;
  const { userid } = req.user;

  const image = req.files?.image?.[0]?.path || null;
  const audio = req.files?.audio?.[0]?.path || null;

  // Validation
  if (!title || !description) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      msg: "Please provide all required fields: title and description.",
    });
  }

  if (!userid) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ msg: "User not authenticated." });
  }

  try {
    await dbConnection.query(
      "INSERT INTO questions (userid, title, description, tag, image, audio) VALUES (?, ?, ?, ?, ?, ?)",
      [userid, title, description, tag, image, audio]
    );
    return res
      .status(StatusCodes.CREATED)
      .json({ msg: "Question created successfully" });
  } catch (error) {
    console.error(error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "An error occurred while creating the question." });
  }
}

async function getSingleQuestion(req, res) {
  const { questionid } = req.params;

  if (!questionid) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Invalid or missing question ID." });
  }

  try {
    // Fetch the question and related answers
    const [question] = await dbConnection.query(
      `SELECT * FROM questions WHERE questionid = ?`,
      [questionid]
    );

    if (question.length === 0) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ msg: "Question not found" });
    }

    // Fetch the related answers
    const [answers] = await dbConnection.query(
      `SELECT a.answerid, a.answer, a.created_at, a.image, a.audio, 
              u.username
       FROM answers a 
       INNER JOIN users u ON a.userid = u.userid
       WHERE a.questionid = ?`,
      [questionid]
    );

    // Return both question and its answers
    return res.status(StatusCodes.OK).json({
      question: question[0],
      answers,
    });
  } catch (error) {
    console.error(error.message);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "An error occurred while fetching the question." });
  }
}

async function getAllQuestions(req, res) {
  try {
    // Query the database to fetch all questions
    const [questions] = await dbConnection.query("SELECT * FROM questions"); // Fetch data from 'questions' table

    // Send the response JSON payload
    res.status(StatusCodes.OK).json({
      success: true,
      count: questions.length, // Number of questions
      data: questions, // Array of questions
    });
  } catch (error) {
    // Handle server errors
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}

module.exports = { getSingleQuestion, postQuestion, getAllQuestions };
