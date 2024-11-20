'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn("Tasks", "userId", {
      type: Sequelize.INTEGER,
      allowNull: false, // Set to true if association is optional
      references: {
        model: "Users", // Name of the Users table
        key: "id", // Primary key in Users table
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn("Tasks", "userId");
  }
};
