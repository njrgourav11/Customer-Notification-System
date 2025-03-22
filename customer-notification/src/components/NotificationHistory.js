import React, { useState, useEffect } from 'react';
import { Typography, Card, CardContent, Button, Box, CircularProgress, Paper } from '@mui/material';
import axios from 'axios';

const NotificationHistory = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/notifications'); // Backend API
        setHistory(response.data.history || []); // Default to an empty array if history is undefined
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch history');
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        background: 'linear-gradient(135deg, #f8faff, #e3ecff)', // Light blue gradient 🎨
        padding: 4,
      }}
    >
      <Paper
        elevation={12}
        sx={{
          maxWidth: 600,
          width: '100%',
          padding: 3,
          borderRadius: 3,
          background: 'linear-gradient(135deg, #ffffff, #f0f5ff)', // Subtle gradient inside the container
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
            background: 'linear-gradient(90deg, #0072ff, #00c6ff)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          📜 Notification History
        </Typography>

        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" height="200px">
            <CircularProgress />
          </Box>
        ) : error ? (
          <Typography color="error" align="center">
            {error}
          </Typography>
        ) : history.length > 0 ? (
          history.map((notification) => (
            <Card
              key={notification.id}
              sx={{
                mb: 2,
                borderRadius: 2,
                boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.1)',
                transition: 'all 0.3s',
                '&:hover': {
                  transform: 'scale(1.02)',
                  boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.15)',
                },
              }}
            >
              <CardContent
                sx={{
                  background: 'linear-gradient(135deg, #f8fbff, #eef5ff)',
                  borderRadius: 2,
                }}
              >
                <Typography variant="body1" fontWeight="bold">
                  📞 {notification.phoneNumber || notification.email}
                </Typography>
                <Typography variant="body2" color="textSecondary" sx={{ mt: 1, mb: 1 }}>
                  {notification.message}
                </Typography>

                {/* Status with color indication */}
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 'bold',
                    color: notification.status === 'Sent' ? '#008000' : '#d32f2f',
                  }}
                >
                  ✅ Status: {notification.status}
                </Typography>

                {/* Display error message if exists */}
                {notification.error && (
                  <Box mt={1}>
                    <Typography variant="body2" color="error">
                      ⚠️ Error: {notification.error}
                    </Typography>
                  </Box>
                )}

                <Button
                  variant="contained"
                  size="small"
                  sx={{
                    mt: 2,
                    background: 'linear-gradient(135deg, #0072ff, #00c6ff)',
                    color: 'white',
                    fontWeight: 'bold',
                    textTransform: 'none',
                    borderRadius: 2,
                    '&:hover': {
                      background: 'linear-gradient(135deg, #005bbf, #0096ff)',
                    },
                  }}
                >
                  🔍 View Details
                </Button>
              </CardContent>
            </Card>
          ))
        ) : (
          <Typography align="center">No notifications found.</Typography>
        )}
      </Paper>
    </Box>
  );
};

export default NotificationHistory;
