// src/Client/NavBar.js
import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./NavBar.css";

function NavBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const email = localStorage.getItem("email");
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.removeItem("email");
    localStorage.removeItem("role");
    navigate("/login");
  };

  // Detect if current page is Product List page
  const isProductListPage = location.pathname === "/Products";

  // Detect if current page is Product Detail page
  const productDetailMatch = location.pathname.match(/^\/Products\/(\d+)$/);
  const currentProductId = productDetailMatch ? productDetailMatch[1] : null;

  return (
    <nav className="navbar">
      <div className="navbar-container">

        {/* Left Side */}
        <div className="navbar-left">
          <Link to="/" className="navbar-brand">Home</Link>
          <Link to="/Products" className="navbar-item">Products</Link>

          {/* Admin Only Links */}
          {role === "admin" && (
            <>
              {isProductListPage && (
                <Link to="/Products/add" className="navbar-item">Add Product</Link>
              )}
              {currentProductId && (
                <>
                  <Link to={`/Products/update/${currentProductId}`} className="navbar-item">
                    Update Product
                  </Link>
                  <Link to={`/Products/delete/${currentProductId}`} className="navbar-item">
                    Delete Product
                  </Link>
                </>
              )}
            </>
          )}
        </div>

        {/* Center - Search Bar */}
        <div className="navbar-center">
          <div className="navbar-search">
            <input type="text" className="search-bar" placeholder="Search..." />
            <button type="button">Search</button>
          </div>
        </div>

        {/* Right Side */}
        <div className="navbar-right">
          <Link to="/orders" className="navbar-item">Orders</Link>
          <Link to="/cart" className="navbar-item">Cart</Link>
          {!email ? (
            <Link to="/login" className="navbar-item">Signup/Login</Link>
          ) : (
            <>
              <Link
                to={role === "admin" ? "/Admin/Profile" : "/Client/Profile"}
                className="navbar-item"
              >
                Profile
              </Link>
            </>
          )}
        </div>

      </div>
    </nav>
  );
}

export default NavBar;
