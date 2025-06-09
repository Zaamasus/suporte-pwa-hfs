import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Layout } from '../components/layout/Layout';
export function ClientEdit() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { register, handleSubmit, setValue, formState: { errors, isSubmitting } } = useForm();
    useEffect(() => {
        async function fetchClient() {
            const response = await axios.get(`/api/users/${id}`);
            const client = response.data;
            setValue('name', client.name);
            setValue('email', client.email);
            setValue('company', client.company || '');
            setValue('is_blocked', client.is_blocked || false);
        }
        fetchClient();
    }, [id, setValue]);
    const onSubmit = async (data) => {
        const payload = {
            name: data.name,
            email: data.email,
            company: data.company,
            is_blocked: data.is_blocked,
        };
        if (data.password) {
            payload.password = data.password;
        }
        await axios.put(`/api/users/${id}`, payload);
        navigate('/clients');
    };
    return (_jsx(Layout, { children: _jsxs("div", { className: "max-w-xl mx-auto py-8", children: [_jsx("h1", { className: "text-2xl font-bold mb-6 text-gray-900 dark:text-white", children: "Editar Cliente" }), _jsxs("form", { onSubmit: handleSubmit(onSubmit), className: "space-y-6 bg-white dark:bg-dark-200 p-6 rounded-lg shadow", children: [_jsx(Input, { label: "Nome", ...register('name', { required: 'Nome é obrigatório' }), error: errors.name?.message, disabled: isSubmitting }), _jsx(Input, { label: "Email", type: "email", ...register('email', { required: 'Email é obrigatório' }), error: errors.email?.message, disabled: isSubmitting }), _jsx(Input, { label: "Nova Senha (opcional)", type: "password", ...register('password'), error: errors.password?.message, disabled: isSubmitting }), _jsx("div", { children: _jsxs("label", { className: "flex items-center gap-2", children: [_jsx("input", { type: "checkbox", ...register('is_blocked'), disabled: isSubmitting }), "Bloquear funcion\u00E1rio no sistema"] }) }), _jsx("div", { className: "flex justify-end", children: _jsx(Button, { type: "submit", isLoading: isSubmitting, children: "Salvar Altera\u00E7\u00F5es" }) })] })] }) }));
}
//# sourceMappingURL=ClientEdit.js.map