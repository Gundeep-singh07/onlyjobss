import { useLocation, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "./NotFound.css";

const NotFound = () => {
  const location = useLocation();
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Log the 404 error
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );

    // Check for saved theme in localStorage
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setDarkMode(true);
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      document.documentElement.setAttribute("data-theme", "light");
    }
  }, [location.pathname]);

  const toggleTheme = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem("theme", newDarkMode ? "dark" : "light");
    document.documentElement.setAttribute(
      "data-theme",
      newDarkMode ? "dark" : "light"
    );
  };

  return (
    <div className="not-found-container">
      {/* Background decoration */}
      <div className="background-decoration">
        <div className="blob-container">
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path
              fill="#404eed"
              d="M40.5,-70.3C51.9,-64.6,60.3,-52.1,67.4,-39C74.5,-25.9,80.3,-12.9,79.9,-0.2C79.6,12.5,73.1,25,64.7,35.8C56.4,46.6,46.1,55.5,34.5,62.8C22.8,70.1,9.9,75.7,-3.4,80.4C-16.7,85.1,-33.4,88.8,-41.7,80.5C-50,72.3,-50,52.1,-53.7,37.9C-57.4,23.7,-64.7,15.6,-71.3,3.8C-77.9,-8,-83.8,-23.5,-78.5,-34C-73.2,-44.4,-56.7,-49.9,-42.2,-54.3C-27.8,-58.8,-15.3,-62.2,0,-62.3C15.3,-62.3,29.1,-76,40.5,-70.3Z"
              transform="translate(100 100)"
            />
          </svg>
        </div>
      </div>

      <div className="content-container">

        {/* 404 symbol */}
        <div className="error-symbol">
          <div className="error-code">
            404
          </div>
        </div>

        {/* Error messages */}
        <h1 className="error-title">
          Page not found
        </h1>

        {/* Decorative elements */}
        <div className="decorative-elements">
          <span className="line"></span>
          <span className="dot"></span>
          <span className="line"></span>
        </div>

        {/* Home button */}
        <Link to="/" className="home-button">
          <span className="button-content">Back to Home</span>
          <span className="button-background">
            <span className="button-gradient"></span>
          </span>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;