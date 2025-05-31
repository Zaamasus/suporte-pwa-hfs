const { supabase } = require('./config');

/**
 * Serviço para gerenciar técnicos usando Supabase
 */
const technicianService = {
  /**
   * Obtém todos os técnicos com informações adicionais
   * @returns {Promise<Array>} - Lista de técnicos
   */
  async getTechnicians() {
    try {
      // Buscar todos os usuários com role = 'technician'
      const { data: technicians, error } = await supabase
        .from('users')
        .select('id, name, email, createdAt')
        .eq('role', 'technician');
      
      if (error) throw error;
      
      // Para cada técnico, adicionar informações extras
      const enrichedTechnicians = technicians.map(tech => ({
        ...tech,
        isOnline: true, // Por padrão, todos estão online
        specialties: ['Software', 'Hardware', 'Redes'], // Especialidades padrão
        assignedTickets: 0,
        completedTickets: 0
      }));
      
      // Para cada técnico, contar os tickets atribuídos e concluídos
      const promises = enrichedTechnicians.map(async (tech) => {
        // Tickets atribuídos (open + in_progress)
        const { data: assignedData, error: assignedError } = await supabase
          .from('tickets')
          .select('id')
          .eq('technicianId', tech.id)
          .in('status', ['open', 'in_progress']);
        
        if (!assignedError && assignedData) {
          tech.assignedTickets = assignedData.length;
        }
        
        // Tickets concluídos
        const { data: completedData, error: completedError } = await supabase
          .from('tickets')
          .select('id')
          .eq('technicianId', tech.id)
          .eq('status', 'completed');
        
        if (!completedError && completedData) {
          tech.completedTickets = completedData.length;
        }
      });
      
      await Promise.all(promises);
      
      return enrichedTechnicians;
    } catch (error) {
      console.error('Erro ao buscar técnicos:', error);
      throw error;
    }
  },
  
  /**
   * Obtém um técnico pelo ID com informações adicionais
   * @param {string} id - ID do técnico
   * @returns {Promise<Object>} - Dados do técnico
   */
  async getTechnicianById(id) {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('id, name, email, createdAt')
        .eq('id', id)
        .eq('role', 'technician')
        .single();
      
      if (error) {
        if (error.code === 'PGRST116') { // Código para registro não encontrado
          throw new Error('Técnico não encontrado');
        }
        throw error;
      }
      
      // Adicionar informações extras
      const technician = {
        ...data,
        isOnline: true,
        specialties: ['Software', 'Hardware', 'Redes']
      };
      
      // Contar tickets atribuídos
      const { data: assignedData, error: assignedError } = await supabase
        .from('tickets')
        .select('id')
        .eq('technicianId', id)
        .in('status', ['open', 'in_progress']);
      
      if (!assignedError) {
        technician.assignedTickets = assignedData.length;
      }
      
      // Contar tickets concluídos
      const { data: completedData, error: completedError } = await supabase
        .from('tickets')
        .select('id')
        .eq('technicianId', id)
        .eq('status', 'completed');
      
      if (!completedError) {
        technician.completedTickets = completedData.length;
      }
      
      return technician;
    } catch (error) {
      console.error(`Erro ao buscar técnico ${id}:`, error);
      throw error;
    }
  }
};

module.exports = technicianService; 