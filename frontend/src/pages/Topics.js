import React, { useState } from 'react';
import {
  Container,
  Grid,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Box,
  Card,
  CardContent,
  CardActions,
  IconButton,
  LinearProgress,
  Chip,
  Stack,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  CheckCircle as CheckCircleIcon,
} from '@mui/icons-material';

const Topics = () => {
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentTopic, setCurrentTopic] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    difficulty: '',
    progress: 0,
  });

  // Predefined topics with descriptions
  const predefinedTopics = [
    {
      id: 1,
      name: 'Arrays and Strings',
      description: 'Fundamental data structures for storing and manipulating sequences of elements. Essential for most programming tasks.',
      category: 'Data Structures',
      difficulty: 'Beginner',
      progress: 0,
    },
    {
      id: 2,
      name: 'Linked Lists',
      description: 'Dynamic data structure where elements are stored in nodes that are linked together. Important for understanding memory management.',
      category: 'Data Structures',
      difficulty: 'Beginner',
      progress: 0,
    },
    {
      id: 3,
      name: 'Trees and Graphs',
      description: 'Hierarchical data structures used to represent relationships between data. Crucial for many algorithms and real-world applications.',
      category: 'Data Structures',
      difficulty: 'Intermediate',
      progress: 0,
    },
    {
      id: 4,
      name: 'Dynamic Programming',
      description: 'Problem-solving technique that breaks down complex problems into simpler subproblems. Essential for optimization problems.',
      category: 'Algorithms',
      difficulty: 'Advanced',
      progress: 0,
    },
    {
      id: 5,
      name: 'Sorting and Searching',
      description: 'Fundamental algorithms for organizing and retrieving data efficiently. Building blocks for more complex algorithms.',
      category: 'Algorithms',
      difficulty: 'Beginner',
      progress: 0,
    },
    {
      id: 6,
      name: 'System Design',
      description: 'Process of defining architecture, components, and interfaces for a system. Critical for building scalable applications.',
      category: 'System Design',
      difficulty: 'Advanced',
      progress: 0,
    },
  ];

  // Mock data - replace with actual data from API
  const [topics, setTopics] = useState(predefinedTopics);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditMode(false);
    setCurrentTopic(null);
    setFormData({
      name: '',
      description: '',
      category: '',
      difficulty: '',
      progress: 0,
    });
  };

  const handleEdit = (topic) => {
    setEditMode(true);
    setCurrentTopic(topic);
    setFormData({
      name: topic.name,
      description: topic.description,
      category: topic.category,
      difficulty: topic.difficulty,
      progress: topic.progress,
    });
    setOpen(true);
  };

  const handleDelete = (id) => {
    setTopics(topics.filter((topic) => topic.id !== id));
  };

  const handleSubmit = () => {
    if (editMode) {
      setTopics(
        topics.map((topic) =>
          topic.id === currentTopic.id ? { ...topic, ...formData } : topic
        )
      );
    } else {
      setTopics([
        ...topics,
        {
          id: topics.length + 1,
          ...formData,
        },
      ]);
    }
    handleClose();
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleProgressChange = (id, newProgress) => {
    setTopics(
      topics.map((topic) =>
        topic.id === id ? { ...topic, progress: newProgress } : topic
      )
    );
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner':
        return 'success';
      case 'Intermediate':
        return 'warning';
      case 'Advanced':
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4" component="h1">
          Study Topics
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleOpen}
        >
          Add Topic
        </Button>
      </Box>

      <Grid container spacing={3}>
        {topics.map((topic) => (
          <Grid item xs={12} md={6} lg={4} key={topic.id}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                  <Typography variant="h6" gutterBottom>
                    {topic.name}
                  </Typography>
                  <Chip
                    label={topic.difficulty}
                    color={getDifficultyColor(topic.difficulty)}
                    size="small"
                  />
                </Box>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {topic.description}
                </Typography>
                <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                  <Chip label={topic.category} size="small" variant="outlined" />
                </Stack>
                <Box sx={{ mt: 2 }}>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Progress: {topic.progress}%
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={topic.progress}
                    sx={{ height: 8, borderRadius: 4 }}
                  />
                </Box>
              </CardContent>
              <CardActions>
                <IconButton onClick={() => handleEdit(topic)}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => handleDelete(topic.id)}>
                  <DeleteIcon />
                </IconButton>
                <IconButton
                  onClick={() =>
                    handleProgressChange(
                      topic.id,
                      Math.min(topic.progress + 10, 100)
                    )
                  }
                >
                  <CheckCircleIcon />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>{editMode ? 'Edit Topic' : 'Add New Topic'}</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
            <TextField
              name="name"
              label="Topic Name"
              fullWidth
              value={formData.name}
              onChange={handleChange}
            />
            <TextField
              name="description"
              label="Description"
              fullWidth
              multiline
              rows={3}
              value={formData.description}
              onChange={handleChange}
            />
            <TextField
              name="category"
              label="Category"
              fullWidth
              select
              value={formData.category}
              onChange={handleChange}
            >
              <MenuItem value="Data Structures">Data Structures</MenuItem>
              <MenuItem value="Algorithms">Algorithms</MenuItem>
              <MenuItem value="System Design">System Design</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </TextField>
            <TextField
              name="difficulty"
              label="Difficulty"
              fullWidth
              select
              value={formData.difficulty}
              onChange={handleChange}
            >
              <MenuItem value="Beginner">Beginner</MenuItem>
              <MenuItem value="Intermediate">Intermediate</MenuItem>
              <MenuItem value="Advanced">Advanced</MenuItem>
            </TextField>
            <TextField
              name="progress"
              label="Progress"
              type="number"
              fullWidth
              value={formData.progress}
              onChange={handleChange}
              inputProps={{ min: 0, max: 100 }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            {editMode ? 'Save Changes' : 'Add Topic'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Topics; 