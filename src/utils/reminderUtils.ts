import { IANCSchedule } from '../models/ancSchedule';
import Reminder from '../models/reminder';

export const generateRemindersFromSchedule = async (schedule: IANCSchedule) => {
  const reminders = schedule.visits.map((visit) => {
    const reminderDate = new Date(visit.date);
    reminderDate.setDate(reminderDate.getDate() - 2); // 2 days before

    return {
      userId: schedule.userId,
      message: `You have ${visit.label} on ${visit.date.toDateString()}.`,
      scheduledDate: reminderDate,
      sent: false,
    };
  });

  await Reminder.insertMany(reminders);
};
