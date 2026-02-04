// contexts/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { API_ENDPOINTS } from '../config/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const verifyAuth = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      
      if (!token) {
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }

      const response = await fetch(API_ENDPOINTS.VERIFY_TOKEN, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Invalid token');
      }

      setIsAuthenticated(true);
      
      // Only redirect if we're on login page and already authenticated
      if (location.pathname === '/admin/login') {
        navigate('/admin/dashboard');
      }
    } catch (error) {
      console.error('Auth verification failed:', error);
      localStorage.removeItem('adminToken');
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    verifyAuth();
  }, []);

  // Separate effect for handling navigation based on auth state
  useEffect(() => {
    if (!loading) {
      const isAdminRoute = location.pathname.startsWith('/admin');
      const isLoginPage = location.pathname === '/admin/login';
      
      if (isAdminRoute && !isAuthenticated && !isLoginPage) {
        navigate('/admin/login');
      }
    }
  }, [isAuthenticated, loading, location.pathname, navigate]);

  const value = {
    isAuthenticated,
    setIsAuthenticated,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};