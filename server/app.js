const express = require("express");
const cors = require("cors");
const port = 3000;
const app = express();
//auth middleware
const authMiddleware = require("./middleware/authMiddleware");
//json middleware to extract data
app.use(express.json());

//db connection
const dbconnection = require("./db/dbConfig");

// test get request
app.get("/", (req, res) => {
  res.status(200).send("welcome-to Evangadi-");
});
//cors middleware
app.use(
  cors(
    (origins = [
      "http://localhost:3000",
      // "https://evangadi-forum-project-frontend.vercel.app/",
    ])
  )
);
// user routes middleware file
const userRoutes = require("./routes/userRoute");

// user routes middleware
app.use("/api/users", userRoutes);

// question routes middleware file
const questionRoutes = require("./routes/questionRoute");

// question routes middleware
app.use("/api/questions", authMiddleware, questionRoutes);

// answer routes middleware file
const answerRoutes = require("./routes/answerRoute");
// answer routes middleware
app.use("/api/answers", authMiddleware, answerRoutes);

async function start() {
  try {
    const result = await dbconnection.execute("SELECT 'test' ");
    console.log("Connected");
    await app.listen(port);
    console.log(`Server running on port ${port}`);
  } catch (err) {
    console.log(err.message);
  }
}
start();
