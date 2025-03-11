// Add error handling and input validation
exports.getHelperResponse = async (req, res) => {
  try {
    const { message } = req.body;

    // Add input validation
    if (!message || typeof message !== "string") {
      return res.status(400).json({
        success: false,
        message: "Invalid input: message is required and must be a string",
      });
    }

    // Initialize the model
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    // Add safety settings
    const safetySettings = [
      { category: "HARM_CATEGORY", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
    ];

    // Generate response with safety settings
    const result = await model.generateContent({
      contents: [{ text: message }],
      safetySettings,
    });

    const response = await result.response;
    const text = response.text();

    res.status(200).json({
      success: true,
      message: text,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Error processing your request",
    });
  }
};
