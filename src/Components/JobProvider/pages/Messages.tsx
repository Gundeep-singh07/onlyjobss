import { useState } from "react";
import { Navbar } from "../components/layout/Navbar";
import { Sidebar } from "../components/layout/Sidebar";
import { Send, User } from "lucide-react";

const companyName = "Tech Innovations Inc.";

const messages = [
  {
    id: 1,
    name: "Emily Johnson",
    photo:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3",
    role: "Frontend Developer",
    messages: [
      {
        sender: "them",
        text: "Hello! I saw your job posting for a Frontend Developer position and I'm very interested.",
        time: "2 days ago",
      },
      {
        sender: "you",
        text: "Hi Emily! Thanks for reaching out. I looked at your profile and I'm impressed with your portfolio.",
        time: "1 day ago",
      },
      {
        sender: "them",
        text: "Thank you! I'd love to discuss the position in more detail. When would be a good time for a call?",
        time: "1 day ago",
      },
      {
        sender: "you",
        text: "How about tomorrow at 2pm PST? I can send you a calendar invite.",
        time: "1 day ago",
      },
      {
        sender: "them",
        text: "That works perfectly for me. Looking forward to it!",
        time: "23 hours ago",
      },
    ],
  },
  {
    id: 2,
    name: "Michael Chen",
    photo:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3",
    role: "Backend Developer",
    messages: [
      {
        sender: "them",
        text: "Hi, I'm interested in the Backend Developer role.",
        time: "3 days ago",
      },
      {
        sender: "you",
        text: "Hello Michael, thanks for your interest! Do you have experience with Node.js?",
        time: "3 days ago",
      },
      {
        sender: "them",
        text: "Yes, I've been working with Node.js for 5 years now. I also have experience with Express and MongoDB.",
        time: "2 days ago",
      },
    ],
  },
  {
    id: 3,
    name: "Jessica Taylor",
    photo:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop&ixlib=rb-4.0.3",
    role: "Product Manager",
    messages: [
      {
        sender: "them",
        text: "Hello, I saw your job posting for a Product Manager position.",
        time: "1 week ago",
      },
      {
        sender: "you",
        text: "Hi Jessica, thanks for reaching out! What kind of products have you managed before?",
        time: "6 days ago",
      },
    ],
  },
];

