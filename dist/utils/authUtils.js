// Save token to localStorage with optional remember flag
export const saveToken = (token, remember = false) => {
    if (remember) {
        localStorage.setItem('auth_token', token);
    }
    else {
        sessionStorage.setItem('auth_token', token);
    }
};
// Get token from storage
export const getToken = () => {
    return localStorage.getItem('auth_token') || sessionStorage.getItem('auth_token');
};
// Remove token from all storages
export const removeToken = () => {
    localStorage.removeItem('auth_token');
    sessionStorage.removeItem('auth_token');
};
// Save user data to localStorage
export const saveUser = (user) => {
    localStorage.setItem('user', JSON.stringify(user));
};
// Get user data from localStorage
export const getUser = () => {
    const userData = localStorage.getItem('user');
    return userData ? JSON.parse(userData) : null;
};
// Remove user data from localStorage
export const removeUser = () => {
    localStorage.removeItem('user');
};
// Check if user is authenticated
export const isAuthenticated = () => {
    return !!getToken() && !!getUser();
};
// Check if user is technician or admin
export const isTechnician = (user) => {
    return user?.role === 'technician' || user?.role === 'admin';
};
// Check if user is client
export const isClient = (user) => {
    return user?.role === 'client';
};
// Check if user is admin
export const isAdmin = (user) => {
    return user?.role === 'admin';
};
// Funções para salvar e recuperar credenciais quando "Lembrar-me" estiver marcado
// Salvar credenciais no localStorage
export const saveCredentials = (email, password) => {
    // Armazene o email como está e a senha com uma criptografia simples para não ficar em texto plano
    // (Nota: esta não é uma criptografia segura, apenas um ofuscamento básico)
    const encodedPassword = btoa(password);
    localStorage.setItem('remembered_email', email);
    localStorage.setItem('remembered_password', encodedPassword);
};
// Recuperar credenciais do localStorage
export const getCredentials = () => {
    const email = localStorage.getItem('remembered_email');
    const encodedPassword = localStorage.getItem('remembered_password');
    if (!email || !encodedPassword) {
        return null;
    }
    try {
        const password = atob(encodedPassword);
        return { email, password };
    }
    catch (error) {
        // Em caso de erro na decodificação, limpa os dados
        removeCredentials();
        return null;
    }
};
// Remover credenciais do localStorage
export const removeCredentials = () => {
    localStorage.removeItem('remembered_email');
    localStorage.removeItem('remembered_password');
};
//# sourceMappingURL=authUtils.js.map