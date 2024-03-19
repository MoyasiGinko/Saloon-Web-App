import express from 'express';
import { register, login} from '../controllers/userController';
import { authenticateToken, refreshToken } from '../middlewares/jwtMiddleware';
import { profile } from '../controllers/userController';

const router = express.Router();
router.post('/register', register);
router.post('/login', login);
router.get('/profile', authenticateToken, profile)
router.get('/refresh-token', refreshToken, profile)


export default router;