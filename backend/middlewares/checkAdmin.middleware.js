const UserRole = require('../models/userRole.model');
const Role = require('../models/Role.model');
const jwt = require('jsonwebtoken');

async function checkAdmin(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    // console.log(authHeader);
    const decoded = jwt.verify(authHeader, process.env.JWT_SECRET);
    // console.log('Decoded token:', decoded);
    req.userId = decoded._id;
    // const userId = req.body.user || req.user?._id;  // this will be changed when connected to frontend ... to upper commented thing...
    const userId = req.userId;
    if (!userId) {
      return res.status(400).json({ message: "User ID missing" });
    }

    const userRoleEntry = await UserRole.findOne({ user: userId }).populate('role');
    if (!userRoleEntry) {
      return res.status(403).json({ message: "No role assigned to this user" });
    }

    if (userRoleEntry.role.role !== "ADMIN") {
      return res.status(401).json({ message: "You are not authorized to perform this action" });
    }

    next();
  } catch (error) {
    console.error("Error in checkAdmin middleware:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = { checkAdmin };