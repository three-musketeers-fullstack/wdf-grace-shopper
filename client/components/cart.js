import React from "react";
import { connect } from "react-redux";

const dummyData = [
  {
    title: "Ice Cubes",
    description: "Awesome Cube",
    price: `$${1000}`,
    imageUrl: "/images/default-cube.jpg",
    inventory: 6,
    category: ["small cube"],
    rating: 5
  },
  {
    title: "Nissan Cube",
    description: "Awesome Cube",
    price: `$${500}`,
    imageUrl: "/images/default-cube.jpg",
    inventory: 0,
    category: ["small cube"],
    rating: 4
  },
  {
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
  const cart = localStorage.getItem('cart')
  for (let k in cart) {
    if (cart[k]) console.log(cart[k]);
  }
  return (
    <div>
      <h1>Shopping Cart</h1>
      <hr />
      {dummyData.map(product => {
        return (
          <div>
            <div className="flex-row just-cont-space-between">
              <div className="flex-row just-cont-space-between">
                <div className="img-small">
                  <img src={product.imageUrl} />
                </div>
                <div className="margin-250px-sides">
                  <h1 className="font-color-blue">{product.title}</h1>
                  {product.inventory ? (
                    product.inventory < 10 ? (
                      <h3 className="font-color-red">
                        Only {product.inventory} left in stock
                      </h3>
                    ) : (
                      <h3 className="font-color-green">In Stock</h3>
                    )
                  ) : (
                    <h3 className="font-color-red">
                      This item is no longer available from the seller you
                      selected.
                    </h3>
                  )}
                  <button>Delete from Cart</button>
                </div>

                {product.inventory ? (
                  <div>
                    <h3>Price</h3>
                    <h1 className="font-color-red">{product.price}</h1>{" "}
                  </div>
                ) : (
                  <div />
                )}
              </div>
              {product.inventory ? (
                <div className="margin-80px-sides">
                  <div>
                    <h3>Quantity</h3>
                    <select>
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
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
    </div>
  );
};

export default Cart;
