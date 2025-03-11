import { useState } from "react";
import "./FAQ.css";

const FAQ = () => {
  const faqs = [
    {
      question: "How much does it cost for job seekers?",
      answer:
        "OnlyJobs is completely free for job seekers! Create your profile, apply to jobs, and connect with employers at no cost.",
    },
    {
      question: "Can I post multiple jobs at once?",
      answer:
        "Yes! Our Employers Pro plan allows unlimited job postings, while the Basic plan includes up to 5 active job posts.",
    },
    {
      question: "How does the AI matching work?",
      answer:
        "Our AI analyzes multiple factors including skills, experience, company culture, and job requirements to create perfect matches.",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

    return (
        <section id="faq-section" className="faq-section">
            <div className="section-title">
                <h2>Frequently Asked Questions</h2>
                <p>Got questions?</p>
      </div>
      <div className="faq-container">
        {faqs.map((faq, index) => (
          <div
            className={`faq-item ${activeIndex === index ? "active" : ""}`}
            key={index}
            onClick={() => toggleFAQ(index)}
          >
            <div className="faq-question">{faq.question}</div>
            <div className="faq-answer">{faq.answer}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQ;
