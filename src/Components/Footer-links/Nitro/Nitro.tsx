import React, { useEffect, useRef } from "react";
import "./Nitro.css";
import NavBar from "../Footer-NavBar/Footer-NavBar";
import Newsletter from "../../Webpage/Newsletter/Newsletter";

const Nitro: React.FC = () => {
  const cubeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to top on component mount
    window.scrollTo(0, 0);

    // Mouse move event for 3D cube rotation
    const handleMouseMove = (e: MouseEvent) => {
      if (!cubeRef.current) return;

      const cubeWrapper = cubeRef.current;
      const rect = cubeWrapper.getBoundingClientRect();

      // Calculate the center of the cube
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Calculate how far the mouse is from the center
      const deltaX = (e.clientX - centerX) / 20;
      const deltaY = (e.clientY - centerY) / 20;

      // Apply rotation based on mouse position
      cubeWrapper.style.transform = `rotateY(${deltaX}deg) rotateX(${-deltaY}deg)`;
    };

    // Use passive event listener for better performance
    document.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="nitro-container">
      <NavBar />
      <div className="nitro-background"></div>

      <div className="nitro-glowing-orb nitro-orb-1"></div>
      <div className="nitro-glowing-orb nitro-orb-2"></div>

      <div className="nitro-content">
        <h1 className="nitro-heading">
          ONLYJOBS <span className="nitro-text">NITRO</span> LAUNCHING SOON
        </h1>

        <p className="nitro-subtitle">
          OnlyJobs Nitro redefines your experience with vibrant chat themes and
          sleek toggle options, giving you complete control over your aesthetics
          matching your vibe.
        </p>

        <div className="nitro-3d-container">
          <div className="nitro-cube-wrapper" ref={cubeRef}>
            <div className="nitro-cube-face">
              <span className="nitro-text">NITRO</span>
            </div>
            <div className="nitro-cube-face"></div>
            <div className="nitro-cube-face">
              <span className="nitro-text">NITRO</span>
            </div>
            <div className="nitro-cube-face">
              <span className="nitro-text">NITRO</span>
            </div>
            <div className="nitro-cube-face">
              <span className="nitro-text">NITRO</span>
            </div>
            <div className="nitro-cube-face">
              <span className="nitro-text">NITRO</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nitro;
