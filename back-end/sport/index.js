// Step 1: Set up environment variables properly (outside this file)
// Create a .env file in your project root with content like:
// EMAIL_USER=your-actual-gmail@gmail.com
// EMAIL_PASSWORD=your-gmail-app-password
// ADMIN_EMAIL=admin@onlyjobs.com

// Step 2: Add dotenv package to load environment variables
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
const path = require("path");
// Add dotenv to load environment variables
require("dotenv").config();

const app = express();
const PORT = 3006;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection (keeping your existing connection)
mongoose
  .connect(
    "mongodb+srv://gundeepsingh2005:JUzsLqavO5hEbpsH@cluster0.pzvbb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("✅ Connected to MongoDB (onlyjobs-support)"))
  .catch((err) => console.error("❌ Could not connect to MongoDB", err));

// Keep your existing SupportTicket schema and model
const supportTicketSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  queryType: { type: String, required: true },
  title: { type: String, required: true },
  message: { type: String, required: true },
  status: { type: String, default: "new" },
  createdAt: { type: Date, default: Date.now },
});

const SupportTicket = mongoose.model("SupportTicket", supportTicketSchema);

// Update email configuration with better error handling
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "onlyjobs.work@gmail.com",
    pass: "qzmw mtzy ckxt rkld",
  },
});

// Verify email configuration
transporter.verify((error, success) => {
  if (error) {
    console.error("❌ Email configuration error:", error);
  } else {
    console.log("✅ Email server is ready to send messages");
  }
});

// Keep your existing getQueryTypeLabel function
const getQueryTypeLabel = (queryType) => {
  const queryTypes = {
    general: "General Inquiry",
    technical: "Technical Issue",
    billing: "Billing Question",
    feedback: "Feedback",
    career: "Career Opportunities",
  };
  return queryTypes[queryType] || queryType;
};

// Update your API endpoint with better error handling
app.post("/api/support", async (req, res) => {
  try {
    const { name, email, phone, queryType, title, message } = req.body;

    // Validate required fields
    if (!name || !email || !queryType || !title || !message) {
      return res.status(400).json({
        success: false,
        message: "Required fields are missing",
      });
    }

    // Save to database
    const ticket = new SupportTicket({
      name,
      email,
      phone,
      queryType,
      title,
      message,
    });

    await ticket.save();
    console.log(`✅ New support ticket created: ${ticket._id}`);

    // Get readable query type label
    const queryTypeLabel = getQueryTypeLabel(queryType);

    // Format date
    const formattedDate = new Date().toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    // Update logo path or remove if not available
    const logoPath = path.join(__dirname, "public", "placeholder.svg");
    const attachments = [];

    try {
      // Only add logo if file exists
      const fs = require("fs");
      if (fs.existsSync(logoPath)) {
        attachments.push({
          filename: "onlyjobs-logo.png",
          path: logoPath,
          cid: "onlyjobslogo",
        });
      } else {
        console.log("⚠️ Logo file not found at:", logoPath);
      }
    } catch (err) {
      console.error("❌ Error checking logo file:", err);
    }

    // Send confirmation email
    const mailOptions = {
      from: `"OnlyJobs Support" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "We've Received Your Support Request - OnlyJobs",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333; border: 1px solid #e0e0e0; border-radius: 8px;">
          ${
            attachments.length > 0
              ? '<img src="cid:onlyjobslogo" alt="OnlyJobs Logo" style="width: 150px; margin-bottom: 20px;" />'
              : '<h1 style="color: #3498db;">OnlyJobs</h1>'
          }
          
          <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin-bottom: 20px;">
            <h2 style="color: #2c3e50; margin-top: 0;">Thank You for Contacting Our Support Team</h2>
            <p>Dear <strong>${name}</strong>,</p>
            <p>We've received your support request and our team will review it promptly. Here are your ticket details:</p>
          </div>
          
          <div style="border-left: 4px solid #3498db; padding-left: 15px; margin-bottom: 20px;">
            <p><strong>Ticket ID:</strong> <span style="color: #3498db;">#${
              ticket._id
            }</span></p>
            <p><strong>Subject:</strong> ${title}</p>
            <p><strong>Category:</strong> ${queryTypeLabel}</p>
            <p><strong>Submitted:</strong> ${formattedDate}</p>
          </div>
          
          <div style="background-color: #edf7ff; padding: 15px; border-radius: 5px; margin-bottom: 20px;">
            <h3 style="margin-top: 0; color: #3498db;">What Happens Next?</h3>
            <p>Our dedicated support team will review your inquiry and get back to you as soon as possible. Most support requests are addressed within <strong>24-48 business hours</strong>.</p>
            <p>You'll receive a notification when a support representative responds to your ticket.</p>
          </div>
          
          <p>If you have any urgent concerns or additional information to provide regarding this inquiry, please reply to the email you'll receive from our support representative.</p>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0;">
            <p>Thank you for choosing OnlyJobs for your career journey!</p>
            <p style="margin-bottom: 5px;">Warm regards,</p>
            <p style="margin-top: 0;"><strong>The OnlyJobs Support Team</strong></p>
          </div>
        </div>
      `,
      attachments: attachments,
    };

    try {
      await transporter.sendMail(mailOptions);
      console.log("✅ Support confirmation email sent to:", email);

      res.status(201).json({
        success: true,
        message: "Support request submitted successfully",
        ticketId: ticket._id,
      });
    } catch (emailError) {
      console.error("❌ Failed to send email:", emailError);

      // Still return success since data was saved, but inform about email issue
      res.status(201).json({
        success: true,
        message: "Support request saved, but confirmation email failed to send",
        ticketId: ticket._id,
        emailError: emailError.message,
      });
    }
  } catch (error) {
    console.error("❌ Error processing support request:", error);
    res.status(500).json({
      success: false,
      message: "Error processing your request",
    });
  }
});

// Keep your existing endpoints for getting tickets
app.get("/api/support/tickets", async (req, res) => {
  try {
    const tickets = await SupportTicket.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: tickets.length,
      data: tickets,
    });
  } catch (error) {
    console.error("❌ Error fetching support tickets:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching support tickets",
    });
  }
});

app.get("/api/support/ticket/:id", async (req, res) => {
  try {
    const ticket = await SupportTicket.findById(req.params.id);

    if (!ticket) {
      return res.status(404).json({
        success: false,
        message: "Ticket not found",
      });
    }

    res.status(200).json({
      success: true,
      data: ticket,
    });
  } catch (error) {
    console.error("❌ Error fetching support ticket:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching support ticket",
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Support server running on port ${PORT}`);
});
