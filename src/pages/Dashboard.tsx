import { useQuery } from 'react-query';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import { Layout } from '../components/layout/Layout';
import { StatsCards } from '../components/tickets/StatsCards';
import { Card, CardContent, CardHeader } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Ticket } from '../types';
import { Link } from 'react-router-dom';
import { TechnicianList } from '../components/clients/TechnicianList';
import { PlusCircle, Users, UserCircle, Building2 } from 'lucide-react';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { isClient, isTechnician } from '../utils/authUtils';
import { useEffect, useState } from 'react';

export function Dashboard() {
  const { user } = useAuth();
  const [companyName, setCompanyName] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCompanyName() {
      if (user?.companyId) {
        try {
          const response = await axios.get(`/api/companies/${user.companyId}`);
          setCompanyName(response.data.name);
        } catch (err) {
          setCompanyName(null);
        }
      }
    }
    fetchCompanyName();
  }, [user?.companyId]);

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
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6">
          <div className="flex items-center gap-3 sm:gap-6">
            <div className="flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-primary-50 dark:bg-primary-900/20">
              {user?.name ? (
                <span className="text-2xl sm:text-3xl font-bold text-primary-600 dark:text-primary-400">
                  {user.name.charAt(0).toUpperCase()}
                </span>
              ) : (
                <UserCircle className="w-8 h-8 sm:w-10 sm:h-10 text-primary-400" />
              )}
            </div>
            <div className="flex flex-col min-w-0">
              <h2 className="text-gray-500 dark:text-gray-400 text-sm sm:text-base font-medium tracking-tight truncate">
                {getWelcomeMessage()},
              </h2>
              <span className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white leading-tight truncate max-w-[160px] sm:max-w-xs">
                {user?.name}
              </span>
              {companyName && (
                <div className="flex items-center gap-1.5 mt-1">
                  <Building2 className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                  <span className="text-xs sm:text-sm font-medium text-orange-600 dark:text-orange-400 truncate max-w-[120px] sm:max-w-xs">
                    {companyName}
                  </span>
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mt-4 sm:mt-0 w-full sm:w-auto">
            {isClient(user) && (
              <Link to="/tickets/new" className="w-full sm:w-auto">
                <Button leftIcon={<PlusCircle className="h-4 w-4" />} className="w-full sm:w-auto">
                  Novo Chamado
                </Button>
              </Link>
            )}
            {isTechnician(user) && (
              <Link to="/clients/new" className="w-full sm:w-auto">
                <Button leftIcon={<Users className="h-4 w-4" />} className="w-full sm:w-auto">
                  Novo Cliente
                </Button>
              </Link>
            )}
          </div>
        </div>

        {isLoading ? (
          <div className="py-20">
            <LoadingSpinner size="lg" />
          </div>
        ) : (
          <>
            {tickets && <StatsCards tickets={tickets} />}
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* <div className="lg:col-span-2 space-y-6">
                <Card className="bg-transparent border-none shadow-none p-0">
                  <CardHeader className="flex items-center justify-between bg-transparent p-0">
                    <h2 className="text-lg font-medium">Chamados Recentes</h2>
                    <Link to="/tickets" className="text-sm text-primary-600 dark:text-primary-400 hover:underline">
                      Ver todos →
                    </Link>
                  </CardHeader>
                  <CardContent className="p-0">
                    {tickets && tickets.length > 0 ? (
                      <div>
                        {tickets.slice(0, 3).map((ticket) => (
                          <div key={ticket.id} className="mb-2">
                            <Link to={`/tickets/${ticket.id}`} className="block px-0 py-2 hover:underline">
                              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                                <div>
                                  <div className="font-semibold text-base text-gray-900 dark:text-white">
                                    {ticket.title}
                                  </div>
                                  <div className="text-xs text-gray-700 dark:text-gray-300">
                                    Status: {ticket.status === 'open' ? 'Em aberto' : ticket.status === 'in_progress' ? 'Em andamento' : ticket.status === 'paused' ? 'Em pausa' : 'Concluído'}
                                  </div>
                                  <div className="text-xs text-gray-500 dark:text-gray-400">
                                    {ticket.companyName && <span>{ticket.companyName} </span>}
                                    {ticket.clientName && <span>- {ticket.clientName}</span>}
                                  </div>
                                  <div className="text-xs text-gray-500 dark:text-gray-400">
                                    {ticket.description.length > 100 ? `${ticket.description.substring(0, 100)}...` : ticket.description}
                                  </div>
                                </div>
                                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 sm:mt-0 sm:ml-4 min-w-[80px] text-right">
                                  {ticket.updatedAt ? formatRelativeTime(ticket.updatedAt) : '-'}
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
              </div> */}

              <div>
                <Card className="border border-gray-100 dark:border-gray-800 bg-white/80 dark:bg-dark-200/80 backdrop-blur-sm">
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