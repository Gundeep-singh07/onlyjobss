import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MenuIcon, Bell, MessageSquare, User, Sun, Moon } from "lucide-react";
import { useTheme } from "../providers/ThemeProvider";

interface NavbarProps {
  toggleSidebar: () => void;
  companyName?: string; // Made optional to maintain backward compatibility
}
export const Navbar = ({
  toggleSidebar,
  companyName = "OnlyJobs",
}: NavbarProps) => {
  const [notifications] = useState(3);
  const [messages] = useState(5);
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-left">
          <button onClick={toggleSidebar} className="menu-button">
            <MenuIcon />
          </button>
          <Link to="/dashboard" className="logo-link">
            {companyName}
          </Link>
        </div>

        <div className="navbar-right">
          <button className="theme-toggle" onClick={toggleTheme}>
            {theme === "dark" ? (
              <Sun className="icon" />
            ) : (
              <Moon className="icon" />
            )}
          </button>

          <div className="nav-item">
            <div className="icon-container">
              <Bell className="icon" />
              {notifications > 0 && (
                <span className="badge">{notifications}</span>
              )}
            </div>
          </div>

          <div className="nav-item">
            <div className="icon-container">
              <MessageSquare className="icon" />
              {messages > 0 && <span className="badge">{messages}</span>}
            </div>
          </div>

          <Link to="/dashboard/profile" className="nav-item">
            <div className="profile-container">
              <User className="icon" />
            </div>
          </Link>
        </div>
      </div>

      <style>
        {`
          .navbar {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            height: 4rem;
            background-color: var(--card);
            border-bottom: 1px solid var(--border);
            z-index: 40;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          }
          
          .navbar-container {
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 100%;
            padding: 0 1.5rem;
          }
          
          .navbar-left {
            display: flex;
            align-items: center;
            gap: 1rem;
          }
          
          .menu-button {
            background: none;
            border: none;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 0.5rem;
            border-radius: 0.375rem;
            color: var(--foreground);
            transition: background-color 0.2s ease;
          }
          
          .menu-button:hover {
            background-color: var(--accent);
          }
          
          .logo-link {
            font-weight: 700;
            font-size: 1.5rem;
            color: #404eed;
            text-decoration: none;
            transition: color 0.2s ease;
          }
          
          [data-theme="dark"] .logo-link {
            color: #fe95f6;
          }
          
          .navbar-right {
            display: flex;
            align-items: center;
            gap: 1.5rem;
          }
          
          .nav-item {
            position: relative;
            cursor: pointer;
            color: var(--foreground);
          }
          
          .icon-container {
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 0.5rem;
            border-radius: 50%;
            background-color: transparent;
            transition: background-color 0.2s ease;
          }
          
          .icon-container:hover {
            background-color: var(--accent);
          }
          
          .icon {
            width: 20px;
            height: 20px;
          }
          
          .badge {
            position: absolute;
            top: -5px;
            right: -5px;
            background-color: #fe95f6;
            color: white;
            border-radius: 9999px;
            font-size: 0.75rem;
            width: 1.25rem;
            height: 1.25rem;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
          }
          
          .profile-container {
            width: 2rem;
            height: 2rem;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: var(--accent);
            color: var(--foreground);
            transition: background-color 0.2s ease, transform 0.2s ease;
          }
          
          .profile-container:hover {
            background-color: var(--accent);
            transform: scale(1.05);
          }
          
          .theme-toggle {
            background: none;
            border: none;
            cursor: pointer;
            color: var(--foreground);
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 0.5rem;
            border-radius: 50%;
            transition: background-color 0.2s ease, transform 0.2s ease;
          }
          
          .theme-toggle:hover {
            background-color: var(--accent);
            transform: scale(1.05);
          }
        `}
      </style>
    </nav>
  );
};
