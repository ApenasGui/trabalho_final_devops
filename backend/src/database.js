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
    await pool.query(`
      INSERT INTO livros(titulo, genero, autor, estado, status, preco)
      VALUES ('It, A coisa', 'Terror', 'Stephen King', 'USADO_BOM', 'true', '50.00')
      ON CONFLICT (titulo) DO NOTHING`)
  
    await pool.query(`
      INSERT INTO livros(titulo, genero, autor, estado, status, preco)
      VALUES ('Caminho dos Reis', 'Fantasia', 'Brandon Sanderson', 'NOVO', 'true', '100.00')
      ON CONFLICT (titulo) DO NOTHING`)

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