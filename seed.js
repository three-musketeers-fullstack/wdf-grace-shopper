const Sequelize = require("sequelize");
const db = require("./server/db");
const { User, Product, Category } = require("./server/db/models");

const categories = [
  {
    name: 'Toys'
  },
  {
    name: "Cooling Articles"
  },
  {
    name: 'Electronics'
  },
  {
    name: 'Food & Groceries'
  },
  {
    name: 'Beauty & Health'
  },
  {
    name: 'Home & Garding'
  }
]

const products = [
  {
    title: "Rubix Cube",
    description: "A tantalizing puzzle game for all ages",
    price: 1835,
    inventory: 8800,
    rating: 4
  },
  {
    title: "Boullion Cube",
    description:
      "Only the finest chicken stock. For any stew that needs a hint of chicken.",
    price: 7240,
    inventory: 14050,
    rating: 4
  },
  {
    title: "Ice Cube",
    description:
      'A sit down dinner with the star of "Are We There Yet?" and NWA (seriously).',
    price: 450000,
    inventory: 6,
    rating: 4
  },
  {
    title: "Nissan Cube",
    description: "Isn't this just the most oddly shaped car?",
    price: 1950000,
    inventory: 0,
    rating: 3
  },
  {
    title: "Ice Cube (Tray)",
    description:
      "Not to be mistaken for Ice Cube. This is used to make frozen cubes of water.",
    price: 299,
    inventory: 1000,
    rating: 3
  },
  {
    title: "Nintendo Gamecube",
    description:
      "One of the best gaming consoles of its generation. Easily the cubiest, as well.",
    price: 30075,
    inventory: 12,
    rating: 4
  }
];

const id = () => Math.floor(Math.random() * products.length) + 1;

const users = [
  {
    email: "omri@omri.omri",
    password: "123",
    name: 'omri'
  },
  {
    email: "jon@web.dev",
    password: "111",
    name: 'jon',
    isAdmin: true
  },
  {
    email: "oz@ozcorp.com",
    password: "8989",
    name: 'oz',
    isAdmin: true
  },
  {
    email: "cubelover@corner.three",
    password: "3927"
  },
  {
    email: "augusto@fullstack.com",
    password: "9999",
    name: 'Flex Master',
    isAdmin: true
  },
];

const seed = () =>
  

  Promise.all(products.map(product => Product.create(product)))
  .then(Promise.all(categories.map(category => Category.create(category))))
  .then(Promise.all(users.map(user => User.create(user))))

const main = () => {
  console.log("Syncing db...");
  db.sync({ force: true })
    .then(() => {
      console.log("Seeding databse...");
      return seed();
    })
    .catch(err => {
      console.log("Error while seeding");
      console.log(err.stack);
    })
    .then(() => {
      db.close();
      return null;
    });
};

main();
