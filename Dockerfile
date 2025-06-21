# Dockerfile para o frontend
FROM node:18-alpine as build

# Define o diretório de trabalho
WORKDIR /app

# Copia os arquivos de dependências
COPY package*.json ./

# Instala as dependências
RUN npm ci --only=production

# Copia o código fonte
COPY . .

# Constrói a aplicação
RUN npm run build

# Estágio de produção
FROM nginx:alpine

# Copia os arquivos construídos
COPY --from=build /app/dist /usr/share/nginx/html

# Copia a configuração do nginx
COPY nginx.conf /etc/nginx/nginx.conf

# Expõe a porta 80
EXPOSE 80

# Inicia o nginx
CMD ["nginx", "-g", "daemon off;"] 