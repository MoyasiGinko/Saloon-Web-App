import express from "express";
import {
  createCategoryC,
  showCategoryC,
  updateCategoryC,
  deleteCategoryC,
} from "../controllers/categoryController";

const router = express.Router();
router.post("/create", createCategoryC);
router.get("/show", showCategoryC);
router.put("/update/:id", updateCategoryC);
router.delete("/delete/:id", deleteCategoryC);
export default router;
