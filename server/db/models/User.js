const Sequelize = require("sequelize");
const db = require("../db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Order = require("./Order");
const Product = require("./Product");
const OrderProduct = require("./OrderProduct");

const SALT_ROUNDS = 5;

const User = db.define("user", {
  username: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  passwordConfirm: {
    type: Sequelize.STRING,
    validate: {
      isEqualWithPassword(value) {
        if (!value) throw new Error("Please confirm your password");
        if (value !== this.password)
          throw new Error(
            "Your password does not match the confirmed password."
          );
      },
    },
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true,
      isEmail: true,
    },
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue:
      "https://e6.pngbyte.com/pngpicture/76945/png-default-image-png-Default-Profile_thumbnail.png",
  },
  role: {
    type: Sequelize.ENUM("admin", "customer"),
    defaultValue: "customer",
  },
});

module.exports = User;

/**
 * instanceMethods
 */
User.prototype.correctPassword = function (candidatePwd) {
  //we need to compare the plain version to an encrypted version of the password
  return bcrypt.compare(candidatePwd, this.password);
};

User.prototype.generateToken = function () {
  return jwt.sign({ id: this.id }, process.env.JWT);
};

/**
 * classMethods
 */
User.authenticate = async function ({ username, password }) {
  const user = await this.findOne({ where: { username } });
  if (!user || !(await user.correctPassword(password))) {
    const error = Error("Incorrect username/password");
    error.status = 401;
    throw error;
  }
  return user.generateToken();
};

User.findByToken = async function (token) {
  try {
    if (token.includes("Bearer ")) token = token.replace("Bearer ", "");
    const { id } = await jwt.verify(token, process.env.JWT);
    const user = await User.findByPk(id, {
      attributes: ["id", "username", "email", "imageUrl", "role"],
      include: [
        { model: Order, include: Product },
        { model: OrderProduct, include: Product },
      ],
    });
    if (!user) {
      throw "nooo";
    }
    return user;
  } catch (ex) {
    const error = Error("bad token");
    error.status = 401;
    throw error;
  }
};

/**
 * hooks
 */
const hashPassword = async (user) => {
  //in case the password has been changed, we want to encrypt it with bcrypt
  if (user.changed("password")) {
    user.password = await bcrypt.hash(user.password, SALT_ROUNDS);
  }
};

User.beforeCreate(async (user) => {
  user.passwordConfirm = undefined;
  await hashPassword(user);
});
// User.afterCreate(async (user) => {
//   try {
//     const order = await Order.create({ isCart: true });
//     await user.addOrder(order);
//   } catch (err) {
//     throw new Error("Something went wrong");
//   }
// });
User.beforeUpdate(hashPassword);

User.beforeBulkCreate((users) =>
  Promise.all(
    users.map((user) => {
      user.passwordConfirm = undefined;
      hashPassword(user);
    })
  )
);
