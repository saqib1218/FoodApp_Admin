import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { EyeIcon, StarIcon } from '@heroicons/react/24/outline';

const KitchenFeedbackTab = () => {
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  // Mock feedback data for this kitchen
  const [feedbacks, setFeedbacks] = useState([
    {
      id: 1,
      customerName: 'Ahmed Hassan',
      customerId: 'CUST-001',
      customerPhone: '+92 300 1234567',
      orderId: 'ORD-2024-001',
      dishName: 'Chicken Tikka Pizza',
      rating: 4,
      status: 'approved',
      feedback: 'Great taste but delivery was a bit late. Overall satisfied with the quality. The chicken tikka was perfectly cooked and the pizza base was crispy.',
      createdAt: '2024-01-12 14:30:00'
    },
    {
      id: 2,
      customerName: 'Ali Raza',
      customerId: 'CUST-004',
      customerPhone: '+92 303 4567890',
      orderId: 'ORD-2024-002',
      dishName: 'Margherita Pizza',
      rating: 3,
      status: 'pending',
      feedback: 'Average taste, could be better. Cheese was not melted properly. The pizza was okay but not exceptional.',
      createdAt: '2024-01-09 16:20:00'
    },
    {
      id: 3,
      customerName: 'Fatima Khan',
      customerId: 'CUST-002',
      customerPhone: '+92 301 2345678',
      orderId: 'ORD-2024-003',
      dishName: 'Pepperoni Pizza',
      rating: 5,
      status: 'approved',
      feedback: 'Excellent pizza! Perfect taste and very fresh ingredients. The pepperoni was delicious and the crust was perfect. Highly recommended!',
      createdAt: '2024-01-08 19:45:00'
    },
    {
      id: 4,
      customerName: 'Sarah Ahmed',
      customerId: 'CUST-003',
      customerPhone: '+92 302 3456789',
      orderId: 'ORD-2024-004',
      dishName: 'Vegetarian Pizza',
      rating: 2,
      status: 'rejected',
      feedback: 'Not satisfied with the taste. Vegetables were not fresh and the pizza was cold when delivered. Very disappointed with the quality.',
      createdAt: '2024-01-07 12:15:00'
    },
    {
      id: 5,
      customerName: 'Hassan Ali',
      customerId: 'CUST-006',
      customerPhone: '+92 305 6789012',
      orderId: 'ORD-2024-005',
      dishName: 'BBQ Chicken Pizza',
      rating: 5,
      status: 'approved',
      feedback: 'Amazing BBQ chicken pizza! The sauce was perfect and chicken was tender. Best pizza I have had in a long time. Will definitely order again.',
      createdAt: '2024-01-05 18:30:00'
    },
    {
      id: 6,
      customerName: 'Zara Sheikh',
      customerId: 'CUST-005',
      customerPhone: '+92 304 5678901',
      orderId: 'ORD-2024-006',
      dishName: 'Cheese Lovers Pizza',
      rating: 4,
      status: 'pending',
      feedback: 'Good cheese pizza with generous toppings. The cheese quality was excellent but could use more seasoning. Overall a satisfying meal.',
      createdAt: '2024-01-03 20:10:00'
    }
  ]);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'pending':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">Pending</span>;
      case 'approved':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">Approved</span>;
      case 'rejected':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">Rejected</span>;
      default:
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">Unknown</span>;
    }
  };

  const handleViewFeedback = (feedback) => {
    setSelectedFeedback(feedback);
    setShowDetailModal(true);
  };

  const renderStars = (rating) => {
    return (
      <div className="flex items-center space-x-1">
        {[...Array(5)].map((_, i) => (
          <StarIcon
            key={i}
            className={`h-4 w-4 ${
              i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
            }`}
          />
        ))}
        <span className="ml-1 text-sm text-gray-600">({rating})</span>
      </div>
    );
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-lg font-medium text-gray-900">Customer Feedback</h2>
        <p className="mt-1 text-sm text-gray-500">
          Review and manage customer feedback for your dishes
        </p>
      </div>

      {/* Feedback Table */}
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Customer Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Order ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Rating
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {feedbacks.map((feedback) => (
              <tr key={feedback.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    <Link
                      to={`/customers/${feedback.customerId}`}
                      className="hover:text-primary-600 hover:underline"
                    >
                      {feedback.customerName}
                    </Link>
                  </div>
                  <div className="text-sm text-gray-500">{feedback.dishName}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {feedback.orderId}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {renderStars(feedback.rating)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {getStatusBadge(feedback.status)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => handleViewFeedback(feedback)}
                    className="text-primary-600 hover:text-primary-900 flex items-center space-x-1"
                  >
                    <EyeIcon className="h-4 w-4" />
                    <span>View</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {feedbacks.length === 0 && (
          <div className="text-center py-12">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No feedback yet</h3>
            <p className="mt-1 text-sm text-gray-500">No customers have left feedback for this kitchen yet.</p>
          </div>
        )}
      </div>

      {/* Feedback Detail Modal */}
      {showDetailModal && selectedFeedback && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">
                Feedback Details
              </h3>
              <button
                onClick={() => setShowDetailModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              {/* Customer Info */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <h4 className="text-sm font-medium text-gray-900 mb-3">Customer Information</h4>
                <dl className="grid grid-cols-2 gap-4">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Name</dt>
                    <dd className="text-sm text-gray-900">
                      <Link
                        to={`/customers/${selectedFeedback.customerId}`}
                        className="hover:text-primary-600 hover:underline"
                      >
                        {selectedFeedback.customerName}
                      </Link>
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Phone</dt>
                    <dd className="text-sm text-gray-900">{selectedFeedback.customerPhone}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Order ID</dt>
                    <dd className="text-sm text-gray-900">{selectedFeedback.orderId}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Date</dt>
                    <dd className="text-sm text-gray-900">
                      {new Date(selectedFeedback.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </dd>
                  </div>
                </dl>
              </div>

              {/* Order Info */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <h4 className="text-sm font-medium text-gray-900 mb-3">Order Information</h4>
                <dl className="grid grid-cols-2 gap-4">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Dish</dt>
                    <dd className="text-sm text-gray-900">{selectedFeedback.dishName}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Status</dt>
                    <dd className="text-sm text-gray-900">{getStatusBadge(selectedFeedback.status)}</dd>
                  </div>
                </dl>
              </div>

              {/* Rating */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-900 mb-2">Rating</h4>
                <div className="flex items-center space-x-2">
                  {renderStars(selectedFeedback.rating)}
                </div>
              </div>

              {/* Feedback Comment */}
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-2">Customer Feedback</h4>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-gray-700 leading-relaxed">{selectedFeedback.feedback}</p>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex justify-end space-x-3 p-6 border-t border-gray-200">
              <button
                onClick={() => setShowDetailModal(false)}
                className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-full hover:bg-gray-50 transition-colors text-sm font-medium"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default KitchenFeedbackTab;