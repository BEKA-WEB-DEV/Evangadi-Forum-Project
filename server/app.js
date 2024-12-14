const express = require("express");
// const cors = require("cors");
const port = 3000;
const app = express();

// user routes middleware file

const userRoutes = require("./routes/userRoute");

// user routes middleware
app.use("/api/users", userRoutes);

// // question routes middleware
// const questionRoutes = require("./routes/questionRoute");
// app.use("/api/questions", questionRoutes);

// // answer routes middleware
// const answerRoutes = require("./routes/answerRoute");
// app.use("/api/answers", answerRoutes);

app.listen(port, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`server is running on port ${port}`);
  }
});
