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
} from "../controllers/serviceController";

const router = express.Router();

router.post("/upload", serviceUploadC);
router.get("/show", showServiceC);
router.put("/update/:id", updateServiceC);
router.delete("/delete/:id", deleteServiceC);
router.get("/category", showCategoryC);
router.get("/category/:category", showServiceByCategoryC);
router.post("/review/:id", addReviewToServiceC);
router.put("/review/:id/:reviewId", updateReviewOfServiceC);
router.delete("/review/:id/:reviewId", deleteReviewOfServiceC);

export default router;
