import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css"; // Import the CSS file
import axios from "axios";
import { Container } from "react-bootstrap";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const navigate = useNavigate(); // useNavigate hook for navigation

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post("https://guvitask-jbma.onrender.com/api/login", formData)
      .then((res) => {
        console.log(res.data.return);
        localStorage.setItem("userId", res.data.return._id);
        navigate("/profile");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <Container className="vh-100 d-flex justify-content-center align-items-center">
      <div className="shadow-lg blur-background p-5 rounded-4">
        <h2 className="login-heading">Login</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            value={formData.email}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            value={formData.password}
          />
          <button type="submit">Login</button>
        </form>
        <div className="signup-link">
          <Link to="/">Don't have an account? Signup here</Link>
        </div>
      </div>
    </Container>
  );
}

export default Login;
