const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { sequelize } = require('./models');
const authRoutes = require('./routes/auth');

require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/auth', authRoutes);

// Test Database Connection
sequelize.sync()
  .then(() => console.log('Database synchronized'))
  .catch(err => console.log(err));

// Start Server
const PORT = process.env.PORT || 3000; // This will now use port 3000 by default
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});