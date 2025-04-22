import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./RoleSelect.css";

function RoleSelect() {
    const [darkMode, setDarkMode] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        // Check for saved theme in localStorage
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme === "dark") {
          setDarkMode(true);
          document.documentElement.setAttribute("data-theme", "dark");
        } else {
          document.documentElement.setAttribute("data-theme", "light");
        }
      }, []);
    
      const toggleTheme = () => {
        const newDarkMode = !darkMode;
        setDarkMode(newDarkMode);
        localStorage.setItem("theme", newDarkMode ? "dark" : "light");
        document.documentElement.setAttribute(
          "data-theme",
          newDarkMode ? "dark" : "light"
        );
      };

    const handleRoleSelect = (role) => {
        if (role === "jobseeker") {
            navigate("/questions/jobseeker");
        } else if (role === "jobprovider") {
            navigate("/questions/jobprovider");
        }
    };

    return (
        <div className="role-select-page">
            <Link to="/" className="back-to-home">
                ← Back to Home
            </Link>

            {/* Theme toggle button */}
      <button
        onClick={toggleTheme}
        className="theme-button"
        style={{
          position: "absolute",
          top: "20px",
          right: "20px",
          background: "none",
          border: "none",
          cursor: "pointer",
          fontSize: "24px"
        }}
      >
        {darkMode ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="5"></circle>
            <line x1="12" y1="1" x2="12" y2="3"></line>
            <line x1="12" y1="21" x2="12" y2="23"></line>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
            <line x1="1" y1="12" x2="3" y2="12"></line>
            <line x1="21" y1="12" x2="23" y2="12"></line>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
          </svg>
        )}
      </button>

            <div className="role-selection-container">
                <h2 className="role-selection-title">Choose Your Path</h2>
                <p className="role-selection-subtitle">
                    Are you looking to hire or to be hired?
                </p>

                <div className="role-buttons">
                    <div
                        className="role-option"
                        onClick={() => handleRoleSelect("jobseeker")}
                    >
                        <div className="role-icon">👔</div>
                        <h3>Job Seeker</h3>
                        <p>
                            Find your dream job and connect with top Job Providers
                        </p>
                    </div>

                    <div
                        className="role-option"
                        onClick={() => handleRoleSelect("jobprovider")}
                    >
                        <div className="role-icon">💼</div>
                        <h3>Job Provider</h3>
                        <p>
                            Find the perfect candidates for your open positions
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RoleSelect;