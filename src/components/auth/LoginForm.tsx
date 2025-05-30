import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { Mail, Lock, LogIn } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres'),
  remember: z.boolean().optional(),
});

type LoginFormData = z.infer<typeof loginSchema>;

export function LoginForm() {
  const { login, isLoading, error } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      remember: false,
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    await login(data.email, data.password, data.remember || false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {error && (
        <div className="bg-danger-50 dark:bg-danger-900/30 text-danger-700 dark:text-danger-400 p-3 rounded-md text-sm">
          {error}
        </div>
      )}
      
      <Input
        label="Email"
        type="email"
        {...register('email')}
        error={errors.email?.message}
        placeholder="seu@email.com"
        leftIcon={<Mail className="h-4 w-4" />}
        disabled={isLoading}
      />

      <Input
        label="Senha"
        type={showPassword ? 'text' : 'password'}
        {...register('password')}
        error={errors.password?.message}
        placeholder="Sua senha"
        leftIcon={<Lock className="h-4 w-4" />}
        rightIcon={
          <button
            type="button"
            className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? 'Ocultar' : 'Mostrar'}
          </button>
        }
        disabled={isLoading}
      />

      <div className="flex items-center">
        <input
          id="remember"
          type="checkbox"
          {...register('remember')}
          className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
        />
        <label htmlFor="remember" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
          Lembrar-me
        </label>
      </div>

      <Button
        type="submit"
        fullWidth
        isLoading={isLoading}
        leftIcon={<LogIn className="h-4 w-4" />}
      >
        Entrar
      </Button>
    </form>
  );
}