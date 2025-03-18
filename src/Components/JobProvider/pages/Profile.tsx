import { useState } from "react";
import { Navbar } from "../components/layout/Navbar";
import { Sidebar } from "../components/layout/Sidebar";

const companyName = "Tech Innovations Inc.";

const Profile = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="profile-page">
      <Navbar toggleSidebar={toggleSidebar} companyName={companyName} />

      <div className="layout">
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />

        <main className="main-content animate-fade-in">
          <div className="profile-header">
            <h1 className="profile-title">Your Profile</h1>
            <p className="profile-subtitle">
              Manage your personal information and preferences
            </p>
          </div>

          <div className="profile-content">
            <div className="profile-card">
              <div className="profile-banner"></div>
              <div className="profile-avatar-container">
                <div className="profile-avatar">
                  <img
                    src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3"
                    alt="Profile"
                  />
                </div>
              </div>
              <div className="profile-info">
                <h2 className="profile-name">John Smith</h2>
                <p className="profile-role">HR Manager at {companyName}</p>
                <p className="profile-location">San Francisco, CA</p>
              </div>
              <div className="profile-actions">
                <button className="button button-default">Edit Profile</button>
                <button className="button button-outline">
                  View Public Profile
                </button>
              </div>
            </div>

            <div className="profile-sections">
              <div className="profile-section">
                <h3 className="section-title">Company Information</h3>
                <div className="info-grid">
                  <div className="info-item">
                    <label className="info-label">Company Name</label>
                    <p className="info-value">{companyName}</p>
                  </div>
                  <div className="info-item">
                    <label className="info-label">Industry</label>
                    <p className="info-value">Technology</p>
                  </div>
                  <div className="info-item">
                    <label className="info-label">Company Size</label>
                    <p className="info-value">50-100 employees</p>
                  </div>
                  <div className="info-item">
                    <label className="info-label">Founded</label>
                    <p className="info-value">2015</p>
                  </div>
                  <div className="info-item">
                    <label className="info-label">Website</label>
                    <p className="info-value">www.techinnovations.com</p>
                  </div>
                  <div className="info-item">
                    <label className="info-label">Email</label>
                    <p className="info-value">contact@techinnovations.com</p>
                  </div>
                </div>
              </div>

              <div className="profile-section">
                <h3 className="section-title">Company Description</h3>
                <p className="description-text">
                  Tech Innovations Inc. is a forward-thinking technology company
                  specializing in innovative solutions for businesses of all
                  sizes. We are dedicated to creating cutting-edge software that
                  helps our clients achieve their goals more efficiently. Our
                  team consists of passionate professionals who are experts in
                  their respective fields.
                </p>
              </div>

              <div className="profile-section">
                <h3 className="section-title">Active Job Postings</h3>
                <div className="job-list">
                  <div className="job-item">
                    <div className="job-details">
                      <h4 className="job-title">Frontend Developer</h4>
                      <p className="job-meta">Remote • Full-time</p>
                    </div>
                    <div className="job-stats">
                      <span className="job-stat">18 applicants</span>
                      <button className="button button-outline">View</button>
                    </div>
                  </div>
                  <div className="job-item">
                    <div className="job-details">
                      <h4 className="job-title">UX Designer</h4>
                      <p className="job-meta">San Francisco, CA • Full-time</p>
                    </div>
                    <div className="job-stats">
                      <span className="job-stat">7 applicants</span>
                      <button className="button button-outline">View</button>
                    </div>
                  </div>
                  <div className="job-item">
                    <div className="job-details">
                      <h4 className="job-title">Product Manager</h4>
                      <p className="job-meta">New York, NY • Full-time</p>
                    </div>
                    <div className="job-stats">
                      <span className="job-stat">12 applicants</span>
                      <button className="button button-outline">View</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      <style>
        {`
          .profile-page {
            min-height: 100vh;
            background-color: var(--background);
            color: var(--foreground);
          }
          
          .layout {
            display: flex;
            padding-top: 4rem;
            min-height: calc(100vh - 4rem);
          }
          
          .main-content {
            flex: 1;
            padding: 1.5rem;
            max-width: 1280px;
            margin: 0 auto;
          }
          
          .profile-header {
            margin-bottom: 2rem;
          }
          
          .profile-title {
            font-size: 1.875rem;
            font-weight: 700;
            margin-bottom: 0.5rem;
            color: var(--foreground);
          }
          
          .profile-subtitle {
            color: var(--muted-foreground);
            margin: 0;
          }
          
          .profile-content {
            display: grid;
            gap: 2rem;
          }
          
          .profile-card {
            background-color: var(--card);
            border-radius: var(--radius);
            border: 1px solid var(--border);
            overflow: hidden;
            position: relative;
          }
          
          .profile-banner {
            height: 8rem;
            background: linear-gradient(to right, #404eed, #fe95f6);
          }
          
          .profile-avatar-container {
            display: flex;
            justify-content: center;
            margin-top: -3rem;
            margin-bottom: 1rem;
          }
          
          .profile-avatar {
            width: 6rem;
            height: 6rem;
            border-radius: 9999px;
            border: 4px solid var(--background);
            overflow: hidden;
            background-color: var(--muted);
          }
          
          .profile-avatar img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
          
          .profile-info {
            padding: 0 2rem;
            text-align: center;
          }
          
          .profile-name {
            font-size: 1.5rem;
            font-weight: 700;
            margin-bottom: 0.5rem;
            color: var(--foreground);
          }
          
          .profile-role {
            color: var(--foreground);
            margin-bottom: 0.25rem;
          }
          
          .profile-location {
            color: var(--muted-foreground);
            font-size: 0.875rem;
            margin-bottom: 1.5rem;
          }
          
          .profile-actions {
            display: flex;
            gap: 1rem;
            padding: 0 2rem 2rem;
            justify-content: center;
          }
          
          .profile-sections {
            display: grid;
            gap: 2rem;
          }
          
          .profile-section {
            background-color: var(--card);
            border-radius: var(--radius);
            border: 1px solid var(--border);
            padding: 1.5rem;
          }
          
          .section-title {
            font-size: 1.25rem;
            font-weight: 600;
            margin-bottom: 1rem;
            color: var(--foreground);
          }
          
          .info-grid {
            display: grid;
            grid-template-columns: repeat(1, 1fr);
            gap: 1.5rem;
          }
          
          @media (min-width: 768px) {
            .info-grid {
              grid-template-columns: repeat(2, 1fr);
            }
          }
          
          .info-item {
            display: flex;
            flex-direction: column;
          }
          
          .info-label {
            font-size: 0.875rem;
            color: var(--muted-foreground);
            margin-bottom: 0.25rem;
          }
          
          .info-value {
            font-weight: 500;
            color: var(--foreground);
          }
          
          .description-text {
            line-height: 1.6;
            color: var(--foreground);
          }
          
          .job-list {
            display: flex;
            flex-direction: column;
            gap: 1rem;
          }
          
          .job-item {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 1rem;
            border-radius: var(--radius);
            border: 1px solid var(--border);
            transition: background-color 0.2s;
          }
          
          .job-item:hover {
            background-color: var(--muted);
          }
          
          .job-title {
            font-weight: 600;
            margin-bottom: 0.25rem;
            color: var(--foreground);
          }
          
          .job-meta {
            font-size: 0.875rem;
            color: var(--muted-foreground);
            margin: 0;
          }
          
          .job-stats {
            display: flex;
            align-items: center;
            gap: 1rem;
          }
          
          .job-stat {
            font-size: 0.875rem;
            color: var(--muted-foreground);
          }
          
          .button {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            border-radius: var(--radius);
            font-weight: 500;
            transition: all 0.2s ease;
            cursor: pointer;
            font-size: 0.875rem;
            height: 2.5rem;
            padding-left: 1rem;
            padding-right: 1rem;
          }
          
          .button-default {
            background-color: var(--primary);
            color: var(--primary-foreground);
            border: none;
          }
          
          .button-default:hover {
            opacity: 0.9;
          }
          
          .button-outline {
            background-color: transparent;
            border: 1px solid var(--border);
            color: var(--foreground);
          }
          
          .button-outline:hover {
            background-color: var(--muted);
          }
          
          .animate-fade-in {
            animation: fadeIn 0.3s ease-out;
          }
          
          @keyframes fadeIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }
        `}
      </style>
    </div>
  );
};

export default Profile;
