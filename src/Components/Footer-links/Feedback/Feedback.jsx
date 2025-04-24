import React, { useState, useEffect } from "react";
import { Send, MessageSquare, ThumbsUp } from "lucide-react";
import styles from "./Feedback.module.css"; // Change to CSS module import

const Feedback = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(0);
  const [feedbacks, setFeedbacks] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // API base URL - adjust this to match your server
  const API_URL = "http://localhost:3007";

  // Fetch existing feedback on component mount
  useEffect(() => {
    fetchFeedbacks();
    // Check system preference for dark mode
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    setDarkMode(prefersDark);
    // Instead of modifying the document, we'll keep track of the theme internally
  }, []);

  const fetchFeedbacks = async () => {
    try {
      const response = await fetch(`${API_URL}/api/feedback`);
      if (response.ok) {
        const data = await response.json();
        setFeedbacks(data);
      } else {
        console.error("Failed to fetch feedbacks:", response.statusText);
      }
    } catch (err) {
      console.error("Failed to fetch feedbacks:", err);
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Input validation
    if (!name || !email || !message || rating === 0) {
      setError("Please fill in all fields and select a rating.");
      setTimeout(() => setError(""), 3000);
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      setTimeout(() => setError(""), 3000);
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch(`${API_URL}/api/feedback`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          message,
          rating,
        }),
      });

      if (response.ok) {
        setSuccess("Thank you for your feedback!");
        setTimeout(() => setSuccess(""), 3000);
        // Reset form
        setName("");
        setEmail("");
        setMessage("");
        setRating(0);
        // Refresh feedbacks
        fetchFeedbacks();
      } else {
        const errorData = await response.json();
        setError(
          errorData.message || "Something went wrong. Please try again."
        );
        setTimeout(() => setError(""), 3000);
      }
    } catch (err) {
      setError("Failed to submit feedback. Please try again later.");
      setTimeout(() => setError(""), 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className={`${styles.feedbackContainer} ${
        darkMode ? styles.darkMode : ""
      }`}
    >
      <div className={styles.feedbackHeader}>
        <h1 className={styles.animatedTitle}>We Value Your Feedback</h1>
        <p>Help us improve by sharing your thoughts and experiences</p>
      </div>
      <div className={styles.feedbackContent}>
        <div className={styles.feedbackFormContainer}>
          <form onSubmit={handleSubmit} className={styles.feedbackForm}>
            <div className={styles.formGroup}>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your Name"
                className={styles.inputField}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your Email"
                className={styles.inputField}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Your Feedback"
                className={`${styles.inputField} ${styles.textarea}`}
              />
            </div>
            <div className={styles.formGroup}>
              <label>Rating</label>
              <div className={styles.ratingContainer}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={`${styles.star} ${
                      rating >= star ? styles.selected : ""
                    }`}
                    onClick={() => setRating(star)}
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>
            {error && <div className={styles.errorMessage}>{error}</div>}
            {success && <div className={styles.successMessage}>{success}</div>}
            <button
              type="submit"
              className={styles.submitButton}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit Feedback"}
              <Send size={18} className={styles.icon} />
            </button>
          </form>
        </div>
        <div className={styles.feedbackDisplay}>
          <h2>
            <MessageSquare size={20} className={styles.icon} /> Recent Feedback
          </h2>
          {feedbacks.length === 0 ? (
            <p className={styles.noFeedback}>
              No feedback submitted yet. Be the first!
            </p>
          ) : (
            <div className={styles.feedbackList}>
              {feedbacks.map((item) => (
                <div key={item._id} className={styles.feedbackItem}>
                  <div className={styles.feedbackItemHeader}>
                    <span className={styles.feedbackName}>{item.name}</span>
                    <div className={styles.feedbackRating}>
                      {[...Array(item.rating)].map((_, i) => (
                        <span
                          key={i}
                          className={`${styles.star} ${styles.selected}`}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                    <span className={styles.feedbackDate}>
                      {new Date(item.date).toLocaleDateString()}
                    </span>
                  </div>
                  <p className={styles.feedbackMessage}>{item.message}</p>
                  <div className={styles.feedbackReactions}>
                    <button className={styles.reactionBtn}>
                      <ThumbsUp size={16} /> Helpful
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Feedback;
