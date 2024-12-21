const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
const dbConnection = require("./db/dbConfig");

const answerRouter = require("./routes/answerRoutes");
const questionRouter = require("./routes/questionRoutes");
const userRouter = require("./routes/userRoutes");
app.use(cors());
// json middleware to extract json data
app.use(express.json());

app.use("api/answer", answerRouter);

const port = 3003;
const authMiddleware = require("./middleware/authMiddleware");
//user routes middleware
app.use("/api/user", userRouter); //http://localhost:3003/api/user/register
//question routes middleware
app.use("/api", authMiddleware, questionRouter); //http://localhost:3003/api/question
//answer routes middleware
app.use("/api", authMiddleware, answerRouter);
//using get http method (to request data from server)
app.get("/", (req, res) => {
  res.send("API Working");
});

//new method of server starter with db connection
const startConnection = async () => {
  try {
    const result = await dbConnection.execute("select 'test'");
    console.log(result);
    await app.listen(port);
    console.log("database connected");
    console.log(`server running on {http://localhost}:${port}`);
  } catch (error) {
    console.log(error.message);
  }
};
startConnection();
