import React from 'react';
import { usePermissions, useConditionalPermissions } from '../hooks/usePermissions';
import { PERMISSIONS, PermissionUtils } from '../contexts/PermissionRegistry';

/**
 * Enhanced PermissionGate Component
 * Conditionally renders children based on user permissions
 * 
 * Usage Examples:
 * <PermissionGate permission={PERMISSIONS.user.CREATE}>
 *   <CreateUserButton />
 * </PermissionGate>
 * 
 * <PermissionGate permissions={[PERMISSIONS.user.EDIT, PERMISSIONS.user.DELETE]} requireAll={false}>
 *   <UserActions />
 * </PermissionGate>
 * 
 * <PermissionGate module="user" action="CREATE">
 *   <CreateUserButton />
 * </PermissionGate>
 */

const PermissionGate = ({ 
  children, 
  permission, 
  permissions = [], 
  requireAll = true,
  module,
  action,
  fallback = null,
  loading = null
}) => {
  const { hasPermission, hasAnyPermission, hasAllPermissions, isPermissionsLoaded, utils } = usePermissions();

  // Show loading state while permissions are being fetched
  if (!isPermissionsLoaded) {
    return loading || null;
  }

  let hasAccess = false;

  // Check access based on module and action
  if (module && action) {
    const modulePermissions = utils.getModulePermissions(module);
    const permissionKey = modulePermissions[action.toUpperCase()];
    hasAccess = permissionKey ? hasPermission(permissionKey) : false;
  }
  // Check access based on single permission
  else if (permission) {
    hasAccess = hasPermission(permission);
  }
  // Check access based on multiple permissions
  else if (permissions.length > 0) {
    hasAccess = requireAll ? hasAllPermissions(permissions) : hasAnyPermission(permissions);
  }

  return hasAccess ? children : fallback;
};

/**
 * Specialized PermissionGate for User Management
 */
export const UserPermissionGate = ({ children, action, fallback = null, loading = null }) => (
  <PermissionGate module="user" action={action} fallback={fallback} loading={loading}>
    {children}
  </PermissionGate>
);

/**
 * Specialized PermissionGate for Role Management
 */
export const RolePermissionGate = ({ children, action, fallback = null, loading = null }) => (
  <PermissionGate module="role" action={action} fallback={fallback} loading={loading}>
    {children}
  </PermissionGate>
);

/**
 * Specialized PermissionGate for Permission Management
 */
export const PermissionPermissionGate = ({ children, action, fallback = null, loading = null }) => (
  <PermissionGate module="permission" action={action} fallback={fallback} loading={loading}>
    {children}
  </PermissionGate>
);

/**
 * Specialized PermissionGate for Kitchen Management
 */
export const KitchenPermissionGate = ({ children, action, fallback = null, loading = null }) => (
  <PermissionGate module="kitchen" action={action} fallback={fallback} loading={loading}>
    {children}
  </PermissionGate>
);

/**
 * Specialized PermissionGate for Dashboard
 */
export const DashboardPermissionGate = ({ children, action = "VIEW", fallback = null, loading = null }) => (
  <PermissionGate module="dashboard" action={action} fallback={fallback} loading={loading}>
    {children}
  </PermissionGate>
);

/**
 * Permission Button Component
 * Button that only renders if user has required permissions
 */
export const PermissionButton = ({ 
  permission, 
  permissions = [], 
  requireAll = true,
  module,
  action,
  onClick, 
  children, 
  className = "", 
  disabled = false,
  variant = "primary",
  size = "md",
  ...props 
}) => {
  const { hasPermission } = usePermissions();
  const { canRender } = useConditionalPermissions(
    permission || permissions, 
    requireAll
  );

  // If using module/action, check that specific permission
  if (module && action) {
    const modulePermissions = PermissionUtils.getModulePermissions(module);
    const permissionKey = modulePermissions[action.toUpperCase()];
    
    if (!permissionKey || !hasPermission(permissionKey)) {
      return null;
    }
  } else if (!canRender) {
    return null;
  }

  // Button variants
  const variants = {
    primary: "bg-primary-600 hover:bg-primary-700 text-white",
    secondary: "bg-gray-600 hover:bg-gray-700 text-white",
    success: "bg-green-600 hover:bg-green-700 text-white",
    danger: "bg-red-600 hover:bg-red-700 text-white",
    warning: "bg-yellow-600 hover:bg-yellow-700 text-white",
    outline: "border border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white"
  };

  // Button sizes
  const sizes = {
    sm: "px-2 py-1 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base"
  };

  const baseClasses = "inline-flex items-center font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed";
  const variantClasses = variants[variant] || variants.primary;
  const sizeClasses = sizes[size] || sizes.md;

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses} ${sizeClasses} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

