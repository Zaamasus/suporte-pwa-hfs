import { TicketHistory as TicketHistoryType } from '../../types';
import { formatDateTime } from '../../utils/formatters';
import { Card, CardContent, CardHeader } from '../ui/Card';

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
          history.map((entry) => (
            <div key={entry.id} className="py-3">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium">{entry.createdBy.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {entry.createdBy.role === 'client' 
                      ? 'Cliente' 
                      : entry.createdBy.role === 'technician' 
                        ? 'Técnico' 
                        : 'Administrador'}
                  </p>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {formatDateTime(entry.createdAt)}
                </p>
              </div>
              <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">{entry.message}</p>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}