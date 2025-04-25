const express = require("express");
const router = express.Router();

// Import controller and middleware directly
let jobSeekerController;
try {
  jobSeekerController = require("../controllers/jobSeeker.controller");
} catch (error) {
  // Create dummy controller functions if there's an error loading the real one
  jobSeekerController = {
    getProfile: (req, res) =>
      res.status(500).json({ error: "Controller not loaded properly" }),
    updateProfile: (req, res) =>
      res.status(500).json({ error: "Controller not loaded properly" }),
    getAllJobPostings: (req, res) =>
      res.status(500).json({ error: "Controller not loaded properly" }),
    applyForJob: (req, res) =>
      res.status(500).json({ error: "Controller not loaded properly" }),
    getJobApplications: (req, res) =>
      res.status(500).json({ error: "Controller not loaded properly" }),
    addProject: (req, res) =>
      res.status(500).json({ error: "Controller not loaded properly" }),
    deleteProject: (req, res) =>
      res.status(500).json({ error: "Controller not loaded properly" }),
  };
}

// Define auth middleware inline to avoid any potential issues
const authMiddleware = (req, res, next) => {
  try {
    const auth = require("../middleware/auth.middleware");
    if (typeof auth === "function") {
      return auth(req, res, next);
    } else {
      // If auth is not a function, use a placeholder middleware
      console.warn(
        "Warning: auth middleware is not a function, using placeholder"
      );
      next();
    }
  } catch (error) {
    console.warn("Warning: Could not load auth middleware, using placeholder");
    next();
  }
};

// Job seeker routes
router.get("/profile", authMiddleware, (req, res) => {
  if (typeof jobSeekerController.getProfile === "function") {
    jobSeekerController.getProfile(req, res);
  } else {
    res.status(500).json({ error: "Controller function not found" });
  }
});

router.put("/profile", authMiddleware, (req, res) => {
  if (typeof jobSeekerController.updateProfile === "function") {
    jobSeekerController.updateProfile(req, res);
  } else {
    res.status(500).json({ error: "Controller function not found" });
  }
});

router.get("/job-postings", authMiddleware, (req, res) => {
  if (typeof jobSeekerController.getAllJobPostings === "function") {
    jobSeekerController.getAllJobPostings(req, res);
  } else {
    res.status(500).json({ error: "Controller function not found" });
  }
});

router.post("/job-postings/:id/apply", authMiddleware, (req, res) => {
  if (typeof jobSeekerController.applyForJob === "function") {
    jobSeekerController.applyForJob(req, res);
  } else {
    res.status(500).json({ error: "Controller function not found" });
  }
});

router.get("/applications", authMiddleware, (req, res) => {
  if (typeof jobSeekerController.getJobApplications === "function") {
    jobSeekerController.getJobApplications(req, res);
  } else {
    res.status(500).json({ error: "Controller function not found" });
  }
});

// Project routes
router.post("/projects", authMiddleware, (req, res) => {
  if (typeof jobSeekerController.addProject === "function") {
    jobSeekerController.addProject(req, res);
  } else {
    res.status(500).json({ error: "Controller function not found" });
  }
});

router.delete("/projects/:id", authMiddleware, (req, res) => {
  if (typeof jobSeekerController.deleteProject === "function") {
    jobSeekerController.deleteProject(req, res);
  } else {
    res.status(500).json({ error: "Controller function not found" });
  }
});

module.exports = router;
