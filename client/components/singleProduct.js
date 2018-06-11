import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addItemToUserCart } from '../store';

const SingleProduct = props => {
  const { products } = props.products;
  const paramId = Number(props.match.params.id);
  // Finds single product among all the products
  const product = products.length
    ? products.filter(product => {
        return product.id === paramId;
      })[0]
    : [];
  // Limits the quantity selection if the inventory is less than 10
  const count1To10 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  let quantity =
    product.inventory && product.inventory > 10
      ? count1To10
      : count1To10.slice(0, product.inventory);

  return (
    <div className="flex-row margin-50px">
      <div>
        <div className=" width-50vw products-rendering">
          <h1 className="margin-10px-20px">{product.title}</h1>
          <img className="img-single-product" src={product.imageUrl} />
        </div>
        <h2>
          Category:{' '}
          {product.categories &&
            product.categories.map(category => category.name).join(', ')}
        </h2>
      </div>
      <div className=" width-55vw flex-column margin-10px-20px just-cont-space-evenly">
        <p className="font-size-2em">{product.description}</p>
        <div className="flex-row just-cont-space-around  align-items-center">
          <h2 className="font-size-2em price-red-color">
            ${(product.price / 100).toFixed(2)}
          </h2>
          <div className="flex-row align-items-center">
            <h2>Quantity:</h2>
            <select className="quantity-style">
              {quantity.map(num => <option key={num}>{num}</option>)}
            </select>
          </div>
          <h3>{product.rating} stars</h3>
        </div>
        <div className="margin-20px-50px">
          {product.inventory ? (
            //renders the amount left in the inventory if less than 10
            product.inventory < 10 ? (
              <h2 className="font-color-red">
                Only {product.inventory} left in stock - order soon
              </h2>
            ) : (
              <h2 className="font-color-green">In Stock</h2>
            )
          ) : (
            //renders if inventory quantity is 0
            <h2 className="font-color-red">
              This item is no longer available from the seller you selected.
            </h2>
          )}
        </div>
        <button
          type="button"
          onClick={() => {
            const reqBody = [{
              userId: props.user.id,
              productId: product.id,
              quantity: product.inventory,
            }];
            if (!props.user.id) {
              let cart = [];
              if (!localStorage.cart) {
                cart = reqBody;
                localStorage.setItem('cart', JSON.stringify(cart));
              } else {
                let oldCart = JSON.parse(localStorage.getItem('cart'));
                cart = oldCart.concat(reqBody);
                localStorage.setItem('cart', JSON.stringify(cart));
              }
            } else {
              props.addItemToUserCart(props.user.id, reqBody);
            }
          }}
        >
          Add To Cart
        </button>
      </div>
    </div>
  );
};

const mapToProps = state => {
  console.log('MAPTOPROPS', state);
  return {
    products: state.products,
    user: state.user,
    cart: state.cart,
  };
};

const mapDispatchToProps = { addItemToUserCart };

const SingleProductContainer = connect(
  mapToProps,
  mapDispatchToProps
)(SingleProduct);

export default SingleProductContainer;

/**
 * PROP TYPES
 */

SingleProduct.propTypes = {};
