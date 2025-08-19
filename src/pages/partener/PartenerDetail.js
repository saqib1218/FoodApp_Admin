import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeftIcon, EnvelopeIcon, PhoneIcon, XMarkIcon } from '@heroicons/react/24/outline';
import ConfirmationModal from '../../components/ConfirmationModal';

const PartenerDetail = () => {
  const { id } = useParams();
  const [partener, setPartener] = useState(null);
  const [activeTab, setActiveTab] = useState('info');
  const [isLoading, setIsLoading] = useState(true);
  
  // Kitchen creation modal state
  const [showKitchenModal, setShowKitchenModal] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [confirmationComment, setConfirmationComment] = useState('');
  
  // Rejection modal state
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectReason, setRejectReason] = useState('');
  const [rejectComment, setRejectComment] = useState('');
  const [kitchenForm, setKitchenForm] = useState({
    name: '',
    tagline: '',
    approvalStatus: 'Pending for approval'
  });
  const [kitchenNameError, setKitchenNameError] = useState('');
  const [kitchenInfo, setKitchenInfo] = useState(null);

  // Rejection reasons options
  const rejectionReasons = [
    'Incomplete Documentation',
    'Invalid CNIC Information',
    'Poor Image Quality',
    'Document Expired',
    'Information Mismatch',
    'Suspicious Activity',
    'Other'
  ];

  // ID Verification edit modal state
  const [showIdEditModal, setShowIdEditModal] = useState(false);
  const [idForm, setIdForm] = useState({
    documentNumber: '42101-1234567-8',
    expiryDate: '2028-05-15'
  });

  // Validate kitchen name - max 14 words, no symbols
  const validateKitchenName = (name) => {
    // Regex to allow only letters, numbers, and spaces
    const symbolRegex = /^[a-zA-Z0-9\s]+$/;
    // Check if name contains only allowed characters
    if (!symbolRegex.test(name) && name.trim() !== '') {
      return 'Kitchen name cannot contain symbols or special characters';
    }
    // Check word count (split by spaces and filter empty strings)
    const wordCount = name.trim().split(/\s+/).filter(word => word.length > 0).length;
    if (wordCount > 14) {
      return 'Kitchen name cannot exceed 14 words';
    }
    return '';
  };

  useEffect(() => {
    // This would be replaced with an API call in production
    const fetchPartener = () => {
      // Mock data for a single customer
      const mockPartener = {
        id: parseInt(id),
        name: 'Ahmed Khan',
        email: 'ahmed@example.com',
        phone: '+92 300 1234567',
        city: 'Lahore',
        address: '123 Main Street, Block F, Gulberg III, Lahore',
        status: 'active',
        KYC:"active",
        Pin:"active", 
        cnicFront: 'https://example.com/cnic-front.jpg',
        cnicBack: 'https://example.com/cnic-back.jpg',
        joinedDate: '2023-01-15'
      };

      setPartener(mockPartener);
      setIsLoading(false);
    };

    fetchPartener();
  }, [id]);

  // Handle kitchen creation
  const handleOpenKitchenModal = () => {
    setShowKitchenModal(true);
  };

  const handleCreateKitchen = () => {
    const nameError = validateKitchenName(kitchenForm.name);
    setKitchenNameError(nameError);
    
    if (kitchenForm.name.trim() && !nameError) {
      setShowConfirmationModal(true);
    }
  };

  const handleConfirmCreateKitchen = () => {
    setKitchenInfo({
      name: kitchenForm.name,
      tagline: kitchenForm.tagline,
      approvalStatus: kitchenForm.approvalStatus,
      createdDate: new Date().toISOString().split('T')[0],
      comment: confirmationComment
    });
    setShowKitchenModal(false);
    setShowConfirmationModal(false);
    setKitchenForm({ name: '', tagline: '', approvalStatus: 'Pending for approval' });
    setKitchenNameError('');
    setConfirmationComment('');
  };

  const handleCancelConfirmation = () => {
    setShowConfirmationModal(false);
    setConfirmationComment('');
  };

  const handleCancelKitchen = () => {
    setShowKitchenModal(false);
    setKitchenForm({ name: '', tagline: '', approvalStatus: 'Pending for approval' });
    setKitchenNameError('');
  };

  // Handle ID verification edit
  const handleOpenIdEditModal = () => {
    setShowIdEditModal(true);
  };

  const handleSaveIdChanges = () => {
    // In a real app, this would call an API to update the ID information
    console.log('Saving ID changes:', idForm);
    alert('ID information updated successfully!');
    setShowIdEditModal(false);
  };

  const handleCancelIdEdit = () => {
    setShowIdEditModal(false);
    // Reset form to original values
    setIdForm({
      documentNumber: '42101-1234567-8',
      expiryDate: '2028-05-15'
    });
  };

  const handleApprovePartner = () => {
    // In a real app, this would call an API to update the partner status
    setPartener({...partener, status: 'active'});
    alert('Partner approved successfully!');
  };

  // Handle reject partner
  const handleRejectPartner = () => {
    setShowRejectModal(true);
  };

  const handleConfirmReject = () => {
    // In a real app, this would call an API to reject the partner
    console.log('Rejecting partner with reason:', rejectReason, 'and comment:', rejectComment);
    setPartener({...partener, status: 'rejected'});
    setShowRejectModal(false);
    setRejectReason('');
    setRejectComment('');
    alert('Partner rejected successfully!');
  };

  const handleCancelReject = () => {
    setShowRejectModal(false);
    setRejectReason('');
    setRejectComment('');
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  // Helper function to get status badge
  const getStatusBadge = (status) => {
    switch (status) {
      case 'active':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            Active
          </span>
        );
      case 'pending':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            Pending Approval
          </span>
        );
      case 'inactive':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            Inactive
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      {/* Header with back button */}
      <div className="mb-6">
        <div className="flex items-center">
          <Link
            to="/parteners"
            className="mr-4 p-2 rounded-full hover:bg-gray-100"
          >
            <ArrowLeftIcon className="h-5 w-5 text-gray-500" />
          </Link>
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">{partener.name}</h1>
            <p className="text-sm text-gray-500">
              Partner ID: {partener.id} • {getStatusBadge(partener.status)}
            </p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('info')}
            className={`${
              activeTab === 'info'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Partner Info
          </button>
          <button
            onClick={() => setActiveTab('kitchen')}
            className={`${
              activeTab === 'kitchen'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Kitchen Info
          </button>
          <button
            onClick={() => setActiveTab('idVerification')}
            className={`${
              activeTab === 'idVerification'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            ID Verification
          </button>
          <button
            onClick={() => setActiveTab('activities')}
            className={`${
              activeTab === 'activities'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Activities
          </button>
        </nav>
      </div>

      {/* Tab Content */}
      <div className="bg-white shadow rounded-lg">
        {activeTab === 'info' && (
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-4">Contact Information</h2>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <EnvelopeIcon className="h-5 w-5 text-gray-400 mr-2" />
                    <p className="text-gray-900">{partener.email}</p>
                  </div>
                  <div className="flex items-center">
                    <PhoneIcon className="h-5 w-5 text-gray-400 mr-2" />
                    <p className="text-gray-900">{partener.phone}</p>
                  </div>
                  {/* <div>
                    <p className="text-sm font-medium text-gray-500">Address</p>
                    <p className="mt-1 text-gray-900">{partener.address}</p>
                  </div> */}
                  {/* <div>
                    <p className="text-sm font-medium text-gray-500">City</p>
                    <p className="mt-1 text-gray-900">{partener.city}</p>
                  </div> */}
                  
                </div>
              </div>
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-4">Profile Information</h2>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Joined Date</p>
                    <p className="mt-1 text-gray-900">{partener.joinedDate}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Status</p>
                    <p className="mt-1">{getStatusBadge(partener.status)}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">PIN Status</p>
                    <p className="mt-1">{getStatusBadge(partener.Pin)}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">KYC Verified</p>
                    <p className="mt-1">{getStatusBadge(partener.KYC)}</p>
                  </div>
                  
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'kitchen' && (
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-medium text-gray-900">Kitchen Information</h2>
              {!kitchenInfo && (
                <button
                  onClick={handleOpenKitchenModal}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  Create Kitchen
                </button>
              )}
            </div>
            
            {kitchenInfo ? (
              <div className=" p-6 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-2">Kitchen Name</h3>
                    <p className="text-lg font-semibold text-gray-900">{kitchenInfo.name}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-2">Kitchen Tagline</h3>
                    <p className="text-gray-900">{kitchenInfo.tagline}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-2">Created Date</h3>
                    <p className="text-gray-900">{kitchenInfo.createdDate}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-gray-500">
                  <p className="text-lg font-medium">No Kitchen Information</p>
                  <p className="mt-2">Create a kitchen profile for this partner to get started.</p>
                </div>
              </div>
            )}
          </div>
        )}

{activeTab === 'idVerification' && (
  <div className="p-6">
    <h2 className="text-lg font-medium text-gray-900 mb-4">Partner ID Verification</h2>
    <div className="p-6 ">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-500 mb-1">ID Documentation Type</label>
          <select 
            disabled
            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-700"
          >
            <option>CNIC</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-500 mb-1">ID Documentation Number</label>
          <input
            type="text"
            disabled
            value={idForm.documentNumber}
            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-700"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-500 mb-1">ID Documentation Expiry</label>
          <input
            type="text"
            disabled
            value={idForm.expiryDate}
            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-700"
          />
        </div>
      </div>

      <div className="flex justify-between items-center mb-4">
        <h3 className="text-sm font-medium text-gray-500">Media Files</h3>
        <button
          onClick={handleOpenIdEditModal}
          className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
        >
          Edit
        </button>
      </div>
      <div className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500 mb-2">Front Side</p>
            <div className="border border-gray-200 rounded-md p-4 flex justify-center">
              <img 
                src="https://example.com/cnic-front.jpg" 
                alt="CNIC Front" 
                className="max-w-full h-48 object-contain rounded"
              />
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-2">Back Side</p>
            <div className="border border-gray-200 rounded-md p-4 flex justify-center">
              <img 
                src="https://example.com/cnic-back.jpg" 
                alt="CNIC Back" 
                className="max-w-full h-48 object-contain rounded"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-3">
        <button
          onClick={handleRejectPartner}
          className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
        >
          Reject
        </button>
        <button
          onClick={handleApprovePartner}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none"
        >
          Approve KYC
        </button>
      </div>
    </div>
  </div>
)}

        {activeTab === 'activities' && (
          <div className="p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-6">Partner Activities</h2>
            
            {/* Activity Timeline */}
            <div className="flow-root">
              <ul className="-mb-8">
                {/* Mock activity data - in real app this would come from API */}
                {[
                  {
                    id: 1,
                    type: 'feedback',
                    title: 'User provided feedback',
                    description: 'Submitted feedback about order delivery experience',
                    timestamp: '2024-01-15 14:30',
                    icon: '💬',
                    bgColor: 'bg-blue-100',
                    iconColor: 'text-blue-600'
                  },
                  {
                    id: 2,
                    type: 'email_update',
                    title: 'User updated email address',
                    description: 'Changed email from old@example.com to ahmed@example.com',
                    timestamp: '2024-01-10 09:15',
                    icon: '✉️',
                    bgColor: 'bg-green-100',
                    iconColor: 'text-green-600'
                  },
                  {
                    id: 3,
                    type: 'address_change',
                    title: 'User changed address',
                    description: 'Updated delivery address to 123 Main Street, Block F, Gulberg III, Lahore',
                    timestamp: '2024-01-08 16:45',
                    icon: '📍',
                    bgColor: 'bg-yellow-100',
                    iconColor: 'text-yellow-600'
                  },
                  {
                    id: 4,
                    type: 'kitchen_name',
                    title: 'User changed kitchen name',
                    description: 'Updated kitchen name from "Ahmed\'s Kitchen" to "Khan\'s Delicious Food"',
                    timestamp: '2024-01-05 11:20',
                    icon: '🍳',
                    bgColor: 'bg-purple-100',
                    iconColor: 'text-purple-600'
                  },
                  {
                    id: 5,
                    type: 'profile_update',
                    title: 'User updated profile information',
                    description: 'Modified phone number and city information',
                    timestamp: '2024-01-02 13:10',
                    icon: '👤',
                    bgColor: 'bg-gray-100',
                    iconColor: 'text-gray-600'
                  }
                ].map((activity, activityIdx, activities) => (
                  <li key={activity.id}>
                    <div className="relative pb-8">
                      {activityIdx !== activities.length - 1 ? (
                        <span
                          className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                          aria-hidden="true"
                        />
                      ) : null}
                      <div className="relative flex space-x-3">
                        <div>
                          <span className={`${activity.bgColor} h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white`}>
                            <span className="text-sm">{activity.icon}</span>
                          </span>
                        </div>
                        <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              {activity.title}
                            </p>
                            <p className="text-sm text-gray-500 mt-1">
                              {activity.description}
                            </p>
                          </div>
                          <div className="whitespace-nowrap text-right text-sm text-gray-500">
                            <time dateTime={activity.timestamp}>
                              {activity.timestamp}
                            </time>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Empty state when no activities */}
            {/* Uncomment this section if you want to show empty state when no activities exist
            <div className="text-center py-12">
              <div className="text-gray-500">
                <p className="text-lg font-medium">No Activities Found</p>
                <p className="mt-2">This partner hasn't performed any activities yet.</p>
              </div>
            </div>
            */}
          </div>
        )}
      </div>

      {/* Create Kitchen Modal */}
      {showKitchenModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-neutral-900">
                Create Kitchen
              </h3>
              <button
                onClick={handleCancelKitchen}
                className="text-gray-400 hover:text-gray-600"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="kitchenName" className="block text-sm font-medium text-gray-700 mb-1">
                  Kitchen Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="kitchenName"
                  value={kitchenForm.name}
                  onChange={(e) => {
                    const newName = e.target.value;
                    setKitchenForm({ ...kitchenForm, name: newName });
                    // Real-time validation
                    const error = validateKitchenName(newName);
                    setKitchenNameError(error);
                  }}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
                    kitchenNameError ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter kitchen name (letters, numbers, spaces only)"
                />
                {kitchenNameError && (
                  <p className="mt-1 text-sm text-red-600">{kitchenNameError}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="kitchenTagline" className="block text-sm font-medium text-gray-700 mb-1">
                  Kitchen Tagline
                </label>
                <input
                  type="text"
                  id="kitchenTagline"
                  value={kitchenForm.tagline}
                  onChange={(e) => setKitchenForm({ ...kitchenForm, tagline: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Enter kitchen tagline (optional)"
                />
              </div>
              
              <div>
                <label htmlFor="approvalStatus" className="block text-sm font-medium text-gray-700 mb-1">
                  Approval Status
                </label>
                <select
                  id="approvalStatus"
                  disabled
                  value={kitchenForm.approvalStatus}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-700 cursor-not-allowed"
                >
                  <option value="Pending for approval">Pending for approval</option>
                </select>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={handleCancelKitchen}
                className="px-4 py-2 bg-white border border-neutral-300 text-neutral-700 rounded-full hover:bg-neutral-50 transition-colors text-sm font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateKitchen}
                disabled={!kitchenForm.name.trim() || kitchenNameError}
                className="px-4 py-2 bg-primary-600 text-white rounded-full hover:bg-primary-700 disabled:bg-primary-300 disabled:cursor-not-allowed transition-colors text-sm font-medium"
              >
                Create Kitchen
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit ID Verification Modal */}
      {showIdEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-neutral-900">
                Edit ID Verification
              </h3>
              <button
                onClick={handleCancelIdEdit}
                className="text-gray-400 hover:text-gray-600"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="editDocumentNumber" className="block text-sm font-medium text-gray-700 mb-1">
                  ID Documentation Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="editDocumentNumber"
                  value={idForm.documentNumber}
                  onChange={(e) => setIdForm({ ...idForm, documentNumber: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Enter ID documentation number"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="editExpiryDate" className="block text-sm font-medium text-gray-700 mb-1">
                  ID Documentation Expiry <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  id="editExpiryDate"
                  value={idForm.expiryDate}
                  onChange={(e) => setIdForm({ ...idForm, expiryDate: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  required
                />
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={handleCancelIdEdit}
                className="px-4 py-2 bg-white border border-neutral-300 text-neutral-700 rounded-full hover:bg-neutral-50 transition-colors text-sm font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveIdChanges}
                disabled={!idForm.documentNumber.trim() || !idForm.expiryDate}
                className="px-4 py-2 bg-primary-600 text-white rounded-full hover:bg-primary-700 disabled:bg-primary-300 disabled:cursor-not-allowed transition-colors text-sm font-medium"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={showConfirmationModal}
        title="Confirm Kitchen Creation"
        message={`Are you sure you want to create this kitchen with the following details?\n\nKitchen Name: ${kitchenForm.name}${kitchenForm.tagline ? `\nTagline: ${kitchenForm.tagline}` : ''}\nStatus: ${kitchenForm.approvalStatus}`}
        comment={confirmationComment}
        onCommentChange={setConfirmationComment}
        onConfirm={handleConfirmCreateKitchen}
        onCancel={handleCancelConfirmation}
        confirmButtonText="Create Kitchen"
        confirmButtonColor="primary"
        isCommentRequired={true}
      />

      {/* Rejection Modal */}
      {showRejectModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-neutral-900">
                Reject Partner KYC
              </h3>
              <button
                onClick={handleCancelReject}
                className="text-neutral-500 hover:text-neutral-700"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>
            
            <div className="mb-4">
              <p className="text-sm text-neutral-700 mb-4">
                Are you sure you want to reject this partner's KYC verification?
              </p>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Rejection Reason <span className="text-red-500">*</span>
                </label>
                <select
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                  className="w-full p-2 border border-neutral-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                  required
                >
                  <option value="">Select a reason</option>
                  {rejectionReasons.map((reason) => (
                    <option key={reason} value={reason}>
                      {reason}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Additional Comments <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={rejectComment}
                  onChange={(e) => setRejectComment(e.target.value)}
                  className="w-full p-2 border border-neutral-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Please provide additional details about the rejection..."
                  rows={3}
                  required
                />
              </div>
            </div>
            
            <div className="flex justify-end space-x-3">
              <button
                onClick={handleCancelReject}
                className="px-4 py-2 bg-white border border-neutral-300 text-neutral-700 rounded-full hover:bg-neutral-50 transition-colors text-sm font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmReject}
                disabled={!rejectReason.trim() || !rejectComment.trim()}
                className="px-4 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Reject Partner
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PartenerDetail;