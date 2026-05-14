import { describe, expect, it, vi } from 'vitest';
import type { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { requireAdmin } from './auth';

const SECRET = process.env.JWT_SECRET as string;

function makeReq(authorization?: string): Request {
  return { headers: authorization ? { authorization } : {} } as unknown as Request;
}

function makeRes() {
  const res = {
    statusCode: 200,
    body: undefined as unknown,
    status(code: number) {
      res.statusCode = code;
      return res;
    },
    json(payload: unknown) {
      res.body = payload;
      return res;
    },
  };
  return res as unknown as Response & { statusCode: number; body: unknown };
}

describe('requireAdmin', () => {
  it('passes through with a valid admin token', () => {
    const token = jwt.sign({ email: 'admin@test.local', role: 'admin' }, SECRET);
    const req = makeReq(`Bearer ${token}`);
    const res = makeRes();
    const next = vi.fn();

    requireAdmin(req, res, next);

    expect(next).toHaveBeenCalledOnce();
    expect(req.admin?.email).toBe('admin@test.local');
  });

  it('returns 401 when the Authorization header is missing', () => {
    const req = makeReq();
    const res = makeRes();
    const next = vi.fn();

    requireAdmin(req, res, next);

    expect(next).not.toHaveBeenCalled();
    expect(res.statusCode).toBe(401);
  });

  it('returns 401 when the token is malformed', () => {
    const req = makeReq('Bearer not-a-real-jwt');
    const res = makeRes();
    const next = vi.fn();

    requireAdmin(req, res, next);

    expect(next).not.toHaveBeenCalled();
    expect(res.statusCode).toBe(401);
  });

  it('returns 401 when the token is signed with the wrong secret', () => {
    const token = jwt.sign({ email: 'admin@test.local', role: 'admin' }, 'wrong-secret');
    const req = makeReq(`Bearer ${token}`);
    const res = makeRes();
    const next = vi.fn();

    requireAdmin(req, res, next);

    expect(next).not.toHaveBeenCalled();
    expect(res.statusCode).toBe(401);
  });

  it('returns 403 when the token is valid but role is not admin', () => {
    const token = jwt.sign({ email: 'user@test.local', role: 'user' }, SECRET);
    const req = makeReq(`Bearer ${token}`);
    const res = makeRes();
    const next = vi.fn();

    requireAdmin(req, res, next);

    expect(next).not.toHaveBeenCalled();
    expect(res.statusCode).toBe(403);
  });

  it('returns 401 when the token is expired', () => {
    const token = jwt.sign({ email: 'admin@test.local', role: 'admin' }, SECRET, {
      expiresIn: -1,
    });
    const req = makeReq(`Bearer ${token}`);
    const res = makeRes();
    const next = vi.fn();

    requireAdmin(req, res, next);

    expect(next).not.toHaveBeenCalled();
    expect(res.statusCode).toBe(401);
  });
});
