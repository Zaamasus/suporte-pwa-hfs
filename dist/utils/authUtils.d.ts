import { User } from '../types';
export declare const saveToken: (token: string, remember?: boolean) => void;
export declare const getToken: () => string | null;
export declare const removeToken: () => void;
export declare const saveUser: (user: User) => void;
export declare const getUser: () => User | null;
export declare const removeUser: () => void;
export declare const isAuthenticated: () => boolean;
export declare const isTechnician: (user: User | null) => boolean;
export declare const isClient: (user: User | null) => boolean;
export declare const isAdmin: (user: User | null) => boolean;
export declare const saveCredentials: (email: string, password: string) => void;
export declare const getCredentials: () => {
    email: string;
    password: string;
} | null;
export declare const removeCredentials: () => void;
