// Mock Kitchen Analytics Data
// This file contains static analytics data for kitchen management
// Will be replaced with actual API calls in the future

const mockKitchenAnalytics = {
  // Kitchen stats overview
  stats: {
    totalOrders: 1247,
    totalRevenue: 89650,
    averageOrderValue: 72,
    totalCustomers: 892,
    activeMenuItems: 45,
    averageRating: 4.6,
    completionRate: 94.2,
    responseTime: 18 // minutes
  },

  // Revenue data for charts
  revenueData: [
    { date: '2024-01-01', revenue: 2450, orders: 34 },
    { date: '2024-01-02', revenue: 3200, orders: 45 },
    { date: '2024-01-03', revenue: 2800, orders: 39 },
    { date: '2024-01-04', revenue: 4100, orders: 57 },
    { date: '2024-01-05', revenue: 3600, orders: 50 },
    { date: '2024-01-06', revenue: 5200, orders: 72 },
    { date: '2024-01-07', revenue: 4800, orders: 67 },
    { date: '2024-01-08', revenue: 3900, orders: 54 },
    { date: '2024-01-09', revenue: 4500, orders: 63 },
    { date: '2024-01-10', revenue: 5100, orders: 71 },
    { date: '2024-01-11', revenue: 4700, orders: 65 },
    { date: '2024-01-12', revenue: 5800, orders: 81 },
    { date: '2024-01-13', revenue: 6200, orders: 86 },
    { date: '2024-01-14', revenue: 5500, orders: 76 },
    { date: '2024-01-15', revenue: 4900, orders: 68 }
  ],

  // Order trends data
  orderTrends: [
    { period: 'Morning (6-12)', orders: 156, percentage: 25.2 },
    { period: 'Afternoon (12-18)', orders: 298, percentage: 48.1 },
    { period: 'Evening (18-24)', orders: 165, percentage: 26.7 }
  ],

  // Top performing dishes
  topDishes: [
    {
      id: 1,
      name: 'Chicken Biryani',
      orders: 89,
      revenue: 6230,
      rating: 4.8,
      image: '/images/dishes/chicken-biryani.jpg'
    },
    {
      id: 2,
      name: 'Beef Karahi',
      orders: 67,
      revenue: 5360,
      rating: 4.7,
      image: '/images/dishes/beef-karahi.jpg'
    },
    {
      id: 3,
      name: 'Mutton Pulao',
      orders: 54,
      revenue: 4320,
      rating: 4.6,
      image: '/images/dishes/mutton-pulao.jpg'
    },
    {
      id: 4,
      name: 'Chicken Tikka',
      orders: 43,
      revenue: 3010,
      rating: 4.5,
      image: '/images/dishes/chicken-tikka.jpg'
    },
    {
      id: 5,
      name: 'Fish Curry',
      orders: 38,
      revenue: 2660,
      rating: 4.4,
      image: '/images/dishes/fish-curry.jpg'
    }
  ],

  // Customer demographics
  customerDemographics: {
    ageGroups: [
      { range: '18-25', count: 234, percentage: 26.2 },
      { range: '26-35', count: 312, percentage: 35.0 },
      { range: '36-45', count: 198, percentage: 22.2 },
      { range: '46-55', count: 98, percentage: 11.0 },
      { range: '55+', count: 50, percentage: 5.6 }
    ],
    genderDistribution: [
      { gender: 'Male', count: 523, percentage: 58.6 },
      { gender: 'Female', count: 369, percentage: 41.4 }
    ]
  },

  // Peak hours data
  peakHours: [
    { hour: '06:00', orders: 8 },
    { hour: '07:00', orders: 15 },
    { hour: '08:00', orders: 23 },
    { hour: '09:00', orders: 18 },
    { hour: '10:00', orders: 12 },
    { hour: '11:00', orders: 16 },
    { hour: '12:00', orders: 45 },
    { hour: '13:00', orders: 52 },
    { hour: '14:00', orders: 38 },
    { hour: '15:00', orders: 29 },
    { hour: '16:00', orders: 34 },
    { hour: '17:00', orders: 41 },
    { hour: '18:00', orders: 48 },
    { hour: '19:00', orders: 67 },
    { hour: '20:00', orders: 73 },
    { hour: '21:00', orders: 58 },
    { hour: '22:00', orders: 42 },
    { hour: '23:00', orders: 28 }
  ],

  // Monthly comparison
  monthlyComparison: {
    currentMonth: {
      revenue: 89650,
      orders: 1247,
      customers: 892,
      averageOrderValue: 72
    },
    previousMonth: {
      revenue: 76420,
      orders: 1089,
      customers: 756,
      averageOrderValue: 70
    },
    growth: {
      revenue: 17.3,
      orders: 14.5,
      customers: 18.0,
      averageOrderValue: 2.9
    }
  },

  // Payment methods
  paymentMethods: [
    { method: 'Cash on Delivery', count: 567, percentage: 45.5 },
    { method: 'Credit/Debit Card', count: 423, percentage: 33.9 },
    { method: 'Digital Wallet', count: 187, percentage: 15.0 },
    { method: 'Bank Transfer', count: 70, percentage: 5.6 }
  ],

  // Order status distribution
  orderStatus: [
    { status: 'Completed', count: 1175, percentage: 94.2 },
    { status: 'Cancelled', count: 45, percentage: 3.6 },
    { status: 'Refunded', count: 27, percentage: 2.2 }
  ]
};

// Helper functions to get analytics data
export const getKitchenAnalytics = (kitchenId, period = 'month') => {
  // In a real implementation, this would filter by kitchenId and period
  return {
    success: true,
    data: {
      // Direct analytics properties that the component expects
      totalOrders: mockKitchenAnalytics.stats.totalOrders,
      totalRevenue: mockKitchenAnalytics.stats.totalRevenue,
      averageOrderValue: mockKitchenAnalytics.stats.averageOrderValue,
      totalCustomers: mockKitchenAnalytics.stats.totalCustomers,
      averageRating: mockKitchenAnalytics.stats.averageRating,
      completionRate: mockKitchenAnalytics.stats.completionRate,
      responseTime: mockKitchenAnalytics.stats.responseTime,
      
      // Trend data (positive/negative percentages for growth indicators)
      ordersTrend: 14.5,
      revenueTrend: 17.3,
      aovTrend: 2.9,
      customersTrend: 18.0,
      ratingTrend: 0.2,
      completionTrend: 1.8,
      
      // Additional properties the component might expect
      totalRatings: 1247,
      
      // Nested data structures
      topDishes: mockKitchenAnalytics.topDishes,
      orderTrends: mockKitchenAnalytics.orderTrends,
      revenueData: mockKitchenAnalytics.revenueData,
      peakHours: mockKitchenAnalytics.peakHours,
      customerDemographics: mockKitchenAnalytics.customerDemographics,
      paymentMethods: mockKitchenAnalytics.paymentMethods,
      monthlyComparison: mockKitchenAnalytics.monthlyComparison,
      orderStatus: mockKitchenAnalytics.orderStatus,
      orderStatusDistribution: {
        completed: 1175,
        pending: 42,
        cancelled: 30,
        processing: 15
      }
    }
  };
};

export const getKitchenStats = (kitchenId) => {
  // In a real implementation, this would filter by kitchenId
  return {
    success: true,
    data: mockKitchenAnalytics.stats
  };
};

export default mockKitchenAnalytics;
