import { useEffect, useState } from "react";
import "./About.css";
import NavBar from "../Footer-NavBar/Footer-NavBar";

// Import founder images (replace with your actual image paths when available)
import founder1Image from "../../../assets/gundeep.jpeg";
import founder2Image from "../../../assets/kabeer.jpg";
// Fix image path using proper import for local images
import founder3Image from "../../../assets/kanishk.jpeg";
const founder4Image = "/placeholder.svg";

const AboutPage = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  // Add theme state
  const [theme, setTheme] = useState(() => {
    // Initialize theme from localStorage or default to 'light'
    return localStorage.getItem("theme") || "light";
  });

  useEffect(() => {
    // Scroll to top when component is mounted
    window.scrollTo(0, 0);

    // Set the initial theme from localStorage
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      document.documentElement.setAttribute("data-theme", savedTheme);
      setTheme(savedTheme);
    }

    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrollPosition(scrollY);

      // Handle vertical line glow effect
      const lines = document.querySelectorAll(
        ".ojn-vertical-line, .ojn-vertical-line-second"
      );
      const scrollPercentage = Math.min(1, scrollY / 1000); // Adjust for scroll sensitivity

      lines.forEach((line) => {
        if (line instanceof HTMLElement) {
          // Only show the line when scrolling
          line.style.opacity = scrollY > 50 ? "1" : "0";
          line.style.boxShadow = `0 0 ${
            scrollPercentage * 50
          }px var(--ojn-accent-color)`;

          // Animate the line height based on scroll
          const lineHeight = Math.min(100, scrollPercentage * 100);
          line.style.height = `${lineHeight}vh`;
        }
      });

      // Handle arrow visibility
      const arrows = document.querySelectorAll(".ojn-scroll-arrow");
      arrows.forEach((arrow) => {
        if (arrow instanceof HTMLElement) {
          arrow.style.opacity = scrollY > 50 ? "0.7" : "0";
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Function to toggle theme
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  return (
    <div className="ojn-about-container">
      {/* Theme Toggle Button */}
      <NavBar theme={theme} toggleTheme={toggleTheme} />

      {/* Glowing orbs in background */}
      <div className="ojn-glowing-orb ojn-orb-1"></div>
      <div className="ojn-glowing-orb ojn-orb-2"></div>

      <section className="ojn-about-us">
        <h1 className="ojn-title-first">Founder's of </h1>
        <h1 className="ojn-title-main">OnlyJobs!</h1>
        <h1 className="ojn-title-last">Welcomes you!</h1>

        <div className="ojn-content-section">
          <h2>What we are?</h2>
          <p>
            At OnlyJobs, we believe that finding the right job should be a
            seamless and empowering experience. Our mission is to connect job
            seekers with their dream careers while providing employers with the
            best talent.
          </p>

          <h2>Our Mission</h2>
          <p>
            Our mission is simple: to make job searching and hiring{" "}
            <strong>easier, faster, and more effective</strong>. We strive to
            create a platform that supports individuals in their career
            development and empowers them with the right tools.
          </p>

          <h2>What We Offer</h2>
          <ul className="ojn-features-list">
            <li>
              <span className="ojn-feature-icon">🔥</span>
              <div className="ojn-feature-text">
                <strong>Comprehensive Job Listings:</strong>
                <span>Explore opportunities across multiple industries.</span>
              </div>
            </li>
            <li>
              <span className="ojn-feature-icon">⚡</span>
              <div className="ojn-feature-text">
                <strong>AI-Powered Job Recommendations:</strong>
                <span>Personalized suggestions based on your profile.</span>
              </div>
            </li>
            <li>
              <span className="ojn-feature-icon">📚</span>
              <div className="ojn-feature-text">
                <strong>Career Resources:</strong>
                <span>Resume tips, interview guides, and career advice.</span>
              </div>
            </li>
            <li>
              <span className="ojn-feature-icon">🚀</span>
              <div className="ojn-feature-text">
                <strong>Employer Solutions:</strong>
                <span>Helping businesses find top talent efficiently.</span>
              </div>
            </li>
          </ul>
        </div>
      </section>

      {/* Parallax Founders Section */}
      <section className="ojn-founders-section">
        <h2 className="ojn-section-title">Meet Our Founders</h2>
        <div className="ojn-founders-container">
          {/* Glowing Vertical Line with Arrow */}
          <div className="ojn-vertical-line"></div>
          <div className="ojn-scroll-arrow">⌄</div>

          {/* Founder 1 (Left) */}
          <div className="ojn-founder-card ojn-founder-left">
            <div className="ojn-founder-avatar">
              <img
                src={founder1Image}
                alt="Founder 1"
                className="ojn-founder-image"
              />
            </div>
            <div className="ojn-founder-info">
              <h3>Founder 1</h3>
              <span>Visionary & CEO</span>
            </div>
          </div>

          {/* Founder 2 (Right) */}
          <div className="ojn-founder-card ojn-founder-right">
            <div className="ojn-founder-avatar">
              <img
                src={founder2Image}
                alt="Founder 2"
                className="ojn-founder-image"
              />
            </div>
            <div className="ojn-founder-info">
              <h3>Founder 2</h3>
              <span>CTO & Tech Lead</span>
            </div>
          </div>
        </div>
      </section>

      {/* Second Founders Section */}
      <section className="ojn-founders-section ojn-section-second">
        <div className="ojn-founders-container">
          {/* Glowing Vertical Line with Arrow */}
          <div className="ojn-vertical-line-second"></div>

          {/* Founder 3 (Left) */}
          <div className="ojn-founder-card ojn-founder-left">
            <div className="ojn-founder-avatar">
              <img
                src={founder3Image}
                alt="Founder 3"
                className="ojn-founder-image"
              />
            </div>
            <div className="ojn-founder-info">
              <h3>Founder 3</h3>
              <span>Marketing Director</span>
            </div>
          </div>

          {/* Founder 4 (Right) */}
          <div className="ojn-founder-card ojn-founder-right">
            <div className="ojn-founder-avatar">
              <img
                src={founder4Image}
                alt="Founder 4"
                className="ojn-founder-image"
              />
            </div>
            <div className="ojn-founder-info">
              <h3>Founder 4</h3>
              <span>Head of Operations</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
