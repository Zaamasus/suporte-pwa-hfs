import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
    return (_jsx(QueryClientProvider, { client: queryClient, children: _jsxs(ThemeProvider, { children: [_jsx(BrowserRouter, { children: _jsxs(Routes, { children: [_jsx(Route, { path: "/login", element: _jsx(Login, {}) }), _jsx(Route, { path: "/register", element: _jsx(Register, {}) }), _jsxs(Route, { path: "/", element: _jsx(PrivateRoute, {}), children: [_jsx(Route, { index: true, element: _jsx(Dashboard, {}) }), _jsx(Route, { path: "clients", element: _jsx(ClientsList, {}) }), _jsx(Route, { path: "clients/new", element: _jsx(ClientEdit, {}) }), _jsx(Route, { path: "clients/edit/:id", element: _jsx(ClientEdit, {}) }), _jsx(Route, { path: "companies", element: _jsx(CompaniesList, {}) }), _jsx(Route, { path: "companies/new", element: _jsx(CompanyEdit, {}) }), _jsx(Route, { path: "companies/edit/:id", element: _jsx(CompanyEdit, {}) }), _jsx(Route, { path: "companies/:companyName", element: _jsx(CompanyPanel, {}) }), _jsx(Route, { path: "tickets", element: _jsx(TicketsList, {}) }), _jsx(Route, { path: "tickets/:id", element: _jsx(TicketDetails, {}) }), _jsx(Route, { path: "profile", element: _jsx(Profile, {}) })] }), _jsx(Route, { path: "*", element: _jsx(Navigate, { to: "/", replace: true }) })] }) }), _jsx(Toaster, { position: "top-right" })] }) }));
}
export default App;
//# sourceMappingURL=App.js.map