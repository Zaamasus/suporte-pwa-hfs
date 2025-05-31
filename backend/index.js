require('dotenv').config();
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const PORT = process.env.PORT || 4000;
const SECRET = process.env.JWT_SECRET || 'supersecret';

app.use(cors());
app.use(express.json());

// Banco de dados SQLite
const db = new sqlite3.Database('./hfs.db', (err) => {
  if (err) return console.error('Erro ao conectar no banco:', err.message);
  console.log('Conectado ao banco SQLite');
});

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'client',
    company TEXT,
    createdAt TEXT
  )`);
  db.run(`CREATE TABLE IF NOT EXISTS tickets (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    status TEXT NOT NULL,
    priority TEXT,
    clientId INTEGER,
    clientName TEXT,
    companyName TEXT,
    createdAt TEXT,
    category TEXT
  )`);
  
  // Adicionar coluna companyName se ela não existir
  db.run(`PRAGMA table_info(tickets)`, [], (err, rows) => {
    if (err) {
      console.error("Erro ao verificar colunas da tabela tickets:", err);
      return;
    }
    
    // Verificar se a coluna já existe no resultado
    let hasCompanyNameColumn = false;
    if (rows) {
      for (const row of rows) {
        if (row.name === 'companyName') {
          hasCompanyNameColumn = true;
          break;
        }
      }
    }
    
    // Se a coluna não existir, adicioná-la
    if (!hasCompanyNameColumn) {
      console.log("Adicionando coluna companyName à tabela tickets...");
      db.run(`ALTER TABLE tickets ADD COLUMN companyName TEXT`, [], (alterErr) => {
        if (alterErr) {
          console.error("Erro ao adicionar coluna companyName:", alterErr);
        } else {
          console.log("Coluna companyName adicionada com sucesso!");
          
          // Atualizar registros existentes com as empresas dos clientes
          db.all(`SELECT t.id, t.clientId, u.company FROM tickets t 
                  JOIN users u ON t.clientId = u.id 
                  WHERE t.companyName IS NULL`, [], (selErr, ticketsToUpdate) => {
            if (selErr) {
              console.error("Erro ao buscar tickets para atualizar companyName:", selErr);
              return;
            }
            
            if (ticketsToUpdate && ticketsToUpdate.length > 0) {
              console.log(`Atualizando ${ticketsToUpdate.length} tickets com informação de empresa...`);
              
              ticketsToUpdate.forEach(ticket => {
                db.run(`UPDATE tickets SET companyName = ? WHERE id = ?`, 
                  [ticket.company, ticket.id], (updateErr) => {
                  if (updateErr) {
                    console.error(`Erro ao atualizar companyName para ticket ${ticket.id}:`, updateErr);
                  }
                });
              });
            }
          });
        }
      });
    }
  });
});

// Middleware para autenticação JWT
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Token não fornecido' });
  jwt.verify(token, SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Token inválido' });
    req.user = user;
    next();
  });
}

// Rota de registro
app.post('/api/auth/register', (req, res) => {
  const { name, email, password, company } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Dados obrigatórios ausentes' });
  }
  const hash = bcrypt.hashSync(password, 8);
  const createdAt = new Date().toISOString();
  db.run(
    `INSERT INTO users (name, email, password, role, company, createdAt) VALUES (?, ?, ?, 'client', ?, ?)`,
    [name, email, hash, company, createdAt],
    function (err) {
      if (err) {
        return res.status(400).json({ error: 'Email já cadastrado' });
      }
      res.json({ id: this.lastID, name, email, role: 'client', company, createdAt });
    }
  );
});

// Rota de login
app.post('/api/auth/login', (req, res) => {
  console.log("Rota /api/auth/login ACESSADA. Body:", req.body);
  const { email, password } = req.body;
  db.get(`SELECT * FROM users WHERE email = ?`, [email], (err, user) => {
    if (err || !user) {
      return res.status(401).json({ error: 'Email ou senha inválidos' });
    }
    // Log para depuração
    console.log("Tentativa de login - Usuário encontrado no DB:", user.email, "Senha recebida do frontend:", password, "Hash da senha no DB:", user.password);
    if (!bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ error: 'Email ou senha inválidos' });
    }
    // Gerar token JWT com TODAS as informações necessárias
    const token = jwt.sign(
      { 
        id: user.id, 
        email: user.email, 
        role: user.role,
        name: user.name,
        company: user.company
      }, 
      SECRET, 
      { expiresIn: '8h' }
    );
    console.log("JWT payload:", { id: user.id, email: user.email, role: user.role, name: user.name, company: user.company });
    res.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        company: user.company,
        createdAt: user.createdAt
      },
      token
    });
  });
});

// Rota para obter tickets
app.get('/api/tickets', authenticateToken, (req, res) => {
  console.log("GET /api/tickets - Usuário:", req.user);
  
  // Filtro baseado no papel do usuário
  let query = '';
  let params = [];
  
  if (req.user.role === 'client') {
    // Clientes veem tickets da sua empresa, não apenas os próprios
    query = `SELECT * FROM tickets WHERE companyName = ? ORDER BY createdAt DESC`;
    params = [req.user.company]; // Filtrar por empresa do cliente
    console.log("GET /api/tickets - Filtrando por empresa:", req.user.company);
  } else {
    // Técnicos veem todos os tickets
    query = `SELECT * FROM tickets ORDER BY createdAt DESC`;
    console.log("GET /api/tickets - Técnico vendo todos os tickets");
  }
  
  db.all(query, params, (err, rows) => {
    if (err) {
      console.error("Erro ao buscar tickets:", err);
      return res.status(500).json({ error: 'Erro interno ao buscar tickets' });
    }
    res.json(rows);
  });
});

// Rota para criar um ticket
app.post('/api/tickets', authenticateToken, (req, res) => {
  console.log("POST /api/tickets - Rota acessada. Body da requisição:", req.body);
  console.log("POST /api/tickets - Dados do usuário (do token):", req.user);

  const { title, description, priority, category } = req.body;
  const { id: clientId, name: clientName, role, company: companyName } = req.user;

  if (role !== 'client') {
    console.warn("POST /api/tickets - Tentativa de criação por não-cliente:", req.user);
    return res.status(403).json({ error: 'Apenas clientes podem criar tickets' });
  }
  const createdAt = new Date().toISOString();
  
  console.log("POST /api/tickets - Dados a serem inseridos no DB:", 
    { title, description, priority: priority || 'medium', clientId, clientName, companyName, createdAt, category }
  );

  db.run(
    `INSERT INTO tickets (title, description, status, priority, clientId, clientName, companyName, createdAt, category) 
     VALUES (?, ?, 'open', ?, ?, ?, ?, ?, ?)`,
    [title, description, priority || 'medium', clientId, clientName, companyName, createdAt, category || 'other'],
    function(err) {
      if (err) {
        console.error("Erro ao inserir ticket:", err);
        return res.status(500).json({ error: 'Erro interno ao criar ticket' });
      }
      console.log("Ticket criado com sucesso. ID:", this.lastID);
      res.status(201).json({ id: this.lastID, success: true, message: 'Ticket criado com sucesso' });
    }
  );
});

// Rotas de clientes (apenas para técnicos/admin)
app.get('/api/clients', authenticateToken, (req, res) => {
  const { role } = req.user;
  if (role !== 'technician' && role !== 'admin') return res.status(403).json({ error: 'Acesso negado' });
  db.all(`SELECT id, name, email, company, createdAt FROM users WHERE role = 'client'`, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Rota para obter técnicos
app.get('/api/technicians', authenticateToken, (req, res) => {
  console.log("GET /api/technicians - Usuário:", req.user);
  
  // Buscar todos os usuários com role = 'technician'
  db.all(`SELECT id, name, email, createdAt FROM users WHERE role = 'technician'`, [], (err, technicians) => {
    if (err) {
      console.error("Erro ao buscar técnicos:", err);
      return res.status(500).json({ error: 'Erro interno ao buscar técnicos' });
    }
    
    // Adicionar informações extras para cada técnico
    const result = technicians.map(tech => {
      return {
        ...tech,
        isOnline: true, // Por padrão, todos estão online
        specialties: ['Software', 'Hardware', 'Redes'], // Especialidades padrão
        assignedTickets: 0, // Será calculado depois
        completedTickets: 0 // Será calculado depois
      };
    });
    
    // Para cada técnico, contar os tickets atribuídos e concluídos
    const promises = result.map(tech => {
      return new Promise((resolve) => {
        db.get(`SELECT COUNT(*) as assigned FROM tickets WHERE technicianId = ? AND status IN ('open', 'in_progress')`, 
          [tech.id], (err, assigned) => {
          if (!err && assigned) {
            tech.assignedTickets = assigned.assigned;
          }
          
          db.get(`SELECT COUNT(*) as completed FROM tickets WHERE technicianId = ? AND status = 'completed'`, 
            [tech.id], (err, completed) => {
            if (!err && completed) {
              tech.completedTickets = completed.completed;
            }
            resolve();
          });
        });
      });
    });
    
    Promise.all(promises).then(() => {
      res.json(result);
    });
  });
});

// Endpoint de health check para monitoramento
app.get('/healthz', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Auto-ping para manter o serviço ativo (prevenir hibernação)
const PING_INTERVAL = 10 * 60 * 1000; // 10 minutos em milissegundos
const RENDER_URL = 'https://hfs-backend.onrender.com';

// Função para fazer auto-ping no próprio serviço
function keepAlive() {
  console.log(`[${new Date().toISOString()}] Auto-ping para manter serviço ativo`);
  fetch(`${RENDER_URL}/healthz`)
    .then(response => {
      if (response.ok) {
        console.log(`[${new Date().toISOString()}] Auto-ping bem-sucedido: ${response.status}`);
      } else {
        console.error(`[${new Date().toISOString()}] Auto-ping falhou: ${response.status}`);
      }
    })
    .catch(error => {
      console.error(`[${new Date().toISOString()}] Erro no auto-ping:`, error.message);
    });
}

// Inicia o mecanismo de auto-ping após 1 minuto do servidor iniciar
setTimeout(() => {
  console.log(`[${new Date().toISOString()}] Iniciando mecanismo de auto-ping...`);
  keepAlive(); // Executa imediatamente na primeira vez
  setInterval(keepAlive, PING_INTERVAL); // Depois executa a cada intervalo
}, 60000);

app.get('/', (req, res) => {
  res.send('API HFS INFORMATICA rodando!');
});

app.listen(PORT, () => {
  console.log(`Servidor backend rodando na porta ${PORT}`);
});
