import React from 'react';
import { Container, Typography, Card, CardContent, Grid, Box, CardMedia } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SmsIcon from '@mui/icons-material/Sms';
import EmailIcon from '@mui/icons-material/Email';
import EventIcon from '@mui/icons-material/Event';
import SecurityIcon from '@mui/icons-material/Security';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';

const HomePage = () => {
  return (
    <>
      {/* Hero Section with Background Image */}
      <Box 
        sx={{
          backgroundImage: `url(https://images.unsplash.com/photo-1582133707381-17d80c0a9df5)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '400px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          color: 'black',
          padding: '40px',
          backgroundBlendMode: 'lighten',
        }}
      >
        <Container>
          <Typography variant="h3" fontWeight="bold" gutterBottom>
            "Communication is the lifeline of success."
          </Typography>
          <Typography variant="h6">
            Ensure timely and effective engagement with real-time customer notifications.
          </Typography>
        </Container>
      </Box>

      {/* Main Content */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={4} alignItems="center">
          {/* Customer Engagement */}
          <Grid item xs={12} md={6}>
            <Card sx={{ boxShadow: 3 }}>
              <CardMedia
                component="img"
                height="250"
                image="https://images.unsplash.com/photo-1588702547923-7093a6c3ba33"
                alt="Customer Engagement"
              />
              <CardContent>
                <Typography variant="h5" fontWeight="bold" gutterBottom>
                  Elevate Customer Engagement
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  Instant notifications keep your customers informed, engaged, and satisfied. 
                  Whether it's promotions, reminders, or service updates, timely communication builds trust.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          {/* Notification Features */}
          <Grid item xs={12} md={6}>
            <Card sx={{ boxShadow: 3 }}>
              <CardMedia
                component="img"
                height="250"
                image="https://images.unsplash.com/photo-1516321497487-e288fb19713f"
                alt="Notification Features"
              />
              <CardContent>
                <Typography variant="h5" fontWeight="bold" gutterBottom>
                  Key Features at a Glance
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  <SmsIcon sx={{ verticalAlign: 'middle', color: 'primary.main', mr: 1 }} />
                  Multi-Channel Notifications (SMS, Email, Push) <br/>
                  <NotificationsIcon sx={{ verticalAlign: 'middle', color: 'primary.main', mr: 1 }} />
                  Real-time Alerts & Scheduled Messages <br/>
                  <EventIcon sx={{ verticalAlign: 'middle', color: 'primary.main', mr: 1 }} />
                  Event-Based Notifications <br/>
                  <EmailIcon sx={{ verticalAlign: 'middle', color: 'primary.main', mr: 1 }} />
                  Customizable Templates & Personalization
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Security & Analytics */}
        <Grid container spacing={4} sx={{ mt: 4 }}>
          <Grid item xs={12} md={6}>
            <Card sx={{ boxShadow: 3 }}>
              <CardMedia
                component="img"
                height="250"
                image="https://images.unsplash.com/photo-1556741533-411cf82e4e2d"
                alt="Data Security"
              />
              <CardContent>
                <Typography variant="h5" fontWeight="bold" gutterBottom>
                  Secure & Reliable Messaging
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  <SecurityIcon sx={{ verticalAlign: 'middle', color: 'primary.main', mr: 1 }} />
                  Our platform ensures secure data transmission, protecting customer information 
                  through encryption and compliance with industry standards.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card sx={{ boxShadow: 3 }}>
              <CardMedia
                component="img"
                height="250"
                image="https://images.unsplash.com/photo-1516321318423-f06f85e504b3"
                alt="Analytics & Insights"
              />
              <CardContent>
                <Typography variant="h5" fontWeight="bold" gutterBottom>
                  Smart Insights & Analytics
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  <AutoGraphIcon sx={{ verticalAlign: 'middle', color: 'primary.main', mr: 1 }} />
                  Get detailed insights into message delivery rates, engagement levels, and 
                  customer responses to optimize communication strategies.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* How It Works Section */}
        <Box sx={{ mt: 8, textAlign: 'center' }}>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            How It Works
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Simple steps to keep your customers informed:
          </Typography>
        </Box>

        <Grid container spacing={4} sx={{ mt: 4 }}>
          <Grid item xs={12} md={3}>
            <Card sx={{ textAlign: 'center', p: 3, boxShadow: 3 }}>
              <Typography variant="h6" fontWeight="bold">Step 1</Typography>
              <Typography variant="body2">Enter Customer Contact Details</Typography>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card sx={{ textAlign: 'center', p: 3, boxShadow: 3 }}>
              <Typography variant="h6" fontWeight="bold">Step 2</Typography>
              <Typography variant="body2">Choose a Template or Write a Custom Message</Typography>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card sx={{ textAlign: 'center', p: 3, boxShadow: 3 }}>
              <Typography variant="h6" fontWeight="bold">Step 3</Typography>
              <Typography variant="body2">Select Notification Method (SMS, Email, Push)</Typography>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card sx={{ textAlign: 'center', p: 3, boxShadow: 3 }}>
              <Typography variant="h6" fontWeight="bold">Step 4</Typography>
              <Typography variant="body2">Send Notification & Track Delivery</Typography>
            </Card>
          </Grid>
        </Grid>

        <Typography variant="h6" align="center" color="textSecondary" sx={{ mt: 8 }}>
          "Great communication is the key to customer loyalty and success."
        </Typography>
      </Container>
    </>
  );
};

export default HomePage;
