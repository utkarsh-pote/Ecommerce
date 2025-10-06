import React, { useState } from "react";
import axios from "axios";
import "./SignupPage.css";
import NavBar from '../Client/NavBar';

export default function SignupPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
    role: "user",
    gender: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/ecom/user", formData);
      setMessage("User registered successfully!");
    } catch (error) {
      setMessage("Error during registration.");
    }
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
            <div className="name-fields">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="middleName"
                placeholder="Middle Name"
                value={formData.middleName}
                onChange={handleChange}
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>

            <input
              type="text"
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <select name="gender" value={formData.gender} onChange={handleChange} required>
              <option value="" disabled hidden>Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            <button type="submit" className="btn-primary">Sign Up</button>
            <p className="message">{message}</p>
            <p className="login-text">
              Already have an account? <a href="/login">Sign in</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}