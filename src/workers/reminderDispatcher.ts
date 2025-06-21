// File: src/workers/reminderDispatcher.ts
import mongoose from 'mongoose';
import Reminder from '../models/reminder';
import { sendSMS } from '../utils/smsSender'; // You can replace with push notification handler

export const dispatchReminders = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || '', {});

    const now = new Date();
    const reminders = await Reminder.find({
      sent: false,
      scheduledDate: { $lte: now },
    });

    for (const reminder of reminders) {
      try {
        await sendSMS(reminder.userId.toString(), reminder.message); // Replace with push/send logic
        reminder.sent = true;
        await reminder.save();
        console.log(`✅ Reminder sent: ${reminder.message}`);
      } catch (err) {
        console.error(`❌ Failed to send reminder to ${reminder.userId}:`, err);
      }
    }

    await mongoose.disconnect();
  } catch (err) {
    console.error('❌ Reminder dispatch failed:', err);
  }
};

// Optional: Call dispatchReminders() if running this as standalone
if (require.main === module) {
  dispatchReminders().then(() => process.exit());
}