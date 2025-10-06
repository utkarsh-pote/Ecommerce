// src/Client/Profile.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AdminProfile.css";
import NavBar from '../Home/NavBar';

function AdminProfile() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const email = localStorage.getItem("email");
    if (!email) {
      setError("No user logged in.");
      return;
    }

    axios
      .get(`http://localhost:8080/ecom/profile?email=${encodeURIComponent(email)}`)
      .then((res) => setUser(res.data))
      .catch((err) => {
        console.error(err);
        setError("Failed to load profile.");
      });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("email");
    localStorage.removeItem("role");
    navigate("/login");
  };

  if (error) return <div className="profile-loading">{error}</div>;
  if (!user) return <div className="profile-loading">Loading profile...</div>;

  return (
    <div>
        <NavBar />
    <div className="profile-page">
      <div className="profile-card">
        <h2 className="profile-title">User Profile</h2>
        <div className="profile-info">
          <p>
            <strong>Full Name:</strong> {user.firstName}{" "}
            {user.middleName ? user.middleName + " " : ""}
            {user.lastName}
          </p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Phone:</strong> {user.phone}</p>
          <p><strong>Gender:</strong> {user.gender || "Not set"}</p>
          <p><strong>Role:</strong> {user.role.toUpperCase()}</p>
          <p><strong>Account Created:</strong> {new Date(user.createdAt).toLocaleString()}</p>
        </div>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </div>
    </div>
    </div>
  );
}

export default AdminProfile;
