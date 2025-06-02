@echo off
echo Restaurando configuracao original do Vite...

if exist vite.config.ts.backup (
  echo Restaurando configuracao original...
  copy vite.config.ts.backup vite.config.ts
  echo Configuracao original restaurada com sucesso!
) else (
  echo Backup da configuracao original nao encontrado!
  echo Execute primeiro o script use-simple-config.bat para criar um backup.
)

echo Para iniciar o frontend, execute: npm run dev 