import mongoose, { Schema, Document } from 'mongoose';

export interface IPaymentStatus extends Document {
  userId: mongoose.Types.ObjectId;
  isEligible: boolean;
  eligibilityReason: 'ANC4' | 'DELIVERY';
  status: 'pending' | 'verified' | 'paid';
  accountInfo?: {
    bank?: string;
    accountNumber?: string;
    walletProvider?: string;
    walletNumber?: string;
  };
}

const PaymentStatusSchema = new Schema<IPaymentStatus>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  isEligible: { type: Boolean, default: false },
  eligibilityReason: { type: String, enum: ['ANC4', 'DELIVERY'] },
  status: { type: String, enum: ['pending', 'verified', 'paid'], default: 'pending' },
  accountInfo: {
    bank: String,
    accountNumber: String,
    walletProvider: String,
    walletNumber: String,
  },
}, { timestamps: true });

export default mongoose.model<IPaymentStatus>('PaymentStatus', PaymentStatusSchema);