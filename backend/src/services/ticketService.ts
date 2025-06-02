import { supabase } from '../config/supabase';

// Definição da interface Ticket (ajuste conforme sua tabela no Supabase)
export interface Ticket {
  id: string;
  title: string;
  description: string;
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high';
  created_by: string; // ID do usuário que criou
  assigned_to?: string; // ID do técnico atribuído
  company: string; // Campo padronizado
  created_at: string;
  updated_at: string;
  // Adicione outros campos relevantes: category, attachments, etc.
}

export interface TicketCreate {
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  created_by: string;
  company: string;
  // Outros campos necessários na criação
}

export interface TicketUpdate {
  title?: string;
  description?: string;
  status?: 'open' | 'in_progress' | 'resolved' | 'closed';
  priority?: 'low' | 'medium' | 'high';
  assigned_to?: string;
  // Outros campos atualizáveis
}

interface GetTicketsParams {
  userId: string;
  userRole: string;
  status?: string;
  priority?: string;
  search?: string;
  sortBy?: string;
  assignedTo?: string;
  company?: string; // Padronizado
}

export const getAllTickets = async (params: GetTicketsParams): Promise<Ticket[]> => {
  let query = supabase.from('tickets').select('*'); // Seleciona todos os campos por padrão

  // Filtrar por status, se fornecido
  if (params.status) {
    query = query.eq('status', params.status);
  }

  // Filtrar por prioridade, se fornecido
  if (params.priority) {
    query = query.eq('priority', params.priority);
  }

  // Lógica de filtro baseada no papel do usuário
  if (params.userRole === 'client') {
    if (params.company) {
        query = query.eq('company', params.company);
    } else {
        query = query.eq('created_by', params.userId);
    }
  } else if (params.userRole === 'technician') {
    query = query.or(`assigned_to.eq.${params.userId},assigned_to.is.null`);
  } else if (params.userRole !== 'admin') {
    console.warn(`Papel de usuário desconhecido ou não autorizado para visualização geral: ${params.userRole}`);
    return [];
  }
  // Admins veem todos os tickets

  if (params.search) {
    query = query.or(`title.ilike.%${params.search}%,description.ilike.%${params.search}%`);
  }

  if (params.sortBy === 'newest') {
    query = query.order('created_at', { ascending: false });
  } else if (params.sortBy === 'oldest') {
    query = query.order('created_at', { ascending: true });
  } else {
    query = query.order('created_at', { ascending: false });
  }

  const { data, error } = await query;

  if (error) {
    console.error('Erro ao buscar tickets no Supabase:', error);
    throw new Error(`Erro ao buscar tickets: ${error.message}`);
  }
  return data || [];
};

export const getTicketById = async (id: string): Promise<Ticket | null> => {
  const { data, error } = await supabase
    .from('tickets')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    if (error.code === 'PGRST116') return null;
    throw new Error(`Erro ao buscar ticket por ID: ${error.message}`);
  }
  return data;
};

export const createTicket = async (ticketData: TicketCreate): Promise<Ticket> => {
  const { data, error } = await supabase
    .from('tickets')
    .insert(ticketData)
    .select()
    .single();

  if (error) {
    throw new Error(`Erro ao criar ticket: ${error.message}`);
  }
  return data;
};

export const updateTicket = async (id: string, ticketData: TicketUpdate): Promise<Ticket | null> => {
  const { data, error } = await supabase
    .from('tickets')
    .update(ticketData)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    if (error.code === 'PGRST116') return null;
    throw new Error(`Erro ao atualizar ticket: ${error.message}`);
  }
  return data;
};

export const deleteTicket = async (id: string): Promise<boolean> => {
  const { error } = await supabase.from('tickets').delete().eq('id', id);
  if (error) {
    throw new Error(`Erro ao deletar ticket: ${error.message}`);
  }
  return true;
}; 