import { useState } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Layout } from '../components/layout/Layout';
import { TicketListFilters } from '../components/tickets/TicketListFilters';
import { TicketCard } from '../components/tickets/TicketCard';
import { Button } from '../components/ui/Button';
import { Ticket } from '../types';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { PlusCircle } from 'lucide-react';
import { isClient } from '../utils/authUtils';

export function TicketsList() {
  const { user } = useAuth();
  const [filters, setFilters] = useState({
    search: '',
    status: '',
    priority: '',
    sortBy: 'newest',
  });
  
  const { data: tickets, isLoading } = useQuery<Ticket[]>(
    ['tickets', user?.id, filters],
    async () => {
      const response = await axios.get('/api/tickets', {
        params: {
          userId: user?.id,
          role: user?.role,
          status: filters.status,
        },
      });
      console.log('Tickets recebidos do backend:', response.data);
      
      // Log detalhado dos tickets para debug
      if (response.data && response.data.length > 0) {
        console.log('Amostra do primeiro ticket:', {
          id: response.data[0].id,
          title: response.data[0].title,
          companyName: response.data[0].companyName,
          clientName: response.data[0].clientName
        });
      }
      
      return response.data;
    },
    {
      enabled: !!user,
    }
  );

  // Filter and sort tickets based on filters
  const filteredTickets = tickets
    ? tickets
        .filter((ticket) => {
          // Apply search filter
          if (filters.search && !ticket.title.toLowerCase().includes(filters.search.toLowerCase()) && !ticket.description.toLowerCase().includes(filters.search.toLowerCase())) {
            return false;
          }
          
          // Apply status filter
          if (filters.status && ticket.status !== filters.status) {
            return false;
          }
          
          // Apply priority filter
          if (filters.priority && ticket.priority !== filters.priority) {
            return false;
          }
          
          return true;
        })
        .sort((a, b) => {
          // Apply sorting
          switch (filters.sortBy) {
            case 'newest':
              return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
            case 'oldest':
              return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
            case 'priority':
              const priorityOrder = { high: 0, medium: 1, low: 2 };
              return priorityOrder[a.priority] - priorityOrder[b.priority];
            case 'alphabetical':
              return a.title.localeCompare(b.title);
            default:
              return 0;
          }
        })
    : [];

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Chamados
          </h1>
          
          {isClient(user) && (
            <Link to="/tickets/new">
              <Button leftIcon={<PlusCircle className="h-4 w-4" />}>
                Novo Chamado
              </Button>
            </Link>
          )}
        </div>
        
        <TicketListFilters onFilter={setFilters} />
        
        {isLoading ? (
          <div className="py-20">
            <LoadingSpinner size="lg" />
          </div>
        ) : (
          <>
            {filteredTickets.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTickets.map((ticket) => (
                  <TicketCard key={ticket.id} ticket={ticket} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  Nenhum chamado encontrado
                </h3>
                <p className="text-gray-500 dark:text-gray-400 mb-6">
                  {filters.search || filters.status || filters.priority
                    ? 'Tente ajustar os filtros para encontrar o que está procurando.'
                    : 'Você ainda não possui chamados registrados.'}
                </p>
                
                {isClient(user) && !filters.search && !filters.status && !filters.priority && (
                  <Link to="/tickets/new">
                    <Button>Criar Novo Chamado</Button>
                  </Link>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </Layout>
  );
}