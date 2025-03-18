import { useState } from "react";
import "./Newsletter.css";

const TickMark = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="60" // Width of the SVG
    height="60" // Height of the SVG
    viewBox="0 0 24 24"
    className="tick-mark"
  >
    <circle cx="12" cy="12" r="10" className="tick-circle" />
    <polyline
      points="17 8 9 16 6 12" // Adjusted points for the tick
      className="tick-line"
    />
  </svg>
);

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [showTick, setShowTick] = useState(false); // State to control tick visibility

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setMessage("");
    setShowTick(false); // Reset tick visibility

    try {
      const response = await fetch("http://localhost:3002/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage(" Subscription successful!");
        setShowTick(true); // Show tick on successful subscription
        setEmail("");
      } else {
        setMessage(`❌ ${data.error}`);
      }
    } catch (error) {
      setMessage("❌ Failed to subscribe. Try again.");
    }
  };

  return (
    <section className="newsletter">
      <h2 className="su">Stay Updated</h2>
      <p>Get the latest jobs and hiring trends delivered to your inbox</p>
      <form className="newsletter-form" onSubmit={handleSubscribe}>
        <input
          type="email"
          placeholder="Enter your email"
          className="newsletter-input"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit" className="button button-success">
          Subscribe
        </button>
      </form>
      <div className="success-message">
        {showTick && <TickMark />} {/* Show tick mark on success */}
        {message && <p className="newsletter-message">{message}</p>}
      </div>
    </section>
  );
};

export default Newsletter;
