# Role-Based Access Control (RBAC) System

This document provides an overview of the RBAC system implemented in the Riwayat Admin Portal.

## Overview

The RBAC system controls access to various features and functionalities based on user permissions. Permissions are loaded at login time, stored globally, and used to control:

- Sidebar menu visibility
- Page route access
- UI component visibility (buttons, sections, etc.)
- Action availability

## Core Components

### 1. Permission Storage

Permissions are stored in the AuthContext and made available globally through PermissionsContext:

```jsx
// src/context/AuthContext.js
const [userPermissions, setUserPermissions] = useState([]);

// src/context/PermissionsContext.js
export const PermissionsContext = createContext([]);
export const usePermissions = () => useContext(PermissionsContext);
```

### 2. Permission Hook

The `usePermission` hook provides utility functions for permission checks:

```jsx
// src/hooks/usePermission.js
import { usePermissions } from '../context/PermissionsContext';

const usePermission = () => {
  const permissions = usePermissions();
  
  // Check if user has permission(s)
  const hasPermission = (permission, requireAll = false) => {
    if (!permission) return true;
    
    if (Array.isArray(permission)) {
      return requireAll
        ? permission.every(p => permissions.includes(p))
        : permission.some(p => permissions.includes(p));
    }
    
    return permissions.includes(permission);
  };
  
  // Filter array items by permission
  const filterByPermission = (items, permissionField) => {
    if (!items || !Array.isArray(items)) return [];
    return items.filter(item => hasPermission(item[permissionField]));
  };
  
  return { hasPermission, filterByPermission, permissions };
};

export default usePermission;
```

### 3. Permission Components

#### ProtectedRoute

Guards routes based on required permissions:

```jsx
// src/components/ProtectedRoute.js
import { Navigate } from 'react-router-dom';
import usePermission from '../hooks/usePermission';

const ProtectedRoute = ({ children, permission, requireAll = false }) => {
  const { hasPermission } = usePermission();
  
  if (!hasPermission(permission, requireAll)) {
    return <Navigate to="/unauthorized" replace />;
  }
  
  return children;
};

export default ProtectedRoute;
```

#### PermissionButton

A button that only renders if the user has the required permission:

```jsx
// src/components/PermissionButton.js
import usePermission from '../hooks/usePermission';

const PermissionButton = ({ permission, requireAll = false, children, ...props }) => {
  const { hasPermission } = usePermission();
  
  if (!permission || hasPermission(permission, requireAll)) {
    return <button {...props}>{children}</button>;
  }
  
  return null;
};
```

#### PermissionGate

Conditionally renders content based on permissions:

```jsx
// src/components/PermissionGate.js
import usePermission from '../hooks/usePermission';

const PermissionGate = ({ permission, requireAll = false, children, fallback = null }) => {
  const { hasPermission } = usePermission();
  
  if (!permission || hasPermission(permission, requireAll)) {
    return children;
  }
  
  return fallback;
};
```

## Usage Examples

### Protecting Routes

```jsx
// src/App.js
<Route path="/kitchens" element={
  <ProtectedRoute permission="view_kitchens">
    <KitchensList />
  </ProtectedRoute>
} />
```

### Conditional UI Elements

```jsx
// Conditional button
<PermissionButton permission="approve_dish" onClick={handleApprove}>
  Approve Dish
</PermissionButton>

// Conditional content
<PermissionGate 
  permission="edit_kitchen"
  fallback={<p>You don't have permission to edit</p>}
>
  <EditForm />
</PermissionGate>

// Multiple permissions (any)
<PermissionGate permission={['manage_users', 'view_analytics']} requireAll={false}>
  <AdminPanel />
</PermissionGate>

// Multiple permissions (all)
<PermissionGate permission={['view_kitchens', 'edit_kitchen']} requireAll={true}>
  <KitchenEditor />
</PermissionGate>
```

### Filtering Navigation Items

```jsx
// src/layouts/MainLayout.js
const navigation = [
  { name: 'Dashboard', href: '/', icon: HomeIcon, permission: null },
  { name: 'Kitchens', href: '/kitchens', icon: BuildingIcon, permission: 'view_kitchens' },
  // ...
];

// Filter navigation items based on permissions
const filteredNavigation = navigation.filter(item => 
  !item.permission || permissions.includes(item.permission)
);
```

### Direct Permission Checks

```jsx
const { hasPermission } = usePermission();

// Simple check
if (hasPermission('edit_kitchen')) {
  // Do something
}

// Check multiple permissions (any)
if (hasPermission(['approve_dish', 'reject_dish'], false)) {
  // User has either approve_dish OR reject_dish
}

// Check multiple permissions (all)
if (hasPermission(['view_orders', 'update_orders'], true)) {
  // User has both view_orders AND update_orders
}
```

### Filtering Data by Permission

```jsx
const { filterByPermission } = usePermission();

// Filter array of items by permission field
const menuItems = [
  { id: 1, name: 'Manage Users', permission: 'manage_users' },
  { id: 2, name: 'View Reports', permission: 'view_reports' },
  // ...
];

const allowedMenuItems = filterByPermission(menuItems, 'permission');
```

## Available Permissions

| Permission | Description |
|------------|-------------|
| view_kitchens | View kitchen listings and details |
| edit_kitchen | Edit kitchen information and status |
| approve_dish | Approve dishes for publication |
| reject_dish | Reject dishes |
| view_orders | View order listings and details |
| manage_users | Manage user accounts |
| send_broadcast | Send broadcast messages |
| view_analytics | View analytics reports |

## Demo Page

A demo page is available at `/permissions-demo` that showcases all permission components and provides examples of their usage.

## Implementation Notes

- Currently, permissions are mocked in the frontend for development purposes
- Permissions are embedded in JWT tokens during login
- The system is designed to be easily integrated with a real backend API
- The `hasRole` function in AuthContext is maintained for backward compatibility
