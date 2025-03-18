import React, { useState, useEffect } from "react";
import "./College.css";
import NavBar from "../Footer-NavBar/Footer-NavBar";

// SVG Icons
const Logo = () => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 4L3 9L12 14L21 9L12 4Z" fill="#4F46E5" />
    <path
      d="M3 14L12 19L21 14"
      stroke="#4F46E5"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const BellIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 22C13.1 22 14 21.1 14 20H10C10 21.1 10.9 22 12 22ZM18 16V11C18 7.93 16.36 5.36 13.5 4.68V4C13.5 3.17 12.83 2.5 12 2.5C11.17 2.5 10.5 3.17 10.5 4V4.68C7.63 5.36 6 7.92 6 11V16L4 18V19H20V18L18 16Z"
      fill="currentColor"
    />
  </svg>
);

const MessageIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2ZM20 16H5.17L4 17.17V4H20V16Z"
      fill="currentColor"
    />
  </svg>
);

const College = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Home");
  const [showNotification, setShowNotification] = useState(false);
  const [animateHero, setAnimateHero] = useState(false);

  useEffect(() => {
    // Scroll to top on component mount
    window.scrollTo(0, 0);

    setAnimateHero(true);

    // Show notification after 3 seconds
    const timer = setTimeout(() => {
      setShowNotification(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const collegeGroups = [
    {
      id: 1,
      name: "Computer Science",
      members: 2543,
      imageUrl: "/api/placeholder/80/80",
    },
    {
      id: 2,
      name: "Business Administration",
      members: 1890,
      imageUrl: "/api/placeholder/80/80",
    },
    {
      id: 3,
      name: "Engineering",
      members: 3120,
      imageUrl: "/api/placeholder/80/80",
    },
    {
      id: 4,
      name: "Liberal Arts",
      members: 1240,
      imageUrl: "/api/placeholder/80/80",
    },
    {
      id: 5,
      name: "Medical Sciences",
      members: 1785,
      imageUrl: "/api/placeholder/80/80",
    },
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: "Tech Career Fair",
      date: "March 25, 2025",
      time: "10:00 AM - 4:00 PM",
    },
    {
      id: 2,
      title: "Resume Workshop",
      date: "March 28, 2025",
      time: "2:00 PM - 4:00 PM",
    },
    {
      id: 3,
      title: "Networking Mixer",
      date: "April 2, 2025",
      time: "6:00 PM - 8:00 PM",
    },
  ];

  const jobPostings = [
    {
      id: 1,
      role: "Software Engineering Intern",
      company: "TechCorp",
      location: "Remote",
      posted: "2 days ago",
    },
    {
      id: 2,
      role: "Marketing Assistant",
      company: "BrandMasters",
      location: "New York, NY",
      posted: "1 day ago",
    },
    {
      id: 3,
      role: "Research Assistant",
      company: "SciLabs",
      location: "Boston, MA",
      posted: "3 days ago",
    },
    {
      id: 4,
      role: "Financial Analyst",
      company: "CapitalGroup",
      location: "Chicago, IL",
      posted: "Just now",
    },
  ];

  return (
    <div className="onlyjobs-app">
      <NavBar />
      {/* Notification */}
      {/* <div
        className={`onlyjobs-notification ${showNotification ? "show" : ""}`}
      >
        <div className="onlyjobs-notification-content">
          <BellIcon />
          <p>New job postings available in your field!</p>
          <button onClick={() => setShowNotification(false)}>×</button>
        </div>
      </div> */}

      <section className="branding-hero">
        <h1 className="ojn-b">
          OnlyJobs <br></br>College
        </h1>
        <p>A place where all talented college students learn & earn !</p>
      </section>

      {/* Main content */}
      <main className="onlyjobs-main-content">
        {/* Sidebar */}
        <aside className={`onlyjobs-sidebar ${isMenuOpen ? "open" : ""}`}>
          <div className="onlyjobs-sidebar-header">
            <h2>College Groups</h2>
          </div>
          <ul className="onlyjobs-sidebar-menu">
            {collegeGroups.map((group) => (
              <li key={group.id} className="onlyjobs-sidebar-item">
                <img src={group.imageUrl} alt={group.name} />
                <div className="onlyjobs-sidebar-item-info">
                  <h3>{group.name}</h3>
                  <p>{group.members.toLocaleString()} members</p>
                </div>
              </li>
            ))}
          </ul>
          <div className="onlyjobs-sidebar-footer">
            <button className="onlyjobs-primary-button">
              Create New Group
            </button>
          </div>
        </aside>

        {/* Page content */}
        <div className="onlyjobs-page-content">
          {/* Hero section */}
          <section className={`onlyjobs-hero ${animateHero ? "animate" : ""}`}>
            <div className="onlyjobs-hero-content">
              <h1>Welcome to OnlyJobs College</h1>
              <p>
                Connect with fellow students, find internships and job
                opportunities, and kickstart your career!
              </p>
              <div className="onlyjobs-hero-buttons">
                <button className="onlyjobs-primary-button">
                  Join College Group
                </button>
                <button className="onlyjobs-secondary-button">
                  Browse Jobs
                </button>
              </div>
            </div>
            <div className="onlyjobs-hero-image">
              <img
                src="/api/placeholder/500/300"
                alt="Students collaborating"
              />
            </div>
          </section>

          {/* Featured sections */}
          <div className="onlyjobs-featured-sections">
            {/* Job Postings */}
            <section className="onlyjobs-section onlyjobs-job-postings">
              <div className="onlyjobs-section-header">
                <h2>Latest Job Postings</h2>
                <button className="onlyjobs-text-button">View All</button>
              </div>
              <div className="onlyjobs-job-list">
                {jobPostings.map((job, index) => (
                  <div
                    key={job.id}
                    className="onlyjobs-job-card"
                    style={{ "--animation-order": index }}
                  >
                    <div className="onlyjobs-job-card-header">
                      <img src="/api/placeholder/50/50" alt={job.company} />
                      <div className="onlyjobs-job-info">
                        <h3>{job.role}</h3>
                        <p>{job.company}</p>
                      </div>
                    </div>
                    <div className="onlyjobs-job-card-footer">
                      <span className="onlyjobs-location">{job.location}</span>
                      <span className="onlyjobs-posted">{job.posted}</span>
                    </div>
                    <button className="onlyjobs-primary-button">
                      Apply Now
                    </button>
                  </div>
                ))}
              </div>
            </section>

            {/* Upcoming Events */}
            <section className="onlyjobs-section onlyjobs-events">
              <div className="onlyjobs-section-header">
                <h2>Upcoming Events</h2>
                <button className="onlyjobs-text-button">View Calendar</button>
              </div>
              <div className="onlyjobs-event-list">
                {upcomingEvents.map((event, index) => (
                  <div
                    key={event.id}
                    className="onlyjobs-event-card"
                    style={{ "--animation-order": index }}
                  >
                    <div className="onlyjobs-event-date">
                      <span className="day">
                        {event.date.split(",")[0].split(" ")[1]}
                      </span>
                      <span className="month">
                        {event.date.split(",")[0].split(" ")[0]}
                      </span>
                    </div>
                    <div className="onlyjobs-event-info">
                      <h3>{event.title}</h3>
                      <p>
                        {event.date}, {event.time}
                      </p>
                    </div>
                    <button className="onlyjobs-secondary-button">RSVP</button>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* College Resources */}
          <section className="onlyjobs-section onlyjobs-resources">
            <div className="onlyjobs-section-header">
              <h2>College Resources</h2>
            </div>
            <div className="onlyjobs-resources-grid">
              {[
                {
                  title: "Resume Templates",
                  desc: "Access industry-specific resume templates",
                },
                {
                  title: "Interview Prep",
                  desc: "Practice with mock interviews and tips",
                },
                {
                  title: "Career Guidance",
                  desc: "Explore career paths and opportunities",
                },
                {
                  title: "Networking Events",
                  desc: "Connect with industry professionals",
                },
              ].map((resource, index) => (
                <div
                  key={index}
                  className="onlyjobs-resource-card onlyjobs-hover-lift"
                  style={{ "--animation-order": index }}
                >
                  <img
                    src="/api/placeholder/80/80"
                    alt={`${resource.title} icon`}
                  />
                  <h3>{resource.title}</h3>
                  <p>{resource.desc}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default College;
