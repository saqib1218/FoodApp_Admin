import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const KitchenEngagementTab = () => {
  // Kitchen engagement data
  const [engagementData, setEngagementData] = useState([
    {
      id: 1,
      type: 'query',
      title: 'Send a Query',
      message: 'Customer asked about spice level customization for Chicken Karahi. They wanted extra spicy but were concerned about the heat level.',
      customerName: 'Ahmed Hassan',
      customerId: 'CUST-001',
      dateTime: '2024-01-12 15:45:00',
      status: 'resolved'
    },
    {
      id: 2,
      type: 'message',
      title: 'Send a Message',
      message: 'Customer sent appreciation message for the delicious Biryani and excellent packaging. They mentioned it was perfectly cooked.',
      customerName: 'Fatima Khan',
      customerId: 'CUST-002',
      dateTime: '2024-01-12 13:20:00',
      status: 'received'
    },
    {
      id: 3,
      type: 'query',
      title: 'Send a Query',
      message: 'Customer inquired about ingredient list for Butter Chicken due to dairy allergies. Requested alternative preparation method.',
      customerName: 'Sarah Ahmed',
      customerId: 'CUST-003',
      dateTime: '2024-01-11 18:30:00',
      status: 'resolved'
    },
    {
      id: 4,
      type: 'message',
      title: 'Send a Message',
      message: 'Customer requested special cooking instructions for their order - less oil and extra vegetables in the Chicken Tikka.',
      customerName: 'Ali Raza',
      customerId: 'CUST-004',
      dateTime: '2024-01-11 12:15:00',
      status: 'received'
    },
    {
      id: 5,
      type: 'query',
      title: 'Send a Query',
      message: 'Customer complained about late delivery and food temperature. Order arrived cold after 45 minutes delay.',
      customerName: 'Zara Sheikh',
      customerId: 'CUST-005',
      dateTime: '2024-01-10 20:10:00',
      status: 'resolved'
    },
    {
      id: 6,
      type: 'message',
      title: 'Send a Message',
      message: 'Customer sent feedback about new menu item - Seekh Kebab Roll. They loved the taste and portion size.',
      customerName: 'Hassan Ali',
      customerId: 'CUST-006',
      dateTime: '2024-01-10 14:25:00',
      status: 'received'
    },
    {
      id: 7,
      type: 'query',
      title: 'Send a Query',
      message: 'Customer asked about availability of vegetarian options and if dishes can be prepared without onions and garlic.',
      customerName: 'Ayesha Malik',
      customerId: 'CUST-007',
      dateTime: '2024-01-09 16:40:00',
      status: 'resolved'
    },
    {
      id: 8,
      type: 'message',
      title: 'Send a Message',
      message: 'Customer thanked the kitchen for accommodating their special dietary requirements during their recent order.',
      customerName: 'Omar Farooq',
      customerId: 'CUST-008',
      dateTime: '2024-01-09 11:55:00',
      status: 'received'
    }
  ]);

  return (
    <div className="p-6">
      <h2 className="text-lg font-medium text-gray-900 mb-6">Kitchen Engagement</h2>
      <div className="space-y-4">
        {engagementData.map((engagement) => (
          <div
            key={engagement.id}
            className={`border rounded-lg p-4 ${
              engagement.type === 'query'
                ? 'border-blue-200 bg-blue-50'
                : 'border-green-200 bg-green-50'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center mb-2">
                  <div className={`flex-shrink-0 h-2 w-2 rounded-full mr-3 ${
                    engagement.type === 'query' ? 'bg-blue-400' : 'bg-green-400'
                  }`}></div>
                  <h3 className="text-lg font-medium text-gray-900">
                    {engagement.title}
                  </h3>
                  <span className={`ml-3 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    engagement.status === 'resolved'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {engagement.status === 'resolved' ? 'Resolved' : 'Received'}
                  </span>
                </div>
                
                <div className="mb-3">
                  <div className="flex items-center mb-2">
                    <svg className="h-4 w-4 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span className="text-sm font-medium text-gray-600">
                      Customer: 
                    </span>
                    <Link
                      to={`/customers/${engagement.customerId}`}
                      className="ml-1 text-sm font-medium text-primary-600 hover:text-primary-800 hover:underline"
                    >
                      {engagement.customerName}
                    </Link>
                  </div>
                  <p className="text-gray-700">
                    {engagement.message}
                  </p>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-500">
                    <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {new Date(engagement.dateTime).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })} at {new Date(engagement.dateTime).toLocaleTimeString('en-US', {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </div>
                  <Link
                    to={`/kitchen-engagement/${engagement.id}`}
                    className={`text-sm font-medium hover:underline ${
                      engagement.type === 'query'
                        ? 'text-blue-600 hover:text-blue-800'
                        : 'text-green-600 hover:text-green-800'
                    }`}
                  >
                    View
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {engagementData.length === 0 && (
          <div className="text-center py-8">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No engagement history</h3>
            <p className="mt-1 text-sm text-gray-500">No messages or queries have been received from customers yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default KitchenEngagementTab;
