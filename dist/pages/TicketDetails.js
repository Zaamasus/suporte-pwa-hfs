import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useMutation, useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import { Layout } from '../components/layout/Layout';
import { Card, CardContent, CardHeader, CardFooter } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { TicketHistory } from '../components/tickets/TicketHistory';
import { Button } from '../components/ui/Button';
import { TextArea } from '../components/ui/TextArea';
import { TicketStatus } from '../types';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { isTechnician } from '../utils/authUtils';
import { formatDateTime, getTicketPriorityColor, getTicketPriorityText, getTicketStatusColor, getTicketStatusText } from '../utils/formatters';
import { ArrowLeft, MessageSquare, RefreshCw, CheckCircle, AlertTriangle } from 'lucide-react';
export function TicketDetails() {
    const { id } = useParams();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [isAddingComment, setIsAddingComment] = useState(false);
    const { data: ticket, isLoading, refetch } = useQuery(['ticket', id], async () => {
        const response = await axios.get(`/api/tickets/${id}`);
        // Mapeia os dados para o formato esperado pelo frontend
        const mappedTicket = {
            ...response.data,
            // Adiciona compatibilidade com os nomes esperados pelo frontend
            clientId: response.data.client_id || response.data.clientId,
            clientName: response.data.client_name || response.data.clientName,
            technicianId: response.data.technician_id || response.data.technicianId,
            technicianName: response.data.technician_name || response.data.technicianName,
            companyName: response.data.company || response.data.companyName,
        };
        console.log('Ticket mapeado:', mappedTicket);
        return mappedTicket;
    }, {
        enabled: !!id,
    });
    const { register, handleSubmit, reset } = useForm({
        defaultValues: {
            message: '',
            status: '',
        },
    });
    const updateMutation = useMutation(async (data) => {
        return axios.patch(`/api/tickets/${id}`, data);
    }, {
        onSuccess: () => {
            refetch();
            setIsAddingComment(false);
            reset();
        },
    });
    const handleAddComment = (data) => {
        if (!user || !data.message.trim())
            return;
        updateMutation.mutate({
            historyEntry: {
                message: data.message,
                createdBy: {
                    id: user.id,
                    name: user.name,
                    role: user.role,
                },
            },
        });
    };
    const handleUpdateStatus = (status) => {
        if (!user)
            return;
        updateMutation.mutate({
            status,
            historyEntry: {
                message: `Status atualizado para ${getTicketStatusText(status)}`,
                createdBy: {
                    id: user.id,
                    name: user.name,
                    role: user.role,
                },
            },
        });
    };
    if (isLoading) {
        return (_jsx(Layout, { children: _jsx("div", { className: "py-20", children: _jsx(LoadingSpinner, { size: "lg" }) }) }));
    }
    if (!ticket) {
        return (_jsx(Layout, { children: _jsxs("div", { className: "text-center py-16", children: [_jsx("h2", { className: "text-xl font-medium text-gray-900 dark:text-white mb-2", children: "Chamado n\u00E3o encontrado" }), _jsx("p", { className: "text-gray-500 dark:text-gray-400 mb-6", children: "O chamado que voc\u00EA est\u00E1 procurando n\u00E3o existe ou foi removido." }), _jsx(Button, { onClick: () => navigate('/tickets'), children: "Voltar para Chamados" })] }) }));
    }
    const statusColor = getTicketStatusColor(ticket.status);
    const priorityColor = getTicketPriorityColor(ticket.priority);
    return (_jsx(Layout, { children: _jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Button, { variant: "ghost", size: "icon", onClick: () => navigate('/tickets'), "aria-label": "Voltar", children: _jsx(ArrowLeft, { className: "h-5 w-5" }) }), _jsxs("h1", { className: "text-2xl font-bold text-gray-900 dark:text-white", children: ["Chamado #", ticket.id] })] }), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6", children: [_jsxs("div", { className: "lg:col-span-2 space-y-6", children: [_jsxs(Card, { children: [_jsx(CardHeader, { className: "bg-gray-50 dark:bg-dark-300", children: _jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3", children: [_jsx("h2", { className: "text-xl font-medium", children: ticket.title }), _jsx(Badge, { variant: statusColor, children: getTicketStatusText(ticket.status) })] }) }), _jsxs(CardContent, { className: "p-4 space-y-4", children: [_jsxs("div", { children: [_jsx("h3", { className: "text-sm font-medium text-gray-500 dark:text-gray-400 mb-2", children: "Descri\u00E7\u00E3o" }), _jsx("p", { className: "text-gray-700 dark:text-gray-300 whitespace-pre-line", children: ticket.description })] }), _jsxs("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-gray-100 dark:border-gray-800 pt-4", children: [_jsxs("div", { children: [_jsx("h3", { className: "text-sm font-medium text-gray-500 dark:text-gray-400", children: "Cliente" }), _jsx("p", { className: "mt-1", children: ticket.clientName })] }), ticket.companyName && (_jsxs("div", { children: [_jsx("h3", { className: "text-sm font-medium text-gray-500 dark:text-gray-400", children: "Empresa" }), _jsx("p", { className: "mt-1", children: ticket.companyName })] })), _jsxs("div", { children: [_jsx("h3", { className: "text-sm font-medium text-gray-500 dark:text-gray-400", children: "Prioridade" }), _jsx(Badge, { variant: priorityColor, className: "mt-1", children: getTicketPriorityText(ticket.priority) })] }), _jsxs("div", { children: [_jsx("h3", { className: "text-sm font-medium text-gray-500 dark:text-gray-400", children: "Categoria" }), _jsx("p", { className: "mt-1", children: ticket.category || 'Não categorizado' })] }), _jsxs("div", { children: [_jsx("h3", { className: "text-sm font-medium text-gray-500 dark:text-gray-400", children: "Data de Abertura" }), _jsx("p", { className: "mt-1", children: formatDateTime(ticket.createdAt) })] }), _jsxs("div", { children: [_jsx("h3", { className: "text-sm font-medium text-gray-500 dark:text-gray-400", children: "\u00DAltima Atualiza\u00E7\u00E3o" }), _jsx("p", { className: "mt-1", children: formatDateTime(ticket.updatedAt) })] }), _jsxs("div", { children: [_jsx("h3", { className: "text-sm font-medium text-gray-500 dark:text-gray-400", children: "T\u00E9cnico Respons\u00E1vel" }), _jsx("p", { className: "mt-1", children: ticket.technicianName || 'Não atribuído' })] })] })] }), isTechnician(user) && (_jsxs(CardFooter, { className: "bg-gray-50 dark:bg-dark-300 flex flex-wrap items-center gap-3", children: [ticket.status === 'open' && (_jsx(Button, { variant: "primary", size: "sm", leftIcon: _jsx(RefreshCw, { className: "h-4 w-4" }), onClick: () => handleUpdateStatus(TicketStatus.IN_PROGRESS), isLoading: updateMutation.isLoading, children: "Iniciar Atendimento" })), ticket.status === 'in_progress' && (_jsxs(_Fragment, { children: [_jsx(Button, { variant: "danger", size: "sm", leftIcon: _jsx(AlertTriangle, { className: "h-4 w-4" }), onClick: () => handleUpdateStatus(TicketStatus.PAUSED), isLoading: updateMutation.isLoading, children: "Pausar" }), _jsx(Button, { variant: "success", size: "sm", leftIcon: _jsx(CheckCircle, { className: "h-4 w-4" }), onClick: () => handleUpdateStatus(TicketStatus.CLOSED), isLoading: updateMutation.isLoading, children: "Finalizar Chamado" })] })), ticket.status === 'paused' && (_jsx(Button, { variant: "primary", size: "sm", leftIcon: _jsx(RefreshCw, { className: "h-4 w-4" }), onClick: () => handleUpdateStatus(TicketStatus.IN_PROGRESS), isLoading: updateMutation.isLoading, children: "Retomar Atendimento" })), ticket.status === 'closed' && (_jsx(Button, { variant: "danger", size: "sm", leftIcon: _jsx(AlertTriangle, { className: "h-4 w-4" }), onClick: () => handleUpdateStatus(TicketStatus.IN_PROGRESS), isLoading: updateMutation.isLoading, children: "Reabrir Chamado" }))] }))] }), _jsxs(Card, { children: [_jsx(CardHeader, { className: "bg-gray-50 dark:bg-dark-300", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsx("h2", { className: "text-lg font-medium", children: "Adicionar Coment\u00E1rio" }), !isAddingComment && (_jsx(Button, { size: "sm", variant: "outline", leftIcon: _jsx(MessageSquare, { className: "h-4 w-4" }), onClick: () => setIsAddingComment(true), children: "Comentar" }))] }) }), isAddingComment && (_jsx(CardContent, { className: "p-4", children: _jsxs("form", { onSubmit: handleSubmit(handleAddComment), className: "space-y-4", children: [_jsx(TextArea, { ...register('message'), placeholder: "Digite seu coment\u00E1rio aqui...", rows: 4 }), _jsxs("div", { className: "flex justify-end space-x-3", children: [_jsx(Button, { type: "button", variant: "outline", onClick: () => {
                                                                    setIsAddingComment(false);
                                                                    reset();
                                                                }, children: "Cancelar" }), _jsx(Button, { type: "submit", isLoading: updateMutation.isLoading, children: "Enviar" })] })] }) }))] })] }), _jsx("div", { children: _jsx(TicketHistory, { history: ticket.history }) })] })] }) }));
}
//# sourceMappingURL=TicketDetails.js.map