import React from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

const Progress = () => {
  // Mock data - replace with actual data from API
  const stats = {
    overall: {
      totalTopics: 5,
      averageProgress: 65,
      totalStudyTime: 120, // in minutes
    },
    daily: {
      date: new Date(),
      totalStudyTime: 45,
      topics: [
        {
          id: 1,
          title: 'Data Structures',
          studyTime: 30,
          progress: 75,
        },
        {
          id: 2,
          title: 'Algorithms',
          studyTime: 15,
          progress: 60,
        },
      ],
    },
    weekly: {
      weekStart: new Date(2024, 2, 18),
      weekEnd: new Date(2024, 2, 24),
      totalStudyTime: 300,
      topics: [
        {
          id: 1,
          title: 'Data Structures',
          studyTime: 180,
          progress: 75,
        },
        {
          id: 2,
          title: 'Algorithms',
          studyTime: 120,
          progress: 60,
        },
      ],
    },
  };

  const formatTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Study Progress
      </Typography>

      <Grid container spacing={3}>
        {/* Overall Progress */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Overall Progress
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" color="primary">
                    {stats.overall.totalTopics}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Total Topics
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" color="primary">
                    {stats.overall.averageProgress}%
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Average Progress
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" color="primary">
                    {formatTime(stats.overall.totalStudyTime)}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Total Study Time
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* Daily Progress */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Today's Progress
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              {stats.daily.date.toLocaleDateString()}
            </Typography>
            <Typography variant="h5" gutterBottom>
              {formatTime(stats.daily.totalStudyTime)}
            </Typography>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Topic</TableCell>
                    <TableCell align="right">Time</TableCell>
                    <TableCell align="right">Progress</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {stats.daily.topics.map((topic) => (
                    <TableRow key={topic.id}>
                      <TableCell>{topic.title}</TableCell>
                      <TableCell align="right">
                        {formatTime(topic.studyTime)}
                      </TableCell>
                      <TableCell align="right">{topic.progress}%</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>

        {/* Weekly Progress */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Weekly Progress
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              {stats.weekly.weekStart.toLocaleDateString()} -{' '}
              {stats.weekly.weekEnd.toLocaleDateString()}
            </Typography>
            <Typography variant="h5" gutterBottom>
              {formatTime(stats.weekly.totalStudyTime)}
            </Typography>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Topic</TableCell>
                    <TableCell align="right">Time</TableCell>
                    <TableCell align="right">Progress</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {stats.weekly.topics.map((topic) => (
                    <TableRow key={topic.id}>
                      <TableCell>{topic.title}</TableCell>
                      <TableCell align="right">
                        {formatTime(topic.studyTime)}
                      </TableCell>
                      <TableCell align="right">{topic.progress}%</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Progress; 