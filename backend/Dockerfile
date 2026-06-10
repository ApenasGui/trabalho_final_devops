FROM node:22-alpine

# Diretório da aplicação
WORKDIR /app

# Copia os arquivos de dependência
COPY package*.json ./

# Instala dependências
RUN npm install --production

# Copia o restante do projeto
COPY . .

# Porta usada pelo Express
EXPOSE 3001

# Inicia a aplicação
CMD ["node", "src/index.js"]