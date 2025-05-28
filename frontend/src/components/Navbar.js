import React from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  Container
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <AppBar position="static">
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, cursor: 'pointer' }}
            onClick={() => navigate('/')}
          >
            Study Helper
          </Typography>

          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button color="inherit" onClick={() => navigate('/topics')}>
              Topics
            </Button>
            <Button color="inherit" onClick={() => navigate('/resources')}>
              Resources
            </Button>
            <Button color="inherit" onClick={() => navigate('/flashcards')}>
              Flashcards
            </Button>
            <Button color="inherit" onClick={() => navigate('/playground')}>
              Code Playground
            </Button>
            <Button color="inherit" onClick={() => navigate('/progress')}>
              Progress
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar; 