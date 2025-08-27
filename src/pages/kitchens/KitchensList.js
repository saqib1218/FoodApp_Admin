import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import {
  MagnifyingGlassIcon,
  FunnelIcon,
  EyeIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  ChevronUpIcon,
  ChevronDownIcon
} from '@heroicons/react/24/outline';
// TODO: Replace with RTK Query hooks when migrating API calls
import { mockKitchenService } from '../../utils/mockServiceHelpers';

const KitchensList = () => {
  const [kitchens, setKitchens] = useState([]);
  const [filteredKitchens, setFilteredKitchens] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    city: '',
    cuisine: '',
    status: '',
    phoneNumber: '',
    kitchenId: '',
    orderId: ''
  });
  const [filterOptions, setFilterOptions] = useState({
    cities: [],
    cuisines: [],
    statuses: []
  });
  const [showFilters, setShowFilters] = useState(false);
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: 'asc'
  });

  // Fetch kitchens and filter options on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        // Fetch kitchens
        const kitchensData = await mockKitchenService.getAllKitchens();
        setKitchens(kitchensData);
        setFilteredKitchens(kitchensData);
        
        // Fetch filter options
        const options = await mockKitchenService.getFilterOptions();
        setFilterOptions(options);
      } catch (error) {
        console.error('Error fetching kitchens:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Apply filters when search term or filters change
  useEffect(() => {
    const applyFilters = async () => {
      setIsLoading(true);
      try {
        const filtered = await mockKitchenService.filterKitchens({
          searchTerm,
          city: filters.city,
          cuisine: filters.cuisine,
          status: filters.status,
          phoneNumber: filters.phoneNumber,
          kitchenId: filters.kitchenId,
          orderId: filters.orderId
        });
        setFilteredKitchens(filtered);
      } catch (error) {
        console.error('Error filtering kitchens:', error);
      } finally {
        setIsLoading(false);
      }
    };

    applyFilters();
  }, [searchTerm, filters]);

  // Helper function to get status badge
  const getStatusBadge = (status) => {
    switch (status) {
      case 'active':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <CheckCircleIcon className="mr-1 h-4 w-4" />
            Active
          </span>
        );
      case 'pending':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            <ClockIcon className="mr-1 h-4 w-4" />
            Pending
          </span>
        );
      case 'suspended':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            <XCircleIcon className="mr-1 h-4 w-4" />
            Suspended
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </span>
        );
    }
  };

  // Sorting functionality
  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // Sort kitchens based on current sort config
  const sortedKitchens = React.useMemo(() => {
    let sortableKitchens = [...filteredKitchens];
    if (sortConfig.key) {
      sortableKitchens.sort((a, b) => {
        if (sortConfig.key === 'name') {
          const aValue = a.name.toLowerCase();
          const bValue = b.name.toLowerCase();
          if (aValue < bValue) {
            return sortConfig.direction === 'asc' ? -1 : 1;
          }
          if (aValue > bValue) {
            return sortConfig.direction === 'asc' ? 1 : -1;
          }
          return 0;
        }
        if (sortConfig.key === 'status') {
          const statusOrder = { 'active': 1, 'pending': 2, 'suspended': 3 };
          const aValue = statusOrder[a.status] || 999;
          const bValue = statusOrder[b.status] || 999;
          if (aValue < bValue) {
            return sortConfig.direction === 'asc' ? -1 : 1;
          }
          if (aValue > bValue) {
            return sortConfig.direction === 'asc' ? 1 : -1;
          }
          return 0;
        }
        return 0;
      });
    }
    return sortableKitchens;
  }, [filteredKitchens, sortConfig]);

  // Get sort icon for column headers
  const getSortIcon = (columnKey) => {
    if (sortConfig.key !== columnKey) {
      return null;
    }
    return sortConfig.direction === 'asc' ? (
      <ChevronUpIcon className="h-4 w-4 ml-1" />
    ) : (
      <ChevronDownIcon className="h-4 w-4 ml-1" />
    );
  };

  // Reset all filters
  const resetFilters = () => {
    setSearchTerm('');
    setFilters({
      city: '',
      cuisine: '',
      status: '',
      phoneNumber: '',
      kitchenId: '',
      orderId: ''
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-neutral-800">Kitchens</h1>
        <p className="mt-1 text-sm text-neutral-600">
          Manage and monitor all registered kitchens
        </p>
      </div>

      {/* Filters and Search */}
      <div className="mt-6 flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              placeholder="Search by kitchen name or owner..."
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
        <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                City
              </label>
              <select
                className="block w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                value={filters.city}
                onChange={(e) => setFilters({ ...filters, city: e.target.value })}
              >
                <option value="">All Cities</option>
                {filterOptions.cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Cuisine
              </label>
              <select
                className="block w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                value={filters.cuisine}
                onChange={(e) => setFilters({ ...filters, cuisine: e.target.value })}
              >
                <option value="">All Cuisines</option>
                {filterOptions.cuisines.map((cuisine) => (
                  <option key={cuisine} value={cuisine}>
                    {cuisine}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="text"
                className="block w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                placeholder="Search phone..."
                value={filters.phoneNumber}
                onChange={(e) => setFilters({ ...filters, phoneNumber: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Kitchen ID
              </label>
              <input
                type="text"
                className="block w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                placeholder="Search kitchen ID..."
                value={filters.kitchenId}
                onChange={(e) => setFilters({ ...filters, kitchenId: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Order ID
              </label>
              <input
                type="text"
                className="block w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                placeholder="Search order ID..."
                value={filters.orderId}
                onChange={(e) => setFilters({ ...filters, orderId: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                className="block w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                value={filters.status}
                onChange={(e) => setFilters({ ...filters, status: e.target.value })}
              >
                <option value="">All Status</option>
                {filterOptions.statuses.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Kitchens List */}
      <div className="bg-white shadow overflow-hidden rounded-lg">
        {isLoading ? (
          <div className="p-6 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto"></div>
            <p className="mt-2 text-sm text-neutral-500">Loading kitchens...</p>
          </div>
        ) : sortedKitchens.length === 0 ? (
          <div className="p-6 text-center">
            <p className="text-neutral-500">No kitchens found matching your criteria.</p>
            <button
              onClick={resetFilters}
              className="mt-2 text-primary-600 hover:text-primary-500"
            >
              Reset filters
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-neutral-200">
              <thead className="bg-neutral-50">
                <tr>
                  <th 
                    scope="col" 
                    className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider cursor-pointer hover:bg-neutral-100 transition-colors"
                    onClick={() => handleSort('name')}
                  >
                    <div className="flex items-center">
                      Kitchen
                      {getSortIcon('name')}
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Owner
                  </th>
                  <th 
                    scope="col" 
                    className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider cursor-pointer hover:bg-neutral-100 transition-colors"
                    onClick={() => handleSort('status')}
                  >
                    <div className="flex items-center">
                      Status
                      {getSortIcon('status')}
                    </div>
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-neutral-200">
                {sortedKitchens.map((kitchen) => (
                  <tr key={kitchen.id} className="hover:bg-neutral-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-primary-600">{kitchen.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-neutral-700">{kitchen.owner}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(kitchen.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link
                        to={`/kitchens/${kitchen.id}`}
                        className="text-neutral-600 hover:text-neutral-800 font-medium inline-flex items-center"
                      >
                        <EyeIcon className="h-5 w-5" />
                      </Link>
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

export default KitchensList;
