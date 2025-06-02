@echo off
echo Iniciando o projeto completo...

echo.
echo [VERIFICACAO] Verificando estrutura do projeto...
call reorganize-project.bat

echo.
echo [VERIFICACAO] Verificando arquivo .env do backend...
if not exist backend\.env (
  echo Criando arquivo .env no backend...
  (
    echo # Configuracoes do servidor
    echo PORT=3000
    echo NODE_ENV=development
    echo.
    echo # Configuracoes do JWT
    echo JWT_SECRET=meu_segredo_super_secreto
    echo JWT_EXPIRES_IN=7d
    echo.
    echo # Configuracoes do Supabase
    echo SUPABASE_URL=https://gxmuywjmzdwswzebqggs.supabase.co
    echo SUPABASE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd4bXV5d2ptemR3c3d6ZWJxZ2dzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg3MjMxNjcsImV4cCI6MjA2NDI5OTE2N30.XQ1nW3xINThB6MWcx-XuJLMP3relXtbBPIb8-8i-r2U
  ) > backend\.env
  echo Arquivo .env criado com sucesso!
)

echo.
echo [BACKEND] Iniciando servidor backend...
start cmd /k "start-server.bat"

echo.
echo [FRONTEND] Iniciando aplicacao frontend...
start cmd /k "npm run dev"

echo.
echo Projeto iniciado com sucesso!
echo - Backend: http://localhost:3000
echo - Frontend: http://localhost:5173
echo.
echo Para parar os servidores, feche as janelas do terminal. 