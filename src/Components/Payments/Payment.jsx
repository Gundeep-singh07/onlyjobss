import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  Sun,
  Moon,
  CreditCard,
  QrCode,
  Wallet,
  Smartphone,
  Landmark,
  ShieldCheck,
} from "lucide-react";
import "./Payment.css";

const Payment = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCVV] = useState("");
  const [upiId, setUpiId] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const location = useLocation();

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setDarkMode(true);
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      document.documentElement.setAttribute("data-theme", "light");
    }
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      setPaymentSuccess(true);

      setTimeout(() => {
        setPaymentSuccess(false);
        setCardNumber("");
        setCardName("");
        setExpiryDate("");
        setCVV("");
        setUpiId("");
      }, 3000);
    }, 2000);
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
              </div>
            )}

            {["upi", "paytm", "gpay", "phonepe"].includes(paymentMethod) && (
              <div className="upi-payment-form">
                <div className="qr-code-container">
                  <div className="fake-qr">
                    <QrCode size={100} strokeWidth={1.25} />
                  </div>
                  <p>
                    Scan with{" "}
                    {paymentMethod === "upi" ? "any UPI app" : paymentMethod}
                  </p>
                </div>

                <div className="form-group">
                  <label htmlFor="upiId">Or pay using UPI ID</label>
                  <input
                    type="text"
                    id="upiId"
                    placeholder="yourname@upi"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                  />
                </div>
              </div>
            )}

            <button
              type="submit"
              className={`payment-button ${isProcessing ? "processing" : ""} ${
                paymentSuccess ? "success" : ""
              }`}
              disabled={isProcessing || paymentSuccess}
            >
              {isProcessing ? (
                <div className="processing-indicator">
                  Processing<span>.</span>
                  <span>.</span>
                  <span>.</span>
                </div>
              ) : paymentSuccess ? (
                <div className="success-indicator">Payment Successful!</div>
              ) : (
                `Pay Now`
              )}
            </button>
          </form>
        </div>

        <div className="payment-summary">
          <h2>Order Summary</h2>
          <div className="summary-item">
            <span>Product</span>
            <span>Premium Subscription</span>
          </div>
          <div className="summary-item">
            <span>Duration</span>
            <span>1 Month</span>
          </div>
          <div className="summary-item">
            <span>Subtotal</span>
            <span>₹499</span>
          </div>
          <div className="summary-item">
            <span>Tax</span>
            <span>₹90</span>
          </div>
          <div className="summary-item total">
            <span>Total</span>
            <span>₹589</span>
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

      <div className="payment-footer">
        <p>© 2025 Your Company. All rights reserved.</p>
        <p>Secure payment processed by trusted payment gateways</p>
      </div>
    </div>
  );
};

export default Payment;
