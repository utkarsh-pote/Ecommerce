// ProductDetail.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams , useNavigate} from 'react-router-dom';
import './ProductDetail.css'; // Import your CSS 
import NavBar from './NavBar';

const ProductDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState(null); 
  const [img, setImg] = useState('')

  useEffect(() => {
    axios.get(`http://localhost:8080/ecom/products/${id}`)
      .then(response => {
        setProduct(response.data);
        setImg(response.data.imageUrl)
        console.log(response.data.imageUrl)
      })
      .catch(error => {
        console.error('There was an error fetching the product!', error);
      });
  }, [id]);

  // const imgUrl = `./assets/image/Product/${img}`

  

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8080/ecom/products/delete/${id}`);
      alert('Product deleted successfully!');
      navigate(`/Products`);
    } catch (error) {
      console.error('Error deleting product', error);
      alert('Failed to delete product. Please try again.');
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  const discountedPrice = product.price * (1 - product.discount / 100);

  return (
    <div>
        <NavBar />
    <div className="product-detail-container">
      <div className="product-image-container">
      <img 
            src={`http://localhost:8080/ecom/image/${product.imageUrl}`} 
            alt={product.name} 
            style={{ width: '200px', height: '300px' }}
        />

      </div>
      <div className="product-info-container">
        <h1 className="product-name" style={{ fontSize: '2em' }}>{product.name}</h1>
        <p className="product-price">
            ${discountedPrice.toFixed(2)}
            {product.discount > 0 && (
              <span className="product-original-price">
                ${product.price.toFixed(2)}
              </span>
            )}
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
        </div>
        <button className="add-to-cart-button">Add to Cart</button>
      </div>
    </div>
    <div className="product-detail-container">
    <p className="product-description"><strong>Description:</strong> {product.description}</p>
    </div>
    </div>
  );
};


export default ProductDetail;
