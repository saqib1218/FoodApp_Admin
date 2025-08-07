import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MagnifyingGlassIcon, FunnelIcon, EyeIcon } from '@heroicons/react/24/outline';

const CustomersList = () => {
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    city: '',
    status: ''
  });
  const [showFilters, setShowFilters] = useState(false);

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
        status: 'active',
        orders: 12,
        joinedDate: '2023-01-15'
      },
      {
        id: 102,
        name: 'Sara Ali',
        email: 'sara@example.com',
        phone: '+92 301 2345678',
        city: 'Karachi',
        status: 'active',
        orders: 8,
        joinedDate: '2023-02-20'
      },
      {
        id: 103,
        name: 'Bilal Ahmad',
        email: 'bilal@example.com',
        phone: '+92 302 3456789',
        city: 'Peshawar',
        status: 'inactive',
        orders: 3,
        joinedDate: '2023-03-10'
      },
      {
        id: 104,
        name: 'Ayesha Malik',
        email: 'ayesha@example.com',
        phone: '+92 303 4567890',
        city: 'Islamabad',
        status: 'active',
        orders: 15,
        joinedDate: '2023-01-05'
      },
      {
        id: 105,
        name: 'Zainab Hussain',
        email: 'zainab@example.com',
        phone: '+92 304 5678901',
        city: 'Quetta',
        status: 'active',
        orders: 6,
        joinedDate: '2023-04-12'
      }
    ];

    setCustomers(mockCustomers);
    setFilteredCustomers(mockCustomers);
    setIsLoading(false);
  }, []);

  // Filter customers based on search term and filters
  useEffect(() => {
    let result = customers;

    // Apply search term filter
    if (searchTerm) {
      result = result.filter(customer =>
        customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.phone.includes(searchTerm)
      );
    }

    // Apply city filter
    if (filters.city) {
      result = result.filter(customer => 
        customer.city.toLowerCase() === filters.city.toLowerCase()
      );
    }

    // Apply status filter
    if (filters.status) {
      result = result.filter(customer => 
        customer.status.toLowerCase() === filters.status.toLowerCase()
      );
    }

    setFilteredCustomers(result);
  }, [searchTerm, filters, customers]);

  // Get unique cities and statuses for filter dropdowns
  const cities = [...new Set(customers.map(customer => customer.city))];
  const statuses = [...new Set(customers.map(customer => customer.status))];

  // Helper function to get status badge
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
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            Inactive
          </span>
        );
      default:
        return null;
    }
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
        <h1 className="text-2xl font-semibold text-gray-900">Customers</h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage platform customers and their information
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
              placeholder="Search customers..."
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

      {/* Customers List */}
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
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
          <ul className="divide-y divide-gray-200">
            {filteredCustomers.map((customer) => (
              <li key={customer.id}>
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <p className="text-lg font-medium text-primary-600 truncate">{customer.name}</p>
                      <div className="ml-4">{getStatusBadge(customer.status)}</div>
                    </div>
                    <div className="ml-2 flex-shrink-0 flex">
                      <Link
                        to={`/customers/${customer.id}`}
                        className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-primary-700 bg-primary-100 hover:bg-primary-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                      >
                        <EyeIcon className="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />
                        View
                      </Link>
                    </div>
                  </div>
                  <div className="mt-2 sm:flex sm:justify-between">
                    <div className="sm:flex">
                      <p className="flex items-center text-sm text-gray-500">
                        <span className="truncate">{customer.email}</span>
                      </p>
                      <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                        {customer.phone}
                      </p>
                    </div>
                    <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                      <p>{customer.city}</p>
                      <p className="ml-4">
                        {customer.orders} orders • Joined {customer.joinedDate}
                      </p>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default CustomersList;
