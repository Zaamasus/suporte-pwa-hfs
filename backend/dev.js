/**
 * Script para iniciar o servidor em modo de desenvolvimento
 * Não depende da compilação TypeScript, usa diretamente o ts-node
 */
const { spawn } = require('child_process');
const path = require('path');

// Caminho para o arquivo principal
const mainFile = path.join(__dirname, 'src', 'index.ts');

// Comando para iniciar o servidor com ts-node-dev
const serverProcess = spawn('npx', ['ts-node-dev', '--respawn', '--transpile-only', mainFile], {
  stdio: 'inherit',
  shell: true
});

// Lidar com sinais para encerrar corretamente
process.on('SIGINT', () => {
  console.log('Encerrando servidor...');
  serverProcess.kill('SIGINT');
  process.exit(0);
});

console.log('Servidor iniciado em modo de desenvolvimento');
console.log('Pressione Ctrl+C para encerrar'); 