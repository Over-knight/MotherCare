import express, {RequestHandler} from 'express';
import { logVisit } from '../controllers/visitControllers';
import { authenticate } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/visits', authenticate as RequestHandler, logVisit);

export default router;