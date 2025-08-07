import kitchenAddresses from '../../data/kitchens/kitchenAddresses';

// Helper function to simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Helper to create a deep copy of the data
const cloneData = () => JSON.parse(JSON.stringify(kitchenAddresses));

export const kitchenAddressService = {
  // Get all addresses for a kitchen
  getKitchenAddresses: async (kitchenId) => {
    await delay(500);
    console.log('Service - Getting addresses for kitchen ID:', kitchenId);
    console.log('Service - Available addresses:', cloneData());
    
    // Convert both to strings for comparison to ensure consistency
    const addresses = cloneData().filter(address => String(address.kitchenId) === String(kitchenId));
    console.log('Service - Filtered addresses:', addresses);
    return addresses;
  },

  // Get a specific address by ID
  getAddressById: async (addressId) => {
    await delay(300);
    const address = cloneData().find(addr => addr.id === addressId);
    if (!address) {
      throw new Error('Address not found');
    }
    return address;
  },

  // Update an address
  updateAddress: async (addressId, updatedData, comment = '') => {
    await delay(800);
    
    const addresses = cloneData();
    const index = addresses.findIndex(addr => addr.id === addressId);
    
    if (index === -1) {
      throw new Error('Address not found');
    }
    
    // Update the address with new data
    const updatedAddress = {
      ...addresses[index],
      ...updatedData,
      updatedAt: new Date().toISOString()
    };
    
    // In a real API, we would save the comment to a change log
    console.log(`Address update comment: ${comment}`);
    
    addresses[index] = updatedAddress;
    return updatedAddress;
  },

  // Add a new address
  addAddress: async (addressData) => {
    await delay(800);
    
    const newAddress = {
      id: `addr-${Date.now()}`,
      ...addressData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    // In a real implementation, we would save this to the server
    // For now, we just return the updated list for the kitchen
    const addresses = cloneData();
    addresses.push(newAddress);
    
    return addresses.filter(addr => String(addr.kitchenId) === String(addressData.kitchenId));
  },

  // Delete an address
  deleteAddress: async (addressId) => {
    await delay(600);
    
    const addresses = cloneData();
    const index = addresses.findIndex(addr => addr.id === addressId);
    
    if (index === -1) {
      throw new Error('Address not found');
    }
    
    const kitchenId = addresses[index].kitchenId;
    addresses.splice(index, 1);
    
    return addresses.filter(addr => String(addr.kitchenId) === String(kitchenId));
  }
};

export default kitchenAddressService;
