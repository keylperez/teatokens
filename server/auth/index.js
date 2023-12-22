const router = require("express").Router();
const {
  models: { User },
} = require("../db");
module.exports = router;

router.post("/login", async (req, res, next) => {
  try {
    res.send({
      token: await User.authenticate({
        username: req.body.username,
        password: req.body.password,
      }),
    });
  } catch (err) {
    next(err);
  }
});

router.post("/signup", async (req, res, next) => {
  try {
    const { username, password, passwordConfirm, email } = req.body;
    const user = await User.create({
      username,
      password,
      email,
      passwordConfirm,
    });

    res.send({ token: await user.generateToken(), id: user.id });
  } catch (err) {
    if (err.name === "SequelizeUniqueConstraintError") {
      res.status(401).send("User already exists");
    } else {
      next(err);
    }
  }
});

router.get("/me", async (req, res, next) => {
  try {
    res.send(await User.findByToken(req.headers.authorization));
  } catch (ex) {
    next(ex);
  }
});
