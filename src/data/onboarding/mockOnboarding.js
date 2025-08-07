// Mock onboarding data for kitchen applications
export const mockOnboardingApplications = [
  {
    id: 'APP-001',
    kitchenName: 'Spice Garden',
    ownerName: 'Zainab Khan',
    email: 'zainab.khan@example.com',
    phone: '+92 321 1234567',
    city: 'Lahore',
    address: '45 Block C, Gulberg III, Lahore',
    cuisineType: 'Pakistani',
    specialties: ['Biryani', 'Karahi', 'Kebabs'],
    description: 'Home-based kitchen specializing in authentic Pakistani cuisine with family recipes passed down through generations.',
    experience: '5 years of catering experience for small to medium events',
    status: 'pending',
    submissionDate: '2023-08-10T09:30:00Z',
    lastUpdated: '2023-08-10T09:30:00Z',
    documents: [
      { type: 'identity', verified: false, url: 'https://example.com/docs/id-001' },
      { type: 'address', verified: false, url: 'https://example.com/docs/addr-001' },
      { type: 'foodHandler', verified: false, url: 'https://example.com/docs/food-001' }
    ],
    kitchenPhotos: [
      'https://i.imgur.com/kitchen1a.jpg',
      'https://i.imgur.com/kitchen1b.jpg',
      'https://i.imgur.com/kitchen1c.jpg'
    ],
    sampleDishes: [
      {
        name: 'Chicken Biryani',
        description: 'Fragrant rice dish with marinated chicken and aromatic spices',
        price: 350,
        image: 'https://i.imgur.com/dish1a.jpg'
      },
      {
        name: 'Beef Seekh Kebab',
        description: 'Minced beef skewers with herbs and spices, grilled to perfection',
        price: 250,
        image: 'https://i.imgur.com/dish1b.jpg'
      }
    ],
    notes: [],
    assignedTo: null
  },
  {
    id: 'APP-002',
    kitchenName: 'Sweet Delights',
    ownerName: 'Ayesha Siddiqui',
    email: 'ayesha.siddiqui@example.com',
    phone: '+92 300 9876543',
    city: 'Karachi',
    address: '78 Block 2, PECHS, Karachi',
    cuisineType: 'Desserts',
    specialties: ['Cakes', 'Pastries', 'Pakistani Sweets'],
    description: 'Specializing in homemade desserts combining traditional Pakistani sweets with modern pastry techniques.',
    experience: '3 years running a home-based bakery business',
    status: 'pending',
    submissionDate: '2023-08-12T14:15:00Z',
    lastUpdated: '2023-08-12T14:15:00Z',
    documents: [
      { type: 'identity', verified: true, url: 'https://example.com/docs/id-002' },
      { type: 'address', verified: false, url: 'https://example.com/docs/addr-002' },
      { type: 'foodHandler', verified: false, url: 'https://example.com/docs/food-002' }
    ],
    kitchenPhotos: [
      'https://i.imgur.com/kitchen2a.jpg',
      'https://i.imgur.com/kitchen2b.jpg'
    ],
    sampleDishes: [
      {
        name: 'Rasmalai Cake',
        description: 'Sponge cake with rasmalai-inspired cream frosting and pistachios',
        price: 1200,
        image: 'https://i.imgur.com/dish2a.jpg'
      },
      {
        name: 'Gulab Jamun Cheesecake',
        description: 'Fusion dessert combining traditional gulab jamun with creamy cheesecake',
        price: 1500,
        image: 'https://i.imgur.com/dish2b.jpg'
      }
    ],
    notes: [
      {
        author: 'Hamza Ali',
        date: '2023-08-13T10:30:00Z',
        content: 'ID document verified. Waiting on address verification.'
      }
    ],
    assignedTo: 'Hamza Ali'
  },
  {
    id: 'APP-003',
    kitchenName: 'Balochi BBQ',
    ownerName: 'Karim Baloch',
    email: 'karim.baloch@example.com',
    phone: '+92 333 5556666',
    city: 'Quetta',
    address: '23 Jinnah Road, Quetta',
    cuisineType: 'Balochi',
    specialties: ['Sajji', 'Dampukht', 'Balochi Rosh'],
    description: 'Authentic Balochi cuisine specializing in traditional BBQ and slow-cooked meat dishes.',
    experience: '10 years of family restaurant experience',
    status: 'in_review',
    submissionDate: '2023-08-05T11:20:00Z',
    lastUpdated: '2023-08-14T16:45:00Z',
    documents: [
      { type: 'identity', verified: true, url: 'https://example.com/docs/id-003' },
      { type: 'address', verified: true, url: 'https://example.com/docs/addr-003' },
      { type: 'foodHandler', verified: true, url: 'https://example.com/docs/food-003' }
    ],
    kitchenPhotos: [
      'https://i.imgur.com/kitchen3a.jpg',
      'https://i.imgur.com/kitchen3b.jpg',
      'https://i.imgur.com/kitchen3c.jpg',
      'https://i.imgur.com/kitchen3d.jpg'
    ],
    sampleDishes: [
      {
        name: 'Traditional Sajji',
        description: 'Whole chicken marinated with special Balochi spices and slow-roasted',
        price: 1200,
        image: 'https://i.imgur.com/dish3a.jpg'
      },
      {
        name: 'Balochi Rosh',
        description: 'Slow-cooked meat stew with minimal spices to highlight natural flavors',
        price: 800,
        image: 'https://i.imgur.com/dish3b.jpg'
      },
      {
        name: 'Dampukht Lamb',
        description: 'Tender lamb slow-cooked in its own juices with aromatic spices',
        price: 1000,
        image: 'https://i.imgur.com/dish3c.jpg'
      }
    ],
    notes: [
      {
        author: 'Fatima Zaidi',
        date: '2023-08-10T09:15:00Z',
        content: 'All documents verified. Kitchen photos look excellent.'
      },
      {
        author: 'Fatima Zaidi',
        date: '2023-08-14T16:45:00Z',
        content: 'Conducted video interview. Kitchen meets all standards. Recommend approval.'
      }
    ],
    assignedTo: 'Fatima Zaidi'
  },
  {
    id: 'APP-004',
    kitchenName: 'Sindhi Flavors',
    ownerName: 'Aslam Soomro',
    email: 'aslam.soomro@example.com',
    phone: '+92 345 1112222',
    city: 'Hyderabad',
    address: '56 Latifabad Unit 7, Hyderabad',
    cuisineType: 'Sindhi',
    specialties: ['Sindhi Biryani', 'Sindhi Curry', 'Sai Bhaji'],
    description: 'Traditional Sindhi cuisine made with authentic recipes and locally sourced ingredients.',
    experience: '7 years cooking professionally',
    status: 'approved',
    submissionDate: '2023-08-01T10:00:00Z',
    lastUpdated: '2023-08-15T11:30:00Z',
    documents: [
      { type: 'identity', verified: true, url: 'https://example.com/docs/id-004' },
      { type: 'address', verified: true, url: 'https://example.com/docs/addr-004' },
      { type: 'foodHandler', verified: true, url: 'https://example.com/docs/food-004' }
    ],
    kitchenPhotos: [
      'https://i.imgur.com/kitchen4a.jpg',
      'https://i.imgur.com/kitchen4b.jpg',
      'https://i.imgur.com/kitchen4c.jpg'
    ],
    sampleDishes: [
      {
        name: 'Sindhi Biryani',
        description: 'Spicy rice dish with tender meat, potatoes, and a unique blend of Sindhi spices',
        price: 400,
        image: 'https://i.imgur.com/dish4a.jpg'
      },
      {
        name: 'Sai Bhaji',
        description: 'Nutritious one-pot dish with spinach, lentils, and mixed vegetables',
        price: 250,
        image: 'https://i.imgur.com/dish4b.jpg'
      }
    ],
    notes: [
      {
        author: 'Hamza Ali',
        date: '2023-08-05T14:20:00Z',
        content: 'All documents verified. Kitchen is well-maintained and meets standards.'
      },
      {
        author: 'Omar Khan',
        date: '2023-08-12T11:45:00Z',
        content: 'Conducted taste test. Food quality is excellent. Recommend approval.'
      },
      {
        author: 'Omar Khan',
        date: '2023-08-15T11:30:00Z',
        content: 'Application approved. Welcome email sent with onboarding details.'
      }
    ],
    assignedTo: 'Omar Khan'
  },
  {
    id: 'APP-005',
    kitchenName: 'Fusion Bites',
    ownerName: 'Saira Mahmood',
    email: 'saira.mahmood@example.com',
    phone: '+92 321 7778888',
    city: 'Islamabad',
    address: '34 Street 5, F-7/3, Islamabad',
    cuisineType: 'Fusion',
    specialties: ['Pakistani-Chinese Fusion', 'Pakistani-Italian Fusion'],
    description: 'Creative fusion cuisine combining traditional Pakistani flavors with international cooking techniques.',
    experience: '4 years as a private chef',
    status: 'rejected',
    submissionDate: '2023-08-03T16:45:00Z',
    lastUpdated: '2023-08-13T09:20:00Z',
    documents: [
      { type: 'identity', verified: true, url: 'https://example.com/docs/id-005' },
      { type: 'address', verified: false, url: 'https://example.com/docs/addr-005' },
      { type: 'foodHandler', verified: false, url: 'https://example.com/docs/food-005' }
    ],
    kitchenPhotos: [
      'https://i.imgur.com/kitchen5a.jpg',
      'https://i.imgur.com/kitchen5b.jpg'
    ],
    sampleDishes: [
      {
        name: 'Masala Pasta',
        description: 'Italian pasta with Pakistani masala spices and grilled chicken',
        price: 450,
        image: 'https://i.imgur.com/dish5a.jpg'
      },
      {
        name: 'Karahi Pizza',
        description: 'Thin crust pizza topped with karahi-style chicken and vegetables',
        price: 600,
        image: 'https://i.imgur.com/dish5b.jpg'
      }
    ],
    notes: [
      {
        author: 'Fatima Zaidi',
        date: '2023-08-10T13:15:00Z',
        content: 'Kitchen does not meet hygiene standards. Multiple issues identified during video inspection.'
      },
      {
        author: 'Omar Khan',
        date: '2023-08-13T09:20:00Z',
        content: 'Application rejected due to food safety concerns. Detailed feedback sent to applicant.'
      }
    ],
    assignedTo: 'Omar Khan',
    rejectionReason: 'Kitchen facilities do not meet our hygiene and food safety standards. Specific issues include inadequate food storage, cross-contamination risks, and insufficient cleaning protocols.'
  },
  {
    id: 'APP-006',
    kitchenName: 'Peshawar Delights',
    ownerName: 'Adnan Khan',
    email: 'adnan.khan@example.com',
    phone: '+92 333 9990000',
    city: 'Peshawar',
    address: '12 University Road, Peshawar',
    cuisineType: 'Pashtun',
    specialties: ['Chapli Kebab', 'Kabuli Pulao', 'Peshawari Karahi'],
    description: 'Authentic Pashtun cuisine with recipes from the northern regions of Pakistan.',
    experience: '8 years running a small restaurant',
    status: 'in_review',
    submissionDate: '2023-08-08T12:30:00Z',
    lastUpdated: '2023-08-16T10:15:00Z',
    documents: [
      { type: 'identity', verified: true, url: 'https://example.com/docs/id-006' },
      { type: 'address', verified: true, url: 'https://example.com/docs/addr-006' },
      { type: 'foodHandler', verified: false, url: 'https://example.com/docs/food-006' }
    ],
    kitchenPhotos: [
      'https://i.imgur.com/kitchen6a.jpg',
      'https://i.imgur.com/kitchen6b.jpg',
      'https://i.imgur.com/kitchen6c.jpg'
    ],
    sampleDishes: [
      {
        name: 'Chapli Kebab',
        description: 'Flat, round kebabs made with minced beef, tomatoes, and a blend of Pashtun spices',
        price: 300,
        image: 'https://i.imgur.com/dish6a.jpg'
      },
      {
        name: 'Kabuli Pulao',
        description: 'Fragrant rice dish with tender meat, carrots, and raisins',
        price: 450,
        image: 'https://i.imgur.com/dish6b.jpg'
      }
    ],
    notes: [
      {
        author: 'Hamza Ali',
        date: '2023-08-12T15:30:00Z',
        content: 'ID and address verified. Waiting on food handler certification.'
      },
      {
        author: 'Hamza Ali',
        date: '2023-08-16T10:15:00Z',
        content: 'Scheduled kitchen inspection for August 18th.'
      }
    ],
    assignedTo: 'Hamza Ali'
  },
  {
    id: 'APP-007',
    kitchenName: 'Punjab Da Dhaba',
    ownerName: 'Harpreet Singh',
    email: 'harpreet.singh@example.com',
    phone: '+92 300 3334444',
    city: 'Lahore',
    address: '89 Anarkali Bazaar, Lahore',
    cuisineType: 'Punjabi',
    specialties: ['Sarson Da Saag', 'Makki Di Roti', 'Butter Chicken'],
    description: 'Traditional Punjabi cuisine with a focus on authentic village-style cooking methods.',
    experience: '15 years of family restaurant business',
    status: 'pending',
    submissionDate: '2023-08-15T09:45:00Z',
    lastUpdated: '2023-08-15T09:45:00Z',
    documents: [
      { type: 'identity', verified: false, url: 'https://example.com/docs/id-007' },
      { type: 'address', verified: false, url: 'https://example.com/docs/addr-007' },
      { type: 'foodHandler', verified: false, url: 'https://example.com/docs/food-007' }
    ],
    kitchenPhotos: [
      'https://i.imgur.com/kitchen7a.jpg',
      'https://i.imgur.com/kitchen7b.jpg'
    ],
    sampleDishes: [
      {
        name: 'Sarson Da Saag with Makki Di Roti',
        description: 'Mustard greens curry served with cornmeal flatbread',
        price: 350,
        image: 'https://i.imgur.com/dish7a.jpg'
      },
      {
        name: 'Amritsari Fish',
        description: 'Crispy fried fish with a blend of Punjabi spices',
        price: 500,
        image: 'https://i.imgur.com/dish7b.jpg'
      }
    ],
    notes: [],
    assignedTo: null
  }
];

