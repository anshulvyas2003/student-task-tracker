const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const Task = require('./models/Task');

// GET all tasks
app.get('/api/tasks', async (req, res) => {
  try {
    const { search, status, priority } = req.query;
    let filter = {};
    if (status)   filter.status = status;
    if (priority) filter.priority = priority;
    if (search)   filter.title = { $regex: search, $options: 'i' };
    const tasks = await Task.find(filter).sort({ dueDate: 1 });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST create task
app.post('/api/tasks', async (req, res) => {
  try {
    const task = new Task(req.body);
    const saved = await task.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT update task
app.put('/api/tasks/:id', async (req, res) => {
  try {
    const updated = await Task.findByIdAndUpdate(
      req.params.id, req.body, { new: true, runValidators: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE task
app.delete('/api/tasks/:id', async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: 'Task deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected!');
    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  })
  .catch(err => console.error('DB error:', err));