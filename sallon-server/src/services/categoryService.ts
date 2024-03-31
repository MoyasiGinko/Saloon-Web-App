import { Request, Response } from "express";
import { Category } from "../models/Category";

export const createCategoryS = async (req: Request, res: Response) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ error: "Name is required" });
  }
  const existingCategory = await Category.findOne({ name });
  if (existingCategory) {
    return res.status(409).json({ error: "Category already exists" });
  }
  const newCategory = new Category({
    name: name,
  });
  await newCategory.save();
  return res.status(200).json({ message: "Category created successfully" });
};

export const showCategoryS = async (req: Request, res: Response) => {
  const categories = await Category.find();
  return res.status(200).json({ message: "Categories", categories });
};

export const updateCategoryS = async (req: Request, res: Response) => {
  try {
    const categoryId = req.params.id;
    const { name } = req.body;
    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }
    category.name = name;
    await category.save();
    res
      .status(200)
      .json({ message: "Category updated successfully", category });
  } catch (error) {
    console.error("Error updating category", error);
    res.status(400).json({ error: "Internal server error" });
  }
};

export const deleteCategoryS = async (req: Request, res: Response) => {
  try {
    const categoryId = req.params.id;
    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }
    await Category.deleteOne({ _id: categoryId });
    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    console.error("Error deleting category", error);
    res.status(400).json({ error: "Internal server error" });
  }
};

export const findCategoryS = async (req: Request, res: Response) => {
  try {
    const categoryId = req.params.id;
    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }
    return res.status(200).json({ message: "Category found", category });
  } catch (error) {
    console.error("Error fetching category", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
