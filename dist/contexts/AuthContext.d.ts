import { ReactNode } from 'react';
import { AuthState } from '../types/index';
interface AuthContextType extends AuthState {
    login: (email: string, password: string, remember: boolean) => Promise<void>;
    logout: () => void;
    registerClient: (data: {
        name: string;
        email: string;
        password: string;
        company: string;
    }) => Promise<void>;
}
export declare const useAuth: () => AuthContextType;
export declare const AuthProvider: ({ children }: {
    children: ReactNode;
}) => import("react/jsx-runtime").JSX.Element;
export {};
