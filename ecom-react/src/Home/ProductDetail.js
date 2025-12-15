// ProductDetail.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from '../utils/navigation';
import './ProductDetail.css'; // Import your CSS 
import NavBar from './NavBar';

const ProductDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState(null); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError('');
        const response = await axios.get(`http://localhost:8080/ecom/products/${id}`);
        setProduct(response.data);
        console.log('Product fetched:', response.data);
      } catch (error) {
        console.error('There was an error fetching the product!', error);
        setError('Failed to load product details. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  const handleDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`http://localhost:8080/ecom/products/delete/${id}`);
      alert('Product deleted successfully!');
      navigate('/Products');
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Error deleting the product.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div>
        <NavBar />
        <div className="product-detail-container">
          <h2>Loading product details...</h2>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <NavBar />
        <div className="product-detail-container">
          <h2>Error</h2>
          <p>{error}</p>
          <button onClick={() => navigate('/Products')}>Back to Products</button>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div>
        <NavBar />
        <div className="product-detail-container">
          <h2>Product not found</h2>
          <button onClick={() => navigate('/Products')}>Back to Products</button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <NavBar />
      <div className="product-detail-container">
        <div className="product-image-container">
          <img 
            src={`http://localhost:8080/ecom/image/${product.imageUrl}`} 
            alt={product.name} 
            style={{ width: '300px', height: '400px', objectFit: 'cover' }}
          />
        </div>
        <div className="product-info-container">
          <h1 className="product-name" style={{ fontSize: '2em' }}>{product.name}</h1>
          <p className="product-price">
            ${product.price}
            {product.discount > 0 && (
              <span className="product-discount">
                {' '}
                - {product.discount}% off
              </span>
            )}
          </p>
          <div className="product-details">
            <p><strong>Category:</strong> {product.category}</p>
            <p><strong>Sub-Category:</strong> {product.subCategory}</p>
            <p><strong>Gender:</strong> {product.gender}</p>
            <p><strong>Available Quantity:</strong> {product.quantity}</p>
            <p><strong>Color:</strong> {product.color}</p>
            <p><strong>Description:</strong> {product.description}</p>
          </div>
          <div className="product-actions">
            <button className="add-to-cart-button">Add to Cart</button>
            <button onClick={() => navigate('/Products')} className="back-button">
              Back to Products
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
