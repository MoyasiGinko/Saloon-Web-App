import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import '../../dotenv'
import { generateAccessToken } from '../Utils/jwtUtils';

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

const JWT_SECRET = process.env.JWT_SECRET || "";

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = typeof authHeader === 'string' ? authHeader.split(' ')[1] : undefined;
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  } 
  try {
    const user = jwt.verify(token, JWT_SECRET);
    console.log('the user is', user);
    next();
  } catch (error) {
    console.error('Error verifying token', error);
    return res.status(403).json({ error: 'Invalid token' });
  }

};

export const refreshToken = (req: Request, res: Response, next: NextFunction) => {
  const refreshToken = req.cookies.refreshToken;
  console.log('the cookies are', refreshToken);
  if (!refreshToken) {
    return res.status(401).json({ error: "Refresh token is missing"})
  }
  try {
    const user = jwt.verify(refreshToken, JWT_SECRET) as JwtPayload
    const accessToken = generateAccessToken({userId: user.id, email: user.email})
    res.setHeader('Authorization', `Bearer ${accessToken}`)
    next()
  } catch ( error) {
    return res.status(403).json({ message: 'Invalid refresh  token' })
  }
}