import { AuthPayload } from '../src/middleware/authMiddleware';

export interface AuthPayload {
  userId: string;
  role: 'mother' | 'admin' | 'health-worker';
}

import { Request } from 'express';

export interface AuthRequest extends Request {
  user?: AuthPayload;
}
declare global {
  namespace Express {
    interface Request {
      user?: AuthPayload;
    }
  }
}