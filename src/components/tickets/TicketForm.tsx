import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '../ui/Input';
import { TextArea } from '../ui/TextArea';
import { Select } from '../ui/Select';
import { Button } from '../ui/Button';
import { Ticket } from '../../types';
import { useAuth } from '../../contexts/AuthContext';

const ticketSchema = z.object({
  title: z.string().min(5, 'Título deve ter no mínimo 5 caracteres'),
  description: z.string().min(10, 'Descrição deve ter no mínimo 10 caracteres'),
  priority: z.enum(['low', 'medium', 'high']),
  category: z.string().min(1, 'Categoria é obrigatória'),
});

type TicketFormData = z.infer<typeof ticketSchema>;

interface TicketFormProps {
  onSubmit: (data: TicketFormData) => void;
  isLoading: boolean;
  initialData?: Partial<Ticket>;
}

export function TicketForm({ onSubmit, isLoading, initialData }: TicketFormProps) {
  const { user } = useAuth();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TicketFormData>({
    resolver: zodResolver(ticketSchema),
    defaultValues: {
      title: initialData?.title || '',
      description: initialData?.description || '',
      priority: initialData?.priority || 'medium',
      category: initialData?.category || '',
    },
  });

  const priorityOptions = [
    { value: 'low', label: 'Baixa' },
    { value: 'medium', label: 'Média' },
    { value: 'high', label: 'Alta' },
  ];

  const categoryOptions = [
    { value: 'Hardware', label: 'Hardware' },
    { value: 'Software', label: 'Software' },
    { value: 'Rede', label: 'Rede' },
    { value: 'Sistema', label: 'Sistema' },
    { value: 'Impressora', label: 'Impressora' },
    { value: 'Backup', label: 'Backup' },
    { value: 'Outro', label: 'Outro' },
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Input
        label="Título do Chamado"
        {...register('title')}
        error={errors.title?.message}
        placeholder="Descreva o problema brevemente"
        disabled={isLoading}
      />

      <TextArea
        label="Descrição Detalhada"
        {...register('description')}
        error={errors.description?.message}
        placeholder="Descreva o problema em detalhes, incluindo quando começou e quais passos já tentou para resolvê-lo..."
        rows={5}
        disabled={isLoading}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Select
          label="Categoria"
          {...register('category')}
          options={categoryOptions}
          error={errors.category?.message}
          disabled={isLoading}
        />

        <Select
          label="Prioridade"
          {...register('priority')}
          options={priorityOptions}
          error={errors.priority?.message}
          disabled={isLoading}
        />
      </div>

      {user?.companyId && (
        <div className="bg-gray-50 dark:bg-dark-300 p-3 rounded-md">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Este chamado será aberto para sua empresa
          </p>
        </div>
      )}

      <div className="flex justify-end">
        <Button type="submit" isLoading={isLoading}>
          {initialData ? 'Atualizar Chamado' : 'Abrir Chamado'}
        </Button>
      </div>
    </form>
  );
}