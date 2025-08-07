import {
  mockDishes,
  getDishById,
  getDishesByKitchenId,
  getDishesByStatus,
  getDishesByCategory,
  getDishesByCuisine,
  getDishCategories,
  getDishCuisines,
  getDishStatuses
} from '../../data/dishes/mockDishes';

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Dish service for the Riwayat Admin Portal
 * In a real application, these methods would make actual API calls
 * For now, they simulate API behavior with mock data
 */
export const dishService = {
  /**
   * Get all dishes
   * @returns {Promise<Array>} - List of all dishes
   */
  getAllDishes: async () => {
    // Simulate API call delay
    await delay(800);
    return [...mockDishes];
  },
  
  /**
   * Get dish by ID
   * @param {number|string} dishId - Dish ID
   * @returns {Promise<Object>} - Dish details
   */
  getDishById: async (dishId) => {
    // Simulate API call delay
    await delay(500);
    
    const dish = getDishById(dishId);
    if (!dish) {
      throw new Error(`Dish with ID ${dishId} not found`);
    }
    
    return { ...dish };
  },
  
  /**
   * Get dishes by kitchen ID
   * @param {number|string} kitchenId - Kitchen ID
   * @returns {Promise<Array>} - List of dishes from the kitchen
   */
  getDishesByKitchenId: async (kitchenId) => {
    // Simulate API call delay
    await delay(700);
    
    return [...getDishesByKitchenId(kitchenId)];
  },
  
  /**
   * Filter dishes based on various criteria
   * @param {Object} filters - Filter criteria
   * @returns {Promise<Array>} - Filtered list of dishes
   */
  filterDishes: async (filters = {}) => {
    // Simulate API call delay
    await delay(1000);
    
    let result = [...mockDishes];
    
    // Filter by search term (name or description)
    if (filters.searchTerm) {
      const term = filters.searchTerm.toLowerCase();
      result = result.filter(dish => 
        dish.name.toLowerCase().includes(term) || 
        dish.description.toLowerCase().includes(term)
      );
    }
    
    // Filter by kitchen ID
    if (filters.kitchenId) {
      result = result.filter(dish => dish.kitchenId === parseInt(filters.kitchenId));
    }
    
    // Filter by status
    if (filters.status) {
      result = result.filter(dish => dish.status === filters.status);
    }
    
    // Filter by category
    if (filters.category) {
      result = result.filter(dish => dish.category === filters.category);
    }
    
    // Filter by cuisine
    if (filters.cuisine) {
      result = result.filter(dish => dish.cuisine === filters.cuisine);
    }
    
    // Filter by price range
    if (filters.minPrice !== undefined) {
      result = result.filter(dish => dish.price >= parseInt(filters.minPrice));
    }
    
    if (filters.maxPrice !== undefined) {
      result = result.filter(dish => dish.price <= parseInt(filters.maxPrice));
    }
    
    // Filter by dietary info
    if (filters.dietaryInfo) {
      result = result.filter(dish => 
        dish.dietaryInfo.some(info => info === filters.dietaryInfo)
      );
    }
    
    // Filter by spiciness
    if (filters.isSpicy !== undefined) {
      result = result.filter(dish => dish.isSpicy === filters.isSpicy);
    }
    
    // Filter by popularity
    if (filters.isPopular !== undefined) {
      result = result.filter(dish => dish.isPopular === filters.isPopular);
    }
    
    // Filter by minimum rating
    if (filters.minRating !== undefined) {
      result = result.filter(dish => 
        dish.rating !== null && dish.rating >= parseFloat(filters.minRating)
      );
    }
    
    // Sort results
    if (filters.sortBy) {
      switch (filters.sortBy) {
        case 'name':
          result.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case 'price':
          result.sort((a, b) => a.price - b.price);
          break;
        case 'rating':
          result.sort((a, b) => {
            // Handle null ratings (put them at the end)
            if (a.rating === null) return 1;
            if (b.rating === null) return -1;
            return b.rating - a.rating;
          });
          break;
        case 'newest':
          result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          break;
        default:
          break;
      }
      
      // Apply sort direction
      if (filters.sortDirection === 'desc' && filters.sortBy !== 'rating') {
        result.reverse();
      }
    }
    
    return result;
  },
  
  /**
   * Get filter options for dishes
   * @returns {Promise<Object>} - Filter options
   */
  getFilterOptions: async () => {
    // Simulate API call delay
    await delay(500);
    
    return {
      categories: getDishCategories(),
      cuisines: getDishCuisines(),
      statuses: getDishStatuses(),
      dietaryOptions: ['Vegetarian', 'Non-Vegetarian', 'Vegan']
    };
  },
  
  /**
   * Update dish status
   * @param {number|string} dishId - Dish ID
   * @param {string} status - New status
   * @param {string} [reason] - Reason for rejection (required if status is 'rejected')
   * @returns {Promise<Object>} - Updated dish
   */
  updateDishStatus: async (dishId, status, reason = null) => {
    // Simulate API call delay
    await delay(1000);
    
    const dish = getDishById(dishId);
    if (!dish) {
      throw new Error(`Dish with ID ${dishId} not found`);
    }
    
    if (status === 'rejected' && !reason) {
      throw new Error('Rejection reason is required when rejecting a dish');
    }
    
    // In a real app, this would update the backend
    const updatedDish = { 
      ...dish, 
      status,
      updatedAt: new Date().toISOString()
    };
    
    if (status === 'rejected') {
      updatedDish.rejectionReason = reason;
    } else {
      // Remove rejection reason if status is not rejected
      delete updatedDish.rejectionReason;
    }
    
    return updatedDish;
  },
  
  /**
   * Update dish details
   * @param {number|string} dishId - Dish ID
   * @param {Object} dishData - Dish data to update
   * @returns {Promise<Object>} - Updated dish
   */
  updateDishDetails: async (dishId, dishData) => {
    // Simulate API call delay
    await delay(1200);
    
    const dish = getDishById(dishId);
    if (!dish) {
      throw new Error(`Dish with ID ${dishId} not found`);
    }
    
    // In a real app, this would update the backend
    const updatedDish = { 
      ...dish, 
      ...dishData,
      updatedAt: new Date().toISOString()
    };
    
    return updatedDish;
  },
  
  /**
   * Get dish statistics
   * @returns {Promise<Object>} - Dish statistics
   */
  getDishStatistics: async () => {
    // Simulate API call delay
    await delay(700);
    
    // Calculate statistics from mock data
    const totalDishes = mockDishes.length;
    
    // Count by status
    const approvedDishes = mockDishes.filter(dish => dish.status === 'approved').length;
    const pendingDishes = mockDishes.filter(dish => dish.status === 'pending').length;
    const rejectedDishes = mockDishes.filter(dish => dish.status === 'rejected').length;
    
    // Count by category
    const categoryCounts = {};
    getDishCategories().forEach(category => {
      categoryCounts[category] = getDishesByCategory(category).length;
    });
    
    // Count by cuisine
    const cuisineCounts = {};
    getDishCuisines().forEach(cuisine => {
      cuisineCounts[cuisine] = getDishesByCuisine(cuisine).length;
    });
    
    // Calculate average price
    const totalPrice = mockDishes.reduce((sum, dish) => sum + dish.price, 0);
    const averagePrice = totalDishes > 0 ? totalPrice / totalDishes : 0;
    
    // Calculate average rating (excluding null ratings)
    const dishesWithRatings = mockDishes.filter(dish => dish.rating !== null);
    const totalRating = dishesWithRatings.reduce((sum, dish) => sum + dish.rating, 0);
    const averageRating = dishesWithRatings.length > 0 ? totalRating / dishesWithRatings.length : 0;
    
    // Count popular dishes
    const popularDishes = mockDishes.filter(dish => dish.isPopular).length;
    
    // Count spicy dishes
    const spicyDishes = mockDishes.filter(dish => dish.isSpicy).length;
    
    return {
      totalDishes,
      approvedDishes,
      pendingDishes,
      rejectedDishes,
      categoryCounts,
      cuisineCounts,
      averagePrice,
      averageRating,
      popularDishes,
      spicyDishes
    };
  }
};

export default dishService;
