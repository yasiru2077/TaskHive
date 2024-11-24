const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('./db');
const router = express.Router();

const JWT_SECRET = 'your_jwt_secret'; // Use an env variable for production

// Register
router.post('/register', (req, res) => {
    const { email, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);
    db.query('INSERT INTO users (email, password) VALUES (?, ?)', [email, hashedPassword], (err, result) => {
        if (err) return res.status(400).json({ error: err.message });
        res.json({ message: 'User registered successfully!' });
    });
});

// Login
router.post('/login', (req, res) => {
    const { email, password } = req.body;
    db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
        if (err || results.length === 0) return res.status(400).json({ error: 'Invalid credentials' });
        const user = results[0];
        if (!bcrypt.compareSync(password, user.password)) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }
        const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    });
});

module.exports = router;
