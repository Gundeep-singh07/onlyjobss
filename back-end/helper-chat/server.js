const express = require("express");
const cors = require("cors");
const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const app = express();

// Basic CORS setup
app.use(cors());
app.use(express.json());

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Chat endpoint
app.post("/help-chat", async (req, res) => {
  try {
    const { message } = req.body;
    console.log("Received message:", message);

    // Initialize the model
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

    // Create a chat
    const chat = model.startChat({
      generationConfig: {
        maxOutputTokens: 2048,
        temperature: 0.9,
        topP: 1,
        topK: 1,
      },
    });

    // Send message and get response
    const result = await chat.sendMessage(message);
    const response = await result.response;
    const text = response.text();

    console.log("AI Response:", text);

    res.json({
      success: true,
      response: text,
      options: ["Ask another question", "New topic", "Clear chat"],
    });
  } catch (error) {
    console.error("Error details:", error);
    res.status(500).json({
      success: false,
      response:
        "I'm having trouble connecting right now. Please try again later.",
      options: ["Try again", "Contact support", "Close chat"],
    });
  }
});

// Clear chat endpoint
app.post("/clear-chat", (req, res) => {
  res.json({
    success: true,
    response:
      "Hello! 👋 I'm an AI assistant. What would you like to talk about?",
    options: ["Ask a question", "Start chat"],
  });
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log("Make sure you have set GEMINI_API_KEY in your .env file");
});
