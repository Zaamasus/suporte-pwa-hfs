import { supabase } from '../config/supabase';
import { Attachment, AttachmentCreate } from '../models/Attachment';

/**
 * Salva informações de anexo no banco de dados
 */
export const createAttachment = async (attachmentData: AttachmentCreate): Promise<Attachment> => {
  const { data, error } = await supabase
    .from('attachments')
    .insert(attachmentData)
    .select()
    .single();

  if (error) {
    throw new Error(`Erro ao salvar informações do anexo: ${error.message}`);
  }
  return data;
};

/**
 * Obtém anexos de um ticket específico
 */
export const getTicketAttachments = async (ticketId: string): Promise<Attachment[]> => {
  const { data, error } = await supabase
    .from('attachments')
    .select('*')
    .eq('ticket_id', ticketId)
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(`Erro ao buscar anexos do ticket: ${error.message}`);
  }
  return data || [];
};

/**
 * Exclui um anexo específico
 */
export const deleteAttachment = async (attachmentId: string): Promise<boolean> => {
  const { error } = await supabase
    .from('attachments')
    .delete()
    .eq('id', attachmentId);

  if (error) {
    throw new Error(`Erro ao excluir anexo: ${error.message}`);
  }
  return true;
};

/**
 * Exclui todos os anexos de um ticket
 */
export const deleteTicketAttachments = async (ticketId: string): Promise<boolean> => {
  const { error } = await supabase
    .from('attachments')
    .delete()
    .eq('ticket_id', ticketId);

  if (error) {
    throw new Error(`Erro ao excluir anexos do ticket: ${error.message}`);
  }
  return true;
}; 