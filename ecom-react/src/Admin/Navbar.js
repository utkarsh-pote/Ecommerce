import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar({ productId, onDelete }) {
  return (
    <nav className="navbar">
      <div className="navbar-container">

        <div className="navbar-left">
          <Link to="/" className="navbar-brand">Home</Link>
          <Link to="/Products/" className="navbar-item">Products</Link>
          <Link to="/Products/add" className="navbar-item">Add Product</Link>
          <Link to={`/Products/update/${productId}`} className="navbar-item">Update Product</Link>
            <a href="/Products/" onClick={onDelete} className="navbar-item delete-button">Delete Product</a>
        </div>

        <div className="navbar-center">
          <div className="navbar-search">
            <input type="text" className="search-bar" placeholder="Search..." />
            <button type="button">Search</button>
          </div>
        </div>

        <div className="navbar-right">
          <Link to="/Admin/Profile" className="navbar-item">Profile</Link>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;
