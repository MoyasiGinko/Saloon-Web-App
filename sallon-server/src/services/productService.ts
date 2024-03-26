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

export const updateProductS = async(req: Request, res: Response) => {
  try {
    console.log('the body is', req.body);
    const prodId = req.params.id;
    const {name, description, price, quantity, image} = req.body;
    const product = await Product.findById(prodId);
    if(!product) {
      return res.status(404).json({error: 'Product not found'});
    }
    let imagePath;
    if (!image){
      imagePath = (req.file as Express.Multer.File).path.replace(/\\/g, "/")
    } else {
      imagePath = image 
    }
    product.name = name;
    product.description = description;
    product.price = price;
    product.quantity = quantity;
    product.image = imagePath 
    await product.save();
    res.status(200).json({message: 'Product updated successfully'});
  } catch (error) {
    console.error("Error updating product", error);
    res.status(400).json({error: 'Internal server error'});
  }
}

export const deleteProductS = async (req: Request, res: Response) => {
  try {
    const prodId = req.params.id;
    const deletedProduct = await Product.findByIdAndDelete(prodId);
    if(!deletedProduct) {
      res.status(404).json({message: 'Product not found'});
    }
    res.status(200).json({message: "Product deleted"});
    console.log("Product deleted successfully")
  } catch (error) {
    console.error("Error deleting product", error);
    res.status(400).json({error: 'Internal server error'});
  }
}