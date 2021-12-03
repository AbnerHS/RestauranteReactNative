'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pedido extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Pedido.hasMany(models.PedidoProduto);
      Pedido.belongsTo(models.Cliente);
    }
  };
  Pedido.init({
    status: DataTypes.INTEGER,
    mesa: DataTypes.INTEGER,
    clienteId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Pedido',
  });
  return Pedido;
};