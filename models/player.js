"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Player extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Club);
      this.belongsTo(models.User);
    }

    nameAndAge() {
      return `${this.name} (${this.age})`;
    }
  }
  Player.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "name must not be empty" },
          notNull: { msg: "name must not be null" },
        },
      },
      age: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: { msg: "age must not be empty" },
          notNull: { msg: "age must not be null" },
        },
      },
      position: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "position must not be empty" },
          notNull: { msg: "position must not be null" },
        },
      },
      nationality: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "nationality must not be empty" },
          notNull: { msg: "nationality must not be null" },
        },
      },
      rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: { msg: "rating must not be empty" },
          notNull: { msg: "rating must not be null" },
          ratingCheck(value) {
            if (value < 1 || value > 99) {
              throw new Error(
                "rating must be greater than 1 and less than 100"
              );
            }
          },
        },
      },
      ClubId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: { msg: "club must not be empty" },
          notNull: { msg: "club must not be null" },
        },
      },
      UserId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Player",
      hooks: {
        beforeCreate(player, options) {
          player.UserId = 1;
        },
      },
    }
  );
  return Player;
};
