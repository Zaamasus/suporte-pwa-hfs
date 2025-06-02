import React from 'react';
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
  const completedTickets = ticketsByStatus.closed || 0;
  const pausedTickets = ticketsByStatus.paused || 0;

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6">
      <StatsCard 
        title="Total de Chamados"
        value={totalTickets}
        icon={<PieChart />}
        iconBg="bg-primary-100 dark:bg-primary-900/30"
        iconColor="text-primary-600 dark:text-primary-400"
        borderColor="border-primary-100 dark:border-primary-900"
      />
      <StatsCard 
        title="Em Aberto"
        value={openTickets}
        icon={<AlertCircle />}
        iconBg="bg-yellow-100 dark:bg-yellow-900/30"
        iconColor="text-yellow-600 dark:text-yellow-400"
        borderColor="border-yellow-100 dark:border-yellow-900"
      />
      <StatsCard 
        title="Em Andamento"
        value={inProgressTickets}
        icon={<Clock />}
        iconBg="bg-blue-100 dark:bg-blue-900/30"
        iconColor="text-blue-600 dark:text-blue-400"
        borderColor="border-blue-100 dark:border-blue-900"
      />
      <StatsCard 
        title="Concluídos"
        value={completedTickets}
        icon={<CheckCircle />}
        iconBg="bg-green-100 dark:bg-green-900/30"
        iconColor="text-green-600 dark:text-green-400"
        borderColor="border-green-100 dark:border-green-900"
      />
      <StatsCard 
        title="Em Pausa"
        value={pausedTickets}
        icon={<FileText />}
        iconBg="bg-orange-100 dark:bg-orange-900/30"
        iconColor="text-orange-600 dark:text-orange-400"
        borderColor="border-orange-100 dark:border-orange-900"
      />
    </div>
  );
}

interface StatsCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
  borderColor: string;
}

function StatsCard({ title, value, icon, iconBg, iconColor, borderColor }: StatsCardProps) {
  return (
    <Card className={`rounded-xl border ${borderColor} shadow-md hover:shadow-lg transition-all duration-200 bg-white dark:bg-dark-200/80`}> 
      <CardContent className="p-2 sm:p-5 flex flex-col items-center sm:items-start text-center sm:text-left">
        <div className="flex items-center justify-center mb-1 sm:mb-2">
          <div className={`flex items-center justify-center w-8 h-8 sm:w-12 sm:h-12 rounded-full ${iconBg} ${iconColor} transition-all duration-200`}>
            {React.cloneElement(icon as React.ReactElement, { className: 'h-4 w-4 sm:h-7 sm:w-7' })}
          </div>
        </div>
        <p className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400 tracking-tight mb-0.5 sm:mb-0">{title}</p>
        <p className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white leading-tight">{value}</p>
      </CardContent>
    </Card>
  );
}