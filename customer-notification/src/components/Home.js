import React, { useState } from 'react';
import { Button, TextField, MenuItem, Select, FormControl, InputLabel } from '@mui/material';

const NotificationForm = ({ onSendNotification }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setMessage] = useState('');
  const [notificationMethod, setNotificationMethod] = useState('sms');
  const [template, setTemplate] = useState('basic');

  // Predefined templates with corresponding messages
  const templates = {
    basic: 'Hello, this is a basic message. Please let us know if you need any further assistance.',
    advanced: 'Dear Customer, we are pleased to offer you an advanced service. Please reach out to us for more information.',
    promo: 'Exclusive Offer! Get 20% off on your next purchase using promo code SAVE20. Limited time only!',
    reminder: 'Reminder: Your appointment is scheduled for tomorrow at 10:00 AM. Please don’t forget.',
    event: 'Join us for our exciting event happening this weekend! RSVP today to secure your spot.',
    thank_you: 'Thank you for your recent purchase! We appreciate your business and look forward to serving you again.',
  };

  // Update message when template is changed
  const handleTemplateChange = (e) => {
    const selectedTemplate = e.target.value;
    setTemplate(selectedTemplate);
    setMessage(templates[selectedTemplate] || ''); // Set the corresponding template message
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSendNotification({ phoneNumber, message, notificationMethod, template });
  };

  return (
    <div className="p-4 max-w-lg mx-auto">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <TextField
            label="Phone Number"
            variant="outlined"
            fullWidth
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <TextField
            label="Message"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)} // Allow user to modify the message
          />
        </div>
        <div className="mb-4">
          <FormControl fullWidth>
            <InputLabel>Notification Method</InputLabel>
            <Select
              value={notificationMethod}
              onChange={(e) => setNotificationMethod(e.target.value)}
              label="Notification Method"
            >
              <MenuItem value="sms">SMS</MenuItem>
              <MenuItem value="email">Email</MenuItem>
              <MenuItem value="push">Push Notification</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="mb-4">
          <FormControl fullWidth>
            <InputLabel>Template</InputLabel>
            <Select
              value={template}
              onChange={handleTemplateChange}
              label="Template"
            >
              <MenuItem value="basic">Basic Template</MenuItem>
              <MenuItem value="advanced">Advanced Template</MenuItem>
              <MenuItem value="promo">Promotional Offer</MenuItem>
              <MenuItem value="reminder">Reminder Template</MenuItem>
              <MenuItem value="event">Event Notification</MenuItem>
              <MenuItem value="thank_you">Thank You Message</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="mb-4">
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Send Notification
          </Button>
        </div>
      </form>
    </div>
  );
};

export default NotificationForm;
