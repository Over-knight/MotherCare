import { Request, Response } from 'express';
import Visit from '../models/visit';
import { AuthRequest } from '../../types/express';
import { checkCCTEligibility } from '../utils/checkEligibility';

export const logVisit = async (req: AuthRequest, res: Response): Promise<any> => {
  try {
    const { userId, type, date } = req.body;
    const markedBy = req.user?.userId;

    if (!userId || !type) {
      return res.status(400).json({ error: 'userId and type are required' });
    }

    const visit = await Visit.create({ userId, type, date: date || new Date(), markedBy });
    await checkCCTEligibility(userId); // Check and update eligibility after logging visit
    res.status(201).json({ message: 'Visit logged', visit });
  } catch (error) {
    res.status(500).json({ error: 'Failed to log visit', details: error });
  }
};