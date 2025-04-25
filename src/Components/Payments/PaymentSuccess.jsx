import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { Check, ArrowLeft, Mail } from "lucide-react";
import "./PaymentSuccess.css";

const PaymentSuccess = () => {
  const [confetti, setConfetti] = useState([]);
  const location = useLocation();
  const { email, planName, amount, paymentMethod } = location.state || {
    email: "",
    planName: "Premium Subscription",
    amount: 0,
    paymentMethod: "upi",
  };

  useEffect(() => {
    // Create confetti elements
    const confettiCount = 100;
    const tempConfetti = [];
    for (let i = 0; i < confettiCount; i++) {
      tempConfetti.push({
        id: i,
        x: Math.random() * 100,
        y: -10,
        size: Math.random() * 8 + 6,
        color: ["#6366f1", "#10b981", "#f59e0b", "#ef4444"][
          Math.floor(Math.random() * 4)
        ],
        rotation: Math.random() * 360,
        delay: Math.random() * 3,
        duration: Math.random() * 3 + 3,
      });
    }
    setConfetti(tempConfetti);
    // Send email notification (would be handled by the server in production)
    console.log(`Email notification would be sent to ${email}`);
  }, [email]);

  return (
    <div className="payment-success-page">
      {confetti.map((c) => (
        <div
          key={c.id}
          className="payment-success-confetti-piece"
          style={{
            left: `${c.x}vw`,
            width: `${c.size}px`,
            height: `${c.size}px`,
            backgroundColor: c.color,
            transform: `rotate(${c.rotation}deg)`,
            animationDelay: `${c.delay}s`,
            animationDuration: `${c.duration}s`,
          }}
        />
      ))}
      <div className="payment-success-card">
        <div className="payment-success-icon">
          <Check size={40} strokeWidth={3} />
        </div>
        <h1>Payment Successful!</h1>
        <p className="payment-success-message">
          Thank you for subscribing to {planName}. Your payment of ₹{amount} has
          been verified.
        </p>
        <div className="payment-success-details">
          <div className="payment-success-detail-item">
            <span className="payment-success-detail-label">Plan</span>
            <span className="payment-success-detail-value">{planName}</span>
          </div>
          <div className="payment-success-detail-item">
            <span className="payment-success-detail-label">Amount</span>
            <span className="payment-success-detail-value">₹{amount}</span>
          </div>
          <div className="payment-success-detail-item">
            <span className="payment-success-detail-label">Payment Method</span>
            <span className="payment-success-detail-value">
              {paymentMethod.charAt(0).toUpperCase() + paymentMethod.slice(1)}
            </span>
          </div>
          <div className="payment-success-detail-item">
            <span className="payment-success-detail-label">Status</span>
            <span className="payment-success-status-pending">
              <span className="payment-success-status-dot"></span>Pending
              Activation
            </span>
          </div>
        </div>
        <div className="payment-success-activation-info">
          <p>
            Your subscription will be activated within 2 days. We've sent a
            confirmation to {email}.
          </p>
          <p>
            If you have any questions, please contact us at{" "}
            <a href="mailto:onlyjobs.work@gmail.com">onlyjobs.work@gmail.com</a>
          </p>
        </div>
        <div className="payment-success-actions">
          <Link to="/" className="payment-success-back-button">
            <ArrowLeft size={16} />
            Back to Home
          </Link>
          <a href={`mailto:${email}`} className="payment-success-email-button">
            <Mail size={16} />
            Check Email
          </a>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
