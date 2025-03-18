import { useState } from "react";
import { Navbar } from "../components/layout/Navbar";
import { Sidebar } from "../components/layout/Sidebar";

const Settings = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("account");

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSaveSettings = () => {
    alert("Settings saved successfully!");
  };

  return (
    <div className="min-h-screen">
      <Navbar toggleSidebar={toggleSidebar} />

      <div className="layout">
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />

        <main className="main-content animate-fade-in">
          <h1 className="settings-title">Settings</h1>

          <div className="tabs">
            <div className="tabs-list">
              <button
                className={`tab ${activeTab === "account" ? "active" : ""}`}
                onClick={() => setActiveTab("account")}
              >
                Account
              </button>
              <button
                className={`tab ${
                  activeTab === "notifications" ? "active" : ""
                }`}
                onClick={() => setActiveTab("notifications")}
              >
                Notifications
              </button>
              <button
                className={`tab ${activeTab === "privacy" ? "active" : ""}`}
                onClick={() => setActiveTab("privacy")}
              >
                Privacy
              </button>
            </div>

            <div
              className={`tab-content ${
                activeTab === "account" ? "active" : ""
              }`}
            >
              <div className="settings-card">
                <div className="card-header">
                  <h2 className="card-title">Account Information</h2>
                  <p className="card-description">
                    Update your account details and company information
                  </p>
                </div>
                <div className="card-content">
                  <div className="form-grid">
                    <div className="form-group">
                      <label htmlFor="companyName" className="form-label">
                        Company Name
                      </label>
                      <input
                        id="companyName"
                        className="form-input"
                        defaultValue="OnlyJobs Inc."
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email" className="form-label">
                        Email Address
                      </label>
                      <input
                        id="email"
                        type="email"
                        className="form-input"
                        defaultValue="info@onlyjobs.com"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="phone" className="form-label">
                        Phone Number
                      </label>
                      <input
                        id="phone"
                        className="form-input"
                        defaultValue="(555) 123-4567"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="website" className="form-label">
                        Website
                      </label>
                      <input
                        id="website"
                        className="form-input"
                        defaultValue="www.onlyjobs.com"
                      />
                    </div>
                  </div>
                  <Button
                    variant="default"
                    className="save-button"
                    onClick={handleSaveSettings}
                  >
                    Save Changes
                  </Button>
                </div>
              </div>

              <div className="settings-card">
                <div className="card-header">
                  <h2 className="card-title">Change Password</h2>
                  <p className="card-description">
                    Update your password to keep your account secure
                  </p>
                </div>
                <div className="card-content">
                  <div className="form-stack">
                    <div className="form-group">
                      <label htmlFor="currentPassword" className="form-label">
                        Current Password
                      </label>
                      <input
                        id="currentPassword"
                        type="password"
                        className="form-input"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="newPassword" className="form-label">
                        New Password
                      </label>
                      <input
                        id="newPassword"
                        type="password"
                        className="form-input"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="confirmPassword" className="form-label">
                        Confirm New Password
                      </label>
                      <input
                        id="confirmPassword"
                        type="password"
                        className="form-input"
                      />
                    </div>
                  </div>
                  <Button
                    variant="default"
                    className="save-button"
                    onClick={() => alert("Password updated successfully!")}
                  >
                    Update Password
                  </Button>
                </div>
              </div>

              <div className="settings-card danger-zone">
                <div className="card-header">
                  <h2 className="card-title">Danger Zone</h2>
                  <p className="card-description">
                    Irreversible actions for your account
                  </p>
                </div>
                <div className="card-content">
                  <div className="danger-action">
                    <div className="danger-info">
                      <h3 className="danger-title">Delete Account</h3>
                      <p className="danger-description">
                        This will permanently delete your account and all
                        associated data
                      </p>
                    </div>
                    <Button
                      variant="destructive"
                      onClick={() =>
                        alert("This action requires additional confirmation")
                      }
                    >
                      Delete Account
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div
              className={`tab-content ${
                activeTab === "notifications" ? "active" : ""
              }`}
            >
              <div className="settings-card">
                <div className="card-header">
                  <h2 className="card-title">Notification Preferences</h2>
                  <p className="card-description">
                    Configure when and how you receive notifications
                  </p>
                </div>
                <div className="card-content">
                  <div className="notification-settings">
                    <div className="notification-option">
                      <div className="notification-info">
                        <label
                          htmlFor="emailNotifications"
                          className="notification-label"
                        >
                          Email Notifications
                        </label>
                        <p className="notification-description">
                          Receive email notifications for important updates
                        </p>
                      </div>
                      <label className="switch">
                        <input
                          id="emailNotifications"
                          type="checkbox"
                          defaultChecked
                        />
                        <span className="switch-slider"></span>
                      </label>
                    </div>

                    <div className="notification-option">
                      <div className="notification-info">
                        <label
                          htmlFor="applicationNotifications"
                          className="notification-label"
                        >
                          New Applications
                        </label>
                        <p className="notification-description">
                          Notify when a candidate applies to your job posting
                        </p>
                      </div>
                      <label className="switch">
                        <input
                          id="applicationNotifications"
                          type="checkbox"
                          defaultChecked
                        />
                        <span className="switch-slider"></span>
                      </label>
                    </div>

                    <div className="notification-option">
                      <div className="notification-info">
                        <label
                          htmlFor="messageNotifications"
                          className="notification-label"
                        >
                          New Messages
                        </label>
                        <p className="notification-description">
                          Notify when you receive a message from a candidate
                        </p>
                      </div>
                      <label className="switch">
                        <input
                          id="messageNotifications"
                          type="checkbox"
                          defaultChecked
                        />
                        <span className="switch-slider"></span>
                      </label>
                    </div>

                    <div className="notification-option">
                      <div className="notification-info">
                        <label
                          htmlFor="matchNotifications"
                          className="notification-label"
                        >
                          Candidate Matches
                        </label>
                        <p className="notification-description">
                          Notify when we find potential candidate matches
                        </p>
                      </div>
                      <label className="switch">
                        <input
                          id="matchNotifications"
                          type="checkbox"
                          defaultChecked
                        />
                        <span className="switch-slider"></span>
                      </label>
                    </div>

                    <div className="notification-option">
                      <div className="notification-info">
                        <label
                          htmlFor="marketingNotifications"
                          className="notification-label"
                        >
                          Marketing & Promotions
                        </label>
                        <p className="notification-description">
                          Receive marketing emails and special promotions
                        </p>
                      </div>
                      <label className="switch">
                        <input id="marketingNotifications" type="checkbox" />
                        <span className="switch-slider"></span>
                      </label>
                    </div>
                  </div>
                  <Button
                    variant="default"
                    className="save-button"
                    onClick={handleSaveSettings}
                  >
                    Save Preferences
                  </Button>
                </div>
              </div>
            </div>

            <div
              className={`tab-content ${
                activeTab === "privacy" ? "active" : ""
              }`}
            >
              <div className="settings-card">
                <div className="card-header">
                  <h2 className="card-title">Privacy Settings</h2>
                  <p className="card-description">
                    Control your privacy and visibility settings
                  </p>
                </div>
                <div className="card-content">
                  <div className="privacy-settings">
                    <div className="privacy-option">
                      <div className="privacy-info">
                        <label
                          htmlFor="profileVisibility"
                          className="privacy-label"
                        >
                          Profile Visibility
                        </label>
                        <p className="privacy-description">
                          Make your company profile visible to job seekers
                        </p>
                      </div>
                      <label className="switch">
                        <input
                          id="profileVisibility"
                          type="checkbox"
                          defaultChecked
                        />
                        <span className="switch-slider"></span>
                      </label>
                    </div>

                    <div className="privacy-option">
                      <div className="privacy-info">
                        <label
                          htmlFor="jobListingVisibility"
                          className="privacy-label"
                        >
                          Job Listing Visibility
                        </label>
                        <p className="privacy-description">
                          Make your job listings visible in search results
                        </p>
                      </div>
                      <label className="switch">
                        <input
                          id="jobListingVisibility"
                          type="checkbox"
                          defaultChecked
                        />
                        <span className="switch-slider"></span>
                      </label>
                    </div>

                    <div className="privacy-option">
                      <div className="privacy-info">
                        <label htmlFor="dataSharing" className="privacy-label">
                          Data Sharing
                        </label>
                        <p className="privacy-description">
                          Allow sharing anonymous data for improving services
                        </p>
                      </div>
                      <label className="switch">
                        <input
                          id="dataSharing"
                          type="checkbox"
                          defaultChecked
                        />
                        <span className="switch-slider"></span>
                      </label>
                    </div>

                    <div className="privacy-option">
                      <div className="privacy-info">
                        <label
                          htmlFor="twoFactorAuth"
                          className="privacy-label"
                        >
                          Two-Factor Authentication
                        </label>
                        <p className="privacy-description">
                          Add an extra layer of security to your account
                        </p>
                      </div>
                      <label className="switch">
                        <input id="twoFactorAuth" type="checkbox" />
                        <span className="switch-slider"></span>
                      </label>
                    </div>
                  </div>
                  <Button
                    variant="default"
                    className="save-button"
                    onClick={handleSaveSettings}
                  >
                    Save Settings
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      <style>
        {`
          .settings-title {
            font-size: 1.875rem;
            font-weight: 700;
            margin-bottom: 1.5rem;
            background: linear-gradient(90deg, var(--onlyjobs-blue), var(--onlyjobs-pink));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }
          
          .tabs {
            width: 100%;
          }
          
          .tabs-list {
            display: flex;
            max-width: 32rem;
            width: 100%;
            margin-bottom: 2rem;
            border-bottom: 1px solid var(--border);
            position: relative;
          }
          
          .tab {
            flex: 1;
            padding: 0.75rem 0;
            border: none;
            background: none;
            font-size: 0.875rem;
            font-weight: 500;
            color: var(--foreground);
            cursor: pointer;
            position: relative;
            transition: all 0.3s ease;
          }
          
          .tab:hover {
            color: var(--primary);
          }
          
          .tab.active {
            color: var(--primary);
          }
          
          .tab.active::after {
            content: '';
            position: absolute;
            bottom: -1px;
            left: 0;
            width: 100%;
            height: 2px;
            background: linear-gradient(90deg, var(--onlyjobs-blue), var(--onlyjobs-pink));
            border-radius: 4px 4px 0 0;
          }
          
          .tab-content {
            display: none;
            padding-bottom: 3rem;
          }
          
          .tab-content.active {
            display: block;
            animation: fadeIn 0.3s ease-out;
          }
          
          .settings-card {
            background-color: var(--card);
            border-radius: var(--radius);
            border: 1px solid var(--border);
            margin-bottom: 1.5rem;
            transition: all 0.3s;
            overflow: hidden;
          }
          
          .settings-card:hover {
            box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
            transform: translateY(-4px);
          }
          
          .card-header {
            padding: 1.5rem 1.5rem 0;
          }
          
          .card-title {
            font-size: 1.25rem;
            font-weight: 600;
            margin-bottom: 0.5rem;
          }
          
          .card-description {
            color: var(--muted-foreground);
            font-size: 0.875rem;
          }
          
          .card-content {
            padding: 1.5rem;
          }
          
          .form-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 1rem;
            margin-bottom: 1.5rem;
          }
          
          @media (min-width: 768px) {
            .form-grid {
              grid-template-columns: repeat(2, 1fr);
            }
          }
          
          .form-stack {
            display: flex;
            flex-direction: column;
            gap: 1rem;
            margin-bottom: 1.5rem;
          }
          
          .form-group {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
          }
          
          .danger-zone {
            border-color: rgba(239, 68, 68, 0.2);
          }
          
          .danger-zone .card-title {
            color: var(--destructive);
          }
          
          .danger-action {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 1rem;
            border: 1px solid var(--border);
            border-radius: var(--radius);
          }
          
          .danger-info {
            flex: 1;
          }
          
          .danger-title {
            font-weight: 500;
            margin-bottom: 0.25rem;
            color: var(--destructive);
          }
          
          .danger-description {
            font-size: 0.875rem;
            color: var(--muted-foreground);
          }
          
          .save-button {
            margin-top: 1rem;
            background: linear-gradient(90deg, var(--onlyjobs-blue), var(--onlyjobs-pink));
            transition: all 0.3s ease;
          }
          
          .save-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(64, 78, 237, 0.3);
            filter: brightness(1.1);
          }
          
          .notification-settings, .privacy-settings {
            display: flex;
            flex-direction: column;
            gap: 1rem;
            margin-bottom: 1.5rem;
          }
          
          .notification-option, .privacy-option {
            display: flex;
            align-items: flex-start;
            justify-content: space-between;
            padding: 0.75rem;
            border-radius: var(--radius);
            transition: background-color 0.2s ease;
          }
          
          .notification-option:hover, .privacy-option:hover {
            background-color: var(--accent);
          }
          
          .notification-info, .privacy-info {
            flex: 1;
          }
          
          .notification-label, .privacy-label {
            font-size: 1rem;
            font-weight: 500;
            display: block;
            margin-bottom: 0.25rem;
          }
          
          .notification-description, .privacy-description {
            font-size: 0.875rem;
            color: var(--muted-foreground);
          }
        `}
      </style>
    </div>
  );
};

export default Settings;
