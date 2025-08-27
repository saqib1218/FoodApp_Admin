import React, { useState, useEffect, useContext } from 'react';
import { KitchenContext } from './index';
import { useGetKitchenAnalyticsQuery, useGetKitchenStatsQuery } from '../../../store/api/modules/kitchens/kitchensApi';
import PermissionGate from '../../../components/PermissionGate';
import { useAuth } from '../../../context/useAuth';

const KitchenAnalyticsTab = () => {
  const { kitchen } = useContext(KitchenContext);
  const kitchenId = kitchen?.id;
  const { hasPermission } = useAuth();

  // State variables
  const [dateRange, setDateRange] = useState('month');

  // RTK Query hooks
  const {
    data: analytics = {},
    isLoading: isLoadingAnalytics,
    error: analyticsError
  } = useGetKitchenAnalyticsQuery({ 
    kitchenId, 
    period: dateRange 
  }, {
    skip: !kitchenId || !hasPermission('view_kitchen_analytics')
  });

  const {
    data: kitchenStats = {},
    isLoading: isLoadingStats,
    error: statsError
  } = useGetKitchenStatsQuery(kitchenId, {
    skip: !kitchenId || !hasPermission('view_kitchen_analytics')
  });

  const isLoading = isLoadingAnalytics || isLoadingStats;

  // Extract data from RTK Query responses
  const topDishes = analytics?.topDishes || [];
  const orderTrends = analytics?.orderTrends || [];
  const revenueData = analytics?.revenueData || [];

  if (!hasPermission('view_kitchen_analytics')) {
    return (
      <div className="p-6 text-center">
        <p className="text-gray-500">You don't have permission to view kitchen analytics.</p>
      </div>
    );
  }

  // Handle date range change
  const handleDateRangeChange = (e) => {
    setDateRange(e.target.value);
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-PK', {
      style: 'currency',
      currency: 'PKR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  // Format percentage
  const formatPercentage = (value) => {
    return `${(value * 100).toFixed(1)}%`;
  };

  // Get trend indicator class
  const getTrendIndicatorClass = (trend) => {
    if (trend > 0) return 'text-green-500';
    if (trend < 0) return 'text-red-500';
    return 'text-neutral-500';
  };

  // Get trend arrow
  const getTrendArrow = (trend) => {
    if (trend > 0) return '↑';
    if (trend < 0) return '↓';
    return '→';
  };

  if (!hasPermission('view_kitchen_analytics')) {
    return (
      <div className="text-center py-12 bg-neutral-50 rounded-lg">
        <p className="text-neutral-500">You don't have permission to view kitchen analytics.</p>
      </div>
    );
  }

  if (isLoading && !analytics) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div>
          <h3 className="text-lg font-medium text-neutral-900">Kitchen Analytics</h3>
          <p className="mt-1 text-sm text-neutral-500">
            Performance metrics and insights for this kitchen.
          </p>
        </div>
        
        <div className="mt-4 sm:mt-0">
          <select
            value={dateRange}
            onChange={handleDateRangeChange}
            className="p-2 border border-neutral-300 rounded-lg text-sm"
          >
            <option value="last7days">Last 7 Days</option>
            <option value="last30days">Last 30 Days</option>
            <option value="last90days">Last 90 Days</option>
            <option value="thisMonth">This Month</option>
            <option value="lastMonth">Last Month</option>
            <option value="thisYear">This Year</option>
          </select>
        </div>
      </div>

      {/* Summary Cards */}
      {analytics && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {/* Total Orders */}
          <div className="bg-white rounded-lg border border-neutral-200 p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-neutral-500">Total Orders</p>
                <p className="mt-2 text-2xl font-medium text-neutral-900">{analytics.totalOrders}</p>
              </div>
              <div className={`text-sm font-medium ${getTrendIndicatorClass(analytics.ordersTrend)}`}>
                {getTrendArrow(analytics.ordersTrend)} {formatPercentage(Math.abs(analytics.ordersTrend))}
              </div>
            </div>
            <p className="mt-2 text-xs text-neutral-500">vs. previous period</p>
          </div>
          
          {/* Total Revenue */}
          <div className="bg-white rounded-lg border border-neutral-200 p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-neutral-500">Total Revenue</p>
                <p className="mt-2 text-2xl font-medium text-neutral-900">{formatCurrency(analytics.totalRevenue)}</p>
              </div>
              <div className={`text-sm font-medium ${getTrendIndicatorClass(analytics.revenueTrend)}`}>
                {getTrendArrow(analytics.revenueTrend)} {formatPercentage(Math.abs(analytics.revenueTrend))}
              </div>
            </div>
            <p className="mt-2 text-xs text-neutral-500">vs. previous period</p>
          </div>
          
          {/* Average Order Value */}
          <div className="bg-white rounded-lg border border-neutral-200 p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-neutral-500">Avg. Order Value</p>
                <p className="mt-2 text-2xl font-medium text-neutral-900">{formatCurrency(analytics.averageOrderValue)}</p>
              </div>
              <div className={`text-sm font-medium ${getTrendIndicatorClass(analytics.aovTrend)}`}>
                {getTrendArrow(analytics.aovTrend)} {formatPercentage(Math.abs(analytics.aovTrend))}
              </div>
            </div>
            <p className="mt-2 text-xs text-neutral-500">vs. previous period</p>
          </div>
          
          {/* Customer Satisfaction */}
          <div className="bg-white rounded-lg border border-neutral-200 p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-neutral-500">Customer Rating</p>
                <p className="mt-2 text-2xl font-medium text-neutral-900">{analytics.averageRating.toFixed(1)}/5.0</p>
              </div>
              <div className={`text-sm font-medium ${getTrendIndicatorClass(analytics.ratingTrend)}`}>
                {getTrendArrow(analytics.ratingTrend)} {formatPercentage(Math.abs(analytics.ratingTrend))}
              </div>
            </div>
            <p className="mt-2 text-xs text-neutral-500">Based on {analytics.totalRatings} ratings</p>
          </div>
        </div>
      )}

      {/* Order Status Distribution */}
      {analytics && (
        <div className="mb-8 bg-white rounded-lg border border-neutral-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-neutral-200">
            <h4 className="text-base font-medium text-neutral-900">Order Status Distribution</h4>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {Object.entries(analytics.orderStatusDistribution).map(([status, count]) => (
                <div key={status} className="text-center">
                  <div className="text-2xl font-medium text-neutral-900">{count}</div>
                  <div className="mt-1 text-sm text-neutral-500 capitalize">{status}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Top Dishes */}
      <div className="mb-8 bg-white rounded-lg border border-neutral-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-neutral-200">
          <h4 className="text-base font-medium text-neutral-900">Top Performing Dishes</h4>
        </div>
        <div className="p-6">
          {topDishes.length === 0 ? (
            <div className="text-center py-8 bg-neutral-50 rounded-lg">
              <p className="text-neutral-500">No dish data available for the selected period.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-neutral-200">
                <thead className="bg-neutral-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      Dish
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      Orders
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      Revenue
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      Avg. Rating
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-neutral-200">
                  {topDishes.map((dish) => (
                    <tr key={dish.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded-md overflow-hidden bg-neutral-100 flex-shrink-0">
                            {dish.image ? (
                              <img
                                src={dish.image}
                                alt={dish.name}
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              <div className="h-full w-full bg-neutral-200"></div>
                            )}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-neutral-900">{dish.name}</div>
                            <div className="text-xs text-neutral-500">{dish.category}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-neutral-700">{dish.orderCount}</div>
                        <div className="text-xs text-neutral-500">
                          {dish.orderPercentage > 0 && (
                            <span className={getTrendIndicatorClass(1)}>
                              {formatPercentage(dish.orderPercentage)} of total
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-neutral-700">{formatCurrency(dish.revenue)}</div>
                        <div className="text-xs text-neutral-500">
                          {dish.revenuePercentage > 0 && (
                            <span className={getTrendIndicatorClass(1)}>
                              {formatPercentage(dish.revenuePercentage)} of total
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-neutral-700">{dish.averageRating.toFixed(1)}/5.0</div>
                        <div className="text-xs text-neutral-500">({dish.ratingCount} ratings)</div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Order Trends */}
      <div className="mb-8 bg-white rounded-lg border border-neutral-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-neutral-200">
          <h4 className="text-base font-medium text-neutral-900">Order Trends</h4>
        </div>
        <div className="p-6">
          {orderTrends.length === 0 ? (
            <div className="text-center py-8 bg-neutral-50 rounded-lg">
              <p className="text-neutral-500">No order trend data available for the selected period.</p>
            </div>
          ) : (
            <div className="h-64">
              {/* Chart would go here - using a placeholder */}
              <div className="h-full w-full bg-neutral-50 flex items-center justify-center rounded-lg">
                <p className="text-neutral-500">Order trend chart would be rendered here</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Revenue Breakdown */}
      <div className="bg-white rounded-lg border border-neutral-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-neutral-200">
          <h4 className="text-base font-medium text-neutral-900">Revenue Breakdown</h4>
        </div>
        <div className="p-6">
          {revenueData.length === 0 ? (
            <div className="text-center py-8 bg-neutral-50 rounded-lg">
              <p className="text-neutral-500">No revenue data available for the selected period.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Revenue by Category */}
              <div>
                <h5 className="text-sm font-medium text-neutral-700 mb-4">Revenue by Category</h5>
                <div className="space-y-4">
                  {revenueData.filter(item => item.type === 'category').map((item) => (
                    <div key={item.name}>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-neutral-700">{item.name}</span>
                        <span className="text-sm text-neutral-700">{formatCurrency(item.value)}</span>
                      </div>
                      <div className="w-full bg-neutral-200 rounded-full h-2">
                        <div
                          className="bg-primary-600 h-2 rounded-full"
                          style={{ width: `${item.percentage * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Revenue by Time */}
              <div>
                <h5 className="text-sm font-medium text-neutral-700 mb-4">Revenue by Time of Day</h5>
                <div className="space-y-4">
                  {revenueData.filter(item => item.type === 'timeOfDay').map((item) => (
                    <div key={item.name}>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-neutral-700">{item.name}</span>
                        <span className="text-sm text-neutral-700">{formatCurrency(item.value)}</span>
                      </div>
                      <div className="w-full bg-neutral-200 rounded-full h-2">
                        <div
                          className="bg-primary-600 h-2 rounded-full"
                          style={{ width: `${item.percentage * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default KitchenAnalyticsTab;
