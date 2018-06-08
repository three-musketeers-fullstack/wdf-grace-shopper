const Sequelize = require('sequelize');
const db = require('./server/db');
const { User, Product } = require('./server/db/models');

const products = [
  {
    title: 'Rubix Cube',
    description: 'A tantalizing puzzle game for all ages',
    price: 18,
    inventory: 88,
    rating: 4,
  },
  {
    title: 'Boullion Cube',
    description:
      'Only the finest chicken stock. For any stew that needs a hint of chicken.',
    price: 7,
    inventory: 140,
    rating: 4
  },
  {
    title: 'Ice Cube',
    description:
      'A sit down dinner with the star of "Are We There Yet?" and NWA (seriously).',
    price: 4500,
    inventory: 6,
    rating: 4
  },
  {
    title: 'Nissan Cube',
    description: "Isn't this just the most oddly shaped car?",
    price: 19500,
    inventory: 0,
    rating: 3
  },
  {
    title: 'Ice Cube (Tray)',
    description:
      'Not to be mistaken for Ice Cube. This is used to make frozen cubes of water.',
    price: 2,
    inventory: 1000,
    rating: 3,
  },
  {
    title: 'Nintendo Gamecube',
    description:
      'One of the best gaming consoles of its generation. Easily the cubiest, as well.',
    price: 300,
    inventory: 12,
    rating: 4
  },
];

const id = () => Math.floor(Math.random() * products.length) + 1;

const users = [
  {
    email: 'omri@omri.omri',
    password: 123,
  },
  {
    email: 'jon@web.dev',
    password: 111,
  },
  {
    email: 'cubelover@corner.three',
    password: 3927,
  },
];

const seed = () =>
  Promise.all(products.map(product => Product.create(product)));

const main = () => {
  console.log('Syncing db...');
  db.sync({ force: true })
    .then(() => {
      console.log('Seeding databse...');
      return seed();
    })
    .catch(err => {
      console.log('Error while seeding');
      console.log(err.stack);
    })
    .then(() => {
      db.close();
      return null;
    });
};

main();
