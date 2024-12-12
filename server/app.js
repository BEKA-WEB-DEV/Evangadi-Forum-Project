const express = require("express");
// const cors = require("cors");
const port = 3000;
const app = express();

//register routes
app.post("/api/users/register", (req, res) => {
  res.send("register user");
});

// login user
app.post("/api/users/login", (req, res) => {
  res.send("login user");
});

//check user
app.get("/api/users/check", (req, res) => {
  res.send("check user");
});

app.listen(port, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`server is running on port ${port}`);
  }
});
