import { Request, Response, NextFunction } from 'express';

export const logger = (req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();
  next();
  const ms = Date.now() - start;
  console.log(`${req.method} ${req.originalUrl} - ${ms}ms`);
};

export const checkToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  if (token !== 'Bearer secret') {
    return res.status(403).json({ message: 'Forbidden' });
  }
  next();
};
