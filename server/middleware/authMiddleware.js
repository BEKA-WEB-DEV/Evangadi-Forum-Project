const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");

// When user sends data, they will use token to authenticate them
const authMiddleware = async (req, res, next) => {
  // Take token from users (generated token)
  const authHeader = req.headers.authorization;
  // Check if token is not available
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      success: false,
      message: "Not Authorized. Login again.",
    });
  }
  const token = authHeader.split(" ")[1];
  // console.log(authHeader);

  try {
    const { username, userid } = jwt.verify(token, process.env.JWT_SECRET);
    // Set user with userName & userId
    req.user = { username, userid };
    // Call callback function to pass the data upon authorization.
    next();
  } catch (error) {
    console.log(error);
    return res.status(StatusCodes.UNAUTHORIZED).json({
      success: false,
      message: "Not Authorized. Login again.",
    });
  }
};

module.exports = authMiddleware;
