import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  EyeIcon, 
  PencilIcon, 
  TrashIcon,
  MagnifyingGlassIcon,
  FunnelIcon
} from '@heroicons/react/24/outline';

const Feedback = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);
  const [selectedFeedback, setSelectedFeedback] = useState(null);

  // Mock feedback data
  const [feedbacks, setFeedbacks] = useState([
    {
      id: 1,
      customerName: 'Ahmed Hassan',
      customerPhone: '+92 300 1234567',
      customerId: 'CUST-001',
      kitchenId: 'KITCHEN-001',
      kitchenName: 'Pizza Palace',
      orderId: 'ORD-001',
      dishName: 'Chicken Tikka Pizza',
      status: 'pending',
      rating: 4,
      feedback: 'Great taste but delivery was a bit late. Overall satisfied with the quality.',
      createdAt: '2024-01-12 14:30:00'
    },
    {
      id: 2,
      customerName: 'Fatima Khan',
      customerPhone: '+92 301 2345678',
      customerId: 'CUST-002',
      kitchenId: 'KITCHEN-002',
      kitchenName: 'Burger House',
      dishId: 'DISH-002',
      dishName: 'Beef Burger Deluxe',
      status: 'approved',
      rating: 5,
      feedback: 'Excellent burger! Perfect taste and very fresh ingredients. Highly recommended.',
      createdAt: '2024-01-11 18:45:00'
    },
    {
      id: 3,
      customerName: 'Sarah Ahmed',
      customerPhone: '+92 302 3456789',
      customerId: 'CUST-003',
      kitchenId: 'KITCHEN-003',
      kitchenName: 'Sushi Master',
      dishId: 'DISH-003',
      dishName: 'California Roll',
      status: 'rejected',
      rating: 2,
      feedback: 'Not fresh, rice was hard and fish didn\'t taste good. Very disappointed.',
      createdAt: '2024-01-10 20:15:00'
    },
    {
      id: 4,
      customerName: 'Ali Raza',
      customerPhone: '+92 303 4567890',
      customerId: 'CUST-004',
      kitchenId: 'KITCHEN-001',
      kitchenName: 'Pizza Palace',
      dishId: 'DISH-004',
      dishName: 'Margherita Pizza',
      status: 'pending',
      rating: 3,
      feedback: 'Average taste, could be better. Cheese was not melted properly.',
      createdAt: '2024-01-09 16:20:00'
    },
    {
      id: 5,
      customerName: 'Zara Sheikh',
      customerPhone: '+92 304 5678901',
      customerId: 'CUST-005',
      kitchenId: 'KITCHEN-004',
      kitchenName: 'Desi Delights',
      dishId: 'DISH-005',
      dishName: 'Chicken Biryani',
      status: 'approved',
      rating: 5,
      feedback: 'Amazing biryani! Perfect spices and tender chicken. Will order again.',
      createdAt: '2024-01-08 19:30:00'
    }
  ]);

  // Filter feedbacks based on search and status
  const filteredFeedbacks = feedbacks.filter(feedback => {
    const matchesSearch = feedback.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         feedback.customerPhone.includes(searchTerm) ||
                         feedback.kitchenName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         feedback.dishName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || feedback.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

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

  const handleDelete = (feedback) => {
    setSelectedFeedback(feedback);
    setShowDeleteConfirmModal(true);
  };

  const confirmDelete = () => {
    setFeedbacks(feedbacks.filter(f => f.id !== selectedFeedback.id));
    setShowDeleteConfirmModal(false);
    setSelectedFeedback(null);
  };

  return (
    <div className="">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Customer Feedbacks</h1>
          <p className="mt-2 text-sm text-gray-700">
            Manage and review customer feedback for dishes and overall experience.
          </p>
        </div>
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
              placeholder="Search by customer name, phone, kitchen, or dish..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="sm:w-48">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FunnelIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </div>
            <select
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>
      </div>

      {/* Feedback Table */}
      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Customer
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Kitchen
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Order
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Rating
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredFeedbacks.map((feedback) => (
                    <tr key={feedback.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <div>
                          <div className="font-medium">{feedback.customerName}</div>
                          <div className="text-xs text-gray-500">{feedback.customerPhone}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div>
                          <div className="font-medium">{feedback.kitchenName}</div>
                          <div className="text-xs text-gray-400">ID: {feedback.kitchenId}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div>
                          <div className="font-medium">{feedback.orderId}</div>
                          <div className="text-xs text-gray-400">{feedback.dishName}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {getStatusBadge(feedback.status)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              className={`h-4 w-4 ${
                                i < feedback.rating ? 'text-yellow-400' : 'text-gray-300'
                              }`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                          <span className="ml-1 text-xs text-gray-600">({feedback.rating})</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center space-x-2">
                          <Link
                            to={`/feedback/${feedback.id}`}
                            className="text-primary-600 hover:text-primary-900"
                          >
                            <EyeIcon className="h-4 w-4" />
                          </Link>
                          <button
                            onClick={() => handleDelete(feedback)}
                            className="text-red-600 hover:text-red-900"
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
        </div>
      </div>

      {filteredFeedbacks.length === 0 && (
        <div className="text-center py-8">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No feedbacks found</h3>
          <p className="mt-1 text-sm text-gray-500">No feedbacks match your current search criteria.</p>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirmModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                <TrashIcon className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mt-2">Delete Feedback</h3>
              <div className="mt-2 px-7 py-3">
                <p className="text-sm text-gray-500">
                  Are you sure you want to delete this feedback from {selectedFeedback?.customerName}? This action cannot be undone.
                </p>
              </div>
              <div className="flex justify-center space-x-4 mt-4">
                <button
                  onClick={() => setShowDeleteConfirmModal(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Feedback;