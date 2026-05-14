import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

declare module 'express-serve-static-core' {
  interface Request {
    admin?: { email: string };
  }
}

export function requireAdmin(req: Request, res: Response, next: NextFunction) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;
  if (!token) return res.status(401).json({ error: 'Missing token' });

  const secret = process.env.JWT_SECRET;
  if (!secret) {
    return res.status(500).json({ error: 'JWT_SECRET not configured on server' });
  }

  try {
    const decoded = jwt.verify(token, secret) as { email: string; role: string };
    if (decoded.role !== 'admin') {
      return res.status(403).json({ error: 'Forbidden' });
    }
    req.admin = { email: decoded.email };
    next();
  } catch {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
}
