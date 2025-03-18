const jwt = require("jsonwebtoken");
const JobSeeker = require("../models/jobSeeker.model");
const JobProvider = require("../models/jobProvider.model");

// Generate JWT Token
const generateToken = (id, userType) => {
  return jwt.sign({ id, userType }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

// Register Job Seeker
exports.registerJobSeeker = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      phone,
      position,
      experience,
      education,
      skills,
      summary,
      desiredJob,
      location,
      link,
      goals,
    } = req.body;

    // Check if user already exists
    const existingUser = await JobSeeker.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already in use",
      });
    }

    // Create job seeker
    const jobSeeker = await JobSeeker.create({
      name,
      email,
      password,
      phone,
      position,
      experience,
      education,
      skills,
      summary,
      desiredJob,
      location,
      link,
      goals,
    });

    // Generate token
    const token = generateToken(jobSeeker._id, "jobSeeker");

    res.status(201).json({
      success: true,
      token,
      user: {
        id: jobSeeker._id,
        name: jobSeeker.name,
        email: jobSeeker.email,
        userType: "jobSeeker",
      },
    });
  } catch (error) {
    console.error("Error registering job seeker:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// Register Job Provider
exports.registerJobProvider = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      phone,
      position,
      companyName,
      industry,
      description,
      summary,
      hq,
      numEmployees,
      hirePositions,
      link,
      skills,
    } = req.body;

    // Check if user already exists
    const existingUser = await JobProvider.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already in use",
      });
    }

    // Create job provider
    const jobProvider = await JobProvider.create({
      name,
      email,
      password,
      phone,
      position,
      companyName,
      industry,
      description,
      summary,
      hq,
      numEmployees,
      hirePositions,
      link,
      skills,
    });

    // Generate token
    const token = generateToken(jobProvider._id, "jobProvider");

    res.status(201).json({
      success: true,
      token,
      user: {
        id: jobProvider._id,
        name: jobProvider.name,
        email: jobProvider.email,
        userType: "jobProvider",
      },
    });
  } catch (error) {
    console.error("Error registering job provider:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// Login User (Job Seeker or Job Provider)
exports.login = async (req, res) => {
  try {
    const { email, password, userType } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide email and password",
      });
    }

    let user;

    // If userType is provided, check only that specific type
    if (userType) {
      if (userType === "jobSeeker") {
        user = await JobSeeker.findOne({ email }).select("+password");
      } else if (userType === "jobProvider") {
        user = await JobProvider.findOne({ email }).select("+password");
      } else {
        return res.status(400).json({
          success: false,
          message: "Invalid user type",
        });
      }
    } else {
      // If userType is not provided, check both types
      user = await JobSeeker.findOne({ email }).select("+password");

      if (!user) {
        user = await JobProvider.findOne({ email }).select("+password");
      }
    }

    // Check if user exists
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Check if password matches
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Determine user type
    const detectedUserType =
      user.constructor.modelName === "JobSeeker" ? "jobSeeker" : "jobProvider";

    // Generate token
    const token = generateToken(user._id, detectedUserType);

    res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        userType: detectedUserType,
      },
    });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// Get current user
exports.getCurrentUser = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Not authorized",
      });
    }

    res.status(200).json({
      success: true,
      user: {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        userType: req.userType,
      },
    });
  } catch (error) {
    console.error("Error getting current user:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};
