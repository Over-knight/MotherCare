import express, {RequestHandler} from 'express';
import { register, 
    login, 
    updateProfile, 
    getProfile, 
    refresh, 
    logout } from '../controllers/authControllers';
    import { authenticate } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.put('/profile',authenticate as RequestHandler ,updateProfile);
router.get('/profile', authenticate as RequestHandler, getProfile);
router.post('/refresh', refresh);
router.post('/logout', logout);

export default router;
