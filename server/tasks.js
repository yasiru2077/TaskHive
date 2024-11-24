const express = require('express');
const jwt = require('jsonwebtoken');
const db = require('./db');
const router = express.Router();

const JWT_SECRET = 'your_jwt_secret';

// Middleware to verify JWT
function authenticateToken(req, res, next) {
    const token = req.headers['authorization'];
    if (!token) return res.status(401).json({ error: 'Access denied' });
    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ error: 'Invalid token' });
        req.userId = user.userId;
        next();
    });
}

// Create Task
router.post('/tasks', authenticateToken, (req, res) => {
    const { title, description, priority, due_date } = req.body;
    const userId = req.userId;
    db.query(
        'INSERT INTO tasks (user_id, title, description, priority, due_date) VALUES (?, ?, ?, ?, ?)',
        [userId, title, description, priority, due_date],
        (err, result) => {
            if (err) return res.status(400).json({ error: err.message });
            res.json({ message: 'Task created successfully!' });
        }
    );
});

// Read Tasks
router.get('/tasks', authenticateToken, (req, res) => {
    const userId = req.userId;
    db.query('SELECT * FROM tasks WHERE user_id = ?', [userId], (err, results) => {
        if (err) return res.status(400).json({ error: err.message });
        res.json(results);
    });
});

// Update Task
router.put('/tasks/:id', authenticateToken, (req, res) => {
    const { title, description, priority, due_date, status } = req.body;
    const taskId = req.params.id;
    db.query(
        'UPDATE tasks SET title = ?, description = ?, priority = ?, due_date = ?, status = ? WHERE id = ?',
        [title, description, priority, due_date, status, taskId],
        (err, result) => {
            if (err) return res.status(400).json({ error: err.message });
            res.json({ message: 'Task updated successfully!' });
        }
    );
});

// Delete Task
router.delete('/tasks/:id', authenticateToken, (req, res) => {
    const taskId = req.params.id;
    db.query('DELETE FROM tasks WHERE id = ?', [taskId], (err, result) => {
        if (err) return res.status(400).json({ error: err.message });
        res.json({ message: 'Task deleted successfully!' });
    });
});

module.exports = router;
