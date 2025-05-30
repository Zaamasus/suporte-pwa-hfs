// Script para gerar tickets fictícios para a empresa da Roberta (AlvoTech Soluções)
const sqlite3 = require('sqlite3').verbose();

// Conectar ao banco de dados
const db = new sqlite3.Database('./hfs.db', (err) => {
  if (err) {
    console.error('Erro ao conectar no banco:', err.message);
    process.exit(1);
  }
  console.log('Conectado ao banco SQLite');

  // Buscar o ID da Roberta para associar aos tickets
  db.get(`SELECT id, name, company FROM users WHERE email = 'roberta@alvotech.com'`, [], (err, user) => {
    if (err || !user) {
      console.error('Erro ao buscar usuário Roberta:', err ? err.message : 'Usuário não encontrado');
      db.close();
      process.exit(1);
    }

    console.log(`Encontrado usuário: ${user.name}, ID: ${user.id}, Empresa: ${user.company}`);
    
    // Tickets fictícios para a AlvoTech
    const tickets = [
      {
        title: 'Servidor principal com lentidão',
        description: 'Nosso servidor principal está apresentando lentidão desde ontem. Todos os sistemas estão lentos, especialmente durante o horário comercial.',
        status: 'open',
        priority: 'high',
        category: 'infraestrutura',
        createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString() // 4 dias atrás
      },
      {
        title: 'Renovação de licenças Microsoft',
        description: 'Precisamos renovar as licenças do Microsoft 365 para 20 usuários que vencem no próximo mês.',
        status: 'in_progress',
        priority: 'medium',
        category: 'licenciamento',
        createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString() // 7 dias atrás
      },
      {
        title: 'Computador do financeiro não liga',
        description: 'O computador da Ana do setor financeiro não está ligando. A luz de energia acende, mas a tela fica preta.',
        status: 'completed',
        priority: 'high',
        category: 'hardware',
        createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString() // 14 dias atrás
      },
      {
        title: 'Configuração de impressora nova',
        description: 'Compramos uma impressora Brother MFC-L3750CDW e precisamos configurá-la na rede para todos os departamentos.',
        status: 'open',
        priority: 'low',
        category: 'hardware',
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString() // 2 dias atrás
      },
      {
        title: 'Backup automático falhou',
        description: 'O sistema de backup automático falhou na última noite. Precisamos verificar o que aconteceu e garantir que os dados estão seguros.',
        status: 'in_progress',
        priority: 'high',
        category: 'segurança',
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString() // 1 dia atrás
      },
      {
        title: 'Implementação de novo firewall',
        description: 'Precisamos de uma análise para implementação de um novo firewall para aumentar a segurança da nossa rede.',
        status: 'open',
        priority: 'medium',
        category: 'segurança',
        createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString() // 5 dias atrás
      },
      {
        title: 'Treinamento para equipe no sistema ERP',
        description: 'Nossa equipe comercial precisa de um treinamento básico no novo sistema ERP que acabamos de implementar.',
        status: 'open',
        priority: 'low',
        category: 'treinamento',
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString() // 3 dias atrás
      },
      {
        title: 'Internet instável na sala de reuniões',
        description: 'A conexão Wi-Fi na sala de reuniões principal está instável, caindo frequentemente durante as videoconferências.',
        status: 'open',
        priority: 'medium',
        category: 'rede',
        createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString() // 6 dias atrás
      }
    ];

    console.log(`Inserindo ${tickets.length} tickets para ${user.company}...`);
    
    // Inserir os tickets no banco
    let insertedCount = 0;
    tickets.forEach(ticket => {
      db.run(
        `INSERT INTO tickets (title, description, status, priority, clientId, clientName, companyName, createdAt, category) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          ticket.title, 
          ticket.description, 
          ticket.status,
          ticket.priority, 
          user.id, 
          user.name, 
          user.company, 
          ticket.createdAt, 
          ticket.category
        ],
        function(err) {
          if (err) {
            console.error(`Erro ao inserir ticket "${ticket.title}":`, err.message);
          } else {
            insertedCount++;
            console.log(`Ticket inserido: ${ticket.title} (ID: ${this.lastID})`);
            
            // Verificar se todos os tickets foram processados
            if (insertedCount === tickets.length) {
              console.log(`Finalizado! Foram inseridos ${insertedCount} tickets.`);
              db.close();
            }
          }
        }
      );
    });
  });
}); 