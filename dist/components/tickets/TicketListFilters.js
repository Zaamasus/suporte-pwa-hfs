import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useForm } from 'react-hook-form';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Button } from '../ui/Button';
import { Search, Filter, RefreshCw } from 'lucide-react';
export function TicketListFilters({ onFilter }) {
    const { register, handleSubmit, reset } = useForm({
        defaultValues: {
            search: '',
            status: '',
            priority: '',
            sortBy: 'newest',
        },
    });
    const statusOptions = [
        { value: '', label: 'Todos' },
        { value: 'open', label: 'Em aberto' },
        { value: 'in_progress', label: 'Em andamento' },
        { value: 'completed', label: 'Concluído' },
    ];
    const priorityOptions = [
        { value: '', label: 'Todas' },
        { value: 'low', label: 'Baixa' },
        { value: 'medium', label: 'Média' },
        { value: 'high', label: 'Alta' },
    ];
    const sortOptions = [
        { value: 'newest', label: 'Mais recentes' },
        { value: 'oldest', label: 'Mais antigos' },
        { value: 'priority', label: 'Prioridade' },
        { value: 'alphabetical', label: 'Alfabética' },
    ];
    const handleReset = () => {
        reset({
            search: '',
            status: '',
            priority: '',
            sortBy: 'newest',
        });
        onFilter({
            search: '',
            status: '',
            priority: '',
            sortBy: 'newest',
        });
    };
    return (_jsxs("form", { onSubmit: handleSubmit(onFilter), className: "space-y-4 mb-6 bg-white dark:bg-dark-200 p-4 rounded-lg shadow-sm", children: [_jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center gap-4", children: [_jsx("div", { className: "flex-1", children: _jsx(Input, { ...register('search'), placeholder: "Buscar chamados...", leftIcon: _jsx(Search, { className: "h-4 w-4" }) }) }), _jsxs("div", { className: "grid grid-cols-2 sm:grid-cols-3 gap-4", children: [_jsx(Select, { ...register('status'), options: statusOptions, placeholder: "Status", leftIcon: _jsx(Filter, { className: "h-4 w-4" }) }), _jsx(Select, { ...register('priority'), options: priorityOptions, placeholder: "Prioridade" }), _jsx(Select, { ...register('sortBy'), options: sortOptions, placeholder: "Ordenar por" })] })] }), _jsxs("div", { className: "flex justify-end space-x-3", children: [_jsx(Button, { type: "button", variant: "outline", onClick: handleReset, leftIcon: _jsx(RefreshCw, { className: "h-4 w-4" }), children: "Limpar filtros" }), _jsx(Button, { type: "submit", leftIcon: _jsx(Search, { className: "h-4 w-4" }), children: "Filtrar" })] })] }));
}
//# sourceMappingURL=TicketListFilters.js.map