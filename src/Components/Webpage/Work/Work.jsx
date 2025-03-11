import "./Work.css";
import { useEffect, useRef } from "react";

const Work = () => {
    const stepsRef = useRef([]);

    const steps = [
        {
            number: "01",
            title: "Create Your Profile",
            description:
                "Sign up and build your professional profile or company page. Our AI-powered system will help you highlight your best qualities.",
        },
        {
            number: "02",
            title: "Connect and Engage",
            description:
                "Browse through tailored opportunities or candidates. Use our real-time chat to start meaningful conversations.",
        },
        {
            number: "03",
            title: "Seal the Deal",
            description:
                "Schedule interviews, make offers, and close deals all within the platform. Your next success story begins here.",
        },
    ];

    useEffect(() => {
        const observers = [];

        stepsRef.current.forEach((step, index) => {
            const observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("step-visible");
                        observer.unobserve(entry.target);
                    }
                },
                { threshold: 0.2 }
            );

            if (step) {
                observer.observe(step);
                observers.push(observer);
            }
        });

        return () => {
            observers.forEach((observer) => {
                observer.disconnect();
            });
        };
    }, []);

    return (
        <section id="how-it-works" className="how-it-works">
            <div className="section-title">
                <h2>How It Works</h2>
                <p>Your journey to success starts here</p>
            </div>
            <div className="steps-container">
                {steps.map((step, index) => (
                    <div
                        className="step-card"
                        key={index}
                        ref={(el) => (stepsRef.current[index] = el)}
                        style={{ animationDelay: `${index * 0.2}s` }}
                    >
                        <div className="step-number">{step.number}</div>
                        <div className="step-content">
                            <h3>{step.title}</h3>
                            <p>{step.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Work;
