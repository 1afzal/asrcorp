import { describe, expect, it, beforeEach } from 'vitest';
import express from 'express';
import request from 'supertest';
import jwt from 'jsonwebtoken';
import adminRouter from './admin';

function makeApp() {
  const app = express();
  app.use(express.json());
  app.use('/api/admin', adminRouter);
  return app;
}

describe('POST /api/admin/login', () => {
  let app: ReturnType<typeof makeApp>;

  beforeEach(() => {
    app = makeApp();
  });

  it('returns a signed JWT for the configured admin credentials', async () => {
    const res = await request(app)
      .post('/api/admin/login')
      .send({ email: 'admin@test.local', password: 'test-password-12345' });

    expect(res.status).toBe(200);
    expect(typeof res.body.token).toBe('string');
    expect(res.body.email).toBe('admin@test.local');

    const decoded = jwt.verify(res.body.token, process.env.JWT_SECRET as string) as {
      email: string;
      role: string;
    };
    expect(decoded.role).toBe('admin');
    expect(decoded.email).toBe('admin@test.local');
  });

  it('is case-insensitive on the email', async () => {
    const res = await request(app)
      .post('/api/admin/login')
      .send({ email: 'ADMIN@TEST.LOCAL', password: 'test-password-12345' });

    expect(res.status).toBe(200);
  });

  it('rejects an unknown email with 401', async () => {
    const res = await request(app)
      .post('/api/admin/login')
      .send({ email: 'someone-else@test.local', password: 'test-password-12345' });

    expect(res.status).toBe(401);
    expect(res.body.error).toBe('Invalid email or password');
  });

  it('rejects a wrong password with 401', async () => {
    const res = await request(app)
      .post('/api/admin/login')
      .send({ email: 'admin@test.local', password: 'wrong' });

    expect(res.status).toBe(401);
  });

  it('returns 400 with field errors when the payload is malformed', async () => {
    const res = await request(app)
      .post('/api/admin/login')
      .send({ email: 'not-an-email' });

    expect(res.status).toBe(400);
    expect(res.body.error).toBe('Validation failed');
  });
});

describe('GET /api/admin/me', () => {
  it('returns 401 without a token', async () => {
    const app = makeApp();
    const res = await request(app).get('/api/admin/me');
    expect(res.status).toBe(401);
  });

  it('returns the admin email when given a valid token', async () => {
    const app = makeApp();
    const token = jwt.sign(
      { email: 'admin@test.local', role: 'admin' },
      process.env.JWT_SECRET as string,
    );
    const res = await request(app).get('/api/admin/me').set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.email).toBe('admin@test.local');
  });
});
