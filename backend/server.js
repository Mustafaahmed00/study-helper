require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const topicRoutes = require('./routes/topics');
const resourceRoutes = require('./routes/resources');
const progressRoutes = require('./routes/progress');
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/topics', topicRoutes);
app.use('/api/resources', resourceRoutes);
app.use('/api/progress', progressRoutes);

// Code execution endpoint
app.post('/api/execute', async (req, res) => {
  const { code, language } = req.body;
  
  if (!code || !language) {
    return res.status(400).json({ error: 'Code and language are required' });
  }

  try {
    if (language === 'javascript') {
      // JavaScript execution (client-side)
      res.json({ output: 'JavaScript execution is handled client-side' });
    } else if (language === 'python') {
      // Create a temporary file for Python code
      const tempFile = path.join(__dirname, 'temp.py');
      fs.writeFileSync(tempFile, code);

      // Execute Python code
      exec(`python3 ${tempFile}`, (error, stdout, stderr) => {
        // Clean up the temporary file
        fs.unlinkSync(tempFile);

        if (error) {
          return res.status(400).json({ error: error.message });
        }
        if (stderr) {
          return res.status(400).json({ error: stderr });
        }
        res.json({ output: stdout });
      });
    } else {
      res.status(400).json({ error: 'Unsupported language' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 