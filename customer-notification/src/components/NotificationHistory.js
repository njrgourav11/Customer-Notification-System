import React, { useState, useEffect } from 'react';
import { Typography, Card, CardContent, Button, Box } from '@mui/material';
import axios from 'axios';

const NotificationHistory = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await axios.get('https://notificationbackend1234.vercel.app/api/notifications'); // Backend API
        // Ensure history is defined before attempting to use length
        setHistory(response.data.history || []);  // Default to an empty array if history is undefined
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch history');
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <div>
      <Typography variant="h6">Notification History</Typography>
      {history.length > 0 ? (
        history.map((notification) => (
          <Card key={notification.id} className="mb-4">
            <CardContent>
              <Typography variant="body1">Phone: {notification.phoneNumber || notification.email}</Typography>
              <Typography variant="body2" color="textSecondary">
                {notification.message}
              </Typography>
              <Typography variant="body2" color={notification.status === 'Sent' ? 'green' : 'red'}>
                Status: {notification.status}
              </Typography>
              {notification.error && (
                <Box mt={2}>
                  <Typography variant="body2" color="error">
                    Error: {notification.error}
                  </Typography>
                </Box>
              )}
              <Button variant="outlined" color="primary" size="small">
                View Details
              </Button>
            </CardContent>
          </Card>
        ))
      ) : (
        <Typography>No notifications found.</Typography>
      )}
    </div>
  );
};

export default NotificationHistory;
