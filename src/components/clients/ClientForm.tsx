import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { useAuth } from '../../contexts/AuthContext';
import { useQuery } from 'react-query';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';

const clientSchema = z.object({
  name: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres'),
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres'),
  company: z.string().min(2, 'Nome da empresa é obrigatório'),
  isNewCompany: z.boolean().optional(),
});

type ClientFormData = z.infer<typeof clientSchema>;

export function ClientForm() {
  const { registerClient, isLoading, error } = useAuth();
  const [searchParams] = useSearchParams();
  const prefilledCompany = searchParams.get('company') || '';
  const [isNewCompany, setIsNewCompany] = useState(false);
  
  // Buscar empresas existentes
  const { data: companies = [] } = useQuery<string[]>('companies', async () => {
    const response = await axios.get('/api/users/clients');
    // Extrair nomes únicos de empresas
    const uniqueCompanies = new Set(response.data.map((client: any) => client.company).filter(Boolean));
    return Array.from(uniqueCompanies);
  });
  
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitSuccessful },
  } = useForm<ClientFormData>({
    resolver: zodResolver(clientSchema),
    defaultValues: {
      company: prefilledCompany,
      isNewCompany: false,
    }
  });

  // Quando a empresa pré-preenchida mudar, atualizar o formulário
  useEffect(() => {
    if (prefilledCompany) {
      setValue('company', prefilledCompany);
    }
  }, [prefilledCompany, setValue]);

  const onSubmit = async (data: ClientFormData) => {
    // Incluir o flag de empresa nova nos dados
    const clientData = {
      ...data,
      isNewCompany,
    };
    await registerClient(clientData);
    if (!error) {
      reset();
    }
  };

  const selectedCompany = watch('company');

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

      <div>
        <div className="flex items-center mb-2">
          <label className="block text-sm font-medium">Empresa</label>
          <label className="flex items-center ml-auto cursor-pointer">
            <input
              type="checkbox"
              className="mr-2"
              checked={isNewCompany}
              onChange={(e) => {
                setIsNewCompany(e.target.checked);
                if (e.target.checked) {
                  setValue('company', '');
                }
              }}
            />
            <span className="text-sm">Nova Empresa</span>
          </label>
        </div>

        {isNewCompany ? (
          <Input
            placeholder="Nome da nova empresa"
            {...register('company')}
            error={errors.company?.message}
            disabled={isLoading}
          />
        ) : (
          <select
            className="w-full p-2 border border-gray-300 rounded-md dark:bg-dark-100 dark:border-dark-300"
            {...register('company')}
            disabled={isLoading}
          >
            <option value="">Selecione uma empresa</option>
            {companies.map((company) => (
              <option key={company} value={company}>
                {company}
              </option>
            ))}
          </select>
        )}
        {errors.company && <p className="text-red-500 text-sm mt-1">{errors.company.message}</p>}
      </div>

      <div className="flex justify-end">
        <Button type="submit" isLoading={isLoading}>
          Cadastrar Cliente
        </Button>
      </div>
    </form>
  );
}