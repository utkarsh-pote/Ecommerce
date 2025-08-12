// App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductDetail from './Client/ProductDetail';
import ProductsList from './Client/ProductList';
import Home from './Client/Home';
import AddProduct from './Admin/AddProduct';
import UpdateProduct from './Admin/UpdateProduct';
import DeleteProduct from './Admin/DeleteProduct';


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
      </Routes>
      
    </Router>
  );
};


export default App;
