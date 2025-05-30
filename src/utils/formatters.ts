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
    open: 'Em aberto',
    in_progress: 'Em andamento',
    completed: 'Concluído',
  };
  return statusMap[status];
};

// Get ticket status color
export const getTicketStatusColor = (status: TicketStatus): string => {
  const colorMap: Record<TicketStatus, string> = {
    open: 'warning',
    in_progress: 'primary',
    completed: 'success',
  };
  return colorMap[status];
};

// Get ticket priority in Portuguese
export const getTicketPriorityText = (priority: TicketPriority): string => {
  const priorityMap: Record<TicketPriority, string> = {
    low: 'Baixa',
    medium: 'Média',
    high: 'Alta',
  };
  return priorityMap[priority];
};

// Get ticket priority color
export const getTicketPriorityColor = (priority: TicketPriority): string => {
  const colorMap: Record<TicketPriority, string> = {
    low: 'success',
    medium: 'warning',
    high: 'danger',
  };
  return colorMap[priority];
};