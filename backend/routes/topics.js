const express = require('express');
const router = express.Router();
const Topic = require('../models/Topic');

// Get all topics
router.get('/', async (req, res) => {
  try {
    const topics = await Topic.find().populate('resources');
    res.json(topics);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a single topic
router.get('/:id', async (req, res) => {
  try {
    const topic = await Topic.findById(req.params.id).populate('resources');
    if (!topic) {
      return res.status(404).json({ message: 'Topic not found' });
    }
    res.json(topic);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new topic
router.post('/', async (req, res) => {
  const topic = new Topic({
    title: req.body.title,
    description: req.body.description,
    category: req.body.category,
    difficulty: req.body.difficulty
  });

  try {
    const newTopic = await topic.save();
    res.status(201).json(newTopic);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a topic
router.patch('/:id', async (req, res) => {
  try {
    const topic = await Topic.findById(req.params.id);
    if (!topic) {
      return res.status(404).json({ message: 'Topic not found' });
    }

    Object.keys(req.body).forEach(key => {
      topic[key] = req.body[key];
    });

    const updatedTopic = await topic.save();
    res.json(updatedTopic);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a topic
router.delete('/:id', async (req, res) => {
  try {
    const topic = await Topic.findById(req.params.id);
    if (!topic) {
      return res.status(404).json({ message: 'Topic not found' });
    }

    await topic.remove();
    res.json({ message: 'Topic deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a study log to a topic
router.post('/:id/logs', async (req, res) => {
  try {
    const topic = await Topic.findById(req.params.id);
    if (!topic) {
      return res.status(404).json({ message: 'Topic not found' });
    }

    topic.studyLogs.push({
      duration: req.body.duration,
      notes: req.body.notes
    });

    const updatedTopic = await topic.save();
    res.json(updatedTopic);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router; 