// src/Client/Profile.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "../utils/navigation";
import "./ClientProfile.css";
import NavBar from '../Home/NavBar';

function ClientProfile() {
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

  if (error) {
    return (
      <div className="profile-loading">
        <div className="loading-spinner"></div>
        <div className="loading-text">{error}</div>
      </div>
    );
  }
  
  if (!user) {
    return (
      <div className="profile-loading">
        <div className="loading-spinner"></div>
        <div className="loading-text">Loading profile...</div>
      </div>
    );
  }

  const getInitials = () => {
    const firstName = user.firstName?.replace(/^user/, '').replace(/user$/, '') || '';
    const lastName = user.lastName?.replace(/^user/, '').replace(/user$/, '') || '';
    return (firstName.charAt(0) + lastName.charAt(0)).toUpperCase();
  };

  const getFullName = () => {
    const firstName = user.firstName?.replace(/^user/, '').replace(/user$/, '') || '';
    const middleName = user.middleName?.replace(/^user/, '').replace(/user$/, '') || '';
    const lastName = user.lastName?.replace(/^user/, '').replace(/user$/, '') || '';
    return `${firstName} ${middleName ? middleName + ' ' : ''}${lastName}`.trim();
  };

  return (
    <div>
      <NavBar />
      <div className="profile-page">
        <div className="profile-card">
          <div className="profile-header">
            <div className="profile-avatar">
              {getInitials()}
            </div>
            <h2 className="profile-title">{getFullName()}</h2>
            <p className="profile-subtitle">Client Profile</p>
          </div>
          
          <div className="profile-info">
            <div className="profile-field">
              <div className="field-label">
                <span>📧</span>
                Email Address
              </div>
              <div className="field-value">{user.email}</div>
            </div>
            
            <div className="profile-field">
              <div className="field-label">
                <span>📱</span>
                Phone Number
              </div>
              <div className="field-value">{user.phone || 'Not provided'}</div>
            </div>
            
            <div className="profile-field">
              <div className="field-label">
                <span>👤</span>
                Gender
              </div>
              <div className="field-value">{user.gender ? user.gender.charAt(0).toUpperCase() + user.gender.slice(1) : 'Not specified'}</div>
            </div>
            
            <div className="profile-field">
              <div className="field-label">
                <span>🏷️</span>
                Account Type
              </div>
              <div className="field-value">{user.role.toUpperCase()}</div>
            </div>
            
            <div className="profile-field">
              <div className="field-label">
                <span>📅</span>
                Member Since
              </div>
              <div className="field-value">{new Date(user.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
            </div>
          </div>
          
          <div className="profile-actions">
            <button className="edit-btn">Edit Profile</button>
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClientProfile;
