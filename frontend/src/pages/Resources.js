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
  Chip,
  Link,
  Tabs,
  Tab,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  CheckCircle as CheckCircleIcon,
  YouTube as YouTubeIcon,
  Code as CodeIcon,
  MenuBook as MenuBookIcon,
} from '@mui/icons-material';

const Resources = () => {
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentResource, setCurrentResource] = useState(null);
  const [currentTab, setCurrentTab] = useState(0);
  const [formData, setFormData] = useState({
    title: '',
    type: '',
    url: '',
    description: '',
    difficulty: '',
    notes: '',
  });

  // Curated resources
  const curatedResources = {
    dataStructures: [
      {
        id: 1,
        title: 'Data Structures and Algorithms in Python',
        type: 'Course',
        url: 'https://www.youtube.com/playlist?list=PLeo1K3hjS3uu_n_a__MI_KktGTLYopZ12',
        description: 'Complete DSA course by CodeWithHarry',
        difficulty: 'Beginner',
        notes: 'Great for Python developers',
        completed: false,
      },
      {
        id: 2,
        title: 'LeetCode Patterns',
        type: 'Article',
        url: 'https://seanprashad.com/leetcode-patterns/',
        description: 'Comprehensive guide to LeetCode patterns',
        difficulty: 'Intermediate',
        notes: 'Essential for interview preparation',
        completed: false,
      },
    ],
    algorithms: [
      {
        id: 3,
        title: 'Algorithms by Abdul Bari',
        type: 'Course',
        url: 'https://www.youtube.com/playlist?list=PLDN4rrl48XKpZkf03iYFl-O29szjTrs_O',
        description: 'In-depth algorithms course with detailed explanations',
        difficulty: 'Intermediate',
        notes: 'Excellent for understanding algorithm concepts',
        completed: false,
      },
      {
        id: 4,
        title: 'NeetCode 150',
        type: 'Course',
        url: 'https://neetcode.io/practice',
        description: 'Curated list of 150 most important LeetCode questions',
        difficulty: 'Advanced',
        notes: 'Must-do problems for interviews',
        completed: false,
      },
    ],
    systemDesign: [
      {
        id: 5,
        title: 'System Design Primer',
        type: 'Article',
        url: 'https://github.com/donnemartin/system-design-primer',
        description: 'Learn how to design large-scale systems',
        difficulty: 'Advanced',
        notes: 'Great resource for system design interviews',
        completed: false,
      },
      {
        id: 6,
        title: 'Gaurav Sen System Design',
        type: 'Course',
        url: 'https://www.youtube.com/playlist?list=PLMCXHnjXnTnvo6alSjVkgxV-VH6EPyvoX',
        description: 'System design concepts and interview preparation',
        difficulty: 'Intermediate',
        notes: 'Clear explanations with real-world examples',
        completed: false,
      },
    ],
  };

  // Mock data - replace with actual data from API
  const [resources, setResources] = useState([
    ...curatedResources.dataStructures,
    ...curatedResources.algorithms,
    ...curatedResources.systemDesign,
  ]);

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditMode(false);
    setCurrentResource(null);
    setFormData({
      title: '',
      type: '',
      url: '',
      description: '',
      difficulty: '',
      notes: '',
    });
  };

  const handleEdit = (resource) => {
    setEditMode(true);
    setCurrentResource(resource);
    setFormData({
      title: resource.title,
      type: resource.type,
      url: resource.url,
      description: resource.description,
      difficulty: resource.difficulty,
      notes: resource.notes,
    });
    setOpen(true);
  };

  const handleDelete = (id) => {
    setResources(resources.filter((resource) => resource.id !== id));
  };

  const handleSubmit = () => {
    if (editMode) {
      setResources(
        resources.map((resource) =>
          resource.id === currentResource.id
            ? { ...resource, ...formData }
            : resource
        )
      );
    } else {
      setResources([
        ...resources,
        {
          id: resources.length + 1,
          ...formData,
          completed: false,
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

  const toggleComplete = (id) => {
    setResources(
      resources.map((resource) =>
        resource.id === id
          ? { ...resource, completed: !resource.completed }
          : resource
      )
    );
  };

  const getResourceIcon = (type) => {
    switch (type) {
      case 'Video':
      case 'Course':
        return <YouTubeIcon />;
      case 'Article':
        return <MenuBookIcon />;
      case 'Practice':
        return <CodeIcon />;
      default:
        return <MenuBookIcon />;
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4" component="h1">
          Learning Resources
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleOpen}
        >
          Add Resource
        </Button>
      </Box>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={currentTab} onChange={handleTabChange}>
          <Tab label="All Resources" />
          <Tab label="Data Structures" />
          <Tab label="Algorithms" />
          <Tab label="System Design" />
        </Tabs>
      </Box>

      <Grid container spacing={3}>
        {resources.map((resource) => (
          <Grid item xs={12} md={6} lg={4} key={resource.id}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <Typography variant="h6" gutterBottom>
                    {resource.title}
                  </Typography>
                  <Chip
                    icon={getResourceIcon(resource.type)}
                    label={resource.type}
                    size="small"
                    color="primary"
                    variant="outlined"
                  />
                </Box>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {resource.description}
                </Typography>
                <Link href={resource.url} target="_blank" rel="noopener" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  {getResourceIcon(resource.type)}
                  View Resource
                </Link>
                <Box sx={{ mt: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    Difficulty: {resource.difficulty}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Notes: {resource.notes}
                  </Typography>
                </Box>
              </CardContent>
              <CardActions>
                <IconButton onClick={() => handleEdit(resource)}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => handleDelete(resource.id)}>
                  <DeleteIcon />
                </IconButton>
                <IconButton
                  onClick={() => toggleComplete(resource.id)}
                  color={resource.completed ? 'success' : 'default'}
                >
                  <CheckCircleIcon />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>{editMode ? 'Edit Resource' : 'Add New Resource'}</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
            <TextField
              name="title"
              label="Title"
              fullWidth
              value={formData.title}
              onChange={handleChange}
            />
            <TextField
              name="type"
              label="Type"
              fullWidth
              select
              value={formData.type}
              onChange={handleChange}
            >
              <MenuItem value="Article">Article</MenuItem>
              <MenuItem value="Video">Video</MenuItem>
              <MenuItem value="Course">Course</MenuItem>
              <MenuItem value="Practice">Practice Problems</MenuItem>
              <MenuItem value="Book">Book</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </TextField>
            <TextField
              name="url"
              label="URL"
              fullWidth
              value={formData.url}
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
              name="notes"
              label="Notes"
              fullWidth
              multiline
              rows={2}
              value={formData.notes}
              onChange={handleChange}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            {editMode ? 'Save Changes' : 'Add Resource'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Resources; 