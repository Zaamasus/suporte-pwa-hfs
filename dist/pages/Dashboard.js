import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useQuery } from 'react-query';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import { Layout } from '../components/layout/Layout';
import { StatsCards } from '../components/tickets/StatsCards';
import { Card, CardContent, CardHeader } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Link } from 'react-router-dom';
import { TechnicianList } from '../components/clients/TechnicianList';
import { PlusCircle, Users, UserCircle, Building2 } from 'lucide-react';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { isClient, isTechnician } from '../utils/authUtils';
import { useEffect, useState } from 'react';
export function Dashboard() {
    const { user } = useAuth();
    const [companyName, setCompanyName] = useState(null);
    useEffect(() => {
        async function fetchCompanyName() {
            if (user?.companyId) {
                try {
                    const response = await axios.get(`/api/companies/${user.companyId}`);
                    setCompanyName(response.data.name);
                }
                catch (err) {
                    setCompanyName(null);
                }
            }
        }
        fetchCompanyName();
    }, [user?.companyId]);
    const { data: tickets, isLoading } = useQuery(['tickets', user?.id], async () => {
        const response = await axios.get('/api/tickets', {
            params: {
                userId: user?.id,
                role: user?.role,
            },
        });
        return response.data;
    }, {
        enabled: !!user,
    });
    const getWelcomeMessage = () => {
        const hours = new Date().getHours();
        if (hours < 12)
            return 'Bom dia';
        if (hours < 18)
            return 'Boa tarde';
        return 'Boa noite';
    };
    return (_jsx(Layout, { children: _jsxs("div", { className: "space-y-8", children: [_jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6", children: [_jsxs("div", { className: "flex items-center gap-3 sm:gap-6", children: [_jsx("div", { className: "flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-primary-50 dark:bg-primary-900/20", children: user?.name ? (_jsx("span", { className: "text-2xl sm:text-3xl font-bold text-primary-600 dark:text-primary-400", children: user.name.charAt(0).toUpperCase() })) : (_jsx(UserCircle, { className: "w-8 h-8 sm:w-10 sm:h-10 text-primary-400" })) }), _jsxs("div", { className: "flex flex-col min-w-0", children: [_jsxs("h2", { className: "text-gray-500 dark:text-gray-400 text-sm sm:text-base font-medium tracking-tight truncate", children: [getWelcomeMessage(), ","] }), _jsx("span", { className: "text-lg sm:text-2xl font-bold text-gray-900 dark:text-white leading-tight truncate max-w-[160px] sm:max-w-xs", children: user?.name }), companyName && (_jsxs("div", { className: "flex items-center gap-1.5 mt-1", children: [_jsx(Building2, { className: "h-4 w-4 text-orange-600 dark:text-orange-400" }), _jsx("span", { className: "text-xs sm:text-sm font-medium text-orange-600 dark:text-orange-400 truncate max-w-[120px] sm:max-w-xs", children: companyName })] }))] })] }), _jsxs("div", { className: "flex flex-col sm:flex-row gap-2 sm:gap-3 mt-4 sm:mt-0 w-full sm:w-auto", children: [isClient(user) && (_jsx(Link, { to: "/tickets/new", className: "w-full sm:w-auto", children: _jsx(Button, { leftIcon: _jsx(PlusCircle, { className: "h-4 w-4" }), className: "w-full sm:w-auto", children: "Novo Chamado" }) })), isTechnician(user) && (_jsx(Link, { to: "/clients/new", className: "w-full sm:w-auto", children: _jsx(Button, { leftIcon: _jsx(Users, { className: "h-4 w-4" }), className: "w-full sm:w-auto", children: "Novo Cliente" }) }))] })] }), isLoading ? (_jsx("div", { className: "py-20", children: _jsx(LoadingSpinner, { size: "lg" }) })) : (_jsxs(_Fragment, { children: [tickets && _jsx(StatsCards, { tickets: tickets }), _jsx("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6", children: _jsx("div", { children: _jsxs(Card, { className: "border border-gray-100 dark:border-gray-800 bg-white/80 dark:bg-dark-200/80 backdrop-blur-sm", children: [_jsx(CardHeader, { className: "bg-gray-50 dark:bg-dark-300", children: _jsx("h2", { className: "text-lg font-medium", children: isClient(user) ? 'Suporte Técnico' : 'Técnicos Disponíveis' }) }), _jsx(CardContent, { className: "p-4", children: _jsx(TechnicianList, {}) })] }) }) })] }))] }) }));
}
//# sourceMappingURL=Dashboard.js.map