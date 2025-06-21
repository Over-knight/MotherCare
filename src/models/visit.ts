import mongoose, { Schema, Document } from 'mongoose';

export type VisitType = 'ANC1' | 'ANC2' | 'ANC3' | 'ANC4' | 'DELIVERY' | 'POSTNATAL';

export interface IVisit extends Document {
  userId: mongoose.Types.ObjectId;
  type: VisitType;
  date: Date;
  markedBy: mongoose.Types.ObjectId;
}

const VisitSchema = new Schema<IVisit>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, enum: ['ANC1', 'ANC2', 'ANC3', 'ANC4', 'DELIVERY', 'POSTNATAL'], required: true },
  date: { type: Date, default: Date.now },
  markedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

export default mongoose.model<IVisit>('Visit', VisitSchema);
// This model represents a visit in the ANC (Antenatal Care) system.