@echo off
echo Alternando para configuracao simplificada do Vite...

if exist vite.config.ts (
  echo Fazendo backup da configuracao atual...
  copy vite.config.ts vite.config.ts.backup
  echo Backup criado em vite.config.ts.backup
)

echo Aplicando configuracao simplificada...
copy vite.config.ts.simple vite.config.ts

echo Configuracao simplificada aplicada com sucesso!
echo Para iniciar o frontend, execute: npm run dev 