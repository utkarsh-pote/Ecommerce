// DeleteProduct.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from '../utils/navigation';
import './DeleteProduct.css';
import NavBar from '../Home/NavBar';

const DeleteProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      if (id) {
        try {
          setLoading(true);
          const response = await axios.get(`http://localhost:8080/ecom/products/${id}`);
          setProduct(response.data);
        } catch (error) {
          setMessage('Error fetching product details.');
          console.error('Error fetching product:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchProduct();
  }, [id]);

  const handleDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`http://localhost:8080/ecom/products/delete/${id}`);
      setMessage('Product deleted successfully!');
      setTimeout(() => {
        navigate('/Products');
      }, 2000);
    } catch (error) {
      setMessage('Error deleting the product.');
      console.error('Error deleting the product:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!id) {
    return (
      <div>
        <NavBar />
        <div className="delete-product-container">
          <h1>Delete Product</h1>
          <p>No product ID provided.</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <NavBar />
      <div className="delete-product-container">
        <h1>Delete Product</h1>
        {loading && <p>Loading...</p>}
        {product && (
          <div className="product-details">
            <h3>Product to Delete:</h3>
            <p><strong>Name:</strong> {product.name}</p>
            <p><strong>Price:</strong> ${product.price}</p>
            <p><strong>Category:</strong> {product.category}</p>
            <p><strong>Description:</strong> {product.description}</p>
            <button 
              onClick={handleDelete} 
              className="delete-btn"
              disabled={loading}
            >
              {loading ? 'Deleting...' : 'Confirm Delete'}
            </button>
            <button 
              onClick={() => navigate('/Products')} 
              className="cancel-btn"
              disabled={loading}
            >
              Cancel
            </button>
          </div>
        )}
        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
};

export default DeleteProduct;
