import React, { useState, useEffect, useContext } from 'react';
import { PencilIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { kitchenAddressService } from '../../../services/kitchens/kitchenAddressService';
import { useAuth } from '../../../context/useAuth';
import { PermissionButton } from '../../../components/PermissionButton';
import { KitchenContext } from './index';

const KitchenAddressesTab = () => {
  const { id: kitchenId } = useContext(KitchenContext);
  const { hasPermission } = useAuth();
  
  // State variables
  const [kitchenAddresses, setKitchenAddresses] = useState([]);
  const [isLoadingAddresses, setIsLoadingAddresses] = useState(false);
  const [showEditAddressModal, setShowEditAddressModal] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [addressForm, setAddressForm] = useState({
    fullAddress: '',
    cityZone: '',
    googleMapLink: '',
    nearestLocation: '',
    deliveryInstructions: ''
  });
  const [addressComment, setAddressComment] = useState('');

  // Fetch kitchen addresses
  useEffect(() => {
    const fetchKitchenAddresses = async () => {
      if (hasPermission('view_kitchen_addresses')) {
        try {
          setIsLoadingAddresses(true);
          console.log('Fetching addresses for kitchen ID:', kitchenId);
          const addresses = await kitchenAddressService.getKitchenAddresses(kitchenId);
          console.log('Fetched addresses:', addresses);
          setKitchenAddresses(addresses);
        } catch (err) {
          console.error('Failed to load kitchen addresses:', err);
        } finally {
          setIsLoadingAddresses(false);
        }
      }
    };

    fetchKitchenAddresses();
  }, [kitchenId, hasPermission]);

  // Handle edit address
  const handleEditAddress = (address) => {
    setSelectedAddress(address);
    setAddressForm({
      fullAddress: address.fullAddress,
      cityZone: address.cityZone,
      googleMapLink: address.googleMapLink,
      nearestLocation: address.nearestLocation,
      deliveryInstructions: address.deliveryInstructions || ''
    });
    setAddressComment('');
    setShowEditAddressModal(true);
  };

  // Handle update address
  const handleUpdateAddress = async (e) => {
    e.preventDefault();
    
    if (!selectedAddress) return;

    try {
      setIsLoadingAddresses(true);
      
      const updatedAddress = {
        ...selectedAddress,
        ...addressForm,
        kitchenId: String(kitchenId)
      };
      
      await kitchenAddressService.updateAddress(updatedAddress, addressComment);
      
      // Refresh addresses list
      const addresses = await kitchenAddressService.getKitchenAddresses(kitchenId);
      setKitchenAddresses(addresses);
      
      // Close modal
      setShowEditAddressModal(false);
      setAddressComment('');
    } catch (err) {
      console.error('Failed to update address:', err);
    } finally {
      setIsLoadingAddresses(false);
    }
  };

  if (isLoadingAddresses) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h3 className="text-lg font-medium text-neutral-900">Kitchen Addresses</h3>
        <p className="mt-1 text-sm text-neutral-500">
          Manage the addresses associated with this kitchen.
        </p>
      </div>

      {kitchenAddresses.length === 0 ? (
        <div className="text-center py-12 bg-neutral-50 rounded-lg">
          <p className="text-neutral-500">No addresses found for this kitchen.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-neutral-200">
            <thead className="bg-neutral-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Address
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  City Zone
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Nearest Location
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-neutral-200">
              {kitchenAddresses.map((address) => (
                <tr key={address.id}>
                  <td className="px-6 py-4 whitespace-normal">
                    <div className="text-sm text-neutral-900">{address.fullAddress}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-neutral-900">{address.cityZone}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-neutral-900">{address.nearestLocation}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <PermissionButton
                      permission="edit_kitchen_addresses"
                      onClick={() => handleEditAddress(address)}
                      className="text-primary-600 hover:text-primary-900 inline-flex items-center"
                    >
                      <PencilIcon className="h-4 w-4 mr-1" />
                      Edit
                    </PermissionButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Edit Address Modal */}
      {showEditAddressModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg max-w-lg w-full p-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-medium text-neutral-900">Edit Kitchen Address</h3>
              <button
                onClick={() => setShowEditAddressModal(false)}
                className="text-neutral-500 hover:text-neutral-700"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={handleUpdateAddress} className="space-y-6">
              <div>
                <label htmlFor="fullAddress" className="block text-sm font-medium text-neutral-700 mb-1">
                  Full Address
                </label>
                <textarea
                  id="fullAddress"
                  name="fullAddress"
                  rows="3"
                  value={addressForm.fullAddress}
                  onChange={(e) => setAddressForm({...addressForm, fullAddress: e.target.value})}
                  className="w-full p-3 border border-neutral-300 rounded-xl focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Enter full address"
                  required
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="cityZone" className="block text-sm font-medium text-neutral-700 mb-1">
                    City Zone
                  </label>
                  <input
                    type="text"
                    id="cityZone"
                    name="cityZone"
                    value={addressForm.cityZone}
                    onChange={(e) => setAddressForm({...addressForm, cityZone: e.target.value})}
                    className="w-full p-3 border border-neutral-300 rounded-xl focus:ring-primary-500 focus:border-primary-500"
                    placeholder="Enter city zone"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="googleMapLink" className="block text-sm font-medium text-neutral-700 mb-1">
                    Google Map Link
                  </label>
                  <input
                    type="text"
                    id="googleMapLink"
                    name="googleMapLink"
                    value={addressForm.googleMapLink}
                    onChange={(e) => setAddressForm({...addressForm, googleMapLink: e.target.value})}
                    className="w-full p-3 border border-neutral-300 rounded-xl focus:ring-primary-500 focus:border-primary-500"
                    placeholder="Enter Google Maps link"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="nearestLocation" className="block text-sm font-medium text-neutral-700 mb-1">
                  Nearest Location
                </label>
                <input
                  type="text"
                  id="nearestLocation"
                  name="nearestLocation"
                  value={addressForm.nearestLocation}
                  onChange={(e) => setAddressForm({...addressForm, nearestLocation: e.target.value})}
                  className="w-full p-3 border border-neutral-300 rounded-xl focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Enter nearest landmark or location"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="deliveryInstructions" className="block text-sm font-medium text-neutral-700 mb-1">
                  Delivery Instructions
                </label>
                <textarea
                  id="deliveryInstructions"
                  name="deliveryInstructions"
                  rows="3"
                  value={addressForm.deliveryInstructions}
                  onChange={(e) => setAddressForm({...addressForm, deliveryInstructions: e.target.value})}
                  className="w-full p-3 border border-neutral-300 rounded-xl focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Enter delivery instructions"
                />
              </div>
              
              <div>
                <label htmlFor="comment" className="block text-sm font-medium text-neutral-700 mb-1">
                  Comment
                </label>
                <textarea
                  id="comment"
                  name="comment"
                  rows="3"
                  value={addressComment}
                  onChange={(e) => setAddressComment(e.target.value)}
                  className="w-full p-3 border border-neutral-300 rounded-xl focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Add a comment about this change..."
                />
              </div>
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowEditAddressModal(false)}
                  className="px-4 py-2 bg-white border border-neutral-300 text-neutral-700 rounded-full hover:bg-neutral-50 transition-colors text-sm font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary-600 text-white rounded-full hover:bg-primary-700 transition-colors text-sm font-medium"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default KitchenAddressesTab;
