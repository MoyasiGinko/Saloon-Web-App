import express from 'express';
import { register, login} from '../controllers/userController';
import authenticateToken from '../middlewares/jwtMiddleware';
import { profile } from '../controllers/userController';

const router = express.Router();
router.post('/register', register);
router.post('/login', login);
router.post('/profile', authenticateToken, profile)


export default router;