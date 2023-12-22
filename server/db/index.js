//this is the access point for all things database related!

const db = require("./db");
const Product = require("./models/Product");
const Order = require("./models/Order");
const User = require("./models/User");
const OrderProduct = require("./models/OrderProduct");

//associations could go here!
User.hasMany(Order);
Order.belongsTo(User);

Order.belongsToMany(Product, { through: OrderProduct });
Product.belongsToMany(Order, { through: OrderProduct });

Product.hasMany(OrderProduct);
OrderProduct.belongsTo(Product);

Order.hasMany(OrderProduct);
OrderProduct.belongsTo(Order);

User.hasMany(OrderProduct);
OrderProduct.belongsTo(User);

module.exports = {
  db,
  models: {
    User,
    Product,
    Order,
    OrderProduct,
  },
};
