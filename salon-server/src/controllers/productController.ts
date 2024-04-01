import { Request, Response } from 'express';
import { prodUploadS, showProductS, updateProductS, deleteProductS } from "../services/productService"


export const prodUploadC = (req: Request, res: Response) => {
  prodUploadS(req, res);
}

export const showProductC = ( req: Request, res: Response) => { 
  showProductS(req, res);
}

export const updateProductC = (req: Request, res: Response) => {
  updateProductS(req, res);
}

export const deleteProductC = (req: Request, res: Response) => {
  deleteProductS(req, res);
}