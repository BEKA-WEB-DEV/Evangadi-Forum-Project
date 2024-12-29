// db Connection
const dbConnection = require("../db/dbConfig");
const bcrypt = require("bcrypt");
const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const otpStore = {}; // In-memory store for OTPs

async function register(req, res) {
  const { username, firstname, lastname, email, password } = req.body;
  if (!email || !password || !firstname || !lastname || !username) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "please provide all required fields!" }); //404
  }
  try {
    const [users] = await dbConnection.query(
      "select username,userid from users where username =? or email =? ",
      [username, email]
    );
    if (users.length > 0) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "user already existed" });
    }
    if (password.length <= 8) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "password must be at least 8 characters" });
    }
    // encrypt the password//123456789
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await dbConnection.query(
      "INSERT INTO users (username, firstname, lastname,email,password) VALUES (?,?,?,?,?) ",
      [username, firstname, lastname, email, hashedPassword]
    );
    return res.status(StatusCodes.CREATED).json({ msg: "user register" });
  } catch (error) {
    console.log(error.message);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "something went wrong, try again later!" });
  }
}

async function login(req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "please enter all required fields!" });
  }
  try {
    const [user] = await dbConnection.query(
      "select username,userid,password from users where email=?",
      [email]
    );

    if (user.length === 0) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "invalid credential!" });
    }
    //compare password
    const isMatch = await bcrypt.compare(password, user[0].password);
    if (!isMatch) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "invalid credential" });
    }
    const username = user[0].username;
    const userid = user[0].userid;
    const token = jwt.sign({ username, userid }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    console.log(token);

    return res
      .status(StatusCodes.OK)
      .json({ token, msg: "user login successful" });
  } catch (error) {
    console.log(error.message);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "something went wrong, try again later!" });
  }
}

async function checkUser(req, res) {
  const username = req.user.username;
  const userid = req.user.userid;
  res.status(StatusCodes.OK).json({ msg: "valid user", username, userid });
}

async function logOut(req, res) {
  return res.status(StatusCodes.OK).json({ msg: "successfuly logout" });
}

// Store OTP: When generating the OTP, store it in an in-memory store with an expiry time.
async function sendOtp(req, res) {
  const { email } = req.body;

  // Check if the email exists in the database
  try {
    const [user] = await dbConnection.query(
      "SELECT email FROM users WHERE email = ?",
      [email]
    );

    if (user.length === 0) {
      return res.status(400).json({ msg: "Email not registered." });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Database query failed. Please try again." });
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  // Save OTP to the in-memory store with an expiry time
  const expiry = Date.now() + 300000; // OTP expires in 5 minutes
  otpStore[email] = { otp, expiry };

  // Send OTP to user's email
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: "Your OTP Code",
    text: `Your OTP code is ${otp}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ msg: "OTP sent to your email." });
  } catch (error) {
    res.status(500).json({ msg: "Failed to send OTP. Please try again." });
  }
}

// Verify OTP: When verifying the OTP, check if it exists, if it has expired, and if it matches the provided OTP.
async function verifyOtp(req, res) {
  const { email, otp } = req.body;

  // Verify OTP from the in-memory store
  const record = otpStore[email];
  if (!record) {
    return res.status(400).json({ msg: "Invalid OTP." });
  }

  if (record.expiry < Date.now()) {
    delete otpStore[email];
    return res.status(400).json({ msg: "OTP has expired." });
  }

  if (record.otp !== otp) {
    return res.status(400).json({ msg: "Invalid OTP." });
  }

  // OTP is valid
  delete otpStore[email]; // Optionally delete the OTP after verification
  res.status(200).json({ msg: "OTP verified successfully." });
}
// async function forgotPassword(req, res) {
//   const { email } = req.body;
//   if (!email) {
//     return res
//       .status(StatusCodes.BAD_REQUEST)
//       .json({ msg: "please enter all required fields!" });
//   }
//   try {
//     const [user] = await dbConnection.query(
//       "select username,userid,email from users where email=?",
//       [email]
//     );
//     if (user.length === 0) {
//       return res
//         .status(StatusCodes.BAD_REQUEST)
//         .json({ msg: "invalid credential!" });
//     }
//     //compare password
//     const username = user[0].username;
//     const userid = user[0].userid;
//     const token = jwt.sign({ username, userid }, process.env.JWT_SECRET, {
//       expiresIn: "1d",
//     });
//     // send email with token
//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: process.env.EMAIL,
//         pass: process.env.PASSWORD,
//       },
//     });
//     const mailOptions = {
//       from: process.env.EMAIL,
//       to: email,
//       subject: "Reset Password",
//       text: `http://localhost:3000/reset-password?token=${token}`,
//     };
//     transporter.sendMail(mailOptions, function (error, info) {
//       if (error) {
//         console.log(error);
//       } else {
//         console.log("Email sent:" + info.response);
//       }
//     });
//     return res
//       .status(StatusCodes.OK)
//       .json({ msg: "email sent successfully" });
//   } catch (error) {
//     console.log(error.message);
//     return res
//       .status(StatusCodes.INTERNAL_SERVER_ERROR)
//       .json({ msg: "something went wrong, try again later!" });
//   }
//       }

module.exports = { register, login, checkUser, logOut, sendOtp, verifyOtp };
