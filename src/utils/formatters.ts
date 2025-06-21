import { format, formatDistance } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { TicketStatus, TicketPriority } from '../types';

// Format date to dd/MM/yyyy
export const formatDate = (date: string | Date): string => {
  try {
    // Verificar se a data é válida
    const dateObj = new Date(date);
    if (isNaN(dateObj.getTime())) {
      console.error(`Data inválida recebida: ${date}`);
      return 'Data inválida';
    }
    return format(dateObj, 'dd/MM/yyyy', { locale: ptBR });
  } catch (error) {
    console.error('Erro ao formatar data:', error);
    return 'Data inválida';
  }
};

// Format date and time to dd/MM/yyyy HH:mm
export const formatDateTime = (date: string | Date): string => {
  try {
    // Verificar se a data é válida
    const dateObj = new Date(date);
    if (isNaN(dateObj.getTime())) {
      console.error(`Data inválida recebida: ${date}`);
      return 'Data inválida';
    }
    return format(dateObj, 'dd/MM/yyyy HH:mm', { locale: ptBR });
  } catch (error) {
    console.error('Erro ao formatar data e hora:', error);
    return 'Data inválida';
  }
};

// Format date to relative time (e.g. "há 2 dias")
export const formatRelativeTime = (date: string | Date): string => {
  try {
    // Verificar se a data é válida
    const dateObj = new Date(date);
    if (isNaN(dateObj.getTime())) {
      console.error(`Data inválida recebida: ${date}`);
      return 'Data inválida';
    }
    return formatDistance(dateObj, new Date(), {
      addSuffix: true,
      locale: ptBR,
    });
  } catch (error) {
    console.error('Erro ao formatar tempo relativo:', error);
    return 'Data inválida';
  }
};

// Get ticket status in Portuguese
export const getTicketStatusText = (status: TicketStatus): string => {
  const statusMap: Record<TicketStatus, string> = {
    [TicketStatus.OPEN]: 'Em aberto',
    [TicketStatus.IN_PROGRESS]: 'Em andamento',
    [TicketStatus.PAUSED]: 'Em pausa',
    [TicketStatus.CLOSED]: 'Concluído',
  };
  return statusMap[status] || status;
};

// Get ticket status color
export const getTicketStatusColor = (status: TicketStatus): string => {
  const colorMap: Record<TicketStatus, string> = {
    [TicketStatus.OPEN]: 'warning',
    [TicketStatus.IN_PROGRESS]: 'primary',
    [TicketStatus.PAUSED]: 'secondary',
    [TicketStatus.CLOSED]: 'success',
  };
  return colorMap[status] || 'default';
};

// Get ticket priority in Portuguese
export const getTicketPriorityText = (priority: TicketPriority): string => {
  const priorityMap: Record<TicketPriority, string> = {
    [TicketPriority.LOW]: 'Baixa',
    [TicketPriority.MEDIUM]: 'Média',
    [TicketPriority.HIGH]: 'Alta',
    [TicketPriority.CRITICAL]: 'Crítica',
  };
  return priorityMap[priority] || priority;
};

// Get ticket priority color
export const getTicketPriorityColor = (priority: TicketPriority): string => {
  const colorMap: Record<TicketPriority, string> = {
    [TicketPriority.LOW]: 'success',
    [TicketPriority.MEDIUM]: 'warning',
    [TicketPriority.HIGH]: 'danger',
    [TicketPriority.CRITICAL]: 'danger',
  };
  return colorMap[priority] || 'default';
};