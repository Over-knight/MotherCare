export const sendSMS = async (phoneNumber: string, message: string): Promise<void> => {
  try {
//     const phoneNumber = await getPhoneNumberFromUserId(userId);
//   if (!phoneNumber) throw new Error('Phone number not found');

//   const apiKey = process.env.TERMII_API_KEY;
//   const senderId = process.env.TERMII_SENDER_ID || 'SafeMama';

//   const payload = {
//     to: phoneNumber,
//     from: senderId,
//     sms: message,
//     type: 'plain',
//     channel: 'generic',
//     api_key: apiKey,
//   };

//   await axios.post('https://api.ng.termii.com/api/sms/send', payload);
    // Simulate sending SMS
    console.log(`Sending SMS to ${phoneNumber}: ${message}`);
    // Here you would integrate with an actual SMS service like Twilio, Nexmo, etc.
    // For example:
    // await smsService.send({ to: phoneNumber, body: message });
  } catch (error) {
    console.error(`Failed to send SMS to ${phoneNumber}:`, error);
    throw new Error('SMS sending failed');
  }
}