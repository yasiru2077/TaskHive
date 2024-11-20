const express = require('express');
const { verifyToken } = require('../middleware/authMiddleware');
const {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
} = require('../controllers/taskController');

const router = express.Router();

router.post('/', verifyToken, createTask);      // Create a task
router.get('/', verifyToken, getTasks);        // Get all tasks (filter by completion status)
router.put('/:id', verifyToken, updateTask);   // Update a task
router.delete('/:id', verifyToken, deleteTask);// Delete a task

module.exports = router;
