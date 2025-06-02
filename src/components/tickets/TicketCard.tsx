import { Ticket } from '../../types';
import { Badge } from '../ui/Badge';
import { Card, CardContent, CardHeader } from '../ui/Card';
import { formatDate, getTicketStatusColor, getTicketStatusText } from '../../utils/formatters';
import { MessageSquare, Clock, Building2, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getCompanyColor } from '../../utils/companyColors';

interface TicketCardProps {
  ticket: Ticket;
}

export function TicketCard({ ticket }: TicketCardProps) {
  const statusColor = ticket.status === 'closed'
    ? 'success'
    : ticket.status === 'open'
      ? undefined
      : getTicketStatusColor(ticket.status) as 'primary' | 'warning' | 'success';
  const statusText = getTicketStatusText(ticket.status);
  const companyColor = ticket.companyName ? getCompanyColor(ticket.companyName) : null;

  return (
    <Link to={`/tickets/${ticket.id}`}>
      <Card className="h-full transition-all duration-300 hover:shadow-lg hover:scale-[1.01] cursor-pointer border border-gray-100 dark:border-gray-800 bg-white/80 dark:bg-dark-200/80 backdrop-blur-sm">
        <CardHeader className="flex flex-col gap-3 pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 px-2 py-1 rounded-md">
                #{ticket.id.slice(0, 8)}
              </span>
              {ticket.status === 'open' ? (
                <Badge className="bg-yellow-50 text-yellow-700 border border-yellow-200">{statusText}</Badge>
              ) : (
                <Badge variant={statusColor}>{statusText}</Badge>
              )}
            </div>
            {ticket.companyName && companyColor && (
              <div className="flex items-center text-sm">
                <Building2 className={`mr-1.5 h-4 w-4 ${companyColor.textColor}`} />
                <span className={`font-medium ${companyColor.textColor}`}>{ticket.companyName}</span>
              </div>
            )}
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-1">{ticket.title}</h3>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
            {ticket.description}
          </p>
          
          {ticket.category && (
            <div className="flex items-center gap-1.5">
              <Tag className="h-4 w-4 text-gray-400" />
              <Badge variant="outline" className="text-xs">
                {ticket.category}
              </Badge>
            </div>
          )}
          
          <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 pt-3 border-t border-gray-100 dark:border-gray-800">
            <div className="flex items-center gap-2">
              {ticket.clientName && (
                <span className="font-medium text-orange-600 dark:text-orange-400">{ticket.clientName}</span>
              )}
              <span className="mx-1">•</span>
              <Clock className="h-4 w-4" />
              <span>{formatDate(ticket.createdAt)}</span>
            </div>
            <div className="flex items-center gap-1">
              <MessageSquare className="h-4 w-4" />
              <span>{ticket.history ? ticket.history.length : 0}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}