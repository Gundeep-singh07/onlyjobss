import { useState } from "react";
import { Navbar } from "../components/layout/Navbar";
import { Sidebar } from "../components/layout/Sidebar";
import { Link } from "react-router-dom";
import {
  BriefcaseIcon,
  Users,
  LineChart,
  Clock,
  ArrowRight,
} from "lucide-react";

const companyName = "Tech Innovations Inc.";

const recentActivity = [
  {
    type: "application",
    name: "Emily Johnson",
    role: "Frontend Developer",
    time: "2 hours ago",
  },
  {
    type: "interview",
    name: "Michael Chen",
    role: "Backend Developer",
    time: "1 day ago",
  },
  {
    type: "hired",
    name: "Jessica Taylor",
    role: "UI/UX Designer",
    time: "3 days ago",
  },
];

const stats = [
  {
    title: "Active Jobs",
    value: "12",
    icon: BriefcaseIcon,
    color: "stat-blue",
  },
  {
    title: "Total Applicants",
    value: "284",
    icon: Users,
    color: "stat-purple",
  },
  {
    title: "Interviews",
    value: "38",
    icon: Clock,
    color: "stat-amber",
  },
  {
    title: "Conversion Rate",
    value: "18%",
    icon: LineChart,
    color: "stat-green",
  },
];

