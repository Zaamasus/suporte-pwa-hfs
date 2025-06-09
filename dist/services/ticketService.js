import { supabase } from '../config/supabase';
export const getAllTickets = async (params) => {
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
        }
        else {
            query = query.eq('client_id', params.userId);
        }
    }
    else if (params.userRole === 'technician' || params.userRole === 'admin') {
        // Técnicos e admins veem todos os tickets (NÃO aplica filtro)
        if (params.assignedTo) {
            query = query.eq('technician_id', params.assignedTo);
        }
    }
    else {
        // Qualquer outro papel não autorizado
        console.warn(`Papel de usuário desconhecido ou não autorizado para visualização geral: ${params.userRole}`);
        return [];
    }
    if (params.search) {
        query = query.or(`title.ilike.%${params.search}%,description.ilike.%${params.search}%`);
    }
    if (params.sortBy === 'newest') {
        query = query.order('created_at', { ascending: false });
    }
    else if (params.sortBy === 'oldest') {
        query = query.order('created_at', { ascending: true });
    }
    else {
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
    console.log(`Encontrados ${data.length} tickets no banco.`);
    // Os tickets já vêm com client_name e technician_name do banco
    // Apenas convertemos para o formato esperado pelo frontend
    const enrichedTickets = data.map(ticket => {
        return {
            ...ticket,
            // Para compatibilidade com a interface do frontend
            clientId: ticket.client_id,
            clientName: ticket.client_name,
            technicianId: ticket.technician_id,
            technicianName: ticket.technician_name,
            companyName: ticket.company,
            // Campos adicionais necessários
            history: []
        };
    });
    console.log(`Retornando ${enrichedTickets.length} tickets`);
    if (enrichedTickets.length > 0) {
        console.log('Exemplo do primeiro ticket:', JSON.stringify({
            id: enrichedTickets[0].id,
            title: enrichedTickets[0].title,
            clientName: enrichedTickets[0].clientName,
            companyName: enrichedTickets[0].companyName
        }, null, 2));
    }
    return enrichedTickets;
};
export const getTicketById = async (id) => {
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
            if (ticketError.code === 'PGRST116')
                return null;
            throw new Error(`Erro ao buscar ticket por ID: ${ticketError.message}`);
        }
        if (!ticketData) {
            console.log(`Ticket não encontrado com ID: ${id}`);
            return null;
        }
        console.log(`Ticket encontrado: ${JSON.stringify(ticketData, null, 2)}`);
        // Tentar buscar o histórico do ticket separadamente
        const { data: historyData } = await supabase
            .from('ticket_comments')
            .select('*')
            .eq('ticket_id', id)
            .order('created_at', { ascending: false });
        // Converter comentários para o formato de histórico esperado pelo frontend
        const history = (historyData || []).map(comment => ({
            id: comment.id,
            ticketId: comment.ticket_id,
            message: comment.content,
            createdAt: comment.created_at,
            createdBy: {
                id: comment.user_id,
                name: comment.user_name || 'Usuário',
                role: comment.user_role || 'client'
            }
        }));
        // Formatar o resultado com todos os dados
        const ticketWithHistory = {
            ...ticketData,
            // Para compatibilidade com a interface do frontend
            clientId: ticketData.client_id,
            clientName: ticketData.client_name,
            technicianId: ticketData.technician_id,
            technicianName: ticketData.technician_name,
            companyName: ticketData.company,
            history: history || []
        };
        console.log(`Ticket ${id} com histórico pronto para retorno`);
        return ticketWithHistory;
    }
    catch (error) {
        console.error(`Erro não tratado: ${error}`);
        throw error;
    }
};
export const createTicket = async (ticketData) => {
    // Garantir que os campos correspondem à estrutura da tabela
    const ticketToCreate = {
        title: ticketData.title,
        description: ticketData.description,
        priority: ticketData.priority,
        client_id: ticketData.client_id,
        client_name: ticketData.client_name,
        company: ticketData.company,
        status: 'open' // Status padrão para novos tickets
    };
    console.log('Criando novo ticket:', ticketToCreate);
    const { data, error } = await supabase
        .from('tickets')
        .insert(ticketToCreate)
        .select()
        .single();
    if (error) {
        console.error('Erro ao criar ticket:', error);
        throw new Error(`Erro ao criar ticket: ${error.message}`);
    }
    // Mapear para o formato esperado pelo frontend
    const createdTicket = {
        ...data,
        clientId: data.client_id,
        clientName: data.client_name,
        companyName: data.company,
        history: []
    };
    return createdTicket;
};
export const updateTicket = async (id, ticketData) => {
    // Mapear os campos para corresponder à estrutura da tabela
    const updateData = {};
    if (ticketData.title)
        updateData.title = ticketData.title;
    if (ticketData.description)
        updateData.description = ticketData.description;
    if (ticketData.status)
        updateData.status = ticketData.status;
    if (ticketData.priority)
        updateData.priority = ticketData.priority;
    if (ticketData.technician_id)
        updateData.technician_id = ticketData.technician_id;
    if (ticketData.technician_name)
        updateData.technician_name = ticketData.technician_name;
    console.log(`Atualizando ticket ${id} com dados:`, updateData);
    const { data, error } = await supabase
        .from('tickets')
        .update(updateData)
        .eq('id', id)
        .select()
        .single();
    if (error) {
        console.error('Erro ao atualizar ticket:', error);
        if (error.code === 'PGRST116')
            return null;
        throw new Error(`Erro ao atualizar ticket: ${error.message}`);
    }
    // Mapear para o formato esperado pelo frontend
    const updatedTicket = {
        ...data,
        clientId: data.client_id,
        clientName: data.client_name,
        technicianId: data.technician_id,
        technicianName: data.technician_name,
        companyName: data.company,
        history: []
    };
    return updatedTicket;
};
export const deleteTicket = async (id) => {
    const { error } = await supabase.from('tickets').delete().eq('id', id);
    if (error) {
        throw new Error(`Erro ao deletar ticket: ${error.message}`);
    }
    return true;
};
//# sourceMappingURL=ticketService.js.map