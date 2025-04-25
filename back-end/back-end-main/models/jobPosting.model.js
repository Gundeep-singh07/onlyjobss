const mongoose = require("mongoose");

const jobPostingSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Job title is required"],
    },
    company: {
      type: String,
      required: [true, "Company name is required"],
    },
    location: {
      type: String,
      required: [true, "Job location is required"],
    },
    description: {
      type: String,
      required: [true, "Job description is required"],
    },
    requirements: {
      type: String,
      required: [true, "Job requirements are required"],
    },
    jobType: {
      type: String,
      required: [true, "Job type is required"],
      enum: [
        "Full-Time",
        "Part-Time",
        "Freelance",
        "Internship",
        "Contract",
        "Temporary",
        "Remote",
      ],
    },
    salary: {
      type: String,
    },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "JobProvider",
      required: true,
    },
    applicants: [
      {
        jobSeeker: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "JobSeeker",
        },
        status: {
          type: String,
          default: "pending",
          enum: ["pending", "reviewed", "interviewed", "rejected", "accepted"],
        },
        appliedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    active: {
      type: Boolean,
      default: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    expiresAt: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const JobPosting = mongoose.model("JobPosting", jobPostingSchema);

module.exports = JobPosting;
