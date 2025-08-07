import React from 'react';
import { Link } from 'react-router-dom';
import {
  BuildingStorefrontIcon,
  ShoppingBagIcon,
  ExclamationTriangleIcon,
  ChatBubbleLeftRightIcon,
  ArrowRightIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon
} from '@heroicons/react/24/outline';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Title } from 'chart.js';
import { Doughnut, Line } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Title);

const Dashboard = () => {
  // Mock data for summary cards
  const summaryData = {
    pendingKitchens: 12,
    ordersToday: 87,
    flaggedDishes: 5,
    activeEngagements: 23
  };

  // Mock data for recent activity
  const recentActivity = [
    {
      id: 1,
      type: 'kitchen_approved',
      message: 'Lahori Delights kitchen was approved',
      timestamp: '2 hours ago',
      user: 'Admin',
      status: 'success'
    },
    {
      id: 2,
      type: 'order_completed',
      message: 'Order #4582 was delivered successfully',
      timestamp: '3 hours ago',
      user: 'System',
      status: 'success'
    },
    {
      id: 3,
      type: 'dish_rejected',
      message: 'Chicken Biryani dish was rejected',
      timestamp: '5 hours ago',
      user: 'Moderator',
      status: 'error'
    },
    {
      id: 4,
      type: 'customer_issue',
      message: 'Customer reported late delivery for order #4570',
      timestamp: '1 day ago',
      user: 'System',
      status: 'warning'
    },
    {
      id: 5,
      type: 'kitchen_onboarding',
      message: 'New kitchen application received: Karachi Flavors',
      timestamp: '1 day ago',
      user: 'System',
      status: 'info'
    }
  ];

  // Mock data for orders chart
  const orderChartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Orders',
        data: [65, 59, 80, 81, 56, 90, 87],
        borderColor: 'rgb(14, 165, 233)',
        backgroundColor: 'rgba(14, 165, 233, 0.5)',
        tension: 0.3
      }
    ]
  };

  // Mock data for kitchen status chart
  const kitchenChartData = {
    labels: ['Active', 'Pending', 'Suspended'],
    datasets: [
      {
        data: [75, 12, 8],
        backgroundColor: [
          'rgba(14, 165, 233, 0.7)',
          'rgba(245, 158, 11, 0.7)',
          'rgba(239, 68, 68, 0.7)'
        ],
        borderColor: [
          'rgb(14, 165, 233)',
          'rgb(245, 158, 11)',
          'rgb(239, 68, 68)'
        ],
        borderWidth: 1
      }
    ]
  };

  // Quick actions list
  const quickActions = [
    { name: 'Review Pending Kitchens', href: '/onboarding', icon: BuildingStorefrontIcon },
    { name: 'Moderate Flagged Dishes', href: '/kitchens', icon: ExclamationTriangleIcon },
    { name: 'Process Today\'s Orders', href: '/orders', icon: ShoppingBagIcon },
    { name: 'Send Broadcast Message', href: '/engagement', icon: ChatBubbleLeftRightIcon }
  ];

  // Helper function for activity icon
  const getActivityIcon = (type, status) => {
    switch (status) {
      case 'success':
        return <CheckCircleIcon className="h-5 w-5 text-green-500" />;
      case 'error':
        return <XCircleIcon className="h-5 w-5 text-red-500" />;
      case 'warning':
        return <ExclamationTriangleIcon className="h-5 w-5 text-amber-500" />;
      default:
        return <ClockIcon className="h-5 w-5 text-gray-400" />;
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">
          Overview of Riwayat platform operations
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-6">
        <div className="card bg-white overflow-hidden">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-primary-100 rounded-md p-3">
              <BuildingStorefrontIcon className="h-6 w-6 text-primary-600" aria-hidden="true" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">Kitchens Pending Approval</dt>
                <dd>
                  <div className="text-lg font-medium text-gray-900">{summaryData.pendingKitchens}</div>
                </dd>
              </dl>
            </div>
          </div>
          <div className="mt-4">
            <Link to="/onboarding" className="text-sm font-medium text-primary-600 hover:text-primary-500 flex items-center">
              View all pending kitchens
              <ArrowRightIcon className="ml-1 h-4 w-4" />
            </Link>
          </div>
        </div>

        <div className="card bg-white overflow-hidden">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-primary-100 rounded-md p-3">
              <ShoppingBagIcon className="h-6 w-6 text-primary-600" aria-hidden="true" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">Orders Today</dt>
                <dd>
                  <div className="text-lg font-medium text-gray-900">{summaryData.ordersToday}</div>
                </dd>
              </dl>
            </div>
          </div>
          <div className="mt-4">
            <Link to="/orders" className="text-sm font-medium text-primary-600 hover:text-primary-500 flex items-center">
              View all orders
              <ArrowRightIcon className="ml-1 h-4 w-4" />
            </Link>
          </div>
        </div>

        <div className="card bg-white overflow-hidden">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-primary-100 rounded-md p-3">
              <ExclamationTriangleIcon className="h-6 w-6 text-primary-600" aria-hidden="true" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">Flagged Dishes</dt>
                <dd>
                  <div className="text-lg font-medium text-gray-900">{summaryData.flaggedDishes}</div>
                </dd>
              </dl>
            </div>
          </div>
          <div className="mt-4">
            <Link to="/kitchens" className="text-sm font-medium text-primary-600 hover:text-primary-500 flex items-center">
              Review flagged dishes
              <ArrowRightIcon className="ml-1 h-4 w-4" />
            </Link>
          </div>
        </div>

        <div className="card bg-white overflow-hidden">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-primary-100 rounded-md p-3">
              <ChatBubbleLeftRightIcon className="h-6 w-6 text-primary-600" aria-hidden="true" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">Active Engagements</dt>
                <dd>
                  <div className="text-lg font-medium text-gray-900">{summaryData.activeEngagements}</div>
                </dd>
              </dl>
            </div>
          </div>
          <div className="mt-4">
            <Link to="/engagement" className="text-sm font-medium text-primary-600 hover:text-primary-500 flex items-center">
              View all engagements
              <ArrowRightIcon className="ml-1 h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Charts and Activity Section */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        {/* Charts */}
        <div className="lg:col-span-2 grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div className="card">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Orders This Week</h3>
            <div className="h-64">
              <Line 
                data={orderChartData} 
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  scales: {
                    y: {
                      beginAtZero: true
                    }
                  }
                }}
              />
            </div>
          </div>
          
          <div className="card">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Kitchen Status</h3>
            <div className="h-64 flex items-center justify-center">
              <Doughnut 
                data={kitchenChartData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false
                }}
              />
            </div>
          </div>
        </div>

        {/* Activity Feed and Quick Actions */}
        <div className="space-y-5">
          {/* Recent Activity */}
          <div className="card">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h3>
            <div className="flow-root">
              <ul className="-my-5 divide-y divide-gray-200">
                {recentActivity.map((activity) => (
                  <li key={activity.id} className="py-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        {getActivityIcon(activity.type, activity.status)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {activity.message}
                        </p>
                        <p className="text-sm text-gray-500 truncate">
                          {activity.user} • {activity.timestamp}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-6">
              <Link to="/reports" className="text-sm font-medium text-primary-600 hover:text-primary-500 flex items-center justify-center">
                View all activity
                <ArrowRightIcon className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="card">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
            <div className="flow-root">
              <ul className="-my-2 divide-y divide-gray-200">
                {quickActions.map((action) => (
                  <li key={action.name}>
                    <Link to={action.href} className="py-3 flex items-center hover:bg-gray-50 px-2 rounded-md">
                      <action.icon className="flex-shrink-0 h-5 w-5 text-gray-400" aria-hidden="true" />
                      <span className="ml-3 text-sm font-medium text-gray-900">{action.name}</span>
                      <ArrowRightIcon className="ml-auto h-4 w-4 text-gray-400" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
