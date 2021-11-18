'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PedidoProduto extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      PedidoProduto.belongsTo(models.Pedido);
      PedidoProduto.belongsTo(models.Produto);
    }
  };
  PedidoProduto.init({
    pedidoId: DataTypes.INTEGER,
    produtoId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'PedidoProduto',
  });
  return PedidoProduto;
};