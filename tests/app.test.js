const request = require('supertest');
const app = require('../src/server');

describe('E-commerce monolith smoke tests', () => {
  test('GET / returns welcome message', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.text).toContain('E-Commerce Monolith');
  });

  test('GET /products returns products', async () => {
    const res = await request(app).get('/products');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
