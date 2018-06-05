/* global describe beforeEach it */

const { expect } = require('chai');
const request = require('supertest');
const db = require('../db');
const app = require('../index');
const Product = db.model('product');

describe('User routes', () => {
  beforeEach(() => {
    return db.sync({ force: true });
  });

  describe('/api/products/', () => {
    const boullion = {
      title: 'Boullion Cube',
      description: 'chicken stock',
      price: 4.99,
      inventory: 5,
      category: ['food'],
      rating: 3.4,
    };

    beforeEach(() => {
      return Product.create({
        title: 'Boullion Cube',
        description: 'chicken stock',
        price: 4.99,
        inventory: 5,
        category: ['food'],
        rating: 3.4,
      });
    });

    it('GET /api/products', () => {
      return request(app)
        .get('/api/products')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array');
          expect(res.body[0].title).to.be.equal(boullion.title);
          expect(res.body[0].description).to.be.equal(boullion.description);
          expect(Number(res.body[0].price)).to.be.equal(boullion.price);
          expect(Number(res.body[0].inventory)).to.be.equal(boullion.inventory);
        });
    });
  }); // end describe('/api/users')
}); // end describe('User routes')
