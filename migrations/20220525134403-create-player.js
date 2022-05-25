'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Players', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      position: {
        type: Sequelize.STRING
      },
      nationality: {
        type: Sequelize.STRING
      },
      rating: {
        type: Sequelize.INTEGER
      },
      ClubId: {
        type: Sequelize.INTEGER,
        references: {model: {tableName: "Clubs"}}
      },
      UserId: {
        type: Sequelize.INTEGER,
        references: {model: {tableName: "Users"}}
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Players');
  }
};