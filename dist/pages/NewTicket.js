import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import { Layout } from '../components/layout/Layout';
import { Card, CardContent, CardHeader } from '../components/ui/Card';
import { TicketForm } from '../components/tickets/TicketForm';
import { Toast } from '../components/ui/Toast';
import { useState } from 'react';
import { useQueryClient } from 'react-query';
export function NewTicket() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [showSuccessToast, setShowSuccessToast] = useState(false);
    const createTicketMutation = useMutation(async (data) => {
        return axios.post('/api/tickets', {
            ...data,
            clientId: user?.id,
        });
    }, {
        onSuccess: (response) => {
            queryClient.invalidateQueries('tickets');
            setShowSuccessToast(true);
            setTimeout(() => {
                navigate('/tickets');
            }, 1500);
        },
    });
    const handleSubmit = (data) => {
        createTicketMutation.mutate(data);
    };
    return (_jsx(Layout, { children: _jsxs("div", { className: "max-w-3xl mx-auto", children: [_jsx("h1", { className: "text-2xl font-bold text-gray-900 dark:text-white mb-6", children: "Novo Chamado" }), _jsxs(Card, { children: [_jsx(CardHeader, { className: "bg-gray-50 dark:bg-dark-300", children: _jsx("h2", { className: "text-lg font-medium", children: "Informa\u00E7\u00F5es do Chamado" }) }), _jsx(CardContent, { className: "p-6", children: _jsx(TicketForm, { onSubmit: handleSubmit, isLoading: createTicketMutation.isLoading }) })] }), showSuccessToast && (_jsx(Toast, { type: "success", message: "Chamado criado com sucesso!", onClose: () => setShowSuccessToast(false) }))] }) }));
}
//# sourceMappingURL=NewTicket.js.map