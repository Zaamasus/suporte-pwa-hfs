import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { TicketForm } from '../components/tickets/TicketForm';
import { Layout } from '../components/layout/Layout';
import { Ticket } from '../types';

export function NewTicket() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);

  const createTicketMutation = useMutation(
    async (ticketData: Partial<Ticket>) => {
      const response = await axios.post('/api/tickets', ticketData);
      return response.data;
    },
    {
      onSuccess: (data) => {
        toast.success('Chamado criado com sucesso!');
        queryClient.invalidateQueries('tickets');
        navigate(`/tickets/${data.id}`);
      },
      onError: (error: any) => {
        console.error('Erro ao criar chamado:', error);
        toast.error(error.response?.data?.message || 'Erro ao criar chamado');
      },
      onSettled: () => {
        setIsLoading(false);
      },
    }
  );

  const handleSubmit = async (data: any) => {
    setIsLoading(true);
    createTicketMutation.mutate(data);
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Novo Chamado
          </h1>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="p-6">
            <TicketForm
              onSubmit={handleSubmit}
              isLoading={isLoading}
              initialData={undefined}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
} 