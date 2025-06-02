import { useMutation, useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import { Layout } from '../components/layout/Layout';
import { Card, CardContent, CardHeader, CardFooter } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { TicketHistory } from '../components/tickets/TicketHistory';
import { Button } from '../components/ui/Button';
import { TextArea } from '../components/ui/TextArea';
import { Select } from '../components/ui/Select';
import { Ticket, TicketStatus } from '../types';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { isClient, isTechnician } from '../utils/authUtils';
import { 
  formatDateTime, 
  getTicketPriorityColor, 
  getTicketPriorityText, 
  getTicketStatusColor, 
  getTicketStatusText 
} from '../utils/formatters';
import { ArrowLeft, MessageSquare, RefreshCw, CheckCircle, AlertTriangle } from 'lucide-react';

export function TicketDetails() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isAddingComment, setIsAddingComment] = useState(false);
  
  const { data: ticket, isLoading, refetch } = useQuery<Ticket>(
    ['ticket', id],
    async () => {
      const response = await axios.get(`/api/tickets/${id}`);
      
      // Mapeia os dados para o formato esperado pelo frontend
      const mappedTicket = {
        ...response.data,
        // Adiciona compatibilidade com os nomes esperados pelo frontend
        clientId: response.data.client_id || response.data.clientId,
        clientName: response.data.client_name || response.data.clientName,
        technicianId: response.data.technician_id || response.data.technicianId,
        technicianName: response.data.technician_name || response.data.technicianName,
        companyName: response.data.company || response.data.companyName,
      };
      
      console.log('Ticket mapeado:', mappedTicket);
      
      return mappedTicket;
    },
    {
      enabled: !!id,
    }
  );

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      message: '',
      status: '',
    },
  });

  const updateMutation = useMutation(
    async (data: { status?: TicketStatus; historyEntry?: { message: string; createdBy: { id: string; name: string; role: string } } }) => {
      return axios.patch(`/api/tickets/${id}`, data);
    },
    {
      onSuccess: () => {
        refetch();
        setIsAddingComment(false);
        reset();
      },
    }
  );

  const handleAddComment = (data: { message: string }) => {
    if (!user || !data.message.trim()) return;
    
    updateMutation.mutate({
      historyEntry: {
        message: data.message,
        createdBy: {
          id: user.id,
          name: user.name,
          role: user.role,
        },
      },
    });
  };

  const handleUpdateStatus = (status: TicketStatus) => {
    if (!user) return;
    
    updateMutation.mutate({
      status,
      historyEntry: {
        message: `Status atualizado para ${getTicketStatusText(status)}`,
        createdBy: {
          id: user.id,
          name: user.name,
          role: user.role,
        },
      },
    });
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="py-20">
          <LoadingSpinner size="lg" />
        </div>
      </Layout>
    );
  }

  if (!ticket) {
    return (
      <Layout>
        <div className="text-center py-16">
          <h2 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
            Chamado não encontrado
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            O chamado que você está procurando não existe ou foi removido.
          </p>
          <Button onClick={() => navigate('/tickets')}>Voltar para Chamados</Button>
        </div>
      </Layout>
    );
  }

  const statusColor = getTicketStatusColor(ticket.status) as 'primary' | 'warning' | 'success';
  const priorityColor = getTicketPriorityColor(ticket.priority) as 'success' | 'warning' | 'danger';

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigate('/tickets')}
            aria-label="Voltar"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Chamado #{ticket.id}
          </h1>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader className="bg-gray-50 dark:bg-dark-300">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <h2 className="text-xl font-medium">{ticket.title}</h2>
                  <Badge variant={statusColor}>{getTicketStatusText(ticket.status)}</Badge>
                </div>
              </CardHeader>
              <CardContent className="p-4 space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                    Descrição
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
                    {ticket.description}
                  </p>
                </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-gray-100 dark:border-gray-800 pt-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Cliente
                    </h3>
                    <p className="mt-1">{ticket.clientName}</p>
                  </div>
                  {ticket.companyName && (
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Empresa
                      </h3>
                      <p className="mt-1">{ticket.companyName}</p>
                    </div>
                  )}
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Prioridade
                    </h3>
                    <Badge variant={priorityColor} className="mt-1">
                      {getTicketPriorityText(ticket.priority)}
                    </Badge>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Categoria
                    </h3>
                    <p className="mt-1">{ticket.category || 'Não categorizado'}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Data de Abertura
                    </h3>
                    <p className="mt-1">{formatDateTime(ticket.createdAt)}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Última Atualização
                    </h3>
                    <p className="mt-1">{formatDateTime(ticket.updatedAt)}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Técnico Responsável
                    </h3>
                    <p className="mt-1">{ticket.technicianName || 'Não atribuído'}</p>
                  </div>
                </div>
              </CardContent>
              
              {isTechnician(user) && (
                <CardFooter className="bg-gray-50 dark:bg-dark-300 flex flex-wrap items-center gap-3">
                  {ticket.status === 'open' && (
                    <Button
                      variant="primary"
                      size="sm"
                      leftIcon={<RefreshCw className="h-4 w-4" />}
                      onClick={() => handleUpdateStatus(TicketStatus.IN_PROGRESS)}
                      isLoading={updateMutation.isLoading}
                    >
                      Iniciar Atendimento
                    </Button>
                  )}
                  {ticket.status === 'in_progress' && (
                    <>
                      <Button
                        variant="danger"
                        size="sm"
                        leftIcon={<AlertTriangle className="h-4 w-4" />}
                        onClick={() => handleUpdateStatus(TicketStatus.PAUSED)}
                        isLoading={updateMutation.isLoading}
                      >
                        Pausar
                      </Button>
                      <Button
                        variant="success"
                        size="sm"
                        leftIcon={<CheckCircle className="h-4 w-4" />}
                        onClick={() => handleUpdateStatus(TicketStatus.CLOSED)}
                        isLoading={updateMutation.isLoading}
                      >
                        Finalizar Chamado
                      </Button>
                    </>
                  )}
                  {ticket.status === 'paused' && (
                    <Button
                      variant="primary"
                      size="sm"
                      leftIcon={<RefreshCw className="h-4 w-4" />}
                      onClick={() => handleUpdateStatus(TicketStatus.IN_PROGRESS)}
                      isLoading={updateMutation.isLoading}
                    >
                      Retomar Atendimento
                    </Button>
                  )}
                  {ticket.status === 'closed' && (
                    <Button
                      variant="danger"
                      size="sm"
                      leftIcon={<AlertTriangle className="h-4 w-4" />}
                      onClick={() => handleUpdateStatus(TicketStatus.IN_PROGRESS)}
                      isLoading={updateMutation.isLoading}
                    >
                      Reabrir Chamado
                    </Button>
                  )}
                </CardFooter>
              )}
            </Card>
            
            <Card>
              <CardHeader className="bg-gray-50 dark:bg-dark-300">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-medium">Adicionar Comentário</h2>
                  {!isAddingComment && (
                    <Button
                      size="sm"
                      variant="outline"
                      leftIcon={<MessageSquare className="h-4 w-4" />}
                      onClick={() => setIsAddingComment(true)}
                    >
                      Comentar
                    </Button>
                  )}
                </div>
              </CardHeader>
              
              {isAddingComment && (
                <CardContent className="p-4">
                  <form onSubmit={handleSubmit(handleAddComment)} className="space-y-4">
                    <TextArea
                      {...register('message')}
                      placeholder="Digite seu comentário aqui..."
                      rows={4}
                    />
                    
                    <div className="flex justify-end space-x-3">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          setIsAddingComment(false);
                          reset();
                        }}
                      >
                        Cancelar
                      </Button>
                      <Button
                        type="submit"
                        isLoading={updateMutation.isLoading}
                      >
                        Enviar
                      </Button>
                    </div>
                  </form>
                </CardContent>
              )}
            </Card>
          </div>
          
          <div>
            <TicketHistory history={ticket.history} />
          </div>
        </div>
      </div>
    </Layout>
  );
}