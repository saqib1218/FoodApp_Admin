import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  MagnifyingGlassIcon,
  FunnelIcon,
  EyeIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon
} from '@heroicons/react/24/outline';
import { kitchenService } from '../../services/kitchens/kitchenService';

const KitchensList = () => {
  const [kitchens, setKitchens] = useState([]);
  const [filteredKitchens, setFilteredKitchens] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    city: '',
    cuisine: '',
    status: ''
  });
  const [filterOptions, setFilterOptions] = useState({
    cities: [],
    cuisines: [],
    statuses: []
  });
  const [showFilters, setShowFilters] = useState(false);

  // Fetch kitchens and filter options on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        // Fetch kitchens
        const kitchensData = await kitchenService.getAllKitchens();
        setKitchens(kitchensData);
        setFilteredKitchens(kitchensData);
        
        // Fetch filter options
        const options = await kitchenService.getFilterOptions();
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
        const filtered = await kitchenService.filterKitchens({
          searchTerm,
          city: filters.city,
          cuisine: filters.cuisine,
          status: filters.status
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

  // Reset all filters
  const resetFilters = () => {
    setSearchTerm('');
    setFilters({
      city: '',
      cuisine: '',
      status: ''
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

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-3 sm:space-y-0">
        <div className="relative w-full sm:w-64 md:w-96">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MagnifyingGlassIcon className="h-5 w-5 text-neutral-400" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-neutral-300 rounded-md leading-5 bg-white placeholder-neutral-500 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
            placeholder="Search by kitchen name or owner"
          />
        </div>
        <div className="flex space-x-2 w-full sm:w-auto">
          {/* <Link
            to="/kitchens/onboarding"
            className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors text-sm font-medium"
          >
            Onboarding Queue
          </Link> */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="px-4 py-2 bg-white border border-neutral-300 text-neutral-700 rounded-md hover:bg-neutral-50 transition-colors text-sm font-medium inline-flex items-center"
          >
            <FunnelIcon className="h-4 w-4 mr-1" />
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </button>
        </div>
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="bg-white p-4 rounded-md border border-neutral-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="city-filter" className="block text-sm font-medium text-neutral-700 mb-1">
                City
              </label>
              <select
                id="city-filter"
                value={filters.city}
                onChange={(e) => setFilters({ ...filters, city: e.target.value })}
                className="block w-full pl-3 pr-10 py-2 text-base border border-neutral-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
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
              <label htmlFor="cuisine-filter" className="block text-sm font-medium text-neutral-700 mb-1">
                Cuisine
              </label>
              <select
                id="cuisine-filter"
                value={filters.cuisine}
                onChange={(e) => setFilters({ ...filters, cuisine: e.target.value })}
                className="block w-full pl-3 pr-10 py-2 text-base border border-neutral-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
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
              <label htmlFor="status-filter" className="block text-sm font-medium text-neutral-700 mb-1">
                Status
              </label>
              <select
                id="status-filter"
                value={filters.status}
                onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                className="block w-full pl-3 pr-10 py-2 text-base border border-neutral-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
              >
                <option value="">All Statuses</option>
                {filterOptions.statuses.map((status) => (
                  <option key={status} value={status}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="mt-4 flex justify-end">
            <button
              onClick={resetFilters}
              className="px-4 py-2 bg-white border border-neutral-300 text-neutral-700 rounded-md hover:bg-neutral-50 transition-colors text-sm font-medium"
            >
              Reset Filters
            </button>
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
        ) : filteredKitchens.length === 0 ? (
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
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Kitchen
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Owner
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Location
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Rating
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-neutral-200">
                {filteredKitchens.map((kitchen) => (
                  <tr key={kitchen.id} className="hover:bg-neutral-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-primary-600">{kitchen.name}</div>
                      <div className="text-sm text-neutral-500">{kitchen.cuisine}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-neutral-700">{kitchen.owner}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-neutral-700">{kitchen.city}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(kitchen.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {kitchen.status === 'active' ? (
                        <div className="text-sm text-neutral-700">
                          {kitchen.rating} ({kitchen.dishes} dishes)
                        </div>
                      ) : (
                        <div className="text-sm text-neutral-500">-</div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link
                        to={`/kitchens/${kitchen.id}`}
                        className="text-primary-600 hover:text-primary-800 font-medium"
                      >
                        View
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
