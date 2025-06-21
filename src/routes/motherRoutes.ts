import express, { RequestHandler } from 'express';
import { createOrUpdateMotherProfile, getMotherProfile } from '../controllers/motherControllers';
import { authenticate } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/profile', authenticate as RequestHandler, createOrUpdateMotherProfile);
router.get('/profile', authenticate as RequestHandler, getMotherProfile);

export default router;
