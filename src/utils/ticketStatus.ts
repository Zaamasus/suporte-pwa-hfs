import { TicketStatus } from '../types';

interface StatusConfig {
  text: string;
  color: 'primary' | 'warning' | 'success' | 'secondary';
  bgColor: string;
  textColor: string;
}

const statusConfig: Record<TicketStatus, StatusConfig> = {
  [TicketStatus.OPEN]: {
    text: 'Em aberto',
    color: 'primary',
    bgColor: 'bg-blue-100 dark:bg-blue-900/30',
    textColor: 'text-blue-600 dark:text-blue-400'
  },
  [TicketStatus.IN_PROGRESS]: {
    text: 'Em andamento',
    color: 'warning',
    bgColor: 'bg-yellow-100 dark:bg-yellow-900/30',
    textColor: 'text-yellow-600 dark:text-yellow-400'
  },
  [TicketStatus.PAUSED]: {
    text: 'Em pausa',
    color: 'secondary',
    bgColor: 'bg-gray-100 dark:bg-gray-700/30',
    textColor: 'text-gray-600 dark:text-gray-400'
  },
  [TicketStatus.CLOSED]: {
    text: 'Finalizado',
    color: 'success',
    bgColor: 'bg-green-100 dark:bg-green-900/30',
    textColor: 'text-green-600 dark:text-green-400'
  }
};

export function getTicketStatusColor(status: TicketStatus): string {
  return statusConfig[status].color;
}

export function getTicketStatusText(status: TicketStatus): string {
  return statusConfig[status].text;
}

export function getTicketStatusConfig(status: TicketStatus): StatusConfig {
  return statusConfig[status];
} 