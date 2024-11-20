const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");

const User = require("./user")(sequelize, DataTypes);
const Task = require("./task")(sequelize, DataTypes);

module.exports = {
  sequelize,
  User,
  Task,
};
