import { 
  mockCustomers, 
  getCustomerById, 
  getCustomersByCity, 
  getCustomersByStatus,
  getCustomerCities,
  getCustomerStatuses
} from '../../data/customers/mockCustomers';

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Customer service for the Riwayat Admin Portal
 * In a real application, these methods would make actual API calls
 * For now, they simulate API behavior with mock data
 */
export const customerService = {
  /**
   * Get all customers
   * @returns {Promise<Array>} - List of all customers
   */
  getAllCustomers: async () => {
    // Simulate API call delay
    await delay(800);
    return [...mockCustomers];
  },
  
  /**
   * Get customer by ID
   * @param {string} customerId - Customer ID
   * @returns {Promise<Object>} - Customer details
   */
  getCustomerById: async (customerId) => {
    // Simulate API call delay
    await delay(500);
    
    const customer = getCustomerById(customerId);
    if (!customer) {
      throw new Error(`Customer with ID ${customerId} not found`);
    }
    
    return { ...customer };
  },
  
  /**
   * Filter customers based on various criteria
   * @param {Object} filters - Filter criteria
   * @returns {Promise<Array>} - Filtered list of customers
   */
  filterCustomers: async (filters = {}) => {
    // Simulate API call delay
    await delay(1000);
    
    let result = [...mockCustomers];
    
    // Filter by search term (name or email)
    if (filters.searchTerm) {
      const term = filters.searchTerm.toLowerCase();
      result = result.filter(customer => 
        customer.name.toLowerCase().includes(term) || 
        customer.email.toLowerCase().includes(term)
      );
    }
    
    // Filter by city
    if (filters.city) {
      result = result.filter(customer => customer.city === filters.city);
    }
    
    // Filter by status
    if (filters.status) {
      result = result.filter(customer => customer.status === filters.status);
    }
    
    // Filter by minimum orders
    if (filters.minOrders) {
      result = result.filter(customer => customer.totalOrders >= parseInt(filters.minOrders));
    }
    
    // Filter by minimum spent
    if (filters.minSpent) {
      result = result.filter(customer => customer.totalSpent >= parseInt(filters.minSpent));
    }
    
    // Filter by join date range
    if (filters.startDate && filters.endDate) {
      const start = new Date(filters.startDate).getTime();
      const end = new Date(filters.endDate).getTime();
      
      result = result.filter(customer => {
        const joinDate = new Date(customer.joinedDate).getTime();
        return joinDate >= start && joinDate <= end;
      });
    }
    
    return result;
  },
  
  /**
   * Get filter options for customers
   * @returns {Promise<Object>} - Filter options
   */
  getFilterOptions: async () => {
    // Simulate API call delay
    await delay(500);
    
    return {
      cities: getCustomerCities(),
      statuses: getCustomerStatuses()
    };
  },
  
  /**
   * Update customer status
   * @param {string} customerId - Customer ID
   * @param {string} status - New status
   * @returns {Promise<Object>} - Updated customer
   */
  updateCustomerStatus: async (customerId, status) => {
    // Simulate API call delay
    await delay(1000);
    
    const customer = getCustomerById(customerId);
    if (!customer) {
      throw new Error(`Customer with ID ${customerId} not found`);
    }
    
    // In a real app, this would update the backend
    const updatedCustomer = { 
      ...customer, 
      status
    };
    
    return updatedCustomer;
  },
  
  /**
   * Update customer details
   * @param {string} customerId - Customer ID
   * @param {Object} customerData - Customer data to update
   * @returns {Promise<Object>} - Updated customer
   */
  updateCustomerDetails: async (customerId, customerData) => {
    // Simulate API call delay
    await delay(1200);
    
    const customer = getCustomerById(customerId);
    if (!customer) {
      throw new Error(`Customer with ID ${customerId} not found`);
    }
    
    // In a real app, this would update the backend
    const updatedCustomer = { 
      ...customer, 
      ...customerData
    };
    
    return updatedCustomer;
  },
  
  /**
   * Get customer statistics
   * @returns {Promise<Object>} - Customer statistics
   */
  getCustomerStatistics: async () => {
    // Simulate API call delay
    await delay(700);
    
    // Calculate statistics from mock data
    const totalCustomers = mockCustomers.length;
    const activeCustomers = mockCustomers.filter(customer => customer.status === 'active').length;
    const inactiveCustomers = mockCustomers.filter(customer => customer.status === 'inactive').length;
    
    const totalRevenue = mockCustomers.reduce((sum, customer) => sum + customer.totalSpent, 0);
    const totalOrders = mockCustomers.reduce((sum, customer) => sum + customer.totalOrders, 0);
    
    const averageSpentPerCustomer = totalCustomers > 0 
      ? totalRevenue / totalCustomers 
      : 0;
    
    const averageOrdersPerCustomer = totalCustomers > 0 
      ? totalOrders / totalCustomers 
      : 0;
    
    // Get city distribution
    const cityDistribution = {};
    getCustomerCities().forEach(city => {
      const customersInCity = getCustomersByCity(city).length;
      cityDistribution[city] = {
        count: customersInCity,
        percentage: Math.round((customersInCity / totalCustomers) * 100)
      };
    });
    
    return {
      totalCustomers,
      activeCustomers,
      inactiveCustomers,
      totalRevenue,
      totalOrders,
      averageSpentPerCustomer,
      averageOrdersPerCustomer,
      cityDistribution
    };
  }
};

export default customerService;
