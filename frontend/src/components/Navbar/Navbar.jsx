import "./Navbar.css";
import { Link } from "react-router-dom";
import { FaLeaf } from "react-icons/fa";
import { HiMenuAlt3 } from "react-icons/hi";

function Navbar() {
  return (
    <nav className="navbar">

      <div className="logo">
        <FaLeaf className="logo-icon" />
        <span>SmartAgri</span>
      </div>

      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><a href="#about">About</a></li>
        <li><a href="#services">Services</a></li>
        <li><a href="#features">Features</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>

      <div className="nav-buttons">

        <Link to="/login">
          <button className="login-btn">
            Login
          </button>
        </Link>

       <Link to="/register">
  <button className="register-btn">Register</button>
</Link>

      </div>

      <div className="menu-icon">
        <HiMenuAlt3 />
      </div>

    </nav>
  );
}

export default Navbar;