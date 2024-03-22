import express from "express";
import { prodUploadC } from "../controllers/userController";

const router = express.Router();
router.post('/upload', prodUploadC);

export default router;