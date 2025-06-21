import express, { RequestHandler } from 'express';
import { generateANCSchedule, getANCSchedule } from '../controllers/ancControllers';
import { authenticate } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/schedule', authenticate as RequestHandler, generateANCSchedule);
router.get('/schedule', authenticate as RequestHandler, getANCSchedule);

export default router;