const Messages = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedChat, setSelectedChat] = useState(messages[0]);
  const [newMessage, setNewMessage] = useState("");

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() === "") return;

    // In a real app, you would update this in a database
    console.log("Sending message:", newMessage);
    setNewMessage("");
  };

  return (
    <div className="messages-page">
      <Navbar toggleSidebar={toggleSidebar} companyName={companyName} />

      <div className="layout">
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />

        <main className="main-content">
          <h1 className="page-title">Messages</h1>

          <div className="messages-container">
            <div className="conversations-card">
              <div className="card-header">
                <h2 className="card-title">Conversations</h2>
              </div>

              <div className="conversations-list">
                {messages.map((chat) => (
                  <div
                    key={chat.id}
                    className={`conversation-item ${
                      selectedChat.id === chat.id ? "active" : ""
                    }`}
                    onClick={() => setSelectedChat(chat)}
                  >
                    <div className="conversation-photo">
                      <img src={chat.photo} alt={chat.name} />
                    </div>
                    <div className="conversation-info">
                      <p className="conversation-name">{chat.name}</p>
                      <p className="conversation-role">{chat.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="chat-card">
              <div className="card-header chat-header">
                <div className="chat-user">
                  <div className="conversation-photo">
                    <img src={selectedChat.photo} alt={selectedChat.name} />
                  </div>
                  <div className="conversation-info">
                    <p className="conversation-name">{selectedChat.name}</p>
                    <p className="conversation-role">{selectedChat.role}</p>
                  </div>
                </div>
              </div>

              <div className="messages-list">
                {selectedChat.messages.map((message, index) => (
                  <div
                    key={index}
                    className={`message-wrapper ${
                      message.sender === "you"
                        ? "message-outgoing"
                        : "message-incoming"
                    }`}
                  >
                    <div className="message">
                      <p className="message-text">{message.text}</p>
                      <p className="message-time">{message.time}</p>
                    </div>
                  </div>
                ))}
              </div>

              <form onSubmit={handleSendMessage} className="message-form">
                <input
                  type="text"
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="message-input"
                />
                <button type="submit" className="send-button">
                  <Send size={18} />
                  <span className="sr-only">Send message</span>
                </button>
              </form>
            </div>
          </div>
        </main>
      </div>

      <style>
        {`
          .messages-page {
            min-height: 100vh;
            background-color: var(--background);
            color: var(--foreground);
          }
          
          .layout {
            display: flex;
            padding-top: 4rem;
            min-height: calc(100vh - 4rem);
          }
          
          .main-content {
            flex: 1;
            padding: 1.5rem;
            max-width: 1280px;
            margin: 0 auto;
            animation: fadeIn 0.3s ease-out;
          }
          
          .page-title {
            font-size: 2rem;
            font-weight: 700;
            margin-bottom: 1.5rem;
            color: var(--foreground);
          }
          
          .messages-container {
            display: grid;
            grid-template-columns: 1fr;
            gap: 1.5rem;
            height: calc(100vh - 10rem);
          }
          
          @media (min-width: 768px) {
            .messages-container {
              grid-template-columns: 1fr 2fr;
            }
          }
          
          .conversations-card, .chat-card {
            background-color: var(--card);
            border-radius: var(--radius);
            border: 1px solid var(--border);
            overflow: hidden;
            display: flex;
            flex-direction: column;
            height: 100%;
          }
          
          .card-header {
            padding: 1rem;
            border-bottom: 1px solid var(--border);
          }
          
          .chat-header {
            padding: 1rem;
          }
          
          .card-title {
            font-size: 1.25rem;
            font-weight: 600;
            margin: 0;
            color: var(--foreground);
          }
          
          .conversations-list {
            flex: 1;
            overflow-y: auto;
          }
          
          .conversation-item {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            padding: 0.75rem 1rem;
            border-bottom: 1px solid var(--border);
            cursor: pointer;
            transition: background-color 0.2s;
          }
          
          .conversation-item:hover {
            background-color: var(--muted);
          }
          
          .conversation-item.active {
            background-color: var(--accent);
          }
          
          .conversation-photo {
            width: 2.5rem;
            height: 2.5rem;
            border-radius: 9999px;
            overflow: hidden;
            flex-shrink: 0;
            background-color: var(--muted);
          }
          
          .conversation-photo img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
          
          .conversation-info {
            flex: 1;
            min-width: 0;
          }
          
          .conversation-name {
            font-weight: 500;
            margin: 0 0 0.25rem 0;
            color: var(--foreground);
          }
          
          .conversation-role {
            font-size: 0.75rem;
            margin: 0;
            color: var(--muted-foreground);
          }
          
          .chat-user {
            display: flex;
            align-items: center;
            gap: 0.75rem;
          }
          
          .messages-list {
            flex: 1;
            overflow-y: auto;
            padding: 1rem;
            display: flex;
            flex-direction: column;
            gap: 1rem;
          }
          
          .message-wrapper {
            display: flex;
          }
          
          .message-incoming {
            justify-content: flex-start;
          }
          
          .message-outgoing {
            justify-content: flex-end;
          }
          
          .message {
            max-width: 80%;
            padding: 0.75rem 1rem;
            border-radius: 1rem;
          }
          
          .message-incoming .message {
            background-color: var(--muted);
            border-top-left-radius: 0;
          }
          
          .message-outgoing .message {
            background-color: var(--primary);
            color: var(--primary-foreground);
            border-top-right-radius: 0;
          }
          
          .message-text {
            margin: 0 0 0.25rem 0;
            line-height: 1.5;
          }
          
          .message-time {
            margin: 0;
            font-size: 0.75rem;
            opacity: 0.7;
            text-align: right;
          }
          
          .message-form {
            display: flex;
            gap: 0.5rem;
            padding: 1rem;
            border-top: 1px solid var(--border);
          }
          
          .message-input {
            flex: 1;
            padding: 0.75rem 1rem;
            border-radius: 9999px;
            border: 1px solid var(--border);
            background-color: var(--background);
            color: var(--foreground);
          }
          
          .message-input:focus {
            outline: none;
            border-color: var(--primary);
          }
          
          .send-button {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 2.5rem;
            height: 2.5rem;
            border-radius: 9999px;
            background-color: var(--primary);
            color: var(--primary-foreground);
            border: none;
            cursor: pointer;
          }
          
          .send-button:hover {
            opacity: 0.9;
          }
          
          .sr-only {
            position: absolute;
            width: 1px;
            height: 1px;
            padding: 0;
            margin: -1px;
            overflow: hidden;
            clip: rect(0, 0, 0, 0);
            white-space: nowrap;
            border-width: 0;
          }
          
          @keyframes fadeIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }
        `}
      </style>
    </div>
  );
};

export default Messages;
