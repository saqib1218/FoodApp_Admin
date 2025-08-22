import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MagnifyingGlassIcon, FunnelIcon, EyeIcon, PencilIcon, TrashIcon, ChatBubbleLeftIcon, GiftIcon } from '@heroicons/react/24/outline';
import ConfirmationModal from '../../components/ConfirmationModal';

const CustomersList = () => {
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    tag: '',
    lastOrderDate: '',
    lifetimeValue: ''
  });
  const [showFilters, setShowFilters] = useState(false);
  
  // Confirmation modal states
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [pendingDeleteCustomer, setPendingDeleteCustomer] = useState(null);
  const [confirmationComment, setConfirmationComment] = useState('');

  // Mock data for customers
  useEffect(() => {
    // This would be replaced with an API call in production
    const mockCustomers = [
      {
        id: 101,
        name: 'Ahmed Khan',
        email: 'ahmed@example.com',
        phone: '+92 300 1234567',
        city: 'Lahore',
        status: true,
        orders: 12,
        totalSpend: 15600,
        lastOrderDate: '2024-01-10',
        joinedDate: '2023-01-15',
        tags: ['High spender']
      },
      {
        id: 102,
        name: 'Sara Ali',
        email: 'sara@example.com',
        phone: '+92 301 2345678',
        city: 'Karachi',
        status: true,
        orders: 8,
        totalSpend: 4200,
        lastOrderDate: '2024-01-08',
        joinedDate: '2023-02-20',
        tags: ['Event buyer']
      },
      {
        id: 103,
        name: 'Bilal Ahmad',
        email: 'bilal@example.com',
        phone: '+92 302 3456789',
        city: 'Peshawar',
        status: false,
        orders: 3,
        totalSpend: 890,
        lastOrderDate: '2023-12-15',
        joinedDate: '2023-03-10',
        tags: ['Dormant']
      },
      {
        id: 104,
        name: 'Ayesha Malik',
        email: 'ayesha@example.com',
        phone: '+92 303 4567890',
        city: 'Islamabad',
        status: true,
        orders: 15,
        totalSpend: 22400,
        lastOrderDate: '2024-01-12',
        joinedDate: '2023-01-05',
        tags: ['High spender']
      },
      {
        id: 105,
        name: 'Zainab Hussain',
        email: 'zainab@example.com',
        phone: '+92 304 5678901',
        city: 'Quetta',
        status: false,
        orders: 6,
        totalSpend: 1200,
        lastOrderDate: '2024-01-05',
        joinedDate: '2023-04-12',
        tags: ['New customer']
      },
      {
        id: 106,
        name: 'Hassan Ali',
        email: 'hassan@example.com',
        phone: '+92 305 6789012',
        city: 'Faisalabad',
        status: true,
        orders: 25,
        totalSpend: 35000,
        lastOrderDate: '2024-01-14',
        joinedDate: '2022-11-20',
        tags: ['High spender', 'Event buyer']
      }
    ];

    setCustomers(mockCustomers);
    setFilteredCustomers(mockCustomers);
    setIsLoading(false);
  }, []);

  // Filter customers based on search term and filters
  useEffect(() => {
    let result = customers;

    // Apply search term filter (Name/Phone/Email)
    if (searchTerm) {
      result = result.filter(customer =>
        customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.phone.includes(searchTerm)
      );
    }

    // Apply tag filter
    if (filters.tag) {
      result = result.filter(customer => 
        customer.tags.includes(filters.tag)
      );
    }

    // Apply last order date filter
    if (filters.lastOrderDate) {
      const filterDate = new Date(filters.lastOrderDate);
      result = result.filter(customer => {
        const customerOrderDate = new Date(customer.lastOrderDate);
        return customerOrderDate >= filterDate;
      });
    }

    // Apply lifetime value filter
    if (filters.lifetimeValue) {
      const minValue = parseFloat(filters.lifetimeValue);
      result = result.filter(customer => 
        customer.totalSpend >= minValue
      );
    }

    setFilteredCustomers(result);
  }, [searchTerm, filters, customers]);

  // Get unique tags for filter dropdown
  const allTags = customers.flatMap(customer => customer.tags);
  const uniqueTags = [...new Set(allTags)];

  // Handle edit action
  const handleEdit = (customerId) => {
    console.log('Edit customer:', customerId);
    // TODO: Implement edit functionality
  };

  // Handle status toggle
  const handleStatusToggle = (customerId) => {
    setCustomers(prev => prev.map(customer => 
      customer.id === customerId 
        ? { ...customer, status: !customer.status }
        : customer
    ));
  };

  // Handle message action
  const handleMessage = (customerId) => {
    console.log('Message customer:', customerId);
    // TODO: Implement messaging functionality
  };

  // Handle offer action
  const handleOffer = (customerId) => {
    console.log('Send offer to customer:', customerId);
    // TODO: Implement offer functionality
  };

  // Handle delete action
  const handleDelete = (customerId) => {
    const customer = customers.find(c => c.id === customerId);
    setPendingDeleteCustomer(customer);
    setShowConfirmationModal(true);
    setConfirmationComment('');
  };

  // Handle confirm delete
  const handleConfirmDelete = () => {
    if (!confirmationComment.trim()) return;

    if (pendingDeleteCustomer) {
      setCustomers(prev => prev.filter(c => c.id !== pendingDeleteCustomer.id));
    }

    setShowConfirmationModal(false);
    setPendingDeleteCustomer(null);
    setConfirmationComment('');
  };

  // Handle cancel delete
  const handleCancelDelete = () => {
    setShowConfirmationModal(false);
    setPendingDeleteCustomer(null);
    setConfirmationComment('');
  };

 

  // Reset all filters
  const resetFilters = () => {
    setSearchTerm('');
    setFilters({
      tag: '',
      lastOrderDate: '',
      lifetimeValue: ''
    });
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-PK', {
      style: 'currency',
      currency: 'PKR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  // Get tag badge color
  const getTagBadgeColor = (tag) => {
    const colors = {
      'New customer': 'bg-blue-100 text-blue-800',
      'High spender': 'bg-green-100 text-green-800',
      'Dormant': 'bg-red-100 text-red-800',
      'Event buyer': 'bg-purple-100 text-purple-800'
    };
    return colors[tag] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Customers</h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage platform customers and their information
        </p>
      </div>

      {/* Filters and Search */}
      <div className="mt-6 mb-6 flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              placeholder="Search by name, phone, or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="sm:w-48">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center justify-center w-full px-4 py-2 border border-gray-300 rounded-md bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
          >
            <FunnelIcon className="h-5 w-5 mr-2 text-gray-400" aria-hidden="true" />
            Filters
          </button>
        </div>
      </div>

      {/* Advanced Filters */}
      {showFilters && (
        <div className="mt-4 mb-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tag
              </label>
              <select
                className="block w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                value={filters.tag}
                onChange={(e) => setFilters({ ...filters, tag: e.target.value })}
              >
                <option value="">All Tags</option>
                {uniqueTags.map((tag) => (
                  <option key={tag} value={tag}>
                    {tag}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Last Order Date (From)
              </label>
              <input
                type="date"
                className="block w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                value={filters.lastOrderDate}
                onChange={(e) => setFilters({ ...filters, lastOrderDate: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Min Lifetime Value (PKR)
              </label>
              <input
                type="number"
                className="block w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                placeholder="e.g. 5000"
                value={filters.lifetimeValue}
                onChange={(e) => setFilters({ ...filters, lifetimeValue: e.target.value })}
              />
            </div>
          </div>
        </div>
      )}

      {/* Customers Table */}
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        {isLoading ? (
          <div className="p-6 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto"></div>
            <p className="mt-2 text-sm text-gray-500">Loading customers...</p>
          </div>
        ) : filteredCustomers.length === 0 ? (
          <div className="p-6 text-center">
            <p className="text-gray-500">No customers found matching your criteria.</p>
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
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Order Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total Orders
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total Spend
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tags
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
                {filteredCustomers.map((customer) => (
                  <tr key={customer.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{customer.name}</div>
                      <div className="text-sm text-gray-500">{customer.email}</div>
                      <div className="text-sm text-gray-500">{customer.phone}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {new Date(customer.lastOrderDate).toLocaleDateString('en-GB')}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{customer.orders}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {formatCurrency(customer.totalSpend)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-wrap gap-1">
                        {customer.tags.map((tag, index) => (
                          <span
                            key={index}
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTagBadgeColor(tag)}`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={customer.status}
                          onChange={() => handleStatusToggle(customer.id)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary-500 rounded-full peer peer-checked:bg-primary-600 transition-colors"></div>
                        <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full shadow transform transition-transform peer-checked:translate-x-5"></div>
                      </label>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <Link
                          to={`/customers/${customer.id}`}
                          className="text-primary-600 hover:text-primary-900 transition-colors"
                          title="View customer"
                        >
                          <EyeIcon className="h-4 w-4" />
                        </Link>
                        <button
                          onClick={() => handleEdit(customer.id)}
                          className="text-blue-600 hover:text-blue-900 transition-colors"
                          title="Edit customer"
                        >
                          <PencilIcon className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleMessage(customer.id)}
                          className="text-green-600 hover:text-green-900 transition-colors"
                          title="Message customer"
                        >
                          <ChatBubbleLeftIcon className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleOffer(customer.id)}
                          className="text-purple-600 hover:text-purple-900 transition-colors"
                          title="Send offer"
                        >
                          <GiftIcon className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(customer.id)}
                          className="text-red-600 hover:text-red-900 transition-colors"
                          title="Delete customer"
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
      </div>

      {/* Delete Confirmation Modal */}
      {showConfirmationModal && (
        <ConfirmationModal
          isOpen={showConfirmationModal}
          title="Delete Customer"
          message={`Are you sure you want to permanently delete customer "${pendingDeleteCustomer?.name}"? This action cannot be undone.`}
          confirmText="Delete Customer"
          cancelText="Cancel"
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
          comment={confirmationComment}
          onCommentChange={setConfirmationComment}
          variant="danger"
        />
      )}
    </div>
  );
};

export default CustomersList;
