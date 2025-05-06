const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Task = require('./models/task');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Get MongoDB URI from environment variable or use default
const MONGO_URI = process.env.MONGO_URI || 'mongodb://mongo-service:27017/todo-app';

// Connect to MongoDB
console.log(`Attempting to connect to MongoDB at: ${MONGO_URI}`);
mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB successfully'))
.catch(err => console.error('MongoDB connection error:', err));

// Routes
app.get('/tasks', async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

app.post('/tasks', async (req, res) => {
  const newTask = new Task({ text: req.body.text });
  await newTask.save();
  res.json(newTask);
});

app.delete('/tasks/:id', async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: 'Task deleted' });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});