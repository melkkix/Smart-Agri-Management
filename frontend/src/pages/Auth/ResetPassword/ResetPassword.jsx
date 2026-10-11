import "./ResetPassword.css";
import { useState } from "react";
import { FaEye, FaEyeSlash, FaLock } from "react-icons/fa";

function ResetPassword() {

  const [showPassword, setShowPassword] = useState(false);

  return (
    <section className="reset-page">

      <div className="reset-card">

        <FaLock className="reset-icon" />

        <h1>Reset Password</h1>

        <p>Create a new password for your SmartAgri account.</p>

        <form className="reset-form">

          <div className="password-box">

            <input
              type={showPassword ? "text" : "password"}
              placeholder="New Password"
            />

            <span
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>

          </div>

          <input
            type={showPassword ? "text" : "password"}
            placeholder="Confirm Password"
          />

          <button type="submit">
            Reset Password
          </button>

        </form>

      </div>

    </section>
  );
}

export default ResetPassword;