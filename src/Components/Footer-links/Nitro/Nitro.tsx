import { useState, useRef, useEffect } from "react";
import { Sun, Moon, Droplet, Star, Palette, Circle, Check } from "lucide-react";
import "./Nitro.css";
import "./Nitro-index.css";

const Nitro = () => {
  const cubeRef = useRef<HTMLDivElement>(null);
  const [isThemePopupOpen, setIsThemePopupOpen] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState("moon"); // Default theme
  const [tempSelectedTheme, setTempSelectedTheme] = useState("moon"); // For preview before applying

  const themes = [
    {
      name: "sun",
      displayName: "Sun",
      icon: <Sun size={18} />,
      emoji: "☀️",
      background: "linear-gradient(135deg, #FFF8DC 0%, #FFEFD5 100%)",
      cubeColor: "rgba(255, 215, 0, 0.2)",
      cubeBorder: "rgba(255, 215, 0, 0.5)",
    },
    {
      name: "moon",
      displayName: "Moon",
      icon: <Moon size={18} />,
      emoji: "🌙",
      background: "linear-gradient(135deg, #1E1E2E 0%, #301934 100%)",
      cubeColor: "rgba(138, 43, 226, 0.2)",
      cubeBorder: "rgba(138, 43, 226, 0.5)",
    },
    {
      name: "strawberry",
      displayName: "Strawberry",
      icon: <Circle size={18} className="text-pink-500" />,
      emoji: "🍓",
      background: "linear-gradient(135deg, #FF69B4 0%, #FF1493 100%)",
      cubeColor: "rgba(255, 105, 180, 0.2)",
      cubeBorder: "rgba(255, 105, 180, 0.5)",
    },
    {
      name: "watermelon",
      displayName: "Watermelon",
      icon: <Droplet size={18} className="text-green-500" />,
      emoji: "🍉",
      background: "linear-gradient(135deg, #90EE90 0%, #32CD32 100%)",
      cubeColor: "rgba(50, 205, 50, 0.2)",
      cubeBorder: "rgba(50, 205, 50, 0.5)",
    },
    {
      name: "mango",
      displayName: "Mango",
      icon: <Circle size={18} className="text-amber-500" />,
      emoji: "🥭",
      background: "linear-gradient(135deg, #FFD700 0%, #FFA500 100%)",
      cubeColor: "rgba(255, 165, 0, 0.2)",
      cubeBorder: "rgba(255, 165, 0, 0.5)",
    },
    {
      name: "banana",
      displayName: "Banana",
      icon: <Star size={18} className="text-yellow-300" />,
      emoji: "🍌",
      background: "linear-gradient(135deg, #FFFACD 0%, #FFEFD5 100%)",
      cubeColor: "rgba(255, 255, 0, 0.2)",
      cubeBorder: "rgba(255, 255, 0, 0.5)",
    },
    {
      name: "robot",
      displayName: "Robot",
      icon: <Circle size={18} className="text-blue-400" />,
      emoji: "🤖",
      background: "linear-gradient(135deg, #ADD8E6 0%, #6495ED 100%)",
      cubeColor: "rgba(100, 149, 237, 0.2)",
      cubeBorder: "rgba(100, 149, 237, 0.5)",
    },
    {
      name: "neon",
      displayName: "Neon",
      icon: <Palette size={18} className="text-cyan-500" />,
      emoji: "✨",
      background: "linear-gradient(135deg, #00FFFF 0%, #00FF00 100%)",
      cubeColor: "rgba(0, 255, 255, 0.2)",
      cubeBorder: "rgba(0, 255, 0, 0.5)",
    },
    {
      name: "alpha",
      displayName: "Alpha",
      icon: <Star size={18} className="text-purple-500" />,
      emoji: "🔮",
      background: "linear-gradient(135deg, #800080 0%, #4B0082 100%)",
      cubeColor: "rgba(138, 43, 226, 0.2)",
      cubeBorder: "rgba(138, 43, 226, 0.5)",
    },
    {
      name: "animal",
      displayName: "Animal",
      icon: <Droplet size={18} className="text-red-500" />,
      emoji: "🐾",
      background: "linear-gradient(135deg, #FF6347 0%, #FFA07A 100%)",
      cubeColor: "rgba(255, 127, 80, 0.2)",
      cubeBorder: "rgba(255, 127, 80, 0.5)",
    },
  ];

  useEffect(() => {
    // Apply the selected theme to the body
    document.body.className = selectedTheme;

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
  }, [selectedTheme]);

  const handleThemeClick = (themeName: string) => {
    setTempSelectedTheme(themeName);
  };

  const handleApplyTheme = () => {
    setSelectedTheme(tempSelectedTheme);
    setIsThemePopupOpen(false);
  };

  const currentTheme = themes.find((t) => t.name === selectedTheme);

  return (
    <div className={`ojn-container ${selectedTheme}`}>
      <div className="ojn-background"></div>

      <div className="ojn-glowing-orb ojn-orb-1"></div>
      <div className="ojn-glowing-orb ojn-orb-2"></div>

      <button
        className="ojn-theme-toggle"
        onClick={() => setIsThemePopupOpen(true)}
      >
        <span className="ojn-emoji-icon">{currentTheme?.emoji}</span>
      </button>

      <div className="ojn-content">
        <h1 className="ojn-heading">
          ONLYJOBS <span className="ojn-gradient-text">NITRO</span> LAUNCHING
          SOON
        </h1>

        <p className="ojn-subtitle">
          OnlyJobs Nitro redefines your experience with vibrant chat themes and
          sleek toggle options, giving you complete control over your aesthetics
          matching your vibe.
        </p>

        <div className="ojn-3d-container">
          <div className="ojn-cube-wrapper" ref={cubeRef}>
            <div className="ojn-cube-face">
              <span className="ojn-gradient-text">NITRO</span>
            </div>
            <div className="ojn-cube-face"></div>
            <div className="ojn-cube-face">
              <span className="ojn-gradient-text">NITRO</span>
            </div>
            <div className="ojn-cube-face">
              <span className="ojn-gradient-text">NITRO</span>
            </div>
            <div className="ojn-cube-face">
              <span className="ojn-gradient-text">NITRO</span>
            </div>
            <div className="ojn-cube-face">
              <span className="ojn-gradient-text">NITRO</span>
            </div>
          </div>
        </div>
        <h1 className="ojn-heading">
          ONLYJOBS <span className="ojn-gradient-text">NITRO</span> IS IN TEST
          MODE
        </h1>
      </div>

      {isThemePopupOpen && (
        <div className="ojn-theme-popup">
          <div className="ojn-popup-content">
            <h2 className="ojn-popup-title">Select Your Theme</h2>
            <div className="ojn-theme-grid">
              {themes.map((theme) => (
                <div
                  key={theme.name}
                  className={`ojn-theme-preview ${
                    theme.name === tempSelectedTheme ? "ojn-selected" : ""
                  }`}
                  onClick={() => handleThemeClick(theme.name)}
                  style={{ background: theme.background }}
                >
                  <div className="ojn-preview-content">
                    <div className="ojn-preview-header">
                      <span className="ojn-theme-emoji">{theme.emoji}</span>
                      <span className="ojn-theme-name">
                        {theme.displayName}
                      </span>
                      {theme.name === tempSelectedTheme && (
                        <Check size={16} className="ojn-check-icon" />
                      )}
                    </div>
                    <div className="ojn-preview-cube">
                      <div className="ojn-preview-cube-wrapper">
                        <div
                          className="ojn-preview-cube-face"
                          style={{
                            backgroundColor: theme.cubeColor,
                            borderColor: theme.cubeBorder,
                          }}
                        >
                          <span>NITRO</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="ojn-popup-buttons">
              <button className="ojn-select-button" onClick={handleApplyTheme}>
                Select
              </button>
              <button
                className="ojn-cancel-button"
                onClick={() => setIsThemePopupOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Nitro;
