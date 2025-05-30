import { useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';

// Pages
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { TicketsList } from './pages/TicketsList';
import { TicketDetails } from './pages/TicketDetails';
import { NewTicket } from './pages/NewTicket';
import { NewClient } from './pages/NewClient';
import { ClientsList } from './pages/ClientsList';

// Utils
import { isClient, isTechnician } from './utils/authUtils';

// Protected Route Component
const ProtectedRoute = ({ children, allowedRoles }: { children: JSX.Element, allowedRoles?: string[] }) => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    } else if (allowedRoles && user && !allowedRoles.includes(user.role)) {
      navigate('/');
    }
  }, [isAuthenticated, user, allowedRoles, navigate]);

  return isAuthenticated ? children : null;
};

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      
      <Route 
        path="/" 
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/tickets" 
        element={
          <ProtectedRoute>
            <TicketsList />
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/tickets/:id" 
        element={
          <ProtectedRoute>
            <TicketDetails />
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/tickets/new" 
        element={
          <ProtectedRoute allowedRoles={['client']}>
            <NewTicket />
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/clients/new" 
        element={
          <ProtectedRoute allowedRoles={['technician', 'admin']}>
            <NewClient />
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/clients" 
        element={
          <ProtectedRoute allowedRoles={['technician', 'admin']}>
            <ClientsList />
          </ProtectedRoute>
        } 
      />
      
      <Route path="*" element={<Navigate to="/\" replace />} />
    </Routes>
  );
}

export default App;