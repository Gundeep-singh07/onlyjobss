const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JobSeeker = require("../models/JobSeeker");
const Employer = require("../models/Employer");

// Register User
const register = async (req, res) => {
  try {
    const { role, ...userData } = req.body;

    const Model = role === "employer" ? Employer : JobSeeker;

    // Check if user already exists
    const existingUser = await Model.findOne({ email: userData.email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists!" });

    // Hash Password
    const salt = await bcrypt.genSalt(10);
    userData.password = await bcrypt.hash(userData.password, salt);

    // Create User
    const user = await Model.create(userData);

    res.status(201).json({ message: "Registration Successful", user });
  } catch (error) {
    res.status(500).json({ message: "Error registering user", error });
  }
};

// Login User
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user =
      (await JobSeeker.findOne({ email })) ||
      (await Employer.findOne({ email }));
    if (!user) return res.status(400).json({ message: "Invalid Credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid Credentials" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({ token, user });
  } catch (error) {
    res.status(500).json({ message: "Login Failed", error });
  }
};

module.exports = { register, login };
