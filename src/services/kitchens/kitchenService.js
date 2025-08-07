import { mockKitchens, getKitchenById } from '../../data/kitchens/mockKitchens';

/**
 * Kitchen Service
 * Handles all kitchen-related data operations
 */
export const kitchenService = {
  /**
   * Get all kitchens
   * @returns {Promise} Promise that resolves to an array of kitchens
   */
  getAllKitchens: async () => {
    // Simulate API call delay
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockKitchens);
      }, 500);
    });
  },

  /**
   * Get kitchen by ID
   * @param {number|string} id - Kitchen ID
   * @returns {Promise} Promise that resolves to a kitchen object
   */
  getKitchenById: async (id) => {
    // Simulate API call delay
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const kitchen = getKitchenById(id);
        if (kitchen) {
          resolve(kitchen);
        } else {
          reject(new Error(`Kitchen with ID ${id} not found`));
        }
      }, 500);
    });
  },

  /**
   * Filter kitchens based on search criteria
   * @param {Object} filters - Filter criteria
   * @param {string} filters.searchTerm - Search term for name or owner
   * @param {string} filters.city - City filter
   * @param {string} filters.cuisine - Cuisine filter
   * @param {string} filters.status - Status filter
   * @returns {Promise} Promise that resolves to filtered kitchens array
   */
  filterKitchens: async ({ searchTerm = '', city = '', cuisine = '', status = '' }) => {
    // Simulate API call delay
    return new Promise((resolve) => {
      setTimeout(() => {
        let result = [...mockKitchens];

        // Apply search term filter
        if (searchTerm) {
          result = result.filter(kitchen =>
            kitchen.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            kitchen.owner.toLowerCase().includes(searchTerm.toLowerCase())
          );
        }

        // Apply city filter
        if (city) {
          result = result.filter(kitchen => 
            kitchen.city.toLowerCase() === city.toLowerCase()
          );
        }

        // Apply cuisine filter
        if (cuisine) {
          result = result.filter(kitchen => 
            kitchen.cuisine.toLowerCase() === cuisine.toLowerCase()
          );
        }

        // Apply status filter
        if (status) {
          result = result.filter(kitchen => 
            kitchen.status.toLowerCase() === status.toLowerCase()
          );
        }

        resolve(result);
      }, 300);
    });
  },

  /**
   * Get unique values for filter options
   * @returns {Promise} Promise that resolves to an object with filter options
   */
  getFilterOptions: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const cities = [...new Set(mockKitchens.map(kitchen => kitchen.city))];
        const cuisines = [...new Set(mockKitchens.map(kitchen => kitchen.cuisine))];
        const statuses = [...new Set(mockKitchens.map(kitchen => kitchen.status))];
        
        resolve({ cities, cuisines, statuses });
      }, 200);
    });
  },

  /**
   * Update kitchen status
   * @param {number|string} id - Kitchen ID
   * @param {string} status - New status
   * @param {string} [comment] - Optional comment explaining the status change
   * @returns {Promise} Promise that resolves to updated kitchen
   */
  updateKitchenStatus: async (id, status, comment = '') => {
    // In a real app, this would make an API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // This is just a mock implementation
        // In production, this would be handled by the backend
        const kitchen = getKitchenById(id);
        if (kitchen) {
          const updatedKitchen = { 
            ...kitchen, 
            status,
            statusHistory: [
              ...(kitchen.statusHistory || []),
              {
                status,
                date: new Date().toISOString(),
                comment
              }
            ]
          };
          resolve(updatedKitchen);
        } else {
          reject(new Error(`Kitchen with ID ${id} not found`));
        }
      }, 700);
    });
  },

  /**
   * Update kitchen details
   * @param {number|string} id - Kitchen ID
   * @param {Object} details - Kitchen details to update
   * @param {string} [details.name] - Kitchen name
   * @param {string} [details.tagline] - Kitchen tagline
   * @param {string} [details.description] - Kitchen description/bio
   * @returns {Promise} Promise that resolves to updated kitchen
   */
  updateKitchenDetails: async (id, details) => {
    // In a real app, this would make an API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const kitchen = getKitchenById(id);
        if (kitchen) {
          const updatedKitchen = { 
            ...kitchen,
            ...details,
            lastUpdated: new Date().toISOString()
          };
          resolve(updatedKitchen);
        } else {
          reject(new Error(`Kitchen with ID ${id} not found`));
        }
      }, 800);
    });
  }
};
