import jwt from 'jsonwebtoken';
import '../../dotenv'

const JWT_SECRET= process.env.JWT_SECRET || "";
const ACCESS_TOKEN_EXPIRATION = process.env.ACCESS_TOKEN_EXPIRATION
const REFRESH_TOKEN_EXPIRATION = process.env.REFRESH_TOKEN_EXPIRATION
 
export const generateAccessToken = (payload: any):string =>{
  return jwt.sign(payload, JWT_SECRET, {expiresIn: ACCESS_TOKEN_EXPIRATION});
}

export const generateRefreshhToken = (payload: any):string =>{
  return jwt.sign(payload, JWT_SECRET, {expiresIn: REFRESH_TOKEN_EXPIRATION});
}