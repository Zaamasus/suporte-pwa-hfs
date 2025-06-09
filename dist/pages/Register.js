import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Eye, EyeOff } from 'lucide-react';
export function Register() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const registerMutation = useMutation(async (data) => {
        const response = await axios.post('/api/auth/register', data);
        return response.data;
    }, {
        onSuccess: () => {
            toast.success('Cadastro realizado com sucesso!');
            navigate('/login');
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || 'Erro ao realizar cadastro');
        },
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        // Validações
        if (!formData.name.trim()) {
            toast.error('O nome é obrigatório');
            return;
        }
        if (!formData.email.trim()) {
            toast.error('O email é obrigatório');
            return;
        }
        if (!formData.password) {
            toast.error('A senha é obrigatória');
            return;
        }
        if (formData.password.length < 6) {
            toast.error('A senha deve ter pelo menos 6 caracteres');
            return;
        }
        if (formData.password !== formData.confirmPassword) {
            toast.error('As senhas não coincidem');
            return;
        }
        registerMutation.mutate({
            name: formData.name,
            email: formData.email,
            password: formData.password,
        });
    };
    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };
    return (_jsx("div", { className: "min-h-screen flex items-center justify-center bg-gray-100 dark:bg-dark-100 px-4", children: _jsxs("div", { className: "max-w-md w-full bg-white dark:bg-dark-200 rounded-lg shadow-md p-8", children: [_jsxs("div", { className: "text-center mb-6", children: [_jsx("h1", { className: "text-2xl font-bold text-gray-900 dark:text-white", children: "Criar Conta" }), _jsx("p", { className: "text-sm text-gray-600 dark:text-gray-400 mt-2", children: "Crie sua conta para acessar o sistema" })] }), _jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [_jsxs("div", { children: [_jsx("label", { htmlFor: "name", className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1", children: "Nome" }), _jsx(Input, { id: "name", name: "name", type: "text", value: formData.name, onChange: handleChange, placeholder: "Seu nome completo", required: true })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "email", className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1", children: "Email" }), _jsx(Input, { id: "email", name: "email", type: "email", value: formData.email, onChange: handleChange, placeholder: "seu.email@exemplo.com", required: true })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "password", className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1", children: "Senha" }), _jsxs("div", { className: "relative", children: [_jsx(Input, { id: "password", name: "password", type: showPassword ? 'text' : 'password', value: formData.password, onChange: handleChange, placeholder: "Sua senha", required: true }), _jsx("button", { type: "button", className: "absolute inset-y-0 right-0 pr-3 flex items-center", onClick: toggleShowPassword, children: showPassword ? (_jsx(EyeOff, { className: "h-5 w-5 text-gray-400" })) : (_jsx(Eye, { className: "h-5 w-5 text-gray-400" })) })] })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "confirmPassword", className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1", children: "Confirmar Senha" }), _jsxs("div", { className: "relative", children: [_jsx(Input, { id: "confirmPassword", name: "confirmPassword", type: showPassword ? 'text' : 'password', value: formData.confirmPassword, onChange: handleChange, placeholder: "Confirme sua senha", required: true }), _jsx("button", { type: "button", className: "absolute inset-y-0 right-0 pr-3 flex items-center", onClick: toggleShowPassword, children: showPassword ? (_jsx(EyeOff, { className: "h-5 w-5 text-gray-400" })) : (_jsx(Eye, { className: "h-5 w-5 text-gray-400" })) })] })] }), _jsx(Button, { type: "submit", className: "w-full", isLoading: registerMutation.isLoading, children: "Criar Conta" })] }), _jsx("div", { className: "text-center mt-6", children: _jsxs("p", { className: "text-sm text-gray-600 dark:text-gray-400", children: ["J\u00E1 tem uma conta?", ' ', _jsx(Link, { to: "/login", className: "text-indigo-600 dark:text-indigo-400 hover:underline", children: "Fa\u00E7a login" })] }) })] }) }));
}
//# sourceMappingURL=Register.js.map