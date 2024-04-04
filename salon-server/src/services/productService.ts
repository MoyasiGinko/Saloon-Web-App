import { Request, Response } from "express";
import { Product } from "../models/Product";
import fs from "fs";
import path from "path";

export const prodUploadS = async (req: Request, res: Response) => {
  try {
    const imagePath = (req.file as Express.Multer.File).path.replace(
      /\\/g,
      "/"
    );
    const { product, description, quantity, price, category } = req.body;

    const newProduct = new Product({
      name: product,
      description: description,
      price: price,
      quantity: quantity,
      image: imagePath,
      ...(category !== "" ? { category: category } : {}),
    });

    console.log("the new product is ******", newProduct, typeof newProduct);
    await newProduct.save();
    return res.status(200).json({ message: "Product uploaded successfully" });
  } catch (error) {
    console.error("Error uploading product", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const showProductS = async (req: Request, res: Response) => {
  const products = await Product.find();
  return res.status(200).json({ message: "this is the products", products });
};

export const updateProductS = async (req: Request, res: Response) => {
  try {
    const prodId = req.params.id;
    const { name, description, price, quantity, imgPath, category } = req.body;
    const product = await Product.findById(prodId);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    let imagePath;
    let oldImgPath;

    if (req.file) {
      imagePath = (req.file as Express.Multer.File).path.replace(/\\/g, "/");
      oldImgPath = imgPath;
    } else {
      imagePath = imgPath;
    }

    // Check if category is provided and not null or undefined
    if (category !== null && category !== undefined) {
      // If category is being updated, update the product's category
      product.category = category;
    }

    product.name = name;
    product.description = description;
    product.price = price;
    product.quantity = quantity;
    product.image = imagePath;

    await product.save();

    // Remove old image file if it's being updated
    if (oldImgPath) {
      const editedImagePath = path.join(__dirname, "..", "..", oldImgPath);
      if (fs.existsSync(editedImagePath)) {
        fs.unlinkSync(editedImagePath);
      } else {
        console.log("Could not find the file");
      }
    }

    res
      .status(200)
      .json({ message: "Product updated successfully", product: product });
  } catch (error) {
    console.error("Error updating product", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteProductS = async (req: Request, res: Response) => {
  try {
    const prodId = req.params.id;
    const deletedProduct = await Product.findByIdAndDelete(prodId);
    if (!deletedProduct) {
      res.status(404).json({ message: "Product not found" });
      return;
    }
    const imagePath = path.join(__dirname, "..", "..", deletedProduct.image);
    try {
      fs.unlinkSync(imagePath);
    } catch (err) {
      console.error("Error unlinking image", err);
    }
    res.status(200).json({ message: "Product deleted" });
  } catch (error) {
    console.error("Error deleting product", error);
    res.status(400).json({ error: "Internal server error" });
  }
};
