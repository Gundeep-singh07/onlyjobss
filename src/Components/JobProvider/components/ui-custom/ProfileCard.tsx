import React, { useState } from "react";
import { Heart, X } from "lucide-react";

interface ProfileCardProps {
  profile: {
    id: string;
    name: string;
    photo: string;
    location: string;
    title: string;
    experience: string;
    skills: string[];
    bio: string;
  };
  onLike: () => void;
  onPass: () => void;
  showBadge: "like" | "pass" | null;
}

export function ProfileCard({
  profile,
  onLike,
  onPass,
  showBadge,
}: ProfileCardProps) {
  const [expanded, setExpanded] = useState(false);

  const toggleBio = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="profile-card">
      <div className="profile-image">
        <img src={profile.photo} alt={profile.name} />
        <div className="profile-image-overlay">
          <h2 className="profile-name">{profile.name}</h2>
          <p className="profile-title">{profile.title}</p>
        </div>
      </div>

      <div className="profile-content">
        <div className="profile-details">
          <div className="profile-meta">
            <span className="profile-location">{profile.location}</span>
            <span className="profile-experience">{profile.experience}</span>
          </div>

          <div className="profile-skills">
            {profile.skills.map((skill, index) => (
              <span key={index} className="profile-skill">
                {skill}
              </span>
            ))}
          </div>

          <div className="profile-bio-container">
            <p className={`profile-bio ${expanded ? "expanded" : ""}`}>
              {profile.bio}
            </p>
            {profile.bio.length > 120 && (
              <button onClick={toggleBio} className="read-more-button">
                {expanded ? "Read less" : "Read more"}
              </button>
            )}
          </div>
        </div>

        <div className="profile-actions">
          <button
            className="action-button pass-button"
            onClick={onPass}
            aria-label="Pass"
          >
            <X size={24} />
          </button>
          <button
            className="action-button like-button"
            onClick={onLike}
            aria-label="Like"
          >
            <Heart size={24} />
          </button>
        </div>
      </div>

      {showBadge === "like" && (
        <div className="profile-badge like-badge">LIKE</div>
      )}
      {showBadge === "pass" && (
        <div className="profile-badge pass-badge">NOPE</div>
      )}

      <style>
        {`
          .profile-card {
            position: relative;
            width: 100%;
            height: 100%;
            background-color: var(--card);
            border-radius: var(--radius);
            overflow: hidden;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
          }
          
          .profile-image {
            height: 50%;
            position: relative;
          }
          
          .profile-image img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
          
          .profile-image-overlay {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            padding: 1rem;
            background: linear-gradient(to top, rgba(0,0,0,0.7), transparent);
            color: white;
          }
          
          .profile-name {
            font-size: 1.5rem;
            font-weight: 600;
            margin: 0;
            margin-bottom: 0.25rem;
          }
          
          .profile-title {
            font-size: 0.875rem;
            margin: 0;
            opacity: 0.9;
          }
          
          .profile-content {
            height: 50%;
            padding: 1rem;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
          }
          
          .profile-meta {
            display: flex;
            align-items: center;
            gap: 1rem;
            font-size: 0.875rem;
            color: var(--muted-foreground);
            margin-bottom: 0.75rem;
          }
          
          .profile-location, .profile-experience {
            display: inline-flex;
            align-items: center;
          }
          
          .profile-skills {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
            margin-bottom: 0.75rem;
          }
          
          .profile-skill {
            display: inline-block;
            padding: 0.25rem 0.5rem;
            background-color: var(--secondary);
            color: var(--secondary-foreground);
            border-radius: 9999px;
            font-size: 0.75rem;
            font-weight: 500;
          }
          
          .profile-bio-container {
            position: relative;
          }
          
          .profile-bio {
            font-size: 0.875rem;
            line-height: 1.5;
            margin: 0;
            max-height: 3.5rem;
            overflow: hidden;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            transition: max-height 0.3s ease, -webkit-line-clamp 0.3s ease;
          }
          
          .profile-bio.expanded {
            max-height: 20rem;
            -webkit-line-clamp: unset;
          }
          
          .read-more-button {
            display: inline-block;
            background: none;
            border: none;
            color: var(--primary);
            font-size: 0.75rem;
            font-weight: 500;
            padding: 0;
            margin-top: 0.25rem;
            cursor: pointer;
          }
          
          .profile-actions {
            display: flex;
            justify-content: center;
            gap: 1rem;
            margin-top: 1rem;
          }
          
          .action-button {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 3rem;
            height: 3rem;
            border-radius: 50%;
            border: none;
            cursor: pointer;
            transition: transform 0.2s, background-color 0.2s;
          }
          
          .action-button:hover {
            transform: scale(1.05);
          }
          
          .pass-button {
            background-color: #f9f9f9;
            color: #666;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
          }
          
          .pass-button:hover {
            background-color: #efefef;
          }
          
          .like-button {
            background-color: #ff6b6b;
            color: white;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
          }
          
          .like-button:hover {
            background-color: #ff5252;
          }
          
          .profile-badge {
            position: absolute;
            font-size: 1.875rem;
            font-weight: 700;
            z-index: 10;
            padding: 0.5rem 1.5rem;
            border-width: 4px;
            border-style: solid;
            transform: rotate(12deg);
            top: 1.5rem;
          }
          
          .like-badge {
            right: 1.5rem;
            border-color: #ff6b6b;
            color: #ff6b6b;
          }
          
          .pass-badge {
            left: 1.5rem;
            border-color: #666;
            color: #666;
            transform: rotate(-12deg);
          }

          @media (prefers-color-scheme: dark) {
            .pass-button {
              background-color: #2a2a2a;
              color: #a1a1a1;
            }
            
            .pass-button:hover {
              background-color: #333333;
            }
          }
        `}
      </style>
    </div>
  );
}
