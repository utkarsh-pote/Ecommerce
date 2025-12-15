import React, { useState } from 'react';
import axios from 'axios';

const ConnectionTest = () => {
  const [testResults, setTestResults] = useState({});
  const [testing, setTesting] = useState(false);

  const testEndpoints = async () => {
    setTesting(true);
    const results = {};

    // Test basic connectivity to Spring Boot
    try {
      console.log("Testing Spring Boot connectivity...");
      const response = await axios.get('http://localhost:8080/ecom/user', { timeout: 5000 });
      results.springBootHealth = { status: 'SUCCESS', data: `Connected! Found ${response.data?.length || 0} users` };
    } catch (error) {
      if (error.response) {
        results.springBootHealth = { status: 'ENDPOINT_ACCESSIBLE', error: `HTTP ${error.response.status} (Spring Boot is running)` };
      } else {
        results.springBootHealth = { status: 'FAILED', error: error.message };
      }
    }

    // Test login endpoint with GET method and query params
    try {
      console.log("Testing login endpoint...");
      const response = await axios.get('http://localhost:8080/ecom/login', {
        params: { email: 'test@example.com', password: 'testpass' },
        timeout: 5000
      });
      results.loginEndpoint = { status: 'ENDPOINT_ACCESSIBLE', data: response.data };
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          results.loginEndpoint = { status: 'ENDPOINT_WORKING', error: 'HTTP 401: Invalid credentials (expected for test data)' };
        } else {
          results.loginEndpoint = { status: 'ENDPOINT_ACCESSIBLE', error: `HTTP ${error.response.status}: ${error.response.data?.message || 'Response received'}` };
        }
      } else {
        results.loginEndpoint = { status: 'FAILED', error: error.message };
      }
    }

    // Test user creation endpoint (signup)
    try {
      console.log("Testing user creation endpoint...");
      const response = await axios.post('http://localhost:8080/ecom/user', {
        username: 'testuser',
        email: 'test@test.com',
        password: 'testpass',
        role: 'client'
      }, { timeout: 5000 });
      results.signupEndpoint = { status: 'SUCCESS', data: 'User creation endpoint working' };
    } catch (error) {
      if (error.response) {
        results.signupEndpoint = { status: 'ENDPOINT_ACCESSIBLE', error: `HTTP ${error.response.status}: ${error.response.data?.message || 'Endpoint reachable'}` };
      } else {
        results.signupEndpoint = { status: 'ENDPOINT_NOT_ACCESSIBLE', error: error.message };
      }
    }

    // Test products endpoint
    try {
      console.log("Testing products endpoint...");
      const response = await axios.get('/ecom/products', { timeout: 5000 });
      results.productsEndpoint = { status: 'SUCCESS', data: `Found ${response.data?.length || 0} products` };
    } catch (error) {
      results.productsEndpoint = { status: 'FAILED', error: error.message };
    }

    setTestResults(results);
    setTesting(false);
  };

  return (
    <div style={{ padding: '20px', backgroundColor: '#f5f5f5', margin: '20px', borderRadius: '8px' }}>
      <h3>🔧 Spring Boot Connection Test</h3>
      <button 
        onClick={testEndpoints} 
        disabled={testing}
        style={{ 
          padding: '10px 20px', 
          backgroundColor: '#007bff', 
          color: 'white', 
          border: 'none', 
          borderRadius: '4px',
          cursor: testing ? 'not-allowed' : 'pointer'
        }}
      >
        {testing ? 'Testing...' : 'Test Spring Boot Connection'}
      </button>

      {Object.keys(testResults).length > 0 && (
        <div style={{ marginTop: '20px' }}>
          <h4>Test Results:</h4>
          {Object.entries(testResults).map(([test, result]) => (
            <div key={test} style={{ 
              margin: '10px 0', 
              padding: '10px', 
              backgroundColor: result.status.includes('SUCCESS') || result.status.includes('ACCESSIBLE') ? '#d4edda' : '#f8d7da',
              border: `1px solid ${result.status.includes('SUCCESS') || result.status.includes('ACCESSIBLE') ? '#c3e6cb' : '#f5c6cb'}`,
              borderRadius: '4px'
            }}>
              <strong>{test}:</strong> {result.status}
              {result.error && <div style={{ color: '#721c24', fontSize: '14px' }}>Error: {result.error}</div>}
              {result.data && <div style={{ color: '#155724', fontSize: '14px' }}>Data: {JSON.stringify(result.data)}</div>}
            </div>
          ))}
        </div>
      )}

      <div style={{ marginTop: '20px', fontSize: '14px', color: '#666' }}>
        <strong>Your Spring Boot endpoints:</strong>
        <ul>
          <li>Spring Boot server: <code>http://localhost:8080</code></li>
          <li>Login: <code>GET /ecom/login?email=...&password=...</code></li>
          <li>Signup: <code>POST /ecom/user</code> (with JSON body)</li>
          <li>Products: <code>GET /ecom/products</code></li>
          <li>Profile: <code>GET /ecom/profile?email=...</code></li>
        </ul>
      </div>
    </div>
  );
};

export default ConnectionTest;