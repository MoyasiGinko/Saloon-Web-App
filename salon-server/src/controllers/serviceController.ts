// serviceController.ts
import { Request, Response } from "express";
import {
  serviceUploadS,
  showServiceS,
  updateServiceS,
  deleteServiceS,
  showCategoryS,
  showServiceByCategoryS,
} from "../services/serviceService";

export const serviceUploadC = (req: Request, res: Response) => {
  serviceUploadS(req, res);
};

export const showServiceC = (req: Request, res: Response) => {
  showServiceS(req, res);
};

export const updateServiceC = (req: Request, res: Response) => {
  updateServiceS(req, res);
};

export const deleteServiceC = (req: Request, res: Response) => {
  deleteServiceS(req, res);
};

export const showCategoryC = (req: Request, res: Response) => {
  showCategoryS(req, res);
};

export const showServiceByCategoryC = (req: Request, res: Response) => {
  showServiceByCategoryS(req, res);
};
