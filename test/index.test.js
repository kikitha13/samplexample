const request = require('supertest');
const app = require('../index'); // imports app without starting server

describe('GET /', () => {
  it('should return upload form', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.text).toContain('Upload File');
  });
});
