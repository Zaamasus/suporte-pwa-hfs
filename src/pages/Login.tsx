import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { LoginForm } from '../components/auth/LoginForm';
import { Shield } from 'lucide-react';

export function Login() {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 dark:bg-dark-100 px-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="flex justify-center">
            <div className="h-12 w-12 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center">
              <Shield className="h-6 w-6 text-primary-600 dark:text-primary-400" />
            </div>
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900 dark:text-white">
            HFS INFORMATICA
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Entre com sua conta para acessar o sistema de suporte técnico
          </p>
        </div>
        
        <div className="bg-white dark:bg-dark-200 p-8 rounded-xl shadow-md">
          <LoginForm />
        </div>
        
        <div className="text-center text-sm text-gray-500 dark:text-gray-400">
          <p>Credenciais para teste:</p>
          <p className="mt-1">Cliente: roberta@alvotech.com | senha123</p>
          <p>Técnico: samuel@techsupport.com | senha123</p>
        </div>
      </div>
    </div>
  );
}