import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import { PermissionsContext } from './context/PermissionsContext';

// Layouts
import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';

// Auth Pages
import Login from './pages/auth/Login';

// Admin Pages
import Dashboard from './pages/Dashboard';
import KitchensList from './pages/kitchens/KitchensList';
import KitchenDetail from './pages/kitchens/KitchenDetail';
import OnboardingQueue from './pages/kitchens/OnboardingQueue';
import OrdersList from './pages/orders/OrdersList';
import OrderDetail from './pages/orders/OrderDetail';
import EngagementCenter from './pages/engagement/EngagementCenter';
import CustomersList from './pages/customers/CustomersList';
import CustomerDetail from './pages/customers/CustomerDetail';
import PartenerList from './pages/partener/PartenerList';
import PartenerDetail from './pages/partener/PartenerDetail';
import UserDetail from './pages/users/UserDetail';
import Reports from './pages/reports/Reports';
import Settings from './pages/settings/Settings';
import NotFound from './pages/NotFound';
import Unauthorized from './pages/Unauthorized';
import PermissionsDemo from './pages/PermissionsDemo';

// Protected Route Components
import ProtectedRoute from './components/ProtectedRoute';
import AddEditDish from './pages/kitchens/KitchenDetail/AddEditDish/AddEditDish';

// Basic Authentication Route Component
const AuthRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  
  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

function App() {
  const { userPermissions } = useAuth();
  
  return (
    <PermissionsContext.Provider value={userPermissions}>
      <Routes>
        {/* Auth Routes */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
        </Route>
        
        {/* Unauthorized Route */}
        <Route path="/unauthorized" element={<Unauthorized />} />
        
        {/* Protected Admin Routes */}
        <Route element={
          <AuthRoute>
            <MainLayout />
          </AuthRoute>
        }>
          <Route path="/" element={<Dashboard />} />
          
          <Route path="/kitchens" element={
            <ProtectedRoute permission="view_kitchens">
              <KitchensList />
            </ProtectedRoute>
          } />
          
          <Route path="/kitchens/:id" element={
            <ProtectedRoute permission="view_kitchens">
              <KitchenDetail />
            </ProtectedRoute>
          } />
           <Route path="/kitchens/:id/AddEditDish" element={
            <ProtectedRoute permission="view_kitchens">
              <AddEditDish />
            </ProtectedRoute>
          } />
          
          <Route path="/onboarding" element={
            <ProtectedRoute permission="view_kitchens">
              <OnboardingQueue />
            </ProtectedRoute>
          } />
          
          <Route path="/orders" element={
            <ProtectedRoute permission="view_orders">
              <OrdersList />
            </ProtectedRoute>
          } />
          
          <Route path="/orders/:id" element={
            <ProtectedRoute permission="view_orders">
              <OrderDetail />
            </ProtectedRoute>
          } />
          
          <Route path="/engagement" element={
            <ProtectedRoute permission="send_broadcast">
              <EngagementCenter />
            </ProtectedRoute>
          } />
          
          <Route path="/customers" element={<CustomersList />} />
          <Route path="/customers/:id" element={<CustomerDetail />} />
          <Route path="/parteners" element={<PartenerList />} />
          <Route path="/parteners/:id" element={<PartenerDetail />} />
          <Route path="/users/:id" element={
            <ProtectedRoute permission="view_kitchens">
              <UserDetail />
            </ProtectedRoute>
          } />
          <Route path="/reports" element={<Reports />} />
          <Route path="/settings" element={<Settings />} />
          
          {/* Permissions Demo Page */}
          <Route path="/permissions-demo" element={<PermissionsDemo />} />
        </Route>
        
        {/* 404 Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </PermissionsContext.Provider>
  );
}

export default App;
