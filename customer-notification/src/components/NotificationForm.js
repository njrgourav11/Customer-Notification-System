import React, { useState } from 'react';
import { Button, TextField, MenuItem, Select, FormControl, InputLabel, Paper, Typography, Box } from '@mui/material';
import TemplateSelection from './TemplateSelection';

const NotificationForm = ({ onSendNotification, setResponseMessage, setOpenSnackbar }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setMessage] = useState('');
  const [emailTo, setEmailTo] = useState('');
  const [emailSubject, setEmailSubject] = useState('');
  const [emailMessage, setEmailMessage] = useState('');
  const [notificationMethod, setNotificationMethod] = useState('sms');
  const [template, setTemplate] = useState('');

  // Handle template change from TemplateSelection
  const handleTemplateChange = (selectedTemplate, selectedTemplateMessage) => {
    setTemplate(selectedTemplate);

    if (notificationMethod === 'sms') {
      setMessage(selectedTemplateMessage || '');
      setEmailSubject('');
      setEmailMessage('');
    } else if (notificationMethod === 'email') {
      setEmailMessage(selectedTemplateMessage || '');
      setEmailSubject(`${selectedTemplate.charAt(0).toUpperCase() + selectedTemplate.slice(1)} Subject`);
      setMessage('');
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

    if (notificationMethod === 'email' && (!emailTo || !emailSubject || !emailMessage)) {
      setResponseMessage('Email To, Subject, and Message are required.');
      setOpenSnackbar(true);
      return;
    } else if (notificationMethod === 'sms' && (!phoneNumber || !message)) {
      setResponseMessage('Phone Number and Message are required.');
      setOpenSnackbar(true);
      return;
    }

    console.log('Sending notification data:', notificationData);

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
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #e0f0ff, #f5fbff)', // Light Blue Gradient Background 🎨
        padding: 3,
      }}
    >
      <Paper
        elevation={10}
        sx={{
          maxWidth: 500,
          width: '100%',
          padding: 4,
          borderRadius: 3,
          background: 'linear-gradient(135deg, #ffffff, #f2f8ff)', // Soft Inner Gradient 🌟
          boxShadow: '0px 10px 30px rgba(0,0,0,0.15)',
          transition: 'transform 0.3s ease-in-out',
          '&:hover': {
            transform: 'scale(1.02)',
          },
        }}
      >
        <Typography
          variant="h5"
          align="center"
          gutterBottom
          fontWeight="bold"
          sx={{
            background: 'linear-gradient(90deg, #0072ff, #00c6ff)', // Title Gradient
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          📢 Send a Notification
        </Typography>

        <form onSubmit={handleSubmit}>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel sx={{ fontWeight: 'bold' }}>Notification Method</InputLabel>
            <Select
              value={notificationMethod}
              onChange={(e) => {
                setNotificationMethod(e.target.value);
                setEmailSubject('');
                setEmailMessage('');
                setMessage('');
                setEmailTo('');
              }}
              label="Notification Method"
              sx={{
                background: 'linear-gradient(135deg, #e3f2fd, #ffffff)',
                borderRadius: 1,
                fontWeight: 'bold',
              }}
            >
              <MenuItem value="sms">📱 SMS</MenuItem>
              <MenuItem value="email">📧 Email</MenuItem>
            </Select>
          </FormControl>

          {/* Conditional Fields for SMS & Email */}
          {notificationMethod === 'sms' ? (
            <TextField
              label="📞 Phone Number"
              variant="outlined"
              fullWidth
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              sx={{
                mb: 2,
                background: 'linear-gradient(135deg, #eef7ff, #ffffff)',
                borderRadius: 1,
                fontWeight: 'bold',
              }}
            />
          ) : (
            <TextField
              label="📩 Email Address"
              variant="outlined"
              fullWidth
              value={emailTo}
              onChange={(e) => setEmailTo(e.target.value)}
              sx={{
                mb: 2,
                background: 'linear-gradient(135deg, #eef7ff, #ffffff)',
                borderRadius: 1,
                fontWeight: 'bold',
              }}
            />
          )}

          {notificationMethod === 'sms' ? (
            <TextField
              label="✉️ Message"
              variant="outlined"
              fullWidth
              multiline
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              sx={{
                mb: 2,
                background: 'linear-gradient(135deg, #eef7ff, #ffffff)',
                borderRadius: 1,
                fontWeight: 'bold',
              }}
            />
          ) : (
            <>
              <TextField
                label="📝 Email Subject"
                variant="outlined"
                fullWidth
                value={emailSubject}
                onChange={(e) => setEmailSubject(e.target.value)}
                sx={{
                  mb: 2,
                  background: 'linear-gradient(135deg, #eef7ff, #ffffff)',
                  borderRadius: 1,
                  fontWeight: 'bold',
                }}
              />
              <TextField
                label="📨 Email Message"
                variant="outlined"
                fullWidth
                multiline
                rows={3}
                value={emailMessage}
                onChange={(e) => setEmailMessage(e.target.value)}
                sx={{
                  mb: 2,
                  background: 'linear-gradient(135deg, #eef7ff, #ffffff)',
                  borderRadius: 1,
                  fontWeight: 'bold',
                }}
              />
            </>
          )}

          {/* Template Selection */}
          <TemplateSelection selectedTemplate={template} onTemplateChange={handleTemplateChange} />

          {/* Submit Button */}
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              mt: 2,
              background: 'linear-gradient(135deg, #0072ff, #00c6ff)', // Medium Blue Gradient Button
              color: 'white',
              fontWeight: 'bold',
              fontSize: '1rem',
              borderRadius: 2,
              padding: '12px',
              textTransform: 'none',
              '&:hover': {
                background: 'linear-gradient(135deg, #005bbf, #0096ff)',
              },
            }}
          >
            🚀 Send Notification
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default NotificationForm;
