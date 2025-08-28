import { useContext } from 'react';
import { PermissionContext } from '../contexts/PermissionContext';
import { PERMISSIONS, PermissionUtils } from '../contexts/PermissionRegistry';

/**
 * Enhanced Permission Hooks
 * Provides easy-to-use permission checking functions
 */

export const usePermissions = () => {
  const context = useContext(PermissionContext);
  
  if (!context) {
    throw new Error('usePermissions must be used within a PermissionProvider');
  }
  
  const { hasPermission, hasAnyPermission, hasAllPermissions, permissionKeys, isPermissionsLoaded } = context;

  return {
    // Basic permission checking
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
    permissionKeys,
    isPermissionsLoaded,

    // Module-specific permission checkers
    user: {
      canCreate: () => hasPermission(PERMISSIONS.USER_CREATE),
      canView: () => hasPermission(PERMISSIONS.USER_LIST_VIEW),
      canEdit: () => hasPermission(PERMISSIONS.USER_EDIT),
      canDelete: () => hasPermission(PERMISSIONS.USER_DELETE),
      canActivate: () => hasPermission(PERMISSIONS.USER_ACTIVATE),
      canDeactivate: () => hasPermission(PERMISSIONS.USER_DEACTIVATE),
      hasAnyAccess: () => hasAnyPermission([
        PERMISSIONS.USER_CREATE,
        PERMISSIONS.USER_LIST_VIEW,
        PERMISSIONS.USER_EDIT,
        PERMISSIONS.USER_DELETE
      ])
    },

    role: {
      canCreate: () => hasPermission(PERMISSIONS.ROLE_CREATE),
      canView: () => hasPermission(PERMISSIONS.ROLE_LIST_VIEW),
      canEdit: () => hasPermission(PERMISSIONS.ROLE_EDIT),
      canDelete: () => hasPermission(PERMISSIONS.ROLE_DELETE),
      hasAnyAccess: () => hasAnyPermission([
        PERMISSIONS.ROLE_CREATE,
        PERMISSIONS.ROLE_LIST_VIEW,
        PERMISSIONS.ROLE_EDIT,
        PERMISSIONS.ROLE_DELETE
      ])
    },

    permission: {
      canCreate: () => hasPermission(PERMISSIONS.PERMISSION_CREATE),
      canView: () => hasPermission(PERMISSIONS.PERMISSION_LIST_VIEW),
      canEdit: () => hasPermission(PERMISSIONS.PERMISSION_EDIT),
      canDelete: () => hasPermission(PERMISSIONS.PERMISSION_DELETE),
      hasAnyAccess: () => hasAnyPermission([
        PERMISSIONS.PERMISSION_CREATE,
        PERMISSIONS.PERMISSION_LIST_VIEW,
        PERMISSIONS.PERMISSION_EDIT,
        PERMISSIONS.PERMISSION_DELETE
      ])
    },

    dashboard: {
      canView: () => hasPermission(PERMISSIONS.DASHBOARD_VIEW),
      hasAnyAccess: () => hasPermission(PERMISSIONS.DASHBOARD_VIEW)
    },

    kitchen: {
      canView: () => hasPermission(PERMISSIONS.KITCHEN_VIEW),
      canEdit: () => hasPermission(PERMISSIONS.KITCHEN_EDIT),
      hasAnyAccess: () => hasAnyPermission([
        PERMISSIONS.KITCHEN_VIEW,
        PERMISSIONS.KITCHEN_EDIT
      ])
    },

    partner: {
      canView: () => hasPermission(PERMISSIONS.PARTNER_VIEW),
      hasAnyAccess: () => hasPermission(PERMISSIONS.PARTNER_VIEW)
    },

    customer: {
      canView: () => hasPermission(PERMISSIONS.CUSTOMER_VIEW),
      hasAnyAccess: () => hasPermission(PERMISSIONS.CUSTOMER_VIEW)
    },

    order: {
      canView: () => hasPermission(PERMISSIONS.ORDER_VIEW),
      hasAnyAccess: () => hasPermission(PERMISSIONS.ORDER_VIEW)
    },

    feedback: {
      canView: () => hasPermission(PERMISSIONS.FEEDBACK_VIEW),
      hasAnyAccess: () => hasPermission(PERMISSIONS.FEEDBACK_VIEW)
    },

    discount: {
      canView: () => hasPermission(PERMISSIONS.DISCOUNT_VIEW),
      hasAnyAccess: () => hasPermission(PERMISSIONS.DISCOUNT_VIEW)
    },

    reports: {
      canView: () => hasPermission(PERMISSIONS.REPORTS_VIEW),
      hasAnyAccess: () => hasPermission(PERMISSIONS.REPORTS_VIEW)
    },

    settings: {
      canView: () => hasPermission(PERMISSIONS.SETTINGS_VIEW),
      hasAnyAccess: () => hasPermission(PERMISSIONS.SETTINGS_VIEW)
    },

    engagement: {
      canView: () => hasPermission(PERMISSIONS.ENGAGEMENT_VIEW),
      hasAnyAccess: () => hasPermission(PERMISSIONS.ENGAGEMENT_VIEW)
    },

    // Navigation helpers
    navigation: {
      getAccessibleItems: () => PermissionUtils.getAccessibleNavigation(permissionKeys),
      canAccessRoute: (route) => {
        const requiredPermissions = PermissionUtils.getRoutePermissions(route);
        return requiredPermissions.length === 0 || hasAnyPermission(requiredPermissions);
      }
    },

    // Admin level checks
    admin: {
      canManageUsers: () => hasAnyPermission([
        PERMISSIONS.USER_CREATE,
        PERMISSIONS.USER_EDIT,
        PERMISSIONS.USER_DELETE
      ]),
      canManageRoles: () => hasAnyPermission([
        PERMISSIONS.ROLE_CREATE,
        PERMISSIONS.ROLE_EDIT,
        PERMISSIONS.ROLE_DELETE
      ]),
      canManagePermissions: () => hasAnyPermission([
        PERMISSIONS.PERMISSION_CREATE,
        PERMISSIONS.PERMISSION_EDIT,
        PERMISSIONS.PERMISSION_DELETE
      ])
    },

    // Utility functions (only available ones from simplified PermissionUtils)
    utils: {
    }
  };
};

