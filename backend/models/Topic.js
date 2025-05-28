const mongoose = require('mongoose');

const topicSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Data Structures', 'Algorithms', 'Programming', 'Mathematics', 'Other']
  },
  difficulty: {
    type: String,
    required: true,
    enum: ['Beginner', 'Intermediate', 'Advanced']
  },
  resources: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Resource'
  }],
  progress: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  },
  studyLogs: [{
    date: {
      type: Date,
      default: Date.now
    },
    duration: {
      type: Number, // in minutes
      required: true
    },
    notes: String
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt timestamp before saving
topicSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Topic', topicSchema); 