const { StatusCodes } = require("http-status-codes");
const JWT = require("jsonwebtoken");

async function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: "Unauthorized" });
  }

  try {
    const token = authHeader.split(" ")[1];

    const secret = process.env.JWT_SECRET;
    const { username, userid } = JWT.decode(token, secret);
    req.user = { username, userid };
    next();
  } catch (error) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: "Unauthorized" });
  }
}

module.exports = authMiddleware;
