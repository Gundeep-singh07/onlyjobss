import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Sun,
  Moon,
  CreditCard,
  QrCode,
  Wallet,
  Smartphone,
  ShieldCheck,
  Check,
  AlertCircle,
} from "lucide-react";
import "./Payment.css";

import upiScanner from "../../assets/upi-scanner.jpeg";

const Payment = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCVV] = useState("");
  const [upiId, setUpiId] = useState("");
  const [utrNumber, setUtrNumber] = useState("");
  const [email, setEmail] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentError, setPaymentError] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  // Get plan data from location state
  const planName = location.state?.plan || "Premium Subscription";
  const planAmount = location.state?.amount || 499;
  const tax = Math.round(planAmount * 0.18); // 18% tax
  const totalAmount = planAmount + tax;

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setDarkMode(true);
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      document.documentElement.setAttribute("data-theme", "light");
    }
  }, [location.pathname]);

  const toggleTheme = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem("theme", newDarkMode ? "dark" : "light");
    document.documentElement.setAttribute(
      "data-theme",
      newDarkMode ? "dark" : "light"
    );
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(" ");
    } else {
      return value;
    }
  };

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    setPaymentError("");

    try {
      // For UPI payments with UTR validation
      if (["upi", "paytm", "gpay", "phonepe"].includes(paymentMethod)) {
        if (!utrNumber || !email) {
          throw new Error("Please enter UTR number and email");
        }

        const response = await fetch(
          "http://localhost:3009/api/verify-payment",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              utrNumber,
              email,
              planName,
              amount: totalAmount,
              paymentMethod,
            }),
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Payment verification failed");
        }

        // Payment successful
        setPaymentSuccess(true);
        setShowConfirmation(true);

        // Reset form after 5 seconds
        setTimeout(() => {
          navigate("/payment-success", {
            state: {
              email,
              planName,
              amount: totalAmount,
              paymentMethod,
            },
          });
        }, 3000);
      } else {
        // Simulate card payment processing
        setTimeout(() => {
          setPaymentSuccess(true);
          setShowConfirmation(true);

          // Reset form after delay
          setTimeout(() => {
            navigate("/payment-success", {
              state: {
                email: cardName,
                planName,
                amount: totalAmount,
                paymentMethod,
              },
            });
          }, 3000);
        }, 2000);
      }
    } catch (error) {
      setPaymentError(error.message);
      setPaymentSuccess(false);
    } finally {
      setIsProcessing(false);
    }
  };

  const getMethodIcon = (method) => {
    switch (method) {
      case "upi":
        return <QrCode size={24} />;
      case "paytm":
        return <Wallet size={24} />;
      case "gpay":
        return <Smartphone size={24} />;
      case "phonepe":
        return <Wallet size={24} />;
      case "credit":
        return <CreditCard size={24} />;
      case "debit":
        return <CreditCard size={24} />;
      default:
        return null;
    }
  };

  return (
    <div className="payment-container">
      <div className="theme-toggle" onClick={toggleTheme}>
        {darkMode ? <Sun size={24} /> : <Moon size={24} />}
      </div>

      {showConfirmation ? (
        <div className="payment-confirmation">
          <div className="confirmation-animation">
            <div className="check-circle">
              <Check size={60} strokeWidth={3} />
            </div>
          </div>
          <h2>Payment Successful!</h2>
          <p>Your subscription will be activated within 2 days.</p>
          <p>We've sent a confirmation to your email.</p>
          <p>For any queries, contact: onlyjobs.work@gmail.com</p>
        </div>
      ) : (
        <>
          <div className="payment-header">
            <h1>Secure Payment</h1>
            <p>Complete your payment securely using your preferred method</p>
          </div>

          <div className="payment-content">
            <div className="payment-methods">
              <h2>Select Payment Method</h2>
              <div className="payment-options">
                {["upi", "paytm", "gpay", "phonepe", "credit", "debit"].map(
                  (method) => (
                    <div
                      key={method}
                      className={`payment-option ${
                        paymentMethod === method ? "selected" : ""
                      }`}
                      onClick={() => setPaymentMethod(method)}
                    >
                      {getMethodIcon(method)}
                      <span>
                        {method.charAt(0).toUpperCase() + method.slice(1)}
                      </span>
                    </div>
                  )
                )}
              </div>

              <form className="payment-form" onSubmit={handlePaymentSubmit}>
                {(paymentMethod === "credit" || paymentMethod === "debit") && (
                  <div className="card-payment-form">
                    <div className="form-group">
                      <label htmlFor="cardNumber">Card Number</label>
                      <input
                        type="text"
                        id="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        value={cardNumber}
                        onChange={(e) =>
                          setCardNumber(formatCardNumber(e.target.value))
                        }
                        maxLength="19"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="cardName">Cardholder Name</label>
                      <input
                        type="text"
                        id="cardName"
                        placeholder="John Doe"
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="form-row">
                      <div className="form-group half">
                        <label htmlFor="expiryDate">Expiry Date</label>
                        <input
                          type="text"
                          id="expiryDate"
                          placeholder="MM/YY"
                          value={expiryDate}
                          onChange={(e) => setExpiryDate(e.target.value)}
                          maxLength="5"
                          required
                        />
                      </div>
                      <div className="form-group half">
                        <label htmlFor="cvv">CVV</label>
                        <input
                          type="password"
                          id="cvv"
                          placeholder="123"
                          value={cvv}
                          onChange={(e) => setCVV(e.target.value)}
                          maxLength="4"
                          required
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">Email Address</label>
                      <input
                        type="email"
                        id="email"
                        placeholder="your@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                )}

                {["upi", "paytm", "gpay", "phonepe"].includes(
                  paymentMethod
                ) && (
                  <div className="upi-payment-form">
                    <div className="qr-code-container">
                      <div className="qr-code">
                        {/* Replace the QrCode component with an actual image */}
                        <img
                          id="upi-scanner"
                          src={upiScanner}
                          alt={`${paymentMethod} QR code`}
                          width={180}
                          height={180}
                        />

                        {/* Keep QrCode as fallback if you don't have an image */}
                        {/* <QrCode size={180} strokeWidth={1.25} /> */}
                      </div>
                      <p>
                        Scan with{" "}
                        {paymentMethod === "upi"
                          ? "any UPI app"
                          : paymentMethod}
                      </p>
                    </div>
                    <div className="form-group">
                      <label htmlFor="utrNumber">UTR Number / Ref ID</label>
                      <input
                        type="text"
                        id="utrNumber"
                        placeholder="Enter UTR number after payment"
                        value={utrNumber}
                        onChange={(e) => setUtrNumber(e.target.value)}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">Email Address</label>
                      <input
                        type="email"
                        id="email"
                        placeholder="your@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                )}

                {paymentError && (
                  <div className="payment-error">
                    <AlertCircle size={16} />
                    <span>{paymentError}</span>
                  </div>
                )}

                <button
                  type="submit"
                  className={`payment-button ${
                    isProcessing ? "processing" : ""
                  } ${paymentSuccess ? "success" : ""}`}
                  disabled={isProcessing || paymentSuccess}
                >
                  {isProcessing ? (
                    <div className="processing-indicator">
                      Processing<span>.</span>
                      <span>.</span>
                      <span>.</span>
                    </div>
                  ) : paymentSuccess ? (
                    <div className="success-indicator">Payment Verified!</div>
                  ) : (
                    `Verify Payment`
                  )}
                </button>
              </form>
            </div>

            <div className="payment-summary">
              <h2>Order Summary</h2>
              <div className="summary-item">
                <span>Product</span>
                <span>{planName}</span>
              </div>
              <div className="summary-item">
                <span>Duration</span>
                <span>1 Month</span>
              </div>
              <div className="summary-item">
                <span>Subtotal</span>
                <span>₹{planAmount}</span>
              </div>
              <div className="summary-item">
                <span>Tax</span>
                <span>₹{tax}</span>
              </div>
              <div className="summary-item total">
                <span>Total</span>
                <span>₹{totalAmount}</span>
              </div>
              <div className="secure-payment-info">
                <div className="secure-icon">
                  <ShieldCheck size={20} />
                </div>
                <div className="secure-text">
                  <p>Secure Encrypted Payment</p>
                  <span>Your payment information is secure</span>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      <div className="payment-footer">
        <p>© 2025 OnlyJobs. All rights reserved.</p>
        <p>Secure payment processed by trusted payment gateways</p>
      </div>
    </div>
  );
};

export default Payment;
