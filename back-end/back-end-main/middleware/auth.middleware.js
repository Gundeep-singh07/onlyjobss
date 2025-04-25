const jwt = require("jsonwebtoken");
const JobSeeker = require("../models/jobSeeker.model");
const JobProvider = require("../models/jobProvider.model");

exports.protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Not authorized to access this route",
    });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check user type and get user
    if (decoded.userType === "jobSeeker") {
      req.user = await JobSeeker.findById(decoded.id);
      req.userType = "jobSeeker";
    } else if (decoded.userType === "jobProvider") {
      req.user = await JobProvider.findById(decoded.id);
      req.userType = "jobProvider";
    }

    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Not authorized to access this route",
    });
  }
};

exports.authorize = (...userTypes) => {
  return (req, res, next) => {
    if (!userTypes.includes(req.userType)) {
      return res.status(403).json({
        success: false,
        message: `User role ${req.userType} is not authorized to access this route`,
      });
    }
    next();
  };
};
