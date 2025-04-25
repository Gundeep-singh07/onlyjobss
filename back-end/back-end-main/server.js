const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const authRoutes = require("./routes/auth.routes");
const jobSeekerRoutes = require("./routes/jobSeeker.routes");
const jobProviderRoutes = require("./routes/jobProvider.routes");

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3004;

// Trust proxy headers when behind Nginx
app.set("trust proxy", true);

// CORS configuration - updated to include production domain
app.use(
  cors({
    origin: [
      "http://localhost:8080",
      "http://localhost:5173",
      "http://localhost:3000",
      "https://onlyjobs-site.vercel.app",
      "https://onlyjobs.online",
      "http://onlyjobs.online",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: [
      "Origin",
      "X-Requested-With",
      "Content-Type",
      "Accept",
      "Authorization",
    ],
    credentials: true,
  })
);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging middleware for debugging
app.use((req, res, next) => {
  const realIP = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
  console.log(
    `${new Date().toISOString()} - ${req.method} ${req.path} - IP: ${realIP}`
  );
  next();
});

// Connect to MongoDB Atlas
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/job-seekers", jobSeekerRoutes);
app.use("/api/job-providers", jobProviderRoutes);

// Root route
app.get("/", (req, res) => {
  res.send("OnlyJobs API is running");
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

// Start the server
app.listen(PORT, () => {
  console.log(`API Server running on port ${PORT}`);
  console.log(
    `This server will be accessible via Nginx at: https://onlyjobs.online/api/`
  );
});
