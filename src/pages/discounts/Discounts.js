import React, { useState, useEffect } from 'react';
import { PlusIcon, PencilIcon, EyeIcon, XMarkIcon, TrashIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import ConfirmationModal from '../../components/ConfirmationModal';

const Discounts = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [discounts, setDiscounts] = useState([
    {
      id: 1,
      name: 'Weekend Special',
      type: 'percentage',
      value: 20,
      status: 'active',
      startDate: '2024-01-15',
      endDate: '2024-02-15',
      promoCode: 'WEEKEND20',
      minOrderAmount: 500,
      description: '20% off on weekend orders'
    },
    {
      id: 2,
      name: 'Buy 1 Get 1 Pizza',
      type: 'bogo',
      value: 1,
      status: 'active',
      startDate: '2024-01-10',
      endDate: '2024-01-31',
      promoCode: 'BOGO1',
      minOrderAmount: 0,
      description: 'Buy 1 pizza get 1 free'
    },
    {
      id: 3,
      name: 'New Year Offer',
      type: 'amount',
      value: 100,
      status: 'inactive',
      startDate: '2024-01-01',
      endDate: '2024-01-07',
      promoCode: 'NEWYEAR100',
      minOrderAmount: 1000,
      description: 'Rs. 100 off on orders above Rs. 1000'
    }
  ]);

  // Modal states
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [confirmationAction, setConfirmationAction] = useState('');
  const [pendingAction, setPendingAction] = useState(null);
  const [confirmationComment, setConfirmationComment] = useState('');
  const [currentTab, setCurrentTab] = useState(0);
  
  // Kitchen-Dish Selection States
  const [showKitchenModal, setShowKitchenModal] = useState(false);
  const [kitchenSearchTerm, setKitchenSearchTerm] = useState('');
  const [selectedKitchenDishes, setSelectedKitchenDishes] = useState({});

  // Enhanced form state for multi-tab promotion creation
  const [promotionForm, setPromotionForm] = useState({
    // Section A: Basic Details
    promotionName: '',
    displayName: '',
    description: '',
    promotionType: 'discount',
    discountValueUnit: 'percentage',
    discountValue: '',
    maxDiscountAmount: '',
    discountOwnedBy: 'platform',
    startDate: '',
    endDate: '',
    status: 'draft',
    stackable: false,
    
    // Section B: Eligibility Rules
    minOrderValue: '',
    minItemsInOrder: '',
    eligibleKitchens: [],
    eligibleChefs: [],
    eligibleDishes: [],
    customerType: 'all',
    orderTimeWindow: {
      days: [],
      startTime: '',
      endTime: ''
    },
    deliveryZones: [],
    
    // Section C: Type-Specific Settings
    promoCode: {
      code: '',
      caseSensitive: false,
      usageLimit: '',
      perUserLimit: ''
    },
    referral: {
      inviterReward: '',
      inviteeReward: ''
    },
    loyalty: {
      pointsRequired: '',
      pointsEarned: ''
    },
    cashback: {
      percentage: '',
      maxAmount: ''
    },
    freeItem: {
      itemId: '',
      itemName: ''
    }
  });

  // Handle create promotion
  const handleCreatePromotion = () => {
    setCurrentTab(0);
    setShowCreateModal(true);
  };

  const handleSavePromotion = () => {
    if (promotionForm.promotionName.trim() && promotionForm.discountValue && promotionForm.startDate && promotionForm.endDate) {
      const newPromotion = {
        id: Date.now(),
        name: promotionForm.promotionName,
        displayName: promotionForm.displayName,
        type: promotionForm.discountValueUnit,
        value: parseFloat(promotionForm.discountValue),
        status: promotionForm.status,
        startDate: promotionForm.startDate,
        endDate: promotionForm.endDate,
        promoCode: promotionForm.promoCode.code,
        minOrderAmount: parseFloat(promotionForm.minOrderValue) || 0,
        description: promotionForm.description,
        promotionData: promotionForm // Store full promotion data
      };
      setDiscounts(prev => [...prev, newPromotion]);
      setShowCreateModal(false);
      setCurrentTab(0);
    }
  };

  const handleCancelPromotion = () => {
    setShowCreateModal(false);
    setCurrentTab(0);
  };

  // Tab navigation
  const handleNextTab = () => {
    if (currentTab < 2) {
      setCurrentTab(currentTab + 1);
    }
  };

  const handlePrevTab = () => {
    if (currentTab > 0) {
      setCurrentTab(currentTab - 1);
    }
  };

  // Enhanced mock data for scalable selection
  const mockKitchens = [
    { 
      id: 1, 
      name: 'Pizza Palace', 
      location: 'Downtown',
      dishes: [
        { id: 101, name: 'Margherita Pizza', price: 450 },
        { id: 102, name: 'Pepperoni Pizza', price: 550 },
        { id: 103, name: 'Veggie Supreme', price: 500 }
      ]
    },
    { 
      id: 2, 
      name: 'Burger House', 
      location: 'Uptown',
      dishes: [
        { id: 201, name: 'Classic Burger', price: 350 },
        { id: 202, name: 'Chicken Burger', price: 400 },
        { id: 203, name: 'Veggie Burger', price: 320 }
      ]
    },
    { 
      id: 3, 
      name: 'Sushi Master', 
      location: 'Mall Road',
      dishes: [
        { id: 301, name: 'California Roll', price: 600 },
        { id: 302, name: 'Salmon Nigiri', price: 800 },
        { id: 303, name: 'Tuna Sashimi', price: 900 }
      ]
    },
    // Add more mock kitchens to simulate scale
    { 
      id: 4, 
      name: 'Spice Garden', 
      location: 'City Center',
      dishes: [
        { id: 401, name: 'Chicken Biryani', price: 380 },
        { id: 402, name: 'Mutton Karahi', price: 650 },
        { id: 403, name: 'Dal Makhani', price: 280 }
      ]
    },
    { 
      id: 5, 
      name: 'Pasta Corner', 
      location: 'Food Street',
      dishes: [
        { id: 501, name: 'Chicken Alfredo', price: 420 },
        { id: 502, name: 'Beef Bolognese', price: 480 },
        { id: 503, name: 'Veggie Pasta', price: 350 }
      ]
    }
  ];

  const mockChefs = [
    { id: 1, name: 'Chef Mario' },
    { id: 2, name: 'Chef Sarah' },
    { id: 3, name: 'Chef Ahmed' }
  ];

  const mockDishes = [
    { id: 1, name: 'Margherita Pizza' },
    { id: 2, name: 'Chicken Burger' },
    { id: 3, name: 'California Roll' }
  ];

  const mockZones = [
    { id: 1, name: 'Downtown' },
    { id: 2, name: 'Uptown' },
    { id: 3, name: 'Suburbs' }
  ];

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  // Kitchen-Dish Selection Helper Functions
  const filteredKitchens = mockKitchens.filter(kitchen =>
    kitchen.name.toLowerCase().includes(kitchenSearchTerm.toLowerCase()) ||
    kitchen.location.toLowerCase().includes(kitchenSearchTerm.toLowerCase())
  );

  const handleKitchenToggle = (kitchenId) => {
    const isSelected = promotionForm.eligibleKitchens.includes(kitchenId);
    if (isSelected) {
      // Remove kitchen and its dishes
      setPromotionForm({
        ...promotionForm,
        eligibleKitchens: promotionForm.eligibleKitchens.filter(id => id !== kitchenId)
      });
      const newSelectedDishes = { ...selectedKitchenDishes };
      delete newSelectedDishes[kitchenId];
      setSelectedKitchenDishes(newSelectedDishes);
    } else {
      // Add kitchen
      setPromotionForm({
        ...promotionForm,
        eligibleKitchens: [...promotionForm.eligibleKitchens, kitchenId]
      });
    }
  };

  const handleDishToggle = (kitchenId, dishId) => {
    const currentDishes = selectedKitchenDishes[kitchenId] || [];
    const isDishSelected = currentDishes.includes(dishId);
    
    if (isDishSelected) {
      setSelectedKitchenDishes({
        ...selectedKitchenDishes,
        [kitchenId]: currentDishes.filter(id => id !== dishId)
      });
    } else {
      setSelectedKitchenDishes({
        ...selectedKitchenDishes,
        [kitchenId]: [...currentDishes, dishId]
      });
    }
  };

  const handleSelectAllKitchens = () => {
    const allKitchenIds = filteredKitchens.map(k => k.id);
    setPromotionForm({
      ...promotionForm,
      eligibleKitchens: [...new Set([...promotionForm.eligibleKitchens, ...allKitchenIds])]
    });
  };

  const handleDeselectAllKitchens = () => {
    setPromotionForm({
      ...promotionForm,
      eligibleKitchens: []
    });
    setSelectedKitchenDishes({});
  };

  const handleSelectAllDishesForKitchen = (kitchenId) => {
    const kitchen = mockKitchens.find(k => k.id === kitchenId);
    if (kitchen) {
      const allDishIds = kitchen.dishes.map(d => d.id);
      setSelectedKitchenDishes({
        ...selectedKitchenDishes,
        [kitchenId]: allDishIds
      });
    }
  };

  // Handle delete discount
  const handleDeleteDiscount = (discountId) => {
    const discount = discounts.find(d => d.id === discountId);
    setConfirmationAction('delete');
    setPendingAction({ discountId, discountName: discount.name });
    setShowConfirmationModal(true);
    setConfirmationComment('');
  };

  const handleConfirmAction = () => {
    if (!confirmationComment.trim()) return;

    if (confirmationAction === 'delete') {
      setDiscounts(prev => prev.filter(d => d.id !== pendingAction.discountId));
    }

    setShowConfirmationModal(false);
    setConfirmationAction('');
    setPendingAction(null);
    setConfirmationComment('');
  };

  const handleCancelConfirmation = () => {
    setShowConfirmationModal(false);
    setConfirmationAction('');
    setPendingAction(null);
    setConfirmationComment('');
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

  // Get discount type badge
  const getTypeBadge = (type) => {
    const typeConfig = {
      percentage: { label: 'Percentage', color: 'bg-blue-100 text-blue-800' },
      amount: { label: 'Amount', color: 'bg-green-100 text-green-800' },
      bogo: { label: 'BOGO', color: 'bg-purple-100 text-purple-800' },
      promo: { label: 'Promo Code', color: 'bg-yellow-100 text-yellow-800' },
      minOrder: { label: 'Min Order', color: 'bg-indigo-100 text-indigo-800' }
    };

    const config = typeConfig[type] || { label: type, color: 'bg-gray-100 text-gray-800' };
    
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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Discount Management</h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage discounts, offers, and promotional codes
        </p>
      </div>

      {/* Create Promotion Button */}
      <div className="mb-6 flex justify-end">
        <button
          onClick={handleCreatePromotion}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
        >
          <PlusIcon className="-ml-1 mr-2 h-4 w-4" />
          Create Promotion
        </button>
      </div>

      {/* Discounts Table */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name & Type
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Value
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Duration
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {discounts.map((discount) => (
                <tr key={discount.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{discount.name}</div>
                      <div className="mt-1">{getTypeBadge(discount.type)}</div>
                      {discount.promoCode && (
                        <div className="text-xs text-gray-500 mt-1">Code: {discount.promoCode}</div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{formatDiscountValue(discount)}</div>
                    {discount.minOrderAmount > 0 && (
                      <div className="text-xs text-gray-500">Min: Rs. {discount.minOrderAmount}</div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(discount.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {new Date(discount.startDate).toLocaleDateString()}
                    </div>
                    <div className="text-xs text-gray-500">
                      to {new Date(discount.endDate).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-3">
                      <button className="text-blue-600 hover:text-blue-900 transition-colors" title="Edit discount">
                        <PencilIcon className="h-4 w-4" />
                      </button>
                      <button className="text-green-600 hover:text-green-900 transition-colors" title="View usage">
                        <EyeIcon className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => handleDeleteDiscount(discount.id)}
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
      </div>

      {/* Create Promotion Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg max-w-4xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-medium text-neutral-900">Create Promotion</h3>
              <button onClick={handleCancelPromotion} className="text-gray-400 hover:text-gray-600">
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>

            {/* Tab Navigation */}
            <div className="flex space-x-1 mb-6 bg-gray-100 p-1 rounded-lg">
              <button
                onClick={() => setCurrentTab(0)}
                className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-colors ${
                  currentTab === 0
                    ? 'bg-white text-primary-600 shadow-sm'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Basic Details
              </button>
              <button
                onClick={() => setCurrentTab(1)}
                className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-colors ${
                  currentTab === 1
                    ? 'bg-white text-primary-600 shadow-sm'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Eligibility Rules
              </button>
              <button
                onClick={() => setCurrentTab(2)}
                className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-colors ${
                  currentTab === 2
                    ? 'bg-white text-primary-600 shadow-sm'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Type-Specific Settings
              </button>
            </div>

            {/* Tab Content */}
            <div className="min-h-[400px]">
              {/* Section A: Basic Details */}
              {currentTab === 0 && (
                <div className="space-y-6">
                  <h4 className="text-md font-medium text-gray-900 mb-4">Basic Details</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Promotion Name *
                      </label>
                      <input
                        type="text"
                        value={promotionForm.promotionName}
                        onChange={(e) => setPromotionForm({ ...promotionForm, promotionName: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        placeholder="Enter promotion name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Dsiplay Name *
                      </label>
                      <input
                        type="text"
                        value={promotionForm.displayName}
                        onChange={(e) => setPromotionForm({ ...promotionForm, displayName: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        placeholder="Enter display name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Promotion Type
                      </label>
                      <select
                        value={promotionForm.promotionType}
                        onChange={(e) => setPromotionForm({ ...promotionForm, promotionType: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      >
                        <option value="discount">Discount</option>
                        <option value="cashback">Cashback</option>
                        <option value="freeItem">Free Item</option>
                        <option value="referral">Referral</option>
                        <option value="loyalty">Loyalty Reward</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Discount Value Unit
                      </label>
                      <select
                        value={promotionForm.discountValueUnit}
                        onChange={(e) => setPromotionForm({ ...promotionForm, discountValueUnit: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      >
                        <option value="percentage">Percentage</option>
                        <option value="amount">Fixed Amount</option>
                        <option value="bogo">Buy X Get Y</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Discount Value *
                      </label>
                      <input
                        type="number"
                        value={promotionForm.discountValue}
                        onChange={(e) => setPromotionForm({ ...promotionForm, discountValue: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        placeholder={promotionForm.discountType === 'percentage' ? '20' : '100'}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Max Discount Amount (Optional)
                      </label>
                      <input
                        type="number"
                        value={promotionForm.maxDiscountAmount}
                        onChange={(e) => setPromotionForm({ ...promotionForm, maxDiscountAmount: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        placeholder="500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Discount Owned By
                      </label>
                      <select
                        value={promotionForm.discountOwnedBy}
                        onChange={(e) => setPromotionForm({ ...promotionForm, discountOwnedBy: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      >
                        <option value="platform">Platform</option>
                        <option value="kitchen">Kitchen</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Status
                      </label>
                      <select
                        value={promotionForm.status}
                        onChange={(e) => setPromotionForm({ ...promotionForm, status: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      >
                        <option value="draft">Draft</option>
                        <option value="scheduled">Scheduled</option>
                        <option value="active">Active</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Start Date *
                      </label>
                      <input
                        type="date"
                        value={promotionForm.startDate}
                        onChange={(e) => setPromotionForm({ ...promotionForm, startDate: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        End Date *
                      </label>
                      <input
                        type="date"
                        value={promotionForm.endDate}
                        onChange={(e) => setPromotionForm({ ...promotionForm, endDate: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={promotionForm.stackable}
                        onChange={(e) => setPromotionForm({ ...promotionForm, stackable: e.target.checked })}
                        className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">Stackable with other promotions</span>
                    </label>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <textarea
                      rows={3}
                      value={promotionForm.description}
                      onChange={(e) => setPromotionForm({ ...promotionForm, description: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      placeholder="Enter promotion description"
                    />
                  </div>
                </div>
              )}

              {/* Section B: Eligibility Rules */}
              {currentTab === 1 && (
                <div className="space-y-6">
                  <h4 className="text-md font-medium text-gray-900 mb-4">Eligibility Rules</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Min Order Value
                      </label>
                      <input
                        type="number"
                        value={promotionForm.minOrderValue}
                        onChange={(e) => setPromotionForm({ ...promotionForm, minOrderValue: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        placeholder="500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Min Items in Order
                      </label>
                      <input
                        type="number"
                        value={promotionForm.minItemsInOrder}
                        onChange={(e) => setPromotionForm({ ...promotionForm, minItemsInOrder: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        placeholder="2"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Customer Type
                      </label>
                      <select
                        value={promotionForm.customerType}
                        onChange={(e) => setPromotionForm({ ...promotionForm, customerType: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      >
                        <option value="all">All Customers</option>
                        <option value="new">New Customers</option>
                        <option value="existing">Existing Customers</option>
                      </select>
                    </div>
                  </div>

                  {/* Eligible Kitchens & Dishes */}
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Eligible Kitchens & Dishes
                    </label>
                    
                    <div className="border border-gray-300 rounded-md p-4 bg-gray-50">
                      <div className="flex justify-between items-center mb-3">
                        <div className="text-sm text-gray-600">
                          {promotionForm.eligibleKitchens.length} kitchen(s) selected
                        </div>
                        <button
                          type="button"
                          onClick={() => setShowKitchenModal(true)}
                          className="px-3 py-1.5 bg-primary-600 text-white text-sm rounded-md hover:bg-primary-700 transition-colors"
                        >
                          Select Kitchens & Dishes
                        </button>
                      </div>
                      
                      {/* Selected Kitchens Summary */}
                      {promotionForm.eligibleKitchens.length > 0 && (
                        <div className="space-y-2">
                          {promotionForm.eligibleKitchens.slice(0, 3).map(kitchenId => {
                            const kitchen = mockKitchens.find(k => k.id === kitchenId);
                            const selectedDishes = selectedKitchenDishes[kitchenId] || [];
                            return kitchen ? (
                              <div key={kitchenId} className="flex items-center justify-between bg-white p-2 rounded border">
                                <div>
                                  <div className="font-medium text-sm">{kitchen.name}</div>
                                  <div className="text-xs text-gray-500">
                                    {selectedDishes.length > 0 
                                      ? `${selectedDishes.length} specific dish(es) selected`
                                      : 'All dishes included'
                                    }
                                  </div>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => handleKitchenToggle(kitchenId)}
                                  className="text-red-600 hover:text-red-800 text-xs"
                                >
                                  Remove
                                </button>
                              </div>
                            ) : null;
                          })}
                          {promotionForm.eligibleKitchens.length > 3 && (
                            <div className="text-xs text-gray-500 text-center">
                              ... and {promotionForm.eligibleKitchens.length - 3} more kitchens
                            </div>
                          )}
                        </div>
                      )}
                      
                      {promotionForm.eligibleKitchens.length === 0 && (
                        <div className="text-sm text-gray-500 text-center py-4">
                          No kitchens selected. Click "Select Kitchens & Dishes" to add.
                        </div>
                      )}
                    </div>
                  </div>

                  {/* OR Divider */}
                  <div className="col-span-2 flex items-center justify-center my-4">
                    <div className="flex-grow border-t border-gray-300"></div>
                    <div className="mx-4 text-sm text-gray-500 font-medium">OR</div>
                    <div className="flex-grow border-t border-gray-300"></div>
                  </div>

                  {/* Select All Kitchens Option */}
                  <div className="col-span-2">
                    <div className="border border-gray-300 rounded-md p-4 bg-blue-50 border-blue-200">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-sm text-gray-900">Apply to All Kitchens</div>
                          <div className="text-xs text-gray-600 mt-1">
                            Select this option to apply the discount to all {mockKitchens.length} kitchens and their dishes
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            const allKitchenIds = mockKitchens.map(k => k.id);
                            setPromotionForm({
                              ...promotionForm,
                              eligibleKitchens: allKitchenIds
                            });
                            // Clear specific dish selections when selecting all
                            setSelectedKitchenDishes({});
                          }}
                          className="px-4 py-2 bg-primary-600 text-white text-sm rounded-md hover:bg-primary-700 transition-colors font-medium"
                        >
                          Select All {mockKitchens.length} Kitchens
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Section C: Type-Specific Settings */}
              {currentTab === 2 && (
                <div className="space-y-6">
                  <h4 className="text-md font-medium text-gray-900 mb-4">Type-Specific Settings</h4>
                  
                  {/* Promo Code Settings */}
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h5 className="text-sm font-medium text-gray-900 mb-3">Promo Code Settings</h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Promo Code
                        </label>
                        <input
                          type="text"
                          value={promotionForm.promoCode.code}
                          onChange={(e) => setPromotionForm({
                            ...promotionForm,
                            promoCode: { ...promotionForm.promoCode, code: e.target.value.toUpperCase() }
                          })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                          placeholder="SAVE20"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Usage Limit
                        </label>
                        <input
                          type="number"
                          value={promotionForm.promoCode.usageLimit}
                          onChange={(e) => setPromotionForm({
                            ...promotionForm,
                            promoCode: { ...promotionForm.promoCode, usageLimit: e.target.value }
                          })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                          placeholder="100"
                        />
                      </div>
                    </div>
                    <div className="mt-3">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={promotionForm.promoCode.caseSensitive}
                          onChange={(e) => setPromotionForm({
                            ...promotionForm,
                            promoCode: { ...promotionForm.promoCode, caseSensitive: e.target.checked }
                          })}
                          className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">Case Sensitive</span>
                      </label>
                    </div>
                  </div>

                  {/* Referral Settings */}
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h5 className="text-sm font-medium text-gray-900 mb-3">Referral Settings</h5>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Inviter Discount ID
                      </label>
                      <input
                        type="number"
                        value={promotionForm.referral.inviterReward}
                        onChange={(e) => setPromotionForm({
                          ...promotionForm,
                          referral: { ...promotionForm.referral, inviterReward: e.target.value }
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        placeholder="50"
                      />
                    </div>
                  </div>



                </div>
              )}
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
              <div>
                {currentTab > 0 && (
                  <button
                    onClick={handlePrevTab}
                    className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors text-sm font-medium"
                  >
                    <ChevronLeftIcon className="h-4 w-4 mr-1" />
                    Previous
                  </button>
                )}
              </div>
              
              <div className="flex space-x-3">
                <button
                  onClick={handleCancelPromotion}
                  className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors text-sm font-medium"
                >
                  Cancel
                </button>
                
                {currentTab < 2 ? (
                  <button
                    onClick={handleNextTab}
                    className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors text-sm font-medium"
                  >
                    Next
                    <ChevronRightIcon className="h-4 w-4 ml-1" />
                  </button>
                ) : (
                  <button
                    onClick={handleSavePromotion}
                    disabled={!promotionForm.promotionName.trim() || !promotionForm.discountValue || !promotionForm.startDate || !promotionForm.endDate}
                    className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors text-sm font-medium"
                  >
                    Save Promotion
                  </button>
                )}
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Kitchen & Dish Selection Modal */}
      {showKitchenModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg max-w-6xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-medium text-neutral-900">Select Kitchens & Dishes</h3>
              <button 
                onClick={() => setShowKitchenModal(false)} 
                className="text-gray-400 hover:text-gray-600"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>

            {/* Search and Bulk Actions */}
            <div className="mb-6 space-y-4">
              <div className="flex gap-4">
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Search kitchens by name or location..."
                    value={kitchenSearchTerm}
                    onChange={(e) => setKitchenSearchTerm(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={handleSelectAllKitchens}
                    className="px-3 py-2 bg-green-600 text-white text-sm rounded-md hover:bg-green-700 transition-colors"
                  >
                    Select All
                  </button>
                  <button
                    type="button"
                    onClick={handleDeselectAllKitchens}
                    className="px-3 py-2 bg-red-600 text-white text-sm rounded-md hover:bg-red-700 transition-colors"
                  >
                    Clear All
                  </button>
                </div>
              </div>
              
              <div className="text-sm text-gray-600">
                Showing {filteredKitchens.length} of {mockKitchens.length} kitchens • {promotionForm.eligibleKitchens.length} selected
              </div>
            </div>

            {/* Kitchen List with Dishes */}
            <div className="space-y-4 max-h-96 overflow-y-auto border border-gray-200 rounded-lg p-4">
              {filteredKitchens.map(kitchen => {
                const isKitchenSelected = promotionForm.eligibleKitchens.includes(kitchen.id);
                const selectedDishes = selectedKitchenDishes[kitchen.id] || [];
                
                return (
                  <div key={kitchen.id} className="border border-gray-200 rounded-lg p-4 bg-white">
                    {/* Kitchen Header */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          checked={isKitchenSelected}
                          onChange={() => handleKitchenToggle(kitchen.id)}
                          className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                        />
                        <div>
                          <div className="font-medium text-gray-900">{kitchen.name}</div>
                          <div className="text-sm text-gray-500">{kitchen.location}</div>
                        </div>
                      </div>
                      
                      {isKitchenSelected && (
                        <div className="flex items-center space-x-2">
                          <span className="text-xs text-gray-500">
                            {selectedDishes.length > 0 
                              ? `${selectedDishes.length}/${kitchen.dishes.length} dishes`
                              : 'All dishes'
                            }
                          </span>
                          <button
                            type="button"
                            onClick={() => handleSelectAllDishesForKitchen(kitchen.id)}
                            className="text-xs text-primary-600 hover:text-primary-800"
                          >
                            Select All Dishes
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Dishes (only show if kitchen is selected) */}
                    {isKitchenSelected && (
                      <div className="ml-6 border-l-2 border-gray-100 pl-4">
                        <div className="text-xs font-medium text-gray-700 mb-2">
                          Select specific dishes (leave empty to include all dishes):
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                          {kitchen.dishes.map(dish => (
                            <label key={dish.id} className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded">
                              <input
                                type="checkbox"
                                checked={selectedDishes.includes(dish.id)}
                                onChange={() => handleDishToggle(kitchen.id, dish.id)}
                                className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                              />
                              <div className="flex-1 min-w-0">
                                <div className="text-sm font-medium text-gray-900 truncate">
                                  {dish.name}
                                </div>
                                <div className="text-xs text-gray-500">
                                  Rs. {dish.price}
                                </div>
                              </div>
                            </label>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
              
              {filteredKitchens.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No kitchens found matching your search.
                </div>
              )}
            </div>

            {/* Modal Actions */}
            <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-200">
              <div className="text-sm text-gray-600">
                {promotionForm.eligibleKitchens.length} kitchen(s) selected with{' '}
                {Object.values(selectedKitchenDishes).reduce((total, dishes) => total + dishes.length, 0)} specific dish(es)
              </div>
              
              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={() => setShowKitchenModal(false)}
                  className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors text-sm font-medium"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => setShowKitchenModal(false)}
                  className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors text-sm font-medium"
                >
                  Apply Selection
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {showConfirmationModal && (
        <ConfirmationModal
          isOpen={showConfirmationModal}
          title={`${confirmationAction === 'delete' ? 'Delete Discount' : 'Confirm Action'}`}
          message={`Are you sure you want to ${confirmationAction === 'delete' ? 'permanently delete' : 'perform this action on'} discount "${pendingAction?.discountName}"?`}
          confirmText={confirmationAction === 'delete' ? 'Delete' : 'Confirm'}
          cancelText="Cancel"
          onConfirm={handleConfirmAction}
          onCancel={handleCancelConfirmation}
          comment={confirmationComment}
          onCommentChange={setConfirmationComment}
          variant="danger"
        />
      )}
    </div>
  );
};

export default Discounts;
