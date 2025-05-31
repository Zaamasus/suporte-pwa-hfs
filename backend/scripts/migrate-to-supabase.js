/**
 * Script de migração de dados do SQLite para o Supabase
 * 
 * Uso: 
 * 1. Configure o arquivo .env com as credenciais do Supabase
 * 2. Execute: node scripts/migrate-to-supabase.js
 */

require('dotenv').config();
const sqlite3 = require('sqlite3').verbose();
const { createClient } = require('@supabase/supabase-js');
const path = require('path');

// Verificar se as variáveis de ambiente estão configuradas
if (!process.env.SUPABASE_URL || !process.env.SUPABASE_KEY) {
  console.error('❌ Erro: As variáveis SUPABASE_URL e SUPABASE_KEY devem estar definidas no arquivo .env');
  process.exit(1);
}

// Configuração do Supabase
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

// Caminho para o banco de dados SQLite
const dbPath = path.resolve(__dirname, '../hfs.db');

// Conectar ao SQLite
const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READONLY, (err) => {
  if (err) {
    console.error('❌ Erro ao conectar ao banco de dados SQLite:', err.message);
    process.exit(1);
  }
  console.log('✅ Conectado ao banco de dados SQLite');
});

// Função principal de migração
async function migrate() {
  console.log('🚀 Iniciando migração de dados para o Supabase...');

  try {
    // Migrar usuários
    await migrateUsers();
    
    // Migrar tickets
    await migrateTickets();
    
    console.log('✅ Migração concluída com sucesso!');
  } catch (error) {
    console.error('❌ Erro durante a migração:', error);
  } finally {
    // Fechar conexão com SQLite
    db.close((err) => {
      if (err) {
        console.error('Erro ao fechar conexão SQLite:', err.message);
      }
      console.log('Conexão SQLite fechada');
    });
  }
}

// Função para migrar usuários
function migrateUsers() {
  return new Promise((resolve, reject) => {
    db.all(`SELECT * FROM users`, [], async (err, users) => {
      if (err) {
        console.error('❌ Erro ao buscar usuários do SQLite:', err);
        return reject(err);
      }
      
      console.log(`📊 Encontrados ${users.length} usuários para migrar`);
      
      // Contador de sucesso
      let successCount = 0;
      
      for (const user of users) {
        try {
          // Checar se o usuário já existe
          const { data: existingUser } = await supabase
            .from('users')
            .select('email')
            .eq('email', user.email)
            .maybeSingle();
          
          if (existingUser) {
            console.log(`⚠️ Usuário já existe no Supabase: ${user.email}`);
            continue;
          }
          
          // Inserir usuário
          const { error } = await supabase
            .from('users')
            .insert([{
              // Se o Supabase usar UUID, não envie o ID numérico do SQLite
              name: user.name,
              email: user.email,
              password: user.password,
              role: user.role,
              company: user.company,
              createdAt: user.createdAt || new Date().toISOString()
            }]);
          
          if (error) {
            console.error(`❌ Erro ao inserir usuário ${user.email}:`, error);
          } else {
            successCount++;
            process.stdout.write(`\r🔄 Migrados ${successCount}/${users.length} usuários`);
          }
        } catch (error) {
          console.error(`❌ Erro ao processar usuário ${user.email}:`, error);
        }
      }
      
      console.log(`\n✅ Migração de usuários concluída. ${successCount}/${users.length} usuários migrados com sucesso.`);
      resolve();
    });
  });
}

// Função para migrar tickets
function migrateTickets() {
  return new Promise((resolve, reject) => {
    db.all(`SELECT * FROM tickets`, [], async (err, tickets) => {
      if (err) {
        console.error('❌ Erro ao buscar tickets do SQLite:', err);
        return reject(err);
      }
      
      console.log(`📊 Encontrados ${tickets.length} tickets para migrar`);
      
      // Contador de sucesso
      let successCount = 0;
      
      for (const ticket of tickets) {
        try {
          // Verificar se o ticket já existe
          const { data: existingTicket } = await supabase
            .from('tickets')
            .select('id')
            .eq('title', ticket.title)
            .eq('clientId', ticket.clientId)
            .eq('createdAt', ticket.createdAt)
            .maybeSingle();
          
          if (existingTicket) {
            console.log(`⚠️ Ticket já existe no Supabase: ${ticket.title}`);
            continue;
          }
          
          // Preparar histórico (se não existir, criar um padrão)
          let history = ticket.history;
          if (!history) {
            history = [{
              id: `h${Date.now()}`,
              message: 'Chamado importado',
              createdAt: new Date().toISOString(),
              createdBy: {
                id: 'system',
                name: 'Sistema',
                role: 'system'
              }
            }];
          }
          
          // Inserir ticket
          const { error } = await supabase
            .from('tickets')
            .insert([{
              // Se o Supabase usar UUID, não envie o ID numérico do SQLite
              title: ticket.title,
              description: ticket.description,
              status: ticket.status || 'open',
              priority: ticket.priority || 'medium',
              clientId: ticket.clientId,
              clientName: ticket.clientName,
              companyName: ticket.companyName,
              technicianId: ticket.technicianId,
              technicianName: ticket.technicianName,
              createdAt: ticket.createdAt || new Date().toISOString(),
              updatedAt: ticket.updatedAt || new Date().toISOString(),
              category: ticket.category || 'other',
              history: history
            }]);
          
          if (error) {
            console.error(`❌ Erro ao inserir ticket ${ticket.title}:`, error);
          } else {
            successCount++;
            process.stdout.write(`\r🔄 Migrados ${successCount}/${tickets.length} tickets`);
          }
        } catch (error) {
          console.error(`❌ Erro ao processar ticket ${ticket.title}:`, error);
        }
      }
      
      console.log(`\n✅ Migração de tickets concluída. ${successCount}/${tickets.length} tickets migrados com sucesso.`);
      resolve();
    });
  });
}

// Executar migração
migrate().catch(console.error); 