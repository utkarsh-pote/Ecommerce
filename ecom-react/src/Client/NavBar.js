import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

function NavBar({ productId, onDelete }) {
  return (
    <nav className="navbar">
      <div className="navbar-container">

        <div className="navbar-left">
          <Link to="/" className="navbar-brand">Home</Link>
          <Link to="/Products/" className="navbar-item">Products</Link>
        </div>

        <div className="navbar-center">
          <div className="navbar-search">
            <input type="text" className="search-bar" placeholder="Search..." />
            <button type="button">Search</button>
          </div>
        </div>

        <div className="navbar-right">
          <Link to="/Products/login" className="navbar-item">Signup/Login</Link>
        </div>

      </div>
    </nav>
  );
}

export default NavBar;
