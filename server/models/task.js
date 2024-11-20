module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define("Task", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    priority: {
      type: DataTypes.ENUM("High", "Medium", "Low"),
      defaultValue: "Medium",
    },
    dueDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    isCompleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  });

  Task.associate = (models) => {
    Task.belongsTo(models.User, { foreignKey: "userId", as: "user" });
  };

  return Task;
};
