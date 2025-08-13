import React, { useState, useContext } from 'react';
import { PencilIcon, EyeIcon, TrashIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { KitchenContext } from './index';
import ConfirmationModal from '../../../components/ConfirmationModal';

const KitchenDiscountsTab = () => {
  const { kitchen } = useContext(KitchenContext);
  
  // State for modals
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedDiscount, setSelectedDiscount] = useState(null);
  const [confirmationComment, setConfirmationComment] = useState('');
  
  // Mock discount data for this kitchen
  const [kitchenDiscounts, setKitchenDiscounts] = useState([
    {
      id: 1,
      name: 'Weekend Pizza Special',
      displayName: 'Weekend 20% Off',
      type: 'percentage',
      value: 20,
      status: 'active',
      approvalStatus: 'approved',
      startDate: '2024-01-15',
      endDate: '2024-02-15',
      discountOwnedBy: 'platform',
      maxDiscountAmount: 500,
      minOrderValue: 300,
      description: '20% off on weekend pizza orders',
      selectedDishes: [
        { id: 101, name: 'Margherita Pizza', price: 450 },
        { id: 102, name: 'Pepperoni Pizza', price: 550 }
      ],
      allKitchenDishes: [
        { id: 101, name: 'Margherita Pizza', price: 450 },
        { id: 102, name: 'Pepperoni Pizza', price: 550 },
        { id: 103, name: 'Veggie Supreme', price: 500 }
      ]
    },
    {
      id: 2,
      name: 'New Customer Discount',
      displayName: 'Welcome Offer',
      type: 'amount',
      value: 100,
      status: 'active',
      approvalStatus: 'pending',
      startDate: '2024-01-10',
      endDate: '2024-12-31',
      discountOwnedBy: 'kitchen',
      maxDiscountAmount: 100,
      minOrderValue: 500,
      description: 'Rs. 100 off for new customers',
      selectedDishes: [], // Empty means all dishes
      allKitchenDishes: [
        { id: 101, name: 'Margherita Pizza', price: 450 },
        { id: 102, name: 'Pepperoni Pizza', price: 550 },
        { id: 103, name: 'Veggie Supreme', price: 500 }
      ]
    },
    {
      id: 3,
      name: 'Summer Special',
      displayName: 'Summer 15% Off',
      type: 'percentage',
      value: 15,
      status: 'inactive',
      approvalStatus: 'rejected',
      startDate: '2024-06-01',
      endDate: '2024-08-31',
      discountOwnedBy: 'kitchen',
      maxDiscountAmount: 300,
      minOrderValue: 400,
      description: '15% off on summer menu items',
      selectedDishes: [
        { id: 103, name: 'Veggie Supreme', price: 500 }
      ],
      allKitchenDishes: [
        { id: 101, name: 'Margherita Pizza', price: 450 },
        { id: 102, name: 'Pepperoni Pizza', price: 550 },
        { id: 103, name: 'Veggie Supreme', price: 500 }
      ]
    }
  ]);

  // State for editing dishes
  const [editingDishes, setEditingDishes] = useState([]);

  // Handle edit discount
  const handleEditDiscount = (discount) => {
    setSelectedDiscount(discount);
    setEditingDishes(discount.selectedDishes.map(d => d.id));
    setShowEditModal(true);
  };

  // Handle view discount
  const handleViewDiscount = (discount) => {
    setSelectedDiscount(discount);
    setShowViewModal(true);
  };

  // Handle delete discount
  const handleDeleteDiscount = (discount) => {
    setSelectedDiscount(discount);
    setShowDeleteModal(true);
    setConfirmationComment('');
  };

  // Save edited dishes
  const handleSaveEditedDishes = () => {
    const updatedDiscounts = kitchenDiscounts.map(discount => {
      if (discount.id === selectedDiscount.id) {
        const newSelectedDishes = editingDishes.length > 0 
          ? discount.allKitchenDishes.filter(dish => editingDishes.includes(dish.id))
          : [];
        return {
          ...discount,
          selectedDishes: newSelectedDishes
        };
      }
      return discount;
    });
    
    setKitchenDiscounts(updatedDiscounts);
    setShowEditModal(false);
    setSelectedDiscount(null);
    setEditingDishes([]);
  };

  // Confirm delete
  const handleConfirmDelete = () => {
    if (!confirmationComment.trim()) return;
    
    setKitchenDiscounts(prev => prev.filter(d => d.id !== selectedDiscount.id));
    setShowDeleteModal(false);
    setSelectedDiscount(null);
    setConfirmationComment('');
  };

  // Toggle dish selection in edit mode
  const handleDishToggle = (dishId) => {
    setEditingDishes(prev => 
      prev.includes(dishId) 
        ? prev.filter(id => id !== dishId)
        : [...prev, dishId]
    );
  };

  // Get status badge
  const getStatusBadge = (status) => {
    return status === 'active' ? (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
        Active
      </span>
    ) : (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
        Inactive
      </span>
    );
  };

  // Get approval status badge
  const getApprovalStatusBadge = (approvalStatus) => {
    const statusConfig = {
      approved: { label: 'Approved', color: 'bg-green-100 text-green-800' },
      pending: { label: 'Pending', color: 'bg-yellow-100 text-yellow-800' },
      rejected: { label: 'Rejected', color: 'bg-red-100 text-red-800' }
    };

    const config = statusConfig[approvalStatus] || { label: approvalStatus, color: 'bg-gray-100 text-gray-800' };
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
        {config.label}
      </span>
    );
  };

  // Format discount value
  const formatDiscountValue = (discount) => {
    switch (discount.type) {
      case 'percentage':
        return `${discount.value}%`;
      case 'amount':
        return `Rs. ${discount.value}`;
      case 'bogo':
        return `Buy ${discount.value} Get ${discount.value} Free`;
      default:
        return discount.value;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-medium text-gray-900">Kitchen Discounts</h3>
          <p className="mt-1 text-sm text-gray-500">
            Manage discounts applicable to {kitchen?.name || 'this kitchen'}
          </p>
        </div>
      </div>

      {/* Discounts Table */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Discount Name
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Dishes Added
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Approval Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Discount Value
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {kitchenDiscounts.map((discount) => (
                <tr key={discount.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{discount.name}</div>
                      <div className="text-xs text-gray-500">{discount.displayName}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {discount.selectedDishes.length > 0 
                        ? `${discount.selectedDishes.length} specific dishes`
                        : 'All dishes'
                      }
                    </div>
                    {discount.selectedDishes.length > 0 && (
                      <div className="text-xs text-gray-500">
                        {discount.selectedDishes.slice(0, 2).map(dish => dish.name).join(', ')}
                        {discount.selectedDishes.length > 2 && ` +${discount.selectedDishes.length - 2} more`}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(discount.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getApprovalStatusBadge(discount.approvalStatus)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {formatDiscountValue(discount)}
                    </div>
                    {discount.maxDiscountAmount && (
                      <div className="text-xs text-gray-500">
                        Max: Rs. {discount.maxDiscountAmount}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-3">
                      <button 
                        onClick={() => handleEditDiscount(discount)}
                        className="text-blue-600 hover:text-blue-900 transition-colors" 
                        title="Edit dishes"
                      >
                        <PencilIcon className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => handleViewDiscount(discount)}
                        className="text-green-600 hover:text-green-900 transition-colors" 
                        title="View details"
                      >
                        <EyeIcon className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => handleDeleteDiscount(discount)}
                        className="text-red-600 hover:text-red-900 transition-colors" 
                        title="Delete discount"
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

        {kitchenDiscounts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500">No discounts found for this kitchen.</div>
          </div>
        )}
      </div>

      {/* Edit Dishes Modal */}
      {showEditModal && selectedDiscount && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg max-w-2xl w-full p-6 max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-medium text-neutral-900">
                Edit Dishes - {selectedDiscount.name}
              </h3>
              <button 
                onClick={() => setShowEditModal(false)} 
                className="text-gray-400 hover:text-gray-600"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>

            <div className="space-y-4">
              <p className="text-sm text-gray-600">
                Select which dishes this discount applies to. Leave all unchecked to apply to all dishes.
              </p>

              <div className="grid grid-cols-1 gap-3">
                {selectedDiscount.allKitchenDishes.map(dish => (
                  <label key={dish.id} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                    <input
                      type="checkbox"
                      checked={editingDishes.includes(dish.id)}
                      onChange={() => handleDishToggle(dish.id)}
                      className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    />
                    <div className="flex-1">
                      <div className="text-sm font-medium text-gray-900">{dish.name}</div>
                      <div className="text-xs text-gray-500">Rs. {dish.price}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6 pt-4 border-t border-gray-200">
              <button
                onClick={() => setShowEditModal(false)}
                className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors text-sm font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEditedDishes}
                className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors text-sm font-medium"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Details Modal */}
      {showViewModal && selectedDiscount && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg max-w-3xl w-full p-6 max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-medium text-neutral-900">
                Discount Details - {selectedDiscount.name}
              </h3>
              <button 
                onClick={() => setShowViewModal(false)} 
                className="text-gray-400 hover:text-gray-600"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900">Basic Information</h4>
                <div className="space-y-3">
                  <div>
                    <label className="text-xs font-medium text-gray-500">Discount Name</label>
                    <div className="text-sm text-gray-900">{selectedDiscount.name}</div>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-500">Display Name</label>
                    <div className="text-sm text-gray-900">{selectedDiscount.displayName}</div>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-500">Status</label>
                    <div className="mt-1">{getStatusBadge(selectedDiscount.status)}</div>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-500">Approval Status</label>
                    <div className="mt-1">{getApprovalStatusBadge(selectedDiscount.approvalStatus)}</div>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-500">Owned By</label>
                    <div className="text-sm text-gray-900 capitalize">{selectedDiscount.discountOwnedBy}</div>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-500">Description</label>
                    <div className="text-sm text-gray-900">{selectedDiscount.description}</div>
                  </div>
                </div>
              </div>

              {/* Discount Details */}
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900">Discount Details</h4>
                <div className="space-y-3">
                  <div>
                    <label className="text-xs font-medium text-gray-500">Discount Value</label>
                    <div className="text-sm text-gray-900">{formatDiscountValue(selectedDiscount)}</div>
                  </div>
                  {selectedDiscount.maxDiscountAmount && (
                    <div>
                      <label className="text-xs font-medium text-gray-500">Max Discount Amount</label>
                      <div className="text-sm text-gray-900">Rs. {selectedDiscount.maxDiscountAmount}</div>
                    </div>
                  )}
                  <div>
                    <label className="text-xs font-medium text-gray-500">Min Order Value</label>
                    <div className="text-sm text-gray-900">Rs. {selectedDiscount.minOrderValue}</div>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-500">Valid Period</label>
                    <div className="text-sm text-gray-900">
                      {new Date(selectedDiscount.startDate).toLocaleDateString()} - {new Date(selectedDiscount.endDate).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Applicable Dishes */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h4 className="font-medium text-gray-900 mb-4">Applicable Dishes</h4>
              {selectedDiscount.selectedDishes.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {selectedDiscount.selectedDishes.map(dish => (
                    <div key={dish.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{dish.name}</div>
                        <div className="text-xs text-gray-500">Rs. {dish.price}</div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-sm text-gray-600 bg-blue-50 p-3 rounded-lg">
                  This discount applies to all dishes in the kitchen.
                </div>
              )}
            </div>

            <div className="flex justify-end mt-6 pt-4 border-t border-gray-200">
              <button
                onClick={() => setShowViewModal(false)}
                className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors text-sm font-medium"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedDiscount && (
        <ConfirmationModal
          isOpen={showDeleteModal}
          title="Delete Discount"
          message={`Are you sure you want to permanently delete your Kitchen from "${selectedDiscount.name}" discount? This action cannot be undone.`}
          confirmText="Delete"
          cancelText="Cancel"
          onConfirm={handleConfirmDelete}
          onCancel={() => {
            setShowDeleteModal(false);
            setSelectedDiscount(null);
            setConfirmationComment('');
          }}
          comment={confirmationComment}
          onCommentChange={setConfirmationComment}
          variant="danger"
        />
      )}
    </div>
  );
};

export default KitchenDiscountsTab;
