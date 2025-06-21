import { Request, Response } from 'express';
import PaymentStatus from '../models/paymentStatus';

export const updatePaymentStatus = async (req: Request, res: Response): Promise<any> => {
  try {
    const { userId } = req.params;
    const { status, accountInfo } = req.body;

    const payment = await PaymentStatus.findOne({ userId });
    if (!payment) return res.status(404).json({ error: 'Payment record not found' });

    if (status) payment.status = status;
    if (accountInfo) payment.accountInfo = accountInfo;

    await payment.save();
    res.status(200).json({ message: 'Payment status updated', payment });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update payment status', details: err });
  }
};