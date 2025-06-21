import Visit, { VisitType } from '../models/visit';
import PaymentStatus from '../models/paymentStatus';

export const checkCCTEligibility = async (userId: string) => {
  const existing = await PaymentStatus.findOne({ userId });
  if (existing) return; // Already eligible or paid

  const visits = await Visit.find({ userId });
  const types: VisitType[] = visits.map(v => v.type);

  const ancVisits: VisitType[] = ['ANC1', 'ANC2', 'ANC3', 'ANC4'];
  const ancCount = ancVisits.filter(v => types.includes(v)).length;
  const hasDelivery = types.includes('DELIVERY');

  if (ancCount >= 4) {
    await PaymentStatus.create({
      userId,
      isEligible: true,
      eligibilityReason: 'ANC4',
    });
  } else if (hasDelivery) {
    await PaymentStatus.create({
      userId,
      isEligible: true,
      eligibilityReason: 'DELIVERY',
    });
  }
};
