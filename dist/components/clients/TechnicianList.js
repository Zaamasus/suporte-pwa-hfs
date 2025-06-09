import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useQuery } from 'react-query';
import axios from 'axios';
import { Card, CardContent, CardHeader } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { FaWhatsapp } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Button } from '../ui/Button';
import { useAuth } from '../../contexts/AuthContext';
import { useEffect } from 'react';
export function TechnicianList() {
    const { token, user } = useAuth();
    // Debug: log de informações importantes
    useEffect(() => {
        console.log('Token disponível:', !!token);
        console.log('Usuário logado:', user?.role);
    }, [token, user]);
    const { data: technicians, isLoading, error } = useQuery('technicians', async () => {
        console.log('Fazendo requisição para técnicos com token:', token?.substring(0, 10) + '...');
        try {
            const response = await axios.get('/api/users/technicians', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log('Resposta do servidor:', response.data);
            return response.data;
        }
        catch (err) {
            console.error('Erro ao buscar técnicos:', err);
            // Se for um erro Axios, extrair mais detalhes
            if (axios.isAxiosError(err)) {
                console.error('Detalhes do erro:', {
                    status: err.response?.status,
                    statusText: err.response?.statusText,
                    data: err.response?.data
                });
            }
            throw err;
        }
    }, {
        enabled: !!token,
        retry: 1, // Tentar apenas uma vez em caso de falha
        onError: (err) => {
            console.error('React Query erro:', err);
        }
    });
    // Debug: log do resultado da query
    useEffect(() => {
        if (technicians) {
            console.log('Técnicos carregados:', technicians.length);
        }
    }, [technicians]);
    if (isLoading) {
        return (_jsx("div", { className: "animate-pulse space-y-4", children: [...Array(3)].map((_, i) => (_jsx("div", { className: "h-24 bg-gray-200 dark:bg-dark-300 rounded-md" }, i))) }));
    }
    if (error) {
        return (_jsxs("div", { className: "bg-danger-50 dark:bg-danger-900/30 text-danger-700 dark:text-danger-400 p-4 rounded-md", children: ["Erro ao carregar t\u00E9cnicos dispon\u00EDveis.", _jsx("pre", { className: "text-xs mt-2 overflow-auto max-h-40", children: error instanceof Error ? error.message : 'Erro desconhecido' })] }));
    }
    // Adicionar isOnline para técnicos (simulado para o frontend)
    const techniciansWithStatus = technicians?.map(tech => ({
        ...tech,
        isOnline: true // Poderia ser um cálculo com base em alguma lógica ou campo do backend
    })) || [];
    return (_jsx("div", { className: "space-y-4", children: techniciansWithStatus.length > 0 ? (techniciansWithStatus.filter(tech => tech.isOnline).map((technician) => (_jsxs(Card, { className: "overflow-hidden", children: [_jsx(CardHeader, { className: "bg-gray-50 dark:bg-dark-300 py-3", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center space-x-3", children: [_jsxs("div", { className: "relative", children: [_jsx("div", { className: "h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center", children: _jsx("span", { className: "text-gray-600 dark:text-gray-300 font-medium", children: technician.name.charAt(0) }) }), _jsx("span", { className: "absolute bottom-0 right-0 h-3 w-3 rounded-full bg-success-500 border-2 border-white dark:border-dark-300" })] }), _jsxs("div", { children: [_jsx("h3", { className: "font-medium", children: technician.name }), _jsx("p", { className: "text-sm text-gray-500 dark:text-gray-400", children: "Suporte T\u00E9cnico" })] })] }), _jsx(Badge, { variant: "success", size: "sm", children: "Online" })] }) }), _jsx(CardContent, { className: "py-3", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsx("div", { className: "text-sm text-gray-600 dark:text-gray-400", children: technician.specialties?.join(', ') || 'Suporte Geral' }), (() => {
                                // Botão especial para Hilton e Samuele Hilton
                                if (technician.name.toLowerCase().includes('hilton')) {
                                    return (_jsx("a", { href: "https://wa.me/553196227738", target: "_blank", rel: "noopener noreferrer", children: _jsx(Button, { variant: "outline", size: "sm", leftIcon: _jsx(FaWhatsapp, { className: "h-4 w-4" }), children: "WhatsApp Hilton" }) }));
                                }
                                if (technician.name.toLowerCase().includes('samuel')) {
                                    return (_jsx("a", { href: "https://wa.me/553181142120", target: "_blank", rel: "noopener noreferrer", children: _jsx(Button, { variant: "outline", size: "sm", leftIcon: _jsx(FaWhatsapp, { className: "h-4 w-4" }), children: "WhatsApp Samuel" }) }));
                                }
                                // Para os demais técnicos, chat interno
                                return (_jsx(Link, { to: `/chat/${technician.id}`, children: _jsx(Button, { variant: "outline", size: "sm", leftIcon: _jsx(FaWhatsapp, { className: "h-4 w-4" }), children: "Conversar" }) }));
                            })()] }) })] }, technician.id)))) : (_jsx("div", { className: "text-center py-8 text-gray-500 dark:text-gray-400", children: _jsx("p", { children: "Nenhum t\u00E9cnico dispon\u00EDvel no momento." }) })) }));
}
//# sourceMappingURL=TechnicianList.js.map