import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from '../utils/navigation';
import './AddProduct.css';
import NavBar from '../Home/NavBar';

const AddProduct = () => {
  const [product, setProduct] = useState({
    name: '',
    price: '',
    discount: '',
    gender: '',
    quantity: '',
    color: '',
    imageUrl: '',
    description: '',
    category: '',
    subCategory: ''
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError('');
      await axios.post('http://localhost:8080/ecom/products/add', product);
      alert('Product added successfully!');
      navigate('/Products');
    } catch (error) {
      console.error('There was an error adding the product!', error);
      setError('Failed to add product. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <NavBar />
    <div className="add-product-container">
      <form className="add-product-form" onSubmit={handleSubmit}>
        <h2>Add New Product</h2>
        {error && <p className="error-message">{error}</p>}
        <div className="form-group">
          <label htmlFor="name">Product Name</label>
          <input
            type="text"
            name="name"
            id="name"
            value={product.name}
            onChange={handleChange}
            required
            disabled={loading}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input
            type="number"
            step="0.01"
            name="price"
            id="price"
            value={product.price}
            onChange={handleChange}
            required
            disabled={loading}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="discount">Discount</label>
          <input
            type="number"
            name="discount"
            id="discount"
            value={product.discount}
            onChange={handleChange}
            disabled={loading}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="gender">Gender</label>
          <select
            name="gender"
            id="gender"
            value={product.gender}
            onChange={handleChange}
            required
            disabled={loading}
            className="form-control"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Unisex">Unisex</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="quantity">Quantity</label>
          <input
            type="number"
            name="quantity"
            id="quantity"
            value={product.quantity}
            onChange={handleChange}
            required
            disabled={loading}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="color">Color</label>
          <input
            type="text"
            name="color"
            id="color"
            value={product.color}
            onChange={handleChange}
            disabled={loading}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="imageUrl">Image URL</label>
          <input
            type="text"
            name="imageUrl"
            id="imageUrl"
            value={product.imageUrl}
            onChange={handleChange}
            className="form-control"
            disabled={loading}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            id="description"
            value={product.description}
            onChange={handleChange}
            required
            disabled={loading}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <input
            type="text"
            name="category"
            id="category"
            value={product.category}
            onChange={handleChange}
            required
            disabled={loading}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="subCategory">Sub Category</label>
          <input
            type="text"
            name="subCategory"
            id="subCategory"
            value={product.subCategory}
            onChange={handleChange}
            disabled={loading}
            className="form-control"
          />
        </div>
        <button type="submit" className="add-product-btn" disabled={loading}>
          {loading ? 'Adding Product...' : 'Add Product'}
        </button>
      </form>
    </div>
    </div>
  );
};

export default AddProduct;

