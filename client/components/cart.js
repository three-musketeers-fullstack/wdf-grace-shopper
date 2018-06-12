import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { updateLocalCartState } from "../store";

const Cart = props => {
  const { localCart, handleDelete, handleQuantityChange } = props;

  //Creates an array with unique products ids from the local storage
  const localCartProductsIds = localStorage.getItem("cart")
    ? Array.from(
        new Set(
          JSON.parse(localStorage.getItem("cart")).map(
            product => product.productId
          )
        )
      )
    : [];

  //Filters all products by the products ids from the local storage
  const products = props.products.filter(product =>
    localCart.find(localProduct => localProduct.productId === product.id)
  );

  // adds and mutiply by quantity
  let totalArr = [];

  localCart.forEach(cart => {
    products.forEach(product => {
      totalArr.push(cart.quantity * product.price);
    });
  });

  let total =
    totalArr &&
    Array.from(new Set(totalArr)).reduce((total, price) => (total += price), 0);

  return (
    <div>
      <h1>Shopping Cart</h1>
      <hr />
      {products &&
        products.map(product => {
          return (
            <div key={product.id}>
              <div className="flex-row align-items-center">
                <div className="flex-row width-60 just-cont-space-between align-items-center">
                  {/* Links back to single page product */}
                  <Link to={`/products/${product.id}`}>
                    <div className="img-small">
                      <img
                        className="img-all-products"
                        src={product.imageUrl}
                      />
                    </div>
                    {/* Links back to single page product */}
                  </Link>
                  <div className="margin-250px-sides">
                    <Link to={`/products/${product.id}`}>
                      <h1 className="font-color-blue">{product.title}</h1>
                      {product.inventory ? (
                        // It renders if inventory less than 10
                        product.inventory < 10 ? (
                          <h3 className="font-color-red">
                            Only {product.inventory} left in stock
                          </h3>
                        ) : (
                          // It renders if inventory more than 10
                          <h3 className="font-color-green">In Stock</h3>
                        )
                      ) : (
                        // It renders if inventory is 0
                        <h3 className="font-color-red">
                          This item is no longer available from the seller you
                          selected.
                        </h3>
                      )}
                    </Link>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="delete-button-style"
                    >
                      Delete from Cart
                    </button>
                  </div>
                </div>
                {product.inventory ? (
                  <div className="flex-row width-40 align-items-start">
                    <div>
                      {product.inventory ? (
                        <div className="margin-100px-sides">
                          <h3>Price</h3>
                          <h1 className="price-red-color font-color-red">
                            $ {(product.price / 100).toFixed(2)}
                          </h1>{" "}
                        </div>
                      ) : (
                        <div />
                      )}
                    </div>
                    <div>
                      <h3>Quantity</h3>
                      <select
                        onChange={e => {
                          return handleQuantityChange(
                            product.id,
                            e.target.value
                          );
                        }}
                        className="quantity-style"
                      >
                        {/* creates a hidden option to reflect the quantity the user selected previously */}
                        <option hidden>
                          {
                            localCart.find(
                              cartItem => cartItem.productId === product.id
                            ).quantity
                          }
                        </option>
                        {product.inventory > 10
                          ? new Array(10)
                              .fill("bananas")
                              .map((n, indx) => (
                                <option key={indx++}>{indx++}</option>
                              ))
                          : // Gives a limited quantity if the inventory is less than 10
                            new Array(product.inventory)
                              .fill("bananas")
                              .map((n, indx) => (
                                <option key={indx++}>{indx++}</option>
                              ))}
                      </select>
                    </div>
                  </div>
                ) : (
                  <div />
                )}
              </div>
              <hr />
            </div>
          );
        })}
      <div className="flex-row just-cont-space-evenly margin-15px-10px">
        <button className="add-button-style width-35vw">
          Proceed to Checkout
        </button>
        <div className="flex-row align-items-center">
          <h1>Subtotal:</h1>
          <h1 className="price-red-color">$ {(total / 100).toFixed(2)}</h1>
        </div>
      </div>
    </div>
  );
};

const mapToProps = state => ({
  localCart: state.localCart,
  user: state.user,
  products: state.products.products
});

const mapDispatch = dispatch => ({
  handleDelete: deletedProductId => {
    //filters local storage array by the id given in order to delete it from LS and redux store
    const newCart =
      localStorage.getItem("cart") &&
      Array.from(JSON.parse(localStorage.getItem("cart"))).filter(
        product => product.productId !== deletedProductId
      );
    localStorage.setItem("cart", JSON.stringify(newCart));

    //Creates an array with unique products ids and quantity from the local storage
    const cache = {};

    Array.from(JSON.parse(localStorage.getItem("cart"))).forEach(
      product => (cache[product.productId] = product)
    );

    const updatedCart = Object.values(cache);

    //it updates the redux store with local storage
    dispatch(updateLocalCartState(updatedCart));
  },
  handleQuantityChange: (productId, event) => {
    let quantity = event;

    //Body for local storage
    const reqBody = [
      {
        productId,
        quantity
      }
    ];

    let cart = [];

    //updates n adds the local storage with new reqBody
    let oldCart = JSON.parse(localStorage.getItem("cart"));
    cart = oldCart.concat(reqBody);
    localStorage.setItem("cart", JSON.stringify(cart));

    //Creates an array with unique products ids and quantity from the local storage
    const cache = {};

    Array.from(JSON.parse(localStorage.getItem("cart"))).forEach(
      product => (cache[product.productId] = product)
    );

    const localCart = localStorage.getItem("cart") ? Object.values(cache) : [];

    //it updates the redux store with local storage
    dispatch(updateLocalCartState(localCart));
  }
});

const CartContainer = connect(
  mapToProps,
  mapDispatch
)(Cart);

export default CartContainer;
