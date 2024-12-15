const { StatusCodes } = require("http-status-codes");
const dbConnection = require("../db/dbConfig");
const crypto = require("crypto");
const multer = require("multer");
const path = require("path");

// Post Answers for a Question
// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Directory to store uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  },
});

const upload = multer({ storage: storage });

async function postAnswer(req, res) {
  const uploadFiles = upload.fields([
    { name: "image", maxCount: 1 },
    { name: "audio", maxCount: 1 },
  ]);

  uploadFiles(req, res, async (err) => {
    if (err) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "File upload failed", error: err });
    }

    const { userid, answer, questionid } = req.body;
    const image = req.files?.image ? req.files.image[0].path : null;
    const audio = req.files?.audio ? req.files.audio[0].path : null;

    // Create a new date object
    const currentTimestamp = new Date();
    const adjustedDate = new Date(
      currentTimestamp.getTime() + 3 * 60 * 60 * 1000
    );
    const formattedTimestamp = adjustedDate
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");

    if (!userid || !answer || !questionid) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "All fields are required" });
    }

    try {
      await dbConnection.query(
        "INSERT INTO answers (userid, answer, questionid, createdAt, image, audio) VALUES (?, ?, ?, ?, ?, ?)",
        [userid, answer, questionid, formattedTimestamp, image, audio]
      );
      return res
        .status(StatusCodes.CREATED)
        .json({ msg: "Answer posted successfully" });
    } catch (err) {
      console.log(err);
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ msg: "Something went wrong, please try again later" });
    }
  });
}

async function getAnswer(req, res) {
  const questionid = req.params.question_id;
  try {
    const [rows] = await dbConnection.query(
      `SELECT 
            a.answerid, 
            a.userid AS answer_userid, 
            a.answer,
            a.image,
            a.audio,
            u.username
         FROM 
            answers a 
         INNER JOIN 
            users u ON a.userid = u.userid
         WHERE 
            a.questionid = ?`,
      [questionid]
    );
    return res.status(StatusCodes.OK).json({ rows });
  } catch (err) {
    console.log(err);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Something went wrong, please try again later" });
  }
}

module.exports = {
  getAnswer,
  postAnswer,
};
