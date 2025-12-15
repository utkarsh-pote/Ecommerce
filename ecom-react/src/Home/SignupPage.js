import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "../utils/navigation";
import "./SignupPage.css";
import NavBar from './NavBar';

export default function SignupPage() {
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    middleName: "",
    lastName: "",
    gender: "",
    password: "",
    phone: "",
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      console.log("Attempting signup with:", formData);
      console.log("Calling Spring Boot endpoint: http://localhost:8080/ecom/user");
      
      // Use POST request to /user endpoint to match Spring Boot controller
      const response = await axios.post("http://localhost:8080/ecom/user", formData);
      
      console.log("Signup response:", response);
      
      if (response.data) {
        setMessage("User registered successfully!");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        setMessage("Error during registration.");
      }
    } catch (error) {
      console.error("Signup error:", error);
      console.error("Error details:", error.response?.data || error.message);
      
      if (error.code === "ECONNREFUSED" || error.message.includes("Network Error")) {
        setMessage("Cannot connect to server. Please make sure Spring Boot server is running on port 8080.");
      } else if (error.response?.status === 400) {
        setMessage("Invalid data provided. Please check your information.");
      } else {
        setMessage("Error during registration. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <div>
      <NavBar />
      <br />
      <div className="signup-page">
        <div className="signup-card">
          <h2>Create Account</h2>
          <p>Fill in the details to sign up</p>
          <form className="signup-form" onSubmit={handleSignup}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={loading}
            />
            <div className="name-fields">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                required
                disabled={loading}
              />
              <input
                type="text"
                name="middleName"
                placeholder="Middle Name"
                value={formData.middleName}
                onChange={handleChange}
                disabled={loading}
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </div>
            <select name="gender" value={formData.gender} onChange={handleChange} required disabled={loading}>
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              required
              disabled={loading}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              disabled={loading}
            />
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? "Signing Up..." : "Sign Up"}
            </button>
            <p className="message">{message}</p>
            <p className="login-text">
              Already have an account? <button type="button" onClick={handleLoginClick}>Sign in</button>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}