import { Response } from 'express';
import { AuthRequest } from '../../types/express';
import ancSchedule from '../models/ancSchedule';

export const generateANCSchedule = async (req: AuthRequest, res: Response): Promise<any> => {
  try {
    const userId = req.user?.userId;
    const { edd } = req.body; // or fetch from MotherProfile if stored

    if (!edd) return res.status(400).json({ error: 'EDD required' });

    const baseDate = new Date(edd);
    const visitOffsets = [-168, -140, -112, -84]; // 24, 20, 16, 12 weeks before EDD (in days)

    const visits: {label: string; date: Date; status: 'pending'}[] = visitOffsets.map((days, i) => ({
      label: `ANC Visit ${i + 1}`,
      date: new Date(baseDate.getTime() + days * 24 * 60 * 60 * 1000),
      status: 'pending'
    }));

    const existing = await ancSchedule.findOne({ userId });
    if (existing) {
      existing.visits = visits;
      existing.edd = edd;
      await existing.save();
      return res.json({ message: 'ANC schedule updated', schedule: existing });
    }

    const schedule = await ancSchedule.create({ userId, edd, visits });
    res.status(201).json({ message: 'ANC schedule created', schedule });
  } catch (err) {
    res.status(500).json({ error: 'Failed to generate schedule', details: err });
  }
};

export const getANCSchedule = async (req: AuthRequest, res: Response): Promise<any> => {
  try {
    const userId = req.user?.userId;
    const schedule = await ancSchedule.findOne({ userId });
    if (!schedule) return res.status(404).json({ error: 'Schedule not found' });

    res.json(schedule);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch schedule', details: err });
  }
};
