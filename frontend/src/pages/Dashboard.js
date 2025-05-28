import React from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  LinearProgress,
} from '@mui/material';
import {
  Timeline as TimelineIcon,
  Book as BookIcon,
  LibraryBooks as LibraryIcon,
} from '@mui/icons-material';

const Dashboard = () => {
  // Mock data - replace with actual data from API
  const stats = {
    totalTopics: 5,
    totalResources: 12,
    averageProgress: 65,
    recentTopics: [
      { id: 1, title: 'Data Structures', progress: 75 },
      { id: 2, title: 'Algorithms', progress: 60 },
      { id: 3, title: 'Web Development', progress: 80 },
    ],
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        {/* Overview Cards */}
        <Grid item xs={12} md={4}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 140,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <BookIcon sx={{ mr: 1 }} />
              <Typography component="h2" variant="h6" color="primary">
                Total Topics
              </Typography>
            </Box>
            <Typography component="p" variant="h4">
              {stats.totalTopics}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 140,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <LibraryIcon sx={{ mr: 1 }} />
              <Typography component="h2" variant="h6" color="primary">
                Total Resources
              </Typography>
            </Box>
            <Typography component="p" variant="h4">
              {stats.totalResources}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 140,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <TimelineIcon sx={{ mr: 1 }} />
              <Typography component="h2" variant="h6" color="primary">
                Average Progress
              </Typography>
            </Box>
            <Typography component="p" variant="h4">
              {stats.averageProgress}%
            </Typography>
          </Paper>
        </Grid>

        {/* Recent Topics */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
              Recent Topics
            </Typography>
            {stats.recentTopics.map((topic) => (
              <Box key={topic.id} sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body1">{topic.title}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {topic.progress}%
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={topic.progress}
                  sx={{ height: 8, borderRadius: 4 }}
                />
              </Box>
            ))}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard; 