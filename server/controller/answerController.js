const dbConnection = require("../db/dbConfig");
const { StatusCodes } = require("http-status-codes");

async function postAnswer(req, res) {
  // res.send("answer")
  const { questionid, answer } = req.body;
  // no need to check question id becouse it will be avaliable with the question so we
  // will check only answer
  if (!answer) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "please provide answer" });
  }
  try {
    const userid = req.user.userid;
    await dbConnection.query(
      "INSERT INTO answers(questionid, answer, userid, answerid, image, audio) VALUES(?,?,?,?,?,?)",
      [questionid, answer, userid, answerid, image, audio]
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
//Solomon
async function getAnswer(req, res) {
  const questionid = req.params.questionid;
  console.log(questionid);
  try {
    //select * from answers where questionId=?,[questionId];
    const [answers] = await dbConnection.query(
      `SELECT 
        q.questionid, q.answer, q.answerid, q.image, q.audio, q.userid, u.username, FROM answers AS q JOIN users AS u ON q.userid = u.userid WHERE q.questionid = ?`,
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
