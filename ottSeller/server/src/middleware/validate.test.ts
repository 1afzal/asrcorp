import { describe, expect, it, vi } from 'vitest';
import type { Request, Response } from 'express';
import { z } from 'zod';
import { validateBody } from './validate';

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

describe('validateBody', () => {
  const schema = z.object({
    email: z.string().email(),
    age: z.number().int().min(18),
  });

  it('passes a valid payload through and replaces req.body with parsed data', () => {
    const middleware = validateBody(schema);
    const next = vi.fn();
    const req = { body: { email: 'a@b.com', age: 25 } } as Request;
    const res = makeRes();

    middleware(req, res, next);

    expect(next).toHaveBeenCalledOnce();
    expect(req.body).toEqual({ email: 'a@b.com', age: 25 });
  });

  it('rejects an invalid payload with 400 and field errors, never calling next', () => {
    const middleware = validateBody(schema);
    const next = vi.fn();
    const req = { body: { email: 'not-an-email', age: 12 } } as Request;
    const res = makeRes();

    middleware(req, res, next);

    expect(next).not.toHaveBeenCalled();
    expect(res.statusCode).toBe(400);
    const body = res.body as { error: string; details: Record<string, string[]> };
    expect(body.error).toBe('Validation failed');
    expect(Object.keys(body.details)).toEqual(expect.arrayContaining(['email', 'age']));
  });

  it('rejects when required fields are missing', () => {
    const middleware = validateBody(schema);
    const next = vi.fn();
    const req = { body: {} } as Request;
    const res = makeRes();

    middleware(req, res, next);

    expect(next).not.toHaveBeenCalled();
    expect(res.statusCode).toBe(400);
  });
});
