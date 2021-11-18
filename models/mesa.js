'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Mesa extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Mesa.hasMany(models.ClienteMesa)
    }
  };
  Mesa.init({
    numero: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Mesa',
  });
  return Mesa;
};