import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Signup.css"; // Import the CSS file
import { Container } from "react-bootstrap";

function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState(""); // State for popup message

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://guvitask-jbma.onrender.com/api/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        // Signup successful, redirect to login page and show success message
        setMessage("Signup successful");
        window.location.href = "/login";
      } else {
        // Signup failed, handle the error response
        const data = await response.json();
        setMessage(`Signup failed: ${data.message}`);
      }
    } catch (error) {
      setMessage(`Error during signup: ${error.message}`);
    }
  };

  return (
    <Container className="vh-100 d-flex justify-content-center align-items-center">
      <div className="shadow-lg blur-background p-5 rounded-4">
        <h2 className="">Signup</h2>
        <form className="signup-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
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
          <button type="submit">Signup</button>
        </form>
        {message && <div className="popup-message">{message}</div>}
        <div className="login-link">
          <Link to="/login">Already have an account? Login here</Link>
        </div>
      </div>
    </Container>
  );
}

export default Signup;
