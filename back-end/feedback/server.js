const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
const cron = require("node-cron");
const path = require("path");
require("dotenv").config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3007;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "build")));

// Console styling
const logStyles = {
  success: "\x1b[32m%s\x1b[0m", // Green
  error: "\x1b[31m%s\x1b[0m", // Red
  info: "\x1b[36m%s\x1b[0m", // Cyan
  warn: "\x1b[33m%s\x1b[0m", // Yellow
};

// MongoDB Connection
mongoose
  .connect(
    "mongodb+srv://gundeepsingh2005:JUzsLqavO5hEbpsH@cluster0.pzvbb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
    { dbName: "FEEDBACK_APP" }
  )
  .then(() =>
    console.log(logStyles.success, "✅ Connected to MongoDB (FEEDBACK_APP)")
  )
  .catch((err) =>
    console.error(logStyles.error, "❌ MongoDB connection error:", err)
  );

// Define Feedback Schema
const feedbackSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  message: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ["new", "reviewed", "resolved"],
    default: "new",
  },
});

// Create Feedback Model
const Feedback = mongoose.model("Feedback", feedbackSchema);

// Admin notification email schema
const adminSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
});

const Admin = mongoose.model("Admin", adminSchema);

// Create email transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "onlyjobs.work@gmail.com",
    pass: "qzmw mtzy ckxt rkld",
  },
});

