import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from '../Home/NavBar';
import { useNavigate } from '../utils/navigation';
import './Cart.css';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updating, setUpdating] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    loadCartItems();
  }, []);

  const loadCartItems = async () => {
    try {
      const email = localStorage.getItem('email');
      if (!email) {
        setError('Please log in to view your cart');
        setLoading(false);
        return;
      }

      // Get user profile to get userId
      const userResponse = await axios.get(`http://localhost:8080/ecom/profile?email=${encodeURIComponent(email)}`);
      const userId = userResponse.data.id;

      // Get cart items for this user
      const cartResponse = await axios.get(`http://localhost:8080/ecom/cart/${userId}`);
      const cartData = cartResponse.data;

      // Get product details for each cart item
      const productPromises = cartData.map(async (item) => {
        try {
          const productResponse = await axios.get(`http://localhost:8080/ecom/products/${item.productId}`);
          return { id: item.productId, ...productResponse.data };
        } catch (err) {
          console.error(`Error fetching product ${item.productId}:`, err);
          return { id: item.productId, name: 'Product not found', image: '', description: '' };
        }
      });

      const productData = await Promise.all(productPromises);
      const productMap = {};
      productData.forEach(product => {
        productMap[product.id] = product;
      });

      setCartItems(cartData);
      setProducts(productMap);
      setLoading(false);
    } catch (err) {
      console.error('Error loading cart:', err);
      setError('Failed to load cart items');
      setLoading(false);
    }
  };

  const updateQuantity = async (cartId, userId, productId, newQuantity) => {
    if (newQuantity < 1) return;
    
    setUpdating(prev => ({ ...prev, [cartId]: true }));
    
    try {
      const cartItem = cartItems.find(item => item.cartId === cartId);
      const updatedItem = { ...cartItem, quantity: newQuantity };
      
      await axios.put(`http://localhost:8080/ecom/cart/put/${userId}/${productId}`, updatedItem);
      
      setCartItems(prev => 
        prev.map(item => 
          item.cartId === cartId ? { ...item, quantity: newQuantity } : item
        )
      );
    } catch (err) {
      console.error('Error updating quantity:', err);
      setError('Failed to update quantity');
    } finally {
      setUpdating(prev => ({ ...prev, [cartId]: false }));
    }
  };

  const removeFromCart = async (cartId) => {
    if (!window.confirm('Are you sure you want to remove this item?')) return;
    
    try {
      await axios.delete(`http://localhost:8080/ecom/cart/${cartId}`);
      setCartItems(prev => prev.filter(item => item.cartId !== cartId));
    } catch (err) {
      console.error('Error removing item:', err);
      setError('Failed to remove item');
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      const finalPrice = item.price - (item.price * item.discount / 100);
      return total + (finalPrice * item.quantity);
    }, 0);
  };

  const calculateSavings = () => {
    return cartItems.reduce((savings, item) => {
      const discountAmount = item.price * item.discount / 100;
      return savings + (discountAmount * item.quantity);
    }, 0);
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) return;
    // Implement checkout logic here
    alert('Checkout functionality will be implemented soon!');
  };

  if (loading) {
    return (
      <div>
        <NavBar />
        <div className="cart-loading">
          <div className="loading-spinner"></div>
          <p>Loading your cart...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <NavBar />
        <div className="cart-error">
          <div className="error-icon">⚠️</div>
          <h2>Oops! Something went wrong</h2>
          <p>{error}</p>
          <button onClick={() => navigate('/Products')} className="continue-shopping-btn">
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <NavBar />
      <div className="cart-container">
        <div className="cart-header">
          <h1>🛒 Shopping Cart</h1>
          <p className="cart-count">{cartItems.length} item{cartItems.length !== 1 ? 's' : ''}</p>
        </div>

        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <div className="empty-cart-icon">🛒</div>
            <h2>Your cart is empty</h2>
            <p>Looks like you haven't added anything to your cart yet.</p>
            <button onClick={() => navigate('/Products')} className="continue-shopping-btn">
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="cart-content">
            <div className="cart-items">
              {cartItems.map((item) => {
                const product = products[item.productId];
                const originalPrice = item.price;
                const discountAmount = originalPrice * item.discount / 100;
                const finalPrice = originalPrice - discountAmount;

                return (
                  <div key={item.cartId} className="cart-item">
                    <div className="item-image">
                      <img 
                        src={product?.image || '/api/placeholder/150/150'} 
                        alt={product?.name || 'Product'} 
                        onError={(e) => {
                          e.target.src = '/api/placeholder/150/150';
                        }}
                      />
                    </div>
                    
                    <div className="item-details">
                      <h3>{product?.name || 'Product'}</h3>
                      <p className="item-description">{product?.description || 'No description available'}</p>
                      <div className="item-status">
                        <span className={`status-badge ${item.status}`}>
                          {item.status === 'available' ? '✅ In Stock' : '⚠️ Limited Stock'}
                        </span>
                      </div>
                    </div>

                    <div className="item-price">
                      <div className="price-container">
                        {item.discount > 0 && (
                          <span className="original-price">₹{originalPrice.toFixed(2)}</span>
                        )}
                        <span className="final-price">₹{finalPrice.toFixed(2)}</span>
                        {item.discount > 0 && (
                          <span className="discount-badge">{item.discount}% OFF</span>
                        )}
                      </div>
                    </div>

                    <div className="item-quantity">
                      <button 
                        onClick={() => updateQuantity(item.cartId, item.userId, item.productId, item.quantity - 1)}
                        disabled={item.quantity <= 1 || updating[item.cartId]}
                        className="quantity-btn"
                      >
                        -
                      </button>
                      <span className="quantity-display">
                        {updating[item.cartId] ? '...' : item.quantity}
                      </span>
                      <button 
                        onClick={() => updateQuantity(item.cartId, item.userId, item.productId, item.quantity + 1)}
                        disabled={updating[item.cartId]}
                        className="quantity-btn"
                      >
                        +
                      </button>
                    </div>

                    <div className="item-total">
                      <span className="total-price">₹{(finalPrice * item.quantity).toFixed(2)}</span>
                    </div>

                    <div className="item-actions">
                      <button 
                        onClick={() => removeFromCart(item.cartId)}
                        className="remove-btn"
                        title="Remove from cart"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="cart-summary">
              <div className="summary-card">
                <h3>Order Summary</h3>
                
                <div className="summary-row">
                  <span>Subtotal ({cartItems.length} items)</span>
                  <span>₹{(calculateTotal() + calculateSavings()).toFixed(2)}</span>
                </div>

                {calculateSavings() > 0 && (
                  <div className="summary-row savings">
                    <span>Total Savings</span>
                    <span>-₹{calculateSavings().toFixed(2)}</span>
                  </div>
                )}

                <div className="summary-row shipping">
                  <span>Shipping</span>
                  <span className="free-shipping">FREE</span>
                </div>

                <hr className="summary-divider" />

                <div className="summary-row total">
                  <span>Total</span>
                  <span>₹{calculateTotal().toFixed(2)}</span>
                </div>

                {calculateSavings() > 0 && (
                  <div className="savings-highlight">
                    🎉 You saved ₹{calculateSavings().toFixed(2)}!
                  </div>
                )}

                <button 
                  onClick={handleCheckout}
                  className="checkout-btn"
                  disabled={cartItems.length === 0}
                >
                  Proceed to Checkout
                </button>

                <button 
                  onClick={() => navigate('/Products')}
                  className="continue-shopping-link"
                >
                  ← Continue Shopping
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;