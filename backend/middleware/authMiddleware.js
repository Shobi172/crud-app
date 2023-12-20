const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;
const User = require("../models/user");

const authenticateToken = async (req, res, next) => {
  const { authorization } = req.headers;
  const token = authorization.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  try {
    const decodedToken = jwt.verify(token, JWT_SECRET);
    const userId = decodedToken.userId;

    const user = await User.findById(userId);

    if (!user) {
      return res
        .status(401)
        .json({ message: "Access denied. User not found." });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: "Access denied. Invalid token." });
  }
};

module.exports = authenticateToken;
