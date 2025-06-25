#!/bin/sh

# Função para encerrar processos quando o container for parado
cleanup() {
    echo "Encerrando aplicação..."
    kill $BACKEND_PID 2>/dev/null
    nginx -s quit 2>/dev/null
    exit 0
}

# Captura sinais de encerramento
trap cleanup SIGTERM SIGINT

# Inicia o backend em background
echo "Iniciando backend..."
cd /app/backend
node dist/index.js &
BACKEND_PID=$!

# Aguarda um pouco para o backend inicializar
sleep 2

# Verifica se o backend está rodando
if ! kill -0 $BACKEND_PID 2>/dev/null; then
    echo "Erro: Backend não conseguiu iniciar"
    exit 1
fi

echo "Backend iniciado com PID: $BACKEND_PID"

# Inicia o nginx em foreground (processo principal do container)
echo "Iniciando nginx..."
nginx -c /etc/nginx/nginx.conf -g "daemon off;"

echo "Aplicação iniciada com sucesso!"
echo "Backend PID: $BACKEND_PID"

# Aguarda indefinidamente
wait 