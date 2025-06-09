import { SelectHTMLAttributes, ReactNode } from 'react';
interface SelectOption {
    value: string;
    label: string;
}
interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    label?: string;
    options: SelectOption[];
    error?: string;
    hint?: string;
    fullWidth?: boolean;
    leftIcon?: ReactNode;
}
export declare const Select: import("react").ForwardRefExoticComponent<SelectProps & import("react").RefAttributes<HTMLSelectElement>>;
export {};
