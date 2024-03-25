import {Request, Response } from "express"
import { Product } from "../models/Product"

export const prodUploadS = async(req: Request, res: Response) => {
  const imagePath = (req.file as Express.Multer.File).path.replace(/\\/g, "/")
  const {product, description, quantity, price} = req.body
    const newProduct = new Product ({
    name: product,
    description: description,
    price: price,
    quantity: quantity,
    image: imagePath
  })
  await newProduct.save()
  return res.status(200).json({message: 'product will be uploaded'})
}

export const showProductS = async (req: Request, res: Response) => {
  const products = await Product.find();
  return res.status(200).json({message: 'this is the products', products});
}