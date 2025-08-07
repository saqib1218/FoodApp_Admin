import { 
  mockOrders, 
  getOrderById, 
  getOrdersByKitchenId, 
  getOrdersByCustomerId,
  getOrdersByStatus,
  getOrderStatuses,
  getPaymentMethods,
  getPaymentStatuses
} from '../../data/orders/mockOrders';

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Order service for the Riwayat Admin Portal
 * In a real application, these methods would make actual API calls
 * For now, they simulate API behavior with mock data
 */
export const orderService = {
  /**
   * Get all orders
   * @returns {Promise<Array>} - List of all orders
   */
  getAllOrders: async () => {
    // Simulate API call delay
    await delay(800);
    return [...mockOrders];
  },
  
  /**
   * Get order by ID
   * @param {string} orderId - Order ID
   * @returns {Promise<Object>} - Order details
   */
  getOrderById: async (orderId) => {
    // Simulate API call delay
    await delay(500);
    
    const order = getOrderById(orderId);
    if (!order) {
      throw new Error(`Order with ID ${orderId} not found`);
    }
    
    return { ...order };
  },
  
  /**
   * Get orders by kitchen ID
   * @param {number} kitchenId - Kitchen ID
   * @returns {Promise<Array>} - List of orders for the kitchen
   */
  getOrdersByKitchenId: async (kitchenId) => {
    // Simulate API call delay
    await delay(800);
    
    const orders = getOrdersByKitchenId(parseInt(kitchenId));
    return [...orders];
  },
  
  /**
   * Get orders by customer ID
   * @param {string} customerId - Customer ID
   * @returns {Promise<Array>} - List of orders for the customer
   */
  getOrdersByCustomerId: async (customerId) => {
    // Simulate API call delay
    await delay(800);
    
    const orders = getOrdersByCustomerId(customerId);
    return [...orders];
  },
  
  /**
   * Filter orders based on various criteria
   * @param {Object} filters - Filter criteria
   * @returns {Promise<Array>} - Filtered list of orders
   */
  filterOrders: async (filters = {}) => {
    // Simulate API call delay
    await delay(1000);
    
    let result = [...mockOrders];
    
    // Filter by search term (order ID or customer name)
    if (filters.searchTerm) {
      const term = filters.searchTerm.toLowerCase();
      result = result.filter(order => 
        order.id.toLowerCase().includes(term) || 
        order.customerName.toLowerCase().includes(term)
      );
    }
    
    // Filter by kitchen ID
    if (filters.kitchenId) {
      result = result.filter(order => order.kitchenId === parseInt(filters.kitchenId));
    }
    
    // Filter by status
    if (filters.status) {
      result = result.filter(order => order.status === filters.status);
    }
    
    // Filter by payment status
    if (filters.paymentStatus) {
      result = result.filter(order => order.paymentStatus === filters.paymentStatus);
    }
    
    // Filter by payment method
    if (filters.paymentMethod) {
      result = result.filter(order => order.paymentMethod === filters.paymentMethod);
    }
    
    // Filter by date range
    if (filters.startDate && filters.endDate) {
      const start = new Date(filters.startDate).getTime();
      const end = new Date(filters.endDate).getTime();
      
      result = result.filter(order => {
        const orderDate = new Date(order.placedAt).getTime();
        return orderDate >= start && orderDate <= end;
      });
    }
    
    return result;
  },
  
  /**
   * Get filter options for orders
   * @returns {Promise<Object>} - Filter options
   */
  getFilterOptions: async () => {
    // Simulate API call delay
    await delay(500);
    
    return {
      statuses: getOrderStatuses(),
      paymentMethods: getPaymentMethods(),
      paymentStatuses: getPaymentStatuses()
    };
  },
  
  /**
   * Update order status
   * @param {string} orderId - Order ID
   * @param {string} status - New status
   * @returns {Promise<Object>} - Updated order
   */
  updateOrderStatus: async (orderId, status) => {
    // Simulate API call delay
    await delay(1200);
    
    const order = getOrderById(orderId);
    if (!order) {
      throw new Error(`Order with ID ${orderId} not found`);
    }
    
    // In a real app, this would update the backend
    const updatedOrder = { 
      ...order, 
      status,
      // If status is delivered and wasn't before, set deliveredAt
      deliveredAt: status === 'delivered' && order.status !== 'delivered' 
        ? new Date().toISOString() 
        : order.deliveredAt
    };
    
    return updatedOrder;
  },
  
  /**
   * Get order statistics
   * @returns {Promise<Object>} - Order statistics
   */
  getOrderStatistics: async () => {
    // Simulate API call delay
    await delay(700);
    
    // Calculate statistics from mock data
    const totalOrders = mockOrders.length;
    const deliveredOrders = mockOrders.filter(order => order.status === 'delivered').length;
    const pendingOrders = mockOrders.filter(order => order.status === 'pending').length;
    const inTransitOrders = mockOrders.filter(order => order.status === 'in_transit').length;
    const preparingOrders = mockOrders.filter(order => order.status === 'preparing').length;
    const cancelledOrders = mockOrders.filter(order => order.status === 'cancelled').length;
    
    const totalRevenue = mockOrders.reduce((sum, order) => {
      // Only count delivered orders or paid orders
      if (order.status === 'delivered' || order.paymentStatus === 'paid') {
        return sum + order.totalAmount;
      }
      return sum;
    }, 0);
    
    const averageOrderValue = totalOrders > 0 
      ? totalRevenue / totalOrders 
      : 0;
    
    return {
      totalOrders,
      deliveredOrders,
      pendingOrders,
      inTransitOrders,
      preparingOrders,
      cancelledOrders,
      totalRevenue,
      averageOrderValue
    };
  }
};

export default orderService;
