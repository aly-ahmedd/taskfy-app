const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Middleware for parsing JSON
app.use(bodyParser.json());

// Serve static files (e.g., HTML, CSS, JS)
app.use(express.static('public'));

// In-memory task storage
let tasks = [];

// API Endpoints

// Get all tasks
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

// Add a new task
app.post('/tasks', (req, res) => {
  const { title, notes, dueDate, priority, category } = req.body;
  const newTask = {
    id: tasks.length + 1,
    title,
    notes,
    dueDate,
    priority,
    category,
    completed: false
  };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// Update task completion status
app.patch('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const { completed } = req.body;
  const task = tasks.find((task) => task.id === taskId);
  if (task) {
    task.completed = completed;
    res.json(task);
  } else {
    res.status(404).json({ message: 'Task not found' });
  }
});

// Delete a task
app.delete('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  tasks = tasks.filter((task) => task.id !== taskId);
  res.status(204).send();
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
