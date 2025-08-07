import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PermissionButton from '../components/PermissionButton';
import PermissionGate from '../components/PermissionGate';
import usePermission from '../hooks/usePermission';
import { useAuth } from '../hooks/useAuth';

const PermissionsDemo = () => {
  const { hasPermission, filterByPermission } = usePermission();
  const { userPermissions, hasRole } = useAuth();
  const [selectedPermission, setSelectedPermission] = useState('');

  // Example items that would be filtered by permission
  const demoItems = [
    { id: 1, name: 'View Kitchens', permission: 'view_kitchens' },
    { id: 2, name: 'Edit Kitchen', permission: 'edit_kitchen' },
    { id: 3, name: 'Approve Dish', permission: 'approve_dish' },
    { id: 4, name: 'View Orders', permission: 'view_orders' },
    { id: 5, name: 'Manage Users', permission: 'manage_users' },
    { id: 6, name: 'View Analytics', permission: 'view_analytics' }
  ];

  // Filter items based on current permissions
  const filteredItems = filterByPermission(demoItems, 'permission');

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-neutral-900 mb-2">RBAC System Demo</h1>
        <p className="text-neutral-600">
          This page demonstrates the Role-Based Access Control (RBAC) system components and functionality.
        </p>
      </div>

      {/* Current User Permissions */}
      <div className="bg-white shadow rounded-xl p-6 mb-8">
        <h2 className="text-xl font-medium text-neutral-900 mb-4">Current User Permissions</h2>
        <div className="mb-4">
          <p className="text-neutral-600 mb-2">Your current permissions:</p>
          <div className="flex flex-wrap gap-2">
            {userPermissions && userPermissions.length > 0 ? (
              userPermissions.map((permission, index) => (
                <span 
                  key={index} 
                  className="inline-block px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-sm"
                >
                  {permission}
                </span>
              ))
            ) : (
              <p className="text-neutral-500 italic">No permissions assigned</p>
            )}
          </div>
        </div>
      </div>

      {/* Permission Components Demo */}
      <div className="bg-white shadow rounded-xl p-6 mb-8">
        <h2 className="text-xl font-medium text-neutral-900 mb-4">Permission Components</h2>
        
        {/* PermissionButton Demo */}
        <div className="mb-8">
          <h3 className="text-lg font-medium text-neutral-800 mb-3">PermissionButton Component</h3>
          <p className="text-neutral-600 mb-4">
            The PermissionButton component only renders if the user has the required permission.
          </p>
          
          <div className="flex flex-wrap gap-3 mb-4">
            <PermissionButton permission="view_kitchens">
              View Kitchens
            </PermissionButton>
            
            <PermissionButton permission="edit_kitchen">
              Edit Kitchen
            </PermissionButton>
            
            <PermissionButton permission="approve_dish">
              Approve Dish
            </PermissionButton>
            
            <PermissionButton permission="view_orders">
              View Orders
            </PermissionButton>
            
            <PermissionButton permission="manage_users">
              Manage Users
            </PermissionButton>
          </div>
          
          <div className="mt-4 p-4 bg-neutral-50 rounded-lg">
            <p className="text-sm text-neutral-600">
              <strong>Note:</strong> Only buttons for permissions you have are visible above.
            </p>
          </div>
        </div>
        
        {/* PermissionGate Demo */}
        <div className="mb-8">
          <h3 className="text-lg font-medium text-neutral-800 mb-3">PermissionGate Component</h3>
          <p className="text-neutral-600 mb-4">
            The PermissionGate component conditionally renders content based on permissions.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border border-neutral-200 rounded-lg p-4">
              <h4 className="font-medium mb-2">With edit_kitchen permission:</h4>
              <PermissionGate 
                permission="edit_kitchen"
                fallback={<p className="text-neutral-500 italic">You don't have permission to edit kitchens</p>}
              >
                <div className="bg-green-50 p-3 rounded-lg">
                  <p className="text-green-800">You can edit kitchen details!</p>
                </div>
              </PermissionGate>
            </div>
            
            <div className="border border-neutral-200 rounded-lg p-4">
              <h4 className="font-medium mb-2">With approve_dish permission:</h4>
              <PermissionGate 
                permission="approve_dish"
                fallback={<p className="text-neutral-500 italic">You don't have permission to approve dishes</p>}
              >
                <div className="bg-green-50 p-3 rounded-lg">
                  <p className="text-green-800">You can approve dishes!</p>
                </div>
              </PermissionGate>
            </div>
            
            <div className="border border-neutral-200 rounded-lg p-4">
              <h4 className="font-medium mb-2">With multiple permissions (any):</h4>
              <PermissionGate 
                permission={['manage_users', 'view_analytics']}
                requireAll={false}
                fallback={<p className="text-neutral-500 italic">You need either manage_users OR view_analytics permission</p>}
              >
                <div className="bg-green-50 p-3 rounded-lg">
                  <p className="text-green-800">You have either manage_users OR view_analytics permission!</p>
                </div>
              </PermissionGate>
            </div>
            
            <div className="border border-neutral-200 rounded-lg p-4">
              <h4 className="font-medium mb-2">With multiple permissions (all):</h4>
              <PermissionGate 
                permission={['view_kitchens', 'view_orders']}
                requireAll={true}
                fallback={<p className="text-neutral-500 italic">You need both view_kitchens AND view_orders permissions</p>}
              >
                <div className="bg-green-50 p-3 rounded-lg">
                  <p className="text-green-800">You have both view_kitchens AND view_orders permissions!</p>
                </div>
              </PermissionGate>
            </div>
          </div>
        </div>
        
        {/* Permission Hook Demo */}
        <div>
          <h3 className="text-lg font-medium text-neutral-800 mb-3">usePermission Hook</h3>
          <p className="text-neutral-600 mb-4">
            The usePermission hook provides utility functions for permission checks.
          </p>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-neutral-700 mb-1">
              Check if you have a specific permission:
            </label>
            <div className="flex gap-2">
              <select
                value={selectedPermission}
                onChange={(e) => setSelectedPermission(e.target.value)}
                className="border border-neutral-300 rounded-md px-3 py-2"
              >
                <option value="">Select a permission</option>
                <option value="view_kitchens">view_kitchens</option>
                <option value="edit_kitchen">edit_kitchen</option>
                <option value="approve_dish">approve_dish</option>
                <option value="view_orders">view_orders</option>
                <option value="manage_users">manage_users</option>
                <option value="view_analytics">view_analytics</option>
              </select>
              
              <button
                className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
                onClick={() => setSelectedPermission(selectedPermission)}
              >
                Check
              </button>
            </div>
            
            {selectedPermission && (
              <div className="mt-3 p-3 rounded-lg border">
                <p>
                  Permission <code className="bg-neutral-100 px-1 py-0.5 rounded">{selectedPermission}</code>:&nbsp;
                  {hasPermission(selectedPermission) ? (
                    <span className="text-green-600 font-medium">Granted ✓</span>
                  ) : (
                    <span className="text-red-600 font-medium">Denied ✗</span>
                  )}
                </p>
              </div>
            )}
          </div>
          
          <div className="mt-6">
            <h4 className="font-medium mb-3">Filtered Items Demo:</h4>
            <p className="text-neutral-600 mb-3">
              These items are filtered based on your permissions using filterByPermission:
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {filteredItems.map(item => (
                <div 
                  key={item.id} 
                  className="border border-neutral-200 p-3 rounded-lg"
                >
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-neutral-500">
                    Requires: <code>{item.permission}</code>
                  </p>
                </div>
              ))}
            </div>
            
            {filteredItems.length === 0 && (
              <p className="text-neutral-500 italic">No items available with your permissions</p>
            )}
          </div>
        </div>
      </div>
      
      {/* Integration Examples */}
      <div className="bg-white shadow rounded-xl p-6 mb-8">
        <h2 className="text-xl font-medium text-neutral-900 mb-4">Integration Examples</h2>
        <p className="text-neutral-600 mb-4">
          Examples of how the RBAC system is integrated in the application:
        </p>
        
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <Link to="/kitchens" className="text-primary-600 hover:text-primary-700">
              Kitchens Page
            </Link>
            <span className="text-neutral-600"> - Uses permission checks for edit buttons</span>
          </li>
          <li>
            <Link to="/unauthorized" className="text-primary-600 hover:text-primary-700">
              Unauthorized Page
            </Link>
            <span className="text-neutral-600"> - Shown when accessing restricted routes</span>
          </li>
          <li>
            <span className="text-neutral-600">
              Protected Routes - Routes are guarded based on permissions in App.js
            </span>
          </li>
          <li>
            <span className="text-neutral-600">
              Sidebar Navigation - Menu items are filtered based on permissions
            </span>
          </li>
        </ul>
      </div>
      
      {/* Documentation */}
      <div className="bg-white shadow rounded-xl p-6">
        <h2 className="text-xl font-medium text-neutral-900 mb-4">RBAC Documentation</h2>
        
        <div className="prose max-w-none">
          <h3>Components</h3>
          <ul>
            <li>
              <strong>PermissionButton</strong> - A button that only renders if the user has the required permission(s)
            </li>
            <li>
              <strong>PermissionGate</strong> - A wrapper component that conditionally renders children based on permissions
            </li>
          </ul>
          
          <h3>Hooks</h3>
          <ul>
            <li>
              <strong>usePermission</strong> - Provides utility functions for permission checks:
              <ul>
                <li><code>hasPermission(permission, requireAll)</code> - Checks if user has permission(s)</li>
                <li><code>filterByPermission(items, permissionField)</code> - Filters array items by permission</li>
              </ul>
            </li>
          </ul>
          
          <h3>Usage Guidelines</h3>
          <ol>
            <li>Use <code>PermissionButton</code> for action buttons that require specific permissions</li>
            <li>Use <code>PermissionGate</code> to conditionally render sections of UI based on permissions</li>
            <li>Use <code>usePermission</code> hook for custom permission logic in components</li>
            <li>Add <code>permission</code> property to route definitions in App.js to protect routes</li>
            <li>Add <code>permission</code> property to sidebar menu items to control visibility</li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default PermissionsDemo;
