import { 
  mockKitchenUsers, 
  getKitchenUsersByKitchenId, 
  getKitchenUserById,
  updateKitchenUserStatus,
  updateKitchenUserDetails,
  deleteTrustedToken,
  updatePinBlockedStatus
} from '../../data/kitchens/mockKitchenUsers';

// Helper function to simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const kitchenUserService = {
  // Get all users for a specific kitchen
  getKitchenUsers: async (kitchenId) => {
    await delay(500);
    return getKitchenUsersByKitchenId(kitchenId);
  },

  // Get a specific user by ID
  getKitchenUserById: async (userId) => {
    await delay(300);
    return getKitchenUserById(userId);
  },

  // Update user status
  updateUserStatus: async (userId, newStatus) => {
    await delay(700);
    return updateKitchenUserStatus(userId, newStatus);
  },

  // Update user details
  updateUserDetails: async (userId, updatedDetails) => {
    await delay(800);
    return updateKitchenUserDetails(userId, updatedDetails);
  },

  // Delete trusted token
  deleteTrustedToken: async (userId, tokenId, comment = '') => {
    await delay(500);
    console.log(`Deleting token ${tokenId} with comment: ${comment}`);
    return deleteTrustedToken(userId, tokenId);
  },
  
  // Unblock PIN
  unblockUserPin: async (userId) => {
    await delay(600);
    return updatePinBlockedStatus(userId, false);
  }
};
