import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { useAuth } from '../../contexts/AuthContext';

const clientSchema = z.object({
  name: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres'),
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres'),
  company: z.string().min(2, 'Nome da empresa é obrigatório'),
});

type ClientFormData = z.infer<typeof clientSchema>;

export function ClientForm() {
  const { registerClient, isLoading, error } = useAuth();
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm<ClientFormData>({
    resolver: zodResolver(clientSchema),
  });

  const onSubmit = async (data: ClientFormData) => {
    await registerClient(data);
    if (!error) {
      reset();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {error && (
        <div className="bg-danger-50 dark:bg-danger-900/30 text-danger-700 dark:text-danger-400 p-3 rounded-md text-sm">
          {error}
        </div>
      )}
      
      {isSubmitSuccessful && !error && (
        <div className="bg-success-50 dark:bg-success-900/30 text-success-700 dark:text-success-400 p-3 rounded-md text-sm">
          Cliente cadastrado com sucesso!
        </div>
      )}
      
      <Input
        label="Nome do cliente"
        {...register('name')}
        error={errors.name?.message}
        disabled={isLoading}
      />

      <Input
        label="Email"
        type="email"
        {...register('email')}
        error={errors.email?.message}
        disabled={isLoading}
      />

      <Input
        label="Senha"
        type="password"
        {...register('password')}
        error={errors.password?.message}
        disabled={isLoading}
      />

      <Input
        label="Empresa"
        {...register('company')}
        error={errors.company?.message}
        disabled={isLoading}
      />

      <div className="flex justify-end">
        <Button type="submit" isLoading={isLoading}>
          Cadastrar Cliente
        </Button>
      </div>
    </form>
  );
}