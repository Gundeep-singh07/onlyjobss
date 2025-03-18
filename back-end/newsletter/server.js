const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const mongoose = require("mongoose");
const cron = require("node-cron");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3002;

app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, { dbName: "ONLYJOBS" })
  .then(() => console.log("✅ Connected to MongoDB (ONLYJOBS)"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Email Schema & Model
const emailSchema = new mongoose.Schema({ email: String });
const Email = mongoose.model("newsletter-emails", emailSchema);

// Create email transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Subscribe endpoint (for welcome email)
app.post("/api/subscribe", async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: "Email is required" });

  try {
    const existingEmail = await Email.findOne({ email });
    if (existingEmail)
      return res.status(400).json({ error: "Email already subscribed" });

    await new Email({ email }).save();
    console.log(`✅ New subscriber: ${email}`);

    // Send welcome email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Welcome to OnlyJobs!",
      html: `
        <h1>Welcome to OnlyJobs! 🚀</h1>
        <p>You're now subscribed to receive daily job updates.</p>
        <p>Get ready for the latest hiring trends and career tips!</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log("✅ Welcome email sent to:", email);

    res.status(200).json({ success: true, message: "Subscription successful" });
  } catch (error) {
    console.error("❌ Subscription error:", error);
    res.status(500).json({ error: "Failed to process subscription" });
  }
});

// 🚀 Daily Email Cron Job (Runs at 10 AM IST)
cron.schedule("30 4 * * *", async () => {
  try {
    console.log("📩 Sending daily job update emails...");

    const subscribers = await Email.find();
    if (subscribers.length === 0)
      return console.log("❌ No subscribers to send emails.");

    const jobData = {
      topRoles: ["Software Engineer", "Data Scientist", "Product Manager"],
      topCompanies: ["Google", "Microsoft", "Amazon"],
      selectedCandidates: 85, // Dynamic value can be fetched from DB
      trendingCourses: [
        "React.js Mastery",
        "AI with Python",
        "Data Science Bootcamp",
      ],
      topSkills: ["JavaScript", "Machine Learning", "Cloud Computing"],
    };

    const emailPromises = subscribers.map((subscriber) => {
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: subscriber.email,
        subject: "🚀 Today's Hottest Jobs & Career Insights!",
        html: `
          <h2>Good Morning! ☀️</h2>
          <p>Here are the latest job trends from yesterday:</p>
          <ul>
            <li><strong>Top Hiring Roles:</strong> ${jobData.topRoles.join(
              ", "
            )}</li>
            <li><strong>Top Hiring Companies:</strong> ${jobData.topCompanies.join(
              ", "
            )}</li>
            <li><strong>People Hired Yesterday:</strong> ${
              jobData.selectedCandidates
            }</li>
            <li><strong>Trending Courses:</strong> ${jobData.trendingCourses.join(
              ", "
            )}</li>
            <li><strong>Top Skills to Focus On:</strong> ${jobData.topSkills.join(
              ", "
            )}</li>
          </ul>
          <p>Stay tuned for more updates!</p>
        `,
      };

      return transporter.sendMail(mailOptions);
    });

    await Promise.all(emailPromises);
    console.log("✅ Daily job update emails sent to all subscribers!");
  } catch (error) {
    console.error("❌ Error sending daily job emails:", error);
  }
});

// Start server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
