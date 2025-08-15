import React, { useState, useEffect, createContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { CheckCircleIcon, ClockIcon, XCircleIcon } from '@heroicons/react/24/outline';
import { kitchenService } from '../../../services/kitchens/kitchenService';
import { useAuth } from '../../../context/useAuth';
import { PermissionGate } from '../../../components/PermissionGate';

// Import tab components
import KitchenInfoTab from './KitchenInfoTab';
import KitchenUsersTab from './KitchenUsersTab';
import KitchenMediaTab from './KitchenMediaTab';
import KitchenAddressesTab from './KitchenAddressesTab';
import KitchenAvailabilityTab from './KitchenAvailabilityTab';
import KitchenDishesTab from './KitchenDishesTab';
import KitchenAnalyticsTab from './KitchenAnalyticsTab';
import KitchenOrdersTab from './KitchenOrdersTab';
import KitchenDiscountsTab from './KitchenDiscountsTab';
import KitchenEngagementTab from './KitchenEngagementTab';
import KitchenFeedbackTab from './KitchenFeedbackTab';

// Create context for sharing kitchen data across tabs
export const KitchenContext = createContext(null);

const KitchenDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { hasPermission } = useAuth();
  
  // State variables
  const [kitchen, setKitchen] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('users');
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [newStatus, setNewStatus] = useState('');
  const [statusComment, setStatusComment] = useState('');

  // Fetch kitchen data
  useEffect(() => {
    const fetchKitchenData = async () => {
      try {
        setIsLoading(true);
        const data = await kitchenService.getKitchenById(id);
        setKitchen(data);
      } catch (err) {
        console.error('Failed to load kitchen:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchKitchenData();
  }, [id]);

  // Tab navigation handler
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  // Status update handlers
  const handleStatusUpdate = (newStatus) => {
    setNewStatus(newStatus);
    setStatusComment('');
    setShowStatusModal(true);
  };

  const confirmStatusUpdate = async () => {
    if (!statusComment.trim()) {
      alert('Please provide a comment for this status change');
      return;
    }

    try {
      setIsLoading(true);
      const updatedKitchen = await kitchenService.updateKitchenStatus(id, newStatus, statusComment);
      setKitchen(updatedKitchen);
      setShowStatusModal(false);
    } catch (err) {
      console.error('Failed to update kitchen status:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Get status badge
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
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-neutral-100 text-neutral-800">
            {status}
          </span>
        );
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  if (!kitchen) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-neutral-900">Kitchen not found</h3>
        <p className="mt-2 text-neutral-600">The kitchen you're looking for doesn't exist or you don't have permission to view it.</p>
        <div className="mt-6">
          <button
            onClick={() => navigate('/kitchens')}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700"
          >
            Back to Kitchens
          </button>
        </div>
      </div>
    );
  }

  // Map tabs to components
  const TABS = {
    users: <KitchenUsersTab />,
    media: <KitchenMediaTab />,
    addresses: <KitchenAddressesTab />,
    availability: <KitchenAvailabilityTab />,
    engagement: <KitchenEngagementTab />,
    dishes: <KitchenDishesTab />,
    discounts: <KitchenDiscountsTab />,
    feedback: <KitchenFeedbackTab />,
    analytics: <KitchenAnalyticsTab />,
    orders: hasPermission('view_orders') ? <KitchenOrdersTab /> : null
  };

  return (
    <KitchenContext.Provider value={{ kitchen, setKitchen, id }}>
      <div className="bg-white shadow rounded-xl overflow-hidden">
        {/* Header */}
        <div className="px-6 py-5 border-b border-neutral-200 flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/kitchens" className="mr-4 text-neutral-500 hover:text-neutral-700">
              <ArrowLeftIcon className="h-5 w-5" />
            </Link>
            <h2 className="text-xl font-medium text-neutral-900">{kitchen.name}</h2>
            <div className="ml-4">{getStatusBadge(kitchen.status)}</div>
          </div>
          <div className="flex space-x-3">
            {kitchen.status !== 'active' && (
              <button
                onClick={() => handleStatusUpdate('active')}
                className="px-4 py-2 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700"
              >
                Activate Kitchen
              </button>
            )}
            {kitchen.status !== 'suspended' && (
              <button
                onClick={() => handleStatusUpdate('suspended')}
                className="px-4 py-2 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700"
              >
                Suspend Kitchen
              </button>
            )}
          </div>
        </div>

        {/* Kitchen Basic Information */}
        <div className="px-6 py-5 border-b border-neutral-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="mb-4">
                <h3 className="text-sm font-medium text-neutral-500">Kitchen Name</h3>
                <p className="mt-1 text-neutral-900">{kitchen.name}</p>
              </div>
              <div className="mb-4">
                <h3 className="text-sm font-medium text-neutral-500">Registration Date</h3>
                <p className="mt-1 text-neutral-900">
                  {new Date(kitchen.registrationDate).toLocaleDateString()}
                </p>
              </div>
              <div className="mb-4">
                <h3 className="text-sm font-medium text-neutral-500">Tagline</h3>
                <p className="mt-1 text-neutral-900">{kitchen.tagline || 'No tagline set'}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-neutral-500">Bio</h3>
                <p className="mt-1 text-neutral-900 whitespace-pre-line">
                  {kitchen.bio || 'No bio available'}
                </p>
              </div>
            </div>
            <div>
              <div className="mb-4">
                <h3 className="text-sm font-medium text-neutral-500">Owner</h3>
                <p className="mt-1 text-neutral-900">{kitchen.owner?.name || 'Not assigned'}</p>
              </div>
              <div className="mb-4">
                <h3 className="text-sm font-medium text-neutral-500">Status</h3>
                <p className="mt-1">{getStatusBadge(kitchen.status)}</p>
              </div>
              <div className="mb-4">
                <h3 className="text-sm font-medium text-neutral-500">Contact</h3>
                <p className="mt-1 text-neutral-900">{kitchen.contact || 'No contact information'}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-neutral-500">Cuisine</h3>
                <p className="mt-1 text-neutral-900">{kitchen.cuisine || 'Not specified'}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="border-b border-neutral-200 mb-8">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => handleTabChange('users')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'users'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300'
              }`}
            >
              Kitchen Users
            </button>
            
            <button
              onClick={() => handleTabChange('media')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'media'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300'
              }`}
            >
              Kitchen Media
            </button>
            
            {hasPermission('view_kitchen_addresses') && (
              <button
                onClick={() => handleTabChange('addresses')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'addresses'
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300'
                }`}
              >
                Kitchen Addresses
              </button>
            )}
               
               <button
              onClick={() => handleTabChange('engagement')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'engagement'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300'
              }`}
            >
               Engagement
            </button>
            
            <button
              onClick={() => handleTabChange('availability')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'availability'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300'
              }`}
            >
              Kitchen Availability
            </button>
            
            <button
              onClick={() => handleTabChange('dishes')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'dishes'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300'
              }`}
            >
              Dishes
            </button>
            <button
              onClick={() => handleTabChange('discounts')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'discounts'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300'
              }`}
            >
             Discounts
            </button>
            <button
              onClick={() => handleTabChange('feedback')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'feedback'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300'
              }`}
            >
              Feedback
            </button>
            <button
              onClick={() => handleTabChange('analytics')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'analytics'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300'
              }`}
            >
              Analytics
            </button>
            
            <button
              onClick={() => handleTabChange('orders')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'orders'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300'
              }`}
            >
              Orders
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        <div className="px-6 py-5">
          {TABS[activeTab]}
        </div>
      </div>

      {/* Status Update Modal */}
      {showStatusModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6">
            <div className="mb-4">
              <h3 className="text-lg font-medium text-neutral-900">
                {newStatus === 'active' 
                  ? 'Activate Kitchen' 
                  : newStatus === 'suspended'
                  ? 'Suspend Kitchen'
                  : 'Update Kitchen Status'
                }
              </h3>
              <p className="text-sm text-neutral-500 mt-1">
                {newStatus === 'active' 
                  ? 'This will make the kitchen visible to customers and allow it to accept orders.' 
                  : newStatus === 'suspended'
                  ? 'This will hide the kitchen from customers and prevent it from accepting new orders.'
                  : 'Please confirm the status change.'
                }
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Comment (Required)
              </label>
              <textarea
                value={statusComment}
                onChange={(e) => setStatusComment(e.target.value)}
                className="w-full p-2 border border-neutral-300 rounded-md mt-1"
                rows="3"
                placeholder="Enter your comments here..."
              />
            </div>
            <div className="flex justify-end space-x-2 mt-4">
              <button
                onClick={() => setShowStatusModal(false)}
                className="px-4 py-2 bg-white border border-neutral-300 text-neutral-700 rounded-full hover:bg-neutral-50 transition-colors text-sm font-medium"
              >
                Cancel
              </button>
              <button
                onClick={confirmStatusUpdate}
                className={`px-4 py-2 rounded-full text-white text-sm font-medium ${
                  newStatus === 'active' 
                    ? 'bg-green-600 hover:bg-green-700' 
                    : newStatus === 'suspended'
                    ? 'bg-red-600 hover:bg-red-700'
                    : 'bg-primary-600 hover:bg-primary-700'
                }`}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </KitchenContext.Provider>
  );
};

export default KitchenDetail;
