// Mock dishes data for development
export const mockDishes = [
  {
    id: 101,
    name: 'Chicken Biryani',
    kitchenId: 1,
    kitchenName: 'Lahori Delights',
    description: 'Fragrant basmati rice cooked with tender chicken pieces, aromatic spices, and caramelized onions. Served with raita.',
    price: 350,
    category: 'Main Course',
    cuisine: 'Pakistani',
    ingredients: ['Basmati Rice', 'Chicken', 'Onions', 'Yogurt', 'Spices', 'Ghee'],
    dietaryInfo: ['Non-Vegetarian'],
    preparationTime: 45,
    status: 'approved',
    rating: 4.8,
    reviewCount: 32,
    image: 'https://i.imgur.com/1A8OvLQ.jpg',
    isSpicy: true,
    isPopular: true,
    createdAt: '2023-05-20T10:30:00Z',
    updatedAt: '2023-05-21T14:15:00Z'
  },
  {
    id: 102,
    name: 'Seekh Kebab',
    kitchenId: 1,
    kitchenName: 'Lahori Delights',
    description: 'Minced meat mixed with herbs and spices, skewered and grilled to perfection. Served with mint chutney.',
    price: 250,
    category: 'Appetizer',
    cuisine: 'Pakistani',
    ingredients: ['Minced Meat', 'Onions', 'Green Chilies', 'Coriander', 'Spices'],
    dietaryInfo: ['Non-Vegetarian'],
    preparationTime: 30,
    status: 'approved',
    rating: 4.7,
    reviewCount: 28,
    image: 'https://i.imgur.com/2B8OvLQ.jpg',
    isSpicy: true,
    isPopular: true,
    createdAt: '2023-05-20T11:00:00Z',
    updatedAt: '2023-05-21T14:20:00Z'
  },
  {
    id: 103,
    name: 'Chapli Kebab',
    kitchenId: 3,
    kitchenName: 'Peshawar Tikka House',
    description: 'Flat, round kebabs made with minced beef, tomatoes, and a blend of Pashtun spices. Served with naan.',
    price: 200,
    category: 'Appetizer',
    cuisine: 'Pashtun',
    ingredients: ['Minced Beef', 'Tomatoes', 'Onions', 'Pomegranate Seeds', 'Spices'],
    dietaryInfo: ['Non-Vegetarian'],
    preparationTime: 25,
    status: 'approved',
    rating: 4.9,
    reviewCount: 45,
    image: 'https://i.imgur.com/3C8OvLQ.jpg',
    isSpicy: true,
    isPopular: true,
    createdAt: '2023-06-01T09:45:00Z',
    updatedAt: '2023-06-02T16:30:00Z'
  },
  {
    id: 104,
    name: 'Chicken Karahi',
    kitchenId: 2,
    kitchenName: 'Karachi Flavors',
    description: 'Tender chicken pieces cooked in a wok with tomatoes, green chilies, and a special blend of karahi masala.',
    price: 800,
    category: 'Main Course',
    cuisine: 'Sindhi',
    ingredients: ['Chicken', 'Tomatoes', 'Green Chilies', 'Ginger', 'Garlic', 'Karahi Masala'],
    dietaryInfo: ['Non-Vegetarian'],
    preparationTime: 40,
    status: 'approved',
    rating: 4.6,
    reviewCount: 22,
    image: 'https://i.imgur.com/4D8OvLQ.jpg',
    isSpicy: true,
    isPopular: false,
    createdAt: '2023-06-05T13:20:00Z',
    updatedAt: '2023-06-06T11:45:00Z'
  },
  {
    id: 105,
    name: 'Vegetable Pasta',
    kitchenId: 4,
    kitchenName: 'Islamabad Homestyle',
    description: 'Penne pasta tossed with seasonal vegetables, olive oil, and herbs in a light cream sauce.',
    price: 450,
    category: 'Main Course',
    cuisine: 'Continental',
    ingredients: ['Pasta', 'Bell Peppers', 'Mushrooms', 'Zucchini', 'Cream', 'Olive Oil', 'Herbs'],
    dietaryInfo: ['Vegetarian'],
    preparationTime: 30,
    status: 'approved',
    rating: 4.3,
    reviewCount: 18,
    image: 'https://i.imgur.com/5E8OvLQ.jpg',
    isSpicy: false,
    isPopular: false,
    createdAt: '2023-06-10T15:30:00Z',
    updatedAt: '2023-06-11T09:15:00Z'
  },
  {
    id: 106,
    name: 'Sajji',
    kitchenId: 5,
    kitchenName: 'Quetta Traditional',
    description: 'Whole chicken marinated with special Balochi spices and slow-roasted to perfection. Served with naan.',
    price: 1200,
    category: 'Main Course',
    cuisine: 'Balochi',
    ingredients: ['Whole Chicken', 'Balochi Spices', 'Lemon', 'Salt'],
    dietaryInfo: ['Non-Vegetarian'],
    preparationTime: 90,
    status: 'approved',
    rating: 4.9,
    reviewCount: 37,
    image: 'https://i.imgur.com/6F8OvLQ.jpg',
    isSpicy: true,
    isPopular: true,
    createdAt: '2023-06-15T12:00:00Z',
    updatedAt: '2023-06-16T14:30:00Z'
  },
  {
    id: 107,
    name: 'Sohan Halwa',
    kitchenId: 6,
    kitchenName: 'Multan Sweets',
    description: 'Traditional sweet made with wheat flour, sugar, milk, and ghee, garnished with pistachios and almonds.',
    price: 500,
    category: 'Dessert',
    cuisine: 'Pakistani',
    ingredients: ['Wheat Flour', 'Sugar', 'Milk', 'Ghee', 'Pistachios', 'Almonds'],
    dietaryInfo: ['Vegetarian'],
    preparationTime: 60,
    status: 'approved',
    rating: 4.8,
    reviewCount: 41,
    image: 'https://i.imgur.com/7G8OvLQ.jpg',
    isSpicy: false,
    isPopular: true,
    createdAt: '2023-06-20T10:15:00Z',
    updatedAt: '2023-06-21T16:45:00Z'
  },
  {
    id: 108,
    name: 'Balochi Pulao',
    kitchenId: 5,
    kitchenName: 'Quetta Traditional',
    description: 'Fragrant rice cooked with tender meat, caramelized onions, and aromatic Balochi spices.',
    price: 350,
    category: 'Main Course',
    cuisine: 'Balochi',
    ingredients: ['Basmati Rice', 'Meat', 'Onions', 'Balochi Spices', 'Ghee'],
    dietaryInfo: ['Non-Vegetarian'],
    preparationTime: 50,
    status: 'approved',
    rating: 4.5,
    reviewCount: 23,
    image: 'https://i.imgur.com/8H8OvLQ.jpg',
    isSpicy: true,
    isPopular: false,
    createdAt: '2023-06-25T11:30:00Z',
    updatedAt: '2023-06-26T13:20:00Z'
  },
  {
    id: 109,
    name: 'Gulab Jamun',
    kitchenId: 6,
    kitchenName: 'Multan Sweets',
    description: 'Soft, spongy milk-solid balls soaked in rose-flavored sugar syrup. A classic Pakistani dessert.',
    price: 25,
    category: 'Dessert',
    cuisine: 'Pakistani',
    ingredients: ['Milk Solids', 'Flour', 'Sugar', 'Rose Water', 'Cardamom'],
    dietaryInfo: ['Vegetarian'],
    preparationTime: 40,
    status: 'approved',
    rating: 4.7,
    reviewCount: 56,
    image: 'https://i.imgur.com/9I8OvLQ.jpg',
    isSpicy: false,
    isPopular: true,
    createdAt: '2023-07-01T09:00:00Z',
    updatedAt: '2023-07-02T14:15:00Z'
  },
  {
    id: 110,
    name: 'Beef Nihari',
    kitchenId: 1,
    kitchenName: 'Lahori Delights',
    description: 'Slow-cooked beef stew with bone marrow, flavored with special nihari masala. Served with naan.',
    price: 450,
    category: 'Main Course',
    cuisine: 'Pakistani',
    ingredients: ['Beef', 'Bone Marrow', 'Nihari Masala', 'Wheat Flour', 'Ginger', 'Lemon'],
    dietaryInfo: ['Non-Vegetarian'],
    preparationTime: 180,
    status: 'pending',
    rating: null,
    reviewCount: 0,
    image: 'https://i.imgur.com/0J8OvLQ.jpg',
    isSpicy: true,
    isPopular: false,
    createdAt: '2023-08-15T08:30:00Z',
    updatedAt: '2023-08-15T08:30:00Z'
  },
  {
    id: 111,
    name: 'Peshawari Naan',
    kitchenId: 3,
    kitchenName: 'Peshawar Tikka House',
    description: 'Soft, fluffy naan stuffed with a mixture of nuts, raisins, and coconut. Perfect with any curry.',
    price: 50,
    category: 'Bread',
    cuisine: 'Pashtun',
    ingredients: ['Flour', 'Yeast', 'Nuts', 'Raisins', 'Coconut', 'Butter'],
    dietaryInfo: ['Vegetarian'],
    preparationTime: 20,
    status: 'pending',
    rating: null,
    reviewCount: 0,
    image: 'https://i.imgur.com/1K8OvLQ.jpg',
    isSpicy: false,
    isPopular: false,
    createdAt: '2023-08-16T10:45:00Z',
    updatedAt: '2023-08-16T10:45:00Z'
  },
  {
    id: 112,
    name: 'Barfi',
    kitchenId: 6,
    kitchenName: 'Multan Sweets',
    description: 'Traditional milk-based sweet fudge, flavored with cardamom and garnished with pistachios.',
    price: 30,
    category: 'Dessert',
    cuisine: 'Pakistani',
    ingredients: ['Milk', 'Sugar', 'Cardamom', 'Pistachios'],
    dietaryInfo: ['Vegetarian'],
    preparationTime: 45,
    status: 'pending',
    rating: null,
    reviewCount: 0,
    image: 'https://i.imgur.com/2L8OvLQ.jpg',
    isSpicy: false,
    isPopular: false,
    createdAt: '2023-08-17T14:20:00Z',
    updatedAt: '2023-08-17T14:20:00Z'
  },
  {
    id: 113,
    name: 'Mutton Haleem',
    kitchenId: 2,
    kitchenName: 'Karachi Flavors',
    description: 'Slow-cooked stew of mutton, lentils, and wheat, blended to a smooth consistency and topped with fried onions.',
    price: 300,
    category: 'Main Course',
    cuisine: 'Sindhi',
    ingredients: ['Mutton', 'Lentils', 'Wheat', 'Spices', 'Fried Onions', 'Lemon'],
    dietaryInfo: ['Non-Vegetarian'],
    preparationTime: 150,
    status: 'rejected',
    rating: null,
    reviewCount: 0,
    image: 'https://i.imgur.com/3M8OvLQ.jpg',
    isSpicy: true,
    isPopular: false,
    createdAt: '2023-08-10T09:30:00Z',
    updatedAt: '2023-08-12T15:45:00Z',
    rejectionReason: 'Images do not match the description. Please provide clearer photos of the dish.'
  },
  {
    id: 114,
    name: 'Aloo Gobi',
    kitchenId: 4,
    kitchenName: 'Islamabad Homestyle',
    description: 'Potatoes and cauliflower cooked with turmeric, cumin, and other spices. A vegetarian favorite.',
    price: 200,
    category: 'Side Dish',
    cuisine: 'Continental',
    ingredients: ['Potatoes', 'Cauliflower', 'Turmeric', 'Cumin', 'Coriander'],
    dietaryInfo: ['Vegetarian', 'Vegan'],
    preparationTime: 35,
    status: 'rejected',
    rating: null,
    reviewCount: 0,
    image: 'https://i.imgur.com/4N8OvLQ.jpg',
    isSpicy: false,
    isPopular: false,
    createdAt: '2023-08-11T11:15:00Z',
    updatedAt: '2023-08-13T10:30:00Z',
    rejectionReason: 'Dish pricing is too high compared to market standards. Please revise.'
  }
];

// Helper function to get dish by ID
export const getDishById = (dishId) => {
  return mockDishes.find(dish => dish.id === parseInt(dishId)) || null;
};

// Helper function to get dishes by kitchen ID
export const getDishesByKitchenId = (kitchenId) => {
  return mockDishes.filter(dish => dish.kitchenId === parseInt(kitchenId));
};

// Helper function to get dishes by status
export const getDishesByStatus = (status) => {
  return mockDishes.filter(dish => dish.status === status);
};

// Helper function to get dishes by category
export const getDishesByCategory = (category) => {
  return mockDishes.filter(dish => dish.category === category);
};

// Helper function to get dishes by cuisine
export const getDishesByCuisine = (cuisine) => {
  return mockDishes.filter(dish => dish.cuisine === cuisine);
};

// Get unique categories from dishes
export const getDishCategories = () => {
  return [...new Set(mockDishes.map(dish => dish.category))];
};

// Get unique cuisines from dishes
export const getDishCuisines = () => {
  return [...new Set(mockDishes.map(dish => dish.cuisine))];
};

// Get unique statuses from dishes
export const getDishStatuses = () => {
  return [...new Set(mockDishes.map(dish => dish.status))];
};
