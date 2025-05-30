import { Card, CardContent } from '../ui/Card';
import { Ticket, TicketStatus } from '../../types';
import { AlertCircle, Clock, CheckCircle, FileText, PieChart } from 'lucide-react';

interface StatsCardsProps {
  tickets: Ticket[];
}

export function StatsCards({ tickets }: StatsCardsProps) {
  const totalTickets = tickets.length;
  
  const ticketsByStatus = tickets.reduce((acc, ticket) => {
    acc[ticket.status] = (acc[ticket.status] || 0) + 1;
    return acc;
  }, {} as Record<TicketStatus, number>);
  
  const openTickets = ticketsByStatus.open || 0;
  const inProgressTickets = ticketsByStatus.in_progress || 0;
  const completedTickets = ticketsByStatus.completed || 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      <StatsCard 
        title="Total de Chamados"
        value={totalTickets}
        icon={<PieChart className="h-8 w-8 text-primary-500" />}
        border="border-l-primary-500"
      />
      
      <StatsCard 
        title="Em Aberto"
        value={openTickets}
        icon={<AlertCircle className="h-8 w-8 text-warning-500" />}
        border="border-l-warning-500"
      />
      
      <StatsCard 
        title="Em Andamento"
        value={inProgressTickets}
        icon={<Clock className="h-8 w-8 text-primary-500" />}
        border="border-l-primary-500"
      />
      
      <StatsCard 
        title="Concluídos"
        value={completedTickets}
        icon={<CheckCircle className="h-8 w-8 text-success-500" />}
        border="border-l-success-500"
      />
    </div>
  );
}

interface StatsCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  border: string;
}

function StatsCard({ title, value, icon, border }: StatsCardProps) {
  return (
    <Card className={`overflow-hidden border-l-4 ${border}`}>
      <CardContent className="p-4 flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
          <p className="text-2xl font-bold mt-1">{value}</p>
        </div>
        <div className="bg-gray-50 dark:bg-dark-300 p-3 rounded-lg">
          {icon}
        </div>
      </CardContent>
    </Card>
  );
}