const express = require('express');
const twilio = require('twilio');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const sgMail = require('@sendgrid/mail');
require('dotenv').config();  // For environment variables

const app = express();
const port = 5000;

// Enable CORS for all origins
app.use(cors());

// Set up logging for API requests
app.use(morgan('dev'));

// Middleware to parse JSON requests
app.use(bodyParser.json());

// Twilio configuration
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = new twilio(accountSid, authToken);

// SendGrid configuration
sgMail.setApiKey(process.env.SENDGRID_API_KEY);  // Use environment variable for SendGrid API key

// In-memory storage for notification history
let notificationHistory = [];


// POST endpoint to send SMS
app.post('/send-sms', (req, res) => {
  console.log('Incoming request body:', req.body);

  const { phoneNumber, message } = req.body;
  console.log('Phone number:', phoneNumber);
  console.log('Message:', message);

  // Validate input data
  if (!phoneNumber || !message) {
    return res.status(400).json({
      error: 'Bad Request',
      message: 'Both phone number (phoneNumber) and message body (message) are required.',
    });
  }

  // Validate phone number format
  const phoneRegex = /^\+?[1-9]\d{1,14}$/;
  if (!phoneRegex.test(phoneNumber)) {
    return res.status(400).json({
      error: 'Invalid Phone Number',
      message: 'The phone number must be in the correct international format.',
    });
  }

  // Send SMS using Twilio
  client.messages
    .create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phoneNumber,
    })
    .then((message) => {
      const notification = {
        id: notificationHistory.length + 1,
        phoneNumber: phoneNumber,
        message: message.body,
        status: 'Sent', // Update status to Sent
      };
      notificationHistory.push(notification);

      res.status(200).json({
        message: 'SMS sent successfully',
        sid: message.sid,
        status: 'Sent',
      });
    })
    .catch((error) => {
      console.error('Twilio error:', error);
      const notification = {
        id: notificationHistory.length + 1,
        phoneNumber: phoneNumber,
        message: message,
        status: 'Failed',
        error: error.message || 'An error occurred while sending the SMS.',
      };
      notificationHistory.push(notification);

      res.status(500).json({
        error: 'Twilio API Error',
        message: error.message || 'An error occurred while sending the SMS.',
        details: error.details || 'No additional details available.',
      });
    });
});

// POST endpoint to send email using SendGrid
app.post('/send-email', (req, res) => {
  const { emailTo, emailSubject, emailMessage } = req.body;

  // Validate input data
  if (!emailTo || !emailSubject || !emailMessage) {
    return res.status(400).json({
      error: 'Bad Request',
      message: 'Email To, Subject, and Message are required fields.',
    });
  }

  const msg = {
    to: emailTo,
    from: process.env.SENDGRID_FROM_EMAIL,
    subject: emailSubject,
    text: emailMessage,
    html: req.body.html || emailMessage,
  };

  // Send email using SendGrid
  sgMail
    .send(msg)
    .then(() => {
      const notification = {
        id: notificationHistory.length + 1,
        email: emailTo,
        subject: emailSubject,
        message: emailMessage,
        status: 'Sent',
      };
      notificationHistory.push(notification);

      res.status(200).json({
        message: 'Email sent successfully',
        notificationId: notification.id,
        status: notification.status,
      });
    })
    .catch((error) => {
      console.error('SendGrid error:', error);
      const notification = {
        id: notificationHistory.length + 1,
        email: emailTo,
        subject: emailSubject,
        message: emailMessage,
        status: 'Failed',
        error: error.message || 'An error occurred while sending the email.',
      };
      notificationHistory.push(notification);

      res.status(500).json({
        error: 'SendGrid API Error',
        message: error.message || 'An error occurred while sending the email.',
        details: error.response ? error.response.body : 'No additional details available.',
      });
    });
});




// GET endpoint to fetch notification history
// GET endpoint to fetch notification history
app.get('/api/notifications', (req, res) => {
  console.log('Returning history:', notificationHistory);
  // Ensure history is always an array
  if (!notificationHistory) {
    return res.status(200).json({
      message: 'No notifications found',
      history: [],
    });
  }
  
  res.status(200).json({
    message: 'Notification history fetched successfully',
    history: notificationHistory,
  });
});
// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
