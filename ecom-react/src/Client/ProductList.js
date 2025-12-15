// ProductsList.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProductList.css'; // Import your CSS file
import { useNavigate } from '../utils/navigation';
import NavBar from '../Home/NavBar';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  // const path = './image/Product/'

  useEffect(() => {
    axios.get('http://localhost:8080/ecom/products')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the products!', error);
      });
  }, []);

  // console.log(products)

  return (
    <div>
      <NavBar /> <br></br>
    <div className="products-list">
      {/* <img src={`http://localhost:8080/ecom/image/image_4.jpg`} alt='Description'
        style={{ width: '50px', height: '50px' }}/> */}
      {products.map(product => (
        <div key={product.productId} className="product-card">
          <Link to={`/Products/${product.productId}`} >
          <img 
            src={`http://localhost:8080/ecom/image/${product.imageUrl}`} 
            alt={product.name} 
            style={{ width: '150px', height: '150px' }}
             />
          
          <h2 className="product-name" style={{ fontSize: '1em' }}>{product.name}</h2>
          <p className="product-price">${product.price}</p>
          <p className="product-category">{product.category}</p>
          </Link>
        </div>
      ))}
    </div>
    </div>
  );
};

export default ProductList;
