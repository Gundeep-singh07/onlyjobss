// TermsOfService.jsx
import React, { useState, useEffect } from "react";
import "./Terms.css";
import NavBar from "../Footer-NavBar/Footer-NavBar";

const TermsOfService = () => {
  const [activeSection, setActiveSection] = useState(null);

  const toggleSection = (sectionId) => {
    setActiveSection(activeSection === sectionId ? null : sectionId);
    window.scrollTo(0, 0);
  };

  // Scroll to top when the component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="onlyjobs-terms-container">
      <NavBar />
      <div className="onlyjobs-terms-header">
        <div className="onlyjobs-company-logo">
          <h1 className="ojn-tc">OnlyJobs</h1>
        </div>
        <div className="onlyjobs-terms-title">
          <h2 className="fowy-tc">Terms of Service</h2>
          <p>Effective: March 16, 2025 | Last Updated: March 16, 2025</p>
        </div>
      </div>

      <div className="onlyjobs-terms-content">
        <div className="onlyjobs-terms-sidebar">
          <h3>Table of Contents</h3>
          <ul>
            <li>
              <a href="#who-we-are" onClick={() => toggleSection("who-we-are")}>
                Who we are
              </a>
            </li>
            <li>
              <a
                href="#age-requirements"
                onClick={() => toggleSection("age-requirements")}
              >
                Age requirements
              </a>
            </li>
            <li>
              <a
                href="#what-you-can-expect"
                onClick={() => toggleSection("what-you-can-expect")}
              >
                What you can expect
              </a>
            </li>
            <li>
              <a
                href="#your-account"
                onClick={() => toggleSection("your-account")}
              >
                Your OnlyJobs account
              </a>
            </li>
            <li>
              <a href="#content" onClick={() => toggleSection("content")}>
                Content in services
              </a>
            </li>
            <li>
              <a href="#software" onClick={() => toggleSection("software")}>
                Software in services
              </a>
            </li>
            <li>
              <a href="#copyright" onClick={() => toggleSection("copyright")}>
                Copyright
              </a>
            </li>
            <li>
              <a
                href="#paid-services"
                onClick={() => toggleSection("paid-services")}
              >
                Paid services
              </a>
            </li>
            <li>
              <a
                href="#restrictions"
                onClick={() => toggleSection("restrictions")}
              >
                Restrictions
              </a>
            </li>
            <li>
              <a
                href="#termination"
                onClick={() => toggleSection("termination")}
              >
                Termination
              </a>
            </li>
            <li>
              <a href="#appeals" onClick={() => toggleSection("appeals")}>
                Appeals
              </a>
            </li>
            <li>
              <a href="#indemnity" onClick={() => toggleSection("indemnity")}>
                Indemnity
              </a>
            </li>
            <li>
              <a href="#as-is" onClick={() => toggleSection("as-is")}>
                Services "AS IS"
              </a>
            </li>
            <li>
              <a
                href="#data-charges"
                onClick={() => toggleSection("data-charges")}
              >
                Data Charges
              </a>
            </li>
            <li>
              <a
                href="#limitation-of-liability"
                onClick={() => toggleSection("limitation-of-liability")}
              >
                Limitation of liability
              </a>
            </li>
            <li>
              <a href="#disputes" onClick={() => toggleSection("disputes")}>
                Settling disputes
              </a>
            </li>
            <li>
              <a
                href="#more-important"
                onClick={() => toggleSection("more-important")}
              >
                More important stuff
              </a>
            </li>
          </ul>
        </div>

        <div className="onlyjobs-terms-main">
          <div className="onlyjobs-terms-welcome">
            <h3>Welcome to OnlyJobs!</h3>
            <p>
              OnlyJobs is the best platform for professionals to find work,
              connect with employers, and build their careers. We're happy
              you're here.
            </p>
            <p>
              These terms set forth our legal obligations to each other. They
              apply to your use of our services.
            </p>
            <p>
              <strong>IMPORTANT NOTE</strong>: The section titled "Settling
              Disputes Between You and OnlyJobs" contains an arbitration clause
              and class-action waiver that applies to all U.S.-based OnlyJobs
              users. Please read this section carefully as it may significantly
              affect your legal rights, including your right to file a lawsuit
              in court.
            </p>
          </div>

          <div
            id="who-we-are"
            className={`onlyjobs-terms-section ${
              activeSection === "who-we-are" ? "active" : ""
            }`}
          >
            <h3 onClick={() => toggleSection("who-we-are")}>Who we are</h3>
            <div className="onlyjobs-section-content">
              <p>
                We provide services that allow you to interact with employers
                and other professionals, showcase your skills and experience,
                and find job opportunities. Our services may also include access
                to certain software, features, and content, including items that
                you can purchase from us or others. Additional terms may apply
                to those purchases.
              </p>
              <p>
                OnlyJobs Inc. is located at 123 Work Street, San Francisco, CA
                94107, USA.
              </p>
            </div>
          </div>

          <div
            id="age-requirements"
            className={`onlyjobs-terms-section ${
              activeSection === "age-requirements" ? "active" : ""
            }`}
          >
            <h3 onClick={() => toggleSection("age-requirements")}>
              Age requirements and responsibility
            </h3>
            <div className="onlyjobs-section-content">
              <p>
                By accessing our services, you confirm that you're at least 18
                years old and meet the minimum age required by the laws in your
                country. If you are old enough to access our services in your
                country, but not old enough to have authority to consent to our
                terms, your parent or legal guardian must agree to our terms on
                your behalf. Please ask your parent or legal guardian to read
                these terms with you.
              </p>
            </div>
          </div>

          <div
            id="what-you-can-expect"
            className={`onlyjobs-terms-section ${
              activeSection === "what-you-can-expect" ? "active" : ""
            }`}
          >
            <h3 onClick={() => toggleSection("what-you-can-expect")}>
              What you can expect from us
            </h3>
            <div className="onlyjobs-section-content">
              <p>
                OnlyJobs is the best platform for professionals to find work,
                connect with employers, and build their careers. We provide
                different digital spaces where you can create a professional
                profile, showcase your skills and experience, search for job
                opportunities, and connect with employers and other
                professionals.
              </p>
              <p>
                We're always evolving our services to better serve you. We may
                build features that help you create content, highlight your
                skills, and connect with potential employers. We also may
                highlight job opportunities or professional content that might
                be of interest to you.
              </p>
              <p>
                OnlyJobs' services may be personalized to each user based on
                their profile, activity, and preferences. You can control
                whether and to what extent OnlyJobs personalizes your experience
                in your Settings.
              </p>
            </div>
          </div>

          <div
            id="your-account"
            className={`onlyjobs-terms-section ${
              activeSection === "your-account" ? "active" : ""
            }`}
          >
            <h3 onClick={() => toggleSection("your-account")}>
              Your OnlyJobs account
            </h3>
            <div className="onlyjobs-section-content">
              <p>
                To access the services, you will need to create an OnlyJobs
                account. You can provide a username and password, and a way of
                contacting you (such as an email address and/or phone number).
                You'll also need to provide your birthday and professional
                information.
              </p>
              <p>
                You are responsible for the security of your account, and you
                agree to notify us immediately if you believe your account has
                been compromised. If you use a password, it must be strong, and
                we strongly recommend that you use that password only for your
                OnlyJobs account and that you enable two-factor authentication.
              </p>
            </div>
          </div>

          <div
            id="content"
            className={`onlyjobs-terms-section ${
              activeSection === "content" ? "active" : ""
            }`}
          >
            <h3 onClick={() => toggleSection("content")}>
              Content in OnlyJobs' services
            </h3>
            <div className="onlyjobs-section-content">
              <h4>Your Content</h4>
              <p>
                When we say "your content" in these terms, we mean all the
                things you add to our services. This includes text, links,
                photos, videos, documents, or other media.
              </p>
              <p>
                Your content is yours, but you give us a license to it when you
                use OnlyJobs. By using our services, you grant us a license to
                use, copy, store, distribute, publish, modify, translate, and
                reformat your content in connection with operating our services.
              </p>

              <h4>OnlyJobs' content</h4>
              <p>
                Our services include some content that belongs to us, such as
                the design of our apps and websites, our art and images, and
                content written by us. We retain all intellectual property
                rights in our content.
              </p>

              <h4>Other content</h4>
              <p>
                Our services might also provide you with access to other
                people's content. You may not use this content without that
                person's consent, or as allowed by law.
              </p>
            </div>
          </div>

          {/* Additional sections follow the same pattern */}
          <div
            id="software"
            className={`onlyjobs-terms-section ${
              activeSection === "software" ? "active" : ""
            }`}
          >
            <h3 onClick={() => toggleSection("software")}>
              Software in OnlyJobs' services
            </h3>
            <div className="onlyjobs-section-content">
              <p>
                Some of our services allow you to download client software. So
                long as you comply with these terms, we grant you a license to
                download, install, and run that software, solely to access our
                services.
              </p>
              <p>
                You may not copy, modify, create derivative works based upon,
                distribute, sell, lease, or sublicense any of our software or
                services.
              </p>
            </div>
          </div>

          <div
            id="copyright"
            className={`onlyjobs-terms-section ${
              activeSection === "copyright" ? "active" : ""
            }`}
          >
            <h3 onClick={() => toggleSection("copyright")}>Copyright</h3>
            <div className="onlyjobs-section-content">
              <p>
                We respect the intellectual property of others and expect our
                users to do the same. If you believe your copyright has been
                infringed, please contact us at copyright@onlyjobs.com.
              </p>
            </div>
          </div>

          <div
            id="paid-services"
            className={`onlyjobs-terms-section ${
              activeSection === "paid-services" ? "active" : ""
            }`}
          >
            <h3 onClick={() => toggleSection("paid-services")}>
              OnlyJobs' paid services
            </h3>
            <div className="onlyjobs-section-content">
              <p>
                We won't charge you a fee to use the basic functionality of our
                services, but you may be able to pay for additional features and
                products.
              </p>
            </div>
          </div>

          <div
            id="restrictions"
            className={`onlyjobs-terms-section ${
              activeSection === "restrictions" ? "active" : ""
            }`}
          >
            <h3 onClick={() => toggleSection("restrictions")}>
              Restrictions on your use of OnlyJobs' services
            </h3>
            <div className="onlyjobs-section-content">
              <p>
                When using our services, you must comply with these terms and
                all applicable laws. Fundamentally, do not:
              </p>
              <ul>
                <li>Use the services to do harm to yourself or others</li>
                <li>Use the services to do harm to OnlyJobs</li>
                <li>Use the services to do anything else that's illegal</li>
              </ul>
            </div>
          </div>

          <div
            id="termination"
            className={`onlyjobs-terms-section ${
              activeSection === "termination" ? "active" : ""
            }`}
          >
            <h3 onClick={() => toggleSection("termination")}>Termination</h3>
            <div className="onlyjobs-section-content">
              <p>
                You're free to stop using OnlyJobs' services at any time. We
                reserve the right to suspend or terminate your account at our
                discretion.
              </p>
            </div>
          </div>

          <div
            id="appeals"
            className={`onlyjobs-terms-section ${
              activeSection === "appeals" ? "active" : ""
            }`}
          >
            <h3 onClick={() => toggleSection("appeals")}>Appeals</h3>
            <div className="onlyjobs-section-content">
              <p>
                You can appeal any enforcement action we take under these terms
                through our appeal form or available in-app options.
              </p>
            </div>
          </div>

          <div
            id="indemnity"
            className={`onlyjobs-terms-section ${
              activeSection === "indemnity" ? "active" : ""
            }`}
          >
            <h3 onClick={() => toggleSection("indemnity")}>Indemnity</h3>
            <div className="onlyjobs-section-content">
              <p>
                If you are using the services on behalf of a business, you will
                indemnify and hold OnlyJobs harmless from any claims related to
                your use of our services or violation of these terms.
              </p>
            </div>
          </div>

          <div
            id="as-is"
            className={`onlyjobs-terms-section ${
              activeSection === "as-is" ? "active" : ""
            }`}
          >
            <h3 onClick={() => toggleSection("as-is")}>Services "AS IS"</h3>
            <div className="onlyjobs-section-content">
              <p>
                TO THE FULLEST EXTENT PERMITTED BY LAW, ONLYJOBS MAKES NO
                WARRANTIES ABOUT THE SERVICES. THE SERVICES ARE PROVIDED "AS
                IS."
              </p>
            </div>
          </div>

          <div
            id="more-important"
            className={`onlyjobs-terms-section ${
              activeSection === "more-important" ? "active" : ""
            }`}
          >
            <h3 onClick={() => toggleSection("more-important")}>
              More important stuff
            </h3>
            <div className="onlyjobs-section-content">
              <p>
                We may update these terms to reflect changes to our services or
                for legal reasons. If you continue to use our services after the
                changes take effect, it means that you agree to the changes.
              </p>
              <p>
                If you have any questions about these terms, please contact us
                at support@onlyjobs.com.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="onlyjobs-terms-footer">
        <p>© 2025 OnlyJobs Inc. All rights reserved.</p>
        <p>
          <a href="#privacy">Privacy Policy</a> |
          <a href="#community">Community Guidelines</a> |
          <a href="#contact">Contact Us</a>
        </p>
      </div>
    </div>
  );
};

export default TermsOfService;
