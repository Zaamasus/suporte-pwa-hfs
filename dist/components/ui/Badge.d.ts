import { ReactNode } from 'react';
type BadgeVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | 'default' | 'outline';
type BadgeSize = 'sm' | 'md' | 'lg';
interface BadgeProps {
    children: ReactNode;
    variant?: BadgeVariant;
    size?: BadgeSize;
    className?: string;
}
export declare function Badge({ children, variant, size, className }: BadgeProps): import("react/jsx-runtime").JSX.Element;
export {};