// Helper function to get application by ID
export const getApplicationById = (applicationId) => {
  return mockOnboardingApplications.find(app => app.id === applicationId) || null;
};

// Helper function to get applications by status
export const getApplicationsByStatus = (status) => {
  return mockOnboardingApplications.filter(app => app.status === status);
};

// Helper function to get applications by city
export const getApplicationsByCity = (city) => {
  return mockOnboardingApplications.filter(app => app.city === city);
};

// Helper function to get applications by cuisine type
export const getApplicationsByCuisine = (cuisineType) => {
  return mockOnboardingApplications.filter(app => app.cuisineType === cuisineType);
};

// Helper function to get applications assigned to a specific admin
export const getApplicationsByAssignee = (assignee) => {
  return mockOnboardingApplications.filter(app => app.assignedTo === assignee);
};

// Get unique cities from applications
export const getApplicationCities = () => {
  return [...new Set(mockOnboardingApplications.map(app => app.city))];
};

// Get unique cuisine types from applications
export const getApplicationCuisines = () => {
  return [...new Set(mockOnboardingApplications.map(app => app.cuisineType))];
};

// Get unique statuses from applications
export const getApplicationStatuses = () => {
  return [...new Set(mockOnboardingApplications.map(app => app.status))];
};

// Get unique assignees from applications
export const getApplicationAssignees = () => {
  return [...new Set(mockOnboardingApplications
    .filter(app => app.assignedTo !== null)
    .map(app => app.assignedTo))];
};
