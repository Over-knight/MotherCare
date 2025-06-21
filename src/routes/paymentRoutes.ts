import express, {RequestHandler} from 'express';
import { updatePaymentStatus } from '../controllers/paymentController';
import { authenticate } from '../middleware/authMiddleware';

const router = express.Router();

router.patch('/payments/:userId/status', authenticate as RequestHandler, updatePaymentStatus);

export default router;