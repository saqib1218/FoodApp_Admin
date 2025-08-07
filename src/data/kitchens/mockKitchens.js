// Mock data for kitchens
export const mockKitchens = [
  {
    id: 1,
    name: 'Asim Delights',
    city: 'Lahore',
    cuisine: 'Pakistani',
    owner: 'Fatima Ahmed',
    status: 'active',
    rating: 4.8,
    dishes: 12
  },
  {
    id: 2,
    name: 'Karachi Flavorss',
    city: 'Karachi',
    cuisine: 'Sindhi',
    owner: 'Ali Khan',
    status: 'pending',
    rating: 0,
    dishes: 0
  },
  {
    id: 3,
    name: 'Peshawar Tikka House',
    city: 'Peshawar',
    cuisine: 'Pashtun',
    owner: 'Noor Mohammad',
    status: 'active',
    rating: 4.5,
    dishes: 8
  },
  {
    id: 4,
    name: 'Islamabad Homestyle',
    city: 'Islamabad',
    cuisine: 'Continental',
    owner: 'Sara Malik',
    status: 'suspended',
    rating: 3.2,
    dishes: 5
  },
  {
    id: 5,
    name: 'Quetta Traditional',
    city: 'Quetta',
    cuisine: 'Balochi',
    owner: 'Hamid Baloch',
    status: 'active',
    rating: 4.7,
    dishes: 10
  },
  {
    id: 6,
    name: 'Multan Sweets',
    city: 'Multan',
    cuisine: 'Desserts',
    owner: 'Ayesha Siddiqui',
    status: 'active',
    rating: 4.9,
    dishes: 15
  },
  {
    id: 7,
    name: 'Hyderabad Biryani',
    city: 'Hyderabad',
    cuisine: 'Biryani',
    owner: 'Zainab Hussain',
    status: 'pending',
    rating: 0,
    dishes: 0
  }
];

// Mock data for a single kitchen with detailed information
export const getKitchenById = (id) => {
  const baseKitchen = mockKitchens.find(kitchen => kitchen.id === parseInt(id));
  
  if (!baseKitchen) return null;
  
  // Add additional details for the kitchen detail view
  return {
    ...baseKitchen,
    phone: '+92 300 1234567',
    email: `${baseKitchen.owner.split(' ')[0].toLowerCase()}@${baseKitchen.name.toLowerCase().replace(/\s+/g, '-')}.com`,
    address: `123 Food Street, ${baseKitchen.city}`,
    joinedDate: '2023-05-15',
    description: `Authentic ${baseKitchen.cuisine} cuisine made with love and tradition. Specializing in ${baseKitchen.city} delicacies and traditional recipes passed down through generations.`,
    operatingHours: 'Mon-Sat: 11:00 AM - 10:00 PM, Sun: 12:00 PM - 9:00 PM'
  };
};
