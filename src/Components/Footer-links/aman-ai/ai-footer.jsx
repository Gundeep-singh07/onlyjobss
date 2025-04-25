import React, { useState, useEffect, useRef } from "react";
import "./ai-footer.css";

const AIFooter = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [theme, setTheme] = useState("light");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.body.setAttribute("data-theme", savedTheme);
    // Add welcome message
    setMessages([
      {
        type: "ai",
        content:
          "Hello! I'm your OnlyJobs AI assistant. How can I help with your job search today?",
        timestamp: new Date().toLocaleTimeString(),
      },
    ]);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMessage = {
      type: "user",
      content: inputMessage,
      timestamp: new Date().toLocaleTimeString(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    try {
      // Using the same endpoint as HelperChat
      const response = await fetch("http://localhost:3001/help-chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: inputMessage,
        }),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();

      const aiMessage = {
        type: "ai",
        content: data.response || "I'm sorry, I couldn't process that request.",
        timestamp: new Date().toLocaleTimeString(),
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error sending message to server:", error);
      setMessages((prev) => [
        ...prev,
        {
          type: "ai",
          content:
            "I'm sorry, I encountered an error connecting to the AI service. Please try again later.",
          timestamp: new Date().toLocaleTimeString(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = async () => {
    try {
      // Using the same clear-chat endpoint as HelperChat
      const response = await fetch("http://localhost:3001/clear-chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        setMessages([
          {
            type: "ai",
            content: "Chat history cleared. How can I help you today?",
            timestamp: new Date().toLocaleTimeString(),
          },
        ]);
      } else {
        throw new Error("Failed to clear chat history");
      }
    } catch (error) {
      console.error("Error clearing chat:", error);
      // Continue with local clear even if server request fails
      setMessages([
        {
          type: "ai",
          content: "Chat history cleared. How can I help you today?",
          timestamp: new Date().toLocaleTimeString(),
        },
      ]);
    }
  };

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.body.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <div className="ai-chat-container-xyz123">
      <div className="ai-chat-header-xyz123">
        <h2 className="tnlu">OnlyJobs AI Assistant</h2>
        <div className="chat-controls-xyz123">
          <button className="theme-toggle-xyz123" onClick={toggleTheme}>
            {theme === "light" ? "🌙" : "☀️"}
          </button>
          <button className="clear-chat-xyz123" onClick={clearChat}>
            🗑️
          </button>
        </div>
      </div>
      <div className="ai-chat-messages-xyz123">
        {messages.map((message, index) => (
          <div key={index} className={`message-xyz123 ${message.type}-xyz123`}>
            <div className="message-content-xyz123">
              <div className="message-avatar-xyz123">
                {message.type === "ai" ? "🤖" : "👤"}
              </div>
              <div className="message-bubble-xyz123">
                <p>{message.content}</p>
                <span className="message-timestamp-xyz123">
                  {message.timestamp}
                </span>
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="message-xyz123 ai-xyz123">
            <div className="message-content-xyz123">
              <div className="message-avatar-xyz123">🤖</div>
              <div className="message-bubble-xyz123 typing-xyz123">
                <div className="typing-indicator-xyz123">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <form className="ai-chat-input-xyz123" onSubmit={handleSendMessage}>
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Ask about job search, resume tips, or interview preparation..."
          disabled={isLoading}
        />
        <button type="submit" disabled={isLoading || !inputMessage.trim()}>
          Send
        </button>
      </form>
      <div className="ai-footer-features-xyz123">
        <div className="feature-xyz123">
          <span className="feature-icon-xyz123">📊</span>
          <span className="feature-text-xyz123">Job Matching</span>
        </div>
        <div className="feature-xyz123">
          <span className="feature-icon-xyz123">📝</span>
          <span className="feature-text-xyz123">Resume Tips</span>
        </div>
        <div className="feature-xyz123">
          <span className="feature-icon-xyz123">🎯</span>
          <span className="feature-text-xyz123">Interview Prep</span>
        </div>
        <div className="feature-xyz123">
          <span className="feature-icon-xyz123">📈</span>
          <span className="feature-text-xyz123">Career Growth</span>
        </div>
      </div>
    </div>
  );
};

export default AIFooter;
