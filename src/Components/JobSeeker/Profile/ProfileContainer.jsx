import { Link } from "react-router-dom";
import "./ProfileContainer.css";

const ProfileContainer = ({ userProfile }) => {
    return (
        <div className="profile-container">
            <div className="profile-card">
                <div className="profile-header">
                    <h2>Your Professional Profile</h2>
                    <p>Click below to view your complete profile</p>
                </div>

                <Link to="/profile" className="profile-link">
                    <div className="profile-image-wrapper">
                        <img
                            src={userProfile?.avatar || "./assets/pfp.jpeg"}
                            alt="Profile"
                            className="profile-image"
                        />
                        <div className="online-indicator"></div>
                    </div>
                    <div className="profile-info">
                        <h3>Yousf Abbasi</h3>
                        <p>{userProfile?.title || "Senior Frontend Developer"}</p>
                        <button className="view-profile-button">
                            View Full Profile
                        </button>
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default ProfileContainer; 