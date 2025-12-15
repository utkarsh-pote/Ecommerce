import React from 'react';
import { useNavigate } from '../utils/navigation';
import './NavBar.css';

function NavBar({ productId, onDelete }) {
  const navigate = useNavigate();

  const handleNavClick = (path) => {
    navigate(path);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">

        <div className="navbar-left">
          <button onClick={() => handleNavClick("/")} className="navbar-brand">Home</button>
          <button onClick={() => handleNavClick("/Products")} className="navbar-item">Products</button>
        </div>

        <div className="navbar-center">
          <div className="navbar-search">
            <input type="text" className="search-bar" placeholder="Search..." />
            <button type="button">Search</button>
          </div>
        </div>

        <div className="navbar-right">
          <button onClick={() => handleNavClick("/Client/Profile")} className="navbar-item">Profile</button>
        </div>

      </div>
    </nav>
  );
}

export default NavBar;
