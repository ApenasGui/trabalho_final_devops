const supertest = require("supertest")
const app = require("../src/app")
const pool = require('../src/database')

jest.mock('../src/database', () => ({
    query: jest.fn()
}));

pool.query.mockResolvedValue({ rows: [] })

test('teste de health', async () => {
    const res = await supertest(app).get('/health')
    expect(res.statusCode).toBe(200)
})

test('deve retornar um array com os livros', async () => {
    const res = await supertest(app).get('/api/livros')
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
})