const dotenv = require('dotenv');
const { Pool } = require('pg');
dotenv.config();

const pool = new Pool({
    host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
})

async function inicializarBanco(tentativas = 5) {
  try {
    await pool.query(`CREATE TABLE IF NOT EXISTS livros (
      id SERIAL PRIMARY KEY,
      titulo TEXT NOT NULL,
      genero TEXT NOT NULL,
      sinopse TEXT NOT NULL,
      estado TEXT CHECK(estado IN ('NOVO', 'USADO_BOM', 'USADO_EXCELENTE', 'RECONDICIONADO')) NOT NULL,
      status BOOLEAN NOT NULL,
      preco NUMERIC(10,2) NOT NULL
    );`)
  
    await pool.query(`
    INSERT INTO livros(titulo, genero, sinopse, estado, status, preco)
    VALUES ('It, A coisa', 'Terror', 'sinopse livro', 'USADO_BOM', 'true', '50.00')`)
  
    await pool.query(`
      INSERT INTO livros(titulo, genero, sinopse, estado, status, preco)
      VALUES ('Caminho dos Reis', 'Fantasia', 'sinopse livro 2', 'NOVO', 'true', '100.00')
      `)

    console.log('Banco de dados inicializado com sucesso!');
  } catch (error) {
    if (tentativas > 0) {
      console.warn(`Erro ao inicializar o banco de dados. Tentando novamente em 5 segundos... (${tentativas} tentativas restantes)`);
      setTimeout(() => inicializarBanco(tentativas - 1), 5000);
    } else {
      console.error('Não foi possível inicializar o banco de dados após várias tentativas:', error);
    }
  }
}

inicializarBanco();

module.exports = pool;