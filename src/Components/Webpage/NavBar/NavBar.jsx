import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import "./NavBar.css";
import logo from "../../../assets/logo-blue.png";
import logoDark from "../../../assets/logo-dark.png";

const NavBar = () => {
  const location = useLocation();
  const [darkMode, setDarkMode] = useState(false);
  const [isBookView, setIsBookView] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [hideLinks, setHideLinks] = useState(false);
  const lastScrollTop = useRef(0);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setDarkMode(true);
      document.documentElement.setAttribute("data-theme", "dark");
    }

    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;

      setIsScrolled(scrollTop > 10);
      setHideLinks(scrollTop > lastScrollTop.current && scrollTop > 50);

      lastScrollTop.current = scrollTop;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
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

  const navigate = useNavigate();

  const toggleView = () => {
    if (location.pathname === "/video") {
      navigate("/");
    } else {
      navigate("/video");
    }
  };

  if (location.pathname === "/login" || location.pathname === "/Questions") {
    return null;
  }

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className={`nav ${isScrolled ? "scrolled" : ""}`}>
      <Link to="/" className="logo">
        <img src={darkMode ? logoDark : logo} alt="OnlyJobs Logo" />
      </Link>

      <div className={`nav-links ${hideLinks ? "hidden" : ""}`}>
        <a
          href="#features"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection("features");
          }}
        >
          Features
        </a>
        <a
          href="#pricing"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection("pricing");
          }}
        >
          Pricing
        </a>
        <a
          href="#testimonials"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection("testimonials");
          }}
        >
          Success Stories
        </a>
        <a
          href="#numbers"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection("numbers");
          }}
        >
          Stats
        </a>
        <a
          href="#how-it-works"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection("how-it-works");
          }}
        >
          How It Works
        </a>
        <a
          href="#faq-section"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection("faq-section");
          }}
        >
          FAQ
        </a>
      </div>

      <div className="nav-buttons">
        <Link to="/login" className="button button-success">
          Log In
        </Link>
        <Link to="/questions" className="button button-success">
          Sign Up
        </Link>

        <button onClick={toggleTheme} className="theme-button">
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

        <button onClick={toggleView} className="theme-button">
          {isBookView ? (
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
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="3" y1="9" x2="21" y2="9"></line>
              <line x1="3" y1="15" x2="21" y2="15"></line>
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
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="9" y1="3" x2="9" y2="21"></line>
              <line x1="15" y1="3" x2="15" y2="21"></line>
            </svg>
          )}
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
