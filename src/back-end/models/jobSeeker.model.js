const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const JobSeekerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add a name"],
  },
  email: {
    type: String,
    required: [true, "Please add an email"],
    unique: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      "Please add a valid email",
    ],
  },
  password: {
    type: String,
    required: [true, "Please add a password"],
    minlength: 6,
    select: false,
  },
  phone: {
    type: String,
  },
  position: {
    type: String,
  },
  avatar: {
    type: String,
    default: "",
  },
  experience: [
    {
      company: String,
      role: String,
      years: String,
      description: String,
    },
  ],
  education: [
    {
      school: String,
      degree: String,
      years: String,
    },
  ],
  skills: [
    {
      name: String,
      level: String,
      color: String,
    },
  ],
  projects: [
    {
      title: String,
      description: String,
      technologies: [String],
      image: String,
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  summary: {
    type: String,
  },
  bio: {
    type: String,
    default: "",
  },
  desiredJob: {
    type: String,
  },
  location: {
    type: String,
  },
  connections: {
    type: Number,
    default: 0,
  },
  link: {
    type: String,
  },
  goals: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Encrypt password using bcrypt
JobSeekerSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Match user entered password to hashed password in database
JobSeekerSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("JobSeeker", JobSeekerSchema);
