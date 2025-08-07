import React from 'react';
import usePermission from '../hooks/usePermission';

/**
 * Permission Gate Component
 * Conditionally renders children based on user permissions
 * 
 * @param {string|string[]} permission - Required permission(s)
 * @param {boolean} requireAll - If true, user must have all permissions when an array is provided
 * @param {React.ReactNode} children - Content to render if permission check passes
 * @param {React.ReactNode} fallback - Optional content to render if permission check fails
 */
const PermissionGate = ({ 
  permission, 
  requireAll = false, 
  children, 
  fallback = null 
}) => {
  const { hasPermission } = usePermission();
  
  if (!permission || hasPermission(permission, requireAll)) {
    return children;
  }
  
  return fallback;
};

export default PermissionGate;
