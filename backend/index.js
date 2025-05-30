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
    createdAt TEXT,
    category TEXT
  )`);
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
  const { email, password } = req.body;
  db.get(`SELECT * FROM users WHERE email = ?`, [email], (err, user) => {
    if (err || !user) {
      return res.status(401).json({ error: 'Email ou senha inválidos' });
    }
    if (!bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ error: 'Email ou senha inválidos' });
    }
    const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, SECRET, { expiresIn: '8h' });
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

// Rotas de tickets
app.get('/api/tickets', authenticateToken, (req, res) => {
  const { role, id } = req.user;
  let sql = 'SELECT * FROM tickets';
  let params = [];
  if (role === 'client') {
    sql += ' WHERE clientId = ?';
    params.push(id);
  }
  db.all(sql, params, (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.post('/api/tickets', authenticateToken, (req, res) => {
  const { title, description, priority, category } = req.body;
  const { id, name, role } = req.user;
  if (role !== 'client') return res.status(403).json({ error: 'Apenas clientes podem criar tickets' });
  const createdAt = new Date().toISOString();
  db.run(
    `INSERT INTO tickets (title, description, status, priority, clientId, clientName, createdAt, category) VALUES (?, ?, 'open', ?, ?, ?, ?, ?)`,
    [title, description, priority || 'medium', id, name, createdAt, category],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: this.lastID, title, description, status: 'open', priority, clientId: id, clientName: name, createdAt, category });
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

app.get('/', (req, res) => {
  res.send('API HFS INFORMATICA rodando!');
});

app.listen(PORT, () => {
  console.log(`Servidor backend rodando na porta ${PORT}`);
});
