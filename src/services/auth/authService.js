import { mockUsers, generateMockToken } from '../../data/auth/mockAuth';

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Local storage keys
const TOKEN_KEY = 'riwayat_admin_token';
const USER_KEY = 'riwayat_admin_user';

/**
 * Authentication service for the Riwayat Admin Portal
 * In a real application, these methods would make actual API calls
 * For now, they simulate API behavior with mock data
 */
export const authService = {
  /**
   * Login with email and password
   * @param {string} email - User email
   * @param {string} password - User password
   * @returns {Promise<Object>} - User data with token
   */
  login: async (email, password) => {
    // Simulate API call delay
    await delay(800);
    
    // Find user with matching credentials
    const user = mockUsers.find(
      u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );
    
    if (!user) {
      throw new Error('Invalid email or password');
    }
    
    // Generate token
    const token = generateMockToken(user);
    
    // Create user data without password
    const userData = {
      email: user.email,
      name: user.name,
      role: user.role,
      avatar: user.avatar
    };
    
    // Store in local storage
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify(userData));
    
    return {
      user: userData,
      token
    };
  },
  
  /**
   * Logout the current user
   */
  logout: async () => {
    // Simulate API call delay
    await delay(300);
    
    // Clear local storage
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    
    return true;
  },
  
  /**
   * Check if user is authenticated
   * @returns {boolean}
   */
  isAuthenticated: () => {
    const token = localStorage.getItem(TOKEN_KEY);
    return !!token;
  },
  
  /**
   * Get current user data
   * @returns {Object|null} - User data or null if not authenticated
   */
  getCurrentUser: () => {
    try {
      const userJson = localStorage.getItem(USER_KEY);
      if (!userJson) return null;
      
      return JSON.parse(userJson);
    } catch (error) {
      console.error('Error parsing user data:', error);
      return null;
    }
  },
  
  /**
   * Get authentication token
   * @returns {string|null} - JWT token or null if not authenticated
   */
  getToken: () => {
    return localStorage.getItem(TOKEN_KEY);
  },
  
  /**
   * Verify if the current token is valid
   * @returns {Promise<boolean>} - True if token is valid
   */
  verifyToken: async () => {
    // Simulate API call delay
    await delay(500);
    
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) return false;
    
    // In a real app, this would validate with the backend
    // For now, we'll just check if it exists and has the expected format
    const parts = token.split('.');
    return parts.length === 3;
  },
  
  /**
   * Update user profile
   * @param {Object} userData - User data to update
   * @returns {Promise<Object>} - Updated user data
   */
  updateProfile: async (userData) => {
    // Simulate API call delay
    await delay(1000);
    
    const currentUser = authService.getCurrentUser();
    if (!currentUser) {
      throw new Error('Not authenticated');
    }
    
    // Update user data
    const updatedUser = {
      ...currentUser,
      ...userData
    };
    
    // Store updated data
    localStorage.setItem(USER_KEY, JSON.stringify(updatedUser));
    
    return updatedUser;
  }
};

export default authService;
