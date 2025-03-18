import { Link } from "react-router-dom";
import "./Footer-NavBar.css";
import logoDark from "../../../assets/logo-dark.png";

const NavBar = () => {
  return (
    <nav className="nav">
      <Link to="/" className="logo">
        <img src={logoDark} alt="OnlyJobs Logo" />
      </Link>

      <div className="nav-buttons">
        <Link to="/login" className="button button-white">
          Log In
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
