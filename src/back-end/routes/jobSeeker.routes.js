const express = require("express");
const {
  getProfile,
  updateProfile,
  getAllJobPostings,
  applyForJob,
  getJobApplications,
} = require("../controllers/jobSeeker.controller");
const { protect, authorize } = require("../middleware/auth.middleware");

const router = express.Router();

// Apply middleware to all routes
router.use(protect);
router.use(authorize("jobSeeker"));

// Job seeker routes
router.get("/profile", getProfile);
router.put("/profile", updateProfile);
router.get("/jobs", getAllJobPostings);
router.post("/jobs/:id/apply", applyForJob);
router.get("/applications", getJobApplications);

module.exports = router;
