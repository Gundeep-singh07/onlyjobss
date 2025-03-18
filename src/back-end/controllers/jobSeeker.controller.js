const JobSeeker = require("../models/jobSeeker.model");
const JobPosting = require("../models/jobPosting.model");

// Get job seeker profile
exports.getProfile = async (req, res) => {
  try {
    const jobSeeker = await JobSeeker.findById(req.user.id);

    if (!jobSeeker) {
      return res.status(404).json({
        success: false,
        message: "Job seeker not found",
      });
    }

    res.status(200).json({
      success: true,
      data: jobSeeker,
    });
  } catch (error) {
    console.error("Error getting job seeker profile:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// Update job seeker profile
exports.updateProfile = async (req, res) => {
  try {
    const fieldsToUpdate = {
      name: req.body.name,
      phone: req.body.phone,
      position: req.body.position,
      experience: req.body.experience,
      education: req.body.education,
      skills: req.body.skills,
      summary: req.body.summary,
      desiredJob: req.body.desiredJob,
      location: req.body.location,
      link: req.body.link,
      goals: req.body.goals,
    };

    // Filter out undefined fields
    Object.keys(fieldsToUpdate).forEach(
      (key) => fieldsToUpdate[key] === undefined && delete fieldsToUpdate[key]
    );

    const jobSeeker = await JobSeeker.findByIdAndUpdate(
      req.user.id,
      fieldsToUpdate,
      { new: true, runValidators: true }
    );

    if (!jobSeeker) {
      return res.status(404).json({
        success: false,
        message: "Job seeker not found",
      });
    }

    res.status(200).json({
      success: true,
      data: jobSeeker,
    });
  } catch (error) {
    console.error("Error updating job seeker profile:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// Get all job postings
exports.getAllJobPostings = async (req, res) => {
  try {
    const jobPostings = await JobPosting.find({ active: true })
      .sort({ createdAt: -1 })
      .populate({
        path: "postedBy",
        select: "companyName logo industry",
      });

    res.status(200).json({
      success: true,
      count: jobPostings.length,
      data: jobPostings,
    });
  } catch (error) {
    console.error("Error getting job postings:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// Apply for a job
exports.applyForJob = async (req, res) => {
  try {
    const jobPosting = await JobPosting.findById(req.params.id);

    if (!jobPosting) {
      return res.status(404).json({
        success: false,
        message: "Job posting not found",
      });
    }

    // Check if job seeker has already applied
    const alreadyApplied = jobPosting.applicants.some(
      (applicant) => applicant.jobSeeker.toString() === req.user.id
    );

    if (alreadyApplied) {
      return res.status(400).json({
        success: false,
        message: "You have already applied for this job",
      });
    }

    // Add job seeker to applicants array
    jobPosting.applicants.push({
      jobSeeker: req.user.id,
      status: "pending",
      appliedAt: Date.now(),
    });

    await jobPosting.save();

    res.status(200).json({
      success: true,
      message: "Successfully applied for job",
    });
  } catch (error) {
    console.error("Error applying for job:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// Get job applications
exports.getJobApplications = async (req, res) => {
  try {
    const jobPostings = await JobPosting.find({
      "applicants.jobSeeker": req.user.id,
    }).populate({
      path: "postedBy",
      select: "companyName logo industry",
    });

    const applications = jobPostings.map((job) => {
      const application = job.applicants.find(
        (app) => app.jobSeeker.toString() === req.user.id
      );

      return {
        job: {
          id: job._id,
          title: job.title,
          company: job.company,
          location: job.location,
          jobType: job.jobType,
          postedBy: job.postedBy,
        },
        status: application.status,
        appliedAt: application.appliedAt,
      };
    });

    res.status(200).json({
      success: true,
      count: applications.length,
      data: applications,
    });
  } catch (error) {
    console.error("Error getting job applications:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};
