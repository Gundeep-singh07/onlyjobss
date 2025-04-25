const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const nodemailer = require("nodemailer");
const { v4: uuidv4 } = require("uuid");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3009;

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose
  .connect(
    "mongodb+srv://gundeepsingh2005:JUzsLqavO5hEbpsH@cluster0.pzvbb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error:", err));

// User Schema
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  subscriptions: [
    {
      planName: String,
      amount: Number,
      startDate: Date,
      endDate: Date,
      status: {
        type: String,
        enum: ["pending", "active", "expired"],
        default: "pending",
      },
      paymentMethod: String,
      utrNumber: String,
      transactionId: String,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("User", userSchema);

// Payment Schema
const paymentSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  utrNumber: {
    type: String,
    required: true,
    unique: true,
  },
  planName: String,
  amount: Number,
  paymentMethod: String,
  status: {
    type: String,
    enum: ["pending", "verified", "rejected"],
    default: "pending",
  },
  transactionId: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Payment = mongoose.model("Payment", paymentSchema);

// Email Configuration
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "onlyjobs.work@gmail.com",
    pass: "qzmw mtzy ckxt rkld",
  },
});

// Send confirmation email
const sendConfirmationEmail = async (
  email,
  planName,
  amount,
  transactionId
) => {
  try {
    const mailOptions = {
      from: "OnlyJobs <onlyjobs.work@gmail.com>",
      to: email,
      subject: "Payment Confirmation - OnlyJobs",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #4f46e5;">Thank You for Your Payment</h1>
          </div>
          
          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h2 style="margin-top: 0; color: #111827;">Payment Details</h2>
            <p><strong>Plan:</strong> ${planName}</p>
            <p><strong>Amount:</strong> ₹${amount}</p>
            <p><strong>Transaction ID:</strong> ${transactionId}</p>
            <p><strong>Status:</strong> <span style="color: #f59e0b; font-weight: bold;">Pending Activation</span></p>
          </div>
          
          <p>Your subscription is currently being processed and will be activated within 2 days.</p>
          <p>If you have any questions or concerns, please contact us at <a href="mailto:onlyjobs.work@gmail.com" style="color: #4f46e5;">onlyjobs.work@gmail.com</a>.</p>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0; text-align: center; color: #6b7280; font-size: 14px;">
            <p>© 2025 OnlyJobs. All rights reserved.</p>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log("Confirmation email sent to", email);
    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    return false;
  }
};

// Routes
app.post("/api/verify-payment", async (req, res) => {
  try {
    const { utrNumber, email, planName, amount, paymentMethod } = req.body;

    // Check if UTR already exists
    const existingPayment = await Payment.findOne({ utrNumber });
    if (existingPayment) {
      return res.status(400).json({
        success: false,
        message: "This UTR number has already been used",
      });
    }

    // Create transaction ID
    const transactionId = `TXN${uuidv4().substring(0, 8).toUpperCase()}`;

    // Save payment details
    const payment = new Payment({
      email,
      utrNumber,
      planName,
      amount,
      paymentMethod,
      status: "pending",
      transactionId,
    });

    await payment.save();

    // Find or create user
    let user = await User.findOne({ email });

    if (!user) {
      user = new User({
        email,
        subscriptions: [],
      });
    }

    // Calculate subscription end date (30 days from now)
    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 30);

    // Add subscription to user
    user.subscriptions.push({
      planName,
      amount,
      startDate,
      endDate,
      status: "pending",
      paymentMethod,
      utrNumber,
      transactionId,
    });

    await user.save();

    // Send confirmation email
    await sendConfirmationEmail(email, planName, amount, transactionId);

    res.status(200).json({
      success: true,
      message: "Payment verified successfully",
      transactionId,
    });
  } catch (error) {
    console.error("Payment verification error:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred during payment verification",
    });
  }
});

// Admin route to manually activate subscriptions (protected in production)
app.post("/api/admin/activate-subscription", async (req, res) => {
  try {
    const { transactionId } = req.body;

    // Update payment status
    const payment = await Payment.findOne({ transactionId });
    if (!payment) {
      return res
        .status(404)
        .json({ success: false, message: "Transaction not found" });
    }

    payment.status = "verified";
    await payment.save();

    // Update user subscription status
    const user = await User.findOne({ email: payment.email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const subscription = user.subscriptions.find(
      (sub) => sub.transactionId === transactionId
    );
    if (subscription) {
      subscription.status = "active";
      await user.save();
    }

    res.status(200).json({
      success: true,
      message: "Subscription activated successfully",
    });
  } catch (error) {
    console.error("Subscription activation error:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred during subscription activation",
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
