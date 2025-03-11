import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./JobApplicationForm.css";

// Template components for different question types
const QuestionTemplates = {
    // Text input question template
    text: ({ question, value, onChange, error }) => (
        <div className="input-wrapper">
            <input
                type="text"
                value={value}
                onChange={onChange}
                placeholder={question.placeholder}
                className={`question-input ${error ? "error-input" : ""}`}
            />
            <div className="input-decoration">
                <div className="sparkle sparkle-1"></div>
                <div className="sparkle sparkle-2"></div>
            </div>
        </div>
    ),

    // Email input question template
    email: ({ question, value, onChange, error }) => (
        <div className="input-wrapper">
            <input
                type="email"
                value={value}
                onChange={onChange}
                placeholder={question.placeholder}
                className={`question-input ${error ? "error-input" : ""}`}
            />
            <div className="input-decoration">
                <div className="sparkle sparkle-1"></div>
                <div className="sparkle sparkle-2"></div>
            </div>
        </div>
    ),

    // Phone input question template
    phone: ({ question, value, onChange, error }) => (
        <div className="input-wrapper">
            <input
                type="tel"
                value={value}
                onChange={onChange}
                placeholder={question.placeholder}
                className={`question-input ${error ? "error-input" : ""}`}
            />
            <div className="input-decoration">
                <div className="sparkle sparkle-1"></div>
                <div className="sparkle sparkle-2"></div>
            </div>
        </div>
    ),

    // Date input question template
    date: ({ question, value, onChange, error }) => (
        <div className="input-wrapper date-wrapper">
            <input
                type="date"
                value={value}
                onChange={onChange}
                className={`question-input date-input ${
                    error ? "error-input" : ""
                }`}
            />
            <div className="calendar-decoration">
                <div className="calendar-icon"></div>
            </div>
        </div>
    ),

    // Textarea question template
    textarea: ({ question, value, onChange, error }) => (
        <div className="input-wrapper">
            <textarea
                value={value}
                onChange={onChange}
                placeholder={question.placeholder}
                className={`question-textarea ${error ? "error-input" : ""}`}
            />
            <div className="textarea-decoration">
                <div className="wave wave-1"></div>
                <div className="wave wave-2"></div>
            </div>
        </div>
    ),

    // Select/dropdown question template
    select: ({ question, value, onChange, error }) => (
        <div className="input-wrapper">
            <select
                value={value}
                onChange={onChange}
                className={`question-select ${error ? "error-input" : ""}`}
            >
                <option value="">Please select...</option>
                {question.options &&
                    question.options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
            </select>
            <div className="select-decoration">
                <div className="select-arrow"></div>
            </div>
        </div>
    ),

    // Radio buttons question template
    radio: ({ question, value, onChange, error }) => (
        <div className={`radio-group ${error ? "error-input" : ""}`}>
            {question.options &&
                question.options.map((option) => (
                    <label key={option.value} className="radio-option">
                        <input
                            type="radio"
                            name={question.id}
                            value={option.value}
                            checked={value === option.value}
                            onChange={onChange}
                        />
                        <span className="radio-label">{option.label}</span>
                        <span className="radio-bubble"></span>
                    </label>
                ))}
        </div>
    ),

    // File upload template
    file: ({ question, value, onChange, error }) => (
        <div className="input-wrapper">
            <input
                type="file"
                onChange={onChange}
                className={`question-input ${error ? "error-input" : ""}`}
                accept={question.accept || ".pdf,.doc,.docx"}
            />
            <div className="input-decoration">
                <div className="sparkle sparkle-1"></div>
                <div className="sparkle sparkle-2"></div>
            </div>
        </div>
    ),
};

const JobApplicationForm = () => {
    const navigate = useNavigate();
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState({});
    const [error, setError] = useState("");
    const [animation, setAnimation] = useState("");

    // Questions array with all the questions we'll ask
    const questions = [
        {
            id: "name",
            text: "What is your full name?",
            type: "text",
            placeholder: "Enter your full name",
            icon: "👋",
        },
        {
            id: "email",
            text: "What is your email address?",
            type: "email",
            placeholder: "Enter your email address",
            icon: "📧",
        },
        {
            id: "phone",
            text: "What is your phone number?",
            type: "number",
            placeholder: "Enter your phone number",
            icon: "📱",
        },
        {
            id: "pfp",
            text: "What do you look like?",
            type: "file",
            placeholder: "Upload your photo",
            accept: ".jpg,.jpeg,.png",
            icon: "📸",
        },
        {
            id: "position",
            text: "What is your current job title or designation?",
            type: "text",
            placeholder: "Enter current job title",
            icon: "💼",
        },
        {
            id: "experience",
            text: "How many years of relevant work experience do you have?",
            type: "select",
            options: [
                { value: "less-than-1", label: "Less than 1 year" },
                { value: "1-3", label: "1-3 years" },
                { value: "3-5", label: "3-5 years" },
                { value: "5-10", label: "5-10 years" },
                { value: "more-than-10", label: "More than 10 years" },
            ],
            icon: "⏱️",
        },
        {
            id: "education",
            text: "What is your highest level of education completed?",
            type: "select",
            options: [
                { value: "high-school", label: "High School" },
                { value: "associate", label: "Associate Degree" },
                { value: "bachelor", label: "Bachelor's Degree" },
                { value: "master", label: "Master's Degree" },
                { value: "doctorate", label: "Doctorate or PhD" },
                { value: "other", label: "Other" },
            ],
            icon: "🎓",
        },
        {
            id: "skills",
            text: "What are your key skills or areas of expertise?",
            type: "textarea",
            placeholder: "List your key professional skills...",
            icon: "🔧",
        },
        {
            id: "summary",
            text: "What is your professional summary or career objective?",
            type: "textarea",
            placeholder: "Write a brief professional summary...",
            icon: "📝",
        },
        {
            id: "desiredJob",
            text: "What type of job are you seeking?",
            type: "radio",
            options: [
                { value: "full-time", label: "Full-time" },
                { value: "part-time", label: "Part-time" },
                { value: "freelance", label: "Freelance" },
                { value: "internship", label: "Internship" },
            ],
            icon: "💼",
        },
        {
            id: "location",
            text: "What is your preferred job location?",
            type: "text",
            placeholder: "Enter preferred job location",
            icon: "💼",
        },
        {
            id: "resume",
            text: "Upload your updated resume (PDF/DOC).",
            type: "file",
            placeholder: "Upload your resume",
            accept: ".pdf,.doc,.docx",
            icon: "💼",
        },
        {
            id: "link",
            text: "Provide a link to your LinkedIn profile or portfolio (if available).",
            type: "url",
            placeholder: "Enter your URL",
            optional: true,
            icon: "🔗",
        },
        {
            id: "goals",
            text: "Briefly describe your career goals or key achievements.",
            type: "textarea",
            placeholder: "Write about your career goals...",
            icon: "🎯",
        },
    ];

    // Add email validation function
    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    // Handle input changes
    const handleChange = (e) => {
        let value;
        const question = questions[currentQuestion];

        // Handle different input types
        if (question.type === "radio") {
            value = e.target.value;
        } else if (question.type === "file") {
            value = e.target.files[0];
        } else {
            value = e.target.value;
        }

        // Clear error when user starts typing
        if (error) setError("");

        // Validate email as user types
        if (question.type === "email" && value && !isValidEmail(value)) {
            setError("Please enter a valid email address");
        }

        setAnswers({
            ...answers,
            [question.id]: value,
        });
    };

    // Apply animation when question changes
    useEffect(() => {
        setAnimation("slide-in");
        const timer = setTimeout(() => {
            setAnimation("");
        }, 500);

        return () => clearTimeout(timer);
    }, [currentQuestion]);

    // Handle continue button click
    const handleContinue = () => {
        const currentQuestionId = questions[currentQuestion].id;
        const currentAnswer = answers[currentQuestionId];
        const isOptional = questions[currentQuestion].optional;
        const question = questions[currentQuestion];

        // Check if the current field is empty (unless it's optional)
        if (
            !isOptional &&
            (!currentAnswer ||
                (typeof currentAnswer === "string" &&
                    currentAnswer.trim() === ""))
        ) {
            setError("Please fill out this field before continuing.");
            return;
        }

        // Validate email before proceeding
        if (question.type === "email" && !isValidEmail(currentAnswer)) {
            setError("Please enter a valid email address");
            return;
        }

        // If validation passes, proceed to next question or complete
        setAnimation("slide-out");

        setTimeout(() => {
            if (currentQuestion < questions.length - 1) {
                setCurrentQuestion(currentQuestion + 1);
                setError("");
            } else {
                // Instead of showing completion screen, redirect to feed
                navigate("/feed");
            }
        }, 300);
    };

    // Handle going back to a previous question
    const handleBack = () => {
        if (currentQuestion > 0) {
            setAnimation("slide-out-reverse");

            setTimeout(() => {
                setCurrentQuestion(currentQuestion - 1);
                setError("");
            }, 300);
        }
    };

    // Render the current question
    const renderQuestion = () => {
        const question = questions[currentQuestion];
        const value = answers[question.id] || "";
        const isLastQuestion = currentQuestion === questions.length - 1;

        // Get the correct template for this question type
        const QuestionTemplate =
            QuestionTemplates[question.type] || QuestionTemplates.text;

        return (
            <div className={`question-container ${animation}`}>
                <div className="question-icon">{question.icon}</div>
                <h2 className="question-title">{question.text}</h2>
                {question.optional && (
                    <span className="optional-tag">(Optional)</span>
                )}

                <QuestionTemplate
                    question={question}
                    value={value}
                    onChange={handleChange}
                    error={error}
                />

                {error && <div className="error-message">{error}</div>}

                <div className="button-container">
                    {currentQuestion > 0 && (
                        <button onClick={handleBack} className="back-button">
                            <span className="button-text">Back</span>
                        </button>
                    )}
                    <button
                        onClick={handleContinue}
                        className="continue-button"
                    >
                        <span className="button-text">
                            {isLastQuestion ? "Complete Profile" : "Continue"}
                        </span>
                        <span className="button-arrow">➜</span>
                    </button>
                </div>

                <div className="progress-container">
                    <div className="progress-bar">
                        <div
                            className="progress-fill"
                            style={{
                                width: `${
                                    (currentQuestion / (questions.length - 1)) *
                                    100
                                }%`,
                            }}
                        ></div>
                    </div>
                    <div className="progress-text">
                        Question {currentQuestion + 1} of {questions.length}
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="profile-question-container">
            <Link to="/questions" className="back-home-arrow">
                ← Back to Role Selection
            </Link>
            <div className="profile-question-card">{renderQuestion()}</div>
        </div>
    );
};

export default JobApplicationForm;