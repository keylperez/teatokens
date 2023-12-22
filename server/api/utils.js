const {
  models: { User },
} = require("../db");

const getUserHelper = async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    if (!user) next(new Error("No user found."));
    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};

const isAdminHelper = async (req, res, next) => {
  try {
    if (req.user && req.user.role === "admin") {
      next();
    } else {
      const err = new Error("Access denied - you are not an admin");
      err.status = 404;
      throw err;
    }
  } catch (err) {
    next(err);
  }
};

module.exports = { isAdminHelper, getUserHelper };
