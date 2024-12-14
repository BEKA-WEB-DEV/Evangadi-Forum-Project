const express = require("express");
// const cors = require("cors");
const port = 3000;
const app = express();

//db connection
const dbconnection = require("./db/dbConfig");

// user routes middleware file
const userRoutes = require("./routes/userRoute");

//json middleware to extract data
app.use(express.json());
// user routes middleware
app.use("/api/users", userRoutes);

// // question routes middleware
// const questionRoutes = require("./routes/questionRoute");
// app.use("/api/questions", questionRoutes);

// // answer routes middleware
// const answerRoutes = require("./routes/answerRoute");
// app.use("/api/answers", answerRoutes);

async function start() {
  try {
    const result = await dbconnection.execute("SELECT 'test' ");
    app.listen(port);
    console.log("Connected");
  } catch (err) {
    console.log(err.message);
  }
}
start();
