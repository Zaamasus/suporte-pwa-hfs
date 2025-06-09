import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Home, Users, Ticket, Building, User, LogOut } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { Button } from '../ui/Button';
function SidebarLink({ to, icon, label }) {
    return (_jsxs(NavLink, { to: to, className: ({ isActive }) => `flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${isActive
            ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300'
            : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-dark-300'}`, children: [_jsx("div", { className: "mr-3", children: icon }), label] }));
}
export function Sidebar() {
    const { user, logout } = useAuth();
    const { toggleTheme, theme } = useTheme();
    const isAdmin = user?.role === 'admin';
    const isTechnician = user?.role === 'technician' || isAdmin;
    const isClient = user?.role === 'client';
    const handleLogout = () => {
        logout();
    };
    return (_jsxs("aside", { className: "hidden md:flex flex-col w-64 bg-white dark:bg-dark-200 border-r border-gray-200 dark:border-dark-300 h-screen sticky top-0", children: [_jsx("div", { className: "p-4 border-b border-gray-200 dark:border-dark-300", children: _jsx("h1", { className: "text-xl font-bold text-indigo-600 dark:text-indigo-400", children: "Suporte HFS" }) }), _jsxs("nav", { className: "flex-1 overflow-y-auto p-4 space-y-1", children: [_jsx(SidebarLink, { to: "/", icon: _jsx(Home, { size: 18 }), label: "Dashboard" }), isTechnician && (_jsxs(_Fragment, { children: [_jsx(SidebarLink, { to: "/clients", icon: _jsx(Users, { size: 18 }), label: "Clientes" }), _jsx(SidebarLink, { to: "/companies", icon: _jsx(Building, { size: 18 }), label: "Empresas" })] })), _jsx(SidebarLink, { to: "/tickets", icon: _jsx(Ticket, { size: 18 }), label: "Tickets" }), _jsx(SidebarLink, { to: "/profile", icon: _jsx(User, { size: 18 }), label: "Meu Perfil" })] }), _jsxs("div", { className: "p-4 border-t border-gray-200 dark:border-dark-300 space-y-4", children: [_jsx(Button, { variant: "outline", className: "w-full justify-start", onClick: toggleTheme, children: theme === 'dark' ? '☀️ Modo Claro' : '🌙 Modo Escuro' }), _jsx(Button, { variant: "outline", className: "w-full justify-start text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20", leftIcon: _jsx(LogOut, { size: 18 }), onClick: handleLogout, children: "Sair" })] })] }));
}
//# sourceMappingURL=Sidebar.js.map