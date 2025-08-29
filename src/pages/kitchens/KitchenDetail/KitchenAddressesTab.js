import React, { useState, useEffect, useContext } from 'react';
import { PencilIcon, XMarkIcon, PlusIcon, EyeIcon, TrashIcon } from '@heroicons/react/24/outline';
// TODO: Replace with RTK Query hooks when migrating API calls
import kitchenAddresses from '../../../data/kitchens/kitchenAddresses';
import { useAuth } from '../../../hooks/useAuth';

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
  
  // New modal states
  const [showViewAddressModal, setShowViewAddressModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showUpdateConfirmModal, setShowUpdateConfirmModal] = useState(false);
  const [deleteComment, setDeleteComment] = useState('');
  const [updateComment, setUpdateComment] = useState('');
  const [addressForm, setAddressForm] = useState({
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    type: 'primary'
  });

  // State for addresses data
  const [addresses, setAddresses] = useState([]);
  const [isLoadingAddresses, setIsLoadingAddresses] = useState(false);

  // Load addresses data on component mount
  useEffect(() => {
    if (kitchenId) {
      setIsLoadingAddresses(true);
      // Filter addresses for current kitchen
      const filteredAddresses = kitchenAddresses.filter(addr => addr.kitchenId === kitchenId.toString());
      setAddresses(filteredAddresses);
      setIsLoadingAddresses(false);
    }
  }, [kitchenId]);

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
      type: address.type || 'primary'
    });
    setShowAddressModal(true);
  };

  // Handle view address - open view modal
  const handleViewAddress = (address) => {
    setSelectedAddress(address);
    setShowViewAddressModal(true);
  };

  // Handle delete address - open delete confirmation modal
  const handleDeleteAddress = (address) => {
    setSelectedAddress(address);
    setDeleteComment('');
    setShowDeleteModal(true);
  };

  // Confirm delete address
  const handleConfirmDeleteAddress = () => {
    if (!selectedAddress) return;

    // Update local state directly (no API call with mock data)
    setAddresses(addresses.filter(address => address.id !== selectedAddress.id));
    
    setShowDeleteModal(false);
    setSelectedAddress(null);
    setDeleteComment('');
  };

  // Handle update confirmation for address updates
  const handleConfirmUpdateAddress = () => {
    if (!selectedAddress) return;

    // Update local state directly (no API call with mock data)
    setAddresses(addresses.map(address => 
      address.id === selectedAddress.id 
        ? { ...address, ...addressForm }
        : address
    ));
    
    setShowUpdateConfirmModal(false);
    setShowAddressModal(false);
    setSelectedAddress(null);
    setUpdateComment('');
    setAddressForm({
      fullAddress: '',
      city: '',
      cityZone: '',
      nearestLocation: '',
      type: 'primary'
    });
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
    if (selectedAddress) {
      // For edit, show update confirmation modal
      setUpdateComment('');
      setShowUpdateConfirmModal(true);
    } else {
      // For add, proceed directly
      setModalAction('add');
      setShowAddressModal(false);
      setConfirmComment('');
      setShowConfirmModal(true);
    }
  };

  // Confirm address action
  const confirmAddressAction = () => {
    try {
      if (modalAction === 'add') {
        // Add new address to local state (mock implementation)
        const newAddress = {
          id: `addr-${Date.now()}`,
          kitchenId: kitchenId.toString(),
          fullAddress: addressForm.fullAddress,
          cityZone: addressForm.cityZone,
          googleMapLink: addressForm.googleMapLink,
          nearestLocation: addressForm.nearestLocation,
          deliveryInstructions: addressForm.deliveryInstructions,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        setAddresses([...addresses, newAddress]);
      } else {
        // Update existing address in local state (mock implementation)
        const updatedAddresses = addresses.map(addr => 
          addr.id === selectedAddress.id 
            ? { 
                ...addr, 
                fullAddress: addressForm.fullAddress,
                cityZone: addressForm.cityZone,
                googleMapLink: addressForm.googleMapLink,
                nearestLocation: addressForm.nearestLocation,
                deliveryInstructions: addressForm.deliveryInstructions,
                updatedAt: new Date().toISOString()
              }
            : addr
        );
        setAddresses(updatedAddresses);
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
        <button
          onClick={handleAddAddress}
          className="px-4 py-2 bg-primary-600 text-white rounded-full hover:bg-primary-700 transition-colors text-sm font-medium flex items-center"
        >
          <PlusIcon className="h-4 w-4 mr-1" />
          Add Address
        </button>
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
                    <div className="flex justify-end space-x-2">
                      <button
                        onClick={() => handleEditAddress(address)}
                        className="text-blue-600 hover:text-blue-900 transition-colors"
                        title="Edit address"
                      >
                        <PencilIcon className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleViewAddress(address)}
                        className="text-green-600 hover:text-green-900 transition-colors"
                        title="View address"
                      >
                        <EyeIcon className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteAddress(address)}
                        className="text-red-600 hover:text-red-900 transition-colors"
                        title="Delete address"
                      >
                        <TrashIcon className="h-4 w-4" />
                      </button>
                    </div>
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

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedAddress && (
        <ConfirmationModal
          isOpen={showDeleteModal}
          title="Delete Address"
          message={`Are you sure you want to permanently delete this address? This action cannot be undone.`}
          confirmText="Delete"
          cancelText="Cancel"
          onConfirm={handleConfirmDeleteAddress}
          onCancel={() => {
            setShowDeleteModal(false);
            setSelectedAddress(null);
            setDeleteComment('');
          }}
          comment={deleteComment}
          onCommentChange={setDeleteComment}
          variant="danger"
        />
      )}

      {/* Update Confirmation Modal */}
      {showUpdateConfirmModal && selectedAddress && (
        <ConfirmationModal
          isOpen={showUpdateConfirmModal}
          title="Update Address"
          message={`Are you sure you want to update this address? Please provide a comment for this change.`}
          confirmText="Update"
          cancelText="Cancel"
          onConfirm={handleConfirmUpdateAddress}
          onCancel={() => {
            setShowUpdateConfirmModal(false);
            setUpdateComment('');
          }}
          comment={updateComment}
          onCommentChange={setUpdateComment}
          variant="primary"
        />
      )}

      {/* View Address Modal */}
      {showViewAddressModal && selectedAddress && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg max-w-lg w-full p-6 max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-medium text-neutral-900">
                Address Details
              </h3>
              <button
                onClick={() => setShowViewAddressModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="text-xs font-medium text-gray-500">Full Address</label>
                <div className="text-sm text-gray-900">{selectedAddress.fullAddress || 'Not provided'}</div>
              </div>
              
              <div>
                <label className="text-xs font-medium text-gray-500">City</label>
                <div className="text-sm text-gray-900">{selectedAddress.city || 'Not provided'}</div>
              </div>
              
              <div>
                <label className="text-xs font-medium text-gray-500">City Zone</label>
                <div className="text-sm text-gray-900">{selectedAddress.cityZone || 'Not provided'}</div>
              </div>
              
              <div>
                <label className="text-xs font-medium text-gray-500">Nearest Location</label>
                <div className="text-sm text-gray-900">{selectedAddress.nearestLocation || 'Not provided'}</div>
              </div>
              
              <div>
                <label className="text-xs font-medium text-gray-500">Type</label>
                <div className="text-sm text-gray-900 capitalize">{selectedAddress.type || 'primary'}</div>
              </div>
              
              <div>
                <label className="text-xs font-medium text-gray-500">Status</label>
                <div className="mt-1">
                  {getStatusBadge(selectedAddress.status || 'active')}
                </div>
              </div>
              
              {selectedAddress.locationLink && (
                <div>
                  <label className="text-xs font-medium text-gray-500">Location Link</label>
                  <div className="text-sm">
                    <a 
                      href={selectedAddress.locationLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary-600 hover:text-primary-900"
                    >
                      View on Map
                    </a>
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex justify-end mt-6 pt-4 border-t border-gray-200">
              <button
                onClick={() => setShowViewAddressModal(false)}
                className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors text-sm font-medium"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default KitchenAddressesTab;
