import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { Badge } from '../ui/Badge';
import { Card, CardContent, CardHeader } from '../ui/Card';
import { formatDate, getTicketStatusColor, getTicketStatusText } from '../../utils/formatters';
import { MessageSquare, Clock, Building2, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getCompanyColor } from '../../utils/companyColors';
export function TicketCard({ ticket }) {
    const statusColor = ticket.status === 'closed'
        ? 'success'
        : ticket.status === 'open'
            ? undefined
            : getTicketStatusColor(ticket.status);
    const statusText = getTicketStatusText(ticket.status);
    const companyColor = ticket.companyName ? getCompanyColor(ticket.companyName) : null;
    return (_jsx(Link, { to: `/tickets/${ticket.id}`, children: _jsxs(Card, { className: "h-full transition-all duration-300 hover:shadow-lg hover:scale-[1.01] cursor-pointer border border-gray-100 dark:border-gray-800 bg-white/80 dark:bg-dark-200/80 backdrop-blur-sm", children: [_jsxs(CardHeader, { className: "flex flex-col gap-3 pb-3", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsxs("span", { className: "text-xs font-mono text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 px-2 py-1 rounded-md", children: ["#", ticket.id.slice(0, 8)] }), ticket.status === 'open' ? (_jsx(Badge, { className: "bg-yellow-50 text-yellow-700 border border-yellow-200", children: statusText })) : (_jsx(Badge, { variant: statusColor, children: statusText }))] }), ticket.companyName && companyColor && (_jsxs("div", { className: "flex items-center text-sm", children: [_jsx(Building2, { className: `mr-1.5 h-4 w-4 ${companyColor.textColor}` }), _jsx("span", { className: `font-medium ${companyColor.textColor}`, children: ticket.companyName })] }))] }), _jsx("h3", { className: "text-lg font-semibold text-gray-900 dark:text-white line-clamp-1", children: ticket.title })] }), _jsxs(CardContent, { className: "space-y-4", children: [_jsx("p", { className: "text-sm text-gray-600 dark:text-gray-400 line-clamp-2", children: ticket.description }), ticket.category && (_jsxs("div", { className: "flex items-center gap-1.5", children: [_jsx(Tag, { className: "h-4 w-4 text-gray-400" }), _jsx(Badge, { variant: "outline", className: "text-xs", children: ticket.category })] })), _jsxs("div", { className: "flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 pt-3 border-t border-gray-100 dark:border-gray-800", children: [_jsxs("div", { className: "flex items-center gap-2", children: [ticket.clientName && (_jsx("span", { className: "font-medium text-orange-600 dark:text-orange-400", children: ticket.clientName })), _jsx("span", { className: "mx-1", children: "\u2022" }), _jsx(Clock, { className: "h-4 w-4" }), _jsx("span", { children: formatDate(ticket.createdAt) })] }), _jsxs("div", { className: "flex items-center gap-1", children: [_jsx(MessageSquare, { className: "h-4 w-4" }), _jsx("span", { children: ticket.history ? ticket.history.length : 0 })] })] })] })] }) }));
}
//# sourceMappingURL=TicketCard.js.map