// Mock data for kitchen users
export const mockKitchenUsers = [
  {
    id: 1,
    kitchenId: 1,
    name: 'Ahmed Khan',
    email: 'ahmed.khan@example.com',
    phone: '+92 300 1234567',
    role: 'Owner',
    status: 'active',
    bio: 'Experienced chef with 10 years in Pakistani cuisine. Specializes in authentic Lahori dishes.',
    dateOfBirth: '1985-05-15',
    gender: 'Male',
    pinAvailable: true,
    pinBlocked: false,
    trustedTokens: [
      { 
        id: 'tk_1a2b3c4d5e', 
        maskedToken: '••••••••3456', 
        createdAt: '2023-01-15T10:30:00Z', 
        expiresAt: '2024-01-15T10:30:00Z' 
      }
    ],
    documents: [
      {
        id: 'doc_1',
        type: 'ID Card',
        name: 'National ID Card.pdf',
        status: 'verified',
        uploadDate: '2023-01-10T08:15:00Z',
        fileUrl: '/documents/id_card_ahmed.pdf'
      },
      {
        id: 'doc_2',
        type: 'Food Handler Certificate',
        name: 'Food Handler Certificate.pdf',
        status: 'verified',
        uploadDate: '2023-01-12T14:30:00Z',
        fileUrl: '/documents/food_handler_ahmed.pdf'
      }
    ]
  },
  {
    id: 2,
    kitchenId: 1,
    name: 'Sara Ali',
    email: 'sara.ali@example.com',
    phone: '+92 300 7654321',
    role: 'Chef',
    status: 'active',
    bio: 'Pastry chef with expertise in traditional Pakistani sweets and desserts.',
    dateOfBirth: '1990-08-22',
    gender: 'Female',
    pinAvailable: false,
    pinBlocked: false,
    trustedTokens: [],
    documents: [
      {
        id: 'doc_3',
        type: 'ID Card',
        name: 'National ID Card.jpg',
        status: 'pending',
        uploadDate: '2023-02-05T09:45:00Z',
        fileUrl: '/documents/id_card_sara.jpg'
      }
    ]
  },
  {
    id: 3,
    kitchenId: 1,
    name: 'Bilal Ahmed',
    email: 'bilal.ahmed@example.com',
    phone: '+92 301 9876543',
    role: 'Chef',
    status: 'inactive',
    bio: 'Specializes in BBQ and grilled items. Previously worked at top restaurants in Karachi.',
    dateOfBirth: '1988-03-10',
    gender: 'Male',
    pinAvailable: true,
    pinBlocked: true,
    trustedTokens: [
      { 
        id: 'tk_5e4d3c2b1a', 
        maskedToken: '••••••••7890', 
        createdAt: '2023-03-20T14:15:00Z', 
        expiresAt: '2024-03-20T14:15:00Z' 
      }
    ],
    documents: [
      {
        id: 'doc_4',
        type: 'ID Card',
        name: 'National ID Card.pdf',
        status: 'verified',
        uploadDate: '2023-03-01T11:20:00Z',
        fileUrl: '/documents/id_card_bilal.pdf'
      },
      {
        id: 'doc_5',
        type: 'Food Handler Certificate',
        name: 'Food Handler Certificate.pdf',
        status: 'rejected',
        uploadDate: '2023-03-05T16:40:00Z',
        fileUrl: '/documents/food_handler_bilal.pdf'
      },
      {
        id: 'doc_6',
        type: 'Kitchen Photos',
        name: 'Kitchen Photos.zip',
        status: 'verified',
        uploadDate: '2023-03-10T13:25:00Z',
        fileUrl: '/documents/kitchen_photos_bilal.zip'
      }
    ]
  },
  {
    id: 4,
    kitchenId: 2,
    name: 'Fatima Shah',
    email: 'fatima.shah@example.com',
    phone: '+92 302 1122334',
    role: 'Owner',
    status: 'active',
    bio: 'Founder of Karachi Flavors with a passion for authentic Sindhi cuisine.',
    dateOfBirth: '1982-11-05',
    gender: 'Female',
    pinAvailable: true,
    pinBlocked: false,
    trustedTokens: [
      { 
        id: 'tk_9a8b7c6d5e', 
        maskedToken: '••••••••1234', 
        createdAt: '2023-02-10T09:45:00Z', 
        expiresAt: '2024-02-10T09:45:00Z' 
      }
    ],
    documents: [
      {
        id: 'doc_7',
        type: 'ID Card',
        name: 'National ID Card.pdf',
        status: 'verified',
        uploadDate: '2023-02-01T10:15:00Z',
        fileUrl: '/documents/id_card_fatima.pdf'
      },
      {
        id: 'doc_8',
        type: 'Business Registration',
        name: 'Business Registration.pdf',
        status: 'verified',
        uploadDate: '2023-02-03T14:20:00Z',
        fileUrl: '/documents/business_reg_fatima.pdf'
      }
    ]
  },
  {
    id: 5,
    kitchenId: 3,
    name: 'Noor Mohammad',
    email: 'noor.mohammad@example.com',
    phone: '+92 303 5566778',
    role: 'Owner',
    status: 'active',
    bio: 'Master of Pashtun cuisine with family recipes passed down through generations.',
    dateOfBirth: '1975-07-18',
    gender: 'Male',
    pinAvailable: true,
    pinBlocked: true,
    trustedTokens: [],
    documents: []
  }
];

// Helper function to get users by kitchen ID
export const getKitchenUsersByKitchenId = (kitchenId) => {
  return mockKitchenUsers.filter(user => user.kitchenId === parseInt(kitchenId));
};

// Helper function to get user by ID
export const getKitchenUserById = (userId) => {
  return mockKitchenUsers.find(user => user.id === parseInt(userId)) || null;
};

// Helper function to update user status
export const updateKitchenUserStatus = (userId, newStatus) => {
  const userIndex = mockKitchenUsers.findIndex(user => user.id === parseInt(userId));
  if (userIndex === -1) return null;
  
  mockKitchenUsers[userIndex] = {
    ...mockKitchenUsers[userIndex],
    status: newStatus
  };
  
  return mockKitchenUsers[userIndex];
};

// Helper function to update user details
export const updateKitchenUserDetails = (userId, updatedDetails) => {
  const userIndex = mockKitchenUsers.findIndex(user => user.id === parseInt(userId));
  if (userIndex === -1) return null;
  
  mockKitchenUsers[userIndex] = {
    ...mockKitchenUsers[userIndex],
    ...updatedDetails
  };
  
  return mockKitchenUsers[userIndex];
};

// Helper function to delete trusted token
export const deleteTrustedToken = (userId, tokenId) => {
  const userIndex = mockKitchenUsers.findIndex(user => user.id === parseInt(userId));
  if (userIndex === -1) return null;
  
  mockKitchenUsers[userIndex] = {
    ...mockKitchenUsers[userIndex],
    trustedTokens: mockKitchenUsers[userIndex].trustedTokens.filter(token => token.id !== tokenId)
  };
  
  return mockKitchenUsers[userIndex];
};

// Helper function to update PIN blocked status
export const updatePinBlockedStatus = (userId, isBlocked) => {
  const userIndex = mockKitchenUsers.findIndex(user => user.id === parseInt(userId));
  if (userIndex === -1) return null;
  
  mockKitchenUsers[userIndex] = {
    ...mockKitchenUsers[userIndex],
    pinBlocked: isBlocked
  };
  
  return mockKitchenUsers[userIndex];
};
