import { useQuery } from 'react-query';
import axios from 'axios';
import { Technician } from '../../types';
import { Card, CardContent, CardHeader } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/Button';
import { useAuth } from '../../contexts/AuthContext';
import { useEffect } from 'react';

// Interface para compatibilidade com a resposta do backend
interface TechnicianResponse {
  id: string;
  name: string;
  email: string;
  role: string;
  company?: string;
  specialties?: string[];
  created_at: string;
  updated_at: string;
  // outros campos que possam existir...
}

export function TechnicianList() {
  const { token, user } = useAuth();
  
  // Debug: log de informações importantes
  useEffect(() => {
    console.log('Token disponível:', !!token);
    console.log('Usuário logado:', user?.role);
  }, [token, user]);

  const { data: technicians, isLoading, error } = useQuery<TechnicianResponse[]>(
    'technicians',
    async () => {
      console.log('Fazendo requisição para técnicos com token:', token?.substring(0, 10) + '...');
      
      try {
        const response = await axios.get('/api/users/technicians', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        
        console.log('Resposta do servidor:', response.data);
        return response.data;
      } catch (err) {
        console.error('Erro ao buscar técnicos:', err);
        // Se for um erro Axios, extrair mais detalhes
        if (axios.isAxiosError(err)) {
          console.error('Detalhes do erro:', {
            status: err.response?.status,
            statusText: err.response?.statusText,
            data: err.response?.data
          });
        }
        throw err;
      }
    },
    {
      enabled: !!token,
      retry: 1, // Tentar apenas uma vez em caso de falha
      onError: (err) => {
        console.error('React Query erro:', err);
      }
    }
  );

  // Debug: log do resultado da query
  useEffect(() => {
    if (technicians) {
      console.log('Técnicos carregados:', technicians.length);
    }
  }, [technicians]);

  if (isLoading) {
    return (
      <div className="animate-pulse space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-24 bg-gray-200 dark:bg-dark-300 rounded-md"></div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-danger-50 dark:bg-danger-900/30 text-danger-700 dark:text-danger-400 p-4 rounded-md">
        Erro ao carregar técnicos disponíveis.
        <pre className="text-xs mt-2 overflow-auto max-h-40">
          {error instanceof Error ? error.message : 'Erro desconhecido'}
        </pre>
      </div>
    );
  }

  // Adicionar isOnline para técnicos (simulado para o frontend)
  const techniciansWithStatus = technicians?.map(tech => ({
    ...tech,
    isOnline: true // Poderia ser um cálculo com base em alguma lógica ou campo do backend
  })) || [];

  return (
    <div className="space-y-4">
      {techniciansWithStatus.length > 0 ? (
        techniciansWithStatus.filter(tech => tech.isOnline).map((technician) => (
          <Card key={technician.id} className="overflow-hidden">
            <CardHeader className="bg-gray-50 dark:bg-dark-300 py-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                      <span className="text-gray-600 dark:text-gray-300 font-medium">
                        {technician.name.charAt(0)}
                      </span>
                    </div>
                    <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-success-500 border-2 border-white dark:border-dark-300"></span>
                  </div>
                  <div>
                    <h3 className="font-medium">{technician.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Suporte Técnico</p>
                  </div>
                </div>
                <Badge variant="success" size="sm">Online</Badge>
              </div>
            </CardHeader>
            <CardContent className="py-3">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {technician.specialties?.join(', ') || 'Suporte Geral'}
                </div>
                <Link to={`/chat/${technician.id}`}>
                  <Button
                    variant="outline"
                    size="sm"
                    leftIcon={<MessageCircle className="h-4 w-4" />}
                  >
                    Conversar
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))
      ) : (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          <p>Nenhum técnico disponível no momento.</p>
        </div>
      )}
    </div>
  );
}