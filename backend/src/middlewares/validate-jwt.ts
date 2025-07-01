declare global {
  namespace Express {
    interface Request {
      uid?: string;
    }
  }
}

import { type Request, type Response } from 'express';
import jwt from 'jsonwebtoken';

export class ValidateJWT {
  static validateJWT(req: Request, res: Response, next: () => void) {
    try {
      const authorization = req.header('Authorization')
      const token = authorization && authorization.startsWith('Bearer ')
        ? authorization.split(' ')[1]
        : null

      if (!token) {
        return res.status(401).json({
          ok: false,
          message: 'Unauthorized'
        })
      }

      const { userId } = jwt.verify(token, process.env.JWT_KEY || '') as { userId: string }
      req.uid = userId as string

      next()
    } catch (error) {
      console.error('Error validating JWT:', error)

      return res.status(401).json({
        ok: false,
        message: 'Unauthorized'
      })
    }
  }
}
