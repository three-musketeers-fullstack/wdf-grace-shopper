import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const dummyData = [
  {
    id: 1,
    title: "Ice Cubes",
    description: "Awesome Cube",
    price: `$${1000}`,
    imageUrl: "/images/default-cube.jpg",
    inventory: 6,
    category: ["small cube"],
    rating: 5
  },
  {
    id: 2,
    title: "Nissan Cube",
    description: "Awesome Cube",
    price: `$${500}`,
    imageUrl: "/images/default-cube.jpg",
    inventory: 0,
    category: ["small cube"],
    rating: 4
  },
  {
    id: 3,
    title: "Legos Cube",
    description: "Awesome Cube",
    price: `$${200}`,
    imageUrl: "/images/default-cube.jpg",
    inventory: 11,
    category: ["small cube"],
    rating: 4.5
  }
];

const Cart = props => {
  //Creates an array with unique products ids from the local storage
  const localCartProductsIds = Array.from(
    new Set(
      JSON.parse(localStorage.getItem("cart")).map(product => product.productId)
    )
  );

  const products = props.user.id
    ? //If logged in it assigns products to be all the products from the active cart linked to the current user
      dummyData
    : //If not logged in it filters all products by the products ids from the local storage
      props.products.filter(product =>
        localCartProductsIds.find(
          localCartProductId => localCartProductId === product.id
        )
      );
  console.log(products);
  return (
    <div>
      <h1>Shopping Cart</h1>
      <hr />
      {products.map(product => {
        return (
          <div key={product.id}>
            <div className="flex-row just-cont-space-between align-items-center">
              <div className="flex-row just-cont-space-between align-items-center">
                {/* Links back to single page product */}
                <Link to={`/products/${product.id}`}>
                  <div className="img-small">
                    <img className="img-all-products" src={product.imageUrl} />
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
                  <button className="delete-button-style">
                    Delete from Cart
                  </button>
                </div>

                {product.inventory ? (
                  <div>
                    <h3>Price</h3>
                    <h1 className="price-red-color font-color-red">
                      {product.price}
                    </h1>{" "}
                  </div>
                ) : (
                  <div />
                )}
              </div>
              {product.inventory ? (
                <div className="margin-80px-sides">
                  <div>
                    <h3>Quantity</h3>
                    <select className="quantity-style">
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
          <h1 className="price-red-color"> $0000</h1>
        </div>
      </div>
    </div>
  );
};

const mapToProps = state => ({
  user: state.user,
  products: state.products.products
});

const CartContainer = connect(mapToProps)(Cart);

export default CartContainer;
