import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MagnifyingGlassIcon, FunnelIcon, EyeIcon, PencilIcon, TrashIcon, ChevronUpIcon, ChevronDownIcon, KeyIcon, XMarkIcon } from '@heroicons/react/24/outline';
import ConfirmationModal from '../../components/ConfirmationModal';

const PartenerList = () => {
  const [parteners, setParteners] = useState([]);
  const [filteredParteners, setFilteredParteners] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [confirmationAction, setConfirmationAction] = useState(null);
    const [confirmationComment, setConfirmationComment] = useState('');
    const [pendingAction, setPendingAction] = useState(null);
  const [filters, setFilters] = useState({
    name: '',
    mobileNumber: '',
    email: '',
    kitchenName: '',
    status: '',
    role: ''
  });
  const [showFilters, setShowFilters] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [showResetPinModal, setShowResetPinModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedPartner, setSelectedPartner] = useState(null);
  const [editForm, setEditForm] = useState({
    name: '',
    kitchenName: '',
    email: '',
    phone: '',
    role: ''
  });
  const [pinForm, setPinForm] = useState({
    newPin: '',
    confirmPin: ''
  });
  const handleTogglePartenerStatus = (partnerId) => {
    const partner = parteners.find(p => p.id === partnerId);
    const newStatus = !partner.status;
    
    setConfirmationAction('status');
    setPendingAction({ partnerId, partnerName: partner.name, newStatus });
    setShowConfirmationModal(true);
    setConfirmationComment('');
  };

  // Mock data for partners
  useEffect(() => {
    // This would be replaced with an API call in production
    const mockParteners = [
      {
        id: 101,
        name: 'Ahmed Khan',
        kitchenName: 'Khan\'s Kitchen',
        email: 'ahmed@example.com',
        phone: '+92 300 1234567',
        role:"owner",
        status: true,
        joinedDate: '2023-01-15'
      },
      {
        id: 102,
        name: 'Sara Ali',
        kitchenName: 'Sara\'s Delights',
        email: 'sara@example.com',
        phone: '+92 301 2345678',
        role: 'owner',
        status: true,
        joinedDate: '2023-02-20'
      },
      {
        id: 103,
        name: 'Bilal Ahmad',
        kitchenName: '',
        email: 'bilal@example.com',
        phone: '+92 302 3456789',
        role: 'owner',
        status: false,
        joinedDate: '2023-03-10'
      },
      {
        id: 104,
        name: 'Ayesha Malik',
        kitchenName: 'Ayesha\'s Traditional Kitchen',
        email: 'ayesha@example.com',
        phone: '+92 303 4567890',
        role: 'owner',
        status: true,
        joinedDate: '2023-01-05'
      },
      {
        id: 105,
        name: 'Zainab Hussain',
        kitchenName: 'Zainab\'s Homemade',
        email: 'zainab@example.com',
        phone: '+92 304 5678901',
        role: 'owner',
        status: true,
        joinedDate: '2023-04-12'
      }
    ];

    setParteners(mockParteners);
    setFilteredParteners(mockParteners);
    setIsLoading(false);
  }, []);

  // Filter partners based on search term and filters
  useEffect(() => {
    let result = parteners;

    // Apply search term filter
    if (searchTerm) {
      result = result.filter(partner =>
        partner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        partner.kitchenName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        partner.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        partner.phone.includes(searchTerm)
      );
    }

    // Apply name filter
    if (filters.name) {
      result = result.filter(partner => 
        partner.name.toLowerCase().includes(filters.name.toLowerCase())
      );
    }

    // Apply mobile number filter
    if (filters.mobileNumber) {
      result = result.filter(partner => 
        partner.phone.includes(filters.mobileNumber)
      );
    }

    // Apply email filter
    if (filters.email) {
      result = result.filter(partner => 
        partner.email.toLowerCase().includes(filters.email.toLowerCase())
      );
    }

    // Apply kitchen name filter
    if (filters.kitchenName) {
      result = result.filter(partner => 
        partner.kitchenName.toLowerCase().includes(filters.kitchenName.toLowerCase())
      );
    }

    // Apply status filter
    if (filters.status) {
      const statusBoolean = filters.status === 'active';
      result = result.filter(partner => partner.status === statusBoolean);
    }

    // Apply role filter
    if (filters.role) {
      result = result.filter(partner => 
        partner.role.toLowerCase().includes(filters.role.toLowerCase())
      );
    }

    setFilteredParteners(result);
  }, [searchTerm, filters, parteners]);

  // Sorting function
  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // Apply sorting to filtered partners
  const sortedParteners = React.useMemo(() => {
    let sortableParteners = [...filteredParteners];
    if (sortConfig.key) {
      sortableParteners.sort((a, b) => {
        let aValue = a[sortConfig.key];
        let bValue = b[sortConfig.key];
        
        // Handle empty values
        if (!aValue) aValue = '';
        if (!bValue) bValue = '';
        
        if (aValue < bValue) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableParteners;
  }, [filteredParteners, sortConfig]);

  // Get unique cities and statuses for filter dropdowns
  const cities = [...new Set(parteners.map(partener => partener.role))];
  const statuses = ['active', 'inactive'];

  // Handle status toggle
  const handleStatusToggle = (partnerId) => {
    setParteners(prev => prev.map(partner => 
      partner.id === partnerId 
        ? { ...partner, status: !partner.status }
        : partner
    ));
  };

  // Handle edit action
  const handleEdit = (partnerId) => {
    const partner = parteners.find(p => p.id === partnerId);
    setSelectedPartner(partner);
    setEditForm({
      name: partner.name,
      kitchenName: partner.kitchenName,
      email: partner.email,
      phone: partner.phone,
      role: partner.role
    });
    setShowEditModal(true);
  };

  // Handle edit form submission
  const handleEditSubmit = () => {
    setConfirmationAction('edit');
    setPendingAction({ 
      partnerId: selectedPartner.id, 
      partnerName: selectedPartner.name,
      editData: editForm
    });
    setShowConfirmationModal(true);
    setConfirmationComment('');
  };

  // Handle cancel edit
  const handleCancelEdit = () => {
    setShowEditModal(false);
    setSelectedPartner(null);
    setEditForm({
      name: '',
      kitchenName: '',
      email: '',
      phone: '',
      role: ''
    });
  };

  // Handle reset PIN
  const handleResetPin = (partner) => {
    setSelectedPartner(partner);
    setPinForm({ newPin: '', confirmPin: '' });
    setShowResetPinModal(true);
  };

  // Handle PIN form submission
  const handlePinSubmit = () => {
    // Validate PIN
    if (pinForm.newPin !== pinForm.confirmPin) {
      alert('PINs do not match');
      return;
    }
    
    if (pinForm.newPin.length !== 4) {
      alert('PIN must be 4 digits');
      return;
    }
    
    if (!/^\d{4}$/.test(pinForm.newPin)) {
      alert('PIN must contain only numbers');
      return;
    }

    // Here you would typically make an API call to update the PIN
    console.log('Resetting PIN for partner:', selectedPartner.name, 'New PIN:', pinForm.newPin);
    alert('PIN reset successfully');
    
    // Close modal and reset form
    setShowResetPinModal(false);
    setSelectedPartner(null);
    setPinForm({ newPin: '', confirmPin: '' });
  };

  // Handle confirm status change
  const handleConfirmStatusChange = () => {
    if (pendingAction && confirmationComment.trim()) {
      setParteners(prev => prev.map(partner => 
        partner.id === pendingAction.partnerId 
          ? { ...partner, status: pendingAction.newStatus }
          : partner
      ));
      setShowConfirmationModal(false);
      setConfirmationComment('');
      setPendingAction(null);
    }
  };

  // Handle confirm delete
  const handleConfirmDelete = () => {
    if (pendingAction && confirmationComment.trim()) {
      setParteners(prev => prev.filter(partner => partner.id !== pendingAction.partnerId));
      setShowConfirmationModal(false);
      setConfirmationComment('');
      setPendingAction(null);
    }
  };

  // Handle confirm edit
  const handleConfirmEdit = () => {
    if (pendingAction && confirmationComment.trim()) {
      setParteners(prev => prev.map(partner => 
        partner.id === pendingAction.partnerId 
          ? { ...partner, ...pendingAction.editData }
          : partner
      ));
      setShowEditModal(false);
      setShowConfirmationModal(false);
      setConfirmationComment('');
      setPendingAction(null);
      setSelectedPartner(null);
      setEditForm({
        name: '',
        kitchenName: '',
        email: '',
        phone: '',
        role: ''
      });
    }
  };

  // Handle cancel confirmation
  const handleCancelConfirmation = () => {
    setShowConfirmationModal(false);
    setConfirmationComment('');
    setPendingAction(null);
  };

  // Handle delete action
  const handleRemovePartener = (partnerId) => {
    const partner = parteners.find(partner => partner.id === partnerId);
    
    setConfirmationAction('delete');
    setPendingAction({ partnerId, partnerName: partner.name });
    setShowConfirmationModal(true);
    setConfirmationComment('');
  };

  // Reset all filters
  const resetFilters = () => {
    setSearchTerm('');
    setFilters({
      city: '',
      status: ''
    });
  };

  return (
    <div>
      {showConfirmationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60] p-4">
          <ConfirmationModal
            isOpen={showConfirmationModal}
            title={
              confirmationAction === 'status' ? 'Confirm Status Change' : 
              confirmationAction === 'edit' ? 'Confirm Partner Update' : 
              'Confirm Delete'
            }
            message={
              confirmationAction === 'status' 
                ? `Are you sure you want to ${pendingAction?.newStatus ? 'activate' : 'deactivate'} "${pendingAction?.partnerName}"?`
                : confirmationAction === 'edit'
                ? `Are you sure you want to update the information for "${pendingAction?.partnerName}"?`
                : `Are you sure you want to delete "${pendingAction?.partnerName}"?`
            }
            comment={confirmationComment}
            onCommentChange={setConfirmationComment}
            onConfirm={
              confirmationAction === 'status' ? handleConfirmStatusChange : 
              confirmationAction === 'edit' ? handleConfirmEdit :
              handleConfirmDelete
            }
            onCancel={handleCancelConfirmation}
            confirmButtonText={
              confirmationAction === 'status' ? 'Confirm Change' : 
              confirmationAction === 'edit' ? 'Update Partner' :
              'Confirm Delete'
            }
            confirmButtonColor="primary"
          />
        </div>
      )}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Partners</h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage platform partners and their kitchen information
        </p>
      </div>

      {/* Search and Filter */}
      <div className="bg-white shadow rounded-lg mb-6">
        <div className="p-4 border-b border-gray-200 sm:flex sm:items-center sm:justify-between">
          <div className="relative rounded-md shadow-sm w-full sm:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
              placeholder="Search partners..."
            />
          </div>
          <div className="mt-3 sm:mt-0 sm:ml-4">
            <button
              type="button"
              onClick={() => setShowFilters(!showFilters)}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              <FunnelIcon className="-ml-1 mr-2 h-5 w-5 text-gray-400" aria-hidden="true" />
              Filter
            </button>
          </div>
        </div>
        
        {/* Filter Panel */}
        {showFilters && (
          <div className="p-4 border-b border-gray-200 grid grid-cols-1 gap-y-4 sm:grid-cols-2 lg:grid-cols-3 sm:gap-x-6">
            <div>
              <label htmlFor="name-filter" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                id="name-filter"
                value={filters.name}
                onChange={(e) => setFilters({ ...filters, name: e.target.value })}
                className="mt-1 block w-full px-3 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
                placeholder="Filter by name..."
              />
            </div>
            
            <div>
              <label htmlFor="mobile-filter" className="block text-sm font-medium text-gray-700">
                Mobile Number
              </label>
              <input
                type="text"
                id="mobile-filter"
                value={filters.mobileNumber}
                onChange={(e) => setFilters({ ...filters, mobileNumber: e.target.value })}
                className="mt-1 block w-full px-3 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
                placeholder="Filter by mobile number..."
              />
            </div>
            
            <div>
              <label htmlFor="email-filter" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="text"
                id="email-filter"
                value={filters.email}
                onChange={(e) => setFilters({ ...filters, email: e.target.value })}
                className="mt-1 block w-full px-3 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
                placeholder="Filter by email..."
              />
            </div>
            
            <div>
              <label htmlFor="kitchen-filter" className="block text-sm font-medium text-gray-700">
                Kitchen Name
              </label>
              <input
                type="text"
                id="kitchen-filter"
                value={filters.kitchenName}
                onChange={(e) => setFilters({ ...filters, kitchenName: e.target.value })}
                className="mt-1 block w-full px-3 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
                placeholder="Filter by kitchen name..."
              />
            </div>
            
            <div>
              <label htmlFor="status-filter" className="block text-sm font-medium text-gray-700">
                Status
              </label>
              <select
                id="status-filter"
                value={filters.status}
                onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
              >
                <option value="">All Statuses</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="role-filter" className="block text-sm font-medium text-gray-700">
                Role
              </label>
              <input
                type="text"
                id="role-filter"
                value={filters.role}
                onChange={(e) => setFilters({ ...filters, role: e.target.value })}
                className="mt-1 block w-full px-3 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
                placeholder="Filter by role..."
              />
            </div>
          </div>
        )}
      </div>

      {/* Partners Table */}
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        {isLoading ? (
          <div className="p-6 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto"></div>
            <p className="mt-2 text-sm text-gray-500">Loading partners...</p>
          </div>
        ) : filteredParteners.length === 0 ? (
          <div className="p-6 text-center">
            <p className="text-gray-500">No partners found matching your criteria.</p>
            <button
              onClick={resetFilters}
              className="mt-2 text-primary-600 hover:text-primary-500"
            >
              Reset filters
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <button
                      onClick={() => handleSort('name')}
                      className="flex items-center space-x-1 hover:text-gray-700 focus:outline-none"
                    >
                      <span>Partner Name</span>
                      {sortConfig.key === 'name' ? (
                        sortConfig.direction === 'asc' ? (
                          <ChevronUpIcon className="h-4 w-4" />
                        ) : (
                          <ChevronDownIcon className="h-4 w-4" />
                        )
                      ) : (
                        <div className="h-4 w-4" />
                      )}
                    </button>
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <button
                      onClick={() => handleSort('kitchenName')}
                      className="flex items-center space-x-1 hover:text-gray-700 focus:outline-none"
                    >
                      <span>Kitchen Name</span>
                      {sortConfig.key === 'kitchenName' ? (
                        sortConfig.direction === 'asc' ? (
                          <ChevronUpIcon className="h-4 w-4" />
                        ) : (
                          <ChevronDownIcon className="h-4 w-4" />
                        )
                      ) : (
                        <div className="h-4 w-4" />
                      )}
                    </button>
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {sortedParteners.map((partner) => (
                  <tr key={partner.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{partner.name}</div>
                      <div className="text-sm text-gray-500">{partner.phone}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{partner.kitchenName}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{partner.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{partner.role}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={partner.status}
                          onChange={() => handleTogglePartenerStatus(partner.id)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary-500 rounded-full peer peer-checked:bg-primary-600 transition-colors"></div>
                        <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full shadow transform transition-transform peer-checked:translate-x-5"></div>
                      </label>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-3">
                        <Link
                          to={`/parteners/${partner.id}`}
                          className="text-primary-600 hover:text-primary-900 transition-colors"
                          title="View partner"
                        >
                          <EyeIcon className="h-5 w-5" />
                        </Link>
                        <button
                          onClick={() => handleEdit(partner.id)}
                          className="text-blue-600 hover:text-blue-900 transition-colors"
                          title="Edit partner"
                        >
                          <PencilIcon className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleResetPin(partner)}
                          className="text-yellow-600 hover:text-yellow-900 transition-colors"
                          title="Reset PIN"
                        >
                          <KeyIcon className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleRemovePartener(partner.id)}
                          className="text-red-600 hover:text-red-900 transition-colors"
                          title="Delete partner"
                        >
                          <TrashIcon className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Edit Partner Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-neutral-900">Edit Partner</h3>
              <button 
                onClick={handleCancelEdit} 
                className="text-gray-400 hover:text-gray-600"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label htmlFor="editName" className="block text-sm font-medium text-gray-700 mb-1">
                  Partner Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="editName"
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Enter partner name"
                  required
                />
              </div>

              <div>
                <label htmlFor="editKitchenName" className="block text-sm font-medium text-gray-700 mb-1">
                  Kitchen Name
                </label>
                <input
                  type="text"
                  id="editKitchenName"
                  value={editForm.kitchenName}
                  onChange={(e) => setEditForm({ ...editForm, kitchenName: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Enter kitchen name (optional)"
                />
              </div>

              <div>
                <label htmlFor="editEmail" className="block text-sm font-medium text-gray-700 mb-1">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="editEmail"
                  value={editForm.email}
                  onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Enter email address"
                  required
                />
              </div>

              <div>
                <label htmlFor="editPhone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  id="editPhone"
                  value={editForm.phone}
                  onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Enter phone number"
                  required
                />
              </div>

              <div>
                <label htmlFor="editRole" className="block text-sm font-medium text-gray-700 mb-1">
                  Role <span className="text-red-500">*</span>
                </label>
                <select
                  id="editRole"
                  value={editForm.role}
                  onChange={(e) => setEditForm({ ...editForm, role: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  required
                >
                  <option value="">Select role</option>
                  <option value="owner">Owner</option>
                  <option value="manager">Manager</option>
                  <option value="staff">Staff</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={handleCancelEdit}
                className="px-4 py-2 bg-white border border-neutral-300 text-neutral-700 rounded-full hover:bg-neutral-50 transition-colors text-sm font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleEditSubmit}
                disabled={!editForm.name.trim() || !editForm.email.trim() || !editForm.phone.trim() || !editForm.role}
                className="px-4 py-2 bg-primary-600 text-white rounded-full hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors text-sm font-medium"
              >
                Update Partner
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reset PIN Modal */}
      {showResetPinModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-neutral-900">Reset PIN</h3>
              <button 
                onClick={() => setShowResetPinModal(false)} 
                className="text-gray-400 hover:text-gray-600"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>

            <div className="mb-4">
              <p className="text-sm text-gray-600">
                Resetting PIN for: <span className="font-medium">{selectedPartner?.name}</span>
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label htmlFor="newPin" className="block text-sm font-medium text-gray-700 mb-1">
                  New PIN
                </label>
                <input
                  type="password"
                  id="newPin"
                  value={pinForm.newPin}
                  onChange={(e) => setPinForm({ ...pinForm, newPin: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Enter 4-digit PIN"
                  maxLength={4}
                />
              </div>

              <div>
                <label htmlFor="confirmPin" className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm PIN
                </label>
                <input
                  type="password"
                  id="confirmPin"
                  value={pinForm.confirmPin}
                  onChange={(e) => setPinForm({ ...pinForm, confirmPin: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Confirm 4-digit PIN"
                  maxLength={4}
                />
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowResetPinModal(false)}
                className="px-4 py-2 bg-white border border-neutral-300 text-neutral-700 rounded-full hover:bg-neutral-50 transition-colors text-sm font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handlePinSubmit}
                disabled={!pinForm.newPin || !pinForm.confirmPin}
                className="px-4 py-2 bg-yellow-600 text-white rounded-full hover:bg-yellow-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors text-sm font-medium"
              >
                Reset PIN
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PartenerList;
