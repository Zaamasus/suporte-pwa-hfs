import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import axios from 'axios';
import { Layout } from '../components/layout/Layout';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { ColorPicker } from '../components/ui/ColorPicker';
import { toast } from 'react-hot-toast';
export function CompanyEdit() {
    const { id } = useParams();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const isEditMode = !!id;
    const [formData, setFormData] = useState({
        name: '',
        color: '#6366F1', // Cor padrão (indigo)
    });
    const { data: company, isLoading: isLoadingCompany } = useQuery(['company', id], async () => {
        if (!id)
            return null;
        const response = await axios.get(`/api/companies/id/${id}`);
        return response.data;
    }, {
        enabled: isEditMode,
    });
    useEffect(() => {
        if (company) {
            setFormData({
                name: company.name,
                color: company.color || '#6366F1',
            });
        }
    }, [company]);
    const createMutation = useMutation((data) => axios.post('/api/companies', data), {
        onSuccess: () => {
            toast.success('Empresa criada com sucesso!');
            queryClient.invalidateQueries('companies');
            navigate('/companies');
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || 'Erro ao criar empresa');
        },
    });
    const updateMutation = useMutation((data) => axios.put(`/api/companies/${id}`, data), {
        onSuccess: () => {
            toast.success('Empresa atualizada com sucesso!');
            queryClient.invalidateQueries(['company', id]);
            queryClient.invalidateQueries('companies');
            navigate('/companies');
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || 'Erro ao atualizar empresa');
        },
    });
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.name.trim()) {
            toast.error('O nome da empresa é obrigatório');
            return;
        }
        if (isEditMode) {
            updateMutation.mutate(formData);
        }
        else {
            createMutation.mutate(formData);
        }
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };
    const handleColorChange = (color) => {
        setFormData(prev => ({ ...prev, color }));
    };
    if (isEditMode && isLoadingCompany) {
        return (_jsx(Layout, { children: _jsx("div", { className: "container mx-auto px-4 py-8", children: _jsx("div", { className: "text-center", children: "Carregando..." }) }) }));
    }
    return (_jsx(Layout, { children: _jsxs("div", { className: "container mx-auto px-4 py-8", children: [_jsx("h1", { className: "text-2xl font-bold mb-6", children: isEditMode ? 'Editar Empresa' : 'Nova Empresa' }), _jsxs("form", { onSubmit: handleSubmit, className: "max-w-lg mx-auto bg-white dark:bg-dark-200 p-6 rounded-lg shadow", children: [_jsxs("div", { className: "mb-4", children: [_jsx("label", { htmlFor: "name", className: "block text-sm font-medium mb-1", children: "Nome da Empresa" }), _jsx(Input, { id: "name", name: "name", value: formData.name, onChange: handleChange, placeholder: "Digite o nome da empresa", required: true })] }), _jsxs("div", { className: "mb-6", children: [_jsx("label", { htmlFor: "color", className: "block text-sm font-medium mb-1", children: "Cor (opcional)" }), _jsx(ColorPicker, { color: formData.color, onChange: handleColorChange }), _jsx("p", { className: "text-xs text-gray-500 mt-1", children: "Esta cor ser\u00E1 usada para identificar visualmente a empresa." })] }), _jsxs("div", { className: "flex justify-end space-x-4", children: [_jsx(Button, { variant: "outline", type: "button", onClick: () => navigate('/companies'), children: "Cancelar" }), _jsx(Button, { type: "submit", isLoading: createMutation.isLoading || updateMutation.isLoading, children: isEditMode ? 'Salvar Alterações' : 'Criar Empresa' })] })] })] }) }));
}
//# sourceMappingURL=CompanyEdit.js.map