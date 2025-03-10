import React from 'react';
import { Typography, CircularProgress } from '@mui/material';

const NotificationStatus = ({ status }) => {
  return (
    <div className="flex justify-center items-center p-4">
      {status === 'loading' ? (
        <CircularProgress />
      ) : (
        <Typography variant="h6">{status === 'sent' ? 'Notification Sent!' : 'Failed to Send Notification'}</Typography>
      )}
    </div>
  );
};

export default NotificationStatus;
