import { ReactNode } from 'react';
interface DialogProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    description?: string;
    icon?: ReactNode;
    actions?: ReactNode;
    children?: ReactNode;
}
export declare function Dialog({ isOpen, onClose, title, description, icon, actions, children }: DialogProps): import("react/jsx-runtime").JSX.Element | null;
export {};
