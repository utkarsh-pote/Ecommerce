import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from '../Home/NavBar';
import { useNavigate } from '../utils/navigation';
import './Orders.css';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [orderedItems, setOrderedItems] = useState([]);
  const [products, setProducts] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orderFilter, setOrderFilter] = useState('all');
  const navigate = useNavigate();

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const email = localStorage.getItem('email');
      if (!email) {
        setError('Please log in to view your orders');
        setLoading(false);
        return;
      }

      // Get user profile to get userId
      const userResponse = await axios.get(`http://localhost:8080/ecom/profile?email=${encodeURIComponent(email)}`);
      const userId = userResponse.data.id;

      // Get orders for this user
      const ordersResponse = await axios.get(`http://localhost:8080/ecom/order/${userId}`);
      const ordersData = ordersResponse.data || [];

      // Get ordered items for this user
      const orderedItemsResponse = await axios.get(`http://localhost:8080/ecom/ord/${userId}`);
      const orderedItemsData = orderedItemsResponse.data || [];

      // Get unique product IDs from ordered items
      const productIds = [...new Set(orderedItemsData.map(item => item.productId))];
      
      // Fetch product details for all products
      const productPromises = productIds.map(async (productId) => {
        try {
          const productResponse = await axios.get(`http://localhost:8080/ecom/products/${productId}`);
          return { id: productId, ...productResponse.data };
        } catch (err) {
          console.error(`Error fetching product ${productId}:`, err);
          return { id: productId, name: 'Product not found', image: '', description: '', price: 0 };
        }
      });

      const productData = await Promise.all(productPromises);
      const productMap = {};
      productData.forEach(product => {
        productMap[product.id] = product;
      });

      setOrders(ordersData);
      setOrderedItems(orderedItemsData);
      setProducts(productMap);
      setLoading(false);
    } catch (err) {
      console.error('Error loading orders:', err);
      if (err.response?.status === 204) {
        // No content - user has no orders
        setOrders([]);
        setOrderedItems([]);
        setLoading(false);
      } else {
        setError('Failed to load orders');
        setLoading(false);
      }
    }
  };

  const getOrderItems = (orderId) => {
    return orderedItems.filter(item => item.orderId === orderId);
  };

  const calculateOrderTotal = (orderId) => {
    const items = getOrderItems(orderId);
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getOrderStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'pending': return '#f59e0b';
      case 'processing': return '#3b82f6';
      case 'shipped': return '#8b5cf6';
      case 'delivered': return '#10b981';
      case 'cancelled': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const getOrderStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case 'pending': return '⏳';
      case 'processing': return '🔄';
      case 'shipped': return '🚚';
      case 'delivered': return '✅';
      case 'cancelled': return '❌';
      case 'completed': return '✅';
      default: return '📦';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const filteredOrders = orders.filter(order => {
    if (orderFilter === 'all') return true;
    return order.status?.toLowerCase() === orderFilter;
  });

  const getUniqueStatuses = () => {
    const statuses = orders.map(order => order.status?.toLowerCase()).filter(Boolean);
    const uniqueStatuses = [...new Set(statuses)];
    
    // Define order of statuses for better UX
    const statusOrder = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];
    return uniqueStatuses.sort((a, b) => {
      const aIndex = statusOrder.indexOf(a);
      const bIndex = statusOrder.indexOf(b);
      return (aIndex === -1 ? 999 : aIndex) - (bIndex === -1 ? 999 : bIndex);
    });
  };

  const getStatusLabel = (status) => {
    switch (status?.toLowerCase()) {
      case 'pending': return 'Pending';
      case 'processing': return 'Processing';
      case 'shipped': return 'Shipped';
      case 'delivered': return 'Delivered';
      case 'cancelled': return 'Cancelled';
      case 'completed': return 'Completed';
      default: return status?.charAt(0).toUpperCase() + status?.slice(1) || 'Unknown';
    }
  };

  const getFilteredOrdersCount = (filterStatus) => {
    if (filterStatus === 'all') return orders.length;
    return orders.filter(order => order.status?.toLowerCase() === filterStatus).length;
  };

  const getImageUrl = (imageName) => {
    if (!imageName) return '/api/placeholder/80/80';
    // Check if it's already a full URL
    if (imageName.startsWith('http')) return imageName;
    // Use your Spring Boot image endpoint
    return `http://localhost:8080/ecom/image/${imageName}`;
  };

  if (loading) {
    return (
      <div>
        <NavBar />
        <div className="orders-loading">
          <div className="loading-spinner"></div>
          <p>Loading your orders...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <NavBar />
        <div className="orders-error">
          <div className="error-icon">⚠️</div>
          <h2>Oops! Something went wrong</h2>
          <p>{error}</p>
          <button onClick={() => navigate('/products')} className="shop-now-btn">
            Start Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <NavBar />
      <div className="orders-container">
        <div className="orders-header">
          <h1>📦 My Orders</h1>
          <p className="orders-count">
            {orders.length} order{orders.length !== 1 ? 's' : ''} found
          </p>
        </div>

        {orders.length === 0 ? (
          <div className="empty-orders">
            <div className="empty-orders-icon">📦</div>
            <h2>No orders yet</h2>
            <p>You haven't placed any orders. Start shopping to see your orders here!</p>
            <button onClick={() => navigate('/products')} className="shop-now-btn">
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="orders-content">
            <div className="orders-header-with-filters">
              <div className="compact-filters">
                <div className="filter-dropdown">
                  <span className="filter-label">Your Orders</span>
                  <div className="filter-buttons-compact">
                    <button 
                      className={`filter-btn-compact ${orderFilter === 'all' ? 'active' : ''}`}
                      onClick={() => setOrderFilter('all')}
                      title="All Orders"
                    >
                      All ({orders.length})
                    </button>
                    {getUniqueStatuses().map(status => {
                      const count = getFilteredOrdersCount(status);
                      return (
                        <button 
                          key={status}
                          className={`filter-btn-compact ${orderFilter === status ? 'active' : ''}`}
                          onClick={() => setOrderFilter(status)}
                          title={`${getStatusLabel(status)} Orders`}
                        >
                          {getOrderStatusIcon(status)} {getStatusLabel(status)} ({count})
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
              
              <div className="orders-main-header">
                <h2>Order History</h2>
                <span className="total-count">Total: {orders.length}</span>
              </div>
            </div>

            <div className="orders-list">
              {filteredOrders.map((order) => {
                const orderItems = getOrderItems(order.orderId);
                const orderTotal = calculateOrderTotal(order.orderId);
                
                return (
                  <div key={order.orderId} className="order-card">
                    <div className="order-header">
                      <div className="order-info">
                        <h3>Order #{order.orderId}</h3>
                        <p className="order-date">
                          Placed on {formatDate(order.orderDate || order.createdAt)}
                        </p>
                      </div>
                      <div className="order-status">
                        <span 
                          className="status-badge"
                          style={{ 
                            backgroundColor: getOrderStatusColor(order.status) + '20',
                            color: getOrderStatusColor(order.status),
                            border: `1px solid ${getOrderStatusColor(order.status)}`
                          }}
                        >
                          {getOrderStatusIcon(order.status)} {order.status || 'Unknown'}
                        </span>
                      </div>
                      <div className="order-total">
                        <span className="total-label">Total:</span>
                        <span className="total-amount">₹{orderTotal.toFixed(2)}</span>
                      </div>
                    </div>

                    <div className="order-items">
                      <h4>Items ({orderItems.length})</h4>
                      <div className="items-grid">
                        {orderItems.map((item, index) => {
                          const product = products[item.productId];
                          return (
                            <div key={`${item.orderId}-${item.productId}-${index}`} className="order-item">
                              <div className="item-image">
                                <img 
                                  src={getImageUrl(product?.image)} 
                                  alt={product?.name || 'Product'}
                                  onError={(e) => {
                                    e.target.src = '/api/placeholder/80/80';
                                  }}
                                />
                              </div>
                              <div className="item-details">
                                <h5>{product?.name || 'Product'}</h5>
                                <p className="item-price">₹{item.price.toFixed(2)} each</p>
                                <p className="item-quantity">Quantity: {item.quantity}</p>
                                <p className="item-total">Subtotal: ₹{(item.price * item.quantity).toFixed(2)}</p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <div className="order-actions">
                      <button 
                        className="track-order-btn"
                        onClick={() => setSelectedOrder(selectedOrder === order.orderId ? null : order.orderId)}
                      >
                        {selectedOrder === order.orderId ? 'Hide Details' : 'View Details'}
                      </button>
                      {order.status?.toLowerCase() === 'delivered' && (
                        <button className="reorder-btn">
                          Reorder Items
                        </button>
                      )}
                    </div>

                    {selectedOrder === order.orderId && (
                      <div className="order-details-expanded">
                        <div className="details-grid">
                          <div className="detail-item">
                            <strong>Order ID:</strong> {order.orderId}
                          </div>
                          <div className="detail-item">
                            <strong>Status:</strong> {order.status || 'Processing'}
                          </div>
                          <div className="detail-item">
                            <strong>Order Date:</strong> {formatDate(order.orderDate || order.createdAt)}
                          </div>
                          {order.addressId && (
                            <div className="detail-item">
                              <strong>Delivery Address ID:</strong> {order.addressId}
                            </div>
                          )}
                          <div className="detail-item">
                            <strong>Total Items:</strong> {orderItems.length}
                          </div>
                          <div className="detail-item">
                            <strong>Total Amount:</strong> ₹{orderTotal.toFixed(2)}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;