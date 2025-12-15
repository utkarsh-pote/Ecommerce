// src/Home/LoginPage.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "../utils/navigation";
import "./LoginPage.css";
import NavBar from './NavBar';

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    try {
      setLoading(true);
      console.log("Attempting login with:", { email, password });
      console.log("Step 1: Validating credentials at Spring Boot /ecom/login");
      
      // Step 1: Validate credentials using Spring Boot /login endpoint
      const loginResponse = await axios.get("http://localhost:8080/ecom/login", {
        params: {
          email: email,
          password: password
        }
      });
      
      console.log("Login validation response:", loginResponse);
      
      if (loginResponse.status === 200) {
        console.log("Step 2: Getting user profile at Spring Boot /ecom/profile");
        
        // Step 2: Get user profile details including role
        const profileResponse = await axios.get("http://localhost:8080/ecom/profile", {
          params: {
            email: email
          }
        });
        
        console.log("Profile response:", profileResponse);
        
        if (profileResponse.data && profileResponse.data.email) {
          const user = profileResponse.data;
          localStorage.setItem("email", user.email);
          localStorage.setItem("role", user.role);
          localStorage.setItem("userId", user.id);

          console.log("Login successful, redirecting based on role:", user.role);
          
          if (user.role === "admin") {
            navigate("/Admin/Profile");
          } else {
            navigate("/Client/Profile");
          }
        } else {
          console.log("Profile fetch failed - no email in response:", profileResponse.data);
          alert("Login failed. Could not retrieve user profile.");
        }
      } else {
        console.log("Login validation failed with status:", loginResponse.status);
        alert("Login failed. Please check your credentials.");
      }
    } catch (err) {
      console.error("Login error:", err);
      console.error("Error details:", err.response?.data || err.message);
      console.error("Error status:", err.response?.status);
      console.error("Error config:", err.config);
      
      if (err.code === "ECONNREFUSED" || err.message.includes("Network Error")) {
        alert("Cannot connect to server. Please make sure Spring Boot server is running on port 8080.");
      } else if (err.response?.status === 401) {
        alert("Invalid email or password. Please try again.");
      } else if (err.response?.status === 404) {
        alert("Login endpoint not found. Please check server configuration.");
      } else if (err.response?.status === 500) {
        alert("Server error occurred. Please try again later.");
      } else {
        alert(`Login failed: ${err.response?.data?.message || err.message || 'Unknown error'}. Please try again.`);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSignupClick = () => {
    navigate("/signup");
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
                disabled={loading}
              />
            </div>
            <div className="input-group">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
                disabled={loading}
              />
            </div>
            <div className="login-options">
              <label>
                <input type="checkbox" /> Remember for 30 days
              </label>
              <button type="button" onClick={() => navigate("/")}>Forgot password?</button>
            </div>
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? "Signing in..." : "Sign in"}
            </button>
            <button type="button" className="btn-google" disabled={loading}>
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                alt="Google"
              />
              Sign in with Google
            </button>
            <p className="signup-text">
              Don't have an account? <button type="button" onClick={handleSignupClick}>Sign up</button>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
