import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardContent, CardHeader } from '../ui/Card';
import { Paperclip, Image, Film, FileText, X, Download } from 'lucide-react';
import { useState } from 'react';
export function TicketAttachments({ attachments }) {
    const [expandedImage, setExpandedImage] = useState(null);
    if (!attachments || attachments.length === 0) {
        return null;
    }
    // Função para determinar o ícone correto baseado no mimetype
    const getFileIcon = (mimetype) => {
        if (mimetype.startsWith('image/')) {
            return _jsx(Image, { className: "h-5 w-5 text-blue-500" });
        }
        else if (mimetype.startsWith('video/')) {
            return _jsx(Film, { className: "h-5 w-5 text-purple-500" });
        }
        return _jsx(FileText, { className: "h-5 w-5 text-gray-500" });
    };
    // Formatar tamanho do arquivo para exibição
    const formatFileSize = (bytes) => {
        if (bytes < 1024)
            return bytes + ' bytes';
        if (bytes < 1024 * 1024)
            return (bytes / 1024).toFixed(1) + ' KB';
        return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
    };
    return (_jsxs(Card, { className: "border border-gray-100 dark:border-gray-800 bg-white/80 dark:bg-dark-200/80 backdrop-blur-sm", children: [_jsx(CardHeader, { className: "bg-gray-50 dark:bg-dark-300", children: _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("div", { className: "p-1.5 rounded-lg bg-primary-50 dark:bg-primary-900/20", children: _jsx(Paperclip, { className: "h-5 w-5 text-primary-500" }) }), _jsxs("h3", { className: "text-lg font-medium", children: ["Anexos (", attachments.length, ")"] })] }) }), _jsx(CardContent, { className: "divide-y divide-gray-100 dark:divide-gray-800", children: _jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4 p-2", children: attachments.map((attachment) => (_jsxs("div", { className: "flex flex-col border border-gray-100 dark:border-gray-800 rounded-lg overflow-hidden bg-white dark:bg-gray-800 hover:shadow-md transition-all", children: [attachment.mimetype.startsWith('image/') ? (_jsx("div", { className: "relative", children: _jsx("div", { className: "h-40 w-full bg-gray-50 dark:bg-gray-700 cursor-pointer hover:opacity-90 transition-opacity", onClick: () => setExpandedImage(attachment.url), children: _jsx("img", { src: attachment.url, alt: attachment.originalname, className: "h-full w-full object-contain" }) }) })) : attachment.mimetype.startsWith('video/') ? (_jsx("div", { className: "h-40 w-full bg-gray-50 dark:bg-gray-700", children: _jsx("video", { src: attachment.url, className: "h-full w-full object-contain", controls: true }) })) : (_jsx("div", { className: "h-40 w-full flex items-center justify-center bg-gray-50 dark:bg-gray-700", children: getFileIcon(attachment.mimetype) })), _jsxs("div", { className: "p-3 flex items-center justify-between bg-gray-50 dark:bg-gray-800", children: [_jsxs("div", { className: "flex items-center gap-2 min-w-0", children: [getFileIcon(attachment.mimetype), _jsx("span", { className: "text-sm font-medium text-gray-700 dark:text-gray-300 truncate", children: attachment.originalname })] }), _jsx("a", { href: attachment.url, download: attachment.originalname, className: "p-1.5 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors", title: "Download", children: _jsx(Download, { className: "h-4 w-4 text-gray-500" }) })] })] }, attachment.id))) }) }), expandedImage && (_jsx("div", { className: "fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4", children: _jsxs("div", { className: "relative max-w-4xl w-full", children: [_jsx("button", { onClick: () => setExpandedImage(null), className: "absolute -top-12 right-0 p-2 text-white hover:text-gray-300 transition-colors", children: _jsx(X, { className: "h-6 w-6" }) }), _jsx("img", { src: expandedImage, alt: "Imagem expandida", className: "w-full h-auto rounded-lg" })] }) }))] }));
}
//# sourceMappingURL=TicketAttachments.js.map