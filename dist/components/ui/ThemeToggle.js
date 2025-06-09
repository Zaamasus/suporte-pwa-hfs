import { jsx as _jsx } from "react/jsx-runtime";
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { Button } from './Button';
export function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();
    return (_jsx(Button, { variant: "ghost", size: "icon", onClick: toggleTheme, "aria-label": theme === 'dark' ? 'Ativar modo claro' : 'Ativar modo escuro', className: "w-9 h-9", children: theme === 'dark' ? (_jsx(Sun, { className: "h-5 w-5" })) : (_jsx(Moon, { className: "h-5 w-5" })) }));
}
//# sourceMappingURL=ThemeToggle.js.map