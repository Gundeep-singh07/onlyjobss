// src/Components/Webpage/Footer/Footer.jsx
import React, { useState, useEffect, useRef } from "react";
import "./Footer.css";
import { FaTwitter, FaInstagram, FaFacebook, FaYoutube } from "react-icons/fa"; // Import icons from react-icons
import { Link } from "react-router-dom";
import logoDark from "../../../assets/logo-dark.png"; // Import the dark logo

const Footer = () => {
  // State for custom dropdown
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState({
    code: "en-US",
    name: "English, USA",
    flag: "🇺🇸",
  });
  const dropdownRef = useRef(null);

  // Languages data
  const languages = [
    { code: "en-US", name: "English, USA", flag: "🇺🇸" },
    { code: "es-ES", name: "Español", flag: "🇪🇸" },
    { code: "fr-FR", name: "Français", flag: "🇫🇷" },
    { code: "de-DE", name: "Deutsch", flag: "🇩🇪" },
    { code: "ja-JP", name: "日本語", flag: "🇯🇵" },
    { code: "zh-CN", name: "中文", flag: "🇨🇳" },
    { code: "ko-KR", name: "한국어", flag: "🇰🇷" },
    { code: "ru-RU", name: "Русский", flag: "🇷🇺" },
    { code: "pt-BR", name: "Português, Brasil", flag: "🇧🇷" },
    { code: "it-IT", name: "Italiano", flag: "🇮🇹" },
  ];

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle language selection
  const selectLanguage = (language) => {
    setSelectedLanguage(language);
    setIsOpen(false);
  };

  return (
    <footer>
      <div className="footer-content">
        <div className="footer-left">
          <div className="footer-logo">
            <Link to="/">
              <img src={logoDark} alt="OnlyJobs Logo" className="logo" />
            </Link>
          </div>

          <div className="language-selector">
            <h5>LANGUAGE</h5>
            <div
              className={`custom-dropdown ${isOpen ? "active" : ""}`}
              ref={dropdownRef}
            >
              <div
                className="selected-option"
                onClick={() => setIsOpen(!isOpen)}
              >
                <span>
                  {selectedLanguage.flag} {selectedLanguage.name}
                </span>
              </div>
              <div className={`options-container ${isOpen ? "active" : ""}`}>
                {languages.map((language) => (
                  <div
                    key={language.code}
                    className="option"
                    onClick={() => selectLanguage(language)}
                  >
                    <span className="flag">{language.flag}</span>
                    <span>{language.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="social-links">
            <a
              href="https://twitter.com"
              className="social-icon"
              aria-label="Twitter"
            >
              <FaTwitter />
            </a>
            <a
              href="https://instagram.com"
              className="social-icon"
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>
            <a
              href="https://facebook.com"
              className="social-icon"
              aria-label="Facebook"
            >
              <FaFacebook />
            </a>
            <a
              href="https://youtube.com"
              className="social-icon"
              aria-label="Youtube"
            >
              <FaYoutube />
            </a>
          </div>
        </div>

        <div className="footer-right">
          <div className="footer-links-grid">
            <div className="footer-column">
              <h4>Product</h4>
              <ul>
                <li>
                  <Link to="/download">Download</Link>
                </li>
                <li>
                  <Link to="/nitro">Nitro</Link>
                </li>
              </ul>
            </div>

            <div className="footer-column">
              <h4>Company</h4>
              <ul>
                <li>
                  <Link to="/about-us">About</Link>
                </li>
                <li>
                  <Link to="/brand">Brand</Link>
                </li>
                <li>
                  <Link to="/jobs">Jobs</Link>
                </li>
                <li>
                  <Link to="/acknowledgements">Acknowledgements</Link>
                </li>
              </ul>
            </div>

            <div className="footer-column">
              <h4>Resources</h4>
              <ul>
                <li>
                  <Link to="/college">College</Link>
                </li>
                <li>
                  <Link to="/support">Support</Link>
                </li>

                <li>
                  <Link to="/blog">Blog</Link>
                </li>
                <li>
                  <Link to="/feedback">Feedback</Link>
                </li>
              </ul>
            </div>

            <div className="footer-column">
              <h4>Policies</h4>
              <ul>
                <li>
                  <Link to="/terms">Terms</Link>
                </li>
                <li>
                  <Link to="/privacy">Privacy</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-bottom-content">
          <h1 className="onlyJobs">OnlyJobs</h1>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
