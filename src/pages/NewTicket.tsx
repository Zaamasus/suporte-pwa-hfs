import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import { Layout } from '../components/layout/Layout';
import { Card, CardContent, CardHeader } from '../components/ui/Card';
import { TicketForm } from '../components/tickets/TicketForm';

export function NewTicket() {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const createTicketMutation = useMutation(
    async (data: { title: string; description: string; priority: string; category: string }) => {
      return axios.post('/api/tickets', {
        ...data,
        clientId: user?.id,
      });
    },
    {
      onSuccess: (response) => {
        navigate(`/tickets/${response.data.id}`);
      },
    }
  );

  const handleSubmit = (data: { title: string; description: string; priority: string; category: string }) => {
    createTicketMutation.mutate(data);
  };

  return (
    <Layout>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Novo Chamado
        </h1>
        
        <Card>
          <CardHeader className="bg-gray-50 dark:bg-dark-300">
            <h2 className="text-lg font-medium">Informações do Chamado</h2>
          </CardHeader>
          <CardContent className="p-6">
            <TicketForm 
              onSubmit={handleSubmit} 
              isLoading={createTicketMutation.isLoading}
            />
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}