import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '../ui/Input';
import { TextArea } from '../ui/TextArea';
import { Select } from '../ui/Select';
import { Button } from '../ui/Button';
import { useAuth } from '../../contexts/AuthContext';
const ticketSchema = z.object({
    title: z.string().min(5, 'Título deve ter no mínimo 5 caracteres'),
    description: z.string().min(10, 'Descrição deve ter no mínimo 10 caracteres'),
    priority: z.enum(['low', 'medium', 'high']),
    category: z.string().min(1, 'Categoria é obrigatória'),
});
export function TicketForm({ onSubmit, isLoading, initialData }) {
    const { user } = useAuth();
    const { register, handleSubmit, formState: { errors }, } = useForm({
        resolver: zodResolver(ticketSchema),
        defaultValues: {
            title: initialData?.title || '',
            description: initialData?.description || '',
            priority: initialData?.priority || 'medium',
            category: initialData?.category || '',
        },
    });
    const priorityOptions = [
        { value: 'low', label: 'Baixa' },
        { value: 'medium', label: 'Média' },
        { value: 'high', label: 'Alta' },
    ];
    const categoryOptions = [
        { value: 'Hardware', label: 'Hardware' },
        { value: 'Software', label: 'Software' },
        { value: 'Rede', label: 'Rede' },
        { value: 'Sistema', label: 'Sistema' },
        { value: 'Impressora', label: 'Impressora' },
        { value: 'Backup', label: 'Backup' },
        { value: 'Outro', label: 'Outro' },
    ];
    return (_jsxs("form", { onSubmit: handleSubmit(onSubmit), className: "space-y-6", children: [_jsx(Input, { label: "T\u00EDtulo do Chamado", ...register('title'), error: errors.title?.message, placeholder: "Descreva o problema brevemente", disabled: isLoading }), _jsx(TextArea, { label: "Descri\u00E7\u00E3o Detalhada", ...register('description'), error: errors.description?.message, placeholder: "Descreva o problema em detalhes, incluindo quando come\u00E7ou e quais passos j\u00E1 tentou para resolv\u00EA-lo...", rows: 5, disabled: isLoading }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [_jsx(Select, { label: "Categoria", ...register('category'), options: categoryOptions, error: errors.category?.message, disabled: isLoading }), _jsx(Select, { label: "Prioridade", ...register('priority'), options: priorityOptions, error: errors.priority?.message, disabled: isLoading })] }), user?.company && (_jsx("div", { className: "bg-gray-50 dark:bg-dark-300 p-3 rounded-md", children: _jsxs("p", { className: "text-sm text-gray-600 dark:text-gray-400", children: ["Este chamado ser\u00E1 aberto para: ", _jsx("span", { className: "font-medium", children: user.company })] }) })), _jsx("div", { className: "flex justify-end", children: _jsx(Button, { type: "submit", isLoading: isLoading, children: initialData ? 'Atualizar Chamado' : 'Abrir Chamado' }) })] }));
}
//# sourceMappingURL=TicketForm.js.map