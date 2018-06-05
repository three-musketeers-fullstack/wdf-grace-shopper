/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const Product = db.model('product')

describe('Product model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('instanceMethods', () => {
    describe('updateInventory', () => {
      let item

      beforeEach(() => {
        return Product.create({
          title: 'Boullion Cube',
          description: 'chicken stock',
          price: 4.99,
          inventory: 5,
          category: ['food'],
          rating: 3.4
        })
          .then(product => {
            item = product
          })
      })

      it('returns true if the password is correct', () => {
        item.updateInventory(2)
        expect(item.inventory).to.be.equal(3)
      })

      // it('returns false if the password is incorrect', () => {
      //   expect(item.correctPassword('bonez')).to.be.equal(false)
      // })
    }) // end describe('correctPassword')
  }) // end describe('instanceMethods')

  // describe('classMethods', () => {

  // }) // end describe('classMethods')
}) // end describe('User model')
