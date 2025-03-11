import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./ProfileLink.css";

const ProfileLink = ({ userProfile }) => {
    const navigate = useNavigate();

    const handleViewProfile = (e) => {
        e.preventDefault();
        navigate("/profile");
    };

    return (
        <div className="profile-link-container">
            <div className="profile-link">
                <div className="profile-image-wrapper">
                    <img
                        src={
                            userProfile.avatar ||
                            "https://randomuser.me/api/portraits/men/32.jpg"
                        }
                        alt="Profile"
                        className="profile-image"
                    />
                    <div className="online-indicator"></div>
                </div>
                <div className="profile-info">
                    <h3>{userProfile.name || "Alex Morgan"}</h3>
                    <p>{userProfile.title || "Senior Frontend Developer"}</p>
                    <button
                        className="view-profile-button"
                        onClick={handleViewProfile}
                    >
                        View Full Profile
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProfileLink;
