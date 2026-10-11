import "./Register.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    password: "",
    confirmPassword: ""
  });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };


  const handleSubmit = async (e) => {

    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.role ||
      !formData.password ||
      !formData.confirmPassword
    ) {

      alert("Please fill all fields.");

      return;
    }


    if (formData.password !== formData.confirmPassword) {

      alert("Passwords do not match.");

      return;
    }


    const user = {

      name: formData.name,

      email: formData.email,

      phone: formData.phone,

      role: formData.role,

      password: formData.password

    };


    try {

      const response = await fetch(
        "http://localhost:8080/api/users/register",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify(user)
        }
      );


      if (response.ok) {

        alert("Registration Successful ✅");

        navigate("/login");

      } else {

        const message = await response.text();

        alert(
          message || "Registration failed ❌"
        );

      }

    } catch (error) {

      console.log("Registration error:", error);

      alert(
        "Backend connection error ❌"
      );

    }

  };


  return (

    <section className="register-page">

      <div className="register-card">

        <h1>
          Create Account 🌾
        </h1>

        <p>
          Join SmartAgri today
        </p>


        <form
          className="register-form"
          onSubmit={handleSubmit}
        >

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
          />


          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
          />


          <input
            type="tel"
            name="phone"
            placeholder="Mobile Number"
            value={formData.phone}
            onChange={handleChange}
          />


          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
          >

            <option value="">
              Select Role
            </option>

            <option value="Farmer">
              Farmer
            </option>

            <option value="Buyer">
              Buyer
            </option>

          </select>


          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />


          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
          />


          <button type="submit">
            Register
          </button>

        </form>

      </div>

    </section>

  );
}

export default Register;