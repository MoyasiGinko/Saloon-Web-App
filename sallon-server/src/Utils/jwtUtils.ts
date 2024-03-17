import jwt from 'jsonwebtoken';
import '../../dotenv'

const JWT_SECRET= process.env.JWT_SECRET || "";
console.log('the secret is', JWT_SECRET);
export const generateToken = (payload: any):string =>{
  return jwt.sign(payload, JWT_SECRET, {expiresIn: '100h'});
}