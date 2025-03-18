import React, { useState, useEffect } from "react";
import { FaDownload, FaCopy } from "react-icons/fa";
import NavBar from "../Footer-NavBar/Footer-NavBar";
import "./Brand.css";
import logo from "../../../assets/onlyjobs-default-logo.png";
import blueLogo from "../../../assets/onlyjobs-darkBlue-logo.png";
import darkLogo from "../../../assets/onlyjobs-dark-logo.png";

const Branding = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [toastMessage, setToastMessage] = useState("");

  const logos = [
    { name: "Default Logo", src: logo },
    { name: "Blue Logo", src: blueLogo },
    { name: "Dark Logo", src: darkLogo },
  ];

  const colors = [
    { name: "Onlyjobs Blue", code: "#404eed" },
    { name: "Onlyjobs Pink", code: "#fe95f6" },
    { name: "Black", code: "#000000" },
  ];

  const copyToClipboard = (code) => {
    navigator.clipboard.writeText(code);
    setToastMessage(`Copied: ${code}`);
    setTimeout(() => setToastMessage(""), 3000);
  };

  return (
    <div className="ojn-branding-container">
      <NavBar />

      {/* Toast Notification */}
      {toastMessage && <div className="ojn-toast">{toastMessage}</div>}

      {/* Glowing orbs */}
      <div className="ojn-nitro-glowing-orb ojn-nitro-orb-1"></div>
      <div className="ojn-nitro-glowing-orb ojn-nitro-orb-2"></div>

      {/* Hero Section */}
      <section className="ojn-branding-hero">
        <h1 className="ojn-tc">
          OnlyJobs <br></br> Branding
        </h1>
        <p className="ojn-brand-subtitle">
          Download our official branding assets and color codes.
        </p>
      </section>

      {/* Logos Section */}
      <section className="ojn-branding-logos">
        <h2 className="ojn-section-title">Logos</h2>
        <div className="ojn-branding-logo-wrapper">
          {logos.map((logo, index) => (
            <div key={index} className="ojn-branding-logo-card">
              <div className="ojn-logo-image-container">
                <img
                  src={logo.src}
                  alt={logo.name}
                  className="ojn-logo-image"
                />
                <a
                  href={logo.src}
                  download
                  className="ojn-download-button"
                  aria-label={`Download ${logo.name}`}
                >
                  <FaDownload />
                </a>
              </div>
              <h3 className="ojn-logo-title">{logo.name}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* Color Palette Section */}
      <section className="ojn-branding-colors">
        <h2 className="ojn-section-title">Color Palette</h2>
        <div className="ojn-branding-color-wrapper">
          {colors.map((color, index) => (
            <div
              key={index}
              className="ojn-branding-color-card"
              style={{ backgroundColor: color.code }}
            >
              <div className="ojn-color-info">
                <span className="ojn-color-name">{color.name}</span>
                <span className="ojn-color-code">{color.code}</span>
              </div>
              <button
                className="ojn-copy-button"
                onClick={() => copyToClipboard(color.code)}
                aria-label={`Copy ${color.code}`}
              >
                <FaCopy />
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Branding;
