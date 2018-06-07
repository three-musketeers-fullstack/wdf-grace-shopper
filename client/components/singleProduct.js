import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchSingleProduct } from '../store';

const SingleProduct = props => {
  console.log(props, '>>>>>>>>>>>>>>');
  console.log('<-------------------->');
  if (!props.products) {
    props.onLoad(Number(props.match.params.id));
    console.log(props, 'post onLoad');
    return <h1>No Products</h1>;
  } else {
    const {
      name,
      description,
      price,
      image,
      category,
      rating,
    } = props.products.product;
    return (
      <div>
        <div>
          <h1>{name}</h1>
          <img src={image} />
          <h3>Category: {category}</h3>
        </div>
        <div>
          <p>{description}</p>

          <div>
            <h2>Price: {price}</h2>
            <div>
              <h2>Quanity:</h2>
              <select>
                <option>1</option>
              </select>
            </div>
            <h2>Rating: {rating}</h2>
          </div>
          <button>Add To Cart</button>
        </div>
      </div>
    );
  }
};

const mapToProps = state => {
  console.log('MAPTOPROPS', state);
  return {
    products: state.products,
    product: state.product,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  console.log('MAPDISPATCH TO PROPS>>>>>', ownProps);
  return {
    onLoad: function() {
      dispatch(fetchSingleProduct(ownProps.params.match.id));
    },
  };
};

const SingleProductContainer = connect(
  mapToProps,
  mapDispatchToProps
)(SingleProduct);

export default SingleProductContainer;

SingleProduct.propTypes = {
  product: PropTypes.object,
};

/**
 * PROP TYPES
 */

