FROM node:24

# Diretório da aplicação
WORKDIR /app

# Copia os arquivos de dependência
COPY package*.json ./

# Instala dependências
RUN npm install

# Copia o restante do projeto
COPY . .

# Porta usada pelo Express
EXPOSE 3001

# Inicia a aplicação
CMD ["node", "index.js"]