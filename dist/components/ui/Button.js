import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { twMerge } from 'tailwind-merge';
import { Loader2 } from 'lucide-react';
export function Button({ children, variant = 'primary', size = 'md', isLoading = false, fullWidth = false, leftIcon, rightIcon, className, disabled, ...props }) {
    const variantClasses = {
        primary: 'bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500',
        secondary: 'bg-secondary-500 text-white hover:bg-secondary-600 focus:ring-secondary-400',
        outline: 'bg-transparent border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-dark-200 focus:ring-gray-500',
        ghost: 'bg-transparent text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-dark-200 focus:ring-gray-500',
        danger: 'bg-danger-600 text-white hover:bg-danger-700 focus:ring-danger-500',
        success: 'bg-success-600 text-white hover:bg-success-700 focus:ring-success-500',
    };
    const sizeClasses = {
        sm: 'text-sm px-3 py-1.5 rounded-md',
        md: 'text-sm px-4 py-2 rounded-md',
        lg: 'text-base px-6 py-3 rounded-md',
        icon: 'p-2 rounded-md',
    };
    const baseClasses = 'inline-flex items-center justify-center font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-dark-100 disabled:opacity-60 disabled:cursor-not-allowed';
    return (_jsx("button", { className: twMerge(baseClasses, variantClasses[variant], sizeClasses[size], fullWidth ? 'w-full' : '', isLoading ? 'cursor-not-allowed' : '', className), disabled: disabled || isLoading, ...props, children: isLoading ? (_jsxs(_Fragment, { children: [_jsx(Loader2, { className: "w-4 h-4 mr-2 animate-spin" }), children] })) : (_jsxs(_Fragment, { children: [leftIcon && _jsx("span", { className: "mr-2", children: leftIcon }), children, rightIcon && _jsx("span", { className: "ml-2", children: rightIcon })] })) }));
}
//# sourceMappingURL=Button.js.map