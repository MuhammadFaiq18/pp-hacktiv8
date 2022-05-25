"use strict";

module.exports = {
  up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    let data = [
      {
        name: "Manchester United",
        division: "Premiere League",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Arsenal",
        division: "Premiere League",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Sunderland",
        division: "Championship",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Norwich",
        division: "Championship",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    return queryInterface.bulkInsert("Clubs", data);
  },

  down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete("Clubs");
  },
};
