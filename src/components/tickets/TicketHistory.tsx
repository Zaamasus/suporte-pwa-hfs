import { TicketHistory as TicketHistoryType } from '../../types';
import { formatDateTime } from '../../utils/formatters';
import { Card, CardContent, CardHeader } from '../ui/Card';
import { MessageSquare, RefreshCw, User, Shield } from 'lucide-react';

interface TicketHistoryProps {
  history: TicketHistoryType[];
}

export function TicketHistory({ history }: TicketHistoryProps) {
  return (
    <Card className="border border-gray-100 dark:border-gray-800 bg-white/80 dark:bg-dark-200/80 backdrop-blur-sm">
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
            
            let statusColor = '';
            if (isStatusChange) {
              if (entry.message.includes('Em aberto')) statusColor = 'bg-yellow-50 text-yellow-700 border border-yellow-200';
              else if (entry.message.includes('Em andamento')) statusColor = 'bg-blue-50 text-blue-700 border border-blue-200';
              else if (entry.message.includes('Em pausa')) statusColor = 'bg-orange-50 text-orange-700 border border-orange-200';
              else if (entry.message.includes('Concluído')) statusColor = 'bg-green-50 text-green-700 border border-green-200';
            }

            return (
              <div key={entry.id} className="py-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-gray-50 dark:bg-gray-800">
                      {roleIcon}
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">{entry.createdBy.name}</span>
                      <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">({roleLabel})</span>
                    </div>
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {formatDateTime(entry.createdAt)}
                  </span>
                </div>
                {isStatusChange ? (
                  <div className="mt-3 flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-primary-50 dark:bg-primary-900/20">
                      <RefreshCw className="w-4 h-4 text-primary-500" />
                    </div>
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-md ${statusColor}`}>
                      {entry.message}
                    </span>
                  </div>
                ) : (
                  <div className="mt-3 flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-gray-50 dark:bg-gray-800">
                      <MessageSquare className="w-4 h-4 text-gray-400" />
                    </div>
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