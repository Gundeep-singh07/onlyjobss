const JobProvider = require("../models/jobProvider.model");
const JobPosting = require("../models/jobPosting.model");

// Get job provider profile
exports.getProfile = async (req, res) => {
  try {
    const jobProvider = await JobProvider.findById(req.user.id);

    if (!jobProvider) {
      return res.status(404).json({
        success: false,
        message: "Job provider not found",
      });
    }

    res.status(200).json({
      success: true,
      data: jobProvider,
    });
  } catch (error) {
    console.error("Error getting job provider profile:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// Update job provider profile
exports.updateProfile = async (req, res) => {
  try {
    const fieldsToUpdate = {
      name: req.body.name,
      phone: req.body.phone,
      position: req.body.position,
      companyName: req.body.companyName,
      industry: req.body.industry,
      description: req.body.description,
      summary: req.body.summary,
      hq: req.body.hq,
      numEmployees: req.body.numEmployees,
      hirePositions: req.body.hirePositions,
      link: req.body.link,
      skills: req.body.skills,
    };

    // Filter out undefined fields
    Object.keys(fieldsToUpdate).forEach(
      (key) => fieldsToUpdate[key] === undefined && delete fieldsToUpdate[key]
    );

    const jobProvider = await JobProvider.findByIdAndUpdate(
      req.user.id,
      fieldsToUpdate,
      { new: true, runValidators: true }
    );

    if (!jobProvider) {
      return res.status(404).json({
        success: false,
        message: "Job provider not found",
      });
    }

    res.status(200).json({
      success: true,
      data: jobProvider,
    });
  } catch (error) {
    console.error("Error updating job provider profile:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// Create job posting
exports.createJobPosting = async (req, res) => {
  try {
    req.body.postedBy = req.user.id;

    // Set expiration date (default: 30 days from now)
    if (!req.body.expiresAt) {
      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + 30);
      req.body.expiresAt = expiresAt;
    }

    const jobPosting = await JobPosting.create(req.body);

    res.status(201).json({
      success: true,
      data: jobPosting,
    });
  } catch (error) {
    console.error("Error creating job posting:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// Get all job postings by job provider
exports.getJobPostings = async (req, res) => {
  try {
    const jobPostings = await JobPosting.find({ postedBy: req.user.id }).sort({
      createdAt: -1,
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

// Update job posting
exports.updateJobPosting = async (req, res) => {
  try {
    let jobPosting = await JobPosting.findById(req.params.id);

    if (!jobPosting) {
      return res.status(404).json({
        success: false,
        message: "Job posting not found",
      });
    }

    // Make sure job posting belongs to job provider
    if (jobPosting.postedBy.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        message: "Not authorized to update this job posting",
      });
    }

    jobPosting = await JobPosting.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      data: jobPosting,
    });
  } catch (error) {
    console.error("Error updating job posting:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// Delete job posting
exports.deleteJobPosting = async (req, res) => {
  try {
    const jobPosting = await JobPosting.findById(req.params.id);

    if (!jobPosting) {
      return res.status(404).json({
        success: false,
        message: "Job posting not found",
      });
    }

    // Make sure job posting belongs to job provider
    if (jobPosting.postedBy.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        message: "Not authorized to delete this job posting",
      });
    }

    await jobPosting.remove();

    res.status(200).json({
      success: true,
      message: "Job posting removed",
    });
  } catch (error) {
    console.error("Error deleting job posting:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// Get job applicants
exports.getJobApplicants = async (req, res) => {
  try {
    const jobPosting = await JobPosting.findById(req.params.id).populate({
      path: "applicants.jobSeeker",
      select: "name email phone position experience education skills summary",
    });

    if (!jobPosting) {
      return res.status(404).json({
        success: false,
        message: "Job posting not found",
      });
    }

    // Make sure job posting belongs to job provider
    if (jobPosting.postedBy.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        message: "Not authorized to view applicants for this job posting",
      });
    }

    res.status(200).json({
      success: true,
      count: jobPosting.applicants.length,
      data: jobPosting.applicants,
    });
  } catch (error) {
    console.error("Error getting job applicants:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// Update applicant status
exports.updateApplicantStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const { id, applicantId } = req.params;

    if (
      !["pending", "reviewed", "interviewed", "rejected", "accepted"].includes(
        status
      )
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid status",
      });
    }

    const jobPosting = await JobPosting.findById(id);

    if (!jobPosting) {
      return res.status(404).json({
        success: false,
        message: "Job posting not found",
      });
    }

    // Make sure job posting belongs to job provider
    if (jobPosting.postedBy.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        message: "Not authorized to update applicants for this job posting",
      });
    }

    // Find applicant in the array
    const applicant = jobPosting.applicants.id(applicantId);

    if (!applicant) {
      return res.status(404).json({
        success: false,
        message: "Applicant not found",
      });
    }

    // Update status
    applicant.status = status;

    await jobPosting.save();

    res.status(200).json({
      success: true,
      message: "Applicant status updated",
      data: applicant,
    });
  } catch (error) {
    console.error("Error updating applicant status:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};
