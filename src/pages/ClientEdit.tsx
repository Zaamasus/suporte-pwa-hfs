import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';

interface ClientFormData {
  name: string;
  email: string;
  company: string;
  password?: string;
  is_blocked?: boolean;
}

export function ClientEdit() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { register, handleSubmit, setValue, formState: { errors, isSubmitting } } = useForm<ClientFormData>();

  useEffect(() => {
    async function fetchClient() {
      const response = await axios.get(`/api/users/${id}`);
      const client = response.data;
      setValue('name', client.name);
      setValue('email', client.email);
      setValue('company', client.company || '');
      setValue('is_blocked', client.is_blocked || false);
    }
    fetchClient();
  }, [id, setValue]);

  const onSubmit = async (data: ClientFormData) => {
    const payload: any = {
      name: data.name,
      email: data.email,
      company: data.company,
      is_blocked: data.is_blocked,
    };
    if (data.password) {
      payload.password = data.password;
    }
    await axios.put(`/api/users/${id}`, payload);
    navigate('/clients');
  };

  return (
    <div className="max-w-xl mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Editar Cliente</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white dark:bg-dark-200 p-6 rounded-lg shadow">
        <Input
          label="Nome"
          {...register('name', { required: 'Nome é obrigatório' })}
          error={errors.name?.message}
          disabled={isSubmitting}
        />
        <Input
          label="Email"
          type="email"
          {...register('email', { required: 'Email é obrigatório' })}
          error={errors.email?.message}
          disabled={isSubmitting}
        />
       
        <Input
          label="Nova Senha (opcional)"
          type="password"
          {...register('password')}
          error={errors.password?.message}
          disabled={isSubmitting}
        />
        <div>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              {...register('is_blocked')}
              disabled={isSubmitting}
            />
            Bloquear funcionário no sistema
          </label>
        </div>
        <div className="flex justify-end">
          <Button type="submit" isLoading={isSubmitting}>
            Salvar Alterações
          </Button>
        </div>
      </form>
    </div>
  );
}