const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const jobProviderSchema = new mongoose.Schema(
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
      required: [true, "Job title is required"],
    },
    companyName: {
      type: String,
      required: [true, "Company name is required"],
    },
    industry: {
      type: String,
      required: [true, "Industry is required"],
    },
    description: {
      type: String,
      required: [true, "Company description is required"],
    },
    summary: {
      type: String,
      required: [true, "Professional summary is required"],
    },
    hq: {
      type: String,
      required: [true, "Company headquarters location is required"],
    },
    numEmployees: {
      type: String,
      required: [true, "Number of employees is required"],
    },
    hirePositions: {
      type: String,
      required: [true, "Hiring position types are required"],
    },
    link: {
      type: String,
    },
    logo: {
      type: String,
      default: "",
    },
    skills: {
      type: String,
      required: [true, "Required skills for candidates are required"],
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
jobProviderSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to compare passwords
jobProviderSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const JobProvider = mongoose.model("JobProvider", jobProviderSchema);

module.exports = JobProvider;
