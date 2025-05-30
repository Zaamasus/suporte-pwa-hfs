import { useQuery } from 'react-query';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import { Layout } from '../components/layout/Layout';
import { StatsCards } from '../components/tickets/StatsCards';
import { Card, CardContent, CardHeader } from '../components/ui/Card';
import { TicketCard } from '../components/tickets/TicketCard';
import { Button } from '../components/ui/Button';
import { Ticket } from '../types';
import { Link } from 'react-router-dom';
import { TechnicianList } from '../components/clients/TechnicianList';
import { PlusCircle, Users } from 'lucide-react';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { isClient, isTechnician } from '../utils/authUtils';
import { formatRelativeTime } from '../utils/formatters';

export function Dashboard() {
  const { user } = useAuth();
  
  const { data: tickets, isLoading } = useQuery<Ticket[]>(
    ['tickets', user?.id],
    async () => {
      const response = await axios.get('/api/tickets', {
        params: {
          userId: user?.id,
          role: user?.role,
        },
      });
      return response.data;
    },
    {
      enabled: !!user,
    }
  );

  const getWelcomeMessage = () => {
    const hours = new Date().getHours();
    if (hours < 12) return 'Bom dia';
    if (hours < 18) return 'Boa tarde';
    return 'Boa noite';
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-gray-500 dark:text-gray-400 text-sm font-medium">
              {getWelcomeMessage()},
            </h2>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {user?.name}
            </h1>
          </div>
          
          {isClient(user) && (
            <Link to="/tickets/new">
              <Button leftIcon={<PlusCircle className="h-4 w-4" />}>
                Novo Chamado
              </Button>
            </Link>
          )}
          
          {isTechnician(user) && (
            <Link to="/clients/new">
              <Button leftIcon={<Users className="h-4 w-4" />}>
                Novo Cliente
              </Button>
            </Link>
          )}
        </div>

        {isLoading ? (
          <div className="py-20">
            <LoadingSpinner size="lg" />
          </div>
        ) : (
          <>
            {tickets && <StatsCards tickets={tickets} />}
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader className="flex items-center justify-between bg-gray-50 dark:bg-dark-300">
                    <h2 className="text-lg font-medium">Chamados Recentes</h2>
                    <Link to="/tickets" className="text-sm text-primary-600 dark:text-primary-400 hover:underline">
                      Ver todos →
                    </Link>
                  </CardHeader>
                  <CardContent className="p-4">
                    {tickets && tickets.length > 0 ? (
                      <div className="space-y-4">
                        {tickets.slice(0, 3).map((ticket) => (
                          <div key={ticket.id} className="border-b border-gray-100 dark:border-gray-800 pb-4 last:border-0 last:pb-0">
                            <Link to={`/tickets/${ticket.id}`} className="block hover:bg-gray-50 dark:hover:bg-dark-300 -m-3 p-3 rounded-lg transition-colors">
                              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                                <div>
                                  <h3 className="font-medium text-gray-900 dark:text-white">{ticket.title}</h3>
                                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                    {ticket.description.length > 100
                                      ? `${ticket.description.substring(0, 100)}...`
                                      : ticket.description}
                                  </p>
                                </div>
                                <div className="text-sm text-gray-500 dark:text-gray-400">
                                  {formatRelativeTime(ticket.updatedAt)}
                                </div>
                              </div>
                            </Link>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                        <p>Nenhum chamado encontrado.</p>
                        {isClient(user) && (
                          <Link to="/tickets/new">
                            <Button variant="outline" className="mt-4">
                              Criar Novo Chamado
                            </Button>
                          </Link>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              <div>
                <Card>
                  <CardHeader className="bg-gray-50 dark:bg-dark-300">
                    <h2 className="text-lg font-medium">
                      {isClient(user) ? 'Suporte Técnico' : 'Técnicos Disponíveis'}
                    </h2>
                  </CardHeader>
                  <CardContent className="p-4">
                    <TechnicianList />
                  </CardContent>
                </Card>
              </div>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
}