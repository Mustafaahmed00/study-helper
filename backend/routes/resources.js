const express = require('express');
const router = express.Router();
const Resource = require('../models/Resource');

// Get all resources
router.get('/', async (req, res) => {
  try {
    const resources = await Resource.find().populate('topics');
    res.json(resources);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a single resource
router.get('/:id', async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.id).populate('topics');
    if (!resource) {
      return res.status(404).json({ message: 'Resource not found' });
    }
    res.json(resource);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new resource
router.post('/', async (req, res) => {
  const resource = new Resource({
    title: req.body.title,
    type: req.body.type,
    url: req.body.url,
    description: req.body.description,
    topics: req.body.topics,
    difficulty: req.body.difficulty,
    notes: req.body.notes
  });

  try {
    const newResource = await resource.save();
    res.status(201).json(newResource);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a resource
router.patch('/:id', async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.id);
    if (!resource) {
      return res.status(404).json({ message: 'Resource not found' });
    }

    Object.keys(req.body).forEach(key => {
      resource[key] = req.body[key];
    });

    const updatedResource = await resource.save();
    res.json(updatedResource);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a resource
router.delete('/:id', async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.id);
    if (!resource) {
      return res.status(404).json({ message: 'Resource not found' });
    }

    await resource.remove();
    res.json({ message: 'Resource deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Mark a resource as completed
router.patch('/:id/complete', async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.id);
    if (!resource) {
      return res.status(404).json({ message: 'Resource not found' });
    }

    resource.completed = true;
    const updatedResource = await resource.save();
    res.json(updatedResource);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router; 