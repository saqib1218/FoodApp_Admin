import React, { useState, useEffect } from 'react';
import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { usePermissions } from '../context/PermissionsContext';
import {
  Bars3Icon,
  XMarkIcon,
  HomeIcon,
  BuildingStorefrontIcon,
  QueueListIcon,
  ShoppingBagIcon,
  ChatBubbleLeftRightIcon,
  UsersIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  BellIcon,
  ArrowRightOnRectangleIcon,
  CheckCircleIcon,
  XCircleIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline';

const MainLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showActionButtons, setShowActionButtons] = useState(false);
  const { currentUser, logout } = useAuth();
  const permissions = usePermissions();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  
  // Determine if current page is a moderation-heavy screen
  useEffect(() => {
    const moderationScreens = [
      '/onboarding',
      '/kitchens',
      '/orders'
    ];
    
    // Check if current path starts with any moderation screen path
    const isModeration = moderationScreens.some(screen => 
      location.pathname.startsWith(screen));
    
    setShowActionButtons(isModeration);
  }, [location]);

  // Define navigation items with required permissions
  const navigation = [
    { name: 'Dashboard', href: '/', icon: HomeIcon, permission: null }, // Always visible
    { name: 'Kitchens', href: '/kitchens', icon: BuildingStorefrontIcon, permission: 'view_kitchens' },
    { name: 'Onboarding Queue', href: '/onboarding', icon: QueueListIcon, permission: 'view_kitchens' },
    { name: 'Orders', href: '/orders', icon: ShoppingBagIcon, permission: 'view_orders' },
    { name: 'Engagement', href: '/engagement', icon: ChatBubbleLeftRightIcon, permission: 'send_broadcast' },
    { name: 'Customers', href: '/customers', icon: UsersIcon, permission: null }, // Always visible for now
    { name: 'Reports', href: '/reports', icon: ChartBarIcon, permission: null }, // Always visible for now
    { name: 'Settings', href: '/settings', icon: Cog6ToothIcon, permission: null }, // Always visible for now
    { name: 'Permissions Demo', href: '/permissions-demo', icon: ShieldCheckIcon, permission: null }, // Demo page for RBAC
  ];

  // Filter navigation items based on permissions
  const filteredNavigation = navigation.filter(item => 
    !item.permission || permissions.includes(item.permission)
  );

  return (
    <div className="h-screen flex overflow-hidden bg-background-offWhite">
      {/* Mobile sidebar */}
      <div
        className={`${
          sidebarOpen ? 'block' : 'hidden'
        } fixed inset-0 flex z-40 lg:hidden`}
        role="dialog"
        aria-modal="true"
      >
        <div
          className="fixed inset-0 bg-neutral-600 bg-opacity-75"
          aria-hidden="true"
          onClick={() => setSidebarOpen(false)}
        ></div>

        <div className="relative flex-1 flex flex-col max-w-xs w-full bg-primary-600">
          <div className="absolute top-0 right-0 -mr-12 pt-2">
            <button
              type="button"
              className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              onClick={() => setSidebarOpen(false)}
            >
              <span className="sr-only">Close sidebar</span>
              <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
            </button>
          </div>

          <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
            <div className="flex-shrink-0 flex items-center px-4">
              <h1 className="text-2xl font-bold text-white">Riwayat Admin</h1>
            </div>
            <nav className="mt-5 px-2 space-y-1">
              {filteredNavigation.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.href}
                  className={({ isActive }) =>
                    isActive
                      ? 'bg-primary-700 text-white group flex items-center px-2 py-2 text-base font-medium rounded-md'
                      : 'text-white hover:bg-primary-500 group flex items-center px-2 py-2 text-base font-medium rounded-md'
                  }
                >
                  <item.icon
                    className="mr-4 flex-shrink-0 h-6 w-6 text-primary-200"
                    aria-hidden="true"
                  />
                  {item.name}
                </NavLink>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* Static sidebar for desktop */}
      <div className="hidden lg:flex lg:flex-shrink-0">
        <div className="flex flex-col w-64">
          <div className="flex-1 flex flex-col min-h-0 bg-primary-600">
            <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
              <div className="flex items-center flex-shrink-0 px-4">
                <h1 className="text-2xl font-bold text-white">Riwayat Admin</h1>
              </div>
              <nav className="mt-5 flex-1 px-2 space-y-1">
                {filteredNavigation.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.href}
                    className={({ isActive }) =>
                      isActive
                        ? 'bg-primary-700 text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md'
                        : 'text-white hover:bg-primary-500 group flex items-center px-2 py-2 text-sm font-medium rounded-md'
                    }
                  >
                    <item.icon
                      className="mr-3 flex-shrink-0 h-6 w-6 text-neutral-200"
                      aria-hidden="true"
                    />
                    {item.name}
                  </NavLink>
                ))}
              </nav>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-col w-0 flex-1 overflow-hidden ">
        {/* Top navigation */}
        <div className="relative z-10 flex-shrink-0 flex h-16 bg-white shadow">
          <button
            type="button"
            className="px-4 border-r border-neutral-200 text-neutral-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-600 lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
          <div className="flex-1 px-4 flex justify-between">
            <div className="flex-1 flex"></div>
            <div className="ml-4 flex items-center md:ml-6">
              {/* Notification dropdown */}
              <button className="p-1 rounded-full text-neutral-400 hover:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-600">
                <span className="sr-only">View notifications</span>
                <BellIcon className="h-6 w-6" aria-hidden="true" />
              </button>

              {/* Profile dropdown */}
              <div className="ml-3 relative flex items-center">
                <div className="flex items-center">
                  <div className="ml-3">
                    <div className="text-base font-medium text-neutral-800">
                      {currentUser?.name || 'Admin User'}
                    </div>
                    <div className="text-sm font-medium text-neutral-500">
                      {currentUser?.email || 'admin@riwayat.com'}
                    </div>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="ml-4 p-1 rounded-full text-neutral-400 hover:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-600"
                >
                  <span className="sr-only">Logout</span>
                  <ArrowRightOnRectangleIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Fixed action buttons for moderation screens - with permission checks */}
        {showActionButtons && (
          <div className="fixed bottom-8 right-8 flex flex-col space-y-4 z-50">
            {permissions.includes('approve_dish') && (
              <button 
                className="p-4 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                aria-label="Approve"
              >
                <CheckCircleIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            )}
            {permissions.includes('edit_kitchen') && (
              <button 
                className="p-4 bg-primary-600 text-white rounded-full shadow-lg hover:bg-primary-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-600"
                aria-label="Reject"
              >
                <XCircleIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            )}
          </div>
        )}

        {/* Page content */}
        <main className="flex-1 relative overflow-y-auto focus:outline-none">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
