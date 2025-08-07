import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

// Create context
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userRole, setUserRole] = useState(null);
  const [userPermissions, setUserPermissions] = useState([]);

  // Check if token exists and is valid on app load
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('auth_token');
      
      if (!token) {
        setIsLoading(false);
        return;
      }
      
      try {
        // For mock token, decode from base64
        let decodedToken;
        try {
          decodedToken = JSON.parse(atob(token));
        } catch {
          // If not a mock token, try regular JWT decode
          decodedToken = jwtDecode(token);
        }
        
        const currentTime = Date.now() / 1000;
        
        if (decodedToken.exp < currentTime) {
          // Token expired
          logout();
          setIsLoading(false);
          return;
        }
        
        // Set auth header for all future requests
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        
        // Get user data from token
        setCurrentUser({
          id: decodedToken.sub,
          email: decodedToken.email,
          name: decodedToken.name,
        });
        setUserRole(decodedToken.role);
        setUserPermissions(decodedToken.permissions || []);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Auth token error:', error);
        logout();
      } finally {
        setIsLoading(false);
      }
    };
    
    checkAuth();
  }, []);

  // Login function - MOCK VERSION FOR DEVELOPMENT
  const login = async (email, password) => {
    try {
      // Mock credentials for development
      const validCredentials = [
        { 
          email: 'admin@riwayat.pk', 
          password: 'admin123', 
          role: 'admin', 
          name: 'Admin User',
          permissions: [
            "view_kitchens", 
            "edit_kitchen", 
            "approve_dish", 
            "view_orders", 
            "send_broadcast",
            "edit_kitchen_user",
            "delete_trusted_token",
            "view_user_documents",
            "add_kitchen_media",
            "edit_kitchen_media",
            "delete_kitchen_media",
            "upload_kitchen_logo",
            "set_banner_status",
            "view_kitchen_addresses",
            "edit_kitchen_addresses",
            "add_kitchen_address"
          ]
        },
        { 
          email: 'ops@riwayat.pk', 
          password: 'ops123', 
          role: 'operations', 
          name: 'Operations User',
          permissions: ["view_kitchens", "view_orders", "view_user_documents"]
        },
        { 
          email: 'support@riwayat.pk', 
          password: 'support123', 
          role: 'support', 
          name: 'Support User',
          permissions: ["view_kitchens", "view_orders"]
        }
      ];
      
      // Check if credentials match
      const matchedUser = validCredentials.find(
        user => user.email === email && user.password === password
      );
      
      if (!matchedUser) {
        return {
          success: false,
          message: 'Invalid email or password. Try using admin@riwayat.pk / admin123'
        };
      }
      
      // Create a mock token
      const mockToken = btoa(JSON.stringify({
        sub: '12345',
        email: matchedUser.email,
        name: matchedUser.name,
        role: matchedUser.role,
        permissions: matchedUser.permissions,
        exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60 // 24 hours from now
      }));
      
      // Store token in localStorage
      localStorage.setItem('auth_token', mockToken);
      
      // Set auth header for all future requests
      axios.defaults.headers.common['Authorization'] = `Bearer ${mockToken}`;
      
      // Update state
      setCurrentUser({
        id: '12345',
        email: matchedUser.email,
        name: matchedUser.name
      });
      setUserRole(matchedUser.role);
      setUserPermissions(matchedUser.permissions);
      setIsAuthenticated(true);
      
      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      return {
        success: false,
        message: 'Login failed. Please try again.'
      };
    }
  };

  // Logout function
  const logout = () => {
    // Remove token from localStorage
    localStorage.removeItem('auth_token');
    
    // Remove auth header
    delete axios.defaults.headers.common['Authorization'];
    
    // Reset state
    setCurrentUser(null);
    setUserRole(null);
    setUserPermissions([]);
    setIsAuthenticated(false);
  };

  // Check if user has specific role
  const hasRole = (requiredRole) => {
    if (!userRole) return false;
    
    // For simple role check
    if (typeof requiredRole === 'string') {
      return userRole === requiredRole;
    }
    
    // For array of roles
    if (Array.isArray(requiredRole)) {
      return requiredRole.includes(userRole);
    }
    
    return false;
  };

  // Check if user has specific permission
  const hasPermission = (requiredPermission) => {
    if (!userPermissions || userPermissions.length === 0) return false;
    
    // For simple permission check
    if (typeof requiredPermission === 'string') {
      return userPermissions.includes(requiredPermission);
    }
    
    // For array of permissions (check if user has ANY of the permissions)
    if (Array.isArray(requiredPermission)) {
      return requiredPermission.some(perm => userPermissions.includes(perm));
    }
    
    return false;
  };

  const value = {
    currentUser,
    isAuthenticated,
    isLoading,
    userRole,
    userPermissions,
    login,
    logout,
    hasRole,
    hasPermission
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
