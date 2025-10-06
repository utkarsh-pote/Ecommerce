// App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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


const App = () => {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Products" element={<ProductsList />} />
      <Route path="/Products/:id" element={<ProductDetail />} />
      <Route path="/Products/add" element={<AddProduct />} />
      <Route path="/Products/update/:id" element={<UpdateProduct />} />
      <Route path="/Products/delete/:id" element={<DeleteProduct />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/Client/Profile" element={<ClientProfile />} />
      <Route path="/Admin/Profile" element={<AdminProfile />} />
      </Routes>
      
    </Router>
  );
};


export default App;
