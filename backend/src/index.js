const express = require('express');
const pool = require('./database')

const PORT = process.env.PORT || 3001;
const app = express();
app.use(express.json());

app.get('/health', (req, res) => {
    return res.json('OK!');
})

app.get('/api/livros', async (req, res) => {
    const resultado = await pool.query('SELECT * FROM livros')
    return res.json(resultado.rows);
})

app.post('/api/livros', async (req, res) => {
    const { titulo, genero, sinopse, estado, status, preco } = req.body;
    const resultado = await pool.query(`
        INSERT INTO livros(titulo, genero, sinopse, estado, status, preco)
        VALUES ($1, $2, $3, $4, $5, $6) RETURNING *
    `, [titulo, genero, sinopse, estado, status, preco])
    return res.json(resultado.rows[0]);
})

app.listen(PORT, () => {
    console.log('Servidor rodando na porta', PORT)
})