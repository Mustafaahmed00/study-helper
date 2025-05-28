const express = require('express');
const router = express.Router();
const Topic = require('../models/Topic');

// Get overall progress
router.get('/overall', async (req, res) => {
  try {
    const topics = await Topic.find();
    const totalProgress = topics.reduce((acc, topic) => acc + topic.progress, 0);
    const averageProgress = topics.length > 0 ? totalProgress / topics.length : 0;
    
    res.json({
      totalTopics: topics.length,
      averageProgress,
      topicsProgress: topics.map(topic => ({
        id: topic._id,
        title: topic.title,
        progress: topic.progress
      }))
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get daily study statistics
router.get('/daily', async (req, res) => {
  try {
    const topics = await Topic.find();
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const dailyStats = topics.map(topic => {
      const todayLogs = topic.studyLogs.filter(log => {
        const logDate = new Date(log.date);
        logDate.setHours(0, 0, 0, 0);
        return logDate.getTime() === today.getTime();
      });

      return {
        topicId: topic._id,
        topicTitle: topic.title,
        studyTime: todayLogs.reduce((acc, log) => acc + log.duration, 0),
        logs: todayLogs
      };
    });

    res.json({
      date: today,
      totalStudyTime: dailyStats.reduce((acc, stat) => acc + stat.studyTime, 0),
      topics: dailyStats
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get weekly study statistics
router.get('/weekly', async (req, res) => {
  try {
    const topics = await Topic.find();
    const today = new Date();
    const weekStart = new Date(today);
    weekStart.setDate(today.getDate() - today.getDay());
    weekStart.setHours(0, 0, 0, 0);

    const weeklyStats = topics.map(topic => {
      const weekLogs = topic.studyLogs.filter(log => {
        const logDate = new Date(log.date);
        return logDate >= weekStart && logDate <= today;
      });

      return {
        topicId: topic._id,
        topicTitle: topic.title,
        studyTime: weekLogs.reduce((acc, log) => acc + log.duration, 0),
        logs: weekLogs
      };
    });

    res.json({
      weekStart,
      weekEnd: today,
      totalStudyTime: weeklyStats.reduce((acc, stat) => acc + stat.studyTime, 0),
      topics: weeklyStats
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router; 