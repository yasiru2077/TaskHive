module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true, // Validates that the email is in proper format
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  // Association method
  User.associate = (models) => {
    User.hasMany(models.Task, { foreignKey: "userId", as: "tasks" });
  };

  return User;
};
