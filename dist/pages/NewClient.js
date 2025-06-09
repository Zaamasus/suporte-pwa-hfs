import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Layout } from '../components/layout/Layout';
import { Card, CardContent, CardHeader } from '../components/ui/Card';
import { ClientForm } from '../components/clients/ClientForm';
export function NewClient() {
    return (_jsx(Layout, { children: _jsxs("div", { className: "max-w-3xl mx-auto", children: [_jsx("h1", { className: "text-2xl font-bold text-gray-900 dark:text-white mb-6", children: "Cadastrar Novo Cliente" }), _jsxs(Card, { children: [_jsx(CardHeader, { className: "bg-gray-50 dark:bg-dark-300", children: _jsx("h2", { className: "text-lg font-medium", children: "Informa\u00E7\u00F5es do Cliente" }) }), _jsx(CardContent, { className: "p-6", children: _jsx(ClientForm, {}) })] })] }) }));
}
//# sourceMappingURL=NewClient.js.map