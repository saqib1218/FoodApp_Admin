import React, { useState, useEffect } from 'react';
import { ChartBarIcon, ChartPieIcon, CalendarIcon, ArrowDownTrayIcon } from '@heroicons/react/24/outline';

const Reports = () => {
  const [activeTab, setActiveTab] = useState('sales');
  const [dateRange, setDateRange] = useState('month');
  const [isLoading, setIsLoading] = useState(true);
  const [reportData, setReportData] = useState(null);

  useEffect(() => {
    // This would be replaced with an API call in production
    const fetchReportData = () => {
      // Mock data for reports
      const mockReportData = {
        sales: {
          total: 125000,
          previousPeriod: 110000,
          percentChange: 13.6,
          dailyData: [
            { date: '2023-06-01', value: 3500 },
            { date: '2023-06-02', value: 4200 },
            { date: '2023-06-03', value: 3800 },
            { date: '2023-06-04', value: 4500 },
            { date: '2023-06-05', value: 5100 },
            { date: '2023-06-06', value: 4700 },
            { date: '2023-06-07', value: 3900 }
          ],
          topKitchens: [
            { name: 'Lahori Delights', value: 28000 },
            { name: 'Karachi Flavors', value: 22000 },
            { name: 'Peshawar Tikka House', value: 18000 },
            { name: 'Islamabad Cuisine', value: 15000 },
            { name: 'Quetta BBQ', value: 12000 }
          ]
        },
        orders: {
          total: 850,
          previousPeriod: 720,
          percentChange: 18.1,
          dailyData: [
            { date: '2023-06-01', value: 25 },
            { date: '2023-06-02', value: 32 },
            { date: '2023-06-03', value: 28 },
            { date: '2023-06-04', value: 35 },
            { date: '2023-06-05', value: 40 },
            { date: '2023-06-06', value: 38 },
            { date: '2023-06-07', value: 30 }
          ],
          byStatus: [
            { status: 'delivered', count: 780 },
            { status: 'cancelled', count: 45 },
            { status: 'refunded', count: 25 }
          ]
        },
        customers: {
          total: 320,
          newCustomers: 45,
          returningCustomers: 275,
          percentNew: 14.1,
          topCities: [
            { city: 'Lahore', count: 120 },
            { city: 'Karachi', count: 85 },
            { city: 'Islamabad', count: 55 },
            { city: 'Peshawar', count: 35 },
            { city: 'Quetta', count: 25 }
          ]
        }
      };

      setReportData(mockReportData);
      setIsLoading(false);
    };

    fetchReportData();
  }, [dateRange]);

  const getDateRangeLabel = () => {
    switch (dateRange) {
      case 'week':
        return 'Last 7 days';
      case 'month':
        return 'Last 30 days';
      case 'quarter':
        return 'Last 3 months';
      case 'year':
        return 'Last 12 months';
      default:
        return '';
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Reports</h1>
        <p className="mt-1 text-sm text-gray-500">
          View platform analytics and performance metrics
        </p>
      </div>

      {/* Date Range Selector */}
      <div className="bg-white shadow rounded-lg mb-6 p-4 flex items-center justify-between">
        <div className="flex items-center">
          <CalendarIcon className="h-5 w-5 text-gray-400 mr-2" />
          <span className="text-gray-700">{getDateRangeLabel()}</span>
        </div>
        <div>
          <select
            id="date-range"
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
          >
            <option value="week">Last 7 days</option>
            <option value="month">Last 30 days</option>
            <option value="quarter">Last 3 months</option>
            <option value="year">Last 12 months</option>
          </select>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('sales')}
            className={`${
              activeTab === 'sales'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
          >
            <ChartBarIcon className="h-5 w-5 mr-2" />
            Sales
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`${
              activeTab === 'orders'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
          >
            <ChartBarIcon className="h-5 w-5 mr-2" />
            Orders
          </button>
          <button
            onClick={() => setActiveTab('customers')}
            className={`${
              activeTab === 'customers'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
          >
            <ChartPieIcon className="h-5 w-5 mr-2" />
            Customers
          </button>
        </nav>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
        </div>
      ) : (
        <div>
          {/* Sales Report */}
          {activeTab === 'sales' && reportData && (
            <div className="space-y-6">
              {/* Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white shadow rounded-lg p-6">
                  <h3 className="text-lg font-medium text-gray-900">Total Sales</h3>
                  <p className="mt-2 text-3xl font-semibold text-gray-900">PKR {reportData.sales.total.toLocaleString()}</p>
                  <div className="mt-2 flex items-center">
                    <span className={`text-sm ${reportData.sales.percentChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {reportData.sales.percentChange >= 0 ? '+' : ''}{reportData.sales.percentChange}%
                    </span>
                    <span className="text-sm text-gray-500 ml-2">vs previous period</span>
                  </div>
                </div>
                <div className="bg-white shadow rounded-lg p-6">
                  <h3 className="text-lg font-medium text-gray-900">Average Order Value</h3>
                  <p className="mt-2 text-3xl font-semibold text-gray-900">
                    PKR {Math.round(reportData.sales.total / reportData.orders.total).toLocaleString()}
                  </p>
                  <div className="mt-2 flex items-center">
                    <span className="text-sm text-gray-500">
                      Based on {reportData.orders.total} orders
                    </span>
                  </div>
                </div>
                <div className="bg-white shadow rounded-lg p-6">
                  <h3 className="text-lg font-medium text-gray-900">Export Report</h3>
                  <p className="mt-2 text-sm text-gray-500">Download the full sales report with detailed metrics</p>
                  <button
                    type="button"
                    className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                  >
                    <ArrowDownTrayIcon className="h-5 w-5 mr-2" />
                    Download CSV
                  </button>
                </div>
              </div>

              {/* Top Kitchens */}
              <div className="bg-white shadow rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Top Performing Kitchens</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Kitchen Name
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Sales
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          % of Total
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {reportData.sales.topKitchens.map((kitchen, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {kitchen.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            PKR {kitchen.value.toLocaleString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {Math.round((kitchen.value / reportData.sales.total) * 100)}%
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Chart Placeholder */}
              <div className="bg-white shadow rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Sales Trend</h3>
                <div className="bg-gray-100 rounded-lg p-6 flex items-center justify-center h-64">
                  <p className="text-gray-500">
                    Sales chart will be displayed here. In a production environment, this would be implemented with a charting library like Chart.js or Recharts.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Orders Report */}
          {activeTab === 'orders' && reportData && (
            <div className="space-y-6">
              {/* Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white shadow rounded-lg p-6">
                  <h3 className="text-lg font-medium text-gray-900">Total Orders</h3>
                  <p className="mt-2 text-3xl font-semibold text-gray-900">{reportData.orders.total.toLocaleString()}</p>
                  <div className="mt-2 flex items-center">
                    <span className={`text-sm ${reportData.orders.percentChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {reportData.orders.percentChange >= 0 ? '+' : ''}{reportData.orders.percentChange}%
                    </span>
                    <span className="text-sm text-gray-500 ml-2">vs previous period</span>
                  </div>
                </div>
                <div className="bg-white shadow rounded-lg p-6">
                  <h3 className="text-lg font-medium text-gray-900">Completion Rate</h3>
                  <p className="mt-2 text-3xl font-semibold text-gray-900">
                    {Math.round((reportData.orders.byStatus.find(s => s.status === 'delivered').count / reportData.orders.total) * 100)}%
                  </p>
                  <div className="mt-2 flex items-center">
                    <span className="text-sm text-gray-500">
                      {reportData.orders.byStatus.find(s => s.status === 'delivered').count} delivered orders
                    </span>
                  </div>
                </div>
                <div className="bg-white shadow rounded-lg p-6">
                  <h3 className="text-lg font-medium text-gray-900">Export Report</h3>
                  <p className="mt-2 text-sm text-gray-500">Download the full orders report with detailed metrics</p>
                  <button
                    type="button"
                    className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                  >
                    <ArrowDownTrayIcon className="h-5 w-5 mr-2" />
                    Download CSV
                  </button>
                </div>
              </div>

              {/* Orders by Status */}
              <div className="bg-white shadow rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Orders by Status</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {reportData.orders.byStatus.map((statusData, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-4">
                      <h4 className="text-sm font-medium text-gray-500 uppercase">
                        {statusData.status}
                      </h4>
                      <p className="mt-2 text-2xl font-semibold text-gray-900">
                        {statusData.count}
                      </p>
                      <p className="mt-1 text-sm text-gray-500">
                        {Math.round((statusData.count / reportData.orders.total) * 100)}% of total
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Chart Placeholder */}
              <div className="bg-white shadow rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Orders Trend</h3>
                <div className="bg-gray-100 rounded-lg p-6 flex items-center justify-center h-64">
                  <p className="text-gray-500">
                    Orders chart will be displayed here. In a production environment, this would be implemented with a charting library like Chart.js or Recharts.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Customers Report */}
          {activeTab === 'customers' && reportData && (
            <div className="space-y-6">
              {/* Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white shadow rounded-lg p-6">
                  <h3 className="text-lg font-medium text-gray-900">Total Customers</h3>
                  <p className="mt-2 text-3xl font-semibold text-gray-900">{reportData.customers.total.toLocaleString()}</p>
                  <div className="mt-2 flex items-center">
                    <span className="text-sm text-green-600">
                      +{reportData.customers.newCustomers}
                    </span>
                    <span className="text-sm text-gray-500 ml-2">new this period</span>
                  </div>
                </div>
                <div className="bg-white shadow rounded-lg p-6">
                  <h3 className="text-lg font-medium text-gray-900">Customer Breakdown</h3>
                  <div className="mt-2 grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">New</p>
                      <p className="text-xl font-semibold text-gray-900">{reportData.customers.newCustomers}</p>
                      <p className="text-sm text-gray-500">{reportData.customers.percentNew}%</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Returning</p>
                      <p className="text-xl font-semibold text-gray-900">{reportData.customers.returningCustomers}</p>
                      <p className="text-sm text-gray-500">{100 - reportData.customers.percentNew}%</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white shadow rounded-lg p-6">
                  <h3 className="text-lg font-medium text-gray-900">Export Report</h3>
                  <p className="mt-2 text-sm text-gray-500">Download the full customers report with detailed metrics</p>
                  <button
                    type="button"
                    className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                  >
                    <ArrowDownTrayIcon className="h-5 w-5 mr-2" />
                    Download CSV
                  </button>
                </div>
              </div>

              {/* Customers by City */}
              <div className="bg-white shadow rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Customers by City</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          City
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Customers
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          % of Total
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {reportData.customers.topCities.map((city, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {city.city}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {city.count}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {Math.round((city.count / reportData.customers.total) * 100)}%
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Chart Placeholder */}
              <div className="bg-white shadow rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Customer Growth</h3>
                <div className="bg-gray-100 rounded-lg p-6 flex items-center justify-center h-64">
                  <p className="text-gray-500">
                    Customer growth chart will be displayed here. In a production environment, this would be implemented with a charting library like Chart.js or Recharts.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Reports;
