import mongoose, { Schema, Document } from 'mongoose';

export interface IMotherProfile extends Document {
  userId: mongoose.Types.ObjectId;
  dateOfBirth: Date;
  address: string;
  lga: string;
  edd: Date;
  language: string;
  referralCode?: string;
  pushToken?: string;
}

const MotherProfileSchema = new Schema<IMotherProfile>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    dateOfBirth: { type: Date, required: true },
    address: { type: String, required: true },
    lga: { type: String, required: true },
    edd: { type: Date, required: true },
    language: { type: String, required: true },
    referralCode: { type: String },
    pushToken: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model<IMotherProfile>('MotherProfile', MotherProfileSchema);