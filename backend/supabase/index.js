const { supabase, testConnection } = require('./config');
const authService = require('./auth');
const ticketService = require('./tickets');
const technicianService = require('./technicians');

/**
 * Exporta todos os serviços do Supabase
 */
module.exports = {
  supabase,
  testConnection,
  authService,
  ticketService,
  technicianService
}; 