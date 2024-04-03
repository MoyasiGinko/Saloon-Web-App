// serviceRoutes.ts
import express from "express";
import {
  serviceUploadC,
  showServiceC,
  updateServiceC,
  deleteServiceC,
  showCategoryC,
  showServiceByCategoryC,
} from "../controllers/serviceController";

const router = express.Router();

router.post("/upload", serviceUploadC);
router.get("/show", showServiceC);
router.put("/update", updateServiceC);
router.delete("/delete/:id", deleteServiceC);
router.get("/category", showCategoryC);
router.get("/category/:category", showServiceByCategoryC);

export default router;
