import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect, useRef } from 'react';
const PRESET_COLORS = [
    '#6366F1', // Indigo
    '#8B5CF6', // Violet
    '#EC4899', // Pink
    '#EF4444', // Red
    '#F59E0B', // Amber
    '#10B981', // Emerald
    '#3B82F6', // Blue
    '#14B8A6', // Teal
    '#6B7280', // Gray
    '#1F2937', // Dark Gray
];
export function ColorPicker({ color, onChange }) {
    const [isOpen, setIsOpen] = useState(false);
    const pickerRef = useRef(null);
    useEffect(() => {
        function handleClickOutside(event) {
            if (pickerRef.current && !pickerRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    const handleColorChange = (e) => {
        onChange(e.target.value);
    };
    const handlePresetClick = (presetColor) => {
        onChange(presetColor);
        setIsOpen(false);
    };
    return (_jsxs("div", { className: "relative", ref: pickerRef, children: [_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("button", { type: "button", className: "w-10 h-10 rounded-full border border-gray-300 dark:border-gray-600 flex items-center justify-center overflow-hidden", style: { backgroundColor: color }, onClick: () => setIsOpen(!isOpen), "aria-label": "Abrir seletor de cor" }), _jsx("input", { type: "text", value: color, onChange: (e) => onChange(e.target.value), className: "px-3 py-2 bg-white dark:bg-dark-300 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-indigo-500 dark:focus:border-indigo-400 text-sm", placeholder: "#RRGGBB" }), _jsx("input", { type: "color", value: color, onChange: handleColorChange, className: "sr-only", id: "color-picker-input" }), _jsx("label", { htmlFor: "color-picker-input", className: "px-3 py-2 bg-white dark:bg-dark-300 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm cursor-pointer hover:bg-gray-50 dark:hover:bg-dark-200", children: "Escolher" })] }), isOpen && (_jsx("div", { className: "absolute z-10 mt-2 p-2 bg-white dark:bg-dark-200 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 grid grid-cols-5 gap-2", children: PRESET_COLORS.map((presetColor) => (_jsx("button", { type: "button", className: "w-8 h-8 rounded-full border border-gray-300 dark:border-gray-600 flex items-center justify-center overflow-hidden", style: { backgroundColor: presetColor }, onClick: () => handlePresetClick(presetColor), "aria-label": `Selecionar cor ${presetColor}`, children: presetColor === color && (_jsx("span", { className: "text-white text-xs", children: "\u2713" })) }, presetColor))) }))] }));
}
//# sourceMappingURL=ColorPicker.js.map