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
  } else if (params.userRole === 'technician' || params.userRole === 'admin') {
    // Técnicos e admins veem todos os tickets (NÃO aplica filtro)
  } else {
    // Qualquer outro papel não autorizado
    console.warn(`Papel de usuário desconhecido ou não autorizado para visualização geral: ${params.userRole}`);
    return [];
  }

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
  
  if (!data || data.length === 0) {
    return [];
  }
  
  console.log(`Encontrados ${data.length} tickets no banco. Enriquecendo com dados adicionais...`);
  
  // Enriquecer tickets com dados de empresa e cliente
  const enrichedTickets = await Promise.all(data.map(async (ticket) => {
    // Informações padrão
    let clientName = 'Cliente Desconhecido';
    let companyName = undefined;
    
    // Buscar informações do cliente que criou o ticket
    if (ticket.client_id) {
      const { data: userData } = await supabase
        .from('users')
        .select('name')
        .eq('id', ticket.client_id)
        .single();
      
      if (userData) {
        clientName = userData.name;
      }
    }
    
    // Buscar informações da empresa
    if (ticket.company) {
      const { data: companyData } = await supabase
        .from('companies')
        .select('name')
        .eq('id', ticket.company)
        .single();
      
      if (companyData) {
        companyName = companyData.name;
      }
    }
    
    return {
      ...ticket,
      clientName,
      companyName,
      // Para compatibilidade com a interface do frontend
      history: []
    };
  }));
  
  console.log(`Retornando ${enrichedTickets.length} tickets enriquecidos`);
  if (enrichedTickets.length > 0) {
    console.log('Exemplo do primeiro ticket enriquecido:', JSON.stringify({
      id: enrichedTickets[0].id,
      title: enrichedTickets[0].title,
      clientName: enrichedTickets[0].clientName,
      companyName: enrichedTickets[0].companyName
    }, null, 2));
  }
  
  return enrichedTickets;
};

export const getTicketById = async (id: string): Promise<Ticket | null> => {
  console.log(`Buscando ticket com ID: ${id}`);
  
  try {
    // Primeiro, buscamos o ticket básico
    const { data: ticketData, error: ticketError } = await supabase
      .from('tickets')
      .select('*')
      .eq('id', id)
      .single();
    
    if (ticketError) {
      console.error(`Erro ao buscar ticket: ${ticketError.message}`);
      if (ticketError.code === 'PGRST116') return null;
      throw new Error(`Erro ao buscar ticket por ID: ${ticketError.message}`);
    }
    
    if (!ticketData) {
      console.log(`Ticket não encontrado com ID: ${id}`);
      return null;
    }
    
    console.log(`Ticket encontrado: ${JSON.stringify(ticketData, null, 2)}`);
    
    // Agora buscamos informações adicionais
    let clientName = 'Cliente Desconhecido';
    let companyName = undefined;
    let technicianName = undefined;
    
    // Buscar informações do cliente
    if (ticketData.client_id) {
      const { data: userData } = await supabase
        .from('users')
        .select('name')
        .eq('id', ticketData.client_id)
        .single();
      
      if (userData) {
        clientName = userData.name;
        console.log(`Cliente encontrado: ${clientName}`);
      }
    }
    
    // Buscar informações da empresa
    if (ticketData.company) {
      const { data: companyData } = await supabase
        .from('companies')
        .select('name')
        .eq('id', ticketData.company)
        .single();
      
      if (companyData) {
        companyName = companyData.name;
        console.log(`Empresa encontrada: ${companyName}`);
      }
    }
    
    // Buscar informações do técnico
    if (ticketData.assigned_to) {
      const { data: techData } = await supabase
        .from('users')
        .select('name')
        .eq('id', ticketData.assigned_to)
        .single();
      
      if (techData) {
        technicianName = techData.name;
      }
    }

    // Buscar histórico do ticket na tabela ticket_history
    const { data: historyData } = await supabase
      .from('ticket_history')
      .select('*')
      .eq('ticket_id', id)
      .order('created_at', { ascending: false });
    // Converter histórico para o formato esperado pelo frontend
    const history = (historyData || []).map(entry => ({
      id: entry.id,
      ticketId: entry.ticket_id,
      message: entry.message,
      createdAt: entry.created_at,
      createdBy: {
        id: entry.user_id,
        name: entry.user_name || 'Usuário',
        role: entry.user_role || 'client'
      }
    }));
    
    // Formatar o resultado com todos os dados enriquecidos
    const enrichedTicket = {
      ...ticketData,
      clientName,
      companyName,
      technicianName,
      history: history || []
    };
    
    console.log(`Ticket enriquecido completo: ${JSON.stringify({
      id: enrichedTicket.id, 
      title: enrichedTicket.title,
      clientName: enrichedTicket.clientName,
      companyName: enrichedTicket.companyName
    }, null, 2)}`);
    
    return enrichedTicket;
  } catch (error) {
    console.error(`Erro não tratado: ${error}`);
    throw error;
  }
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

export const updateTicket = async (id: string, ticketData: TicketUpdate & { historyEntry?: any }): Promise<Ticket | null> => {
  // Padronizar status concluído
  if (ticketData.status && ['completed', 'concluido', 'resolved', 'finalizado'].includes(ticketData.status)) {
    ticketData.status = 'closed';
  }
  // Se historyEntry vier, registrar no histórico
  if (ticketData.historyEntry) {
    const { message, createdBy } = ticketData.historyEntry;
    await supabase.from('ticket_history').insert({
      ticket_id: id,
      user_id: createdBy.id,
      user_name: createdBy.name,
      user_role: createdBy.role,
      message,
    });
    // Remove historyEntry do objeto antes de atualizar o ticket
    delete ticketData.historyEntry;
  }
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