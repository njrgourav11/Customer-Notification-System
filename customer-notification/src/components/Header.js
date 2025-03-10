import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';

const Header = () => {
  return (
    <AppBar position="sticky" color="primary">
      <Toolbar>
        <Typography variant="h6" color="inherit">
          Customer Notification System
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
