import "./ForgotPassword.css";
import { Link } from "react-router-dom";
import { FaEnvelope } from "react-icons/fa";

function ForgotPassword() {
  return (
    <div className="forgot-container">

      <div className="forgot-card">

        <FaEnvelope className="forgot-icon" />

        <h1>Forgot Password?</h1>

        <p>
          Enter your registered email address and we'll send you
          a password reset link.
        </p>

        <form className="forgot-form">

          <input
            type="email"
            placeholder="Enter your email"
          />

          <button type="submit">
            Send Reset Link
          </button>

        </form>

        <div className="back-login">

          <Link to="/login">
            ← Back to Login
          </Link>

        </div>

      </div>

    </div>
  );
}

export default ForgotPassword;