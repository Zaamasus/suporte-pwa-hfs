export const getTickets = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: 'Usuário não autenticado (erro inesperado no controller)' });
        }
        const user = req.user;
        const { status, priority, search, sortBy, assignedTo } = req.query;
        console.log('Buscando tickets para usuário:', {
            userId: user.id,
            role: user.role,
            company: user.role === 'client' ? user.company : undefined
        });
        const tickets = await ticketService.getAllTickets({
            userId: user.id,
            userRole: user.role,
            status: status,
            priority: priority,
            search: search,
            sortBy: sortBy,
            assignedTo: assignedTo,
            company: user.role === 'client' ? user.company : undefined
        });
        console.log(`Encontrados ${tickets.length} tickets`);
        if (tickets.length > 0) {
            console.log('Amostra do primeiro ticket retornado:', JSON.stringify({
                id: tickets[0].id,
                title: tickets[0].title,
                company: tickets[0].company,
                created_by: tickets[0].created_by
            }));
        }
        res.json(tickets);
    }
    catch (error) {
        console.error('Erro ao buscar tickets:', error);
        res.status(500).json({ message: 'Erro interno ao buscar tickets' });
    }
};
//# sourceMappingURL=ticketController.js.map