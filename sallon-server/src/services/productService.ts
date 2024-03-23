import {Request, Response } from "express"
import { Product } from "../models/Product"

export const prodUploadS = async(req: Request, res: Response) => {
  console.log("I am in prodUploadS")
  // const newProduct = new Product ({
  //   name: 'Pangabi',
  //   description: 'This pangabi for my father',
  //   price: 2000,
  //   quantity: 1,
  //   image: "imageUrl"
  // })
  // await newProduct.save()
  const {product, description, quantity, price} = req.body
  const imagePath = (req.file as Express.Multer.File).path
  console.log("I am in prodUploadS function", "**The imagePath***:", imagePath, req.body)
  return res.status(200).json({message: 'product will be uploaded'})
}