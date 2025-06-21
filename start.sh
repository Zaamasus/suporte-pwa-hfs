#!/bin/sh

# Inicia o backend em background
cd /app/backend
node dist/index.js &

# Inicia o nginx
nginx -g "daemon off;" 