import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useQuery, useMutation } from 'react-query';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { Layout } from '../components/layout/Layout';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { useAuth } from '../contexts/AuthContext';
import { User, Lock, Eye, EyeOff } from 'lucide-react';
export function Profile() {
    const { user } = useAuth();
    const [profileData, setProfileData] = useState({
        name: '',
        email: '',
    });
    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    });
    const [showPassword, setShowPassword] = useState(false);
    const { isLoading } = useQuery('profile', async () => {
        const response = await axios.get('/api/users/me');
        return response.data;
    }, {
        onSuccess: (data) => {
            setProfileData({
                name: data.name,
                email: data.email,
            });
        },
        onError: () => {
            toast.error('Erro ao carregar dados do perfil');
        },
    });
    const profileMutation = useMutation(async (data) => {
        const response = await axios.put('/api/users/me', data);
        return response.data;
    }, {
        onSuccess: () => {
            toast.success('Perfil atualizado com sucesso!');
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || 'Erro ao atualizar perfil');
        },
    });
    const passwordMutation = useMutation(async (data) => {
        const response = await axios.put('/api/users/me/password', data);
        return response.data;
    }, {
        onSuccess: () => {
            toast.success('Senha atualizada com sucesso!');
            setPasswordData({
                currentPassword: '',
                newPassword: '',
                confirmPassword: '',
            });
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || 'Erro ao atualizar senha');
        },
    });
    const handleProfileChange = (e) => {
        const { name, value } = e.target;
        setProfileData((prev) => ({ ...prev, [name]: value }));
    };
    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setPasswordData((prev) => ({ ...prev, [name]: value }));
    };
    const handleProfileSubmit = (e) => {
        e.preventDefault();
        profileMutation.mutate(profileData);
    };
    const handlePasswordSubmit = (e) => {
        e.preventDefault();
        if (passwordData.newPassword.length < 6) {
            toast.error('A nova senha deve ter pelo menos 6 caracteres');
            return;
        }
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            toast.error('As senhas não coincidem');
            return;
        }
        passwordMutation.mutate({
            currentPassword: passwordData.currentPassword,
            newPassword: passwordData.newPassword,
        });
    };
    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };
    return (_jsx(Layout, { children: _jsxs("div", { className: "container mx-auto px-4 py-8", children: [_jsx("h1", { className: "text-2xl font-bold mb-6", children: "Meu Perfil" }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [_jsxs("div", { className: "bg-white dark:bg-dark-200 rounded-lg shadow p-6", children: [_jsxs("div", { className: "flex items-center mb-6", children: [_jsx(User, { className: "h-6 w-6 mr-2 text-indigo-500" }), _jsx("h2", { className: "text-xl font-semibold", children: "Informa\u00E7\u00F5es Pessoais" })] }), isLoading ? (_jsx("div", { className: "text-center py-4", children: "Carregando..." })) : (_jsxs("form", { onSubmit: handleProfileSubmit, className: "space-y-4", children: [_jsxs("div", { children: [_jsx("label", { htmlFor: "name", className: "block text-sm font-medium mb-1", children: "Nome" }), _jsx(Input, { id: "name", name: "name", value: profileData.name, onChange: handleProfileChange, placeholder: "Seu nome" })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "email", className: "block text-sm font-medium mb-1", children: "Email" }), _jsx(Input, { id: "email", name: "email", type: "email", value: profileData.email, onChange: handleProfileChange, placeholder: "Seu email", disabled: true }), _jsx("p", { className: "text-xs text-gray-500 mt-1", children: "O email n\u00E3o pode ser alterado." })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium mb-1", children: "Fun\u00E7\u00E3o" }), _jsxs("div", { className: "px-3 py-2 bg-gray-100 dark:bg-dark-300 rounded-md text-gray-700 dark:text-gray-300", children: [user?.role === 'admin' && 'Administrador', user?.role === 'technician' && 'Técnico', user?.role === 'client' && 'Cliente'] })] }), _jsx(Button, { type: "submit", isLoading: profileMutation.isLoading, children: "Atualizar Perfil" })] }))] }), _jsxs("div", { className: "bg-white dark:bg-dark-200 rounded-lg shadow p-6", children: [_jsxs("div", { className: "flex items-center mb-6", children: [_jsx(Lock, { className: "h-6 w-6 mr-2 text-indigo-500" }), _jsx("h2", { className: "text-xl font-semibold", children: "Alterar Senha" })] }), _jsxs("form", { onSubmit: handlePasswordSubmit, className: "space-y-4", children: [_jsxs("div", { children: [_jsx("label", { htmlFor: "currentPassword", className: "block text-sm font-medium mb-1", children: "Senha Atual" }), _jsxs("div", { className: "relative", children: [_jsx(Input, { id: "currentPassword", name: "currentPassword", type: showPassword ? 'text' : 'password', value: passwordData.currentPassword, onChange: handlePasswordChange, placeholder: "Digite sua senha atual", required: true }), _jsx("button", { type: "button", className: "absolute inset-y-0 right-0 pr-3 flex items-center", onClick: toggleShowPassword, children: showPassword ? (_jsx(EyeOff, { className: "h-5 w-5 text-gray-400" })) : (_jsx(Eye, { className: "h-5 w-5 text-gray-400" })) })] })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "newPassword", className: "block text-sm font-medium mb-1", children: "Nova Senha" }), _jsx("div", { className: "relative", children: _jsx(Input, { id: "newPassword", name: "newPassword", type: showPassword ? 'text' : 'password', value: passwordData.newPassword, onChange: handlePasswordChange, placeholder: "Digite sua nova senha", required: true }) })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "confirmPassword", className: "block text-sm font-medium mb-1", children: "Confirmar Nova Senha" }), _jsx("div", { className: "relative", children: _jsx(Input, { id: "confirmPassword", name: "confirmPassword", type: showPassword ? 'text' : 'password', value: passwordData.confirmPassword, onChange: handlePasswordChange, placeholder: "Confirme sua nova senha", required: true }) })] }), _jsx(Button, { type: "submit", isLoading: passwordMutation.isLoading, children: "Alterar Senha" })] })] })] })] }) }));
}
//# sourceMappingURL=Profile.js.map