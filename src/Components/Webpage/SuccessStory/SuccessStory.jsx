import "./SuccessStory.css";

const SuccessStory = () => {
    const testimonials = [
        {
            quote: "Found my dream job within 2 weeks of joining OnlyJobs. The AI matching really works!",
            name: "Sarah K.",
            position: "Software Engineer",
        },
        {
            quote: "Reduced our time-to-hire by 60%. The quality of candidates is outstanding.",
            name: "Mark R.",
            position: "HR Director",
        },
        {
            quote: "The platform is intuitive and the support team is incredibly helpful.",
            name: "James L.",
            position: "Startup Founder",
        },
    ];

    return (
        <section id="testimonials" className="section testimonials">
            <div className="section-title">
                <h2>Success Stories</h2>
                <p>Join thousands of satisfied users</p>
            </div>

            <div className="testimonial-grid">
                {testimonials.map((testimonial, index) => (
                    <div className="testimonial-card" key={index}>
                        <p>"{testimonial.quote}"</p>
                        <h4>{testimonial.name}</h4>
                        <p>{testimonial.position}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default SuccessStory;
