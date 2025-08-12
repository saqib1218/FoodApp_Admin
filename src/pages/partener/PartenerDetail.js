import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeftIcon, EnvelopeIcon, PhoneIcon, XMarkIcon } from '@heroicons/react/24/outline';

const PartenerDetail = () => {
  const { id } = useParams();
  const [partener, setPartener] = useState(null);
  const [activeTab, setActiveTab] = useState('info');
  const [isLoading, setIsLoading] = useState(true);
  
  // Kitchen creation modal state
  const [showKitchenModal, setShowKitchenModal] = useState(false);
  const [kitchenForm, setKitchenForm] = useState({
    name: '',
    tagline: ''
  });
  const [kitchenInfo, setKitchenInfo] = useState(null);

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
  const handleCreateKitchen = () => {
    setShowKitchenModal(true);
  };

  const handleSaveKitchen = () => {
    if (kitchenForm.name.trim() && kitchenForm.tagline.trim()) {
      setKitchenInfo({
        name: kitchenForm.name,
        tagline: kitchenForm.tagline,
        createdDate: new Date().toISOString().split('T')[0]
      });
      setShowKitchenModal(false);
      setKitchenForm({ name: '', tagline: '' });
    }
  };

  const handleCancelKitchen = () => {
    setShowKitchenModal(false);
    setKitchenForm({ name: '', tagline: '' });
  };

  const handleApprovePartner = () => {
    // In a real app, this would call an API to update the partner status
    setPartener({...partener, status: 'active'});
    alert('Partner approved successfully!');
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
                  <div>
                    <p className="text-sm font-medium text-gray-500">Address</p>
                    <p className="mt-1 text-gray-900">{partener.address}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">City</p>
                    <p className="mt-1 text-gray-900">{partener.city}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Pin Setup</p>
                    <p className="mt-1">{getStatusBadge(partener.Pin)}</p>
                  </div>
                </div>
              </div>
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-4">Account Information</h2>
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
                  onClick={handleCreateKitchen}
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
            value="42101-1234567-8"
            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-700"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-500 mb-1">ID Documentation Expiry</label>
          <input
            type="text"
            disabled
            value="2028-05-15"
            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-700"
          />
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-500 mb-4">Media Files</h3>
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
          className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
        >
          Reject
        </button>
        <button
          onClick={handleApprovePartner}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none"
        >
          Approve Partner
        </button>
      </div>
    </div>
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
                  Kitchen Name
                </label>
                <input
                  type="text"
                  id="kitchenName"
                  value={kitchenForm.name}
                  onChange={(e) => setKitchenForm({ ...kitchenForm, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Enter kitchen name"
                />
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
                  placeholder="Enter kitchen tagline"
                />
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
                onClick={handleSaveKitchen}
                disabled={!kitchenForm.name.trim() || !kitchenForm.tagline.trim()}
                className="px-4 py-2 bg-primary-600 text-white rounded-full hover:bg-primary-700 disabled:bg-primary-300 disabled:cursor-not-allowed transition-colors text-sm font-medium"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PartenerDetail;