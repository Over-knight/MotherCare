import mongoose, { Schema, Document } from 'mongoose';

export interface IReminder extends Document {
  userId: mongoose.Types.ObjectId;
  message: string;
  scheduledDate: Date;
  sent: boolean;
}

const ReminderSchema = new Schema<IReminder>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  message: { type: String, required: true },
  scheduledDate: { type: Date, required: true },
  sent: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.model<IReminder>('Reminder', ReminderSchema);