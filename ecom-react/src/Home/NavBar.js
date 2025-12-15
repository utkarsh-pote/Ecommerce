// src/Home/NavBar.js - Unified NavBar Component
import React from "react";
import { useNavigate } from "../utils/navigation";
import { NavigationContext } from "../App";
import { useContext } from "react";
import "./NavBar.css";

function NavBar() {
  const navigate = useNavigate();
  const context = useContext(NavigationContext);
  const currentPath = context.currentPath;
  
  const email = localStorage.getItem("email");
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.removeItem("email");
    localStorage.removeItem("role");
    localStorage.removeItem("userId");
    navigate("/login");
  };

  const handleNavClick = (path) => {
    navigate(path);
  };

  // Detect if current page is Product List page
  const isProductListPage = currentPath === "/Products";

  // Detect if current page is Product Detail page
  const productDetailMatch = currentPath.match(/^\/Products\/(\d+)$/);
  const currentProductId = productDetailMatch ? productDetailMatch[1] : null;

  return (
    <nav className="navbar">
      <div className="navbar-container">

        {/* Left Side - Navigation Links */}
        <div className="navbar-left">
          <button onClick={() => handleNavClick("/")} className="navbar-brand">
            🏠 Home
          </button>
          <button onClick={() => handleNavClick("/Products")} className="navbar-item">
            📦 Products
          </button>

          {/* Admin Only Links - Always show for admin */}
          {role === "admin" && (
            <>
              <button 
                onClick={() => handleNavClick("/Products/add")} 
                className="navbar-item admin-item"
                title="Add new product"
              >
                ➕ Add Product
              </button>
              
              {/* Show Update/Delete only if on product detail page */}
              {currentProductId && (
                <>
                  <button 
                    onClick={() => handleNavClick(`/Products/update/${currentProductId}`)} 
                    className="navbar-item admin-item"
                    title="Update current product"
                  >
                    ✏️ Update Product
                  </button>
                  <button 
                    onClick={() => handleNavClick(`/Products/delete/${currentProductId}`)} 
                    className="navbar-item admin-item delete-item"
                    title="Delete current product"
                  >
                    🗑️ Delete Product
                  </button>
                </>
              )}
            </>
          )}
        </div>

        {/* Center - Search Bar */}
        <div className="navbar-center">
          <div className="navbar-search">
            <input 
              type="text" 
              className="search-bar" 
              placeholder="Search products..." 
            />
            <button type="button" className="search-btn">
              🔍 Search
            </button>
          </div>
        </div>

        {/* Right Side - User Actions */}
        <div className="navbar-right">
          {/* Show Orders and Cart only for logged in users (not admin) */}
          {email && role !== "admin" && (
            <>
              <button onClick={() => handleNavClick("/orders")} className="navbar-item">
                📋 Orders
              </button>
              <button onClick={() => handleNavClick("/cart")} className="navbar-item">
                🛒 Cart
              </button>
            </>
          )}
          
          {!email ? (
            <>
              <button onClick={() => handleNavClick("/login")} className="navbar-item login-btn">
                🔐 Login
              </button>
              <button onClick={() => handleNavClick("/signup")} className="navbar-item signup-btn">
                ✨ Sign Up
              </button>
            </>
          ) : (
            <button
              onClick={() => handleNavClick(role === "admin" ? "/Admin/Profile" : "/Client/Profile")}
              className="navbar-item profile-btn"
              title={`${role === "admin" ? "Admin" : "User"} Profile`}
            >
              👤 {role === "admin" ? "Admin" : "Profile"}
            </button>
          )}
        </div>

      </div>
    </nav>
  );
}

export default NavBar;
