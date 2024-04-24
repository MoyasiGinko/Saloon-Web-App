// serviceRoutes.ts
import express from "express";
import {
  serviceUploadC,
  showServiceC,
  updateServiceC,
  deleteServiceC,
  showCategoryC,
  showServiceByCategoryC,
  addReviewToServiceC,
  updateReviewOfServiceC,
  deleteReviewOfServiceC,
  findServiceByIdC,
} from "../controllers/serviceController";

const router = express.Router();

router.get("/show", showServiceC);
router.get("/show/:id", findServiceByIdC);
router.get("/category", showCategoryC);
router.get("/category/:category", showServiceByCategoryC);
router.post("/upload", serviceUploadC);
router.post("/review/:id", addReviewToServiceC);
router.put("/update/:id", updateServiceC);
router.put("/review/:id/:reviewId", updateReviewOfServiceC);
router.delete("/delete/:id", deleteServiceC);
router.delete("/review/:id/:reviewId", deleteReviewOfServiceC);

export default router;
