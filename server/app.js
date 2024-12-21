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

const port = 3003; // Ensure the port matches the frontend API calls
const authMiddleware = require("./middleware/authMiddleware");

// User routes middleware
app.use("/api/user", userRouter); // http://localhost:3003/api/user/register

// Question routes middleware
app.use("/api", questionRouter); // http://localhost:3003/api/questions

// Answer routes middleware
app.use("/api", answerRouter);

// Using get http method (to request data from server)
app.get("/", (req, res) => {
  res.send("API Working");
});

// New method of server starter with db connection
const startConnection = async () => {
  try {
    const result = await dbConnection.execute("select 'test'");
    console.log(result);
    await app.listen(port);
    console.log("database connected");
    console.log(`server running on http://localhost:${port}`);
  } catch (error) {
    console.log(error.message);
  }
};

startConnection();
