'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Player extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Club)
      this.belongsTo(models.User)
    }
  }
  Player.init({
    name: DataTypes.STRING,
    age: DataTypes.INTEGER,
    position: DataTypes.STRING,
    nationality: DataTypes.STRING,
    rating: DataTypes.INTEGER,
    ClubId: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Player',
    hooks: {
      beforeCreate(player, options) {
        player.UserId = 1
      }
    }
  });
  return Player;
};