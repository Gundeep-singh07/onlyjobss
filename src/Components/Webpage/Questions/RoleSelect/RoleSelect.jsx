import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./RoleSelect.css";

function RoleSelect() {
    const navigate = useNavigate();

    const handleRoleSelect = (role) => {
        if (role === "jobseeker") {
            navigate("/questions/jobseeker");
        } else if (role === "employer") {
            navigate("/questions/employer");
        }
    };

    return (
        <div className="role-select-page">
            <Link to="/" className="back-to-home">
                ← Back to Home
            </Link>

            <div className="role-selection-container">
                <h2 className="role-selection-title">Choose Your Path</h2>
                <p className="role-selection-subtitle">
                    Are you looking to hire or to be hired?
                </p>

                <div className="role-buttons">
                    <div
                        className="role-option"
                        onClick={() => handleRoleSelect("jobseeker")}
                    >
                        <div className="role-icon">👔</div>
                        <h3>Job Seeker</h3>
                        <p>
                            Find your dream job and connect with top employers
                        </p>
                    </div>

                    <div
                        className="role-option"
                        onClick={() => handleRoleSelect("employer")}
                    >
                        <div className="role-icon">💼</div>
                        <h3>Employer</h3>
                        <p>
                            Find the perfect candidates for your open positions
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RoleSelect;
