import { Request, Response } from 'express';
import * as ticketService from '../services/ticketService';

export const getTickets = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Usuário não autenticado (erro inesperado no controller)' });
    }
    const user = req.user;
    const { status, priority, search, sortBy, assignedTo } = req.query;

    const tickets = await ticketService.getAllTickets({
      userId: user.id,
      userRole: user.role,
      status: status as string,
      priority: priority as string,
      search: search as string,
      sortBy: sortBy as string,
      assignedTo: assignedTo as string,
      company: user.role === 'client' ? user.company : undefined
    });

    res.json(tickets);
  } catch (error) {
    console.error('Erro ao buscar tickets:', error);
    res.status(500).json({ message: 'Erro interno ao buscar tickets' });
  }
};

export const getTicketById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const ticket = await ticketService.getTicketById(id);
    if (!ticket) {
      return res.status(404).json({ message: 'Ticket não encontrado' });
    }
    res.json(ticket);
  } catch (error) {
    res.status(500).json({ message: 'Erro interno ao buscar ticket' });
  }
};

export const createTicket = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Usuário não autenticado (erro inesperado no controller)' });
    }
    const user = req.user;

    const ticketData = { 
      ...req.body, 
      created_by: user.id,
      company: user.role === 'client' ? user.company : req.body.company
    };

    const newTicket = await ticketService.createTicket(ticketData);
    res.status(201).json(newTicket);
  } catch (error) {
    console.error('Erro ao criar ticket:', error);
    res.status(500).json({ message: 'Erro interno ao criar ticket' });
  }
};

export const updateTicket = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedTicket = await ticketService.updateTicket(id, req.body);
    if (!updatedTicket) {
      return res.status(404).json({ message: 'Ticket não encontrado para atualização' });
    }
    res.json(updatedTicket);
  } catch (error) {
    console.error('Erro ao atualizar ticket:', error);
    res.status(500).json({ message: 'Erro interno ao atualizar ticket' });
  }
};

export const deleteTicket = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await ticketService.deleteTicket(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Erro interno ao deletar ticket' });
  }
};

// Adicionar outras funções conforme necessário (ex: atribuir técnico, adicionar comentário, etc.) 