import { NavLink } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Home, Users, Ticket, Building, User, LogOut } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { Button } from '../ui/Button';

interface SidebarLinkProps {
  to: string;
  icon: React.ReactNode;
  label: string;
}

function SidebarLink({ to, icon, label }: SidebarLinkProps) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
          isActive
            ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300'
            : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-dark-300'
        }`
      }
    >
      <div className="mr-3">{icon}</div>
      {label}
    </NavLink>
  );
}

export function Sidebar() {
  const { user, logout } = useAuth();
  const { toggleTheme, theme } = useTheme();
  
  const isAdmin = user?.role === 'admin';
  const isTechnician = user?.role === 'technician' || isAdmin;
  const isClient = user?.role === 'client';
  
  const handleLogout = () => {
    logout();
  };
  
  return (
    <aside className="hidden md:flex flex-col w-64 bg-white dark:bg-dark-200 border-r border-gray-200 dark:border-dark-300 h-screen sticky top-0">
      <div className="p-4 border-b border-gray-200 dark:border-dark-300">
        <h1 className="text-xl font-bold text-indigo-600 dark:text-indigo-400">Suporte HFS</h1>
      </div>
      
      <nav className="flex-1 overflow-y-auto p-4 space-y-1">
        <SidebarLink to="/" icon={<Home size={18} />} label="Dashboard" />
        
        {isTechnician && (
          <>
            <SidebarLink to="/clients" icon={<Users size={18} />} label="Clientes" />
            <SidebarLink to="/companies" icon={<Building size={18} />} label="Empresas" />
          </>
        )}
        
        <SidebarLink to="/tickets" icon={<Ticket size={18} />} label="Tickets" />
        
        <SidebarLink to="/profile" icon={<User size={18} />} label="Meu Perfil" />
      </nav>
      
      <div className="p-4 border-t border-gray-200 dark:border-dark-300 space-y-4">
        <Button 
          variant="outline" 
          className="w-full justify-start" 
          onClick={toggleTheme}
        >
          {theme === 'dark' ? '☀️ Modo Claro' : '🌙 Modo Escuro'}
        </Button>
        
        <Button 
          variant="outline" 
          className="w-full justify-start text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20" 
          leftIcon={<LogOut size={18} />}
          onClick={handleLogout}
        >
          Sair
        </Button>
      </div>
    </aside>
  );
} 