import React, { useEffect, useState } from "react";
import "./About.css";
import NavBar from "../Footer-NavBar/Footer-NavBar";
import Footer from "../../Webpage/Footer/Footer";

// Import founder images
// You'll need to replace these with your actual image paths
const founder1Image = "/path/to/founder1-image.jpg";
const founder2Image = "/path/to/founder2-image.jpg";
const founder3Image = "/path/to/founder3-image.jpg";
const founder4Image = "/path/to/founder4-image.jpg";

const AboutUs = () => {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    // Scroll to top when component is mounted
    window.scrollTo(0, 0);

    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrollPosition(scrollY);

      // Handle vertical line glow effect
      const lines = document.querySelectorAll(
        ".vertical-line, .vertical-line1"
      );
      const scrollPercentage = Math.min(1, scrollY / 1000); // Adjust for scroll sensitivity

      lines.forEach((line) => {
        if (line) {
          // Only show the line when scrolling
          line.style.opacity = scrollY > 50 ? "1" : "0";
          line.style.boxShadow = `0 0 ${
            scrollPercentage * 50
          }px rgba(255, 0, 127, 0.8)`;

          // Animate the line height based on scroll
          const lineHeight = Math.min(100, scrollPercentage * 100);
          line.style.height = `${lineHeight}vh`;
        }
      });

      // Handle arrow visibility
      const arrows = document.querySelectorAll(".ojn_scroll_arrow");
      arrows.forEach((arrow) => {
        if (arrow) {
          arrow.style.opacity = scrollY > 50 ? "1" : "0";
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="about-container">
      <NavBar />

      {/* Glowing orbs in background */}
      <div className="ojn_nitro-glowing-orb ojn_nitro-orb-1"></div>
      <div className="ojn_nitro-glowing-orb ojn_nitro-orb-2"></div>

      <div className="about-us">
        <h1 className="fowy">Founder's of </h1>
        <h1 className="ojn-abu">OnlyJobs!</h1>
        <h1 className="fowy-wy">Welcomes you!</h1>

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
        <ul>
          <li>
            <strong>🔥 Comprehensive Job Listings:</strong> Explore
            opportunities across multiple industries.
          </li>
          <li>
            <strong>⚡ AI-Powered Job Recommendations:</strong> Personalized
            suggestions based on your profile.
          </li>
          <li>
            <strong>📚 Career Resources:</strong> Resume tips, interview guides,
            and career advice.
          </li>
          <li>
            <strong>🚀 Employer Solutions:</strong> Helping businesses find top
            talent efficiently.
          </li>
        </ul>
      </div>

      {/* Parallax Founders Section */}
      <section className="founders-section">
        <h2>Meet Our Founders</h2>
        <div className="founders-container">
          {/* Glowing Vertical Line with Arrow */}
          <div className="vertical-line"></div>

          {/* Founder 1 (Left) */}
          <div className="founder-container">
            <div className="founder left">
              <div className="circle">
                <img
                  src={founder1Image}
                  alt="Founder 1"
                  className="ojn_founder_image"
                />
              </div>
              <p>
                Founder 1<br />
                <span>Visionary & CEO</span>
              </p>
            </div>
          </div>

          {/* Founder 2 (Right) */}
          <div className="founder-container">
            <div className="founder right">
              <div className="circle">
                <img
                  src={founder2Image}
                  alt="Founder 2"
                  className="ojn_founder_image"
                />
              </div>
              <p>
                Founder 2<br />
                <span>CTO & Tech Lead</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Parallax Founders Section 1*/}
      <section className="founders-section1">
        <div className="founders-container1">
          {/* Glowing Vertical Line with Arrow */}
          <div className="vertical-line1"></div>

          {/* Founder 3 (Left) */}
          <div className="founder-container1">
            <div className="founder1 left1">
              <div className="circle1">
                <img
                  src={founder3Image}
                  alt="Founder 3"
                  className="ojn_founder_image"
                />
              </div>
              <p>
                Founder 3<br />
                <span>Visionary & CEO</span>
              </p>
            </div>
          </div>

          {/* Founder 4 (Right) */}
          <div className="founder-container1">
            <div className="founder1 right1">
              <div className="circle1">
                <img
                  src={founder4Image}
                  alt="Founder 4"
                  className="ojn_founder_image"
                />
              </div>
              <p>
                Founder 4<br />
                <span>CTO & Tech Lead</span>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
