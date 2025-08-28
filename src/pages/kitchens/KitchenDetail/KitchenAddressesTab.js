import React, { useState, useEffect, useContext } from 'react';
import { PencilIcon, XMarkIcon, PlusIcon } from '@heroicons/react/24/outline';
import { useGetKitchenAddressesQuery, useAddKitchenAddressMutation, useUpdateKitchenAddressMutation, useDeleteKitchenAddressMutation } from '../../../store/api/modules/kitchens/kitchensApi';
import { useAuth } from '../../../hooks/useAuth';
import { PermissionButton } from '../../../components/PermissionGate';
import { KitchenContext } from './index';
import ConfirmationModal from '../../../components/ConfirmationModal';

const KitchenAddressesTab = () => {
  const { hasPermission } = useAuth();
  const { kitchen } = useContext(KitchenContext);
  const kitchenId = kitchen?.id;

  // State variables
  const [showModal, setShowModal] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [modalAction, setModalAction] = useState(''); // 'add' or 'edit'
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmComment, setConfirmComment] = useState('');
  const [addressForm, setAddressForm] = useState({
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    type: 'primary'
  });

  // RTK Query hooks
  const {
    data: kitchenAddresses = [],
    isLoading: isLoadingAddresses,
    error: addressesError
  } = useGetKitchenAddressesQuery(kitchenId, {
    skip: !kitchenId || !hasPermission('view_kitchen_addresses')
  });

  const [addKitchenAddress] = useAddKitchenAddressMutation();
  const [updateKitchenAddress] = useUpdateKitchenAddressMutation();
  const [deleteKitchenAddress] = useDeleteKitchenAddressMutation();

  // Handle add address
  const handleAddAddress = () => {
    setSelectedAddress(null);
    setShowModal(true);
    setAddressForm({
      fullAddress: '',
      city: '',
      cityZone: '',
      nearestLocation: '',
      locationLink: '',
      longitude: '',
      latitude: '',
      status: 'active'
    });
    setShowAddressModal(true);
  };

  // Handle edit address
  const handleEditAddress = (address) => {
    setSelectedAddress(address);
    setAddressForm({
      fullAddress: address.fullAddress || '',
      city: address.city || '',
      cityZone: address.cityZone || '',
      nearestLocation: address.nearestLocation || '',
      locationLink: address.locationLink || '',
      longitude: address.longitude || '',
      latitude: address.latitude || '',
      status: address.status || 'active'
    });
    setShowAddressModal(true);
  };

  // Handle get location
  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setAddressForm({
            ...addressForm,
            longitude: position.coords.longitude.toString(),
            latitude: position.coords.latitude.toString()
          });
        },
        (error) => {
          console.error('Error getting location:', error);
          alert('Unable to get location. Please check your browser permissions.');
        }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };

  // Handle submit (add or edit)
  const handleSubmit = (e) => {
    e.preventDefault();
    setModalAction(selectedAddress ? 'edit' : 'add');
    setShowAddressModal(false);
    setConfirmComment('');
    setShowConfirmModal(true);
  };

  // Confirm address action
  const confirmAddressAction = async () => {
    try {
      if (modalAction === 'add') {
        // Add new address using RTK Query mutation
        await addKitchenAddress({
          kitchenId,
          addressData: addressForm
        }).unwrap();
      } else {
        // Update existing address using RTK Query mutation
        await updateKitchenAddress({
          kitchenId,
          addressId: selectedAddress.id,
          addressData: addressForm
        }).unwrap();
      }
      
      setShowConfirmModal(false);
      setConfirmComment('');
      setShowAddressModal(false);
    } catch (err) {
      console.error('Failed to save address:', err);
    }
  };

  // Handle cancel confirmation
  const handleCancelConfirmation = () => {
    setShowConfirmModal(false);
    setConfirmComment('');
    setShowAddressModal(true);
  };

  // Get status badge
  const getStatusBadge = (status) => {
    switch (status) {
      case 'active':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            Active
          </span>
        );
      case 'inactive':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            Inactive
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-neutral-100 text-neutral-800">
            {status}
          </span>
        );
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
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h3 className="text-lg font-medium text-neutral-900">Kitchen Addresses</h3>
          <p className="mt-1 text-sm text-neutral-500">
            Manage the addresses associated with this kitchen.
          </p>
        </div>
        <PermissionButton
          permission="edit_kitchen_addresses"
          onClick={handleAddAddress}
          className="px-4 py-2 bg-primary-600 text-white rounded-full hover:bg-primary-700 transition-colors text-sm font-medium flex items-center"
        >
          <PlusIcon className="h-4 w-4 mr-1" />
          Add Address
        </PermissionButton>
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
                  City
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  City Zone
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Nearest Location
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Status
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
                    <div className="text-sm text-neutral-900">{address.city}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-neutral-900">{address.cityZone}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-neutral-900">{address.nearestLocation}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(address.status || 'active')}
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

      {/* Address Modal */}
      {showAddressModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg max-w-lg w-full max-h-[90vh] overflow-y-auto p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-medium text-neutral-900">
                {selectedAddress ? 'Edit Kitchen Address' : 'Add Kitchen Address'}
              </h3>
              <button
                onClick={() => setShowAddressModal(false)}
                className="text-neutral-500 hover:text-neutral-700"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="fullAddress" className="block text-sm font-medium text-neutral-700 mb-1">
                  Address
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
              
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-neutral-700 mb-1">
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={addressForm.city}
                  onChange={(e) => setAddressForm({...addressForm, city: e.target.value})}
                  className="w-full p-3 border border-neutral-300 rounded-xl focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Enter city name"
                  required
                />
              </div>
              
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
                <label htmlFor="locationLink" className="block text-sm font-medium text-neutral-700 mb-1">
                  Location Link
                </label>
                <input
                  type="url"
                  id="locationLink"
                  name="locationLink"
                  value={addressForm.locationLink}
                  onChange={(e) => setAddressForm({...addressForm, locationLink: e.target.value})}
                  className="w-full p-3 border border-neutral-300 rounded-xl focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Enter location link (Google Maps, etc.)"
                />
              </div>
              
              <div className="flex justify-center mb-4">
                <button
                  type="button"
                  onClick={handleGetLocation}
                  className="px-4 py-2 bg-primary-600 text-white rounded-full hover:bg-primary-700 transition-colors text-sm font-medium"
                >
                  Get Location
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="longitude" className="block text-sm font-medium text-neutral-700 mb-1">
                    Longitude
                  </label>
                  <input
                    type="text"
                    id="longitude"
                    name="longitude"
                    value={addressForm.longitude}
                    className="w-full p-3 border border-neutral-300 rounded-xl bg-neutral-50 cursor-not-allowed"
                    placeholder="Longitude will be filled automatically"
                    disabled
                  />
                </div>
                
                <div>
                  <label htmlFor="latitude" className="block text-sm font-medium text-neutral-700 mb-1">
                    Latitude
                  </label>
                  <input
                    type="text"
                    id="latitude"
                    name="latitude"
                    value={addressForm.latitude}
                    className="w-full p-3 border border-neutral-300 rounded-xl bg-neutral-50 cursor-not-allowed"
                    placeholder="Latitude will be filled automatically"
                    disabled
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="status" className="block text-sm font-medium text-neutral-700 mb-1">
                  Status
                </label>
                <select
                  id="status"
                  name="status"
                  value={addressForm.status}
                  onChange={(e) => setAddressForm({...addressForm, status: e.target.value})}
                  className="w-full p-3 border border-neutral-300 rounded-xl focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              
              <div className="flex justify-end space-x-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddressModal(false)}
                  className="px-4 py-2 bg-white border border-neutral-300 text-neutral-700 rounded-full hover:bg-neutral-50 transition-colors text-sm font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary-600 text-white rounded-full hover:bg-primary-700 transition-colors text-sm font-medium"
                >
                  {selectedAddress ? 'Update' : 'Save'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={showConfirmModal}
        title={modalAction === 'add' ? 'Add Address' : 'Update Address'}
        message={modalAction === 'add' 
          ? 'Are you sure you want to add this address to the kitchen?' 
          : 'Are you sure you want to update this kitchen address?'
        }
        comment={confirmComment}
        onCommentChange={setConfirmComment}
        onConfirm={confirmAddressAction}
        onCancel={handleCancelConfirmation}
        confirmButtonText={modalAction === 'add' ? 'Add Address' : 'Update Address'}
        confirmButtonColor="primary"
        isCommentRequired={true}
      />
    </div>
  );
};

export default KitchenAddressesTab;
