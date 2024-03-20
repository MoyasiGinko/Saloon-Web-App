import express from 'express';
import { register, login} from '../controllers/userController';
import { authenticateToken, refreshToken } from '../middlewares/jwtMiddleware';
import { authenticate } from '../controllers/userController';

const router = express.Router();
router.post('/register', register);
router.post('/login', login);
router.get('/authenticate', authenticateToken, authenticate)


export default router;