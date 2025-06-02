import { TicketHistory as TicketHistoryType } from '../../types';
import { formatDateTime } from '../../utils/formatters';
import { Card, CardContent, CardHeader } from '../ui/Card';
import { MessageSquare, RefreshCw, User, Shield } from 'lucide-react';

interface TicketHistoryProps {
  history: TicketHistoryType[];
}

export function TicketHistory({ history }: TicketHistoryProps) {
  return (
    <Card>
      <CardHeader className="bg-gray-50 dark:bg-dark-300">
        <h3 className="text-lg font-medium">Histórico do Chamado</h3>
      </CardHeader>
      <CardContent className="divide-y divide-gray-100 dark:divide-gray-800">
        {history.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400 py-4 text-center">
            Nenhum histórico disponível.
          </p>
        ) : (
          history.map((entry) => {
            const isStatusChange = entry.message.startsWith('Status atualizado para');
            const roleLabel = entry.createdBy.role === 'client'
              ? 'Cliente'
              : entry.createdBy.role === 'technician'
                ? 'Técnico'
                : 'Administrador';
            const roleIcon = entry.createdBy.role === 'client'
              ? <User className="w-4 h-4 text-blue-500" />
              : entry.createdBy.role === 'technician'
                ? <Shield className="w-4 h-4 text-green-500" />
                : <Shield className="w-4 h-4 text-gray-500" />;
            // Detectar status na mensagem para colorir o badge
            let statusColor = '';
            if (isStatusChange) {
              if (entry.message.includes('Em aberto')) statusColor = 'bg-yellow-500 text-white';
              else if (entry.message.includes('Em andamento')) statusColor = 'bg-blue-600 text-white';
              else if (entry.message.includes('Em pausa')) statusColor = 'bg-orange-600 text-white';
              else if (entry.message.includes('Concluído')) statusColor = 'bg-green-600 text-white';
            }
            return (
              <div key={entry.id} className="py-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    {roleIcon}
                    <span className="text-sm font-semibold">{entry.createdBy.name}</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">({roleLabel})</span>
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {formatDateTime(entry.createdAt)}
                  </span>
                </div>
                {isStatusChange ? (
                  <div className="mt-2 flex items-center gap-2">
                    <RefreshCw className="w-4 h-4 text-primary-500" />
                    <span className={`text-xs font-semibold px-2 py-1 rounded ${statusColor}`}>
                      {entry.message}
                    </span>
                  </div>
                ) : (
                  <div className="mt-2 flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">{entry.message}</span>
                  </div>
                )}
              </div>
            );
          })
        )}
      </CardContent>
    </Card>
  );
}