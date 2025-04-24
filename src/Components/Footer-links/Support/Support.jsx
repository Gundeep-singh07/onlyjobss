import { useState } from "react";
import { HelpCircle, Send, MessageSquare } from "lucide-react";
import "./Support.css";

const queryTypes = [
  { id: "general", label: "General Inquiry" },
  { id: "technical", label: "Technical Issue" },
  { id: "billing", label: "Billing Question" },
  { id: "feedback", label: "Feedback" },
  { id: "career", label: "Career Opportunities" },
];

const Support = () => {
  const [theme, setTheme] = useState("light");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    queryType: "",
    title: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({
    show: false,
    success: false,
    message: "",
    ticketId: "",
  });

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    if (
      !formData.name ||
      !formData.email ||
      !formData.title ||
      !formData.message ||
      !formData.queryType
    ) {
      setSubmitStatus({
        show: true,
        success: false,
        message: "Please fill in all required fields",
        ticketId: "",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("http://localhost:3006/api/support", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to submit support request");
      }

      setSubmitStatus({
        show: true,
        success: true,
        message: "Your support request has been submitted successfully!",
        ticketId: data.ticketId || "",
      });

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        queryType: "",
        title: "",
        message: "",
      });
    } catch (error) {
      setSubmitStatus({
        show: true,
        success: false,
        message: error.message || "Failed to submit support request",
        ticketId: "",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setSubmitStatus({
      show: false,
      success: false,
      message: "",
      ticketId: "",
    });
  };

  return (
    <div className="sp_wrapper">
      <div className="sp_theme_toggle">
        <button onClick={toggleTheme} className="sp_theme_toggle_btn">
          {theme === "light" ? "🌙" : "☀"}
        </button>
      </div>
      <div className="sp_header">
        <MessageSquare className="sp_icon" />
        <h1>How can we help?</h1>
        <p>
          Our support team is here to assist you with any questions or concerns.
        </p>
      </div>

      {submitStatus.show && submitStatus.success ? (
        <div className="sp_success_message">
          <h2>Thank you for reaching out!</h2>
          <p>{submitStatus.message}</p>
          {submitStatus.ticketId && (
            <p>
              Ticket ID: <strong>#{submitStatus.ticketId}</strong>
            </p>
          )}
          <p>
            We've sent a confirmation email with details about your request.
          </p>
          <p>
            Our team will review your query and get back to you as soon as
            possible.
          </p>
          <button onClick={resetForm} className="sp_submit_again_btn">
            Submit Another Request
          </button>
        </div>
      ) : (
        <div className="sp_form_container">
          {submitStatus.show && !submitStatus.success && (
            <div className="sp_error_message">{submitStatus.message}</div>
          )}
          <form onSubmit={handleSubmit} className="sp_form">
            <div className="sp_form_grid">
              <div className="sp_form_field">
                <label htmlFor="name">Full Name *</label>
                <input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className="sp_input_field"
                />
              </div>
              <div className="sp_form_field">
                <label htmlFor="email">Email Address *</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email address"
                  className="sp_input_field"
                />
              </div>
              <div className="sp_form_field">
                <label htmlFor="phone">Phone Number</label>
                <input
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone number (optional)"
                  className="sp_input_field"
                />
              </div>
              <div className="sp_form_field">
                <label htmlFor="queryType">Query Type *</label>
                <select
                  id="queryType"
                  name="queryType"
                  value={formData.queryType}
                  onChange={handleChange}
                  className="sp_input_field"
                >
                  <option value="">Select query type</option>
                  {queryTypes.map((type) => (
                    <option key={type.id} value={type.id}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="sp_form_field sp_full_width">
                <label htmlFor="title">Subject *</label>
                <input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Enter the subject of your query"
                  className="sp_input_field"
                />
              </div>
              <div className="sp_form_field sp_full_width">
                <label htmlFor="message">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Describe your issue or question in detail"
                  className="sp_textarea_field"
                  rows={6}
                />
              </div>
              <div className="sp_form_field sp_full_width sp_submit_container">
                <button
                  type="submit"
                  className="sp_submit_button"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit Request"}
                  <Send className="sp_button_icon" />
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      <div className="sp_support_info">
        <div className="sp_info_card">
          <HelpCircle className="sp_info_icon" />
          <h3>Need immediate assistance?</h3>
          <p>Our support team is available 24 X 7</p>
          <p className="sp_contact_info">onlyjobs.work@gmail.com</p>
        </div>
      </div>
    </div>
  );
};

export default Support;