/**
 * Hook for checking specific module permissions
 * @param {string} module - Module name (e.g., 'user', 'role')
 * @returns {Object} Module-specific permission checkers
 */
export const useModulePermissions = (module) => {
  const { hasPermission, hasAnyPermission } = usePermissions();
  const modulePermissions = PermissionUtils.getModulePermissions(module);

  const checkers = {};
  Object.entries(modulePermissions).forEach(([action, permission]) => {
    const methodName = `can${action.charAt(0).toUpperCase() + action.slice(1).toLowerCase().replace('_', '')}`;
    checkers[methodName] = () => hasPermission(permission);
  });

  checkers.hasAnyAccess = () => hasAnyPermission(Object.values(modulePermissions));

  return checkers;
};

/**
 * Hook for route-based permission checking
 * @param {string} route - Route path
 * @returns {Object} Route permission status
 */
export const useRoutePermissions = (route) => {
  const { hasAnyPermission, isPermissionsLoaded } = usePermissions();
  const requiredPermissions = PermissionUtils.getRoutePermissions(route);

  return {
    canAccess: requiredPermissions.length === 0 || hasAnyPermission(requiredPermissions),
    requiredPermissions,
    isLoading: !isPermissionsLoaded
  };
};

/**
 * Hook for permission-based conditional rendering
 * @param {string|Array} permissions - Permission(s) to check
 * @param {boolean} requireAll - Whether all permissions are required
 * @returns {Object} Permission status and helpers
 */
export const useConditionalPermissions = (permissions, requireAll = false) => {
  const { hasPermission, hasAnyPermission, hasAllPermissions, isPermissionsLoaded } = usePermissions();

  const permissionArray = Array.isArray(permissions) ? permissions : [permissions];
  
  const canRender = () => {
    if (!isPermissionsLoaded) return false;
    
    if (permissionArray.length === 1) {
      return hasPermission(permissionArray[0]);
    }
    
    return requireAll ? hasAllPermissions(permissionArray) : hasAnyPermission(permissionArray);
  };

  return {
    canRender: canRender(),
    isLoading: !isPermissionsLoaded,
    permissions: permissionArray
  };
};

/**
 * Simple Bulk Permission Operations
 * For checking multiple permissions efficiently
 */
export const useBulkPermissions = () => {
  const { hasPermission, hasAnyPermission, hasAllPermissions, permissionKeys } = usePermissions();

  return {
    // Check multiple specific permissions
    checkMultiple: (permissions) => {
      return permissions.map(permission => ({
        permission,
        hasAccess: hasPermission(permission)
      }));
    },

    // Permission summary
    getSummary: () => {
      const userPermissionCount = permissionKeys.length;
      const totalAvailablePermissions = Object.keys(PERMISSIONS).length;

      return {
        userPermissionCount,
        totalAvailablePermissions,
        coverage: Math.round((userPermissionCount / totalAvailablePermissions) * 100)
      };
    }
  };
};

export default usePermissions;
