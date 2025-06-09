import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { Mail, Lock, LogIn } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { getCredentials } from '../../utils/authUtils';
const loginSchema = z.object({
    email: z.string().email('Email inválido'),
    password: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres'),
    remember: z.boolean().optional(),
});
export function LoginForm() {
    const { login, isLoading, error } = useAuth();
    const [showPassword, setShowPassword] = useState(false);
    const { register, handleSubmit, formState: { errors }, setValue, } = useForm({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: '',
            remember: false,
        },
    });
    // Carrega credenciais salvas ao montar o componente
    useEffect(() => {
        const savedCredentials = getCredentials();
        if (savedCredentials) {
            setValue('email', savedCredentials.email);
            setValue('password', savedCredentials.password);
            setValue('remember', true); // Marca a opção "Lembrar-me" automaticamente
        }
    }, [setValue]);
    const onSubmit = async (data) => {
        await login(data.email.trim(), data.password.trim(), data.remember || false);
    };
    return (_jsxs("form", { onSubmit: handleSubmit(onSubmit), className: "space-y-6", children: [error && (_jsx("div", { className: "bg-danger-50 dark:bg-danger-900/30 text-danger-700 dark:text-danger-400 p-3 rounded-md text-sm", children: error })), _jsx(Input, { label: "Email", type: "email", ...register('email'), error: errors.email?.message, placeholder: "seu@email.com", leftIcon: _jsx(Mail, { className: "h-4 w-4" }), disabled: isLoading }), _jsx(Input, { label: "Senha", type: showPassword ? 'text' : 'password', ...register('password'), error: errors.password?.message, placeholder: "Sua senha", leftIcon: _jsx(Lock, { className: "h-4 w-4" }), rightIcon: _jsx("button", { type: "button", className: "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300", onClick: () => setShowPassword(!showPassword), children: showPassword ? 'Ocultar' : 'Mostrar' }), disabled: isLoading }), _jsxs("div", { className: "flex items-center", children: [_jsx("input", { id: "remember", type: "checkbox", ...register('remember'), className: "h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded" }), _jsx("label", { htmlFor: "remember", className: "ml-2 block text-sm text-gray-700 dark:text-gray-300", children: "Lembrar-me" })] }), _jsx(Button, { type: "submit", fullWidth: true, isLoading: isLoading, leftIcon: _jsx(LogIn, { className: "h-4 w-4" }), children: "Entrar" })] }));
}
//# sourceMappingURL=LoginForm.js.map