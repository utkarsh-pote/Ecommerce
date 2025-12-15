// ProductsList.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProductList.css'; // Import your CSS file
import { useNavigate } from '../utils/navigation';
import NavBar from './NavBar';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:8080/ecom/products');
        setProducts(response.data);
      } catch (error) {
        console.error('There was an error fetching the products!', error);
        setError('Failed to load products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleProductClick = (productId) => {
    navigate(`/Products/${productId}`);
  };

  if (loading) {
    return (
      <div>
        <NavBar />
        <div className="loading">Loading products...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <NavBar />
        <div className="error">{error}</div>
      </div>
    );
  }

  return (
    <div>
      <NavBar /> <br />
      <div className="products-list">
        {products.length === 0 ? (
          <div className="no-products">No products available</div>
        ) : (
          products.map(product => (
            <div key={product.productId} className="product-card" onClick={() => handleProductClick(product.productId)}>
              <img 
                src={`http://localhost:8080/ecom/image/${product.imageUrl}`} 
                alt={product.name} 
                style={{ width: '150px', height: '150px', objectFit: 'cover', cursor: 'pointer' }}
              />
              <h2 className="product-name" style={{ fontSize: '1em' }}>{product.name}</h2>
              <p className="product-price">${product.price}</p>
              <p className="product-category">{product.category}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProductList;
