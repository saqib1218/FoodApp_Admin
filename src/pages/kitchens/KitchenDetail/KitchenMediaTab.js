import React, { useState, useEffect, useContext } from 'react';
import { XMarkIcon, PlusIcon, PencilIcon, EyeIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../../../hooks/useAuth';
// TODO: Replace with RTK Query hooks when migrating API calls
import { getKitchenMedia } from '../../../data/kitchens/mockKitchenMedia';
import { KitchenContext } from './index';
import ConfirmationModal from '../../../components/ConfirmationModal';

const KitchenMediaTab = () => {
  const { id: kitchenId } = useContext(KitchenContext);
  const { hasPermission } = useAuth();
  
  // State variables
  const [kitchenMedia, setKitchenMedia] = useState([]);
  const [isLoadingMedia, setIsLoadingMedia] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [showAddMediaModal, setShowAddMediaModal] = useState(false);
  const [showImagePreviewModal, setShowImagePreviewModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showUpdateConfirmModal, setShowUpdateConfirmModal] = useState(false);
  const [newMediaFile, setNewMediaFile] = useState(null);
  const [newMediaType, setNewMediaType] = useState('image');
  const [newMediaUsedAs, setNewMediaUsedAs] = useState('banner');
  const [newMediaCaption, setNewMediaCaption] = useState('');
  const [newMediaPreview, setNewMediaPreview] = useState('');
  const [confirmComment, setConfirmComment] = useState('');
  const [deleteComment, setDeleteComment] = useState('');
  const [updateComment, setUpdateComment] = useState('');

  // Fetch kitchen media
  useEffect(() => {
    const fetchKitchenMedia = () => {
      try {
        setIsLoadingMedia(true);
        // Get media for current kitchen
        const mediaData = getKitchenMedia(kitchenId);
        setKitchenMedia(mediaData);
      } catch (err) {
        console.error('Failed to load kitchen media:', err);
      } finally {
        setIsLoadingMedia(false);
      }
    };

    fetchKitchenMedia();
  }, [kitchenId]);

  // Handle image preview
  const handleImagePreview = (image) => {
    setSelectedImage(image);
    setShowImagePreviewModal(true);
  };

  // Handle media file change
  const handleMediaFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewMediaFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewMediaPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle add media
  const handleAddMedia = () => {
    setNewMediaFile(null);
    setNewMediaPreview('');
    setNewMediaType('image');
    setNewMediaUsedAs('banner');
    setNewMediaCaption('');
    setShowAddMediaModal(true);
  };

  // Handle media type change
  const handleMediaTypeChange = (type) => {
    setNewMediaType(type);
    if (type === 'video' || type === 'audio') {
      setNewMediaUsedAs('standard');
    } else {
      setNewMediaUsedAs('banner');
    }
  };

  // Handle submit add media
  const handleSubmitAddMedia = () => {
    if (!newMediaFile) {
      alert('Please select a media file');
      return;
    }
    setShowAddMediaModal(false);
    setConfirmComment('');
    setShowConfirmModal(true);
  };

  // Confirm add media
  const confirmAddMedia = async () => {
    try {
      setIsLoadingMedia(true);
      
      // Create new media object
      const newMedia = {
        id: Date.now(), // Temporary ID
        url: newMediaPreview,
        type: newMediaType,
        mediaUsedAs: newMediaUsedAs,
        caption: newMediaCaption,
        status: 'pending for approval',
        uploadDate: new Date().toISOString()
      };
      
      // Add to kitchen media list
      setKitchenMedia([...kitchenMedia, newMedia]);
      
      setShowConfirmModal(false);
      // Reset form
      setNewMediaFile(null);
      setNewMediaPreview('');
      setNewMediaType('image');
      setNewMediaUsedAs('banner');
      setNewMediaCaption('');
      setConfirmComment('');
    } catch (err) {
      console.error('Failed to add kitchen media:', err);
    } finally {
      setIsLoadingMedia(false);
    }
  };

  // Handle edit media
  const handleEditMedia = (media) => {
    // Set the media to edit
    setSelectedMedia(media);
    setNewMediaType(media.type);
    setNewMediaUsedAs(media.mediaUsedAs || 'banner');
    setNewMediaCaption(media.caption || '');
    setNewMediaPreview(media.url);
    setShowAddMediaModal(true);
  };

  // Handle delete media
  const handleDeleteMedia = (media) => {
    setSelectedMedia(media);
    setShowDeleteModal(true);
  };

  // Handle confirm delete media
  const handleConfirmDeleteMedia = () => {
    // Remove media from local state
    setKitchenMedia(kitchenMedia.filter(media => media.id !== selectedMedia.id));
    setShowDeleteModal(false);
    setSelectedMedia(null);
    setDeleteComment('');
  };

  // Handle confirm update media
  const handleConfirmUpdateMedia = () => {
    // Update media in local state
    const updatedMedia = {
      ...selectedMedia,
      type: newMediaType,
      mediaUsedAs: newMediaUsedAs,
      caption: newMediaCaption,
      url: newMediaPreview || selectedMedia.url
    };

    setKitchenMedia(kitchenMedia.map(media => 
      media.id === selectedMedia.id ? updatedMedia : media
    ));

    // Close all modals and reset state
    setShowUpdateConfirmModal(false);
    setShowAddMediaModal(false);
    setSelectedMedia(null);
    setNewMediaFile(null);
    setNewMediaType('image');
    setNewMediaUsedAs('banner');
    setNewMediaCaption('');
    setNewMediaPreview(null);
    setUpdateComment('');
  };

  // Handle cancel confirmation
  const handleCancelConfirmation = () => {
    setShowConfirmModal(false);
    setConfirmComment('');
    setShowAddMediaModal(true);
  };

  // Get media status badge
  const getMediaStatusBadge = (status) => {
    switch (status) {
      case 'active':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            Active
          </span>
        );
      case 'processed':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            Processed
          </span>
        );
      case 'pending for approval':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            Pending for Approval
          </span>
        );
      case 'invalid':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            Invalid
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

  // Get media used display
  const getMediaUsedDisplay = (mediaUsed) => {
    switch (mediaUsed) {
      case 'banner':
        return 'Banner';
      case 'logo':
        return 'Logo';
      case 'standard':
        return 'Standard';
      default:
        return mediaUsed || 'Not specified';
    }
  };

  // Get media type display
  const getMediaTypeDisplay = (type) => {
    switch (type) {
      case 'image':
        return 'Image';
      case 'video':
        return 'Video';
      case 'audio':
        return 'Audio';
      default:
        return type || 'Image';
    }
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (isLoadingMedia) {
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
          <h3 className="text-lg font-medium text-neutral-900">Kitchen Media</h3>
          <p className="mt-1 text-sm text-neutral-500">
            Manage images and media files for this kitchen.
          </p>
        </div>
        <button
          onClick={handleAddMedia}
          className="px-4 py-2 bg-primary-600 text-white rounded-full hover:bg-primary-700 transition-colors text-sm font-medium flex items-center"
        >
          <PlusIcon className="h-4 w-4 mr-1" />
          Add Media
        </button>
      </div>

      {/* Kitchen Media List */}
      <div className="bg-white rounded-lg border border-neutral-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-neutral-200">
          <h4 className="text-base font-medium text-neutral-900">Media Files</h4>
        </div>
        <div className="overflow-x-auto">
          {kitchenMedia.length === 0 ? (
            <div className="text-center py-12 bg-neutral-50">
              <p className="text-neutral-500">No media files found for this kitchen.</p>
            </div>
          ) : (
            <table className="min-w-full divide-y divide-neutral-200">
              <thead className="bg-neutral-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Preview
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Media Used As
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Caption
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-neutral-200">
                {kitchenMedia.map((media) => (
                  <tr key={media.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div 
                        className="h-12 w-16 bg-neutral-100 rounded cursor-pointer"
                        onClick={() => handleImagePreview(media)}
                      >
                        <img
                          src={media.url}
                          alt={media.type}
                          className="h-full w-full object-cover rounded"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = 'https://via.placeholder.com/160x120?text=Media+Not+Available';
                          }}
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getMediaStatusBadge(media.status || 'active')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {getMediaTypeDisplay(media.type || 'image')}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-neutral-100 text-neutral-800">
                        {getMediaUsedDisplay(media.mediaUsedAs || 'banner')}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-neutral-900 max-w-xs truncate">
                        {media.caption || '-'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => handleEditMedia(media)}
                          className="text-blue-600 hover:text-blue-900 transition-colors"
                          title="Edit media"
                        >
                          <PencilIcon className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleImagePreview(media)}
                          className="text-green-600 hover:text-green-900 transition-colors"
                          title="View media"
                        >
                          <EyeIcon className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteMedia(media)}
                          className="text-red-600 hover:text-red-900 transition-colors"
                          title="Delete media"
                        >
                          <TrashIcon className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Add Media Modal */}
      {showAddMediaModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg max-w-md w-full max-h-[90vh] flex flex-col">
            <div className="flex justify-between items-center mb-4 p-6 pb-0">
              <h3 className="text-lg font-medium text-neutral-900">
                {selectedMedia ? 'Edit Media' : 'Add Media'}
              </h3>
              <button
                onClick={() => setShowAddMediaModal(false)}
                className="text-neutral-500 hover:text-neutral-700"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Media Type
                  </label>
                  <select
                    value={newMediaType}
                    onChange={(e) => handleMediaTypeChange(e.target.value)}
                    className="w-full p-2 border border-neutral-300 rounded-lg"
                  >
                    <option value="image">Image</option>
                    <option value="video">Video</option>
                    <option value="audio">Audio</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Media Used As
                  </label>
                  <select
                    value={newMediaUsedAs}
                    onChange={(e) => setNewMediaUsedAs(e.target.value)}
                    className="w-full p-2 border border-neutral-300 rounded-lg"
                    disabled={newMediaType === 'video' || newMediaType === 'audio'}
                  >
                    {newMediaType === 'image' ? (
                      <>
                        <option value="banner">Banner</option>
                        <option value="logo">Logo</option>
                        <option value="standard">Standard</option>
                      </>
                    ) : (
                      <option value="standard">Standard</option>
                    )}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Media File
                  </label>
                  <input
                    type="file"
                    accept={newMediaType === 'image' ? 'image/*' : newMediaType === 'video' ? 'video/*' : 'audio/*'}
                    onChange={handleMediaFileChange}
                    className="w-full p-2 border border-neutral-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Caption (Optional)
                  </label>
                  <input
                    type="text"
                    value={newMediaCaption}
                    onChange={(e) => setNewMediaCaption(e.target.value)}
                    className="w-full p-2 border border-neutral-300 rounded-lg"
                    placeholder="Enter a caption for this media"
                  />
                </div>
                {newMediaPreview && (
                  <div>
                    <h4 className="text-sm font-medium text-neutral-700 mb-2">Preview:</h4>
                    <div className="rounded-lg overflow-hidden bg-neutral-100">
                      <img
                        src={newMediaPreview}
                        alt="Media Preview"
                        className="max-h-48 mx-auto"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="flex justify-end space-x-3 p-6 pt-4 border-t border-neutral-200">
              <button
                onClick={() => setShowAddMediaModal(false)}
                className="px-4 py-2 bg-white border border-neutral-300 text-neutral-700 rounded-full hover:bg-neutral-50 transition-colors text-sm font-medium"
              >
                Cancel
              </button>
              <button
                onClick={() => selectedMedia ? setShowUpdateConfirmModal(true) : handleSubmitAddMedia()}
                className="px-4 py-2 bg-primary-600 text-white rounded-full hover:bg-primary-700 transition-colors text-sm font-medium"
              >
                {selectedMedia ? 'Update Media' : 'Add Media'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Image Preview Modal */}
      {showImagePreviewModal && selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="w-[20vw] max-h-[90vh] flex flex-col">
            <div className="flex justify-end mb-2">
              <button
                onClick={() => setShowImagePreviewModal(false)}
                className="text-white hover:text-neutral-300 bg-black bg-opacity-50 rounded-full p-2"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            <div className="bg-white rounded-xl overflow-hidden flex-1 flex flex-col">
              <div className="flex-1 flex items-center justify-center bg-neutral-50 p-4" style={{ minHeight: '60vh', maxHeight: '70vh' }}>
                <img
                  src={selectedImage.url}
                  alt={selectedImage.type}
                  className="max-w-full max-h-full object-contain"
                  
                />
              </div>
              <div className="p-4 bg-white">
                <div className="flex justify-between items-center">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-neutral-100 text-neutral-800">
                    {getMediaUsedDisplay(selectedImage.mediaUsedAs || 'banner')}
                  </span>
                  <span className="text-sm text-neutral-500">
                    Status: {selectedImage.status || 'Active'}
                  </span>
                </div>
                {selectedImage.caption && (
                  <p className="mt-2 text-neutral-700">{selectedImage.caption}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={showConfirmModal}
        title="Add Media"
        message={`Are you sure you want to add this ${newMediaType} file to the kitchen media?`}
        comment={confirmComment}
        onCommentChange={setConfirmComment}
        onConfirm={confirmAddMedia}
        onCancel={handleCancelConfirmation}
        confirmButtonText="Add Media"
        confirmButtonColor="primary"
        isCommentRequired={true}
      />

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedMedia && (
        <ConfirmationModal
          isOpen={showDeleteModal}
          title="Delete Media"
          message={`Are you sure you want to permanently delete this media file? This action cannot be undone.`}
          confirmText="Delete"
          cancelText="Cancel"
          onConfirm={handleConfirmDeleteMedia}
          onCancel={() => {
            setShowDeleteModal(false);
            setSelectedMedia(null);
            setDeleteComment('');
          }}
          comment={deleteComment}
          onCommentChange={setDeleteComment}
          variant="danger"
        />
      )}

      {/* Update Confirmation Modal */}
      {showUpdateConfirmModal && selectedMedia && (
        <ConfirmationModal
          isOpen={showUpdateConfirmModal}
          title="Update Media"
          message={`Are you sure you want to update this media file? Please provide a comment for this change.`}
          confirmText="Update"
          cancelText="Cancel"
          onConfirm={handleConfirmUpdateMedia}
          onCancel={() => {
            setShowUpdateConfirmModal(false);
            setUpdateComment('');
          }}
          comment={updateComment}
          onCommentChange={setUpdateComment}
          variant="primary"
        />
      )}
    </div>
  );
};

export default KitchenMediaTab;
