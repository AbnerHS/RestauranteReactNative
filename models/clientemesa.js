'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ClienteMesa extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ClienteMesa.belongsTo(models.Mesa);
      ClienteMesa.belongsTo(models.Cliente);
    }
  };
  ClienteMesa.init({
    clienteId: DataTypes.INTEGER,
    mesaId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ClienteMesa',
  });
  return ClienteMesa;
};