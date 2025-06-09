import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { X } from 'lucide-react';
export function Dialog({ isOpen, onClose, title, description, icon, actions, children }) {
    if (!isOpen)
        return null;
    return (_jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50", children: _jsxs("div", { className: "relative bg-white dark:bg-dark-200 rounded-lg shadow-lg max-w-md w-full max-h-[90vh] overflow-auto", onClick: (e) => e.stopPropagation(), children: [_jsxs("div", { className: "flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700", children: [_jsxs("div", { className: "flex items-center", children: [icon && _jsx("div", { className: "mr-3", children: icon }), _jsx("h3", { className: "text-lg font-medium text-gray-900 dark:text-white", children: title })] }), _jsx("button", { type: "button", className: "text-gray-400 hover:text-gray-500 focus:outline-none", onClick: onClose, children: _jsx(X, { className: "h-5 w-5" }) })] }), _jsxs("div", { className: "p-4", children: [description && _jsx("p", { className: "text-sm text-gray-500 dark:text-gray-400 mb-4", children: description }), children] }), actions && (_jsx("div", { className: "flex justify-end gap-2 p-4 border-t border-gray-200 dark:border-gray-700", children: actions }))] }) }));
}
//# sourceMappingURL=Dialog.js.map