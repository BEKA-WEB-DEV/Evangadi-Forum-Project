const dbconnection = require("../db/dbConfig");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { use } = require("bcrypt/promises");
const { StatusCodes } = require("http-status-codes");
const dotenv = require("dotenv");
dotenv.config();

async function register(req, res) {
  const { username, firstname, lastname, email, password } = req.body;

  const currentTimestamp = new Date();
  currentTimestamp.setHours(currentTimestamp.getHours() + 3); // Adjusting for UTC+3
  const formattedTimestamp = currentTimestamp
    .toISOString()
    .slice(0, 19)
    .replace("T", " ");

  //check if all required fields are filled
  if (!username || !firstname || !lastname || !email || !password) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Please enter all required fields" });
  }

  //check if password is at least 8 characters
  if (password.length < 8) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Password must be at least 8 characters long" });
  }

  try {
    //Check if user already exists
    const [user] = await dbconnection.query(
      "SELECT username, userid FROM users WHERE username = ? OR email = ?",
      [username, email]
    );

    if (user.length > 0) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        msg: "Username or Email already exists. Please try with a different username or email.",
      });
    }
    //Encrypt password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //Insert new user
    await dbconnection.query(
      "INSERT INTO users (username, firstname, lastname, email, password) VALUES (?, ?, ?, ?, ?)",
      [username, firstname, lastname, email, hashedPassword, formattedTimestamp]
    );
    return res
      .status(StatusCodes.CREATED)
      .json({ msg: "User created successfully" });
  } catch (err) {
    console.log(err.message);
    return res
      .status(StatusCodes.SOME_THING_WENT_WRONG)
      .json({ msg: "Some thing went wrong" });
  }
}

//login
async function login(req, res) {
  const { usernameORemail, password } = req.body;

  if (!usernameORemail || !password) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Please enter all required fields" });
  }

  try {
    const [user] = await dbconnection.query(
      "SELECT userid, username, password FROM users WHERE username = ? OR email = ?",
      [usernameORemail, usernameORemail]
    );
    // Query the user by email or username
    if (user.length === 0) {
      return res.status(StatusCodes.NOT_FOUND).json({ msg: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user[0].password);
    if (!isMatch) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ msg: "Invalid credentials" });
    }

    // Generate JWT token
    const username = user[0].username;
    const userid = user[0].userid;
    const secret = process.env.JWT_SECRET;
    const token = jwt.sign({ username, userid }, secret, {
      expiresIn: "1d",
    });

    return res.status(StatusCodes.OK).json({ username, userid, token });
  } catch (err) {
    console.log(err.message);
    return res
      .status(StatusCodes.SOME_THING_WENT_WRONG)
      .json({ msg: "Some thing went wrong" });
  }
}

//check user
async function checkUser(req, res) {
  const username = req.body.username;
  const userid = req.body.userid;
  return res.status(StatusCodes.OK).json({ username, userid });
}

module.exports = {
  register,
  login,
  checkUser,
};
