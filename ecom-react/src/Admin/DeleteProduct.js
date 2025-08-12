// DeleteProduct.js
import React, { useState } from 'react';
import axios from 'axios';
import './DeleteProduct.css';

const DeleteProduct = () => {
  const [id, setId] = useState('');
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setId(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.delete(`http://localhost:8080/ecom/products/delete/${id}`)
      .then(response => {
        setMessage('Product deleted successfully!');
        setId('');
      })
      .catch(error => {
        setMessage('Error deleting the product.');
        console.error('Error deleting the product:', error);
      });
  };

  return (
    <div className="delete-product-container">
      <h1>Delete Product</h1>
      <form onSubmit={handleSubmit}>
        <input type="number" value={id} onChange={handleChange} placeholder="Product ID" required />
        <button type="submit">Delete Product</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default DeleteProduct;
