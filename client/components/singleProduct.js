import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchSingleProduct } from "../store";

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
          Category:{" "}
          {product.categories &&
            product.categories.map(category => category.name).join(", ")}
        </h2>
      </div>

      <div className=" width-55vw flex-column margin-10px-20px just-cont-space-evenly">
        <p className="font-size-2em">{product.description}</p>
        <div className="flex-row just-cont-space-around  align-items-center">
          <h2
            className=" 
              font-size-2em
              price-red-color"
          >
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
        <div>
          {product.inventory ? (
            //renders the amount left in the inventory if less than 10
            product.inventory < 10 ? (
              <h2 className="font-color-red">
                Only {product.inventory} left in stock
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
        <button className=" align-self-center add-button-style">
          Add To Cart
        </button>
      </div>
    </div>
  );
};

const mapToProps = state => {
  return {
    products: state.products
  };
};

const SingleProductContainer = connect(mapToProps)(SingleProduct);

export default SingleProductContainer;

SingleProduct.propTypes = {
  product: PropTypes.object
};

/**
 * PROP TYPES
 */
