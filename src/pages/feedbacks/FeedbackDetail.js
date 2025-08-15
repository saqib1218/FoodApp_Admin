import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  ArrowLeftIcon,
  UserIcon,
  PhoneIcon,
  BuildingStorefrontIcon,
  ClockIcon,
  StarIcon,
  PencilIcon,
  PhotoIcon,
  PlayIcon,
  TrashIcon
} from '@heroicons/react/24/outline';
import ConfirmationModal from '../../components/ConfirmationModal';

const FeedbackDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [feedback, setFeedback] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showUpdateConfirmModal, setShowUpdateConfirmModal] = useState(false);
  const [showRejectConfirmModal, setShowRejectConfirmModal] = useState(false);
  const [editComment, setEditComment] = useState('');
  const [rejectComment, setRejectComment] = useState('');
  const [updateComment, setUpdateComment] = useState('');
  const [editMediaFiles, setEditMediaFiles] = useState([]);

  // Mock feedback data - in real app, this would come from API
  const mockFeedbacks = [
    {
      id: 1,
      customerName: 'Ahmed Hassan',
      customerPhone: '+92 300 1234567',
      customerId: 'CUST-001',
      kitchenId: 'KITCHEN-001',
      kitchenName: 'Pizza Palace',
      dishId: 'DISH-001',
      dishName: 'Chicken Tikka Pizza',
      status: 'pending',
      rating: 4,
      feedback: 'Great taste but delivery was a bit late. Overall satisfied with the quality. The chicken tikka was perfectly cooked and the pizza base was crispy. However, the delivery took longer than expected which affected the overall experience. Would definitely order again if delivery time improves.',
      createdAt: '2024-01-12 14:30:00',
      orderNumber: 'ORD-2024-001',
      orderTotal: 'PKR 1,250',
      mediaFiles: [
        {
          id: 1,
          type: 'image',
          url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400',
          thumbnail: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=200',
          name: 'pizza_photo.jpg'
        },
        {
          id: 2,
          type: 'video',
          url: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
          thumbnail: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=200',
          name: 'pizza_video.mp4'
        }
      ]
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
      feedback: 'Excellent burger! Perfect taste and very fresh ingredients. Highly recommended. The beef patty was juicy and cooked to perfection. The vegetables were fresh and the sauce complemented the burger very well. Packaging was also great and kept the burger warm.',
      createdAt: '2024-01-11 18:45:00',
      orderNumber: 'ORD-2024-002',
      orderTotal: 'PKR 850',
      mediaFiles: [
        {
          id: 3,
          type: 'image',
          url: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400',
          thumbnail: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200',
          name: 'burger_photo.jpg'
        }
      ]
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
      feedback: 'Not fresh, rice was hard and fish didn\'t taste good. Very disappointed. The sushi rice was overcooked and hard, making it difficult to eat. The fish seemed old and had an off taste. For the price paid, this was completely unacceptable. Would not recommend to anyone.',
      createdAt: '2024-01-10 20:15:00',
      orderNumber: 'ORD-2024-003',
      orderTotal: 'PKR 1,800'
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
      feedback: 'Average taste, could be better. Cheese was not melted properly. The pizza was okay but not exceptional. The cheese seemed to be added after baking which made it not melt properly. The tomato sauce was good but could use more herbs for better flavor.',
      createdAt: '2024-01-09 16:20:00',
      orderNumber: 'ORD-2024-004',
      orderTotal: 'PKR 950'
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
      feedback: 'Amazing biryani! Perfect spices and tender chicken. Will order again. This was one of the best biryanis I have ever had. The rice was perfectly cooked, chicken was tender and juicy, and the spices were balanced perfectly. The portion size was also generous.',
      createdAt: '2024-01-08 19:30:00',
      orderNumber: 'ORD-2024-005',
      orderTotal: 'PKR 1,200'
    }
  ];

  useEffect(() => {
    // Simulate API call
    const foundFeedback = mockFeedbacks.find(f => f.id === parseInt(id));
    setFeedback(foundFeedback);
    setLoading(false);
  }, [id]);

  const handleReject = () => {
    setShowRejectConfirmModal(true);
  };

  const confirmReject = () => {
    setFeedback({ ...feedback, status: 'rejected' });
    setShowRejectConfirmModal(false);
    setRejectComment('');
    // TODO: API call to update status with reject comment
    alert('Feedback has been rejected');
  };

  const handleSendToKitchen = () => {
    setFeedback({ ...feedback, status: 'approved' });
    // TODO: API call to send to kitchen
    alert('Feedback has been sent to kitchen');
  };

  const handleCancel = () => {
    navigate('/feedback');
  };

  const handleEdit = () => {
    setEditComment(feedback.feedback);
    setEditMediaFiles(feedback.mediaFiles ? [...feedback.mediaFiles] : []);
    setShowEditModal(true);
  };

  const handleDeleteMedia = (mediaId) => {
    setEditMediaFiles(editMediaFiles.filter(media => media.id !== mediaId));
  };

  const handleSaveEdit = () => {
    setShowUpdateConfirmModal(true);
  };

  const confirmUpdate = () => {
    setFeedback({ ...feedback, feedback: editComment, mediaFiles: editMediaFiles });
    setShowEditModal(false);
    setShowUpdateConfirmModal(false);
    setEditComment('');
    setUpdateComment('');
    setEditMediaFiles([]);
    // TODO: API call to update feedback with update comment and media files
    alert('Feedback updated successfully');
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'pending':
        return <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">Pending</span>;
      case 'approved':
        return <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">Approved</span>;
      case 'rejected':
        return <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">Rejected</span>;
      default:
        return <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">Unknown</span>;
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!feedback) {
    return (
      <div className="text-center py-12">
        <h3 className="mt-2 text-sm font-medium text-gray-900">Feedback not found</h3>
        <p className="mt-1 text-sm text-gray-500">The feedback you're looking for doesn't exist.</p>
        <div className="mt-6">
          <Link
            to="/feedback"
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
          >
            Back to Feedbacks
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="">
      {/* Header */}
      <div className="mb-8">
        <nav className="flex" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-4">
            <li>
              <div>
                <Link to="/feedback" className="text-gray-400 hover:text-gray-500">
                  <ArrowLeftIcon className="flex-shrink-0 h-5 w-5" aria-hidden="true" />
                  <span className="sr-only">Back</span>
                </Link>
              </div>
            </li>
            <li>
              <div className="flex items-center">
                <span className="text-gray-400">/</span>
                <Link to="/feedback" className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700">
                  Feedbacks
                </Link>
              </div>
            </li>
            <li>
              <div className="flex items-center">
                <span className="text-gray-400">/</span>
                <span className="ml-4 text-sm font-medium text-gray-900">Feedback #{feedback.id}</span>
              </div>
            </li>
          </ol>
        </nav>
      </div>

      {/* Main Content */}
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        {/* Header Section */}
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Feedback Details</h1>
              <div className="flex justify-start">
            {getStatusBadge(feedback.status)}
          </div>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Submitted on {new Date(feedback.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
            </div>
            <div>
              <button
                onClick={handleEdit}
                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                <PencilIcon className="h-4 w-4 mr-2" />
                Edit
              </button>
            </div>
          </div>
        </div>

        {/* Customer Information */}
        <div className="px-4 py-5 sm:p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Customer Details */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                <UserIcon className="h-5 w-5 mr-2" />
                Customer Information
              </h3>
              <dl className="space-y-3">
                <div>
                  <dt className="text-sm font-medium text-gray-500">Name</dt>
                  <dd className="text-sm text-gray-900">{feedback.customerName}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Customer ID</dt>
                  <dd className="text-sm text-gray-900">
                    <Link 
                      to={`/customers/${feedback.customerId}`}
                      className="text-primary-600 hover:text-primary-800 hover:underline"
                    >
                      {feedback.customerId}
                    </Link>
                  </dd>
                </div>
                <div className="flex items-center">
                  <PhoneIcon className="h-4 w-4 text-gray-400 mr-2" />
                  <div>
                    <dt className="text-sm font-medium text-gray-500 inline">Phone Number</dt>
                    <dd className="text-sm text-gray-900 ml-2 inline">{feedback.customerPhone}</dd>
                  </div>
                </div>
              </dl>
            </div>

            {/* Order Details */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                <BuildingStorefrontIcon className="h-5 w-5 mr-2" />
                Order Information
              </h3>
              <dl className="space-y-3">
                <div>
                  <dt className="text-sm font-medium text-gray-500">Kitchen</dt>
                  <dd className="text-sm text-gray-900">{feedback.kitchenName}</dd>
                  <dd className="text-xs text-gray-400">ID: {feedback.kitchenId}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Dish</dt>
                  <dd className="text-sm text-gray-900">{feedback.dishName}</dd>
                  <dd className="text-xs text-gray-400">ID: {feedback.dishId}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Order Number</dt>
                  <dd className="text-sm text-gray-900">{feedback.orderNumber}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Order Total</dt>
                  <dd className="text-sm text-gray-900">{feedback.orderTotal}</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>

        {/* Rating Section */}
        <div className="px-4 py-5 sm:p-6 border-t border-gray-200">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Customer Rating</h3>
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <StarIcon
                  key={i}
                  className={`h-8 w-8 ${
                    i < feedback.rating 
                      ? 'text-yellow-400 fill-current' 
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-2xl font-bold text-gray-900">{feedback.rating}/5</span>
            <span className="text-sm text-gray-500">
              ({feedback.rating === 5 ? 'Excellent' : 
                feedback.rating === 4 ? 'Good' : 
                feedback.rating === 3 ? 'Average' : 
                feedback.rating === 2 ? 'Poor' : 'Very Poor'})
            </span>
          </div>
        </div>

        {/* Feedback Content */}
        <div className="px-4 py-5 sm:p-6 border-t border-gray-200">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Customer Feedback</h3>
          <div className="bg-gray-50 rounded-lg p-4 mb-4">
            <p className="text-gray-700 leading-relaxed">{feedback.feedback}</p>
          </div>
          
        </div>

        {/* Media Files */}
        {feedback.mediaFiles && feedback.mediaFiles.length > 0 && (
          <div className="px-4 py-5 sm:p-6 border-t border-gray-200">
            <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
              <PhotoIcon className="h-5 w-5 mr-2" />
              Media Files
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {feedback.mediaFiles.map((media) => (
                <div key={media.id} className="relative group">
                  <div className="aspect-square bg-gray-200 rounded-lg overflow-hidden">
                    <img
                      src={media.thumbnail}
                      alt={media.name}
                      className="w-full h-full object-cover group-hover:opacity-75 transition-opacity"
                    />
                    {media.type === 'video' && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-black bg-opacity-50 rounded-full p-2">
                          <PlayIcon className="h-8 w-8 text-white" />
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="mt-2">
                    <p className="text-sm font-medium text-gray-900 truncate">{media.name}</p>
                    <p className="text-xs text-gray-500 capitalize">{media.type}</p>
                  </div>
                  <button
                    onClick={() => window.open(media.url, '_blank')}
                    className="absolute inset-0 w-full h-full bg-transparent hover:bg-black hover:bg-opacity-10 transition-colors rounded-lg"
                    title={`View ${media.name}`}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="px-4 py-4 sm:px-6 bg-gray-50 border-t border-gray-200">
          <div className="flex justify-end space-x-3">
            <button
              onClick={handleCancel}
              className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Cancel
            </button>
            <button
              onClick={handleReject}
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Reject
            </button>
            <button
              onClick={handleSendToKitchen}
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Send to Kitchen
            </button>
          </div>
        </div>
      </div>

      {/* Edit Feedback Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-10 mx-auto p-5 border w-full max-w-4xl shadow-lg rounded-md bg-white max-h-[90vh] overflow-y-auto">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Edit Feedback</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left Column - Form Fields */}
                <div className="space-y-4">
                  {/* Customer Name - Disabled */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Customer Name
                    </label>
                    <input
                      type="text"
                      value={feedback.customerName}
                      disabled
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-500 cursor-not-allowed"
                    />
                  </div>

                  {/* Rating - Disabled */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Rating
                    </label>
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <StarIcon
                          key={i}
                          className={`h-6 w-6 ${
                            i < feedback.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                          }`}
                        />
                      ))}
                      <span className="ml-2 text-sm text-gray-500">({feedback.rating}/5)</span>
                    </div>
                  </div>

                  {/* Kitchen Name - Disabled */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Kitchen
                    </label>
                    <input
                      type="text"
                      value={feedback.kitchenName}
                      disabled
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-500 cursor-not-allowed"
                    />
                  </div>

                  {/* Dish Name - Disabled */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Dish
                    </label>
                    <input
                      type="text"
                      value={feedback.dishName}
                      disabled
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-500 cursor-not-allowed"
                    />
                  </div>

                  {/* Comments - Editable */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Customer Comments
                    </label>
                    <textarea
                      rows={4}
                      value={editComment}
                      onChange={(e) => setEditComment(e.target.value)}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                      placeholder="Enter customer feedback comments..."
                    />
                  </div>
                </div>

                {/* Right Column - Media Files */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Media Files
                  </label>
                  {editMediaFiles && editMediaFiles.length > 0 ? (
                    <div className="grid grid-cols-2 gap-4">
                      {editMediaFiles.map((media) => (
                        <div key={media.id} className="relative group">
                          <div className="aspect-square bg-gray-200 rounded-lg overflow-hidden">
                            <img
                              src={media.thumbnail}
                              alt={media.name}
                              className="w-full h-full object-cover"
                            />
                            {media.type === 'video' && (
                              <div className="absolute inset-0 flex items-center justify-center">
                                <div className="bg-black bg-opacity-50 rounded-full p-2">
                                  <PlayIcon className="h-6 w-6 text-white" />
                                </div>
                              </div>
                            )}
                          </div>
                          <div className="mt-2">
                            <p className="text-sm font-medium text-gray-900 truncate">{media.name}</p>
                            <p className="text-xs text-gray-500 capitalize">{media.type}</p>
                          </div>
                          {/* Delete Button */}
                          <button
                            onClick={() => handleDeleteMedia(media.id)}
                            className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                            title="Delete media file"
                          >
                            <TrashIcon className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
                      <PhotoIcon className="mx-auto h-12 w-12 text-gray-400" />
                      <p className="mt-2 text-sm text-gray-500">No media files</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6 pt-4 border-t border-gray-200">
                <button
                  onClick={() => {
                    setShowEditModal(false);
                    setEditComment('');
                    setEditMediaFiles([]);
                  }}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveEdit}
                  className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
                >
                  Update Feedback
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Update Confirmation Modal */}
      <ConfirmationModal
        isOpen={showUpdateConfirmModal}
        title="Update Feedback Comments"
        message={`Are you sure you want to update the feedback comments for ${feedback?.customerName}?`}
        comment={updateComment}
        onCommentChange={setUpdateComment}
        onConfirm={confirmUpdate}
        onCancel={() => {
          setShowUpdateConfirmModal(false);
          setUpdateComment('');
        }}
        confirmButtonText="Update"
        confirmButtonColor="primary"
        isCommentRequired={true}
      />

      {/* Reject Confirmation Modal */}
      <ConfirmationModal
        isOpen={showRejectConfirmModal}
        title="Reject Feedback"
        message={`Are you sure you want to reject this feedback from ${feedback?.customerName}? This action cannot be undone.`}
        comment={rejectComment}
        onCommentChange={setRejectComment}
        onConfirm={confirmReject}
        onCancel={() => {
          setShowRejectConfirmModal(false);
          setRejectComment('');
        }}
        confirmButtonText="Reject"
        confirmButtonColor="red"
        isCommentRequired={true}
      />
    </div>
  );
};

export default FeedbackDetail;
