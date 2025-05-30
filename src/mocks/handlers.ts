import { http, HttpResponse, delay } from 'msw';
import { users, tickets, technicians } from './data';
import { User, Ticket } from '../types';

// Helper to simulate JWT token
const generateToken = (user: User) => {
  return `mock-jwt-token-${user.id}-${user.role}`;
};

export const handlers = [
  // Auth endpoints
  http.post('/api/auth/login', async ({ request }) => {
    console.log('Iniciando handler de login');
    await delay(1000);
    
    const body = await request.json();
    console.log('Dados recebidos:', body);
    
    const { email, password } = body;
    
    // Simplificando a lógica de autenticação
    if (email === 'roberta@alvotech.com' && password === 'senha123') {
      const user = users.find(u => u.email === email);
      console.log('Login bem-sucedido como cliente');
      return HttpResponse.json({
        user,
        token: generateToken(user!),
      });
    }
    
    if (email === 'samuel@techsupport.com' && password === 'senha123') {
      const user = users.find(u => u.email === email);
      console.log('Login bem-sucedido como técnico');
      return HttpResponse.json({
        user,
        token: generateToken(user!),
      });
    }
    
    console.log('Login falhou');
    return new HttpResponse(null, {
      status: 401,
      statusText: 'Credenciais inválidas',
    });
  }),
  
  http.post('/api/auth/register', async ({ request }) => {
    await delay(1500);
    const userData = await request.json();
    
    const newUser: User = {
      id: `${users.length + 1}`,
      name: userData.name,
      email: userData.email,
      role: 'client',
      company: userData.company,
      createdAt: new Date().toISOString(),
    };
    
    users.push(newUser);
    
    return HttpResponse.json({
      user: newUser,
      message: 'Usuário registrado com sucesso',
    });
  }),
  
  // Tickets endpoints
  http.get('/api/tickets', async ({ request }) => {
    await delay(800);
    const url = new URL(request.url);
    const userId = url.searchParams.get('userId');
    const role = url.searchParams.get('role');
    const status = url.searchParams.get('status');
    
    let filteredTickets = [...tickets];
    
    if (userId && role === 'client') {
      filteredTickets = filteredTickets.filter(ticket => ticket.clientId === userId);
    }
    
    if (status) {
      filteredTickets = filteredTickets.filter(ticket => ticket.status === status);
    }
    
    return HttpResponse.json(filteredTickets);
  }),
  
  http.get('/api/tickets/:id', async ({ params }) => {
    await delay(500);
    const { id } = params;
    
    const ticket = tickets.find(t => t.id === id);
    
    if (!ticket) {
      return new HttpResponse(null, {
        status: 404,
        statusText: 'Not Found',
      });
    }
    
    return HttpResponse.json(ticket);
  }),
  
  http.post('/api/tickets', async ({ request }) => {
    await delay(1000);
    const ticketData = await request.json();
    
    const newTicket: Ticket = {
      id: `${tickets.length + 1}`,
      title: ticketData.title,
      description: ticketData.description,
      status: 'open',
      priority: ticketData.priority || 'medium',
      clientId: ticketData.clientId,
      clientName: users.find(u => u.id === ticketData.clientId)?.name || '',
      companyName: users.find(u => u.id === ticketData.clientId)?.company,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      category: ticketData.category,
      history: [
        {
          id: `h${new Date().getTime()}`,
          ticketId: `${tickets.length + 1}`,
          message: 'Chamado aberto',
          createdAt: new Date().toISOString(),
          createdBy: {
            id: ticketData.clientId,
            name: users.find(u => u.id === ticketData.clientId)?.name || '',
            role: 'client',
          },
        },
      ],
    };
    
    tickets.push(newTicket);
    
    return HttpResponse.json(newTicket);
  }),
  
  http.patch('/api/tickets/:id', async ({ request, params }) => {
    await delay(800);
    const { id } = params;
    const updateData = await request.json();
    
    const ticketIndex = tickets.findIndex(t => t.id === id);
    
    if (ticketIndex === -1) {
      return new HttpResponse(null, {
        status: 404,
        statusText: 'Not Found',
      });
    }
    
    const updatedTicket = {
      ...tickets[ticketIndex],
      ...updateData,
      updatedAt: new Date().toISOString(),
    };
    
    // Add history entry if provided
    if (updateData.historyEntry) {
      updatedTicket.history.push({
        id: `h${new Date().getTime()}`,
        ticketId: id as string,
        message: updateData.historyEntry.message,
        createdAt: new Date().toISOString(),
        createdBy: updateData.historyEntry.createdBy,
      });
    }
    
    tickets[ticketIndex] = updatedTicket;
    
    return HttpResponse.json(updatedTicket);
  }),
  
  // Technicians endpoints
  http.get('/api/technicians', async () => {
    await delay(600);
    return HttpResponse.json(technicians);
  }),

  // Clients endpoints
  http.get('/api/clients', async () => {
    await delay(600);
    const clients = users.filter(user => user.role === 'client');
    return HttpResponse.json(clients);
  }),
];