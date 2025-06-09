import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { useAuth } from '../../contexts/AuthContext';
import { useQuery } from 'react-query';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';
const clientSchema = z.object({
    name: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres'),
    email: z.string().email('Email inválido'),
    password: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres'),
    company: z.string().min(2, 'Nome da empresa é obrigatório'),
    isNewCompany: z.boolean().optional(),
});
export function ClientForm() {
    const { registerClient, isLoading, error } = useAuth();
    const [searchParams] = useSearchParams();
    const prefilledCompany = searchParams.get('company') || '';
    const [isNewCompany, setIsNewCompany] = useState(false);
    // Buscar empresas existentes
    const { data: companies = [] } = useQuery('companies', async () => {
        const response = await axios.get('/api/users/clients');
        // Extrair nomes únicos de empresas
        const uniqueCompanies = new Set(response.data.map((client) => client.company).filter(Boolean));
        return Array.from(uniqueCompanies);
    });
    const { register, handleSubmit, reset, setValue, watch, formState: { errors, isSubmitSuccessful }, } = useForm({
        resolver: zodResolver(clientSchema),
        defaultValues: {
            company: prefilledCompany,
            isNewCompany: false,
        }
    });
    // Quando a empresa pré-preenchida mudar, atualizar o formulário
    useEffect(() => {
        if (prefilledCompany) {
            setValue('company', prefilledCompany);
        }
    }, [prefilledCompany, setValue]);
    const onSubmit = async (data) => {
        // Incluir o flag de empresa nova nos dados
        const clientData = {
            ...data,
            isNewCompany,
        };
        await registerClient(clientData);
        if (!error) {
            reset();
        }
    };
    const selectedCompany = watch('company');
    return (_jsxs("form", { onSubmit: handleSubmit(onSubmit), className: "space-y-6", children: [error && (_jsx("div", { className: "bg-danger-50 dark:bg-danger-900/30 text-danger-700 dark:text-danger-400 p-3 rounded-md text-sm", children: error })), isSubmitSuccessful && !error && (_jsx("div", { className: "bg-success-50 dark:bg-success-900/30 text-success-700 dark:text-success-400 p-3 rounded-md text-sm", children: "Cliente cadastrado com sucesso!" })), _jsx(Input, { label: "Nome do cliente", ...register('name'), error: errors.name?.message, disabled: isLoading }), _jsx(Input, { label: "Email", type: "email", ...register('email'), error: errors.email?.message, disabled: isLoading }), _jsx(Input, { label: "Senha", type: "password", ...register('password'), error: errors.password?.message, disabled: isLoading }), _jsxs("div", { children: [_jsxs("div", { className: "flex items-center mb-2", children: [_jsx("label", { className: "block text-sm font-medium", children: "Empresa" }), _jsxs("label", { className: "flex items-center ml-auto cursor-pointer", children: [_jsx("input", { type: "checkbox", className: "mr-2", checked: isNewCompany, onChange: (e) => {
                                            setIsNewCompany(e.target.checked);
                                            if (e.target.checked) {
                                                setValue('company', '');
                                            }
                                        } }), _jsx("span", { className: "text-sm", children: "Nova Empresa" })] })] }), isNewCompany ? (_jsx(Input, { placeholder: "Nome da nova empresa", ...register('company'), error: errors.company?.message, disabled: isLoading })) : (_jsxs("select", { className: "w-full p-2 border border-gray-300 rounded-md dark:bg-dark-100 dark:border-dark-300", ...register('company'), disabled: isLoading, children: [_jsx("option", { value: "", children: "Selecione uma empresa" }), companies.map((company) => (_jsx("option", { value: company, children: company }, company)))] })), errors.company && _jsx("p", { className: "text-red-500 text-sm mt-1", children: errors.company.message })] }), _jsx("div", { className: "flex justify-end", children: _jsx(Button, { type: "submit", isLoading: isLoading, children: "Cadastrar Cliente" }) })] }));
}
//# sourceMappingURL=ClientForm.js.map