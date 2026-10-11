import "./Footer.css";
import {
  FaLeaf,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-container">

        <div className="footer-box">

          <div className="footer-logo">
            <FaLeaf />
            <h2>SmartAgri</h2>
          </div>

          <p>
            SmartAgri helps farmers digitally manage crops,
            irrigation, weather, market prices and farm activities
            from one powerful platform.
          </p>

        </div>

        <div className="footer-box">

          <h3>Quick Links</h3>

          <ul>
            <li>Home</li>
            <li>About</li>
            <li>Services</li>
            <li>Features</li>
            <li>Contact</li>
          </ul>

        </div>

        <div className="footer-box">

          <h3>Services</h3>

          <ul>
            <li>Crop Recommendation</li>
            <li>Weather Forecast</li>
            <li>Smart Irrigation</li>
            <li>Market Price</li>
            <li>Financial Management</li>
          </ul>

        </div>

        <div className="footer-box">

          <h3>Follow Us</h3>

          <div className="social-icons">

            <a href="#"><FaFacebookF /></a>

            <a href="#"><FaInstagram /></a>

            <a href="#"><FaLinkedinIn /></a>

            <a href="#"><FaTwitter /></a>

          </div>

        </div>

      </div>

      <div className="footer-bottom">

        <p>
          © 2026 SmartAgri Management System. All Rights Reserved.
        </p>

      </div>

    </footer>
  );
}

export default Footer;