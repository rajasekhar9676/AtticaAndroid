// server.js or index.js
const express = require('express');
const path = require('path');
const axios = require('axios');
const { connectToDatabase } = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const branchRoutes = require('./routes/branchRoutes');
const productRoutes = require('./routes/productRoutes');
const goldRateRoutes = require('./routes/goldRateRoutes');
const newsRoutes = require('./routes/NewsRoutes');
const { errorHandler } = require('./middleware/errorMiddleware');
require('dotenv').config();
const cors = require('cors');

const app = express();

// Check if JWT_SECRET is defined
if (!process.env.JWT_SECRET) {
  console.error('FATAL ERROR: JWT_SECRET is not defined.');
  process.exit(1);
}

// Connect to the database
connectToDatabase();

// Middleware
app.use(express.json());
app.use(cors());


// app.post('/send-sms', (req, res) => {

//   const { phoneNumber, message } = req.body;

//   var data = new FormData();
//   var config = {
//     method: 'post',
//     maxBodyLength: Infinity,
//     url: `https://api-alerts.kaleyra.com/v4/?api_key=Ac1114feab4e31bdfaef1f02d3d3c23e7&method=sms&message=${message}&to=${phoneNumber}&sender=KALERA`,
//     headers: {
//       ...data.getHeaders()
//     },
//     data: data
//   };

//   axios(config)
//     .then(function (response) {
//       console.log(JSON.stringify(response.data));
//       res.json({ success: true, message: 'SMS sent successfully!' });
//     })
//     .catch(function (error) {
//       console.log(error);
//       res.status(500).json({ success: false, message: 'Failed to send SMS' });
//     });
// });


// Routes


// Step 1: Generate a random OTP (4 to 6 digits)
function generateOTP() {
  return Math.floor(1000 + Math.random() * 9000); // Generates a 4-digit OTP
}

// Step 2: Define function to send OTP
function sendOTP(phoneNumber) {
  const otp = generateOTP();
  const message = `Your OTP is ${otp}. It is valid for 10 minutes.`;

  // Prepare API request configuration with required credentials
  const config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://api-alerts.kaleyra.com/v4/?method=sms',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',  // Ensure the right content type is used
    },
    data: new URLSearchParams({
      api_key: 'Ac1114feab4e31bdfaef1f02d3d3c23e7',  // Replace with your actual API Key
      to: phoneNumber,  // The recipient's phone number
      message: message, // The OTP message to be sent
      sender: 'ATTGPL',  // Your sender ID
      sid: 'HXIN1773278560IN',  // Your Account SID
      type: 'OTP',  // The route type (OTP for SMS)
      template_id: '1007674320713245792',  // Unique template ID for Indian customers
      callback_url: 'https://webhook.site/89b43b12-b889-4f66-8ebf-3379b4b3345c'  // Optional callback URL
    }).toString()
  };

  axios(config)
    .then(function (response) {
      console.log('OTP Sent: ', response.data);
    })
    .catch(function (error) {
      console.error('Error sending OTP: ', error);
    });
}



// Step 3: Call the function with the recipient's phone number
sendOTP('9676048900');


app.use('/api/users', userRoutes);
app.use('/api/branches', branchRoutes);
app.use('/api/products', productRoutes);
app.use('/api/goldRates', goldRateRoutes);
app.use('/api/news', newsRoutes);

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));







