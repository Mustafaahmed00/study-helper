import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Book as BookIcon,
  LibraryBooks as LibraryIcon,
  Timeline as TimelineIcon,
} from '@mui/icons-material';

const Navbar = () => {
  return (
    <AppBar position="static">
      <Container maxWidth="lg">
        <Toolbar>
          <Typography
            variant="h6"
            component={RouterLink}
            to="/"
            sx={{
              flexGrow: 1,
              textDecoration: 'none',
              color: 'inherit',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            Study Helper
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              color="inherit"
              component={RouterLink}
              to="/"
              startIcon={<DashboardIcon />}
            >
              Dashboard
            </Button>
            <Button
              color="inherit"
              component={RouterLink}
              to="/topics"
              startIcon={<BookIcon />}
            >
              Topics
            </Button>
            <Button
              color="inherit"
              component={RouterLink}
              to="/resources"
              startIcon={<LibraryIcon />}
            >
              Resources
            </Button>
            <Button
              color="inherit"
              component={RouterLink}
              to="/progress"
              startIcon={<TimelineIcon />}
            >
              Progress
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar; 