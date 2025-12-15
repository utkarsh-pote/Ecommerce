// src/utils/navigation.js
import { useContext } from 'react';
import { NavigationContext } from '../App';

// Custom hook to replace useNavigate
export const useNavigate = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigate must be used within NavigationContext');
  }
  return context.navigate;
};

// Custom hook to replace useParams
export const useParams = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useParams must be used within NavigationContext');
  }
  
  const path = context.currentPath;
  const params = {};
  
  // Parse dynamic routes
  const patterns = [
    { pattern: '/Products/:id', match: /^\/Products\/([^\/]+)$/ },
    { pattern: '/Products/update/:id', match: /^\/Products\/update\/([^\/]+)$/ },
    { pattern: '/Products/delete/:id', match: /^\/Products\/delete\/([^\/]+)$/ }
  ];
  
  for (const { pattern, match } of patterns) {
    const result = path.match(match);
    if (result) {
      if (pattern.includes(':id')) {
        params.id = result[1];
      }
      break;
    }
  }
  
  return params;
};

// Custom hook to get current user
export const useAuth = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useAuth must be used within NavigationContext');
  }
  
  return {
    currentUser: context.currentUser,
    setCurrentUser: context.setCurrentUser
  };
};

// API utility functions
export const api = {
  // Products
  getProducts: async () => {
    const response = await fetch('/api/products');
    if (!response.ok) {
      throw new Error(`Failed to fetch products: ${response.status}`);
    }
    return response.json();
  },
  
  getProduct: async (id) => {
    const response = await fetch(`/api/products/${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch product: ${response.status}`);
    }
    return response.json();
  },
  
  createProduct: async (productData) => {
    const response = await fetch('/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productData),
    });
    return response.json();
  },
  
  updateProduct: async (id, productData) => {
    const response = await fetch(`/api/products/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productData),
    });
    return response.json();
  },
  
  deleteProduct: async (id) => {
    const response = await fetch(`/api/products/${id}`, {
      method: 'DELETE',
    });
    return response.json();
  },
  
  // Authentication
  login: async (credentials) => {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });
    return response.json();
  },
  
  signup: async (userData) => {
    const response = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    return response.json();
  },
  
  // Users
  getUser: async (id) => {
    const response = await fetch(`/api/users/${id}`);
    return response.json();
  },
  
  updateUser: async (id, userData) => {
    const response = await fetch(`/api/users/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    return response.json();
  }
};