import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  return (
    <section className="hero">
      <div className="stars"></div>
      <h1>
        The Future of Hiring
        <br />
        is Here
      </h1>
      <p>
        OnlyJobs connects talented professionals with forward-thinking
        companies. Choose your path and join our growing community.
      </p>

      <div className="cta-buttons">
        <div className="cta-group">
          <h3>For Job Seekers</h3>
          <p>Find your dream job and connect with top employers</p>
          <Link to="/questions/jobseeker" className="button button-white">
            Create Your Profile
          </Link>
        </div>
        <div className="cta-group">
          <h3>For Employers</h3>
          <p>Find the perfect candidates for your open positions</p>
          <Link to="/questions/employer" className="button button-success">
            Post a Job
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Header;