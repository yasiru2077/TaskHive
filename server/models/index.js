const sequelize = require('../config/db');
const { DataTypes } = require('sequelize');

const User = require('./user')(sequelize, DataTypes);

module.exports = {
  sequelize,
  User,
};
