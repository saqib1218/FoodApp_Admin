import { 
  getKitchenMedia, 
  addKitchenMedia, 
  updateKitchenMedia, 
  deleteKitchenMedia,
  updateMediaPosition,
  updateMediaStatus,
  updateBannerStatus
} from '../../data/kitchens/mockKitchenMedia';

// Helper function to simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const kitchenMediaService = {
  // Get all media for a kitchen
  getKitchenMedia: async (kitchenId) => {
    await delay(300);
    return getKitchenMedia(kitchenId);
  },
  
  // Add new media
  addMedia: async (kitchenId, mediaData) => {
    await delay(500);
    return addKitchenMedia(kitchenId, mediaData);
  },
  
  // Update media details
  updateMedia: async (kitchenId, mediaId, updates) => {
    await delay(400);
    return updateKitchenMedia(kitchenId, mediaId, updates);
  },
  
  // Delete media
  deleteMedia: async (kitchenId, mediaId) => {
    await delay(300);
    return deleteKitchenMedia(kitchenId, mediaId);
  },
  
  // Update media position
  updatePosition: async (kitchenId, mediaId, newPosition) => {
    await delay(300);
    return updateMediaPosition(kitchenId, mediaId, newPosition);
  },
  
  // Update media status (active/inactive)
  updateStatus: async (kitchenId, mediaId, newStatus) => {
    await delay(300);
    return updateMediaStatus(kitchenId, mediaId, newStatus);
  },
  
  // Set/unset as banner
  updateBanner: async (kitchenId, mediaId, isBanner) => {
    await delay(300);
    return updateBannerStatus(kitchenId, mediaId, isBanner);
  },
  
  // Upload kitchen logo (special case of media)
  uploadLogo: async (kitchenId, fileData) => {
    await delay(800);
    
    // In a real app, this would handle file upload to a server
    // For our mock, we'll create a media entry with a placeholder URL
    const logoData = {
      type: 'logo',
      url: fileData.url || 'https://via.placeholder.com/400x400?text=Kitchen+Logo',
      isBanner: false
    };
    
    // Add the logo as a media item
    const mediaList = addKitchenMedia(kitchenId, logoData);
    
    return {
      success: true,
      message: 'Logo uploaded successfully',
      mediaList
    };
  }
};
