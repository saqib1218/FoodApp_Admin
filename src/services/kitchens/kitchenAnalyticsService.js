// Utility function to simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Mock data for kitchen analytics
const mockAnalyticsData = {
  getKitchenAnalytics: (kitchenId, dateRange) => ({
    totalOrders: 245,
    totalRevenue: 98500,
    averageOrderValue: 402,
    averageRating: 4.7,
    totalRatings: 187,
    ordersTrend: 0.12, // 12% increase
    revenueTrend: 0.18, // 18% increase
    aovTrend: 0.05, // 5% increase
    ratingTrend: 0.02, // 2% increase
    orderStatusDistribution: {
      completed: 198,
      inProgress: 22,
      cancelled: 15,
      refunded: 10
    }
  }),
  
  getTopDishes: (kitchenId, dateRange) => [
    {
      id: 1,
      name: 'Chicken Biryani',
      category: 'Main Course',
      image: 'https://source.unsplash.com/random/100x100/?biryani',
      orderCount: 87,
      orderPercentage: 0.35,
      revenue: 34800,
      revenuePercentage: 0.38,
      averageRating: 4.8,
      ratingCount: 76
    },
    {
      id: 2,
      name: 'Beef Nihari',
      category: 'Main Course',
      image: 'https://source.unsplash.com/random/100x100/?curry',
      orderCount: 65,
      orderPercentage: 0.26,
      revenue: 26000,
      revenuePercentage: 0.28,
      averageRating: 4.9,
      ratingCount: 58
    },
    {
      id: 3,
      name: 'Gulab Jamun',
      category: 'Dessert',
      image: 'https://source.unsplash.com/random/100x100/?dessert',
      orderCount: 54,
      orderPercentage: 0.22,
      revenue: 10800,
      revenuePercentage: 0.12,
      averageRating: 4.7,
      ratingCount: 48
    },
    {
      id: 4,
      name: 'Chicken Karahi',
      category: 'Main Course',
      image: 'https://source.unsplash.com/random/100x100/?curry',
      orderCount: 42,
      orderPercentage: 0.17,
      revenue: 21000,
      revenuePercentage: 0.22,
      averageRating: 4.6,
      ratingCount: 38
    }
  ],
  
  getOrderTrends: (kitchenId, dateRange) => {
    // This would normally return data for charts
    // For now, returning placeholder data
    return [
      { date: '2023-01-01', orders: 10, revenue: 4000 },
      { date: '2023-01-02', orders: 12, revenue: 4800 },
      { date: '2023-01-03', orders: 8, revenue: 3200 },
      { date: '2023-01-04', orders: 15, revenue: 6000 },
      { date: '2023-01-05', orders: 20, revenue: 8000 },
      { date: '2023-01-06', orders: 18, revenue: 7200 },
      { date: '2023-01-07', orders: 25, revenue: 10000 }
    ];
  },
  
  getRevenueData: (kitchenId, dateRange) => [
    // Revenue by category
    { type: 'category', name: 'Main Course', value: 65000, percentage: 0.65 },
    { type: 'category', name: 'Desserts', value: 15000, percentage: 0.15 },
    { type: 'category', name: 'Appetizers', value: 10000, percentage: 0.10 },
    { type: 'category', name: 'Beverages', value: 8500, percentage: 0.085 },
    
    // Revenue by time of day
    { type: 'timeOfDay', name: 'Lunch (11am-2pm)', value: 42000, percentage: 0.42 },
    { type: 'timeOfDay', name: 'Dinner (6pm-10pm)', value: 38500, percentage: 0.385 },
    { type: 'timeOfDay', name: 'Afternoon (2pm-6pm)', value: 12000, percentage: 0.12 },
    { type: 'timeOfDay', name: 'Late Night (10pm+)', value: 6000, percentage: 0.06 }
  ]
};

// Service methods
export const kitchenAnalyticsService = {
  getKitchenAnalytics: async (kitchenId, dateRange = 'last30days') => {
    await delay(800);
    return mockAnalyticsData.getKitchenAnalytics(kitchenId, dateRange);
  },
  
  getTopDishes: async (kitchenId, dateRange = 'last30days') => {
    await delay(600);
    return mockAnalyticsData.getTopDishes(kitchenId, dateRange);
  },
  
  getOrderTrends: async (kitchenId, dateRange = 'last30days') => {
    await delay(700);
    return mockAnalyticsData.getOrderTrends(kitchenId, dateRange);
  },
  
  getRevenueData: async (kitchenId, dateRange = 'last30days') => {
    await delay(500);
    return mockAnalyticsData.getRevenueData(kitchenId, dateRange);
  }
};

export default kitchenAnalyticsService;
