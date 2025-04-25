const express = require("express");
const router = express.Router();
const {
  getProfile,
  updateProfile,
  getAllJobPostings,
  applyForJob,
  getJobApplications,
  addProject,
  deleteProject,
} = require("../controllers/jobSeeker.controller");
const auth = require("../middleware/auth");

// Job seeker routes
router.get("/profile", auth, getProfile);
router.put("/profile", auth, updateProfile);
router.get("/job-postings", auth, getAllJobPostings);
router.post("/job-postings/:id/apply", auth, applyForJob);
router.get("/applications", auth, getJobApplications);

// Project routes
router.post("/projects", auth, addProject);
router.delete("/projects/:id", auth, deleteProject);

module.exports = router;
