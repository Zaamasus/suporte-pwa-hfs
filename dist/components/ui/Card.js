import { jsx as _jsx } from "react/jsx-runtime";
import { twMerge } from 'tailwind-merge';
export function Card({ children, className }) {
    return (_jsx("div", { className: twMerge('bg-white dark:bg-dark-200 rounded-lg shadow-md overflow-hidden', className), children: children }));
}
export function CardHeader({ children, className }) {
    return (_jsx("div", { className: twMerge('px-4 py-3 border-b border-gray-200 dark:border-gray-700 font-medium', className), children: children }));
}
export function CardContent({ children, className }) {
    return (_jsx("div", { className: twMerge('p-4', className), children: children }));
}
export function CardFooter({ children, className }) {
    return (_jsx("div", { className: twMerge('px-4 py-3 border-t border-gray-200 dark:border-gray-700', className), children: children }));
}
//# sourceMappingURL=Card.js.map