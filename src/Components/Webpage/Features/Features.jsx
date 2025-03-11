import "./Features.css";

const Features = () => {
    const features = [
        {
            id: 1,
            icon: "💼",
            title: "Smart Job Matching",
            description:
                "Our AI-powered system matches you with the perfect job opportunities based on your skills and preferences.",
        },
        {
            id: 2,
            icon: "📚",
            title: "Skill Development",
            description:
                "Access curated courses and resources to enhance your professional skills and stay competitive.",
        },
        {
            id: 3,
            icon: "🤝",
            title: "Professional Networking",
            description:
                "Connect with industry leaders, join communities, and grow your professional network.",
        },
        {
            id: 4,
            icon: "📊",
            title: "Career Tracking",
            description:
                "Track your applications, interviews, and career progress all in one place.",
        },
        {
            id: 5,
            icon: "🎯",
            title: "Targeted Recruitment",
            description:
                "For employers, find the perfect candidates with our advanced filtering and matching system.",
        },
        {
            id: 6,
            icon: "📈",
            title: "Career Growth",
            description:
                "Get personalized career path recommendations and growth opportunities.",
        },
    ];

    return (
        <section id="features" className="section">
            <div className="section-title">
                <h2>Why Choose OnlyJobs</h2>
                <p>
                    Discover the tools and features that will accelerate your
                    career
                </p>
            </div>

            <div className="features-grid">
                {features.map((feature) => (
                    <div key={feature.id} className="feature-card">
                        <div className="feature-icon">{feature.icon}</div>
                        <h3>{feature.title}</h3>
                        <p>{feature.description}</p>
                    </div>
                ))}
            </div>

            <div className="features-cta">
                <h3>Ready to take your career to the next level?</h3>
                <button className="cta-button">Get Started Now</button>
            </div>
        </section>
    );
};

export default Features;
