import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./JobSeekerProfile.css";

const JobSeekerProfile = () => {
    const [activeTab, setActiveTab] = useState("about");

    // User profile data
    const userProfile = {
        name: "Alex Morgan",
        title: "Senior Frontend Developer",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg",
        location: "San Francisco, CA",
        connections: 842,
        bio: "Passionate frontend developer with 8+ years of experience building responsive and user-friendly web applications. Specialized in React, TypeScript, and modern JavaScript frameworks. Looking for challenging opportunities to create impactful digital experiences.",
        skills: [
            { name: "React", level: "Expert", color: "#61dafb" },
            { name: "JavaScript", level: "Expert", color: "#f7df1e" },
            { name: "TypeScript", level: "Advanced", color: "#3178c6" },
            { name: "HTML/CSS", level: "Expert", color: "#e34c26" },
            { name: "Node.js", level: "Intermediate", color: "#68a063" },
            { name: "Redux", level: "Advanced", color: "#764abc" },
            { name: "GraphQL", level: "Intermediate", color: "#e535ab" },
            { name: "Webpack", level: "Intermediate", color: "#8dd6f9" },
            { name: "Jest", level: "Advanced", color: "#99425b" },
            { name: "UI/UX Design", level: "Intermediate", color: "#ff7eb6" },
        ],
        projects: [
            {
                id: 1,
                title: "E-commerce Platform Redesign",
                description:
                    "Led the frontend development for a complete redesign of an e-commerce platform serving 2M+ monthly users. Improved performance by 40% and increased conversion rates by 15%.",
                technologies: ["React", "Redux", "Node.js", "MongoDB"],
                image: "https://cdn.shopify.com/s/files/1/0070/7032/files/best-web-design-3.png?v=1691010811",
            },
            {
                id: 2,
                title: "Healthcare Dashboard",
                description:
                    "Designed and developed an interactive dashboard for healthcare professionals to monitor patient data in real-time. Implemented complex data visualizations and filtering capabilities.",
                technologies: ["React", "D3.js", "Firebase", "Material UI"],
                image: "https://integrio.net/static/1542bae35ac6cdd1a583bdeeada0bddd/img-medical-visits.png",
            },
            {
                id: 3,
                title: "Social Media Analytics Tool",
                description:
                    "Built a comprehensive analytics tool for social media managers to track campaign performance across multiple platforms. Features include custom reporting and AI-powered recommendations.",
                technologies: ["TypeScript", "React", "Python", "TensorFlow"],
                image: "https://images.ctfassets.net/ukazlt65o6hl/gvI3xgLy4EVayvpZ60HSl/793e5c2763c324d5851535ef7c04575a/Hootsuite_social_analytics_dashboard.png",
            },
        ],
        education: [
            {
                school: "Stanford University",
                degree: "Master of Science in Computer Science",
                years: "2014 - 2016",
            },
            {
                school: "University of California, Berkeley",
                degree: "Bachelor of Science in Computer Science",
                years: "2010 - 2014",
            },
        ],
        experience: [
            {
                company: "Tech Innovations Inc.",
                role: "Senior Frontend Developer",
                years: "2020 - Present",
                description:
                    "Leading frontend development for enterprise SaaS products. Managing a team of 5 developers and implementing best practices for code quality and performance.",
            },
            {
                company: "Digital Solutions Co.",
                role: "Frontend Developer",
                years: "2016 - 2020",
                description:
                    "Developed responsive web applications for clients in finance, healthcare, and e-commerce sectors. Implemented CI/CD pipelines and automated testing.",
            },
            {
                company: "StartUp Ventures",
                role: "Junior Developer",
                years: "2014 - 2016",
                description:
                    "Worked on frontend and backend development for early-stage startups. Gained experience in agile methodologies and rapid prototyping.",
            },
        ],
    };

    // Show more projects state
    const [showAllProjects, setShowAllProjects] = useState(false);
    const displayedProjects = showAllProjects
        ? userProfile.projects
        : userProfile.projects.slice(0, 2);

    return (
        <>
            {/* Removing the Navigation Bar */}
            <div className="profile-container">
                {/* Side Panel */}
                <aside className="profile-sidebar">
                    <div className="sidebar-header">
                        <h2>Dashboard</h2>
                    </div>
                    <nav className="sidebar-nav">
                        <Link to="/profile" className="nav-item active">
                            <span className="nav-icon">👤</span>
                            <span>Profile</span>
                        </Link>
                        <Link to="/messages" className="nav-item">
                            <span className="nav-icon">💬</span>
                            <span>Messages</span>
                            <span className="badge">3</span>
                        </Link>
                        <Link to="/applications" className="nav-item">
                            <span className="nav-icon">📝</span>
                            <span>Your Applications</span>
                            <span className="badge">5</span>
                        </Link>
                        <Link to="/courses" className="nav-item">
                            <span className="nav-icon">📚</span>
                            <span>Your Courses</span>
                        </Link>
                        <Link to="/saved-jobs" className="nav-item">
                            <span className="nav-icon">🔖</span>
                            <span>Saved Jobs</span>
                        </Link>
                        <Link to="/settings" className="nav-item">
                            <span className="nav-icon">⚙️</span>
                            <span>Settings</span>
                        </Link>
                        <Link to="/feed" className="nav-item">
                            <span className="nav-icon">🏠</span>
                            <span>Your Feed</span>
                        </Link>
                    </nav>
                    <div className="sidebar-footer">
                        <div className="profile-completion">
                            <div className="completion-info">
                                <span>Profile Completion</span>
                                <span>85%</span>
                            </div>
                            <div className="completion-bar">
                                <div
                                    className="completion-fill"
                                    style={{ width: "85%" }}
                                ></div>
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="profile-main">
                    {/* Profile Header */}
                    <section className="profile-header">
                        <div className="profile-cover">
                            <div className="edit-cover-btn">
                                <span>📷</span> Edit Cover
                            </div>
                        </div>
                        <div className="profile-info-container">
                            <div className="profile-avatar-large">
                                <img
                                    src={userProfile.avatar}
                                    alt={userProfile.name}
                                />
                                <div className="edit-avatar-btn">
                                    <span>📷</span>
                                </div>
                            </div>
                            <div className="profile-details">
                                <div className="profile-name-section">
                                    <h1>{userProfile.name}</h1>
                                    <button className="edit-profile-btn">
                                        Edit Profile
                                    </button>
                                </div>
                                <p className="profile-title">
                                    {userProfile.title}
                                </p>
                                <p className="profile-location">
                                    📍 {userProfile.location} •{" "}
                                    <span className="connections">
                                        {userProfile.connections} connections
                                    </span>
                                </p>
                                <div className="profile-actions">
                                    <button className="primary-btn">
                                        Download Resume
                                    </button>
                                    <button className="secondary-btn">
                                        Share Profile
                                    </button>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Profile Navigation */}
                    <div className="profile-nav">
                        <button
                            className={`profile-nav-item ${
                                activeTab === "about" ? "active" : ""
                            }`}
                            onClick={() => setActiveTab("about")}
                        >
                            About
                        </button>
                        <button
                            className={`profile-nav-item ${
                                activeTab === "experience" ? "active" : ""
                            }`}
                            onClick={() => setActiveTab("experience")}
                        >
                            Experience
                        </button>
                        <button
                            className={`profile-nav-item ${
                                activeTab === "education" ? "active" : ""
                            }`}
                            onClick={() => setActiveTab("education")}
                        >
                            Education
                        </button>
                        <button
                            className={`profile-nav-item ${
                                activeTab === "projects" ? "active" : ""
                            }`}
                            onClick={() => setActiveTab("projects")}
                        >
                            Projects
                        </button>
                    </div>

                    {/* About Section */}
                    {activeTab === "about" && (
                        <div className="profile-content">
                            <section className="profile-section">
                                <h2 className="section-title">About</h2>
                                <p className="bio">{userProfile.bio}</p>
                            </section>

                            <section className="profile-section">
                                <h2 className="section-title">Skills</h2>
                                <div className="skills-container">
                                    {userProfile.skills.map((skill, index) => (
                                        <div
                                            key={index}
                                            className="skill-badge"
                                            style={{
                                                backgroundColor: `${skill.color}15`,
                                                color: skill.color,
                                                borderColor: skill.color,
                                            }}
                                        >
                                            {skill.name}
                                            <span className="skill-level">
                                                {skill.level}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            <section className="profile-section">
                                <div className="section-header">
                                    <h2 className="section-title">Projects</h2>
                                    <button
                                        className="view-all-btn"
                                        onClick={() => setActiveTab("projects")}
                                    >
                                        View All
                                    </button>
                                </div>
                                <div className="projects-grid">
                                    {displayedProjects.map((project) => (
                                        <div
                                            key={project.id}
                                            className="project-card"
                                        >
                                            <div className="project-image">
                                                <img
                                                    src={project.image}
                                                    alt={project.title}
                                                />
                                            </div>
                                            <div className="project-content">
                                                <h3>{project.title}</h3>
                                                <p>{project.description}</p>
                                                <div className="project-technologies">
                                                    {project.technologies.map(
                                                        (tech, index) => (
                                                            <span
                                                                key={index}
                                                                className="tech-tag"
                                                            >
                                                                {tech}
                                                            </span>
                                                        )
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                {!showAllProjects &&
                                    userProfile.projects.length > 2 && (
                                        <button
                                            className="load-more-btn"
                                            onClick={() =>
                                                setShowAllProjects(true)
                                            }
                                        >
                                            Load More Projects
                                        </button>
                                    )}
                            </section>
                        </div>
                    )}

                    {/* Experience Section */}
                    {activeTab === "experience" && (
                        <div className="profile-content">
                            <section className="profile-section">
                                <h2 className="section-title">
                                    Work Experience
                                </h2>
                                <div className="timeline">
                                    {userProfile.experience.map(
                                        (exp, index) => (
                                            <div
                                                key={index}
                                                className="timeline-item"
                                            >
                                                <div className="timeline-marker"></div>
                                                <div className="timeline-content">
                                                    <h3>{exp.role}</h3>
                                                    <div className="timeline-info">
                                                        <span className="company">
                                                            {exp.company}
                                                        </span>
                                                        <span className="years">
                                                            {exp.years}
                                                        </span>
                                                    </div>
                                                    <p>{exp.description}</p>
                                                </div>
                                            </div>
                                        )
                                    )}
                                </div>
                            </section>
                        </div>
                    )}

                    {/* Education Section */}
                    {activeTab === "education" && (
                        <div className="profile-content">
                            <section className="profile-section">
                                <h2 className="section-title">Education</h2>
                                <div className="timeline">
                                    {userProfile.education.map((edu, index) => (
                                        <div
                                            key={index}
                                            className="timeline-item"
                                        >
                                            <div className="timeline-marker"></div>
                                            <div className="timeline-content">
                                                <h3>{edu.degree}</h3>
                                                <div className="timeline-info">
                                                    <span className="school">
                                                        {edu.school}
                                                    </span>
                                                    <span className="years">
                                                        {edu.years}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        </div>
                    )}

                    {/* Projects Section */}
                    {activeTab === "projects" && (
                        <div className="profile-content">
                            <section className="profile-section">
                                <h2 className="section-title">All Projects</h2>
                                <div className="projects-grid full-grid">
                                    {userProfile.projects.map((project) => (
                                        <div
                                            key={project.id}
                                            className="project-card"
                                        >
                                            <div className="project-image">
                                                <img
                                                    src={project.image}
                                                    alt={project.title}
                                                />
                                            </div>
                                            <div className="project-content">
                                                <h3>{project.title}</h3>
                                                <p>{project.description}</p>
                                                <div className="project-technologies">
                                                    {project.technologies.map(
                                                        (tech, index) => (
                                                            <span
                                                                key={index}
                                                                className="tech-tag"
                                                            >
                                                                {tech}
                                                            </span>
                                                        )
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <button className="add-project-btn">
                                    <span>+</span> Add New Project
                                </button>
                            </section>
                        </div>
                    )}
                </main>
            </div>
        </>
    );
};

export default JobSeekerProfile;
