import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  X,
  Home,
  User,
  Search,
  PlusCircle,
  MessageSquare,
  Settings,
} from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const location = useLocation();

  const navItems = [
    {
      path: "/dashboard",
      label: "Dashboard",
      icon: <Home className="nav-icon" />,
    },
    {
      path: "/dashboard/profile",
      label: "Profile",
      icon: <User className="nav-icon" />,
    },
    {
      path: "/dashboard/find-candidates",
      label: "Find Candidates",
      icon: <Search className="nav-icon" />,
    },
    {
      path: "/dashboard/post-job",
      label: "Post Job",
      icon: <PlusCircle className="nav-icon" />,
    },
    {
      path: "/dashboard/messages",
      label: "Messages",
      icon: <MessageSquare className="nav-icon" />,
    },
    {
      path: "/dashboard/settings",
      label: "Settings",
      icon: <Settings className="nav-icon" />,
    },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      <div className="sidebar-header">
        <h2 className="sidebar-title">OnlyJobs</h2>
        <button onClick={onClose} className="close-button">
          <X className="close-icon" />
        </button>
      </div>

      <nav className="sidebar-nav">
        <ul className="nav-list">
          {navItems.map((item) => (
            <li key={item.path} className="nav-item">
              <Link
                to={item.path}
                className={`nav-link ${isActive(item.path) ? "active" : ""}`}
                onClick={onClose}
              >
                {item.icon}
                <span className="nav-label">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="sidebar-footer">
        <p>© 2023 OnlyJobs</p>
      </div>

      <style>
        {`
          .sidebar {
            position: fixed;
            left: 0;
            top: 4rem;
            bottom: 0;
            width: 16rem;
            background-color: var(--sidebar-background);
            border-right: 1px solid var(--sidebar-border);
            transform: translateX(-100%);
            transition: transform 0.3s ease;
            z-index: 30;
            overflow-y: auto;
            display: flex;
            flex-direction: column;
          }
          
          .sidebar.open {
            transform: translateX(0);
            box-shadow: 4px 0 10px rgba(0, 0, 0, 0.1);
          }
          
          .sidebar-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 1rem 1.5rem;
            border-bottom: 1px solid var(--sidebar-border);
          }
          
          .sidebar-title {
            font-size: 1.25rem;
            font-weight: 700;
            color: var(--sidebar-foreground);
            margin: 0;
            background: linear-gradient(90deg, #404eed, #fe95f6);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }
          
          .close-button {
            background: none;
            border: none;
            cursor: pointer;
            display: flex;
            padding: 0.25rem;
            border-radius: 0.375rem;
            color: var(--sidebar-foreground);
            transition: background-color 0.2s ease, transform 0.2s ease;
          }
          
          .close-button:hover {
            background-color: var(--sidebar-accent);
            transform: scale(1.1);
          }
          
          .close-icon {
            width: 18px;
            height: 18px;
          }
          
          .sidebar-nav {
            padding: 1rem 0;
            flex: 1;
          }
          
          .nav-list {
            list-style-type: none;
            padding: 0;
            margin: 0;
          }
          
          .nav-item {
            margin-bottom: 0.25rem;
          }
          
          .nav-link {
            display: flex;
            align-items: center;
            padding: 0.75rem 1.5rem;
            color: var(--sidebar-foreground);
            text-decoration: none;
            transition: all 0.2s ease;
            border-radius: 0 1.5rem 1.5rem 0;
            margin-right: 1rem;
          }
          
          .nav-link:hover {
            background-color: var(--sidebar-accent);
            color: var(--sidebar-accent-foreground);
            transform: translateX(4px);
          }
          
          .nav-link.active {
            background-color: var(--sidebar-accent);
            color: var(--sidebar-accent-foreground);
            font-weight: 500;
            border-left: 3px solid #404eed;
          }
          
          [data-theme="dark"] .nav-link.active {
            border-left: 3px solid #fe95f6;
          }
          
          .nav-icon {
            display: flex;
            align-items: center;
            margin-right: 0.75rem;
            width: 20px;
            height: 20px;
          }
          
          .nav-label {
            font-size: 0.9rem;
          }
          
          .sidebar-footer {
            padding: 1rem 1.5rem;
            border-top: 1px solid var(--sidebar-border);
            text-align: center;
            font-size: 0.8rem;
            color: var(--sidebar-muted);
          }
          
          @media (min-width: 1024px) {
            .sidebar {
              transform: translateX(0);
              box-shadow: none;
            }
            
            .sidebar-header .close-button {
              display: none;
            }
          }
          
          @media (max-width: 1023px) {
            .sidebar {
              box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
            }
          }
        `}
      </style>
    </div>
  );
};
