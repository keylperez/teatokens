const router = require("express").Router();
const { isAdminHelper, getUserHelper } = require("./utils");
const {
  models: { Product },
} = require("../db");
module.exports = router;

// GET /api/products
router.get("/", async (req, res, next) => {
  try {
    const products = await Product.findAll({
      attributes: ["id", "name", "price", "imageUrl"],
    });

    res.json(products);
  } catch (err) {
    next(err);
  }
});

// GET /api/products/:productid
router.get("/:id", async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);

    if (!product) {
      res.status(404).send("Product does not exist");
    }
    res.json(product);
  } catch (err) {
    next(err);
  }
});

router.use(getUserHelper, isAdminHelper);
// POST /api/products -> needs to be admin
router.post("/", async (req, res, next) => {
  try {
    const addProduct = await Product.create(req.body);
    res.json(addProduct);
  } catch (err) {
    next(err);
  }
});

//PUT -> needs to be admin
router.put("/:id", async (req, res, next) => {
  try {
    const [_, [editProduct]] = await Product.update(req.body, {
      where: { id: req.params.id },
      returning: true,
    });
    res.json(editProduct);
  } catch (err) {
    next(err);
  }
});

//DELETE -> needs to be admin
router.delete("/:id", async (req, res, next) => {
  try {
    await Product.destroy({ where: { id: req.params.id } });
    res.status(204).json({ status: "success" });
  } catch (err) {
    next(err);
  }
});
