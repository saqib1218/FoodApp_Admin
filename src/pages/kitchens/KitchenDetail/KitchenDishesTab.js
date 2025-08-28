import React, { useState, useEffect, useContext } from 'react';
import { XMarkIcon, PencilIcon, EyeIcon, PlusIcon, MagnifyingGlassIcon, FunnelIcon, ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import { useParams, useNavigate } from 'react-router-dom';
// TODO: Replace with RTK Query hooks when migrating API calls
import { mockKitchenDishService } from '../../../utils/mockServiceHelpers';
import { useAuth } from '../../../hooks/useAuth';
import { KitchenContext } from './index';
import { PermissionButton } from '../../../components/PermissionGate';


const KitchenDishesTab = () => {
  const { id: kitchenId } = useContext(KitchenContext);
  const { hasPermission } = useAuth();
  const navigate = useNavigate();
  
  // State variables
  const [dishes, setDishes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDish, setSelectedDish] = useState(null);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [statusComment, setStatusComment] = useState('');
  const [newStatus, setNewStatus] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [sortField, setSortField] = useState('');
  const [sortDirection, setSortDirection] = useState('asc');

  const [filters, setFilters] = useState({
    status: 'all',
    category: 'all',
    dishType: 'all',
    lastUpdated: 'all'
  });
  const [categories, setCategories] = useState([]);


  // Fetch kitchen dishes and categories
  useEffect(() => {
    const fetchDishData = async () => {
      try {
        setIsLoading(true);
        const [dishesData, categoriesData] = await Promise.all([
          mockKitchenDishService.getKitchenDishes(kitchenId),
          mockKitchenDishService.getDishCategories()
        ]);
        setDishes(dishesData);
        setCategories(categoriesData);
      } catch (err) {
        console.error('Failed to load kitchen dishes:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDishData();
  }, [kitchenId]);

  // Handle dish view - navigate to detail page
  const handleViewDish = (dish) => {
    navigate(`/kitchens/${kitchenId}/dishes/${dish.id}`);
  };
  const handleAddDish = () => {
    navigate(`/kitchens/${kitchenId}/AddEditDish`);
  };
  // Handle status change
  const handleStatusChange = (dish, status) => {
    setSelectedDish(dish);
    setNewStatus(status);
    setStatusComment('');
    setShowStatusModal(true);
  };

  // Confirm status change
  const confirmStatusChange = async () => {
    if (!selectedDish || !newStatus) return;

    try {
      setIsLoading(true);
      await mockKitchenDishService.updateDishStatus(selectedDish.id, newStatus, statusComment);
      
      // Update local state
      setDishes(dishes.map(dish => 
        dish.id === selectedDish.id 
          ? { ...dish, status: newStatus, lastStatusChange: new Date().toISOString() } 
          : dish
      ));
      
      setShowStatusModal(false);
    } catch (err) {
      console.error('Failed to update dish status:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle filter change
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  // Handle sorting
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Get sort icon
  const getSortIcon = (field) => {
    if (sortField !== field) return null;
    return sortDirection === 'asc' ? 
      <ChevronUpIcon className="h-4 w-4 inline ml-1" /> : 
      <ChevronDownIcon className="h-4 w-4 inline ml-1" />;
  };

  // Filter and sort dishes
  const filteredDishes = dishes.filter(dish => {
    const matchesSearch = dish.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filters.status === 'all' || dish.status === filters.status;
    const matchesCategory = filters.category === 'all' || dish.category === filters.category;
    const matchesDishType = filters.dishType === 'all' || dish.dishType === filters.dishType;
    
    let matchesLastUpdated = true;
    if (filters.lastUpdated !== 'all') {
      const dishDate = new Date(dish.lastStatusChange || dish.updatedAt || dish.createdAt);
      const now = new Date();
      const daysDiff = Math.floor((now - dishDate) / (1000 * 60 * 60 * 24));
      
      switch (filters.lastUpdated) {
        case 'today':
          matchesLastUpdated = daysDiff === 0;
          break;
        case 'week':
          matchesLastUpdated = daysDiff <= 7;
          break;
        case 'month':
          matchesLastUpdated = daysDiff <= 30;
          break;
        default:
          matchesLastUpdated = true;
      }
    }
    
    return matchesSearch && matchesStatus && matchesCategory && matchesDishType && matchesLastUpdated;
  }).sort((a, b) => {
    if (!sortField) return 0;
    
    let aValue = a[sortField];
    let bValue = b[sortField];
    
    // Handle specific field mappings
    if (sortField === 'name') {
      aValue = a.name;
      bValue = b.name;
    } else if (sortField === 'dishType') {
      aValue = a.dishType || '';
      bValue = b.dishType || '';
    } else if (sortField === 'lastUpdated') {
      aValue = new Date(a.lastStatusChange || a.updatedAt || a.createdAt);
      bValue = new Date(b.lastStatusChange || b.updatedAt || b.createdAt);
    }
    
    // Handle different data types
    if (aValue instanceof Date && bValue instanceof Date) {
      return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
    } else if (typeof aValue === 'string' && typeof bValue === 'string') {
      aValue = aValue.toLowerCase();
      bValue = bValue.toLowerCase();
    }
    
    if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-PK', {
      style: 'currency',
      currency: 'PKR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  // Get status badge class
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'draft':
        return 'bg-neutral-100 text-neutral-800';
      default:
        return 'bg-neutral-100 text-neutral-800';
    }
  };

  if (isLoading && dishes.length === 0) {
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
        <h3 className="text-lg font-medium text-neutral-900">Kitchen Dishes</h3>
        <p className="mt-1 text-sm text-neutral-500">
          Manage dishes offered by this kitchen.
        </p>
        </div>
      
        <PermissionButton
          permission="edit_kitchen"
          onClick={handleAddDish}
          className="px-4 py-2 bg-primary-600 text-white rounded-full hover:bg-primary-700 transition-colors text-sm font-medium flex items-center"
        >
          <PlusIcon className="h-4 w-4 mr-1" />
          Add Dish
        </PermissionButton>
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
              placeholder="Search by dish name..."
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
                Status
              </label>
              <select
                className="block w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                value={filters.status}
                onChange={(e) => setFilters({ ...filters, status: e.target.value })}
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="pending">Pending</option>
                <option value="rejected">Rejected</option>
                <option value="draft">Draft</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                className="block w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                value={filters.category}
                onChange={(e) => setFilters({ ...filters, category: e.target.value })}
              >
                <option value="all">All Categories</option>
                {categories.map(category => (
                  <option key={category.id} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Dish Type
              </label>
              <select
                className="block w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                value={filters.dishType}
                onChange={(e) => setFilters({ ...filters, dishType: e.target.value })}
              >
                <option value="all">All Types</option>
                <option value="vegetarian">Vegetarian</option>
                <option value="non-vegetarian">Non-Vegetarian</option>
                <option value="vegan">Vegan</option>
                <option value="gluten-free">Gluten-Free</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Last Updated
              </label>
              <select
                className="block w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                value={filters.lastUpdated}
                onChange={(e) => setFilters({ ...filters, lastUpdated: e.target.value })}
              >
                <option value="all">All Time</option>
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
              </select>
            </div>
          </div>
        </div>
      )}
      {/* Dish Add Modal */}
     
      {/* Dishes List */}
      <div className="bg-white rounded-lg border border-neutral-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-neutral-200">
          <h4 className="text-base font-medium text-neutral-900">Dishes ({filteredDishes.length})</h4>
        </div>
        
        {filteredDishes.length === 0 ? (
          <div className="text-center py-12 bg-neutral-50">
            <p className="text-neutral-500">No dishes found matching the selected filters.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-neutral-200">
              <thead className="bg-neutral-50">
                <tr>
                  <th 
                    scope="col" 
                    className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider cursor-pointer hover:bg-neutral-100 select-none"
                    onClick={() => handleSort('name')}
                  >
                    Dish {getSortIcon('name')}
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th 
                    scope="col" 
                    className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider cursor-pointer hover:bg-neutral-100 select-none"
                    onClick={() => handleSort('status')}
                  >
                    Status {getSortIcon('status')}
                  </th>
                  <th 
                    scope="col" 
                    className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider cursor-pointer hover:bg-neutral-100 select-none"
                    onClick={() => handleSort('lastUpdated')}
                  >
                    Last Updated {getSortIcon('lastUpdated')}
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-neutral-200">
                {filteredDishes.map((dish) => (
                  <tr key={dish.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-md overflow-hidden bg-neutral-100 flex-shrink-0">
                          {dish.image ? (
                            <img
                              src={dish.image}
                              alt={dish.name}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <div className="h-full w-full bg-neutral-200"></div>
                          )}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-neutral-900">{dish.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-neutral-700">{dish.category}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-neutral-700">{formatCurrency(dish.price)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeClass(dish.status)}`}>
                        {dish.status.charAt(0).toUpperCase() + dish.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-neutral-500">
                        {new Date(dish.lastStatusChange || dish.createdAt).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => handleViewDish(dish)}
                          className="p-1 text-neutral-500 hover:text-neutral-700 hover:bg-neutral-100 rounded"
                        >
                          <EyeIcon className="h-5 w-5" />
                        </button>
                        
                        {hasPermission('edit_kitchen_dish') && (
                          <button
                            onClick={() => {/* Edit dish functionality */}}
                            className="p-1 text-neutral-500 hover:text-neutral-700 hover:bg-neutral-100 rounded"
                          >
                            <PencilIcon className="h-5 w-5" />
                          </button>
                        )}
                        
                        {hasPermission('edit_kitchen_dish') && dish.status !== 'active' && (
                          <button
                            onClick={() => handleStatusChange(dish, 'active')}
                            className="p-1 text-green-600 hover:text-green-800 hover:bg-green-50 rounded"
                          >
                            Approve
                          </button>
                        )}
                        
                        {hasPermission('edit_kitchen_dish') && dish.status !== 'rejected' && (
                          <button
                            onClick={() => handleStatusChange(dish, 'rejected')}
                            className="p-1 text-red-600 hover:text-red-800 hover:bg-red-50 rounded"
                          >
                            Reject
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>



      {/* Status Change Modal */}
      {showStatusModal && selectedDish && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-neutral-900">
                {newStatus === 'active' ? 'Approve Dish' : 'Reject Dish'}
              </h3>
              <button
                onClick={() => setShowStatusModal(false)}
                className="text-neutral-500 hover:text-neutral-700"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>
            
            <div className="mb-4">
              <p className="text-sm text-neutral-700">
                {newStatus === 'active'
                  ? `Are you sure you want to approve "${selectedDish.name}"?`
                  : `Are you sure you want to reject "${selectedDish.name}"?`}
              </p>
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Comment (optional)
              </label>
              <textarea
                value={statusComment}
                onChange={(e) => setStatusComment(e.target.value)}
                rows={3}
                className="w-full p-2 border border-neutral-300 rounded-lg text-sm"
                placeholder="Add a comment about this decision..."
              />
            </div>
            
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowStatusModal(false)}
                className="px-4 py-2 bg-white border border-neutral-300 text-neutral-700 rounded-full hover:bg-neutral-50 transition-colors text-sm font-medium"
              >
                Cancel
              </button>
              <button
                onClick={confirmStatusChange}
                className={`px-4 py-2 text-white rounded-full transition-colors text-sm font-medium ${
                  newStatus === 'active'
                    ? 'bg-green-600 hover:bg-green-700'
                    : 'bg-red-600 hover:bg-red-700'
                }`}
              >
                {newStatus === 'active' ? 'Approve' : 'Reject'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default KitchenDishesTab;
