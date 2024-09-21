// otpService.js
const axios = require('axios');


require('dotenv').config(); // Loads environment variables from .env file

const apiKey = process.env.KALEYRA_API_KEY;
const senderId = process.env.KALEYRA_SENDER_ID;
const sid = process.env.KALEYRA_SID;
const templateId = process.env.KALEYRA_TEMPLATE_ID;
const messageTemplate = process.env.KALEYRA_MESSAGE;

// In-memory store for OTPs (replace with database or Redis for production)
const otpStore = new Map();

function generateOTP() {
  return Math.floor(1000 + Math.random() * 9000); // Generates a 4-digit OTP
}

function sendOTP(phoneNumber, otp) {
    const message = messageTemplate.replace('{#var#}', otp);
  
    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'api-alerts.solutionsinfini.com/v3/?method=sms',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: new URLSearchParams({
        api_key: apiKey,
        to: phoneNumber,
        message: message,
        sender: senderId,
        sid: sid,
        type: 'OTP',
        template_id: templateId,
      }).toString(),
    };
  
    axios(config)
      .then((response) => {
        console.log('OTP Sent:', response.data);
      })
      .catch((error) => {
        console.error('Error sending OTP:', error);
      });
  }
// Function to verify OTP
function verifyOTP(phoneNumber, enteredOtp) {
  const storedData = otpStore.get(phoneNumber);
  
  if (!storedData) {
    return { success: false, message: 'OTP not found or expired' };
  }

  const { otp, expiresAt } = storedData;

  if (Date.now() > expiresAt) {
    otpStore.delete(phoneNumber); // Delete expired OTP
    return { success: false, message: 'OTP has expired' };
  }

  if (otp === enteredOtp) {
    otpStore.delete(phoneNumber); // Delete OTP after successful verification
    return { success: true, message: 'OTP verified successfully' };
  } else {
    return { success: false, message: 'Incorrect OTP' };
  }
}

module.exports = { sendOTP, verifyOTP };
