import { usePermissions } from '../context/PermissionsContext';

/**
 * Custom hook for checking user permissions
 * @returns {Object} Permission checking functions
 */
const usePermission = () => {
  const permissions = usePermissions();

  /**
   * Check if user has a specific permission
   * @param {string|string[]} requiredPermission - Permission(s) to check
   * @param {boolean} requireAll - If true, user must have all permissions in array (default: false)
   * @returns {boolean} Whether user has the required permission(s)
   */
  const hasPermission = (requiredPermission, requireAll = false) => {
    if (!permissions || permissions.length === 0) return false;
    
    // For simple permission check
    if (typeof requiredPermission === 'string') {
      return permissions.includes(requiredPermission);
    }
    
    // For array of permissions
    if (Array.isArray(requiredPermission)) {
      if (requireAll) {
        // User must have ALL permissions in the array
        return requiredPermission.every(perm => permissions.includes(perm));
      } else {
        // User must have ANY permission in the array
        return requiredPermission.some(perm => permissions.includes(perm));
      }
    }
    
    return false;
  };

  /**
   * Filter an array of items based on permission requirements
   * @param {Array} items - Array of items to filter
   * @param {string} permissionKey - Object key containing permission requirement
   * @returns {Array} Filtered array of items
   */
  const filterByPermission = (items, permissionKey = 'permission') => {
    if (!Array.isArray(items)) return [];
    
    return items.filter(item => {
      const requiredPermission = item[permissionKey];
      if (!requiredPermission) return true; // No permission required
      return hasPermission(requiredPermission);
    });
  };

  return {
    hasPermission,
    filterByPermission,
    permissions
  };
};

export default usePermission;
