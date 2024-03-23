import express from "express";
import { prodUploadC } from "../controllers/userController";
import multer from "multer";

const router = express.Router();
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function(req, file, cb) {
    const unixSuffix = Date.now() + '-' + Math.round(Math.random() *1E9);
    cb(null, file.originalname +  uni)
  }
})
const upload = multer({storage: storage})
router.post('/upload', upload.single('image'), prodUploadC);

export default router;