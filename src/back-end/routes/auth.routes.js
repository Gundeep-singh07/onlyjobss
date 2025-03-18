const express = require("express");
const {
  registerJobSeeker,
  registerJobProvider,
  login,
  getCurrentUser,
} = require("../controllers/auth.controller");
const { protect } = require("../middleware/auth.middleware");

const router = express.Router();

// Auth routes
router.post("/register/job-seeker", registerJobSeeker);
router.post("/register/job-provider", registerJobProvider);
router.post("/login", login);
router.get("/me", protect, getCurrentUser);

module.exports = router;
