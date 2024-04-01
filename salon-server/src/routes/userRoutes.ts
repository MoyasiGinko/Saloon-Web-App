import express from 'express';
import { register, login, logout} from '../controllers/userController';
import { authenticateToken} from '../middlewares/jwtMiddleware';
import { authenticate } from '../controllers/userController';

const router = express.Router();
router.post('/register', register);
router.post('/login', login);
router.get('/authenticate', authenticateToken, authenticate);
router.post('/logout', authenticateToken, logout);

export default router;
