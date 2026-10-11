import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Login() {

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");


  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!email || !password) {

      alert("Please enter email and password.");

      return;
    }


    try {

      const response = await fetch(
        "http://localhost:8080/api/users/login",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({
            email: email,
            password: password
          })
        }
      );


      if (response.ok) {

        const user = await response.json();


        // Save logged-in user
        localStorage.setItem(
          "smartAgriUser",
          JSON.stringify(user)
        );


        alert("Login Successful ✅");


        // Redirect based on role

        if (user.role === "Farmer") {

          navigate("/farmer/dashboard");

        } else if (user.role === "Buyer") {

          navigate("/buyer/dashboard");

        } else if (user.role === "Admin") {

          navigate("/admin/dashboard");

        } else {

          navigate("/");

        }


      } else {

        const message = await response.text();

        alert(
          message || "Invalid email or password ❌"
        );

      }

    } catch (error) {

      console.log("Login error:", error);

      alert(
        "Backend connection error ❌"
      );

    }

  };


  return (

    <section className="login-page">

      <div className="login-card">

        <div className="login-header">

          <h1>
            Welcome Back 👋
          </h1>

          <p>
            Login to your SmartAgri Account
          </p>

        </div>


        <form
          className="login-form"
          onSubmit={handleSubmit}
        >

          <div className="form-group">

            <label>
              Email
            </label>

            <input
              type="email"
              placeholder="Enter your Email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              required
            />

          </div>


          <div className="form-group">

            <label>
              Password
            </label>

            <div className="password-box">

              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                placeholder="Enter Password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                required
              />

              <span
                onClick={() =>
                  setShowPassword(!showPassword)
                }
              >

                {showPassword
                  ? <FaEyeSlash />
                  : <FaEye />
                }

              </span>

            </div>

          </div>


          <button
            type="submit"
            className="login-btn"
          >
            Login
          </button>

        </form>


        <div className="login-links">

          <Link to="/forgot-password">
            Forgot Password?
          </Link>

          <p>

            Don't have an account?

            <Link to="/register">
              Register
            </Link>

          </p>

        </div>

      </div>

    </section>

  );

}

export default Login;