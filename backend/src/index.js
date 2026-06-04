const express = require('express');
const pool = require('./database')

const PORT = process.env.PORT || 3001;
const app = express();

app.get('/health', (req, res) => {
    return res.json('OK!');
})

app.get('/api/livros', async (req, res) => {
    const resultado = await pool.query('SELECT * FROM livros')
    return res.json(resultado.rows);
})

app.listen(PORT, () => {
    console.log('Servidor rodando na porta', PORT)
})