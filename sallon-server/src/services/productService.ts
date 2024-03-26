import { Request, Response } from "express"
import { Product } from "../models/Product"
import fs from 'fs';
import path from 'path';

export const prodUploadS = async (req: Request, res: Response) => {
  const imagePath = (req.file as Express.Multer.File).path.replace(/\\/g, "/")
  const { product, description, quantity, price } = req.body
  const newProduct = new Product({
    name: product,
    description: description,
    price: price,
    quantity: quantity,
    image: imagePath
  })
  await newProduct.save()
  return res.status(200).json({ message: 'product will be uploaded' })
}

export const showProductS = async (req: Request, res: Response) => {
  const products = await Product.find();
  return res.status(200).json({ message: 'this is the products', products });
}

export const updateProductS = async (req: Request, res: Response) => {
  try {
    console.log('the body is', req.body);
    const prodId = req.params.id;
    const { name, description, price, quantity, imgPath } = req.body;
    const product = await Product.findById(prodId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    let imagePath;
    let oldImgPath;
    if (req.file) {
      imagePath = (req.file as Express.Multer.File).path.replace(/\\/g, "/")
      oldImgPath = imgPath
    } else {
      imagePath = imgPath
    }
    product.name = name;
    product.description = description;
    product.price = price;
    product.quantity = quantity;
    product.image = imagePath
    await product.save();
    if (oldImgPath) {
      const editedImagePath = path.join(__dirname, '..', '..', oldImgPath);
      fs.unlinkSync(editedImagePath);
    }
    res.status(200).json({ message: 'Product updated successfully', product: product });
  } catch (error) {
    console.error("Error updating product", error);
    res.status(400).json({ error: 'Internal server error' });
  }
}

export const deleteProductS = async (req: Request, res: Response) => {
  try {
    const prodId = req.params.id;
    const deletedProduct = await Product.findByIdAndDelete(prodId);
    if (!deletedProduct) {
      res.status(404).json({ message: 'Product not found' });
      return;
    }
    const imagePath = path.join(__dirname, '..', '..', deletedProduct.image);
    try {
      fs.unlinkSync(imagePath);
    } catch (err) {
      console.error("Error unlinking image", err);
    }
    res.status(200).json({ message: "Product deleted" });
  } catch (error) {
    console.error("Error deleting product", error);
    res.status(400).json({ error: 'Internal server error' });
  }
}