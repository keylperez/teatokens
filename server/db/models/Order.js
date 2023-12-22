const Sequelize = require("sequelize");
const db = require("../db");

const Order = db.define("order", {
  isCart: {
    type: Sequelize.BOOLEAN,
    defaultValue: true,
  },
  subTotal: {
    type: Sequelize.FLOAT,
    validate: {
      min: 0.01,
    },
  },
});

module.exports = Order;
