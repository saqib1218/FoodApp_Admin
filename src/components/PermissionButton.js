import React from 'react';
import usePermission from '../hooks/usePermission';

/**
 * Permission-aware button component
 * Only renders if the user has the required permission
 * 
 * @param {string|string[]} permission - Required permission(s) to show this button
 * @param {boolean} requireAll - If true, user must have all permissions when an array is provided
 * @param {React.ReactNode} children - Button content
 * @param {Object} props - All other button props
 */
export const PermissionButton = ({ 
  permission, 
  requireAll = false,
  children, 
  ...props 
}) => {
  const { hasPermission } = usePermission();
  
  // If no permission is required or user has the permission, render the button
  if (!permission || hasPermission(permission, requireAll)) {
    return (
      <button 
        className={`px-4 py-2 rounded-full text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 ${props.className || ''}`}
        {...props}
      >
        {children}
      </button>
    );
  }
  
  // Otherwise, render nothing
  return null;
};

export default PermissionButton;
