const express = require('express');
const pool = require('./database')

const PORT = process.env.PORT || 3001;
const app = express();

app.get('/health', (req, res) => {
    return res.json('OK!');
})

app.get('/pedidos', (req, res) => {
    return res.json('LISTA DE PEDIDOS')
})

app.listen(PORT, () => {
    console.log('Servidor rodando na porta', PORT)
})