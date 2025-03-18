import { useState } from "react";
import { X } from "lucide-react";

export function JobPostForm() {
  const [jobTitle, setJobTitle] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [experienceLevel, setExperienceLevel] = useState("");
  const [skillInput, setSkillInput] = useState("");
  const [skills, setSkills] = useState<string[]>([]);
  const [salary, setSalary] = useState("");
  const [jobType, setJobType] = useState("");

  const handleAddSkill = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && skillInput.trim() !== "") {
      e.preventDefault();
      if (!skills.includes(skillInput.trim())) {
        setSkills([...skills, skillInput.trim()]);
      }
      setSkillInput("");
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !jobTitle ||
      !location ||
      !description ||
      !experienceLevel ||
      skills.length === 0
    ) {
      // Show error toast
      console.error("Please fill in all required fields");
      return;
    }

    // Simulate API call
    console.log("Job posted:", {
      jobTitle,
      location,
      description,
      experienceLevel,
      skills,
      salary,
      jobType,
    });

    // Reset form
    setJobTitle("");
    setLocation("");
    setDescription("");
    setExperienceLevel("");
    setSkillInput("");
    setSkills([]);
    setSalary("");
    setJobType("");
  };

  return (
    <form onSubmit={handleSubmit} className="job-post-form">
      <div className="form-card">
        <div className="card-header">
          <h2 className="card-title">Post a New Job</h2>
          <p className="card-description">
            Fill in the details below to create a new job posting.
          </p>
        </div>

        <div className="card-content">
          <div className="form-group">
            <label htmlFor="jobTitle" className="form-label">
              Job Title <span className="required">*</span>
            </label>
            <input
              id="jobTitle"
              className="form-input"
              placeholder="e.g. Frontend Developer"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="location" className="form-label">
              Location <span className="required">*</span>
            </label>
            <input
              id="location"
              className="form-input"
              placeholder="e.g. San Francisco, CA or Remote"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="experienceLevel" className="form-label">
                Experience Level <span className="required">*</span>
              </label>
              <select
                id="experienceLevel"
                className="form-select"
                value={experienceLevel}
                onChange={(e) => setExperienceLevel(e.target.value)}
                required
              >
                <option value="" disabled>
                  Select experience level
                </option>
                <option value="entry">Entry Level (0-2 years)</option>
                <option value="mid">Mid Level (3-5 years)</option>
                <option value="senior">Senior Level (5+ years)</option>
                <option value="lead">Lead/Manager (8+ years)</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="jobType" className="form-label">
                Job Type
              </label>
              <select
                id="jobType"
                className="form-select"
                value={jobType}
                onChange={(e) => setJobType(e.target.value)}
              >
                <option value="" disabled>
                  Select job type
                </option>
                <option value="fullTime">Full-time</option>
                <option value="partTime">Part-time</option>
                <option value="contract">Contract</option>
                <option value="freelance">Freelance</option>
                <option value="internship">Internship</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="salary" className="form-label">
              Salary Range
            </label>
            <input
              id="salary"
              className="form-input"
              placeholder="e.g. $80,000 - $120,000 per year"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="skills" className="form-label">
              Required Skills <span className="required">*</span>
            </label>
            <input
              id="skills"
              className="form-input"
              placeholder="Type a skill and press Enter"
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              onKeyDown={handleAddSkill}
            />

            {skills.length > 0 && (
              <div className="skills-container">
                {skills.map((skill) => (
                  <span key={skill} className="skill-badge">
                    {skill}
                    <button
                      type="button"
                      onClick={() => handleRemoveSkill(skill)}
                      className="remove-skill"
                    >
                      <X className="remove-icon" size={14} />
                      <span className="sr-only">Remove {skill}</span>
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="description" className="form-label">
              Job Description <span className="required">*</span>
            </label>
            <textarea
              id="description"
              className="form-textarea"
              placeholder="Enter job description, responsibilities, and requirements"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={6}
              required
            />
          </div>
        </div>

        <div className="card-footer">
          <button type="button" className="button button-outline">
            Cancel
          </button>
          <button type="submit" className="button button-default">
            Post Job
          </button>
        </div>
      </div>

      <style>
        {`
          .job-post-form {
            width: 100%;
            animation: scaleIn 0.3s ease-out;
          }
          
          .form-card {
            background-color: var(--card);
            border-radius: var(--radius);
            border: 1px solid var(--border);
            overflow: hidden;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
          }
          
          .card-header {
            padding: 1.5rem 1.5rem 0;
          }
          
          .card-title {
            font-size: 1.5rem;
            font-weight: 600;
            margin: 0 0 0.5rem 0;
            color: var(--foreground);
          }
          
          .card-description {
            color: var(--muted-foreground);
            font-size: 0.875rem;
            margin: 0;
          }
          
          .card-content {
            padding: 1.5rem;
            display: flex;
            flex-direction: column;
            gap: 1.25rem;
          }
          
          .card-footer {
            padding: 1.5rem;
            border-top: 1px solid var(--border);
            display: flex;
            justify-content: flex-end;
            gap: 0.75rem;
          }
          
          .form-group {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
          }
          
          .form-row {
            display: grid;
            grid-template-columns: 1fr;
            gap: 1rem;
          }
          
          @media (min-width: 768px) {
            .form-row {
              grid-template-columns: 1fr 1fr;
            }
          }
          
          .form-label {
            font-size: 0.875rem;
            font-weight: 500;
            color: var(--foreground);
          }
          
          .required {
            color: #ef4444;
          }
          
          .form-input, .form-select, .form-textarea {
            padding: 0.625rem 0.75rem;
            border: 1px solid var(--border);
            border-radius: var(--radius);
            background-color: var(--background);
            color: var(--foreground);
            font-size: 0.875rem;
            transition: border-color 0.2s;
          }
          
          .form-input:focus, .form-select:focus, .form-textarea:focus {
            outline: none;
            border-color: var(--primary);
          }
          
          .form-textarea {
            resize: vertical;
            min-height: 100px;
          }
          
          .skills-container {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
            margin-top: 0.5rem;
          }
          
          .skill-badge {
            display: inline-flex;
            align-items: center;
            padding: 0.25rem 0.5rem;
            background-color: var(--secondary);
            color: var(--secondary-foreground);
            border-radius: 9999px;
            font-size: 0.75rem;
            font-weight: 500;
          }
          
          .remove-skill {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            margin-left: 0.25rem;
            background: none;
            border: none;
            color: currentColor;
            cursor: pointer;
            opacity: 0.7;
            transition: opacity 0.2s;
          }
          
          .remove-skill:hover {
            opacity: 1;
          }
          
          .remove-icon {
            width: 14px;
            height: 14px;
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
          }
          
          .button-default:hover {
            opacity: 0.9;
          }
          
          .button-outline {
            background-color: transparent;
            border: 1px solid var(--border);
            color: var(--foreground);
          }
          
          .button-outline:hover {
            background-color: var(--muted);
          }
          
          .sr-only {
            position: absolute;
            width: 1px;
            height: 1px;
            padding: 0;
            margin: -1px;
            overflow: hidden;
            clip: rect(0, 0, 0, 0);
            white-space: nowrap;
            border-width: 0;
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
    </form>
  );
}