/**
 * Permission Icon Button Component
 * Icon button that only renders if user has required permissions
 */
export const PermissionIconButton = ({ 
  permission, 
  permissions = [], 
  requireAll = true,
  module,
  action,
  onClick, 
  icon: Icon,
  title,
  className = "",
  variant = "ghost",
  size = "md",
  disabled = false,
  ...props 
}) => {
  const { hasPermission } = usePermissions();
  const { canRender } = useConditionalPermissions(
    permission || permissions, 
    requireAll
  );

  // If using module/action, check that specific permission
  if (module && action) {
    const modulePermissions = PermissionUtils.getModulePermissions(module);
    const permissionKey = modulePermissions[action.toUpperCase()];
    
    if (!permissionKey || !hasPermission(permissionKey)) {
      return null;
    }
  } else if (!canRender) {
    return null;
  }

  // Icon button variants
  const variants = {
    ghost: "text-gray-600 hover:text-gray-900 hover:bg-gray-100",
    primary: "text-primary-600 hover:text-primary-900 hover:bg-primary-50",
    danger: "text-red-600 hover:text-red-900 hover:bg-red-50",
    success: "text-green-600 hover:text-green-900 hover:bg-green-50",
    warning: "text-yellow-600 hover:text-yellow-900 hover:bg-yellow-50"
  };

  // Icon sizes
  const iconSizes = {
    sm: "h-3 w-3",
    md: "h-4 w-4",
    lg: "h-5 w-5"
  };

  const buttonSizes = {
    sm: "p-1",
    md: "p-2",
    lg: "p-3"
  };

  const baseClasses = "inline-flex items-center justify-center rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed";
  const variantClasses = variants[variant] || variants.ghost;
  const buttonSizeClasses = buttonSizes[size] || buttonSizes.md;
  const iconSizeClasses = iconSizes[size] || iconSizes.md;

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={`${baseClasses} ${variantClasses} ${buttonSizeClasses} ${className}`}
      {...props}
    >
      {Icon && <Icon className={iconSizeClasses} />}
    </button>
  );
};

/**
 * Higher-Order Component for permission-based rendering
 */
export const withPermissions = (Component, requiredPermissions, requireAll = true) => {
  return (props) => (
    <PermissionGate permissions={requiredPermissions} requireAll={requireAll}>
      <Component {...props} />
    </PermissionGate>
  );
};

/**
 * Permission-aware Link Component
 */
export const PermissionLink = ({ 
  permission, 
  permissions = [], 
  requireAll = true,
  module,
  action,
  to, 
  children, 
  className = "",
  fallback = null,
  ...props 
}) => {
  const { hasPermission } = usePermissions();
  const { canRender } = useConditionalPermissions(
    permission || permissions, 
    requireAll
  );

  // If using module/action, check that specific permission
  if (module && action) {
    const modulePermissions = PermissionUtils.getModulePermissions(module);
    const permissionKey = modulePermissions[action.toUpperCase()];
    
    if (!permissionKey || !hasPermission(permissionKey)) {
      return fallback;
    }
  } else if (!canRender) {
    return fallback;
  }

  // Import Link dynamically to avoid issues if react-router is not available
  const Link = require('react-router-dom').Link;

  return (
    <Link to={to} className={className} {...props}>
      {children}
    </Link>
  );
};

export default PermissionGate;