const Index = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="dashboard-page">
      <Navbar toggleSidebar={toggleSidebar} companyName={companyName} />

      <div className="layout">
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />

        <main className="main-content">
          <div className="dashboard-header">
            <div>
              <h1 className="page-title">Welcome back!</h1>
              <p className="page-description">
                Here's what's happening with your job postings today.
              </p>
            </div>
            <div className="header-actions">
              <Link to="/post-job" className="button button-default">
                Post a Job
              </Link>
              <Link to="/find-candidates" className="button button-outline">
                Find Candidates
              </Link>
            </div>
          </div>

          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="stat-card"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="stat-header">
                  <h3 className="stat-title">{stat.title}</h3>
                  <div className={`stat-icon ${stat.color}`}>
                    <stat.icon className="icon" />
                  </div>
                </div>
                <div className="stat-value">{stat.value}</div>
              </div>
            ))}
          </div>

          <div className="dashboard-grid">
            {/* Recent Activity Card */}
            <div className="activity-card">
              <div className="card-header">
                <h2 className="card-title">Recent Activity</h2>
              </div>
              <div className="card-content">
                <div className="activity-list">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="activity-item">
                      <div className="activity-icon">
                        {activity.type === "application" && (
                          <Users className="icon" />
                        )}
                        {activity.type === "interview" && (
                          <Clock className="icon" />
                        )}
                        {activity.type === "hired" && (
                          <BriefcaseIcon className="icon" />
                        )}
                      </div>
                      <div className="activity-details">
                        <p className="activity-name">{activity.name}</p>
                        <p className="activity-role">{activity.role}</p>
                      </div>
                      <div className="activity-time">{activity.time}</div>
                      <ArrowRight className="activity-arrow" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Actions Card */}
            <div className="actions-card">
              <div className="card-header">
                <h2 className="card-title">Quick Actions</h2>
              </div>
              <div className="card-content">
                <div className="actions-list">
                  <Link to="/post-job" className="action-button">
                    <BriefcaseIcon className="action-icon" />
                    Post a New Job
                  </Link>
                  <Link to="/find-candidates" className="action-button">
                    <Users className="action-icon" />
                    Find Candidates
                  </Link>
                  <Link to="/messages" className="action-button">
                    <Clock className="action-icon" />
                    Schedule Interviews
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="dashboard-grid secondary-grid">
            {/* Job Listings Card */}
            <div className="jobs-card">
              <div className="card-header">
                <h2 className="card-title">Job Listings</h2>
              </div>
              <div className="card-content">
                <div className="jobs-list">
                  {["Frontend Developer", "UX Designer", "Product Manager"].map(
                    (job, index) => (
                      <div key={index} className="job-item">
                        <div className="job-info">
                          <p className="job-title">{job}</p>
                          <p className="job-applicants">
                            {index === 0
                              ? "18 applicants"
                              : index === 1
                              ? "7 applicants"
                              : "12 applicants"}
                          </p>
                        </div>
                        <button className="button button-text">View</button>
                      </div>
                    )
                  )}
                </div>
                <div className="view-all">
                  <Link to="/post-job" className="link">
                    View All Jobs
                  </Link>
                </div>
              </div>
            </div>

            {/* Candidate Matches Card */}
            <div className="candidates-card">
              <div className="card-header">
                <h2 className="card-title">Candidate Matches</h2>
              </div>
              <div className="card-content">
                <div className="candidates-list">
                  {["Emily Johnson", "Michael Chen", "David Kim"].map(
                    (candidate, index) => (
                      <div key={index} className="candidate-item">
                        <div className="candidate-details">
                          <div className="candidate-avatar">
                            {candidate.charAt(0)}
                          </div>
                          <div className="candidate-info">
                            <p className="candidate-name">{candidate}</p>
                            <p className="candidate-role">
                              {index === 0
                                ? "Frontend Developer"
                                : index === 1
                                ? "Backend Developer"
                                : "UI/UX Designer"}
                            </p>
                          </div>
                        </div>
                        <button className="button button-text">View</button>
                      </div>
                    )
                  )}
                </div>
                <div className="view-all">
                  <Link to="/find-candidates" className="link">
                    Find More Candidates
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      <style>
        {`
          .dashboard-page {
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
            width: 100%;
          }
          
          .dashboard-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 2rem;
            flex-wrap: wrap;
            gap: 1rem;
            animation: fadeIn 0.3s ease-out;
          }
          
          .page-title {
            font-size: 2rem;
            font-weight: 700;
            margin: 0 0 0.5rem 0;
            color: var(--foreground);
          }
          
          .page-description {
            color: var(--muted-foreground);
            margin: 0;
          }
          
          .header-actions {
            display: none;
            gap: 0.75rem;
          }
          
          @media (min-width: 640px) {
            .header-actions {
              display: flex;
            }
          }
          
          .stats-grid {
            display: grid;
            grid-template-columns: repeat(1, 1fr);
            gap: 1rem;
            margin-bottom: 2rem;
          }
          
          @media (min-width: 640px) {
            .stats-grid {
              grid-template-columns: repeat(2, 1fr);
            }
          }
          
          @media (min-width: 1024px) {
            .stats-grid {
              grid-template-columns: repeat(4, 1fr);
            }
          }
          
          .stat-card {
            background-color: var(--card);
            border-radius: var(--radius);
            border: 1px solid var(--border);
            padding: 1.25rem;
            overflow: hidden;
            transition: transform 0.2s, box-shadow 0.2s;
            animation: scaleIn 0.3s ease-out;
          }
          
          .stat-card:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
          }
          
          .stat-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 0.5rem;
          }
          
          .stat-title {
            font-size: 0.875rem;
            font-weight: 500;
            color: var(--muted-foreground);
            margin: 0;
          }
          
          .stat-icon {
            width: 2rem;
            height: 2rem;
            border-radius: 0.5rem;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          
          .stat-blue {
            background-color: rgba(79, 129, 232, 0.1);
            color: #4f81e8;
          }
          
          .stat-purple {
            background-color: rgba(168, 85, 247, 0.1);
            color: #a855f7;
          }
          
          .stat-amber {
            background-color: rgba(245, 158, 11, 0.1);
            color: #f59e0b;
          }
          
          .stat-green {
            background-color: rgba(34, 197, 94, 0.1);
            color: #22c55e;
          }
          
          .stat-value {
            font-size: 1.5rem;
            font-weight: 700;
            color: var(--foreground);
          }
          
          .dashboard-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 1rem;
            margin-bottom: 2rem;
          }
          
          @media (min-width: 768px) {
            .dashboard-grid {
              grid-template-columns: 2fr 1fr;
            }
            
            .secondary-grid {
              grid-template-columns: 1fr 1fr;
            }
          }
          
          .activity-card, .actions-card, .jobs-card, .candidates-card {
            background-color: var(--card);
            border-radius: var(--radius);
            border: 1px solid var(--border);
            overflow: hidden;
            transition: transform 0.2s, box-shadow 0.2s;
            animation: fadeIn 0.3s ease-out;
          }
          
          .activity-card:hover, .actions-card:hover, .jobs-card:hover, .candidates-card:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
          }
          
          .card-header {
            padding: 1.25rem 1.5rem;
            border-bottom: 1px solid var(--border);
          }
          
          .card-title {
            font-size: 1.125rem;
            font-weight: 600;
            margin: 0;
            color: var(--foreground);
          }
          
          .card-content {
            padding: 1.25rem 1.5rem;
          }
          
          .activity-list {
            display: flex;
            flex-direction: column;
            gap: 1rem;
          }
          
          .activity-item {
            display: flex;
            align-items: center;
            gap: 1rem;
            padding: 0.75rem;
            border-radius: var(--radius);
            transition: background-color 0.2s;
          }
          
          .activity-item:hover {
            background-color: var(--muted);
          }
          
          .activity-icon {
            width: 2.5rem;
            height: 2.5rem;
            border-radius: 9999px;
            background-color: rgba(79, 129, 232, 0.1);
            color: #4f81e8;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
          }
          
          .activity-details {
            flex: 1;
            min-width: 0;
          }
          
          .activity-name {
            font-weight: 500;
            margin: 0 0 0.25rem 0;
            color: var(--foreground);
          }
          
          .activity-role {
            font-size: 0.75rem;
            color: var(--muted-foreground);
            margin: 0;
          }
          
          .activity-time {
            font-size: 0.75rem;
            color: var(--muted-foreground);
            white-space: nowrap;
          }
          
          .activity-arrow {
            width: 1rem;
            height: 1rem;
            color: var(--muted-foreground);
            opacity: 0;
            transition: opacity 0.2s;
          }
          
          .activity-item:hover .activity-arrow {
            opacity: 1;
          }
          
          .actions-list {
            display: flex;
            flex-direction: column;
            gap: 0.75rem;
          }
          
          .action-button {
            display: flex;
            align-items: center;
            padding: 0.75rem 1rem;
            border-radius: var(--radius);
            border: 1px solid var(--border);
            background-color: var(--background);
            color: var(--foreground);
            text-decoration: none;
            transition: background-color 0.2s;
          }
          
          .action-button:hover {
            background-color: var(--muted);
          }
          
          .action-icon {
            margin-right: 0.75rem;
            width: 1rem;
            height: 1rem;
          }
          
          .jobs-list, .candidates-list {
            display: flex;
            flex-direction: column;
            gap: 0.75rem;
          }
          
          .job-item, .candidate-item {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0.75rem;
            border-radius: var(--radius);
            transition: background-color 0.2s;
          }
          
          .job-item:hover, .candidate-item:hover {
            background-color: var(--muted);
          }
          
          .job-info, .candidate-details {
            display: flex;
            flex-direction: column;
          }
          
          .candidate-details {
            display: flex;
            align-items: center;
            gap: 0.75rem;
          }
          
          .job-title, .candidate-name {
            font-weight: 500;
            margin: 0 0 0.25rem 0;
            color: var(--foreground);
          }
          
          .job-applicants, .candidate-role {
            font-size: 0.75rem;
            color: var(--muted-foreground);
            margin: 0;
          }
          
          .candidate-avatar {
            width: 2rem;
            height: 2rem;
            border-radius: 9999px;
            background-color: var(--muted);
            color: var(--muted-foreground);
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 500;
          }
          
          .view-all {
            margin-top: 1rem;
            text-align: center;
          }
          
          .link {
            color: var(--primary);
            text-decoration: none;
            font-weight: 500;
            font-size: 0.875rem;
          }
          
          .link:hover {
            text-decoration: underline;
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
            text-decoration: none;
          }
          
          .button-default:hover {
            opacity: 0.9;
          }
          
          .button-outline {
            background-color: transparent;
            border: 1px solid var(--border);
            color: var(--foreground);
            text-decoration: none;
          }
          
          .button-outline:hover {
            background-color: var(--muted);
          }
          
          .button-text {
            background: none;
            border: none;
            color: var(--primary);
            padding: 0;
            height: auto;
            font-weight: 500;
          }
          
          .button-text:hover {
            text-decoration: underline;
          }
          
          .icon {
            width: 1rem;
            height: 1rem;
          }
          
          @keyframes fadeIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }
          
          @keyframes scaleIn {
            from {
              transform: scale(0.98);
              opacity: 0;
            }
            to {
              transform: scale(1);
              opacity: 1;
            }
          }
        `}
      </style>
    </div>
  );
};

export default Index;
