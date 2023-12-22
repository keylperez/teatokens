"use strict";

const {
  db,
  models: { User, Product, Order, OrderProduct },
} = require("../server/db");

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log("db synced!");

  // Creating Users

  const users = await Promise.all([
    User.create({
      username: "cody",
      password: "123",
      passwordConfirm: "123",
      email: "lalalala@lala.com",
    }),
    User.create({
      username: "murphy",
      password: "123",
      passwordConfirm: "123",
      email: "yoyo@yahoo.com",
    }),
    User.create({
      username: "zack",
      password: "123",
      passwordConfirm: "123",
      email: "zack@yahoo.com",
    }),
    User.create({
      username: "moseby",
      password: "123",
      passwordConfirm: "123",
      email: "moseby@yahoo.com",
    }),
    User.create({
      username: "ashley",
      password: "123",
      passwordConfirm: "123",
      email: "ashley@yahoo.com",
    }),
    User.create({
      username: "cool",
      password: "123",
      passwordConfirm: "123",
      email: "coolstuff@yahoo.com",
    }),
    User.create({
      username: "awesome",
      password: "123",
      passwordConfirm: "123",
      email: "awesome@yahoo.com",
    }),
    User.create({
      username: "peter",
      password: "123",
      passwordConfirm: "123",
      email: "peter@yahoo.com",
    }),
    User.create({
      username: "parker",
      password: "123",
      passwordConfirm: "123",
      email: "parker@yahoo.com",
    }),
    User.create({
      username: "eddie",
      password: "123",
      passwordConfirm: "123",
      email: "brock@yahoo.com",
    }),
    User.create({
      username: "bla bla",
      password: "123",
      passwordConfirm: "123",
      email: "blabla@yahoo.com",
    }),
    User.create({
      username: "hi bla",
      password: "123",
      passwordConfirm: "123",
      email: "hibla@yahoo.com",
    }),
  ]);

  const products = await Promise.all([
    Product.create({
      name: "Green Tea",
      price: 1.99,
      imageUrl:
        "https://rishi-tea.com/product/image/medium/ogtm-sana_green-tea-mint-organic-loose-leaf-blend.jpg",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    }),
    Product.create({
      name: "Peppermint Tea",
      price: 2.99,
      imageUrl:
        "https://rishi-tea.com/product/image/medium/opep-sana_peppermint-organic-loose-leaf-herbal-tea.jpg",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    }),
    Product.create({
      name: "Oolong Tea",
      price: 1.99,
      imageUrl:
        "https://rishi-tea.com/product/image/medium/oro-sana_ruby-oolong-organic-loose-leaf-oolong-tea.jpg",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    }),
    Product.create({
      name: "Black Tea",
      price: 2.99,
      imageUrl:
        "https://rishi-tea.com/product/image/medium/oeg-sana_earl-grey-organic-15-tea-bag-black-tea-blend.jpg",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    }),
    Product.create({
      name: "Chamomile Tea",
      price: 2.99,
      imageUrl:
        "https://rishi-tea.com/product/image/medium/ocbl2-sana_golden-chamomile-blossoms-organic-loose-leaf-herbal-tea.jpg",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    }),
    Product.create({
      name: "White Tea",
      price: 1.99,
      imageUrl:
        "https://rishi-tea.com/product/image/medium/owtrm-sana_white-tea-rose-melange-organic-loose-leaf-white-tea-blend.jpg",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    }),
    Product.create({
      name: "Ginger Tea",
      price: 2.99,
      imageUrl:
        "https://rishi-tea.com/product/image/medium/oging-sana_ginger-organic-loose-leaf-herbal-tea.jpg",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    }),
    Product.create({
      name: "Lavender Mint Tea",
      price: 1.99,
      imageUrl:
        "https://rishi-tea.com/product/image/medium/olm-sana_ops250-rp.jpg",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    }),
    Product.create({
      name: "Jasmine Green Tea",
      price: 2.99,
      imageUrl:
        "https://rishi-tea.com/product/image/medium/ojt-sana_jasmine-green-organic-loose-leaf-scented-green-tea.jpg",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    }),
    Product.create({
      name: "Pu-erh Tea",
      price: 2.99,
      imageUrl:
        "https://rishi-tea.com/product/image/medium/opc-sana_puer-classic-organic-loose-leaf-puer-tea.jpg",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    }),
    Product.create({
      name: "Matcha Tea",
      price: 1.99,
      imageUrl:
        "https://rishi-tea.com/product/image/medium/teamat-sana_teahouse-matcha-organic--powder-japanese-green-tea.jpg",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    }),
    Product.create({
      name: "Rooibos Tea",
      price: 2.99,
      imageUrl:
        "https://rishi-tea.com/product/image/medium/obr-sana_blueberry-rooibos-organic-loose-leaf-herbal-tea-infusion.jpg",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    }),
    Product.create({
      name: "Barley Tea",
      price: 1.99,
      imageUrl:
        "https://rishi-tea.com/product/image/medium/ohouj-sana_houjicha-organic-loose-leaf-japanese-green-tea.jpg",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    }),
    Product.create({
      name: "Moringa Tea",
      price: 2.99,
      imageUrl:
        "https://rishi-tea.com/product/image/medium/orshiso-sana_redshiso_looseleaf_sana.png",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    }),
    Product.create({
      name: "Brown Rice Tea",
      price: 2.99,
      imageUrl:
        "https://rishi-tea.com/product/image/medium/houjshiso-sana_hojishiso-loose-leaf-sana.jpg",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    }),
    Product.create({
      name: "Vanilla Tea",
      price: 1.99,
      imageUrl:
        "https://rishi-tea.com/product/image/medium/ovb-sana_vanilla-bean-organic-loose-black-tea-blend-infusion.jpg",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    }),
    Product.create({
      name: "Chai Tea",
      price: 2.99,
      imageUrl:
        "https://rishi-tea.com/product/image/medium/otc-sana_tulsichai-looseleaftea-sana.jpg",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    }),
    Product.create({
      name: "Dandelion Tea",
      price: 1.99,
      imageUrl:
        "https://rishi-tea.com/product/image/medium/owgd-sana_white-ginseng-detox-organic-loose-leaf-herbal-tea.jpg",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    }),
    Product.create({
      name: "Cranberry Tea",
      price: 2.99,
      imageUrl:
        "https://rishi-tea.com/product/image/medium/ccranc-sana_chileancranberrycitrus-looseleaf-sana.jpg",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    }),
    Product.create({
      name: "Hibiscus Tea",
      price: 2.99,
      imageUrl:
        "https://rishi-tea.com/product/image/medium/ohcs-sana_hibiscus-organic-loose-leaf-herbal-tea.jpg",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    }),
  ]);

  const orders = await Promise.all([
    Order.create({ isCart: true }),
    Order.create({ isCart: true }),
    Order.create({ isCart: true }),
    Order.create({ isCart: true }),
    Order.create({ isCart: true }),
    Order.create({ isCart: false, subTotal: 20.99 }),
    Order.create({ isCart: false, subTotal: 25.99 }),
    Order.create({ isCart: false, subTotal: 23.99 }),
    Order.create({ isCart: false, subTotal: 30.99 }),
    Order.create({ isCart: false, subTotal: 10.99 }),
    Order.create({ isCart: false, subTotal: 8.99 }),
  ]);

  // generate random products
  const giveMeRandomProducts = () => {
    const randomNum = () => Math.floor(Math.random() * (products.length - 10));
    let counter = 0;
    let idxAdded = {};
    while (counter < randomNum() + 1) {
      const randIdx = randomNum();
      if (idxAdded[randIdx]) continue;
      idxAdded[randIdx] = products[randIdx];
      counter++;
    }
    return Object.values(idxAdded);
  };

  for (let i = 0; i < orders.length; i++) {
    const randProducts = giveMeRandomProducts();
    for (let j = 0; j < randProducts.length; j++) {
      await users[i].addOrder(orders[i]);
      await orders[i].addProduct(randProducts[j], {
        through: {
          numItems: 1,
          totalPrice: randProducts[j].price,
          userId: users[i].id,
        },
      });
    }
  }

  console.log(`seeded ${users.length} users`);
  console.log(`seeded successfully`);
  return {
    users: {
      cody: users[0],
      murphy: users[1],
    },
  };
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log("seeding...");
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
