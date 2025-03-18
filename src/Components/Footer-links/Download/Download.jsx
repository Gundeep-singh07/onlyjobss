import React, { useState, useEffect } from "react";
import "./Download.css";
import NavBar from "../Footer-NavBar/Footer-NavBar";

// Error Boundary to prevent crashes
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("Error caught in boundary:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <h2 style={{ color: "red", textAlign: "center" }}>
          Something went wrong!
        </h2>
      );
    }
    return this.props.children;
  }
}

const OnlyJobsDownload = () => {
  // Countdown state
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Countdown logic
  useEffect(() => {
    window.scrollTo(0, 0);

    const targetDate = new Date("2025-06-14T00:00:00"); // June 14, 2025

    const updateCountdown = () => {
      const now = new Date();
      const difference = targetDate - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / (1000 * 60)) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      });
    };

    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <ErrorBoundary>
      <NavBar />

      <div className="onlyjobs-download-page">
        {/* Countdown Timer */}
        <section className="onlyjobs-countdown-section">
          <h2 className="onlyjobs-coming-soon">
            Launching Soon on All Platforms
          </h2>
          <p className="onlyjobs-dev-message">
            Our developers are working round the clock to bring you the ultimate
            job platform for college students.
          </p>

          <div className="onlyjobs-countdown-container">
            {Object.entries(timeLeft).map(([label, value]) => (
              <div className="onlyjobs-countdown-item" key={label}>
                <div className="onlyjobs-countdown-value">{value}</div>
                <div className="onlyjobs-countdown-label">
                  {label.charAt(0).toUpperCase() + label.slice(1)}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Download Section */}
        <section className="onlyjobs-download-section">
          <h1 className="onlyjobs-download-title">Download</h1>
          <p className="onlyjobs-download-subtitle">
            Be among the first to experience OnlyJobs
          </p>

          <div className="onlyjobs-download-buttons">
            {["Android", "iOS", "Desktop"].map((platform) => (
              <button
                key={platform}
                className={`onlyjobs-download-btn onlyjobs-btn-${platform.toLowerCase()}`}
              >
                <span>{platform}</span>
              </button>
            ))}
          </div>
        </section>
      </div>
    </ErrorBoundary>
  );
};

export default OnlyJobsDownload;
