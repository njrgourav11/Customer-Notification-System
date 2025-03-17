import React, { useState } from 'react';
import { CssBaseline, Drawer, List, ListItem, ListItemText, AppBar, Toolbar, Typography, Divider, IconButton, Box, Button } from '@mui/material';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './components/Home';
import NotificationForm from './components/NotificationForm';
import TemplatePage from './components/TemplateSelection';
import NotificationStatus from './components/NotificationStatus';
import MenuIcon from '@mui/icons-material/Menu';  // Importing Menu Icon
import HomeIcon from '@mui/icons-material/Home';  // Home icon
import NotificationsIcon from '@mui/icons-material/Notifications';  // Notification icon
import SettingsIcon from '@mui/icons-material/Settings';  // Settings icon
import NotificationHistory from './components/NotificationHistory';

const App = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);  // State to control drawer open/close
  const [responseMessage, setResponseMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  // Handle the drawer toggle
  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  // onSendNotification function that handles form submission and returns a Promise
  const onSendNotification = (notificationData) => {
    return new Promise((resolve, reject) => {
      const apiUrl = notificationData.notificationMethod === 'sms' ? '/send-sms' : '/send-email';
      
      fetch('https://notificationbackend1234.vercel.app/' + apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(notificationData),
      })
        .then((response) => response.json())
        .then((data) => resolve(data))  // Resolve with success data
        .catch((error) => reject(error)); // Reject with error
    });
  };

  return (
    <Router>
      <div style={{ display: 'flex' }}>
        <CssBaseline />

        {/* Sidebar - Temporary Drawer on mobile and Permanent on desktop */}
        <Drawer
          variant={drawerOpen ? 'temporary' : 'permanent'} // Use temporary for mobile and permanent for desktop
          anchor="left"
          open={drawerOpen}
          onClose={toggleDrawer}
          sx={{
            width: 240,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: 240,
              boxSizing: 'border-box',
            },
          }}
        >
          <div>
            <AppBar position="fixed" sx={{ zIndex: 1 }}>
              <Toolbar>
                <IconButton
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  sx={{ mr: 2 }}
                  onClick={toggleDrawer}
                >
                  <MenuIcon />
                </IconButton>
                <Typography variant="h6">Customer Notification System</Typography>
              </Toolbar>
            </AppBar>

            <List>
              <ListItem button component={Link} to="/">
                <HomeIcon sx={{ mr: 2 }} />
                <ListItemText primary="Home" />
              </ListItem>
              <Divider />
              <ListItem button component={Link} to="/notification-form">
                <NotificationsIcon sx={{ mr: 2 }} />
                <ListItemText primary="Notification Form" />
              </ListItem>
              <Divider />
              <ListItem button component={Link} to="/templates">
                <SettingsIcon sx={{ mr: 2 }} />
                <ListItemText primary="Templates" />
              </ListItem>
              <Divider />
              <ListItem button component={Link} to="/notification-status">
                <NotificationsIcon sx={{ mr: 2 }} />
                <ListItemText primary="Notification Status" />
              </ListItem>
            </List>
          </div>
        </Drawer>

        {/* Content Area */}
        <main style={{ flexGrow: 1, padding: '20px', marginLeft: drawerOpen ? 240 : 0, marginTop: '64px' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/notification-form"
              element={<NotificationForm onSendNotification={onSendNotification} setResponseMessage={setResponseMessage} setOpenSnackbar={setOpenSnackbar} />}
            />
            <Route path="/templates" element={<TemplatePage />} />
            <Route path="/notification-status" element={<NotificationHistory />} />
          </Routes>
        </main>

        {/* Footer */}
        <Box sx={{ width: '100%', position: 'fixed', bottom: 0, left: 0, backgroundColor: '#1976d2', color: 'white', textAlign: 'center', padding: '10px' }}>
          <Typography variant="body2">
            © 2025 Customer Notification System. All rights reserved.
          </Typography>
        </Box>

        {/* Snackbar for success or error messages */}
        <Box
          sx={{
            display: openSnackbar ? 'block' : 'none',
            position: 'fixed',
            bottom: 20,
            left: 20,
            backgroundColor: 'red',
            color: 'white',
            padding: '10px',
            borderRadius: '4px',
            boxShadow: 3,
            minWidth: '300px',
            zIndex: 9999,
          }}
        >
          <Typography variant="body2">{responseMessage}</Typography>
          <Button onClick={() => setOpenSnackbar(false)} variant="contained" color="secondary" size="small">
            Close
          </Button>
        </Box>
      </div>
    </Router>
  );
};

export default App;
