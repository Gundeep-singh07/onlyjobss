const express = require("express");
const {
  getProfile,
  updateProfile,
  createJobPosting,
  getJobPostings,
  updateJobPosting,
  deleteJobPosting,
  getJobApplicants,
  updateApplicantStatus,
} = require("../controllers/jobProvider.controller");
const { protect, authorize } = require("../middleware/auth.middleware");

const router = express.Router();

// Apply middleware to all routes
router.use(protect);
router.use(authorize("jobProvider"));

// Job provider routes
router.get("/profile", getProfile);
router.put("/profile", updateProfile);
router.post("/jobs", createJobPosting);
router.get("/jobs", getJobPostings);
router.put("/jobs/:id", updateJobPosting);
router.delete("/jobs/:id", deleteJobPosting);
router.get("/jobs/:id/applicants", getJobApplicants);
router.put("/jobs/:id/applicants/:applicantId", updateApplicantStatus);

module.exports = router;
