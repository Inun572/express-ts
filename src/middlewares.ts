import { Request, Response, NextFunction } from 'express';

export const logger = (req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();
  next();
  const ms = Date.now() - start;
  console.log(`${req.method} ${req.originalUrl} - ${ms}ms`);
};
