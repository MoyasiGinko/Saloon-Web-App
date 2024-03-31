import { Request, Response } from "express";
import {
  createCategoryS,
  showCategoryS,
  updateCategoryS,
  deleteCategoryS,
  findCategoryS,
} from "../services/categoryService";

export const createCategoryC = (req: Request, res: Response) => {
  createCategoryS(req, res);
};

export const showCategoryC = (req: Request, res: Response) => {
  showCategoryS(req, res);
};

export const updateCategoryC = (req: Request, res: Response) => {
  updateCategoryS(req, res);
};

export const deleteCategoryC = (req: Request, res: Response) => {
  deleteCategoryS(req, res);
};

export const findCategoryC = (req: Request, res: Response) => {
  return findCategoryS(req, res);
};
