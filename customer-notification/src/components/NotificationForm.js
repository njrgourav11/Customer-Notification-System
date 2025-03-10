import React, { useState } from 'react';
import { Button, TextField, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import TemplateSelection from './TemplateSelection';  // Import TemplateSelection component

const NotificationForm = ({ onSendNotification, setResponseMessage, setOpenSnackbar }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setMessage] = useState('');
  const [emailTo, setEmailTo] = useState('');
  const [emailSubject, setEmailSubject] = useState('');
  const [emailMessage, setEmailMessage] = useState('');
  const [notificationMethod, setNotificationMethod] = useState('sms');
  const [template, setTemplate] = useState('');

  // Handle template change (received from TemplateSelection)
  const handleTemplateChange = (selectedTemplate, selectedTemplateMessage) => {
    setTemplate(selectedTemplate);

    // If the notification method is SMS, set the message
    if (notificationMethod === 'sms') {
      setMessage(selectedTemplateMessage || ''); // Set the corresponding template message for SMS
      setEmailSubject(''); // Clear the email subject for SMS
      setEmailMessage(''); // Clear the email message for SMS
    } else if (notificationMethod === 'email') {
      setEmailMessage(selectedTemplateMessage || ''); // Set the corresponding template message for Email
      setEmailSubject(`${selectedTemplate.charAt(0).toUpperCase() + selectedTemplate.slice(1)} Subject`); // Set email subject dynamically
      setMessage(''); // Clear the SMS message for email
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const notificationData = {
      phoneNumber,
      message,
      emailTo,
      emailSubject,
      emailMessage,
      notificationMethod,
      template,
    };

    // Validate the fields before sending the data
    if (notificationMethod === 'email') {
      if (!emailTo || !emailSubject || !emailMessage) {
        setResponseMessage('Email To, Subject, and Message are required.');
        setOpenSnackbar(true);
        return;
      }
    } else if (notificationMethod === 'sms') {
      if (!phoneNumber || !message) {
        setResponseMessage('Phone Number and Message are required.');
        setOpenSnackbar(true);
        return;
      }
    }

    // Log the notification data before sending it to the server
    console.log('Sending notification data:', notificationData);

    // Send notification
    onSendNotification(notificationData)
      .then((response) => {
        setResponseMessage(response.message || 'Notification sent successfully');
        setOpenSnackbar(true);
      })
      .catch((error) => {
        setResponseMessage(error.message || 'Something went wrong');
        setOpenSnackbar(true);
      });
  };

  return (
    <div className="p-4 max-w-lg mx-auto">
      <form onSubmit={handleSubmit}>
        {/* Notification Method Dropdown */}
        <div className="mb-4">
          <FormControl fullWidth>
            <InputLabel>Notification Method</InputLabel>
            <Select
              value={notificationMethod}
              onChange={(e) => {
                setNotificationMethod(e.target.value);
                if (e.target.value === 'sms') {
                  setEmailSubject('');
                  setEmailMessage('');
                  setMessage('');
                  setEmailTo('');
                }
              }}
              label="Notification Method"
            >
              <MenuItem value="sms">SMS</MenuItem>
              <MenuItem value="email">Email</MenuItem>
            </Select>
          </FormControl>
        </div>

        {/* Conditional rendering for Phone Number / Email Address */}
        <div className="mb-4">
          {notificationMethod === 'sms' && (
            <TextField
              label="Phone Number"
              variant="outlined"
              fullWidth
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          )}

          {notificationMethod === 'email' && (
            <TextField
              label="Email Address"
              variant="outlined"
              fullWidth
              value={emailTo} // Use emailTo for email address
              onChange={(e) => setEmailTo(e.target.value)}
            />
          )}
        </div>

        {/* Conditional rendering for Message (SMS) or Email Subject & Email Message (Email) */}
        <div className="mb-4">
          {notificationMethod === 'sms' && (
            <TextField
              label="Message"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          )}

          {notificationMethod === 'email' && (
            <>
              <TextField
                label="Email Subject"
                variant="outlined"
                fullWidth
                value={emailSubject}
                onChange={(e) => setEmailSubject(e.target.value)}
              />
              <TextField
                label="Email Message"
                variant="outlined"
                fullWidth
                multiline
                rows={4}
                value={emailMessage}
                onChange={(e) => setEmailMessage(e.target.value)}
              />
            </>
          )}
        </div>

        {/* Template Selection Component */}
        <TemplateSelection selectedTemplate={template} onTemplateChange={handleTemplateChange} />

        {/* Submit Button */}
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
