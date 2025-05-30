import { useForm } from 'react-hook-form';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Button } from '../ui/Button';
import { Search, Filter, RefreshCw } from 'lucide-react';

interface TicketFilters {
  search: string;
  status: string;
  priority: string;
  sortBy: string;
}

interface TicketListFiltersProps {
  onFilter: (filters: TicketFilters) => void;
}

export function TicketListFilters({ onFilter }: TicketListFiltersProps) {
  const { register, handleSubmit, reset } = useForm<TicketFilters>({
    defaultValues: {
      search: '',
      status: '',
      priority: '',
      sortBy: 'newest',
    },
  });

  const statusOptions = [
    { value: '', label: 'Todos' },
    { value: 'open', label: 'Em aberto' },
    { value: 'in_progress', label: 'Em andamento' },
    { value: 'completed', label: 'Concluído' },
  ];

  const priorityOptions = [
    { value: '', label: 'Todas' },
    { value: 'low', label: 'Baixa' },
    { value: 'medium', label: 'Média' },
    { value: 'high', label: 'Alta' },
  ];

  const sortOptions = [
    { value: 'newest', label: 'Mais recentes' },
    { value: 'oldest', label: 'Mais antigos' },
    { value: 'priority', label: 'Prioridade' },
    { value: 'alphabetical', label: 'Alfabética' },
  ];

  const handleReset = () => {
    reset({
      search: '',
      status: '',
      priority: '',
      sortBy: 'newest',
    });
    onFilter({
      search: '',
      status: '',
      priority: '',
      sortBy: 'newest',
    });
  };

  return (
    <form onSubmit={handleSubmit(onFilter)} className="space-y-4 mb-6 bg-white dark:bg-dark-200 p-4 rounded-lg shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="flex-1">
          <Input
            {...register('search')}
            placeholder="Buscar chamados..."
            leftIcon={<Search className="h-4 w-4" />}
          />
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <Select
            {...register('status')}
            options={statusOptions}
            placeholder="Status"
            leftIcon={<Filter className="h-4 w-4" />}
          />
          
          <Select
            {...register('priority')}
            options={priorityOptions}
            placeholder="Prioridade"
          />
          
          <Select
            {...register('sortBy')}
            options={sortOptions}
            placeholder="Ordenar por"
          />
        </div>
      </div>
      
      <div className="flex justify-end space-x-3">
        <Button
          type="button"
          variant="outline"
          onClick={handleReset}
          leftIcon={<RefreshCw className="h-4 w-4" />}
        >
          Limpar filtros
        </Button>
        
        <Button type="submit" leftIcon={<Search className="h-4 w-4" />}>
          Filtrar
        </Button>
      </div>
    </form>
  );
}