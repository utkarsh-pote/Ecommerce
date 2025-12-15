import React from 'react';
import { useNavigate } from '../utils/navigation';
import './Navbar.css';

function Navbar({ productId, onDelete }) {
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
          <button onClick={() => handleNavClick("/Products/add")} className="navbar-item">Add Product</button>
          <button onClick={() => handleNavClick(`/Products/update/${productId}`)} className="navbar-item">Update Product</button>
          <button onClick={onDelete} className="navbar-item delete-button">Delete Product</button>
        </div>

        <div className="navbar-center">
          <div className="navbar-search">
            <input type="text" className="search-bar" placeholder="Search..." />
            <button type="button">Search</button>
          </div>
        </div>

        <div className="navbar-right">
          <button onClick={() => handleNavClick("/Admin/Profile")} className="navbar-item">Profile</button>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;
