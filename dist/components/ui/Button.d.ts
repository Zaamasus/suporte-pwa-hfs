import { ReactNode, ButtonHTMLAttributes } from 'react';
type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success';
type ButtonSize = 'sm' | 'md' | 'lg' | 'icon';
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    variant?: ButtonVariant;
    size?: ButtonSize;
    isLoading?: boolean;
    fullWidth?: boolean;
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
}
export declare function Button({ children, variant, size, isLoading, fullWidth, leftIcon, rightIcon, className, disabled, ...props }: ButtonProps): import("react/jsx-runtime").JSX.Element;
export {};
