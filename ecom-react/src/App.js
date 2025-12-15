// App.js

import React, { useState, useEffect } from 'react';
import ProductDetail from './Home/ProductDetail';
import ProductsList from './Home/ProductList';
import Home from './Home/Home';
import AddProduct from './Admin/AddProduct';
import UpdateProduct from './Admin/UpdateProduct';
import DeleteProduct from './Admin/DeleteProduct';
import SignupPage from './Home/SignupPage';
import LoginPage from './Home/LoginPage';
import ClientProfile from './Client/ClientProfile';
import AdminProfile from './Admin/AdminProfile';
import Cart from './Client/Cart';
import Orders from './Client/Orders';

// Custom routing context
export const NavigationContext = React.createContext();

const App = () => {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const [currentUser, setCurrentUser] = useState(null);

  // Navigation function to replace useNavigate
  const navigate = (path) => {
    setCurrentPath(path);
    window.history.pushState({}, '', path);
  };

  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Parse URL parameters for dynamic routes
  const parseParams = (pattern, path) => {
    const patternParts = pattern.split('/');
    const pathParts = path.split('/');
    
    if (patternParts.length !== pathParts.length) return null;
    
    const params = {};
    for (let i = 0; i < patternParts.length; i++) {
      if (patternParts[i].startsWith(':')) {
        const paramName = patternParts[i].slice(1);
        params[paramName] = pathParts[i];
      } else if (patternParts[i] !== pathParts[i]) {
        return null;
      }
    }
    return params;
  };

  // Route matching function
  const renderComponent = () => {
    const path = currentPath;
    
    // Static routes
    if (path === '/') return <Home />;
    if (path === '/Products') return <ProductsList />;
    if (path === '/Products/add') return <AddProduct />;
    if (path === '/signup') return <SignupPage />;
    if (path === '/login') return <LoginPage />;
    if (path === '/Client/Profile') return <ClientProfile />;
    if (path === '/Admin/Profile') return <AdminProfile />;
    if (path === '/cart') return <Cart />;
    if (path === '/orders') return <Orders />;
    
    // Dynamic routes
    let params;
    
    // Product detail route
    params = parseParams('/Products/:id', path);
    if (params) return <ProductDetail productId={params.id} />;
    
    // Update product route
    params = parseParams('/Products/update/:id', path);
    if (params) return <UpdateProduct productId={params.id} />;
    
    // Delete product route
    params = parseParams('/Products/delete/:id', path);
    if (params) return <DeleteProduct productId={params.id} />;
    
    // 404 page
    return <div>Page not found</div>;
  };

  const contextValue = {
    navigate,
    currentPath,
    currentUser,
    setCurrentUser
  };

  return (
    <NavigationContext.Provider value={contextValue}>
      <div className="App">
        {renderComponent()}
      </div>
    </NavigationContext.Provider>
  );
};

export default App;
