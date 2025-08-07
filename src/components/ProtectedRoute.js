import React from 'react';
import { Navigate } from "react-router-dom";
import { usePermissions } from "../context/PermissionsContext";

/**
 * Protected Route Component
 * Checks if the user has the required permission to access a route
 * Redirects to unauthorized page if permission is not granted
 * 
 * @param {string} permission - The permission required to access the route
 * @param {React.ReactNode} children - The route content to render if authorized
 */
const ProtectedRoute = ({ permission, children }) => {
  const permissions = usePermissions();

  if (!permissions.includes(permission)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoute;
