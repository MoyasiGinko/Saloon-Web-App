
import { Request, Response } from 'express';
import { prodUploadS } from "../services/productService"
import { showProductS } from '../services/productService';

export const prodUploadC = (req: Request, res: Response) => {
  prodUploadS(req, res);
}

export const showProductC = ( req: Request, res: Response) => { 
  showProductS(req, res);
}