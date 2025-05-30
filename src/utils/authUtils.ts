import { User } from '../types';

// Save token to localStorage with optional remember flag
export const saveToken = (token: string, remember: boolean = false) => {
  if (remember) {
    localStorage.setItem('auth_token', token);
  } else {
    sessionStorage.setItem('auth_token', token);
  }
};

// Get token from storage
export const getToken = (): string | null => {
  return localStorage.getItem('auth_token') || sessionStorage.getItem('auth_token');
};

// Remove token from all storages
export const removeToken = () => {
  localStorage.removeItem('auth_token');
  sessionStorage.removeItem('auth_token');
};

// Save user data to localStorage
export const saveUser = (user: User) => {
  localStorage.setItem('user', JSON.stringify(user));
};

// Get user data from localStorage
export const getUser = (): User | null => {
  const userData = localStorage.getItem('user');
  return userData ? JSON.parse(userData) : null;
};

// Remove user data from localStorage
export const removeUser = () => {
  localStorage.removeItem('user');
};

// Check if user is authenticated
export const isAuthenticated = (): boolean => {
  return !!getToken() && !!getUser();
};

// Check if user is technician or admin
export const isTechnician = (user: User | null): boolean => {
  return user?.role === 'technician' || user?.role === 'admin';
};

// Check if user is client
export const isClient = (user: User | null): boolean => {
  return user?.role === 'client';
};

// Check if user is admin
export const isAdmin = (user: User | null): boolean => {
  return user?.role === 'admin';
};