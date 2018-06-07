import React from "react";
import { connect } from "react-redux";

const dummyData = [
  {
    title: "Ice Cubes",
    description: "Awesome Cube",
    price: 1000,
    imageUrl: "/default-cube.jpg",
    inventory: 6,
    category: ["small cube"],
    rating: 5
  },
  {
    title: "Nissan Cube",
    description: "Awesome Cube",
    price: 500,
    imageUrl: "/default-cube.jpg",
    inventory: 3,
    category: ["small cube"],
    rating: 4
  },
  {
    title: "Legos Cube",
    description: "Awesome Cube",
    price: 200,
    imageUrl: "/default-cube.jpg",
    inventory: 7,
    category: ["small cube"],
    rating: 4.5
  }
];

const Cart = props => {
  return (
    <div>
      <h1>Shopping Cart</h1>
      <hr />
      {dummyData.map(product => {
        return (
          <div>
            <div className="flex-row">
              <div className="flex-row">
                <div className="img-small">
                  <img src={product.imageUrl} />
                </div>
                <div>
                  <h1>{product.title}</h1>
                  <h3>Only {product.inventory} left in stock</h3>
                  <button>Delete from Cart</button>
                </div>
                <div>
                  <h3>Price</h3>
                  <h1>{product.price}</h1>
                </div>
              </div>
              <div>
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
            </div>
            <hr/>
          </div>
        );
      })}
    </div>
  );
};

export default Cart;
