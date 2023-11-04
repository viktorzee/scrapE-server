import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';


function requireAuth(req:Request, res:Response, next: NextFunction) {
  const token = req.header('Authorization');

  if (token) {
    jwt.verify(token, 'your-secret-key', (err, decoded) => {
      if (err) {
        res.status(401).json({ message: 'Unauthorized' });
      } else {
        // User is authenticated; you can access user information in `decoded`
        (req as any).user = decoded;
        next();
      }
    });
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
}

exports.module = { requireAuth }