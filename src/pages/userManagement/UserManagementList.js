import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeftIcon, EnvelopeIcon, PhoneIcon, XMarkIcon, PlusIcon, PencilIcon, TrashIcon, EyeIcon, EyeSlashIcon, KeyIcon } from '@heroicons/react/24/outline';
import ConfirmationModal from '../../components/ConfirmationModal';

const UserManagementList = () => {
  const [activeTab, setActiveTab] = useState('role');
  const [isLoading, setIsLoading] = useState(false);

  // Role management state
  const [roles, setRoles] = useState([]);
  const [showCreateRoleModal, setShowCreateRoleModal] = useState(false);
  const [showAssignPermissionsModal, setShowAssignPermissionsModal] = useState(false);
  const [roleForm, setRoleForm] = useState({
    title: '',
    status: 'active'
  });

  // User management state
  const [users, setUsers] = useState([]);
  const [showCreateUserModal, setShowCreateUserModal] = useState(false);
  const [showEditUserModal, setShowEditUserModal] = useState(false);
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [userForm, setUserForm] = useState({
    username: '',
    email: '',
    password: '',
    mobileNumber: '',
    roleId: '',
    status: 'active'
  });
  const [passwordForm, setPasswordForm] = useState({
    newPassword: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);

  // Permission management state
  const [allPermissions, setAllPermissions] = useState([
    { id: 1, name: 'view_kitchens', label: 'View Kitchens', scope: 'Kitchen Management', description: 'Allow viewing kitchen information and details' },
    { id: 2, name: 'edit_kitchens', label: 'Edit Kitchens', scope: 'Kitchen Management', description: 'Allow editing kitchen information and settings' },
    { id: 3, name: 'delete_kitchens', label: 'Delete Kitchens', scope: 'Kitchen Management', description: 'Allow deleting kitchen records' },
    { id: 4, name: 'view_orders', label: 'View Orders', scope: 'Order Management', description: 'Allow viewing order information and history' },
    { id: 5, name: 'edit_orders', label: 'Edit Orders', scope: 'Order Management', description: 'Allow editing order details and status' },
    { id: 6, name: 'view_customers', label: 'View Customers', scope: 'Customer Management', description: 'Allow viewing customer profiles and information' },
    { id: 7, name: 'edit_customers', label: 'Edit Customers', scope: 'Customer Management', description: 'Allow editing customer information' },
    { id: 8, name: 'view_partners', label: 'View Partners', scope: 'Partner Management', description: 'Allow viewing partner information and profiles' },
    { id: 9, name: 'edit_partners', label: 'Edit Partners', scope: 'Partner Management', description: 'Allow editing partner information and settings' },
    { id: 10, name: 'send_broadcast', label: 'Send Broadcast', scope: 'Communication', description: 'Allow sending broadcast messages to users' },
    { id: 11, name: 'view_reports', label: 'View Reports', scope: 'Analytics', description: 'Allow viewing system reports and analytics' },
    { id: 12, name: 'manage_users', label: 'Manage Users', scope: 'User Management', description: 'Allow managing user accounts and permissions' }
  ]);
  const [availablePermissions, setAvailablePermissions] = useState([]);
  const [assignedPermissions, setAssignedPermissions] = useState([]);
  const [draggedPermission, setDraggedPermission] = useState(null);
  const [showCreatePermissionModal, setShowCreatePermissionModal] = useState(false);
  const [permissionForm, setPermissionForm] = useState({
    name: '',
    scope: '',
    description: ''
  });

  // Confirmation modal state
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [confirmationAction, setConfirmationAction] = useState('');
  const [pendingAction, setPendingAction] = useState(null);
  const [confirmationComment, setConfirmationComment] = useState('');

  // Initialize available permissions from all permissions
  useEffect(() => {
    setAvailablePermissions(allPermissions);
  }, [allPermissions]);

  // Handle role creation
  const handleCreateRole = () => {
    setRoleForm({ title: '', status: 'active' });
    setAssignedPermissions([]);
    setShowCreateRoleModal(true);
  };

  const handleAssignPermissions = () => {
    setShowAssignPermissionsModal(true);
  };

  const handleSaveRole = () => {
    if (roleForm.title.trim() && assignedPermissions.length > 0) {
      const newRole = {
        id: Date.now(),
        title: roleForm.title,
        status: roleForm.status,
        permissions: assignedPermissions,
        createdDate: new Date().toISOString().split('T')[0]
      };
      setRoles(prev => [...prev, newRole]);
      setShowCreateRoleModal(false);
      setShowAssignPermissionsModal(false);
      setRoleForm({ title: '', status: 'active' });
      setAssignedPermissions([]);
    }
  };

  const handleCancelRole = () => {
    setShowCreateRoleModal(false);
    setShowAssignPermissionsModal(false);
    setRoleForm({ title: '', status: 'active' });
    setAssignedPermissions([]);
  };

  const handleDeleteRole = (roleId) => {
    const role = roles.find(r => r.id === roleId);
    setConfirmationAction('delete_role');
    setPendingAction({ roleId, roleName: role.title });
    setShowConfirmationModal(true);
    setConfirmationComment('');
  };

  // User management handlers
  const handleCreateUser = () => {
    setUserForm({ username: '', email: '', password: '', mobileNumber: '', roleId: '', status: 'active' });
    setShowCreateUserModal(true);
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setUserForm({
      username: user.username,
      email: user.email,
      mobileNumber: user.mobileNumber || '',
      roleId: user.roleId,
      status: user.status,
      password: '' // Don't populate password for editing
    });
    setShowEditUserModal(true);
  };

  const handleChangePassword = (user) => {
    setEditingUser(user);
    setPasswordForm({
      newPassword: '',
      confirmPassword: ''
    });
    setShowChangePasswordModal(true);
  };

  const handleSaveUser = () => {
    if (userForm.username && userForm.email && userForm.password && userForm.roleId) {
      const selectedRole = roles.find(role => role.id === parseInt(userForm.roleId));
      const newUser = {
        id: Date.now(),
        username: userForm.username,
        email: userForm.email,
        mobileNumber: userForm.mobileNumber,
        roleId: parseInt(userForm.roleId),
        role: selectedRole,
        status: userForm.status,
        createdAt: new Date().toISOString()
      };
      setUsers([...users, newUser]);
      setShowCreateUserModal(false);
      setUserForm({ username: '', email: '', password: '', mobileNumber: '', roleId: '', status: 'active' });
    }
  };

  const handleUpdateUser = () => {
    if (userForm.username && userForm.email && userForm.roleId && editingUser) {
      const selectedRole = roles.find(role => role.id === parseInt(userForm.roleId));
      const updatedUsers = users.map(user => 
        user.id === editingUser.id 
          ? {
              ...user,
              username: userForm.username,
              email: userForm.email,
              mobileNumber: userForm.mobileNumber,
              roleId: parseInt(userForm.roleId),
              role: selectedRole,
              status: userForm.status
            }
          : user
      );
      setUsers(updatedUsers);
      setShowEditUserModal(false);
      setEditingUser(null);
      setUserForm({ username: '', email: '', password: '', mobileNumber: '', roleId: '', status: 'active' });
    }
  };

  const handleUpdatePassword = () => {
    // Validate passwords
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert('New passwords do not match');
      return;
    }
    
    if (passwordForm.newPassword.length < 6) {
      alert('New password must be at least 6 characters long');
      return;
    }

    // Here you would typically make an API call to update the password
    // For now, we'll just show a success message
    alert('Password updated successfully');
    setShowChangePasswordModal(false);
    setEditingUser(null);
    setPasswordForm({
      newPassword: '',
      confirmPassword: ''
    });
  };

  const handleCancelUser = () => {
    setShowCreateUserModal(false);
    setUserForm({ username: '', email: '', password: '', roleId: '', status: 'active' });
  };

  const handleDeleteUser = (userId) => {
    const user = users.find(u => u.id === userId);
    setConfirmationAction('delete_user');
    setPendingAction({ userId, userName: user.username });
    setShowConfirmationModal(true);
    setConfirmationComment('');
  };

  // Permission management handlers
  const handleCreatePermission = () => {
    setPermissionForm({ name: '', scope: '', description: '' });
    setShowCreatePermissionModal(true);
  };

  const handleSavePermission = () => {
    if (permissionForm.name.trim() && permissionForm.scope.trim() && permissionForm.description.trim()) {
      const newPermission = {
        id: Date.now(),
        name: permissionForm.name.toLowerCase().replace(/\s+/g, '_'),
        label: permissionForm.name,
        scope: permissionForm.scope,
        description: permissionForm.description
      };
      setAllPermissions(prev => [...prev, newPermission]);
      setShowCreatePermissionModal(false);
      setPermissionForm({ name: '', scope: '', description: '' });
    }
  };

  const handleCancelPermission = () => {
    setShowCreatePermissionModal(false);
    setPermissionForm({ name: '', scope: '', description: '' });
  };

  const handleDeletePermission = (permissionId) => {
    const permission = allPermissions.find(p => p.id === permissionId);
    setConfirmationAction('delete_permission');
    setPendingAction({ permissionId, permissionName: permission.label });
    setShowConfirmationModal(true);
    setConfirmationComment('');
  };

  // Confirmation handlers
  const handleConfirmAction = () => {
    if (!confirmationComment.trim()) return;

    switch (confirmationAction) {
      case 'delete_role':
        setRoles(prev => prev.filter(r => r.id !== pendingAction.roleId));
        break;
      case 'delete_user':
        setUsers(prev => prev.filter(u => u.id !== pendingAction.userId));
        break;
      case 'delete_permission':
        setAllPermissions(prev => prev.filter(p => p.id !== pendingAction.permissionId));
        break;
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

  // Drag and drop handlers
  const handleDragStart = (e, permission, source) => {
    setDraggedPermission({ permission, source });
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDropToAssigned = (e) => {
    e.preventDefault();
    if (draggedPermission && draggedPermission.source === 'available') {
      setAssignedPermissions(prev => [...prev, draggedPermission.permission]);
      setAvailablePermissions(prev => prev.filter(p => p.id !== draggedPermission.permission.id));
    }
    setDraggedPermission(null);
  };

  const handleDropToAvailable = (e) => {
    e.preventDefault();
    if (draggedPermission && draggedPermission.source === 'assigned') {
      setAvailablePermissions(prev => [...prev, draggedPermission.permission]);
      setAssignedPermissions(prev => prev.filter(p => p.id !== draggedPermission.permission.id));
    }
    setDraggedPermission(null);
  };

  const handleSavePermissions = () => {
    setShowAssignPermissionsModal(false);
  };

  // Get status badge
  const getStatusBadge = (status) => {
    return status === 'active' ? (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
        Active
      </span>
    ) : (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
        Inactive
      </span>
    );
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
      {/* Header with back button */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">User Management</h1>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('role')}
            className={`${
              activeTab === 'role'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Role
          </button>
          <button
            onClick={() => setActiveTab('user')}
            className={`${
              activeTab === 'user'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Users
          </button>
          <button
            onClick={() => setActiveTab('permissions')}
            className={`${
              activeTab === 'permissions'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Permissions
          </button>
        </nav>
      </div>

      {/* Tab Content */}
      <div className="bg-white shadow rounded-lg">
        {activeTab === 'role' && (
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-medium text-gray-900">Role Management</h2>
              <button
                onClick={handleCreateRole}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                <PlusIcon className="-ml-1 mr-2 h-4 w-4" />
                Create Role
              </button>
            </div>

            {roles.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-500">
                  <p className="text-lg font-medium">No Roles Created</p>
                  <p className="mt-2">Create your first role to get started with user management.</p>
                </div>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Role Title
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Assigned Permissions
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {roles.map((role) => (
                      <tr key={role.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{role.title}</div>
                          <div className="text-sm text-gray-500">Created {role.createdDate}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {getStatusBadge(role.status)}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-wrap gap-1">
                            {role.permissions.slice(0, 3).map((permission) => (
                              <span key={permission.id} className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-blue-100 text-blue-800">
                                {permission.label}
                              </span>
                            ))}
                            {role.permissions.length > 3 && (
                              <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-800">
                                +{role.permissions.length - 3} more
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex items-center space-x-3">
                            <button className="text-blue-600 hover:text-blue-900 transition-colors" title="Edit role">
                              <PencilIcon className="h-4 w-4" />
                            </button>
                            <button 
                              onClick={() => handleDeleteRole(role.id)}
                              className="text-red-600 hover:text-red-900 transition-colors" 
                              title="Delete role"
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
            )}
          </div>
        )}

        {activeTab === 'user' && (
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-medium text-gray-900">User Management</h2>
              <button
                onClick={handleCreateUser}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                <PlusIcon className="-ml-1 mr-2 h-4 w-4" />
                Create User
              </button>
            </div>

            {users.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-500">
                  <p className="text-lg font-medium">No Users Created</p>
                  <p className="mt-2">Create your first user to get started.</p>
                </div>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        User Name
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Email
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Role
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {users.map((user) => (
                      <tr key={user.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{user.username}</div>
                          <div className="text-sm text-gray-500">{user.mobileNumber}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{user.email}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                            {user.role?.title || 'No Role'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {getStatusBadge(user.status)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex items-center space-x-3">
                            <button 
                              onClick={() => handleEditUser(user)}
                              className="text-blue-600 hover:text-blue-900 transition-colors" 
                              title="Edit user"
                            >
                              <PencilIcon className="h-4 w-4" />
                            </button>
                            <button 
                              onClick={() => handleChangePassword(user)}
                              className="text-yellow-600 hover:text-yellow-900 transition-colors" 
                              title="Change password"
                            >
                              <KeyIcon className="h-4 w-4" />
                            </button>
                            <button 
                              onClick={() => handleDeleteUser(user.id)}
                              className="text-red-600 hover:text-red-900 transition-colors" 
                              title="Delete user"
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
            )}
          </div>
        )}

        {activeTab === 'permissions' && (
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-medium text-gray-900">Permission Management</h2>
              <button
                onClick={handleCreatePermission}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                <PlusIcon className="-ml-1 mr-2 h-4 w-4" />
                Create Permission
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Permission Name
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Scope
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Description
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {allPermissions.map((permission) => (
                    <tr key={permission.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{permission.label}</div>
                        <div className="text-sm text-gray-500">{permission.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                          {permission.scope}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900 max-w-xs truncate">
                          {permission.description}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center space-x-3">
                          <button className="text-blue-600 hover:text-blue-900 transition-colors" title="Edit permission">
                            <PencilIcon className="h-4 w-4" />
                          </button>
                          <button 
                            onClick={() => handleDeletePermission(permission.id)}
                            className="text-red-600 hover:text-red-900 transition-colors" 
                            title="Delete permission"
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
        )}
      </div>

      {/* Create Role Modal */}
      {showCreateRoleModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-neutral-900">Create Role</h3>
              <button onClick={handleCancelRole} className="text-gray-400 hover:text-gray-600">
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label htmlFor="roleTitle" className="block text-sm font-medium text-gray-700 mb-1">
                  Role Title
                </label>
                <input
                  type="text"
                  id="roleTitle"
                  value={roleForm.title}
                  onChange={(e) => setRoleForm({ ...roleForm, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Enter role title"
                />
              </div>

              <div>
                <label htmlFor="roleStatus" className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  id="roleStatus"
                  value={roleForm.status}
                  onChange={(e) => setRoleForm({ ...roleForm, status: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>

            <div className="flex justify-between space-x-3 mt-6">
              <button
                onClick={handleAssignPermissions}
                disabled={!roleForm.title.trim()}
                className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-full hover:bg-primary-700 disabled:bg-primary-300 disabled:cursor-not-allowed transition-colors text-sm font-medium"
              >
                Assign Permissions
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Assign Permissions Modal */}
      {showAssignPermissionsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg max-w-4xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-neutral-900">Assign Permissions</h3>
              <button onClick={handleCancelRole} className="text-gray-400 hover:text-gray-600">
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Available Permissions */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-3">Available Permissions</h4>
                <div
                  className="border-2 border-dashed border-gray-300 rounded-lg p-4 min-h-[300px] bg-gray-50"
                  onDragOver={handleDragOver}
                  onDrop={handleDropToAvailable}
                >
                  <div className="space-y-2">
                    {availablePermissions.map((permission) => (
                      <div
                        key={permission.id}
                        draggable
                        onDragStart={(e) => handleDragStart(e, permission, 'available')}
                        className="bg-white p-3 rounded-md border border-gray-200 cursor-move hover:bg-gray-50 transition-colors"
                      >
                        <span className="text-sm font-medium text-gray-900">{permission.label}</span>
                        <p className="text-xs text-gray-500">{permission.name}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Assigned Permissions */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-3">Assigned Permissions</h4>
                <div
                  className="border-2 border-dashed border-primary-300 rounded-lg p-4 min-h-[300px] bg-primary-50"
                  onDragOver={handleDragOver}
                  onDrop={handleDropToAssigned}
                >
                  <div className="space-y-2">
                    {assignedPermissions.map((permission) => (
                      <div
                        key={permission.id}
                        draggable
                        onDragStart={(e) => handleDragStart(e, permission, 'assigned')}
                        className="bg-white p-3 rounded-md border border-primary-200 cursor-move hover:bg-primary-50 transition-colors"
                      >
                        <span className="text-sm font-medium text-gray-900">{permission.label}</span>
                        <p className="text-xs text-gray-500">{permission.name}</p>
                      </div>
                    ))}
                    {assignedPermissions.length === 0 && (
                      <p className="text-gray-500 text-center py-8">Drag permissions here to assign them</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={handleCancelRole}
                className="px-4 py-2 bg-white border border-neutral-300 text-neutral-700 rounded-full hover:bg-neutral-50 transition-colors text-sm font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveRole}
                disabled={assignedPermissions.length === 0}
                className="px-4 py-2 bg-primary-600 text-white rounded-full hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors text-sm font-medium"
              >
                Save Role
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create User Modal */}
      {showCreateUserModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-neutral-900">Create User</h3>
              <button onClick={handleCancelUser} className="text-gray-400 hover:text-gray-600">
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                  User Name
                </label>
                <input
                  type="text"
                  id="username"
                  value={userForm.username}
                  onChange={(e) => setUserForm({ ...userForm, username: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Enter username"
                />
              </div>
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                  Mobile Number
                </label>
                <input
                  type="number"
                  id="mobileNumber"
                  value={userForm.mobileNumber}
                  onChange={(e) => setUserForm({ ...userForm, mobileNumber: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Enter mobile number"
                />
              </div>
              <div>
                <label htmlFor="userRole" className="block text-sm font-medium text-gray-700 mb-1">
                  Assign Role
                </label>
                <select
                  id="userRole"
                  value={userForm.roleId}
                  onChange={(e) => setUserForm({ ...userForm, roleId: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="">Select a role</option>
                  {roles.filter(role => role.status === 'active').map((role) => (
                    <option key={role.id} value={role.id}>{role.title}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={userForm.email}
                  onChange={(e) => setUserForm({ ...userForm, email: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Enter email address"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    value={userForm.password}
                    onChange={(e) => setUserForm({ ...userForm, password: e.target.value })}
                    className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="Enter password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPassword ? (
                      <EyeSlashIcon className="h-4 w-4 text-gray-400" />
                    ) : (
                      <EyeIcon className="h-4 w-4 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <label htmlFor="userStatus" className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  id="userStatus"
                  value={userForm.status}
                  onChange={(e) => setUserForm({ ...userForm, status: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={handleCancelUser}
                className="px-4 py-2 bg-white border border-neutral-300 text-neutral-700 rounded-full hover:bg-neutral-50 transition-colors text-sm font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveUser}
                disabled={!userForm.username.trim() || !userForm.email.trim() || !userForm.password.trim() || !userForm.roleId}
                className="px-4 py-2 bg-primary-600 text-white rounded-full hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors text-sm font-medium"
              >
                Save User
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit User Modal */}
      {showEditUserModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-neutral-900">Edit User</h3>
              <button onClick={() => setShowEditUserModal(false)} className="text-gray-400 hover:text-gray-600">
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label htmlFor="editUsername" className="block text-sm font-medium text-gray-700 mb-1">
                  User Name
                </label>
                <input
                  type="text"
                  id="editUsername"
                  value={userForm.username}
                  onChange={(e) => setUserForm({ ...userForm, username: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Enter username"
                />
              </div>

              <div>
                <label htmlFor="editMobileNumber" className="block text-sm font-medium text-gray-700 mb-1">
                  Mobile Number
                </label>
                <input
                  type="text"
                  id="editMobileNumber"
                  value={userForm.mobileNumber}
                  onChange={(e) => setUserForm({ ...userForm, mobileNumber: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Enter mobile number"
                />
              </div>

              <div>
                <label htmlFor="editEmail" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="editEmail"
                  value={userForm.email}
                  onChange={(e) => setUserForm({ ...userForm, email: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Enter email"
                />
              </div>

              <div>
                <label htmlFor="editRole" className="block text-sm font-medium text-gray-700 mb-1">
                  Role
                </label>
                <select
                  id="editRole"
                  value={userForm.roleId}
                  onChange={(e) => setUserForm({ ...userForm, roleId: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="">Select a role</option>
                  {roles.map((role) => (
                    <option key={role.id} value={role.id}>
                      {role.title}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="editUserStatus" className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  id="editUserStatus"
                  value={userForm.status}
                  onChange={(e) => setUserForm({ ...userForm, status: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowEditUserModal(false)}
                className="px-4 py-2 bg-white border border-neutral-300 text-neutral-700 rounded-full hover:bg-neutral-50 transition-colors text-sm font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateUser}
                disabled={!userForm.username.trim() || !userForm.email.trim() || !userForm.roleId}
                className="px-4 py-2 bg-primary-600 text-white rounded-full hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors text-sm font-medium"
              >
                Update User
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Change Password Modal */}
      {showChangePasswordModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-neutral-900">Change Password</h3>
              <button onClick={() => setShowChangePasswordModal(false)} className="text-gray-400 hover:text-gray-600">
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>

            <div className="mb-4">
              <p className="text-sm text-gray-600">
                Changing password for: <span className="font-medium">{editingUser?.username}</span>
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
                  New Password
                </label>
                <input
                  type="password"
                  id="newPassword"
                  value={passwordForm.newPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Enter new password (min. 6 characters)"
                  minLength={6}
                />
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  value={passwordForm.confirmPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Confirm new password"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowChangePasswordModal(false)}
                className="px-4 py-2 bg-white border border-neutral-300 text-neutral-700 rounded-full hover:bg-neutral-50 transition-colors text-sm font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdatePassword}
                disabled={!passwordForm.newPassword || !passwordForm.confirmPassword}
                className="px-4 py-2 bg-primary-600 text-white rounded-full hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors text-sm font-medium"
              >
                Change Password
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create Permission Modal */}
      {showCreatePermissionModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-neutral-900">Create Permission</h3>
              <button onClick={handleCancelPermission} className="text-gray-400 hover:text-gray-600">
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label htmlFor="permissionName" className="block text-sm font-medium text-gray-700 mb-1">
                  Permission Name
                </label>
                <input
                  type="text"
                  id="permissionName"
                  value={permissionForm.name}
                  onChange={(e) => setPermissionForm({ ...permissionForm, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Enter permission name"
                />
              </div>

              <div>
                <label htmlFor="permissionScope" className="block text-sm font-medium text-gray-700 mb-1">
                  Permission Scope
                </label>
                <input
                  type="text"
                  id="permissionScope"
                  value={permissionForm.scope}
                  onChange={(e) => setPermissionForm({ ...permissionForm, scope: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Enter permission scope"
                />
              </div>

              <div>
                <label htmlFor="permissionDescription" className="block text-sm font-medium text-gray-700 mb-1">
                  Permission Description
                </label>
                <textarea
                  id="permissionDescription"
                  rows={3}
                  value={permissionForm.description}
                  onChange={(e) => setPermissionForm({ ...permissionForm, description: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Enter permission description"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={handleCancelPermission}
                className="px-4 py-2 bg-white border border-neutral-300 text-neutral-700 rounded-full hover:bg-neutral-50 transition-colors text-sm font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleSavePermission}
                disabled={!permissionForm.name.trim() || !permissionForm.scope.trim() || !permissionForm.description.trim()}
                className="px-4 py-2 bg-primary-600 text-white rounded-full hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors text-sm font-medium"
              >
                Save Permission
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {showConfirmationModal && (
        <ConfirmationModal
          isOpen={showConfirmationModal}
          title={`Delete ${confirmationAction === 'delete_role' ? 'Role' : confirmationAction === 'delete_user' ? 'User' : 'Permission'}`}
          message={`Are you sure you want to delete ${confirmationAction === 'delete_role' ? `role "${pendingAction?.roleName}"` : confirmationAction === 'delete_user' ? `user "${pendingAction?.userName}"` : `permission "${pendingAction?.permissionName}"`}? This action cannot be undone.`}
          confirmText="Delete"
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

export default UserManagementList;