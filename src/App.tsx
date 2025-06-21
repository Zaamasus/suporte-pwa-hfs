import {  Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ThemeProvider } from './contexts/ThemeContext';

// Pages
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Dashboard } from './pages/Dashboard';
import { ClientsList } from './pages/ClientsList';
import { ClientEdit } from './pages/ClientEdit';
import { CompanyPanel } from './pages/CompanyPanel';
import { CompaniesList } from './pages/CompaniesList';
import { CompanyEdit } from './pages/CompanyEdit';
import { TicketsList } from './pages/TicketsList';
import { NewTicket } from './pages/NewTicket';
import { TicketDetails } from './pages/TicketDetails';
import { Profile } from './pages/Profile';
import { Debug } from './pages/Debug';

// Components
import { PrivateRoute } from './components/auth/PrivateRoute';

// Configuração do React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
     
          <Routes>
            {/* Rotas públicas */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/debug" element={<Debug />} />
            
            {/* Rotas privadas */}
            <Route path="/" element={<PrivateRoute />}>
              <Route index element={<Dashboard />} />
              <Route path="clients" element={<ClientsList />} />
              <Route path="clients/:id" element={<ClientEdit />} />
              <Route path="companies" element={<CompaniesList />} />
              <Route path="companies/:id" element={<CompanyEdit />} />
              <Route path="companies/:id/panel" element={<CompanyPanel />} />
              <Route path="tickets" element={<TicketsList />} />
              <Route path="tickets/new" element={<NewTicket />} />
              <Route path="tickets/:id" element={<TicketDetails />} />
              <Route path="profile" element={<Profile />} />
            </Route>
            
            {/* Redirecionamento padrão */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
       
        
        <Toaster position="top-right" />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;