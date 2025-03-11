import React, { useState, useRef, useEffect } from "react";
import "./HelperChat.css";

const HelperChat = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([
    {
      type: "bot",
      text: "Hello! 👋 I'm here to help. Feel free to ask me anything!",
      options: ["Ask a question", "Start chat"],
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (text) => {
    if (!text.trim()) return;

    // Add user message to chat
    setMessages((prev) => [...prev, { type: "user", text }]);
    setLoading(true);
    setInputValue("");

    try {
      const response = await fetch("http://localhost:3001/help-chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: text }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("AI Response:", data);

      // Add bot response to chat
      setMessages((prev) => [
        ...prev,
        {
          type: "bot",
          text: data.response,
          options: ["Ask another question", "New topic", "Clear chat"],
        },
      ]);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          type: "bot",
          text: "Cannot connect to the server. Is it running?",
          options: ["Try again", "Contact support", "Close chat"],
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleClearChat = async () => {
    try {
      const response = await fetch("http://localhost:3001/clear-chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      setMessages([
        {
          type: "bot",
          text: "Chat history cleared. What would you like to talk about?",
          options: ["Ask a question", "Start new chat"],
        },
      ]);
    } catch (error) {
      console.error("Error clearing chat:", error);
      setMessages([
        {
          type: "bot",
          text: "Failed to clear chat. Please try again.",
          options: ["Try again", "Close chat"],
        },
      ]);
    }
  };

  const handleOptionClick = (option) => {
    if (option === "Close chat") {
      onClose();
      return;
    }
    if (option === "Clear chat") {
      handleClearChat();
      return;
    }
    if (option === "Try again") {
      const lastUserMessage = messages.findLast((m) => m.type === "user")?.text;
      if (lastUserMessage) {
        setMessages((prev) => prev.slice(0, -1));
        handleSendMessage(lastUserMessage);
      }
      return;
    }
    if (option === "New topic") {
      handleClearChat();
      return;
    }
    handleSendMessage(option);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() && !loading) {
      handleSendMessage(inputValue);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="helper-chat">
      <div className="chat-header">
        <h3>AI Assistant</h3>
        <button className="close-button" onClick={onClose}>
          ×
        </button>
      </div>

      <div className="chat-messages">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.type}`}>
            {message.type === "bot" && <div className="bot-avatar">🤖</div>}
            <div className="message-content">
              <p>{message.text}</p>
              {message.options && (
                <div className="message-options">
                  {message.options.map((option, i) => (
                    <button
                      key={i}
                      onClick={() => handleOptionClick(option)}
                      className="option-button"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
        {loading && (
          <div className="message bot">
            <div className="bot-avatar">🤖</div>
            <div className="message-content">
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="chat-input">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Type your message..."
          disabled={loading}
        />
        <button type="submit" disabled={loading || !inputValue.trim()}>
          {loading ? "..." : "Send"}
        </button>
      </form>
    </div>
  );
};

export default HelperChat;
