const { Sequelize } = require('sequelize');
require('dotenv').config();

// Add error handling for missing environment variables
if (!process.env.DB_NAME || !process.env.DB_USER || !process.env.DB_HOST) {
    throw new Error('Missing required database environment variables');
}

const sequelize = new Sequelize(
    process.env.DB_NAME, 
    process.env.DB_USER,
    process.env.DB_PASSWORD, 
    {
        host: process.env.DB_HOST,
        dialect: 'mysql',
        port: process.env.DB_PORT || 3308, // Use DB_PORT instead of PORT
        logging: false,
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    }
);

// Test the connection
sequelize
    .authenticate()
    .then(() => console.log('Database connected successfully!'))
    .catch(err => console.error('Unable to connect to the database:', err));

module.exports = sequelize;