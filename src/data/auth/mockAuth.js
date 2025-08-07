// Mock user credentials for development
export const mockUsers = [
  {
    email: 'admin@riwayat.pk',
    password: 'admin123',
    name: 'Admin User',
    role: 'admin',
    avatar: 'https://i.pravatar.cc/150?img=1',
    permissions: [
      "view_kitchens",
      "edit_kitchen",
      "approve_dish",
      "view_orders",
      "send_broadcast"
    ]
  },
  {
    email: 'ops@riwayat.pk',
    password: 'ops123',
    name: 'Operations Manager',
    role: 'operations',
    avatar: 'https://i.pravatar.cc/150?img=2',
    permissions: [
      "view_kitchens",
      "view_orders"
    ]
  },
  {
    email: 'support@riwayat.pk',
    password: 'support123',
    name: 'Support Agent',
    role: 'support',
    avatar: 'https://i.pravatar.cc/150?img=3',
    permissions: [
      "view_kitchens",
      "view_orders"
    ]
  }
];

// Generate a mock JWT token
export const generateMockToken = (user) => {
  // In a real app, this would be done by the backend
  // This is just a simple mock for frontend development
  const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const payload = btoa(JSON.stringify({
    sub: user.email,
    name: user.name,
    role: user.role,
    permissions: user.permissions,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + (60 * 60) // 1 hour expiration
  }));
  const signature = btoa('mock_signature');
  
  return `${header}.${payload}.${signature}`;
};
