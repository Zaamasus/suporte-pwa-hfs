import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { LoginForm } from '../components/auth/LoginForm';
import { Shield } from 'lucide-react';
export function Login() {
    const { isAuthenticated, user } = useAuth();
    const navigate = useNavigate();
    useEffect(() => {
        if (isAuthenticated) {
            navigate('/');
        }
    }, [isAuthenticated, navigate]);
    return (_jsx("div", { className: "min-h-screen flex flex-col justify-center items-center bg-gray-50 dark:bg-dark-100 px-4", children: _jsxs("div", { className: "max-w-md w-full space-y-8", children: [_jsxs("div", { className: "text-center", children: [_jsx("div", { className: "flex justify-center", children: _jsx("div", { className: "h-12 w-12 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center", children: _jsx(Shield, { className: "h-6 w-6 text-primary-600 dark:text-primary-400" }) }) }), _jsx("h2", { className: "mt-6 text-3xl font-extrabold text-gray-900 dark:text-white", children: "HFS INFORMATICA" }), _jsx("p", { className: "mt-2 text-sm text-gray-600 dark:text-gray-400", children: "Entre com sua conta para acessar o sistema de suporte t\u00E9cnico" })] }), _jsx("div", { className: "bg-white dark:bg-dark-200 p-8 rounded-xl shadow-md", children: _jsx(LoginForm, {}) }), _jsx("div", { className: "text-center text-sm text-gray-500 dark:text-gray-400" })] }) }));
}
//# sourceMappingURL=Login.js.map