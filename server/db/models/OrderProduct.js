const Sequelize = require("sequelize");
const db = require("../db");

const OrderProduct = db.define("order_product", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  numItems: {
    type: Sequelize.INTEGER,
    validate: {
      min: 1,
    },
  },
  totalPrice: {
    type: Sequelize.FLOAT,
    defaultValue: 0,
  },
});

module.exports = OrderProduct;
