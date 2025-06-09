import { ReactNode } from 'react';
interface CardProps {
    children: ReactNode;
    className?: string;
}
export declare function Card({ children, className }: CardProps): import("react/jsx-runtime").JSX.Element;
interface CardHeaderProps {
    children: ReactNode;
    className?: string;
}
export declare function CardHeader({ children, className }: CardHeaderProps): import("react/jsx-runtime").JSX.Element;
interface CardContentProps {
    children: ReactNode;
    className?: string;
}
export declare function CardContent({ children, className }: CardContentProps): import("react/jsx-runtime").JSX.Element;
interface CardFooterProps {
    children: ReactNode;
    className?: string;
}
export declare function CardFooter({ children, className }: CardFooterProps): import("react/jsx-runtime").JSX.Element;
export {};
