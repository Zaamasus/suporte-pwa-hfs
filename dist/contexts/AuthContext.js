import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { saveToken, saveUser, getToken, getUser, removeToken, removeUser, saveCredentials, removeCredentials } from '../utils/authUtils';
const initialState = {
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
};
const AuthContext = createContext({
    ...initialState,
    login: async () => { },
    logout: () => { },
    registerClient: async () => { },
});
export const useAuth = () => useContext(AuthContext);
export const AuthProvider = ({ children }) => {
    const [state, setState] = useState(initialState);
    // Initialize auth state from storage
    useEffect(() => {
        const token = getToken();
        const user = getUser();
        if (token && user) {
            setState({
                user,
                token,
                isAuthenticated: true,
                isLoading: false,
                error: null,
            });
            // Set axios default auth header
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }
    }, []);
    const login = async (email, password, remember) => {
        setState(prev => ({ ...prev, isLoading: true, error: null }));
        try {
            const response = await axios.post('/api/auth/login', { email, password });
            const { user, token } = response.data;
            // Save auth data
            saveToken(token, remember);
            saveUser(user);
            // Se "lembrar-me" estiver marcado, salve as credenciais
            if (remember) {
                saveCredentials(email, password);
            }
            else {
                // Se não estiver marcado, remova credenciais salvas anteriormente
                removeCredentials();
            }
            // Set axios default auth header
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            setState({
                user,
                token,
                isAuthenticated: true,
                isLoading: false,
                error: null,
            });
        }
        catch (error) {
            setState(prev => ({
                ...prev,
                isLoading: false,
                error: 'Email ou senha inválidos',
            }));
        }
    };
    const logout = () => {
        // Remove auth data
        removeToken();
        removeUser();
        // Não remova as credenciais salvas no logout para permitir o login automático na próxima visita
        // removeCredentials();
        // Remove axios default auth header
        delete axios.defaults.headers.common['Authorization'];
        setState(initialState);
    };
    const registerClient = async (data) => {
        setState(prev => ({ ...prev, isLoading: true, error: null }));
        try {
            await axios.post('/api/auth/register', data);
            setState(prev => ({ ...prev, isLoading: false }));
        }
        catch (error) {
            setState(prev => ({
                ...prev,
                isLoading: false,
                error: 'Erro ao registrar cliente',
            }));
        }
    };
    return (_jsx(AuthContext.Provider, { value: { ...state, login, logout, registerClient }, children: children }));
};
//# sourceMappingURL=AuthContext.js.map