const mongoose = require("mongoose");

const JobSeekerSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  phone: String,
  experience: String,
  education: String,
  skills: String,
  location: String,
  resume: String, // Store URL if uploaded to a server
  role: { type: String, default: "jobseeker" },
});

module.exports = mongoose.model("JobSeeker", JobSeekerSchema);
