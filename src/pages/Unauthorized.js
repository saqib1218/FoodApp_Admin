import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Unauthorized access page
 * Displayed when a user attempts to access a page they don't have permission for
 */
const Unauthorized = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-md text-center">
        <div className="text-red-500 mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        
        <h2 className="text-2xl font-medium text-gray-900">Access Denied</h2>
        
        <p className="text-gray-600">
          You do not have permission to view this page.
        </p>
        
        <div className="pt-4">
          <Link 
            to="/" 
            className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-full hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            Return to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;
