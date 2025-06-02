@echo off
echo Organizando estrutura do projeto...

rem Remover pastas de backend duplicadas na raiz do projeto
if exist src\routes rmdir /s /q src\routes
if exist src\controllers rmdir /s /q src\controllers
if exist src\middleware rmdir /s /q src\middleware
if exist src\services rmdir /s /q src\services
if exist src\config rmdir /s /q src\config
if exist src\utils\db-init.js del /q src\utils\db-init.js

echo Estrutura organizada com sucesso!
echo.
echo Agora você tem:
echo - Frontend na pasta raiz (src/ com React)
echo - Backend na pasta backend/ (com Express)
echo.
echo Para iniciar o backend use: start-server.bat
echo Para iniciar o frontend use: npm run dev 