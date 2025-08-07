import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

const OrderDetail = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // This would be replaced with an API call in production
    const fetchOrder = () => {
      // Mock data for a single order
      const mockOrder = {
        id: id,
        customer: {
          name: 'Ahmed Khan',
          phone: '+92 300 1234567',
          email: 'ahmed@example.com',
          address: '123 Main Street, Block F, Gulberg III, Lahore'
        },
        kitchen: {
          name: 'Lahori Delights',
          id: 1
        },
        items: [
          {
            id: 1,
            name: 'Chicken Biryani',
            quantity: 2,
            price: 450,
            total: 900
          },
          {
            id: 2,
            name: 'Naan',
            quantity: 4,
            price: 50,
            total: 200
          },
          {
            id: 3,
            name: 'Kheer',
            quantity: 1,
            price: 150,
            total: 150
          }
        ],
        subtotal: 1250,
        deliveryFee: 100,
        discount: 100,
        total: 1250,
        status: 'delivered',
        paymentMethod: 'Cash on Delivery',
        paymentStatus: 'paid',
        orderDate: '2023-06-27',
        deliveryDate: '2023-06-27',
        deliveryTime: '19:30',
        notes: 'Please include extra spicy chutney',
        timeline: [
          {
            status: 'placed',
            timestamp: '2023-06-27 17:45'
          },
          {
            status: 'confirmed',
            timestamp: '2023-06-27 17:50'
          },
          {
            status: 'preparing',
            timestamp: '2023-06-27 18:05'
          },
          {
            status: 'ready',
            timestamp: '2023-06-27 18:45'
          },
          {
            status: 'in-transit',
            timestamp: '2023-06-27 19:00'
          },
          {
            status: 'delivered',
            timestamp: '2023-06-27 19:30'
          }
        ]
      };

      setOrder(mockOrder);
      setIsLoading(false);
    };

    fetchOrder();
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    );
  }

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
      case 'placed':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
            Placed
          </span>
        );
      case 'confirmed':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
            Confirmed
          </span>
        );
      case 'ready':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-teal-100 text-teal-800">
            Ready
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      {/* Header with back button */}
      <div className="mb-6">
        <div className="flex items-center">
          <Link
            to="/orders"
            className="mr-4 p-2 rounded-full hover:bg-gray-100"
          >
            <ArrowLeftIcon className="h-5 w-5 text-gray-500" />
          </Link>
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Order {order.id}</h1>
            <div className="flex items-center mt-1">
              <p className="text-sm text-gray-500 mr-2">
                {order.orderDate} • {getStatusBadge(order.status)}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Order Details */}
        <div className="lg:col-span-2">
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Order Items</h3>
            </div>
            <div className="border-t border-gray-200">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Item
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Quantity
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {order.items.map((item) => (
                    <tr key={item.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {item.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.quantity}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        PKR {item.price}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        PKR {item.total}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="bg-gray-50">
                  <tr>
                    <td colSpan="3" className="px-6 py-3 text-right text-sm font-medium text-gray-500">
                      Subtotal
                    </td>
                    <td className="px-6 py-3 text-left text-sm text-gray-900">
                      PKR {order.subtotal}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="3" className="px-6 py-3 text-right text-sm font-medium text-gray-500">
                      Delivery Fee
                    </td>
                    <td className="px-6 py-3 text-left text-sm text-gray-900">
                      PKR {order.deliveryFee}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="3" className="px-6 py-3 text-right text-sm font-medium text-gray-500">
                      Discount
                    </td>
                    <td className="px-6 py-3 text-left text-sm text-gray-900">
                      PKR {order.discount}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="3" className="px-6 py-3 text-right text-sm font-bold text-gray-900">
                      Total
                    </td>
                    <td className="px-6 py-3 text-left text-sm font-bold text-gray-900">
                      PKR {order.total}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          <div className="mt-6 bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Order Timeline</h3>
            </div>
            <div className="px-4 py-5 sm:p-6">
              <ol className="relative border-l border-gray-200 ml-3">
                {order.timeline.map((event, index) => (
                  <li key={index} className="mb-6 ml-6">
                    <span className="absolute flex items-center justify-center w-6 h-6 bg-primary-100 rounded-full -left-3 ring-8 ring-white">
                      <div className="w-2.5 h-2.5 bg-primary-600 rounded-full"></div>
                    </span>
                    <h3 className="flex items-center mb-1 text-sm font-semibold text-gray-900">
                      {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                      {index === order.timeline.length - 1 && (
                        <span className="bg-primary-100 text-primary-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded ml-3">
                          Latest
                        </span>
                      )}
                    </h3>
                    <time className="block mb-2 text-xs font-normal leading-none text-gray-400">
                      {event.timestamp}
                    </time>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>

        {/* Customer and Kitchen Info */}
        <div className="space-y-6">
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Customer Information</h3>
            </div>
            <div className="px-4 py-5 sm:p-6">
              <dl className="grid grid-cols-1 gap-x-4 gap-y-4">
                <div>
                  <dt className="text-sm font-medium text-gray-500">Name</dt>
                  <dd className="mt-1 text-sm text-gray-900">{order.customer.name}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Phone</dt>
                  <dd className="mt-1 text-sm text-gray-900">{order.customer.phone}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Email</dt>
                  <dd className="mt-1 text-sm text-gray-900">{order.customer.email}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Delivery Address</dt>
                  <dd className="mt-1 text-sm text-gray-900">{order.customer.address}</dd>
                </div>
              </dl>
            </div>
          </div>

          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Kitchen Information</h3>
            </div>
            <div className="px-4 py-5 sm:p-6">
              <dl className="grid grid-cols-1 gap-x-4 gap-y-4">
                <div>
                  <dt className="text-sm font-medium text-gray-500">Kitchen</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    <Link to={`/kitchens/${order.kitchen.id}`} className="text-primary-600 hover:text-primary-900">
                      {order.kitchen.name}
                    </Link>
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Payment Method</dt>
                  <dd className="mt-1 text-sm text-gray-900">{order.paymentMethod}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Payment Status</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1)}
                    </span>
                  </dd>
                </div>
                {order.notes && (
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Customer Notes</dt>
                    <dd className="mt-1 text-sm text-gray-900">{order.notes}</dd>
                  </div>
                )}
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
