import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeftIcon, 
  PencilIcon, 
  XMarkIcon, 
  ChevronDownIcon, 
  ChevronUpIcon,
  TrashIcon,
  CheckIcon,
  DocumentTextIcon,
  LockOpenIcon,
  DocumentIcon
} from '@heroicons/react/24/outline';
import { kitchenUserService } from '../../services/kitchens/kitchenUserService';
import PermissionButton from '../../components/PermissionButton';
import PermissionGate from '../../components/PermissionGate';
import usePermission from '../../hooks/usePermission';

const UserDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('tokens');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isInfoExpanded, setIsInfoExpanded] = useState(true);
  const { hasPermission } = usePermission();
  
  // Modal states
  const [showEditModal, setShowEditModal] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [showPinUnblockModal, setShowPinUnblockModal] = useState(false);
  const [showDeleteTokenModal, setShowDeleteTokenModal] = useState(false);
  const [newStatus, setNewStatus] = useState('');
  const [tokenToDelete, setTokenToDelete] = useState(null);
  const [deleteComment, setDeleteComment] = useState('');
  const [editForm, setEditForm] = useState({
    name: '',
    phone: '',
    email: '',
    bio: '',
    dateOfBirth: '',
    gender: ''
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const userData = await kitchenUserService.getKitchenUserById(id);
        setUser(userData);
        
        // Initialize edit form with user data
        if (userData) {
          setEditForm({
            name: userData.name || '',
            phone: userData.phone || '',
            email: userData.email || '',
            bio: userData.bio || '',
            dateOfBirth: userData.dateOfBirth || '',
            gender: userData.gender || ''
          });
        }
      } catch (err) {
        setError('Failed to load user data');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [id]);

  const handleEditClick = () => {
    setShowEditModal(true);
  };

  const handleEditFormChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedUser = await kitchenUserService.updateUserDetails(id, editForm);
      setUser(updatedUser);
      setShowEditModal(false);
    } catch (err) {
      console.error('Failed to update user:', err);
    }
  };

  const handleStatusUpdate = (newStatus) => {
    setNewStatus(newStatus);
    setShowStatusModal(true);
  };

  const confirmStatusUpdate = async () => {
    try {
      setIsLoading(true);
      const updatedUser = await kitchenUserService.updateUserStatus(id, newStatus);
      setUser(updatedUser);
      setShowStatusModal(false);
      // Show success notification
      alert(`User status updated to ${newStatus}`);
    } catch (err) {
      console.error('Failed to update user status:', err);
      alert('Failed to update user status');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePinUnblock = () => {
    setShowPinUnblockModal(true);
  };

  const confirmPinUnblock = async () => {
    try {
      setIsLoading(true);
      const updatedUser = await kitchenUserService.unblockUserPin(id);
      setUser(updatedUser);
      setShowPinUnblockModal(false);
      // Show success notification
      alert('PIN successfully unblocked');
    } catch (err) {
      console.error('Failed to unblock PIN:', err);
      alert('Failed to unblock PIN');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteToken = (tokenId) => {
    setTokenToDelete(tokenId);
    setDeleteComment('');
    setShowDeleteTokenModal(true);
  };

  const confirmDeleteToken = async () => {
    try {
      setIsLoading(true);
      const updatedUser = await kitchenUserService.deleteTrustedToken(id, tokenToDelete, deleteComment);
      setUser(updatedUser);
      setShowDeleteTokenModal(false);
      // Show success notification
      alert('Token successfully deleted');
    } catch (err) {
      console.error('Failed to delete token:', err);
      alert('Failed to delete token');
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Not specified';
    return new Date(dateString).toLocaleDateString();
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-neutral-600">Loading user details...</p>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="text-center py-10">
        <p className="text-neutral-600">User not found</p>
        <Link to="/users" className="text-primary-600 hover:text-primary-700 mt-2 inline-block">
          Return to users list
        </Link>
      </div>
    );
  }

  return (
    <div className="pb-10">
      {/* Header with back button */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center">
          <button onClick={() => navigate(-1)} className="mr-4 p-2 rounded-full hover:bg-neutral-100">
            <ArrowLeftIcon className="h-5 w-5 text-neutral-600" />
          </button>
          <h1 className="text-2xl font-medium text-neutral-900">{user.name}</h1>
        </div>
        
        <PermissionGate permission="edit_kitchen_user">
          <div className="flex space-x-2">
            {user.pinAvailable && user.pinBlocked && (
              <button
                onClick={handlePinUnblock}
                className="px-4 py-2 rounded-full text-white text-sm font-medium bg-blue-600 hover:bg-blue-700 flex items-center"
              >
                <LockOpenIcon className="h-4 w-4 mr-1" />
                Unblock PIN
              </button>
            )}
            <button
              onClick={() => handleStatusUpdate(user.status === 'active' ? 'inactive' : 'active')}
              className={`px-4 py-2 rounded-full text-white text-sm font-medium ${
                user.status === 'active' 
                  ? 'bg-red-600 hover:bg-red-700' 
                  : 'bg-green-600 hover:bg-green-700'
              }`}
            >
              {user.status === 'active' ? 'Deactivate User' : 'Activate User'}
            </button>
          </div>
        </PermissionGate>
      </div>

      {/* User Basic Information - Expandable */}
      <div className="content-section">
        <div className="section-header cursor-pointer" onClick={() => setIsInfoExpanded(!isInfoExpanded)}>
          <div className="flex items-center">
            <h2 className="section-title">User Basic Information</h2>
            {isInfoExpanded ? 
              <ChevronUpIcon className="h-5 w-5 ml-2 text-neutral-500" /> : 
              <ChevronDownIcon className="h-5 w-5 ml-2 text-neutral-500" />
            }
          </div>
          <PermissionButton
            permission="edit_kitchen_user"
            onClick={(e) => {
              e.stopPropagation();
              handleEditClick();
            }}
            className="flex items-center text-sm"
          >
            <PencilIcon className="h-4 w-4 mr-1" /> Edit
          </PermissionButton>
        </div>
        
        {isInfoExpanded && (
          <div className="info-group">
            <div className="field-group">
              <div>
                <p className="field-label">Name</p>
                <p className="field-value">{user.name}</p>
              </div>
              
              <div>
                <p className="field-label">Email</p>
                <p className="field-value">{user.email}</p>
              </div>
              
              <div>
                <p className="field-label">Phone</p>
                <p className="field-value">{user.phone || 'Not provided'}</p>
              </div>
              
              <div>
                <p className="field-label">Role</p>
                <p className="field-value">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    user.role === 'Owner' 
                      ? 'bg-purple-100 text-purple-800' 
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {user.role}
                  </span>
                </p>
              </div>
              
              <div>
                <p className="field-label">Bio</p>
                <p className="field-value">{user.bio || 'No bio available'}</p>
              </div>
              
              <div>
                <p className="field-label">Date of Birth</p>
                <p className="field-value">{formatDate(user.dateOfBirth)}</p>
              </div>
              
              <div>
                <p className="field-label">Gender</p>
                <p className="field-value">{user.gender || 'Not specified'}</p>
              </div>
              
              <div>
                <p className="field-label">PIN Available</p>
                <p className="field-value">
                  {user.pinAvailable ? (
                    <span className="inline-flex items-center text-green-600">
                      <CheckIcon className="h-4 w-4 mr-1" /> Yes
                      {user.pinBlocked && (
                        <span className="ml-2 text-red-600">(Blocked)</span>
                      )}
                    </span>
                  ) : (
                    <span className="inline-flex items-center text-red-600">
                      <XMarkIcon className="h-4 w-4 mr-1" /> No
                    </span>
                  )}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-neutral-200 mb-8 mt-8">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('tokens')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'tokens'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300'
            }`}
          >
            Trusted Tokens
          </button>
          <button
            onClick={() => setActiveTab('documents')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'documents'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300'
            }`}
          >
            Documents
          </button>
        </nav>
      </div>
      <div className="tab-content">
        {activeTab === 'tokens' && (
          <div>
            <div className="section-header">
              <h3 className="section-title">Trusted Tokens</h3>
            </div>
            
            {user.trustedTokens.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-neutral-600">No trusted tokens found for this user.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-neutral-200">
                  <thead className="bg-neutral-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                        Token
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                        Created At
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                        Expires At
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-neutral-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-neutral-200">
                    {user.trustedTokens.map((token) => (
                      <tr key={token.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-neutral-500">
                          {token.maskedToken}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                          {formatDate(token.createdAt)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                          {formatDate(token.expiresAt)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <PermissionButton
                            permission="delete_trusted_token"
                            onClick={() => handleDeleteToken(token.id)}
                            className="text-red-600 hover:text-red-900 inline-flex items-center"
                          >
                            <TrashIcon className="h-4 w-4 mr-1" />
                            Delete
                          </PermissionButton>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {activeTab === 'documents' && (
          <div>
            <div className="section-header">
              <h3 className="section-title">User Documents</h3>
            </div>
            
            {!user.documents || user.documents.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-neutral-600">No documents found for this user.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-neutral-200">
                  <thead className="bg-neutral-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                        Document
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                        Type
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                        Upload Date
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-neutral-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-neutral-200">
                    {user.documents.map((document) => (
                      <tr key={document.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <DocumentIcon className="h-5 w-5 text-neutral-400 mr-2" />
                            <span className="text-sm text-neutral-900">{document.name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                          {document.type}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            document.status === 'verified' 
                              ? 'bg-green-100 text-green-800' 
                              : document.status === 'pending'
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-red-100 text-red-800'
                          }`}>
                            {document.status.charAt(0).toUpperCase() + document.status.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                          {formatDate(document.uploadDate)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <a 
                            href={document.fileUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-primary-600 hover:text-primary-900 inline-flex items-center"
                          >
                            <DocumentTextIcon className="h-4 w-4 mr-1" />
                            View
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>

      {showEditModal && (
        <div className="fixed inset-0 bg-neutral-800 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-neutral-900">Edit User Details</h3>
              <button
                onClick={() => setShowEditModal(false)}
                className="text-neutral-400 hover:text-neutral-500"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>
            
            <form onSubmit={handleEditSubmit}>
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-neutral-700">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={editForm.name}
                    onChange={handleEditFormChange}
                    className="mt-1 block w-full border border-neutral-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-neutral-700">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={editForm.email}
                    onChange={handleEditFormChange}
                    className="mt-1 block w-full border border-neutral-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-neutral-700">
                    Phone
                  </label>
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    value={editForm.phone}
                    onChange={handleEditFormChange}
                    className="mt-1 block w-full border border-neutral-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  />
                </div>
                
                <div>
                  <label htmlFor="bio" className="block text-sm font-medium text-neutral-700">
                    Bio
                  </label>
                  <textarea
                    id="bio"
                    name="bio"
                    rows={3}
                    value={editForm.bio}
                    onChange={handleEditFormChange}
                    className="mt-1 block w-full border border-neutral-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  />
                </div>
                
                <div>
                  <label htmlFor="dateOfBirth" className="block text-sm font-medium text-neutral-700">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    id="dateOfBirth"
                    name="dateOfBirth"
                    value={editForm.dateOfBirth}
                    onChange={handleEditFormChange}
                    className="mt-1 block w-full border border-neutral-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  />
                </div>
                
                <div>
                  <label htmlFor="gender" className="block text-sm font-medium text-neutral-700">
                    Gender
                  </label>
                  <select
                    id="gender"
                    name="gender"
                    value={editForm.gender}
                    onChange={handleEditFormChange}
                    className="mt-1 block w-full border border-neutral-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  >
                    <option value="">Select gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                    <option value="Prefer not to say">Prefer not to say</option>
                  </select>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="px-4 py-2 border border-neutral-300 rounded-md shadow-sm text-sm font-medium text-neutral-700 bg-white hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-md text-white text-sm font-medium bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
       
      </div>
      )}
      {showStatusModal && (
        <div className="fixed inset-0 bg-neutral-800 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6">
            <div className="mb-4">
              <h3 className="text-lg font-medium text-neutral-900">
                {newStatus === 'active' ? 'Activate User' : 'Deactivate User'}
              </h3>
              <p className="text-sm text-neutral-500 mt-1">
                {newStatus === 'active'
                  ? 'This will allow the user to access the kitchen and perform actions.'
                  : 'This will prevent the user from accessing the kitchen and performing actions.'}
              </p>
            </div>
            
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setShowStatusModal(false)}
                className="px-4 py-2 border border-neutral-300 rounded-md shadow-sm text-sm font-medium text-neutral-700 bg-white hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                Cancel
              </button>
              <button
                onClick={confirmStatusUpdate}
                className={`px-4 py-2 rounded-md text-white text-sm font-medium ${
                  newStatus === 'active'
                    ? 'bg-green-600 hover:bg-green-700'
                    : 'bg-red-600 hover:bg-red-700'
                }`}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* PIN Unblock Modal */}
      {showPinUnblockModal && (
        <div className="fixed inset-0 bg-neutral-800 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6">
            <div className="mb-4">
              <h3 className="text-lg font-medium text-neutral-900">
                Unblock User PIN
              </h3>
              <p className="text-sm text-neutral-500 mt-1">
                This will unblock the user's PIN, allowing them to use PIN authentication again. Are you sure you want to continue?
              </p>
            </div>
            
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setShowPinUnblockModal(false)}
                className="px-4 py-2 border border-neutral-300 rounded-md shadow-sm text-sm font-medium text-neutral-700 bg-white hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                Cancel
              </button>
              <button
                onClick={confirmPinUnblock}
                className="px-4 py-2 rounded-md text-white text-sm font-medium bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Unblock PIN
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Token Modal */}
      {showDeleteTokenModal && (
        <div className="fixed inset-0 bg-neutral-800 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6">
            <div className="mb-4">
              <h3 className="text-lg font-medium text-neutral-900">
                Delete Trusted Token
              </h3>
              <p className="text-sm text-neutral-500 mt-1">
                Are you sure you want to delete this trusted token? This action cannot be undone.
              </p>
            </div>
            
            <div className="mt-4">
              <label htmlFor="deleteComment" className="block text-sm font-medium text-neutral-700">
                Reason for deletion (optional)
              </label>
              <textarea
                id="deleteComment"
                rows={3}
                value={deleteComment}
                onChange={(e) => setDeleteComment(e.target.value)}
                className="mt-1 block w-full border border-neutral-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                placeholder="Enter reason for deletion"
              />
            </div>
            
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteTokenModal(false)}
                className="px-4 py-2 border border-neutral-300 rounded-md shadow-sm text-sm font-medium text-neutral-700 bg-white hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                Cancel
              </button>
              <button
                onClick={confirmDeleteToken}
                className="px-4 py-2 rounded-md text-white text-sm font-medium bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Delete Token
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDetail;
