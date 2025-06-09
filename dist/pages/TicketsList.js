import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Layout } from '../components/layout/Layout';
import { TicketListFilters } from '../components/tickets/TicketListFilters';
import { TicketCard } from '../components/tickets/TicketCard';
import { Button } from '../components/ui/Button';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { PlusCircle, ChevronDown, ChevronRight, Filter } from 'lucide-react';
import { isClient } from '../utils/authUtils';
export function TicketsList() {
    const { user } = useAuth();
    const [filters, setFilters] = useState({
        search: '',
        status: '',
        priority: '',
        sortBy: 'newest',
    });
    const { data: tickets, isLoading } = useQuery(['tickets', user?.id, filters], async () => {
        const response = await axios.get('/api/tickets', {
            params: {
                userId: user?.id,
                role: user?.role,
                status: filters.status,
            },
        });
        console.log('Tickets recebidos do backend:', response.data);
        // Mapeia os dados para o formato esperado pelo frontend
        const mappedTickets = response.data.map((ticket) => ({
            ...ticket,
            // Adiciona compatibilidade com os nomes esperados pelo frontend
            clientId: ticket.client_id || ticket.clientId,
            clientName: ticket.client_name || ticket.clientName,
            technicianId: ticket.technician_id || ticket.technicianId,
            technicianName: ticket.technician_name || ticket.technicianName,
            companyName: ticket.company || ticket.companyName,
        }));
        // Log detalhado dos tickets para debug
        if (mappedTickets.length > 0) {
            console.log('Amostra do primeiro ticket mapeado:', {
                id: mappedTickets[0].id,
                title: mappedTickets[0].title,
                companyName: mappedTickets[0].companyName,
                clientName: mappedTickets[0].clientName
            });
        }
        return mappedTickets;
    }, {
        enabled: !!user,
    });
    // Filter and sort tickets based on filters
    const filteredTickets = tickets
        ? tickets
            .filter((ticket) => {
            // Apply search filter
            if (filters.search && !ticket.title.toLowerCase().includes(filters.search.toLowerCase()) && !ticket.description.toLowerCase().includes(filters.search.toLowerCase())) {
                return false;
            }
            // Apply status filter
            if (filters.status && ticket.status !== filters.status) {
                return false;
            }
            // Apply priority filter
            if (filters.priority && ticket.priority !== filters.priority) {
                return false;
            }
            return true;
        })
            .sort((a, b) => {
            // Apply sorting
            switch (filters.sortBy) {
                case 'newest':
                    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
                case 'oldest':
                    return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
                case 'priority':
                    const priorityOrder = { high: 0, medium: 1, low: 2 };
                    return priorityOrder[a.priority] - priorityOrder[b.priority];
                case 'alphabetical':
                    return a.title.localeCompare(b.title);
                default:
                    return 0;
            }
        })
        : [];
    // Separar tickets concluídos dos demais
    const ticketsConcluidos = filteredTickets.filter(t => t.status === 'closed');
    const ticketsAbertos = filteredTickets.filter(t => t.status !== 'closed');
    const [showConcluidos, setShowConcluidos] = useState(false);
    const [showFilters, setShowFilters] = useState(false);
    return (_jsx(Layout, { children: _jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("h1", { className: "text-2xl font-bold text-gray-900 dark:text-white", children: "Chamados" }), _jsx("button", { className: "ml-2 p-2 rounded hover:bg-gray-100 dark:hover:bg-dark-200 focus:outline-none", onClick: () => setShowFilters((v) => !v), title: "Filtrar chamados", children: _jsx(Filter, { className: "w-5 h-5 text-primary-600" }) })] }), isClient(user) && (_jsx(Link, { to: "/tickets/new", children: _jsx(Button, { leftIcon: _jsx(PlusCircle, { className: "h-4 w-4" }), children: "Novo Chamado" }) }))] }), showFilters && (_jsx(TicketListFilters, { onFilter: setFilters })), isLoading ? (_jsx("div", { className: "py-20", children: _jsx(LoadingSpinner, { size: "lg" }) })) : (_jsxs(_Fragment, { children: [ticketsAbertos.length > 0 && (_jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: ticketsAbertos.map((ticket) => (_jsx(TicketCard, { ticket: ticket }, ticket.id))) })), ticketsConcluidos.length > 0 && (_jsxs("div", { className: "mt-8", children: [_jsxs("button", { className: "flex items-center gap-2 text-lg font-semibold text-green-700 dark:text-green-400 focus:outline-none mb-4", onClick: () => setShowConcluidos((v) => !v), children: [showConcluidos ? _jsx(ChevronDown, { className: "w-5 h-5" }) : _jsx(ChevronRight, { className: "w-5 h-5" }), "Chamados Conclu\u00EDdos (", ticketsConcluidos.length, ")"] }), showConcluidos && (_jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: ticketsConcluidos.map((ticket) => (_jsx(TicketCard, { ticket: ticket }, ticket.id))) }))] }))] }))] }) }));
}
//# sourceMappingURL=TicketsList.js.map