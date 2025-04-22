import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./ProfileLink.css";
import pfp from "../../../assets/pfp.png";

const ProfileLink = () => {
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
                            pfp
                        }
                        alt="Profile"
                        className="profile-image"
                    />
                    <div className="online-indicator"></div>
                </div>
                <div className="profile-info">
                    <h3>{"Yousuf Abbasi"}</h3>
                    <p>{"Senior Frontend Developer"}</p>
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
