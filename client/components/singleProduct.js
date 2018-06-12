import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { updateLocalCartState } from "../store";

let quantity = 1;

const SingleProduct = props => {
  const { products, handleQuantity, history, updateLocalCart } = props;
  const paramId = Number(props.match.params.id);
  // Finds single product among all the products
  const product = products.length
    ? products.filter(product => {
        return product.id === paramId;
      })[0]
    : [];

  return (
    <div className="flex-row margin-50px">
      <div>
        <div className=" width-50vw products-rendering">
          <h1 className="margin-10px-20px">{product.title}</h1>
          <img className="img-single-product" src={product.imageUrl} />
        </div>
        <h2>
          Category:{" "}
          {product.categories &&
            product.categories.map(category => category.name).join(", ")}
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
            <select onChange={handleQuantity} className="quantity-style">
              {product.inventory > 10
                ? new Array(10)
                    .fill("bananas")
                    .map((n, indx) => <option key={indx++}>{indx++}</option>)
                : new Array(product.inventory)
                    .fill("bananas")
                    .map((n, indx) => <option key={indx++}>{indx++}</option>)}
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
          className="add-button-style align-self-center"
          type="button"
          onClick={() => {
            //Body for local storage
            const reqBody = [
              {
                productId: product.id,
                quantity
              }
            ];
            //if cart does not exists creates one
            let cart = [];
            if (!localStorage.cart) {
              cart = reqBody;
              //set cart as key and reqBody as the product with quantity
              localStorage.setItem("cart", JSON.stringify(cart));
            } else {
              //updates n adds the local storage with new reqBody
              let oldCart = JSON.parse(localStorage.getItem("cart"));
              cart = oldCart.concat(reqBody);
              localStorage.setItem("cart", JSON.stringify(cart));
            }

            //Creates an array with unique products ids and quantity from the local storage
            const cache = {};

            Array.from(JSON.parse(localStorage.getItem("cart"))).forEach(
              product => (cache[product.productId] = product)
            );

            const localCart = localStorage.getItem("cart")
              ? Object.values(cache)
              : [];

            //it updates the redux store with local storage
            updateLocalCart(localCart);

            //Resets quantity back to one 
            quantity = 1;

            history.push("/");
          }}
        >
          Add To Cart
        </button>
      </div>
    </div>
  );
};

const mapToProps = state => ({
  localCart: state.localCart,
  products: state.products.products,
  user: state.user,
  cart: state.cart
});

const mapDispatchToProps = dispatch => ({
  handleQuantity: event => (quantity = event.target.value),
  updateLocalCart: products => dispatch(updateLocalCartState(products))
});

const SingleProductContainer = connect(
  mapToProps,
  mapDispatchToProps
)(SingleProduct);

export default SingleProductContainer;

/**
 * PROP TYPES
 */

SingleProduct.propTypes = {};
