const router = require("express").Router();
const {
  models: { Order, Product, OrderProduct, User },
} = require("../db");
const { getUserHelper } = require("./utils");

router.use(getUserHelper);
/**
  req.body
  {
    prodId
  }
*/
//When user adds a product to cart, it creates or finds the order that has isCart true
//and adds the product there
router.post("/", async (req, res, next) => {
  try {
    const { user } = req;
    const product = await Product.findByPk(req.body.prodId);
    if (!product) throw new Error("Product does not exist");
    const [order] = await Order.findOrCreate({
      where: { userId: user.id, isCart: true },
      include: { model: Product },
      defaults: {
        userId: user.id,
        isCart: true,
      },
    });
    const numOfItems = req.body.numItems || 1;
    await order.addProduct(product, {
      through: {
        numItems: numOfItems,
        totalPrice: product.price * numOfItems,
        userId: user.id,
      },
    });
    res.status(201).json({ order, addedProduct: product });
  } catch (err) {
    next(err);
  }
});
//Get all orders
router.get("/", async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      where: { userId: req.user.id, isCart: false },
      include: [{ model: Product }],
    });
    await res.status(200).json(orders);
  } catch (err) {
    next(err);
  }
});

//Get cart
router.get("/cart", async (req, res, next) => {
  try {
    const cart = await OrderProduct.findAll({
      where: { userId: req.user.id },
      include: [{ model: Product }, { model: Order, where: { isCart: true } }],
    });
    await res.status(200).json(cart);
  } catch (err) {
    next(err);
  }
});

//Buy Order (Cart) / Checkout
router.put("/:id", async (req, res, next) => {
  try {
    const [_, boughtOrder] = await Order.update(
      { isCart: false, subTotal: req.body.subTotal },
      { where: { id: req.params.id, userId: req.user.id }, returning: true }
    );
    res.status(200).json(boughtOrder);
  } catch (err) {
    next(err);
  }
});

//Update cart
router.put("/cart/:id", async (req, res, next) => {
  try {
    const [_, editCart] = await OrderProduct.update(
      {
        numItems: req.body.numItems,
        totalPrice: req.body.totalPrice,
      },
      {
        where: { id: req.params.id, userId: req.user.id },
        include: { model: Order, where: { isCart: true } },
        returning: true,
      }
    );
    res.status(200).json(editCart);
  } catch (err) {
    next(err);
  }
});

//Delete cart item
router.delete("/cart/:id", async (req, res, next) => {
  try {
    const orderProduct = await OrderProduct.findOne({
      where: { id: req.params.id, userId: req.user.id },
      include: { model: Order, where: { isCart: true } },
    });
    if (!orderProduct) throw new Error("Could not delete this product");
    await orderProduct.destroy();
    res.status(204).json({ status: "success" });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
