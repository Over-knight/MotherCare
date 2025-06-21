import { Request, Response } from 'express';
import MotherProfile from '../models/motherProfile';

export const createOrUpdateMotherProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId;
    const { dateOfBirth, address, lga, edd, language, referralCode, pushToken } = req.body;

    let profile = await MotherProfile.findOne({ userId });
    if (profile) {
      // Update existing
      profile.set({ dateOfBirth, address, lga, edd, language, referralCode, pushToken });
      await profile.save();
    } else {
      // Create new
      profile = await MotherProfile.create({ userId, dateOfBirth, address, lga, edd, language, referralCode, pushToken });
    }

    res.status(200).json({ message: 'Mother profile saved', profile });
  } catch (err) {
    res.status(500).json({ error: 'Failed to save profile', details: err });
  }
};

export const getMotherProfile = async (req: Request, res: Response): Promise<any> => {
  try {
    const userId = req.user?.userId;
    const profile = await MotherProfile.findOne({ userId });
    if (!profile) return res.status(404).json({ error: 'Profile not found' });

    res.json(profile);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch profile', details: err });
  }
};