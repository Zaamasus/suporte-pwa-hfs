const { supabase } = require('./config');

/**
 * Serviço para gerenciar tickets usando Supabase
 */
const ticketService = {
  /**
   * Obtém todos os tickets de acordo com o papel do usuário
   * @param {Object} user - Informações do usuário autenticado
   * @returns {Promise<Array>} - Lista de tickets
   */
  async getTickets(user) {
    try {
      let query = supabase
        .from('tickets')
        .select('*');
      
      // Filtro baseado no papel do usuário
      if (user.role === 'client') {
        // Clientes veem tickets da sua empresa
        query = query.eq('companyName', user.company);
      }
      
      // Ordenar por data de criação (mais recentes primeiro)
      query = query.order('createdAt', { ascending: false });
      
      const { data, error } = await query;
      
      if (error) throw error;
      
      return data;
    } catch (error) {
      console.error('Erro ao buscar tickets:', error);
      throw error;
    }
  },
  
  /**
   * Obtém um ticket pelo ID
   * @param {string} id - ID do ticket
   * @returns {Promise<Object>} - Dados do ticket
   */
  async getTicketById(id) {
    try {
      const { data, error } = await supabase
        .from('tickets')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) {
        if (error.code === 'PGRST116') { // Código para registro não encontrado
          throw new Error('Ticket não encontrado');
        }
        throw error;
      }
      
      return data;
    } catch (error) {
      console.error(`Erro ao buscar ticket ${id}:`, error);
      throw error;
    }
  },
  
  /**
   * Cria um novo ticket
   * @param {Object} ticketData - Dados do ticket
   * @param {Object} user - Informações do usuário autenticado
   * @returns {Promise<Object>} - Ticket criado
   */
  async createTicket(ticketData, user) {
    try {
      const { title, description, priority, category } = ticketData;
      const { id: clientId, name: clientName, company: companyName } = user;
      
      if (!title || !description) {
        throw new Error('Título e descrição são obrigatórios');
      }
      
      const createdAt = new Date().toISOString();
      
      const { data, error } = await supabase
        .from('tickets')
        .insert([
          {
            title,
            description,
            status: 'open',
            priority: priority || 'medium',
            clientId,
            clientName,
            companyName,
            createdAt,
            updatedAt: createdAt,
            category: category || 'other',
            history: [
              {
                id: `h${Date.now()}`,
                message: 'Chamado aberto',
                createdAt,
                createdBy: {
                  id: clientId,
                  name: clientName,
                  role: 'client'
                }
              }
            ]
          }
        ])
        .select()
        .single();
      
      if (error) throw error;
      
      return data;
    } catch (error) {
      console.error('Erro ao criar ticket:', error);
      throw error;
    }
  },
  
  /**
   * Atualiza um ticket existente
   * @param {string} id - ID do ticket
   * @param {Object} updateData - Dados para atualização
   * @returns {Promise<Object>} - Ticket atualizado
   */
  async updateTicket(id, updateData) {
    try {
      // Buscar ticket atual para mesclar com as atualizações
      const { data: currentTicket, error: fetchError } = await supabase
        .from('tickets')
        .select('*')
        .eq('id', id)
        .single();
      
      if (fetchError) throw fetchError;
      
      // Preparar objeto de atualização
      const updatedAt = new Date().toISOString();
      const updatedTicket = {
        ...updateData,
        updatedAt
      };
      
      // Adicionar entrada ao histórico se fornecida
      if (updateData.historyEntry) {
        const newHistory = [
          ...currentTicket.history,
          {
            id: `h${Date.now()}`,
            message: updateData.historyEntry.message,
            createdAt: updatedAt,
            createdBy: updateData.historyEntry.createdBy
          }
        ];
        
        updatedTicket.history = newHistory;
        delete updatedTicket.historyEntry;
      }
      
      // Atualizar ticket no banco
      const { data, error } = await supabase
        .from('tickets')
        .update(updatedTicket)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      
      return data;
    } catch (error) {
      console.error(`Erro ao atualizar ticket ${id}:`, error);
      throw error;
    }
  }
};

module.exports = ticketService; 