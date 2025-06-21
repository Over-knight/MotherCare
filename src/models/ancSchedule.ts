import mongoose, { Schema, Document } from 'mongoose';

export interface IANCSchedule extends Document {
  userId: mongoose.Types.ObjectId;
  edd: Date;
  visits: { label: string; date: Date; status: 'pending' | 'completed' }[];
}

const ANCScheduleSchema = new Schema<IANCSchedule>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  edd: { type: Date, required: true },
  visits: [
    {
      label: { type: String, required: true },
      date: { type: Date, required: true },
      status: { type: String, enum: ['pending', 'completed'], default: 'pending', required: true },
    },
  ],
}, { timestamps: true });

export default mongoose.model<IANCSchedule>('ANCSchedule', ANCScheduleSchema);