// Mock orders data for development
export const mockOrders = [
  {
    id: 'ORD-10001',
    customerId: 'CUST-501',
    customerName: 'Ahmed Khan',
    kitchenId: 1,
    kitchenName: 'Lahori Delights',
    items: [
      { id: 1, name: 'Chicken Biryani', quantity: 2, price: 350 },
      { id: 2, name: 'Naan', quantity: 4, price: 30 }
    ],
    totalAmount: 820,
    status: 'delivered',
    paymentStatus: 'paid',
    paymentMethod: 'card',
    deliveryAddress: '123 Block F, Johar Town, Lahore',
    placedAt: '2023-08-15T14:30:00Z',
    deliveredAt: '2023-08-15T15:45:00Z',
    rating: 5,
    review: 'Amazing food and quick delivery!'
  },
  {
    id: 'ORD-10002',
    customerId: 'CUST-502',
    customerName: 'Sara Ali',
    kitchenId: 3,
    kitchenName: 'Peshawar Tikka House',
    items: [
      { id: 5, name: 'Chapli Kebab', quantity: 3, price: 200 },
      { id: 6, name: 'Peshawari Naan', quantity: 2, price: 50 }
    ],
    totalAmount: 700,
    status: 'delivered',
    paymentStatus: 'paid',
    paymentMethod: 'cash',
    deliveryAddress: '45-B, Gulberg III, Lahore',
    placedAt: '2023-08-16T13:15:00Z',
    deliveredAt: '2023-08-16T14:20:00Z',
    rating: 4,
    review: 'Good food but delivery was a bit late'
  },
  {
    id: 'ORD-10003',
    customerId: 'CUST-503',
    customerName: 'Bilal Ahmed',
    kitchenId: 5,
    kitchenName: 'Quetta Traditional',
    items: [
      { id: 9, name: 'Sajji', quantity: 1, price: 1200 },
      { id: 10, name: 'Balochi Pulao', quantity: 2, price: 350 }
    ],
    totalAmount: 1900,
    status: 'in_transit',
    paymentStatus: 'paid',
    paymentMethod: 'card',
    deliveryAddress: '78 DHA Phase 5, Lahore',
    placedAt: '2023-08-17T18:45:00Z',
    deliveredAt: null,
    rating: null,
    review: null
  },
  {
    id: 'ORD-10004',
    customerId: 'CUST-504',
    customerName: 'Ayesha Malik',
    kitchenId: 6,
    kitchenName: 'Multan Sweets',
    items: [
      { id: 12, name: 'Sohan Halwa', quantity: 1, price: 500 },
      { id: 13, name: 'Gulab Jamun', quantity: 12, price: 25 }
    ],
    totalAmount: 800,
    status: 'preparing',
    paymentStatus: 'paid',
    paymentMethod: 'wallet',
    deliveryAddress: '23-C Model Town, Lahore',
    placedAt: '2023-08-17T19:30:00Z',
    deliveredAt: null,
    rating: null,
    review: null
  },
  {
    id: 'ORD-10005',
    customerId: 'CUST-505',
    customerName: 'Zain Hamid',
    kitchenId: 1,
    kitchenName: 'Lahori Delights',
    items: [
      { id: 1, name: 'Chicken Biryani', quantity: 3, price: 350 },
      { id: 3, name: 'Seekh Kebab', quantity: 2, price: 250 }
    ],
    totalAmount: 1550,
    status: 'cancelled',
    paymentStatus: 'refunded',
    paymentMethod: 'card',
    deliveryAddress: '56 Cavalry Ground, Lahore',
    placedAt: '2023-08-16T20:15:00Z',
    deliveredAt: null,
    rating: null,
    review: null,
    cancellationReason: 'Customer requested cancellation'
  },
  {
    id: 'ORD-10006',
    customerId: 'CUST-506',
    customerName: 'Fatima Shah',
    kitchenId: 4,
    kitchenName: 'Islamabad Homestyle',
    items: [
      { id: 7, name: 'Vegetable Pasta', quantity: 1, price: 450 },
      { id: 8, name: 'Garlic Bread', quantity: 1, price: 150 }
    ],
    totalAmount: 600,
    status: 'delivered',
    paymentStatus: 'paid',
    paymentMethod: 'cash',
    deliveryAddress: '12 F-7/2, Islamabad',
    placedAt: '2023-08-15T19:00:00Z',
    deliveredAt: '2023-08-15T20:10:00Z',
    rating: 3,
    review: 'Food was okay, but not exceptional'
  },
  {
    id: 'ORD-10007',
    customerId: 'CUST-507',
    customerName: 'Hassan Ali',
    kitchenId: 2,
    kitchenName: 'Karachi Flavors',
    items: [
      { id: 4, name: 'Chicken Karahi', quantity: 1, price: 800 }
    ],
    totalAmount: 800,
    status: 'pending',
    paymentStatus: 'pending',
    paymentMethod: 'card',
    deliveryAddress: '34 Clifton, Karachi',
    placedAt: '2023-08-17T21:00:00Z',
    deliveredAt: null,
    rating: null,
    review: null
  },
  {
    id: 'ORD-10008',
    customerId: 'CUST-508',
    customerName: 'Nadia Qureshi',
    kitchenId: 1,
    kitchenName: 'Lahori Delights',
    items: [
      { id: 1, name: 'Chicken Biryani', quantity: 2, price: 350 },
      { id: 2, name: 'Naan', quantity: 4, price: 30 },
      { id: 3, name: 'Seekh Kebab', quantity: 1, price: 250 }
    ],
    totalAmount: 1070,
    status: 'delivered',
    paymentStatus: 'paid',
    paymentMethod: 'wallet',
    deliveryAddress: '89 Faisal Town, Lahore',
    placedAt: '2023-08-14T13:30:00Z',
    deliveredAt: '2023-08-14T14:45:00Z',
    rating: 5,
    review: 'Best biryani in town! Will order again.'
  },
  {
    id: 'ORD-10009',
    customerId: 'CUST-509',
    customerName: 'Kamran Akmal',
    kitchenId: 5,
    kitchenName: 'Quetta Traditional',
    items: [
      { id: 9, name: 'Sajji', quantity: 2, price: 1200 }
    ],
    totalAmount: 2400,
    status: 'delivered',
    paymentStatus: 'paid',
    paymentMethod: 'card',
    deliveryAddress: '45 Askari 11, Lahore',
    placedAt: '2023-08-13T19:15:00Z',
    deliveredAt: '2023-08-13T20:30:00Z',
    rating: 4,
    review: 'Authentic taste, just like in Quetta!'
  },
  {
    id: 'ORD-10010',
    customerId: 'CUST-510',
    customerName: 'Sana Javed',
    kitchenId: 6,
    kitchenName: 'Multan Sweets',
    items: [
      { id: 12, name: 'Sohan Halwa', quantity: 2, price: 500 },
      { id: 14, name: 'Barfi', quantity: 10, price: 30 }
    ],
    totalAmount: 1300,
    status: 'delivered',
    paymentStatus: 'paid',
    paymentMethod: 'cash',
    deliveryAddress: '67 Bahria Town, Lahore',
    placedAt: '2023-08-12T16:00:00Z',
    deliveredAt: '2023-08-12T17:15:00Z',
    rating: 5,
    review: 'Perfect sweets for our family gathering!'
  }
];

// Helper function to get order details by ID
export const getOrderById = (orderId) => {
  return mockOrders.find(order => order.id === orderId) || null;
};

// Helper function to get orders by kitchen ID
export const getOrdersByKitchenId = (kitchenId) => {
  return mockOrders.filter(order => order.kitchenId === kitchenId);
};

// Helper function to get orders by customer ID
export const getOrdersByCustomerId = (customerId) => {
  return mockOrders.filter(order => order.customerId === customerId);
};

// Helper function to get orders by status
export const getOrdersByStatus = (status) => {
  return mockOrders.filter(order => order.status === status);
};

// Get unique statuses from orders
export const getOrderStatuses = () => {
  return [...new Set(mockOrders.map(order => order.status))];
};

// Get unique payment methods from orders
export const getPaymentMethods = () => {
  return [...new Set(mockOrders.map(order => order.paymentMethod))];
};

// Get unique payment statuses from orders
export const getPaymentStatuses = () => {
  return [...new Set(mockOrders.map(order => order.paymentStatus))];
};
