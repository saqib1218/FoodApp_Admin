import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const AuthLayout = () => {
  const { isAuthenticated, isLoading } = useAuth();
  
  // If user is already authenticated, redirect to dashboard
  if (isAuthenticated && !isLoading) {
    return <Navigate to="/" replace />;
  }
  
  return (
    <div className="min-h-screen bg-background-cream flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-8 shadow sm:rounded-lg">
          <div className="flex flex-col items-center mb-6">
            <div className="w-16 h-16 bg-primary-600 rounded-md flex items-center justify-center mb-4">
              <span className="text-2xl font-bold text-white">R</span>
            </div>
            <h1 className="text-center text-2xl font-bold text-neutral-800">
              Welcome to Riwayat
            </h1>
            <p className="mt-1 text-center text-sm text-neutral-600">
              Admin Portal - Sign in to manage your platform
            </p>
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
