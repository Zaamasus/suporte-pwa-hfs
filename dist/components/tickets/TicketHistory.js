import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { formatDateTime } from '../../utils/formatters';
import { Card, CardContent, CardHeader } from '../ui/Card';
import { MessageSquare, RefreshCw, User, Shield } from 'lucide-react';
export function TicketHistory({ history }) {
    return (_jsxs(Card, { className: "border border-gray-100 dark:border-gray-800 bg-white/80 dark:bg-dark-200/80 backdrop-blur-sm", children: [_jsx(CardHeader, { className: "bg-gray-50 dark:bg-dark-300", children: _jsx("h3", { className: "text-lg font-medium", children: "Hist\u00F3rico do Chamado" }) }), _jsx(CardContent, { className: "divide-y divide-gray-100 dark:divide-gray-800", children: history.length === 0 ? (_jsx("p", { className: "text-gray-500 dark:text-gray-400 py-4 text-center", children: "Nenhum hist\u00F3rico dispon\u00EDvel." })) : (history.map((entry) => {
                    const isStatusChange = entry.message.startsWith('Status atualizado para');
                    const roleLabel = entry.createdBy.role === 'client'
                        ? 'Cliente'
                        : entry.createdBy.role === 'technician'
                            ? 'Técnico'
                            : 'Administrador';
                    const roleIcon = entry.createdBy.role === 'client'
                        ? _jsx(User, { className: "w-4 h-4 text-blue-500" })
                        : entry.createdBy.role === 'technician'
                            ? _jsx(Shield, { className: "w-4 h-4 text-green-500" })
                            : _jsx(Shield, { className: "w-4 h-4 text-gray-500" });
                    let statusColor = '';
                    if (isStatusChange) {
                        if (entry.message.includes('Em aberto'))
                            statusColor = 'bg-yellow-50 text-yellow-700 border border-yellow-200';
                        else if (entry.message.includes('Em andamento'))
                            statusColor = 'bg-blue-50 text-blue-700 border border-blue-200';
                        else if (entry.message.includes('Em pausa'))
                            statusColor = 'bg-orange-50 text-orange-700 border border-orange-200';
                        else if (entry.message.includes('Concluído'))
                            statusColor = 'bg-green-50 text-green-700 border border-green-200';
                    }
                    return (_jsxs("div", { className: "py-4", children: [_jsxs("div", { className: "flex items-start justify-between", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("div", { className: "p-1.5 rounded-lg bg-gray-50 dark:bg-gray-800", children: roleIcon }), _jsxs("div", { children: [_jsx("span", { className: "text-sm font-medium text-gray-900 dark:text-white", children: entry.createdBy.name }), _jsxs("span", { className: "text-xs text-gray-500 dark:text-gray-400 ml-2", children: ["(", roleLabel, ")"] })] })] }), _jsx("span", { className: "text-xs text-gray-500 dark:text-gray-400", children: formatDateTime(entry.createdAt) })] }), isStatusChange ? (_jsxs("div", { className: "mt-3 flex items-center gap-2", children: [_jsx("div", { className: "p-1.5 rounded-lg bg-primary-50 dark:bg-primary-900/20", children: _jsx(RefreshCw, { className: "w-4 h-4 text-primary-500" }) }), _jsx("span", { className: `text-xs font-medium px-2.5 py-1 rounded-md ${statusColor}`, children: entry.message })] })) : (_jsxs("div", { className: "mt-3 flex items-center gap-2", children: [_jsx("div", { className: "p-1.5 rounded-lg bg-gray-50 dark:bg-gray-800", children: _jsx(MessageSquare, { className: "w-4 h-4 text-gray-400" }) }), _jsx("span", { className: "text-sm text-gray-700 dark:text-gray-300", children: entry.message })] }))] }, entry.id));
                })) })] }));
}
//# sourceMappingURL=TicketHistory.js.map