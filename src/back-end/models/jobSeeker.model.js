const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const jobSeekerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please use a valid email address"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
      select: false,
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
    },
    profilePicture: {
      type: String,
      default: "",
    },
    position: {
      type: String,
      required: [true, "Current position is required"],
    },
    experience: {
      type: String,
      required: [true, "Experience level is required"],
    },
    education: {
      type: String,
      required: [true, "Education information is required"],
    },
    skills: {
      type: String,
      required: [true, "Skills are required"],
    },
    summary: {
      type: String,
      required: [true, "Professional summary is required"],
    },
    desiredJob: {
      type: String,
      required: [true, "Desired job type is required"],
    },
    location: {
      type: String,
      required: [true, "Preferred location is required"],
    },
    resume: {
      type: String,
      default: "",
    },
    link: {
      type: String,
    },
    goals: {
      type: String,
      required: [true, "Career goals are required"],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Encrypt password before saving
jobSeekerSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to compare passwords
jobSeekerSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const JobSeeker = mongoose.model("JobSeeker", jobSeekerSchema);

module.exports = JobSeeker;
