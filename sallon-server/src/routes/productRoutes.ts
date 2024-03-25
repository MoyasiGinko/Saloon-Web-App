import express, {Request} from "express";
import { prodUploadC } from "../controllers/productController";
import multer from "multer";
import { showProductC } from "../controllers/productController";

const router = express.Router();
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function(req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() *1E9);
    cb(null, file.fieldname + '-' +  uniqueSuffix + '-' + file.originalname)
  }
})
const filterFile = (req: Request, file: Express.Multer.File, cb: (error: Error | null, acceptFile?: boolean)=> void) => {
  if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
    cb(null, true);
  } else {
    cb(new Error("Only JPEG files are supported"), false)
  }
}
const upload = multer({storage: storage, fileFilter: filterFile})
router.post('/upload', upload.single('image'), prodUploadC);
router.get('/showprod', showProductC);
export default router;