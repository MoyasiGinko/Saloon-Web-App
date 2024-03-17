import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import '../../dotenv'

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

const JWT_SECRET = process.env.JWT_SECRET || "";

const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = typeof authHeader === 'string' ? authHeader.split(' ')[1] : undefined;
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  } 
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    console.log('the decoded is', decoded);
    req.user = decoded;
    console.log('the req.user is', req.user);
    next();
  } catch (error) {
    console.error('Error verifying token', error);
    console.log('the token from env is', JWT_SECRET, 'type is' ,typeof(JWT_SECRET));
    console.log('the token from headers is', token, 'type is' ,typeof(token));
    return res.status(403).json({ error: 'Invalid token' });
  }

};

export default authenticateToken;