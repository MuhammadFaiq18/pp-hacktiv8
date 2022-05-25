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
        name: "Rooney",
        position: "Striker",
        nationality: "England",
        rating: 92,
        ClubId: 1,
        UserId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Ronaldo",
        position: "Striker",
        nationality: "Portugal",
        rating: 90,
        ClubId: 1,
        UserId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Hazard",
        position: "Midfielder",
        nationality: "Belgium",
        rating: 85,
        ClubId: 2,
        UserId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Bale",
        position: "Striker",
        nationality: "Wales",
        rating: 88,
        ClubId: 3,
        UserId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Son",
        position: "Midfielder",
        nationality: "South Korea",
        rating: 81,
        ClubId: 4,
        UserId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    return queryInterface.bulkInsert("Players", data);
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
