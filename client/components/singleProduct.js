import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchSingleProduct } from "../store";

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
          Category:{" "}
          {product.categories &&
            product.categories
              .map(category => category.name)
              .join(", ")}
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
            </select>
          </div>
          <h2>Rating: {product.rating}</h2>
        </div>
        <button>Add To Cart</button>
      </div>
    </div>
  );
};

const mapToProps = state => {
  console.log("MAPTOPROPS", state);
  return {
    products: state.products
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  console.log("MAPDISPATCH TO PROPS>>>>>", ownProps);
  return {
    onLoad: function() {
      dispatch(fetchSingleProduct(ownProps.params.match.id));
    }
  };
};

const SingleProductContainer = connect(
  mapToProps,
  mapDispatchToProps
)(SingleProduct);

export default SingleProductContainer;

SingleProduct.propTypes = {
  product: PropTypes.object
};

/**
 * PROP TYPES
 */
