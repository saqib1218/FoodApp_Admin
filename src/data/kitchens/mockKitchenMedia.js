// Mock data for kitchen media
const mockKitchenMedia = {
  'kitchen-1': [
    {
      id: 'a1b2c34d-e5f6-78g0-abcd-ef1234567890',
      type: 'image',
      url: 'https://images.unsplash.com/photo-1618160705438-9b02ab328466',
      position: 0,
      isBanner: false,
      status: 'active',
      addedOn: '2023-01-15',
      lastUpdated: '2023-01-15'
    },
    {
      id: 'b2c34de5-f6g7-89h1-bcde-f123456789g1',
      type: 'image',
      url: 'https://images.unsplash.com/photo-1721822800607-8c38ef2ba400',
      position: 1,
      isBanner: true,
      status: 'active',
      addedOn: '2023-01-20',
      lastUpdated: '2023-02-01'
    },
    {
      id: 'c3d4e5f6-g7h8-9i12-cdef-123456789h12',
      type: 'image',
      url: 'https://images.unsplash.com/photo-1466721591506-2df7ba79f056',
      position: 2,
      isBanner: false,
      status: 'inactive',
      addedOn: '2023-02-01',
      lastUpdated: '2023-02-05'
    }
  ],
  'kitchen-2': [
    {
      id: 'd4e5f6g7-h8i9-j012-defg-h123456789i3',
      type: 'image',
      url: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836',
      position: 0,
      isBanner: true,
      status: 'active',
      addedOn: '2023-02-10',
      lastUpdated: '2023-02-10'
    }
  ],
  // Add data for numeric IDs
  '1': [
    {
      id: 'e5f6g7h8-i9j0-k123-fghi-j123456789k4',
      type: 'image',
      url: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe',
      position: 0,
      isBanner: true,
      status: 'active',
      addedOn: '2023-03-01',
      lastUpdated: '2023-03-01'
    },
    {
      id: 'f6g7h8i9-j0k1-l234-ghij-k123456789l5',
      type: 'video',
      url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      position: 1,
      isBanner: false,
      status: 'active',
      addedOn: '2023-03-05',
      lastUpdated: '2023-03-05'
    }
  ],
  '2': [
    {
      id: 'g7h8i9j0-k1l2-m345-hijk-l123456789m6',
      type: 'image',
      url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38',
      position: 0,
      isBanner: false,
      status: 'active',
      addedOn: '2023-03-10',
      lastUpdated: '2023-03-10'
    }
  ]
};

// Helper functions for CRUD operations
const getKitchenMedia = (kitchenId) => {
  return [...(mockKitchenMedia[kitchenId] || [])];
};

const addKitchenMedia = (kitchenId, mediaData) => {
  if (!mockKitchenMedia[kitchenId]) {
    mockKitchenMedia[kitchenId] = [];
  }
  
  const newMedia = {
    id: generateId(),
    type: mediaData.type || 'image',
    url: mediaData.url,
    position: mockKitchenMedia[kitchenId].length,
    isBanner: mediaData.isBanner || false,
    status: 'active',
    addedOn: getCurrentDate(),
    lastUpdated: getCurrentDate()
  };
  
  mockKitchenMedia[kitchenId].push(newMedia);
  return [...mockKitchenMedia[kitchenId]];
};

const updateKitchenMedia = (kitchenId, mediaId, updates) => {
  const mediaIndex = mockKitchenMedia[kitchenId]?.findIndex(media => media.id === mediaId);
  
  if (mediaIndex === -1 || mediaIndex === undefined) {
    throw new Error('Media not found');
  }
  
  mockKitchenMedia[kitchenId][mediaIndex] = {
    ...mockKitchenMedia[kitchenId][mediaIndex],
    ...updates,
    lastUpdated: getCurrentDate()
  };
  
  return [...mockKitchenMedia[kitchenId]];
};

const deleteKitchenMedia = (kitchenId, mediaId) => {
  if (!mockKitchenMedia[kitchenId]) {
    return [];
  }
  
  mockKitchenMedia[kitchenId] = mockKitchenMedia[kitchenId].filter(media => media.id !== mediaId);
  
  // Update positions after deletion
  mockKitchenMedia[kitchenId].forEach((media, index) => {
    media.position = index;
  });
  
  return [...mockKitchenMedia[kitchenId]];
};

const updateMediaPosition = (kitchenId, mediaId, newPosition) => {
  if (!mockKitchenMedia[kitchenId]) {
    throw new Error('Kitchen not found');
  }
  
  const media = mockKitchenMedia[kitchenId].find(m => m.id === mediaId);
  if (!media) {
    throw new Error('Media not found');
  }
  
  const oldPosition = media.position;
  
  // Ensure position is within bounds
  const maxPosition = mockKitchenMedia[kitchenId].length - 1;
  newPosition = Math.max(0, Math.min(newPosition, maxPosition));
  
  // Update positions
  mockKitchenMedia[kitchenId].forEach(m => {
    if (m.id === mediaId) {
      m.position = newPosition;
    } else if (oldPosition < newPosition && m.position > oldPosition && m.position <= newPosition) {
      m.position--;
    } else if (oldPosition > newPosition && m.position < oldPosition && m.position >= newPosition) {
      m.position++;
    }
  });
  
  return [...mockKitchenMedia[kitchenId]];
};

const updateMediaStatus = (kitchenId, mediaId, newStatus) => {
  return updateKitchenMedia(kitchenId, mediaId, { status: newStatus });
};

const updateBannerStatus = (kitchenId, mediaId, isBanner) => {
  // If setting as banner, remove banner status from other media
  if (isBanner) {
    mockKitchenMedia[kitchenId]?.forEach(media => {
      if (media.id !== mediaId) {
        media.isBanner = false;
      }
    });
  }
  
  return updateKitchenMedia(kitchenId, mediaId, { isBanner });
};

// Utility functions
const generateId = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};

const getCurrentDate = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export {
  getKitchenMedia,
  addKitchenMedia,
  updateKitchenMedia,
  deleteKitchenMedia,
  updateMediaPosition,
  updateMediaStatus,
  updateBannerStatus
};
