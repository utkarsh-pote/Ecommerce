// src/Client/LoginPage.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./LoginPage.css";
import NavBar from './NavBar';

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    try {
      const res = await axios.get(
        `http://localhost:8080/ecom/login?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`
      );
      const user = res.data;
      localStorage.setItem("email", user.email);
      localStorage.setItem("role", user.role);

      if (user.role === "admin") navigate("../Admin/Profile");
      else navigate("../Client/Profile");
    } catch (err) {
      console.error(err);
      alert("Login failed. Check email/password.");
    }
  };

  return (
    <div>
      <NavBar />
      <br />
    <div className="login-page">
      <div className="login-card">
        <div className="login-header">
          <h2>Welcome Back</h2>
          <p>Please enter your details</p>
        </div>
        <form onSubmit={handleLogin} className="login-form">
          <div className="input-group">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              required
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
          </div>
          <div className="login-options">
            <label>
              <input type="checkbox" /> Remember for 30 days
            </label>
            <a href="/">Forgot password?</a>
          </div>
          <button type="submit" className="btn-primary">
            Sign in
          </button>
          <button type="button" className="btn-google">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
              alt="Google"
            />
            Sign in with Google
          </button>
          <p className="signup-text">
            Don't have an account? <a href="/signup">Sign up</a>
          </p>
        </form>
      </div>
    </div>
    </div>
  );
}

export default LoginPage;
