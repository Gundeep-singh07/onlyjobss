import "./Numbers.css";
import { useEffect, useState, useRef } from "react";

const Numbers = () => {
    const stats = [
        { target: 5000, text: "Companies" },
        { target: 25000, text: "Active Jobs" },
        { target: 100000, text: "Candidates" },
        { target: 15000, text: "Successful Placements" },
    ];

    const [counts, setCounts] = useState(stats.map(() => 0));
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.2 } // Trigger when 20% of the section is visible
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
        };
    }, []);

    useEffect(() => {
        if (!isVisible) return;

        const interval = setInterval(() => {
            setCounts((prevCounts) =>
                prevCounts.map((count, index) => {
                    if (count < stats[index].target) {
                        return Math.min(
                            count + Math.ceil(stats[index].target / 100),
                            stats[index].target
                        );
                    }
                    return count;
                })
            );
        }, 50);

        return () => clearInterval(interval);
    }, [isVisible]);

    return (
        <section id="numbers" className="stats-section" ref={sectionRef}>
            <h2>OnlyJobs in Numbers</h2>
            <div className="stats-grid">
                {stats.map((stat, index) => (
                    <div className="stat-card" key={index}>
                        <div
                            className="stat-number"
                            data-target={stat.target}
                            data-prefix=""
                        >
                            {counts[index].toLocaleString()}
                        </div>
                        <p>{stat.text}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Numbers;
