/**
 * Token Storage Utility
 * Secure token management for authentication
 */

const TOKEN_KEY = 'access_token';
const USER_KEY = 'user_info';
const EXPIRY_KEY = 'token_expiry';

export const TokenStorage = {
  // Access Token Management
  setAccessToken: (token) => {
    try {
      localStorage.setItem(TOKEN_KEY, token);
    } catch (error) {
      console.error('Failed to store access token:', error);
    }
  },

  getAccessToken: () => {
    try {
      return localStorage.getItem(TOKEN_KEY);
    } catch (error) {
      console.error('Failed to retrieve access token:', error);
      return null;
    }
  },

  removeAccessToken: () => {
    try {
      localStorage.removeItem(TOKEN_KEY);
    } catch (error) {
      console.error('Failed to remove access token:', error);
    }
  },

  // User Info Management
  setUserInfo: (userInfo) => {
    try {
      localStorage.setItem(USER_KEY, JSON.stringify(userInfo));
    } catch (error) {
      console.error('Failed to store user info:', error);
    }
  },

  getUserInfo: () => {
    try {
      const userInfo = localStorage.getItem(USER_KEY);
      return userInfo ? JSON.parse(userInfo) : null;
    } catch (error) {
      console.error('Failed to retrieve user info:', error);
      return null;
    }
  },

  removeUserInfo: () => {
    try {
      localStorage.removeItem(USER_KEY);
    } catch (error) {
      console.error('Failed to remove user info:', error);
    }
  },

  // Token Expiry Management
  setTokenExpiry: (expiresIn) => {
    try {
      const expiryTime = Date.now() + (expiresIn * 1000);
      localStorage.setItem(EXPIRY_KEY, expiryTime.toString());
    } catch (error) {
      console.error('Failed to store token expiry:', error);
    }
  },

  getTokenExpiry: () => {
    try {
      const expiry = localStorage.getItem(EXPIRY_KEY);
      return expiry ? parseInt(expiry, 10) : null;
    } catch (error) {
      console.error('Failed to retrieve token expiry:', error);
      return null;
    }
  },

  isTokenExpired: () => {
    try {
      const expiry = TokenStorage.getTokenExpiry();
      return expiry ? Date.now() > expiry : true;
    } catch (error) {
      console.error('Failed to check token expiry:', error);
      return true;
    }
  },

  // Clear all stored data
  clearAll: () => {
    try {
      TokenStorage.removeAccessToken();
      TokenStorage.removeUserInfo();
      localStorage.removeItem(EXPIRY_KEY);
    } catch (error) {
      console.error('Failed to clear all stored data:', error);
    }
  }
};

export default TokenStorage;
