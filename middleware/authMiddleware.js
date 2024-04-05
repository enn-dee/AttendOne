const jwt = require("jsonwebtoken");
const User = require("../models/user");
require("dotenv").config()

const authMiddleware = async (req, res, next) => {
  try {
  
    const authHeader = req.headers.authorization;
    const token = authHeader.split(' ')[1];
    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }

    
    req.user = {
      userId: decoded.userId,
      username: decoded.username,
      role: decoded.role,
    };
// console.log("Decoded userId: ", decoded.userId)
    
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};

module.exports = authMiddleware;
