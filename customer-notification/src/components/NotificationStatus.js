import React from 'react';
import { Typography, CircularProgress, Paper, Box } from '@mui/material';

const NotificationStatus = ({ status }) => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="200px"
    >
      <Paper
        elevation={6}
        sx={{
          padding: 3,
          borderRadius: 3,
          background: 'linear-gradient(135deg, #f8faff, #e3ecff)', // Subtle gradient 🎨
          boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.1)',
          textAlign: 'center',
          minWidth: '300px',
        }}
      >
        {status === 'loading' ? (
          <Box display="flex" flexDirection="column" alignItems="center">
            <CircularProgress sx={{ color: '#0072ff' }} />
            <Typography
              variant="h6"
              sx={{
                mt: 2,
                fontWeight: 'bold',
                color: '#0072ff',
              }}
            >
              Sending Notification...
            </Typography>
          </Box>
        ) : (
          <Typography
            variant="h6"
            sx={{
              fontWeight: 'bold',
              color: status === 'sent' ? '#008000' : '#d32f2f', // Green for success, Red for failure
            }}
          >
            {status === 'sent' ? '✅ Notification Sent Successfully!' : '❌ Failed to Send Notification'}
          </Typography>
        )}
      </Paper>
    </Box>
  );
};

export default NotificationStatus;
