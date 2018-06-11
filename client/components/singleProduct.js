import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addItemToUserCart } from '../store';
import { parse } from 'url';

const SingleProduct = props => {
  const { products } = props.products;
  const paramId = Number(props.match.params.id);
  const product = products.length
    ? products.filter(product => {
        return product.id === paramId;
      })[0]
    : [];

  return (
    <div>
      <div>
        <h1>{product.title}</h1>
        <img src={product.imageUrl} />
        <h3>
          Category:{' '}
          {product.categories &&
            product.categories.map(category => category.name).join(', ')}
        </h3>
      </div>
      <div>
        <p>{product.description}</p>

        <div>
          <h2>Price: {product.price}</h2>
          <div>
            <h2>Quanity:</h2>
            <select>
              <option>1</option>
              <option>2</option>
            </select>
          </div>
          <h2>Rating: {product.rating}</h2>
        </div>
        <button
          type="button"
          onClick={() => {
            // const quantOption = document.getElementByTagName('option:selected');
            const reqBody = {
              userId: props.user.id,
              productId: product.id,
              quantity: product.inventory,
            };
            if (!props.user.id) {
              let cart = [];
              if (!localStorage.cart) {
                console.log('creating local cart')
                cart.push(reqBody);
                localStorage.setItem('cart', JSON.stringify(cart));
              }
              else {
                console.log('local cart exists');
                let oldCart = JSON.parse(localStorage.getItem('cart'));
                console.log('old cart:', oldCart);
                cart.push(oldCart);
                cart.push(reqBody);
                localStorage.setItem('cart', JSON.stringify(cart));
              }
              console.log('local storage //////');
              console.log(localStorage.getItem('cart'));
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
