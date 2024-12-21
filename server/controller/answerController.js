const dbConnection = require("../db/dbConfig");
const { StatusCodes } = require("http-status-codes");

async function postAnswer(req, res) {
  const { questionid, answer, image, audio } = req.body;
  if (!answer) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Please provide an answer" });
  }
  try {
    const userid = req.user.userid;
    await dbConnection.query(
      "INSERT INTO answers(questionid, answer, userid, image, audio) VALUES(?,?,?,?,?)",
      [questionid, answer, userid, image, audio]
    );

    return res
      .status(StatusCodes.CREATED)
      .json({ msg: "Answer posted successfully" });
  } catch (error) {
    console.log(error.message);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "An unexpected error occurred." });
  }
}

async function getAnswer(req, res) {
  const questionid = req.params.questionid;
  try {
    const [answers] = await dbConnection.query(
      `SELECT 
        a.answerid, a.answer, a.image, a.audio, a.userid, a.createdAt, u.username 
      FROM answers AS a 
      JOIN users AS u ON a.userid = u.userid 
      WHERE a.questionid = ?`,
      [questionid]
    );
    if (!answers || answers.length === 0) {
      return res.status(StatusCodes.NOT_FOUND).json({
        msg: "No answers found for this question.",
      });
    }
    return res.status(StatusCodes.OK).json(answers);
  } catch (error) {
    console.error(error.message);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      msg: "Something went wrong, try again later!",
    });
  }
}

module.exports = { postAnswer, getAnswer };
