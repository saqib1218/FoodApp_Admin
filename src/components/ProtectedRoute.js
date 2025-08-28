import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { usePermissions } from '../hooks/usePermissions';

// Loading spinner component
const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="flex flex-col items-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      <p className="mt-4 text-gray-600">Loading...</p>
    </div>
  </div>
);

/**
 * Protected Route Component
 * Checks if the user is authenticated and optionally has required permissions
 * Redirects to login page if not authenticated
 * Redirects to unauthorized page if permission is not granted
 * 
 * @param {string|string[]} permission - Optional permission(s) required to access the route
 * @param {string} routeName - Route name for permission checking (e.g., 'users', 'kitchens')
 * @param {boolean} requireAll - If true, user must have all permissions when an array is provided
 * @param {React.ReactNode} children - The route content to render if authorized
 */
const ProtectedRoute = ({ permission, routeName, requireAll = false, children }) => {
  const { isAuthenticated, isLoading } = useContext(AuthContext);
  const { 
    hasPermission, 
    hasAllPermissions, 
    hasAnyPermission, 
    navigation,
    isPermissionsLoaded
  } = usePermissions();
  const location = useLocation();

  // Show loading spinner while checking authentication or permissions
  if (isLoading || !isPermissionsLoaded) {
    return <LoadingSpinner />;
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check route-based permission if routeName is provided
  if (routeName && !navigation.canAccessRoute(routeName)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // Check specific permission requirement if specified
  if (permission) {
    let hasAccess = false;
    
    if (Array.isArray(permission)) {
      hasAccess = requireAll 
        ? hasAllPermissions(permission)
        : hasAnyPermission(permission);
    } else {
      hasAccess = hasPermission(permission);
    }
    
    if (!hasAccess) {
      return <Navigate to="/unauthorized" replace />;
    }
  }

  return children;
};

export default ProtectedRoute;
