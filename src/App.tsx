import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
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
import { TicketDetails } from './pages/TicketDetails';
import { Profile } from './pages/Profile';

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
        <BrowserRouter>
          <Routes>
            {/* Rotas públicas */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Rotas privadas */}
            <Route path="/" element={<PrivateRoute />}>
              <Route index element={<Dashboard />} />
              
              {/* Rotas de clientes */}
              <Route path="clients" element={<ClientsList />} />
              <Route path="clients/new" element={<ClientEdit />} />
              <Route path="clients/edit/:id" element={<ClientEdit />} />
              
              {/* Rotas de empresas */}
              <Route path="companies" element={<CompaniesList />} />
              <Route path="companies/new" element={<CompanyEdit />} />
              <Route path="companies/edit/:id" element={<CompanyEdit />} />
              <Route path="companies/:companyName" element={<CompanyPanel />} />
              
              {/* Rotas de tickets */}
              <Route path="tickets" element={<TicketsList />} />
              <Route path="tickets/:id" element={<TicketDetails />} />
              
              {/* Perfil do usuário */}
              <Route path="profile" element={<Profile />} />
            </Route>
            
            {/* Redirecionamento para o login */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
        
        <Toaster position="top-right" />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;