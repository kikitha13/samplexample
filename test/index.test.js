const request = require('supertest');
const app = require('../index'); // import app from index.js

describe('GET /', () => {
  it('should return upload form', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.text).toContain('Upload File');
  });
});
