import { Ticket } from '../../types';
import { Badge } from '../ui/Badge';
import { Card, CardContent, CardHeader } from '../ui/Card';
import { formatDate, getTicketStatusColor, getTicketStatusText } from '../../utils/formatters';
import { MessageSquare, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

interface TicketCardProps {
  ticket: Ticket;
}

export function TicketCard({ ticket }: TicketCardProps) {
  const statusColor = getTicketStatusColor(ticket.status) as 'primary' | 'warning' | 'success';
  const statusText = getTicketStatusText(ticket.status);

  return (
    <Link to={`/tickets/${ticket.id}`}>
      <Card className="h-full transition-all duration-200 hover:shadow-lg cursor-pointer">
        <CardHeader className="flex items-center justify-between">
          <h3 className="text-lg font-medium truncate">{ticket.title}</h3>
          <Badge variant={statusColor}>{statusText}</Badge>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
            {ticket.description}
          </p>
          
          {ticket.category && (
            <Badge variant="default" className="mt-2">
              {ticket.category}
            </Badge>
          )}
          
          <div className="pt-2 flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 border-t border-gray-100 dark:border-gray-700">
            <div className="flex items-center">
              <Clock className="mr-1 h-4 w-4" />
              <span>{formatDate(ticket.createdAt)}</span>
            </div>
            <div className="flex items-center">
              <MessageSquare className="mr-1 h-4 w-4" />
              <span>{ticket.history ? ticket.history.length : 0}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}