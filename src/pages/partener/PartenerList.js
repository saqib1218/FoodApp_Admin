import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MagnifyingGlassIcon, FunnelIcon, EyeIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
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
    city: '',
    status: ''
  });
  const [showFilters, setShowFilters] = useState(false);
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

    // Apply city filter
    if (filters.city) {
      result = result.filter(partner => 
        partner.role.toLowerCase().includes(filters.city.toLowerCase())
      );
    }

    // Apply status filter
    if (filters.status) {
      const statusBoolean = filters.status === 'active';
      result = result.filter(partner => partner.status === statusBoolean);
    }

    setFilteredParteners(result);
  }, [searchTerm, filters, parteners]);

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
    console.log('Edit partner:', partnerId);
    // TODO: Implement edit functionality
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
        <ConfirmationModal
          isOpen={showConfirmationModal}
          title={confirmationAction === 'status' ? 'Confirm Status Change' : 'Confirm Delete'}
          message={
            confirmationAction === 'status' 
              ? `Are you sure you want to ${pendingAction?.newStatus ? 'activate' : 'deactivate'} "${pendingAction?.partnerName}"?`
              : `Are you sure you want to delete "${pendingAction?.partnerName}"?`
          }
          comment={confirmationComment}
          onCommentChange={setConfirmationComment}
          onConfirm={confirmationAction === 'status' ? handleConfirmStatusChange : handleConfirmDelete}
          onCancel={handleCancelConfirmation}
          confirmButtonText={confirmationAction === 'status' ? 'Confirm Change' : 'Confirm Delete'}
          confirmButtonColor="primary"
        />
        {/* Filter Panel */}
        {showFilters && (
          <div className="p-4 border-b border-gray-200 grid grid-cols-1 gap-y-4 sm:grid-cols-3 sm:gap-x-6">
            <div>
              <label htmlFor="city-filter" className="block text-sm font-medium text-gray-700">
                City
              </label>
              <select
                id="city-filter"
                value={filters.city}
                onChange={(e) => setFilters({ ...filters, city: e.target.value })}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
              >
                <option value="">All Cities</option>
                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
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
                {statuses.map((status) => (
                  <option key={status} value={status}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-end">
              <button
                type="button"
                onClick={resetFilters}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                Reset Filters
              </button>
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
                    Partner Name
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Kitchen Name
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
                {filteredParteners.map((partner) => (
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
    </div>
  );
};

export default PartenerList;
