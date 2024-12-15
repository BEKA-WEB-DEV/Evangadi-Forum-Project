const { StatusCodes } = require("http-status-codes");
const dbConnection = require("../db/dbConfig");
const crypto = require("crypto");

// Get Answers for a Question
async function getAnswer(req, res) {
  const questionid = req.params.question_id;
  try {
    const [rows] = await dbConnection.query(
      `SELECT 
            a.answerid, 
            a.userid AS answer_userid, 
            a.answer,
            u.username
         FROM 
            answers a inner join users u on a.userid = u.userid
         WHERE 
            a.questionid = ?`,
      [questionid]
    );
    return res.status(StatusCodes.OK).json({ rows });
  } catch (err) {
    console.log(err);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "something went wrong, please try again later" });
  }
}

// Post Answers for a Question
async function postAnswer(req, res) {
  const { userid, answer, questionid } = req.body;
  // Create a new date object
  const currentTimestamp = new Date();

  // Adjust the time by UTC+3 hours
  const adjustedDate = new Date(
    currentTimestamp.getTime() + 3 * 60 * 60 * 1000
  );

  // Format the date as 'YYYY-MM-DD HH:mm:ss'
  const formattedTimestamp = adjustedDate
    .toISOString()
    .slice(0, 19)
    .replace("T", " ");

  if (!userid || !answer || !questionid) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "All fields are required" });
  }
  // const answerid = crypto.randomBytes(10).toString("hex");
  try {
    await dbConnection.query(
      "insert into answers (userid, answer, questionid,createdAt) values ( ?,?,?,?)",
      [userid, answer, questionid, formattedTimestamp]
    );
    return res
      .status(StatusCodes.CREATED)
      .json({ message: "answer posted successfully" });
  } catch (err) {
    console.log(err);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "something went wrong, please try again later" });
  }
}

module.exports = {
  getAnswer,
  postAnswer,
};
