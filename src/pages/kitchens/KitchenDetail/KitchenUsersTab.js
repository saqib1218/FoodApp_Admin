import React, { useState, useEffect, useContext } from 'react';
import { kitchenUserService } from '../../../services/kitchens/kitchenUserService';
import { useAuth } from '../../../context/useAuth';
import { PermissionButton } from '../../../components/PermissionButton';
import { KitchenContext } from './index';
import { XMarkIcon } from '@heroicons/react/24/outline';

const KitchenUsersTab = () => {
  const { id: kitchenId } = useContext(KitchenContext);
  const { hasPermission } = useAuth();
  
  // State variables
  const [kitchenUsers, setKitchenUsers] = useState([]);
  const [isLoadingUsers, setIsLoadingUsers] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newStatus, setNewStatus] = useState('');
  const [statusComment, setStatusComment] = useState('');
  const [showUnblockPinModal, setShowUnblockPinModal] = useState(false);
  const [showDeleteTokenModal, setShowDeleteTokenModal] = useState(false);
  const [selectedToken, setSelectedToken] = useState(null);
  const [showUserDocumentsModal, setShowUserDocumentsModal] = useState(false);
  const [userDocuments, setUserDocuments] = useState([]);
  const [isLoadingDocuments, setIsLoadingDocuments] = useState(false);

  // Fetch kitchen users
  useEffect(() => {
    const fetchKitchenUsers = async () => {
      try {
        setIsLoadingUsers(true);
        const users = await kitchenUserService.getKitchenUsers(kitchenId);
        setKitchenUsers(users);
      } catch (err) {
        console.error('Failed to load kitchen users:', err);
      } finally {
        setIsLoadingUsers(false);
      }
    };

    fetchKitchenUsers();
  }, [kitchenId]);

  // Handle status update
  const handleStatusUpdate = (user, status) => {
    setSelectedUser(user);
    setNewStatus(status);
    setStatusComment('');
    setShowStatusModal(true);
  };

  const confirmStatusUpdate = async () => {
    if (!statusComment.trim()) {
      alert('Please provide a comment for this status change');
      return;
    }

    try {
      setIsLoadingUsers(true);
      await kitchenUserService.updateUserStatus(selectedUser.id, newStatus, statusComment);
      
      // Refresh users list
      const users = await kitchenUserService.getKitchenUsers(kitchenId);
      setKitchenUsers(users);
      
      setShowStatusModal(false);
    } catch (err) {
      console.error('Failed to update user status:', err);
    } finally {
      setIsLoadingUsers(false);
    }
  };

  // Handle PIN unblock
  const handleUnblockPin = (user) => {
    setSelectedUser(user);
    setStatusComment('');
    setShowUnblockPinModal(true);
  };

  const confirmUnblockPin = async () => {
    if (!statusComment.trim()) {
      alert('Please provide a comment for unblocking PIN');
      return;
    }

    try {
      setIsLoadingUsers(true);
      await kitchenUserService.unblockUserPin(selectedUser.id, statusComment);
      
      // Refresh users list
      const users = await kitchenUserService.getKitchenUsers(kitchenId);
      setKitchenUsers(users);
      
      setShowUnblockPinModal(false);
    } catch (err) {
      console.error('Failed to unblock user PIN:', err);
    } finally {
      setIsLoadingUsers(false);
    }
  };

  // Handle token deletion
  const handleDeleteToken = (token, user) => {
    setSelectedUser(user);
    setSelectedToken(token);
    setStatusComment('');
    setShowDeleteTokenModal(true);
  };

  const confirmDeleteToken = async () => {
    if (!statusComment.trim()) {
      alert('Please provide a comment for deleting this token');
      return;
    }

    try {
      setIsLoadingUsers(true);
      await kitchenUserService.deleteUserToken(selectedUser.id, selectedToken.id, statusComment);
      
      // Refresh users list
      const users = await kitchenUserService.getKitchenUsers(kitchenId);
      setKitchenUsers(users);
      
      setShowDeleteTokenModal(false);
    } catch (err) {
      console.error('Failed to delete user token:', err);
    } finally {
      setIsLoadingUsers(false);
    }
  };

  // Handle view documents
  const handleViewDocuments = async (user) => {
    setSelectedUser(user);
    setShowUserDocumentsModal(true);
    
    try {
      setIsLoadingDocuments(true);
      const documents = await kitchenUserService.getUserDocuments(user.id);
      setUserDocuments(documents);
    } catch (err) {
      console.error('Failed to load user documents:', err);
    } finally {
      setIsLoadingDocuments(false);
    }
  };

  // Get status badge
  const getUserStatusBadge = (status) => {
    switch (status) {
      case 'active':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            Active
          </span>
        );
      case 'pending':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            Pending
          </span>
        );
      case 'suspended':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
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

  if (isLoadingUsers) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h3 className="text-lg font-medium text-neutral-900">Kitchen Users</h3>
        <p className="mt-1 text-sm text-neutral-500">
          Manage users associated with this kitchen.
        </p>
      </div>

      {kitchenUsers.length === 0 ? (
        <div className="text-center py-12 bg-neutral-50 rounded-lg">
          <p className="text-neutral-500">No users found for this kitchen.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-neutral-200">
            <thead className="bg-neutral-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  User
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Role
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  PIN Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Trusted Devices
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-neutral-200">
              {kitchenUsers.map((user) => (
                <tr key={user.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-neutral-200 flex items-center justify-center">
                        {user.name.charAt(0)}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-neutral-900">{user.name}</div>
                        <div className="text-sm text-neutral-500">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-neutral-900">{user.role}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getUserStatusBadge(user.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {user.pinBlocked ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        Blocked
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Active
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-neutral-900">
                      {user.trustedTokens?.length || 0} devices
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      {hasPermission('view_user_documents') && (
                        <button
                          onClick={() => handleViewDocuments(user)}
                          className="text-primary-600 hover:text-primary-900"
                        >
                          Documents
                        </button>
                      )}
                      
                      {hasPermission('edit_kitchen_user') && user.status !== 'active' && (
                        <button
                          onClick={() => handleStatusUpdate(user, 'active')}
                          className="text-green-600 hover:text-green-900"
                        >
                          Activate
                        </button>
                      )}
                      
                      {hasPermission('edit_kitchen_user') && user.status !== 'suspended' && (
                        <button
                          onClick={() => handleStatusUpdate(user, 'suspended')}
                          className="text-red-600 hover:text-red-900"
                        >
                          Suspend
                        </button>
                      )}
                      
                      {hasPermission('edit_kitchen_user') && user.pinBlocked && (
                        <button
                          onClick={() => handleUnblockPin(user)}
                          className="text-yellow-600 hover:text-yellow-900"
                        >
                          Unblock PIN
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

      {/* Status Update Modal */}
      {showStatusModal && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6">
            <div className="mb-4">
              <h3 className="text-lg font-medium text-neutral-900">
                {newStatus === 'active' 
                  ? `Activate ${selectedUser.name}` 
                  : newStatus === 'suspended'
                  ? `Suspend ${selectedUser.name}`
                  : `Update ${selectedUser.name}'s Status`
                }
              </h3>
              <p className="text-sm text-neutral-500 mt-1">
                {newStatus === 'active' 
                  ? 'This will allow the user to access the kitchen account.' 
                  : newStatus === 'suspended'
                  ? 'This will prevent the user from accessing the kitchen account.'
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
                className="w-full p-3 border border-neutral-300 rounded-xl focus:ring-primary-500 focus:border-primary-500"
                rows="3"
                placeholder="Enter your comments here..."
              />
            </div>
            <div className="flex justify-end space-x-3 mt-4">
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

      {/* Unblock PIN Modal */}
      {showUnblockPinModal && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6">
            <div className="mb-4">
              <h3 className="text-lg font-medium text-neutral-900">
                Unblock PIN for {selectedUser.name}
              </h3>
              <p className="text-sm text-neutral-500 mt-1">
                This will reset the PIN attempt counter and allow the user to use their PIN again.
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Comment (Required)
              </label>
              <textarea
                value={statusComment}
                onChange={(e) => setStatusComment(e.target.value)}
                className="w-full p-3 border border-neutral-300 rounded-xl focus:ring-primary-500 focus:border-primary-500"
                rows="3"
                placeholder="Enter your comments here..."
              />
            </div>
            <div className="flex justify-end space-x-3 mt-4">
              <button
                onClick={() => setShowUnblockPinModal(false)}
                className="px-4 py-2 bg-white border border-neutral-300 text-neutral-700 rounded-full hover:bg-neutral-50 transition-colors text-sm font-medium"
              >
                Cancel
              </button>
              <button
                onClick={confirmUnblockPin}
                className="px-4 py-2 bg-yellow-600 text-white rounded-full hover:bg-yellow-700 transition-colors text-sm font-medium"
              >
                Unblock PIN
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Token Modal */}
      {showDeleteTokenModal && selectedUser && selectedToken && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6">
            <div className="mb-4">
              <h3 className="text-lg font-medium text-neutral-900">
                Delete Trusted Device
              </h3>
              <p className="text-sm text-neutral-500 mt-1">
                This will remove the trusted device from {selectedUser.name}'s account. The user will need to verify their identity again when logging in from this device.
              </p>
            </div>
            <div className="mb-4">
              <h4 className="text-sm font-medium text-neutral-700">Device Details:</h4>
              <div className="mt-2 bg-neutral-50 p-3 rounded-lg">
                <p className="text-sm"><span className="font-medium">Device:</span> {selectedToken.device}</p>
                <p className="text-sm"><span className="font-medium">Last Used:</span> {new Date(selectedToken.lastUsed).toLocaleString()}</p>
                <p className="text-sm"><span className="font-medium">Location:</span> {selectedToken.location}</p>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Comment (Required)
              </label>
              <textarea
                value={statusComment}
                onChange={(e) => setStatusComment(e.target.value)}
                className="w-full p-3 border border-neutral-300 rounded-xl focus:ring-primary-500 focus:border-primary-500"
                rows="3"
                placeholder="Enter your comments here..."
              />
            </div>
            <div className="flex justify-end space-x-3 mt-4">
              <button
                onClick={() => setShowDeleteTokenModal(false)}
                className="px-4 py-2 bg-white border border-neutral-300 text-neutral-700 rounded-full hover:bg-neutral-50 transition-colors text-sm font-medium"
              >
                Cancel
              </button>
              <button
                onClick={confirmDeleteToken}
                className="px-4 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors text-sm font-medium"
              >
                Delete Device
              </button>
            </div>
          </div>
        </div>
      )}

      {/* User Documents Modal */}
      {showUserDocumentsModal && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg max-w-2xl w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-neutral-900">
                {selectedUser.name}'s Documents
              </h3>
              <button
                onClick={() => setShowUserDocumentsModal(false)}
                className="text-neutral-500 hover:text-neutral-700"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>
            
            {isLoadingDocuments ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-500"></div>
              </div>
            ) : userDocuments.length === 0 ? (
              <div className="text-center py-12 bg-neutral-50 rounded-lg">
                <p className="text-neutral-500">No documents found for this user.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {userDocuments.map((doc) => (
                  <div key={doc.id} className="border border-neutral-200 rounded-lg overflow-hidden">
                    <div className="aspect-w-16 aspect-h-9 bg-neutral-100">
                      <img 
                        src={doc.url} 
                        alt={doc.type} 
                        className="object-cover w-full h-full"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = 'https://via.placeholder.com/300x200?text=Document+Preview+Not+Available';
                        }}
                      />
                    </div>
                    <div className="p-4">
                      <h4 className="font-medium text-neutral-900">{doc.type}</h4>
                      <p className="text-sm text-neutral-500">Uploaded: {new Date(doc.uploadDate).toLocaleDateString()}</p>
                      <p className="text-sm text-neutral-500">Status: {doc.status}</p>
                      <div className="mt-2">
                        <a 
                          href={doc.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-primary-600 hover:text-primary-900 text-sm font-medium"
                        >
                          View Full Size
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default KitchenUsersTab;