// API Routes
// Get all feedback
app.get("/api/feedback", async (req, res) => {
  try {
    // Get most recent feedbacks first
    const feedbacks = await Feedback.find().sort({ date: -1 }).limit(20);
    res.json(feedbacks);
    console.log(
      logStyles.info,
      `📋 Retrieved ${feedbacks.length} feedback entries`
    );
  } catch (err) {
    console.error(logStyles.error, "❌ Error fetching feedback:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Submit new feedback
app.post("/api/feedback", async (req, res) => {
  try {
    const { name, email, message, rating } = req.body;

    // Validation
    if (!name || !email || !message || !rating) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    // Rating validation
    if (rating < 1 || rating > 5) {
      return res
        .status(400)
        .json({ message: "Rating must be between 1 and 5" });
    }

    // Create new feedback
    const newFeedback = new Feedback({
      name,
      email,
      message,
      rating,
      date: new Date(),
    });

    // Save to database
    const savedFeedback = await newFeedback.save();
    console.log(
      logStyles.success,
      `✅ New feedback received from: ${name} (${email})`
    );

    // Send confirmation email to user
    const userMailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Thank you for your feedback!",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eaeaea; border-radius: 10px;">
          <h2 style="color: #404eed; text-align: center;">Thank You for Your Feedback!</h2>
          <p>Hello ${name},</p>
          <p>We greatly appreciate you taking the time to share your thoughts with us. Your feedback is invaluable as we continually strive to improve our services.</p>
          <div style="background-color: #f6f6f6; border-left: 4px solid #404eed; padding: 15px; margin: 20px 0; border-radius: 5px;">
            <p style="margin: 0; font-style: italic;">"${message}"</p>
            <p style="margin: 5px 0 0; font-weight: bold;">Rating: ${"★".repeat(
              rating
            )}${"☆".repeat(5 - rating)}</p>
          </div>
          <p>We're reviewing your comments and will use them to enhance our products and services.</p>
          <p>Thank you again for your contribution!</p>
          <p style="margin-top: 30px; text-align: center; color: #777777; font-size: 14px;">This is an automated message, please do not reply to this email.</p>
        </div>
      `,
    };

    // Send notification to admin(s)
    try {
      await transporter.sendMail(userMailOptions);
      console.log(logStyles.success, `✅ Confirmation email sent to: ${email}`);

      // Get admins and notify them
      const admins = await Admin.find();
      if (admins.length > 0) {
        const adminEmails = admins.map((admin) => admin.email);

        const adminMailOptions = {
          from: process.env.EMAIL_USER,
          to: adminEmails,
          subject: `📢 New Feedback Received - Rating: ${rating}/5`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eaeaea; border-radius: 10px;">
              <h2 style="color: #404eed; text-align: center;">New Feedback Alert!</h2>
              <p><strong>From:</strong> ${name} (${email})</p>
              <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
              <p><strong>Rating:</strong> ${"★".repeat(rating)}${"☆".repeat(
            5 - rating
          )} (${rating}/5)</p>
              <div style="background-color: #f6f6f6; border-left: 4px solid #404eed; padding: 15px; margin: 20px 0; border-radius: 5px;">
                <p style="margin: 0;"><strong>Message:</strong></p>
                <p style="margin: 10px 0 0;">${message}</p>
              </div>
              <p>Please review this feedback in the admin dashboard.</p>
            </div>
          `,
        };

        await transporter.sendMail(adminMailOptions);
        console.log(
          logStyles.success,
          `✅ Admin notification sent to: ${adminEmails.join(", ")}`
        );
      }
    } catch (emailErr) {
      console.error(logStyles.error, "❌ Error sending emails:", emailErr);
      // Don't fail the request if email sending fails
    }

    res.status(201).json(savedFeedback);
  } catch (err) {
    console.error(logStyles.error, "❌ Error saving feedback:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Register admin
app.post("/api/admin/register", async (req, res) => {
  try {
    const { email, adminSecret } = req.body;

    // Validate admin secret
    if (adminSecret !== process.env.ADMIN_SECRET) {
      return res.status(403).json({ message: "Invalid admin secret" });
    }

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin already registered" });
    }

    // Create new admin
    const newAdmin = new Admin({ email });
    await newAdmin.save();

    console.log(logStyles.success, `✅ New admin registered: ${email}`);
    res.status(201).json({ message: "Admin registered successfully" });
  } catch (err) {
    console.error(logStyles.error, "❌ Error registering admin:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Get analytics
app.get("/api/analytics", async (req, res) => {
  try {
    // Count total feedbacks
    const totalFeedbacks = await Feedback.countDocuments();

    // Get average rating
    const ratingResult = await Feedback.aggregate([
      { $group: { _id: null, avgRating: { $avg: "$rating" } } },
    ]);
    const averageRating =
      ratingResult.length > 0 ? ratingResult[0].avgRating : 0;

    // Count feedbacks by rating
    const ratingCounts = await Feedback.aggregate([
      { $group: { _id: "$rating", count: { $sum: 1 } } },
    ]);

    // Create array with all ratings 1-5
    const ratingDistribution = Array.from({ length: 5 }, (_, i) => {
      const found = ratingCounts.find((item) => item._id === i + 1);
      return { rating: i + 1, count: found ? found.count : 0 };
    });

    // Get recent trend (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const dailyTrend = await Feedback.aggregate([
      {
        $match: { date: { $gte: sevenDaysAgo } },
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$date" },
          },
          count: { $sum: 1 },
          avgRating: { $avg: "$rating" },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    res.json({
      totalFeedbacks,
      averageRating,
      ratingDistribution,
      dailyTrend,
    });

    console.log(logStyles.info, "📊 Analytics data retrieved");
  } catch (err) {
    console.error(logStyles.error, "❌ Error fetching analytics:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// 🚀 Weekly Feedback Summary Email (Runs every Sunday at 9 AM)
cron.schedule("0 9 * * 0", async () => {
  try {
    console.log(logStyles.info, "📩 Sending weekly feedback summary...");

    // Get admins
    const admins = await Admin.find();
    if (admins.length === 0) {
      return console.log(
        logStyles.warn,
        "⚠️ No admins to send summary emails."
      );
    }

    // Get start and end dates for the week
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 7);

    // Get feedback for the week
    const weeklyFeedbacks = await Feedback.find({
      date: { $gte: startDate, $lte: endDate },
    }).sort({ date: -1 });

    // Calculate weekly stats
    const weeklyTotal = weeklyFeedbacks.length;

    if (weeklyTotal === 0) {
      return console.log(logStyles.warn, "⚠️ No feedback received this week.");
    }

    const weeklyAvgRating =
      weeklyFeedbacks.reduce((sum, item) => sum + item.rating, 0) / weeklyTotal;

    // Count ratings
    const ratingCounts = [0, 0, 0, 0, 0]; // For ratings 1-5
    weeklyFeedbacks.forEach((feedback) => {
      ratingCounts[feedback.rating - 1]++;
    });

    // Send emails to all admins
    const adminEmails = admins.map((admin) => admin.email);

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: adminEmails,
      subject: "📊 Weekly Feedback Summary Report",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eaeaea; border-radius: 10px;">
          <h2 style="color: #404eed; text-align: center;">Weekly Feedback Summary</h2>
          <p><strong>Period:</strong> ${startDate.toLocaleDateString()} to ${endDate.toLocaleDateString()}</p>
          
          <div style="background-color: #f6f6f6; padding: 15px; margin: 20px 0; border-radius: 5px;">
            <h3 style="margin-top: 0; color: #404eed;">Weekly Stats</h3>
            <p><strong>Total Feedback Received:</strong> ${weeklyTotal}</p>
            <p><strong>Average Rating:</strong> ${weeklyAvgRating.toFixed(
              2
            )}/5.00</p>
            
            <h4>Rating Distribution:</h4>
            <ul>
              ${ratingCounts
                .map(
                  (count, index) => `
                <li>Rating ${index + 1}: ${count} feedback(s) (${(
                    (count / weeklyTotal) *
                    100
                  ).toFixed(1)}%)</li>
              `
                )
                .join("")}
            </ul>
          </div>
          
          <h3 style="color: #404eed;">Recent Feedback</h3>
          ${weeklyFeedbacks
            .slice(0, 5)
            .map(
              (feedback) => `
            <div style="border-left: 4px solid #404eed; padding: 10px; margin: 15px 0; background-color: #f9f9f9;">
              <p><strong>${feedback.name}</strong> (${
                feedback.email
              }) - Rating: ${"★".repeat(feedback.rating)}${"☆".repeat(
                5 - feedback.rating
              )}</p>
              <p style="font-style: italic;">"${feedback.message}"</p>
              <p style="font-size: 12px; color: #777;">Submitted on: ${new Date(
                feedback.date
              ).toLocaleString()}</p>
            </div>
          `
            )
            .join("")}
          
          <p style="margin-top: 30px;">For more details, please visit the admin dashboard.</p>
          <p style="text-align: center; color: #777777; font-size: 14px;">This is an automated report, please do not reply to this email.</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(
      logStyles.success,
      `✅ Weekly summary emails sent to: ${adminEmails.join(", ")}`
    );
  } catch (error) {
    console.error(
      logStyles.error,
      "❌ Error sending weekly summary emails:",
      error
    );
  }
});

// Start server
app.listen(PORT, () => {
  console.log(logStyles.success, `🚀 Feedback server running on port ${PORT}`);
});
