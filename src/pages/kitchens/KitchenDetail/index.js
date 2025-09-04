import React, { useState, useEffect, createContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { CheckCircleIcon, ClockIcon, XCircleIcon } from '@heroicons/react/24/outline';
import { useGetKitchenByIdQuery } from '../../../store/api/modules/kitchens/kitchensApi';
import { useAuth } from '../../../hooks/useAuth';
import PermissionGate from '../../../components/PermissionGate';
import ConfirmationModal from '../../../components/ConfirmationModal';
import { PERMISSIONS } from '../../../contexts/PermissionRegistry';

// Import tab components
import KitchenInfoTab from './KitchenInfoTab';
import KitchenPartnersTab from './KitchenPartnersTab';
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
  
  // Check permission first
  const canViewKitchenDetails = hasPermission(PERMISSIONS.KITCHEN_DETAIL_VIEW);
  
  // RTK Query to fetch kitchen data - only if user has permission
  const { data: kitchenResponse, isLoading, error } = useGetKitchenByIdQuery(id, {
    skip: !canViewKitchenDetails
  });
  
  // State variables
  const [activeTab, setActiveTab] = useState('partners');
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [newStatus, setNewStatus] = useState('');
  const [statusComment, setStatusComment] = useState('');

  // Extract kitchen data from API response
  const kitchen = kitchenResponse?.data || null;

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
    try {
      // TODO: Implement status update API call when available
      console.log('Status update requested:', { id, newStatus, statusComment });
      setShowStatusModal(false);
      setStatusComment('');
    } catch (err) {
      console.error('Failed to update kitchen status:', err);
    }
  };

  const handleCancelStatusUpdate = () => {
    setShowStatusModal(false);
    setStatusComment('');
    setNewStatus('');
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

  // Show unauthorized message if user doesn't have permission
  if (!canViewKitchenDetails) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <h3 className="text-lg font-medium text-neutral-900 mb-2">Access Denied</h3>
          <p className="text-neutral-500">You don't have permission to view the kitchen details.</p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-neutral-900">Error loading kitchen</h3>
        <p className="mt-2 text-neutral-600">
          {error?.data?.message || 'Failed to load kitchen data. Please try again.'}
        </p>
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
    partners: <KitchenPartnersTab />,
    media: <KitchenMediaTab />,
    addresses: <KitchenAddressesTab />,
    availability: <KitchenAvailabilityTab />,
    engagement: <KitchenEngagementTab />,
    dishes: <KitchenDishesTab />,
    discounts: <KitchenDiscountsTab />,
    feedback: <KitchenFeedbackTab />,
    analytics: <KitchenAnalyticsTab />,
    orders: <KitchenOrdersTab />
  };

  return (
    <KitchenContext.Provider value={{ kitchen, setKitchen: () => {}, id }}>
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
                Open Kitchen
              </button>
            )}
            {kitchen.status === 'active' && (
              <button
                onClick={() => handleStatusUpdate('suspended')}
                className="px-4 py-2 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700"
              >
                Close Kitchen
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
                <p className="mt-1 text-neutral-900">{kitchen.name || 'N/A'}</p>
              </div>
              <div className="mb-4">
                <h3 className="text-sm font-medium text-neutral-500">Registration Date</h3>
                <p className="mt-1 text-neutral-900">
                  {kitchen.createdAt ? new Date(kitchen.createdAt).toLocaleDateString() : 'N/A'}
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
                <p className="mt-1 text-neutral-900">{kitchen.owner || 'N/A'}</p>
              </div>
              <div className="mb-4">
                <h3 className="text-sm font-medium text-neutral-500">Status</h3>
                <p className="mt-1">{getStatusBadge(kitchen.status)}</p>
              </div>
              <div className="mb-4">
                <h3 className="text-sm font-medium text-neutral-500">Contact</h3>
                <p className="mt-1 text-neutral-900">{kitchen.contact || 'N/A'}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-neutral-500">Logo Available</h3>
                <p className="mt-1 text-neutral-900">
                  {kitchen.isLogoAvailable ? 'Yes' : 'No'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="border-b border-neutral-200 mb-8">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => handleTabChange('partners')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'partners'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300'
              }`}
            >
              Kitchen partners
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
      <ConfirmationModal
        isOpen={showStatusModal}
        title={newStatus === 'active' ? 'Open Kitchen' : 'Close Kitchen'}
        message={
          newStatus === 'active' 
            ? 'This will make the kitchen visible to customers and allow it to accept orders.' 
            : 'This will hide the kitchen from customers and prevent it from accepting new orders.'
        }
        comment={statusComment}
        onCommentChange={setStatusComment}
        onConfirm={confirmStatusUpdate}
        onCancel={handleCancelStatusUpdate}
        confirmButtonText={newStatus === 'active' ? 'Open Kitchen' : 'Close Kitchen'}
        confirmButtonColor={newStatus === 'active' ? 'green' : 'primary'}
        isCommentRequired={true}
      />
    </KitchenContext.Provider>
  );
};

export default KitchenDetail;
