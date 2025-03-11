// src/components/Login.js
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    // Function to validate email format
    const isValidEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Login submitted with:", email, password);

        // Redirect to feed after login
        navigate("/feed");
    };

    // Check if both email and password are valid
    const isFormValid = isValidEmail(email) && password.length > 0;

    return (
        <div className="login-page">
            <Link to="/" className="back-to-home">
                ← Back to Home
            </Link>

            <div className="floating-cards">
                <div className="card">
                    <div className="card-content">
                        <div className="card-title">New Income</div>
                        <div className="card-value">$40,832.32</div>
                        <div className="card-change">
                            ↑ 13.6% from last month
                        </div>
                    </div>
                </div>
                <div className="card">
                    <div className="card-content">
                        <div className="card-title">Impressions</div>
                        <div className="card-value">3,259</div>
                        <div className="card-change">
                            ↑ 6.22% from last month
                        </div>
                    </div>
                </div>
                <div className="card">
                    <div className="card-content">
                        <div className="card-title">New Users</div>
                        <div className="card-value">218</div>
                        <div className="card-change">
                            ↑ 8.2% from last month
                        </div>
                    </div>
                </div>
            </div>

            <div className="login-container">
                <div className="login-logo">
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                        <rect
                            width="32"
                            height="32"
                            rx="8"
                            fill="#5865f2"
                        ></rect>
                        <path
                            d="M8 16L14 22L24 12"
                            stroke="white"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        ></path>
                    </svg>
                    <h1>ONLY JOBS</h1>
                </div>

                <h2>Log in to ONLY JOBS</h2>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div className="remember-forgot">
                        <label className="remember-me">
                            <input type="checkbox" />
                            <span>Remember me</span>
                        </label>
                        <a href="#" className="forgot-password">
                            Forgot Password?
                        </a>
                    </div>

                    <button type="submit" className="sign-in-button" disabled={!isFormValid}>
                        Log in
                    </button>

                    <div className="divider">Or login with</div>

                    <div className="social-login">
                        <button type="button" className="social-button google">
                            <svg width="20" height="20" viewBox="0 0 20 20">
                                <path
                                    d="M18.171 8.368h-8.171v3.207h4.908c-0.376 2.247-2.159 3.207-4.908 3.207-2.881 0-5.248-2.367-5.248-5.248s2.367-5.248 5.248-5.248c1.201 0 2.379 0.411 3.305 1.158l2.435-2.435c-1.584-1.584-3.813-2.621-6.293-2.621-5.094 0-9.246 4.152-9.246 9.246s4.152 9.246 9.246 9.246c4.358 0 8.645-3.123 8.645-9.246 0-0.615-0.066-1.23-0.189-1.824z"
                                    fill="#4285f4"
                                ></path>
                            </svg>
                            Google
                        </button>
                        <button type="button" className="social-button apple">
                            <svg viewBox="0 0 24 24" width="24" height="24">
                                <path
                                    d="M16.125 0.863c0.857 1.058 1.429 2.52 1.286 3.978-1.237-0.076-2.753-0.834-3.643-1.894-0.795-0.927-1.49-2.421-1.303-3.846 1.377-0.118 2.781 0.705 3.66 1.762zM20.75 17.886c-0.423 0.929-0.624 1.344-1.165 2.163-0.757 1.147-1.825 2.572-3.149 2.584-1.178 0.011-1.479-0.715-3.074-0.706-1.594 0.007-1.928 0.722-3.106 0.711-1.323-0.013-2.334-1.301-3.091-2.447-2.122-3.214-2.346-6.984-1.035-8.994 0.928-1.425 2.59-2.327 4.097-2.327 1.541 0 2.508 0.718 3.779 0.718 1.236 0 1.99-0.719 3.772-0.719 1.345 0 2.77 0.733 3.784 1.994-3.322 1.819-2.778 6.558 0.188 7.023z"
                                    fill="currentColor"
                                ></path>
                            </svg>
                            Apple
                        </button>
                    </div>

                    <div className="signup-prompt">
                        Don't have an account?{" "}
                        <Link to="/questions" className="signup-link">
                            Sign Up now
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
