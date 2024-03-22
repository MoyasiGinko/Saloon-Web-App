import { Response } from "express"
import { Product } from "../models/Product"

export const prodUploadS = async(res: Response) => {

  const newProduct = new Product ({
    name: 'Pangabi',
    description: 'This pangabi for my father',
    price: 2000,
    quantity: 1,
    image: "imageUrl"
  })
  await newProduct.save()
  return res.status(200).json({message: 'product will be uploaded'})
}