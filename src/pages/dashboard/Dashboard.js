import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowUpIcon, 
  ArrowDownIcon, 
  ShoppingBagIcon, 
  UserGroupIcon, 
  BuildingStorefrontIcon,
  ClockIcon
} from '@heroicons/react/24/outline';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [recentOrders, setRecentOrders] = useState([]);
  const [pendingKitchens, setPendingKitchens] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // This would be replaced with API calls in production
    const fetchDashboardData = () => {
      // Mock data for dashboard
      const mockStats = {
        totalSales: {
          value: 45000,
          change: 12.5,
          trend: 'up'
        },
        totalOrders: {
          value: 320,
          change: 8.2,
          trend: 'up'
        },
        activeKitchens: {
          value: 28,
          change: 4.1,
          trend: 'up'
        },
        newCustomers: {
          value: 45,
          change: -2.3,
          trend: 'down'
        }
      };

      const mockRecentOrders = [
        {
          id: 'ORD-001',
          customer: 'Ahmed Khan',
          date: '2023-06-28 18:30',
          total: 1250,
          status: 'delivered'
        },
        {
          id: 'ORD-002',
          customer: 'Sara Ali',
          date: '2023-06-28 17:15',
          total: 850,
          status: 'preparing'
        },
        {
          id: 'ORD-003',
          customer: 'Bilal Ahmad',
          date: '2023-06-28 16:45',
          total: 1800,
          status: 'in-transit'
        },
        {
          id: 'ORD-004',
          customer: 'Ayesha Malik',
          date: '2023-06-28 15:20',
          total: 950,
          status: 'cancelled'
        },
        {
          id: 'ORD-005',
          customer: 'Zainab Hussain',
          date: '2023-06-28 14:10',
          total: 1100,
          status: 'delivered'
        }
      ];

      const mockPendingKitchens = [
        {
          id: 1,
          name: 'Karachi Flavors',
          owner: 'Fahad Khan',
          location: 'Karachi',
          submittedDate: '2023-06-27',
          status: 'pending_review'
        },
        {
          id: 2,
          name: 'Lahore Cuisine',
          owner: 'Amina Ali',
          location: 'Lahore',
          submittedDate: '2023-06-26',
          status: 'pending_review'
        },
        {
          id: 3,
          name: 'Islamabad Grill',
          owner: 'Usman Ahmed',
          location: 'Islamabad',
          submittedDate: '2023-06-25',
          status: 'pending_documents'
        }
      ];

      setStats(mockStats);
      setRecentOrders(mockRecentOrders);
      setPendingKitchens(mockPendingKitchens);
      setIsLoading(false);
    };

    fetchDashboardData();
  }, []);

  // Helper function to get status badge
  const getStatusBadge = (status) => {
    switch (status) {
      case 'delivered':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            Delivered
          </span>
        );
      case 'preparing':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            Preparing
          </span>
        );
      case 'in-transit':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            In Transit
          </span>
        );
      case 'cancelled':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            Cancelled
          </span>
        );
      case 'pending_review':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
            Pending Review
          </span>
        );
      case 'pending_documents':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
            Pending Documents
          </span>
        );
      default:
        return null;
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">
          Overview of your platform's performance and activity
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-6">
        {/* Total Sales */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <ShoppingBagIcon className="h-6 w-6 text-gray-400" aria-hidden="true" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Total Sales</dt>
                  <dd>
                    <div className="flex items-baseline">
                      <p className="text-2xl font-semibold text-gray-900">PKR {stats.totalSales.value.toLocaleString()}</p>
                      <p className={`ml-2 flex items-baseline text-sm font-semibold ${
                        stats.totalSales.trend === 'up' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {stats.totalSales.trend === 'up' ? (
                          <ArrowUpIcon className="self-center flex-shrink-0 h-4 w-4 text-green-500" aria-hidden="true" />
                        ) : (
                          <ArrowDownIcon className="self-center flex-shrink-0 h-4 w-4 text-red-500" aria-hidden="true" />
                        )}
                        <span className="sr-only">{stats.totalSales.trend === 'up' ? 'Increased' : 'Decreased'} by</span>
                        {stats.totalSales.change}%
                      </p>
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-5 py-3">
            <div className="text-sm">
              <Link to="/reports" className="font-medium text-primary-700 hover:text-primary-900">
                View all
              </Link>
            </div>
          </div>
        </div>

        {/* Total Orders */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <ShoppingBagIcon className="h-6 w-6 text-gray-400" aria-hidden="true" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Total Orders</dt>
                  <dd>
                    <div className="flex items-baseline">
                      <p className="text-2xl font-semibold text-gray-900">{stats.totalOrders.value}</p>
                      <p className={`ml-2 flex items-baseline text-sm font-semibold ${
                        stats.totalOrders.trend === 'up' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {stats.totalOrders.trend === 'up' ? (
                          <ArrowUpIcon className="self-center flex-shrink-0 h-4 w-4 text-green-500" aria-hidden="true" />
                        ) : (
                          <ArrowDownIcon className="self-center flex-shrink-0 h-4 w-4 text-red-500" aria-hidden="true" />
                        )}
                        <span className="sr-only">{stats.totalOrders.trend === 'up' ? 'Increased' : 'Decreased'} by</span>
                        {stats.totalOrders.change}%
                      </p>
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-5 py-3">
            <div className="text-sm">
              <Link to="/orders" className="font-medium text-primary-700 hover:text-primary-900">
                View all
              </Link>
            </div>
          </div>
        </div>

        {/* Active Kitchens */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <BuildingStorefrontIcon className="h-6 w-6 text-gray-400" aria-hidden="true" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Active Kitchens</dt>
                  <dd>
                    <div className="flex items-baseline">
                      <p className="text-2xl font-semibold text-gray-900">{stats.activeKitchens.value}</p>
                      <p className={`ml-2 flex items-baseline text-sm font-semibold ${
                        stats.activeKitchens.trend === 'up' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {stats.activeKitchens.trend === 'up' ? (
                          <ArrowUpIcon className="self-center flex-shrink-0 h-4 w-4 text-green-500" aria-hidden="true" />
                        ) : (
                          <ArrowDownIcon className="self-center flex-shrink-0 h-4 w-4 text-red-500" aria-hidden="true" />
                        )}
                        <span className="sr-only">{stats.activeKitchens.trend === 'up' ? 'Increased' : 'Decreased'} by</span>
                        {stats.activeKitchens.change}%
                      </p>
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-5 py-3">
            <div className="text-sm">
              <Link to="/kitchens" className="font-medium text-primary-700 hover:text-primary-900">
                View all
              </Link>
            </div>
          </div>
        </div>

        {/* New Customers */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <UserGroupIcon className="h-6 w-6 text-gray-400" aria-hidden="true" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">New Customers</dt>
                  <dd>
                    <div className="flex items-baseline">
                      <p className="text-2xl font-semibold text-gray-900">{stats.newCustomers.value}</p>
                      <p className={`ml-2 flex items-baseline text-sm font-semibold ${
                        stats.newCustomers.trend === 'up' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {stats.newCustomers.trend === 'up' ? (
                          <ArrowUpIcon className="self-center flex-shrink-0 h-4 w-4 text-green-500" aria-hidden="true" />
                        ) : (
                          <ArrowDownIcon className="self-center flex-shrink-0 h-4 w-4 text-red-500" aria-hidden="true" />
                        )}
                        <span className="sr-only">{stats.newCustomers.trend === 'up' ? 'Increased' : 'Decreased'} by</span>
                        {Math.abs(stats.newCustomers.change)}%
                      </p>
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-5 py-3">
            <div className="text-sm">
              <Link to="/customers" className="font-medium text-primary-700 hover:text-primary-900">
                View all
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Orders and Pending Kitchens */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        {/* Recent Orders */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200 flex justify-between items-center">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Recent Orders</h3>
            <Link to="/orders" className="text-sm font-medium text-primary-600 hover:text-primary-500">
              View all
            </Link>
          </div>
          <div className="overflow-hidden">
            <ul className="divide-y divide-gray-200">
              {recentOrders.map((order) => (
                <li key={order.id}>
                  <Link to={`/orders/${order.id}`} className="block hover:bg-gray-50">
                    <div className="px-4 py-4 sm:px-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <p className="text-sm font-medium text-primary-600 truncate">{order.id}</p>
                          <div className="ml-2">{getStatusBadge(order.status)}</div>
                        </div>
                        <div className="ml-2 flex-shrink-0 flex">
                          <p className="text-sm text-gray-500">PKR {order.total}</p>
                        </div>
                      </div>
                      <div className="mt-2 sm:flex sm:justify-between">
                        <div className="sm:flex">
                          <p className="flex items-center text-sm text-gray-500">
                            {order.customer}
                          </p>
                        </div>
                        <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                          <ClockIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                          <p>{order.date}</p>
                        </div>
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Pending Kitchen Onboarding */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200 flex justify-between items-center">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Pending Kitchen Onboarding</h3>
            <Link to="/onboarding" className="text-sm font-medium text-primary-600 hover:text-primary-500">
              View all
            </Link>
          </div>
          <div className="overflow-hidden">
            <ul className="divide-y divide-gray-200">
              {pendingKitchens.map((kitchen) => (
                <li key={kitchen.id}>
                  <Link to={`/kitchens/${kitchen.id}`} className="block hover:bg-gray-50">
                    <div className="px-4 py-4 sm:px-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <p className="text-sm font-medium text-primary-600 truncate">{kitchen.name}</p>
                          <div className="ml-2">{getStatusBadge(kitchen.status)}</div>
                        </div>
                      </div>
                      <div className="mt-2 sm:flex sm:justify-between">
                        <div className="sm:flex">
                          <p className="flex items-center text-sm text-gray-500">
                            {kitchen.owner} • {kitchen.location}
                          </p>
                        </div>
                        <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                          <ClockIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                          <p>Submitted {kitchen.submittedDate}</p>
                        </div>
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
