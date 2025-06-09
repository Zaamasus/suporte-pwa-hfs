import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Plus, Pencil, Trash2, AlertCircle } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { Dialog } from '../components/ui/Dialog';
export function CompaniesList() {
    const [search, setSearch] = useState('');
    const [deleteCompanyId, setDeleteCompanyId] = useState(null);
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { data: companies, isLoading } = useQuery('companies', async () => {
        const response = await axios.get('/api/companies');
        return response.data;
    });
    const deleteMutation = useMutation((id) => axios.delete(`/api/companies/${id}`), {
        onSuccess: () => {
            toast.success('Empresa excluída com sucesso!');
            queryClient.invalidateQueries('companies');
            setDeleteCompanyId(null);
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || 'Erro ao excluir empresa');
            setDeleteCompanyId(null);
        },
    });
    const handleDeleteClick = (id) => {
        setDeleteCompanyId(id);
    };
    const confirmDelete = () => {
        if (deleteCompanyId) {
            deleteMutation.mutate(deleteCompanyId);
        }
    };
    const cancelDelete = () => {
        setDeleteCompanyId(null);
    };
    const filteredCompanies = companies?.filter(company => company.name.toLowerCase().includes(search.toLowerCase())) || [];
    return (_jsx(Layout, { children: _jsxs("div", { className: "container mx-auto px-4 py-8", children: [_jsxs("div", { className: "flex justify-between items-center mb-6", children: [_jsx("h1", { className: "text-2xl font-bold text-gray-900 dark:text-white", children: "Empresas" }), _jsx(Link, { to: "/companies/new", children: _jsx(Button, { leftIcon: _jsx(Plus, { className: "h-4 w-4" }), children: "Nova Empresa" }) })] }), _jsx("div", { className: "mb-6", children: _jsx(Input, { placeholder: "Buscar empresa...", value: search, onChange: (e) => setSearch(e.target.value) }) }), isLoading ? (_jsx("div", { className: "text-center py-8", children: "Carregando..." })) : (_jsx(_Fragment, { children: filteredCompanies.length === 0 ? (_jsx("div", { className: "text-center py-8 text-gray-500", children: "Nenhuma empresa encontrada." })) : (_jsx("div", { className: "bg-white dark:bg-dark-200 rounded-lg shadow overflow-hidden", children: _jsxs("table", { className: "min-w-full divide-y divide-gray-200 dark:divide-gray-700", children: [_jsx("thead", { className: "bg-gray-50 dark:bg-dark-300", children: _jsxs("tr", { children: [_jsx("th", { scope: "col", className: "px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider", children: "Cor" }), _jsx("th", { scope: "col", className: "px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider", children: "Nome" }), _jsx("th", { scope: "col", className: "px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider", children: "Criada em" }), _jsx("th", { scope: "col", className: "px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider", children: "A\u00E7\u00F5es" })] }) }), _jsx("tbody", { className: "bg-white dark:bg-dark-200 divide-y divide-gray-200 dark:divide-gray-700", children: filteredCompanies.map((company) => (_jsxs("tr", { className: "hover:bg-gray-50 dark:hover:bg-dark-300 cursor-pointer", onClick: () => navigate(`/companies/${encodeURIComponent(company.name)}`), children: [_jsx("td", { className: "px-6 py-4 whitespace-nowrap", children: _jsx("div", { className: "w-6 h-6 rounded-full", style: { backgroundColor: company.color || '#6366F1' } }) }), _jsx("td", { className: "px-6 py-4 whitespace-nowrap", children: _jsx("div", { className: "text-sm font-medium text-gray-900 dark:text-white", children: company.name }) }), _jsx("td", { className: "px-6 py-4 whitespace-nowrap", children: _jsx("div", { className: "text-sm text-gray-500 dark:text-gray-400", children: new Date(company.created_at).toLocaleDateString() }) }), _jsx("td", { className: "px-6 py-4 whitespace-nowrap text-right text-sm font-medium", children: _jsxs("div", { className: "flex justify-end space-x-2", onClick: (e) => e.stopPropagation(), children: [_jsx(Button, { variant: "outline", size: "sm", leftIcon: _jsx(Pencil, { className: "h-4 w-4" }), onClick: (e) => {
                                                                e.stopPropagation();
                                                                navigate(`/companies/edit/${company.id}`);
                                                            }, children: "Editar" }), _jsx(Button, { variant: "danger", size: "sm", leftIcon: _jsx(Trash2, { className: "h-4 w-4" }), onClick: (e) => {
                                                                e.stopPropagation();
                                                                handleDeleteClick(company.id);
                                                            }, children: "Excluir" })] }) })] }, company.id))) })] }) })) })), _jsx(Dialog, { isOpen: !!deleteCompanyId, onClose: cancelDelete, title: "Excluir Empresa", description: "Tem certeza que deseja excluir esta empresa? Esta a\u00E7\u00E3o n\u00E3o pode ser desfeita.", icon: _jsx(AlertCircle, { className: "h-6 w-6 text-red-500" }), actions: _jsxs(_Fragment, { children: [_jsx(Button, { variant: "outline", onClick: cancelDelete, children: "Cancelar" }), _jsx(Button, { variant: "danger", onClick: confirmDelete, isLoading: deleteMutation.isLoading, children: "Excluir" })] }) })] }) }));
}
//# sourceMappingURL=CompaniesList.js.map