import React from 'react';
import { usePermissions } from '../contexts/PermissionContext';

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
  const { hasPermission, hasAllPermissions, hasAnyPermission, isPermissionsLoaded } = usePermissions();
  
  // Show loading state while permissions are being fetched
  if (!isPermissionsLoaded) {
    return fallback;
  }
  
  // Handle array of permissions
  if (Array.isArray(permission)) {
    const hasAccess = requireAll 
      ? hasAllPermissions(permission)
      : hasAnyPermission(permission);
    
    return hasAccess ? children : fallback;
  }
  
  // Handle single permission
  if (!permission || hasPermission(permission)) {
    return children;
  }
  
  return fallback;
};

export default PermissionGate;
