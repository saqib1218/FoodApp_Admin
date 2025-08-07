import React, { useState, useEffect, useContext } from 'react';
import { XMarkIcon, PencilIcon, EyeIcon } from '@heroicons/react/24/outline';
import { kitchenDishService } from '../../../services/kitchens/kitchenDishService';
import { useAuth } from '../../../context/useAuth';
import { KitchenContext } from './index';

const KitchenDishesTab = () => {
  const { id: kitchenId } = useContext(KitchenContext);
  const { hasPermission } = useAuth();
  
  // State variables
  const [dishes, setDishes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showDishModal, setShowDishModal] = useState(false);
  const [selectedDish, setSelectedDish] = useState(null);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [statusComment, setStatusComment] = useState('');
  const [newStatus, setNewStatus] = useState('');
  const [filters, setFilters] = useState({
    status: 'all',
    category: 'all'
  });
  const [categories, setCategories] = useState([]);

  // Fetch kitchen dishes and categories
  useEffect(() => {
    const fetchDishData = async () => {
      try {
        setIsLoading(true);
        const [dishesData, categoriesData] = await Promise.all([
          kitchenDishService.getKitchenDishes(kitchenId),
          kitchenDishService.getDishCategories()
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

  // Handle dish view
  const handleViewDish = (dish) => {
    setSelectedDish(dish);
    setShowDishModal(true);
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
      await kitchenDishService.updateDishStatus(selectedDish.id, newStatus, statusComment);
      
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

  // Filter dishes
  const filteredDishes = dishes.filter(dish => {
    return (
      (filters.status === 'all' || dish.status === filters.status) &&
      (filters.category === 'all' || dish.category === filters.category)
    );
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
      <div className="mb-6">
        <h3 className="text-lg font-medium text-neutral-900">Kitchen Dishes</h3>
        <p className="mt-1 text-sm text-neutral-500">
          Manage dishes offered by this kitchen.
        </p>
      </div>

      {/* Filters */}
      <div className="mb-6 bg-white rounded-lg border border-neutral-200 p-4">
        <div className="flex flex-wrap gap-4">
          <div className="w-full sm:w-auto">
            <label className="block text-sm font-medium text-neutral-700 mb-1">
              Status
            </label>
            <select
              name="status"
              value={filters.status}
              onChange={handleFilterChange}
              className="w-full sm:w-40 p-2 border border-neutral-300 rounded-lg text-sm"
            >
              <option value="all">All Statuses</option>
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="rejected">Rejected</option>
              <option value="draft">Draft</option>
            </select>
          </div>
          <div className="w-full sm:w-auto">
            <label className="block text-sm font-medium text-neutral-700 mb-1">
              Category
            </label>
            <select
              name="category"
              value={filters.category}
              onChange={handleFilterChange}
              className="w-full sm:w-48 p-2 border border-neutral-300 rounded-lg text-sm"
            >
              <option value="all">All Categories</option>
              {categories.map(category => (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

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
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Dish
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Last Updated
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

      {/* Dish Detail Modal */}
      {showDishModal && selectedDish && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg max-w-3xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-neutral-900">
                Dish Details
              </h3>
              <button
                onClick={() => setShowDishModal(false)}
                className="text-neutral-500 hover:text-neutral-700"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="aspect-w-4 aspect-h-3 mb-4 bg-neutral-100 rounded-lg overflow-hidden">
                  {selectedDish.image ? (
                    <img
                      src={selectedDish.image}
                      alt={selectedDish.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-neutral-200 flex items-center justify-center">
                      <span className="text-neutral-400">No Image</span>
                    </div>
                  )}
                </div>
                
                <div className="flex items-center justify-between mb-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeClass(selectedDish.status)}`}>
                    {selectedDish.status.charAt(0).toUpperCase() + selectedDish.status.slice(1)}
                  </span>
                  <span className="text-sm text-neutral-500">
                    ID: {selectedDish.id}
                  </span>
                </div>
                
                <h4 className="text-xl font-medium text-neutral-900 mb-2">{selectedDish.name}</h4>
                <p className="text-neutral-700 mb-4">{selectedDish.description}</p>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <h5 className="text-sm font-medium text-neutral-500">Price</h5>
                    <p className="text-neutral-900">{formatCurrency(selectedDish.price)}</p>
                  </div>
                  <div>
                    <h5 className="text-sm font-medium text-neutral-500">Category</h5>
                    <p className="text-neutral-900">{selectedDish.category}</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h5 className="text-sm font-medium text-neutral-500 mb-2">Ingredients</h5>
                <ul className="list-disc pl-5 mb-4 text-neutral-700">
                  {selectedDish.ingredients?.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                  )) || <li>No ingredients listed</li>}
                </ul>
                
                <h5 className="text-sm font-medium text-neutral-500 mb-2">Dietary Information</h5>
                <div className="mb-4">
                  {selectedDish.dietaryInfo?.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {selectedDish.dietaryInfo.map((info, index) => (
                        <span 
                          key={index}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-neutral-100 text-neutral-800"
                        >
                          {info}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-neutral-500">No dietary information available</p>
                  )}
                </div>
                
                <h5 className="text-sm font-medium text-neutral-500 mb-2">Additional Information</h5>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <h6 className="text-xs text-neutral-500">Preparation Time</h6>
                    <p className="text-neutral-700">{selectedDish.prepTime || 'Not specified'}</p>
                  </div>
                  <div>
                    <h6 className="text-xs text-neutral-500">Spice Level</h6>
                    <p className="text-neutral-700">{selectedDish.spiceLevel || 'Not specified'}</p>
                  </div>
                  <div>
                    <h6 className="text-xs text-neutral-500">Created On</h6>
                    <p className="text-neutral-700">
                      {new Date(selectedDish.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <h6 className="text-xs text-neutral-500">Last Updated</h6>
                    <p className="text-neutral-700">
                      {new Date(selectedDish.updatedAt || selectedDish.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                
                {hasPermission('edit_kitchen_dish') && (
                  <div className="flex justify-end space-x-3 mt-6">
                    {selectedDish.status !== 'active' && (
                      <button
                        onClick={() => {
                          setShowDishModal(false);
                          handleStatusChange(selectedDish, 'active');
                        }}
                        className="px-4 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors text-sm font-medium"
                      >
                        Approve Dish
                      </button>
                    )}
                    {selectedDish.status !== 'rejected' && (
                      <button
                        onClick={() => {
                          setShowDishModal(false);
                          handleStatusChange(selectedDish, 'rejected');
                        }}
                        className="px-4 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors text-sm font-medium"
                      >
                        Reject Dish
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

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
