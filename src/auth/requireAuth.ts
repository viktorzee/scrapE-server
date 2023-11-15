import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const secret_key = process.env.secret_key as string;

export const requireAuth = async (req:Request, res:Response, next: NextFunction) => {
  const authorizationHeader = req.headers.authorization;
  try {
    if (authorizationHeader && authorizationHeader.startsWith('Bearer')) {
  
      const token = authorizationHeader.split(' ')[1]
      if(token){
        jwt.verify(token, secret_key, (err, decoded) => {
          if (err) {
            res.status(401).json({ message: 'Unauthorized' });
          } else {
            // User is authenticated; you can access user information in `decoded`
            (req as any).user = decoded;
            next();
          }
        });
      }
      else {
       res.status(401).json({ message: 'Unauthorized' });
      }
    }
    
  } catch (error) {    
    res.status(401).json({ message: 'Unauthorized, please login' });
  }
}