# Migração para Supabase

Este projeto agora suporta o uso do Supabase como banco de dados alternativo ao SQLite original.

## Configuração

Para usar o Supabase, você precisa:

1. Criar uma conta no [Supabase](https://supabase.com/)
2. Criar um novo projeto
3. Configurar o arquivo `.env` com as seguintes variáveis:

```
# Ativar o uso do Supabase (true para usar Supabase, false para SQLite)
USE_SUPABASE=true

# Credenciais do Supabase (obrigatório se USE_SUPABASE=true)
SUPABASE_URL=https://seu-projeto.supabase.co
SUPABASE_KEY=sua-chave-supabase
```

## Estrutura do Banco de Dados

Você precisa criar as seguintes tabelas no Supabase:

### Tabela `users`

| Coluna | Tipo | Descrição |
|--------|------|-----------|
| id | uuid | Chave primária |
| name | text | Nome do usuário |
| email | text | Email do usuário (único) |
| password | text | Senha hash do usuário |
| role | text | Papel do usuário (client, technician, admin) |
| company | text | Nome da empresa (para clientes) |
| createdAt | timestamp | Data de criação |

SQL para criar a tabela:

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'client',
  company TEXT,
  createdAt TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Criar índice para pesquisa por email
CREATE INDEX idx_users_email ON users(email);
```

### Tabela `tickets`

| Coluna | Tipo | Descrição |
|--------|------|-----------|
| id | uuid | Chave primária |
| title | text | Título do ticket |
| description | text | Descrição do ticket |
| status | text | Status do ticket (open, in_progress, completed) |
| priority | text | Prioridade (low, medium, high) |
| clientId | uuid | ID do cliente que criou o ticket |
| clientName | text | Nome do cliente |
| companyName | text | Nome da empresa do cliente |
| technicianId | uuid | ID do técnico responsável (opcional) |
| technicianName | text | Nome do técnico (opcional) |
| createdAt | timestamp | Data de criação |
| updatedAt | timestamp | Data de atualização |
| category | text | Categoria do ticket |
| history | jsonb | Histórico de ações no ticket |

SQL para criar a tabela:

```sql
CREATE TABLE tickets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'open',
  priority TEXT DEFAULT 'medium',
  clientId UUID REFERENCES users(id),
  clientName TEXT,
  companyName TEXT,
  technicianId UUID REFERENCES users(id),
  technicianName TEXT,
  createdAt TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updatedAt TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  category TEXT,
  history JSONB DEFAULT '[]'::jsonb
);

-- Criar índices para pesquisas comuns
CREATE INDEX idx_tickets_client ON tickets(clientId);
CREATE INDEX idx_tickets_technician ON tickets(technicianId);
CREATE INDEX idx_tickets_company ON tickets(companyName);
CREATE INDEX idx_tickets_status ON tickets(status);
```

## Políticas de Segurança

Recomendamos configurar políticas de segurança no Supabase para controlar o acesso aos dados. O acesso aos dados é gerenciado pela API Express, mas essas políticas adicionam uma camada extra de segurança.

```sql
-- Exemplo de política para tickets
CREATE POLICY "Técnicos podem ver todos os tickets" ON tickets
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM users
    WHERE users.id = auth.uid() AND users.role IN ('technician', 'admin')
  )
);

CREATE POLICY "Clientes só veem tickets de sua empresa" ON tickets
FOR SELECT USING (
  companyName IN (
    SELECT company FROM users
    WHERE users.id = auth.uid() AND users.role = 'client'
  )
);
```

## Migrando Dados Existentes

Para migrar dados do SQLite para o Supabase, você pode usar um script como este:

```javascript
const sqlite3 = require('sqlite3').verbose();
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

// Configuração Supabase
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

// Conectar ao SQLite
const db = new sqlite3.Database('./hfs.db');

// Migrar usuários
db.all(`SELECT * FROM users`, [], async (err, users) => {
  if (err) {
    console.error('Erro ao buscar usuários:', err);
    return;
  }
  
  for (const user of users) {
    const { error } = await supabase.from('users').insert([user]);
    if (error) console.error('Erro ao inserir usuário:', error);
  }
  
  console.log(`${users.length} usuários migrados`);
});

// Migrar tickets
db.all(`SELECT * FROM tickets`, [], async (err, tickets) => {
  if (err) {
    console.error('Erro ao buscar tickets:', err);
    return;
  }
  
  for (const ticket of tickets) {
    const { error } = await supabase.from('tickets').insert([ticket]);
    if (error) console.error('Erro ao inserir ticket:', error);
  }
  
  console.log(`${tickets.length} tickets migrados`);
});
``` 