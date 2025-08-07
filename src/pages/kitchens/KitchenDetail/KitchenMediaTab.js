import React, { useState, useEffect, useContext } from 'react';
import { XMarkIcon, PlusIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../../../context/useAuth';
import { kitchenMediaService } from '../../../services/kitchens/kitchenMediaService';
import { KitchenContext } from './index';
import PermissionButton from '../../../components/PermissionButton';

const KitchenMediaTab = () => {
  const { id: kitchenId } = useContext(KitchenContext);
  const { hasPermission } = useAuth();
  
  // State variables
  const [kitchenMedia, setKitchenMedia] = useState([]);
  const [isLoadingMedia, setIsLoadingMedia] = useState(false);
  const [showImagePreviewModal, setShowImagePreviewModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showAddMediaModal, setShowAddMediaModal] = useState(false);
  const [newMediaFile, setNewMediaFile] = useState(null);
  const [newMediaType, setNewMediaType] = useState('gallery');
  const [newMediaCaption, setNewMediaCaption] = useState('');
  const [newMediaPreview, setNewMediaPreview] = useState('');

  // Fetch kitchen media
  useEffect(() => {
    const fetchKitchenMedia = async () => {
      try {
        setIsLoadingMedia(true);
        const media = await kitchenMediaService.getKitchenMedia(kitchenId);
        setKitchenMedia(media);
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
    setNewMediaType('gallery');
    setNewMediaCaption('');
    setShowAddMediaModal(true);
  };

  // Confirm add media
  const confirmAddMedia = async () => {
    if (!newMediaFile) {
      alert('Please select a media file');
      return;
    }

    try {
      setIsLoadingMedia(true);
      await kitchenMediaService.addKitchenMedia(kitchenId, {
        file: newMediaFile,
        type: newMediaType,
        caption: newMediaCaption
      });
      
      // Refresh media
      const media = await kitchenMediaService.getKitchenMedia(kitchenId);
      setKitchenMedia(media);
      
      setShowAddMediaModal(false);
    } catch (err) {
      console.error('Failed to add kitchen media:', err);
    } finally {
      setIsLoadingMedia(false);
    }
  };

  // Get media type display
  const getMediaTypeDisplay = (type) => {
    switch (type) {
      case 'logo':
        return 'Logo';
      case 'cover':
        return 'Cover Photo';
      case 'menu':
        return 'Menu';
      case 'gallery':
        return 'Gallery';
      default:
        return type;
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
        <PermissionButton
          permission="edit_kitchen"
          onClick={handleAddMedia}
          className="px-4 py-2 bg-primary-600 text-white rounded-full hover:bg-primary-700 transition-colors text-sm font-medium flex items-center"
        >
          <PlusIcon className="h-4 w-4 mr-1" />
          Add Media
        </PermissionButton>
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
                    Type
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Caption
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Uploaded
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Size
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
                            e.target.src = 'https://via.placeholder.com/160x120?text=Image+Not+Available';
                          }}
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-neutral-100 text-neutral-800">
                        {getMediaTypeDisplay(media.type)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-neutral-900 max-w-xs truncate">
                        {media.caption || '-'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                      {formatDate(media.uploadDate)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                      {media.size ? `${Math.round(media.size / 1024)} KB` : 'Unknown'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleImagePreview(media)}
                        className="text-primary-600 hover:text-primary-900 mr-4"
                      >
                        View
                      </button>
                      <PermissionButton
                        permission="edit_kitchen"
                        onClick={() => {/* Delete functionality would go here */}}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </PermissionButton>
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
          <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-neutral-900">
                Add Media
              </h3>
              <button
                onClick={() => setShowAddMediaModal(false)}
                className="text-neutral-500 hover:text-neutral-700"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Media Type
              </label>
              <select
                value={newMediaType}
                onChange={(e) => setNewMediaType(e.target.value)}
                className="w-full p-2 border border-neutral-300 rounded-lg"
              >
                <option value="gallery">Gallery Image</option>
                <option value="menu">Menu Image</option>
                <option value="cover">Cover Photo</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Media File
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleMediaFileChange}
                className="w-full p-2 border border-neutral-300 rounded-lg"
              />
            </div>
            <div className="mb-4">
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
              <div className="mb-4">
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
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowAddMediaModal(false)}
                className="px-4 py-2 bg-white border border-neutral-300 text-neutral-700 rounded-full hover:bg-neutral-50 transition-colors text-sm font-medium"
              >
                Cancel
              </button>
              <button
                onClick={confirmAddMedia}
                className="px-4 py-2 bg-primary-600 text-white rounded-full hover:bg-primary-700 transition-colors text-sm font-medium"
              >
                Add Media
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Image Preview Modal */}
      {showImagePreviewModal && selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="max-w-4xl w-full">
            <div className="flex justify-end mb-2">
              <button
                onClick={() => setShowImagePreviewModal(false)}
                className="text-white hover:text-neutral-300"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            <div className="bg-white rounded-xl overflow-hidden">
              <img
                src={selectedImage.url}
                alt={selectedImage.type}
                className="w-full h-auto"
              />
              <div className="p-4">
                <div className="flex justify-between items-center">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-neutral-100 text-neutral-800">
                    {getMediaTypeDisplay(selectedImage.type)}
                  </span>
                  <span className="text-sm text-neutral-500">
                    Uploaded on {formatDate(selectedImage.uploadDate)}
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
    </div>
  );
};

export default KitchenMediaTab;
