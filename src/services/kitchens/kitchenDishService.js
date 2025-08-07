// Utility function to simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Deep clone function to avoid mutating mock data
const cloneData = (data) => JSON.parse(JSON.stringify(data));

// Mock data for kitchen dishes
const mockDishesData = {
  dishes: [
    {
      id: 1,
      kitchenId: 1,
      name: 'Chicken Biryani',
      description: 'Fragrant basmati rice cooked with tender chicken pieces, aromatic spices, and herbs.',
      price: 400,
      image: 'https://source.unsplash.com/random/300x200/?biryani',
      category: 'Main Course',
      status: 'approved',
      createdAt: '2023-01-15T08:30:00Z',
      updatedAt: '2023-01-15T10:15:00Z',
      rating: 4.8,
      ratingCount: 76,
      isVegetarian: false,
      isSpicy: true,
      preparationTime: 30,
      ingredients: ['Basmati Rice', 'Chicken', 'Onions', 'Spices', 'Herbs']
    },
    {
      id: 2,
      kitchenId: 1,
      name: 'Beef Nihari',
      description: 'Slow-cooked beef stew with rich spices, traditionally served for breakfast.',
      price: 450,
      image: 'https://source.unsplash.com/random/300x200/?stew',
      category: 'Main Course',
      status: 'approved',
      createdAt: '2023-01-16T09:20:00Z',
      updatedAt: '2023-01-16T11:45:00Z',
      rating: 4.9,
      ratingCount: 58,
      isVegetarian: false,
      isSpicy: true,
      preparationTime: 45,
      ingredients: ['Beef', 'Wheat Flour', 'Spices', 'Ginger', 'Garlic']
    },
    {
      id: 3,
      kitchenId: 1,
      name: 'Gulab Jamun',
      description: 'Sweet milk solids dumplings soaked in rose and cardamom flavored sugar syrup.',
      price: 200,
      image: 'https://source.unsplash.com/random/300x200/?dessert',
      category: 'Dessert',
      status: 'approved',
      createdAt: '2023-01-17T10:10:00Z',
      updatedAt: '2023-01-17T12:30:00Z',
      rating: 4.7,
      ratingCount: 48,
      isVegetarian: true,
      isSpicy: false,
      preparationTime: 20,
      ingredients: ['Milk Powder', 'Sugar', 'Cardamom', 'Rose Water']
    },
    {
      id: 4,
      kitchenId: 1,
      name: 'Chicken Karahi',
      description: 'Spicy chicken dish cooked with tomatoes, green chilies, and ginger in a wok-like pot.',
      price: 500,
      image: 'https://source.unsplash.com/random/300x200/?curry',
      category: 'Main Course',
      status: 'pending',
      createdAt: '2023-01-18T11:05:00Z',
      updatedAt: '2023-01-18T11:05:00Z',
      rating: 0,
      ratingCount: 0,
      isVegetarian: false,
      isSpicy: true,
      preparationTime: 35,
      ingredients: ['Chicken', 'Tomatoes', 'Green Chilies', 'Ginger', 'Spices']
    },
    {
      id: 5,
      kitchenId: 1,
      name: 'Mango Lassi',
      description: 'Refreshing yogurt-based drink with mango pulp and a hint of cardamom.',
      price: 150,
      image: 'https://source.unsplash.com/random/300x200/?smoothie',
      category: 'Beverage',
      status: 'rejected',
      rejectionReason: 'Image quality does not meet our standards. Please upload a clearer, better lit photo.',
      createdAt: '2023-01-19T13:15:00Z',
      updatedAt: '2023-01-19T15:40:00Z',
      rating: 0,
      ratingCount: 0,
      isVegetarian: true,
      isSpicy: false,
      preparationTime: 10,
      ingredients: ['Yogurt', 'Mango', 'Sugar', 'Cardamom']
    },
    {
      id: 6,
      kitchenId: 2,
      name: 'Chicken Tikka',
      description: 'Boneless chicken pieces marinated in spices and yogurt, grilled to perfection.',
      price: 350,
      image: 'https://source.unsplash.com/random/300x200/?grilled',
      category: 'Appetizer',
      status: 'approved',
      createdAt: '2023-01-20T14:25:00Z',
      updatedAt: '2023-01-20T16:50:00Z',
      rating: 4.6,
      ratingCount: 42,
      isVegetarian: false,
      isSpicy: true,
      preparationTime: 25,
      ingredients: ['Chicken', 'Yogurt', 'Lemon', 'Spices']
    }
  ],
  
  categories: [
    { id: 1, name: 'Main Course' },
    { id: 2, name: 'Appetizer' },
    { id: 3, name: 'Dessert' },
    { id: 4, name: 'Beverage' },
    { id: 5, name: 'Side Dish' }
  ]
};

// Service methods
export const kitchenDishService = {
  getKitchenDishes: async (kitchenId) => {
    await delay(700);
    return cloneData(mockDishesData.dishes.filter(dish => 
      String(dish.kitchenId) === String(kitchenId)
    ));
  },
  
  getDishCategories: async () => {
    await delay(300);
    return cloneData(mockDishesData.categories);
  },
  
  getDishById: async (dishId) => {
    await delay(500);
    const dish = mockDishesData.dishes.find(d => d.id === parseInt(dishId));
    return dish ? cloneData(dish) : null;
  },
  
  updateDishStatus: async (dishId, newStatus, comment = '') => {
    await delay(800);
    
    const dishIndex = mockDishesData.dishes.findIndex(d => d.id === parseInt(dishId));
    
    if (dishIndex === -1) {
      return { success: false, message: 'Dish not found' };
    }
    
    mockDishesData.dishes[dishIndex].status = newStatus;
    mockDishesData.dishes[dishIndex].updatedAt = new Date().toISOString();
    
    if (newStatus === 'rejected' && comment) {
      mockDishesData.dishes[dishIndex].rejectionReason = comment;
    }
    
    return { 
      success: true, 
      dish: cloneData(mockDishesData.dishes[dishIndex])
    };
  },
  
  filterDishes: async (kitchenId, filters) => {
    await delay(600);
    
    let filteredDishes = mockDishesData.dishes.filter(dish => 
      String(dish.kitchenId) === String(kitchenId)
    );
    
    if (filters.status && filters.status !== 'all') {
      filteredDishes = filteredDishes.filter(dish => dish.status === filters.status);
    }
    
    if (filters.category && filters.category !== 'all') {
      filteredDishes = filteredDishes.filter(dish => dish.category === filters.category);
    }
    
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filteredDishes = filteredDishes.filter(dish => 
        dish.name.toLowerCase().includes(searchLower) || 
        dish.description.toLowerCase().includes(searchLower)
      );
    }
    
    return cloneData(filteredDishes);
  }
};

export default kitchenDishService;
