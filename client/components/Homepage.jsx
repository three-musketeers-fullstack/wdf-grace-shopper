import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
/**
 * COMPONENT
 */

export const Homepage = props => {
  const { products } = props.products;
  const categories = ['Category 1', 'Category 2', 'Category 3', 'Category 4', 'Category 5', 'Category 6', 'Category 7']
  console.log(props, 'HOME PAGE PROPS>><><<><>><><><><>');
  console.log(products, 'HOME PAGE PRODUCTS !!<><<><>><><><><>!!');
  return (
    <div className="flex-row">
    <div>
      {categories.map(category => {
          return (
            <h1>{category}</h1>
          )
      })}
    </div>
    <div>
      <div className="all-products-view">
        {products.map(product => {
          return (
            <div key={product.id}>
              <Link to={`/products/${product.id}`}>
                <h3>{product.title}</h3>
                <img src={product.imageUrl} alt="" />
              </Link>
              <p>Price: {product.price}</p>
              <p>In Stock: {product.inventory}</p>
            </div>
          );
        })}
      </div>
    </div>

    </div>
  );
};

/**
 * CONTAINER
 */

const mapState = state => ({
  products: state.products,
});

const HomepageContainer = connect(mapState)(Homepage);

export default HomepageContainer;

/**
 * PROP TYPES
 */

Homepage.propTypes = {
  products: PropTypes.object,
};
