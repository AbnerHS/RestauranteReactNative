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
      Pedido.belongsTo(models.ClienteMesa);
      Pedido.belongsTo(models.PedidoProduto);
    }
  };
  Pedido.init({
    horario: DataTypes.DATE,
    status: DataTypes.STRING,
    clienteMesaId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Pedido',
  });
  return Pedido;
};