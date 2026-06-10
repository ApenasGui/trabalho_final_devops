# 📚 Sebo de Livros — Trabalho Final DevOps

Aplicação full-stack containerizada de um sebo de livros, desenvolvida como trabalho final da disciplina de DevOps. O projeto contempla backend Node.js, frontend React, banco de dados PostgreSQL, orquestração com Docker Compose e pipeline de CI/CD com GitHub Actions.

---

## 🛠️ Tecnologias

| Camada | Tecnologia |
|--------|-----------|
| Backend | Node.js + Express |
| Frontend | React + Vite |
| Banco de dados | PostgreSQL 15 |
| Containerização | Docker + Docker Compose |
| CI/CD | GitHub Actions |
| Servidor web | Nginx (produção) |

---

## 📁 Estrutura do Projeto

```
.
├── backend/
│   ├── src/
│   │   ├── app.js          # Configuração do Express
│   │   ├── index.js        # Entrada da aplicação
│   │   └── database.js     # Conexão com PostgreSQL
│   ├── tests/
│   │   └── app.test.js     # Testes automatizados
│   └── Dockerfile
├── frontend/
│   ├── src/
│   │   └── ...             # Componentes React
│   └── Dockerfile
├── database/
│   └── init.sql            # Script de inicialização do banco
├── .github/
│   └── workflows/
│       └── ci.yml          # Pipeline de CI/CD
├── docker-compose.yml
├── .env.example
└── README.md
```

---

## 🚀 Como executar

### Pré-requisitos

- [Docker](https://www.docker.com/) instalado
- [Docker Compose](https://docs.docker.com/compose/) instalado

### 1. Clone o repositório

```bash
git clone https://github.com/ApenasGui/trabalho_final_devops.git
cd trabalho_final_devops
```

### 2. Configure as variáveis de ambiente

```bash
cp .env.example .env
```

Edite o `.env` com suas configurações:

```env
POSTGRES_USER=user
POSTGRES_PASSWORD=sua_senha
POSTGRES_DB=trabalho_devops
DB_HOST=postgres
DB_PORT=5432
DB_USER=user
DB_PASSWORD=sua_senha
DB_NAME=trabalho_devops
VITE_API_URL=http://localhost:3001
```

### 3. Suba os containers

```bash
docker compose up --build
```

### 4. Acesse a aplicação

| Serviço | URL |
|---------|-----|
| Frontend | http://localhost:3000 |
| Backend | http://localhost:3001 |
| Health check | http://localhost:3001/health |

---

## 📡 Endpoints da API

| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/health` | Verifica se o servidor está online |
| GET | `/api/livros` | Lista todos os livros |
| POST | `/api/livros` | Cadastra um novo livro |

### Exemplo de criação de livro

```bash
curl -X POST http://localhost:3001/api/livros \
  -H "Content-Type: application/json" \
  -d '{
    "titulo": "Dom Casmurro",
    "genero": "Romance",
    "autor": "Machado de Assis",
    "estado": "NOVO",
    "status": true,
    "preco": 35.00
  }'
```

---

## 🧪 Testes

```bash
cd backend
npm test
```

---

## 🔄 CI/CD

O projeto utiliza GitHub Actions com três jobs:

- **test** — instala dependências e roda os testes automatizados
- **build** — builda o frontend e as imagens Docker
- **deploy** — publica as imagens no Docker Hub com tag `latest` e SHA do commit

O pipeline é disparado a cada push ou pull request na branch `main`.

---

## 🗄️ Banco de Dados

O banco é inicializado automaticamente pelo script `database/init.sql` ao subir os containers. Os dados persistem entre reinicializações graças ao volume nomeado `postgres_data`.

### Estrutura da tabela `livros`

| Coluna | Tipo | Descrição |
|--------|------|-----------|
| id | SERIAL | Identificador único |
| titulo | TEXT | Título do livro (único) |
| genero | TEXT | Gênero literário |
| autor | TEXT | Nome do autor |
| estado | TEXT | NOVO, USADO_BOM, USADO_EXCELENTE, RECONDICIONADO |
| status | BOOLEAN | Disponível (true) ou indisponível (false) |
| preco | NUMERIC | Preço de venda |

---

## 📝 Padrão de Commits

O projeto segue o padrão [Conventional Commits](https://www.conventionalcommits.org/):

| Prefixo | Uso |
|---------|-----|
| `feat:` | Nova funcionalidade |
| `fix:` | Correção de bug |
| `ci:` | Alterações no pipeline |
| `chore:` | Tarefas de manutenção |
| `refactor:` | Refatoração de código |
| `test:` | Adição ou correção de testes |
| `docs:` | Documentação |
