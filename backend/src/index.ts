import express from 'express';
import cors from 'cors';
import { config, corsOptions, initializeConfig, supabase } from './config';
import routes from './routes';

// Função principal para iniciar o servidor
async function startServer() {
  try {
    // Inicializa as configurações
    await initializeConfig();
    
    // Inicializa o Express
    const app = express();
    const port = config.server.port;
    
    // Middlewares
    app.use(cors(corsOptions));
    app.use(express.json());
    
    // Rotas
    app.use('/api', routes);
    
    // Rota de teste
    app.get('/', (req, res) => {
      res.json({ 
        message: 'API está funcionando!',
        environment: config.server.env,
        version: '1.0.0'
      });
    });
    
    // Rota para testar a conexão com o Supabase
    app.get('/api/test-db', async (req, res) => {
      try {
        const { data, error } = await supabase
          .from('users')
          .select('id, name, email')
          .limit(1);
        
        if (error) {
          console.error('Erro ao conectar com Supabase:', error);
          res.status(500).json({ 
            error: error.message,
            details: error.details,
            hint: error.hint
          });
          return;
        }
        
        res.json({ 
          success: true, 
          message: 'Conexão com Supabase estabelecida com sucesso!',
          data 
        });
      } catch (error) {
        console.error('Erro ao testar conexão:', error);
        res.status(500).json({ 
          error: 'Erro ao testar conexão com o banco de dados',
          details: error instanceof Error ? error.message : String(error)
        });
      }
    });
    
    // Inicia o servidor
    app.listen(port, () => {
      console.log(`Servidor rodando na porta ${port}`);
      console.log(`Ambiente: ${config.server.env}`);
      console.log(`URL Supabase: ${config.supabase.url}`);
      console.log(`API disponível em: http://localhost:${port}`);
      console.log(`Teste de conexão com Supabase: http://localhost:${port}/api/test-db`);
    });
  } catch (error) {
    console.error('Erro ao iniciar o servidor:', error);
    process.exit(1);
  }
}

// Inicia o servidor
startServer(); 