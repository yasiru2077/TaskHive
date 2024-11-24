const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./auth');
const taskRoutes = require('./tasks');
const app = express();

app.use(bodyParser.json());

// Routes
app.use('/auth', authRoutes);
app.use('/api', taskRoutes);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
