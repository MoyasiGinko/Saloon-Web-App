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
    jwt.verify(token, JWT_SECRET);
    next();
  } catch (error) {
    console.error('Error verifying token', error);
    if(error instanceof jwt.TokenExpiredError){
      return refreshToken(req, res, next);
    };
    return res.status(403).json({ error: 'unknown error' });
  }

};

export const refreshToken = (req: Request, res: Response, next: NextFunction) => {
  const refreshToken = req.cookies.refreshToken;
  console.log('********the refresh tokens are *****', refreshToken);
  if (!refreshToken) {
    console.log('****refresh token is missing****');
    return res.status(401).json({ error: "Refresh token is missing"})
  }
  try {
    const user = jwt.verify(refreshToken, JWT_SECRET) as JwtPayload
    const accessToken = generateAccessToken({userId: user.id, email: user.email})
    console.log('***Refresh token is verified***')
    console.log('********new accesstokens is *****', accessToken);
    return res.status(200).json({message: 'Refresh Token has verified', accessToken: accessToken})
  } catch ( error) {
    console.log('I am in error state', error)
    return res.status(403).json({ message: 'Invalid refresh  token' })
  }
}